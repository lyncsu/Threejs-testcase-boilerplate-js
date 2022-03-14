import { Demo } from '../base/Demo'
import * as Box2d from './Box2d'
import * as THREE from 'three'
import { b2Body, b2EdgeShape, b2Vec2, b2BodyType, b2PolygonShape, b2RevoluteJointDef, b2PrismaticJointDef, b2World } from './Box2d'

let w
let h
const SCALE = 1

const settings = {
  m_testIndex: 0,
  m_windowWidth: 1600,
  m_windowHeight: 900,
  m_hertz: 60,
  m_velocityIterations: 8,
  m_positionIterations: 3,

  // Particle iterations are needed for numerical stability in particle
  // simulations with small particles and relatively high gravity.
  // b2CalculateParticleIterations helps to determine the number.
  // m_particleIterations: b2CalculateParticleIterations(10, 0.04, 1 / 60),
  m_drawShapes: true,
  m_drawParticles: true,
  m_drawJoints: true,
  m_drawAABBs: false,
  m_drawContactPoints: false,
  m_drawContactNormals: false,
  m_drawContactImpulse: false,
  m_drawFrictionImpulse: false,
  m_drawCOMs: false,
  m_drawControllers: true,
  m_drawStats: false,
  m_drawInputHelp: true,
  m_drawFpsMeter: true,
  m_drawProfile: false,
  m_enableWarmStarting: true,
  m_enableContinuous: true,
  m_enableSubStepping: false,
  m_enableSleep: true,
  m_pause: false,
  m_singleStep: false,
}

export class Box2dDemo extends Demo {
  attachment
  platform
  m_speed = 3
  m_stepCount = 0

  constructor(root) {
    super(root)

    w = this.app.domElement.clientWidth
    h = this.app.domElement.clientHeight

    this.bindScope()

    this.init()
  }

  bindScope() {
    this.update = this.update.bind(this)
  }

  init() {
    const gravity = new b2Vec2(0, -10)
    this.world = b2World.Create(gravity)

    const ground = this.world.CreateBody()
    {
      const shape = new b2EdgeShape()
      shape.SetTwoSided(new b2Vec2(-20, 0), new b2Vec2(20, 0))

      ground.CreateFixture({ shape })
    }

    // Define attachment
    {
      this.attachment = this.world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: {
          x: 0,
          y: 3,
        },
      })

      const shape = new b2PolygonShape()
      shape.SetAsBox(0.5, 2)
      this.attachment.CreateFixture({ shape, density: 2 })

      const boxAttatchment = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 4, 1), new THREE.MeshNormalMaterial())
      boxAttatchment.name = 'attatchment'
      const p0 = this.attachment.GetPosition()
      boxAttatchment.position.set(p0.x, p0.y, 0)
      // const h0 = new THREE.AxesHelper(1)
      // h0.position.set(p0.x, p0.y, 0)
      // this.app.scene.add(h0)
      this.app.scene.add(boxAttatchment)
      this.attachment.SetUserData(boxAttatchment)
    }

    // Define platform
    {
      this.platform = this.world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: { x: 0, y: 5 },
      })

      const shape = new b2PolygonShape()
      shape.SetAsBox(0.5, 4, new b2Vec2(0, 0), 0.5 * Math.PI)

      this.platform.CreateFixture({
        shape,
        friction: 0.6,
        density: 2,
      })

      const boxPlatform = new THREE.Mesh(new THREE.BoxBufferGeometry(8, 1, 1), new THREE.MeshNormalMaterial())
      boxPlatform.name = 'platform'
      const p1 = this.platform.GetPosition()
      boxPlatform.position.set(p1.x, p1.y, 0)
      // const h1 = new THREE.AxesHelper(1)
      // h1.position.set(p1.x, p1.y, 0)
      // this.app.scene.add(h1)
      this.app.scene.add(boxPlatform)
      this.platform.SetUserData(boxPlatform)
      this.platform.SetType(b2BodyType.b2_kinematicBody)
      this.platform.SetLinearVelocity(new b2Vec2(-this.m_speed, 0))
      this.platform.SetAngularVelocity(0)

      const rjd = new b2RevoluteJointDef()
      rjd.Initialize(this.attachment, this.platform, new b2Vec2(0, 5))
      rjd.maxMotorTorque = 50
      rjd.enableMotor = true
      this.world.CreateJoint(rjd)

      const pjd = new b2PrismaticJointDef()
      pjd.Initialize(ground, this.platform, new b2Vec2(0, 5), new b2Vec2(1, 0))

      pjd.maxMotorForce = 1000
      pjd.enableMotor = true
      pjd.lowerTranslation = -10
      pjd.upperTranslation = 10
      pjd.enableLimit = true

      this.world.CreateJoint(pjd)
    }

    // Create a payload
    {
      const box = this.world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: { x: -2, y: 8 },
      })

      const shape = new b2PolygonShape()
      shape.SetAsBox(0.75, 0.75)

      const boxPayload = new THREE.Mesh(new THREE.BoxBufferGeometry(1.5, 1.5, 1.5), new THREE.MeshNormalMaterial())
      boxPayload.name = 'payload'
      this.app.scene.add(boxPayload)

      box.CreateFixture({
        shape,
        friction: 0.6,
        density: 2,
      })

      const p2 = box.GetPosition()
      boxPayload.position.set(p2.x, p2.y, 0)
      // const h2 = new THREE.AxesHelper(1)
      // h2.position.set(p2.x, p2.y, 0)
      // this.app.scene.add(h2)
      box.SetUserData(boxPayload)
    }
  }

  step(timeStep) {
    this.world.SetAllowSleeping(settings.m_enableSleep)
    this.world.SetWarmStarting(settings.m_enableWarmStarting)
    this.world.SetContinuousPhysics(settings.m_enableContinuous)
    this.world.SetSubStepping(settings.m_enableSubStepping)

    this.m_pointCount = 0

    this.world.Step(timeStep, {
      velocityIterations: settings.m_velocityIterations,
      positionIterations: settings.m_positionIterations,
      // particleIterations: settings.m_particleIterations,
    })

    if (timeStep > 0) {
      ++this.m_stepCount
    }
  }

  update() {
    // return
    let timeStep = settings.m_hertz > 0 ? 1 / settings.m_hertz : 0
    for (let body = this.world.GetBodyList(); body; body = body.GetNext()) {
      console.info(body)
      if (body.GetType() === b2BodyType.b2_dynamicBody) {
        const userData = body.GetUserData()
        if (userData) {
          const b2Pos = body.GetPosition()
          const b2Angle = body.GetAngle()
          userData.position.set(b2Pos.x, b2Pos.y, 0)
          userData.rotation.z = b2Angle
        }
      }
    }

    if (this.platform.GetType() === b2BodyType.b2_kinematicBody) {
      const { p } = this.platform.GetTransform()
      const userData = this.platform.GetUserData()
      if (userData) {
        const b2Pos = this.platform.GetPosition()
        userData.position.set(b2Pos.x, b2Pos.y, 0)
      }
      const v = this.platform.GetLinearVelocity()
      if ((p.x < -10 && v.x < 0) || (p.x > 10 && v.x > 0)) {
        this.platform.SetLinearVelocity(new b2Vec2(-v.x, v.y))
      }
    }

    if (settings.m_pause) {
      if (settings.m_singleStep) {
        settings.m_singleStep = false
      } else {
        timeStep = 0
      }
    }
    this.step(timeStep)
  }
}
