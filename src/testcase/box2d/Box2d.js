(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Box2d"] = factory();
	else
		root["Box2d"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "tjUo");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1cpr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2FrictionJoint = exports.b2FrictionJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const temp = {
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    Cdot: new b2_math_1.b2Vec2(),
    impulse: new b2_math_1.b2Vec2(),
    oldImpulse: new b2_math_1.b2Vec2(),
};
/**
 * Friction joint definition.
 */
class b2FrictionJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_frictionJoint);
        /** The local anchor point relative to bodyA's origin. */
        this.localAnchorA = new b2_math_1.b2Vec2();
        /** The local anchor point relative to bodyB's origin. */
        this.localAnchorB = new b2_math_1.b2Vec2();
        /** The maximum friction force in N. */
        this.maxForce = 0;
        /** The maximum friction torque in N-m. */
        this.maxTorque = 0;
    }
    Initialize(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
        this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
    }
}
exports.b2FrictionJointDef = b2FrictionJointDef;
/**
 * Friction joint. This is used for top-down friction.
 * It provides 2D translational friction and angular friction.
 */
class b2FrictionJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b;
        super(def);
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        // Solver shared
        this.m_linearImpulse = new b2_math_1.b2Vec2();
        this.m_angularImpulse = 0;
        this.m_maxForce = 0;
        this.m_maxTorque = 0;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_rA = new b2_math_1.b2Vec2();
        this.m_rB = new b2_math_1.b2Vec2();
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_linearMass = new b2_math_1.b2Mat22();
        this.m_angularMass = 0;
        this.m_localAnchorA.Copy(def.localAnchorA);
        this.m_localAnchorB.Copy(def.localAnchorB);
        this.m_linearImpulse.SetZero();
        this.m_maxForce = (_a = def.maxForce) !== null && _a !== void 0 ? _a : 0;
        this.m_maxTorque = (_b = def.maxTorque) !== null && _b !== void 0 ? _b : 0;
    }
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB, lalcA, lalcB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        // Compute the effective mass matrix.
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        // J = [-I -r1_skew I r2_skew]
        //     [ 0       -1 0       1]
        // r_skew = [-ry; rx]
        // Matlab
        // K = [ mA+r1y^2*iA+mB+r2y^2*iB,  -r1y*iA*r1x-r2y*iB*r2x,          -r1y*iA-r2y*iB]
        //     [  -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB,           r1x*iA+r2x*iB]
        //     [          -r1y*iA-r2y*iB,           r1x*iA+r2x*iB,                   iA+iB]
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const K = this.m_linearMass;
        K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
        K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
        K.Inverse();
        this.m_angularMass = iA + iB;
        if (this.m_angularMass > 0) {
            this.m_angularMass = 1 / this.m_angularMass;
        }
        if (data.step.warmStarting) {
            // Scale impulses to support a variable time step.
            this.m_linearImpulse.Scale(data.step.dtRatio);
            this.m_angularImpulse *= data.step.dtRatio;
            const P = this.m_linearImpulse;
            vA.SubtractScaled(mA, P);
            wA -= iA * (b2_math_1.b2Vec2.Cross(this.m_rA, P) + this.m_angularImpulse);
            vB.AddScaled(mB, P);
            wB += iB * (b2_math_1.b2Vec2.Cross(this.m_rB, P) + this.m_angularImpulse);
        }
        else {
            this.m_linearImpulse.SetZero();
            this.m_angularImpulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const h = data.step.dt;
        // Solve angular friction
        {
            const Cdot = wB - wA;
            let impulse = -this.m_angularMass * Cdot;
            const oldImpulse = this.m_angularImpulse;
            const maxImpulse = h * this.m_maxTorque;
            this.m_angularImpulse = (0, b2_math_1.b2Clamp)(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_angularImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        // Solve linear friction
        {
            const { Cdot, impulse, oldImpulse } = temp;
            b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, b2_math_1.b2Vec2.s_t1), Cdot);
            b2_math_1.b2Mat22.MultiplyVec2(this.m_linearMass, Cdot, impulse).Negate();
            oldImpulse.Copy(this.m_linearImpulse);
            this.m_linearImpulse.Add(impulse);
            const maxImpulse = h * this.m_maxForce;
            if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
                this.m_linearImpulse.Normalize();
                this.m_linearImpulse.Scale(maxImpulse);
            }
            b2_math_1.b2Vec2.Subtract(this.m_linearImpulse, oldImpulse, impulse);
            vA.SubtractScaled(mA, impulse);
            wA -= iA * b2_math_1.b2Vec2.Cross(this.m_rA, impulse);
            vB.AddScaled(mB, impulse);
            wB += iB * b2_math_1.b2Vec2.Cross(this.m_rB, impulse);
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    SolvePositionConstraints(_data) {
        return true;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        out.x = inv_dt * this.m_linearImpulse.x;
        out.y = inv_dt * this.m_linearImpulse.y;
        return out;
    }
    GetReactionTorque(inv_dt) {
        return inv_dt * this.m_angularImpulse;
    }
    GetLocalAnchorA() {
        return this.m_localAnchorA;
    }
    GetLocalAnchorB() {
        return this.m_localAnchorB;
    }
    SetMaxForce(force) {
        // DEBUG: b2Assert(Number.isFinite(force) && force >= 0);
        this.m_maxForce = force;
    }
    GetMaxForce() {
        return this.m_maxForce;
    }
    SetMaxTorque(torque) {
        // DEBUG: b2Assert(Number.isFinite(torque) && torque >= 0);
        this.m_maxTorque = torque;
    }
    GetMaxTorque() {
        return this.m_maxTorque;
    }
}
exports.b2FrictionJoint = b2FrictionJoint;


/***/ }),

/***/ "2fSU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ShapeCast = exports.b2Distance = exports.b2Gjk = exports.b2ShapeCastOutput = exports.b2ShapeCastInput = exports.b2DistanceOutput = exports.b2DistanceInput = exports.b2SimplexCache = exports.b2DistanceProxy = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
/**
 * A distance proxy is used by the GJK algorithm.
 * It encapsulates any shape.
 */
class b2DistanceProxy {
    constructor() {
        this.m_buffer = (0, b2_common_1.b2MakeArray)(2, b2_math_1.b2Vec2);
        this.m_vertices = this.m_buffer;
        this.m_count = 0;
        this.m_radius = 0;
    }
    Copy(other) {
        if (other.m_vertices === other.m_buffer) {
            this.m_vertices = this.m_buffer;
            this.m_buffer[0].Copy(other.m_buffer[0]);
            this.m_buffer[1].Copy(other.m_buffer[1]);
        }
        else {
            this.m_vertices = other.m_vertices;
        }
        this.m_count = other.m_count;
        this.m_radius = other.m_radius;
        return this;
    }
    Reset() {
        this.m_vertices = this.m_buffer;
        this.m_count = 0;
        this.m_radius = 0;
        return this;
    }
    SetShape(shape, index) {
        shape.SetupDistanceProxy(this, index);
    }
    SetVerticesRadius(vertices, count, radius) {
        this.m_vertices = vertices;
        this.m_count = count;
        this.m_radius = radius;
    }
    GetSupport(d) {
        let bestIndex = 0;
        let bestValue = b2_math_1.b2Vec2.Dot(this.m_vertices[0], d);
        for (let i = 1; i < this.m_count; ++i) {
            const value = b2_math_1.b2Vec2.Dot(this.m_vertices[i], d);
            if (value > bestValue) {
                bestIndex = i;
                bestValue = value;
            }
        }
        return bestIndex;
    }
    GetSupportVertex(d) {
        let bestIndex = 0;
        let bestValue = b2_math_1.b2Vec2.Dot(this.m_vertices[0], d);
        for (let i = 1; i < this.m_count; ++i) {
            const value = b2_math_1.b2Vec2.Dot(this.m_vertices[i], d);
            if (value > bestValue) {
                bestIndex = i;
                bestValue = value;
            }
        }
        return this.m_vertices[bestIndex];
    }
    GetVertexCount() {
        return this.m_count;
    }
    GetVertex(index) {
        // DEBUG: b2Assert(0 <= index && index < this.m_count);
        return this.m_vertices[index];
    }
}
exports.b2DistanceProxy = b2DistanceProxy;
/**
 * Used to warm start b2Distance.
 * Set count to zero on first call.
 */
class b2SimplexCache {
    constructor() {
        /** Length or area */
        this.metric = 0;
        this.count = 0;
        /** Vertices on shape A */
        this.indexA = [0, 0, 0];
        /** Vertices on shape B */
        this.indexB = [0, 0, 0];
    }
    Reset() {
        this.metric = 0;
        this.count = 0;
        return this;
    }
}
exports.b2SimplexCache = b2SimplexCache;
/**
 * Input for b2Distance.
 * You have to option to use the shape radii
 * in the computation. Even
 */
class b2DistanceInput {
    constructor() {
        this.proxyA = new b2DistanceProxy();
        this.proxyB = new b2DistanceProxy();
        this.transformA = new b2_math_1.b2Transform();
        this.transformB = new b2_math_1.b2Transform();
        this.useRadii = false;
    }
    Reset() {
        this.proxyA.Reset();
        this.proxyB.Reset();
        this.transformA.SetIdentity();
        this.transformB.SetIdentity();
        this.useRadii = false;
        return this;
    }
}
exports.b2DistanceInput = b2DistanceInput;
/**
 * Output for b2Distance.
 */
class b2DistanceOutput {
    constructor() {
        /** Closest point on shapeA */
        this.pointA = new b2_math_1.b2Vec2();
        /** Closest point on shapeB */
        this.pointB = new b2_math_1.b2Vec2();
        this.distance = 0;
        /** Number of GJK iterations used */
        this.iterations = 0;
    }
    Reset() {
        this.pointA.SetZero();
        this.pointB.SetZero();
        this.distance = 0;
        this.iterations = 0;
        return this;
    }
}
exports.b2DistanceOutput = b2DistanceOutput;
/**
 * Input parameters for b2ShapeCast
 */
class b2ShapeCastInput {
    constructor() {
        this.proxyA = new b2DistanceProxy();
        this.proxyB = new b2DistanceProxy();
        this.transformA = new b2_math_1.b2Transform();
        this.transformB = new b2_math_1.b2Transform();
        this.translationB = new b2_math_1.b2Vec2();
    }
}
exports.b2ShapeCastInput = b2ShapeCastInput;
/**
 * Output results for b2ShapeCast
 */
class b2ShapeCastOutput {
    constructor() {
        this.point = new b2_math_1.b2Vec2();
        this.normal = new b2_math_1.b2Vec2();
        this.lambda = 0;
        this.iterations = 0;
    }
}
exports.b2ShapeCastOutput = b2ShapeCastOutput;
exports.b2Gjk = {
    calls: 0,
    iters: 0,
    maxIters: 0,
    reset() {
        this.calls = 0;
        this.iters = 0;
        this.maxIters = 0;
    },
};
class b2SimplexVertex {
    constructor() {
        this.wA = new b2_math_1.b2Vec2(); // support point in proxyA
        this.wB = new b2_math_1.b2Vec2(); // support point in proxyB
        this.w = new b2_math_1.b2Vec2(); // wB - wA
        this.a = 0; // barycentric coordinate for closest point
        this.indexA = 0; // wA index
        this.indexB = 0; // wB index
    }
    Copy(other) {
        this.wA.Copy(other.wA); // support point in proxyA
        this.wB.Copy(other.wB); // support point in proxyB
        this.w.Copy(other.w); // wB - wA
        this.a = other.a; // barycentric coordinate for closest point
        this.indexA = other.indexA; // wA index
        this.indexB = other.indexB; // wB index
        return this;
    }
}
class b2Simplex {
    constructor() {
        this.m_v1 = new b2SimplexVertex();
        this.m_v2 = new b2SimplexVertex();
        this.m_v3 = new b2SimplexVertex();
        this.m_count = 0;
        this.m_vertices = [this.m_v1, this.m_v2, this.m_v3];
    }
    ReadCache(cache, proxyA, transformA, proxyB, transformB) {
        // DEBUG: b2Assert(cache.count <= 3);
        // Copy data from cache.
        this.m_count = cache.count;
        const vertices = this.m_vertices;
        for (let i = 0; i < this.m_count; ++i) {
            const v = vertices[i];
            v.indexA = cache.indexA[i];
            v.indexB = cache.indexB[i];
            const wALocal = proxyA.GetVertex(v.indexA);
            const wBLocal = proxyB.GetVertex(v.indexB);
            b2_math_1.b2Transform.MultiplyVec2(transformA, wALocal, v.wA);
            b2_math_1.b2Transform.MultiplyVec2(transformB, wBLocal, v.wB);
            b2_math_1.b2Vec2.Subtract(v.wB, v.wA, v.w);
            v.a = 0;
        }
        // Compute the new simplex metric, if it is substantially different than
        // old metric then flush the simplex.
        if (this.m_count > 1) {
            const metric1 = cache.metric;
            const metric2 = this.GetMetric();
            if (metric2 < 0.5 * metric1 || 2 * metric1 < metric2 || metric2 < b2_common_1.b2_epsilon) {
                // Reset the simplex.
                this.m_count = 0;
            }
        }
        // If the cache is empty or invalid ...
        if (this.m_count === 0) {
            const v = vertices[0];
            v.indexA = 0;
            v.indexB = 0;
            const wALocal = proxyA.GetVertex(0);
            const wBLocal = proxyB.GetVertex(0);
            b2_math_1.b2Transform.MultiplyVec2(transformA, wALocal, v.wA);
            b2_math_1.b2Transform.MultiplyVec2(transformB, wBLocal, v.wB);
            b2_math_1.b2Vec2.Subtract(v.wB, v.wA, v.w);
            v.a = 1;
            this.m_count = 1;
        }
    }
    WriteCache(cache) {
        cache.metric = this.GetMetric();
        cache.count = this.m_count;
        const vertices = this.m_vertices;
        for (let i = 0; i < this.m_count; ++i) {
            cache.indexA[i] = vertices[i].indexA;
            cache.indexB[i] = vertices[i].indexB;
        }
    }
    GetSearchDirection(out) {
        switch (this.m_count) {
            case 1:
                return b2_math_1.b2Vec2.Negate(this.m_v1.w, out);
            case 2: {
                const e12 = b2_math_1.b2Vec2.Subtract(this.m_v2.w, this.m_v1.w, out);
                const sgn = b2_math_1.b2Vec2.Cross(e12, b2_math_1.b2Vec2.Negate(this.m_v1.w, b2_math_1.b2Vec2.s_t0));
                if (sgn > 0) {
                    // Origin is left of e12.
                    return b2_math_1.b2Vec2.CrossOneVec2(e12, out);
                }
                // Origin is right of e12.
                return b2_math_1.b2Vec2.CrossVec2One(e12, out);
            }
            default:
                // DEBUG: b2Assert(false);
                return out.SetZero();
        }
    }
    GetClosestPoint(out) {
        switch (this.m_count) {
            case 0:
                // DEBUG: b2Assert(false);
                return out.SetZero();
            case 1:
                return out.Copy(this.m_v1.w);
            case 2:
                return out.Set(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
            case 3:
                return out.SetZero();
            default:
                // DEBUG: b2Assert(false);
                return out.SetZero();
        }
    }
    GetWitnessPoints(pA, pB) {
        switch (this.m_count) {
            case 0:
                // DEBUG: b2Assert(false);
                break;
            case 1:
                pA.Copy(this.m_v1.wA);
                pB.Copy(this.m_v1.wB);
                break;
            case 2:
                pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
                pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
                pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
                pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                break;
            case 3:
                pB.x = pA.x =
                    this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
                pB.y = pA.y =
                    this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                break;
            default:
                // DEBUG: b2Assert(false);
                break;
        }
    }
    GetMetric() {
        switch (this.m_count) {
            case 0:
                // DEBUG: b2Assert(false);
                return 0;
            case 1:
                return 0;
            case 2:
                return b2_math_1.b2Vec2.Distance(this.m_v1.w, this.m_v2.w);
            case 3:
                return b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Subtract(this.m_v2.w, this.m_v1.w, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.Subtract(this.m_v3.w, this.m_v1.w, b2_math_1.b2Vec2.s_t1));
            default:
                // DEBUG: b2Assert(false);
                return 0;
        }
    }
    Solve2() {
        const w1 = this.m_v1.w;
        const w2 = this.m_v2.w;
        const e12 = b2_math_1.b2Vec2.Subtract(w2, w1, b2Simplex.s_e12);
        // w1 region
        const d12_2 = -b2_math_1.b2Vec2.Dot(w1, e12);
        if (d12_2 <= 0) {
            // a2 <= 0, so we clamp it to 0
            this.m_v1.a = 1;
            this.m_count = 1;
            return;
        }
        // w2 region
        const d12_1 = b2_math_1.b2Vec2.Dot(w2, e12);
        if (d12_1 <= 0) {
            // a1 <= 0, so we clamp it to 0
            this.m_v2.a = 1;
            this.m_count = 1;
            this.m_v1.Copy(this.m_v2);
            return;
        }
        // Must be in e12 region.
        const inv_d12 = 1 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2;
    }
    Solve3() {
        const w1 = this.m_v1.w;
        const w2 = this.m_v2.w;
        const w3 = this.m_v3.w;
        // Edge12
        // [1      1     ][a1] = [1]
        // [w1.e12 w2.e12][a2] = [0]
        // a3 = 0
        const e12 = b2_math_1.b2Vec2.Subtract(w2, w1, b2Simplex.s_e12);
        const w1e12 = b2_math_1.b2Vec2.Dot(w1, e12);
        const w2e12 = b2_math_1.b2Vec2.Dot(w2, e12);
        const d12_1 = w2e12;
        const d12_2 = -w1e12;
        // Edge13
        // [1      1     ][a1] = [1]
        // [w1.e13 w3.e13][a3] = [0]
        // a2 = 0
        const e13 = b2_math_1.b2Vec2.Subtract(w3, w1, b2Simplex.s_e13);
        const w1e13 = b2_math_1.b2Vec2.Dot(w1, e13);
        const w3e13 = b2_math_1.b2Vec2.Dot(w3, e13);
        const d13_1 = w3e13;
        const d13_2 = -w1e13;
        // Edge23
        // [1      1     ][a2] = [1]
        // [w2.e23 w3.e23][a3] = [0]
        // a1 = 0
        const e23 = b2_math_1.b2Vec2.Subtract(w3, w2, b2Simplex.s_e23);
        const w2e23 = b2_math_1.b2Vec2.Dot(w2, e23);
        const w3e23 = b2_math_1.b2Vec2.Dot(w3, e23);
        const d23_1 = w3e23;
        const d23_2 = -w2e23;
        // Triangle123
        const n123 = b2_math_1.b2Vec2.Cross(e12, e13);
        const d123_1 = n123 * b2_math_1.b2Vec2.Cross(w2, w3);
        const d123_2 = n123 * b2_math_1.b2Vec2.Cross(w3, w1);
        const d123_3 = n123 * b2_math_1.b2Vec2.Cross(w1, w2);
        // w1 region
        if (d12_2 <= 0 && d13_2 <= 0) {
            this.m_v1.a = 1;
            this.m_count = 1;
            return;
        }
        // e12
        if (d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
            const inv_d12 = 1 / (d12_1 + d12_2);
            this.m_v1.a = d12_1 * inv_d12;
            this.m_v2.a = d12_2 * inv_d12;
            this.m_count = 2;
            return;
        }
        // e13
        if (d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
            const inv_d13 = 1 / (d13_1 + d13_2);
            this.m_v1.a = d13_1 * inv_d13;
            this.m_v3.a = d13_2 * inv_d13;
            this.m_count = 2;
            this.m_v2.Copy(this.m_v3);
            return;
        }
        // w2 region
        if (d12_1 <= 0 && d23_2 <= 0) {
            this.m_v2.a = 1;
            this.m_count = 1;
            this.m_v1.Copy(this.m_v2);
            return;
        }
        // w3 region
        if (d13_1 <= 0 && d23_1 <= 0) {
            this.m_v3.a = 1;
            this.m_count = 1;
            this.m_v1.Copy(this.m_v3);
            return;
        }
        // e23
        if (d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
            const inv_d23 = 1 / (d23_1 + d23_2);
            this.m_v2.a = d23_1 * inv_d23;
            this.m_v3.a = d23_2 * inv_d23;
            this.m_count = 2;
            this.m_v1.Copy(this.m_v3);
            return;
        }
        // Must be in triangle123
        const inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
        this.m_v1.a = d123_1 * inv_d123;
        this.m_v2.a = d123_2 * inv_d123;
        this.m_v3.a = d123_3 * inv_d123;
        this.m_count = 3;
    }
}
b2Simplex.s_e12 = new b2_math_1.b2Vec2();
b2Simplex.s_e13 = new b2_math_1.b2Vec2();
b2Simplex.s_e23 = new b2_math_1.b2Vec2();
const b2Distance_s_simplex = new b2Simplex();
const b2Distance_s_saveA = [0, 0, 0];
const b2Distance_s_saveB = [0, 0, 0];
const b2Distance_s_p = new b2_math_1.b2Vec2();
const b2Distance_s_d = new b2_math_1.b2Vec2();
const b2Distance_s_normal = new b2_math_1.b2Vec2();
const b2Distance_s_supportA = new b2_math_1.b2Vec2();
const b2Distance_s_supportB = new b2_math_1.b2Vec2();
function b2Distance(output, cache, input) {
    ++exports.b2Gjk.calls;
    const { proxyA, proxyB, transformA, transformB } = input;
    // Initialize the simplex.
    const simplex = b2Distance_s_simplex;
    simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
    // Get simplex vertices as an array.
    const vertices = simplex.m_vertices;
    const k_maxIters = 20;
    // These store the vertices of the last simplex so that we
    // can check for duplicates and prevent cycling.
    const saveA = b2Distance_s_saveA;
    const saveB = b2Distance_s_saveB;
    let saveCount = 0;
    // Main iteration loop.
    let iter = 0;
    while (iter < k_maxIters) {
        // Copy simplex so we can identify duplicates.
        saveCount = simplex.m_count;
        for (let i = 0; i < saveCount; ++i) {
            saveA[i] = vertices[i].indexA;
            saveB[i] = vertices[i].indexB;
        }
        switch (simplex.m_count) {
            case 1:
                break;
            case 2:
                simplex.Solve2();
                break;
            case 3:
                simplex.Solve3();
                break;
            // DEBUG: default:
            // DEBUG: b2Assert(false);
        }
        // If we have 3 points, then the origin is in the corresponding triangle.
        if (simplex.m_count === 3) {
            break;
        }
        // Get search direction.
        const d = simplex.GetSearchDirection(b2Distance_s_d);
        // Ensure the search direction is numerically fit.
        if (d.LengthSquared() < b2_common_1.b2_epsilon_sq) {
            // The origin is probably contained by a line segment
            // or triangle. Thus the shapes are overlapped.
            // We can't return zero here even though there may be overlap.
            // In case the simplex is a point, segment, or triangle it is difficult
            // to determine if the origin is contained in the CSO or very close to it.
            break;
        }
        // Compute a tentative new simplex vertex using support points.
        const vertex = vertices[simplex.m_count];
        vertex.indexA = proxyA.GetSupport(b2_math_1.b2Rot.TransposeMultiplyVec2(transformA.q, b2_math_1.b2Vec2.Negate(d, b2_math_1.b2Vec2.s_t0), b2Distance_s_supportA));
        b2_math_1.b2Transform.MultiplyVec2(transformA, proxyA.GetVertex(vertex.indexA), vertex.wA);
        vertex.indexB = proxyB.GetSupport(b2_math_1.b2Rot.TransposeMultiplyVec2(transformB.q, d, b2Distance_s_supportB));
        b2_math_1.b2Transform.MultiplyVec2(transformB, proxyB.GetVertex(vertex.indexB), vertex.wB);
        b2_math_1.b2Vec2.Subtract(vertex.wB, vertex.wA, vertex.w);
        // Iteration count is equated to the number of support point calls.
        ++iter;
        ++exports.b2Gjk.iters;
        // Check for duplicate support points. This is the main termination criteria.
        let duplicate = false;
        for (let i = 0; i < saveCount; ++i) {
            if (vertex.indexA === saveA[i] && vertex.indexB === saveB[i]) {
                duplicate = true;
                break;
            }
        }
        // If we found a duplicate support point we must exit to avoid cycling.
        if (duplicate) {
            break;
        }
        // New vertex is ok and needed.
        ++simplex.m_count;
    }
    exports.b2Gjk.maxIters = Math.max(exports.b2Gjk.maxIters, iter);
    // Prepare output.
    simplex.GetWitnessPoints(output.pointA, output.pointB);
    output.distance = b2_math_1.b2Vec2.Distance(output.pointA, output.pointB);
    output.iterations = iter;
    // Cache the simplex.
    simplex.WriteCache(cache);
    // Apply radii if requested.
    if (input.useRadii) {
        const rA = proxyA.m_radius;
        const rB = proxyB.m_radius;
        if (output.distance > rA + rB && output.distance > b2_common_1.b2_epsilon) {
            // Shapes are still no overlapped.
            // Move the witness points to the outer surface.
            output.distance -= rA + rB;
            const normal = b2_math_1.b2Vec2.Subtract(output.pointB, output.pointA, b2Distance_s_normal);
            normal.Normalize();
            output.pointA.AddScaled(rA, normal);
            output.pointB.SubtractScaled(rB, normal);
        }
        else {
            // Shapes are overlapped when radii are considered.
            // Move the witness points to the middle.
            const p = b2_math_1.b2Vec2.Mid(output.pointA, output.pointB, b2Distance_s_p);
            output.pointA.Copy(p);
            output.pointB.Copy(p);
            output.distance = 0;
        }
    }
}
exports.b2Distance = b2Distance;
const b2ShapeCast_s_n = new b2_math_1.b2Vec2();
const b2ShapeCast_s_simplex = new b2Simplex();
const b2ShapeCast_s_wA = new b2_math_1.b2Vec2();
const b2ShapeCast_s_wB = new b2_math_1.b2Vec2();
const b2ShapeCast_s_v = new b2_math_1.b2Vec2();
const b2ShapeCast_s_p = new b2_math_1.b2Vec2();
const b2ShapeCast_s_pointA = new b2_math_1.b2Vec2();
const b2ShapeCast_s_pointB = new b2_math_1.b2Vec2();
/**
 * Perform a linear shape cast of shape B moving and shape A fixed. Determines the hit point, normal, and translation fraction.
 * GJK-raycast
 * Algorithm by Gino van den Bergen.
 * "Smooth Mesh Contacts with GJK" in Game Physics Pearls. 2010
 */
function b2ShapeCast(output, input) {
    output.iterations = 0;
    output.lambda = 1;
    output.normal.SetZero();
    output.point.SetZero();
    const { proxyA, proxyB } = input;
    const radiusA = Math.max(proxyA.m_radius, b2_common_1.b2_polygonRadius);
    const radiusB = Math.max(proxyB.m_radius, b2_common_1.b2_polygonRadius);
    const radius = radiusA + radiusB;
    const xfA = input.transformA;
    const xfB = input.transformB;
    const r = input.translationB;
    const n = b2ShapeCast_s_n.SetZero();
    let lambda = 0;
    // Initial simplex
    const simplex = b2ShapeCast_s_simplex;
    simplex.m_count = 0;
    // Get simplex vertices as an array.
    // b2SimplexVertex* vertices = &simplex.m_v1;
    const vertices = simplex.m_vertices;
    // Get support point in -r direction
    let indexA = proxyA.GetSupport(b2_math_1.b2Rot.TransposeMultiplyVec2(xfA.q, b2_math_1.b2Vec2.Negate(r, b2_math_1.b2Vec2.s_t1), b2_math_1.b2Vec2.s_t0));
    let wA = b2_math_1.b2Transform.MultiplyVec2(xfA, proxyA.GetVertex(indexA), b2ShapeCast_s_wA);
    let indexB = proxyB.GetSupport(b2_math_1.b2Rot.TransposeMultiplyVec2(xfB.q, r, b2_math_1.b2Vec2.s_t0));
    let wB = b2_math_1.b2Transform.MultiplyVec2(xfB, proxyB.GetVertex(indexB), b2ShapeCast_s_wB);
    const v = b2_math_1.b2Vec2.Subtract(wA, wB, b2ShapeCast_s_v);
    // Sigma is the target distance between polygons
    const sigma = Math.max(b2_common_1.b2_polygonRadius, radius - b2_common_1.b2_polygonRadius);
    const tolerance = 0.5 * b2_common_1.b2_linearSlop;
    // Main iteration loop.
    const k_maxIters = 20;
    let iter = 0;
    while (iter < k_maxIters && v.Length() - sigma > tolerance) {
        // DEBUG: b2Assert(simplex.m_count < 3);
        output.iterations += 1;
        // Support in direction -v (A - B)
        indexA = proxyA.GetSupport(b2_math_1.b2Rot.TransposeMultiplyVec2(xfA.q, b2_math_1.b2Vec2.Negate(v, b2_math_1.b2Vec2.s_t1), b2_math_1.b2Vec2.s_t0));
        wA = b2_math_1.b2Transform.MultiplyVec2(xfA, proxyA.GetVertex(indexA), b2ShapeCast_s_wA);
        indexB = proxyB.GetSupport(b2_math_1.b2Rot.TransposeMultiplyVec2(xfB.q, v, b2_math_1.b2Vec2.s_t0));
        wB = b2_math_1.b2Transform.MultiplyVec2(xfB, proxyB.GetVertex(indexB), b2ShapeCast_s_wB);
        const p = b2_math_1.b2Vec2.Subtract(wA, wB, b2ShapeCast_s_p);
        // -v is a normal at p
        v.Normalize();
        // Intersect ray with plane
        const vp = b2_math_1.b2Vec2.Dot(v, p);
        const vr = b2_math_1.b2Vec2.Dot(v, r);
        if (vp - sigma > lambda * vr) {
            if (vr <= 0) {
                return false;
            }
            lambda = (vp - sigma) / vr;
            if (lambda > 1) {
                return false;
            }
            b2_math_1.b2Vec2.Negate(v, n);
            simplex.m_count = 0;
        }
        // Reverse simplex since it works with B - A.
        // Shift by lambda * r because we want the closest point to the current clip point.
        // Note that the support point p is not shifted because we want the plane equation
        // to be formed in unshifted space.
        const vertex = vertices[simplex.m_count];
        vertex.indexA = indexB;
        b2_math_1.b2Vec2.AddScaled(wB, lambda, r, vertex.wA);
        vertex.indexB = indexA;
        vertex.wB.Copy(wA);
        b2_math_1.b2Vec2.Subtract(vertex.wB, vertex.wA, vertex.w);
        vertex.a = 1;
        simplex.m_count += 1;
        switch (simplex.m_count) {
            case 1:
                break;
            case 2:
                simplex.Solve2();
                break;
            case 3:
                simplex.Solve3();
                break;
            // DEBUG: default:
            // DEBUG: b2Assert(false);
        }
        // If we have 3 points, then the origin is in the corresponding triangle.
        if (simplex.m_count === 3) {
            // Overlap
            return false;
        }
        // Get search direction.
        simplex.GetClosestPoint(v);
        // Iteration count is equated to the number of support point calls.
        ++iter;
    }
    if (iter === 0) {
        // Initial overlap
        return false;
    }
    // Prepare output.
    const pointA = b2ShapeCast_s_pointA;
    const pointB = b2ShapeCast_s_pointB;
    simplex.GetWitnessPoints(pointA, pointB);
    if (v.LengthSquared() > 0) {
        b2_math_1.b2Vec2.Negate(v, n);
        n.Normalize();
    }
    b2_math_1.b2Vec2.AddScaled(pointA, radiusA, n, output.point);
    output.normal.Copy(n);
    output.lambda = lambda;
    output.iterations = iter;
    return true;
}
exports.b2ShapeCast = b2ShapeCast;


/***/ }),

/***/ "4xZg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Body = exports.b2BodyType = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_math_1 = __webpack_require__("xKh6");
const b2_shape_1 = __webpack_require__("UjSx");
const b2_fixture_1 = __webpack_require__("By+T");
const b2_common_1 = __webpack_require__("UJxA");
/**
 * The body type.
 * static: zero mass, zero velocity, may be manually moved
 * kinematic: zero mass, non-zero velocity set by user, moved by solver
 * dynamic: positive mass, non-zero velocity determined by forces, moved by solver
 */
var b2BodyType;
(function (b2BodyType) {
    b2BodyType[b2BodyType["b2_staticBody"] = 0] = "b2_staticBody";
    b2BodyType[b2BodyType["b2_kinematicBody"] = 1] = "b2_kinematicBody";
    b2BodyType[b2BodyType["b2_dynamicBody"] = 2] = "b2_dynamicBody";
})(b2BodyType = exports.b2BodyType || (exports.b2BodyType = {}));
/**
 * A rigid body. These are created via b2World::CreateBody.
 */
class b2Body {
    /** @internal */
    constructor(bd, world) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        /** @internal */
        this.m_type = b2BodyType.b2_staticBody;
        /** @internal */
        this.m_islandFlag = false;
        /** @internal */
        this.m_awakeFlag = false;
        /** @internal */
        this.m_autoSleepFlag = false;
        /** @internal */
        this.m_bulletFlag = false;
        /** @internal */
        this.m_fixedRotationFlag = false;
        /** @internal */
        this.m_enabledFlag = false;
        /** @internal */
        this.m_toiFlag = false;
        /** @internal */
        this.m_islandIndex = 0;
        /** @internal */
        this.m_xf = new b2_math_1.b2Transform(); // the body origin transform
        /** @internal */
        this.m_sweep = new b2_math_1.b2Sweep(); // the swept motion for CCD
        /** @internal */
        this.m_linearVelocity = new b2_math_1.b2Vec2();
        /** @internal */
        this.m_angularVelocity = 0;
        /** @internal */
        this.m_force = new b2_math_1.b2Vec2();
        /** @internal */
        this.m_torque = 0;
        /** @internal */
        this.m_prev = null;
        /** @internal */
        this.m_next = null;
        /** @internal */
        this.m_fixtureList = null;
        /** @internal */
        this.m_fixtureCount = 0;
        /** @internal */
        this.m_jointList = null;
        /** @internal */
        this.m_contactList = null;
        /** @internal */
        this.m_mass = 1;
        /** @internal */
        this.m_invMass = 1;
        /**
         * Rotational inertia about the center of mass.
         * @internal
         */
        this.m_I = 0;
        /** @internal */
        this.m_invI = 0;
        /** @internal */
        this.m_linearDamping = 0;
        /** @internal */
        this.m_angularDamping = 0;
        /** @internal */
        this.m_gravityScale = 1;
        /** @internal */
        this.m_sleepTime = 0;
        /** @internal */
        this.m_userData = null;
        this.m_bulletFlag = (_a = bd.bullet) !== null && _a !== void 0 ? _a : false;
        this.m_fixedRotationFlag = (_b = bd.fixedRotation) !== null && _b !== void 0 ? _b : false;
        this.m_autoSleepFlag = (_c = bd.allowSleep) !== null && _c !== void 0 ? _c : true;
        if (((_d = bd.awake) !== null && _d !== void 0 ? _d : true) && ((_e = bd.type) !== null && _e !== void 0 ? _e : b2BodyType.b2_staticBody) !== b2BodyType.b2_staticBody) {
            this.m_awakeFlag = true;
        }
        this.m_enabledFlag = (_f = bd.enabled) !== null && _f !== void 0 ? _f : true;
        this.m_world = world;
        this.m_xf.p.Copy((_g = bd.position) !== null && _g !== void 0 ? _g : b2_math_1.b2Vec2.ZERO);
        this.m_xf.q.Set((_h = bd.angle) !== null && _h !== void 0 ? _h : 0);
        this.m_sweep.localCenter.SetZero();
        this.m_sweep.c0.Copy(this.m_xf.p);
        this.m_sweep.c.Copy(this.m_xf.p);
        this.m_sweep.a0 = this.m_sweep.a = this.m_xf.q.GetAngle();
        this.m_sweep.alpha0 = 0;
        this.m_linearVelocity.Copy((_j = bd.linearVelocity) !== null && _j !== void 0 ? _j : b2_math_1.b2Vec2.ZERO);
        this.m_angularVelocity = (_k = bd.angularVelocity) !== null && _k !== void 0 ? _k : 0;
        this.m_linearDamping = (_l = bd.linearDamping) !== null && _l !== void 0 ? _l : 0;
        this.m_angularDamping = (_m = bd.angularDamping) !== null && _m !== void 0 ? _m : 0;
        this.m_gravityScale = (_o = bd.gravityScale) !== null && _o !== void 0 ? _o : 1;
        this.m_force.SetZero();
        this.m_torque = 0;
        this.m_sleepTime = 0;
        this.m_type = (_p = bd.type) !== null && _p !== void 0 ? _p : b2BodyType.b2_staticBody;
        this.m_mass = 0;
        this.m_invMass = 0;
        this.m_I = 0;
        this.m_invI = 0;
        this.m_userData = bd.userData;
        this.m_fixtureList = null;
        this.m_fixtureCount = 0;
    }
    /**
     * Creates a fixture and attach it to this body. Use this function if you need
     * to set some fixture parameters, like friction. Otherwise you can create the
     * fixture directly from a shape.
     * If the density is non-zero, this function automatically updates the mass of the body.
     * Contacts are not created until the next time step.
     *
     * @param def The fixture definition.
     * @warning This function is locked during callbacks.
     */
    CreateFixture(def) {
        (0, b2_common_1.b2Assert)(!this.m_world.IsLocked());
        const fixture = new b2_fixture_1.b2Fixture(this, def);
        if (this.m_enabledFlag) {
            const broadPhase = this.m_world.m_contactManager.m_broadPhase;
            fixture.CreateProxies(broadPhase, this.m_xf);
        }
        fixture.m_next = this.m_fixtureList;
        this.m_fixtureList = fixture;
        ++this.m_fixtureCount;
        // Adjust mass properties if needed.
        if (fixture.m_density > 0) {
            this.ResetMassData();
        }
        // Let the world know we have a new fixture. This will cause new contacts
        // to be created at the beginning of the next time step.
        this.m_world.m_newContacts = true;
        return fixture;
    }
    /**
     * Destroy a fixture. This removes the fixture from the broad-phase and
     * destroys all contacts associated with this fixture. This will
     * automatically adjust the mass of the body if the body is dynamic and the
     * fixture has positive density.
     * All fixtures attached to a body are implicitly destroyed when the body is destroyed.
     *
     * @param fixture The fixture to be removed.
     * @warning This function is locked during callbacks.
     */
    DestroyFixture(fixture) {
        (0, b2_common_1.b2Assert)(!this.m_world.IsLocked());
        // DEBUG: b2Assert(fixture.m_body === this);
        // Remove the fixture from this body's singly linked list.
        // DEBUG: b2Assert(this.m_fixtureCount > 0);
        let node = this.m_fixtureList;
        let ppF = null;
        // DEBUG: let found = false;
        while (node !== null) {
            if (node === fixture) {
                if (ppF) {
                    ppF.m_next = fixture.m_next;
                }
                else {
                    this.m_fixtureList = fixture.m_next;
                }
                // DEBUG: found = true;
                break;
            }
            ppF = node;
            node = node.m_next;
        }
        // You tried to remove a shape that is not attached to this body.
        // DEBUG: b2Assert(found);
        // Destroy any contacts associated with the fixture.
        let edge = this.m_contactList;
        while (edge) {
            const c = edge.contact;
            edge = edge.next;
            const fixtureA = c.GetFixtureA();
            const fixtureB = c.GetFixtureB();
            if (fixture === fixtureA || fixture === fixtureB) {
                // This destroys the contact and removes it from
                // this body's contact list.
                this.m_world.m_contactManager.Destroy(c);
            }
        }
        if (this.m_enabledFlag) {
            const broadPhase = this.m_world.m_contactManager.m_broadPhase;
            fixture.DestroyProxies(broadPhase);
        }
        // fixture.m_body = null;
        fixture.m_next = null;
        --this.m_fixtureCount;
        // Reset the mass data.
        this.ResetMassData();
    }
    /**
     * Set the position of the body's origin and rotation.
     * This breaks any contacts and wakes the other bodies.
     * Manipulating a body's transform may cause non-physical behavior.
     *
     * @param position The world position of the body's local origin.
     * @param angle The world rotation in radians.
     */
    SetTransformVec(position, angle) {
        this.SetTransformXY(position.x, position.y, angle);
    }
    SetTransformXY(x, y, angle) {
        (0, b2_common_1.b2Assert)(!this.m_world.IsLocked());
        this.m_xf.q.Set(angle);
        this.m_xf.p.Set(x, y);
        b2_math_1.b2Transform.MultiplyVec2(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
        this.m_sweep.a = angle;
        this.m_sweep.c0.Copy(this.m_sweep.c);
        this.m_sweep.a0 = angle;
        const broadPhase = this.m_world.m_contactManager.m_broadPhase;
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            f.Synchronize(broadPhase, this.m_xf, this.m_xf);
        }
        // Check for new contacts the next step
        this.m_world.m_newContacts = true;
    }
    SetTransform(xf) {
        this.SetTransformVec(xf.p, xf.GetAngle());
    }
    /**
     * Get the body transform for the body's origin.
     *
     * @returns The world transform of the body's origin.
     */
    GetTransform() {
        return this.m_xf;
    }
    /**
     * Get the world body origin position.
     *
     * @returns The world position of the body's origin.
     */
    GetPosition() {
        return this.m_xf.p;
    }
    /**
     * Get the angle in radians.
     *
     * @returns The current world rotation angle in radians.
     */
    GetAngle() {
        return this.m_sweep.a;
    }
    SetAngle(angle) {
        this.SetTransformVec(this.GetPosition(), angle);
    }
    /**
     * Get the world position of the center of mass.
     */
    GetWorldCenter() {
        return this.m_sweep.c;
    }
    /**
     * Get the local position of the center of mass.
     */
    GetLocalCenter() {
        return this.m_sweep.localCenter;
    }
    /**
     * Set the linear velocity of the center of mass.
     *
     * @param v The new linear velocity of the center of mass.
     */
    SetLinearVelocity(v) {
        if (this.m_type === b2BodyType.b2_staticBody) {
            return;
        }
        if (b2_math_1.b2Vec2.Dot(v, v) > 0) {
            this.SetAwake(true);
        }
        this.m_linearVelocity.Copy(v);
    }
    /**
     * Get the linear velocity of the center of mass.
     *
     * @returns The linear velocity of the center of mass.
     */
    GetLinearVelocity() {
        return this.m_linearVelocity;
    }
    /**
     * Set the angular velocity.
     *
     * @param omega The new angular velocity in radians/second.
     */
    SetAngularVelocity(w) {
        if (this.m_type === b2BodyType.b2_staticBody) {
            return;
        }
        if (w * w > 0) {
            this.SetAwake(true);
        }
        this.m_angularVelocity = w;
    }
    /**
     * Get the angular velocity.
     *
     * @returns The angular velocity in radians/second.
     */
    GetAngularVelocity() {
        return this.m_angularVelocity;
    }
    /**
     * Apply a force at a world point. If the force is not
     * applied at the center of mass, it will generate a torque and
     * affect the angular velocity. This wakes up the body.
     *
     * @param force The world force vector, usually in Newtons (N).
     * @param point The world position of the point of application.
     * @param wake Also wake up the body
     */
    ApplyForce(force, point, wake = true) {
        if (this.m_type !== b2BodyType.b2_dynamicBody) {
            return;
        }
        if (wake && !this.m_awakeFlag) {
            this.SetAwake(true);
        }
        // Don't accumulate a force if the body is sleeping
        if (this.m_awakeFlag) {
            this.m_force.x += force.x;
            this.m_force.y += force.y;
            this.m_torque += (point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x;
        }
    }
    /**
     * Apply a force to the center of mass. This wakes up the body.
     *
     * @param force The world force vector, usually in Newtons (N).
     * @param wake Also wake up the body
     */
    ApplyForceToCenter(force, wake = true) {
        if (this.m_type !== b2BodyType.b2_dynamicBody) {
            return;
        }
        if (wake && !this.m_awakeFlag) {
            this.SetAwake(true);
        }
        // Don't accumulate a force if the body is sleeping
        if (this.m_awakeFlag) {
            this.m_force.x += force.x;
            this.m_force.y += force.y;
        }
    }
    /**
     * Apply a torque. This affects the angular velocity
     * without affecting the linear velocity of the center of mass.
     *
     * @param torque About the z-axis (out of the screen), usually in N-m.
     * @param wake Also wake up the body
     */
    ApplyTorque(torque, wake = true) {
        if (this.m_type !== b2BodyType.b2_dynamicBody) {
            return;
        }
        if (wake && !this.m_awakeFlag) {
            this.SetAwake(true);
        }
        // Don't accumulate a force if the body is sleeping
        if (this.m_awakeFlag) {
            this.m_torque += torque;
        }
    }
    /**
     * Apply an impulse at a point. This immediately modifies the velocity.
     * It also modifies the angular velocity if the point of application
     * is not at the center of mass. This wakes up the body.
     *
     * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
     * @param point The world position of the point of application.
     * @param wake Also wake up the body
     */
    ApplyLinearImpulse(impulse, point, wake = true) {
        if (this.m_type !== b2BodyType.b2_dynamicBody) {
            return;
        }
        if (wake && !this.m_awakeFlag) {
            this.SetAwake(true);
        }
        // Don't accumulate velocity if the body is sleeping
        if (this.m_awakeFlag) {
            this.m_linearVelocity.x += this.m_invMass * impulse.x;
            this.m_linearVelocity.y += this.m_invMass * impulse.y;
            this.m_angularVelocity +=
                this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
        }
    }
    /**
     * Apply an impulse at the center of gravity. This immediately modifies the velocity.
     *
     * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
     * @param wake Also wake up the body
     */
    ApplyLinearImpulseToCenter(impulse, wake = true) {
        if (this.m_type !== b2BodyType.b2_dynamicBody) {
            return;
        }
        if (wake && !this.m_awakeFlag) {
            this.SetAwake(true);
        }
        // Don't accumulate velocity if the body is sleeping
        if (this.m_awakeFlag) {
            this.m_linearVelocity.x += this.m_invMass * impulse.x;
            this.m_linearVelocity.y += this.m_invMass * impulse.y;
        }
    }
    /**
     * Apply an angular impulse.
     *
     * @param impulse The angular impulse in units of kg*m*m/s
     * @param wake Also wake up the body
     */
    ApplyAngularImpulse(impulse, wake = true) {
        if (this.m_type !== b2BodyType.b2_dynamicBody) {
            return;
        }
        if (wake && !this.m_awakeFlag) {
            this.SetAwake(true);
        }
        // Don't accumulate velocity if the body is sleeping
        if (this.m_awakeFlag) {
            this.m_angularVelocity += this.m_invI * impulse;
        }
    }
    /**
     * Get the total mass of the body.
     *
     * @returns The mass, usually in kilograms (kg).
     */
    GetMass() {
        return this.m_mass;
    }
    /**
     * Get the rotational inertia of the body about the local origin.
     *
     * @returns The rotational inertia, usually in kg-m^2.
     */
    GetInertia() {
        return this.m_I + this.m_mass * b2_math_1.b2Vec2.Dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
    }
    /**
     * Get the mass data of the body.
     *
     * @returns A struct containing the mass, inertia and center of the body.
     */
    GetMassData(data) {
        data.mass = this.m_mass;
        data.I = this.m_I + this.m_mass * b2_math_1.b2Vec2.Dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
        data.center.Copy(this.m_sweep.localCenter);
        return data;
    }
    /**
     * Set the mass properties to override the mass properties of the fixtures.
     * Note that this changes the center of mass position.
     * Note that creating or destroying fixtures can also alter the mass.
     * This function has no effect if the body isn't dynamic.
     *
     * @param massData The mass properties.
     */
    SetMassData(massData) {
        (0, b2_common_1.b2Assert)(!this.m_world.IsLocked());
        if (this.m_type !== b2BodyType.b2_dynamicBody) {
            return;
        }
        this.m_invMass = 0;
        this.m_I = 0;
        this.m_invI = 0;
        this.m_mass = massData.mass;
        if (this.m_mass <= 0) {
            this.m_mass = 1;
        }
        this.m_invMass = 1 / this.m_mass;
        if (massData.I > 0 && !this.m_fixedRotationFlag) {
            this.m_I = massData.I - this.m_mass * b2_math_1.b2Vec2.Dot(massData.center, massData.center);
            // DEBUG: b2Assert(this.m_I > 0);
            this.m_invI = 1 / this.m_I;
        }
        // Move center of mass.
        const oldCenter = b2Body.SetMassData_s_oldCenter.Copy(this.m_sweep.c);
        this.m_sweep.localCenter.Copy(massData.center);
        b2_math_1.b2Transform.MultiplyVec2(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
        this.m_sweep.c0.Copy(this.m_sweep.c);
        // Update center of mass velocity.
        b2_math_1.b2Vec2.AddCrossScalarVec2(this.m_linearVelocity, this.m_angularVelocity, b2_math_1.b2Vec2.Subtract(this.m_sweep.c, oldCenter, b2_math_1.b2Vec2.s_t0), this.m_linearVelocity);
    }
    /**
     * This resets the mass properties to the sum of the mass properties of the fixtures.
     * This normally does not need to be called unless you called SetMassData to override
     * the mass and you later want to reset the mass.
     */
    ResetMassData() {
        // Compute mass data from shapes. Each shape has its own density.
        this.m_mass = 0;
        this.m_invMass = 0;
        this.m_I = 0;
        this.m_invI = 0;
        this.m_sweep.localCenter.SetZero();
        // Static and kinematic bodies have zero mass.
        if (this.m_type === b2BodyType.b2_staticBody || this.m_type === b2BodyType.b2_kinematicBody) {
            this.m_sweep.c0.Copy(this.m_xf.p);
            this.m_sweep.c.Copy(this.m_xf.p);
            this.m_sweep.a0 = this.m_sweep.a;
            return;
        }
        // DEBUG: b2Assert(this.m_type === b2BodyType.b2_dynamicBody);
        // Accumulate mass over all fixtures.
        const localCenter = b2Body.ResetMassData_s_localCenter.SetZero();
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            if (f.m_density === 0) {
                continue;
            }
            const massData = f.GetMassData(b2Body.ResetMassData_s_massData);
            this.m_mass += massData.mass;
            localCenter.AddScaled(massData.mass, massData.center);
            this.m_I += massData.I;
        }
        // Compute center of mass.
        if (this.m_mass > 0) {
            this.m_invMass = 1 / this.m_mass;
            localCenter.Scale(this.m_invMass);
        }
        if (this.m_I > 0 && !this.m_fixedRotationFlag) {
            // Center the inertia about the center of mass.
            this.m_I -= this.m_mass * b2_math_1.b2Vec2.Dot(localCenter, localCenter);
            // DEBUG: b2Assert(this.m_I > 0);
            this.m_invI = 1 / this.m_I;
        }
        else {
            this.m_I = 0;
            this.m_invI = 0;
        }
        // Move center of mass.
        const oldCenter = b2Body.ResetMassData_s_oldCenter.Copy(this.m_sweep.c);
        this.m_sweep.localCenter.Copy(localCenter);
        b2_math_1.b2Transform.MultiplyVec2(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
        this.m_sweep.c0.Copy(this.m_sweep.c);
        // Update center of mass velocity.
        b2_math_1.b2Vec2.AddCrossScalarVec2(this.m_linearVelocity, this.m_angularVelocity, b2_math_1.b2Vec2.Subtract(this.m_sweep.c, oldCenter, b2_math_1.b2Vec2.s_t0), this.m_linearVelocity);
    }
    /**
     * Get the world coordinates of a point given the local coordinates.
     *
     * @param localPoint A point on the body measured relative the the body's origin.
     * @returns The same point expressed in world coordinates.
     */
    GetWorldPoint(localPoint, out) {
        return b2_math_1.b2Transform.MultiplyVec2(this.m_xf, localPoint, out);
    }
    /**
     * Get the world coordinates of a vector given the local coordinates.
     *
     * @param localVector A vector fixed in the body.
     * @returns The same vector expressed in world coordinates.
     */
    GetWorldVector(localVector, out) {
        return b2_math_1.b2Rot.MultiplyVec2(this.m_xf.q, localVector, out);
    }
    /**
     * Gets a local point relative to the body's origin given a world point.
     *
     * @param a Point in world coordinates.
     * @returns The corresponding local point relative to the body's origin.
     */
    GetLocalPoint(worldPoint, out) {
        return b2_math_1.b2Transform.TransposeMultiplyVec2(this.m_xf, worldPoint, out);
    }
    /**
     * Gets a local vector given a world vector.
     *
     * @param a Vector in world coordinates.
     * @returns The corresponding local vector.
     */
    GetLocalVector(worldVector, out) {
        return b2_math_1.b2Rot.TransposeMultiplyVec2(this.m_xf.q, worldVector, out);
    }
    /**
     * Get the world linear velocity of a world point attached to this body.
     *
     * @param a Point in world coordinates.
     * @returns The world velocity of a point.
     */
    GetLinearVelocityFromWorldPoint(worldPoint, out) {
        return b2_math_1.b2Vec2.AddCrossScalarVec2(this.m_linearVelocity, this.m_angularVelocity, b2_math_1.b2Vec2.Subtract(worldPoint, this.m_sweep.c, b2_math_1.b2Vec2.s_t0), out);
    }
    /**
     * Get the world velocity of a local point.
     *
     * @param a Point in local coordinates.
     * @returns The world velocity of a point.
     */
    GetLinearVelocityFromLocalPoint(localPoint, out) {
        return this.GetLinearVelocityFromWorldPoint(this.GetWorldPoint(localPoint, out), out);
    }
    /**
     * Get the linear damping of the body.
     */
    GetLinearDamping() {
        return this.m_linearDamping;
    }
    /**
     * Set the linear damping of the body.
     */
    SetLinearDamping(linearDamping) {
        this.m_linearDamping = linearDamping;
    }
    /**
     * Get the angular damping of the body.
     */
    GetAngularDamping() {
        return this.m_angularDamping;
    }
    /**
     * Set the angular damping of the body.
     */
    SetAngularDamping(angularDamping) {
        this.m_angularDamping = angularDamping;
    }
    /**
     * Get the gravity scale of the body.
     */
    GetGravityScale() {
        return this.m_gravityScale;
    }
    /**
     * Set the gravity scale of the body.
     */
    SetGravityScale(scale) {
        this.m_gravityScale = scale;
    }
    /**
     * Set the type of this body. This may alter the mass and velocity.
     */
    SetType(type) {
        (0, b2_common_1.b2Assert)(!this.m_world.IsLocked());
        if (this.m_type === type) {
            return;
        }
        this.m_type = type;
        this.ResetMassData();
        if (this.m_type === b2BodyType.b2_staticBody) {
            this.m_linearVelocity.SetZero();
            this.m_angularVelocity = 0;
            this.m_sweep.a0 = this.m_sweep.a;
            this.m_sweep.c0.Copy(this.m_sweep.c);
            this.m_awakeFlag = false;
            this.SynchronizeFixtures();
        }
        this.SetAwake(true);
        this.m_force.SetZero();
        this.m_torque = 0;
        // Delete the attached contacts.
        let ce = this.m_contactList;
        while (ce) {
            const ce0 = ce;
            ce = ce.next;
            this.m_world.m_contactManager.Destroy(ce0.contact);
        }
        this.m_contactList = null;
        // Touch the proxies so that new contacts will be created (when appropriate)
        const broadPhase = this.m_world.m_contactManager.m_broadPhase;
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            for (const proxy of f.m_proxies) {
                broadPhase.TouchProxy(proxy.treeNode);
            }
        }
    }
    /**
     * Get the type of this body.
     */
    GetType() {
        return this.m_type;
    }
    /**
     * Should this body be treated like a bullet for continuous collision detection?
     */
    SetBullet(flag) {
        this.m_bulletFlag = flag;
    }
    /**
     * Is this body treated like a bullet for continuous collision detection?
     */
    IsBullet() {
        return this.m_bulletFlag;
    }
    /**
     * You can disable sleeping on this body. If you disable sleeping, the
     * body will be woken.
     */
    SetSleepingAllowed(flag) {
        this.m_autoSleepFlag = flag;
        if (!flag) {
            this.SetAwake(true);
        }
    }
    /**
     * Is this body allowed to sleep
     */
    IsSleepingAllowed() {
        return this.m_autoSleepFlag;
    }
    /**
     * Set the sleep state of the body. A sleeping body has very
     * low CPU cost.
     *
     * @param flag Set to true to wake the body, false to put it to sleep.
     */
    SetAwake(flag) {
        if (this.m_type === b2BodyType.b2_staticBody) {
            return;
        }
        if (flag) {
            this.m_awakeFlag = true;
            this.m_sleepTime = 0;
        }
        else {
            this.m_awakeFlag = false;
            this.m_sleepTime = 0;
            this.m_linearVelocity.SetZero();
            this.m_angularVelocity = 0;
            this.m_force.SetZero();
            this.m_torque = 0;
        }
    }
    /**
     * Get the sleeping state of this body.
     *
     * @returns true if the body is sleeping.
     */
    IsAwake() {
        return this.m_awakeFlag;
    }
    /**
     * Allow a body to be disabled. A disabled body is not simulated and cannot
     * be collided with or woken up.
     * If you pass a flag of true, all fixtures will be added to the broad-phase.
     * If you pass a flag of false, all fixtures will be removed from the
     * broad-phase and all contacts will be destroyed.
     * Fixtures and joints are otherwise unaffected. You may continue
     * to create/destroy fixtures and joints on disabled bodies.
     * Fixtures on a disabled body are implicitly disabled and will
     * not participate in collisions, ray-casts, or queries.
     * Joints connected to a disabled body are implicitly disabled.
     * An disabled body is still owned by a b2World object and remains
     * in the body list.
     */
    SetEnabled(flag) {
        (0, b2_common_1.b2Assert)(!this.m_world.IsLocked());
        if (flag === this.IsEnabled()) {
            return;
        }
        this.m_enabledFlag = flag;
        const broadPhase = this.m_world.m_contactManager.m_broadPhase;
        if (flag) {
            // Create all proxies.
            for (let f = this.m_fixtureList; f; f = f.m_next) {
                f.CreateProxies(broadPhase, this.m_xf);
            }
            // Contacts are created at the beginning of the next
            this.m_world.m_newContacts = true;
        }
        else {
            // Destroy all proxies.
            for (let f = this.m_fixtureList; f; f = f.m_next) {
                f.DestroyProxies(broadPhase);
            }
            // Destroy the attached contacts.
            let ce = this.m_contactList;
            while (ce) {
                const ce0 = ce;
                ce = ce.next;
                this.m_world.m_contactManager.Destroy(ce0.contact);
            }
            this.m_contactList = null;
        }
    }
    /**
     * Get the active state of the body.
     */
    IsEnabled() {
        return this.m_enabledFlag;
    }
    /**
     * Set this body to have fixed rotation. This causes the mass
     * to be reset.
     */
    SetFixedRotation(flag) {
        if (this.m_fixedRotationFlag === flag) {
            return;
        }
        this.m_fixedRotationFlag = flag;
        this.m_angularVelocity = 0;
        this.ResetMassData();
    }
    /**
     * Does this body have fixed rotation?
     */
    IsFixedRotation() {
        return this.m_fixedRotationFlag;
    }
    /**
     * Get the list of all fixtures attached to this body.
     */
    GetFixtureList() {
        return this.m_fixtureList;
    }
    /**
     * Get the list of all joints attached to this body.
     */
    GetJointList() {
        return this.m_jointList;
    }
    /**
     * Get the list of all contacts attached to this body.
     *
     * @warning this list changes during the time step and you may
     * miss some collisions if you don't use b2ContactListener.
     */
    GetContactList() {
        return this.m_contactList;
    }
    /**
     * Get the next body in the world's body list.
     */
    GetNext() {
        return this.m_next;
    }
    /**
     * Get the user data pointer that was provided in the body definition.
     */
    GetUserData() {
        return this.m_userData;
    }
    /**
     * Set the user data. Use this to store your application specific data.
     */
    SetUserData(data) {
        this.m_userData = data;
    }
    /**
     * Get the parent world of this body.
     */
    GetWorld() {
        return this.m_world;
    }
    /** @internal */
    SynchronizeFixtures() {
        const broadPhase = this.m_world.m_contactManager.m_broadPhase;
        if (this.m_awakeFlag) {
            const xf1 = b2Body.SynchronizeFixtures_s_xf1;
            xf1.q.Set(this.m_sweep.a0);
            b2_math_1.b2Rot.MultiplyVec2(xf1.q, this.m_sweep.localCenter, xf1.p);
            b2_math_1.b2Vec2.Subtract(this.m_sweep.c0, xf1.p, xf1.p);
            for (let f = this.m_fixtureList; f; f = f.m_next) {
                f.Synchronize(broadPhase, xf1, this.m_xf);
            }
        }
        else {
            for (let f = this.m_fixtureList; f; f = f.m_next) {
                f.Synchronize(broadPhase, this.m_xf, this.m_xf);
            }
        }
    }
    /** @internal */
    SynchronizeTransform() {
        this.m_xf.q.Set(this.m_sweep.a);
        b2_math_1.b2Rot.MultiplyVec2(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p);
        b2_math_1.b2Vec2.Subtract(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
    }
    /**
     * This is used to prevent connected bodies from colliding.
     * It may lie, depending on the collideConnected flag.
     *
     * @internal
     */
    ShouldCollide(other) {
        // At least one body should be dynamic.
        if (this.m_type !== b2BodyType.b2_dynamicBody && other.m_type !== b2BodyType.b2_dynamicBody) {
            return false;
        }
        return this.ShouldCollideConnected(other);
    }
    ShouldCollideConnected(other) {
        // Does a joint prevent collision?
        for (let jn = this.m_jointList; jn; jn = jn.next) {
            if (jn.other === other) {
                if (!jn.joint.m_collideConnected) {
                    return false;
                }
            }
        }
        return true;
    }
    /** @internal */
    Advance(alpha) {
        // Advance to the new safe time. This doesn't sync the broad-phase.
        this.m_sweep.Advance(alpha);
        this.m_sweep.c.Copy(this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.m_xf.q.Set(this.m_sweep.a);
        b2_math_1.b2Rot.MultiplyVec2(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p);
        b2_math_1.b2Vec2.Subtract(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
    }
}
exports.b2Body = b2Body;
b2Body.SetMassData_s_oldCenter = new b2_math_1.b2Vec2();
b2Body.ResetMassData_s_localCenter = new b2_math_1.b2Vec2();
b2Body.ResetMassData_s_oldCenter = new b2_math_1.b2Vec2();
b2Body.ResetMassData_s_massData = new b2_shape_1.b2MassData();
b2Body.SynchronizeFixtures_s_xf1 = new b2_math_1.b2Transform();


/***/ }),

/***/ "5Pwz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Island = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_timer_1 = __webpack_require__("783U");
const b2_contact_solver_1 = __webpack_require__("fn+a");
const b2_body_1 = __webpack_require__("4xZg");
const b2_time_step_1 = __webpack_require__("Nx71");
const b2_world_callbacks_1 = __webpack_require__("FlG6");
/*
Position Correction Notes
=========================
I tried the several algorithms for position correction of the 2D revolute joint.
I looked at these systems:
- simple pendulum (1m diameter sphere on massless 5m stick) with initial angular velocity of 100 rad/s.
- suspension bridge with 30 1m long planks of length 1m.
- multi-link chain with 30 1m long links.

Here are the algorithms:

Baumgarte - A fraction of the position error is added to the velocity error. There is no
separate position solver.

Pseudo Velocities - After the velocity solver and position integration,
the position error, Jacobian, and effective mass are recomputed. Then
the velocity constraints are solved with pseudo velocities and a fraction
of the position error is added to the pseudo velocity error. The pseudo
velocities are initialized to zero and there is no warm-starting. After
the position solver, the pseudo velocities are added to the positions.
This is also called the First Order World method or the Position LCP method.

Modified Nonlinear Gauss-Seidel (NGS) - Like Pseudo Velocities except the
position error is re-computed for each constraint and the positions are updated
after the constraint is solved. The radius vectors (aka Jacobians) are
re-computed too (otherwise the algorithm has horrible instability). The pseudo
velocity states are not needed because they are effectively zero at the beginning
of each iteration. Since we have the current position error, we allow the
iterations to terminate early if the error becomes smaller than b2_linearSlop.

Full NGS or just NGS - Like Modified NGS except the effective mass are re-computed
each time a constraint is solved.

Here are the results:
Baumgarte - this is the cheapest algorithm but it has some stability problems,
especially with the bridge. The chain links separate easily close to the root
and they jitter as they struggle to pull together. This is one of the most common
methods in the field. The big drawback is that the position correction artificially
affects the momentum, thus leading to instabilities and false bounce. I used a
bias factor of 0.2. A larger bias factor makes the bridge less stable, a smaller
factor makes joints and contacts more spongy.

Pseudo Velocities - the is more stable than the Baumgarte method. The bridge is
stable. However, joints still separate with large angular velocities. Drag the
simple pendulum in a circle quickly and the joint will separate. The chain separates
easily and does not recover. I used a bias factor of 0.2. A larger value lead to
the bridge collapsing when a heavy cube drops on it.

Modified NGS - this algorithm is better in some ways than Baumgarte and Pseudo
Velocities, but in other ways it is worse. The bridge and chain are much more
stable, but the simple pendulum goes unstable at high angular velocities.

Full NGS - stable in all tests. The joints display good stiffness. The bridge
still sags, but this is better than infinite forces.

Recommendations
Pseudo Velocities are not really worthwhile because the bridge and chain cannot
recover from joint separation. In other cases the benefit over Baumgarte is small.

Modified NGS is not a robust method for the revolute joint due to the violent
instability seen in the simple pendulum. Perhaps it is viable with other constraint
types, especially scalar constraints where the effective mass is a scalar.

This leaves Baumgarte and Full NGS. Baumgarte has small, but manageable instabilities
and is very fast. I don't think we can escape Baumgarte, especially in highly
demanding cases where high constraint fidelity is not needed.

Full NGS is robust and easy on the eyes. I recommend this as an option for
higher fidelity simulation and certainly for suspension bridges and long chains.
Full NGS might be a good choice for ragdolls, especially motorized ragdolls where
joint separation can be problematic. The number of NGS iterations can be reduced
for better performance without harming robustness much.

Each joint in a can be handled differently in the position solver. So I recommend
a system where the user can select the algorithm on a per joint basis. I would
probably default to the slower Full NGS and let the user select the faster
Baumgarte method in performance critical scenarios.
*/
/*
Cache Performance

The Box2d solvers are dominated by cache misses. Data structures are designed
to increase the number of cache hits. Much of misses are due to random access
to body data. The constraint structures are iterated over linearly, which leads
to few cache misses.

The bodies are not accessed during iteration. Instead read only data, such as
the mass values are stored with the constraints. The mutable data are the constraint
impulses and the bodies velocities/positions. The impulses are held inside the
constraint structures. The body velocities/positions are held in compact, temporary
arrays to increase the number of cache hits. Linear and angular velocity are
stored in a single array since multiple arrays lead to multiple misses.
*/
/*
2D Rotation

R = [cos(theta) -sin(theta)]
    [sin(theta) cos(theta) ]

thetaDot = omega

Let q1 = cos(theta), q2 = sin(theta).
R = [q1 -q2]
    [q2  q1]

q1Dot = -thetaDot * q2
q2Dot = thetaDot * q1

q1_new = q1_old - dt * w * q2
q2_new = q2_old + dt * w * q1
then normalize.

This might be faster than computing sin+cos.
However, we can compute sin+cos of the same angle fast.
*/
/** @internal */
class b2Island {
    constructor(bodyCapacity, contactCapacity, jointCapacity, listener) {
        this.m_bodyCount = 0;
        this.m_jointCount = 0;
        this.m_contactCount = 0;
        this.m_bodyCapacity = bodyCapacity;
        this.m_listener = listener;
        this.m_bodies = new Array(bodyCapacity);
        this.m_contacts = new Array(contactCapacity);
        this.m_joints = new Array(jointCapacity);
        this.m_velocities = (0, b2_common_1.b2MakeArray)(bodyCapacity, b2_time_step_1.b2Velocity);
        this.m_positions = (0, b2_common_1.b2MakeArray)(bodyCapacity, b2_time_step_1.b2Position);
        this.Resize(bodyCapacity);
    }
    Resize(bodyCapacity) {
        while (this.m_bodyCapacity < bodyCapacity) {
            this.m_velocities[this.m_bodyCapacity] = new b2_time_step_1.b2Velocity();
            this.m_positions[this.m_bodyCapacity] = new b2_time_step_1.b2Position();
            this.m_bodyCapacity++;
        }
    }
    Clear() {
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0;
    }
    AddBody(body) {
        // DEBUG: b2Assert(this.m_bodyCount < this.m_bodyCapacity);
        body.m_islandIndex = this.m_bodyCount;
        this.m_bodies[this.m_bodyCount] = body;
        ++this.m_bodyCount;
    }
    AddContact(contact) {
        this.m_contacts[this.m_contactCount++] = contact;
    }
    AddJoint(joint) {
        this.m_joints[this.m_jointCount++] = joint;
    }
    Solve(profile, step, gravity, allowSleep) {
        const timer = b2Island.s_timer.Reset();
        const h = step.dt;
        // Integrate velocities and apply damping. Initialize the body state.
        for (let i = 0; i < this.m_bodyCount; ++i) {
            const b = this.m_bodies[i];
            this.m_positions[i].c.Copy(b.m_sweep.c);
            const { a } = b.m_sweep;
            const v = this.m_velocities[i].v.Copy(b.m_linearVelocity);
            let w = b.m_angularVelocity;
            // Store positions for continuous collision.
            b.m_sweep.c0.Copy(b.m_sweep.c);
            b.m_sweep.a0 = b.m_sweep.a;
            if (b.m_type === b2_body_1.b2BodyType.b2_dynamicBody) {
                // Integrate velocities.
                v.x += h * b.m_invMass * (b.m_gravityScale * b.m_mass * gravity.x + b.m_force.x);
                v.y += h * b.m_invMass * (b.m_gravityScale * b.m_mass * gravity.y + b.m_force.y);
                w += h * b.m_invI * b.m_torque;
                // Apply damping.
                // ODE: dv/dt + c * v = 0
                // Solution: v(t) = v0 * exp(-c * t)
                // Time step: v(t + dt) = v0 * exp(-c * (t + dt)) = v0 * exp(-c * t) * exp(-c * dt) = v * exp(-c * dt)
                // v2 = exp(-c * dt) * v1
                // Pade approximation:
                // v2 = v1 * 1 / (1 + c * dt)
                v.Scale(1 / (1 + h * b.m_linearDamping));
                w *= 1 / (1 + h * b.m_angularDamping);
            }
            this.m_positions[i].a = a;
            this.m_velocities[i].w = w;
        }
        timer.Reset();
        // Solver data
        const solverData = b2Island.s_solverData;
        solverData.step.Copy(step);
        solverData.positions = this.m_positions;
        solverData.velocities = this.m_velocities;
        // Initialize velocity constraints.
        const contactSolverDef = b2Island.s_contactSolverDef;
        contactSolverDef.step.Copy(step);
        contactSolverDef.contacts = this.m_contacts;
        contactSolverDef.count = this.m_contactCount;
        contactSolverDef.positions = this.m_positions;
        contactSolverDef.velocities = this.m_velocities;
        const contactSolver = b2Island.s_contactSolver.Initialize(contactSolverDef);
        contactSolver.InitializeVelocityConstraints();
        if (step.warmStarting) {
            contactSolver.WarmStart();
        }
        for (let i = 0; i < this.m_jointCount; ++i) {
            this.m_joints[i].InitVelocityConstraints(solverData);
        }
        profile.solveInit = timer.GetMilliseconds();
        // Solve velocity constraints.
        timer.Reset();
        for (let i = 0; i < step.config.velocityIterations; ++i) {
            for (let j = 0; j < this.m_jointCount; ++j) {
                this.m_joints[j].SolveVelocityConstraints(solverData);
            }
            contactSolver.SolveVelocityConstraints();
        }
        // Store impulses for warm starting
        contactSolver.StoreImpulses();
        profile.solveVelocity = timer.GetMilliseconds();
        // Integrate positions.
        for (let i = 0; i < this.m_bodyCount; ++i) {
            const { c } = this.m_positions[i];
            let { a } = this.m_positions[i];
            const { v } = this.m_velocities[i];
            let { w } = this.m_velocities[i];
            // Check for large velocities
            const translation = b2_math_1.b2Vec2.Scale(h, v, b2Island.s_translation);
            if (b2_math_1.b2Vec2.Dot(translation, translation) > b2_common_1.b2_maxTranslationSquared) {
                const ratio = b2_common_1.b2_maxTranslation / translation.Length();
                v.Scale(ratio);
            }
            const rotation = h * w;
            if (rotation * rotation > b2_common_1.b2_maxRotationSquared) {
                const ratio = b2_common_1.b2_maxRotation / Math.abs(rotation);
                w *= ratio;
            }
            // Integrate
            c.AddScaled(h, v);
            a += h * w;
            this.m_positions[i].a = a;
            this.m_velocities[i].w = w;
        }
        // Solve position constraints
        timer.Reset();
        let positionSolved = false;
        for (let i = 0; i < step.config.positionIterations; ++i) {
            const contactsOkay = contactSolver.SolvePositionConstraints();
            let jointsOkay = true;
            for (let j = 0; j < this.m_jointCount; ++j) {
                const jointOkay = this.m_joints[j].SolvePositionConstraints(solverData);
                jointsOkay = jointsOkay && jointOkay;
            }
            if (contactsOkay && jointsOkay) {
                // Exit early if the position errors are small.
                positionSolved = true;
                break;
            }
        }
        // Copy state buffers back to the bodies
        for (let i = 0; i < this.m_bodyCount; ++i) {
            const body = this.m_bodies[i];
            body.m_sweep.c.Copy(this.m_positions[i].c);
            body.m_sweep.a = this.m_positions[i].a;
            body.m_linearVelocity.Copy(this.m_velocities[i].v);
            body.m_angularVelocity = this.m_velocities[i].w;
            body.SynchronizeTransform();
        }
        profile.solvePosition = timer.GetMilliseconds();
        this.Report(contactSolver.m_velocityConstraints);
        if (allowSleep) {
            let minSleepTime = b2_common_1.b2_maxFloat;
            const linTolSqr = b2_common_1.b2_linearSleepTolerance * b2_common_1.b2_linearSleepTolerance;
            const angTolSqr = b2_common_1.b2_angularSleepTolerance * b2_common_1.b2_angularSleepTolerance;
            for (let i = 0; i < this.m_bodyCount; ++i) {
                const b = this.m_bodies[i];
                if (b.GetType() === b2_body_1.b2BodyType.b2_staticBody) {
                    continue;
                }
                if (!b.m_autoSleepFlag ||
                    b.m_angularVelocity * b.m_angularVelocity > angTolSqr ||
                    b2_math_1.b2Vec2.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
                    b.m_sleepTime = 0;
                    minSleepTime = 0;
                }
                else {
                    b.m_sleepTime += h;
                    minSleepTime = Math.min(minSleepTime, b.m_sleepTime);
                }
            }
            if (minSleepTime >= b2_common_1.b2_timeToSleep && positionSolved) {
                for (let i = 0; i < this.m_bodyCount; ++i) {
                    const b = this.m_bodies[i];
                    b.SetAwake(false);
                }
            }
        }
    }
    SolveTOI(subStep, toiIndexA, toiIndexB) {
        // DEBUG: b2Assert(toiIndexA < this.m_bodyCount);
        // DEBUG: b2Assert(toiIndexB < this.m_bodyCount);
        // Initialize the body state.
        for (let i = 0; i < this.m_bodyCount; ++i) {
            const b = this.m_bodies[i];
            this.m_positions[i].c.Copy(b.m_sweep.c);
            this.m_positions[i].a = b.m_sweep.a;
            this.m_velocities[i].v.Copy(b.m_linearVelocity);
            this.m_velocities[i].w = b.m_angularVelocity;
        }
        const contactSolverDef = b2Island.s_contactSolverDef;
        contactSolverDef.contacts = this.m_contacts;
        contactSolverDef.count = this.m_contactCount;
        contactSolverDef.step.Copy(subStep);
        contactSolverDef.positions = this.m_positions;
        contactSolverDef.velocities = this.m_velocities;
        const contactSolver = b2Island.s_contactSolver.Initialize(contactSolverDef);
        // Solve position constraints.
        for (let i = 0; i < subStep.config.positionIterations; ++i) {
            const contactsOkay = contactSolver.SolveTOIPositionConstraints(toiIndexA, toiIndexB);
            if (contactsOkay) {
                break;
            }
        }
        // Leap of faith to new safe state.
        this.m_bodies[toiIndexA].m_sweep.c0.Copy(this.m_positions[toiIndexA].c);
        this.m_bodies[toiIndexA].m_sweep.a0 = this.m_positions[toiIndexA].a;
        this.m_bodies[toiIndexB].m_sweep.c0.Copy(this.m_positions[toiIndexB].c);
        this.m_bodies[toiIndexB].m_sweep.a0 = this.m_positions[toiIndexB].a;
        // No warm starting is needed for TOI events because warm
        // starting impulses were applied in the discrete solver.
        contactSolver.InitializeVelocityConstraints();
        // Solve velocity constraints.
        for (let i = 0; i < subStep.config.velocityIterations; ++i) {
            contactSolver.SolveVelocityConstraints();
        }
        // Don't store the TOI contact forces for warm starting
        // because they can be quite large.
        const h = subStep.dt;
        // Integrate positions
        for (let i = 0; i < this.m_bodyCount; ++i) {
            const { c } = this.m_positions[i];
            let { a } = this.m_positions[i];
            const { v } = this.m_velocities[i];
            let { w } = this.m_velocities[i];
            // Check for large velocities
            const translation = b2_math_1.b2Vec2.Scale(h, v, b2Island.s_translation);
            if (b2_math_1.b2Vec2.Dot(translation, translation) > b2_common_1.b2_maxTranslationSquared) {
                const ratio = b2_common_1.b2_maxTranslation / translation.Length();
                v.Scale(ratio);
            }
            const rotation = h * w;
            if (rotation * rotation > b2_common_1.b2_maxRotationSquared) {
                const ratio = b2_common_1.b2_maxRotation / Math.abs(rotation);
                w *= ratio;
            }
            // Integrate
            c.AddScaled(h, v);
            a += h * w;
            this.m_positions[i].a = a;
            this.m_velocities[i].w = w;
            // Sync bodies
            const body = this.m_bodies[i];
            body.m_sweep.c.Copy(c);
            body.m_sweep.a = a;
            body.m_linearVelocity.Copy(v);
            body.m_angularVelocity = w;
            body.SynchronizeTransform();
        }
        this.Report(contactSolver.m_velocityConstraints);
    }
    Report(constraints) {
        for (let i = 0; i < this.m_contactCount; ++i) {
            const c = this.m_contacts[i];
            const vc = constraints[i];
            const impulse = b2Island.s_impulse;
            impulse.count = vc.pointCount;
            for (let j = 0; j < vc.pointCount; ++j) {
                impulse.normalImpulses[j] = vc.points[j].normalImpulse;
                impulse.tangentImpulses[j] = vc.points[j].tangentImpulse;
            }
            this.m_listener.PostSolve(c, impulse);
        }
    }
}
exports.b2Island = b2Island;
b2Island.s_timer = new b2_timer_1.b2Timer();
b2Island.s_solverData = new b2_time_step_1.b2SolverData();
b2Island.s_contactSolverDef = new b2_contact_solver_1.b2ContactSolverDef();
b2Island.s_contactSolver = new b2_contact_solver_1.b2ContactSolver();
b2Island.s_translation = new b2_math_1.b2Vec2();
b2Island.s_impulse = new b2_world_callbacks_1.b2ContactImpulse();


/***/ }),

/***/ "5Zru":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2EdgeShape = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_shape_1 = __webpack_require__("UjSx");
/**
 * A line segment (edge) shape. These can be connected in chains or loops
 * to other edge shapes. Edges created independently are two-sided and do
 * no provide smooth movement across junctions.
 */
class b2EdgeShape extends b2_shape_1.b2Shape {
    constructor() {
        super(b2_shape_1.b2ShapeType.e_edge, b2_common_1.b2_polygonRadius);
        /** These are the edge vertices */
        this.m_vertex1 = new b2_math_1.b2Vec2();
        this.m_vertex2 = new b2_math_1.b2Vec2();
        /** Optional adjacent vertices. These are used for smooth collision. */
        this.m_vertex0 = new b2_math_1.b2Vec2();
        this.m_vertex3 = new b2_math_1.b2Vec2();
        /** Uses m_vertex0 and m_vertex3 to create smooth collision. */
        this.m_oneSided = false;
    }
    /**
     * Set this as a part of a sequence. Vertex v0 precedes the edge and vertex v3
     * follows. These extra vertices are used to provide smooth movement
     * across junctions. This also makes the collision one-sided. The edge
     * normal points to the right looking from v1 to v2.
     */
    SetOneSided(v0, v1, v2, v3) {
        this.m_vertex0.Copy(v0);
        this.m_vertex1.Copy(v1);
        this.m_vertex2.Copy(v2);
        this.m_vertex3.Copy(v3);
        this.m_oneSided = true;
        return this;
    }
    /**
     * Set this as an isolated edge. Collision is two-sided.
     */
    SetTwoSided(v1, v2) {
        this.m_vertex1.Copy(v1);
        this.m_vertex2.Copy(v2);
        this.m_oneSided = false;
        return this;
    }
    /**
     * Implement b2Shape.
     */
    Clone() {
        return new b2EdgeShape().Copy(this);
    }
    Copy(other) {
        super.Copy(other);
        // DEBUG: b2Assert(other instanceof b2EdgeShape);
        this.m_vertex1.Copy(other.m_vertex1);
        this.m_vertex2.Copy(other.m_vertex2);
        this.m_vertex0.Copy(other.m_vertex0);
        this.m_vertex3.Copy(other.m_vertex3);
        this.m_oneSided = other.m_oneSided;
        return this;
    }
    /**
     * @see b2Shape::GetChildCount
     */
    GetChildCount() {
        return 1;
    }
    /**
     * @see b2Shape::TestPoint
     */
    TestPoint(_xf, _p) {
        return false;
    }
    /**
     * Implement b2Shape.
     *
     * p = p1 + t * d
     * v = v1 + s * e
     * p1 + t * d = v1 + s * e
     * s * e - t * d = p1 - v1
     */
    RayCast(output, input, xf, _childIndex) {
        // Put the ray into the edge's frame of reference.
        const p1 = b2_math_1.b2Transform.TransposeMultiplyVec2(xf, input.p1, b2EdgeShape.RayCast_s_p1);
        const p2 = b2_math_1.b2Transform.TransposeMultiplyVec2(xf, input.p2, b2EdgeShape.RayCast_s_p2);
        const d = b2_math_1.b2Vec2.Subtract(p2, p1, b2EdgeShape.RayCast_s_d);
        const v1 = this.m_vertex1;
        const v2 = this.m_vertex2;
        const e = b2_math_1.b2Vec2.Subtract(v2, v1, b2EdgeShape.RayCast_s_e);
        // Normal points to the right, looking from v1 at v2
        const { normal } = output;
        normal.Set(e.y, -e.x).Normalize();
        // q = p1 + t * d
        // dot(normal, q - v1) = 0
        // dot(normal, p1 - v1) + t * dot(normal, d) = 0
        const numerator = b2_math_1.b2Vec2.Dot(normal, b2_math_1.b2Vec2.Subtract(v1, p1, b2_math_1.b2Vec2.s_t0));
        if (this.m_oneSided && numerator > 0) {
            return false;
        }
        const denominator = b2_math_1.b2Vec2.Dot(normal, d);
        if (denominator === 0) {
            return false;
        }
        const t = numerator / denominator;
        if (t < 0 || input.maxFraction < t) {
            return false;
        }
        const q = b2_math_1.b2Vec2.AddScaled(p1, t, d, b2EdgeShape.RayCast_s_q);
        // q = v1 + s * r
        // s = dot(q - v1, r) / dot(r, r)
        const r = b2_math_1.b2Vec2.Subtract(v2, v1, b2EdgeShape.RayCast_s_r);
        const rr = b2_math_1.b2Vec2.Dot(r, r);
        if (rr === 0) {
            return false;
        }
        const s = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(q, v1, b2_math_1.b2Vec2.s_t0), r) / rr;
        if (s < 0 || s > 1) {
            return false;
        }
        output.fraction = t;
        b2_math_1.b2Rot.MultiplyVec2(xf.q, output.normal, output.normal);
        if (numerator > 0) {
            output.normal.Negate();
        }
        return true;
    }
    /**
     * @see b2Shape::ComputeAABB
     */
    ComputeAABB(aabb, xf, _childIndex) {
        const v1 = b2_math_1.b2Transform.MultiplyVec2(xf, this.m_vertex1, b2EdgeShape.ComputeAABB_s_v1);
        const v2 = b2_math_1.b2Transform.MultiplyVec2(xf, this.m_vertex2, b2EdgeShape.ComputeAABB_s_v2);
        b2_math_1.b2Vec2.Min(v1, v2, aabb.lowerBound);
        b2_math_1.b2Vec2.Max(v1, v2, aabb.upperBound);
        const r = this.m_radius;
        aabb.lowerBound.SubtractXY(r, r);
        aabb.upperBound.AddXY(r, r);
    }
    /**
     * @see b2Shape::ComputeMass
     */
    ComputeMass(massData, _density) {
        massData.mass = 0;
        b2_math_1.b2Vec2.Mid(this.m_vertex1, this.m_vertex2, massData.center);
        massData.I = 0;
    }
    SetupDistanceProxy(proxy, _index) {
        proxy.m_vertices = proxy.m_buffer;
        proxy.m_vertices[0].Copy(this.m_vertex1);
        proxy.m_vertices[1].Copy(this.m_vertex2);
        proxy.m_count = 2;
        proxy.m_radius = this.m_radius;
    }
    Draw(draw, color) {
        const v1 = this.m_vertex1;
        const v2 = this.m_vertex2;
        draw.DrawSegment(v1, v2, color);
        if (this.m_oneSided === false) {
            draw.DrawPoint(v1, 4, color);
            draw.DrawPoint(v2, 4, color);
        }
    }
}
exports.b2EdgeShape = b2EdgeShape;
b2EdgeShape.RayCast_s_p1 = new b2_math_1.b2Vec2();
b2EdgeShape.RayCast_s_p2 = new b2_math_1.b2Vec2();
b2EdgeShape.RayCast_s_d = new b2_math_1.b2Vec2();
b2EdgeShape.RayCast_s_e = new b2_math_1.b2Vec2();
b2EdgeShape.RayCast_s_q = new b2_math_1.b2Vec2();
b2EdgeShape.RayCast_s_r = new b2_math_1.b2Vec2();
b2EdgeShape.ComputeAABB_s_v1 = new b2_math_1.b2Vec2();
b2EdgeShape.ComputeAABB_s_v2 = new b2_math_1.b2Vec2();


/***/ }),

/***/ "783U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Timer = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
/**
 * Timer for profiling. This has platform specific code and may
 * not work on every platform.
 */
class b2Timer {
    constructor() {
        this.m_start = performance.now();
    }
    /**
     * Reset the timer.
     */
    Reset() {
        this.m_start = performance.now();
        return this;
    }
    /**
     * Get the time since construction or the last reset.
     */
    GetMilliseconds() {
        return performance.now() - this.m_start;
    }
}
exports.b2Timer = b2Timer;


/***/ }),

/***/ "8OaJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2DistanceJoint = exports.b2DistanceJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const b2_draw_1 = __webpack_require__("EMJU");
const temp = {
    worldPointA: new b2_math_1.b2Vec2(),
    worldPointB: new b2_math_1.b2Vec2(),
    vpA: new b2_math_1.b2Vec2(),
    vpB: new b2_math_1.b2Vec2(),
    vpBA: new b2_math_1.b2Vec2(),
    P: new b2_math_1.b2Vec2(),
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    Draw: {
        pA: new b2_math_1.b2Vec2(),
        pB: new b2_math_1.b2Vec2(),
        axis: new b2_math_1.b2Vec2(),
        pRest: new b2_math_1.b2Vec2(),
        p1: new b2_math_1.b2Vec2(),
        p2: new b2_math_1.b2Vec2(),
    },
};
/**
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero distance of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game.
 */
class b2DistanceJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_distanceJoint);
        /** The local anchor point relative to bodyA's origin. */
        this.localAnchorA = new b2_math_1.b2Vec2();
        /** The local anchor point relative to bodyB's origin. */
        this.localAnchorB = new b2_math_1.b2Vec2();
        /** The rest length of this joint. Clamped to a stable minimum value. */
        this.length = 1;
        /** Minimum length. Clamped to a stable minimum value. */
        this.minLength = 0;
        /** Maximum length. Must be greater than or equal to the minimum length. */
        this.maxLength = b2_common_1.b2_maxFloat;
        /** The linear stiffness in N/m. */
        this.stiffness = 0;
        /** The linear damping in N*s/m. */
        this.damping = 0;
    }
    Initialize(b1, b2, anchor1, anchor2) {
        this.bodyA = b1;
        this.bodyB = b2;
        this.bodyA.GetLocalPoint(anchor1, this.localAnchorA);
        this.bodyB.GetLocalPoint(anchor2, this.localAnchorB);
        this.length = Math.max(b2_math_1.b2Vec2.Distance(anchor1, anchor2), b2_common_1.b2_linearSlop);
        this.minLength = this.length;
        this.maxLength = this.length;
    }
}
exports.b2DistanceJointDef = b2DistanceJointDef;
/**
 * A distance joint constrains two points on two bodies to remain at a fixed
 * distance from each other. You can view this as a massless, rigid rod.
 */
class b2DistanceJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b;
        super(def);
        this.m_bias = 0;
        // Solver shared
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        this.m_gamma = 0;
        this.m_impulse = 0;
        this.m_lowerImpulse = 0;
        this.m_upperImpulse = 0;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_u = new b2_math_1.b2Vec2();
        this.m_rA = new b2_math_1.b2Vec2();
        this.m_rB = new b2_math_1.b2Vec2();
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_currentLength = 0;
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_softMass = 0;
        this.m_mass = 0;
        this.m_localAnchorA.Copy(def.localAnchorA);
        this.m_localAnchorB.Copy(def.localAnchorB);
        this.m_length = Math.max(def.length, b2_common_1.b2_linearSlop);
        this.m_minLength = Math.max(def.minLength, b2_common_1.b2_linearSlop);
        this.m_maxLength = Math.max(def.maxLength, this.m_minLength);
        this.m_stiffness = (_a = def.stiffness) !== null && _a !== void 0 ? _a : 0;
        this.m_damping = (_b = def.damping) !== null && _b !== void 0 ? _b : 0;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        const f = inv_dt * (this.m_impulse + this.m_lowerImpulse - this.m_upperImpulse);
        out.x = f * this.m_u.x;
        out.y = f * this.m_u.y;
        return out;
    }
    GetReactionTorque(_inv_dt) {
        return 0;
    }
    GetLocalAnchorA() {
        return this.m_localAnchorA;
    }
    GetLocalAnchorB() {
        return this.m_localAnchorB;
    }
    SetLength(length) {
        this.m_impulse = 0;
        this.m_length = Math.max(b2_common_1.b2_linearSlop, length);
        return this.m_length;
    }
    GetLength() {
        return this.m_length;
    }
    SetMinLength(minLength) {
        this.m_lowerImpulse = 0;
        this.m_minLength = (0, b2_math_1.b2Clamp)(minLength, b2_common_1.b2_linearSlop, this.m_maxLength);
        return this.m_minLength;
    }
    GetMinLength() {
        return this.m_minLength;
    }
    SetMaxLength(maxLength) {
        this.m_upperImpulse = 0;
        this.m_maxLength = Math.max(maxLength, this.m_minLength);
        return this.m_maxLength;
    }
    GetMaxLength() {
        return this.m_maxLength;
    }
    GetCurrentLength() {
        const pA = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, temp.worldPointA);
        const pB = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, temp.worldPointB);
        return b2_math_1.b2Vec2.Distance(pB, pA);
    }
    SetStiffness(stiffness) {
        this.m_stiffness = stiffness;
    }
    GetStiffness() {
        return this.m_stiffness;
    }
    SetDamping(damping) {
        this.m_damping = damping;
    }
    GetDamping() {
        return this.m_damping;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = data.positions[this.m_indexA].c;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const cB = data.positions[this.m_indexB].c;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB, lalcA, lalcB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        this.m_u.x = cB.x + this.m_rB.x - cA.x - this.m_rA.x;
        this.m_u.y = cB.y + this.m_rB.y - cA.y - this.m_rA.y;
        // Handle singularity.
        this.m_currentLength = this.m_u.Length();
        if (this.m_currentLength > b2_common_1.b2_linearSlop) {
            this.m_u.Scale(1 / this.m_currentLength);
        }
        else {
            this.m_u.SetZero();
            this.m_mass = 0;
            this.m_impulse = 0;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        const crAu = b2_math_1.b2Vec2.Cross(this.m_rA, this.m_u);
        const crBu = b2_math_1.b2Vec2.Cross(this.m_rB, this.m_u);
        let invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
        this.m_mass = invMass !== 0 ? 1 / invMass : 0;
        if (this.m_stiffness > 0 && this.m_minLength < this.m_maxLength) {
            // soft
            const C = this.m_currentLength - this.m_length;
            const d = this.m_damping;
            const k = this.m_stiffness;
            // magic formulas
            const h = data.step.dt;
            // gamma = 1 / (h * (d + h * k))
            // the extra factor of h in the denominator is since the lambda is an impulse, not a force
            this.m_gamma = h * (d + h * k);
            this.m_gamma = this.m_gamma !== 0 ? 1 / this.m_gamma : 0;
            this.m_bias = C * h * k * this.m_gamma;
            invMass += this.m_gamma;
            this.m_softMass = invMass !== 0 ? 1 / invMass : 0;
        }
        else {
            // rigid
            this.m_gamma = 0;
            this.m_bias = 0;
            this.m_softMass = this.m_mass;
        }
        if (data.step.warmStarting) {
            // Scale the impulse to support a variable time step.
            this.m_impulse *= data.step.dtRatio;
            this.m_lowerImpulse *= data.step.dtRatio;
            this.m_upperImpulse *= data.step.dtRatio;
            const { P } = temp;
            b2_math_1.b2Vec2.Scale(this.m_impulse + this.m_lowerImpulse - this.m_upperImpulse, this.m_u, P);
            vA.SubtractScaled(this.m_invMassA, P);
            wA -= this.m_invIA * b2_math_1.b2Vec2.Cross(this.m_rA, P);
            vB.AddScaled(this.m_invMassB, P);
            wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, P);
        }
        else {
            this.m_impulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        if (this.m_minLength < this.m_maxLength) {
            if (this.m_stiffness > 0) {
                // Cdot = dot(u, v + cross(w, r))
                const vpA = b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, temp.vpA);
                const vpB = b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, temp.vpB);
                const Cdot = b2_math_1.b2Vec2.Dot(this.m_u, b2_math_1.b2Vec2.Subtract(vpB, vpA, temp.vpBA));
                const impulse = -this.m_softMass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
                this.m_impulse += impulse;
                const P = b2_math_1.b2Vec2.Scale(impulse, this.m_u, temp.P);
                vA.SubtractScaled(this.m_invMassA, P);
                wA -= this.m_invIA * b2_math_1.b2Vec2.Cross(this.m_rA, P);
                vB.AddScaled(this.m_invMassB, P);
                wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, P);
            }
            // lower
            {
                const C = this.m_currentLength - this.m_minLength;
                const bias = Math.max(0, C) * data.step.inv_dt;
                const vpA = b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, temp.vpA);
                const vpB = b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, temp.vpB);
                const Cdot = b2_math_1.b2Vec2.Dot(this.m_u, b2_math_1.b2Vec2.Subtract(vpB, vpA, temp.vpBA));
                let impulse = -this.m_mass * (Cdot + bias);
                const oldImpulse = this.m_lowerImpulse;
                this.m_lowerImpulse = Math.max(0, this.m_lowerImpulse + impulse);
                impulse = this.m_lowerImpulse - oldImpulse;
                const P = b2_math_1.b2Vec2.Scale(impulse, this.m_u, temp.P);
                vA.SubtractScaled(this.m_invMassA, P);
                wA -= this.m_invIA * b2_math_1.b2Vec2.Cross(this.m_rA, P);
                vB.AddScaled(this.m_invMassB, P);
                wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, P);
            }
            // upper
            {
                const C = this.m_maxLength - this.m_currentLength;
                const bias = Math.max(0, C) * data.step.inv_dt;
                const vpA = b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, temp.vpA);
                const vpB = b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, temp.vpB);
                const Cdot = b2_math_1.b2Vec2.Dot(this.m_u, b2_math_1.b2Vec2.Subtract(vpA, vpB, temp.vpBA));
                let impulse = -this.m_mass * (Cdot + bias);
                const oldImpulse = this.m_upperImpulse;
                this.m_upperImpulse = Math.max(0, this.m_upperImpulse + impulse);
                impulse = this.m_upperImpulse - oldImpulse;
                const P = b2_math_1.b2Vec2.Scale(-impulse, this.m_u, temp.P);
                vA.SubtractScaled(this.m_invMassA, P);
                wA -= this.m_invIA * b2_math_1.b2Vec2.Cross(this.m_rA, P);
                vB.AddScaled(this.m_invMassB, P);
                wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, P);
            }
        }
        else {
            // Equal limits
            // Cdot = dot(u, v + cross(w, r))
            const vpA = b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, temp.vpA);
            const vpB = b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, temp.vpB);
            const Cdot = b2_math_1.b2Vec2.Dot(this.m_u, b2_math_1.b2Vec2.Subtract(vpB, vpA, temp.vpBA));
            const impulse = -this.m_mass * Cdot;
            this.m_impulse += impulse;
            const P = b2_math_1.b2Vec2.Scale(impulse, this.m_u, temp.P);
            vA.SubtractScaled(this.m_invMassA, P);
            wA -= this.m_invIA * b2_math_1.b2Vec2.Cross(this.m_rA, P);
            vB.AddScaled(this.m_invMassB, P);
            wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, P);
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolvePositionConstraints(data) {
        const cA = data.positions[this.m_indexA].c;
        let aA = data.positions[this.m_indexA].a;
        const cB = data.positions[this.m_indexB].c;
        let aB = data.positions[this.m_indexB].a;
        const { qA, qB, lalcA, lalcB, P } = temp;
        qA.Set(aA);
        qB.Set(aB);
        const rA = b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
        const rB = b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        this.m_u.x = cB.x + rB.x - cA.x - rA.x;
        this.m_u.y = cB.y + rB.y - cA.y - rA.y;
        const length = this.m_u.Normalize();
        let C;
        if (this.m_minLength === this.m_maxLength) {
            C = length - this.m_minLength;
        }
        else if (length < this.m_minLength) {
            C = length - this.m_minLength;
        }
        else if (this.m_maxLength < length) {
            C = length - this.m_maxLength;
        }
        else {
            return true;
        }
        const impulse = -this.m_mass * C;
        b2_math_1.b2Vec2.Scale(impulse, this.m_u, P);
        cA.SubtractScaled(this.m_invMassA, P);
        aA -= this.m_invIA * b2_math_1.b2Vec2.Cross(rA, P);
        cB.AddScaled(this.m_invMassB, P);
        aB += this.m_invIB * b2_math_1.b2Vec2.Cross(rB, P);
        data.positions[this.m_indexA].a = aA;
        data.positions[this.m_indexB].a = aB;
        return Math.abs(C) < b2_common_1.b2_linearSlop;
    }
    Draw(draw) {
        const { pA, pB, axis, pRest } = temp.Draw;
        const xfA = this.m_bodyA.GetTransform();
        const xfB = this.m_bodyB.GetTransform();
        b2_math_1.b2Transform.MultiplyVec2(xfA, this.m_localAnchorA, pA);
        b2_math_1.b2Transform.MultiplyVec2(xfB, this.m_localAnchorB, pB);
        b2_math_1.b2Vec2.Subtract(pB, pA, axis);
        axis.Normalize();
        draw.DrawSegment(pA, pB, b2_draw_1.debugColors.joint5);
        b2_math_1.b2Vec2.AddScaled(pA, this.m_length, axis, pRest);
        draw.DrawPoint(pRest, 8, b2_draw_1.debugColors.joint1);
        if (this.m_minLength !== this.m_maxLength) {
            if (this.m_minLength > b2_common_1.b2_linearSlop) {
                const pMin = b2_math_1.b2Vec2.AddScaled(pA, this.m_minLength, axis, temp.Draw.p1);
                draw.DrawPoint(pMin, 4, b2_draw_1.debugColors.joint2);
            }
            if (this.m_maxLength < b2_common_1.b2_maxFloat) {
                const pMax = b2_math_1.b2Vec2.AddScaled(pA, this.m_maxLength, axis, temp.Draw.p1);
                draw.DrawPoint(pMax, 4, b2_draw_1.debugColors.joint3);
            }
        }
    }
}
exports.b2DistanceJoint = b2DistanceJoint;


/***/ }),

/***/ "8mly":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2PrismaticJoint = exports.b2PrismaticJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_draw_1 = __webpack_require__("EMJU");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const temp = {
    K3: new b2_math_1.b2Mat33(),
    K2: new b2_math_1.b2Mat22(),
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    rA: new b2_math_1.b2Vec2(),
    rB: new b2_math_1.b2Vec2(),
    GetJointTranslation: {
        pA: new b2_math_1.b2Vec2(),
        pB: new b2_math_1.b2Vec2(),
        d: new b2_math_1.b2Vec2(),
        axis: new b2_math_1.b2Vec2(),
    },
    InitVelocityConstraints: {
        d: new b2_math_1.b2Vec2(),
        P: new b2_math_1.b2Vec2(),
    },
    SolveVelocityConstraints: {
        P: new b2_math_1.b2Vec2(),
        df: new b2_math_1.b2Vec2(),
    },
    SolvePositionConstraints: {
        d: new b2_math_1.b2Vec2(),
        impulse: new b2_math_1.b2Vec3(),
        impulse1: new b2_math_1.b2Vec2(),
        P: new b2_math_1.b2Vec2(),
    },
    Draw: {
        p1: new b2_math_1.b2Vec2(),
        p2: new b2_math_1.b2Vec2(),
        pA: new b2_math_1.b2Vec2(),
        pB: new b2_math_1.b2Vec2(),
        axis: new b2_math_1.b2Vec2(),
        lower: new b2_math_1.b2Vec2(),
        upper: new b2_math_1.b2Vec2(),
        perp: new b2_math_1.b2Vec2(),
    },
};
/**
 * Prismatic joint definition. This requires defining a line of
 * motion using an axis and an anchor point. The definition uses local
 * anchor points and a local axis so that the initial configuration
 * can violate the constraint slightly. The joint translation is zero
 * when the local anchor points coincide in world space. Using local
 * anchors and a local axis helps when saving and loading a game.
 */
class b2PrismaticJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_prismaticJoint);
        /** The local anchor point relative to bodyA's origin. */
        this.localAnchorA = new b2_math_1.b2Vec2();
        /** The local anchor point relative to bodyB's origin. */
        this.localAnchorB = new b2_math_1.b2Vec2();
        /** The local translation unit axis in bodyA. */
        this.localAxisA = new b2_math_1.b2Vec2(1, 0);
        /** The constrained angle between the bodies: bodyB_angle - bodyA_angle. */
        this.referenceAngle = 0;
        /** Enable/disable the joint limit. */
        this.enableLimit = false;
        /** The lower translation limit, usually in meters. */
        this.lowerTranslation = 0;
        /** The upper translation limit, usually in meters. */
        this.upperTranslation = 0;
        /** Enable/disable the joint motor. */
        this.enableMotor = false;
        /** The maximum motor torque, usually in N-m. */
        this.maxMotorForce = 0;
        /** The desired motor speed in radians per second. */
        this.motorSpeed = 0;
    }
    Initialize(bA, bB, anchor, axis) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
        this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
        this.bodyA.GetLocalVector(axis, this.localAxisA);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
    }
}
exports.b2PrismaticJointDef = b2PrismaticJointDef;
// Linear constraint (point-to-line)
// d = p2 - p1 = x2 + r2 - x1 - r1
// C = dot(perp, d)
// Cdot = dot(d, cross(w1, perp)) + dot(perp, v2 + cross(w2, r2) - v1 - cross(w1, r1))
//      = -dot(perp, v1) - dot(cross(d + r1, perp), w1) + dot(perp, v2) + dot(cross(r2, perp), v2)
// J = [-perp, -cross(d + r1, perp), perp, cross(r2,perp)]
//
// Angular constraint
// C = a2 - a1 + a_initial
// Cdot = w2 - w1
// J = [0 0 -1 0 0 1]
//
// K = J * invM * JT
//
// J = [-a -s1 a s2]
//     [0  -1  0  1]
// a = perp
// s1 = cross(d + r1, a) = cross(p2 - x1, a)
// s2 = cross(r2, a) = cross(p2 - x2, a)
// Motor/Limit linear constraint
// C = dot(ax1, d)
// Cdot = -dot(ax1, v1) - dot(cross(d + r1, ax1), w1) + dot(ax1, v2) + dot(cross(r2, ax1), v2)
// J = [-ax1 -cross(d+r1,ax1) ax1 cross(r2,ax1)]
// Predictive limit is applied even when the limit is not active.
// Prevents a constraint speed that can lead to a constraint error in one time step.
// Want C2 = C1 + h * Cdot >= 0
// Or:
// Cdot + C1/h >= 0
// I do not apply a negative constraint error because that is handled in position correction.
// So:
// Cdot + max(C1, 0)/h >= 0
// Block Solver
// We develop a block solver that includes the angular and linear constraints. This makes the limit stiffer.
//
// The Jacobian has 2 rows:
// J = [-uT -s1 uT s2] // linear
//     [0   -1   0  1] // angular
//
// u = perp
// s1 = cross(d + r1, u), s2 = cross(r2, u)
// a1 = cross(d + r1, v), a2 = cross(r2, v)
/**
 * A prismatic joint. This joint provides one degree of freedom: translation
 * along an axis fixed in bodyA. Relative rotation is prevented. You can
 * use a joint limit to restrict the range of motion and a joint motor to
 * drive the motion or to model joint friction.
 */
class b2PrismaticJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super(def);
        /** @internal protected */
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        /** @internal protected */
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        /** @internal protected */
        this.m_localXAxisA = new b2_math_1.b2Vec2();
        this.m_localYAxisA = new b2_math_1.b2Vec2();
        /** @internal protected */
        this.m_referenceAngle = 0;
        this.m_impulse = new b2_math_1.b2Vec2();
        this.m_motorImpulse = 0;
        this.m_lowerImpulse = 0;
        this.m_upperImpulse = 0;
        this.m_lowerTranslation = 0;
        this.m_upperTranslation = 0;
        this.m_maxMotorForce = 0;
        this.m_motorSpeed = 0;
        this.m_enableLimit = false;
        this.m_enableMotor = false;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_axis = new b2_math_1.b2Vec2();
        this.m_perp = new b2_math_1.b2Vec2();
        this.m_s1 = 0;
        this.m_s2 = 0;
        this.m_a1 = 0;
        this.m_a2 = 0;
        this.m_K = new b2_math_1.b2Mat22();
        this.m_translation = 0;
        this.m_axialMass = 0;
        this.m_localAnchorA.Copy((_a = def.localAnchorA) !== null && _a !== void 0 ? _a : b2_math_1.b2Vec2.ZERO);
        this.m_localAnchorB.Copy((_b = def.localAnchorB) !== null && _b !== void 0 ? _b : b2_math_1.b2Vec2.ZERO);
        b2_math_1.b2Vec2.Normalize((_c = def.localAxisA) !== null && _c !== void 0 ? _c : b2_math_1.b2Vec2.UNITX, this.m_localXAxisA);
        b2_math_1.b2Vec2.CrossOneVec2(this.m_localXAxisA, this.m_localYAxisA);
        this.m_referenceAngle = (_d = def.referenceAngle) !== null && _d !== void 0 ? _d : 0;
        this.m_lowerTranslation = (_e = def.lowerTranslation) !== null && _e !== void 0 ? _e : 0;
        this.m_upperTranslation = (_f = def.upperTranslation) !== null && _f !== void 0 ? _f : 0;
        // b2Assert(this.m_lowerTranslation <= this.m_upperTranslation);
        this.m_maxMotorForce = (_g = def.maxMotorForce) !== null && _g !== void 0 ? _g : 0;
        this.m_motorSpeed = (_h = def.motorSpeed) !== null && _h !== void 0 ? _h : 0;
        this.m_enableLimit = (_j = def.enableLimit) !== null && _j !== void 0 ? _j : false;
        this.m_enableMotor = (_k = def.enableMotor) !== null && _k !== void 0 ? _k : false;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = data.positions[this.m_indexA].c;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const cB = data.positions[this.m_indexB].c;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB, lalcA, lalcB, rA, rB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        // Compute the effective masses.
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), rB);
        const d = b2_math_1.b2Vec2.Subtract(cB, cA, temp.InitVelocityConstraints.d).Add(rB).Subtract(rA);
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        // Compute motor Jacobian and effective mass.
        b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localXAxisA, this.m_axis);
        this.m_a1 = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), this.m_axis);
        this.m_a2 = b2_math_1.b2Vec2.Cross(rB, this.m_axis);
        this.m_axialMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
        if (this.m_axialMass > 0) {
            this.m_axialMass = 1 / this.m_axialMass;
        }
        // Prismatic constraint.
        b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localYAxisA, this.m_perp);
        this.m_s1 = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), this.m_perp);
        this.m_s2 = b2_math_1.b2Vec2.Cross(rB, this.m_perp);
        const k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
        const k12 = iA * this.m_s1 + iB * this.m_s2;
        let k22 = iA + iB;
        if (k22 === 0) {
            // For bodies with fixed rotation.
            k22 = 1;
        }
        this.m_K.ex.Set(k11, k12);
        this.m_K.ey.Set(k12, k22);
        if (this.m_enableLimit) {
            this.m_translation = b2_math_1.b2Vec2.Dot(this.m_axis, d);
        }
        else {
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        if (!this.m_enableMotor) {
            this.m_motorImpulse = 0;
        }
        if (data.step.warmStarting) {
            // Account for variable time step.
            this.m_impulse.Scale(data.step.dtRatio);
            this.m_motorImpulse *= data.step.dtRatio;
            this.m_lowerImpulse *= data.step.dtRatio;
            this.m_upperImpulse *= data.step.dtRatio;
            const axialImpulse = this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse;
            const { P } = temp.InitVelocityConstraints;
            b2_math_1.b2Vec2.Scale(this.m_impulse.x, this.m_perp, P).AddScaled(axialImpulse, this.m_axis);
            const LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y + axialImpulse * this.m_a1;
            const LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y + axialImpulse * this.m_a2;
            vA.SubtractScaled(mA, P);
            wA -= iA * LA;
            vB.AddScaled(mB, P);
            wB += iB * LB;
        }
        else {
            this.m_impulse.SetZero();
            this.m_motorImpulse = 0;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const { P, df } = temp.SolveVelocityConstraints;
        // Solve linear motor constraint.
        if (this.m_enableMotor) {
            const Cdot = b2_math_1.b2Vec2.Dot(this.m_axis, b2_math_1.b2Vec2.Subtract(vB, vA, b2_math_1.b2Vec2.s_t0)) + this.m_a2 * wB - this.m_a1 * wA;
            let impulse = this.m_axialMass * (this.m_motorSpeed - Cdot);
            const oldImpulse = this.m_motorImpulse;
            const maxImpulse = data.step.dt * this.m_maxMotorForce;
            this.m_motorImpulse = (0, b2_math_1.b2Clamp)(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            b2_math_1.b2Vec2.Scale(impulse, this.m_axis, P);
            const LA = impulse * this.m_a1;
            const LB = impulse * this.m_a2;
            vA.SubtractScaled(mA, P);
            wA -= iA * LA;
            vB.AddScaled(mB, P);
            wB += iB * LB;
        }
        if (this.m_enableLimit) {
            // Lower limit
            {
                const C = this.m_translation - this.m_lowerTranslation;
                const Cdot = b2_math_1.b2Vec2.Dot(this.m_axis, b2_math_1.b2Vec2.Subtract(vB, vA, b2_math_1.b2Vec2.s_t0)) + this.m_a2 * wB - this.m_a1 * wA;
                let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0) * data.step.inv_dt);
                const oldImpulse = this.m_lowerImpulse;
                this.m_lowerImpulse = Math.max(this.m_lowerImpulse + impulse, 0);
                impulse = this.m_lowerImpulse - oldImpulse;
                b2_math_1.b2Vec2.Scale(impulse, this.m_axis, P);
                const LA = impulse * this.m_a1;
                const LB = impulse * this.m_a2;
                vA.SubtractScaled(mA, P);
                wA -= iA * LA;
                vB.AddScaled(mB, P);
                wB += iB * LB;
            }
            // Upper limit
            // Note: signs are flipped to keep C positive when the constraint is satisfied.
            // This also keeps the impulse positive when the limit is active.
            {
                const C = this.m_upperTranslation - this.m_translation;
                const Cdot = b2_math_1.b2Vec2.Dot(this.m_axis, b2_math_1.b2Vec2.Subtract(vA, vB, b2_math_1.b2Vec2.s_t0)) + this.m_a1 * wA - this.m_a2 * wB;
                let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0) * data.step.inv_dt);
                const oldImpulse = this.m_upperImpulse;
                this.m_upperImpulse = Math.max(this.m_upperImpulse + impulse, 0);
                impulse = this.m_upperImpulse - oldImpulse;
                b2_math_1.b2Vec2.Scale(impulse, this.m_axis, P);
                const LA = impulse * this.m_a1;
                const LB = impulse * this.m_a2;
                vA.AddScaled(mA, P);
                wA += iA * LA;
                vB.SubtractScaled(mB, P);
                wB -= iB * LB;
            }
        }
        // Solve the prismatic constraint in block form.
        {
            const Cdot_x = b2_math_1.b2Vec2.Dot(this.m_perp, b2_math_1.b2Vec2.Subtract(vB, vA, b2_math_1.b2Vec2.s_t0)) + this.m_s2 * wB - this.m_s1 * wA;
            const Cdot_y = wB - wA;
            this.m_K.Solve(-Cdot_x, -Cdot_y, df);
            this.m_impulse.Add(df);
            b2_math_1.b2Vec2.Scale(df.x, this.m_perp, P);
            const LA = df.x * this.m_s1 + df.y;
            const LB = df.x * this.m_s2 + df.y;
            vA.SubtractScaled(mA, P);
            wA -= iA * LA;
            vB.AddScaled(mB, P);
            wB += iB * LB;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /**
     * A velocity based solver computes reaction forces(impulses) using the velocity constraint solver.Under this context,
     * the position solver is not there to resolve forces.It is only there to cope with integration error.
     *
     * Therefore, the pseudo impulses in the position solver do not have any physical meaning.Thus it is okay if they suck.
     *
     * We could take the active state from the velocity solver.However, the joint might push past the limit when the velocity
     * solver indicates the limit is inactive.
     *
     * @internal protected
     */
    SolvePositionConstraints(data) {
        const cA = data.positions[this.m_indexA].c;
        let aA = data.positions[this.m_indexA].a;
        const cB = data.positions[this.m_indexB].c;
        let aB = data.positions[this.m_indexB].a;
        const { qA, qB, lalcA, lalcB, rA, rB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        // Compute fresh Jacobians
        const { d, impulse, P } = temp.SolvePositionConstraints;
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), rB);
        b2_math_1.b2Vec2.Add(cB, rB, d).Subtract(cA).Subtract(rA);
        const axis = b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localXAxisA, this.m_axis);
        const a1 = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), axis);
        const a2 = b2_math_1.b2Vec2.Cross(rB, axis);
        const perp = b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localYAxisA, this.m_perp);
        const s1 = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), perp);
        const s2 = b2_math_1.b2Vec2.Cross(rB, perp);
        const C1_x = b2_math_1.b2Vec2.Dot(perp, d);
        const C1_y = aB - aA - this.m_referenceAngle;
        let linearError = Math.abs(C1_x);
        const angularError = Math.abs(C1_y);
        let active = false;
        let C2 = 0;
        if (this.m_enableLimit) {
            const translation = b2_math_1.b2Vec2.Dot(axis, d);
            if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2_common_1.b2_linearSlop) {
                C2 = translation;
                linearError = Math.max(linearError, Math.abs(translation));
                active = true;
            }
            else if (translation <= this.m_lowerTranslation) {
                C2 = Math.min(translation - this.m_lowerTranslation, 0);
                linearError = Math.max(linearError, this.m_lowerTranslation - translation);
                active = true;
            }
            else if (translation >= this.m_upperTranslation) {
                C2 = Math.max(translation - this.m_upperTranslation, 0);
                linearError = Math.max(linearError, translation - this.m_upperTranslation);
                active = true;
            }
        }
        if (active) {
            const k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
            const k12 = iA * s1 + iB * s2;
            const k13 = iA * s1 * a1 + iB * s2 * a2;
            let k22 = iA + iB;
            if (k22 === 0) {
                // For fixed rotation
                k22 = 1;
            }
            const k23 = iA * a1 + iB * a2;
            const k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
            const K = temp.K3;
            K.ex.Set(k11, k12, k13);
            K.ey.Set(k12, k22, k23);
            K.ez.Set(k13, k23, k33);
            K.Solve33(-C1_x, -C1_y, -C2, impulse);
        }
        else {
            const k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
            const k12 = iA * s1 + iB * s2;
            let k22 = iA + iB;
            if (k22 === 0) {
                k22 = 1;
            }
            const K = temp.K2;
            K.ex.Set(k11, k12);
            K.ey.Set(k12, k22);
            const impulse1 = K.Solve(-C1_x, -C1_y, temp.SolvePositionConstraints.impulse1);
            impulse.x = impulse1.x;
            impulse.y = impulse1.y;
            impulse.z = 0;
        }
        b2_math_1.b2Vec2.Scale(impulse.x, perp, P).AddScaled(impulse.z, axis);
        const LA = impulse.x * s1 + impulse.y + impulse.z * a1;
        const LB = impulse.x * s2 + impulse.y + impulse.z * a2;
        cA.SubtractScaled(mA, P);
        aA -= iA * LA;
        cB.AddScaled(mB, P);
        aB += iB * LB;
        data.positions[this.m_indexA].a = aA;
        data.positions[this.m_indexB].a = aB;
        return linearError <= b2_common_1.b2_linearSlop && angularError <= b2_common_1.b2_angularSlop;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        const f = this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse;
        out.x = inv_dt * (this.m_impulse.x * this.m_perp.x + f * this.m_axis.x);
        out.y = inv_dt * (this.m_impulse.x * this.m_perp.y + f * this.m_axis.y);
        return out;
    }
    GetReactionTorque(inv_dt) {
        return inv_dt * this.m_impulse.y;
    }
    GetLocalAnchorA() {
        return this.m_localAnchorA;
    }
    GetLocalAnchorB() {
        return this.m_localAnchorB;
    }
    GetLocalAxisA() {
        return this.m_localXAxisA;
    }
    GetReferenceAngle() {
        return this.m_referenceAngle;
    }
    GetJointTranslation() {
        const { pA, pB, axis, d } = temp.GetJointTranslation;
        this.m_bodyA.GetWorldPoint(this.m_localAnchorA, pA);
        this.m_bodyB.GetWorldPoint(this.m_localAnchorB, pB);
        b2_math_1.b2Vec2.Subtract(pB, pA, d);
        this.m_bodyA.GetWorldVector(this.m_localXAxisA, axis);
        const translation = b2_math_1.b2Vec2.Dot(d, axis);
        return translation;
    }
    GetJointSpeed() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const { lalcA, lalcB, rA, rB } = temp;
        b2_math_1.b2Rot.MultiplyVec2(bA.m_xf.q, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, bA.m_sweep.localCenter, lalcA), rA);
        b2_math_1.b2Rot.MultiplyVec2(bB.m_xf.q, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, bB.m_sweep.localCenter, lalcB), rB);
        const p1 = b2_math_1.b2Vec2.Add(bA.m_sweep.c, rA, b2_math_1.b2Vec2.s_t0);
        const p2 = b2_math_1.b2Vec2.Add(bB.m_sweep.c, rB, b2_math_1.b2Vec2.s_t1);
        const d = b2_math_1.b2Vec2.Subtract(p2, p1, b2_math_1.b2Vec2.s_t2);
        const axis = b2_math_1.b2Rot.MultiplyVec2(bA.m_xf.q, this.m_localXAxisA, this.m_axis);
        const vA = bA.m_linearVelocity;
        const vB = bB.m_linearVelocity;
        const wA = bA.m_angularVelocity;
        const wB = bB.m_angularVelocity;
        const speed = b2_math_1.b2Vec2.Dot(d, b2_math_1.b2Vec2.CrossScalarVec2(wA, axis, b2_math_1.b2Vec2.s_t0)) +
            b2_math_1.b2Vec2.Dot(axis, b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, rA, b2_math_1.b2Vec2.s_t1), b2_math_1.b2Vec2.s_t0));
        return speed;
    }
    IsLimitEnabled() {
        return this.m_enableLimit;
    }
    EnableLimit(flag) {
        if (flag !== this.m_enableLimit) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableLimit = flag;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        return flag;
    }
    GetLowerLimit() {
        return this.m_lowerTranslation;
    }
    GetUpperLimit() {
        return this.m_upperTranslation;
    }
    SetLimits(lower, upper) {
        // DEBUG: b2Assert(lower <= upper);
        if (lower !== this.m_lowerTranslation || upper !== this.m_upperTranslation) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_lowerTranslation = lower;
            this.m_upperTranslation = upper;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
    }
    IsMotorEnabled() {
        return this.m_enableMotor;
    }
    EnableMotor(flag) {
        if (flag !== this.m_enableMotor) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableMotor = flag;
        }
        return flag;
    }
    SetMotorSpeed(speed) {
        if (speed !== this.m_motorSpeed) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = speed;
        }
        return speed;
    }
    GetMotorSpeed() {
        return this.m_motorSpeed;
    }
    SetMaxMotorForce(force) {
        if (force !== this.m_maxMotorForce) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_maxMotorForce = force;
        }
    }
    GetMaxMotorForce() {
        return this.m_maxMotorForce;
    }
    GetMotorForce(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    Draw(draw) {
        const { p1, p2, pA, pB, axis } = temp.Draw;
        const xfA = this.m_bodyA.GetTransform();
        const xfB = this.m_bodyB.GetTransform();
        b2_math_1.b2Transform.MultiplyVec2(xfA, this.m_localAnchorA, pA);
        b2_math_1.b2Transform.MultiplyVec2(xfB, this.m_localAnchorB, pB);
        b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_localXAxisA, axis);
        draw.DrawSegment(pA, pB, b2_draw_1.debugColors.joint5);
        if (this.m_enableLimit) {
            const { lower, upper, perp } = temp.Draw;
            b2_math_1.b2Vec2.AddScaled(pA, this.m_lowerTranslation, axis, lower);
            b2_math_1.b2Vec2.AddScaled(pA, this.m_upperTranslation, axis, upper);
            b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_localYAxisA, perp);
            draw.DrawSegment(lower, upper, b2_draw_1.debugColors.joint1);
            draw.DrawSegment(b2_math_1.b2Vec2.SubtractScaled(lower, 0.5, perp, p1), b2_math_1.b2Vec2.AddScaled(lower, 0.5, perp, p2), b2_draw_1.debugColors.joint2);
            draw.DrawSegment(b2_math_1.b2Vec2.SubtractScaled(upper, 0.5, perp, p1), b2_math_1.b2Vec2.AddScaled(upper, 0.5, perp, p2), b2_draw_1.debugColors.joint3);
        }
        else {
            draw.DrawSegment(b2_math_1.b2Vec2.Subtract(pA, axis, p1), b2_math_1.b2Vec2.Add(pA, axis, p2), b2_draw_1.debugColors.joint1);
        }
        draw.DrawPoint(pA, 5, b2_draw_1.debugColors.joint1);
        draw.DrawPoint(pB, 5, b2_draw_1.debugColors.joint4);
    }
}
exports.b2PrismaticJoint = b2PrismaticJoint;


/***/ }),

/***/ "B7sG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2PolygonAndCircleContact = void 0;
const b2_collide_circle_1 = __webpack_require__("VFH1");
const b2_contact_1 = __webpack_require__("PzZv");
/** @internal */
class b2PolygonAndCircleContact extends b2_contact_1.b2Contact {
    Evaluate(manifold, xfA, xfB) {
        (0, b2_collide_circle_1.b2CollidePolygonAndCircle)(manifold, this.GetShapeA(), xfA, this.GetShapeB(), xfB);
    }
}
exports.b2PolygonAndCircleContact = b2PolygonAndCircleContact;


/***/ }),

/***/ "BdjZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Rope = exports.b2RopeTuning = exports.b2BendingModel = exports.b2StretchingModel = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_draw_1 = __webpack_require__("EMJU");
const b2_math_1 = __webpack_require__("xKh6");
const temp = {
    J1: new b2_math_1.b2Vec2(),
    J2: new b2_math_1.b2Vec2(),
    J3: new b2_math_1.b2Vec2(),
    r: new b2_math_1.b2Vec2(),
    e1: new b2_math_1.b2Vec2(),
    e2: new b2_math_1.b2Vec2(),
    Jd1: new b2_math_1.b2Vec2(),
    Jd2: new b2_math_1.b2Vec2(),
    d: new b2_math_1.b2Vec2(),
    u: new b2_math_1.b2Vec2(),
    dp1: new b2_math_1.b2Vec2(),
    dp2: new b2_math_1.b2Vec2(),
    dp3: new b2_math_1.b2Vec2(),
    d1: new b2_math_1.b2Vec2(),
    d2: new b2_math_1.b2Vec2(),
    dHat: new b2_math_1.b2Vec2(),
};
var b2StretchingModel;
(function (b2StretchingModel) {
    b2StretchingModel[b2StretchingModel["b2_pbdStretchingModel"] = 0] = "b2_pbdStretchingModel";
    b2StretchingModel[b2StretchingModel["b2_xpbdStretchingModel"] = 1] = "b2_xpbdStretchingModel";
})(b2StretchingModel = exports.b2StretchingModel || (exports.b2StretchingModel = {}));
var b2BendingModel;
(function (b2BendingModel) {
    b2BendingModel[b2BendingModel["b2_springAngleBendingModel"] = 0] = "b2_springAngleBendingModel";
    b2BendingModel[b2BendingModel["b2_pbdAngleBendingModel"] = 1] = "b2_pbdAngleBendingModel";
    b2BendingModel[b2BendingModel["b2_xpbdAngleBendingModel"] = 2] = "b2_xpbdAngleBendingModel";
    b2BendingModel[b2BendingModel["b2_pbdDistanceBendingModel"] = 3] = "b2_pbdDistanceBendingModel";
    b2BendingModel[b2BendingModel["b2_pbdHeightBendingModel"] = 4] = "b2_pbdHeightBendingModel";
    b2BendingModel[b2BendingModel["b2_pbdTriangleBendingModel"] = 5] = "b2_pbdTriangleBendingModel";
})(b2BendingModel = exports.b2BendingModel || (exports.b2BendingModel = {}));
class b2RopeTuning {
    constructor() {
        this.stretchingModel = b2StretchingModel.b2_pbdStretchingModel;
        this.bendingModel = b2BendingModel.b2_pbdAngleBendingModel;
        this.damping = 0;
        this.stretchStiffness = 1;
        this.stretchHertz = 0;
        this.stretchDamping = 0;
        this.bendStiffness = 0.5;
        this.bendHertz = 1;
        this.bendDamping = 0;
        this.isometric = false;
        this.fixedEffectiveMass = false;
        this.warmStart = false;
    }
    Copy(other) {
        this.stretchingModel = other.stretchingModel;
        this.bendingModel = other.bendingModel;
        this.damping = other.damping;
        this.stretchStiffness = other.stretchStiffness;
        this.stretchHertz = other.stretchHertz;
        this.stretchDamping = other.stretchDamping;
        this.bendStiffness = other.bendStiffness;
        this.bendHertz = other.bendHertz;
        this.bendDamping = other.bendDamping;
        this.isometric = other.isometric;
        this.fixedEffectiveMass = other.fixedEffectiveMass;
        this.warmStart = other.warmStart;
        return this;
    }
}
exports.b2RopeTuning = b2RopeTuning;
class b2RopeStretch {
    constructor() {
        this.i1 = 0;
        this.i2 = 0;
        this.invMass1 = 0;
        this.invMass2 = 0;
        this.L = 0;
        this.lambda = 0;
        this.spring = 0;
        this.damper = 0;
    }
}
class b2RopeBend {
    constructor() {
        this.i1 = 0;
        this.i2 = 0;
        this.i3 = 0;
        this.invMass1 = 0;
        this.invMass2 = 0;
        this.invMass3 = 0;
        this.invEffectiveMass = 0;
        this.lambda = 0;
        this.L1 = 0;
        this.L2 = 0;
        this.alpha1 = 0;
        this.alpha2 = 0;
        this.spring = 0;
        this.damper = 0;
    }
}
class b2Rope {
    constructor(def) {
        this.m_position = new b2_math_1.b2Vec2();
        this.m_count = 0;
        this.m_stretchCount = 0;
        this.m_bendCount = 0;
        this.m_gravity = new b2_math_1.b2Vec2();
        this.m_tuning = new b2RopeTuning();
        (0, b2_common_1.b2Assert)(def.vertices.length >= 3);
        this.m_position.Copy(def.position);
        this.m_count = def.vertices.length;
        this.m_bindPositions = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_ps = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_p0s = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_vs = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_invMasses = (0, b2_common_1.b2MakeNumberArray)(this.m_count);
        for (let i = 0; i < this.m_count; ++i) {
            this.m_bindPositions[i].Copy(def.vertices[i]);
            b2_math_1.b2Vec2.Add(def.vertices[i], this.m_position, this.m_ps[i]);
            b2_math_1.b2Vec2.Add(def.vertices[i], this.m_position, this.m_p0s[i]);
            this.m_vs[i].SetZero();
            const m = def.masses[i];
            if (m > 0) {
                this.m_invMasses[i] = 1 / m;
            }
            else {
                this.m_invMasses[i] = 0;
            }
        }
        this.m_stretchCount = this.m_count - 1;
        this.m_bendCount = this.m_count - 2;
        this.m_stretchConstraints = new Array(this.m_stretchCount);
        for (let i = 0; i < this.m_stretchCount; i++)
            this.m_stretchConstraints[i] = new b2RopeStretch();
        this.m_bendConstraints = new Array(this.m_bendCount);
        for (let i = 0; i < this.m_bendCount; i++)
            this.m_bendConstraints[i] = new b2RopeBend();
        for (let i = 0; i < this.m_stretchCount; ++i) {
            const c = this.m_stretchConstraints[i];
            const p1 = this.m_ps[i];
            const p2 = this.m_ps[i + 1];
            c.i1 = i;
            c.i2 = i + 1;
            c.L = b2_math_1.b2Vec2.Distance(p1, p2);
            c.invMass1 = this.m_invMasses[i];
            c.invMass2 = this.m_invMasses[i + 1];
            c.lambda = 0;
            c.damper = 0;
            c.spring = 0;
        }
        const { J1, J2, r, e1, e2, Jd1, Jd2 } = temp;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const p1 = this.m_ps[i];
            const p2 = this.m_ps[i + 1];
            const p3 = this.m_ps[i + 2];
            c.i1 = i;
            c.i2 = i + 1;
            c.i3 = i + 2;
            c.invMass1 = this.m_invMasses[i];
            c.invMass2 = this.m_invMasses[i + 1];
            c.invMass3 = this.m_invMasses[i + 2];
            c.invEffectiveMass = 0;
            c.L1 = b2_math_1.b2Vec2.Distance(p1, p2);
            c.L2 = b2_math_1.b2Vec2.Distance(p2, p3);
            c.lambda = 0;
            // Pre-compute effective mass (TODO use flattened config)
            b2_math_1.b2Vec2.Subtract(p2, p1, e1);
            b2_math_1.b2Vec2.Subtract(p3, p2, e2);
            const L1sqr = e1.LengthSquared();
            const L2sqr = e2.LengthSquared();
            if (L1sqr * L2sqr === 0) {
                continue;
            }
            b2_math_1.b2Vec2.Skew(e1, Jd1).Scale(-1 / L1sqr);
            b2_math_1.b2Vec2.Skew(e2, Jd2).Scale(1 / L2sqr);
            b2_math_1.b2Vec2.Negate(Jd1, J1);
            b2_math_1.b2Vec2.Subtract(Jd1, Jd2, J2);
            const J3 = Jd2;
            c.invEffectiveMass =
                c.invMass1 * b2_math_1.b2Vec2.Dot(J1, J1) + c.invMass2 * b2_math_1.b2Vec2.Dot(J2, J2) + c.invMass3 * b2_math_1.b2Vec2.Dot(J3, J3);
            b2_math_1.b2Vec2.Subtract(p3, p1, r);
            const rr = r.LengthSquared();
            if (rr === 0) {
                continue;
            }
            // a1 = h2 / (h1 + h2)
            // a2 = h1 / (h1 + h2)
            c.alpha1 = b2_math_1.b2Vec2.Dot(e2, r) / rr;
            c.alpha2 = b2_math_1.b2Vec2.Dot(e1, r) / rr;
        }
        this.m_gravity.Copy(def.gravity);
        this.SetTuning(def.tuning);
    }
    SetTuning(tuning) {
        this.m_tuning.Copy(tuning);
        // Pre-compute spring and damper values based on tuning
        const bendOmega = 2 * Math.PI * this.m_tuning.bendHertz;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const L1sqr = c.L1 * c.L1;
            const L2sqr = c.L2 * c.L2;
            if (L1sqr * L2sqr === 0) {
                c.spring = 0;
                c.damper = 0;
                continue;
            }
            // Flatten the triangle formed by the two edges
            const J2 = 1 / c.L1 + 1 / c.L2;
            const sum = c.invMass1 / L1sqr + c.invMass2 * J2 * J2 + c.invMass3 / L2sqr;
            if (sum === 0) {
                c.spring = 0;
                c.damper = 0;
                continue;
            }
            const mass = 1 / sum;
            c.spring = mass * bendOmega * bendOmega;
            c.damper = 2 * mass * this.m_tuning.bendDamping * bendOmega;
        }
        const stretchOmega = 2 * Math.PI * this.m_tuning.stretchHertz;
        for (let i = 0; i < this.m_stretchCount; ++i) {
            const c = this.m_stretchConstraints[i];
            const sum = c.invMass1 + c.invMass2;
            if (sum === 0) {
                continue;
            }
            const mass = 1 / sum;
            c.spring = mass * stretchOmega * stretchOmega;
            c.damper = 2 * mass * this.m_tuning.stretchDamping * stretchOmega;
        }
    }
    Step(dt, iterations, position) {
        if (dt === 0) {
            return;
        }
        const inv_dt = 1 / dt;
        const d = Math.exp(-dt * this.m_tuning.damping);
        // Apply gravity and damping
        for (let i = 0; i < this.m_count; ++i) {
            if (this.m_invMasses[i] > 0) {
                this.m_vs[i].Scale(d);
                this.m_vs[i].AddScaled(dt, this.m_gravity);
            }
            else {
                this.m_vs[i].x = inv_dt * (this.m_bindPositions[i].x + position.x - this.m_p0s[i].x);
                this.m_vs[i].y = inv_dt * (this.m_bindPositions[i].y + position.y - this.m_p0s[i].y);
            }
        }
        // Apply bending spring
        if (this.m_tuning.bendingModel === b2BendingModel.b2_springAngleBendingModel) {
            this.ApplyBendForces(dt);
        }
        for (let i = 0; i < this.m_bendCount; ++i) {
            this.m_bendConstraints[i].lambda = 0;
        }
        for (let i = 0; i < this.m_stretchCount; ++i) {
            this.m_stretchConstraints[i].lambda = 0;
        }
        // Update position
        for (let i = 0; i < this.m_count; ++i) {
            this.m_ps[i].AddScaled(dt, this.m_vs[i]);
        }
        // Solve constraints
        for (let i = 0; i < iterations; ++i) {
            if (this.m_tuning.bendingModel === b2BendingModel.b2_pbdAngleBendingModel) {
                this.SolveBend_PBD_Angle();
            }
            else if (this.m_tuning.bendingModel === b2BendingModel.b2_xpbdAngleBendingModel) {
                this.SolveBend_XPBD_Angle(dt);
            }
            else if (this.m_tuning.bendingModel === b2BendingModel.b2_pbdDistanceBendingModel) {
                this.SolveBend_PBD_Distance();
            }
            else if (this.m_tuning.bendingModel === b2BendingModel.b2_pbdHeightBendingModel) {
                this.SolveBend_PBD_Height();
            }
            else if (this.m_tuning.bendingModel === b2BendingModel.b2_pbdTriangleBendingModel) {
                this.SolveBend_PBD_Triangle();
            }
            if (this.m_tuning.stretchingModel === b2StretchingModel.b2_pbdStretchingModel) {
                this.SolveStretch_PBD();
            }
            else if (this.m_tuning.stretchingModel === b2StretchingModel.b2_xpbdStretchingModel) {
                this.SolveStretch_XPBD(dt);
            }
        }
        // Constrain velocity
        for (let i = 0; i < this.m_count; ++i) {
            this.m_vs[i].x = inv_dt * (this.m_ps[i].x - this.m_p0s[i].x);
            this.m_vs[i].y = inv_dt * (this.m_ps[i].y - this.m_p0s[i].y);
            this.m_p0s[i].Copy(this.m_ps[i]);
        }
    }
    Reset(position) {
        this.m_position.Copy(position);
        for (let i = 0; i < this.m_count; ++i) {
            b2_math_1.b2Vec2.Add(this.m_bindPositions[i], this.m_position, this.m_ps[i]);
            this.m_p0s[i].Copy(this.m_ps[i]);
            this.m_vs[i].SetZero();
        }
        for (let i = 0; i < this.m_bendCount; ++i) {
            this.m_bendConstraints[i].lambda = 0;
        }
        for (let i = 0; i < this.m_stretchCount; ++i) {
            this.m_stretchConstraints[i].lambda = 0;
        }
    }
    SolveStretch_PBD() {
        const stiffness = this.m_tuning.stretchStiffness;
        const { d } = temp;
        for (let i = 0; i < this.m_stretchCount; ++i) {
            const c = this.m_stretchConstraints[i];
            const p1 = this.m_ps[c.i1];
            const p2 = this.m_ps[c.i2];
            b2_math_1.b2Vec2.Subtract(p2, p1, d);
            const L = d.Normalize();
            const sum = c.invMass1 + c.invMass2;
            if (sum === 0) {
                continue;
            }
            const s1 = c.invMass1 / sum;
            const s2 = c.invMass2 / sum;
            p1.SubtractScaled(stiffness * s1 * (c.L - L), d);
            p2.AddScaled(stiffness * s2 * (c.L - L), d);
        }
    }
    SolveStretch_XPBD(dt) {
        // 	b2Assert(dt > 0);
        const { dp1, dp2, u, J1 } = temp;
        for (let i = 0; i < this.m_stretchCount; ++i) {
            const c = this.m_stretchConstraints[i];
            const p1 = this.m_ps[c.i1];
            const p2 = this.m_ps[c.i2];
            b2_math_1.b2Vec2.Subtract(p1, this.m_p0s[c.i1], dp1);
            b2_math_1.b2Vec2.Subtract(p2, this.m_p0s[c.i2], dp2);
            b2_math_1.b2Vec2.Subtract(p2, p1, u);
            const L = u.Normalize();
            b2_math_1.b2Vec2.Negate(u, J1);
            const J2 = u;
            const sum = c.invMass1 + c.invMass2;
            if (sum === 0) {
                continue;
            }
            const alpha = 1 / (c.spring * dt * dt); // 1 / kg
            const beta = dt * dt * c.damper; // kg * s
            const sigma = (alpha * beta) / dt; // non-dimensional
            const C = L - c.L;
            // This is using the initial velocities
            const Cdot = b2_math_1.b2Vec2.Dot(J1, dp1) + b2_math_1.b2Vec2.Dot(J2, dp2);
            const B = C + alpha * c.lambda + sigma * Cdot;
            const sum2 = (1 + sigma) * sum + alpha;
            const impulse = -B / sum2;
            p1.AddScaled(c.invMass1 * impulse, J1);
            p2.AddScaled(c.invMass2 * impulse, J2);
            c.lambda += impulse;
        }
    }
    SolveBend_PBD_Angle() {
        const stiffness = this.m_tuning.bendStiffness;
        const { Jd1, Jd2, J1, J2, d1, d2 } = temp;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const p1 = this.m_ps[c.i1];
            const p2 = this.m_ps[c.i2];
            const p3 = this.m_ps[c.i3];
            b2_math_1.b2Vec2.Subtract(p2, p1, d1);
            b2_math_1.b2Vec2.Subtract(p3, p2, d2);
            const a = b2_math_1.b2Vec2.Cross(d1, d2);
            const b = b2_math_1.b2Vec2.Dot(d1, d2);
            const angle = Math.atan2(a, b);
            let L1sqr;
            let L2sqr;
            if (this.m_tuning.isometric) {
                L1sqr = c.L1 * c.L1;
                L2sqr = c.L2 * c.L2;
            }
            else {
                L1sqr = d1.LengthSquared();
                L2sqr = d2.LengthSquared();
            }
            if (L1sqr * L2sqr === 0) {
                continue;
            }
            b2_math_1.b2Vec2.Skew(d1, Jd1).Scale(-1 / L1sqr);
            b2_math_1.b2Vec2.Skew(d2, Jd2).Scale(1 / L2sqr);
            b2_math_1.b2Vec2.Negate(Jd1, J1);
            b2_math_1.b2Vec2.Subtract(Jd1, Jd2, J2);
            const J3 = Jd2;
            let sum;
            if (this.m_tuning.fixedEffectiveMass) {
                sum = c.invEffectiveMass;
            }
            else {
                sum =
                    c.invMass1 * b2_math_1.b2Vec2.Dot(J1, J1) + c.invMass2 * b2_math_1.b2Vec2.Dot(J2, J2) + c.invMass3 * b2_math_1.b2Vec2.Dot(J3, J3);
            }
            if (sum === 0) {
                sum = c.invEffectiveMass;
            }
            const impulse = (-stiffness * angle) / sum;
            p1.AddScaled(c.invMass1 * impulse, J1);
            p2.AddScaled(c.invMass2 * impulse, J2);
            p3.AddScaled(c.invMass3 * impulse, J3);
        }
    }
    SolveBend_XPBD_Angle(dt) {
        // b2Assert(dt > 0);
        const { dp1, dp2, dp3, d1, d2, Jd1, Jd2, J1, J2 } = temp;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const p1 = this.m_ps[c.i1];
            const p2 = this.m_ps[c.i2];
            const p3 = this.m_ps[c.i3];
            b2_math_1.b2Vec2.Subtract(p1, this.m_p0s[c.i1], dp1);
            b2_math_1.b2Vec2.Subtract(p2, this.m_p0s[c.i2], dp2);
            b2_math_1.b2Vec2.Subtract(p3, this.m_p0s[c.i3], dp3);
            b2_math_1.b2Vec2.Subtract(p2, p1, d1);
            b2_math_1.b2Vec2.Subtract(p3, p2, d2);
            let L1sqr;
            let L2sqr;
            if (this.m_tuning.isometric) {
                L1sqr = c.L1 * c.L1;
                L2sqr = c.L2 * c.L2;
            }
            else {
                L1sqr = d1.LengthSquared();
                L2sqr = d2.LengthSquared();
            }
            if (L1sqr * L2sqr === 0) {
                continue;
            }
            const a = b2_math_1.b2Vec2.Cross(d1, d2);
            const b = b2_math_1.b2Vec2.Dot(d1, d2);
            const angle = Math.atan2(a, b);
            b2_math_1.b2Vec2.Skew(d1, Jd1).Scale(-1 / L1sqr);
            b2_math_1.b2Vec2.Skew(d2, Jd2).Scale(1 / L2sqr);
            b2_math_1.b2Vec2.Negate(Jd1, J1);
            b2_math_1.b2Vec2.Subtract(Jd1, Jd2, J2);
            const J3 = Jd2;
            let sum;
            if (this.m_tuning.fixedEffectiveMass) {
                sum = c.invEffectiveMass;
            }
            else {
                sum =
                    c.invMass1 * b2_math_1.b2Vec2.Dot(J1, J1) + c.invMass2 * b2_math_1.b2Vec2.Dot(J2, J2) + c.invMass3 * b2_math_1.b2Vec2.Dot(J3, J3);
            }
            if (sum === 0) {
                continue;
            }
            const alpha = 1 / (c.spring * dt * dt);
            const beta = dt * dt * c.damper;
            const sigma = (alpha * beta) / dt;
            const C = angle;
            // This is using the initial velocities
            const Cdot = b2_math_1.b2Vec2.Dot(J1, dp1) + b2_math_1.b2Vec2.Dot(J2, dp2) + b2_math_1.b2Vec2.Dot(J3, dp3);
            const B = C + alpha * c.lambda + sigma * Cdot;
            const sum2 = (1 + sigma) * sum + alpha;
            const impulse = -B / sum2;
            p1.AddScaled(c.invMass1 * impulse, J1);
            p2.AddScaled(c.invMass2 * impulse, J2);
            p3.AddScaled(c.invMass3 * impulse, J3);
            c.lambda += impulse;
        }
    }
    SolveBend_PBD_Distance() {
        const stiffness = this.m_tuning.bendStiffness;
        const { d } = temp;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const { i1 } = c;
            const i2 = c.i3;
            const p1 = this.m_ps[i1];
            const p2 = this.m_ps[i2];
            b2_math_1.b2Vec2.Subtract(p2, p1, d);
            const L = d.Normalize();
            const sum = c.invMass1 + c.invMass3;
            if (sum === 0) {
                continue;
            }
            const s1 = c.invMass1 / sum;
            const s2 = c.invMass3 / sum;
            p1.SubtractScaled(stiffness * s1 * (c.L1 + c.L2 - L), d);
            p2.AddScaled(stiffness * s2 * (c.L1 + c.L2 - L), d);
        }
    }
    SolveBend_PBD_Height() {
        const stiffness = this.m_tuning.bendStiffness;
        const { dHat, J1, J2, J3, d } = temp;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const p1 = this.m_ps[c.i1];
            const p2 = this.m_ps[c.i2];
            const p3 = this.m_ps[c.i3];
            // Barycentric coordinates are held constant
            d.x = c.alpha1 * p1.x + c.alpha2 * p3.x - p2.x;
            d.y = c.alpha1 * p1.y + c.alpha2 * p3.y - p2.y;
            const dLen = d.Length();
            if (dLen === 0) {
                continue;
            }
            b2_math_1.b2Vec2.Scale(1 / dLen, d, dHat);
            b2_math_1.b2Vec2.Scale(c.alpha1, dHat, J1);
            b2_math_1.b2Vec2.Negate(dHat, J2);
            b2_math_1.b2Vec2.Scale(c.alpha2, dHat, J3);
            const sum = c.invMass1 * c.alpha1 * c.alpha1 + c.invMass2 + c.invMass3 * c.alpha2 * c.alpha2;
            if (sum === 0) {
                continue;
            }
            const C = dLen;
            const mass = 1 / sum;
            const impulse = -stiffness * mass * C;
            p1.AddScaled(c.invMass1 * impulse, J1);
            p2.AddScaled(c.invMass2 * impulse, J2);
            p3.AddScaled(c.invMass3 * impulse, J3);
        }
    }
    SolveBend_PBD_Triangle() {
        const stiffness = this.m_tuning.bendStiffness;
        const { d } = temp;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const b0 = this.m_ps[c.i1];
            const v = this.m_ps[c.i2];
            const b1 = this.m_ps[c.i3];
            const wb0 = c.invMass1;
            const wv = c.invMass2;
            const wb1 = c.invMass3;
            const W = wb0 + wb1 + 2 * wv;
            const invW = stiffness / W;
            d.x = v.x - (1 / 3) * (b0.x + v.x + b1.x);
            d.y = v.y - (1 / 3) * (b0.y + v.y + b1.y);
            b0.AddScaled(2 * wb0 * invW, d);
            v.AddScaled(-4 * wv * invW, d);
            b1.AddScaled(2 * wb1 * invW, d);
        }
    }
    ApplyBendForces(dt) {
        // omega = 2 * pi * hz
        const omega = 2 * Math.PI * this.m_tuning.bendHertz;
        const { d1, d2, Jd1, Jd2, J1, J2 } = temp;
        for (let i = 0; i < this.m_bendCount; ++i) {
            const c = this.m_bendConstraints[i];
            const p1 = this.m_ps[c.i1];
            const p2 = this.m_ps[c.i2];
            const p3 = this.m_ps[c.i3];
            const v1 = this.m_vs[c.i1];
            const v2 = this.m_vs[c.i2];
            const v3 = this.m_vs[c.i3];
            b2_math_1.b2Vec2.Subtract(p2, p1, d1);
            b2_math_1.b2Vec2.Subtract(p3, p2, d2);
            let L1sqr;
            let L2sqr;
            if (this.m_tuning.isometric) {
                L1sqr = c.L1 * c.L1;
                L2sqr = c.L2 * c.L2;
            }
            else {
                L1sqr = d1.LengthSquared();
                L2sqr = d2.LengthSquared();
            }
            if (L1sqr * L2sqr === 0) {
                continue;
            }
            const a = b2_math_1.b2Vec2.Cross(d1, d2);
            const b = b2_math_1.b2Vec2.Dot(d1, d2);
            const angle = Math.atan2(a, b);
            b2_math_1.b2Vec2.Skew(d1, Jd1).Scale(-1 / L1sqr);
            b2_math_1.b2Vec2.Skew(d2, Jd2).Scale(1 / L2sqr);
            b2_math_1.b2Vec2.Negate(Jd1, J1);
            b2_math_1.b2Vec2.Subtract(Jd1, Jd2, J2);
            const J3 = Jd2;
            let sum;
            if (this.m_tuning.fixedEffectiveMass) {
                sum = c.invEffectiveMass;
            }
            else {
                sum =
                    c.invMass1 * b2_math_1.b2Vec2.Dot(J1, J1) + c.invMass2 * b2_math_1.b2Vec2.Dot(J2, J2) + c.invMass3 * b2_math_1.b2Vec2.Dot(J3, J3);
            }
            if (sum === 0) {
                continue;
            }
            const mass = 1 / sum;
            const spring = mass * omega * omega;
            const damper = 2 * mass * this.m_tuning.bendDamping * omega;
            const C = angle;
            const Cdot = b2_math_1.b2Vec2.Dot(J1, v1) + b2_math_1.b2Vec2.Dot(J2, v2) + b2_math_1.b2Vec2.Dot(J3, v3);
            const impulse = -dt * (spring * C + damper * Cdot);
            this.m_vs[c.i1].AddScaled(c.invMass1 * impulse, J1);
            this.m_vs[c.i2].AddScaled(c.invMass2 * impulse, J2);
            this.m_vs[c.i3].AddScaled(c.invMass3 * impulse, J3);
        }
    }
    Draw(draw) {
        for (let i = 0; i < this.m_count - 1; ++i) {
            draw.DrawSegment(this.m_ps[i], this.m_ps[i + 1], b2_draw_1.debugColors.rope);
            const pc = this.m_invMasses[i] > 0 ? b2_draw_1.debugColors.ropePointD : b2_draw_1.debugColors.ropePointG;
            draw.DrawPoint(this.m_ps[i], 5, pc);
        }
        const pc = this.m_invMasses[this.m_count - 1] > 0 ? b2_draw_1.debugColors.ropePointD : b2_draw_1.debugColors.ropePointG;
        draw.DrawPoint(this.m_ps[this.m_count - 1], 5, pc);
    }
}
exports.b2Rope = b2Rope;


/***/ }),

/***/ "By+T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Fixture = exports.b2FixtureProxy = exports.b2DefaultFilter = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_math_1 = __webpack_require__("xKh6");
const b2_collision_1 = __webpack_require__("h2hE");
const b2_shape_1 = __webpack_require__("UjSx");
const b2_common_1 = __webpack_require__("UJxA");
const b2_settings_1 = __webpack_require__("bg0S");
const temp = {
    c1: new b2_math_1.b2Vec2(),
    c2: new b2_math_1.b2Vec2(),
};
exports.b2DefaultFilter = {
    categoryBits: 0x0001,
    maskBits: 0xffff,
    groupIndex: 0,
};
/**
 * This proxy is used internally to connect fixtures to the broad-phase.
 */
class b2FixtureProxy {
    constructor(fixture, broadPhase, xf, childIndex) {
        this.aabb = new b2_collision_1.b2AABB();
        this.fixture = fixture;
        this.childIndex = childIndex;
        fixture.m_shape.ComputeAABB(this.aabb, xf, childIndex);
        this.treeNode = broadPhase.CreateProxy(this.aabb, this);
    }
}
exports.b2FixtureProxy = b2FixtureProxy;
const Synchronize_s_aabb1 = new b2_collision_1.b2AABB();
const Synchronize_s_aabb2 = new b2_collision_1.b2AABB();
const Synchronize_s_displacement = new b2_math_1.b2Vec2();
/**
 * A fixture is used to attach a shape to a body for collision detection. A fixture
 * inherits its transform from its parent. Fixtures hold additional non-geometric data
 * such as friction, collision filters, etc.
 * Fixtures are created via b2Body::CreateFixture.
 *
 * @warning you cannot reuse fixtures.
 */
class b2Fixture {
    /** @internal protected */
    constructor(body, def) {
        var _a, _b, _c, _d, _e;
        /** @internal protected */
        this.m_density = 0;
        /** @internal protected */
        this.m_next = null;
        /** @internal protected */
        this.m_friction = 0;
        /** @internal protected */
        this.m_restitution = 0;
        /** @internal protected */
        this.m_restitutionThreshold = 0;
        /** @internal protected */
        this.m_proxies = [];
        /** @internal protected */
        this.m_isSensor = false;
        this.m_userData = null;
        this.m_body = body;
        this.m_shape = def.shape.Clone();
        this.m_userData = def.userData;
        this.m_friction = (_a = def.friction) !== null && _a !== void 0 ? _a : 0.2;
        this.m_restitution = (_b = def.restitution) !== null && _b !== void 0 ? _b : 0;
        this.m_restitutionThreshold = (_c = def.restitutionThreshold) !== null && _c !== void 0 ? _c : b2_settings_1.b2_lengthUnitsPerMeter;
        this.m_filter = {
            ...exports.b2DefaultFilter,
            ...def.filter,
        };
        this.m_isSensor = (_d = def.isSensor) !== null && _d !== void 0 ? _d : false;
        this.m_density = (_e = def.density) !== null && _e !== void 0 ? _e : 0;
    }
    /** @internal protected */
    get m_proxyCount() {
        return this.m_proxies.length;
    }
    /**
     * Get the type of the child shape. You can use this to down cast to the concrete shape.
     *
     * @returns The shape type.
     */
    GetType() {
        return this.m_shape.GetType();
    }
    /**
     * Get the child shape. You can modify the child shape, however you should not change the
     * number of vertices because this will crash some collision caching mechanisms.
     * Manipulating the shape may lead to non-physical behavior.
     */
    GetShape() {
        return this.m_shape;
    }
    /**
     * Set if this fixture is a sensor.
     */
    SetSensor(sensor) {
        if (sensor !== this.m_isSensor) {
            this.m_body.SetAwake(true);
            this.m_isSensor = sensor;
        }
    }
    /**
     * Is this fixture a sensor (non-solid)?
     *
     * @returns The true if the shape is a sensor.
     */
    IsSensor() {
        return this.m_isSensor;
    }
    /**
     * Set the contact filtering data. This will not update contacts until the next time
     * step when either parent body is active and awake.
     * This automatically calls Refilter.
     */
    SetFilterData(filter) {
        var _a, _b, _c;
        this.m_filter.categoryBits = (_a = filter.categoryBits) !== null && _a !== void 0 ? _a : exports.b2DefaultFilter.categoryBits;
        this.m_filter.groupIndex = (_b = filter.groupIndex) !== null && _b !== void 0 ? _b : exports.b2DefaultFilter.groupIndex;
        this.m_filter.maskBits = (_c = filter.maskBits) !== null && _c !== void 0 ? _c : exports.b2DefaultFilter.maskBits;
        this.Refilter();
    }
    /**
     * Get the contact filtering data.
     */
    GetFilterData() {
        return this.m_filter;
    }
    /**
     * Call this if you want to establish collision that was previously disabled by b2ContactFilter::ShouldCollide.
     */
    Refilter() {
        // Flag associated contacts for filtering.
        let edge = this.m_body.GetContactList();
        while (edge) {
            const { contact } = edge;
            const fixtureA = contact.GetFixtureA();
            const fixtureB = contact.GetFixtureB();
            if (fixtureA === this || fixtureB === this) {
                contact.FlagForFiltering();
            }
            edge = edge.next;
        }
        const world = this.m_body.GetWorld();
        // Touch each proxy so that new pairs may be created
        const broadPhase = world.m_contactManager.m_broadPhase;
        for (const proxy of this.m_proxies) {
            broadPhase.TouchProxy(proxy.treeNode);
        }
    }
    /**
     * Get the parent body of this fixture. This is NULL if the fixture is not attached.
     *
     * @returns The parent body.
     */
    GetBody() {
        return this.m_body;
    }
    /**
     * Get the next fixture in the parent body's fixture list.
     *
     * @returns The next shape.
     */
    GetNext() {
        return this.m_next;
    }
    /**
     * Get the user data that was assigned in the fixture definition. Use this to
     * store your application specific data.
     */
    GetUserData() {
        return this.m_userData;
    }
    /**
     * Set the user data. Use this to store your application specific data.
     */
    SetUserData(data) {
        this.m_userData = data;
    }
    /**
     * Test a point for containment in this fixture.
     *
     * @param p A point in world coordinates.
     */
    TestPoint(p) {
        return this.m_shape.TestPoint(this.m_body.GetTransform(), p);
    }
    /**
     * Cast a ray against this shape.
     *
     * @param output The ray-cast results.
     * @param input The ray-cast input parameters.
     */
    RayCast(output, input, childIndex) {
        return this.m_shape.RayCast(output, input, this.m_body.GetTransform(), childIndex);
    }
    /**
     * Get the mass data for this fixture. The mass data is based on the density and
     * the shape. The rotational inertia is about the shape's origin. This operation
     * may be expensive.
     */
    GetMassData(massData = new b2_shape_1.b2MassData()) {
        this.m_shape.ComputeMass(massData, this.m_density);
        return massData;
    }
    /**
     * Set the density of this fixture. This will _not_ automatically adjust the mass
     * of the body. You must call b2Body::ResetMassData to update the body's mass.
     */
    SetDensity(density) {
        // DEBUG: b2Assert(Number.isFinite(density) && density >= 0);
        this.m_density = density;
    }
    /**
     * Get the density of this fixture.
     */
    GetDensity() {
        return this.m_density;
    }
    /**
     * Get the coefficient of friction.
     */
    GetFriction() {
        return this.m_friction;
    }
    /**
     * Set the coefficient of friction. This will _not_ change the friction of
     * existing contacts.
     */
    SetFriction(friction) {
        this.m_friction = friction;
    }
    /**
     * Get the coefficient of restitution.
     */
    GetRestitution() {
        return this.m_restitution;
    }
    /**
     * Set the coefficient of restitution. This will _not_ change the restitution of
     * existing contacts.
     */
    SetRestitution(restitution) {
        this.m_restitution = restitution;
    }
    SetRestitutionThreshold(threshold) {
        this.m_restitutionThreshold = threshold;
    }
    /**
     * Get the fixture's AABB. This AABB may be enlarge and/or stale.
     * If you need a more accurate AABB, compute it using the shape and
     * the body transform.
     */
    GetAABB(childIndex) {
        // DEBUG: b2Assert(0 <= childIndex && childIndex < this.m_proxyCount);
        return this.m_proxies[childIndex].aabb;
    }
    /**
     * These support body activation/deactivation.
     *
     * @internal protected
     */
    CreateProxies(broadPhase, xf) {
        (0, b2_common_1.b2Assert)(this.m_proxies.length === 0);
        // Create proxies in the broad-phase.
        this.m_proxies.length = this.m_shape.GetChildCount();
        for (let i = 0; i < this.m_proxies.length; ++i) {
            this.m_proxies[i] = new b2FixtureProxy(this, broadPhase, xf, i);
        }
    }
    /** @internal protected */
    DestroyProxies(broadPhase) {
        // Destroy proxies in the broad-phase.
        for (const proxy of this.m_proxies) {
            broadPhase.DestroyProxy(proxy.treeNode);
        }
        this.m_proxies.length = 0;
    }
    /** @internal protected */
    Synchronize(broadPhase, transform1, transform2) {
        const { c1, c2 } = temp;
        const displacement = Synchronize_s_displacement;
        for (const proxy of this.m_proxies) {
            // Compute an AABB that covers the swept shape (may miss some rotation effect).
            const aabb1 = Synchronize_s_aabb1;
            const aabb2 = Synchronize_s_aabb2;
            this.m_shape.ComputeAABB(aabb1, transform1, proxy.childIndex);
            this.m_shape.ComputeAABB(aabb2, transform2, proxy.childIndex);
            proxy.aabb.Combine2(aabb1, aabb2);
            b2_math_1.b2Vec2.Subtract(aabb2.GetCenter(c2), aabb1.GetCenter(c1), displacement);
            broadPhase.MoveProxy(proxy.treeNode, proxy.aabb, displacement);
        }
    }
}
exports.b2Fixture = b2Fixture;


/***/ }),

/***/ "EKx6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2CollidePolygons = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_collision_1 = __webpack_require__("h2hE");
const b2FindMaxSeparation_s_xf = new b2_math_1.b2Transform();
const b2FindMaxSeparation_s_n = new b2_math_1.b2Vec2();
const b2FindMaxSeparation_s_v1 = new b2_math_1.b2Vec2();
/** Find the max separation between poly1 and poly2 using edge normals from poly1. */
function b2FindMaxSeparation(edgeIndex, poly1, xf1, poly2, xf2) {
    const count1 = poly1.m_count;
    const count2 = poly2.m_count;
    const n1s = poly1.m_normals;
    const v1s = poly1.m_vertices;
    const v2s = poly2.m_vertices;
    const xf = b2_math_1.b2Transform.TransposeMultiply(xf2, xf1, b2FindMaxSeparation_s_xf);
    let bestIndex = 0;
    let maxSeparation = -b2_common_1.b2_maxFloat;
    for (let i = 0; i < count1; ++i) {
        // Get poly1 normal in frame2.
        const n = b2_math_1.b2Rot.MultiplyVec2(xf.q, n1s[i], b2FindMaxSeparation_s_n);
        const v1 = b2_math_1.b2Transform.MultiplyVec2(xf, v1s[i], b2FindMaxSeparation_s_v1);
        // Find deepest point for normal i.
        let si = b2_common_1.b2_maxFloat;
        for (let j = 0; j < count2; ++j) {
            const sij = b2_math_1.b2Vec2.Dot(n, b2_math_1.b2Vec2.Subtract(v2s[j], v1, b2_math_1.b2Vec2.s_t0));
            if (sij < si) {
                si = sij;
            }
        }
        if (si > maxSeparation) {
            maxSeparation = si;
            bestIndex = i;
        }
    }
    edgeIndex[0] = bestIndex;
    return maxSeparation;
}
const b2FindIncidentEdge_s_normal1 = new b2_math_1.b2Vec2();
function b2FindIncidentEdge(c, poly1, xf1, edge1, poly2, xf2) {
    const normals1 = poly1.m_normals;
    const count2 = poly2.m_count;
    const vertices2 = poly2.m_vertices;
    const normals2 = poly2.m_normals;
    // DEBUG: b2Assert(0 <= edge1 && edge1 < poly1.m_count);
    // Get the normal of the reference edge in poly2's frame.
    const normal1 = b2_math_1.b2Rot.TransposeMultiplyVec2(xf2.q, b2_math_1.b2Rot.MultiplyVec2(xf1.q, normals1[edge1], b2_math_1.b2Vec2.s_t0), b2FindIncidentEdge_s_normal1);
    // Find the incident edge on poly2.
    let index = 0;
    let minDot = b2_common_1.b2_maxFloat;
    for (let i = 0; i < count2; ++i) {
        const dot = b2_math_1.b2Vec2.Dot(normal1, normals2[i]);
        if (dot < minDot) {
            minDot = dot;
            index = i;
        }
    }
    // Build the clip vertices for the incident edge.
    const i1 = index;
    const i2 = i1 + 1 < count2 ? i1 + 1 : 0;
    const c0 = c[0];
    b2_math_1.b2Transform.MultiplyVec2(xf2, vertices2[i1], c0.v);
    const cf0 = c0.id.cf;
    cf0.indexA = edge1;
    cf0.indexB = i1;
    cf0.typeA = b2_collision_1.b2ContactFeatureType.e_face;
    cf0.typeB = b2_collision_1.b2ContactFeatureType.e_vertex;
    const c1 = c[1];
    b2_math_1.b2Transform.MultiplyVec2(xf2, vertices2[i2], c1.v);
    const cf1 = c1.id.cf;
    cf1.indexA = edge1;
    cf1.indexB = i2;
    cf1.typeA = b2_collision_1.b2ContactFeatureType.e_face;
    cf1.typeB = b2_collision_1.b2ContactFeatureType.e_vertex;
}
const b2CollidePolygons_s_incidentEdge = [new b2_collision_1.b2ClipVertex(), new b2_collision_1.b2ClipVertex()];
const b2CollidePolygons_s_clipPoints1 = [new b2_collision_1.b2ClipVertex(), new b2_collision_1.b2ClipVertex()];
const b2CollidePolygons_s_clipPoints2 = [new b2_collision_1.b2ClipVertex(), new b2_collision_1.b2ClipVertex()];
const b2CollidePolygons_s_edgeA = [0];
const b2CollidePolygons_s_edgeB = [0];
const b2CollidePolygons_s_localTangent = new b2_math_1.b2Vec2();
const b2CollidePolygons_s_localNormal = new b2_math_1.b2Vec2();
const b2CollidePolygons_s_planePoint = new b2_math_1.b2Vec2();
const b2CollidePolygons_s_normal = new b2_math_1.b2Vec2();
const b2CollidePolygons_s_tangent = new b2_math_1.b2Vec2();
const b2CollidePolygons_s_ntangent = new b2_math_1.b2Vec2();
const b2CollidePolygons_s_v11 = new b2_math_1.b2Vec2();
const b2CollidePolygons_s_v12 = new b2_math_1.b2Vec2();
/**
 * Find edge normal of max separation on A - return if separating axis is found
 * Find edge normal of max separation on B - return if separation axis is found
 * Choose reference edge as min(minA, minB)
 * Find incident edge
 * Clip

 * The normal points from 1 to 2
 */
function b2CollidePolygons(manifold, polyA, xfA, polyB, xfB) {
    manifold.pointCount = 0;
    const totalRadius = polyA.m_radius + polyB.m_radius;
    const edgeIndexA = b2CollidePolygons_s_edgeA;
    const separationA = b2FindMaxSeparation(edgeIndexA, polyA, xfA, polyB, xfB);
    if (separationA > totalRadius) {
        return;
    }
    const edgeIndexB = b2CollidePolygons_s_edgeB;
    const separationB = b2FindMaxSeparation(edgeIndexB, polyB, xfB, polyA, xfA);
    if (separationB > totalRadius) {
        return;
    }
    let poly1; // reference polygon
    let poly2; // incident polygon
    let xf1;
    let xf2;
    let edge1; // reference edge
    let flip;
    const k_tol = 0.1 * b2_common_1.b2_linearSlop;
    if (separationB > separationA + k_tol) {
        poly1 = polyB;
        poly2 = polyA;
        xf1 = xfB;
        xf2 = xfA;
        // eslint-disable-next-line prefer-destructuring
        edge1 = edgeIndexB[0];
        manifold.type = b2_collision_1.b2ManifoldType.e_faceB;
        flip = 1;
    }
    else {
        poly1 = polyA;
        poly2 = polyB;
        xf1 = xfA;
        xf2 = xfB;
        // eslint-disable-next-line prefer-destructuring
        edge1 = edgeIndexA[0];
        manifold.type = b2_collision_1.b2ManifoldType.e_faceA;
        flip = 0;
    }
    const incidentEdge = b2CollidePolygons_s_incidentEdge;
    b2FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
    const count1 = poly1.m_count;
    const vertices1 = poly1.m_vertices;
    const iv1 = edge1;
    const iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;
    let v11 = vertices1[iv1];
    let v12 = vertices1[iv2];
    const localTangent = b2_math_1.b2Vec2.Subtract(v12, v11, b2CollidePolygons_s_localTangent);
    localTangent.Normalize();
    const localNormal = b2_math_1.b2Vec2.CrossVec2One(localTangent, b2CollidePolygons_s_localNormal);
    const planePoint = b2_math_1.b2Vec2.Mid(v11, v12, b2CollidePolygons_s_planePoint);
    const tangent = b2_math_1.b2Rot.MultiplyVec2(xf1.q, localTangent, b2CollidePolygons_s_tangent);
    const normal = b2_math_1.b2Vec2.CrossVec2One(tangent, b2CollidePolygons_s_normal);
    v11 = b2_math_1.b2Transform.MultiplyVec2(xf1, v11, b2CollidePolygons_s_v11);
    v12 = b2_math_1.b2Transform.MultiplyVec2(xf1, v12, b2CollidePolygons_s_v12);
    // Face offset.
    const frontOffset = b2_math_1.b2Vec2.Dot(normal, v11);
    // Side offsets, extended by polytope skin thickness.
    const sideOffset1 = -b2_math_1.b2Vec2.Dot(tangent, v11) + totalRadius;
    const sideOffset2 = b2_math_1.b2Vec2.Dot(tangent, v12) + totalRadius;
    // Clip incident edge against extruded edge1 side edges.
    const clipPoints1 = b2CollidePolygons_s_clipPoints1;
    const clipPoints2 = b2CollidePolygons_s_clipPoints2;
    // Clip to box side 1
    const ntangent = b2_math_1.b2Vec2.Negate(tangent, b2CollidePolygons_s_ntangent);
    let np = (0, b2_collision_1.b2ClipSegmentToLine)(clipPoints1, incidentEdge, ntangent, sideOffset1, iv1);
    if (np < 2) {
        return;
    }
    // Clip to negative box side 1
    np = (0, b2_collision_1.b2ClipSegmentToLine)(clipPoints2, clipPoints1, tangent, sideOffset2, iv2);
    if (np < 2) {
        return;
    }
    // Now clipPoints2 contains the clipped points.
    manifold.localNormal.Copy(localNormal);
    manifold.localPoint.Copy(planePoint);
    let pointCount = 0;
    for (let i = 0; i < b2_common_1.b2_maxManifoldPoints; ++i) {
        const cv = clipPoints2[i];
        const separation = b2_math_1.b2Vec2.Dot(normal, cv.v) - frontOffset;
        if (separation <= totalRadius) {
            const cp = manifold.points[pointCount];
            b2_math_1.b2Transform.TransposeMultiplyVec2(xf2, cv.v, cp.localPoint);
            cp.id.Copy(cv.id);
            if (flip) {
                // Swap features
                const { cf } = cp.id;
                cf.indexA = cf.indexB;
                cf.indexB = cf.indexA;
                cf.typeA = cf.typeB;
                cf.typeB = cf.typeA;
            }
            ++pointCount;
        }
    }
    manifold.pointCount = pointCount;
}
exports.b2CollidePolygons = b2CollidePolygons;


/***/ }),

/***/ "EMJU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugColors = exports.b2Color = void 0;
/**
 * Color for debug drawing. Each value has the range [0,1].
 */
class b2Color {
    constructor(r = 0.5, g = 0.5, b = 0.5, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    Clone() {
        return new b2Color(this.r, this.g, this.b, this.a);
    }
    Copy(other) {
        this.r = other.r;
        this.g = other.g;
        this.b = other.b;
        this.a = other.a;
        return this;
    }
    IsEqual(color) {
        return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a;
    }
    IsZero() {
        return this.r === 0 && this.g === 0 && this.b === 0 && this.a === 0;
    }
    SetByteRGB(r, g, b) {
        this.r = r / 0xff;
        this.g = g / 0xff;
        this.b = b / 0xff;
        return this;
    }
    SetByteRGBA(r, g, b, a) {
        this.r = r / 0xff;
        this.g = g / 0xff;
        this.b = b / 0xff;
        this.a = a / 0xff;
        return this;
    }
    SetRGB(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }
    SetRGBA(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    }
    Add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        this.a += color.a;
        return this;
    }
    Subtract(color) {
        this.r -= color.r;
        this.g -= color.g;
        this.b -= color.b;
        this.a -= color.a;
        return this;
    }
    Scale(s) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        this.a *= s;
        return this;
    }
    Mix(mixColor, strength) {
        b2Color.MixColors(this, mixColor, strength);
    }
    static Add(colorA, colorB, out) {
        out.r = colorA.r + colorB.r;
        out.g = colorA.g + colorB.g;
        out.b = colorA.b + colorB.b;
        out.a = colorA.a + colorB.a;
        return out;
    }
    static Subtract(colorA, colorB, out) {
        out.r = colorA.r - colorB.r;
        out.g = colorA.g - colorB.g;
        out.b = colorA.b - colorB.b;
        out.a = colorA.a - colorB.a;
        return out;
    }
    static Scale(color, s, out) {
        out.r = color.r * s;
        out.g = color.g * s;
        out.b = color.b * s;
        out.a = color.a * s;
        return out;
    }
    static MixColors(colorA, colorB, strength) {
        const dr = strength * (colorB.r - colorA.r);
        const dg = strength * (colorB.g - colorA.g);
        const db = strength * (colorB.b - colorA.b);
        const da = strength * (colorB.a - colorA.a);
        colorA.r += dr;
        colorA.g += dg;
        colorA.b += db;
        colorA.a += da;
        colorB.r -= dr;
        colorB.g -= dg;
        colorB.b -= db;
        colorB.a -= da;
    }
}
exports.b2Color = b2Color;
b2Color.ZERO = new b2Color(0, 0, 0, 0);
b2Color.RED = new b2Color(1, 0, 0);
b2Color.GREEN = new b2Color(0, 1, 0);
b2Color.BLUE = new b2Color(0, 0, 1);
b2Color.WHITE = new b2Color(1, 1, 1);
b2Color.BLACK = new b2Color(0, 0, 0);
exports.debugColors = {
    badBody: new b2Color(1, 0, 0),
    disabledBody: new b2Color(0.5, 0.5, 0.3),
    staticBody: new b2Color(0.5, 0.9, 0.5),
    kinematicBody: new b2Color(0.5, 0.5, 0.9),
    sleepingBody: new b2Color(0.6, 0.6, 0.6),
    body: new b2Color(0.9, 0.7, 0.7),
    pair: new b2Color(0.3, 0.9, 0.9),
    aabb: new b2Color(0.9, 0.3, 0.9),
    joint1: new b2Color(0.7, 0.7, 0.7),
    joint2: new b2Color(0.3, 0.9, 0.3),
    joint3: new b2Color(0.9, 0.3, 0.3),
    joint4: new b2Color(0.3, 0.3, 0.9),
    joint5: new b2Color(0.4, 0.4, 0.4),
    joint6: new b2Color(0.5, 0.8, 0.8),
    joint7: new b2Color(0, 1, 0),
    joint8: new b2Color(0.8, 0.8, 0.8),
    rope: new b2Color(0.4, 0.5, 0.7),
    ropePointG: new b2Color(0.1, 0.8, 0.1),
    ropePointD: new b2Color(0.7, 0.2, 0.4),
};


/***/ }),

/***/ "FlG6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ContactListener = exports.b2ContactImpulse = exports.b2ContactFilter = exports.b2DestructionListener = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
/**
 * Joints and fixtures are destroyed when their associated
 * body is destroyed. Implement this listener so that you
 * may nullify references to these joints and shapes.
 */
class b2DestructionListener {
    /**
     * Called when any joint is about to be destroyed due
     * to the destruction of one of its attached bodies.
     */
    SayGoodbyeJoint(_joint) { }
    /**
     * Called when any fixture is about to be destroyed due
     * to the destruction of its parent body.
     */
    SayGoodbyeFixture(_fixture) { }
}
exports.b2DestructionListener = b2DestructionListener;
/**
 * Implement this class to provide collision filtering. In other words, you can implement
 * this class if you want finer control over contact creation.
 */
class b2ContactFilter {
    /**
     * Return true if contact calculations should be performed between these two shapes.
     *
     * @warning for performance reasons this is only called when the AABBs begin to overlap.
     */
    ShouldCollide(fixtureA, fixtureB) {
        const filterA = fixtureA.GetFilterData();
        const filterB = fixtureB.GetFilterData();
        if (filterA.groupIndex === filterB.groupIndex && filterA.groupIndex !== 0) {
            return filterA.groupIndex > 0;
        }
        return (filterA.maskBits & filterB.categoryBits) !== 0 && (filterA.categoryBits & filterB.maskBits) !== 0;
    }
}
exports.b2ContactFilter = b2ContactFilter;
b2ContactFilter.b2_defaultFilter = new b2ContactFilter();
/**
 * Contact impulses for reporting. Impulses are used instead of forces because
 * sub-step forces may approach infinity for rigid body collisions. These
 * match up one-to-one with the contact points in b2Manifold.
 */
class b2ContactImpulse {
    constructor() {
        this.normalImpulses = (0, b2_common_1.b2MakeNumberArray)(b2_common_1.b2_maxManifoldPoints);
        this.tangentImpulses = (0, b2_common_1.b2MakeNumberArray)(b2_common_1.b2_maxManifoldPoints);
        this.count = 0;
    }
}
exports.b2ContactImpulse = b2ContactImpulse;
/**
 * Implement this class to get contact information. You can use these results for
 * things like sounds and game logic. You can also get contact results by
 * traversing the contact lists after the time step. However, you might miss
 * some contacts because continuous physics leads to sub-stepping.
 * Additionally you may receive multiple callbacks for the same contact in a
 * single time step.
 * You should strive to make your callbacks efficient because there may be
 * many callbacks per time step.
 *
 * @warning You cannot create/destroy Box2d entities inside these callbacks.
 */
class b2ContactListener {
    /**
     * Called when two fixtures begin to touch.
     */
    BeginContact(_contact) { }
    /**
     * Called when two fixtures cease to touch.
     */
    EndContact(_contact) { }
    /**
     * This is called after a contact is updated. This allows you to inspect a
     * contact before it goes to the solver. If you are careful, you can modify the
     * contact manifold (e.g. disable contact).
     * A copy of the old manifold is provided so that you can detect changes.
     * Note: this is called only for awake bodies.
     * Note: this is called even when the number of contact points is zero.
     * Note: this is not called for sensors.
     * Note: if you set the number of contact points to zero, you will not
     * get an EndContact callback. However, you may get a BeginContact callback
     * the next step.
     */
    PreSolve(_contact, _oldManifold) { }
    /**
     * This lets you inspect a contact after the solver is finished. This is useful
     * for inspecting impulses.
     * Note: the contact manifold does not include time of impact impulses, which can be
     * arbitrarily large if the sub-step is small. Hence the impulse is provided explicitly
     * in a separate data structure.
     * Note: this is only called for contacts that are touching, solid, and awake.
     */
    PostSolve(_contact, _impulse) { }
}
exports.b2ContactListener = b2ContactListener;
b2ContactListener.b2_defaultListener = new b2ContactListener();


/***/ }),

/***/ "KFpu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2TimeOfImpact = exports.b2TOIOutput = exports.b2TOIOutputState = exports.b2TOIInput = exports.b2Toi = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_settings_1 = __webpack_require__("bg0S");
const b2_math_1 = __webpack_require__("xKh6");
const b2_timer_1 = __webpack_require__("783U");
const b2_distance_1 = __webpack_require__("2fSU");
exports.b2Toi = {
    time: 0,
    maxTime: 0,
    calls: 0,
    iters: 0,
    maxIters: 0,
    rootIters: 0,
    maxRootIters: 0,
    reset() {
        this.time = 0;
        this.maxTime = 0;
        this.calls = 0;
        this.iters = 0;
        this.maxIters = 0;
        this.rootIters = 0;
        this.maxRootIters = 0;
    },
};
const b2TimeOfImpact_s_xfA = new b2_math_1.b2Transform();
const b2TimeOfImpact_s_xfB = new b2_math_1.b2Transform();
const b2TimeOfImpact_s_pointA = new b2_math_1.b2Vec2();
const b2TimeOfImpact_s_pointB = new b2_math_1.b2Vec2();
const b2TimeOfImpact_s_normal = new b2_math_1.b2Vec2();
const b2TimeOfImpact_s_axisA = new b2_math_1.b2Vec2();
const b2TimeOfImpact_s_axisB = new b2_math_1.b2Vec2();
/**
 * Input parameters for b2TimeOfImpact
 */
class b2TOIInput {
    constructor() {
        this.proxyA = new b2_distance_1.b2DistanceProxy();
        this.proxyB = new b2_distance_1.b2DistanceProxy();
        this.sweepA = new b2_math_1.b2Sweep();
        this.sweepB = new b2_math_1.b2Sweep();
        this.tMax = 0; // defines sweep interval [0, tMax]
    }
}
exports.b2TOIInput = b2TOIInput;
var b2TOIOutputState;
(function (b2TOIOutputState) {
    b2TOIOutputState[b2TOIOutputState["e_unknown"] = 0] = "e_unknown";
    b2TOIOutputState[b2TOIOutputState["e_failed"] = 1] = "e_failed";
    b2TOIOutputState[b2TOIOutputState["e_overlapped"] = 2] = "e_overlapped";
    b2TOIOutputState[b2TOIOutputState["e_touching"] = 3] = "e_touching";
    b2TOIOutputState[b2TOIOutputState["e_separated"] = 4] = "e_separated";
})(b2TOIOutputState = exports.b2TOIOutputState || (exports.b2TOIOutputState = {}));
/**
 * Output parameters for b2TimeOfImpact.
 */
class b2TOIOutput {
    constructor() {
        this.state = b2TOIOutputState.e_unknown;
        this.t = 0;
    }
}
exports.b2TOIOutput = b2TOIOutput;
var b2SeparationFunctionType;
(function (b2SeparationFunctionType) {
    b2SeparationFunctionType[b2SeparationFunctionType["e_points"] = 0] = "e_points";
    b2SeparationFunctionType[b2SeparationFunctionType["e_faceA"] = 1] = "e_faceA";
    b2SeparationFunctionType[b2SeparationFunctionType["e_faceB"] = 2] = "e_faceB";
})(b2SeparationFunctionType || (b2SeparationFunctionType = {}));
class b2SeparationFunction {
    constructor() {
        this.m_sweepA = new b2_math_1.b2Sweep();
        this.m_sweepB = new b2_math_1.b2Sweep();
        this.m_type = b2SeparationFunctionType.e_points;
        this.m_localPoint = new b2_math_1.b2Vec2();
        this.m_axis = new b2_math_1.b2Vec2();
    }
    Initialize(cache, proxyA, sweepA, proxyB, sweepB, t1) {
        this.m_proxyA = proxyA;
        this.m_proxyB = proxyB;
        const { count } = cache;
        // DEBUG: b2Assert(0 < count && count < 3);
        this.m_sweepA.Copy(sweepA);
        this.m_sweepB.Copy(sweepB);
        const xfA = this.m_sweepA.GetTransform(b2TimeOfImpact_s_xfA, t1);
        const xfB = this.m_sweepB.GetTransform(b2TimeOfImpact_s_xfB, t1);
        if (count === 1) {
            this.m_type = b2SeparationFunctionType.e_points;
            const localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
            const localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
            const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, localPointA, b2TimeOfImpact_s_pointA);
            const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, localPointB, b2TimeOfImpact_s_pointB);
            b2_math_1.b2Vec2.Subtract(pointB, pointA, this.m_axis);
            const s = this.m_axis.Normalize();
            return s;
        }
        if (cache.indexA[0] === cache.indexA[1]) {
            // Two points on B and one on A.
            this.m_type = b2SeparationFunctionType.e_faceB;
            const localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
            const localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
            b2_math_1.b2Vec2.CrossVec2One(b2_math_1.b2Vec2.Subtract(localPointB2, localPointB1, b2_math_1.b2Vec2.s_t0), this.m_axis).Normalize();
            const normal = b2_math_1.b2Rot.MultiplyVec2(xfB.q, this.m_axis, b2TimeOfImpact_s_normal);
            b2_math_1.b2Vec2.Mid(localPointB1, localPointB2, this.m_localPoint);
            const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, this.m_localPoint, b2TimeOfImpact_s_pointB);
            const localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
            const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, localPointA, b2TimeOfImpact_s_pointA);
            let s = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointA, pointB, b2_math_1.b2Vec2.s_t0), normal);
            if (s < 0) {
                this.m_axis.Negate();
                s = -s;
            }
            return s;
        }
        // Two points on A and one or two points on B.
        this.m_type = b2SeparationFunctionType.e_faceA;
        const localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
        const localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
        b2_math_1.b2Vec2.CrossVec2One(b2_math_1.b2Vec2.Subtract(localPointA2, localPointA1, b2_math_1.b2Vec2.s_t0), this.m_axis).Normalize();
        const normal = b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_axis, b2TimeOfImpact_s_normal);
        b2_math_1.b2Vec2.Mid(localPointA1, localPointA2, this.m_localPoint);
        const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, this.m_localPoint, b2TimeOfImpact_s_pointA);
        const localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
        const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, localPointB, b2TimeOfImpact_s_pointB);
        let s = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointB, pointA, b2_math_1.b2Vec2.s_t0), normal);
        if (s < 0) {
            this.m_axis.Negate();
            s = -s;
        }
        return s;
    }
    FindMinSeparation(indexA, indexB, t) {
        const xfA = this.m_sweepA.GetTransform(b2TimeOfImpact_s_xfA, t);
        const xfB = this.m_sweepB.GetTransform(b2TimeOfImpact_s_xfB, t);
        switch (this.m_type) {
            case b2SeparationFunctionType.e_points: {
                const axisA = b2_math_1.b2Rot.TransposeMultiplyVec2(xfA.q, this.m_axis, b2TimeOfImpact_s_axisA);
                const axisB = b2_math_1.b2Rot.TransposeMultiplyVec2(xfB.q, b2_math_1.b2Vec2.Negate(this.m_axis, b2_math_1.b2Vec2.s_t0), b2TimeOfImpact_s_axisB);
                indexA[0] = this.m_proxyA.GetSupport(axisA);
                indexB[0] = this.m_proxyB.GetSupport(axisB);
                const localPointA = this.m_proxyA.GetVertex(indexA[0]);
                const localPointB = this.m_proxyB.GetVertex(indexB[0]);
                const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, localPointA, b2TimeOfImpact_s_pointA);
                const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, localPointB, b2TimeOfImpact_s_pointB);
                const separation = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointB, pointA, b2_math_1.b2Vec2.s_t0), this.m_axis);
                return separation;
            }
            case b2SeparationFunctionType.e_faceA: {
                const normal = b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_axis, b2TimeOfImpact_s_normal);
                const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, this.m_localPoint, b2TimeOfImpact_s_pointA);
                const axisB = b2_math_1.b2Rot.TransposeMultiplyVec2(xfB.q, b2_math_1.b2Vec2.Negate(normal, b2_math_1.b2Vec2.s_t0), b2TimeOfImpact_s_axisB);
                indexA[0] = -1;
                indexB[0] = this.m_proxyB.GetSupport(axisB);
                const localPointB = this.m_proxyB.GetVertex(indexB[0]);
                const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, localPointB, b2TimeOfImpact_s_pointB);
                const separation = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointB, pointA, b2_math_1.b2Vec2.s_t0), normal);
                return separation;
            }
            case b2SeparationFunctionType.e_faceB: {
                const normal = b2_math_1.b2Rot.MultiplyVec2(xfB.q, this.m_axis, b2TimeOfImpact_s_normal);
                const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, this.m_localPoint, b2TimeOfImpact_s_pointB);
                const axisA = b2_math_1.b2Rot.TransposeMultiplyVec2(xfA.q, b2_math_1.b2Vec2.Negate(normal, b2_math_1.b2Vec2.s_t0), b2TimeOfImpact_s_axisA);
                indexB[0] = -1;
                indexA[0] = this.m_proxyA.GetSupport(axisA);
                const localPointA = this.m_proxyA.GetVertex(indexA[0]);
                const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, localPointA, b2TimeOfImpact_s_pointA);
                const separation = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointA, pointB, b2_math_1.b2Vec2.s_t0), normal);
                return separation;
            }
            default:
                // DEBUG: b2Assert(false);
                indexA[0] = -1;
                indexB[0] = -1;
                return 0;
        }
    }
    Evaluate(indexA, indexB, t) {
        const xfA = this.m_sweepA.GetTransform(b2TimeOfImpact_s_xfA, t);
        const xfB = this.m_sweepB.GetTransform(b2TimeOfImpact_s_xfB, t);
        switch (this.m_type) {
            case b2SeparationFunctionType.e_points: {
                const localPointA = this.m_proxyA.GetVertex(indexA);
                const localPointB = this.m_proxyB.GetVertex(indexB);
                const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, localPointA, b2TimeOfImpact_s_pointA);
                const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, localPointB, b2TimeOfImpact_s_pointB);
                const separation = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointB, pointA, b2_math_1.b2Vec2.s_t0), this.m_axis);
                return separation;
            }
            case b2SeparationFunctionType.e_faceA: {
                const normal = b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_axis, b2TimeOfImpact_s_normal);
                const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, this.m_localPoint, b2TimeOfImpact_s_pointA);
                const localPointB = this.m_proxyB.GetVertex(indexB);
                const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, localPointB, b2TimeOfImpact_s_pointB);
                const separation = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointB, pointA, b2_math_1.b2Vec2.s_t0), normal);
                return separation;
            }
            case b2SeparationFunctionType.e_faceB: {
                const normal = b2_math_1.b2Rot.MultiplyVec2(xfB.q, this.m_axis, b2TimeOfImpact_s_normal);
                const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, this.m_localPoint, b2TimeOfImpact_s_pointB);
                const localPointA = this.m_proxyA.GetVertex(indexA);
                const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, localPointA, b2TimeOfImpact_s_pointA);
                const separation = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointA, pointB, b2_math_1.b2Vec2.s_t0), normal);
                return separation;
            }
            default:
                (0, b2_common_1.b2Assert)(false);
                return 0;
        }
    }
}
const b2TimeOfImpact_s_timer = new b2_timer_1.b2Timer();
const b2TimeOfImpact_s_cache = new b2_distance_1.b2SimplexCache();
const b2TimeOfImpact_s_distanceInput = new b2_distance_1.b2DistanceInput();
const b2TimeOfImpact_s_distanceOutput = new b2_distance_1.b2DistanceOutput();
const b2TimeOfImpact_s_fcn = new b2SeparationFunction();
const b2TimeOfImpact_s_indexA = [0];
const b2TimeOfImpact_s_indexB = [0];
const b2TimeOfImpact_s_sweepA = new b2_math_1.b2Sweep();
const b2TimeOfImpact_s_sweepB = new b2_math_1.b2Sweep();
function b2TimeOfImpact(output, input) {
    const timer = b2TimeOfImpact_s_timer.Reset();
    ++exports.b2Toi.calls;
    output.state = b2TOIOutputState.e_unknown;
    output.t = input.tMax;
    const { proxyA, proxyB, tMax } = input;
    const maxVertices = Math.max(b2_settings_1.b2_maxPolygonVertices, proxyA.m_count, proxyB.m_count);
    const sweepA = b2TimeOfImpact_s_sweepA.Copy(input.sweepA);
    const sweepB = b2TimeOfImpact_s_sweepB.Copy(input.sweepB);
    // Large rotations can make the root finder fail, so we normalize the
    // sweep angles.
    sweepA.Normalize();
    sweepB.Normalize();
    const totalRadius = proxyA.m_radius + proxyB.m_radius;
    const target = Math.max(b2_common_1.b2_linearSlop, totalRadius - 3 * b2_common_1.b2_linearSlop);
    const tolerance = 0.25 * b2_common_1.b2_linearSlop;
    // DEBUG: b2Assert(target > tolerance);
    let t1 = 0;
    const k_maxIterations = 20; // TODO_ERIN b2Settings
    let iter = 0;
    // Prepare input for distance query.
    const cache = b2TimeOfImpact_s_cache;
    cache.count = 0;
    const distanceInput = b2TimeOfImpact_s_distanceInput;
    distanceInput.proxyA.Copy(input.proxyA);
    distanceInput.proxyB.Copy(input.proxyB);
    distanceInput.useRadii = false;
    // The outer loop progressively attempts to compute new separating axes.
    // This loop terminates when an axis is repeated (no progress is made).
    for (;;) {
        const xfA = sweepA.GetTransform(b2TimeOfImpact_s_xfA, t1);
        const xfB = sweepB.GetTransform(b2TimeOfImpact_s_xfB, t1);
        // Get the distance between shapes. We can also use the results
        // to get a separating axis.
        distanceInput.transformA.Copy(xfA);
        distanceInput.transformB.Copy(xfB);
        const distanceOutput = b2TimeOfImpact_s_distanceOutput;
        (0, b2_distance_1.b2Distance)(distanceOutput, cache, distanceInput);
        // If the shapes are overlapped, we give up on continuous collision.
        if (distanceOutput.distance <= 0) {
            // Failure!
            output.state = b2TOIOutputState.e_overlapped;
            output.t = 0;
            break;
        }
        if (distanceOutput.distance < target + tolerance) {
            // Victory!
            output.state = b2TOIOutputState.e_touching;
            output.t = t1;
            break;
        }
        // Initialize the separating axis.
        const fcn = b2TimeOfImpact_s_fcn;
        fcn.Initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
        // Compute the TOI on the separating axis. We do this by successively
        // resolving the deepest point. This loop is bounded by the number of vertices.
        let done = false;
        let t2 = tMax;
        let pushBackIter = 0;
        for (;;) {
            // Find the deepest point at t2. Store the witness point indices.
            const indexA = b2TimeOfImpact_s_indexA;
            const indexB = b2TimeOfImpact_s_indexB;
            let s2 = fcn.FindMinSeparation(indexA, indexB, t2);
            // Is the final configuration separated?
            if (s2 > target + tolerance) {
                // Victory!
                output.state = b2TOIOutputState.e_separated;
                output.t = tMax;
                done = true;
                break;
            }
            // Has the separation reached tolerance?
            if (s2 > target - tolerance) {
                // Advance the sweeps
                t1 = t2;
                break;
            }
            // Compute the initial separation of the witness points.
            let s1 = fcn.Evaluate(indexA[0], indexB[0], t1);
            // Check for initial overlap. This might happen if the root finder
            // runs out of iterations.
            if (s1 < target - tolerance) {
                output.state = b2TOIOutputState.e_failed;
                output.t = t1;
                done = true;
                break;
            }
            // Check for touching
            if (s1 <= target + tolerance) {
                // Victory! t1 should hold the TOI (could be 0).
                output.state = b2TOIOutputState.e_touching;
                output.t = t1;
                done = true;
                break;
            }
            // Compute 1D root of: f(x) - target = 0
            let rootIterCount = 0;
            let a1 = t1;
            let a2 = t2;
            for (;;) {
                // Use a mix of the secant rule and bisection.
                let t;
                if (rootIterCount & 1) {
                    // Secant rule to improve convergence.
                    t = a1 + ((target - s1) * (a2 - a1)) / (s2 - s1);
                }
                else {
                    // Bisection to guarantee progress.
                    t = 0.5 * (a1 + a2);
                }
                ++rootIterCount;
                ++exports.b2Toi.rootIters;
                const s = fcn.Evaluate(indexA[0], indexB[0], t);
                if (Math.abs(s - target) < tolerance) {
                    // t2 holds a tentative value for t1
                    t2 = t;
                    break;
                }
                // Ensure we continue to bracket the root.
                if (s > target) {
                    a1 = t;
                    s1 = s;
                }
                else {
                    a2 = t;
                    s2 = s;
                }
                if (rootIterCount === 50) {
                    break;
                }
            }
            exports.b2Toi.maxRootIters = Math.max(exports.b2Toi.maxRootIters, rootIterCount);
            ++pushBackIter;
            if (pushBackIter === maxVertices) {
                break;
            }
        }
        ++iter;
        ++exports.b2Toi.iters;
        if (done) {
            break;
        }
        if (iter === k_maxIterations) {
            // Root finder got stuck. Semi-victory.
            output.state = b2TOIOutputState.e_failed;
            output.t = t1;
            break;
        }
    }
    exports.b2Toi.maxIters = Math.max(exports.b2Toi.maxIters, iter);
    const time = timer.GetMilliseconds();
    exports.b2Toi.maxTime = Math.max(exports.b2Toi.maxTime, time);
    exports.b2Toi.time += time;
}
exports.b2TimeOfImpact = b2TimeOfImpact;


/***/ }),

/***/ "LhsO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2PolygonShape = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert, b2_epsilon_sq } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_settings_1 = __webpack_require__("bg0S");
const b2_shape_1 = __webpack_require__("UjSx");
const temp = {
    ComputeCentroid: {
        s: new b2_math_1.b2Vec2(),
        p1: new b2_math_1.b2Vec2(),
        p2: new b2_math_1.b2Vec2(),
        p3: new b2_math_1.b2Vec2(),
        e1: new b2_math_1.b2Vec2(),
        e2: new b2_math_1.b2Vec2(),
    },
    TestPoint: {
        pLocal: new b2_math_1.b2Vec2(),
    },
    ComputeAABB: {
        v: new b2_math_1.b2Vec2(),
    },
    ComputeMass: {
        center: new b2_math_1.b2Vec2(),
        s: new b2_math_1.b2Vec2(),
        e1: new b2_math_1.b2Vec2(),
        e2: new b2_math_1.b2Vec2(),
    },
    Validate: {
        e: new b2_math_1.b2Vec2(),
        v: new b2_math_1.b2Vec2(),
    },
    Set: {
        r: new b2_math_1.b2Vec2(),
        v: new b2_math_1.b2Vec2(),
    },
    RayCast: {
        p1: new b2_math_1.b2Vec2(),
        p2: new b2_math_1.b2Vec2(),
        d: new b2_math_1.b2Vec2(),
    },
    SetAsBox: {
        xf: new b2_math_1.b2Transform(),
    },
};
const weldingDistanceSquared = (0.5 * b2_common_1.b2_linearSlop) ** 2;
function ComputeCentroid(vs, count, out) {
    // DEBUG: b2Assert(count >= 3);
    const c = out;
    c.SetZero();
    let area = 0;
    const { s, p1, p2, p3, e1, e2 } = temp.ComputeCentroid;
    // Get a reference point for forming triangles.
    // Use the first vertex to reduce round-off errors.
    s.Copy(vs[0]);
    const inv3 = 1 / 3;
    for (let i = 0; i < count; ++i) {
        // Triangle vertices.
        b2_math_1.b2Vec2.Subtract(vs[0], s, p1);
        b2_math_1.b2Vec2.Subtract(vs[i], s, p2);
        b2_math_1.b2Vec2.Subtract(vs[i + 1 < count ? i + 1 : 0], s, p3);
        b2_math_1.b2Vec2.Subtract(p2, p1, e1);
        b2_math_1.b2Vec2.Subtract(p3, p1, e2);
        const D = b2_math_1.b2Vec2.Cross(e1, e2);
        const triangleArea = 0.5 * D;
        area += triangleArea;
        // Area weighted centroid
        c.x += triangleArea * inv3 * (p1.x + p2.x + p3.x);
        c.y += triangleArea * inv3 * (p1.y + p2.y + p3.y);
    }
    // Centroid
    // DEBUG: b2Assert(area > b2_epsilon);
    const f = 1 / area;
    c.x = f * c.x + s.x;
    c.y = f * c.y + s.y;
    return c;
}
/**
 * A solid convex polygon. It is assumed that the interior of the polygon is to
 * the left of each edge.
 * Polygons have a maximum number of vertices equal to b2_maxPolygonVertices.
 * In most cases you should not need many vertices for a convex polygon.
 */
class b2PolygonShape extends b2_shape_1.b2Shape {
    constructor() {
        super(b2_shape_1.b2ShapeType.e_polygon, b2_common_1.b2_polygonRadius);
        this.m_centroid = new b2_math_1.b2Vec2();
        this.m_vertices = [];
        this.m_normals = [];
        this.m_count = 0;
    }
    /**
     * Implement b2Shape.
     */
    Clone() {
        return new b2PolygonShape().Copy(this);
    }
    Copy(other) {
        super.Copy(other);
        // DEBUG: b2Assert(other instanceof b2PolygonShape);
        this.m_centroid.Copy(other.m_centroid);
        this.m_count = other.m_count;
        this.m_vertices = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_normals = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        for (let i = 0; i < this.m_count; ++i) {
            this.m_vertices[i].Copy(other.m_vertices[i]);
            this.m_normals[i].Copy(other.m_normals[i]);
        }
        return this;
    }
    /**
     * @see b2Shape::GetChildCount
     */
    GetChildCount() {
        return 1;
    }
    /**
     * Create a convex hull from the given array of points.
     *
     * @warning the points may be re-ordered, even if they form a convex polygon
     * @warning collinear points are handled but not removed. Collinear points
     * may lead to poor stacking behavior.
     */
    Set(vertices, count = vertices.length) {
        // DEBUG: b2Assert(3 <= count && count <= b2_maxPolygonVertices);
        if (count < 3) {
            return this.SetAsBox(1, 1);
        }
        let n = Math.min(count, b2_settings_1.b2_maxPolygonVertices);
        // Perform welding and copy vertices into local buffer.
        const ps = [];
        for (let i = 0; i < n; ++i) {
            const v = vertices[i];
            const unique = ps.every((p) => b2_math_1.b2Vec2.DistanceSquared(v, p) >= weldingDistanceSquared);
            if (unique) {
                ps.push(v);
            }
        }
        n = ps.length;
        if (n < 3) {
            // Polygon is degenerate.
            // DEBUG: b2Assert(false);
            return this.SetAsBox(1, 1);
        }
        // Create the convex hull using the Gift wrapping algorithm
        // http://en.wikipedia.org/wiki/Gift_wrapping_algorithm
        // Find the right most point on the hull
        let i0 = 0;
        let x0 = ps[0].x;
        for (let i = 1; i < n; ++i) {
            const { x } = ps[i];
            if (x > x0 || (x === x0 && ps[i].y < ps[i0].y)) {
                i0 = i;
                x0 = x;
            }
        }
        const hull = [];
        let m = 0;
        let ih = i0;
        for (;;) {
            // DEBUG: b2Assert(m < b2_maxPolygonVertices);
            hull[m] = ih;
            let ie = 0;
            for (let j = 1; j < n; ++j) {
                if (ie === ih) {
                    ie = j;
                    continue;
                }
                const r = b2_math_1.b2Vec2.Subtract(ps[ie], ps[hull[m]], temp.Set.r);
                const v = b2_math_1.b2Vec2.Subtract(ps[j], ps[hull[m]], temp.Set.v);
                const c = b2_math_1.b2Vec2.Cross(r, v);
                if (c < 0) {
                    ie = j;
                }
                // Collinearity check
                if (c === 0 && v.LengthSquared() > r.LengthSquared()) {
                    ie = j;
                }
            }
            ++m;
            ih = ie;
            if (ie === i0) {
                break;
            }
        }
        (0, b2_common_1.b2Assert)(m >= 3, "Polygon is degenerate");
        this.m_count = m;
        this.m_vertices = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_normals = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        // Copy vertices.
        for (let i = 0; i < m; ++i) {
            this.m_vertices[i].Copy(ps[hull[i]]);
        }
        // Compute normals. Ensure the edges have non-zero length.
        for (let i = 0; i < m; ++i) {
            const i1 = i;
            const i2 = i + 1 < m ? i + 1 : 0;
            const edge = b2_math_1.b2Vec2.Subtract(this.m_vertices[i2], this.m_vertices[i1], b2_math_1.b2Vec2.s_t0);
            // DEBUG: b2Assert(edge.LengthSquared() > b2_epsilon_sq);
            b2_math_1.b2Vec2.CrossVec2One(edge, this.m_normals[i]).Normalize();
        }
        // Compute the polygon centroid.
        ComputeCentroid(this.m_vertices, m, this.m_centroid);
        return this;
    }
    /**
     * Build vertices to represent an axis-aligned box or an oriented box.
     *
     * @param hx The half-width.
     * @param hy The half-height.
     * @param center The center of the box in local coordinates.
     * @param angle The rotation of the box in local coordinates.
     */
    SetAsBox(hx, hy, center, angle = 0) {
        this.m_count = 4;
        this.m_vertices = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_normals = (0, b2_common_1.b2MakeArray)(this.m_count, b2_math_1.b2Vec2);
        this.m_vertices[0].Set(-hx, -hy);
        this.m_vertices[1].Set(hx, -hy);
        this.m_vertices[2].Set(hx, hy);
        this.m_vertices[3].Set(-hx, hy);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1, 0);
        if (center) {
            this.m_centroid.Copy(center);
            const { xf } = temp.SetAsBox;
            xf.SetPosition(center);
            xf.SetRotationAngle(angle);
            // Transform vertices and normals.
            for (let i = 0; i < this.m_count; ++i) {
                b2_math_1.b2Transform.MultiplyVec2(xf, this.m_vertices[i], this.m_vertices[i]);
                b2_math_1.b2Rot.MultiplyVec2(xf.q, this.m_normals[i], this.m_normals[i]);
            }
        }
        else {
            this.m_centroid.SetZero();
        }
        return this;
    }
    /**
     * @see b2Shape::TestPoint
     */
    TestPoint(xf, p) {
        const pLocal = b2_math_1.b2Transform.TransposeMultiplyVec2(xf, p, temp.TestPoint.pLocal);
        for (let i = 0; i < this.m_count; ++i) {
            const dot = b2_math_1.b2Vec2.Dot(this.m_normals[i], b2_math_1.b2Vec2.Subtract(pLocal, this.m_vertices[i], b2_math_1.b2Vec2.s_t0));
            if (dot > 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * Implement b2Shape.
     *
     * @note because the polygon is solid, rays that start inside do not hit because the normal is
     * not defined.
     */
    RayCast(output, input, xf, _childIndex) {
        // Put the ray into the polygon's frame of reference.
        const p1 = b2_math_1.b2Transform.TransposeMultiplyVec2(xf, input.p1, temp.RayCast.p1);
        const p2 = b2_math_1.b2Transform.TransposeMultiplyVec2(xf, input.p2, temp.RayCast.p2);
        const d = b2_math_1.b2Vec2.Subtract(p2, p1, temp.RayCast.d);
        let lower = 0;
        let upper = input.maxFraction;
        let index = -1;
        for (let i = 0; i < this.m_count; ++i) {
            // p = p1 + a * d
            // dot(normal, p - v) = 0
            // dot(normal, p1 - v) + a * dot(normal, d) = 0
            const numerator = b2_math_1.b2Vec2.Dot(this.m_normals[i], b2_math_1.b2Vec2.Subtract(this.m_vertices[i], p1, b2_math_1.b2Vec2.s_t0));
            const denominator = b2_math_1.b2Vec2.Dot(this.m_normals[i], d);
            if (denominator === 0) {
                if (numerator < 0) {
                    return false;
                }
                // Note: we want this predicate without division:
                // lower < numerator / denominator, where denominator < 0
                // Since denominator < 0, we have to flip the inequality:
                // lower < numerator / denominator <==> denominator * lower > numerator.
            }
            else if (denominator < 0 && numerator < lower * denominator) {
                // Increase lower.
                // The segment enters this half-space.
                lower = numerator / denominator;
                index = i;
            }
            else if (denominator > 0 && numerator < upper * denominator) {
                // Decrease upper.
                // The segment exits this half-space.
                upper = numerator / denominator;
            }
            // The use of epsilon here causes the assert on lower to trip
            // in some cases. Apparently the use of epsilon was to make edge
            // shapes work, but now those are handled separately.
            // if (upper < lower - b2_epsilon)
            if (upper < lower) {
                return false;
            }
        }
        // DEBUG: b2Assert(0 <= lower && lower <= input.maxFraction);
        if (index >= 0) {
            output.fraction = lower;
            b2_math_1.b2Rot.MultiplyVec2(xf.q, this.m_normals[index], output.normal);
            return true;
        }
        return false;
    }
    /**
     * @see b2Shape::ComputeAABB
     */
    ComputeAABB(aabb, xf, _childIndex) {
        const lower = b2_math_1.b2Transform.MultiplyVec2(xf, this.m_vertices[0], aabb.lowerBound);
        const upper = aabb.upperBound.Copy(lower);
        for (let i = 1; i < this.m_count; ++i) {
            const v = b2_math_1.b2Transform.MultiplyVec2(xf, this.m_vertices[i], temp.ComputeAABB.v);
            b2_math_1.b2Vec2.Min(lower, v, lower);
            b2_math_1.b2Vec2.Max(upper, v, upper);
        }
        const r = this.m_radius;
        lower.SubtractXY(r, r);
        upper.AddXY(r, r);
    }
    /**
     * @see b2Shape::ComputeMass
     */
    ComputeMass(massData, density) {
        // Polygon mass, centroid, and inertia.
        // Let rho be the polygon density in mass per unit area.
        // Then:
        // mass = rho * int(dA)
        // centroid.x = (1/mass) * rho * int(x * dA)
        // centroid.y = (1/mass) * rho * int(y * dA)
        // I = rho * int((x*x + y*y) * dA)
        //
        // We can compute these integrals by summing all the integrals
        // for each triangle of the polygon. To evaluate the integral
        // for a single triangle, we make a change of variables to
        // the (u,v) coordinates of the triangle:
        // x = x0 + e1x * u + e2x * v
        // y = y0 + e1y * u + e2y * v
        // where 0 <= u && 0 <= v && u + v <= 1.
        //
        // We integrate u from [0,1-v] and then v from [0,1].
        // We also need to use the Jacobian of the transformation:
        // D = cross(e1, e2)
        //
        // Simplification: triangle centroid = (1/3) * (p1 + p2 + p3)
        //
        // The rest of the derivation is handled by computer algebra.
        // DEBUG: b2Assert(this.m_count >= 3);
        const center = temp.ComputeMass.center.SetZero();
        let area = 0;
        let I = 0;
        // Get a reference point for forming triangles.
        // Use the first vertex to reduce round-off errors.
        const s = temp.ComputeMass.s.Copy(this.m_vertices[0]);
        const k_inv3 = 1 / 3;
        for (let i = 0; i < this.m_count; ++i) {
            // Triangle vertices.
            const e1 = b2_math_1.b2Vec2.Subtract(this.m_vertices[i], s, temp.ComputeMass.e1);
            const e2 = b2_math_1.b2Vec2.Subtract(this.m_vertices[i + 1 < this.m_count ? i + 1 : 0], s, temp.ComputeMass.e2);
            const D = b2_math_1.b2Vec2.Cross(e1, e2);
            const triangleArea = 0.5 * D;
            area += triangleArea;
            // Area weighted centroid
            center.AddScaled(triangleArea * k_inv3, b2_math_1.b2Vec2.Add(e1, e2, b2_math_1.b2Vec2.s_t0));
            const ex1 = e1.x;
            const ey1 = e1.y;
            const ex2 = e2.x;
            const ey2 = e2.y;
            const intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
            const inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
            I += 0.25 * k_inv3 * D * (intx2 + inty2);
        }
        // Total mass
        massData.mass = density * area;
        // Center of mass
        // DEBUG: b2Assert(area > b2_epsilon);
        center.Scale(1 / area);
        b2_math_1.b2Vec2.Add(center, s, massData.center);
        // Inertia tensor relative to the local origin (point s).
        massData.I = density * I;
        // Shift to center of mass then to original body origin.
        massData.I += massData.mass * (b2_math_1.b2Vec2.Dot(massData.center, massData.center) - b2_math_1.b2Vec2.Dot(center, center));
    }
    Validate() {
        const { e, v } = temp.Validate;
        for (let i = 0; i < this.m_count; ++i) {
            const i1 = i;
            const i2 = i < this.m_count - 1 ? i1 + 1 : 0;
            const p = this.m_vertices[i1];
            b2_math_1.b2Vec2.Subtract(this.m_vertices[i2], p, e);
            for (let j = 0; j < this.m_count; ++j) {
                if (j === i1 || j === i2) {
                    continue;
                }
                b2_math_1.b2Vec2.Subtract(this.m_vertices[j], p, v);
                const c = b2_math_1.b2Vec2.Cross(e, v);
                if (c < 0) {
                    return false;
                }
            }
        }
        return true;
    }
    SetupDistanceProxy(proxy, _index) {
        proxy.m_vertices = this.m_vertices;
        proxy.m_count = this.m_count;
        proxy.m_radius = this.m_radius;
    }
    Draw(draw, color) {
        const vertexCount = this.m_count;
        const vertices = this.m_vertices;
        draw.DrawSolidPolygon(vertices, vertexCount, color);
    }
}
exports.b2PolygonShape = b2PolygonShape;


/***/ }),

/***/ "Nx71":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2SolverData = exports.b2Velocity = exports.b2Position = exports.b2TimeStep = exports.b2Profile = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_math_1 = __webpack_require__("xKh6");
/**
 * Profiling data. Times are in milliseconds.
 */
class b2Profile {
    constructor() {
        this.step = 0;
        this.collide = 0;
        this.solve = 0;
        this.solveInit = 0;
        this.solveVelocity = 0;
        this.solvePosition = 0;
        this.broadphase = 0;
        this.solveTOI = 0;
    }
    Reset() {
        this.step = 0;
        this.collide = 0;
        this.solve = 0;
        this.solveInit = 0;
        this.solveVelocity = 0;
        this.solvePosition = 0;
        this.broadphase = 0;
        this.solveTOI = 0;
        return this;
    }
}
exports.b2Profile = b2Profile;
/**
 * This is an internal structure.
 */
class b2TimeStep {
    constructor() {
        this.dt = 0; // time step
        this.inv_dt = 0; // inverse time step (0 if dt == 0).
        this.dtRatio = 0; // dt * inv_dt0
        this.config = {
            velocityIterations: 0,
            positionIterations: 0,
        };
        this.warmStarting = false;
    }
    static Create() {
        return new b2TimeStep();
    }
    Copy(step) {
        this.dt = step.dt;
        this.inv_dt = step.inv_dt;
        this.dtRatio = step.dtRatio;
        this.config = {
            ...step.config,
        };
        this.warmStarting = step.warmStarting;
        return this;
    }
}
exports.b2TimeStep = b2TimeStep;
/**
 * This is an internal structure.
 */
class b2Position {
    constructor() {
        this.c = new b2_math_1.b2Vec2();
        this.a = 0;
    }
}
exports.b2Position = b2Position;
/**
 * This is an internal structure.
 */
class b2Velocity {
    constructor() {
        this.v = new b2_math_1.b2Vec2();
        this.w = 0;
    }
}
exports.b2Velocity = b2Velocity;
/**
 * Solver Data
 */
class b2SolverData {
    constructor() {
        this.step = b2TimeStep.Create();
    }
}
exports.b2SolverData = b2SolverData;


/***/ }),

/***/ "O7Yf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ContactManager = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_broad_phase_1 = __webpack_require__("fMel");
const b2_contact_factory_1 = __webpack_require__("dvbM");
const b2_body_1 = __webpack_require__("4xZg");
const b2_world_callbacks_1 = __webpack_require__("FlG6");
/** Delegate of b2World. */
class b2ContactManager {
    constructor() {
        this.m_broadPhase = new b2_broad_phase_1.b2BroadPhase();
        this.m_contactList = null;
        this.m_contactCount = 0;
        this.m_contactFilter = b2_world_callbacks_1.b2ContactFilter.b2_defaultFilter;
        this.m_contactListener = b2_world_callbacks_1.b2ContactListener.b2_defaultListener;
        this.m_contactFactory = new b2_contact_factory_1.b2ContactFactory();
        /** Broad-phase callback. */
        this.AddPair = (proxyA, proxyB) => {
            // DEBUG: b2Assert(proxyA instanceof b2FixtureProxy);
            // DEBUG: b2Assert(proxyB instanceof b2FixtureProxy);
            let fixtureA = proxyA.fixture;
            let fixtureB = proxyB.fixture;
            let indexA = proxyA.childIndex;
            let indexB = proxyB.childIndex;
            let bodyA = fixtureA.GetBody();
            let bodyB = fixtureB.GetBody();
            // Are the fixtures on the same body?
            if (bodyA === bodyB) {
                return;
            }
            // TODO_ERIN use a hash table to remove a potential bottleneck when both
            // bodies have a lot of contacts.
            // Does a contact already exist?
            let edge = bodyB.GetContactList();
            while (edge) {
                if (edge.other === bodyA) {
                    const fA = edge.contact.GetFixtureA();
                    const fB = edge.contact.GetFixtureB();
                    const iA = edge.contact.GetChildIndexA();
                    const iB = edge.contact.GetChildIndexB();
                    if (fA === fixtureA && fB === fixtureB && iA === indexA && iB === indexB) {
                        // A contact already exists.
                        return;
                    }
                    if (fA === fixtureB && fB === fixtureA && iA === indexB && iB === indexA) {
                        // A contact already exists.
                        return;
                    }
                }
                edge = edge.next;
            }
            // Does a joint override collision? Is at least one body dynamic?
            if (bodyB.ShouldCollide(bodyA) === false) {
                return;
            }
            // Check user filtering.
            if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(fixtureA, fixtureB)) {
                return;
            }
            // Call the factory.
            const c = this.m_contactFactory.Create(fixtureA, indexA, fixtureB, indexB);
            if (c === null) {
                return;
            }
            // Contact creation may swap fixtures.
            fixtureA = c.GetFixtureA();
            fixtureB = c.GetFixtureB();
            indexA = c.GetChildIndexA();
            indexB = c.GetChildIndexB();
            bodyA = fixtureA.m_body;
            bodyB = fixtureB.m_body;
            // Insert into the world.
            c.m_prev = null;
            c.m_next = this.m_contactList;
            if (this.m_contactList !== null) {
                this.m_contactList.m_prev = c;
            }
            this.m_contactList = c;
            // Connect to island graph.
            // Connect to body A
            c.m_nodeA.other = bodyB;
            c.m_nodeA.prev = null;
            c.m_nodeA.next = bodyA.m_contactList;
            if (bodyA.m_contactList !== null) {
                bodyA.m_contactList.prev = c.m_nodeA;
            }
            bodyA.m_contactList = c.m_nodeA;
            // Connect to body B
            c.m_nodeB.other = bodyA;
            c.m_nodeB.prev = null;
            c.m_nodeB.next = bodyB.m_contactList;
            if (bodyB.m_contactList !== null) {
                bodyB.m_contactList.prev = c.m_nodeB;
            }
            bodyB.m_contactList = c.m_nodeB;
            ++this.m_contactCount;
        };
    }
    FindNewContacts() {
        this.m_broadPhase.UpdatePairs(this.AddPair);
    }
    Destroy(c) {
        const fixtureA = c.GetFixtureA();
        const fixtureB = c.GetFixtureB();
        const bodyA = fixtureA.GetBody();
        const bodyB = fixtureB.GetBody();
        if (this.m_contactListener && c.IsTouching()) {
            this.m_contactListener.EndContact(c);
        }
        // Remove from the world.
        if (c.m_prev) {
            c.m_prev.m_next = c.m_next;
        }
        if (c.m_next) {
            c.m_next.m_prev = c.m_prev;
        }
        if (c === this.m_contactList) {
            this.m_contactList = c.m_next;
        }
        // Remove from body 1
        if (c.m_nodeA.prev) {
            c.m_nodeA.prev.next = c.m_nodeA.next;
        }
        if (c.m_nodeA.next) {
            c.m_nodeA.next.prev = c.m_nodeA.prev;
        }
        if (c.m_nodeA === bodyA.m_contactList) {
            bodyA.m_contactList = c.m_nodeA.next;
        }
        // Remove from body 2
        if (c.m_nodeB.prev) {
            c.m_nodeB.prev.next = c.m_nodeB.next;
        }
        if (c.m_nodeB.next) {
            c.m_nodeB.next.prev = c.m_nodeB.prev;
        }
        if (c.m_nodeB === bodyB.m_contactList) {
            bodyB.m_contactList = c.m_nodeB.next;
        }
        // moved this from b2ContactFactory:Destroy
        if (c.m_manifold.pointCount > 0 && !fixtureA.IsSensor() && !fixtureB.IsSensor()) {
            fixtureA.GetBody().SetAwake(true);
            fixtureB.GetBody().SetAwake(true);
        }
        // Call the factory.
        this.m_contactFactory.Destroy(c);
        --this.m_contactCount;
    }
    /**
     * This is the top level collision call for the time step. Here
     * all the narrow phase collision is processed for the world
     * contact list.
     */
    Collide() {
        // Update awake contacts.
        let c = this.m_contactList;
        while (c) {
            const fixtureA = c.GetFixtureA();
            const fixtureB = c.GetFixtureB();
            const indexA = c.GetChildIndexA();
            const indexB = c.GetChildIndexB();
            const bodyA = fixtureA.GetBody();
            const bodyB = fixtureB.GetBody();
            // Is this contact flagged for filtering?
            if (c.m_filterFlag) {
                if (
                // Should these bodies collide?
                !bodyB.ShouldCollide(bodyA) ||
                    // Check user filtering.
                    (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(fixtureA, fixtureB))) {
                    const cNuke = c;
                    c = cNuke.m_next;
                    this.Destroy(cNuke);
                    continue;
                }
                // Clear the filtering flag.
                c.m_filterFlag = false;
            }
            const activeA = bodyA.IsAwake() && bodyA.m_type !== b2_body_1.b2BodyType.b2_staticBody;
            const activeB = bodyB.IsAwake() && bodyB.m_type !== b2_body_1.b2BodyType.b2_staticBody;
            // At least one body must be awake and it must be dynamic or kinematic.
            if (!activeA && !activeB) {
                c = c.m_next;
                continue;
            }
            const treeNodeA = fixtureA.m_proxies[indexA].treeNode;
            const treeNodeB = fixtureB.m_proxies[indexB].treeNode;
            const overlap = treeNodeA.aabb.TestOverlap(treeNodeB.aabb);
            // Here we destroy contacts that cease to overlap in the broad-phase.
            if (!overlap) {
                const cNuke = c;
                c = cNuke.m_next;
                this.Destroy(cNuke);
                continue;
            }
            // The contact persists.
            c.Update(this.m_contactListener);
            c = c.m_next;
        }
    }
}
exports.b2ContactManager = b2ContactManager;


/***/ }),

/***/ "PzZv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Contact = exports.b2ContactEdge = exports.b2MixRestitutionThreshold = exports.b2MixRestitution = exports.b2MixFriction = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_collision_1 = __webpack_require__("h2hE");
/**
 * Friction mixing law. The idea is to allow either fixture to drive the friction to zero.
 * For example, anything slides on ice.
 */
function b2MixFriction(friction1, friction2) {
    return Math.sqrt(friction1 * friction2);
}
exports.b2MixFriction = b2MixFriction;
/**
 * Restitution mixing law. The idea is allow for anything to bounce off an inelastic surface.
 * For example, a superball bounces on anything.
 */
function b2MixRestitution(restitution1, restitution2) {
    return restitution1 > restitution2 ? restitution1 : restitution2;
}
exports.b2MixRestitution = b2MixRestitution;
/**
 * Restitution mixing law. This picks the lowest value.
 */
function b2MixRestitutionThreshold(threshold1, threshold2) {
    return threshold1 < threshold2 ? threshold1 : threshold2;
}
exports.b2MixRestitutionThreshold = b2MixRestitutionThreshold;
/**
 * A contact edge is used to connect bodies and contacts together
 * in a contact graph where each body is a node and each contact
 * is an edge. A contact edge belongs to a doubly linked list
 * maintained in each attached body. Each contact has two contact
 * nodes, one for each attached body.
 */
class b2ContactEdge {
    constructor(contact) {
        /** Provides quick access to the other body attached. */
        this.m_other = null;
        /** The previous contact edge in the body's contact list */
        this.prev = null;
        /** The next contact edge in the body's contact list */
        this.next = null;
        this.contact = contact;
    }
    get other() {
        (0, b2_common_1.b2Assert)(this.m_other !== null);
        return this.m_other;
    }
    set other(value) {
        (0, b2_common_1.b2Assert)(this.m_other === null);
        this.m_other = value;
    }
    Reset() {
        this.m_other = null;
        this.prev = null;
        this.next = null;
    }
}
exports.b2ContactEdge = b2ContactEdge;
/**
 * The class manages contact between two shapes. A contact exists for each overlapping
 * AABB in the broad-phase (except if filtered). Therefore a contact object may exist
 * that has no contact points.
 */
class b2Contact {
    constructor() {
        /**
         * Used when crawling contact graph when forming islands.
         *
         * @internal protected
         */
        this.m_islandFlag = false;
        /**
         * Set when the shapes are touching.
         *
         * @internal protected
         */
        this.m_touchingFlag = false;
        /**
         * This contact can be disabled (by user)
         *
         * @internal protected
         */
        this.m_enabledFlag = false;
        /**
         * This contact needs filtering because a fixture filter was changed.
         *
         * @internal protected
         */
        this.m_filterFlag = false;
        /**
         * This bullet contact had a TOI event
         *
         * @internal protected
         */
        this.m_bulletHitFlag = false;
        /**
         * This contact has a valid TOI in m_toi
         *
         * @internal protected
         */
        this.m_toiFlag = false;
        /**
         * World pool and list pointers.
         *
         * @internal protected
         */
        this.m_prev = null;
        /** @internal protected */
        this.m_next = null;
        /**
         * Nodes for connecting bodies.
         *
         * @internal protected
         */
        this.m_nodeA = new b2ContactEdge(this);
        /** @internal protected */
        this.m_nodeB = new b2ContactEdge(this);
        /** @internal protected */
        this.m_indexA = 0;
        /** @internal protected */
        this.m_indexB = 0;
        /** @internal protected */
        this.m_manifold = new b2_collision_1.b2Manifold(); // TODO: readonly
        /** @internal protected */
        this.m_toiCount = 0;
        /** @internal protected */
        this.m_toi = 0;
        /** @internal protected */
        this.m_friction = 0;
        /** @internal protected */
        this.m_restitution = 0;
        /** @internal protected */
        this.m_restitutionThreshold = 0;
        /** @internal protected */
        this.m_tangentSpeed = 0;
        this.m_oldManifold = new b2_collision_1.b2Manifold(); // TODO: readonly
    }
    GetManifold() {
        return this.m_manifold;
    }
    GetWorldManifold(worldManifold) {
        const bodyA = this.m_fixtureA.GetBody();
        const bodyB = this.m_fixtureB.GetBody();
        const shapeA = this.GetShapeA();
        const shapeB = this.GetShapeB();
        worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius);
    }
    IsTouching() {
        return this.m_touchingFlag;
    }
    SetEnabled(flag) {
        this.m_enabledFlag = flag;
    }
    IsEnabled() {
        return this.m_enabledFlag;
    }
    GetNext() {
        return this.m_next;
    }
    GetFixtureA() {
        return this.m_fixtureA;
    }
    GetChildIndexA() {
        return this.m_indexA;
    }
    GetShapeA() {
        return this.m_fixtureA.GetShape();
    }
    GetFixtureB() {
        return this.m_fixtureB;
    }
    GetChildIndexB() {
        return this.m_indexB;
    }
    GetShapeB() {
        return this.m_fixtureB.GetShape();
    }
    /** @internal protected */
    FlagForFiltering() {
        this.m_filterFlag = true;
    }
    SetFriction(friction) {
        this.m_friction = friction;
    }
    GetFriction() {
        return this.m_friction;
    }
    ResetFriction() {
        this.m_friction = b2MixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
    }
    SetRestitution(restitution) {
        this.m_restitution = restitution;
    }
    GetRestitution() {
        return this.m_restitution;
    }
    ResetRestitution() {
        this.m_restitution = b2MixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
    }
    /**
     * Override the default restitution velocity threshold mixture. You can call this in b2ContactListener::PreSolve.
     * The value persists until you set or reset.
     */
    SetRestitutionThreshold(threshold) {
        this.m_restitutionThreshold = threshold;
    }
    /**
     * Get the restitution threshold.
     */
    GetRestitutionThreshold() {
        return this.m_restitutionThreshold;
    }
    /**
     * Reset the restitution threshold to the default value.
     */
    ResetRestitutionThreshold() {
        this.m_restitutionThreshold = b2MixRestitutionThreshold(this.m_fixtureA.m_restitutionThreshold, this.m_fixtureB.m_restitutionThreshold);
    }
    SetTangentSpeed(speed) {
        this.m_tangentSpeed = speed;
    }
    GetTangentSpeed() {
        return this.m_tangentSpeed;
    }
    Reset(fixtureA, indexA, fixtureB, indexB) {
        this.m_islandFlag = false;
        this.m_touchingFlag = false;
        this.m_enabledFlag = true;
        this.m_filterFlag = false;
        this.m_bulletHitFlag = false;
        this.m_toiFlag = false;
        this.m_fixtureA = fixtureA;
        this.m_fixtureB = fixtureB;
        this.m_indexA = indexA;
        this.m_indexB = indexB;
        this.m_manifold.pointCount = 0;
        this.m_prev = null;
        this.m_next = null;
        this.m_nodeA.Reset();
        this.m_nodeB.Reset();
        this.m_toiCount = 0;
        this.m_friction = b2MixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
        this.m_restitution = b2MixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
        this.m_restitutionThreshold = b2MixRestitutionThreshold(this.m_fixtureA.m_restitutionThreshold, this.m_fixtureB.m_restitutionThreshold);
    }
    /** @internal protected */
    Update(listener) {
        const tManifold = this.m_oldManifold;
        this.m_oldManifold = this.m_manifold;
        this.m_manifold = tManifold;
        // Re-enable this contact.
        this.m_enabledFlag = true;
        let touching = false;
        const wasTouching = this.m_touchingFlag;
        const sensorA = this.m_fixtureA.IsSensor();
        const sensorB = this.m_fixtureB.IsSensor();
        const sensor = sensorA || sensorB;
        const bodyA = this.m_fixtureA.GetBody();
        const bodyB = this.m_fixtureB.GetBody();
        const xfA = bodyA.GetTransform();
        const xfB = bodyB.GetTransform();
        // Is this contact a sensor?
        if (sensor) {
            const shapeA = this.GetShapeA();
            const shapeB = this.GetShapeB();
            touching = (0, b2_collision_1.b2TestOverlap)(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
            // Sensors don't generate manifolds.
            this.m_manifold.pointCount = 0;
        }
        else {
            this.Evaluate(this.m_manifold, xfA, xfB);
            touching = this.m_manifold.pointCount > 0;
            // Match old contact ids to new contact ids and copy the
            // stored impulses to warm start the solver.
            for (let i = 0; i < this.m_manifold.pointCount; ++i) {
                const mp2 = this.m_manifold.points[i];
                mp2.normalImpulse = 0;
                mp2.tangentImpulse = 0;
                const id2 = mp2.id;
                for (let j = 0; j < this.m_oldManifold.pointCount; ++j) {
                    const mp1 = this.m_oldManifold.points[j];
                    if (mp1.id.key === id2.key) {
                        mp2.normalImpulse = mp1.normalImpulse;
                        mp2.tangentImpulse = mp1.tangentImpulse;
                        break;
                    }
                }
            }
            if (touching !== wasTouching) {
                bodyA.SetAwake(true);
                bodyB.SetAwake(true);
            }
        }
        this.m_touchingFlag = touching;
        if (!wasTouching && touching && listener) {
            listener.BeginContact(this);
        }
        if (wasTouching && !touching && listener) {
            listener.EndContact(this);
        }
        if (!sensor && touching && listener) {
            listener.PreSolve(this, this.m_oldManifold);
        }
    }
}
exports.b2Contact = b2Contact;


/***/ }),

/***/ "Qc5p":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ChainShape = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert, b2_linearSlop } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_shape_1 = __webpack_require__("UjSx");
const b2_edge_shape_1 = __webpack_require__("5Zru");
/**
 * A chain shape is a free form sequence of line segments.
 * The chain has one-sided collision, with the surface normal pointing to the right of the edge.
 * This provides a counter-clockwise winding like the polygon shape.
 * Connectivity information is used to create smooth collisions.
 *
 * @warning the chain will not collide properly if there are self-intersections.
 */
class b2ChainShape extends b2_shape_1.b2Shape {
    constructor() {
        super(b2_shape_1.b2ShapeType.e_chain, b2_common_1.b2_polygonRadius);
        this.m_vertices = [];
        this.m_prevVertex = new b2_math_1.b2Vec2();
        this.m_nextVertex = new b2_math_1.b2Vec2();
    }
    /**
     * Create a loop. This automatically adjusts connectivity.
     *
     * @param vertices An array of vertices, these are copied
     * @param count The vertex count
     */
    CreateLoop(vertices, count = vertices.length) {
        // DEBUG: b2Assert(count >= 3);
        if (count < 3) {
            return this;
        }
        // DEBUG: for (let i =  1; i < count; ++i) {
        // DEBUG:   const v1 = vertices[i - 1];
        // DEBUG:   const v2 = vertices[i];
        // DEBUG:   // If the code crashes here, it means your vertices are too close together.
        // DEBUG:   b2Assert(b2Vec2.DistanceSquared(v1, v2) > b2_linearSlop * b2_linearSlop);
        // DEBUG: }
        this.m_vertices.length = count + 1;
        for (let i = 0; i < count; ++i) {
            const { x, y } = vertices[i];
            this.m_vertices[i] = new b2_math_1.b2Vec2(x, y);
        }
        this.m_vertices[count] = this.m_vertices[0].Clone();
        this.m_prevVertex.Copy(this.m_vertices[this.m_vertices.length - 2]);
        this.m_nextVertex.Copy(this.m_vertices[1]);
        return this;
    }
    /**
     * Create a chain with ghost vertices to connect multiple chains together.
     *
     * @param vertices An array of vertices, these are copied
     * @param count The vertex count
     * @param prevVertex Previous vertex from chain that connects to the start
     * @param nextVertex Next vertex from chain that connects to the end
     */
    CreateChain(vertices, count, prevVertex, nextVertex) {
        // DEBUG: b2Assert(count >= 2);
        // DEBUG: for (let i =  1; i < count; ++i) {
        // DEBUG:   // If the code crashes here, it means your vertices are too close together.
        // DEBUG:   b2Assert(b2Vec2.DistanceSquared(vertices[i-1], vertices[i]) > b2_linearSlop * b2_linearSlop);
        // DEBUG: }
        this.m_vertices.length = count;
        for (let i = 0; i < count; ++i) {
            const { x, y } = vertices[i];
            this.m_vertices[i] = new b2_math_1.b2Vec2(x, y);
        }
        this.m_prevVertex.Copy(prevVertex);
        this.m_nextVertex.Copy(nextVertex);
        return this;
    }
    /**
     * Implement b2Shape. Vertices are cloned using b2Alloc.
     */
    Clone() {
        return new b2ChainShape().Copy(this);
    }
    Copy(other) {
        super.Copy(other);
        // DEBUG: b2Assert(other instanceof b2ChainShape);
        return this.CreateChain(other.m_vertices, other.m_vertices.length, other.m_prevVertex, other.m_nextVertex);
    }
    /**
     * @see b2Shape::GetChildCount
     */
    GetChildCount() {
        // edge count = vertex count - 1
        return this.m_vertices.length - 1;
    }
    /**
     * Get a child edge.
     */
    GetChildEdge(edge, index) {
        // DEBUG: b2Assert(0 <= index && index < this.m_vertices.length - 1);
        edge.m_radius = this.m_radius;
        edge.m_vertex1.Copy(this.m_vertices[index]);
        edge.m_vertex2.Copy(this.m_vertices[index + 1]);
        edge.m_oneSided = true;
        if (index > 0) {
            edge.m_vertex0.Copy(this.m_vertices[index - 1]);
        }
        else {
            edge.m_vertex0.Copy(this.m_prevVertex);
        }
        if (index < this.m_vertices.length - 2) {
            edge.m_vertex3.Copy(this.m_vertices[index + 2]);
        }
        else {
            edge.m_vertex3.Copy(this.m_nextVertex);
        }
    }
    /**
     * This always return false.
     *
     * @see b2Shape::TestPoint
     */
    TestPoint(_xf, _p) {
        return false;
    }
    /**
     * Implement b2Shape.
     */
    RayCast(output, input, xf, childIndex) {
        // DEBUG: b2Assert(childIndex < this.m_vertices.length);
        const edgeShape = b2ChainShape.RayCast_s_edgeShape;
        const i1 = childIndex;
        let i2 = childIndex + 1;
        if (i2 === this.m_vertices.length) {
            i2 = 0;
        }
        edgeShape.m_vertex1.Copy(this.m_vertices[i1]);
        edgeShape.m_vertex2.Copy(this.m_vertices[i2]);
        return edgeShape.RayCast(output, input, xf, 0);
    }
    /**
     * @see b2Shape::ComputeAABB
     */
    ComputeAABB(aabb, xf, childIndex) {
        // DEBUG: b2Assert(childIndex < this.m_vertices.length);
        const i1 = childIndex;
        let i2 = childIndex + 1;
        if (i2 === this.m_vertices.length) {
            i2 = 0;
        }
        const v1 = b2_math_1.b2Transform.MultiplyVec2(xf, this.m_vertices[i1], b2ChainShape.ComputeAABB_s_v1);
        const v2 = b2_math_1.b2Transform.MultiplyVec2(xf, this.m_vertices[i2], b2ChainShape.ComputeAABB_s_v2);
        const lower = b2_math_1.b2Vec2.Min(v1, v2, b2ChainShape.ComputeAABB_s_lower);
        const upper = b2_math_1.b2Vec2.Max(v1, v2, b2ChainShape.ComputeAABB_s_upper);
        aabb.lowerBound.x = lower.x - this.m_radius;
        aabb.lowerBound.y = lower.y - this.m_radius;
        aabb.upperBound.x = upper.x + this.m_radius;
        aabb.upperBound.y = upper.y + this.m_radius;
    }
    /**
     * Chains have zero mass.
     *
     * @see b2Shape::ComputeMass
     */
    ComputeMass(massData, _density) {
        massData.mass = 0;
        massData.center.SetZero();
        massData.I = 0;
    }
    SetupDistanceProxy(proxy, index) {
        // DEBUG: b2Assert(0 <= index && index < this.m_vertices.length);
        proxy.m_vertices = proxy.m_buffer;
        proxy.m_vertices[0].Copy(this.m_vertices[index]);
        if (index + 1 < this.m_vertices.length) {
            proxy.m_vertices[1].Copy(this.m_vertices[index + 1]);
        }
        else {
            proxy.m_vertices[1].Copy(this.m_vertices[0]);
        }
        proxy.m_count = 2;
        proxy.m_radius = this.m_radius;
    }
    Draw(draw, color) {
        const vertices = this.m_vertices;
        let v1 = vertices[0];
        for (let i = 1; i < vertices.length; ++i) {
            const v2 = vertices[i];
            draw.DrawSegment(v1, v2, color);
            v1 = v2;
        }
    }
}
exports.b2ChainShape = b2ChainShape;
b2ChainShape.RayCast_s_edgeShape = new b2_edge_shape_1.b2EdgeShape();
b2ChainShape.ComputeAABB_s_v1 = new b2_math_1.b2Vec2();
b2ChainShape.ComputeAABB_s_v2 = new b2_math_1.b2Vec2();
b2ChainShape.ComputeAABB_s_lower = new b2_math_1.b2Vec2();
b2ChainShape.ComputeAABB_s_upper = new b2_math_1.b2Vec2();


/***/ }),

/***/ "TzyG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2_augment = void 0;
function b2_augment(host, augmentations) {
    for (const key of Object.keys(augmentations)) {
        const augmentation = augmentations[key];
        const original = host[key];
        // eslint-disable-next-line func-names
        const wrapper = function (...args) {
            return augmentation.call(this, original.bind(this), ...args);
        };
        Object.defineProperty(wrapper, "name", { value: key });
        host[key] = wrapper;
    }
}
exports.b2_augment = b2_augment;


/***/ }),

/***/ "U4WO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ChainAndPolygonContact = void 0;
const b2_collide_edge_1 = __webpack_require__("W84h");
const b2_edge_shape_1 = __webpack_require__("5Zru");
const b2_contact_1 = __webpack_require__("PzZv");
/** @internal */
class b2ChainAndPolygonContact extends b2_contact_1.b2Contact {
    Evaluate(manifold, xfA, xfB) {
        const edge = b2ChainAndPolygonContact.Evaluate_s_edge;
        this.GetShapeA().GetChildEdge(edge, this.m_indexA);
        (0, b2_collide_edge_1.b2CollideEdgeAndPolygon)(manifold, edge, xfA, this.GetShapeB(), xfB);
    }
}
exports.b2ChainAndPolygonContact = b2ChainAndPolygonContact;
b2ChainAndPolygonContact.Evaluate_s_edge = new b2_edge_shape_1.b2EdgeShape();


/***/ }),

/***/ "UJxA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2MakeArray = exports.b2MakeBooleanArray = exports.b2MakeNumberArray = exports.b2_version = exports.b2_angularSleepTolerance = exports.b2_linearSleepTolerance = exports.b2_timeToSleep = exports.b2_toiBaumgarte = exports.b2_baumgarte = exports.b2_maxRotationSquared = exports.b2_maxRotation = exports.b2_maxTranslationSquared = exports.b2_maxTranslation = exports.b2_maxAngularCorrection = exports.b2_maxLinearCorrection = exports.b2_maxTOIContacts = exports.b2_maxSubSteps = exports.b2_polygonRadius = exports.b2_angularSlop = exports.b2_linearSlop = exports.b2_aabbMultiplier = exports.b2_aabbExtension = exports.b2_maxManifoldPoints = exports.b2_epsilon_sq = exports.b2_epsilon = exports.b2_maxFloat = exports.b2Verify = exports.b2Assert = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_settings_1 = __webpack_require__("bg0S");
function b2Assert(condition, message) {
    if (!condition)
        throw new Error(message);
}
exports.b2Assert = b2Assert;
function b2Verify(value) {
    if (value === null)
        throw new Error();
    return value;
}
exports.b2Verify = b2Verify;
exports.b2_maxFloat = 1e37; // FLT_MAX instead of Number.MAX_VALUE;
exports.b2_epsilon = 1e-5; // FLT_EPSILON instead of Number.MIN_VALUE;
exports.b2_epsilon_sq = exports.b2_epsilon * exports.b2_epsilon;
// Global tuning constants based on meters-kilograms-seconds (MKS) units.
// Collision
/**
 * The maximum number of contact points between two convex shapes. Do
 * not change this value.
 */
exports.b2_maxManifoldPoints = 2;
/**
 * This is used to fatten AABBs in the dynamic tree. This allows proxies
 * to move by a small amount without triggering a tree adjustment.
 * This is in meters.
 */
exports.b2_aabbExtension = 0.1 * b2_settings_1.b2_lengthUnitsPerMeter;
/**
 * This is used to fatten AABBs in the dynamic tree. This is used to predict
 * the future position based on the current displacement.
 * This is a dimensionless multiplier.
 */
exports.b2_aabbMultiplier = 4;
/**
 * A small length used as a collision and constraint tolerance. Usually it is
 * chosen to be numerically significant, but visually insignificant. In meters.
 */
exports.b2_linearSlop = 0.005 * b2_settings_1.b2_lengthUnitsPerMeter;
/**
 * A small angle used as a collision and constraint tolerance. Usually it is
 * chosen to be numerically significant, but visually insignificant.
 */
exports.b2_angularSlop = (2 / 180) * Math.PI;
/**
 * The radius of the polygon/edge shape skin. This should not be modified. Making
 * this smaller means polygons will have an insufficient buffer for continuous collision.
 * Making it larger may create artifacts for vertex collision.
 */
exports.b2_polygonRadius = 2 * exports.b2_linearSlop;
/** Maximum number of sub-steps per contact in continuous physics simulation. */
exports.b2_maxSubSteps = 8;
// Dynamics
/** Maximum number of contacts to be handled to solve a TOI impact. */
exports.b2_maxTOIContacts = 32;
/**
 * The maximum linear position correction used when solving constraints. This helps to
 * prevent overshoot. Meters.
 */
exports.b2_maxLinearCorrection = 0.2 * b2_settings_1.b2_lengthUnitsPerMeter;
/**
 * The maximum angular position correction used when solving constraints. This helps to
 * prevent overshoot.
 */
exports.b2_maxAngularCorrection = (8 / 180) * Math.PI;
/**
 * The maximum linear translation of a body per step. This limit is very large and is used
 * to prevent numerical problems. You shouldn't need to adjust this. Meters.
 */
exports.b2_maxTranslation = 2 * b2_settings_1.b2_lengthUnitsPerMeter;
exports.b2_maxTranslationSquared = exports.b2_maxTranslation * exports.b2_maxTranslation;
/**
 * The maximum angular velocity of a body. This limit is very large and is used
 * to prevent numerical problems. You shouldn't need to adjust this.
 */
exports.b2_maxRotation = 0.5 * Math.PI;
exports.b2_maxRotationSquared = exports.b2_maxRotation * exports.b2_maxRotation;
/**
 * This scale factor controls how fast overlap is resolved. Ideally this would be 1 so
 * that overlap is removed in one time step. However using values close to 1 often lead
 * to overshoot.
 */
exports.b2_baumgarte = 0.2;
exports.b2_toiBaumgarte = 0.75;
// Sleep
/** The time that a body must be still before it will go to sleep. */
exports.b2_timeToSleep = 0.5;
/** A body cannot sleep if its linear velocity is above this tolerance. */
exports.b2_linearSleepTolerance = 0.01 * b2_settings_1.b2_lengthUnitsPerMeter;
/** A body cannot sleep if its angular velocity is above this tolerance. */
exports.b2_angularSleepTolerance = (2 / 180) * Math.PI;
/**
 * Current version.
 * @see http://en.wikipedia.org/wiki/Software_versioning
 */
exports.b2_version = {
    major: 2,
    minor: 4,
    patch: 0,
};
function b2MakeNumberArray(length, init = 0) {
    const result = new Array(length);
    for (let i = 0; i < length; i++)
        result[i] = init;
    return result;
}
exports.b2MakeNumberArray = b2MakeNumberArray;
function b2MakeBooleanArray(length, init = false) {
    const result = new Array(length);
    for (let i = 0; i < length; i++)
        result[i] = init;
    return result;
}
exports.b2MakeBooleanArray = b2MakeBooleanArray;
function b2MakeArray(length, Class) {
    const result = new Array(length);
    for (let i = 0; i < length; i++)
        result[i] = new Class();
    return result;
}
exports.b2MakeArray = b2MakeArray;


/***/ }),

/***/ "UjSx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Shape = exports.b2ShapeType = exports.b2MassData = void 0;
const b2_math_1 = __webpack_require__("xKh6");
/**
 * This holds the mass data computed for a shape.
 */
class b2MassData {
    constructor() {
        /** The mass of the shape, usually in kilograms. */
        this.mass = 0;
        /** The position of the shape's centroid relative to the shape's origin. */
        this.center = new b2_math_1.b2Vec2();
        /** The rotational inertia of the shape about the local origin. */
        this.I = 0;
    }
}
exports.b2MassData = b2MassData;
var b2ShapeType;
(function (b2ShapeType) {
    b2ShapeType[b2ShapeType["e_unknown"] = -1] = "e_unknown";
    b2ShapeType[b2ShapeType["e_circle"] = 0] = "e_circle";
    b2ShapeType[b2ShapeType["e_edge"] = 1] = "e_edge";
    b2ShapeType[b2ShapeType["e_polygon"] = 2] = "e_polygon";
    b2ShapeType[b2ShapeType["e_chain"] = 3] = "e_chain";
    b2ShapeType[b2ShapeType["e_typeCount"] = 4] = "e_typeCount";
})(b2ShapeType = exports.b2ShapeType || (exports.b2ShapeType = {}));
/**
 * A shape is used for collision detection. You can create a shape however you like.
 * Shapes used for simulation in b2World are created automatically when a b2Fixture
 * is created. Shapes may encapsulate a one or more child shapes.
 */
class b2Shape {
    constructor(type, radius) {
        /**
         * Radius of a shape. For polygonal shapes this must be b2_polygonRadius. There is no support for
         * making rounded polygons.
         */
        this.m_radius = 0;
        this.m_type = type;
        this.m_radius = radius;
    }
    Copy(other) {
        // DEBUG: b2Assert(this.m_type === other.m_type);
        this.m_radius = other.m_radius;
        return this;
    }
    /**
     * Get the type of this shape. You can use this to down cast to the concrete shape.
     *
     * @returns The shape type.
     */
    GetType() {
        return this.m_type;
    }
}
exports.b2Shape = b2Shape;


/***/ }),

/***/ "VFH1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2CollidePolygonAndCircle = exports.b2CollideCircles = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_collision_1 = __webpack_require__("h2hE");
const b2CollideCircles_s_pA = new b2_math_1.b2Vec2();
const b2CollideCircles_s_pB = new b2_math_1.b2Vec2();
function b2CollideCircles(manifold, circleA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    const pA = b2_math_1.b2Transform.MultiplyVec2(xfA, circleA.m_p, b2CollideCircles_s_pA);
    const pB = b2_math_1.b2Transform.MultiplyVec2(xfB, circleB.m_p, b2CollideCircles_s_pB);
    const distSqr = b2_math_1.b2Vec2.DistanceSquared(pA, pB);
    const radius = circleA.m_radius + circleB.m_radius;
    if (distSqr > radius * radius) {
        return;
    }
    manifold.type = b2_collision_1.b2ManifoldType.e_circles;
    manifold.localPoint.Copy(circleA.m_p);
    manifold.localNormal.SetZero();
    manifold.pointCount = 1;
    manifold.points[0].localPoint.Copy(circleB.m_p);
    manifold.points[0].id.key = 0;
}
exports.b2CollideCircles = b2CollideCircles;
const b2CollidePolygonAndCircle_s_c = new b2_math_1.b2Vec2();
const b2CollidePolygonAndCircle_s_cLocal = new b2_math_1.b2Vec2();
const b2CollidePolygonAndCircle_s_faceCenter = new b2_math_1.b2Vec2();
function b2CollidePolygonAndCircle(manifold, polygonA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    // Compute circle position in the frame of the polygon.
    const c = b2_math_1.b2Transform.MultiplyVec2(xfB, circleB.m_p, b2CollidePolygonAndCircle_s_c);
    const cLocal = b2_math_1.b2Transform.TransposeMultiplyVec2(xfA, c, b2CollidePolygonAndCircle_s_cLocal);
    // Find the min separating edge.
    let normalIndex = 0;
    let separation = -b2_common_1.b2_maxFloat;
    const radius = polygonA.m_radius + circleB.m_radius;
    const vertexCount = polygonA.m_count;
    const vertices = polygonA.m_vertices;
    const normals = polygonA.m_normals;
    for (let i = 0; i < vertexCount; ++i) {
        const s = b2_math_1.b2Vec2.Dot(normals[i], b2_math_1.b2Vec2.Subtract(cLocal, vertices[i], b2_math_1.b2Vec2.s_t0));
        if (s > radius) {
            // Early out.
            return;
        }
        if (s > separation) {
            separation = s;
            normalIndex = i;
        }
    }
    // Vertices that subtend the incident face.
    const vertIndex1 = normalIndex;
    const vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
    const v1 = vertices[vertIndex1];
    const v2 = vertices[vertIndex2];
    // If the center is inside the polygon ...
    if (separation < b2_common_1.b2_epsilon) {
        manifold.pointCount = 1;
        manifold.type = b2_collision_1.b2ManifoldType.e_faceA;
        manifold.localNormal.Copy(normals[normalIndex]);
        b2_math_1.b2Vec2.Mid(v1, v2, manifold.localPoint);
        manifold.points[0].localPoint.Copy(circleB.m_p);
        manifold.points[0].id.key = 0;
        return;
    }
    // Compute barycentric coordinates
    const u1 = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(cLocal, v1, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.Subtract(v2, v1, b2_math_1.b2Vec2.s_t1));
    const u2 = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(cLocal, v2, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.Subtract(v1, v2, b2_math_1.b2Vec2.s_t1));
    if (u1 <= 0) {
        if (b2_math_1.b2Vec2.DistanceSquared(cLocal, v1) > radius * radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = b2_collision_1.b2ManifoldType.e_faceA;
        b2_math_1.b2Vec2.Subtract(cLocal, v1, manifold.localNormal).Normalize();
        manifold.localPoint.Copy(v1);
        manifold.points[0].localPoint.Copy(circleB.m_p);
        manifold.points[0].id.key = 0;
    }
    else if (u2 <= 0) {
        if (b2_math_1.b2Vec2.DistanceSquared(cLocal, v2) > radius * radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = b2_collision_1.b2ManifoldType.e_faceA;
        b2_math_1.b2Vec2.Subtract(cLocal, v2, manifold.localNormal).Normalize();
        manifold.localPoint.Copy(v2);
        manifold.points[0].localPoint.Copy(circleB.m_p);
        manifold.points[0].id.key = 0;
    }
    else {
        const faceCenter = b2_math_1.b2Vec2.Mid(v1, v2, b2CollidePolygonAndCircle_s_faceCenter);
        const separation2 = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(cLocal, faceCenter, b2_math_1.b2Vec2.s_t1), normals[vertIndex1]);
        if (separation2 > radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = b2_collision_1.b2ManifoldType.e_faceA;
        manifold.localNormal.Copy(normals[vertIndex1]);
        manifold.localPoint.Copy(faceCenter);
        manifold.points[0].localPoint.Copy(circleB.m_p);
        manifold.points[0].id.key = 0;
    }
}
exports.b2CollidePolygonAndCircle = b2CollidePolygonAndCircle;


/***/ }),

/***/ "W84h":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2CollideEdgeAndPolygon = exports.b2CollideEdgeAndCircle = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_collision_1 = __webpack_require__("h2hE");
const b2_settings_1 = __webpack_require__("bg0S");
const b2CollideEdgeAndCircle_s_Q = new b2_math_1.b2Vec2();
const b2CollideEdgeAndCircle_s_e = new b2_math_1.b2Vec2();
const b2CollideEdgeAndCircle_s_d = new b2_math_1.b2Vec2();
const b2CollideEdgeAndCircle_s_e1 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndCircle_s_e2 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndCircle_s_P = new b2_math_1.b2Vec2();
const b2CollideEdgeAndCircle_s_n = new b2_math_1.b2Vec2();
const b2CollideEdgeAndCircle_s_id = new b2_collision_1.b2ContactID();
function b2CollideEdgeAndCircle(manifold, edgeA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    // Compute circle in frame of edge
    const Q = b2_math_1.b2Transform.TransposeMultiplyVec2(xfA, b2_math_1.b2Transform.MultiplyVec2(xfB, circleB.m_p, b2_math_1.b2Vec2.s_t0), b2CollideEdgeAndCircle_s_Q);
    const A = edgeA.m_vertex1;
    const B = edgeA.m_vertex2;
    const e = b2_math_1.b2Vec2.Subtract(B, A, b2CollideEdgeAndCircle_s_e);
    // Normal points to the right for a CCW winding
    const n = b2CollideEdgeAndCircle_s_n.Set(e.y, -e.x);
    const offset = b2_math_1.b2Vec2.Dot(n, b2_math_1.b2Vec2.Subtract(Q, A, b2_math_1.b2Vec2.s_t0));
    const oneSided = edgeA.m_oneSided;
    if (oneSided && offset < 0) {
        return;
    }
    // Barycentric coordinates
    const u = b2_math_1.b2Vec2.Dot(e, b2_math_1.b2Vec2.Subtract(B, Q, b2_math_1.b2Vec2.s_t0));
    const v = b2_math_1.b2Vec2.Dot(e, b2_math_1.b2Vec2.Subtract(Q, A, b2_math_1.b2Vec2.s_t0));
    const radius = edgeA.m_radius + circleB.m_radius;
    const id = b2CollideEdgeAndCircle_s_id;
    id.cf.indexB = 0;
    id.cf.typeB = b2_collision_1.b2ContactFeatureType.e_vertex;
    // Region A
    if (v <= 0) {
        const P = A;
        const d = b2_math_1.b2Vec2.Subtract(Q, P, b2CollideEdgeAndCircle_s_d);
        const dd = b2_math_1.b2Vec2.Dot(d, d);
        if (dd > radius * radius) {
            return;
        }
        // Is there an edge connected to A?
        if (edgeA.m_oneSided) {
            const A1 = edgeA.m_vertex0;
            const B1 = A;
            const e1 = b2_math_1.b2Vec2.Subtract(B1, A1, b2CollideEdgeAndCircle_s_e1);
            const u1 = b2_math_1.b2Vec2.Dot(e1, b2_math_1.b2Vec2.Subtract(B1, Q, b2_math_1.b2Vec2.s_t0));
            // Is the circle in Region AB of the previous edge?
            if (u1 > 0) {
                return;
            }
        }
        id.cf.indexA = 0;
        id.cf.typeA = b2_collision_1.b2ContactFeatureType.e_vertex;
        manifold.pointCount = 1;
        manifold.type = b2_collision_1.b2ManifoldType.e_circles;
        manifold.localNormal.SetZero();
        manifold.localPoint.Copy(P);
        manifold.points[0].id.Copy(id);
        manifold.points[0].localPoint.Copy(circleB.m_p);
        return;
    }
    // Region B
    if (u <= 0) {
        const P = B;
        const d = b2_math_1.b2Vec2.Subtract(Q, P, b2CollideEdgeAndCircle_s_d);
        const dd = b2_math_1.b2Vec2.Dot(d, d);
        if (dd > radius * radius) {
            return;
        }
        // Is there an edge connected to B?
        if (edgeA.m_oneSided) {
            const B2 = edgeA.m_vertex3;
            const A2 = B;
            const e2 = b2_math_1.b2Vec2.Subtract(B2, A2, b2CollideEdgeAndCircle_s_e2);
            const v2 = b2_math_1.b2Vec2.Dot(e2, b2_math_1.b2Vec2.Subtract(Q, A2, b2_math_1.b2Vec2.s_t0));
            // Is the circle in Region AB of the next edge?
            if (v2 > 0) {
                return;
            }
        }
        id.cf.indexA = 1;
        id.cf.typeA = b2_collision_1.b2ContactFeatureType.e_vertex;
        manifold.pointCount = 1;
        manifold.type = b2_collision_1.b2ManifoldType.e_circles;
        manifold.localNormal.SetZero();
        manifold.localPoint.Copy(P);
        manifold.points[0].id.Copy(id);
        manifold.points[0].localPoint.Copy(circleB.m_p);
        return;
    }
    // Region AB
    const den = b2_math_1.b2Vec2.Dot(e, e);
    // DEBUG: b2Assert(den > 0);
    const P = b2CollideEdgeAndCircle_s_P;
    P.x = (1 / den) * (u * A.x + v * B.x);
    P.y = (1 / den) * (u * A.y + v * B.y);
    const d = b2_math_1.b2Vec2.Subtract(Q, P, b2CollideEdgeAndCircle_s_d);
    const dd = b2_math_1.b2Vec2.Dot(d, d);
    if (dd > radius * radius) {
        return;
    }
    if (offset < 0) {
        n.Set(-n.x, -n.y);
    }
    n.Normalize();
    id.cf.indexA = 0;
    id.cf.typeA = b2_collision_1.b2ContactFeatureType.e_face;
    manifold.pointCount = 1;
    manifold.type = b2_collision_1.b2ManifoldType.e_faceA;
    manifold.localNormal.Copy(n);
    manifold.localPoint.Copy(A);
    manifold.points[0].id.Copy(id);
    manifold.points[0].localPoint.Copy(circleB.m_p);
}
exports.b2CollideEdgeAndCircle = b2CollideEdgeAndCircle;
var b2EPAxisType;
(function (b2EPAxisType) {
    b2EPAxisType[b2EPAxisType["e_unknown"] = 0] = "e_unknown";
    b2EPAxisType[b2EPAxisType["e_edgeA"] = 1] = "e_edgeA";
    b2EPAxisType[b2EPAxisType["e_edgeB"] = 2] = "e_edgeB";
})(b2EPAxisType || (b2EPAxisType = {}));
/** This structure is used to keep track of the best separating axis. */
class b2EPAxis {
    constructor() {
        this.normal = new b2_math_1.b2Vec2();
        this.type = b2EPAxisType.e_unknown;
        this.index = 0;
        this.separation = 0;
    }
}
/** This holds polygon B expressed in frame A. */
class b2TempPolygon {
    constructor() {
        this.vertices = (0, b2_common_1.b2MakeArray)(b2_settings_1.b2_maxPolygonVertices, b2_math_1.b2Vec2);
        this.normals = (0, b2_common_1.b2MakeArray)(b2_settings_1.b2_maxPolygonVertices, b2_math_1.b2Vec2);
        this.count = 0;
    }
}
/** Reference face used for clipping */
class b2ReferenceFace {
    constructor() {
        this.i1 = 0;
        this.i2 = 0;
        this.v1 = new b2_math_1.b2Vec2();
        this.v2 = new b2_math_1.b2Vec2();
        this.normal = new b2_math_1.b2Vec2();
        this.sideNormal1 = new b2_math_1.b2Vec2();
        this.sideOffset1 = 0;
        this.sideNormal2 = new b2_math_1.b2Vec2();
        this.sideOffset2 = 0;
    }
}
const b2ComputeEdgeSeparation_s_axis = new b2EPAxis();
const b2ComputeEdgeSeparation_s_axes = [new b2_math_1.b2Vec2(), new b2_math_1.b2Vec2()];
function b2ComputeEdgeSeparation(polygonB, v1, normal1) {
    const axis = b2ComputeEdgeSeparation_s_axis;
    axis.type = b2EPAxisType.e_edgeA;
    axis.index = -1;
    axis.separation = -b2_common_1.b2_maxFloat;
    axis.normal.SetZero();
    const axes = b2ComputeEdgeSeparation_s_axes;
    axes[0].Copy(normal1);
    b2_math_1.b2Vec2.Negate(normal1, axes[1]);
    // Find axis with least overlap (min-max problem)
    for (let j = 0; j < 2; ++j) {
        let sj = b2_common_1.b2_maxFloat;
        // Find deepest polygon vertex along axis j
        for (let i = 0; i < polygonB.count; ++i) {
            const si = b2_math_1.b2Vec2.Dot(axes[j], b2_math_1.b2Vec2.Subtract(polygonB.vertices[i], v1, b2_math_1.b2Vec2.s_t0));
            if (si < sj) {
                sj = si;
            }
        }
        if (sj > axis.separation) {
            axis.index = j;
            axis.separation = sj;
            axis.normal.Copy(axes[j]);
        }
    }
    return axis;
}
const b2ComputePolygonSeparation_s_axis = new b2EPAxis();
const b2ComputePolygonSeparation_s_n = new b2_math_1.b2Vec2();
function b2ComputePolygonSeparation(polygonB, v1, v2) {
    const axis = b2ComputePolygonSeparation_s_axis;
    axis.type = b2EPAxisType.e_unknown;
    axis.index = -1;
    axis.separation = -b2_common_1.b2_maxFloat;
    axis.normal.SetZero();
    for (let i = 0; i < polygonB.count; ++i) {
        const n = b2_math_1.b2Vec2.Negate(polygonB.normals[i], b2ComputePolygonSeparation_s_n);
        const s1 = b2_math_1.b2Vec2.Dot(n, b2_math_1.b2Vec2.Subtract(polygonB.vertices[i], v1, b2_math_1.b2Vec2.s_t0));
        const s2 = b2_math_1.b2Vec2.Dot(n, b2_math_1.b2Vec2.Subtract(polygonB.vertices[i], v2, b2_math_1.b2Vec2.s_t0));
        const s = Math.min(s1, s2);
        if (s > axis.separation) {
            axis.type = b2EPAxisType.e_edgeB;
            axis.index = i;
            axis.separation = s;
            axis.normal.Copy(n);
        }
    }
    return axis;
}
const b2CollideEdgeAndPolygon_s_xf = new b2_math_1.b2Transform();
const b2CollideEdgeAndPolygon_s_centroidB = new b2_math_1.b2Vec2();
const b2CollideEdgeAndPolygon_s_edge1 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndPolygon_s_normal1 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndPolygon_s_edge0 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndPolygon_s_normal0 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndPolygon_s_edge2 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndPolygon_s_normal2 = new b2_math_1.b2Vec2();
const b2CollideEdgeAndPolygon_s_tempPolygonB = new b2TempPolygon();
const b2CollideEdgeAndPolygon_s_ref = new b2ReferenceFace();
const b2CollideEdgeAndPolygon_s_clipPoints = [new b2_collision_1.b2ClipVertex(), new b2_collision_1.b2ClipVertex()];
const b2CollideEdgeAndPolygon_s_clipPoints1 = [new b2_collision_1.b2ClipVertex(), new b2_collision_1.b2ClipVertex()];
const b2CollideEdgeAndPolygon_s_clipPoints2 = [new b2_collision_1.b2ClipVertex(), new b2_collision_1.b2ClipVertex()];
function b2CollideEdgeAndPolygon(manifold, edgeA, xfA, polygonB, xfB) {
    manifold.pointCount = 0;
    const xf = b2_math_1.b2Transform.TransposeMultiply(xfA, xfB, b2CollideEdgeAndPolygon_s_xf);
    const centroidB = b2_math_1.b2Transform.MultiplyVec2(xf, polygonB.m_centroid, b2CollideEdgeAndPolygon_s_centroidB);
    const v1 = edgeA.m_vertex1;
    const v2 = edgeA.m_vertex2;
    const edge1 = b2_math_1.b2Vec2.Subtract(v2, v1, b2CollideEdgeAndPolygon_s_edge1);
    edge1.Normalize();
    // Normal points to the right for a CCW winding
    const normal1 = b2CollideEdgeAndPolygon_s_normal1.Set(edge1.y, -edge1.x);
    const offset1 = b2_math_1.b2Vec2.Dot(normal1, b2_math_1.b2Vec2.Subtract(centroidB, v1, b2_math_1.b2Vec2.s_t0));
    const oneSided = edgeA.m_oneSided;
    if (oneSided && offset1 < 0) {
        return;
    }
    // Get polygonB in frameA
    const tempPolygonB = b2CollideEdgeAndPolygon_s_tempPolygonB;
    tempPolygonB.count = polygonB.m_count;
    for (let i = 0; i < polygonB.m_count; ++i) {
        b2_math_1.b2Transform.MultiplyVec2(xf, polygonB.m_vertices[i], tempPolygonB.vertices[i]);
        b2_math_1.b2Rot.MultiplyVec2(xf.q, polygonB.m_normals[i], tempPolygonB.normals[i]);
    }
    const radius = polygonB.m_radius + edgeA.m_radius;
    const edgeAxis = b2ComputeEdgeSeparation(tempPolygonB, v1, normal1);
    if (edgeAxis.separation > radius) {
        return;
    }
    const polygonAxis = b2ComputePolygonSeparation(tempPolygonB, v1, v2);
    if (polygonAxis.separation > radius) {
        return;
    }
    // Use hysteresis for jitter reduction.
    const k_relativeTol = 0.98;
    const k_absoluteTol = 0.001;
    // b2EPAxis primaryAxis;
    let primaryAxis;
    if (polygonAxis.separation - radius > k_relativeTol * (edgeAxis.separation - radius) + k_absoluteTol) {
        primaryAxis = polygonAxis;
    }
    else {
        primaryAxis = edgeAxis;
    }
    if (oneSided) {
        // Smooth collision
        // See https://box2d.org/posts/2020/06/ghost-collisions/
        const edge0 = b2_math_1.b2Vec2.Subtract(v1, edgeA.m_vertex0, b2CollideEdgeAndPolygon_s_edge0);
        edge0.Normalize();
        const normal0 = b2CollideEdgeAndPolygon_s_normal0.Set(edge0.y, -edge0.x);
        const convex1 = b2_math_1.b2Vec2.Cross(edge0, edge1) >= 0;
        const edge2 = b2_math_1.b2Vec2.Subtract(edgeA.m_vertex3, v2, b2CollideEdgeAndPolygon_s_edge2);
        edge2.Normalize();
        const normal2 = b2CollideEdgeAndPolygon_s_normal2.Set(edge2.y, -edge2.x);
        const convex2 = b2_math_1.b2Vec2.Cross(edge1, edge2) >= 0;
        const sinTol = 0.1;
        const side1 = b2_math_1.b2Vec2.Dot(primaryAxis.normal, edge1) <= 0;
        // Check Gauss Map
        if (side1) {
            if (convex1) {
                if (b2_math_1.b2Vec2.Cross(primaryAxis.normal, normal0) > sinTol) {
                    // Skip region
                    return;
                }
                // Admit region
            }
            else {
                // Snap region
                primaryAxis = edgeAxis;
            }
        }
        else if (convex2) {
            if (b2_math_1.b2Vec2.Cross(normal2, primaryAxis.normal) > sinTol) {
                // Skip region
                return;
            }
            // Admit region
        }
        else {
            // Snap region
            primaryAxis = edgeAxis;
        }
    }
    const clipPoints = b2CollideEdgeAndPolygon_s_clipPoints;
    const ref = b2CollideEdgeAndPolygon_s_ref;
    if (primaryAxis.type === b2EPAxisType.e_edgeA) {
        manifold.type = b2_collision_1.b2ManifoldType.e_faceA;
        // Search for the polygon normal that is most anti-parallel to the edge normal.
        let bestIndex = 0;
        let bestValue = b2_math_1.b2Vec2.Dot(primaryAxis.normal, tempPolygonB.normals[0]);
        for (let i = 1; i < tempPolygonB.count; ++i) {
            const value = b2_math_1.b2Vec2.Dot(primaryAxis.normal, tempPolygonB.normals[i]);
            if (value < bestValue) {
                bestValue = value;
                bestIndex = i;
            }
        }
        const i1 = bestIndex;
        const i2 = i1 + 1 < tempPolygonB.count ? i1 + 1 : 0;
        clipPoints[0].v.Copy(tempPolygonB.vertices[i1]);
        clipPoints[0].id.cf.indexA = 0;
        clipPoints[0].id.cf.indexB = i1;
        clipPoints[0].id.cf.typeA = b2_collision_1.b2ContactFeatureType.e_face;
        clipPoints[0].id.cf.typeB = b2_collision_1.b2ContactFeatureType.e_vertex;
        clipPoints[1].v.Copy(tempPolygonB.vertices[i2]);
        clipPoints[1].id.cf.indexA = 0;
        clipPoints[1].id.cf.indexB = i2;
        clipPoints[1].id.cf.typeA = b2_collision_1.b2ContactFeatureType.e_face;
        clipPoints[1].id.cf.typeB = b2_collision_1.b2ContactFeatureType.e_vertex;
        ref.i1 = 0;
        ref.i2 = 1;
        ref.v1.Copy(v1);
        ref.v2.Copy(v2);
        ref.normal.Copy(primaryAxis.normal);
        b2_math_1.b2Vec2.Negate(edge1, ref.sideNormal1);
        ref.sideNormal2.Copy(edge1);
    }
    else {
        manifold.type = b2_collision_1.b2ManifoldType.e_faceB;
        clipPoints[0].v.Copy(v2);
        clipPoints[0].id.cf.indexA = 1;
        clipPoints[0].id.cf.indexB = primaryAxis.index;
        clipPoints[0].id.cf.typeA = b2_collision_1.b2ContactFeatureType.e_vertex;
        clipPoints[0].id.cf.typeB = b2_collision_1.b2ContactFeatureType.e_face;
        clipPoints[1].v.Copy(v1);
        clipPoints[1].id.cf.indexA = 0;
        clipPoints[1].id.cf.indexB = primaryAxis.index;
        clipPoints[1].id.cf.typeA = b2_collision_1.b2ContactFeatureType.e_vertex;
        clipPoints[1].id.cf.typeB = b2_collision_1.b2ContactFeatureType.e_face;
        ref.i1 = primaryAxis.index;
        ref.i2 = ref.i1 + 1 < tempPolygonB.count ? ref.i1 + 1 : 0;
        ref.v1.Copy(tempPolygonB.vertices[ref.i1]);
        ref.v2.Copy(tempPolygonB.vertices[ref.i2]);
        ref.normal.Copy(tempPolygonB.normals[ref.i1]);
        // CCW winding
        ref.sideNormal1.Set(ref.normal.y, -ref.normal.x);
        b2_math_1.b2Vec2.Negate(ref.sideNormal1, ref.sideNormal2);
    }
    ref.sideOffset1 = b2_math_1.b2Vec2.Dot(ref.sideNormal1, ref.v1);
    ref.sideOffset2 = b2_math_1.b2Vec2.Dot(ref.sideNormal2, ref.v2);
    // Clip incident edge against reference face side planes
    const clipPoints1 = b2CollideEdgeAndPolygon_s_clipPoints1;
    const clipPoints2 = b2CollideEdgeAndPolygon_s_clipPoints2;
    let np;
    // Clip to side 1
    np = (0, b2_collision_1.b2ClipSegmentToLine)(clipPoints1, clipPoints, ref.sideNormal1, ref.sideOffset1, ref.i1);
    if (np < b2_common_1.b2_maxManifoldPoints) {
        return;
    }
    // Clip to side 2
    np = (0, b2_collision_1.b2ClipSegmentToLine)(clipPoints2, clipPoints1, ref.sideNormal2, ref.sideOffset2, ref.i2);
    if (np < b2_common_1.b2_maxManifoldPoints) {
        return;
    }
    // Now clipPoints2 contains the clipped points.
    if (primaryAxis.type === b2EPAxisType.e_edgeA) {
        manifold.localNormal.Copy(ref.normal);
        manifold.localPoint.Copy(ref.v1);
    }
    else {
        manifold.localNormal.Copy(polygonB.m_normals[ref.i1]);
        manifold.localPoint.Copy(polygonB.m_vertices[ref.i1]);
    }
    let pointCount = 0;
    for (let i = 0; i < b2_common_1.b2_maxManifoldPoints; ++i) {
        const separation = b2_math_1.b2Vec2.Dot(ref.normal, b2_math_1.b2Vec2.Subtract(clipPoints2[i].v, ref.v1, b2_math_1.b2Vec2.s_t0));
        if (separation <= radius) {
            const cp = manifold.points[pointCount];
            if (primaryAxis.type === b2EPAxisType.e_edgeA) {
                b2_math_1.b2Transform.TransposeMultiplyVec2(xf, clipPoints2[i].v, cp.localPoint);
                cp.id.Copy(clipPoints2[i].id);
            }
            else {
                cp.localPoint.Copy(clipPoints2[i].v);
                cp.id.cf.typeA = clipPoints2[i].id.cf.typeB;
                cp.id.cf.typeB = clipPoints2[i].id.cf.typeA;
                cp.id.cf.indexA = clipPoints2[i].id.cf.indexB;
                cp.id.cf.indexB = clipPoints2[i].id.cf.indexA;
            }
            ++pointCount;
        }
    }
    manifold.pointCount = pointCount;
}
exports.b2CollideEdgeAndPolygon = b2CollideEdgeAndPolygon;


/***/ }),

/***/ "YsqY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2EdgeAndPolygonContact = void 0;
const b2_collide_edge_1 = __webpack_require__("W84h");
const b2_contact_1 = __webpack_require__("PzZv");
/** @internal */
class b2EdgeAndPolygonContact extends b2_contact_1.b2Contact {
    Evaluate(manifold, xfA, xfB) {
        (0, b2_collide_edge_1.b2CollideEdgeAndPolygon)(manifold, this.GetShapeA(), xfA, this.GetShapeB(), xfB);
    }
}
exports.b2EdgeAndPolygonContact = b2EdgeAndPolygonContact;


/***/ }),

/***/ "bg0S":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2_maxPolygonVertices = exports.b2_lengthUnitsPerMeter = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// Tunable Constants
// TODO: Make this overridable by user as box2d allows it too.
/**
 * You can use this to change the length scale used by your game.
 * For example for inches you could use 39.4.
 */
exports.b2_lengthUnitsPerMeter = 1;
/**
 * The maximum number of vertices on a convex polygon. You cannot increase
 * this too much because b2BlockAllocator has a maximum object size.
 */
exports.b2_maxPolygonVertices = 8;


/***/ }),

/***/ "dvbM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ContactFactory = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_shape_1 = __webpack_require__("UjSx");
const b2_circle_contact_1 = __webpack_require__("gIKh");
const b2_polygon_contact_1 = __webpack_require__("uqHF");
const b2_polygon_circle_contact_1 = __webpack_require__("B7sG");
const b2_edge_circle_contact_1 = __webpack_require__("stnl");
const b2_edge_polygon_contact_1 = __webpack_require__("YsqY");
const b2_chain_circle_contact_1 = __webpack_require__("yCZ+");
const b2_chain_polygon_contact_1 = __webpack_require__("U4WO");
class b2ContactFactory {
    constructor() {
        const result = new Array(b2_shape_1.b2ShapeType.e_typeCount);
        for (let i = 0; i < b2_shape_1.b2ShapeType.e_typeCount; i++)
            result[i] = new Array(b2_shape_1.b2ShapeType.e_typeCount);
        this.m_registers = result;
        this.AddType(b2_circle_contact_1.b2CircleContact, b2_shape_1.b2ShapeType.e_circle, b2_shape_1.b2ShapeType.e_circle);
        this.AddType(b2_polygon_circle_contact_1.b2PolygonAndCircleContact, b2_shape_1.b2ShapeType.e_polygon, b2_shape_1.b2ShapeType.e_circle);
        this.AddType(b2_polygon_contact_1.b2PolygonContact, b2_shape_1.b2ShapeType.e_polygon, b2_shape_1.b2ShapeType.e_polygon);
        this.AddType(b2_edge_circle_contact_1.b2EdgeAndCircleContact, b2_shape_1.b2ShapeType.e_edge, b2_shape_1.b2ShapeType.e_circle);
        this.AddType(b2_edge_polygon_contact_1.b2EdgeAndPolygonContact, b2_shape_1.b2ShapeType.e_edge, b2_shape_1.b2ShapeType.e_polygon);
        this.AddType(b2_chain_circle_contact_1.b2ChainAndCircleContact, b2_shape_1.b2ShapeType.e_chain, b2_shape_1.b2ShapeType.e_circle);
        this.AddType(b2_chain_polygon_contact_1.b2ChainAndPolygonContact, b2_shape_1.b2ShapeType.e_chain, b2_shape_1.b2ShapeType.e_polygon);
    }
    AddType(Contact, typeA, typeB) {
        const pool = [];
        const destroyFcn = (contact) => {
            pool.push(contact);
        };
        this.m_registers[typeA][typeB] = {
            createFcn(fixtureA, indexA, fixtureB, indexB) {
                var _a;
                const c = (_a = pool.pop()) !== null && _a !== void 0 ? _a : new Contact();
                c.Reset(fixtureA, indexA, fixtureB, indexB);
                return c;
            },
            destroyFcn,
        };
        if (typeA !== typeB) {
            this.m_registers[typeB][typeA] = {
                createFcn(fixtureA, indexA, fixtureB, indexB) {
                    var _a;
                    const c = (_a = pool.pop()) !== null && _a !== void 0 ? _a : new Contact();
                    c.Reset(fixtureB, indexB, fixtureA, indexA);
                    return c;
                },
                destroyFcn,
            };
        }
    }
    Create(fixtureA, indexA, fixtureB, indexB) {
        const typeA = fixtureA.GetType();
        const typeB = fixtureB.GetType();
        // DEBUG: b2Assert(0 <= typeA && typeA < b2ShapeType.e_typeCount);
        // DEBUG: b2Assert(0 <= typeB && typeB < b2ShapeType.e_typeCount);
        const reg = this.m_registers[typeA][typeB];
        return reg ? reg.createFcn(fixtureA, indexA, fixtureB, indexB) : null;
    }
    Destroy(contact) {
        const typeA = contact.m_fixtureA.GetType();
        const typeB = contact.m_fixtureB.GetType();
        // DEBUG: b2Assert(0 <= typeA && typeB < b2ShapeType.e_typeCount);
        // DEBUG: b2Assert(0 <= typeA && typeB < b2ShapeType.e_typeCount);
        const reg = this.m_registers[typeA][typeB];
        reg === null || reg === void 0 ? void 0 : reg.destroyFcn(contact);
    }
}
exports.b2ContactFactory = b2ContactFactory;


/***/ }),

/***/ "fMel":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2BroadPhase = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_dynamic_tree_1 = __webpack_require__("mCV2");
/**
 * The broad-phase is used for computing pairs and performing volume queries and ray casts.
 * This broad-phase does not persist pairs. Instead, this reports potentially new pairs.
 * It is up to the client to consume the new pairs and to track subsequent overlap.
 */
class b2BroadPhase {
    constructor() {
        this.m_tree = new b2_dynamic_tree_1.b2DynamicTree();
        this.m_proxyCount = 0;
        this.m_moveCount = 0;
        this.m_moveBuffer = [];
        this.m_pairCount = 0;
        this.m_pairBuffer = [];
        this.m_queryProxy = new b2_dynamic_tree_1.b2TreeNode();
        this.QueryCallback = (proxy) => {
            // A proxy cannot form a pair with itself.
            if (proxy.id === this.m_queryProxy.id) {
                return true;
            }
            if (proxy.moved && proxy.id > this.m_queryProxy.id) {
                // Both proxies are moving. Avoid duplicate pairs.
                return true;
            }
            // Grows the pair buffer as needed.
            this.m_pairBuffer[this.m_pairCount] =
                proxy.id < this.m_queryProxy.id ? [proxy, this.m_queryProxy] : [this.m_queryProxy, proxy];
            ++this.m_pairCount;
            return true;
        };
    }
    /**
     * Create a proxy with an initial AABB. Pairs are not reported until
     * UpdatePairs is called.
     */
    CreateProxy(aabb, userData) {
        const proxy = this.m_tree.CreateProxy(aabb, userData);
        ++this.m_proxyCount;
        this.BufferMove(proxy);
        return proxy;
    }
    /**
     * Destroy a proxy. It is up to the client to remove any pairs.
     */
    DestroyProxy(proxy) {
        this.UnBufferMove(proxy);
        --this.m_proxyCount;
        this.m_tree.DestroyProxy(proxy);
    }
    /**
     * Call MoveProxy as many times as you like, then when you are done
     * call UpdatePairs to finalized the proxy pairs (for your time step).
     */
    MoveProxy(proxy, aabb, displacement) {
        const buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
        if (buffer) {
            this.BufferMove(proxy);
        }
    }
    /**
     * Call to trigger a re-processing of it's pairs on the next call to UpdatePairs.
     */
    TouchProxy(proxy) {
        this.BufferMove(proxy);
    }
    /**
     * Get the number of proxies.
     */
    GetProxyCount() {
        return this.m_proxyCount;
    }
    /**
     * Update the pairs. This results in pair callbacks. This can only add pairs.
     */
    UpdatePairs(callback) {
        // Reset pair buffer
        this.m_pairCount = 0;
        // Perform tree queries for all moving proxies.
        for (let i = 0; i < this.m_moveCount; ++i) {
            const queryProxy = this.m_moveBuffer[i];
            if (queryProxy === null)
                continue;
            this.m_queryProxy = queryProxy;
            // We have to query the tree with the fat AABB so that
            // we don't fail to create a pair that may touch later.
            const fatAABB = queryProxy.aabb;
            // Query tree, create pairs and add them pair buffer.
            this.m_tree.Query(fatAABB, this.QueryCallback);
        }
        // Send pairs to caller
        for (let i = 0; i < this.m_pairCount; ++i) {
            const primaryPair = this.m_pairBuffer[i];
            const userDataA = (0, b2_common_1.b2Verify)(primaryPair[0].userData);
            const userDataB = (0, b2_common_1.b2Verify)(primaryPair[1].userData);
            callback(userDataA, userDataB);
        }
        // Clear move flags
        for (let i = 0; i < this.m_moveCount; ++i) {
            const proxy = this.m_moveBuffer[i];
            if (proxy)
                proxy.moved = false;
        }
        // Reset move buffer
        this.m_moveCount = 0;
    }
    /**
     * Query an AABB for overlapping proxies. The callback class
     * is called for each proxy that overlaps the supplied AABB.
     */
    Query(aabb, callback) {
        this.m_tree.Query(aabb, callback);
    }
    QueryPoint(point, callback) {
        this.m_tree.QueryPoint(point, callback);
    }
    /**
     * Ray-cast against the proxies in the tree. This relies on the callback
     * to perform a exact ray-cast in the case were the proxy contains a shape.
     * The callback also performs the any collision filtering. This has performance
     * roughly equal to k * log(n), where k is the number of collisions and n is the
     * number of proxies in the tree.
     *
     * @param input The ray-cast input data. The ray extends from p1 to p1 + maxFraction * (p2 - p1).
     * @param callback A callback class that is called for each proxy that is hit by the ray.
     */
    RayCast(input, callback) {
        this.m_tree.RayCast(input, callback);
    }
    /**
     * Get the height of the embedded tree.
     */
    GetTreeHeight() {
        return this.m_tree.GetHeight();
    }
    /**
     * Get the balance of the embedded tree.
     */
    GetTreeBalance() {
        return this.m_tree.GetMaxBalance();
    }
    /**
     * Get the quality metric of the embedded tree.
     */
    GetTreeQuality() {
        return this.m_tree.GetAreaRatio();
    }
    /**
     * Shift the world origin. Useful for large worlds.
     * The shift formula is: position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    ShiftOrigin(newOrigin) {
        this.m_tree.ShiftOrigin(newOrigin);
    }
    BufferMove(proxy) {
        this.m_moveBuffer[this.m_moveCount] = proxy;
        ++this.m_moveCount;
    }
    UnBufferMove(proxy) {
        const i = this.m_moveBuffer.indexOf(proxy);
        this.m_moveBuffer[i] = null;
    }
}
exports.b2BroadPhase = b2BroadPhase;


/***/ }),

/***/ "fn+a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ContactSolver = exports.b2ContactSolverDef = exports.b2ContactVelocityConstraint = exports.b2GetBlockSolve = exports.b2SetBlockSolve = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_collision_1 = __webpack_require__("h2hE");
const b2_time_step_1 = __webpack_require__("Nx71");
let g_blockSolve = true;
function b2SetBlockSolve(value) {
    g_blockSolve = value;
}
exports.b2SetBlockSolve = b2SetBlockSolve;
function b2GetBlockSolve() {
    return g_blockSolve;
}
exports.b2GetBlockSolve = b2GetBlockSolve;
class b2VelocityConstraintPoint {
    constructor() {
        this.rA = new b2_math_1.b2Vec2();
        this.rB = new b2_math_1.b2Vec2();
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.normalMass = 0;
        this.tangentMass = 0;
        this.velocityBias = 0;
    }
}
/** @internal */
class b2ContactVelocityConstraint {
    constructor() {
        this.points = (0, b2_common_1.b2MakeArray)(b2_common_1.b2_maxManifoldPoints, b2VelocityConstraintPoint);
        this.normal = new b2_math_1.b2Vec2();
        this.tangent = new b2_math_1.b2Vec2();
        this.normalMass = new b2_math_1.b2Mat22();
        this.K = new b2_math_1.b2Mat22();
        this.indexA = 0;
        this.indexB = 0;
        this.invMassA = 0;
        this.invMassB = 0;
        this.invIA = 0;
        this.invIB = 0;
        this.friction = 0;
        this.restitution = 0;
        this.threshold = 0;
        this.tangentSpeed = 0;
        this.pointCount = 0;
        this.contactIndex = 0;
    }
}
exports.b2ContactVelocityConstraint = b2ContactVelocityConstraint;
class b2ContactPositionConstraint {
    constructor() {
        this.localPoints = (0, b2_common_1.b2MakeArray)(b2_common_1.b2_maxManifoldPoints, b2_math_1.b2Vec2);
        this.localNormal = new b2_math_1.b2Vec2();
        this.localPoint = new b2_math_1.b2Vec2();
        this.indexA = 0;
        this.indexB = 0;
        this.invMassA = 0;
        this.invMassB = 0;
        this.localCenterA = new b2_math_1.b2Vec2();
        this.localCenterB = new b2_math_1.b2Vec2();
        this.invIA = 0;
        this.invIB = 0;
        this.type = b2_collision_1.b2ManifoldType.e_circles;
        this.radiusA = 0;
        this.radiusB = 0;
        this.pointCount = 0;
    }
}
/** @internal */
class b2ContactSolverDef {
    constructor() {
        this.step = b2_time_step_1.b2TimeStep.Create();
        this.count = 0;
    }
}
exports.b2ContactSolverDef = b2ContactSolverDef;
class b2PositionSolverManifold {
    constructor() {
        this.normal = new b2_math_1.b2Vec2();
        this.point = new b2_math_1.b2Vec2();
        this.separation = 0;
    }
    Initialize(pc, xfA, xfB, index) {
        const pointA = b2PositionSolverManifold.Initialize_s_pointA;
        const pointB = b2PositionSolverManifold.Initialize_s_pointB;
        const planePoint = b2PositionSolverManifold.Initialize_s_planePoint;
        const clipPoint = b2PositionSolverManifold.Initialize_s_clipPoint;
        // DEBUG: b2Assert(pc.pointCount > 0);
        switch (pc.type) {
            case b2_collision_1.b2ManifoldType.e_circles:
                b2_math_1.b2Transform.MultiplyVec2(xfA, pc.localPoint, pointA);
                b2_math_1.b2Transform.MultiplyVec2(xfB, pc.localPoints[0], pointB);
                b2_math_1.b2Vec2.Subtract(pointB, pointA, this.normal).Normalize();
                b2_math_1.b2Vec2.Mid(pointA, pointB, this.point);
                this.separation =
                    b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pointB, pointA, b2_math_1.b2Vec2.s_t0), this.normal) - pc.radiusA - pc.radiusB;
                break;
            case b2_collision_1.b2ManifoldType.e_faceA:
                b2_math_1.b2Rot.MultiplyVec2(xfA.q, pc.localNormal, this.normal);
                b2_math_1.b2Transform.MultiplyVec2(xfA, pc.localPoint, planePoint);
                b2_math_1.b2Transform.MultiplyVec2(xfB, pc.localPoints[index], clipPoint);
                this.separation =
                    b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(clipPoint, planePoint, b2_math_1.b2Vec2.s_t0), this.normal) -
                        pc.radiusA -
                        pc.radiusB;
                this.point.Copy(clipPoint);
                break;
            case b2_collision_1.b2ManifoldType.e_faceB:
                b2_math_1.b2Rot.MultiplyVec2(xfB.q, pc.localNormal, this.normal);
                b2_math_1.b2Transform.MultiplyVec2(xfB, pc.localPoint, planePoint);
                b2_math_1.b2Transform.MultiplyVec2(xfA, pc.localPoints[index], clipPoint);
                this.separation =
                    b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(clipPoint, planePoint, b2_math_1.b2Vec2.s_t0), this.normal) -
                        pc.radiusA -
                        pc.radiusB;
                this.point.Copy(clipPoint);
                // Ensure normal points from A to B
                this.normal.Negate();
                break;
        }
    }
}
b2PositionSolverManifold.Initialize_s_pointA = new b2_math_1.b2Vec2();
b2PositionSolverManifold.Initialize_s_pointB = new b2_math_1.b2Vec2();
b2PositionSolverManifold.Initialize_s_planePoint = new b2_math_1.b2Vec2();
b2PositionSolverManifold.Initialize_s_clipPoint = new b2_math_1.b2Vec2();
/** @internal */
class b2ContactSolver {
    constructor() {
        this.m_step = b2_time_step_1.b2TimeStep.Create();
        this.m_positionConstraints = (0, b2_common_1.b2MakeArray)(1024, b2ContactPositionConstraint); // TODO: b2Settings
        this.m_velocityConstraints = (0, b2_common_1.b2MakeArray)(1024, b2ContactVelocityConstraint); // TODO: b2Settings
        this.m_count = 0;
    }
    Initialize(def) {
        this.m_step.Copy(def.step);
        this.m_count = def.count;
        // TODO:
        if (this.m_positionConstraints.length < this.m_count) {
            const new_length = Math.max(this.m_positionConstraints.length * 2, this.m_count);
            while (this.m_positionConstraints.length < new_length) {
                this.m_positionConstraints[this.m_positionConstraints.length] = new b2ContactPositionConstraint();
            }
        }
        // TODO:
        if (this.m_velocityConstraints.length < this.m_count) {
            const new_length = Math.max(this.m_velocityConstraints.length * 2, this.m_count);
            while (this.m_velocityConstraints.length < new_length) {
                this.m_velocityConstraints[this.m_velocityConstraints.length] = new b2ContactVelocityConstraint();
            }
        }
        this.m_positions = def.positions;
        this.m_velocities = def.velocities;
        this.m_contacts = def.contacts;
        // Initialize position independent portions of the constraints.
        for (let i = 0; i < this.m_count; ++i) {
            const contact = this.m_contacts[i];
            const fixtureA = contact.m_fixtureA;
            const fixtureB = contact.m_fixtureB;
            const shapeA = fixtureA.GetShape();
            const shapeB = fixtureB.GetShape();
            const radiusA = shapeA.m_radius;
            const radiusB = shapeB.m_radius;
            const bodyA = fixtureA.GetBody();
            const bodyB = fixtureB.GetBody();
            const manifold = contact.GetManifold();
            const { pointCount } = manifold;
            // DEBUG: b2Assert(pointCount > 0);
            const vc = this.m_velocityConstraints[i];
            vc.friction = contact.m_friction;
            vc.restitution = contact.m_restitution;
            vc.threshold = contact.m_restitutionThreshold;
            vc.tangentSpeed = contact.m_tangentSpeed;
            vc.indexA = bodyA.m_islandIndex;
            vc.indexB = bodyB.m_islandIndex;
            vc.invMassA = bodyA.m_invMass;
            vc.invMassB = bodyB.m_invMass;
            vc.invIA = bodyA.m_invI;
            vc.invIB = bodyB.m_invI;
            vc.contactIndex = i;
            vc.pointCount = pointCount;
            vc.K.SetZero();
            vc.normalMass.SetZero();
            const pc = this.m_positionConstraints[i];
            pc.indexA = bodyA.m_islandIndex;
            pc.indexB = bodyB.m_islandIndex;
            pc.invMassA = bodyA.m_invMass;
            pc.invMassB = bodyB.m_invMass;
            pc.localCenterA.Copy(bodyA.m_sweep.localCenter);
            pc.localCenterB.Copy(bodyB.m_sweep.localCenter);
            pc.invIA = bodyA.m_invI;
            pc.invIB = bodyB.m_invI;
            pc.localNormal.Copy(manifold.localNormal);
            pc.localPoint.Copy(manifold.localPoint);
            pc.pointCount = pointCount;
            pc.radiusA = radiusA;
            pc.radiusB = radiusB;
            pc.type = manifold.type;
            for (let j = 0; j < pointCount; ++j) {
                const cp = manifold.points[j];
                const vcp = vc.points[j];
                if (this.m_step.warmStarting) {
                    vcp.normalImpulse = this.m_step.dtRatio * cp.normalImpulse;
                    vcp.tangentImpulse = this.m_step.dtRatio * cp.tangentImpulse;
                }
                else {
                    vcp.normalImpulse = 0;
                    vcp.tangentImpulse = 0;
                }
                vcp.rA.SetZero();
                vcp.rB.SetZero();
                vcp.normalMass = 0;
                vcp.tangentMass = 0;
                vcp.velocityBias = 0;
                pc.localPoints[j].Copy(cp.localPoint);
            }
        }
        return this;
    }
    InitializeVelocityConstraints() {
        const xfA = b2ContactSolver.InitializeVelocityConstraints_s_xfA;
        const xfB = b2ContactSolver.InitializeVelocityConstraints_s_xfB;
        const worldManifold = b2ContactSolver.InitializeVelocityConstraints_s_worldManifold;
        const k_maxConditionNumber = 1000;
        for (let i = 0; i < this.m_count; ++i) {
            const vc = this.m_velocityConstraints[i];
            const pc = this.m_positionConstraints[i];
            const { radiusA, radiusB, localCenterA, localCenterB } = pc;
            const manifold = this.m_contacts[vc.contactIndex].GetManifold();
            const { indexA, indexB, tangent, pointCount } = vc;
            const mA = vc.invMassA;
            const mB = vc.invMassB;
            const iA = vc.invIA;
            const iB = vc.invIB;
            const cA = this.m_positions[indexA].c;
            const aA = this.m_positions[indexA].a;
            const vA = this.m_velocities[indexA].v;
            const wA = this.m_velocities[indexA].w;
            const cB = this.m_positions[indexB].c;
            const aB = this.m_positions[indexB].a;
            const vB = this.m_velocities[indexB].v;
            const wB = this.m_velocities[indexB].w;
            // DEBUG: b2Assert(manifold.pointCount > 0);
            xfA.q.Set(aA);
            xfB.q.Set(aB);
            b2_math_1.b2Vec2.Subtract(cA, b2_math_1.b2Rot.MultiplyVec2(xfA.q, localCenterA, b2_math_1.b2Vec2.s_t0), xfA.p);
            b2_math_1.b2Vec2.Subtract(cB, b2_math_1.b2Rot.MultiplyVec2(xfB.q, localCenterB, b2_math_1.b2Vec2.s_t0), xfB.p);
            worldManifold.Initialize(manifold, xfA, radiusA, xfB, radiusB);
            vc.normal.Copy(worldManifold.normal);
            b2_math_1.b2Vec2.CrossVec2One(vc.normal, tangent); // compute from normal
            for (let j = 0; j < pointCount; ++j) {
                const vcp = vc.points[j];
                b2_math_1.b2Vec2.Subtract(worldManifold.points[j], cA, vcp.rA);
                b2_math_1.b2Vec2.Subtract(worldManifold.points[j], cB, vcp.rB);
                const rnA = b2_math_1.b2Vec2.Cross(vcp.rA, vc.normal);
                const rnB = b2_math_1.b2Vec2.Cross(vcp.rB, vc.normal);
                const kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                vcp.normalMass = kNormal > 0 ? 1 / kNormal : 0;
                const rtA = b2_math_1.b2Vec2.Cross(vcp.rA, tangent);
                const rtB = b2_math_1.b2Vec2.Cross(vcp.rB, tangent);
                const kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
                vcp.tangentMass = kTangent > 0 ? 1 / kTangent : 0;
                // Setup a velocity bias for restitution.
                vcp.velocityBias = 0;
                const vRel = b2_math_1.b2Vec2.Dot(vc.normal, b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, vcp.rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, vcp.rA, b2_math_1.b2Vec2.s_t1), b2_math_1.b2Vec2.s_t0));
                if (vRel < -vc.threshold) {
                    vcp.velocityBias = -vc.restitution * vRel;
                }
            }
            // If we have two points, then prepare the block solver.
            if (vc.pointCount === 2 && g_blockSolve) {
                const vcp1 = vc.points[0];
                const vcp2 = vc.points[1];
                const rn1A = b2_math_1.b2Vec2.Cross(vcp1.rA, vc.normal);
                const rn1B = b2_math_1.b2Vec2.Cross(vcp1.rB, vc.normal);
                const rn2A = b2_math_1.b2Vec2.Cross(vcp2.rA, vc.normal);
                const rn2B = b2_math_1.b2Vec2.Cross(vcp2.rB, vc.normal);
                const k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
                const k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
                const k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
                // Ensure a reasonable condition number.
                if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
                    // K is safe to invert.
                    vc.K.ex.Set(k11, k12);
                    vc.K.ey.Set(k12, k22);
                    vc.K.GetInverse(vc.normalMass);
                }
                else {
                    // The constraints are redundant, just use one.
                    // TODO_ERIN use deepest?
                    vc.pointCount = 1;
                }
            }
        }
    }
    WarmStart() {
        const P = b2ContactSolver.WarmStart_s_P;
        // Warm start.
        for (let i = 0; i < this.m_count; ++i) {
            const vc = this.m_velocityConstraints[i];
            const { indexA, indexB, pointCount, normal, tangent } = vc;
            const mA = vc.invMassA;
            const iA = vc.invIA;
            const mB = vc.invMassB;
            const iB = vc.invIB;
            const vA = this.m_velocities[indexA].v;
            let wA = this.m_velocities[indexA].w;
            const vB = this.m_velocities[indexB].v;
            let wB = this.m_velocities[indexB].w;
            for (let j = 0; j < pointCount; ++j) {
                const vcp = vc.points[j];
                b2_math_1.b2Vec2.Add(b2_math_1.b2Vec2.Scale(vcp.normalImpulse, normal, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.Scale(vcp.tangentImpulse, tangent, b2_math_1.b2Vec2.s_t1), P);
                wA -= iA * b2_math_1.b2Vec2.Cross(vcp.rA, P);
                vA.SubtractScaled(mA, P);
                wB += iB * b2_math_1.b2Vec2.Cross(vcp.rB, P);
                vB.AddScaled(mB, P);
            }
            this.m_velocities[indexA].w = wA;
            this.m_velocities[indexB].w = wB;
        }
    }
    SolveVelocityConstraints() {
        const dv = b2ContactSolver.SolveVelocityConstraints_s_dv;
        const dv1 = b2ContactSolver.SolveVelocityConstraints_s_dv1;
        const dv2 = b2ContactSolver.SolveVelocityConstraints_s_dv2;
        const P = b2ContactSolver.SolveVelocityConstraints_s_P;
        const a = b2ContactSolver.SolveVelocityConstraints_s_a;
        const b = b2ContactSolver.SolveVelocityConstraints_s_b;
        const x = b2ContactSolver.SolveVelocityConstraints_s_x;
        const d = b2ContactSolver.SolveVelocityConstraints_s_d;
        const P1 = b2ContactSolver.SolveVelocityConstraints_s_P1;
        const P2 = b2ContactSolver.SolveVelocityConstraints_s_P2;
        const P1P2 = b2ContactSolver.SolveVelocityConstraints_s_P1P2;
        for (let i = 0; i < this.m_count; ++i) {
            const vc = this.m_velocityConstraints[i];
            const { indexA, indexB, pointCount, normal, tangent, friction } = vc;
            const mA = vc.invMassA;
            const iA = vc.invIA;
            const mB = vc.invMassB;
            const iB = vc.invIB;
            const vA = this.m_velocities[indexA].v;
            let wA = this.m_velocities[indexA].w;
            const vB = this.m_velocities[indexB].v;
            let wB = this.m_velocities[indexB].w;
            // DEBUG: b2Assert(pointCount === 1 || pointCount === 2);
            // Solve tangent constraints first because non-penetration is more important
            // than friction.
            for (let j = 0; j < pointCount; ++j) {
                const vcp = vc.points[j];
                // Relative velocity at contact
                b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, vcp.rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, vcp.rA, b2_math_1.b2Vec2.s_t1), dv);
                // Compute tangent force
                const vt = b2_math_1.b2Vec2.Dot(dv, tangent) - vc.tangentSpeed;
                let lambda = vcp.tangentMass * -vt;
                // b2Clamp the accumulated force
                const maxFriction = friction * vcp.normalImpulse;
                const newImpulse = (0, b2_math_1.b2Clamp)(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
                lambda = newImpulse - vcp.tangentImpulse;
                vcp.tangentImpulse = newImpulse;
                // Apply contact impulse
                b2_math_1.b2Vec2.Scale(lambda, tangent, P);
                vA.SubtractScaled(mA, P);
                wA -= iA * b2_math_1.b2Vec2.Cross(vcp.rA, P);
                vB.AddScaled(mB, P);
                wB += iB * b2_math_1.b2Vec2.Cross(vcp.rB, P);
            }
            // Solve normal constraints
            if (vc.pointCount === 1 || g_blockSolve === false) {
                for (let j = 0; j < pointCount; ++j) {
                    const vcp = vc.points[j];
                    // Relative velocity at contact
                    b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, vcp.rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, vcp.rA, b2_math_1.b2Vec2.s_t1), dv);
                    // Compute normal impulse
                    const vn = b2_math_1.b2Vec2.Dot(dv, normal);
                    let lambda = -vcp.normalMass * (vn - vcp.velocityBias);
                    // b2Clamp the accumulated impulse
                    const newImpulse = Math.max(vcp.normalImpulse + lambda, 0);
                    lambda = newImpulse - vcp.normalImpulse;
                    vcp.normalImpulse = newImpulse;
                    // Apply contact impulse
                    b2_math_1.b2Vec2.Scale(lambda, normal, P);
                    vA.SubtractScaled(mA, P);
                    wA -= iA * b2_math_1.b2Vec2.Cross(vcp.rA, P);
                    vB.AddScaled(mB, P);
                    wB += iB * b2_math_1.b2Vec2.Cross(vcp.rB, P);
                }
            }
            else {
                // Block solver developed in collaboration with Dirk Gregorius (back in 01/07 on Box2d_Lite).
                // Build the mini LCP for this contact patch
                //
                // vn = A * x + b, vn >= 0, x >= 0 and vn_i * x_i = 0 with i = 1..2
                //
                // A = J * W * JT and J = ( -n, -r1 x n, n, r2 x n )
                // b = vn0 - velocityBias
                //
                // The system is solved using the "Total enumeration method" (s. Murty). The complementary constraint vn_i * x_i
                // implies that we must have in any solution either vn_i = 0 or x_i = 0. So for the 2D contact problem the cases
                // vn1 = 0 and vn2 = 0, x1 = 0 and x2 = 0, x1 = 0 and vn2 = 0, x2 = 0 and vn1 = 0 need to be tested. The first valid
                // solution that satisfies the problem is chosen.
                //
                // In order to account of the accumulated impulse 'a' (because of the iterative nature of the solver which only requires
                // that the accumulated impulse is clamped and not the incremental impulse) we change the impulse variable (x_i).
                //
                // Substitute:
                //
                // x = a + d
                //
                // a := old total impulse
                // x := new total impulse
                // d := incremental impulse
                //
                // For the current iteration we extend the formula for the incremental impulse
                // to compute the new total impulse:
                //
                // vn = A * d + b
                //    = A * (x - a) + b
                //    = A * x + b - A * a
                //    = A * x + b'
                // b' = b - A * a;
                const cp1 = vc.points[0];
                const cp2 = vc.points[1];
                a.Set(cp1.normalImpulse, cp2.normalImpulse);
                // DEBUG: b2Assert(a.x >= 0 && a.y >= 0);
                // Relative velocity at contact
                b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, cp1.rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, cp1.rA, b2_math_1.b2Vec2.s_t1), dv1);
                b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, cp2.rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, cp2.rA, b2_math_1.b2Vec2.s_t1), dv2);
                // Compute normal velocity
                let vn1 = b2_math_1.b2Vec2.Dot(dv1, normal);
                let vn2 = b2_math_1.b2Vec2.Dot(dv2, normal);
                b.x = vn1 - cp1.velocityBias;
                b.y = vn2 - cp2.velocityBias;
                // Compute b'
                b.Subtract(b2_math_1.b2Mat22.MultiplyVec2(vc.K, a, b2_math_1.b2Vec2.s_t0));
                for (;;) {
                    //
                    // Case 1: vn = 0
                    //
                    // 0 = A * x + b'
                    //
                    // Solve for x:
                    //
                    // x = - inv(A) * b'
                    //
                    // b2Vec2 x = - b2Mul(vc->normalMass, b);
                    b2_math_1.b2Mat22.MultiplyVec2(vc.normalMass, b, x).Negate();
                    if (x.x >= 0 && x.y >= 0) {
                        // Get the incremental impulse
                        // b2Vec2 d = x - a;
                        b2_math_1.b2Vec2.Subtract(x, a, d);
                        // Apply incremental impulse
                        b2_math_1.b2Vec2.Scale(d.x, normal, P1);
                        b2_math_1.b2Vec2.Scale(d.y, normal, P2);
                        b2_math_1.b2Vec2.Add(P1, P2, P1P2);
                        vA.SubtractScaled(mA, P1P2);
                        wA -= iA * (b2_math_1.b2Vec2.Cross(cp1.rA, P1) + b2_math_1.b2Vec2.Cross(cp2.rA, P2));
                        vB.AddScaled(mB, P1P2);
                        wB += iB * (b2_math_1.b2Vec2.Cross(cp1.rB, P1) + b2_math_1.b2Vec2.Cross(cp2.rB, P2));
                        // Accumulate
                        cp1.normalImpulse = x.x;
                        cp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 2: vn1 = 0 and x2 = 0
                    //
                    //   0 = a11 * x1 + a12 * 0 + b1'
                    // vn2 = a21 * x1 + a22 * 0 + b2'
                    //
                    x.x = -cp1.normalMass * b.x;
                    x.y = 0;
                    vn1 = 0;
                    vn2 = vc.K.ex.y * x.x + b.y;
                    if (x.x >= 0 && vn2 >= 0) {
                        // Get the incremental impulse
                        // b2Vec2 d = x - a;
                        b2_math_1.b2Vec2.Subtract(x, a, d);
                        // Apply incremental impulse
                        b2_math_1.b2Vec2.Scale(d.x, normal, P1);
                        b2_math_1.b2Vec2.Scale(d.y, normal, P2);
                        b2_math_1.b2Vec2.Add(P1, P2, P1P2);
                        vA.SubtractScaled(mA, P1P2);
                        wA -= iA * (b2_math_1.b2Vec2.Cross(cp1.rA, P1) + b2_math_1.b2Vec2.Cross(cp2.rA, P2));
                        vB.AddScaled(mB, P1P2);
                        wB += iB * (b2_math_1.b2Vec2.Cross(cp1.rB, P1) + b2_math_1.b2Vec2.Cross(cp2.rB, P2));
                        // Accumulate
                        cp1.normalImpulse = x.x;
                        cp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 3: vn2 = 0 and x1 = 0
                    //
                    // vn1 = a11 * 0 + a12 * x2 + b1'
                    //   0 = a21 * 0 + a22 * x2 + b2'
                    //
                    x.x = 0;
                    x.y = -cp2.normalMass * b.y;
                    vn1 = vc.K.ey.x * x.y + b.x;
                    vn2 = 0;
                    if (x.y >= 0 && vn1 >= 0) {
                        // Resubstitute for the incremental impulse
                        b2_math_1.b2Vec2.Subtract(x, a, d);
                        // Apply incremental impulse
                        b2_math_1.b2Vec2.Scale(d.x, normal, P1);
                        b2_math_1.b2Vec2.Scale(d.y, normal, P2);
                        b2_math_1.b2Vec2.Add(P1, P2, P1P2);
                        vA.SubtractScaled(mA, P1P2);
                        wA -= iA * (b2_math_1.b2Vec2.Cross(cp1.rA, P1) + b2_math_1.b2Vec2.Cross(cp2.rA, P2));
                        vB.AddScaled(mB, P1P2);
                        wB += iB * (b2_math_1.b2Vec2.Cross(cp1.rB, P1) + b2_math_1.b2Vec2.Cross(cp2.rB, P2));
                        // Accumulate
                        cp1.normalImpulse = x.x;
                        cp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 4: x1 = 0 and x2 = 0
                    //
                    // vn1 = b1
                    // vn2 = b2;
                    x.x = 0;
                    x.y = 0;
                    vn1 = b.x;
                    vn2 = b.y;
                    if (vn1 >= 0 && vn2 >= 0) {
                        // Resubstitute for the incremental impulse
                        b2_math_1.b2Vec2.Subtract(x, a, d);
                        // Apply incremental impulse
                        b2_math_1.b2Vec2.Scale(d.x, normal, P1);
                        b2_math_1.b2Vec2.Scale(d.y, normal, P2);
                        b2_math_1.b2Vec2.Add(P1, P2, P1P2);
                        vA.SubtractScaled(mA, P1P2);
                        wA -= iA * (b2_math_1.b2Vec2.Cross(cp1.rA, P1) + b2_math_1.b2Vec2.Cross(cp2.rA, P2));
                        vB.AddScaled(mB, P1P2);
                        wB += iB * (b2_math_1.b2Vec2.Cross(cp1.rB, P1) + b2_math_1.b2Vec2.Cross(cp2.rB, P2));
                        // Accumulate
                        cp1.normalImpulse = x.x;
                        cp2.normalImpulse = x.y;
                        break;
                    }
                    // No solution, give up. This is hit sometimes, but it doesn't seem to matter.
                    break;
                }
            }
            this.m_velocities[indexA].w = wA;
            this.m_velocities[indexB].w = wB;
        }
    }
    StoreImpulses() {
        for (let i = 0; i < this.m_count; ++i) {
            const vc = this.m_velocityConstraints[i];
            const manifold = this.m_contacts[vc.contactIndex].GetManifold();
            for (let j = 0; j < vc.pointCount; ++j) {
                manifold.points[j].normalImpulse = vc.points[j].normalImpulse;
                manifold.points[j].tangentImpulse = vc.points[j].tangentImpulse;
            }
        }
    }
    SolvePositionConstraints() {
        const xfA = b2ContactSolver.SolvePositionConstraints_s_xfA;
        const xfB = b2ContactSolver.SolvePositionConstraints_s_xfB;
        const psm = b2ContactSolver.SolvePositionConstraints_s_psm;
        const rA = b2ContactSolver.SolvePositionConstraints_s_rA;
        const rB = b2ContactSolver.SolvePositionConstraints_s_rB;
        const P = b2ContactSolver.SolvePositionConstraints_s_P;
        let minSeparation = 0;
        for (let i = 0; i < this.m_count; ++i) {
            const pc = this.m_positionConstraints[i];
            const { indexA, indexB, localCenterA, localCenterB, pointCount } = pc;
            const mA = pc.invMassA;
            const iA = pc.invIA;
            const mB = pc.invMassB;
            const iB = pc.invIB;
            const cA = this.m_positions[indexA].c;
            let aA = this.m_positions[indexA].a;
            const cB = this.m_positions[indexB].c;
            let aB = this.m_positions[indexB].a;
            // Solve normal constraints
            for (let j = 0; j < pointCount; ++j) {
                xfA.q.Set(aA);
                xfB.q.Set(aB);
                b2_math_1.b2Vec2.Subtract(cA, b2_math_1.b2Rot.MultiplyVec2(xfA.q, localCenterA, b2_math_1.b2Vec2.s_t0), xfA.p);
                b2_math_1.b2Vec2.Subtract(cB, b2_math_1.b2Rot.MultiplyVec2(xfB.q, localCenterB, b2_math_1.b2Vec2.s_t0), xfB.p);
                psm.Initialize(pc, xfA, xfB, j);
                const { normal, point, separation } = psm;
                b2_math_1.b2Vec2.Subtract(point, cA, rA);
                b2_math_1.b2Vec2.Subtract(point, cB, rB);
                // Track max constraint error.
                minSeparation = Math.min(minSeparation, separation);
                // Prevent large corrections and allow slop.
                const C = (0, b2_math_1.b2Clamp)(b2_common_1.b2_baumgarte * (separation + b2_common_1.b2_linearSlop), -b2_common_1.b2_maxLinearCorrection, 0);
                // Compute the effective mass.
                const rnA = b2_math_1.b2Vec2.Cross(rA, normal);
                const rnB = b2_math_1.b2Vec2.Cross(rB, normal);
                const K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                // Compute normal impulse
                const impulse = K > 0 ? -C / K : 0;
                b2_math_1.b2Vec2.Scale(impulse, normal, P);
                cA.SubtractScaled(mA, P);
                aA -= iA * b2_math_1.b2Vec2.Cross(rA, P);
                cB.AddScaled(mB, P);
                aB += iB * b2_math_1.b2Vec2.Cross(rB, P);
            }
            this.m_positions[indexA].c.Copy(cA);
            this.m_positions[indexA].a = aA;
            this.m_positions[indexB].c.Copy(cB);
            this.m_positions[indexB].a = aB;
        }
        // We can't expect minSpeparation >= -b2_linearSlop because we don't
        // push the separation above -b2_linearSlop.
        return minSeparation >= -3 * b2_common_1.b2_linearSlop;
    }
    SolveTOIPositionConstraints(toiIndexA, toiIndexB) {
        const xfA = b2ContactSolver.SolveTOIPositionConstraints_s_xfA;
        const xfB = b2ContactSolver.SolveTOIPositionConstraints_s_xfB;
        const psm = b2ContactSolver.SolveTOIPositionConstraints_s_psm;
        const rA = b2ContactSolver.SolveTOIPositionConstraints_s_rA;
        const rB = b2ContactSolver.SolveTOIPositionConstraints_s_rB;
        const P = b2ContactSolver.SolveTOIPositionConstraints_s_P;
        let minSeparation = 0;
        for (let i = 0; i < this.m_count; ++i) {
            const pc = this.m_positionConstraints[i];
            const { indexA, indexB, localCenterA, localCenterB, pointCount } = pc;
            let mA = 0;
            let iA = 0;
            if (indexA === toiIndexA || indexA === toiIndexB) {
                mA = pc.invMassA;
                iA = pc.invIA;
            }
            let mB = 0;
            let iB = 0;
            if (indexB === toiIndexA || indexB === toiIndexB) {
                mB = pc.invMassB;
                iB = pc.invIB;
            }
            const cA = this.m_positions[indexA].c;
            let aA = this.m_positions[indexA].a;
            const cB = this.m_positions[indexB].c;
            let aB = this.m_positions[indexB].a;
            // Solve normal constraints
            for (let j = 0; j < pointCount; ++j) {
                xfA.q.Set(aA);
                xfB.q.Set(aB);
                b2_math_1.b2Vec2.Subtract(cA, b2_math_1.b2Rot.MultiplyVec2(xfA.q, localCenterA, b2_math_1.b2Vec2.s_t0), xfA.p);
                b2_math_1.b2Vec2.Subtract(cB, b2_math_1.b2Rot.MultiplyVec2(xfB.q, localCenterB, b2_math_1.b2Vec2.s_t0), xfB.p);
                psm.Initialize(pc, xfA, xfB, j);
                const { normal, point, separation } = psm;
                b2_math_1.b2Vec2.Subtract(point, cA, rA);
                b2_math_1.b2Vec2.Subtract(point, cB, rB);
                // Track max constraint error.
                minSeparation = Math.min(minSeparation, separation);
                // Prevent large corrections and allow slop.
                const C = (0, b2_math_1.b2Clamp)(b2_common_1.b2_toiBaumgarte * (separation + b2_common_1.b2_linearSlop), -b2_common_1.b2_maxLinearCorrection, 0);
                // Compute the effective mass.
                const rnA = b2_math_1.b2Vec2.Cross(rA, normal);
                const rnB = b2_math_1.b2Vec2.Cross(rB, normal);
                const K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                // Compute normal impulse
                const impulse = K > 0 ? -C / K : 0;
                b2_math_1.b2Vec2.Scale(impulse, normal, P);
                cA.SubtractScaled(mA, P);
                aA -= iA * b2_math_1.b2Vec2.Cross(rA, P);
                cB.AddScaled(mB, P);
                aB += iB * b2_math_1.b2Vec2.Cross(rB, P);
            }
            this.m_positions[indexA].a = aA;
            this.m_positions[indexB].a = aB;
        }
        // We can't expect minSpeparation >= -b2_linearSlop because we don't
        // push the separation above -b2_linearSlop.
        return minSeparation >= -1.5 * b2_common_1.b2_linearSlop;
    }
}
exports.b2ContactSolver = b2ContactSolver;
b2ContactSolver.InitializeVelocityConstraints_s_xfA = new b2_math_1.b2Transform();
b2ContactSolver.InitializeVelocityConstraints_s_xfB = new b2_math_1.b2Transform();
b2ContactSolver.InitializeVelocityConstraints_s_worldManifold = new b2_collision_1.b2WorldManifold();
b2ContactSolver.WarmStart_s_P = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_dv = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_dv1 = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_dv2 = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_P = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_a = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_b = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_x = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_d = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_P1 = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_P2 = new b2_math_1.b2Vec2();
b2ContactSolver.SolveVelocityConstraints_s_P1P2 = new b2_math_1.b2Vec2();
b2ContactSolver.SolvePositionConstraints_s_xfA = new b2_math_1.b2Transform();
b2ContactSolver.SolvePositionConstraints_s_xfB = new b2_math_1.b2Transform();
b2ContactSolver.SolvePositionConstraints_s_psm = new b2PositionSolverManifold();
b2ContactSolver.SolvePositionConstraints_s_rA = new b2_math_1.b2Vec2();
b2ContactSolver.SolvePositionConstraints_s_rB = new b2_math_1.b2Vec2();
b2ContactSolver.SolvePositionConstraints_s_P = new b2_math_1.b2Vec2();
b2ContactSolver.SolveTOIPositionConstraints_s_xfA = new b2_math_1.b2Transform();
b2ContactSolver.SolveTOIPositionConstraints_s_xfB = new b2_math_1.b2Transform();
b2ContactSolver.SolveTOIPositionConstraints_s_psm = new b2PositionSolverManifold();
b2ContactSolver.SolveTOIPositionConstraints_s_rA = new b2_math_1.b2Vec2();
b2ContactSolver.SolveTOIPositionConstraints_s_rB = new b2_math_1.b2Vec2();
b2ContactSolver.SolveTOIPositionConstraints_s_P = new b2_math_1.b2Vec2();


/***/ }),

/***/ "gIKh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2CircleContact = void 0;
const b2_collide_circle_1 = __webpack_require__("VFH1");
const b2_contact_1 = __webpack_require__("PzZv");
/** @internal */
class b2CircleContact extends b2_contact_1.b2Contact {
    Evaluate(manifold, xfA, xfB) {
        (0, b2_collide_circle_1.b2CollideCircles)(manifold, this.GetShapeA(), xfA, this.GetShapeB(), xfB);
    }
}
exports.b2CircleContact = b2CircleContact;


/***/ }),

/***/ "h2hE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2TestOverlap = exports.b2ClipSegmentToLine = exports.b2AABB = exports.b2RayCastOutput = exports.b2RayCastInput = exports.b2ClipVertex = exports.b2GetPointStates = exports.b2PointState = exports.b2WorldManifold = exports.b2Manifold = exports.b2ManifoldType = exports.b2ManifoldPoint = exports.b2ContactID = exports.b2ContactFeature = exports.b2ContactFeatureType = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// Structures and functions used for computing contact points, distance queries, and TOI queries.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_distance_1 = __webpack_require__("2fSU");
var b2ContactFeatureType;
(function (b2ContactFeatureType) {
    b2ContactFeatureType[b2ContactFeatureType["e_vertex"] = 0] = "e_vertex";
    b2ContactFeatureType[b2ContactFeatureType["e_face"] = 1] = "e_face";
})(b2ContactFeatureType = exports.b2ContactFeatureType || (exports.b2ContactFeatureType = {}));
/**
 * The features that intersect to form the contact point
 * This must be 4 bytes or less.
 */
class b2ContactFeature {
    constructor() {
        this.m_key = 0;
        this.m_key_invalid = false;
        /** Feature index on shapeA */
        this.m_indexA = 0;
        /** Feature index on shapeB */
        this.m_indexB = 0;
        /** The feature type on shapeA */
        this.m_typeA = b2ContactFeatureType.e_vertex;
        /** The feature type on shapeB */
        this.m_typeB = b2ContactFeatureType.e_vertex;
    }
    get key() {
        if (this.m_key_invalid) {
            this.m_key_invalid = false;
            this.m_key = this.m_indexA | (this.m_indexB << 8) | (this.m_typeA << 16) | (this.m_typeB << 24);
        }
        return this.m_key;
    }
    set key(value) {
        this.m_key = value;
        this.m_key_invalid = false;
        this.m_indexA = this.m_key & 0xff;
        this.m_indexB = (this.m_key >> 8) & 0xff;
        this.m_typeA = (this.m_key >> 16) & 0xff;
        this.m_typeB = (this.m_key >> 24) & 0xff;
    }
    get indexA() {
        return this.m_indexA;
    }
    set indexA(value) {
        this.m_indexA = value;
        this.m_key_invalid = true;
    }
    get indexB() {
        return this.m_indexB;
    }
    set indexB(value) {
        this.m_indexB = value;
        this.m_key_invalid = true;
    }
    get typeA() {
        return this.m_typeA;
    }
    set typeA(value) {
        this.m_typeA = value;
        this.m_key_invalid = true;
    }
    get typeB() {
        return this.m_typeB;
    }
    set typeB(value) {
        this.m_typeB = value;
        this.m_key_invalid = true;
    }
}
exports.b2ContactFeature = b2ContactFeature;
/**
 * Contact ids to facilitate warm starting.
 */
class b2ContactID {
    constructor() {
        this.cf = new b2ContactFeature();
    }
    Copy(o) {
        this.key = o.key;
        return this;
    }
    Clone() {
        return new b2ContactID().Copy(this);
    }
    get key() {
        return this.cf.key;
    }
    set key(value) {
        this.cf.key = value;
    }
}
exports.b2ContactID = b2ContactID;
/**
 * A manifold point is a contact point belonging to a contact
 * manifold. It holds details related to the geometry and dynamics
 * of the contact points.
 * The local point usage depends on the manifold type:
 * -e_circles: the local center of circleB
 * -e_faceA: the local center of cirlceB or the clip point of polygonB
 * -e_faceB: the clip point of polygonA
 * This structure is stored across time steps, so we keep it small.
 * Note: the impulses are used for internal caching and may not
 * provide reliable contact forces, especially for high speed collisions.
 */
class b2ManifoldPoint {
    constructor() {
        /** Usage depends on manifold type */
        this.localPoint = new b2_math_1.b2Vec2();
        /** The non-penetration impulse */
        this.normalImpulse = 0;
        /** The friction impulse */
        this.tangentImpulse = 0;
        /** Uniquely identifies a contact point between two shapes */
        this.id = new b2ContactID();
    }
    Reset() {
        this.localPoint.SetZero();
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.id.key = 0;
    }
    Copy(o) {
        this.localPoint.Copy(o.localPoint);
        this.normalImpulse = o.normalImpulse;
        this.tangentImpulse = o.tangentImpulse;
        this.id.Copy(o.id);
        return this;
    }
}
exports.b2ManifoldPoint = b2ManifoldPoint;
var b2ManifoldType;
(function (b2ManifoldType) {
    b2ManifoldType[b2ManifoldType["e_circles"] = 0] = "e_circles";
    b2ManifoldType[b2ManifoldType["e_faceA"] = 1] = "e_faceA";
    b2ManifoldType[b2ManifoldType["e_faceB"] = 2] = "e_faceB";
})(b2ManifoldType = exports.b2ManifoldType || (exports.b2ManifoldType = {}));
/**
 * A manifold for two touching convex shapes.
 * Box2d supports multiple types of contact:
 * - clip point versus plane with radius
 * - point versus point with radius (circles)
 * The local point usage depends on the manifold type:
 * -e_circles: the local center of circleA
 * -e_faceA: the center of faceA
 * -e_faceB: the center of faceB
 * Similarly the local normal usage:
 * -e_circles: not used
 * -e_faceA: the normal on polygonA
 * -e_faceB: the normal on polygonB
 * We store contacts in this way so that position correction can
 * account for movement, which is critical for continuous physics.
 * All contact scenarios must be expressed in one of these types.
 * This structure is stored across time steps, so we keep it small.
 */
class b2Manifold {
    constructor() {
        /** The points of contact */
        this.points = (0, b2_common_1.b2MakeArray)(b2_common_1.b2_maxManifoldPoints, b2ManifoldPoint);
        /** Not use for Type::e_points */
        this.localNormal = new b2_math_1.b2Vec2();
        /** Usage depends on manifold type */
        this.localPoint = new b2_math_1.b2Vec2();
        this.type = b2ManifoldType.e_circles;
        /** The number of manifold points */
        this.pointCount = 0;
    }
    Reset() {
        for (let i = 0; i < b2_common_1.b2_maxManifoldPoints; ++i) {
            // DEBUG: b2Assert(this.points[i] instanceof b2ManifoldPoint);
            this.points[i].Reset();
        }
        this.localNormal.SetZero();
        this.localPoint.SetZero();
        this.type = b2ManifoldType.e_circles;
        this.pointCount = 0;
    }
    Copy(o) {
        this.pointCount = o.pointCount;
        for (let i = 0; i < b2_common_1.b2_maxManifoldPoints; ++i) {
            // DEBUG: b2Assert(this.points[i] instanceof b2ManifoldPoint);
            this.points[i].Copy(o.points[i]);
        }
        this.localNormal.Copy(o.localNormal);
        this.localPoint.Copy(o.localPoint);
        this.type = o.type;
        return this;
    }
    Clone() {
        return new b2Manifold().Copy(this);
    }
}
exports.b2Manifold = b2Manifold;
/**
 * This is used to compute the current state of a contact manifold.
 */
class b2WorldManifold {
    constructor() {
        /** World vector pointing from A to B */
        this.normal = new b2_math_1.b2Vec2();
        /** World contact point (point of intersection) */
        this.points = (0, b2_common_1.b2MakeArray)(b2_common_1.b2_maxManifoldPoints, b2_math_1.b2Vec2);
        /** A negative value indicates overlap, in meters */
        this.separations = (0, b2_common_1.b2MakeNumberArray)(b2_common_1.b2_maxManifoldPoints);
    }
    Initialize(manifold, xfA, radiusA, xfB, radiusB) {
        if (manifold.pointCount === 0) {
            return;
        }
        switch (manifold.type) {
            case b2ManifoldType.e_circles: {
                this.normal.Set(1, 0);
                const pointA = b2_math_1.b2Transform.MultiplyVec2(xfA, manifold.localPoint, b2WorldManifold.Initialize_s_pointA);
                const pointB = b2_math_1.b2Transform.MultiplyVec2(xfB, manifold.points[0].localPoint, b2WorldManifold.Initialize_s_pointB);
                if (b2_math_1.b2Vec2.DistanceSquared(pointA, pointB) > b2_common_1.b2_epsilon_sq) {
                    b2_math_1.b2Vec2.Subtract(pointB, pointA, this.normal).Normalize();
                }
                const cA = b2_math_1.b2Vec2.AddScaled(pointA, radiusA, this.normal, b2WorldManifold.Initialize_s_cA);
                const cB = b2_math_1.b2Vec2.SubtractScaled(pointB, radiusB, this.normal, b2WorldManifold.Initialize_s_cB);
                b2_math_1.b2Vec2.Mid(cA, cB, this.points[0]);
                this.separations[0] = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(cB, cA, b2_math_1.b2Vec2.s_t0), this.normal);
                break;
            }
            case b2ManifoldType.e_faceA: {
                b2_math_1.b2Rot.MultiplyVec2(xfA.q, manifold.localNormal, this.normal);
                const planePoint = b2_math_1.b2Transform.MultiplyVec2(xfA, manifold.localPoint, b2WorldManifold.Initialize_s_planePoint);
                for (let i = 0; i < manifold.pointCount; ++i) {
                    const clipPoint = b2_math_1.b2Transform.MultiplyVec2(xfB, manifold.points[i].localPoint, b2WorldManifold.Initialize_s_clipPoint);
                    const s = radiusA - b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(clipPoint, planePoint, b2_math_1.b2Vec2.s_t0), this.normal);
                    const cA = b2_math_1.b2Vec2.AddScaled(clipPoint, s, this.normal, b2WorldManifold.Initialize_s_cA);
                    const cB = b2_math_1.b2Vec2.SubtractScaled(clipPoint, radiusB, this.normal, b2WorldManifold.Initialize_s_cB);
                    b2_math_1.b2Vec2.Mid(cA, cB, this.points[i]);
                    this.separations[i] = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(cB, cA, b2_math_1.b2Vec2.s_t0), this.normal);
                }
                break;
            }
            case b2ManifoldType.e_faceB: {
                b2_math_1.b2Rot.MultiplyVec2(xfB.q, manifold.localNormal, this.normal);
                const planePoint = b2_math_1.b2Transform.MultiplyVec2(xfB, manifold.localPoint, b2WorldManifold.Initialize_s_planePoint);
                for (let i = 0; i < manifold.pointCount; ++i) {
                    const clipPoint = b2_math_1.b2Transform.MultiplyVec2(xfA, manifold.points[i].localPoint, b2WorldManifold.Initialize_s_clipPoint);
                    const s = radiusB - b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(clipPoint, planePoint, b2_math_1.b2Vec2.s_t0), this.normal);
                    const cB = b2_math_1.b2Vec2.AddScaled(clipPoint, s, this.normal, b2WorldManifold.Initialize_s_cB);
                    const cA = b2_math_1.b2Vec2.SubtractScaled(clipPoint, radiusA, this.normal, b2WorldManifold.Initialize_s_cA);
                    b2_math_1.b2Vec2.Mid(cA, cB, this.points[i]);
                    this.separations[i] = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(cA, cB, b2_math_1.b2Vec2.s_t0), this.normal);
                }
                // Ensure normal points from A to B.
                this.normal.Negate();
                break;
            }
        }
    }
}
exports.b2WorldManifold = b2WorldManifold;
b2WorldManifold.Initialize_s_pointA = new b2_math_1.b2Vec2();
b2WorldManifold.Initialize_s_pointB = new b2_math_1.b2Vec2();
b2WorldManifold.Initialize_s_cA = new b2_math_1.b2Vec2();
b2WorldManifold.Initialize_s_cB = new b2_math_1.b2Vec2();
b2WorldManifold.Initialize_s_planePoint = new b2_math_1.b2Vec2();
b2WorldManifold.Initialize_s_clipPoint = new b2_math_1.b2Vec2();
/**
 * This is used for determining the state of contact points.
 */
var b2PointState;
(function (b2PointState) {
    /** Point does not exist */
    b2PointState[b2PointState["b2_nullState"] = 0] = "b2_nullState";
    /** Point was added in the update */
    b2PointState[b2PointState["b2_addState"] = 1] = "b2_addState";
    /** Point persisted across the update */
    b2PointState[b2PointState["b2_persistState"] = 2] = "b2_persistState";
    /** Point was removed in the update */
    b2PointState[b2PointState["b2_removeState"] = 3] = "b2_removeState";
})(b2PointState = exports.b2PointState || (exports.b2PointState = {}));
/**
 * Compute the point states given two manifolds. The states pertain to the transition from manifold1
 * to manifold2. So state1 is either persist or remove while state2 is either add or persist.
 */
function b2GetPointStates(state1, state2, manifold1, manifold2) {
    // Detect persists and removes.
    let i;
    for (i = 0; i < manifold1.pointCount; ++i) {
        const { key } = manifold1.points[i].id;
        state1[i] = b2PointState.b2_removeState;
        for (let j = 0; j < manifold2.pointCount; ++j) {
            if (manifold2.points[j].id.key === key) {
                state1[i] = b2PointState.b2_persistState;
                break;
            }
        }
    }
    for (; i < b2_common_1.b2_maxManifoldPoints; ++i) {
        state1[i] = b2PointState.b2_nullState;
    }
    // Detect persists and adds.
    for (i = 0; i < manifold2.pointCount; ++i) {
        const { key } = manifold2.points[i].id;
        state2[i] = b2PointState.b2_addState;
        for (let j = 0; j < manifold1.pointCount; ++j) {
            if (manifold1.points[j].id.key === key) {
                state2[i] = b2PointState.b2_persistState;
                break;
            }
        }
    }
    for (; i < b2_common_1.b2_maxManifoldPoints; ++i) {
        state2[i] = b2PointState.b2_nullState;
    }
}
exports.b2GetPointStates = b2GetPointStates;
/**
 * Used for computing contact manifolds.
 */
class b2ClipVertex {
    constructor() {
        this.v = new b2_math_1.b2Vec2();
        this.id = new b2ContactID();
    }
    Copy(other) {
        this.v.Copy(other.v);
        this.id.Copy(other.id);
        return this;
    }
}
exports.b2ClipVertex = b2ClipVertex;
/**
 * Ray-cast input data. The ray extends from p1 to p1 + maxFraction * (p2 - p1).
 */
class b2RayCastInput {
    constructor() {
        this.p1 = new b2_math_1.b2Vec2();
        this.p2 = new b2_math_1.b2Vec2();
        this.maxFraction = 1;
    }
    Copy(o) {
        this.p1.Copy(o.p1);
        this.p2.Copy(o.p2);
        this.maxFraction = o.maxFraction;
        return this;
    }
}
exports.b2RayCastInput = b2RayCastInput;
/**
 * Ray-cast output data. The ray hits at p1 + fraction * (p2 - p1), where p1 and p2
 * come from b2RayCastInput.
 */
class b2RayCastOutput {
    constructor() {
        this.normal = new b2_math_1.b2Vec2();
        this.fraction = 0;
    }
    Copy(o) {
        this.normal.Copy(o.normal);
        this.fraction = o.fraction;
        return this;
    }
}
exports.b2RayCastOutput = b2RayCastOutput;
/**
 * An axis aligned bounding box.
 */
class b2AABB {
    constructor() {
        /** The lower vertex */
        this.lowerBound = new b2_math_1.b2Vec2();
        /** The upper vertex */
        this.upperBound = new b2_math_1.b2Vec2();
    }
    Copy(o) {
        this.lowerBound.Copy(o.lowerBound);
        this.upperBound.Copy(o.upperBound);
        return this;
    }
    /**
     * Verify that the bounds are sorted.
     */
    IsValid() {
        return (this.lowerBound.IsValid() &&
            this.upperBound.IsValid() &&
            this.upperBound.x >= this.lowerBound.x &&
            this.upperBound.y >= this.lowerBound.y);
    }
    /**
     * Get the center of the AABB.
     */
    GetCenter(out) {
        return b2_math_1.b2Vec2.Mid(this.lowerBound, this.upperBound, out);
    }
    /**
     * Get the extents of the AABB (half-widths).
     */
    GetExtents(out) {
        return b2_math_1.b2Vec2.Extents(this.lowerBound, this.upperBound, out);
    }
    /**
     * Get the perimeter length
     */
    GetPerimeter() {
        const wx = this.upperBound.x - this.lowerBound.x;
        const wy = this.upperBound.y - this.lowerBound.y;
        return 2 * (wx + wy);
    }
    /**
     * Combine an AABB into this one.
     */
    Combine1(aabb) {
        this.lowerBound.x = Math.min(this.lowerBound.x, aabb.lowerBound.x);
        this.lowerBound.y = Math.min(this.lowerBound.y, aabb.lowerBound.y);
        this.upperBound.x = Math.max(this.upperBound.x, aabb.upperBound.x);
        this.upperBound.y = Math.max(this.upperBound.y, aabb.upperBound.y);
        return this;
    }
    /**
     * Combine two AABBs into this one.
     */
    Combine2(aabb1, aabb2) {
        this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
        this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
        this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
        this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y);
        return this;
    }
    static Combine(aabb1, aabb2, out) {
        out.Combine2(aabb1, aabb2);
        return out;
    }
    /**
     * Does this aabb contain the provided AABB.
     */
    Contains(aabb) {
        return (this.lowerBound.x <= aabb.lowerBound.x &&
            this.lowerBound.y <= aabb.lowerBound.y &&
            aabb.upperBound.x <= this.upperBound.x &&
            aabb.upperBound.y <= this.upperBound.y);
    }
    // From Real-time Collision Detection, p179.
    RayCast(output, input) {
        let tmin = -b2_common_1.b2_maxFloat;
        let tmax = b2_common_1.b2_maxFloat;
        const p_x = input.p1.x;
        const p_y = input.p1.y;
        const d_x = input.p2.x - input.p1.x;
        const d_y = input.p2.y - input.p1.y;
        const absD_x = Math.abs(d_x);
        const absD_y = Math.abs(d_y);
        const { normal } = output;
        if (absD_x < b2_common_1.b2_epsilon) {
            // Parallel.
            if (p_x < this.lowerBound.x || this.upperBound.x < p_x) {
                return false;
            }
        }
        else {
            const inv_d = 1 / d_x;
            let t1 = (this.lowerBound.x - p_x) * inv_d;
            let t2 = (this.upperBound.x - p_x) * inv_d;
            // Sign of the normal vector.
            let s = -1;
            if (t1 > t2) {
                const t3 = t1;
                t1 = t2;
                t2 = t3;
                s = 1;
            }
            // Push the min up
            if (t1 > tmin) {
                normal.x = s;
                normal.y = 0;
                tmin = t1;
            }
            // Pull the max down
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) {
                return false;
            }
        }
        if (absD_y < b2_common_1.b2_epsilon) {
            // Parallel.
            if (p_y < this.lowerBound.y || this.upperBound.y < p_y) {
                return false;
            }
        }
        else {
            const inv_d = 1 / d_y;
            let t1 = (this.lowerBound.y - p_y) * inv_d;
            let t2 = (this.upperBound.y - p_y) * inv_d;
            // Sign of the normal vector.
            let s = -1;
            if (t1 > t2) {
                const t3 = t1;
                t1 = t2;
                t2 = t3;
                s = 1;
            }
            // Push the min up
            if (t1 > tmin) {
                normal.x = 0;
                normal.y = s;
                tmin = t1;
            }
            // Pull the max down
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) {
                return false;
            }
        }
        // Does the ray start inside the box?
        // Does the ray intersect beyond the max fraction?
        if (tmin < 0 || input.maxFraction < tmin) {
            return false;
        }
        // Intersection.
        output.fraction = tmin;
        return true;
    }
    TestContain(point) {
        if (point.x < this.lowerBound.x || this.upperBound.x < point.x) {
            return false;
        }
        if (point.y < this.lowerBound.y || this.upperBound.y < point.y) {
            return false;
        }
        return true;
    }
    TestOverlap(other) {
        if (this.upperBound.x < other.lowerBound.x) {
            return false;
        }
        if (this.upperBound.y < other.lowerBound.y) {
            return false;
        }
        if (other.upperBound.x < this.lowerBound.x) {
            return false;
        }
        if (other.upperBound.y < this.lowerBound.y) {
            return false;
        }
        return true;
    }
}
exports.b2AABB = b2AABB;
/**
 * Clipping for contact manifolds.
 */
function b2ClipSegmentToLine(vOut, [vIn0, vIn1], normal, offset, vertexIndexA) {
    // Start with no output points
    let count = 0;
    // Calculate the distance of end points to the line
    const distance0 = b2_math_1.b2Vec2.Dot(normal, vIn0.v) - offset;
    const distance1 = b2_math_1.b2Vec2.Dot(normal, vIn1.v) - offset;
    // If the points are behind the plane
    if (distance0 <= 0)
        vOut[count++].Copy(vIn0);
    if (distance1 <= 0)
        vOut[count++].Copy(vIn1);
    // If the points are on different sides of the plane
    if (distance0 * distance1 < 0) {
        // Find intersection point of edge and plane
        const interp = distance0 / (distance0 - distance1);
        const { v, id } = vOut[count];
        v.x = vIn0.v.x + interp * (vIn1.v.x - vIn0.v.x);
        v.y = vIn0.v.y + interp * (vIn1.v.y - vIn0.v.y);
        // VertexA is hitting edgeB.
        id.cf.indexA = vertexIndexA;
        id.cf.indexB = vIn0.id.cf.indexB;
        id.cf.typeA = b2ContactFeatureType.e_vertex;
        id.cf.typeB = b2ContactFeatureType.e_face;
        ++count;
        // b2Assert(count === 2);
    }
    return count;
}
exports.b2ClipSegmentToLine = b2ClipSegmentToLine;
const b2TestOverlap_s_input = new b2_distance_1.b2DistanceInput();
const b2TestOverlap_s_simplexCache = new b2_distance_1.b2SimplexCache();
const b2TestOverlap_s_output = new b2_distance_1.b2DistanceOutput();
/**
 * Determine if two generic shapes overlap.
 */
function b2TestOverlap(shapeA, indexA, shapeB, indexB, xfA, xfB) {
    const input = b2TestOverlap_s_input.Reset();
    input.proxyA.SetShape(shapeA, indexA);
    input.proxyB.SetShape(shapeB, indexB);
    input.transformA.Copy(xfA);
    input.transformB.Copy(xfB);
    input.useRadii = true;
    const simplexCache = b2TestOverlap_s_simplexCache.Reset();
    simplexCache.count = 0;
    const output = b2TestOverlap_s_output.Reset();
    (0, b2_distance_1.b2Distance)(output, simplexCache, input);
    return output.distance < 10 * b2_common_1.b2_epsilon;
}
exports.b2TestOverlap = b2TestOverlap;


/***/ }),

/***/ "iY3A":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2CircleShape = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_shape_1 = __webpack_require__("UjSx");
/**
 * A solid circle shape
 */
class b2CircleShape extends b2_shape_1.b2Shape {
    constructor(radius = 0) {
        super(b2_shape_1.b2ShapeType.e_circle, radius);
        /** Position */
        this.m_p = new b2_math_1.b2Vec2();
    }
    Set(position, radius = this.m_radius) {
        this.m_p.Copy(position);
        this.m_radius = radius;
        return this;
    }
    /**
     * Implement b2Shape.
     */
    Clone() {
        return new b2CircleShape().Copy(this);
    }
    Copy(other) {
        super.Copy(other);
        // DEBUG: b2Assert(other instanceof b2CircleShape);
        this.m_p.Copy(other.m_p);
        return this;
    }
    /**
     * @see b2Shape::GetChildCount
     */
    GetChildCount() {
        return 1;
    }
    /**
     * Implement b2Shape.
     */
    TestPoint(transform, p) {
        const center = b2_math_1.b2Transform.MultiplyVec2(transform, this.m_p, b2CircleShape.TestPoint_s_center);
        const d = b2_math_1.b2Vec2.Subtract(p, center, b2CircleShape.TestPoint_s_d);
        return b2_math_1.b2Vec2.Dot(d, d) <= this.m_radius ** 2;
    }
    /**
     * Implement b2Shape.
     *
     * @note because the circle is solid, rays that start inside do not hit because the normal is
     * not defined. Collision Detection in Interactive 3D Environments by Gino van den Bergen
     * From Section 3.1.2
     * x = s + a * r
     * norm(x) = radius
     */
    RayCast(output, input, transform, _childIndex) {
        const position = b2_math_1.b2Transform.MultiplyVec2(transform, this.m_p, b2CircleShape.RayCast_s_position);
        const s = b2_math_1.b2Vec2.Subtract(input.p1, position, b2CircleShape.RayCast_s_s);
        const b = b2_math_1.b2Vec2.Dot(s, s) - this.m_radius ** 2;
        // Solve quadratic equation.
        const r = b2_math_1.b2Vec2.Subtract(input.p2, input.p1, b2CircleShape.RayCast_s_r);
        const c = b2_math_1.b2Vec2.Dot(s, r);
        const rr = b2_math_1.b2Vec2.Dot(r, r);
        const sigma = c * c - rr * b;
        // Check for negative discriminant and short segment.
        if (sigma < 0 || rr < b2_common_1.b2_epsilon) {
            return false;
        }
        // Find the point of intersection of the line with the circle.
        let a = -(c + Math.sqrt(sigma));
        // Is the intersection point on the segment?
        if (a >= 0 && a <= input.maxFraction * rr) {
            a /= rr;
            output.fraction = a;
            b2_math_1.b2Vec2.AddScaled(s, a, r, output.normal).Normalize();
            return true;
        }
        return false;
    }
    /**
     * @see b2Shape::ComputeAABB
     */
    ComputeAABB(aabb, transform, _childIndex) {
        const p = b2_math_1.b2Transform.MultiplyVec2(transform, this.m_p, b2CircleShape.ComputeAABB_s_p);
        aabb.lowerBound.Set(p.x - this.m_radius, p.y - this.m_radius);
        aabb.upperBound.Set(p.x + this.m_radius, p.y + this.m_radius);
    }
    /**
     * @see b2Shape::ComputeMass
     */
    ComputeMass(massData, density) {
        const radius_sq = this.m_radius ** 2;
        massData.mass = density * Math.PI * radius_sq;
        massData.center.Copy(this.m_p);
        // inertia about the local origin
        massData.I = massData.mass * (0.5 * radius_sq + b2_math_1.b2Vec2.Dot(this.m_p, this.m_p));
    }
    SetupDistanceProxy(proxy, _index) {
        proxy.m_vertices = proxy.m_buffer;
        proxy.m_vertices[0].Copy(this.m_p);
        proxy.m_count = 1;
        proxy.m_radius = this.m_radius;
    }
    Draw(draw, color) {
        const center = this.m_p;
        const radius = this.m_radius;
        const axis = b2_math_1.b2Vec2.UNITX;
        draw.DrawSolidCircle(center, radius, axis, color);
    }
}
exports.b2CircleShape = b2CircleShape;
b2CircleShape.TestPoint_s_center = new b2_math_1.b2Vec2();
b2CircleShape.TestPoint_s_d = new b2_math_1.b2Vec2();
b2CircleShape.RayCast_s_position = new b2_math_1.b2Vec2();
b2CircleShape.RayCast_s_s = new b2_math_1.b2Vec2();
b2CircleShape.RayCast_s_r = new b2_math_1.b2Vec2();
b2CircleShape.ComputeAABB_s_p = new b2_math_1.b2Vec2();


/***/ }),

/***/ "jSyf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2World = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_timer_1 = __webpack_require__("783U");
const b2_collision_1 = __webpack_require__("h2hE");
const b2_time_of_impact_1 = __webpack_require__("KFpu");
const b2_joint_1 = __webpack_require__("qywJ");
const b2_area_joint_1 = __webpack_require__("pLoN");
const b2_distance_joint_1 = __webpack_require__("8OaJ");
const b2_friction_joint_1 = __webpack_require__("1cpr");
const b2_gear_joint_1 = __webpack_require__("mQGX");
const b2_motor_joint_1 = __webpack_require__("wYcr");
const b2_mouse_joint_1 = __webpack_require__("rJoQ");
const b2_prismatic_joint_1 = __webpack_require__("8mly");
const b2_pulley_joint_1 = __webpack_require__("raB0");
const b2_revolute_joint_1 = __webpack_require__("rwQ+");
const b2_weld_joint_1 = __webpack_require__("oIQG");
const b2_wheel_joint_1 = __webpack_require__("u8fK");
const b2_body_1 = __webpack_require__("4xZg");
const b2_contact_manager_1 = __webpack_require__("O7Yf");
const b2_island_1 = __webpack_require__("5Pwz");
const b2_time_step_1 = __webpack_require__("Nx71");
/**
 * The world class manages all physics entities, dynamic simulation,
 * and asynchronous queries. The world also contains efficient memory
 * management facilities.
 */
class b2World {
    constructor(gravity) {
        /** @internal */
        this.m_contactManager = new b2_contact_manager_1.b2ContactManager();
        this.m_bodyList = null;
        this.m_jointList = null;
        this.m_bodyCount = 0;
        this.m_jointCount = 0;
        this.m_gravity = new b2_math_1.b2Vec2();
        this.m_allowSleep = true;
        this.m_destructionListener = null;
        /**
         * This is used to compute the time step ratio to
         * support a variable time step.
         */
        this.m_inv_dt0 = 0;
        /** @internal */
        this.m_newContacts = false;
        this.m_locked = false;
        this.m_clearForces = true;
        // These are for debugging the solver.
        this.m_warmStarting = true;
        this.m_continuousPhysics = true;
        this.m_subStepping = false;
        this.m_stepComplete = true;
        this.m_profile = new b2_time_step_1.b2Profile();
        this.m_island = new b2_island_1.b2Island(2 * b2_common_1.b2_maxTOIContacts, b2_common_1.b2_maxTOIContacts, 0, this.m_contactManager.m_contactListener);
        this.s_stack = [];
        this.m_gravity.Copy(gravity);
    }
    /**
     * Construct a world object.
     *
     * @param gravity The world gravity vector.
     */
    static Create(gravity) {
        return new b2World(gravity);
    }
    /**
     * Register a destruction listener. The listener is owned by you and must
     * remain in scope.
     */
    SetDestructionListener(listener) {
        this.m_destructionListener = listener;
    }
    /**
     * Get the current destruction listener
     */
    GetDestructionListener() {
        return this.m_destructionListener;
    }
    /**
     * Register a contact filter to provide specific control over collision.
     * Otherwise the default filter is used (b2_defaultFilter). The listener is
     * owned by you and must remain in scope.
     */
    SetContactFilter(filter) {
        this.m_contactManager.m_contactFilter = filter;
    }
    /**
     * Register a contact event listener. The listener is owned by you and must
     * remain in scope.
     */
    SetContactListener(listener) {
        this.m_contactManager.m_contactListener = listener;
        this.m_island.m_listener = listener;
    }
    /**
     * Create a rigid body given a definition. No reference to the definition
     * is retained.
     *
     * @warning This function is locked during callbacks.
     */
    CreateBody(def = {}) {
        (0, b2_common_1.b2Assert)(!this.IsLocked());
        const b = new b2_body_1.b2Body(def, this);
        // Add to world doubly linked list.
        b.m_prev = null;
        b.m_next = this.m_bodyList;
        if (this.m_bodyList) {
            this.m_bodyList.m_prev = b;
        }
        this.m_bodyList = b;
        ++this.m_bodyCount;
        return b;
    }
    /**
     * Destroy a rigid body given a definition. No reference to the definition
     * is retained. This function is locked during callbacks.
     *
     * @warning This automatically deletes all associated shapes and joints.
     * @warning This function is locked during callbacks.
     */
    DestroyBody(b) {
        var _a, _b;
        // DEBUG: b2Assert(this.m_bodyCount > 0);
        (0, b2_common_1.b2Assert)(!this.IsLocked());
        // Delete the attached joints.
        let je = b.m_jointList;
        while (je) {
            const je0 = je;
            je = je.next;
            (_a = this.m_destructionListener) === null || _a === void 0 ? void 0 : _a.SayGoodbyeJoint(je0.joint);
            this.DestroyJoint(je0.joint);
            b.m_jointList = je;
        }
        b.m_jointList = null;
        // Delete the attached contacts.
        let ce = b.m_contactList;
        while (ce) {
            const ce0 = ce;
            ce = ce.next;
            this.m_contactManager.Destroy(ce0.contact);
        }
        b.m_contactList = null;
        // Delete the attached fixtures. This destroys broad-phase proxies.
        const broadPhase = this.m_contactManager.m_broadPhase;
        let f = b.m_fixtureList;
        while (f) {
            const f0 = f;
            f = f.m_next;
            (_b = this.m_destructionListener) === null || _b === void 0 ? void 0 : _b.SayGoodbyeFixture(f0);
            f0.DestroyProxies(broadPhase);
            b.m_fixtureList = f;
            b.m_fixtureCount -= 1;
        }
        b.m_fixtureList = null;
        b.m_fixtureCount = 0;
        // Remove world body list.
        if (b.m_prev) {
            b.m_prev.m_next = b.m_next;
        }
        if (b.m_next) {
            b.m_next.m_prev = b.m_prev;
        }
        if (b === this.m_bodyList) {
            this.m_bodyList = b.m_next;
        }
        --this.m_bodyCount;
    }
    static Joint_Create(def) {
        switch (def.type) {
            case b2_joint_1.b2JointType.e_distanceJoint:
                return new b2_distance_joint_1.b2DistanceJoint(def);
            case b2_joint_1.b2JointType.e_mouseJoint:
                return new b2_mouse_joint_1.b2MouseJoint(def);
            case b2_joint_1.b2JointType.e_prismaticJoint:
                return new b2_prismatic_joint_1.b2PrismaticJoint(def);
            case b2_joint_1.b2JointType.e_revoluteJoint:
                return new b2_revolute_joint_1.b2RevoluteJoint(def);
            case b2_joint_1.b2JointType.e_pulleyJoint:
                return new b2_pulley_joint_1.b2PulleyJoint(def);
            case b2_joint_1.b2JointType.e_gearJoint:
                return new b2_gear_joint_1.b2GearJoint(def);
            case b2_joint_1.b2JointType.e_wheelJoint:
                return new b2_wheel_joint_1.b2WheelJoint(def);
            case b2_joint_1.b2JointType.e_weldJoint:
                return new b2_weld_joint_1.b2WeldJoint(def);
            case b2_joint_1.b2JointType.e_frictionJoint:
                return new b2_friction_joint_1.b2FrictionJoint(def);
            case b2_joint_1.b2JointType.e_motorJoint:
                return new b2_motor_joint_1.b2MotorJoint(def);
            case b2_joint_1.b2JointType.e_areaJoint:
                return new b2_area_joint_1.b2AreaJoint(def);
        }
        throw new Error();
    }
    CreateJoint(def) {
        (0, b2_common_1.b2Assert)(!this.IsLocked());
        const j = b2World.Joint_Create(def);
        // Connect to the world list.
        j.m_prev = null;
        j.m_next = this.m_jointList;
        if (this.m_jointList) {
            this.m_jointList.m_prev = j;
        }
        this.m_jointList = j;
        ++this.m_jointCount;
        // Connect to the bodies' doubly linked lists.
        j.m_edgeA.prev = null;
        j.m_edgeA.next = j.m_bodyA.m_jointList;
        if (j.m_bodyA.m_jointList)
            j.m_bodyA.m_jointList.prev = j.m_edgeA;
        j.m_bodyA.m_jointList = j.m_edgeA;
        j.m_edgeB.prev = null;
        j.m_edgeB.next = j.m_bodyB.m_jointList;
        if (j.m_bodyB.m_jointList)
            j.m_bodyB.m_jointList.prev = j.m_edgeB;
        j.m_bodyB.m_jointList = j.m_edgeB;
        const bodyA = j.m_bodyA;
        const bodyB = j.m_bodyB;
        // If the joint prevents collisions, then flag any contacts for filtering.
        if (!def.collideConnected) {
            let edge = bodyB.GetContactList();
            while (edge) {
                if (edge.other === bodyA) {
                    // Flag the contact for filtering at the next time step (where either
                    // body is awake).
                    edge.contact.FlagForFiltering();
                }
                edge = edge.next;
            }
        }
        // Note: creating a joint doesn't wake the bodies.
        return j;
    }
    /**
     * Destroy a joint. This may cause the connected bodies to begin colliding.
     *
     * @warning This function is locked during callbacks.
     */
    DestroyJoint(j) {
        (0, b2_common_1.b2Assert)(!this.IsLocked());
        // Remove from the doubly linked list.
        if (j.m_prev) {
            j.m_prev.m_next = j.m_next;
        }
        if (j.m_next) {
            j.m_next.m_prev = j.m_prev;
        }
        if (j === this.m_jointList) {
            this.m_jointList = j.m_next;
        }
        // Disconnect from island graph.
        const bodyA = j.m_bodyA;
        const bodyB = j.m_bodyB;
        const collideConnected = j.m_collideConnected;
        // Wake up connected bodies.
        bodyA.SetAwake(true);
        bodyB.SetAwake(true);
        // Remove from body 1.
        if (j.m_edgeA.prev) {
            j.m_edgeA.prev.next = j.m_edgeA.next;
        }
        if (j.m_edgeA.next) {
            j.m_edgeA.next.prev = j.m_edgeA.prev;
        }
        if (j.m_edgeA === bodyA.m_jointList) {
            bodyA.m_jointList = j.m_edgeA.next;
        }
        j.m_edgeA.prev = null;
        j.m_edgeA.next = null;
        // Remove from body 2
        if (j.m_edgeB.prev) {
            j.m_edgeB.prev.next = j.m_edgeB.next;
        }
        if (j.m_edgeB.next) {
            j.m_edgeB.next.prev = j.m_edgeB.prev;
        }
        if (j.m_edgeB === bodyB.m_jointList) {
            bodyB.m_jointList = j.m_edgeB.next;
        }
        j.m_edgeB.prev = null;
        j.m_edgeB.next = null;
        // DEBUG: b2Assert(this.m_jointCount > 0);
        --this.m_jointCount;
        // If the joint prevents collisions, then flag any contacts for filtering.
        if (!collideConnected) {
            let edge = bodyB.GetContactList();
            while (edge) {
                if (edge.other === bodyA) {
                    // Flag the contact for filtering at the next time step (where either
                    // body is awake).
                    edge.contact.FlagForFiltering();
                }
                edge = edge.next;
            }
        }
    }
    Step(dt, iterations) {
        const stepTimer = b2World.Step_s_stepTimer.Reset();
        // If new fixtures were added, we need to find the new contacts.
        if (this.m_newContacts) {
            this.m_contactManager.FindNewContacts();
            this.m_newContacts = false;
        }
        this.m_locked = true;
        const step = b2World.Step_s_step;
        step.dt = dt;
        step.config = {
            ...iterations,
        };
        if (dt > 0) {
            step.inv_dt = 1 / dt;
        }
        else {
            step.inv_dt = 0;
        }
        step.dtRatio = this.m_inv_dt0 * dt;
        step.warmStarting = this.m_warmStarting;
        // Update contacts. This is where some contacts are destroyed.
        {
            const timer = b2World.Step_s_timer.Reset();
            this.m_contactManager.Collide();
            this.m_profile.collide = timer.GetMilliseconds();
        }
        // Integrate velocities, solve velocity constraints, and integrate positions.
        if (this.m_stepComplete && step.dt > 0) {
            const timer = b2World.Step_s_timer.Reset();
            this.Solve(step);
            this.m_profile.solve = timer.GetMilliseconds();
        }
        // Handle TOI events.
        if (this.m_continuousPhysics && step.dt > 0) {
            const timer = b2World.Step_s_timer.Reset();
            this.SolveTOI(step);
            this.m_profile.solveTOI = timer.GetMilliseconds();
        }
        if (step.dt > 0) {
            this.m_inv_dt0 = step.inv_dt;
        }
        if (this.m_clearForces) {
            this.ClearForces();
        }
        this.m_locked = false;
        this.m_profile.step = stepTimer.GetMilliseconds();
    }
    /**
     * Manually clear the force buffer on all bodies. By default, forces are cleared automatically
     * after each call to Step. The default behavior is modified by calling SetAutoClearForces.
     * The purpose of this function is to support sub-stepping. Sub-stepping is often used to maintain
     * a fixed sized time step under a variable frame-rate.
     * When you perform sub-stepping you will disable auto clearing of forces and instead call
     * ClearForces after all sub-steps are complete in one pass of your game loop.
     *
     * @see SetAutoClearForces
     */
    ClearForces() {
        for (let body = this.m_bodyList; body; body = body.GetNext()) {
            body.m_force.SetZero();
            body.m_torque = 0;
        }
    }
    /**
     * Query the world for all fixtures that potentially overlap the
     * provided AABB.
     *
     * @param aabb The query box.
     * @param callback A user implemented callback class or function.
     */
    QueryAABB(aabb, callback) {
        this.m_contactManager.m_broadPhase.Query(aabb, (proxy) => {
            const fixture_proxy = (0, b2_common_1.b2Verify)(proxy.userData);
            // DEBUG: b2Assert(fixture_proxy instanceof b2FixtureProxy);
            return callback(fixture_proxy.fixture);
        });
    }
    QueryAllAABB(aabb, out = []) {
        this.QueryAABB(aabb, (fixture) => {
            out.push(fixture);
            return true;
        });
        return out;
    }
    /**
     * Query the world for all fixtures that potentially overlap the
     * provided point.
     *
     * @param point The query point.
     * @param callback A user implemented callback class or function.
     */
    QueryPointAABB(point, callback) {
        this.m_contactManager.m_broadPhase.QueryPoint(point, (proxy) => {
            const fixture_proxy = (0, b2_common_1.b2Verify)(proxy.userData);
            // DEBUG: b2Assert(fixture_proxy instanceof b2FixtureProxy);
            return callback(fixture_proxy.fixture);
        });
    }
    QueryAllPointAABB(point, out = []) {
        this.QueryPointAABB(point, (fixture) => {
            out.push(fixture);
            return true;
        });
        return out;
    }
    QueryFixtureShape(shape, index, transform, callback) {
        const aabb = b2World.QueryFixtureShape_s_aabb;
        shape.ComputeAABB(aabb, transform, index);
        this.m_contactManager.m_broadPhase.Query(aabb, (proxy) => {
            const fixture_proxy = (0, b2_common_1.b2Verify)(proxy.userData);
            // DEBUG: b2Assert(fixture_proxy instanceof b2FixtureProxy);
            const { fixture } = fixture_proxy;
            const overlap = (0, b2_collision_1.b2TestOverlap)(shape, index, fixture.GetShape(), fixture_proxy.childIndex, transform, fixture.GetBody().GetTransform());
            return !overlap || callback(fixture);
        });
    }
    QueryAllFixtureShape(shape, index, transform, out = []) {
        this.QueryFixtureShape(shape, index, transform, (fixture) => {
            out.push(fixture);
            return true;
        });
        return out;
    }
    QueryFixturePoint(point, callback) {
        this.m_contactManager.m_broadPhase.QueryPoint(point, (proxy) => {
            const fixture_proxy = (0, b2_common_1.b2Verify)(proxy.userData);
            // DEBUG: b2Assert(fixture_proxy instanceof b2FixtureProxy);
            const { fixture } = fixture_proxy;
            const overlap = fixture.TestPoint(point);
            return !overlap || callback(fixture);
        });
    }
    QueryAllFixturePoint(point, out = []) {
        this.QueryFixturePoint(point, (fixture) => {
            out.push(fixture);
            return true;
        });
        return out;
    }
    /**
     * Ray-cast the world for all fixtures in the path of the ray. Your callback
     * controls whether you get the closest point, any point, or n-points.
     * The ray-cast ignores shapes that contain the starting point.
     *
     * @param point1 The ray starting point
     * @param point2 The ray ending point
     * @param callback A user implemented callback class or function.
     */
    RayCast(point1, point2, callback) {
        const input = b2World.RayCast_s_input;
        input.maxFraction = 1;
        input.p1.Copy(point1);
        input.p2.Copy(point2);
        this.m_contactManager.m_broadPhase.RayCast(input, (input2, proxy) => {
            const fixture_proxy = (0, b2_common_1.b2Verify)(proxy.userData);
            // DEBUG: b2Assert(fixture_proxy instanceof b2FixtureProxy);
            const { fixture } = fixture_proxy;
            const index = fixture_proxy.childIndex;
            const output = b2World.RayCast_s_output;
            const hit = fixture.RayCast(output, input2, index);
            if (hit) {
                const { fraction } = output;
                const point = b2World.RayCast_s_point;
                point.Set((1 - fraction) * point1.x + fraction * point2.x, (1 - fraction) * point1.y + fraction * point2.y);
                return callback(fixture, point, output.normal, fraction);
            }
            return input2.maxFraction;
        });
    }
    RayCastOne(point1, point2) {
        let result = null;
        let min_fraction = 1;
        this.RayCast(point1, point2, (fixture, _point, _normal, fraction) => {
            if (fraction < min_fraction) {
                min_fraction = fraction;
                result = fixture;
            }
            return min_fraction;
        });
        return result;
    }
    RayCastAll(point1, point2, out = []) {
        this.RayCast(point1, point2, (fixture) => {
            out.push(fixture);
            return 1;
        });
        return out;
    }
    /**
     * Get the world body list. With the returned body, use b2Body::GetNext to get
     * the next body in the world list. A NULL body indicates the end of the list.
     *
     * @returns The head of the world body list.
     */
    GetBodyList() {
        return this.m_bodyList;
    }
    /**
     * Get the world joint list. With the returned joint, use b2Joint::GetNext to get
     * the next joint in the world list. A NULL joint indicates the end of the list.
     *
     * @returns The head of the world joint list.
     */
    GetJointList() {
        return this.m_jointList;
    }
    /**
     * Get the world contact list. With the returned contact, use b2Contact::GetNext to get
     * the next contact in the world list. A NULL contact indicates the end of the list.
     *
     * @returns The head of the world contact list.
     * @warning contacts are created and destroyed in the middle of a time step.
     * Use b2ContactListener to avoid missing contacts.
     */
    GetContactList() {
        return this.m_contactManager.m_contactList;
    }
    /**
     * Enable/disable sleep.
     */
    SetAllowSleeping(flag) {
        if (flag === this.m_allowSleep) {
            return;
        }
        this.m_allowSleep = flag;
        if (!this.m_allowSleep) {
            for (let b = this.m_bodyList; b; b = b.m_next) {
                b.SetAwake(true);
            }
        }
    }
    GetAllowSleeping() {
        return this.m_allowSleep;
    }
    /**
     * Enable/disable warm starting. For testing.
     */
    SetWarmStarting(flag) {
        this.m_warmStarting = flag;
    }
    GetWarmStarting() {
        return this.m_warmStarting;
    }
    /**
     * Enable/disable continuous physics. For testing.
     */
    SetContinuousPhysics(flag) {
        this.m_continuousPhysics = flag;
    }
    GetContinuousPhysics() {
        return this.m_continuousPhysics;
    }
    /**
     * Enable/disable single stepped continuous physics. For testing.
     */
    SetSubStepping(flag) {
        this.m_subStepping = flag;
    }
    GetSubStepping() {
        return this.m_subStepping;
    }
    /**
     * Get the number of broad-phase proxies.
     */
    GetProxyCount() {
        return this.m_contactManager.m_broadPhase.GetProxyCount();
    }
    /**
     * Get the number of bodies.
     */
    GetBodyCount() {
        return this.m_bodyCount;
    }
    /**
     * Get the number of joints.
     */
    GetJointCount() {
        return this.m_jointCount;
    }
    /**
     * Get the number of contacts (each may have 0 or more contact points).
     */
    GetContactCount() {
        return this.m_contactManager.m_contactCount;
    }
    /**
     * Get the height of the dynamic tree.
     */
    GetTreeHeight() {
        return this.m_contactManager.m_broadPhase.GetTreeHeight();
    }
    /**
     * Get the balance of the dynamic tree.
     */
    GetTreeBalance() {
        return this.m_contactManager.m_broadPhase.GetTreeBalance();
    }
    /**
     * Get the quality metric of the dynamic tree. The smaller the better.
     * The minimum is 1.
     */
    GetTreeQuality() {
        return this.m_contactManager.m_broadPhase.GetTreeQuality();
    }
    /**
     * Change the global gravity vector.
     */
    SetGravity(gravity) {
        this.m_gravity.Copy(gravity);
    }
    /**
     * Get the global gravity vector.
     */
    GetGravity() {
        return this.m_gravity;
    }
    /**
     * Is the world locked (in the middle of a time step).
     */
    IsLocked() {
        return this.m_locked;
    }
    /**
     * Set flag to control automatic clearing of forces after each time step.
     */
    SetAutoClearForces(flag) {
        this.m_clearForces = flag;
    }
    /**
     * Get the flag that controls automatic clearing of forces after each time step.
     */
    GetAutoClearForces() {
        return this.m_clearForces;
    }
    /**
     * Shift the world origin. Useful for large worlds.
     * The body shift formula is: position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    ShiftOrigin(newOrigin) {
        (0, b2_common_1.b2Assert)(!this.IsLocked());
        for (let b = this.m_bodyList; b; b = b.m_next) {
            b.m_xf.p.Subtract(newOrigin);
            b.m_sweep.c0.Subtract(newOrigin);
            b.m_sweep.c.Subtract(newOrigin);
        }
        for (let j = this.m_jointList; j; j = j.m_next) {
            j.ShiftOrigin(newOrigin);
        }
        this.m_contactManager.m_broadPhase.ShiftOrigin(newOrigin);
    }
    /**
     * Get the contact manager for testing.
     */
    GetContactManager() {
        return this.m_contactManager;
    }
    /**
     * Get the current profile.
     */
    GetProfile() {
        return this.m_profile;
    }
    Solve(step) {
        this.m_profile.solveInit = 0;
        this.m_profile.solveVelocity = 0;
        this.m_profile.solvePosition = 0;
        // Size the island for the worst case.
        const island = this.m_island;
        island.Resize(this.m_bodyCount);
        island.Clear();
        // Clear all the island flags.
        for (let b = this.m_bodyList; b; b = b.m_next) {
            b.m_islandFlag = false;
        }
        for (let c = this.m_contactManager.m_contactList; c; c = c.m_next) {
            c.m_islandFlag = false;
        }
        for (let j = this.m_jointList; j; j = j.m_next) {
            j.m_islandFlag = false;
        }
        // Build and simulate all awake islands.
        // DEBUG: const stackSize = this.m_bodyCount;
        const stack = this.s_stack;
        for (let seed = this.m_bodyList; seed; seed = seed.m_next) {
            if (seed.m_islandFlag) {
                continue;
            }
            if (!seed.IsAwake() || !seed.IsEnabled()) {
                continue;
            }
            // The seed can be dynamic or kinematic.
            if (seed.GetType() === b2_body_1.b2BodyType.b2_staticBody) {
                continue;
            }
            // Reset island and stack.
            island.Clear();
            let stackCount = 0;
            stack[stackCount++] = seed;
            seed.m_islandFlag = true;
            // Perform a depth first search (DFS) on the constraint graph.
            while (stackCount > 0) {
                // Grab the next body off the stack and add it to the island.
                const b = stack[--stackCount];
                (0, b2_common_1.b2Assert)(b !== null);
                // DEBUG: b2Assert(b.IsEnabled());
                island.AddBody(b);
                // To keep islands as small as possible, we don't
                // propagate islands across static bodies.
                if (b.GetType() === b2_body_1.b2BodyType.b2_staticBody) {
                    continue;
                }
                // Make sure the body is awake (without resetting sleep timer).
                b.m_awakeFlag = true;
                // Search all contacts connected to this body.
                for (let ce = b.m_contactList; ce; ce = ce.next) {
                    const { contact } = ce;
                    // Has this contact already been added to an island?
                    if (contact.m_islandFlag) {
                        continue;
                    }
                    // Is this contact solid and touching?
                    if (!contact.IsEnabled() || !contact.IsTouching()) {
                        continue;
                    }
                    // Skip sensors.
                    const sensorA = contact.m_fixtureA.m_isSensor;
                    const sensorB = contact.m_fixtureB.m_isSensor;
                    if (sensorA || sensorB) {
                        continue;
                    }
                    island.AddContact(contact);
                    contact.m_islandFlag = true;
                    const { other } = ce;
                    // Was the other body already added to this island?
                    if (other.m_islandFlag) {
                        continue;
                    }
                    // DEBUG: b2Assert(stackCount < stackSize);
                    stack[stackCount++] = other;
                    other.m_islandFlag = true;
                }
                // Search all joints connect to this body.
                for (let je = b.m_jointList; je; je = je.next) {
                    if (je.joint.m_islandFlag) {
                        continue;
                    }
                    const { other } = je;
                    // Don't simulate joints connected to disabled bodies.
                    if (!other.IsEnabled()) {
                        continue;
                    }
                    island.AddJoint(je.joint);
                    je.joint.m_islandFlag = true;
                    if (other.m_islandFlag) {
                        continue;
                    }
                    // DEBUG: b2Assert(stackCount < stackSize);
                    stack[stackCount++] = other;
                    other.m_islandFlag = true;
                }
            }
            const profile = new b2_time_step_1.b2Profile();
            island.Solve(profile, step, this.m_gravity, this.m_allowSleep);
            this.m_profile.solveInit += profile.solveInit;
            this.m_profile.solveVelocity += profile.solveVelocity;
            this.m_profile.solvePosition += profile.solvePosition;
            // Post solve cleanup.
            for (let i = 0; i < island.m_bodyCount; ++i) {
                // Allow static bodies to participate in other islands.
                const b = island.m_bodies[i];
                if (b.GetType() === b2_body_1.b2BodyType.b2_staticBody) {
                    b.m_islandFlag = false;
                }
            }
        }
        for (let i = 0; i < stack.length; ++i) {
            if (!stack[i]) {
                break;
            }
            stack[i] = null;
        }
        const timer = new b2_timer_1.b2Timer();
        // Synchronize fixtures, check for out of range bodies.
        for (let b = this.m_bodyList; b; b = b.m_next) {
            // If a body was not in an island then it did not move.
            if (!b.m_islandFlag) {
                continue;
            }
            if (b.GetType() === b2_body_1.b2BodyType.b2_staticBody) {
                continue;
            }
            // Update fixtures (for broad-phase).
            b.SynchronizeFixtures();
        }
        // Look for new contacts.
        this.m_contactManager.FindNewContacts();
        this.m_profile.broadphase = timer.GetMilliseconds();
    }
    /** @internal */
    SolveTOI(step) {
        const island = this.m_island;
        island.Clear();
        if (this.m_stepComplete) {
            for (let b = this.m_bodyList; b; b = b.m_next) {
                b.m_islandFlag = false;
                b.m_sweep.alpha0 = 0;
            }
            for (let c = this.m_contactManager.m_contactList; c; c = c.m_next) {
                // Invalidate TOI
                c.m_toiFlag = false;
                c.m_islandFlag = false;
                c.m_toiCount = 0;
                c.m_toi = 1;
            }
        }
        // Find TOI events and solve them.
        for (;;) {
            // Find the first TOI.
            let minContact = null;
            let minAlpha = 1;
            for (let c = this.m_contactManager.m_contactList; c; c = c.m_next) {
                // Is this contact disabled?
                if (!c.IsEnabled()) {
                    continue;
                }
                // Prevent excessive sub-stepping.
                if (c.m_toiCount > b2_common_1.b2_maxSubSteps) {
                    continue;
                }
                let alpha = 1;
                if (c.m_toiFlag) {
                    // This contact has a valid cached TOI.
                    alpha = c.m_toi;
                }
                else {
                    const fA = c.GetFixtureA();
                    const fB = c.GetFixtureB();
                    // Is there a sensor?
                    if (fA.IsSensor() || fB.IsSensor()) {
                        continue;
                    }
                    const bA = fA.GetBody();
                    const bB = fB.GetBody();
                    const typeA = bA.m_type;
                    const typeB = bB.m_type;
                    // DEBUG: b2Assert(typeA === b2BodyType.b2_dynamicBody || typeB === b2BodyType.b2_dynamicBody);
                    const activeA = bA.IsAwake() && typeA !== b2_body_1.b2BodyType.b2_staticBody;
                    const activeB = bB.IsAwake() && typeB !== b2_body_1.b2BodyType.b2_staticBody;
                    // Is at least one body active (awake and dynamic or kinematic)?
                    if (!activeA && !activeB) {
                        continue;
                    }
                    const collideA = bA.IsBullet() || typeA !== b2_body_1.b2BodyType.b2_dynamicBody;
                    const collideB = bB.IsBullet() || typeB !== b2_body_1.b2BodyType.b2_dynamicBody;
                    // Are these two non-bullet dynamic bodies?
                    if (!collideA && !collideB) {
                        continue;
                    }
                    // Compute the TOI for this contact.
                    // Put the sweeps onto the same time interval.
                    let { alpha0 } = bA.m_sweep;
                    if (bA.m_sweep.alpha0 < bB.m_sweep.alpha0) {
                        alpha0 = bB.m_sweep.alpha0;
                        bA.m_sweep.Advance(alpha0);
                    }
                    else if (bB.m_sweep.alpha0 < bA.m_sweep.alpha0) {
                        alpha0 = bA.m_sweep.alpha0;
                        bB.m_sweep.Advance(alpha0);
                    }
                    // DEBUG: b2Assert(alpha0 < 1);
                    const indexA = c.GetChildIndexA();
                    const indexB = c.GetChildIndexB();
                    // Compute the time of impact in interval [0, minTOI]
                    const input = b2World.SolveTOI_s_toi_input;
                    input.proxyA.SetShape(fA.GetShape(), indexA);
                    input.proxyB.SetShape(fB.GetShape(), indexB);
                    input.sweepA.Copy(bA.m_sweep);
                    input.sweepB.Copy(bB.m_sweep);
                    input.tMax = 1;
                    const output = b2World.SolveTOI_s_toi_output;
                    (0, b2_time_of_impact_1.b2TimeOfImpact)(output, input);
                    // Beta is the fraction of the remaining portion of the .
                    const beta = output.t;
                    if (output.state === b2_time_of_impact_1.b2TOIOutputState.e_touching) {
                        alpha = Math.min(alpha0 + (1 - alpha0) * beta, 1);
                    }
                    else {
                        alpha = 1;
                    }
                    c.m_toi = alpha;
                    c.m_toiFlag = true;
                }
                if (alpha < minAlpha) {
                    // This is the minimum TOI found so far.
                    minContact = c;
                    minAlpha = alpha;
                }
            }
            if (minContact === null || 1 - 10 * b2_common_1.b2_epsilon < minAlpha) {
                // No more TOI events. Done!
                this.m_stepComplete = true;
                break;
            }
            // Advance the bodies to the TOI.
            const fA = minContact.GetFixtureA();
            const fB = minContact.GetFixtureB();
            const bA = fA.GetBody();
            const bB = fB.GetBody();
            const backup1 = b2World.SolveTOI_s_backup1.Copy(bA.m_sweep);
            const backup2 = b2World.SolveTOI_s_backup2.Copy(bB.m_sweep);
            bA.Advance(minAlpha);
            bB.Advance(minAlpha);
            // The TOI contact likely has some new contact points.
            minContact.Update(this.m_contactManager.m_contactListener);
            minContact.m_toiFlag = false;
            ++minContact.m_toiCount;
            // Is the contact solid?
            if (!minContact.IsEnabled() || !minContact.IsTouching()) {
                // Restore the sweeps.
                minContact.SetEnabled(false);
                bA.m_sweep.Copy(backup1);
                bB.m_sweep.Copy(backup2);
                bA.SynchronizeTransform();
                bB.SynchronizeTransform();
                continue;
            }
            bA.SetAwake(true);
            bB.SetAwake(true);
            // Build the island
            island.Clear();
            island.AddBody(bA);
            island.AddBody(bB);
            island.AddContact(minContact);
            bA.m_islandFlag = true;
            bB.m_islandFlag = true;
            minContact.m_islandFlag = true;
            // Get contacts on bodyA and bodyB.
            for (let i = 0; i < 2; ++i) {
                const body = i === 0 ? bA : bB;
                if (body.m_type === b2_body_1.b2BodyType.b2_dynamicBody) {
                    for (let ce = body.m_contactList; ce; ce = ce.next) {
                        if (island.m_bodyCount === island.m_bodyCapacity) {
                            break;
                        }
                        if (island.m_contactCount === b2_common_1.b2_maxTOIContacts) {
                            break;
                        }
                        const { contact } = ce;
                        // Has this contact already been added to the island?
                        if (contact.m_islandFlag) {
                            continue;
                        }
                        // Only add static, kinematic, or bullet bodies.
                        const { other } = ce;
                        if (other.m_type === b2_body_1.b2BodyType.b2_dynamicBody && !body.IsBullet() && !other.IsBullet()) {
                            continue;
                        }
                        // Skip sensors.
                        const sensorA = contact.m_fixtureA.m_isSensor;
                        const sensorB = contact.m_fixtureB.m_isSensor;
                        if (sensorA || sensorB) {
                            continue;
                        }
                        // Tentatively advance the body to the TOI.
                        const backup = b2World.SolveTOI_s_backup.Copy(other.m_sweep);
                        if (!other.m_islandFlag) {
                            other.Advance(minAlpha);
                        }
                        // Update the contact points
                        contact.Update(this.m_contactManager.m_contactListener);
                        // Was the contact disabled by the user?
                        if (!contact.IsEnabled()) {
                            other.m_sweep.Copy(backup);
                            other.SynchronizeTransform();
                            continue;
                        }
                        // Are there contact points?
                        if (!contact.IsTouching()) {
                            other.m_sweep.Copy(backup);
                            other.SynchronizeTransform();
                            continue;
                        }
                        // Add the contact to the island
                        contact.m_islandFlag = true;
                        island.AddContact(contact);
                        // Has the other body already been added to the island?
                        if (other.m_islandFlag) {
                            continue;
                        }
                        // Add the other body to the island.
                        other.m_islandFlag = true;
                        if (other.m_type !== b2_body_1.b2BodyType.b2_staticBody) {
                            other.SetAwake(true);
                        }
                        island.AddBody(other);
                    }
                }
            }
            const subStep = b2World.SolveTOI_s_subStep;
            subStep.dt = (1 - minAlpha) * step.dt;
            subStep.inv_dt = 1 / subStep.dt;
            subStep.dtRatio = 1;
            subStep.config = {
                ...step.config,
                positionIterations: 20,
            };
            subStep.warmStarting = false;
            island.SolveTOI(subStep, bA.m_islandIndex, bB.m_islandIndex);
            // Reset island flags and synchronize broad-phase proxies.
            for (let i = 0; i < island.m_bodyCount; ++i) {
                const body = island.m_bodies[i];
                body.m_islandFlag = false;
                if (body.m_type !== b2_body_1.b2BodyType.b2_dynamicBody) {
                    continue;
                }
                body.SynchronizeFixtures();
                // Invalidate all contact TOIs on this displaced body.
                for (let ce = body.m_contactList; ce; ce = ce.next) {
                    ce.contact.m_toiFlag = false;
                    ce.contact.m_islandFlag = false;
                }
            }
            // Commit fixture proxy movements to the broad-phase so that new contacts are created.
            // Also, some contacts can be destroyed.
            this.m_contactManager.FindNewContacts();
            if (this.m_subStepping) {
                this.m_stepComplete = false;
                break;
            }
        }
    }
}
exports.b2World = b2World;
/**
 * Take a time step. This performs collision detection, integration,
 * and constraint solution.
 *
 * @param timeStep The amount of time to simulate, this should not vary.
 * @param velocityIterations For the velocity constraint solver.
 * @param positionIterations For the position constraint solver.
 */
b2World.Step_s_step = b2_time_step_1.b2TimeStep.Create();
b2World.Step_s_stepTimer = new b2_timer_1.b2Timer();
b2World.Step_s_timer = new b2_timer_1.b2Timer();
b2World.QueryFixtureShape_s_aabb = new b2_collision_1.b2AABB();
b2World.RayCast_s_input = new b2_collision_1.b2RayCastInput();
b2World.RayCast_s_output = new b2_collision_1.b2RayCastOutput();
b2World.RayCast_s_point = new b2_math_1.b2Vec2();
b2World.SolveTOI_s_subStep = b2_time_step_1.b2TimeStep.Create();
b2World.SolveTOI_s_backup = new b2_math_1.b2Sweep();
b2World.SolveTOI_s_backup1 = new b2_math_1.b2Sweep();
b2World.SolveTOI_s_backup2 = new b2_math_1.b2Sweep();
b2World.SolveTOI_s_toi_input = new b2_time_of_impact_1.b2TOIInput();
b2World.SolveTOI_s_toi_output = new b2_time_of_impact_1.b2TOIOutput();


/***/ }),

/***/ "mCV2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2DynamicTree = exports.b2TreeNode = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_collision_1 = __webpack_require__("h2hE");
const temp = {
    stack: [],
    t: new b2_math_1.b2Vec2(),
    r: new b2_math_1.b2Vec2(),
    v: new b2_math_1.b2Vec2(),
    abs_v: new b2_math_1.b2Vec2(),
    segmentAABB: new b2_collision_1.b2AABB(),
    subInput: new b2_collision_1.b2RayCastInput(),
    combinedAABB: new b2_collision_1.b2AABB(),
    aabb: new b2_collision_1.b2AABB(),
    fatAABB: new b2_collision_1.b2AABB(),
    hugeAABB: new b2_collision_1.b2AABB(),
    c: new b2_math_1.b2Vec2(),
    h: new b2_math_1.b2Vec2(),
};
let nextNodeid = 0;
/**
 * A node in the dynamic tree. The client does not interact with this directly.
 */
class b2TreeNode {
    constructor() {
        /** Enlarged AABB */
        this.aabb = new b2_collision_1.b2AABB();
        this.userData = null;
        this.parent = null; // or next
        this.child1 = null;
        this.child2 = null;
        this.height = 0; // leaf = 0, free node = -1
        this.moved = false;
        this.id = nextNodeid++;
    }
    Reset() {
        this.child1 = null;
        this.child2 = null;
        this.height = -1;
        this.userData = null;
    }
    IsLeaf() {
        return this.child1 === null;
    }
    GetArea() {
        if (this.IsLeaf())
            return 0;
        let area = this.aabb.GetPerimeter();
        if (this.child1)
            area += this.child1.GetArea();
        if (this.child2)
            area += this.child2.GetArea();
        return area;
    }
    ComputeHeight() {
        if (this.IsLeaf())
            return 0;
        (0, b2_common_1.b2Assert)(this.child1 !== null && this.child2 !== null);
        const height1 = (0, b2_common_1.b2Verify)(this.child1).ComputeHeight();
        const height2 = (0, b2_common_1.b2Verify)(this.child2).ComputeHeight();
        return 1 + Math.max(height1, height2);
    }
    GetMaxBalance() {
        if (this.height <= 1)
            return 0;
        const child1 = (0, b2_common_1.b2Verify)(this.child1);
        const child2 = (0, b2_common_1.b2Verify)(this.child2);
        return Math.max(child1.GetMaxBalance(), child2.GetMaxBalance(), Math.abs(child2.height - child1.height));
    }
    ShiftOrigin(newOrigin) {
        if (this.height <= 1)
            return;
        (0, b2_common_1.b2Verify)(this.child1).ShiftOrigin(newOrigin);
        (0, b2_common_1.b2Verify)(this.child2).ShiftOrigin(newOrigin);
        this.aabb.lowerBound.Subtract(newOrigin);
        this.aabb.upperBound.Subtract(newOrigin);
    }
}
exports.b2TreeNode = b2TreeNode;
/**
 * A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt.
 * A dynamic tree arranges data in a binary tree to accelerate
 * queries such as volume queries and ray casts. Leafs are proxies
 * with an AABB. In the tree we expand the proxy AABB by b2_fatAABBFactor
 * so that the proxy AABB is bigger than the client object. This allows the client
 * object to move by small amounts without triggering a tree update.
 *
 * Nodes are pooled
 */
class b2DynamicTree {
    constructor() {
        this.m_root = null;
        this.m_freeList = null;
    }
    Query(aabb, callback) {
        const stack = temp.stack;
        stack.length = 0;
        let node = this.m_root;
        while (node) {
            if (node.aabb.TestOverlap(aabb)) {
                if (node.IsLeaf()) {
                    const proceed = callback(node);
                    if (!proceed) {
                        return;
                    }
                }
                else {
                    stack.push(node.child1);
                    stack.push(node.child2);
                }
            }
            node = stack.pop();
        }
    }
    QueryPoint(point, callback) {
        const stack = temp.stack;
        stack.length = 0;
        let node = this.m_root;
        while (node) {
            if (node.aabb.TestContain(point)) {
                if (node.IsLeaf()) {
                    const proceed = callback(node);
                    if (!proceed) {
                        return;
                    }
                }
                else {
                    stack.push(node.child1);
                    stack.push(node.child2);
                }
            }
            node = stack.pop();
        }
    }
    RayCast(input, callback) {
        const { p1, p2 } = input;
        const r = b2_math_1.b2Vec2.Subtract(p2, p1, temp.r);
        // DEBUG: b2Assert(r.LengthSquared() > 0);
        r.Normalize();
        // v is perpendicular to the segment.
        const v = b2_math_1.b2Vec2.CrossOneVec2(r, temp.v);
        const abs_v = v.GetAbs(temp.abs_v);
        // Separating axis for segment (Gino, p80).
        // |dot(v, p1 - c)| > dot(|v|, h)
        let { maxFraction } = input;
        // Build a bounding box for the segment.
        const { segmentAABB, subInput, c, h, t } = temp;
        b2_math_1.b2Vec2.AddScaled(p1, maxFraction, b2_math_1.b2Vec2.Subtract(p2, p1, t), t);
        b2_math_1.b2Vec2.Min(p1, t, segmentAABB.lowerBound);
        b2_math_1.b2Vec2.Max(p1, t, segmentAABB.upperBound);
        const stack = temp.stack;
        stack.length = 0;
        let node = this.m_root;
        while (node) {
            if (!node.aabb.TestOverlap(segmentAABB)) {
                node = stack.pop();
                continue;
            }
            // Separating axis for segment (Gino, p80).
            // |dot(v, p1 - c)| > dot(|v|, h)
            node.aabb.GetCenter(c);
            node.aabb.GetExtents(h);
            const separation = Math.abs(b2_math_1.b2Vec2.Dot(v, b2_math_1.b2Vec2.Subtract(p1, c, b2_math_1.b2Vec2.s_t0))) - b2_math_1.b2Vec2.Dot(abs_v, h);
            if (separation > 0) {
                node = stack.pop();
                continue;
            }
            if (node.IsLeaf()) {
                subInput.p1.Copy(input.p1);
                subInput.p2.Copy(input.p2);
                subInput.maxFraction = maxFraction;
                const value = callback(subInput, node);
                if (value === 0) {
                    // The client has terminated the ray cast.
                    return;
                }
                if (value > 0) {
                    // Update segment bounding box.
                    maxFraction = value;
                    b2_math_1.b2Vec2.AddScaled(p1, maxFraction, b2_math_1.b2Vec2.Subtract(p2, p1, t), t);
                    b2_math_1.b2Vec2.Min(p1, t, segmentAABB.lowerBound);
                    b2_math_1.b2Vec2.Max(p1, t, segmentAABB.upperBound);
                }
            }
            else {
                stack.push(node.child1);
                stack.push(node.child2);
            }
            node = stack.pop();
        }
    }
    AllocateNode() {
        // Expand the node pool as needed.
        if (this.m_freeList === null) {
            return new b2TreeNode();
        }
        const node = this.m_freeList;
        this.m_freeList = node.parent;
        node.parent = null;
        node.child1 = null;
        node.child2 = null;
        node.height = 0;
        node.moved = false;
        return node;
    }
    FreeNode(node) {
        node.parent = this.m_freeList;
        node.Reset();
        this.m_freeList = node;
    }
    CreateProxy(aabb, userData) {
        const node = this.AllocateNode();
        // Fatten the aabb.
        const r = b2_common_1.b2_aabbExtension;
        node.aabb.lowerBound.Set(aabb.lowerBound.x - r, aabb.lowerBound.y - r);
        node.aabb.upperBound.Set(aabb.upperBound.x + r, aabb.upperBound.y + r);
        node.userData = userData;
        node.height = 0;
        node.moved = true;
        this.InsertLeaf(node);
        return node;
    }
    DestroyProxy(node) {
        // DEBUG: b2Assert(node.IsLeaf());
        this.RemoveLeaf(node);
        this.FreeNode(node);
    }
    MoveProxy(node, aabb, displacement) {
        // DEBUG: b2Assert(node.IsLeaf());
        // Extend AABB
        const { fatAABB, hugeAABB } = temp;
        const r = b2_common_1.b2_aabbExtension;
        fatAABB.lowerBound.Set(aabb.lowerBound.x - r, aabb.lowerBound.y - r);
        fatAABB.upperBound.Set(aabb.upperBound.x + r, aabb.upperBound.y + r);
        // Predict AABB movement
        const d_x = b2_common_1.b2_aabbMultiplier * displacement.x;
        const d_y = b2_common_1.b2_aabbMultiplier * displacement.y;
        if (d_x < 0) {
            fatAABB.lowerBound.x += d_x;
        }
        else {
            fatAABB.upperBound.x += d_x;
        }
        if (d_y < 0) {
            fatAABB.lowerBound.y += d_y;
        }
        else {
            fatAABB.upperBound.y += d_y;
        }
        const treeAABB = node.aabb;
        if (treeAABB.Contains(aabb)) {
            // The tree AABB still contains the object, but it might be too large.
            // Perhaps the object was moving fast but has since gone to sleep.
            // The huge AABB is larger than the new fat AABB.
            const r4 = 4 * b2_common_1.b2_aabbExtension;
            hugeAABB.lowerBound.Set(fatAABB.lowerBound.x - r4, aabb.lowerBound.y - r4);
            hugeAABB.upperBound.Set(fatAABB.upperBound.x + r4, aabb.upperBound.y + r4);
            if (hugeAABB.Contains(treeAABB)) {
                // The tree AABB contains the object AABB and the tree AABB is
                // not too large. No tree update needed.
                return false;
            }
            // Otherwise the tree AABB is huge and needs to be shrunk
        }
        this.RemoveLeaf(node);
        node.aabb.Copy(fatAABB);
        this.InsertLeaf(node);
        node.moved = true;
        return true;
    }
    InsertLeaf(leaf) {
        if (this.m_root === null) {
            this.m_root = leaf;
            this.m_root.parent = null;
            return;
        }
        // Find the best sibling for this node
        const { combinedAABB, aabb } = temp;
        const leafAABB = leaf.aabb;
        let sibling = this.m_root;
        while (!sibling.IsLeaf()) {
            const child1 = (0, b2_common_1.b2Verify)(sibling.child1);
            const child2 = (0, b2_common_1.b2Verify)(sibling.child2);
            const area = sibling.aabb.GetPerimeter();
            combinedAABB.Combine2(sibling.aabb, leafAABB);
            const combinedArea = combinedAABB.GetPerimeter();
            // Cost of creating a new parent for this node and the new leaf
            const cost = 2 * combinedArea;
            // Minimum cost of pushing the leaf further down the tree
            const inheritanceCost = 2 * (combinedArea - area);
            // Cost of descending into child1
            let cost1;
            let oldArea;
            let newArea;
            if (child1.IsLeaf()) {
                aabb.Combine2(leafAABB, child1.aabb);
                cost1 = aabb.GetPerimeter() + inheritanceCost;
            }
            else {
                aabb.Combine2(leafAABB, child1.aabb);
                oldArea = child1.aabb.GetPerimeter();
                newArea = aabb.GetPerimeter();
                cost1 = newArea - oldArea + inheritanceCost;
            }
            // Cost of descending into child2
            let cost2;
            if (child2.IsLeaf()) {
                aabb.Combine2(leafAABB, child2.aabb);
                cost2 = aabb.GetPerimeter() + inheritanceCost;
            }
            else {
                aabb.Combine2(leafAABB, child2.aabb);
                oldArea = child2.aabb.GetPerimeter();
                newArea = aabb.GetPerimeter();
                cost2 = newArea - oldArea + inheritanceCost;
            }
            // Descend according to the minimum cost.
            if (cost < cost1 && cost < cost2) {
                break;
            }
            // Descend
            if (cost1 < cost2) {
                sibling = child1;
            }
            else {
                sibling = child2;
            }
        }
        // Create a new parent.
        const oldParent = sibling.parent;
        const newParent = this.AllocateNode();
        newParent.parent = oldParent;
        newParent.userData = null;
        newParent.aabb.Combine2(leafAABB, sibling.aabb);
        newParent.height = sibling.height + 1;
        if (oldParent !== null) {
            // The sibling was not the root.
            if (oldParent.child1 === sibling) {
                oldParent.child1 = newParent;
            }
            else {
                oldParent.child2 = newParent;
            }
            newParent.child1 = sibling;
            newParent.child2 = leaf;
            sibling.parent = newParent;
            leaf.parent = newParent;
        }
        else {
            // The sibling was the root.
            newParent.child1 = sibling;
            newParent.child2 = leaf;
            sibling.parent = newParent;
            leaf.parent = newParent;
            this.m_root = newParent;
        }
        // Walk back up the tree fixing heights and AABBs
        let node = leaf.parent;
        while (node !== null) {
            node = this.Balance(node);
            const child1 = (0, b2_common_1.b2Verify)(node.child1);
            const child2 = (0, b2_common_1.b2Verify)(node.child2);
            node.height = 1 + Math.max(child1.height, child2.height);
            node.aabb.Combine2(child1.aabb, child2.aabb);
            node = node.parent;
        }
        // this.Validate();
    }
    RemoveLeaf(leaf) {
        if (leaf === this.m_root) {
            this.m_root = null;
            return;
        }
        const parent = (0, b2_common_1.b2Verify)(leaf.parent);
        const grandParent = parent.parent;
        const sibling = (0, b2_common_1.b2Verify)(parent.child1 === leaf ? parent.child2 : parent.child1);
        if (grandParent !== null) {
            // Destroy parent and connect sibling to grandParent.
            if (grandParent.child1 === parent) {
                grandParent.child1 = sibling;
            }
            else {
                grandParent.child2 = sibling;
            }
            sibling.parent = grandParent;
            this.FreeNode(parent);
            // Adjust ancestor bounds.
            let node = grandParent;
            while (node !== null) {
                node = this.Balance(node);
                const child1 = (0, b2_common_1.b2Verify)(node.child1);
                const child2 = (0, b2_common_1.b2Verify)(node.child2);
                node.aabb.Combine2(child1.aabb, child2.aabb);
                node.height = 1 + Math.max(child1.height, child2.height);
                node = node.parent;
            }
        }
        else {
            this.m_root = sibling;
            sibling.parent = null;
            this.FreeNode(parent);
        }
        // this.Validate();
    }
    Balance(A) {
        // DEBUG: b2Assert(A !== null);
        if (A.IsLeaf() || A.height < 2) {
            return A;
        }
        const B = (0, b2_common_1.b2Verify)(A.child1);
        const C = (0, b2_common_1.b2Verify)(A.child2);
        const balance = C.height - B.height;
        // Rotate C up
        if (balance > 1) {
            const F = (0, b2_common_1.b2Verify)(C.child1);
            const G = (0, b2_common_1.b2Verify)(C.child2);
            // Swap A and C
            C.child1 = A;
            C.parent = A.parent;
            A.parent = C;
            // A's old parent should point to C
            if (C.parent !== null) {
                if (C.parent.child1 === A) {
                    C.parent.child1 = C;
                }
                else {
                    // DEBUG: b2Assert(C.parent.child2 === A);
                    C.parent.child2 = C;
                }
            }
            else {
                this.m_root = C;
            }
            // Rotate
            if (F.height > G.height) {
                C.child2 = F;
                A.child2 = G;
                G.parent = A;
                A.aabb.Combine2(B.aabb, G.aabb);
                C.aabb.Combine2(A.aabb, F.aabb);
                A.height = 1 + Math.max(B.height, G.height);
                C.height = 1 + Math.max(A.height, F.height);
            }
            else {
                C.child2 = G;
                A.child2 = F;
                F.parent = A;
                A.aabb.Combine2(B.aabb, F.aabb);
                C.aabb.Combine2(A.aabb, G.aabb);
                A.height = 1 + Math.max(B.height, F.height);
                C.height = 1 + Math.max(A.height, G.height);
            }
            return C;
        }
        // Rotate B up
        if (balance < -1) {
            const D = (0, b2_common_1.b2Verify)(B.child1);
            const E = (0, b2_common_1.b2Verify)(B.child2);
            // Swap A and B
            B.child1 = A;
            B.parent = A.parent;
            A.parent = B;
            // A's old parent should point to B
            if (B.parent !== null) {
                if (B.parent.child1 === A) {
                    B.parent.child1 = B;
                }
                else {
                    // DEBUG: b2Assert(B.parent.child2 === A);
                    B.parent.child2 = B;
                }
            }
            else {
                this.m_root = B;
            }
            // Rotate
            if (D.height > E.height) {
                B.child2 = D;
                A.child1 = E;
                E.parent = A;
                A.aabb.Combine2(C.aabb, E.aabb);
                B.aabb.Combine2(A.aabb, D.aabb);
                A.height = 1 + Math.max(C.height, E.height);
                B.height = 1 + Math.max(A.height, D.height);
            }
            else {
                B.child2 = E;
                A.child1 = D;
                D.parent = A;
                A.aabb.Combine2(C.aabb, D.aabb);
                B.aabb.Combine2(A.aabb, E.aabb);
                A.height = 1 + Math.max(C.height, D.height);
                B.height = 1 + Math.max(A.height, E.height);
            }
            return B;
        }
        return A;
    }
    GetHeight() {
        if (this.m_root === null) {
            return 0;
        }
        return this.m_root.height;
    }
    GetAreaRatio() {
        if (this.m_root === null) {
            return 0;
        }
        const root = this.m_root;
        const rootArea = root.aabb.GetPerimeter();
        const totalArea = root.GetArea();
        return totalArea / rootArea;
    }
    GetMaxBalance() {
        if (this.m_root === null) {
            return 0;
        }
        return this.m_root.GetMaxBalance();
    }
    ShiftOrigin(newOrigin) {
        var _a;
        (_a = this.m_root) === null || _a === void 0 ? void 0 : _a.ShiftOrigin(newOrigin);
    }
}
exports.b2DynamicTree = b2DynamicTree;


/***/ }),

/***/ "mQGX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2GearJoint = exports.b2GearJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const temp = {
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    qC: new b2_math_1.b2Rot(),
    qD: new b2_math_1.b2Rot(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    lalcC: new b2_math_1.b2Vec2(),
    lalcD: new b2_math_1.b2Vec2(),
    u: new b2_math_1.b2Vec2(),
    rA: new b2_math_1.b2Vec2(),
    rB: new b2_math_1.b2Vec2(),
    rC: new b2_math_1.b2Vec2(),
    rD: new b2_math_1.b2Vec2(),
    JvAC: new b2_math_1.b2Vec2(),
    JvBD: new b2_math_1.b2Vec2(),
};
/**
 * Gear joint definition. This definition requires two existing
 * revolute or prismatic joints (any combination will work).
 *
 * @warning bodyB on the input joints must both be dynamic
 */
class b2GearJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_gearJoint);
        /**
         * The gear ratio.
         *
         * @see b2GearJoint for explanation.
         */
        this.ratio = 1;
    }
}
exports.b2GearJointDef = b2GearJointDef;
/**
 * A gear joint is used to connect two joints together. Either joint
 * can be a revolute or prismatic joint. You specify a gear ratio
 * to bind the motions together:
 * coordinate1 + ratio * coordinate2 = constant
 * The ratio can be negative or positive. If one joint is a revolute joint
 * and the other joint is a prismatic joint, then the ratio will have units
 * of length or units of 1/length.
 *
 * @warning You have to manually destroy the gear joint if joint1 or joint2
 * is destroyed.
 */
class b2GearJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a;
        super(def);
        this.m_typeA = b2_joint_1.b2JointType.e_unknownJoint;
        this.m_typeB = b2_joint_1.b2JointType.e_unknownJoint;
        // Solver shared
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        this.m_localAnchorC = new b2_math_1.b2Vec2();
        this.m_localAnchorD = new b2_math_1.b2Vec2();
        this.m_localAxisC = new b2_math_1.b2Vec2();
        this.m_localAxisD = new b2_math_1.b2Vec2();
        this.m_referenceAngleA = 0;
        this.m_referenceAngleB = 0;
        this.m_constant = 0;
        this.m_ratio = 0;
        this.m_impulse = 0;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_indexC = 0;
        this.m_indexD = 0;
        this.m_lcA = new b2_math_1.b2Vec2();
        this.m_lcB = new b2_math_1.b2Vec2();
        this.m_lcC = new b2_math_1.b2Vec2();
        this.m_lcD = new b2_math_1.b2Vec2();
        this.m_mA = 0;
        this.m_mB = 0;
        this.m_mC = 0;
        this.m_mD = 0;
        this.m_iA = 0;
        this.m_iB = 0;
        this.m_iC = 0;
        this.m_iD = 0;
        this.m_JvAC = new b2_math_1.b2Vec2();
        this.m_JvBD = new b2_math_1.b2Vec2();
        this.m_JwA = 0;
        this.m_JwB = 0;
        this.m_JwC = 0;
        this.m_JwD = 0;
        this.m_mass = 0;
        this.m_joint1 = def.joint1;
        this.m_joint2 = def.joint2;
        this.m_typeA = this.m_joint1.GetType();
        this.m_typeB = this.m_joint2.GetType();
        // DEBUG: b2Assert(this.m_typeA === b2JointType.e_revoluteJoint || this.m_typeA === b2JointType.e_prismaticJoint);
        // DEBUG: b2Assert(this.m_typeB === b2JointType.e_revoluteJoint || this.m_typeB === b2JointType.e_prismaticJoint);
        let coordinateA;
        let coordinateB;
        // TODO_ERIN there might be some problem with the joint edges in b2Joint.
        this.m_bodyC = this.m_joint1.GetBodyA();
        this.m_bodyA = this.m_joint1.GetBodyB();
        // Body B on joint1 must be dynamic
        // DEBUG: b2Assert(this.m_bodyA.m_type === b2BodyType.b2_dynamicBody);
        // Get geometry of joint1
        const xfA = this.m_bodyA.m_xf;
        const aA = this.m_bodyA.m_sweep.a;
        const xfC = this.m_bodyC.m_xf;
        const aC = this.m_bodyC.m_sweep.a;
        if (this.m_typeA === b2_joint_1.b2JointType.e_revoluteJoint) {
            const revolute = def.joint1;
            this.m_localAnchorC.Copy(revolute.m_localAnchorA);
            this.m_localAnchorA.Copy(revolute.m_localAnchorB);
            this.m_referenceAngleA = revolute.m_referenceAngle;
            this.m_localAxisC.SetZero();
            coordinateA = aA - aC - this.m_referenceAngleA;
        }
        else {
            const prismatic = def.joint1;
            this.m_localAnchorC.Copy(prismatic.m_localAnchorA);
            this.m_localAnchorA.Copy(prismatic.m_localAnchorB);
            this.m_referenceAngleA = prismatic.m_referenceAngle;
            this.m_localAxisC.Copy(prismatic.m_localXAxisA);
            const pC = this.m_localAnchorC;
            const pA = b2_math_1.b2Rot.TransposeMultiplyVec2(xfC.q, b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_localAnchorA, b2_math_1.b2Vec2.s_t0).Add(xfA.p).Subtract(xfC.p), b2_math_1.b2Vec2.s_t0);
            coordinateA = b2_math_1.b2Vec2.Dot(pA.Subtract(pC), this.m_localAxisC);
        }
        this.m_bodyD = this.m_joint2.GetBodyA();
        this.m_bodyB = this.m_joint2.GetBodyB();
        // Body B on joint2 must be dynamic
        // DEBUG: b2Assert(this.m_bodyB.m_type === b2BodyType.b2_dynamicBody);
        // Get geometry of joint2
        const xfB = this.m_bodyB.m_xf;
        const aB = this.m_bodyB.m_sweep.a;
        const xfD = this.m_bodyD.m_xf;
        const aD = this.m_bodyD.m_sweep.a;
        if (this.m_typeB === b2_joint_1.b2JointType.e_revoluteJoint) {
            const revolute = def.joint2;
            this.m_localAnchorD.Copy(revolute.m_localAnchorA);
            this.m_localAnchorB.Copy(revolute.m_localAnchorB);
            this.m_referenceAngleB = revolute.m_referenceAngle;
            this.m_localAxisD.SetZero();
            coordinateB = aB - aD - this.m_referenceAngleB;
        }
        else {
            const prismatic = def.joint2;
            this.m_localAnchorD.Copy(prismatic.m_localAnchorA);
            this.m_localAnchorB.Copy(prismatic.m_localAnchorB);
            this.m_referenceAngleB = prismatic.m_referenceAngle;
            this.m_localAxisD.Copy(prismatic.m_localXAxisA);
            const pD = this.m_localAnchorD;
            const pB = b2_math_1.b2Rot.TransposeMultiplyVec2(xfD.q, b2_math_1.b2Rot.MultiplyVec2(xfB.q, this.m_localAnchorB, b2_math_1.b2Vec2.s_t0).Add(xfB.p).Subtract(xfD.p), b2_math_1.b2Vec2.s_t0);
            coordinateB = b2_math_1.b2Vec2.Dot(pB.Subtract(pD), this.m_localAxisD);
        }
        this.m_ratio = (_a = def.ratio) !== null && _a !== void 0 ? _a : 1;
        this.m_constant = coordinateA + this.m_ratio * coordinateB;
        this.m_impulse = 0;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_indexC = this.m_bodyC.m_islandIndex;
        this.m_indexD = this.m_bodyD.m_islandIndex;
        this.m_lcA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_lcB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_lcC.Copy(this.m_bodyC.m_sweep.localCenter);
        this.m_lcD.Copy(this.m_bodyD.m_sweep.localCenter);
        this.m_mA = this.m_bodyA.m_invMass;
        this.m_mB = this.m_bodyB.m_invMass;
        this.m_mC = this.m_bodyC.m_invMass;
        this.m_mD = this.m_bodyD.m_invMass;
        this.m_iA = this.m_bodyA.m_invI;
        this.m_iB = this.m_bodyB.m_invI;
        this.m_iC = this.m_bodyC.m_invI;
        this.m_iD = this.m_bodyD.m_invI;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const aC = data.positions[this.m_indexC].a;
        const vC = data.velocities[this.m_indexC].v;
        let wC = data.velocities[this.m_indexC].w;
        const aD = data.positions[this.m_indexD].a;
        const vD = data.velocities[this.m_indexD].v;
        let wD = data.velocities[this.m_indexD].w;
        const { qA, qB, qC, qD } = temp;
        qA.Set(aA);
        qB.Set(aB);
        qC.Set(aC);
        qD.Set(aD);
        this.m_mass = 0;
        if (this.m_typeA === b2_joint_1.b2JointType.e_revoluteJoint) {
            this.m_JvAC.SetZero();
            this.m_JwA = 1;
            this.m_JwC = 1;
            this.m_mass += this.m_iA + this.m_iC;
        }
        else {
            const { u, rC, rA, lalcA, lalcC } = temp;
            b2_math_1.b2Rot.MultiplyVec2(qC, this.m_localAxisC, u);
            b2_math_1.b2Rot.MultiplyVec2(qC, b2_math_1.b2Vec2.Subtract(this.m_localAnchorC, this.m_lcC, lalcC), rC);
            b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_lcA, lalcA), rA);
            this.m_JvAC.Copy(u);
            this.m_JwC = b2_math_1.b2Vec2.Cross(rC, u);
            this.m_JwA = b2_math_1.b2Vec2.Cross(rA, u);
            this.m_mass +=
                this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
        }
        if (this.m_typeB === b2_joint_1.b2JointType.e_revoluteJoint) {
            this.m_JvBD.SetZero();
            this.m_JwB = this.m_ratio;
            this.m_JwD = this.m_ratio;
            this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
        }
        else {
            const { u, rB, rD, lalcB, lalcD } = temp;
            b2_math_1.b2Rot.MultiplyVec2(qD, this.m_localAxisD, u);
            b2_math_1.b2Rot.MultiplyVec2(qD, b2_math_1.b2Vec2.Subtract(this.m_localAnchorD, this.m_lcD, lalcD), rD);
            b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_lcB, lalcB), rB);
            b2_math_1.b2Vec2.Scale(this.m_ratio, u, this.m_JvBD);
            this.m_JwD = this.m_ratio * b2_math_1.b2Vec2.Cross(rD, u);
            this.m_JwB = this.m_ratio * b2_math_1.b2Vec2.Cross(rB, u);
            this.m_mass +=
                this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) +
                    this.m_iD * this.m_JwD * this.m_JwD +
                    this.m_iB * this.m_JwB * this.m_JwB;
        }
        // Compute effective mass.
        this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0;
        if (data.step.warmStarting) {
            vA.AddScaled(this.m_mA * this.m_impulse, this.m_JvAC);
            wA += this.m_iA * this.m_impulse * this.m_JwA;
            vB.AddScaled(this.m_mB * this.m_impulse, this.m_JvBD);
            wB += this.m_iB * this.m_impulse * this.m_JwB;
            vC.SubtractScaled(this.m_mC * this.m_impulse, this.m_JvAC);
            wC -= this.m_iC * this.m_impulse * this.m_JwC;
            vD.SubtractScaled(this.m_mD * this.m_impulse, this.m_JvBD);
            wD -= this.m_iD * this.m_impulse * this.m_JwD;
        }
        else {
            this.m_impulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
        data.velocities[this.m_indexC].w = wC;
        data.velocities[this.m_indexD].w = wD;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const vC = data.velocities[this.m_indexC].v;
        let wC = data.velocities[this.m_indexC].w;
        const vD = data.velocities[this.m_indexD].v;
        let wD = data.velocities[this.m_indexD].w;
        let Cdot = b2_math_1.b2Vec2.Dot(this.m_JvAC, b2_math_1.b2Vec2.Subtract(vA, vC, b2_math_1.b2Vec2.s_t0)) +
            b2_math_1.b2Vec2.Dot(this.m_JvBD, b2_math_1.b2Vec2.Subtract(vB, vD, b2_math_1.b2Vec2.s_t0));
        Cdot += this.m_JwA * wA - this.m_JwC * wC + (this.m_JwB * wB - this.m_JwD * wD);
        const impulse = -this.m_mass * Cdot;
        this.m_impulse += impulse;
        vA.AddScaled(this.m_mA * impulse, this.m_JvAC);
        wA += this.m_iA * impulse * this.m_JwA;
        vB.AddScaled(this.m_mB * impulse, this.m_JvBD);
        wB += this.m_iB * impulse * this.m_JwB;
        vC.SubtractScaled(this.m_mC * impulse, this.m_JvAC);
        wC -= this.m_iC * impulse * this.m_JwC;
        vD.SubtractScaled(this.m_mD * impulse, this.m_JvBD);
        wD -= this.m_iD * impulse * this.m_JwD;
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
        data.velocities[this.m_indexC].w = wC;
        data.velocities[this.m_indexD].w = wD;
    }
    /** @internal protected */
    SolvePositionConstraints(data) {
        const cA = data.positions[this.m_indexA].c;
        let aA = data.positions[this.m_indexA].a;
        const cB = data.positions[this.m_indexB].c;
        let aB = data.positions[this.m_indexB].a;
        const cC = data.positions[this.m_indexC].c;
        let aC = data.positions[this.m_indexC].a;
        const cD = data.positions[this.m_indexD].c;
        let aD = data.positions[this.m_indexD].a;
        const { qA, qB, qC, qD, JvAC, JvBD } = temp;
        qA.Set(aA);
        qB.Set(aB);
        qC.Set(aC);
        qD.Set(aD);
        const linearError = 0;
        let coordinateA;
        let coordinateB;
        let JwA;
        let JwB;
        let JwC;
        let JwD;
        let mass = 0;
        if (this.m_typeA === b2_joint_1.b2JointType.e_revoluteJoint) {
            JvAC.SetZero();
            JwA = 1;
            JwC = 1;
            mass += this.m_iA + this.m_iC;
            coordinateA = aA - aC - this.m_referenceAngleA;
        }
        else {
            const { u, rC, rA, lalcC, lalcA } = temp;
            b2_math_1.b2Rot.MultiplyVec2(qC, this.m_localAxisC, u);
            b2_math_1.b2Rot.MultiplyVec2(qC, b2_math_1.b2Vec2.Subtract(this.m_localAnchorC, this.m_lcC, lalcC), rC);
            b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_lcA, lalcA), rA);
            JvAC.Copy(u);
            JwC = b2_math_1.b2Vec2.Cross(rC, u);
            JwA = b2_math_1.b2Vec2.Cross(rA, u);
            mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
            const pC = lalcC;
            const pA = b2_math_1.b2Rot.TransposeMultiplyVec2(qC, b2_math_1.b2Vec2.Add(rA, cA, b2_math_1.b2Vec2.s_t0).Subtract(cC), b2_math_1.b2Vec2.s_t0);
            coordinateA = b2_math_1.b2Vec2.Dot(b2_math_1.b2Vec2.Subtract(pA, pC, b2_math_1.b2Vec2.s_t0), this.m_localAxisC);
        }
        if (this.m_typeB === b2_joint_1.b2JointType.e_revoluteJoint) {
            JvBD.SetZero();
            JwB = this.m_ratio;
            JwD = this.m_ratio;
            mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
            coordinateB = aB - aD - this.m_referenceAngleB;
        }
        else {
            const { u, rD, rB, lalcD, lalcB } = temp;
            b2_math_1.b2Rot.MultiplyVec2(qD, this.m_localAxisD, u);
            b2_math_1.b2Rot.MultiplyVec2(qD, b2_math_1.b2Vec2.Subtract(this.m_localAnchorD, this.m_lcD, lalcD), rD);
            b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_lcB, lalcB), rB);
            b2_math_1.b2Vec2.Scale(this.m_ratio, u, JvBD);
            JwD = this.m_ratio * b2_math_1.b2Vec2.Cross(rD, u);
            JwB = this.m_ratio * b2_math_1.b2Vec2.Cross(rB, u);
            mass +=
                this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;
            const pD = lalcD;
            const pB = b2_math_1.b2Rot.TransposeMultiplyVec2(qD, b2_math_1.b2Vec2.Add(rB, cB, b2_math_1.b2Vec2.s_t0).Subtract(cD), b2_math_1.b2Vec2.s_t0);
            coordinateB = b2_math_1.b2Vec2.Dot(pB.Subtract(pD), this.m_localAxisD);
        }
        const C = coordinateA + this.m_ratio * coordinateB - this.m_constant;
        let impulse = 0;
        if (mass > 0) {
            impulse = -C / mass;
        }
        cA.AddScaled(this.m_mA * impulse, JvAC);
        aA += this.m_iA * impulse * JwA;
        cB.AddScaled(this.m_mB * impulse, JvBD);
        aB += this.m_iB * impulse * JwB;
        cC.SubtractScaled(this.m_mC * impulse, JvAC);
        aC -= this.m_iC * impulse * JwC;
        cD.SubtractScaled(this.m_mD * impulse, JvBD);
        aD -= this.m_iD * impulse * JwD;
        data.positions[this.m_indexA].a = aA;
        data.positions[this.m_indexB].a = aB;
        data.positions[this.m_indexC].a = aC;
        data.positions[this.m_indexD].a = aD;
        // TODO_ERIN not implemented
        return linearError < b2_common_1.b2_linearSlop;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        return b2_math_1.b2Vec2.Scale(inv_dt * this.m_impulse, this.m_JvAC, out);
    }
    GetReactionTorque(inv_dt) {
        return inv_dt * this.m_impulse * this.m_JwA;
    }
    GetJoint1() {
        return this.m_joint1;
    }
    GetJoint2() {
        return this.m_joint2;
    }
    GetRatio() {
        return this.m_ratio;
    }
    SetRatio(ratio) {
        // DEBUG: b2Assert(Number.isFinite(ratio));
        this.m_ratio = ratio;
    }
}
exports.b2GearJoint = b2GearJoint;


/***/ }),

/***/ "oIQG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2WeldJoint = exports.b2WeldJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const temp = {
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    rA: new b2_math_1.b2Vec2(),
    rB: new b2_math_1.b2Vec2(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    K: new b2_math_1.b2Mat33(),
    P: new b2_math_1.b2Vec2(),
    Cdot1: new b2_math_1.b2Vec3(),
    impulse1: new b2_math_1.b2Vec2(),
    impulse: new b2_math_1.b2Vec3(),
    C1: new b2_math_1.b2Vec2(),
    C: new b2_math_1.b2Vec3(),
};
/**
 * Weld joint definition. You need to specify local anchor points
 * where they are attached and the relative body angle. The position
 * of the anchor points is important for computing the reaction torque.
 */
class b2WeldJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_weldJoint);
        /** The local anchor point relative to bodyA's origin. */
        this.localAnchorA = new b2_math_1.b2Vec2();
        /** The local anchor point relative to bodyB's origin. */
        this.localAnchorB = new b2_math_1.b2Vec2();
        /** The bodyB angle minus bodyA angle in the reference state (radians). */
        this.referenceAngle = 0;
        /**
         * The rotational stiffness in N*m
         * Disable softness with a value of 0
         */
        this.stiffness = 0;
        /** The rotational damping in N*m*s */
        this.damping = 0;
    }
    Initialize(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
        this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
    }
}
exports.b2WeldJointDef = b2WeldJointDef;
/**
 * A weld joint essentially glues two bodies together. A weld joint may
 * distort somewhat because the island constraint solver is approximate.
 */
class b2WeldJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b, _c, _d, _e;
        super(def);
        this.m_stiffness = 0;
        this.m_damping = 0;
        this.m_bias = 0;
        // Solver shared
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        this.m_referenceAngle = 0;
        this.m_gamma = 0;
        this.m_impulse = new b2_math_1.b2Vec3();
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_rA = new b2_math_1.b2Vec2();
        this.m_rB = new b2_math_1.b2Vec2();
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_mass = new b2_math_1.b2Mat33();
        this.m_localAnchorA.Copy((_a = def.localAnchorA) !== null && _a !== void 0 ? _a : b2_math_1.b2Vec2.ZERO);
        this.m_localAnchorB.Copy((_b = def.localAnchorB) !== null && _b !== void 0 ? _b : b2_math_1.b2Vec2.ZERO);
        this.m_referenceAngle = (_c = def.referenceAngle) !== null && _c !== void 0 ? _c : 0;
        this.m_stiffness = (_d = def.stiffness) !== null && _d !== void 0 ? _d : 0;
        this.m_damping = (_e = def.damping) !== null && _e !== void 0 ? _e : 0;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB, lalcA, lalcB, K } = temp;
        qA.Set(aA);
        qB.Set(aB);
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        // J = [-I -r1_skew I r2_skew]
        //     [ 0       -1 0       1]
        // r_skew = [-ry; rx]
        // Matlab
        // K = [ mA+r1y^2*iA+mB+r2y^2*iB,  -r1y*iA*r1x-r2y*iB*r2x,          -r1y*iA-r2y*iB]
        //     [  -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB,           r1x*iA+r2x*iB]
        //     [          -r1y*iA-r2y*iB,           r1x*iA+r2x*iB,                   iA+iB]
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
        K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
        K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
        K.ex.y = K.ey.x;
        K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
        K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
        K.ex.z = K.ez.x;
        K.ey.z = K.ez.y;
        K.ez.z = iA + iB;
        if (this.m_stiffness > 0) {
            K.GetInverse22(this.m_mass);
            let invM = iA + iB;
            const C = aB - aA - this.m_referenceAngle;
            // Damping coefficient
            const d = this.m_damping;
            // Spring stiffness
            const k = this.m_stiffness;
            // magic formulas
            const h = data.step.dt;
            this.m_gamma = h * (d + h * k);
            this.m_gamma = this.m_gamma !== 0 ? 1 / this.m_gamma : 0;
            this.m_bias = C * h * k * this.m_gamma;
            invM += this.m_gamma;
            this.m_mass.ez.z = invM !== 0 ? 1 / invM : 0;
        }
        else if (K.ez.z === 0) {
            K.GetInverse22(this.m_mass);
            this.m_gamma = 0;
            this.m_bias = 0;
        }
        else {
            K.GetSymInverse33(this.m_mass);
            this.m_gamma = 0;
            this.m_bias = 0;
        }
        if (data.step.warmStarting) {
            // Scale impulses to support a variable time step.
            this.m_impulse.Scale(data.step.dtRatio);
            const { P } = temp;
            P.Copy(this.m_impulse);
            vA.SubtractScaled(mA, P);
            wA -= iA * (b2_math_1.b2Vec2.Cross(this.m_rA, P) + this.m_impulse.z);
            vB.AddScaled(mB, P);
            wB += iB * (b2_math_1.b2Vec2.Cross(this.m_rB, P) + this.m_impulse.z);
        }
        else {
            this.m_impulse.SetZero();
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        if (this.m_stiffness > 0) {
            const Cdot2 = wB - wA;
            const impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
            this.m_impulse.z += impulse2;
            wA -= iA * impulse2;
            wB += iB * impulse2;
            const { Cdot1, impulse1 } = temp;
            b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, b2_math_1.b2Vec2.s_t1), Cdot1);
            b2_math_1.b2Mat33.MultiplyVec2(this.m_mass, Cdot1, impulse1).Negate();
            this.m_impulse.x += impulse1.x;
            this.m_impulse.y += impulse1.y;
            const P = impulse1;
            vA.SubtractScaled(mA, P);
            wA -= iA * b2_math_1.b2Vec2.Cross(this.m_rA, P);
            vB.AddScaled(mB, P);
            wB += iB * b2_math_1.b2Vec2.Cross(this.m_rB, P);
        }
        else {
            const { Cdot1, impulse, P } = temp;
            b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, b2_math_1.b2Vec2.s_t1), Cdot1);
            Cdot1.z = wB - wA;
            b2_math_1.b2Mat33.MultiplyVec3(this.m_mass, Cdot1, impulse).Negate();
            this.m_impulse.Add(impulse);
            P.Set(impulse.x, impulse.y);
            vA.SubtractScaled(mA, P);
            wA -= iA * (b2_math_1.b2Vec2.Cross(this.m_rA, P) + impulse.z);
            vB.AddScaled(mB, P);
            wB += iB * (b2_math_1.b2Vec2.Cross(this.m_rB, P) + impulse.z);
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolvePositionConstraints(data) {
        const cA = data.positions[this.m_indexA].c;
        let aA = data.positions[this.m_indexA].a;
        const cB = data.positions[this.m_indexB].c;
        let aB = data.positions[this.m_indexB].a;
        const { qA, qB, lalcA, lalcB, K, C1, P, rA, rB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), rB);
        let positionError;
        let angularError;
        K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
        K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
        K.ez.x = -rA.y * iA - rB.y * iB;
        K.ex.y = K.ey.x;
        K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
        K.ez.y = rA.x * iA + rB.x * iB;
        K.ex.z = K.ez.x;
        K.ey.z = K.ez.y;
        K.ez.z = iA + iB;
        if (this.m_stiffness > 0) {
            b2_math_1.b2Vec2.Add(cB, rB, C1).Subtract(cA).Subtract(rA);
            positionError = C1.Length();
            angularError = 0;
            K.Solve22(C1.x, C1.y, P).Negate();
            cA.SubtractScaled(mA, P);
            aA -= iA * b2_math_1.b2Vec2.Cross(rA, P);
            cB.AddScaled(mB, P);
            aB += iB * b2_math_1.b2Vec2.Cross(rB, P);
        }
        else {
            b2_math_1.b2Vec2.Add(cB, rB, C1).Subtract(cA).Subtract(rA);
            b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.Add(cB, rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.Add(cA, rA, b2_math_1.b2Vec2.s_t1), C1);
            const C2 = aB - aA - this.m_referenceAngle;
            positionError = C1.Length();
            angularError = Math.abs(C2);
            const { impulse, C } = temp;
            C.Set(C1.x, C1.y, C2);
            if (K.ez.z > 0) {
                K.Solve33(C.x, C.y, C.z, impulse).Negate();
            }
            else {
                K.Solve22(C1.x, C1.y, impulse).Negate();
                impulse.z = 0;
            }
            P.Copy(impulse);
            cA.SubtractScaled(mA, P);
            aA -= iA * (b2_math_1.b2Vec2.Cross(rA, P) + impulse.z);
            cB.AddScaled(mB, P);
            aB += iB * (b2_math_1.b2Vec2.Cross(rB, P) + impulse.z);
        }
        data.positions[this.m_indexA].a = aA;
        data.positions[this.m_indexB].a = aB;
        return positionError <= b2_common_1.b2_linearSlop && angularError <= b2_common_1.b2_angularSlop;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        out.x = inv_dt * this.m_impulse.x;
        out.y = inv_dt * this.m_impulse.y;
        return out;
    }
    GetReactionTorque(inv_dt) {
        return inv_dt * this.m_impulse.z;
    }
    GetLocalAnchorA() {
        return this.m_localAnchorA;
    }
    GetLocalAnchorB() {
        return this.m_localAnchorB;
    }
    GetReferenceAngle() {
        return this.m_referenceAngle;
    }
    SetStiffness(stiffness) {
        this.m_stiffness = stiffness;
    }
    GetStiffness() {
        return this.m_stiffness;
    }
    SetDamping(damping) {
        this.m_damping = damping;
    }
    GetDamping() {
        return this.m_damping;
    }
}
exports.b2WeldJoint = b2WeldJoint;


/***/ }),

/***/ "pLoN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2AreaJoint = exports.b2AreaJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const b2_distance_joint_1 = __webpack_require__("8OaJ");
class b2AreaJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_areaJoint);
        this.bodies = [];
        this.stiffness = 0;
        this.damping = 0;
    }
    AddBody(body) {
        this.bodies.push(body);
        if (this.bodies.length === 1) {
            this.bodyA = body;
        }
        else if (this.bodies.length === 2) {
            this.bodyB = body;
        }
    }
}
exports.b2AreaJointDef = b2AreaJointDef;
class b2AreaJoint extends b2_joint_1.b2Joint {
    constructor(def) {
        var _a, _b;
        super(def);
        this.m_stiffness = 0;
        this.m_damping = 0;
        // Solver shared
        this.m_impulse = 0;
        this.m_targetArea = 0;
        this.m_joints = [];
        this.m_delta = new b2_math_1.b2Vec2();
        // DEBUG: b2Assert(def.bodies.length >= 3, "You cannot create an area joint with less than three bodies.");
        this.m_bodies = def.bodies;
        this.m_stiffness = (_a = def.stiffness) !== null && _a !== void 0 ? _a : 0;
        this.m_damping = (_b = def.damping) !== null && _b !== void 0 ? _b : 0;
        this.m_targetLengths = (0, b2_common_1.b2MakeNumberArray)(def.bodies.length);
        this.m_normals = (0, b2_common_1.b2MakeArray)(def.bodies.length, b2_math_1.b2Vec2);
        this.m_deltas = (0, b2_common_1.b2MakeArray)(def.bodies.length, b2_math_1.b2Vec2);
        const djd = new b2_distance_joint_1.b2DistanceJointDef();
        djd.stiffness = this.m_stiffness;
        djd.damping = this.m_damping;
        this.m_targetArea = 0;
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            const next = this.m_bodies[(i + 1) % this.m_bodies.length];
            const body_c = body.GetWorldCenter();
            const next_c = next.GetWorldCenter();
            this.m_targetLengths[i] = b2_math_1.b2Vec2.Distance(body_c, next_c);
            this.m_targetArea += b2_math_1.b2Vec2.Cross(body_c, next_c);
            djd.Initialize(body, next, body_c, next_c);
            this.m_joints[i] = body.GetWorld().CreateJoint(djd);
        }
        this.m_targetArea *= 0.5;
    }
    GetAnchorA(out) {
        return out;
    }
    GetAnchorB(out) {
        return out;
    }
    GetReactionForce(inv_dt, out) {
        return out;
    }
    GetReactionTorque(_inv_dt) {
        return 0;
    }
    SetStiffness(stiffness) {
        this.m_stiffness = stiffness;
        for (const joint of this.m_joints) {
            joint.SetStiffness(stiffness);
        }
    }
    GetStiffness() {
        return this.m_stiffness;
    }
    SetDamping(damping) {
        this.m_damping = damping;
        for (const joint of this.m_joints) {
            joint.SetDamping(damping);
        }
    }
    GetDamping() {
        return this.m_damping;
    }
    InitVelocityConstraints(data) {
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const prev = this.m_bodies[(i + this.m_bodies.length - 1) % this.m_bodies.length];
            const next = this.m_bodies[(i + 1) % this.m_bodies.length];
            const prev_c = data.positions[prev.m_islandIndex].c;
            const next_c = data.positions[next.m_islandIndex].c;
            const delta = this.m_deltas[i];
            b2_math_1.b2Vec2.Subtract(next_c, prev_c, delta);
        }
        if (data.step.warmStarting) {
            this.m_impulse *= data.step.dtRatio;
            for (let i = 0; i < this.m_bodies.length; ++i) {
                const body = this.m_bodies[i];
                const body_v = data.velocities[body.m_islandIndex].v;
                const delta = this.m_deltas[i];
                body_v.x += body.m_invMass * delta.y * 0.5 * this.m_impulse;
                body_v.y += body.m_invMass * -delta.x * 0.5 * this.m_impulse;
            }
        }
        else {
            this.m_impulse = 0;
        }
    }
    SolveVelocityConstraints(data) {
        let dotMassSum = 0;
        let crossMassSum = 0;
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            const body_v = data.velocities[body.m_islandIndex].v;
            const delta = this.m_deltas[i];
            dotMassSum += delta.LengthSquared() / body.GetMass();
            crossMassSum += b2_math_1.b2Vec2.Cross(body_v, delta);
        }
        const lambda = (-2 * crossMassSum) / dotMassSum;
        // lambda = b2Clamp(lambda, -b2_maxLinearCorrection, b2_maxLinearCorrection);
        this.m_impulse += lambda;
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            const body_v = data.velocities[body.m_islandIndex].v;
            const delta = this.m_deltas[i];
            body_v.x += body.m_invMass * delta.y * 0.5 * lambda;
            body_v.y += body.m_invMass * -delta.x * 0.5 * lambda;
        }
    }
    SolvePositionConstraints(data) {
        let perimeter = 0;
        let area = 0;
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            const next = this.m_bodies[(i + 1) % this.m_bodies.length];
            const body_c = data.positions[body.m_islandIndex].c;
            const next_c = data.positions[next.m_islandIndex].c;
            const delta = b2_math_1.b2Vec2.Subtract(next_c, body_c, this.m_delta);
            let dist = delta.Length();
            if (dist < b2_common_1.b2_epsilon) {
                dist = 1;
            }
            this.m_normals[i].x = delta.y / dist;
            this.m_normals[i].y = -delta.x / dist;
            perimeter += dist;
            area += b2_math_1.b2Vec2.Cross(body_c, next_c);
        }
        area *= 0.5;
        const deltaArea = this.m_targetArea - area;
        const toExtrude = (0.5 * deltaArea) / perimeter;
        let done = true;
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            const body_c = data.positions[body.m_islandIndex].c;
            const next_i = (i + 1) % this.m_bodies.length;
            const delta = b2_math_1.b2Vec2.Add(this.m_normals[i], this.m_normals[next_i], this.m_delta);
            delta.Scale(toExtrude);
            const norm_sq = delta.LengthSquared();
            if (norm_sq > b2_common_1.b2_maxLinearCorrection ** 2) {
                delta.Scale(b2_common_1.b2_maxLinearCorrection / Math.sqrt(norm_sq));
            }
            if (norm_sq > b2_common_1.b2_linearSlop ** 2) {
                done = false;
            }
            body_c.Add(delta);
        }
        return done;
    }
}
exports.b2AreaJoint = b2AreaJoint;


/***/ }),

/***/ "qywJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Joint = exports.b2AngularStiffness = exports.b2LinearStiffness = exports.b2JointDef = exports.b2JointEdge = exports.b2JointType = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_draw_1 = __webpack_require__("EMJU");
const b2_math_1 = __webpack_require__("xKh6");
const temp = {
    pA: new b2_math_1.b2Vec2(),
    pB: new b2_math_1.b2Vec2(),
};
var b2JointType;
(function (b2JointType) {
    b2JointType[b2JointType["e_unknownJoint"] = 0] = "e_unknownJoint";
    b2JointType[b2JointType["e_revoluteJoint"] = 1] = "e_revoluteJoint";
    b2JointType[b2JointType["e_prismaticJoint"] = 2] = "e_prismaticJoint";
    b2JointType[b2JointType["e_distanceJoint"] = 3] = "e_distanceJoint";
    b2JointType[b2JointType["e_pulleyJoint"] = 4] = "e_pulleyJoint";
    b2JointType[b2JointType["e_mouseJoint"] = 5] = "e_mouseJoint";
    b2JointType[b2JointType["e_gearJoint"] = 6] = "e_gearJoint";
    b2JointType[b2JointType["e_wheelJoint"] = 7] = "e_wheelJoint";
    b2JointType[b2JointType["e_weldJoint"] = 8] = "e_weldJoint";
    b2JointType[b2JointType["e_frictionJoint"] = 9] = "e_frictionJoint";
    b2JointType[b2JointType["e_motorJoint"] = 10] = "e_motorJoint";
    b2JointType[b2JointType["e_areaJoint"] = 11] = "e_areaJoint";
})(b2JointType = exports.b2JointType || (exports.b2JointType = {}));
/**
 * A joint edge is used to connect bodies and joints together
 * in a joint graph where each body is a node and each joint
 * is an edge. A joint edge belongs to a doubly linked list
 * maintained in each attached body. Each joint has two joint
 * nodes, one for each attached body.
 */
class b2JointEdge {
    constructor(joint, other) {
        /** The previous joint edge in the body's joint list */
        this.prev = null;
        /** The next joint edge in the body's joint list */
        this.next = null;
        this.joint = joint;
        this.other = other;
    }
}
exports.b2JointEdge = b2JointEdge;
/**
 * Joint definitions are used to construct joints.
 */
class b2JointDef {
    constructor(type) {
        /** Use this to attach application specific data to your joints. */
        this.userData = null;
        /** Set this flag to true if the attached bodies should collide. */
        this.collideConnected = false;
        this.type = type;
    }
}
exports.b2JointDef = b2JointDef;
/**
 * Utility to compute linear stiffness values from frequency and damping ratio
 */
function b2LinearStiffness(def, frequencyHertz, dampingRatio, bodyA, bodyB) {
    const massA = bodyA.GetMass();
    const massB = bodyB.GetMass();
    let mass;
    if (massA > 0 && massB > 0) {
        mass = (massA * massB) / (massA + massB);
    }
    else if (massA > 0) {
        mass = massA;
    }
    else {
        mass = massB;
    }
    const omega = 2 * Math.PI * frequencyHertz;
    def.stiffness = mass * omega * omega;
    def.damping = 2 * mass * dampingRatio * omega;
}
exports.b2LinearStiffness = b2LinearStiffness;
/**
 * Utility to compute rotational stiffness values frequency and damping ratio
 */
function b2AngularStiffness(def, frequencyHertz, dampingRatio, bodyA, bodyB) {
    const IA = bodyA.GetInertia();
    const IB = bodyB.GetInertia();
    let I;
    if (IA > 0 && IB > 0) {
        I = (IA * IB) / (IA + IB);
    }
    else if (IA > 0) {
        I = IA;
    }
    else {
        I = IB;
    }
    const omega = 2 * Math.PI * frequencyHertz;
    def.stiffness = I * omega * omega;
    def.damping = 2 * I * dampingRatio * omega;
}
exports.b2AngularStiffness = b2AngularStiffness;
/**
 * The base joint class. Joints are used to constraint two bodies together in
 * various fashions. Some joints also feature limits and motors.
 */
class b2Joint {
    constructor(def) {
        // DEBUG: b2Assert(def.bodyA !== def.bodyB);
        var _a;
        this.m_type = b2JointType.e_unknownJoint;
        /** @internal protected */
        this.m_prev = null;
        /** @internal protected */
        this.m_next = null;
        /** @internal protected */
        this.m_islandFlag = false;
        /** @internal protected */
        this.m_collideConnected = false;
        this.m_userData = null;
        this.m_type = def.type;
        this.m_edgeA = new b2JointEdge(this, def.bodyB);
        this.m_edgeB = new b2JointEdge(this, def.bodyA);
        this.m_bodyA = def.bodyA;
        this.m_bodyB = def.bodyB;
        this.m_collideConnected = (_a = def.collideConnected) !== null && _a !== void 0 ? _a : false;
        this.m_userData = def.userData;
    }
    /**
     * Get the type of the concrete joint.
     */
    GetType() {
        return this.m_type;
    }
    /**
     * Get the first body attached to this joint.
     */
    GetBodyA() {
        return this.m_bodyA;
    }
    /**
     * Get the second body attached to this joint.
     */
    GetBodyB() {
        return this.m_bodyB;
    }
    /**
     * Get the next joint the world joint list.
     */
    GetNext() {
        return this.m_next;
    }
    /**
     * Get the user data pointer.
     */
    GetUserData() {
        return this.m_userData;
    }
    /**
     * Set the user data pointer.
     */
    SetUserData(data) {
        this.m_userData = data;
    }
    /**
     * Short-cut function to determine if either body is inactive.
     */
    IsEnabled() {
        return this.m_bodyA.IsEnabled() && this.m_bodyB.IsEnabled();
    }
    /**
     * Get collide connected.
     * Note: modifying the collide connect flag won't work correctly because
     * the flag is only checked when fixture AABBs begin to overlap.
     */
    GetCollideConnected() {
        return this.m_collideConnected;
    }
    /**
     * Shift the origin for any points stored in world coordinates.
     */
    ShiftOrigin(_newOrigin) { }
    Draw(draw) {
        const x1 = this.m_bodyA.GetTransform().p;
        const x2 = this.m_bodyB.GetTransform().p;
        const p1 = this.GetAnchorA(temp.pA);
        const p2 = this.GetAnchorB(temp.pB);
        draw.DrawSegment(x1, p1, b2_draw_1.debugColors.joint6);
        draw.DrawSegment(p1, p2, b2_draw_1.debugColors.joint6);
        draw.DrawSegment(x2, p2, b2_draw_1.debugColors.joint6);
    }
}
exports.b2Joint = b2Joint;


/***/ }),

/***/ "rJoQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2MouseJoint = exports.b2MouseJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert, b2_epsilon } from "../common/b2_common";
const b2_draw_1 = __webpack_require__("EMJU");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const temp = {
    qB: new b2_math_1.b2Rot(),
    lalcB: new b2_math_1.b2Vec2(),
    Cdot: new b2_math_1.b2Vec2(),
    impulse: new b2_math_1.b2Vec2(),
    oldImpulse: new b2_math_1.b2Vec2(),
    pA: new b2_math_1.b2Vec2(),
    pB: new b2_math_1.b2Vec2(),
};
/**
 * Mouse joint definition. This requires a world target point,
 * tuning parameters, and the time step.
 */
class b2MouseJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_mouseJoint);
        /**
         * The initial world target point. This is assumed
         * to coincide with the body anchor initially.
         */
        this.target = new b2_math_1.b2Vec2();
        /**
         * The maximum constraint force that can be exerted
         * to move the candidate body. Usually you will express
         * as some multiple of the weight (multiplier * mass * gravity).
         */
        this.maxForce = 0;
        /** The linear stiffness in N/m */
        this.stiffness = 0;
        /** The linear damping in N*s/m */
        this.damping = 0;
    }
}
exports.b2MouseJointDef = b2MouseJointDef;
/**
 * A mouse joint is used to make a point on a body track a
 * specified world point. This a soft constraint with a maximum
 * force. This allows the constraint to stretch and without
 * applying huge forces.
 * NOTE: this joint is not documented in the manual because it was
 * developed to be used in the testbed. If you want to learn how to
 * use the mouse joint, look at the testbed.
 */
class b2MouseJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b, _c, _d;
        super(def);
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        this.m_targetA = new b2_math_1.b2Vec2();
        this.m_stiffness = 0;
        this.m_damping = 0;
        this.m_beta = 0;
        // Solver shared
        this.m_impulse = new b2_math_1.b2Vec2();
        this.m_maxForce = 0;
        this.m_gamma = 0;
        // Solver temp
        this.m_indexB = 0;
        this.m_rB = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_invMassB = 0;
        this.m_invIB = 0;
        this.m_mass = new b2_math_1.b2Mat22();
        this.m_C = new b2_math_1.b2Vec2();
        this.m_targetA.Copy((_a = def.target) !== null && _a !== void 0 ? _a : b2_math_1.b2Vec2.ZERO);
        b2_math_1.b2Transform.TransposeMultiplyVec2(this.m_bodyB.GetTransform(), this.m_targetA, this.m_localAnchorB);
        this.m_maxForce = (_b = def.maxForce) !== null && _b !== void 0 ? _b : 0;
        this.m_stiffness = (_c = def.stiffness) !== null && _c !== void 0 ? _c : 0;
        this.m_damping = (_d = def.damping) !== null && _d !== void 0 ? _d : 0;
        this.m_beta = 0;
        this.m_gamma = 0;
    }
    SetTarget(target) {
        if (!b2_math_1.b2Vec2.Equals(target, this.m_targetA)) {
            this.m_bodyB.SetAwake(true);
            this.m_targetA.Copy(target);
        }
    }
    GetTarget() {
        return this.m_targetA;
    }
    SetMaxForce(force) {
        this.m_maxForce = force;
    }
    GetMaxForce() {
        return this.m_maxForce;
    }
    SetStiffness(stiffness) {
        this.m_stiffness = stiffness;
    }
    GetStiffness() {
        return this.m_stiffness;
    }
    SetDamping(damping) {
        this.m_damping = damping;
    }
    GetDamping() {
        return this.m_damping;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIB = this.m_bodyB.m_invI;
        const cB = data.positions[this.m_indexB].c;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qB, lalcB } = temp;
        qB.Set(aB);
        const d = this.m_damping;
        const k = this.m_stiffness;
        // magic formulas
        // gamma has units of inverse mass.
        // beta has units of inverse time.
        const h = data.step.dt;
        this.m_gamma = h * (d + h * k);
        if (this.m_gamma !== 0) {
            this.m_gamma = 1 / this.m_gamma;
        }
        this.m_beta = h * k * this.m_gamma;
        // Compute the effective mass matrix.
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        // K    = [(1/m1 + 1/m2) * eye(2) - skew(r1) * invI1 * skew(r1) - skew(r2) * invI2 * skew(r2)]
        //      = [1/m1+1/m2     0    ] + invI1 * [r1.y*r1.y -r1.x*r1.y] + invI2 * [r1.y*r1.y -r1.x*r1.y]
        //        [    0     1/m1+1/m2]           [-r1.x*r1.y r1.x*r1.x]           [-r1.x*r1.y r1.x*r1.x]
        const K = this.m_mass;
        K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
        K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
        K.Inverse();
        b2_math_1.b2Vec2.Add(cB, this.m_rB, this.m_C).Subtract(this.m_targetA);
        this.m_C.Scale(this.m_beta);
        // Cheat with some damping
        wB *= 0.98;
        if (data.step.warmStarting) {
            this.m_impulse.Scale(data.step.dtRatio);
            vB.AddScaled(this.m_invMassB, this.m_impulse);
            wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, this.m_impulse);
        }
        else {
            this.m_impulse.SetZero();
        }
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        // Cdot = v + cross(w, r)
        const { Cdot, impulse, oldImpulse } = temp;
        b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, Cdot);
        b2_math_1.b2Mat22.MultiplyVec2(this.m_mass, b2_math_1.b2Vec2.Add(Cdot, this.m_C, impulse).AddScaled(this.m_gamma, this.m_impulse).Negate(), impulse);
        oldImpulse.Copy(this.m_impulse);
        this.m_impulse.Add(impulse);
        const maxImpulse = data.step.dt * this.m_maxForce;
        if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
            this.m_impulse.Scale(maxImpulse / this.m_impulse.Length());
        }
        b2_math_1.b2Vec2.Subtract(this.m_impulse, oldImpulse, impulse);
        vB.AddScaled(this.m_invMassB, impulse);
        wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, impulse);
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolvePositionConstraints(_data) {
        return true;
    }
    GetAnchorA(out) {
        out.x = this.m_targetA.x;
        out.y = this.m_targetA.y;
        return out;
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        return b2_math_1.b2Vec2.Scale(inv_dt, this.m_impulse, out);
    }
    GetReactionTorque(_inv_dt) {
        return 0;
    }
    ShiftOrigin(newOrigin) {
        this.m_targetA.Subtract(newOrigin);
    }
    Draw(draw) {
        const p1 = this.GetAnchorA(temp.pA);
        const p2 = this.GetAnchorB(temp.pB);
        draw.DrawPoint(p1, 4, b2_draw_1.debugColors.joint7);
        draw.DrawPoint(p2, 4, b2_draw_1.debugColors.joint7);
        draw.DrawSegment(p1, p2, b2_draw_1.debugColors.joint8);
    }
}
exports.b2MouseJoint = b2MouseJoint;


/***/ }),

/***/ "raB0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2PulleyJoint = exports.b2PulleyJointDef = exports.b2_minPulleyLength = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert, b2_epsilon } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_draw_1 = __webpack_require__("EMJU");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
exports.b2_minPulleyLength = 2;
const temp = {
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    p: new b2_math_1.b2Vec2(),
    PA: new b2_math_1.b2Vec2(),
    PB: new b2_math_1.b2Vec2(),
    vpA: new b2_math_1.b2Vec2(),
    vpB: new b2_math_1.b2Vec2(),
    pA: new b2_math_1.b2Vec2(),
    pB: new b2_math_1.b2Vec2(),
};
/**
 * Pulley joint definition. This requires two ground anchors,
 * two dynamic body anchor points, and a pulley ratio.
 */
class b2PulleyJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_pulleyJoint);
        /** The first ground anchor in world coordinates. This point never moves. */
        this.groundAnchorA = new b2_math_1.b2Vec2(-1, 1);
        /** The second ground anchor in world coordinates. This point never moves. */
        this.groundAnchorB = new b2_math_1.b2Vec2(1, 1);
        /** The local anchor point relative to bodyA's origin. */
        this.localAnchorA = new b2_math_1.b2Vec2(-1, 0);
        /** The local anchor point relative to bodyB's origin. */
        this.localAnchorB = new b2_math_1.b2Vec2(1, 0);
        /** The a reference length for the segment attached to bodyA. */
        this.lengthA = 0;
        /** The a reference length for the segment attached to bodyB. */
        this.lengthB = 0;
        /** The pulley ratio, used to simulate a block-and-tackle. */
        this.ratio = 1;
        this.collideConnected = true;
    }
    Initialize(bA, bB, groundA, groundB, anchorA, anchorB, r) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.groundAnchorA.Copy(groundA);
        this.groundAnchorB.Copy(groundB);
        this.bodyA.GetLocalPoint(anchorA, this.localAnchorA);
        this.bodyB.GetLocalPoint(anchorB, this.localAnchorB);
        this.lengthA = b2_math_1.b2Vec2.Distance(anchorA, groundA);
        this.lengthB = b2_math_1.b2Vec2.Distance(anchorB, groundB);
        this.ratio = r;
        // DEBUG: b2Assert(this.ratio > b2_epsilon);
    }
}
exports.b2PulleyJointDef = b2PulleyJointDef;
const defaultGroundAnchorA = new b2_math_1.b2Vec2(-1, 1);
const defaultGroundAnchorB = b2_math_1.b2Vec2.UNITX;
const defaultLocalAnchorA = new b2_math_1.b2Vec2(-1, 0);
const defaultLocalAnchorB = b2_math_1.b2Vec2.UNITX;
/**
 * The pulley joint is connected to two bodies and two fixed ground points.
 * The pulley supports a ratio such that:
 * length1 + ratio * length2 <= constant
 * Yes, the force transmitted is scaled by the ratio.
 * Warning: the pulley joint can get a bit squirrelly by itself. They often
 * work better when combined with prismatic joints. You should also cover the
 * the anchor points with static shapes to prevent one side from going to
 * zero length.
 */
class b2PulleyJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(def);
        this.m_groundAnchorA = new b2_math_1.b2Vec2();
        this.m_groundAnchorB = new b2_math_1.b2Vec2();
        this.m_lengthA = 0;
        this.m_lengthB = 0;
        // Solver shared
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        this.m_constant = 0;
        this.m_ratio = 0;
        this.m_impulse = 0;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_uA = new b2_math_1.b2Vec2();
        this.m_uB = new b2_math_1.b2Vec2();
        this.m_rA = new b2_math_1.b2Vec2();
        this.m_rB = new b2_math_1.b2Vec2();
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_mass = 0;
        this.m_groundAnchorA.Copy((_a = def.groundAnchorA) !== null && _a !== void 0 ? _a : defaultGroundAnchorA);
        this.m_groundAnchorB.Copy((_b = def.groundAnchorB) !== null && _b !== void 0 ? _b : defaultGroundAnchorB);
        this.m_localAnchorA.Copy((_c = def.localAnchorA) !== null && _c !== void 0 ? _c : defaultLocalAnchorA);
        this.m_localAnchorB.Copy((_d = def.localAnchorB) !== null && _d !== void 0 ? _d : defaultLocalAnchorB);
        this.m_lengthA = (_e = def.lengthA) !== null && _e !== void 0 ? _e : 0;
        this.m_lengthB = (_f = def.lengthB) !== null && _f !== void 0 ? _f : 0;
        // DEBUG: b2Assert((def.ratio ?? 1) !== 0);
        this.m_ratio = (_g = def.ratio) !== null && _g !== void 0 ? _g : 1;
        this.m_constant = this.m_lengthA + this.m_ratio * this.m_lengthB;
        this.m_impulse = 0;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = data.positions[this.m_indexA].c;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const cB = data.positions[this.m_indexB].c;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB, lalcA, lalcB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        // Get the pulley axes.
        b2_math_1.b2Vec2.Add(cA, this.m_rA, this.m_uA).Subtract(this.m_groundAnchorA);
        b2_math_1.b2Vec2.Add(cB, this.m_rB, this.m_uB).Subtract(this.m_groundAnchorB);
        const lengthA = this.m_uA.Length();
        const lengthB = this.m_uB.Length();
        if (lengthA > 10 * b2_common_1.b2_linearSlop) {
            this.m_uA.Scale(1 / lengthA);
        }
        else {
            this.m_uA.SetZero();
        }
        if (lengthB > 10 * b2_common_1.b2_linearSlop) {
            this.m_uB.Scale(1 / lengthB);
        }
        else {
            this.m_uB.SetZero();
        }
        // Compute effective mass.
        const ruA = b2_math_1.b2Vec2.Cross(this.m_rA, this.m_uA);
        const ruB = b2_math_1.b2Vec2.Cross(this.m_rB, this.m_uB);
        const mA = this.m_invMassA + this.m_invIA * ruA * ruA;
        const mB = this.m_invMassB + this.m_invIB * ruB * ruB;
        this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
        if (this.m_mass > 0) {
            this.m_mass = 1 / this.m_mass;
        }
        if (data.step.warmStarting) {
            // Scale impulses to support variable time steps.
            this.m_impulse *= data.step.dtRatio;
            // Warm starting.
            const { PA, PB } = temp;
            b2_math_1.b2Vec2.Scale(-this.m_impulse, this.m_uA, PA);
            b2_math_1.b2Vec2.Scale(-this.m_ratio * this.m_impulse, this.m_uB, PB);
            vA.AddScaled(this.m_invMassA, PA);
            wA += this.m_invIA * b2_math_1.b2Vec2.Cross(this.m_rA, PA);
            vB.AddScaled(this.m_invMassB, PB);
            wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, PB);
        }
        else {
            this.m_impulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { PA, PB, vpA, vpB } = temp;
        b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, vpA);
        b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, vpB);
        const Cdot = -b2_math_1.b2Vec2.Dot(this.m_uA, vpA) - this.m_ratio * b2_math_1.b2Vec2.Dot(this.m_uB, vpB);
        const impulse = -this.m_mass * Cdot;
        this.m_impulse += impulse;
        b2_math_1.b2Vec2.Scale(-impulse, this.m_uA, PA);
        b2_math_1.b2Vec2.Scale(-this.m_ratio * impulse, this.m_uB, PB);
        vA.AddScaled(this.m_invMassA, PA);
        wA += this.m_invIA * b2_math_1.b2Vec2.Cross(this.m_rA, PA);
        vB.AddScaled(this.m_invMassB, PB);
        wB += this.m_invIB * b2_math_1.b2Vec2.Cross(this.m_rB, PB);
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolvePositionConstraints(data) {
        const cA = data.positions[this.m_indexA].c;
        let aA = data.positions[this.m_indexA].a;
        const cB = data.positions[this.m_indexB].c;
        let aB = data.positions[this.m_indexB].a;
        const { qA, qB, lalcA, lalcB, PA, PB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        const rA = b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
        const rB = b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        // Get the pulley axes.
        const uA = b2_math_1.b2Vec2.Add(cA, rA, this.m_uA).Subtract(this.m_groundAnchorA);
        const uB = b2_math_1.b2Vec2.Add(cB, rB, this.m_uB).Subtract(this.m_groundAnchorB);
        const lengthA = uA.Length();
        const lengthB = uB.Length();
        if (lengthA > 10 * b2_common_1.b2_linearSlop) {
            uA.Scale(1 / lengthA);
        }
        else {
            uA.SetZero();
        }
        if (lengthB > 10 * b2_common_1.b2_linearSlop) {
            uB.Scale(1 / lengthB);
        }
        else {
            uB.SetZero();
        }
        // Compute effective mass.
        const ruA = b2_math_1.b2Vec2.Cross(rA, uA);
        const ruB = b2_math_1.b2Vec2.Cross(rB, uB);
        const mA = this.m_invMassA + this.m_invIA * ruA * ruA;
        const mB = this.m_invMassB + this.m_invIB * ruB * ruB;
        let mass = mA + this.m_ratio * this.m_ratio * mB;
        if (mass > 0) {
            mass = 1 / mass;
        }
        const C = this.m_constant - lengthA - this.m_ratio * lengthB;
        const linearError = Math.abs(C);
        const impulse = -mass * C;
        b2_math_1.b2Vec2.Scale(-impulse, uA, PA);
        b2_math_1.b2Vec2.Scale(-this.m_ratio * impulse, uB, PB);
        cA.AddScaled(this.m_invMassA, PA);
        aA += this.m_invIA * b2_math_1.b2Vec2.Cross(rA, PA);
        cB.AddScaled(this.m_invMassB, PB);
        aB += this.m_invIB * b2_math_1.b2Vec2.Cross(rB, PB);
        data.positions[this.m_indexA].a = aA;
        data.positions[this.m_indexB].a = aB;
        return linearError < b2_common_1.b2_linearSlop;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        out.x = inv_dt * this.m_impulse * this.m_uB.x;
        out.y = inv_dt * this.m_impulse * this.m_uB.y;
        return out;
    }
    GetReactionTorque(_inv_dt) {
        return 0;
    }
    GetGroundAnchorA() {
        return this.m_groundAnchorA;
    }
    GetGroundAnchorB() {
        return this.m_groundAnchorB;
    }
    GetLengthA() {
        return this.m_lengthA;
    }
    GetLengthB() {
        return this.m_lengthB;
    }
    GetRatio() {
        return this.m_ratio;
    }
    GetCurrentLengthA() {
        const p = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, temp.p);
        const s = this.m_groundAnchorA;
        return b2_math_1.b2Vec2.Distance(p, s);
    }
    GetCurrentLengthB() {
        const p = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, temp.p);
        const s = this.m_groundAnchorB;
        return b2_math_1.b2Vec2.Distance(p, s);
    }
    ShiftOrigin(newOrigin) {
        this.m_groundAnchorA.Subtract(newOrigin);
        this.m_groundAnchorB.Subtract(newOrigin);
    }
    Draw(draw) {
        const p1 = this.GetAnchorA(temp.pA);
        const p2 = this.GetAnchorB(temp.pB);
        const s1 = this.GetGroundAnchorA();
        const s2 = this.GetGroundAnchorB();
        draw.DrawSegment(s1, p1, b2_draw_1.debugColors.joint6);
        draw.DrawSegment(s2, p2, b2_draw_1.debugColors.joint6);
        draw.DrawSegment(s1, s2, b2_draw_1.debugColors.joint6);
    }
}
exports.b2PulleyJoint = b2PulleyJoint;


/***/ }),

/***/ "rbX7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawCenterOfMasses = exports.DrawAABBs = exports.DrawPairs = exports.DrawJoints = exports.DrawShapes = exports.GetShapeColor = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_math_1 = __webpack_require__("xKh6");
const b2_draw_1 = __webpack_require__("EMJU");
const b2_body_1 = __webpack_require__("4xZg");
const b2_common_1 = __webpack_require__("UJxA");
const temp = {
    cA: new b2_math_1.b2Vec2(),
    cB: new b2_math_1.b2Vec2(),
    vs: (0, b2_common_1.b2MakeArray)(4, b2_math_1.b2Vec2),
    xf: new b2_math_1.b2Transform(),
};
function GetShapeColor(b) {
    if (b.GetType() === b2_body_1.b2BodyType.b2_dynamicBody && b.m_mass === 0) {
        return b2_draw_1.debugColors.badBody;
    }
    if (!b.IsEnabled()) {
        return b2_draw_1.debugColors.disabledBody;
    }
    if (b.GetType() === b2_body_1.b2BodyType.b2_staticBody) {
        return b2_draw_1.debugColors.staticBody;
    }
    if (b.GetType() === b2_body_1.b2BodyType.b2_kinematicBody) {
        return b2_draw_1.debugColors.kinematicBody;
    }
    if (!b.IsAwake()) {
        return b2_draw_1.debugColors.sleepingBody;
    }
    return b2_draw_1.debugColors.body;
}
exports.GetShapeColor = GetShapeColor;
function DrawShapes(draw, world) {
    for (let b = world.GetBodyList(); b; b = b.m_next) {
        const xf = b.m_xf;
        draw.PushTransform(xf);
        for (let f = b.GetFixtureList(); f; f = f.m_next) {
            f.GetShape().Draw(draw, GetShapeColor(b));
        }
        draw.PopTransform(xf);
    }
}
exports.DrawShapes = DrawShapes;
function DrawJoints(draw, world) {
    for (let j = world.GetJointList(); j; j = j.m_next) {
        j.Draw(draw);
    }
}
exports.DrawJoints = DrawJoints;
function DrawPairs(draw, world) {
    for (let contact = world.GetContactList(); contact; contact = contact.m_next) {
        const fixtureA = contact.GetFixtureA();
        const fixtureB = contact.GetFixtureB();
        const indexA = contact.GetChildIndexA();
        const indexB = contact.GetChildIndexB();
        const cA = fixtureA.GetAABB(indexA).GetCenter(temp.cA);
        const cB = fixtureB.GetAABB(indexB).GetCenter(temp.cB);
        draw.DrawSegment(cA, cB, b2_draw_1.debugColors.pair);
    }
}
exports.DrawPairs = DrawPairs;
function DrawAABBs(draw, world) {
    const { vs } = temp;
    for (let b = world.GetBodyList(); b; b = b.m_next) {
        if (!b.IsEnabled()) {
            continue;
        }
        for (let f = b.GetFixtureList(); f; f = f.m_next) {
            for (let i = 0; i < f.m_proxyCount; ++i) {
                const proxy = f.m_proxies[i];
                const { aabb } = proxy.treeNode;
                vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
                vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
                vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
                vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
                draw.DrawPolygon(vs, 4, b2_draw_1.debugColors.aabb);
            }
        }
    }
}
exports.DrawAABBs = DrawAABBs;
function DrawCenterOfMasses(draw, world) {
    const { xf } = temp;
    for (let b = world.GetBodyList(); b; b = b.m_next) {
        xf.q.Copy(b.m_xf.q);
        xf.p.Copy(b.GetWorldCenter());
        draw.DrawTransform(xf);
    }
}
exports.DrawCenterOfMasses = DrawCenterOfMasses;


/***/ }),

/***/ "rwQ+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2RevoluteJoint = exports.b2RevoluteJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const b2_common_1 = __webpack_require__("UJxA");
const b2_draw_1 = __webpack_require__("EMJU");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const temp = {
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    P: new b2_math_1.b2Vec2(),
    Cdot: new b2_math_1.b2Vec2(),
    C: new b2_math_1.b2Vec2(),
    impulse: new b2_math_1.b2Vec2(),
    p2: new b2_math_1.b2Vec2(),
    r: new b2_math_1.b2Vec2(),
    pA: new b2_math_1.b2Vec2(),
    pB: new b2_math_1.b2Vec2(),
    rlo: new b2_math_1.b2Vec2(),
    rhi: new b2_math_1.b2Vec2(),
};
/**
 * Revolute joint definition. This requires defining an anchor point where the
 * bodies are joined. The definition uses local anchor points so that the
 * initial configuration can violate the constraint slightly. You also need to
 * specify the initial relative angle for joint limits. This helps when saving
 * and loading a game.
 * The local anchor points are measured from the body's origin
 * rather than the center of mass because:
 * 1. you might not know where the center of mass will be.
 * 2. if you add/remove shapes from a body and recompute the mass,
 * the joints will be broken.
 */
class b2RevoluteJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_revoluteJoint);
        /** The local anchor point relative to bodyA's origin. */
        this.localAnchorA = new b2_math_1.b2Vec2();
        /** The local anchor point relative to bodyB's origin. */
        this.localAnchorB = new b2_math_1.b2Vec2();
        /** The bodyB angle minus bodyA angle in the reference state (radians). */
        this.referenceAngle = 0;
        /** A flag to enable joint limits. */
        this.enableLimit = false;
        /** The lower angle for the joint limit (radians). */
        this.lowerAngle = 0;
        /** The upper angle for the joint limit (radians). */
        this.upperAngle = 0;
        /** A flag to enable the joint motor. */
        this.enableMotor = false;
        /** The desired motor speed. Usually in radians per second. */
        this.motorSpeed = 0;
        /**
         * The maximum motor torque used to achieve the desired motor speed.
         * Usually in N-m.
         */
        this.maxMotorTorque = 0;
    }
    Initialize(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
        this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
    }
}
exports.b2RevoluteJointDef = b2RevoluteJointDef;
/**
 * A revolute joint constrains two bodies to share a common point while they
 * are free to rotate about the point. The relative rotation about the shared
 * point is the joint angle. You can limit the relative rotation with
 * a joint limit that specifies a lower and upper angle. You can use a motor
 * to drive the relative rotation about the shared point. A maximum motor torque
 * is provided so that infinite forces are not generated.
 */
class b2RevoluteJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        super(def);
        // Solver shared
        /** @internal protected */
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        /** @internal protected */
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        this.m_impulse = new b2_math_1.b2Vec2();
        this.m_motorImpulse = 0;
        this.m_lowerImpulse = 0;
        this.m_upperImpulse = 0;
        this.m_enableMotor = false;
        this.m_maxMotorTorque = 0;
        this.m_motorSpeed = 0;
        this.m_enableLimit = false;
        /** @internal protected */
        this.m_referenceAngle = 0;
        this.m_lowerAngle = 0;
        this.m_upperAngle = 0;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_rA = new b2_math_1.b2Vec2();
        this.m_rB = new b2_math_1.b2Vec2();
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_K = new b2_math_1.b2Mat22();
        this.m_angle = 0;
        this.m_axialMass = 0;
        this.m_localAnchorA.Copy((_a = def.localAnchorA) !== null && _a !== void 0 ? _a : b2_math_1.b2Vec2.ZERO);
        this.m_localAnchorB.Copy((_b = def.localAnchorB) !== null && _b !== void 0 ? _b : b2_math_1.b2Vec2.ZERO);
        this.m_referenceAngle = (_c = def.referenceAngle) !== null && _c !== void 0 ? _c : 0;
        this.m_impulse.SetZero();
        this.m_lowerAngle = (_d = def.lowerAngle) !== null && _d !== void 0 ? _d : 0;
        this.m_upperAngle = (_e = def.upperAngle) !== null && _e !== void 0 ? _e : 0;
        this.m_maxMotorTorque = (_f = def.maxMotorTorque) !== null && _f !== void 0 ? _f : 0;
        this.m_motorSpeed = (_g = def.motorSpeed) !== null && _g !== void 0 ? _g : 0;
        this.m_enableLimit = (_h = def.enableLimit) !== null && _h !== void 0 ? _h : false;
        this.m_enableMotor = (_j = def.enableMotor) !== null && _j !== void 0 ? _j : false;
    }
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB, lalcA, lalcB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
        // J = [-I -r1_skew I r2_skew]
        // r_skew = [-ry; rx]
        // Matlab
        // K = [ mA+r1y^2*iA+mB+r2y^2*iB,  -r1y*iA*r1x-r2y*iB*r2x]
        //     [  -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB]
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        this.m_K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
        this.m_K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
        this.m_K.ex.y = this.m_K.ey.x;
        this.m_K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
        this.m_axialMass = iA + iB;
        let fixedRotation;
        if (this.m_axialMass > 0) {
            this.m_axialMass = 1 / this.m_axialMass;
            fixedRotation = false;
        }
        else {
            fixedRotation = true;
        }
        this.m_angle = aB - aA - this.m_referenceAngle;
        if (this.m_enableLimit === false || fixedRotation) {
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        if (this.m_enableMotor === false || fixedRotation) {
            this.m_motorImpulse = 0;
        }
        if (data.step.warmStarting) {
            // Scale impulses to support a variable time step.
            this.m_impulse.Scale(data.step.dtRatio);
            this.m_motorImpulse *= data.step.dtRatio;
            this.m_lowerImpulse *= data.step.dtRatio;
            this.m_upperImpulse *= data.step.dtRatio;
            const axialImpulse = this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse;
            const P = temp.P.Set(this.m_impulse.x, this.m_impulse.y);
            vA.SubtractScaled(mA, P);
            wA -= iA * (b2_math_1.b2Vec2.Cross(this.m_rA, P) + axialImpulse);
            vB.AddScaled(mB, P);
            wB += iB * (b2_math_1.b2Vec2.Cross(this.m_rB, P) + axialImpulse);
        }
        else {
            this.m_impulse.SetZero();
            this.m_motorImpulse = 0;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const fixedRotation = iA + iB === 0;
        // Solve motor constraint.
        if (this.m_enableMotor && !fixedRotation) {
            const Cdot = wB - wA - this.m_motorSpeed;
            let impulse = -this.m_axialMass * Cdot;
            const oldImpulse = this.m_motorImpulse;
            const maxImpulse = data.step.dt * this.m_maxMotorTorque;
            this.m_motorImpulse = (0, b2_math_1.b2Clamp)(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        // Solve limit constraint.
        if (this.m_enableLimit && !fixedRotation) {
            // Lower limit
            {
                const C = this.m_angle - this.m_lowerAngle;
                const Cdot = wB - wA;
                let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0) * data.step.inv_dt);
                const oldImpulse = this.m_lowerImpulse;
                this.m_lowerImpulse = Math.max(this.m_lowerImpulse + impulse, 0);
                impulse = this.m_lowerImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Upper limit
            // Note: signs are flipped to keep C positive when the constraint is satisfied.
            // This also keeps the impulse positive when the limit is active.
            {
                const C = this.m_upperAngle - this.m_angle;
                const Cdot = wA - wB;
                let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0) * data.step.inv_dt);
                const oldImpulse = this.m_upperImpulse;
                this.m_upperImpulse = Math.max(this.m_upperImpulse + impulse, 0);
                impulse = this.m_upperImpulse - oldImpulse;
                wA += iA * impulse;
                wB -= iB * impulse;
            }
        }
        // Solve point-to-point constraint
        {
            const { Cdot, impulse } = temp;
            b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, b2_math_1.b2Vec2.s_t1), Cdot);
            this.m_K.Solve(-Cdot.x, -Cdot.y, impulse);
            this.m_impulse.x += impulse.x;
            this.m_impulse.y += impulse.y;
            vA.SubtractScaled(mA, impulse);
            wA -= iA * b2_math_1.b2Vec2.Cross(this.m_rA, impulse);
            vB.AddScaled(mB, impulse);
            wB += iB * b2_math_1.b2Vec2.Cross(this.m_rB, impulse);
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    SolvePositionConstraints(data) {
        const cA = data.positions[this.m_indexA].c;
        let aA = data.positions[this.m_indexA].a;
        const cB = data.positions[this.m_indexB].c;
        let aB = data.positions[this.m_indexB].a;
        const { qA, qB, lalcA, lalcB, impulse } = temp;
        qA.Set(aA);
        qB.Set(aB);
        let angularError = 0;
        let positionError = 0;
        const fixedRotation = this.m_invIA + this.m_invIB === 0;
        // Solve angular limit constraint
        if (this.m_enableLimit && !fixedRotation) {
            const angle = aB - aA - this.m_referenceAngle;
            let C = 0;
            if (Math.abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2_common_1.b2_angularSlop) {
                // Prevent large angular corrections
                C = (0, b2_math_1.b2Clamp)(angle - this.m_lowerAngle, -b2_common_1.b2_maxAngularCorrection, b2_common_1.b2_maxAngularCorrection);
            }
            else if (angle <= this.m_lowerAngle) {
                // Prevent large angular corrections and allow some slop.
                C = (0, b2_math_1.b2Clamp)(angle - this.m_lowerAngle + b2_common_1.b2_angularSlop, -b2_common_1.b2_maxAngularCorrection, 0);
            }
            else if (angle >= this.m_upperAngle) {
                // Prevent large angular corrections and allow some slop.
                C = (0, b2_math_1.b2Clamp)(angle - this.m_upperAngle - b2_common_1.b2_angularSlop, 0, b2_common_1.b2_maxAngularCorrection);
            }
            const limitImpulse = -this.m_axialMass * C;
            aA -= this.m_invIA * limitImpulse;
            aB += this.m_invIB * limitImpulse;
            angularError = Math.abs(C);
        }
        // Solve point-to-point constraint.
        {
            qA.Set(aA);
            qB.Set(aB);
            const rA = b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), this.m_rA);
            const rB = b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), this.m_rB);
            const C = b2_math_1.b2Vec2.Add(cB, rB, temp.C).Subtract(cA).Subtract(rA);
            positionError = C.Length();
            const mA = this.m_invMassA;
            const mB = this.m_invMassB;
            const iA = this.m_invIA;
            const iB = this.m_invIB;
            const K = this.m_K;
            K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
            K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
            K.Solve(C.x, C.y, impulse).Negate();
            cA.SubtractScaled(mA, impulse);
            aA -= iA * b2_math_1.b2Vec2.Cross(rA, impulse);
            cB.AddScaled(mB, impulse);
            aB += iB * b2_math_1.b2Vec2.Cross(rB, impulse);
        }
        data.positions[this.m_indexA].a = aA;
        data.positions[this.m_indexB].a = aB;
        return positionError <= b2_common_1.b2_linearSlop && angularError <= b2_common_1.b2_angularSlop;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        out.x = inv_dt * this.m_impulse.x;
        out.y = inv_dt * this.m_impulse.y;
        return out;
    }
    GetReactionTorque(inv_dt) {
        return inv_dt * (this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse);
    }
    GetLocalAnchorA() {
        return this.m_localAnchorA;
    }
    GetLocalAnchorB() {
        return this.m_localAnchorB;
    }
    GetReferenceAngle() {
        return this.m_referenceAngle;
    }
    GetJointAngle() {
        return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
    }
    GetJointSpeed() {
        return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
    }
    IsMotorEnabled() {
        return this.m_enableMotor;
    }
    EnableMotor(flag) {
        if (flag !== this.m_enableMotor) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableMotor = flag;
        }
        return flag;
    }
    GetMotorTorque(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    GetMotorSpeed() {
        return this.m_motorSpeed;
    }
    SetMaxMotorTorque(torque) {
        if (torque !== this.m_maxMotorTorque) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_maxMotorTorque = torque;
        }
    }
    GetMaxMotorTorque() {
        return this.m_maxMotorTorque;
    }
    IsLimitEnabled() {
        return this.m_enableLimit;
    }
    EnableLimit(flag) {
        if (flag !== this.m_enableLimit) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableLimit = flag;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        return flag;
    }
    GetLowerLimit() {
        return this.m_lowerAngle;
    }
    GetUpperLimit() {
        return this.m_upperAngle;
    }
    SetLimits(lower, upper) {
        if (lower !== this.m_lowerAngle || upper !== this.m_upperAngle) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
            this.m_lowerAngle = lower;
            this.m_upperAngle = upper;
        }
    }
    SetMotorSpeed(speed) {
        if (speed !== this.m_motorSpeed) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = speed;
        }
        return speed;
    }
    Draw(draw) {
        const { p2, r, pA, pB } = temp;
        const xfA = this.m_bodyA.GetTransform();
        const xfB = this.m_bodyB.GetTransform();
        b2_math_1.b2Transform.MultiplyVec2(xfA, this.m_localAnchorA, pA);
        b2_math_1.b2Transform.MultiplyVec2(xfB, this.m_localAnchorB, pB);
        draw.DrawPoint(pA, 5, b2_draw_1.debugColors.joint4);
        draw.DrawPoint(pB, 5, b2_draw_1.debugColors.joint5);
        const aA = this.m_bodyA.GetAngle();
        const aB = this.m_bodyB.GetAngle();
        const angle = aB - aA - this.m_referenceAngle;
        const L = 0.5;
        r.Set(Math.cos(angle), Math.sin(angle)).Scale(L);
        draw.DrawSegment(pB, b2_math_1.b2Vec2.Add(pB, r, p2), b2_draw_1.debugColors.joint1);
        draw.DrawCircle(pB, L, b2_draw_1.debugColors.joint1);
        if (this.m_enableLimit) {
            const { rlo, rhi } = temp;
            rlo.Set(Math.cos(this.m_lowerAngle), Math.sin(this.m_lowerAngle)).Scale(L);
            rhi.Set(Math.cos(this.m_upperAngle), Math.sin(this.m_upperAngle)).Scale(L);
            draw.DrawSegment(pB, b2_math_1.b2Vec2.Add(pB, rlo, p2), b2_draw_1.debugColors.joint2);
            draw.DrawSegment(pB, b2_math_1.b2Vec2.Add(pB, rhi, p2), b2_draw_1.debugColors.joint3);
        }
        draw.DrawSegment(xfA.p, pA, b2_draw_1.debugColors.joint6);
        draw.DrawSegment(pA, pB, b2_draw_1.debugColors.joint6);
        draw.DrawSegment(xfB.p, pB, b2_draw_1.debugColors.joint6);
    }
}
exports.b2RevoluteJoint = b2RevoluteJoint;


/***/ }),

/***/ "stnl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2EdgeAndCircleContact = void 0;
const b2_collide_edge_1 = __webpack_require__("W84h");
const b2_contact_1 = __webpack_require__("PzZv");
/** @internal */
class b2EdgeAndCircleContact extends b2_contact_1.b2Contact {
    Evaluate(manifold, xfA, xfB) {
        (0, b2_collide_edge_1.b2CollideEdgeAndCircle)(manifold, this.GetShapeA(), xfA, this.GetShapeB(), xfB);
    }
}
exports.b2EdgeAndCircleContact = b2EdgeAndCircleContact;


/***/ }),

/***/ "tjUo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2GetBlockSolve = exports.b2SetBlockSolve = exports.b2World = exports.b2BodyType = exports.b2Body = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
__exportStar(__webpack_require__("UJxA"), exports);
__exportStar(__webpack_require__("bg0S"), exports);
__exportStar(__webpack_require__("xKh6"), exports);
__exportStar(__webpack_require__("EMJU"), exports);
__exportStar(__webpack_require__("rbX7"), exports);
__exportStar(__webpack_require__("783U"), exports);
__exportStar(__webpack_require__("TzyG"), exports);
__exportStar(__webpack_require__("h2hE"), exports);
__exportStar(__webpack_require__("2fSU"), exports);
__exportStar(__webpack_require__("fMel"), exports);
__exportStar(__webpack_require__("mCV2"), exports);
__exportStar(__webpack_require__("KFpu"), exports);
__exportStar(__webpack_require__("VFH1"), exports);
__exportStar(__webpack_require__("EKx6"), exports);
__exportStar(__webpack_require__("W84h"), exports);
__exportStar(__webpack_require__("UjSx"), exports);
__exportStar(__webpack_require__("iY3A"), exports);
__exportStar(__webpack_require__("LhsO"), exports);
__exportStar(__webpack_require__("5Zru"), exports);
__exportStar(__webpack_require__("Qc5p"), exports);
__exportStar(__webpack_require__("By+T"), exports);
var b2_body_1 = __webpack_require__("4xZg");
Object.defineProperty(exports, "b2Body", { enumerable: true, get: function () { return b2_body_1.b2Body; } });
Object.defineProperty(exports, "b2BodyType", { enumerable: true, get: function () { return b2_body_1.b2BodyType; } });
var b2_world_1 = __webpack_require__("jSyf");
Object.defineProperty(exports, "b2World", { enumerable: true, get: function () { return b2_world_1.b2World; } });
__exportStar(__webpack_require__("FlG6"), exports);
__exportStar(__webpack_require__("5Pwz"), exports);
__exportStar(__webpack_require__("Nx71"), exports);
__exportStar(__webpack_require__("O7Yf"), exports);
__exportStar(__webpack_require__("PzZv"), exports);
__exportStar(__webpack_require__("dvbM"), exports);
var b2_contact_solver_1 = __webpack_require__("fn+a");
Object.defineProperty(exports, "b2SetBlockSolve", { enumerable: true, get: function () { return b2_contact_solver_1.b2SetBlockSolve; } });
Object.defineProperty(exports, "b2GetBlockSolve", { enumerable: true, get: function () { return b2_contact_solver_1.b2GetBlockSolve; } });
__exportStar(__webpack_require__("qywJ"), exports);
__exportStar(__webpack_require__("pLoN"), exports);
__exportStar(__webpack_require__("8OaJ"), exports);
__exportStar(__webpack_require__("1cpr"), exports);
__exportStar(__webpack_require__("mQGX"), exports);
__exportStar(__webpack_require__("wYcr"), exports);
__exportStar(__webpack_require__("rJoQ"), exports);
__exportStar(__webpack_require__("8mly"), exports);
__exportStar(__webpack_require__("raB0"), exports);
__exportStar(__webpack_require__("rwQ+"), exports);
__exportStar(__webpack_require__("oIQG"), exports);
__exportStar(__webpack_require__("u8fK"), exports);
__exportStar(__webpack_require__("BdjZ"), exports);


/***/ }),

/***/ "u8fK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2WheelJoint = exports.b2WheelJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_common_1 = __webpack_require__("UJxA");
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
const b2_draw_1 = __webpack_require__("EMJU");
const temp = {
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    lalcA: new b2_math_1.b2Vec2(),
    lalcB: new b2_math_1.b2Vec2(),
    rA: new b2_math_1.b2Vec2(),
    rB: new b2_math_1.b2Vec2(),
    d: new b2_math_1.b2Vec2(),
    P: new b2_math_1.b2Vec2(),
    ay: new b2_math_1.b2Vec2(),
    pA: new b2_math_1.b2Vec2(),
    pB: new b2_math_1.b2Vec2(),
    axis: new b2_math_1.b2Vec2(),
    Draw: {
        p1: new b2_math_1.b2Vec2(),
        p2: new b2_math_1.b2Vec2(),
        pA: new b2_math_1.b2Vec2(),
        pB: new b2_math_1.b2Vec2(),
        axis: new b2_math_1.b2Vec2(),
        lower: new b2_math_1.b2Vec2(),
        upper: new b2_math_1.b2Vec2(),
        perp: new b2_math_1.b2Vec2(),
    },
};
/**
 * Wheel joint definition. This requires defining a line of
 * motion using an axis and an anchor point. The definition uses local
 * anchor points and a local axis so that the initial configuration
 * can violate the constraint slightly. The joint translation is zero
 * when the local anchor points coincide in world space. Using local
 * anchors and a local axis helps when saving and loading a game.
 */
class b2WheelJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_wheelJoint);
        /** The local anchor point relative to bodyA's origin. */
        this.localAnchorA = new b2_math_1.b2Vec2();
        /** The local anchor point relative to bodyB's origin. */
        this.localAnchorB = new b2_math_1.b2Vec2();
        /** The local translation axis in bodyA. */
        this.localAxisA = new b2_math_1.b2Vec2(1, 0);
        /** Enable/disable the joint limit. */
        this.enableLimit = false;
        /** The lower translation limit, usually in meters. */
        this.lowerTranslation = 0;
        /** The upper translation limit, usually in meters. */
        this.upperTranslation = 0;
        /** Enable/disable the joint motor. */
        this.enableMotor = false;
        /** The maximum motor torque, usually in N-m. */
        this.maxMotorTorque = 0;
        /** The desired motor speed in radians per second. */
        this.motorSpeed = 0;
        /** Suspension stiffness. Typically in units N/m. */
        this.stiffness = 0;
        /** Suspension damping. Typically in units of N*s/m. */
        this.damping = 0;
    }
    Initialize(bA, bB, anchor, axis) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
        this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
        this.bodyA.GetLocalVector(axis, this.localAxisA);
    }
}
exports.b2WheelJointDef = b2WheelJointDef;
/**
 * A wheel joint. This joint provides two degrees of freedom: translation
 * along an axis fixed in bodyA and rotation in the plane. In other words, it is a point to
 * line constraint with a rotational motor and a linear spring/damper. The spring/damper is
 * initialized upon creation. This joint is designed for vehicle suspensions.
 */
class b2WheelJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        super(def);
        this.m_localAnchorA = new b2_math_1.b2Vec2();
        this.m_localAnchorB = new b2_math_1.b2Vec2();
        this.m_localXAxisA = new b2_math_1.b2Vec2();
        this.m_localYAxisA = new b2_math_1.b2Vec2();
        this.m_impulse = 0;
        this.m_motorImpulse = 0;
        this.m_springImpulse = 0;
        this.m_lowerImpulse = 0;
        this.m_upperImpulse = 0;
        this.m_translation = 0;
        this.m_lowerTranslation = 0;
        this.m_upperTranslation = 0;
        this.m_maxMotorTorque = 0;
        this.m_motorSpeed = 0;
        this.m_enableLimit = false;
        this.m_enableMotor = false;
        this.m_stiffness = 0;
        this.m_damping = 0;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_ax = new b2_math_1.b2Vec2();
        this.m_ay = new b2_math_1.b2Vec2();
        this.m_sAx = 0;
        this.m_sBx = 0;
        this.m_sAy = 0;
        this.m_sBy = 0;
        this.m_mass = 0;
        this.m_motorMass = 0;
        this.m_axialMass = 0;
        this.m_springMass = 0;
        this.m_bias = 0;
        this.m_gamma = 0;
        this.m_localAnchorA.Copy((_a = def.localAnchorA) !== null && _a !== void 0 ? _a : b2_math_1.b2Vec2.ZERO);
        this.m_localAnchorB.Copy((_b = def.localAnchorB) !== null && _b !== void 0 ? _b : b2_math_1.b2Vec2.ZERO);
        this.m_localXAxisA.Copy((_c = def.localAxisA) !== null && _c !== void 0 ? _c : b2_math_1.b2Vec2.UNITX);
        b2_math_1.b2Vec2.CrossOneVec2(this.m_localXAxisA, this.m_localYAxisA);
        this.m_lowerTranslation = (_d = def.lowerTranslation) !== null && _d !== void 0 ? _d : 0;
        this.m_upperTranslation = (_e = def.upperTranslation) !== null && _e !== void 0 ? _e : 0;
        this.m_enableLimit = (_f = def.enableLimit) !== null && _f !== void 0 ? _f : false;
        this.m_maxMotorTorque = (_g = def.maxMotorTorque) !== null && _g !== void 0 ? _g : 0;
        this.m_motorSpeed = (_h = def.motorSpeed) !== null && _h !== void 0 ? _h : 0;
        this.m_enableMotor = (_j = def.enableMotor) !== null && _j !== void 0 ? _j : false;
        this.m_ax.SetZero();
        this.m_ay.SetZero();
        this.m_stiffness = (_k = def.stiffness) !== null && _k !== void 0 ? _k : 0;
        this.m_damping = (_l = def.damping) !== null && _l !== void 0 ? _l : 0;
    }
    GetMotorSpeed() {
        return this.m_motorSpeed;
    }
    GetMaxMotorTorque() {
        return this.m_maxMotorTorque;
    }
    SetStiffness(stiffness) {
        this.m_stiffness = stiffness;
    }
    GetStiffness() {
        return this.m_stiffness;
    }
    SetDamping(damping) {
        this.m_damping = damping;
    }
    GetDamping() {
        return this.m_damping;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const cA = data.positions[this.m_indexA].c;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const cB = data.positions[this.m_indexB].c;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB, lalcA, lalcB, rA, rB, d } = temp;
        qA.Set(aA);
        qB.Set(aB);
        // Compute the effective masses.
        b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), rA);
        b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), rB);
        b2_math_1.b2Vec2.Add(cB, rB, d).Subtract(cA).Subtract(rA);
        // Point to line constraint
        b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localYAxisA, this.m_ay);
        this.m_sAy = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), this.m_ay);
        this.m_sBy = b2_math_1.b2Vec2.Cross(rB, this.m_ay);
        this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;
        if (this.m_mass > 0) {
            this.m_mass = 1 / this.m_mass;
        }
        // Spring constraint
        b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localXAxisA, this.m_ax);
        this.m_sAx = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), this.m_ax);
        this.m_sBx = b2_math_1.b2Vec2.Cross(rB, this.m_ax);
        const invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
        if (invMass > 0) {
            this.m_axialMass = 1 / invMass;
        }
        else {
            this.m_axialMass = 0;
        }
        this.m_springMass = 0;
        this.m_bias = 0;
        this.m_gamma = 0;
        if (this.m_stiffness > 0 && invMass > 0) {
            this.m_springMass = 1 / invMass;
            const C = b2_math_1.b2Vec2.Dot(d, this.m_ax);
            // magic formulas
            const h = data.step.dt;
            this.m_gamma = h * (this.m_damping + h * this.m_stiffness);
            if (this.m_gamma > 0) {
                this.m_gamma = 1 / this.m_gamma;
            }
            this.m_bias = C * h * this.m_stiffness * this.m_gamma;
            this.m_springMass = invMass + this.m_gamma;
            if (this.m_springMass > 0) {
                this.m_springMass = 1 / this.m_springMass;
            }
        }
        else {
            this.m_springImpulse = 0;
        }
        if (this.m_enableLimit) {
            this.m_translation = b2_math_1.b2Vec2.Dot(this.m_ax, d);
        }
        else {
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        if (this.m_enableMotor) {
            this.m_motorMass = iA + iB;
            if (this.m_motorMass > 0) {
                this.m_motorMass = 1 / this.m_motorMass;
            }
        }
        else {
            this.m_motorMass = 0;
            this.m_motorImpulse = 0;
        }
        if (data.step.warmStarting) {
            // Account for variable time step.
            this.m_impulse *= data.step.dtRatio;
            this.m_springImpulse *= data.step.dtRatio;
            this.m_motorImpulse *= data.step.dtRatio;
            const axialImpulse = this.m_springImpulse + this.m_lowerImpulse - this.m_upperImpulse;
            const { P } = temp;
            b2_math_1.b2Vec2.Scale(this.m_impulse, this.m_ay, P).AddScaled(axialImpulse, this.m_ax);
            const LA = this.m_impulse * this.m_sAy + axialImpulse * this.m_sAx + this.m_motorImpulse;
            const LB = this.m_impulse * this.m_sBy + axialImpulse * this.m_sBx + this.m_motorImpulse;
            vA.SubtractScaled(this.m_invMassA, P);
            wA -= this.m_invIA * LA;
            vB.AddScaled(this.m_invMassB, P);
            wB += this.m_invIB * LB;
        }
        else {
            this.m_impulse = 0;
            this.m_springImpulse = 0;
            this.m_motorImpulse = 0;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { P } = temp;
        // Solve spring constraint
        {
            const Cdot = b2_math_1.b2Vec2.Dot(this.m_ax, b2_math_1.b2Vec2.Subtract(vB, vA, b2_math_1.b2Vec2.s_t0)) + this.m_sBx * wB - this.m_sAx * wA;
            const impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
            this.m_springImpulse += impulse;
            b2_math_1.b2Vec2.Scale(impulse, this.m_ax, P);
            const LA = impulse * this.m_sAx;
            const LB = impulse * this.m_sBx;
            vA.SubtractScaled(mA, P);
            wA -= iA * LA;
            vB.AddScaled(mB, P);
            wB += iB * LB;
        }
        // Solve rotational motor constraint
        {
            const Cdot = wB - wA - this.m_motorSpeed;
            let impulse = -this.m_motorMass * Cdot;
            const oldImpulse = this.m_motorImpulse;
            const maxImpulse = data.step.dt * this.m_maxMotorTorque;
            this.m_motorImpulse = (0, b2_math_1.b2Clamp)(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        if (this.m_enableLimit) {
            // Lower limit
            {
                const C = this.m_translation - this.m_lowerTranslation;
                const Cdot = b2_math_1.b2Vec2.Dot(this.m_ax, b2_math_1.b2Vec2.Subtract(vB, vA, b2_math_1.b2Vec2.s_t0)) + this.m_sBx * wB - this.m_sAx * wA;
                let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0) * data.step.inv_dt);
                const oldImpulse = this.m_lowerImpulse;
                this.m_lowerImpulse = Math.max(this.m_lowerImpulse + impulse, 0);
                impulse = this.m_lowerImpulse - oldImpulse;
                b2_math_1.b2Vec2.Scale(impulse, this.m_ax, P);
                const LA = impulse * this.m_sAx;
                const LB = impulse * this.m_sBx;
                vA.SubtractScaled(mA, P);
                wA -= iA * LA;
                vB.AddScaled(mB, P);
                wB += iB * LB;
            }
            // Upper limit
            // Note: signs are flipped to keep C positive when the constraint is satisfied.
            // This also keeps the impulse positive when the limit is active.
            {
                const C = this.m_upperTranslation - this.m_translation;
                const Cdot = b2_math_1.b2Vec2.Dot(this.m_ax, b2_math_1.b2Vec2.Subtract(vA, vB, b2_math_1.b2Vec2.s_t0)) + this.m_sAx * wA - this.m_sBx * wB;
                let impulse = -this.m_axialMass * (Cdot + Math.max(C, 0) * data.step.inv_dt);
                const oldImpulse = this.m_upperImpulse;
                this.m_upperImpulse = Math.max(this.m_upperImpulse + impulse, 0);
                impulse = this.m_upperImpulse - oldImpulse;
                b2_math_1.b2Vec2.Scale(impulse, this.m_ax, P);
                const LA = impulse * this.m_sAx;
                const LB = impulse * this.m_sBx;
                vA.AddScaled(mA, P);
                wA += iA * LA;
                vB.SubtractScaled(mB, P);
                wB -= iB * LB;
            }
        }
        // Solve point to line constraint
        {
            const Cdot = b2_math_1.b2Vec2.Dot(this.m_ay, b2_math_1.b2Vec2.Subtract(vB, vA, b2_math_1.b2Vec2.s_t0)) + this.m_sBy * wB - this.m_sAy * wA;
            const impulse = -this.m_mass * Cdot;
            this.m_impulse += impulse;
            b2_math_1.b2Vec2.Scale(impulse, this.m_ay, P);
            const LA = impulse * this.m_sAy;
            const LB = impulse * this.m_sBy;
            vA.SubtractScaled(mA, P);
            wA -= iA * LA;
            vB.AddScaled(mB, P);
            wB += iB * LB;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolvePositionConstraints(data) {
        const cA = data.positions[this.m_indexA].c;
        let aA = data.positions[this.m_indexA].a;
        const cB = data.positions[this.m_indexB].c;
        let aB = data.positions[this.m_indexB].a;
        let linearError = 0;
        const { qA, qB, lalcA, lalcB, rA, rB, d, P, ay } = temp;
        if (this.m_enableLimit) {
            qA.Set(aA);
            qB.Set(aB);
            b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), rA);
            b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), rB);
            b2_math_1.b2Vec2.Subtract(cB, cA, d).Add(rB).Subtract(rA);
            const ax = b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localXAxisA, this.m_ax);
            const sAx = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), this.m_ax);
            const sBx = b2_math_1.b2Vec2.Cross(rB, this.m_ax);
            let C = 0;
            const translation = b2_math_1.b2Vec2.Dot(ax, d);
            if (Math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2_common_1.b2_linearSlop) {
                C = translation;
            }
            else if (translation <= this.m_lowerTranslation) {
                C = Math.min(translation - this.m_lowerTranslation, 0);
            }
            else if (translation >= this.m_upperTranslation) {
                C = Math.max(translation - this.m_upperTranslation, 0);
            }
            if (C !== 0) {
                const invMass = this.m_invMassA + this.m_invMassB + this.m_invIA * sAx * sAx + this.m_invIB * sBx * sBx;
                let impulse = 0;
                if (invMass !== 0) {
                    impulse = -C / invMass;
                }
                b2_math_1.b2Vec2.Scale(impulse, ax, P);
                const LA = impulse * sAx;
                const LB = impulse * sBx;
                cA.SubtractScaled(this.m_invMassA, P);
                aA -= this.m_invIA * LA;
                cB.AddScaled(this.m_invMassB, P);
                aB += this.m_invIB * LB;
                linearError = Math.abs(C);
            }
        }
        // Solve perpendicular constraint
        {
            qA.Set(aA);
            qB.Set(aB);
            b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, this.m_localCenterA, lalcA), rA);
            b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, this.m_localCenterB, lalcB), rB);
            b2_math_1.b2Vec2.Subtract(cB, cA, d).Add(rB).Subtract(rA);
            b2_math_1.b2Rot.MultiplyVec2(qA, this.m_localYAxisA, ay);
            const sAy = b2_math_1.b2Vec2.Cross(b2_math_1.b2Vec2.Add(d, rA, b2_math_1.b2Vec2.s_t0), ay);
            const sBy = b2_math_1.b2Vec2.Cross(rB, ay);
            const C = b2_math_1.b2Vec2.Dot(d, ay);
            const invMass = this.m_invMassA +
                this.m_invMassB +
                this.m_invIA * this.m_sAy * this.m_sAy +
                this.m_invIB * this.m_sBy * this.m_sBy;
            let impulse = 0;
            if (invMass !== 0) {
                impulse = -C / invMass;
            }
            b2_math_1.b2Vec2.Scale(impulse, ay, P);
            const LA = impulse * sAy;
            const LB = impulse * sBy;
            cA.SubtractScaled(this.m_invMassA, P);
            aA -= this.m_invIA * LA;
            cB.AddScaled(this.m_invMassB, P);
            aB += this.m_invIB * LB;
            linearError = Math.max(linearError, Math.abs(C));
        }
        data.positions[this.m_indexA].a = aA;
        data.positions[this.m_indexB].a = aB;
        return linearError <= b2_common_1.b2_linearSlop;
    }
    GetAnchorA(out) {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
    }
    GetAnchorB(out) {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
    }
    GetReactionForce(inv_dt, out) {
        const f = this.m_springImpulse + this.m_lowerImpulse - this.m_upperImpulse;
        out.x = inv_dt * (this.m_impulse * this.m_ay.x + f * this.m_ax.x);
        out.y = inv_dt * (this.m_impulse * this.m_ay.y + f * this.m_ax.y);
        return out;
    }
    GetReactionTorque(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    GetLocalAnchorA() {
        return this.m_localAnchorA;
    }
    GetLocalAnchorB() {
        return this.m_localAnchorB;
    }
    GetLocalAxisA() {
        return this.m_localXAxisA;
    }
    GetJointTranslation() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const { pA, pB, d, axis } = temp;
        bA.GetWorldPoint(this.m_localAnchorA, pA);
        bB.GetWorldPoint(this.m_localAnchorB, pB);
        b2_math_1.b2Vec2.Subtract(pB, pA, d);
        bA.GetWorldVector(this.m_localXAxisA, axis);
        const translation = b2_math_1.b2Vec2.Dot(d, axis);
        return translation;
    }
    GetJointLinearSpeed() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const { rA, rB, lalcA, lalcB, axis } = temp;
        b2_math_1.b2Rot.MultiplyVec2(bA.m_xf.q, b2_math_1.b2Vec2.Subtract(this.m_localAnchorA, bA.m_sweep.localCenter, lalcA), rA);
        b2_math_1.b2Rot.MultiplyVec2(bB.m_xf.q, b2_math_1.b2Vec2.Subtract(this.m_localAnchorB, bB.m_sweep.localCenter, lalcB), rB);
        const p1 = b2_math_1.b2Vec2.Add(bA.m_sweep.c, rA, b2_math_1.b2Vec2.s_t0);
        const p2 = b2_math_1.b2Vec2.Add(bB.m_sweep.c, rB, b2_math_1.b2Vec2.s_t1);
        const d = b2_math_1.b2Vec2.Subtract(p2, p1, b2_math_1.b2Vec2.s_t2);
        b2_math_1.b2Rot.MultiplyVec2(bA.m_xf.q, this.m_localXAxisA, axis);
        const vA = bA.m_linearVelocity;
        const vB = bB.m_linearVelocity;
        const wA = bA.m_angularVelocity;
        const wB = bB.m_angularVelocity;
        const speed = b2_math_1.b2Vec2.Dot(d, b2_math_1.b2Vec2.CrossScalarVec2(wA, axis, b2_math_1.b2Vec2.s_t0)) +
            b2_math_1.b2Vec2.Dot(axis, b2_math_1.b2Vec2
                .AddCrossScalarVec2(vB, wB, rB, b2_math_1.b2Vec2.s_t0)
                .Subtract(vA)
                .Subtract(b2_math_1.b2Vec2.CrossScalarVec2(wA, rA, b2_math_1.b2Vec2.s_t1)));
        return speed;
    }
    GetJointAngle() {
        return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a;
    }
    GetJointAngularSpeed() {
        const wA = this.m_bodyA.m_angularVelocity;
        const wB = this.m_bodyB.m_angularVelocity;
        return wB - wA;
    }
    IsMotorEnabled() {
        return this.m_enableMotor;
    }
    EnableMotor(flag) {
        if (flag !== this.m_enableMotor) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableMotor = flag;
        }
        return flag;
    }
    SetMotorSpeed(speed) {
        if (speed !== this.m_motorSpeed) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = speed;
        }
        return speed;
    }
    SetMaxMotorTorque(torque) {
        if (torque !== this.m_maxMotorTorque) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_maxMotorTorque = torque;
        }
    }
    GetMotorTorque(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    /**
     * Is the joint limit enabled?
     */
    IsLimitEnabled() {
        return this.m_enableLimit;
    }
    /**
     * Enable/disable the joint translation limit.
     */
    EnableLimit(flag) {
        if (flag !== this.m_enableLimit) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableLimit = flag;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
        return flag;
    }
    /**
     * Get the lower joint translation limit, usually in meters.
     */
    GetLowerLimit() {
        return this.m_lowerTranslation;
    }
    /**
     * Get the upper joint translation limit, usually in meters.
     */
    GetUpperLimit() {
        return this.m_upperTranslation;
    }
    /**
     * Set the joint translation limits, usually in meters.
     */
    SetLimits(lower, upper) {
        // b2Assert(lower <= upper);
        if (lower !== this.m_lowerTranslation || upper !== this.m_upperTranslation) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_lowerTranslation = lower;
            this.m_upperTranslation = upper;
            this.m_lowerImpulse = 0;
            this.m_upperImpulse = 0;
        }
    }
    Draw(draw) {
        const { p1, p2, pA, pB, axis } = temp.Draw;
        const xfA = this.m_bodyA.GetTransform();
        const xfB = this.m_bodyB.GetTransform();
        b2_math_1.b2Transform.MultiplyVec2(xfA, this.m_localAnchorA, pA);
        b2_math_1.b2Transform.MultiplyVec2(xfB, this.m_localAnchorB, pB);
        b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_localXAxisA, axis);
        draw.DrawSegment(pA, pB, b2_draw_1.debugColors.joint5);
        if (this.m_enableLimit) {
            const { lower, upper, perp } = temp.Draw;
            b2_math_1.b2Vec2.AddScaled(pA, this.m_lowerTranslation, axis, lower);
            b2_math_1.b2Vec2.AddScaled(pA, this.m_upperTranslation, axis, upper);
            b2_math_1.b2Rot.MultiplyVec2(xfA.q, this.m_localYAxisA, perp);
            draw.DrawSegment(lower, upper, b2_draw_1.debugColors.joint1);
            draw.DrawSegment(b2_math_1.b2Vec2.SubtractScaled(lower, 0.5, perp, p1), b2_math_1.b2Vec2.AddScaled(lower, 0.5, perp, p2), b2_draw_1.debugColors.joint2);
            draw.DrawSegment(b2_math_1.b2Vec2.SubtractScaled(upper, 0.5, perp, p1), b2_math_1.b2Vec2.AddScaled(upper, 0.5, perp, p2), b2_draw_1.debugColors.joint3);
        }
        else {
            draw.DrawSegment(b2_math_1.b2Vec2.Subtract(pA, axis, p1), b2_math_1.b2Vec2.Add(pA, axis, p2), b2_draw_1.debugColors.joint1);
        }
        draw.DrawPoint(pA, 5, b2_draw_1.debugColors.joint1);
        draw.DrawPoint(pB, 5, b2_draw_1.debugColors.joint4);
    }
}
exports.b2WheelJoint = b2WheelJoint;


/***/ }),

/***/ "uqHF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2PolygonContact = void 0;
const b2_collide_polygon_1 = __webpack_require__("EKx6");
const b2_contact_1 = __webpack_require__("PzZv");
/** @internal */
class b2PolygonContact extends b2_contact_1.b2Contact {
    Evaluate(manifold, xfA, xfB) {
        (0, b2_collide_polygon_1.b2CollidePolygons)(manifold, this.GetShapeA(), xfA, this.GetShapeB(), xfB);
    }
}
exports.b2PolygonContact = b2PolygonContact;


/***/ }),

/***/ "wYcr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2MotorJoint = exports.b2MotorJointDef = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "../common/b2_common";
const b2_math_1 = __webpack_require__("xKh6");
const b2_joint_1 = __webpack_require__("qywJ");
// Point-to-point constraint
// Cdot = v2 - v1
//      = v2 + cross(w2, r2) - v1 - cross(w1, r1)
// J = [-I -r1_skew I r2_skew ]
// Identity used:
// w k % (rx i + ry j) = w * (-ry i + rx j)
//
// r1 = offset - c1
// r2 = -c2
// Angle constraint
// Cdot = w2 - w1
// J = [0 0 -1 0 0 1]
// K = invI1 + invI2
const temp = {
    qA: new b2_math_1.b2Rot(),
    qB: new b2_math_1.b2Rot(),
    K: new b2_math_1.b2Mat22(),
    Cdot: new b2_math_1.b2Vec2(),
    impulse: new b2_math_1.b2Vec2(),
    oldImpulse: new b2_math_1.b2Vec2(),
};
/**
 * Motor joint definition.
 */
class b2MotorJointDef extends b2_joint_1.b2JointDef {
    constructor() {
        super(b2_joint_1.b2JointType.e_motorJoint);
        /** Position of bodyB minus the position of bodyA, in bodyA's frame, in meters. */
        this.linearOffset = new b2_math_1.b2Vec2();
        /** The bodyB angle minus bodyA angle in radians. */
        this.angularOffset = 0;
        /** The maximum motor force in N. */
        this.maxForce = 1;
        /** The maximum motor torque in N-m. */
        this.maxTorque = 1;
        /** Position correction factor in the range [0,1]. */
        this.correctionFactor = 0.3;
    }
    Initialize(bodyA, bodyB) {
        this.bodyA = bodyA;
        this.bodyB = bodyB;
        this.bodyA.GetLocalPoint(bodyB.GetPosition(), this.linearOffset);
        const angleA = bodyA.GetAngle();
        const angleB = bodyB.GetAngle();
        this.angularOffset = angleB - angleA;
    }
}
exports.b2MotorJointDef = b2MotorJointDef;
/**
 * A motor joint is used to control the relative motion
 * between two bodies. A typical usage is to control the movement
 * of a dynamic body with respect to the ground.
 */
class b2MotorJoint extends b2_joint_1.b2Joint {
    /** @internal protected */
    constructor(def) {
        var _a, _b, _c, _d, _e;
        super(def);
        // Solver shared
        this.m_linearOffset = new b2_math_1.b2Vec2();
        this.m_linearImpulse = new b2_math_1.b2Vec2();
        this.m_angularImpulse = 0;
        // Solver temp
        this.m_indexA = 0;
        this.m_indexB = 0;
        this.m_rA = new b2_math_1.b2Vec2();
        this.m_rB = new b2_math_1.b2Vec2();
        this.m_localCenterA = new b2_math_1.b2Vec2();
        this.m_localCenterB = new b2_math_1.b2Vec2();
        this.m_linearError = new b2_math_1.b2Vec2();
        this.m_angularError = 0;
        this.m_invMassA = 0;
        this.m_invMassB = 0;
        this.m_invIA = 0;
        this.m_invIB = 0;
        this.m_linearMass = new b2_math_1.b2Mat22();
        this.m_angularMass = 0;
        this.m_linearOffset.Copy((_a = def.linearOffset) !== null && _a !== void 0 ? _a : b2_math_1.b2Vec2.ZERO);
        this.m_angularOffset = (_b = def.angularOffset) !== null && _b !== void 0 ? _b : 0;
        this.m_linearImpulse.SetZero();
        this.m_maxForce = (_c = def.maxForce) !== null && _c !== void 0 ? _c : 1;
        this.m_maxTorque = (_d = def.maxTorque) !== null && _d !== void 0 ? _d : 1;
        this.m_correctionFactor = (_e = def.correctionFactor) !== null && _e !== void 0 ? _e : 0.3;
    }
    GetAnchorA(out) {
        const pos = this.m_bodyA.GetPosition();
        out.x = pos.x;
        out.y = pos.y;
        return out;
    }
    GetAnchorB(out) {
        const pos = this.m_bodyB.GetPosition();
        out.x = pos.x;
        out.y = pos.y;
        return out;
    }
    GetReactionForce(inv_dt, out) {
        return b2_math_1.b2Vec2.Scale(inv_dt, this.m_linearImpulse, out);
    }
    GetReactionTorque(inv_dt) {
        return inv_dt * this.m_angularImpulse;
    }
    SetLinearOffset(linearOffset) {
        if (!b2_math_1.b2Vec2.Equals(linearOffset, this.m_linearOffset)) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_linearOffset.Copy(linearOffset);
        }
    }
    GetLinearOffset() {
        return this.m_linearOffset;
    }
    SetAngularOffset(angularOffset) {
        if (angularOffset !== this.m_angularOffset) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_angularOffset = angularOffset;
        }
    }
    GetAngularOffset() {
        return this.m_angularOffset;
    }
    SetMaxForce(force) {
        // DEBUG: b2Assert(Number.isFinite(force) && force >= 0);
        this.m_maxForce = force;
    }
    GetMaxForce() {
        return this.m_maxForce;
    }
    SetMaxTorque(torque) {
        // DEBUG: b2Assert(Number.isFinite(torque) && torque >= 0);
        this.m_maxTorque = torque;
    }
    GetMaxTorque() {
        return this.m_maxTorque;
    }
    GetCorrectionFactor() {
        return this.m_correctionFactor;
    }
    SetCorrectionFactor(factor) {
        // DEBUG: b2Assert(Number.isFinite(factor) && factor >= 0 && factor <= 1);
        this.m_correctionFactor = factor;
    }
    /** @internal protected */
    InitVelocityConstraints(data) {
        this.m_indexA = this.m_bodyA.m_islandIndex;
        this.m_indexB = this.m_bodyB.m_islandIndex;
        this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
        this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = data.positions[this.m_indexA].c;
        const aA = data.positions[this.m_indexA].a;
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const cB = data.positions[this.m_indexB].c;
        const aB = data.positions[this.m_indexB].a;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const { qA, qB } = temp;
        qA.Set(aA);
        qB.Set(aB);
        // Compute the effective mass matrix.
        const rA = b2_math_1.b2Rot.MultiplyVec2(qA, b2_math_1.b2Vec2.Subtract(this.m_linearOffset, this.m_localCenterA, b2_math_1.b2Vec2.s_t0), this.m_rA);
        const rB = b2_math_1.b2Rot.MultiplyVec2(qB, b2_math_1.b2Vec2.Negate(this.m_localCenterB, b2_math_1.b2Vec2.s_t0), this.m_rB);
        // J = [-I -r1_skew I r2_skew]
        // r_skew = [-ry; rx]
        // Matlab
        // K = [ mA+r1y^2*iA+mB+r2y^2*iB,  -r1y*iA*r1x-r2y*iB*r2x,          -r1y*iA-r2y*iB]
        //     [  -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB,           r1x*iA+r2x*iB]
        //     [          -r1y*iA-r2y*iB,           r1x*iA+r2x*iB,                   iA+iB]
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        // Upper 2 by 2 of K for point to point
        const K = this.m_linearMass;
        K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
        K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
        K.Inverse();
        this.m_angularMass = iA + iB;
        if (this.m_angularMass > 0) {
            this.m_angularMass = 1 / this.m_angularMass;
        }
        b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.Add(cB, rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.Add(cA, rA, b2_math_1.b2Vec2.s_t1), this.m_linearError);
        this.m_angularError = aB - aA - this.m_angularOffset;
        if (data.step.warmStarting) {
            // Scale impulses to support a variable time step.
            this.m_linearImpulse.Scale(data.step.dtRatio);
            this.m_angularImpulse *= data.step.dtRatio;
            const P = this.m_linearImpulse;
            vA.SubtractScaled(mA, P);
            wA -= iA * (b2_math_1.b2Vec2.Cross(rA, P) + this.m_angularImpulse);
            vB.AddScaled(mB, P);
            wB += iB * (b2_math_1.b2Vec2.Cross(rB, P) + this.m_angularImpulse);
        }
        else {
            this.m_linearImpulse.SetZero();
            this.m_angularImpulse = 0;
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolveVelocityConstraints(data) {
        const vA = data.velocities[this.m_indexA].v;
        let wA = data.velocities[this.m_indexA].w;
        const vB = data.velocities[this.m_indexB].v;
        let wB = data.velocities[this.m_indexB].w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const h = data.step.dt;
        const inv_h = data.step.inv_dt;
        // Solve angular friction
        {
            const Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
            let impulse = -this.m_angularMass * Cdot;
            const oldImpulse = this.m_angularImpulse;
            const maxImpulse = h * this.m_maxTorque;
            this.m_angularImpulse = (0, b2_math_1.b2Clamp)(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_angularImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        // Solve linear friction
        {
            const { impulse, oldImpulse, Cdot } = temp;
            b2_math_1.b2Vec2.AddScaled(b2_math_1.b2Vec2.Subtract(b2_math_1.b2Vec2.AddCrossScalarVec2(vB, wB, this.m_rB, b2_math_1.b2Vec2.s_t0), b2_math_1.b2Vec2.AddCrossScalarVec2(vA, wA, this.m_rA, b2_math_1.b2Vec2.s_t1), b2_math_1.b2Vec2.s_t2), inv_h * this.m_correctionFactor, this.m_linearError, Cdot);
            b2_math_1.b2Mat22.MultiplyVec2(this.m_linearMass, Cdot, impulse).Negate();
            oldImpulse.Copy(this.m_linearImpulse);
            this.m_linearImpulse.Add(impulse);
            const maxImpulse = h * this.m_maxForce;
            if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
                this.m_linearImpulse.Normalize();
                this.m_linearImpulse.Scale(maxImpulse);
            }
            b2_math_1.b2Vec2.Subtract(this.m_linearImpulse, oldImpulse, impulse);
            vA.SubtractScaled(mA, impulse);
            wA -= iA * b2_math_1.b2Vec2.Cross(this.m_rA, impulse);
            vB.AddScaled(mB, impulse);
            wB += iB * b2_math_1.b2Vec2.Cross(this.m_rB, impulse);
        }
        data.velocities[this.m_indexA].w = wA;
        data.velocities[this.m_indexB].w = wB;
    }
    /** @internal protected */
    SolvePositionConstraints(_data) {
        return true;
    }
}
exports.b2MotorJoint = b2MotorJoint;


/***/ }),

/***/ "xKh6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2Sweep = exports.b2Transform = exports.b2Rot = exports.b2Mat33 = exports.b2Mat22 = exports.b2Vec3 = exports.b2Vec2 = exports.b2RandomInt = exports.b2RandomFloat = exports.b2Random = exports.b2IsPowerOfTwo = exports.b2NextPowerOfTwo = exports.b2RadToDeg = exports.b2DegToRad = exports.b2Clamp = exports.b2_two_pi = exports.b2_180_over_pi = exports.b2_pi_over_180 = void 0;
// Copyright (c) 2019 Erin Catto
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// DEBUG: import { b2Assert } from "./b2_common";
const b2_common_1 = __webpack_require__("UJxA");
exports.b2_pi_over_180 = Math.PI / 180;
exports.b2_180_over_pi = 180 / Math.PI;
exports.b2_two_pi = 2 * Math.PI;
function b2Clamp(a, low, high) {
    if (a < low)
        return low;
    return a > high ? high : a;
}
exports.b2Clamp = b2Clamp;
function b2DegToRad(degrees) {
    return degrees * exports.b2_pi_over_180;
}
exports.b2DegToRad = b2DegToRad;
function b2RadToDeg(radians) {
    return radians * exports.b2_180_over_pi;
}
exports.b2RadToDeg = b2RadToDeg;
/**
 * "Next Largest Power of 2
 * Given a binary integer value x, the next largest power of 2 can be computed by a SWAR algorithm
 * that recursively "folds" the upper bits into the lower bits. This process yields a bit vector with
 * the same most significant 1 as x, but all 1's below it. Adding 1 to that value yields the next
 * largest power of 2. For a 32-bit value:"
 */
function b2NextPowerOfTwo(x) {
    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    return x + 1;
}
exports.b2NextPowerOfTwo = b2NextPowerOfTwo;
function b2IsPowerOfTwo(x) {
    return x > 0 && (x & (x - 1)) === 0;
}
exports.b2IsPowerOfTwo = b2IsPowerOfTwo;
function b2Random() {
    return Math.random() * 2 - 1;
}
exports.b2Random = b2Random;
function b2RandomFloat(lo, hi) {
    return (hi - lo) * Math.random() + lo;
}
exports.b2RandomFloat = b2RandomFloat;
function b2RandomInt(lo, hi) {
    return Math.round((hi - lo) * Math.random() + lo);
}
exports.b2RandomInt = b2RandomInt;
/**
 * A 2D column vector.
 */
class b2Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    Clone() {
        return new b2Vec2(this.x, this.y);
    }
    /**
     * Set this vector to all zeros.
     */
    SetZero() {
        this.x = 0;
        this.y = 0;
        return this;
    }
    /**
     * Set this vector to some specified coordinates.
     */
    Set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    Copy(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
    /**
     * Add a vector to this vector.
     */
    Add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * Add a vector to this vector.
     */
    AddXY(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
    /**
     * Subtract a vector from this vector.
     */
    Subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * Subtract a vector from this vector.
     */
    SubtractXY(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    }
    /**
     * Multiply this vector by a scalar.
     */
    Scale(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    AddScaled(s, v) {
        this.x += s * v.x;
        this.y += s * v.y;
        return this;
    }
    SubtractScaled(s, v) {
        this.x -= s * v.x;
        this.y -= s * v.y;
        return this;
    }
    /**
     * Perform the dot product on two vectors.
     */
    Dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    /**
     * Perform the cross product on two vectors. In 2D this produces a scalar.
     */
    Cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    /**
     * Get the length of this vector (the norm).
     */
    Length() {
        const { x, y } = this;
        return Math.sqrt(x * x + y * y);
    }
    /**
     * Get the length squared. For performance, use this instead of
     * b2Vec2::Length (if possible).
     */
    LengthSquared() {
        const { x, y } = this;
        return x * x + y * y;
    }
    /**
     * Convert this vector into a unit vector. Returns the length.
     */
    Normalize() {
        const length = this.Length();
        if (length < b2_common_1.b2_epsilon) {
            return 0;
        }
        const inv_length = 1 / length;
        this.x *= inv_length;
        this.y *= inv_length;
        return length;
    }
    Rotate(radians) {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        const { x } = this;
        this.x = c * x - s * this.y;
        this.y = s * x + c * this.y;
        return this;
    }
    RotateCosSin(c, s) {
        const { x } = this;
        this.x = c * x - s * this.y;
        this.y = s * x + c * this.y;
        return this;
    }
    /**
     * Does this vector contain finite coordinates?
     */
    IsValid() {
        return Number.isFinite(this.x) && Number.isFinite(this.y);
    }
    Abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    GetAbs(out) {
        out.x = Math.abs(this.x);
        out.y = Math.abs(this.y);
        return out;
    }
    /**
     * Negate this vector.
     */
    Negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * Skew this vector such that dot(skew_vec, other) == cross(vec, other)
     */
    Skew() {
        const { x } = this;
        this.x = -this.y;
        this.y = x;
        return this;
    }
    static Min(a, b, out) {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        return out;
    }
    static Max(a, b, out) {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        return out;
    }
    static Clamp(v, lo, hi, out) {
        out.x = b2Clamp(v.x, lo.x, hi.x);
        out.y = b2Clamp(v.y, lo.y, hi.y);
        return out;
    }
    static Rotate(v, radians, out) {
        const v_x = v.x;
        const v_y = v.y;
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        out.x = c * v_x - s * v_y;
        out.y = s * v_x + c * v_y;
        return out;
    }
    static Dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    static Cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    /**
     * Perform the cross product on a vector and a scalar. In 2D this produces
     * a vector.
     */
    static CrossVec2Scalar(v, s, out) {
        const v_x = v.x;
        out.x = s * v.y;
        out.y = -s * v_x;
        return out;
    }
    static CrossVec2One(v, out) {
        const v_x = v.x;
        out.x = v.y;
        out.y = -v_x;
        return out;
    }
    /**
     * Perform the cross product on a scalar and a vector. In 2D this produces
     * a vector.
     */
    static CrossScalarVec2(s, v, out) {
        const v_x = v.x;
        out.x = -s * v.y;
        out.y = s * v_x;
        return out;
    }
    static CrossOneVec2(v, out) {
        const v_x = v.x;
        out.x = -v.y;
        out.y = v_x;
        return out;
    }
    /**
     * Add two vectors component-wise.
     */
    static Add(a, b, out) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        return out;
    }
    /**
     * Subtract two vectors component-wise.
     */
    static Subtract(a, b, out) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        return out;
    }
    static Scale(s, v, out) {
        out.x = v.x * s;
        out.y = v.y * s;
        return out;
    }
    static AddScaled(a, s, b, out) {
        out.x = a.x + s * b.x;
        out.y = a.y + s * b.y;
        return out;
    }
    static SubtractScaled(a, s, b, out) {
        out.x = a.x - s * b.x;
        out.y = a.y - s * b.y;
        return out;
    }
    static AddCrossScalarVec2(a, s, v, out) {
        const v_x = v.x;
        out.x = a.x - s * v.y;
        out.y = a.y + s * v_x;
        return out;
    }
    static Mid(a, b, out) {
        out.x = (a.x + b.x) * 0.5;
        out.y = (a.y + b.y) * 0.5;
        return out;
    }
    static Extents(a, b, out) {
        out.x = (b.x - a.x) * 0.5;
        out.y = (b.y - a.y) * 0.5;
        return out;
    }
    static Equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
    static Distance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }
    static DistanceSquared(a, b) {
        return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
    }
    /**
     * Negate a vector.
     */
    static Negate(v, out) {
        out.x = -v.x;
        out.y = -v.y;
        return out;
    }
    static Normalize(v, out) {
        const length_sq = v.x ** 2 + v.y ** 2;
        if (length_sq >= b2_common_1.b2_epsilon_sq) {
            const inv_length = 1 / Math.sqrt(length_sq);
            out.x = inv_length * v.x;
            out.y = inv_length * v.y;
        }
        else {
            out.x = 0;
            out.y = 0;
        }
        return out;
    }
    /**
     * Skew a vector such that dot(skew_vec, other) == cross(vec, other)
     */
    static Skew(v, out) {
        const { x } = v;
        out.x = -v.y;
        out.y = x;
        return out;
    }
}
exports.b2Vec2 = b2Vec2;
b2Vec2.ZERO = new b2Vec2();
b2Vec2.UNITX = new b2Vec2(1, 0);
b2Vec2.UNITY = new b2Vec2(0, 1);
b2Vec2.s_t0 = new b2Vec2();
b2Vec2.s_t1 = new b2Vec2();
b2Vec2.s_t2 = new b2Vec2();
b2Vec2.s_t3 = new b2Vec2();
/**
 * A 2D column vector with 3 elements.
 */
class b2Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Clone() {
        return new b2Vec3(this.x, this.y, this.z);
    }
    /**
     * Set this vector to all zeros.
     */
    SetZero() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    }
    /**
     * Set this vector to some specified coordinates.
     */
    Set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    Copy(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    }
    /**
     * Negate this vector.
     */
    Negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    /**
     * Add a vector to this vector.
     */
    Add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    /**
     * Add a vector to this vector.
     */
    AddXYZ(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    /**
     * Subtract a vector from this vector.
     */
    Subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    /**
     * Subtract a vector from this vector.
     */
    SubtractXYZ(x, y, z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }
    /**
     * Multiply this vector by a scalar.
     */
    Scale(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }
    /**
     * Perform the dot product on two vectors.
     */
    static Dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    /**
     * Perform the cross product on two vectors.
     */
    static Cross(a, b, out) {
        const a_x = a.x;
        const a_y = a.y;
        const a_z = a.z;
        const b_x = b.x;
        const b_y = b.y;
        const b_z = b.z;
        out.x = a_y * b_z - a_z * b_y;
        out.y = a_z * b_x - a_x * b_z;
        out.z = a_x * b_y - a_y * b_x;
        return out;
    }
}
exports.b2Vec3 = b2Vec3;
b2Vec3.ZERO = new b2Vec3(0, 0, 0);
b2Vec3.s_t0 = new b2Vec3();
/**
 * A 2-by-2 matrix. Stored in column-major order.
 */
class b2Mat22 {
    constructor() {
        this.ex = new b2Vec2(1, 0);
        this.ey = new b2Vec2(0, 1);
    }
    Clone() {
        return new b2Mat22().Copy(this);
    }
    /**
     * Construct a matrix using columns.
     */
    static FromColumns(c1, c2) {
        return new b2Mat22().SetColumns(c1, c2);
    }
    /**
     * Construct a matrix using scalars.
     */
    static FromScalars(r1c1, r1c2, r2c1, r2c2) {
        return new b2Mat22().SetScalars(r1c1, r1c2, r2c1, r2c2);
    }
    static FromAngle(radians) {
        return new b2Mat22().SetAngle(radians);
    }
    /**
     * Set this matrix using scalars.
     */
    SetScalars(r1c1, r1c2, r2c1, r2c2) {
        this.ex.Set(r1c1, r2c1);
        this.ey.Set(r1c2, r2c2);
        return this;
    }
    /**
     * Initialize this matrix using columns.
     */
    SetColumns(c1, c2) {
        this.ex.Copy(c1);
        this.ey.Copy(c2);
        return this;
    }
    SetAngle(radians) {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        this.ex.Set(c, s);
        this.ey.Set(-s, c);
        return this;
    }
    Copy(other) {
        this.ex.Copy(other.ex);
        this.ey.Copy(other.ey);
        return this;
    }
    /**
     * Set this to the identity matrix.
     */
    SetIdentity() {
        this.ex.Set(1, 0);
        this.ey.Set(0, 1);
        return this;
    }
    /**
     * Set this matrix to all zeros.
     */
    SetZero() {
        this.ex.SetZero();
        this.ey.SetZero();
        return this;
    }
    GetAngle() {
        return Math.atan2(this.ex.y, this.ex.x);
    }
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient
     * than computing the inverse in one-shot cases.
     */
    Solve(b_x, b_y, out) {
        const a11 = this.ex.x;
        const a12 = this.ey.x;
        const a21 = this.ex.y;
        const a22 = this.ey.y;
        let det = a11 * a22 - a12 * a21;
        if (det !== 0) {
            det = 1 / det;
        }
        out.x = det * (a22 * b_x - a12 * b_y);
        out.y = det * (a11 * b_y - a21 * b_x);
        return out;
    }
    Abs() {
        this.ex.Abs();
        this.ey.Abs();
        return this;
    }
    Inverse() {
        this.GetInverse(this);
        return this;
    }
    Add(M) {
        this.ex.Add(M.ex);
        this.ey.Add(M.ey);
        return this;
    }
    Subtract(M) {
        this.ex.Subtract(M.ex);
        this.ey.Subtract(M.ey);
        return this;
    }
    GetInverse(out) {
        const a = this.ex.x;
        const b = this.ey.x;
        const c = this.ex.y;
        const d = this.ey.y;
        let det = a * d - b * c;
        if (det !== 0) {
            det = 1 / det;
        }
        out.ex.x = det * d;
        out.ey.x = -det * b;
        out.ex.y = -det * c;
        out.ey.y = det * a;
        return out;
    }
    GetAbs(out) {
        out.ex.x = Math.abs(this.ex.x);
        out.ex.y = Math.abs(this.ex.y);
        out.ey.x = Math.abs(this.ey.x);
        out.ey.y = Math.abs(this.ey.y);
        return out;
    }
    /**
     * Multiply a matrix times a vector. If a rotation matrix is provided,
     * then this transforms the vector from one frame to another.
     */
    static MultiplyVec2(M, v, out) {
        const v_x = v.x;
        const v_y = v.y;
        out.x = M.ex.x * v_x + M.ey.x * v_y;
        out.y = M.ex.y * v_x + M.ey.y * v_y;
        return out;
    }
    /**
     * Multiply a matrix transpose times a vector. If a rotation matrix is provided,
     * then this transforms the vector from one frame to another (inverse transform).
     */
    static TransposeMultiplyVec2(M, v, out) {
        const v_x = v.x;
        const v_y = v.y;
        out.x = M.ex.x * v_x + M.ex.y * v_y;
        out.y = M.ey.x * v_x + M.ey.y * v_y;
        return out;
    }
    static Add(A, B, out) {
        out.ex.x = A.ex.x + B.ex.x;
        out.ex.y = A.ex.y + B.ex.y;
        out.ey.x = A.ey.x + B.ey.x;
        out.ey.y = A.ey.y + B.ey.y;
        return out;
    }
    /** A * B */
    static Multiply(A, B, out) {
        const A_ex_x = A.ex.x;
        const A_ex_y = A.ex.y;
        const A_ey_x = A.ey.x;
        const A_ey_y = A.ey.y;
        const B_ex_x = B.ex.x;
        const B_ex_y = B.ex.y;
        const B_ey_x = B.ey.x;
        const B_ey_y = B.ey.y;
        out.ex.x = A_ex_x * B_ex_x + A_ey_x * B_ex_y;
        out.ex.y = A_ex_y * B_ex_x + A_ey_y * B_ex_y;
        out.ey.x = A_ex_x * B_ey_x + A_ey_x * B_ey_y;
        out.ey.y = A_ex_y * B_ey_x + A_ey_y * B_ey_y;
        return out;
    }
    /** A^T * B */
    static TransposeMultiply(A, B, out) {
        const A_ex_x = A.ex.x;
        const A_ex_y = A.ex.y;
        const A_ey_x = A.ey.x;
        const A_ey_y = A.ey.y;
        const B_ex_x = B.ex.x;
        const B_ex_y = B.ex.y;
        const B_ey_x = B.ey.x;
        const B_ey_y = B.ey.y;
        out.ex.x = A_ex_x * B_ex_x + A_ex_y * B_ex_y;
        out.ex.y = A_ey_x * B_ex_x + A_ey_y * B_ex_y;
        out.ey.x = A_ex_x * B_ey_x + A_ex_y * B_ey_y;
        out.ey.y = A_ey_x * B_ey_x + A_ey_y * B_ey_y;
        return out;
    }
}
exports.b2Mat22 = b2Mat22;
b2Mat22.IDENTITY = new b2Mat22();
/**
 * A 3-by-3 matrix. Stored in column-major order.
 */
class b2Mat33 {
    constructor() {
        this.ex = new b2Vec3(1, 0, 0);
        this.ey = new b2Vec3(0, 1, 0);
        this.ez = new b2Vec3(0, 0, 1);
    }
    Clone() {
        return new b2Mat33().Copy(this);
    }
    /**
     * Set this matrix using columns.
     */
    SetColumns(c1, c2, c3) {
        this.ex.Copy(c1);
        this.ey.Copy(c2);
        this.ez.Copy(c3);
        return this;
    }
    Copy(other) {
        this.ex.Copy(other.ex);
        this.ey.Copy(other.ey);
        this.ez.Copy(other.ez);
        return this;
    }
    SetIdentity() {
        this.ex.Set(1, 0, 0);
        this.ey.Set(0, 1, 0);
        this.ez.Set(0, 0, 1);
        return this;
    }
    /**
     * Set this matrix to all zeros.
     */
    SetZero() {
        this.ex.SetZero();
        this.ey.SetZero();
        this.ez.SetZero();
        return this;
    }
    Add(M) {
        this.ex.Add(M.ex);
        this.ey.Add(M.ey);
        this.ez.Add(M.ez);
        return this;
    }
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient
     * than computing the inverse in one-shot cases.
     */
    Solve33(b_x, b_y, b_z, out) {
        const a11 = this.ex.x;
        const a21 = this.ex.y;
        const a31 = this.ex.z;
        const a12 = this.ey.x;
        const a22 = this.ey.y;
        const a32 = this.ey.z;
        const a13 = this.ez.x;
        const a23 = this.ez.y;
        const a33 = this.ez.z;
        let det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
        if (det !== 0) {
            det = 1 / det;
        }
        out.x = det * (b_x * (a22 * a33 - a32 * a23) + b_y * (a32 * a13 - a12 * a33) + b_z * (a12 * a23 - a22 * a13));
        out.y = det * (a11 * (b_y * a33 - b_z * a23) + a21 * (b_z * a13 - b_x * a33) + a31 * (b_x * a23 - b_y * a13));
        out.z = det * (a11 * (a22 * b_z - a32 * b_y) + a21 * (a32 * b_x - a12 * b_z) + a31 * (a12 * b_y - a22 * b_x));
        return out;
    }
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient
     * than computing the inverse in one-shot cases. Solve only the upper
     * 2-by-2 matrix equation.
     */
    Solve22(b_x, b_y, out) {
        const a11 = this.ex.x;
        const a12 = this.ey.x;
        const a21 = this.ex.y;
        const a22 = this.ey.y;
        let det = a11 * a22 - a12 * a21;
        if (det !== 0) {
            det = 1 / det;
        }
        out.x = det * (a22 * b_x - a12 * b_y);
        out.y = det * (a11 * b_y - a21 * b_x);
        return out;
    }
    /**
     * Get the inverse of this matrix as a 2-by-2.
     * Returns the zero matrix if singular.
     */
    GetInverse22(M) {
        const a = this.ex.x;
        const b = this.ey.x;
        const c = this.ex.y;
        const d = this.ey.y;
        let det = a * d - b * c;
        if (det !== 0) {
            det = 1 / det;
        }
        M.ex.x = det * d;
        M.ey.x = -det * b;
        M.ex.z = 0;
        M.ex.y = -det * c;
        M.ey.y = det * a;
        M.ey.z = 0;
        M.ez.x = 0;
        M.ez.y = 0;
        M.ez.z = 0;
    }
    /**
     * Get the symmetric inverse of this matrix as a 3-by-3.
     * Returns the zero matrix if singular.
     */
    GetSymInverse33(M) {
        let det = b2Vec3.Dot(this.ex, b2Vec3.Cross(this.ey, this.ez, b2Vec3.s_t0));
        if (det !== 0) {
            det = 1 / det;
        }
        const a11 = this.ex.x;
        const a12 = this.ey.x;
        const a13 = this.ez.x;
        const a22 = this.ey.y;
        const a23 = this.ez.y;
        const a33 = this.ez.z;
        M.ex.x = det * (a22 * a33 - a23 * a23);
        M.ex.y = det * (a13 * a23 - a12 * a33);
        M.ex.z = det * (a12 * a23 - a13 * a22);
        M.ey.x = M.ex.y;
        M.ey.y = det * (a11 * a33 - a13 * a13);
        M.ey.z = det * (a13 * a12 - a11 * a23);
        M.ez.x = M.ex.z;
        M.ez.y = M.ey.z;
        M.ez.z = det * (a11 * a22 - a12 * a12);
    }
    /**
     * Multiply a matrix times a vector.
     */
    static MultiplyVec3(A, v, out) {
        const { x, y, z } = v;
        out.x = A.ex.x * x + A.ey.x * y + A.ez.x * z;
        out.y = A.ex.y * x + A.ey.y * y + A.ez.y * z;
        out.z = A.ex.z * x + A.ey.z * y + A.ez.z * z;
        return out;
    }
    /**
     * Multiply a matrix times a vector.
     */
    static MultiplyVec2(A, v, out) {
        const { x, y } = v;
        out.x = A.ex.x * x + A.ey.x * y;
        out.y = A.ex.y * x + A.ey.y * y;
        return out;
    }
}
exports.b2Mat33 = b2Mat33;
b2Mat33.IDENTITY = new b2Mat33();
/**
 * Rotation
 */
class b2Rot {
    /**
     * Initialize from an angle in radians
     */
    constructor(angle = 0) {
        /** Sine */
        this.s = 0;
        /** Cosine */
        this.c = 1;
        if (angle) {
            this.s = Math.sin(angle);
            this.c = Math.cos(angle);
        }
    }
    Clone() {
        return new b2Rot().Copy(this);
    }
    Copy(other) {
        this.s = other.s;
        this.c = other.c;
        return this;
    }
    /**
     * Set using an angle in radians.
     */
    Set(angle) {
        this.s = Math.sin(angle);
        this.c = Math.cos(angle);
        return this;
    }
    /**
     * Set to the identity rotation
     */
    SetIdentity() {
        this.s = 0;
        this.c = 1;
        return this;
    }
    /**
     * Get the angle in radians
     */
    GetAngle() {
        return Math.atan2(this.s, this.c);
    }
    /**
     * Get the x-axis
     */
    GetXAxis(out) {
        out.x = this.c;
        out.y = this.s;
        return out;
    }
    /**
     * Get the u-axis
     */
    GetYAxis(out) {
        out.x = -this.s;
        out.y = this.c;
        return out;
    }
    /**
     * Multiply two rotations: q * r
     */
    static Multiply(q, r, out) {
        // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
        // [qs  qc]   [rs  rc]   [qs*rc+qc*rs -qs*rs+qc*rc]
        // s = qs * rc + qc * rs
        // c = qc * rc - qs * rs
        const s = q.s * r.c + q.c * r.s;
        const c = q.c * r.c - q.s * r.s;
        out.s = s;
        out.c = c;
        return out;
    }
    /**
     * Transpose multiply two rotations: qT * r
     */
    static TransposeMultiply(q, r, out) {
        // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
        // [-qs qc]   [rs  rc]   [-qs*rc+qc*rs qs*rs+qc*rc]
        // s = qc * rs - qs * rc
        // c = qc * rc + qs * rs
        const s = q.c * r.s - q.s * r.c;
        const c = q.c * r.c + q.s * r.s;
        out.s = s;
        out.c = c;
        return out;
    }
    /**
     * Rotate a vector
     */
    static MultiplyVec2(q, v, out) {
        const v_x = v.x;
        const v_y = v.y;
        out.x = q.c * v_x - q.s * v_y;
        out.y = q.s * v_x + q.c * v_y;
        return out;
    }
    /**
     * Inverse rotate a vector
     */
    static TransposeMultiplyVec2(q, v, out) {
        const v_x = v.x;
        const v_y = v.y;
        out.x = q.c * v_x + q.s * v_y;
        out.y = -q.s * v_x + q.c * v_y;
        return out;
    }
}
exports.b2Rot = b2Rot;
b2Rot.IDENTITY = new b2Rot();
/**
 * A transform contains translation and rotation. It is used to represent
 * the position and orientation of rigid frames.
 */
class b2Transform {
    constructor() {
        this.p = new b2Vec2();
        this.q = new b2Rot();
    }
    Clone() {
        return new b2Transform().Copy(this);
    }
    Copy(other) {
        this.p.Copy(other.p);
        this.q.Copy(other.q);
        return this;
    }
    /**
     * Set this to the identity transform.
     */
    SetIdentity() {
        this.p.SetZero();
        this.q.SetIdentity();
        return this;
    }
    /**
     * Set this based on the position and rotation.
     */
    SetPositionRotation(position, q) {
        this.p.Copy(position);
        this.q.Copy(q);
        return this;
    }
    /**
     * Set this based on the position and angle.
     */
    SetPositionAngle(pos, a) {
        this.p.Copy(pos);
        this.q.Set(a);
        return this;
    }
    SetPosition(position) {
        this.p.Copy(position);
        return this;
    }
    SetPositionXY(x, y) {
        this.p.Set(x, y);
        return this;
    }
    SetRotation(rotation) {
        this.q.Copy(rotation);
        return this;
    }
    SetRotationAngle(radians) {
        this.q.Set(radians);
        return this;
    }
    GetPosition() {
        return this.p;
    }
    GetRotation() {
        return this.q;
    }
    GetAngle() {
        return this.q.GetAngle();
    }
    static MultiplyVec2(T, v, out) {
        const v_x = v.x;
        const v_y = v.y;
        out.x = T.q.c * v_x - T.q.s * v_y + T.p.x;
        out.y = T.q.s * v_x + T.q.c * v_y + T.p.y;
        return out;
    }
    static TransposeMultiplyVec2(T, v, out) {
        const px = v.x - T.p.x;
        const py = v.y - T.p.y;
        out.x = T.q.c * px + T.q.s * py;
        out.y = -T.q.s * px + T.q.c * py;
        return out;
    }
    /**
     * v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
     *    = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
     */
    static Multiply(A, B, out) {
        b2Rot.Multiply(A.q, B.q, out.q);
        b2Rot.MultiplyVec2(A.q, B.p, out.p).Add(A.p);
        return out;
    }
    /**
     * v2 = A.q' * (B.q * v1 + B.p - A.p)
     *    = A.q' * B.q * v1 + A.q' * (B.p - A.p)
     */
    static TransposeMultiply(A, B, out) {
        b2Rot.TransposeMultiply(A.q, B.q, out.q);
        b2Rot.TransposeMultiplyVec2(A.q, b2Vec2.Subtract(B.p, A.p, out.p), out.p);
        return out;
    }
}
exports.b2Transform = b2Transform;
b2Transform.IDENTITY = new b2Transform();
/**
 * This describes the motion of a body/shape for TOI computation.
 * Shapes are defined with respect to the body origin, which may
 * no coincide with the center of mass. However, to support dynamics
 * we must interpolate the center of mass position.
 */
class b2Sweep {
    constructor() {
        /** Local center of mass position */
        this.localCenter = new b2Vec2();
        /** Center world position at time 0 */
        this.c0 = new b2Vec2();
        /** Center world position at time 1 */
        this.c = new b2Vec2();
        /** World angle at time 0 */
        this.a0 = 0;
        /** World angle at time 1 */
        this.a = 0;
        /**
         * Fraction of the current time step in the range [0,1]
         * c0 and a0 are the positions at alpha0.
         */
        this.alpha0 = 0;
    }
    Clone() {
        return new b2Sweep().Copy(this);
    }
    Copy(other) {
        this.localCenter.Copy(other.localCenter);
        this.c0.Copy(other.c0);
        this.c.Copy(other.c);
        this.a0 = other.a0;
        this.a = other.a;
        this.alpha0 = other.alpha0;
        return this;
    }
    /**
     * Get the interpolated transform at a specific time.
     *
     * @param transform The output transform
     * @param beta Is a factor in [0,1], where 0 indicates alpha0.
     * @see https://fgiesen.wordpress.com/2012/08/15/linear-interpolation-past-present-and-future/
     */
    GetTransform(xf, beta) {
        const oneMinusBeta = 1 - beta;
        xf.p.x = oneMinusBeta * this.c0.x + beta * this.c.x;
        xf.p.y = oneMinusBeta * this.c0.y + beta * this.c.y;
        const angle = oneMinusBeta * this.a0 + beta * this.a;
        xf.q.Set(angle);
        // Shift to origin
        xf.p.Subtract(b2Rot.MultiplyVec2(xf.q, this.localCenter, b2Vec2.s_t0));
        return xf;
    }
    /**
     * Advance the sweep forward, yielding a new initial state.
     *
     * @param alpha The new initial time.
     */
    Advance(alpha) {
        // DEBUG: b2Assert(this.alpha0 < 1);
        const beta = (alpha - this.alpha0) / (1 - this.alpha0);
        this.c0.x += beta * (this.c.x - this.c0.x);
        this.c0.y += beta * (this.c.y - this.c0.y);
        this.a0 += beta * (this.a - this.a0);
        this.alpha0 = alpha;
    }
    /**
     * Normalize an angle in radians to be between -pi and pi
     */
    Normalize() {
        const d = exports.b2_two_pi * Math.floor(this.a0 / exports.b2_two_pi);
        this.a0 -= d;
        this.a -= d;
    }
}
exports.b2Sweep = b2Sweep;


/***/ }),

/***/ "yCZ+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2ChainAndCircleContact = void 0;
const b2_collide_edge_1 = __webpack_require__("W84h");
const b2_edge_shape_1 = __webpack_require__("5Zru");
const b2_contact_1 = __webpack_require__("PzZv");
/** @internal */
class b2ChainAndCircleContact extends b2_contact_1.b2Contact {
    Evaluate(manifold, xfA, xfB) {
        const edge = b2ChainAndCircleContact.Evaluate_s_edge;
        this.GetShapeA().GetChildEdge(edge, this.m_indexA);
        (0, b2_collide_edge_1.b2CollideEdgeAndCircle)(manifold, edge, xfA, this.GetShapeB(), xfB);
    }
}
exports.b2ChainAndCircleContact = b2ChainAndCircleContact;
b2ChainAndCircleContact.Evaluate_s_edge = new b2_edge_shape_1.b2EdgeShape();


/***/ })

/******/ });
});