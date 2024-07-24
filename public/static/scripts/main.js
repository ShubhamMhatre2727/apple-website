!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Lotus", [], t) : "object" == typeof exports ? exports.Lotus = t() : e.Lotus = t()
}(self, (function() {
    return function() {
        var __webpack_modules__ = {
            858: function(e) {
                function t() {
                    this._events = {}
                }
                const n = t.prototype;
                n.on = function(e, t) {
                    return this._events[e] = this._events[e] || [],
                    this._events[e].unshift(t),
                    t
                }
                ,
                n.once = function(e, t) {
                    const n = this;
                    return this.on(e, (function i(a) {
                        n.off(e, i),
                        void 0 !== a ? t(a) : t()
                    }
                    ))
                }
                ,
                n.off = function(e, t) {
                    if (!this.has(e))
                        return;
                    if (1 === arguments.length)
                        return this._events[e] = null,
                        void delete this._events[e];
                    const n = this._events[e].indexOf(t);
                    -1 !== n && this._events[e].splice(n, 1)
                }
                ,
                n.trigger = function(e, t) {
                    if (this.has(e))
                        for (let n = this._events[e].length - 1; n >= 0; n--)
                            void 0 !== t ? this._events[e][n](t) : this._events[e][n]()
                }
                ,
                n.has = function(e) {
                    return e in this._events != 0 && 0 !== this._events[e].length
                }
                ,
                n.destroy = function() {
                    for (const e in this._events)
                        this._events[e] = null;
                    this._events = null
                }
                ,
                t.EventEmitterMicro = t,
                e.exports = t
            },
            7256: function(e) {
                function t() {
                    this._events = {}
                }
                const n = t.prototype;
                n.on = function(e, t) {
                    return this._events[e] = this._events[e] || [],
                    this._events[e].unshift(t),
                    t
                }
                ,
                n.once = function(e, t) {
                    const n = this;
                    return this.on(e, (function i(a) {
                        n.off(e, i),
                        void 0 !== a ? t(a) : t()
                    }
                    ))
                }
                ,
                n.off = function(e, t) {
                    if (!this.has(e))
                        return;
                    if (1 === arguments.length)
                        return this._events[e] = null,
                        void delete this._events[e];
                    const n = this._events[e].indexOf(t);
                    -1 !== n && this._events[e].splice(n, 1)
                }
                ,
                n.trigger = function(e, t) {
                    if (this.has(e))
                        for (let n = this._events[e].length - 1; n >= 0; n--)
                            void 0 !== t ? this._events[e][n](t) : this._events[e][n]()
                }
                ,
                n.has = function(e) {
                    return e in this._events != 0 && 0 !== this._events[e].length
                }
                ,
                n.destroy = function() {
                    for (const e in this._events)
                        this._events[e] = null;
                    this._events = null
                }
                ,
                t.EventEmitterMicro = t,
                e.exports = t
            },
            7166: function(e, t, n) {
                const i = n(361)
                  , a = (e,t)=>{
                    for (const n in e)
                        e[n] && "object" == typeof e[n] ? (t(n, e, e[n]),
                        a(e[n], t)) : t(n, e, e[n])
                }
                ;
                e.exports = {
                    assign: function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const n = i(e);
                        for (const [e,i] of Object.entries(t))
                            n[e] = i;
                        return n
                    },
                    traverse: a
                }
            },
            2410: function(e) {
                e.exports = {
                    ALL: /\.(bin|exr|gbl|gltf|hdr|jpe?g|ktx2?|png|json)/i,
                    BLOB_FILES: "{bin,exr,glb,gltf,hdr,jpg,jpeg,ktx,ktx2,png,json}",
                    BLOB_IMAGES: "{exr,hdr,jpg,jpeg,ktx,ktx2,png}",
                    EXR: /\.exr/i,
                    GLTF: /\.(gltf|glb)/i,
                    HDR: /\.hdr/i,
                    IMAGES: /\.(exr|png|jpe?g|hdr|ktx2?)/i,
                    JSON: /\.(json)/i,
                    KTX: /\.ktx2?/i,
                    MP4: /\.mp4/i,
                    OBJECTS: /\.(json|glb|gltf)/i,
                    TEXTURES: /\.(exr|hdr|ktx2?)/i
                }
            },
            8506: function(e, t, n) {
                "use strict";
                n.d(t, {
                    R: function() {
                        return a
                    },
                    u: function() {
                        return s
                    }
                });
                var i = n(6870);
                const a = n(8939);
                class s extends i.zd {
                    constructor({material: e, scene: t, values: n}) {
                        super({
                            instructions: [{
                                target: i.rP.FragmentShader,
                                type: i.hl.Replace,
                                token: "#include <cube_uv_reflection_fragment>",
                                chunk: a
                            }],
                            material: e,
                            name: "CrossFadeEnvironmentShaderChunk",
                            scene: t,
                            values: null
                        }),
                        this.material.envMap = n.envMap,
                        this.material.uniforms.envMap.value = n.envMap,
                        this.material.uniforms.envMapBlurriness = n.envMapBlurriness,
                        this.material.uniforms.envMapOrientation = n.envMapOrientation,
                        this.material.uniforms.envMapStrength = n.envMapStrength
                    }
                }
            },
            14: function(e, t, n) {
                "use strict";
                n.d(t, {
                    Wf: function() {
                        return s
                    },
                    nb: function() {
                        return a
                    },
                    vT: function() {
                        return r
                    }
                });
                var i = n(6870);
                const a = n(7501)
                  , s = n(580);
                class r extends i.zd {
                    get areaLightMaps() {
                        return this.material.uniforms.areaLightMaps
                    }
                    set areaLightMaps(e) {
                        this.material.uniforms.areaLightMaps.value = e,
                        this.material.needsUpdate = !0
                    }
                    _lightLayerMasks;
                    get lightLayerMasks() {
                        return this._lightLayerMasks
                    }
                    set lightLayerMasks(e) {
                        this._lightLayerMasks = e,
                        this.material.uniforms.lightLayerMasks.value = e
                    }
                    _objectLayerMask;
                    get objectLayerMask() {
                        return this._objectLayerMask
                    }
                    set objectLayerMask(e) {
                        this._objectLayerMask = e,
                        this.material.uniforms.objectLayerMask.value = e
                    }
                    constructor(e) {
                        super({
                            material: e.material,
                            name: "TexturedAreaLightShaderChunk",
                            instructions: [{
                                target: i.rP.FragmentShader,
                                type: i.hl.Replace,
                                token: "#include <lights_fragment_begin>",
                                chunk: a
                            }, {
                                target: i.rP.FragmentShader,
                                type: i.hl.Replace,
                                token: "#include <lights_physical_pars_fragment>",
                                chunk: s
                            }],
                            values: {
                                areaLightMaps: {
                                    value: e.areaLightMaps
                                },
                                lightLayerMasks: {
                                    value: e.lightLayerMasks
                                },
                                objectLayerMask: {
                                    value: e.objectLayerMask
                                }
                            }
                        })
                    }
                }
            },
            6143: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    AdditionalBrightnessShaderChunk: function() {
                        return o
                    },
                    AdditionalBrightnessShaderChunkFragment: function() {
                        return r
                    },
                    AdditionalBrightnessShaderChunkVars: function() {
                        return s
                    },
                    AdditionalExposureShaderChunk: function() {
                        return ne
                    },
                    AdditionalExposureShaderChunkFragment: function() {
                        return te
                    },
                    AdditionalExposureShaderChunkVars: function() {
                        return ee
                    },
                    AdditionalGammaShaderChunk: function() {
                        return p
                    },
                    AdditionalGammaShaderChunkFragment: function() {
                        return u
                    },
                    AdditionalGammaShaderChunkVars: function() {
                        return d
                    },
                    AdditionalSaturationShaderChunk: function() {
                        return _
                    },
                    AdditionalSaturationShaderChunkFragment: function() {
                        return f
                    },
                    AdditionalSaturationShaderChunkVars: function() {
                        return m
                    },
                    AlphaMapParsShaderChunkFragment: function() {
                        return v
                    },
                    AlphaMapShaderChunk: function() {
                        return M
                    },
                    AlphaMapShaderChunkFragment: function() {
                        return y
                    },
                    AoChannelMixerShaderChunk: function() {
                        return b
                    },
                    AoMapFragment: function() {
                        return S
                    },
                    AoMapFragmentParameters: function() {
                        return x
                    },
                    BlendModeShaderChunk: function() {
                        return L
                    },
                    ColorAdjustmentShaderChunk: function() {
                        return V
                    },
                    CrossFadeEnvironmentFragment: function() {
                        return R.R
                    },
                    CrossFadeEnvironmentShaderChunk: function() {
                        return R.u
                    },
                    CustomLightsFragmentBegin: function() {
                        return Q.nb
                    },
                    CustomLightsPhysicalParsFragment: function() {
                        return Q.Wf
                    },
                    CustomUVParsFragment: function() {
                        return X
                    },
                    CustomUVParsVertex: function() {
                        return B
                    },
                    CustomUVVertex: function() {
                        return W
                    },
                    DepthModeShaderChunk: function() {
                        return P
                    },
                    EnvironmentFragment: function() {
                        return F
                    },
                    EnvironmentShaderChunk: function() {
                        return U
                    },
                    Exposure: function() {
                        return c
                    },
                    ExposureFragment: function() {
                        return h
                    },
                    ExposureVars: function() {
                        return l
                    },
                    FresnelShaderChunk: function() {
                        return O
                    },
                    LightMapFragment: function() {
                        return k
                    },
                    LightMapParsFragment: function() {
                        return D
                    },
                    LightMapShaderChunk: function() {
                        return I
                    },
                    OcularShaderChunk: function() {
                        return j
                    },
                    ParallaxMappingFragment: function() {
                        return q
                    },
                    ParallaxMappingFragmentFinal: function() {
                        return K
                    },
                    ParallaxMappingParsFragment: function() {
                        return Y
                    },
                    ParallaxMappingShaderChunk: function() {
                        return $
                    },
                    ShaderFragment: function() {
                        return N
                    },
                    ShaderFragmentPars: function() {
                        return H
                    },
                    ShaderVertexWorldPos: function() {
                        return z
                    },
                    TexturedAreaLightShaderChunk: function() {
                        return Q.vT
                    },
                    ToneMapShaderChunk: function() {
                        return Z
                    },
                    TransparencyShaderChunk: function() {
                        return J
                    }
                });
                var i = n(9138)
                  , a = n(6870);
                const s = n(9606)
                  , r = n(358);
                class o extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        brightness: {
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            render: e=>"interpolation" !== e?.transition,
                            step: .01,
                            type: "Slider"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectAfter,
                                token: "#include <common>",
                                chunk: s
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectBefore,
                                token: "#include <tonemapping_fragment>",
                                chunk: r
                            }],
                            layer: e,
                            material: t,
                            name: "AdditionalBrightnessShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    _brightnesses = {};
                    createInterpolationValues() {
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._brightnesses[e] = t.brightness
                        }
                        ))
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition ? this.timeline.on("update", (()=>{
                            this.animationHelper?.brightness && (this.material.uniforms.brightness.value = this.animationHelper.brightness)
                        }
                        )) : this.timeline && (this.timeline.addKeyframe(this.material.uniforms.brightness, {
                            value: [null, this.fields.brightness]
                        }),
                        this.timeline.play(this.animationSkip))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global");
                        let t = 0;
                        Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const s = this._brightnesses[`${e}:${i.label}`] ?? this._brightnesses[e];
                            t += s * i.interpolation
                        }
                        )),
                        this.material.uniforms.brightness.value = t
                    }
                }
                const l = n(901)
                  , h = n(5168);
                class c extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        exposure: {
                            defaultValue: 0,
                            isVariant: !0,
                            min: -6,
                            max: 6,
                            render: e=>"interpolation" !== e?.transition,
                            step: .01,
                            type: "Slider"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectAfter,
                                token: "#include <common>",
                                chunk: l
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectBefore,
                                token: "#include <tonemapping_fragment>",
                                chunk: h
                            }],
                            layer: e,
                            material: t,
                            name: "Exposure",
                            scene: n,
                            values: i
                        })
                    }
                    _exposures = {};
                    createInterpolationValues() {
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._exposures[e] = t.exposure
                        }
                        ))
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition ? this.timeline.on("update", (()=>{
                            this.animationHelper?.exposure && (this.material.uniforms.exposure.value = this.animationHelper.exposure)
                        }
                        )) : this.timeline && (this.timeline.addKeyframe(this.material.uniforms.exposure, {
                            value: [null, this.fields.exposure]
                        }),
                        this.timeline.play(this.animationSkip))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global");
                        let t = 0;
                        Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const s = this._exposures[`${e}:${i.label}`] ?? this._exposures[e];
                            t += s * i.interpolation
                        }
                        )),
                        this.material.uniforms.exposure.value = t
                    }
                }
                const d = n(8998)
                  , u = n(2850);
                class p extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        gamma: {
                            defaultValue: 0,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            render: e=>"interpolation" !== e?.transition,
                            step: .01,
                            type: "Slider"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectAfter,
                                token: "#include <common>",
                                chunk: d
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectBefore,
                                token: "#include <tonemapping_fragment>",
                                chunk: u
                            }],
                            layer: e,
                            material: t,
                            name: "AdditionalGammaShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    _gammas = {};
                    createInterpolationValues() {
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._gammas[e] = t.gamma
                        }
                        ))
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition ? this.timeline.on("update", (()=>{
                            this.animationHelper?.gamma && (this.material.uniforms.gamma.value = this.animationHelper.gamma)
                        }
                        )) : this.timeline && (this.timeline.addKeyframe(this.material.uniforms.gamma, {
                            value: [null, this.fields.gamma]
                        }),
                        this.timeline.play(this.animationSkip))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global");
                        let t = 0;
                        Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const s = this._gammas[`${e}:${i.label}`] ?? this._gammas[e];
                            t += s * i.interpolation
                        }
                        )),
                        this.material.uniforms.gamma.value = t
                    }
                }
                const m = n(1404)
                  , f = n(1470);
                class _ extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        saturation: {
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            render: e=>"interpolation" !== e?.transition,
                            step: .01,
                            type: "Slider"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectAfter,
                                token: "#include <common>",
                                chunk: m
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectBefore,
                                token: "#include <tonemapping_fragment>",
                                chunk: f
                            }],
                            layer: e,
                            material: t,
                            name: "AdditionalSaturationShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    _saturations = {};
                    createInterpolationValues() {
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._saturations[e] = t.saturation
                        }
                        ))
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition ? this.timeline.on("update", (()=>{
                            this.animationHelper?.saturation && (this.material.uniforms.saturation.value = this.animationHelper.saturation)
                        }
                        )) : this.timeline && (this.timeline.addKeyframe(this.material.uniforms.saturation, {
                            value: [null, this.fields.saturation]
                        }),
                        this.timeline.play(this.animationSkip))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global");
                        let t = 0;
                        Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const s = this._saturations[`${e}:${i.label}`] ?? this._saturations[e];
                            t += s * i.interpolation
                        }
                        )),
                        this.material.uniforms.saturation.value = t
                    }
                }
                var g = n(927);
                const v = n(3244)
                  , y = n(3998);
                class M extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        ...(0,
                        g.x)("alphaMap"),
                        alphaMapOpacity: {
                            defaultValue: 0,
                            isVariant: !0,
                            min: 0,
                            max: 1,
                            step: .01,
                            label: "opacity",
                            type: "Slider"
                        },
                        ...i.Ah
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        t.transparent = !0,
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <alphamap_pars_fragment>",
                                chunk: v
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <alphamap_fragment>",
                                chunk: y
                            }],
                            layer: e,
                            material: t,
                            name: "AlphaMapShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    onStateChange(e) {
                        if (super.onStateChange(e),
                        "keyframes" === this.values.transition) {
                            const e = this.texture;
                            this.timeline.on("alphaMap", (async t=>{
                                window.requestAnimationFrame((()=>{
                                    const n = this.textures.get(t.startValue)
                                      , i = this.textures.get(t.endValue);
                                    e.setSourceFromTexture(n, !0),
                                    e.setDestinationFromTexture(i, !0),
                                    e.fade(0)
                                }
                                ))
                            }
                            )),
                            this.timeline.on("update", (()=>{
                                void 0 !== this.animationHelper?.alphaMap && (e.fade(this.animationHelper?.alphaMap),
                                this.material.alphaMap = e.renderTarget.texture),
                                void 0 !== this.animationHelper?.alphaMapOpacity && (this.material.uniforms.alphaMapOpacity.value = this.animationHelper?.alphaMapOpacity)
                            }
                            ))
                        } else
                            this.timeline && this.material?.uniforms?.alphaMapOpacity && (this.timeline.addKeyframe(this.material.uniforms.alphaMapOpacity, {
                                value: [null, this.fields.alphaMapOpacity]
                            }),
                            this.timeline.play(this.animationSkip))
                    }
                }
                const S = n(6028)
                  , x = n(8845);
                class b extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        aoMapChannelMixer: {
                            defaultValue: [1, 0, 0],
                            isVariant: !0,
                            type: "Vector"
                        },
                        ...i.Ah
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <aomap_pars_fragment>",
                                chunk: x
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <aomap_fragment>",
                                chunk: S
                            }],
                            layer: e,
                            material: t,
                            name: "AoChannelMixerShaderChunk",
                            scene: n,
                            values: i
                        }),
                        this.animationHelper = {
                            ...this.animationHelper,
                            aoMapChannelMixer: {
                                r: 0,
                                g: 0,
                                b: 0
                            }
                        }
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition ? this.timeline.on("update", (()=>{
                            if (void 0 !== this.animationHelper?.aoMapChannelMixer) {
                                const {r: e, g: t, b: n} = this.animationHelper.aoMapChannelMixer
                                  , i = this.material.uniforms.aoMapChannelMixer.value;
                                i.x = e,
                                i.y = t,
                                i.z = n
                            }
                        }
                        )) : this.timeline && (this.timeline.addKeyframe(this.material.uniforms.aoMapChannelMixer.value, {
                            x: [null, this.fields.aoMapChannelMixer[0]],
                            y: [null, this.fields.aoMapChannelMixer[1]],
                            z: [null, this.fields.aoMapChannelMixer[2]]
                        }),
                        this.timeline.play(this.animationSkip))
                    }
                }
                var T = n(4468);
                const C = [{
                    label: "NoBlending",
                    value: T.NoBlending
                }, {
                    label: "NormalBlending",
                    value: T.NormalBlending
                }, {
                    label: "AdditiveBlending",
                    value: T.AdditiveBlending
                }, {
                    label: "SubtractiveBlending",
                    value: T.SubtractiveBlending
                }, {
                    label: "MultiplyBlending",
                    value: T.MultiplyBlending
                }, {
                    label: "CustomBlending",
                    value: T.CustomBlending
                }]
                  , E = [{
                    label: "ZeroFactor",
                    value: T.ZeroFactor
                }, {
                    label: "OneFactor",
                    value: T.OneFactor
                }, {
                    label: "SrcColorFactor",
                    value: T.SrcColorFactor
                }, {
                    label: "OneMinusSrcColorFactor",
                    value: T.OneMinusSrcColorFactor
                }, {
                    label: "SrcAlphaFactor",
                    value: T.SrcAlphaFactor
                }, {
                    label: "OneMinusSrcAlphaFactor",
                    value: T.OneMinusSrcAlphaFactor
                }, {
                    label: "DstAlphaFactor",
                    value: T.DstAlphaFactor
                }, {
                    label: "OneMinusDstAlphaFactor",
                    value: T.OneMinusDstAlphaFactor
                }, {
                    label: "DstColorFactor",
                    value: T.DstColorFactor
                }, {
                    label: "OneMinusDstColorFactor",
                    value: T.OneMinusDstColorFactor
                }, {
                    label: "SrcAlphaSaturateFactor",
                    value: T.SrcAlphaSaturateFactor
                }]
                  , w = [{
                    label: "AddEquation",
                    value: T.AddEquation
                }, {
                    label: "SubtractEquation",
                    value: T.SubtractEquation
                }, {
                    label: "ReverseSubtractEquation",
                    value: T.ReverseSubtractEquation
                }, {
                    label: "MinEquation",
                    value: T.MinEquation
                }, {
                    label: "MaxEquation",
                    value: T.MaxEquation
                }]
                  , A = {
                    id: {
                        defaultValue: "",
                        editable: !1,
                        label: "ID",
                        type: "String"
                    },
                    blending: {
                        dataType: "Number",
                        defaultValue: T.NormalBlending,
                        options: C,
                        type: "Select"
                    },
                    blendSrc: {
                        dataType: "Number",
                        defaultValue: T.OneFactor,
                        options: E,
                        type: "Select"
                    },
                    blendDst: {
                        dataType: "Number",
                        defaultValue: T.ZeroFactor,
                        options: E,
                        type: "Select"
                    },
                    blendEquation: {
                        dataType: "Number",
                        defaultValue: T.AddEquation,
                        options: w,
                        type: "Select"
                    }
                };
                class L extends a.zd {
                    static fields = A;
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [],
                            layer: e,
                            material: t,
                            name: "BlendModeShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                }
                class V extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        color: {
                            defaultValue: "#ffffff",
                            isVariant: !0,
                            render: e=>"interpolation" !== e?.transition,
                            type: "Color"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [],
                            layer: e,
                            material: t,
                            name: "ColorAdjustmentShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    _colors = {};
                    createInterpolationValues() {
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._colors[e] = new T.Color(t.color).toArray()
                        }
                        ))
                    }
                    _colorStart = new T.Color;
                    _colorEnd = new T.Color;
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition && (this.timeline.on("color", (e=>{
                            window.requestAnimationFrame((()=>{
                                this._colorStart.setStyle(e.startValue),
                                this._colorEnd.setStyle(e.endValue)
                            }
                            ))
                        }
                        )),
                        this.timeline.on("update", (()=>{
                            this.material?.color && this.animationHelper?.color && this.material.color.lerpColors(this._colorStart, this._colorEnd, this.animationHelper.color)
                        }
                        )))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global")
                          , t = [0, 0, 0];
                        Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const [s,r,o] = this._colors[`${e}:${i.label}`] ?? this._colors[e];
                            void 0 !== s && void 0 !== r && void 0 !== o && (t[0] += s * i.interpolation,
                            t[1] += r * i.interpolation,
                            t[2] += o * i.interpolation)
                        }
                        )),
                        this.material.color.r = t[0],
                        this.material.color.g = t[1],
                        this.material.color.b = t[2]
                    }
                }
                var R = n(8506);
                class P extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        depthWrite: {
                            dataType: "Boolean",
                            defaultValue: !0,
                            type: "Boolean"
                        },
                        depthTest: {
                            dataType: "Boolean",
                            defaultValue: !0,
                            type: "Boolean"
                        },
                        depthFunc: {
                            dataType: "Number",
                            defaultValue: T.LessEqualDepth,
                            options: [{
                                label: "NeverDepth",
                                value: T.NeverDepth
                            }, {
                                label: "AlwaysDepth",
                                value: T.AlwaysDepth
                            }, {
                                label: "EqualDepth",
                                value: T.EqualDepth
                            }, {
                                label: "LessDepth",
                                value: T.LessDepth
                            }, {
                                label: "LessEqualDepth",
                                value: T.LessEqualDepth
                            }, {
                                label: "GreaterEqualDepth",
                                value: T.GreaterEqualDepth
                            }, {
                                label: "GreaterDepth",
                                value: T.GreaterDepth
                            }, {
                                label: "NotEqualDepth",
                                value: T.NotEqualDepth
                            }],
                            type: "Select"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [],
                            layer: e,
                            material: t,
                            name: "DepthModeShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                }
                const F = n(574);
                class U extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        ...(0,
                        g.x)("envMap", !0),
                        envMapBlurriness: {
                            defaultValue: 0,
                            isVariant: !0,
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        envMapIntensity: {
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            step: .01,
                            type: "Slider"
                        },
                        envMapOrientation: {
                            defaultValue: [0, 0, 0],
                            isVariant: !0,
                            type: "Vector"
                        },
                        ...i.Ah
                    };
                    constructor({layer: e, material: t, scene: n, variants: i, values: s}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <cube_uv_reflection_fragment>",
                                chunk: F
                            }],
                            layer: e,
                            material: t,
                            name: "EnvironmentShaderChunk",
                            scene: n,
                            values: s,
                            variants: i
                        })
                    }
                    async onStateChange(e) {
                        super.onStateChange(e);
                        const t = this.texture;
                        if ("keyframes" === this.values.transition)
                            this.timeline.on("envMap", (async e=>{
                                window.requestAnimationFrame((()=>{
                                    const n = this.textures.get(e.startValue)
                                      , i = t.getMapFromTexture(n, e.startValue)
                                      , a = this.textures.get(e.endValue)
                                      , s = t.getMapFromTexture(a, e.endValue);
                                    t.setSourceFromMap(i, !1),
                                    t.setDestinationFromMap(s, !1),
                                    t.fade(0)
                                }
                                ))
                            }
                            )),
                            this.timeline.on("update", (()=>{
                                void 0 !== this.animationHelper?.envMap && (t.fade(this.animationHelper?.envMap),
                                this.material.envMap = t.map.texture),
                                void 0 !== this.animationHelper?.envMapBlurriness && (this.material.uniforms.envMapBlurriness.value = this.animationHelper?.envMapBlurriness),
                                void 0 !== this.animationHelper?.envMapIntensity && (this.material.envMapIntensity = this.animationHelper?.envMapIntensity)
                            }
                            ));
                        else if (this.timeline) {
                            this.timeline.addKeyframe(this.material, {
                                envMapIntensity: [null, this.fields.envMapIntensity]
                            });
                            const e = this.fields.envMapOrientation.map(T.MathUtils.degToRad);
                            this.timeline.addKeyframe(this.material.uniforms.envMapOrientation.value, {
                                x: [null, e[0]],
                                y: [null, e[1]],
                                z: [null, e[2]]
                            }),
                            this.timeline.play(this.animationSkip)
                        }
                    }
                    async onValuesChange() {
                        if (await super.onValuesChange(),
                        this.textures) {
                            const e = this.textures.get(this.fields.envMap);
                            e.mapping = T.EquirectangularReflectionMapping,
                            e.needsUpdate = !0,
                            this.material.envMap = e
                        }
                        this.fields?.envMapOrientation && this.material.uniforms.envMapOrientation.value.fromArray(this.fields.envMapOrientation.map(T.MathUtils.degToRad)),
                        this.material && (this.material.uniformsNeedUpdate = !0,
                        this.material.needsUpdate = !0)
                    }
                }
                class O extends a.zd {
                    static fields = {
                        baseColor: {
                            defaultValue: "#4F4F4F",
                            label: "Base Color",
                            type: "Color"
                        },
                        fresnelColor: {
                            defaultValue: "#FFFFFF",
                            label: "Fresnel Color",
                            type: "Color"
                        },
                        fresnelPower: {
                            defaultValue: 1.46,
                            label: "Fresnel Power",
                            type: "Slider",
                            min: 1,
                            max: 8
                        },
                        fresnelScale: {
                            defaultValue: 1.153,
                            label: "Fresnel Scale",
                            type: "Slider",
                            min: 1,
                            max: 2
                        },
                        brightness: {
                            defaultValue: 1.39,
                            label: "Brightness",
                            type: "Slider",
                            min: 0,
                            max: 4
                        },
                        contrast: {
                            defaultValue: 2.39,
                            label: "Contrast",
                            type: "Slider",
                            min: 0,
                            max: 8
                        },
                        saturation: {
                            defaultValue: 1.338,
                            label: "Saturation",
                            type: "Slider",
                            min: 0,
                            max: 5
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [],
                            layer: e,
                            material: t,
                            name: "FresnelShaderChunk",
                            scene: n,
                            values: i
                        }),
                        window.lensMaterial = this.material,
                        this.material.onBeforeCompile = (e,t)=>{
                            e.vertexShader = "\n        varying vec3 vViewPosition;\n        varying vec3 vNormal;\n\n        void main() {\n          vNormal = normalize(normalMatrix * normal);\n          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n          vViewPosition = -mvPosition.xyz;\n          gl_Position = projectionMatrix * mvPosition;\n        }\n      ",
                            e.fragmentShader = "\n        uniform vec3 baseColor;\n        uniform vec3 fresnelColor;\n        uniform float fresnelPower;\n        uniform float fresnelScale;\n    \n        uniform float brightness;\n        uniform float contrast;\n        uniform float saturation;\n    \n        varying vec3 vViewPosition;\n        varying vec3 vNormal;\n    \n        vec3 SetBrightnessContrast(vec3 color, float brightness, float contrast)\n        {\n          vec3 finalColor;\n          finalColor.rgb = 1.0 - exp(-color.rgb * brightness);\n          finalColor.r = pow(finalColor.r, contrast);\n          finalColor.g = pow(finalColor.g, contrast);\n          finalColor.b = pow(finalColor.b, contrast);\n          return finalColor;\n        }\n    \n        vec3 LinearRgbToLuminance(vec3 linearRgb)\n        {\n          float finalColor = dot(linearRgb, vec3(0.2126729, 0.7151522, 0.0721750));\n          return vec3(finalColor);\n        }\n    \n        vec3 SetSaturation(vec3 color, float saturation)\n        {\n          vec3 adjustColor;\n          adjustColor.rgb = mix(LinearRgbToLuminance(color.rgb), color.rgb, saturation);\n          return adjustColor;\n        }\n    \n        vec4 fresnel(vec3 normal, vec3 viewDir)\n        {\n          float cosTheta = dot(normal, viewDir);\n          float fresnel = min(fresnelScale * pow(1.0 - cosTheta, fresnelPower), 1.0);\n          return vec4(fresnel, fresnel, fresnel, 1.0);\n        }\n    \n        void main() {\n          vec3 normal = normalize(vNormal);\n          vec3 viewDir = normalize(vViewPosition);\n          vec4 fresnelFinal = fresnel(normal, viewDir);\n          vec3 mixColor = mix(baseColor, fresnelColor, fresnelFinal.r);\n    \n          vec3 finalColor = SetBrightnessContrast(mixColor, brightness, contrast);\n          finalColor = SetSaturation(finalColor, saturation);\n    \n          gl_FragColor = vec4(finalColor, 1.0);\n\n          #include <tonemapping_fragment>\n          #include <encodings_fragment>\n          #include <premultiplied_alpha_fragment>\n        }\n      "
                        }
                    }
                }
                const D = n(4789)
                  , k = n(403);
                class I extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        ...(0,
                        g.x)("lightMap", !0, (e=>"interpolation" !== e?.transition)),
                        lightMapColor: {
                            defaultValue: [1, 1, 1],
                            isVariant: !0,
                            render: e=>"interpolation" !== e?.transition,
                            type: "Vector"
                        },
                        lightMapIntensity: {
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            render: e=>"interpolation" !== e?.transition,
                            step: .001,
                            type: "Slider"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <lightmap_pars_fragment>",
                                chunk: D
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <lights_fragment_maps>",
                                chunk: k
                            }],
                            layer: e,
                            material: t,
                            name: "LightMapShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    _colors = {};
                    _intensities = {};
                    _interpolations = {};
                    createInterpolationValues() {
                        if (1 === this.textures.size) {
                            this.destroyTexture();
                            const [[e,t]] = this.textures.entries();
                            this.material.lightMap = t
                        }
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._colors[e] = t.lightMapColor,
                            this._intensities[e] = t.lightMapIntensity,
                            this._interpolations[e] = t.lightMap
                        }
                        )),
                        this.ready.then((()=>{
                            if (this.textures.forEach((e=>{
                                e.channel = this.fields.lightMapUV,
                                e.colorSpace = this.fields.lightMapColorSpace,
                                e.flipY = this.fields.lightMapFlipY,
                                e.wrapS = this.fields.lightMapWrapS,
                                e.wrapT = this.fields.lightMapWrapT,
                                e.needsUpdate = !0
                            }
                            )),
                            this.texture) {
                                const e = this.texture.map.texture;
                                window.requestAnimationFrame((()=>{
                                    e.channel = this.fields.lightMapUV,
                                    e.colorSpace = this.fields.lightMapColorSpace,
                                    e.flipY = this.fields.lightMapFlipY,
                                    e.wrapS = this.fields.lightMapWrapS,
                                    e.wrapT = this.fields.lightMapWrapT,
                                    e.needsUpdate = !0,
                                    this.material.lightMap = e
                                }
                                ))
                            }
                        }
                        ))
                    }
                    async onStateChange(e) {
                        if (super.onStateChange(e),
                        "keyframes" === this.values.transition) {
                            const e = this.texture;
                            this.timeline.on("lightMap", (async t=>{
                                window.requestAnimationFrame((()=>{
                                    const n = this.textures.get(t.startValue)
                                      , i = this.textures.get(t.endValue);
                                    e.setSourceFromTexture(n, !0),
                                    e.setDestinationFromTexture(i, !0),
                                    e.fade(0)
                                }
                                ))
                            }
                            )),
                            this.timeline.on("update", (()=>{
                                void 0 !== this.animationHelper?.lightMap && (e.fade(this.animationHelper?.lightMap),
                                this.material.lightMap = e.renderTarget.texture),
                                void 0 !== this.animationHelper?.lightMapIntensity && (this.material.lightMapIntensity = this.animationHelper?.lightMapIntensity)
                            }
                            ))
                        } else
                            "standard" === this.values.transition && this.timeline && (this.timeline.addKeyframe(this.material, {
                                lightMapIntensity: [null, this.fields.lightMapIntensity]
                            }),
                            this.timeline.play(this.animationSkip))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global");
                        if (this.material.uniforms.lightMapColor) {
                            let t = 0
                              , n = 0
                              , i = 0;
                            this._colors && Object.entries(this.interpolation.interpolations).forEach((([a,s],r)=>{
                                const o = this._colors[`${e}:${s.label}`] ?? this._colors[e];
                                t += o[0] * s.interpolation,
                                n += o[1] * s.interpolation,
                                i += o[2] * s.interpolation
                            }
                            )),
                            this.material.uniforms.lightMapColor.value.x = t,
                            this.material.uniforms.lightMapColor.value.y = n,
                            this.material.uniforms.lightMapColor.value.z = i
                        }
                        let t = 0;
                        this._intensities && Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const s = this._intensities[`${e}:${i.label}`] ?? this._intensities[e];
                            t += s * i.interpolation
                        }
                        )),
                        this.material.lightMapIntensity = t;
                        const n = this.texture;
                        n && this.textures && (n.render(),
                        this._interpolations && Object.entries(this.interpolation.interpolations).forEach((([t,i],a)=>{
                            const s = this._interpolations[`${e}:${i.label}`] ?? this._interpolations[e]
                              , r = this.textures.get(s);
                            r && (n.setTexture(r, a),
                            n.setOpacity(i.interpolation, a))
                        }
                        )))
                    }
                }
                const N = n(3592)
                  , H = n(6912)
                  , z = n(6379);
                class j extends a.zd {
                    static fields = {
                        ocularIOR: {
                            defaultValue: 1.1,
                            label: "IOR",
                            type: "Slider",
                            min: 1,
                            max: 1.5
                        },
                        ocularNormalScaling: {
                            defaultValue: 1,
                            label: "normal scaling",
                            type: "Slider",
                            min: 0,
                            max: 2
                        },
                        glancingAmount: {
                            defaultValue: 1,
                            label: "Attenuation",
                            type: "Slider",
                            min: 0,
                            max: 1
                        },
                        glancingShape: {
                            defaultValue: 0,
                            label: "Att. Shape",
                            type: "Slider",
                            min: -2,
                            max: 2
                        },
                        bias: {
                            defaultValue: 0,
                            label: "Mipmap Bias",
                            type: "Slider",
                            min: -1,
                            max: 1
                        },
                        ocularEmissiveMap: {
                            defaultValue: "",
                            label: "Emissive Map",
                            type: "String"
                        },
                        ocularEmissiveIntensity: {
                            defaultValue: 1,
                            label: "Brightness",
                            type: "Slider",
                            min: 0,
                            max: 2
                        },
                        imageCenterH: {
                            defaultValue: .5,
                            label: "X Center",
                            min: 0,
                            max: 1,
                            type: "Slider"
                        },
                        imageCenterV: {
                            defaultValue: .5,
                            label: "Y Center",
                            min: 0,
                            max: 1,
                            type: "Slider"
                        },
                        zoom: {
                            defaultValue: 1,
                            label: "Image Width (world)",
                            min: .1,
                            max: 3,
                            type: "Slider"
                        },
                        emissiveWorldPos: {
                            defaultValue: [0, 0, 0],
                            label: "Position (world)",
                            type: "Vector"
                        },
                        rotateH: {
                            defaultValue: 0,
                            label: "Tilt X (rad)",
                            min: -.8,
                            max: .8,
                            type: "Slider"
                        },
                        rotateV: {
                            defaultValue: 0,
                            label: "Tilt Y (rad)",
                            min: -.8,
                            max: .8,
                            type: "Slider"
                        },
                        rotateImage: {
                            defaultValue: 0,
                            label: "Rotate (rad)",
                            min: -.5,
                            max: .5,
                            type: "Slider"
                        },
                        vignette: {
                            defaultValue: .01,
                            label: "Vignette",
                            min: .001,
                            max: .5,
                            type: "Slider"
                        },
                        planeDebugGrid: {
                            defaultValue: 0,
                            label: "Plane Grid",
                            min: 0,
                            max: 1,
                            type: "Slider"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [],
                            layer: e,
                            material: t,
                            name: "OcularShaderChunk",
                            scene: n,
                            values: i
                        }),
                        this.material.transmission = 0,
                        this.material.transparent = !1,
                        this.material.onBeforeCompile = (e,t)=>{
                            e.vertexShader = "\n        varying vec3 vWorldPosition;\n      " + e.vertexShader,
                            e.vertexShader = e.vertexShader.replace("#include <worldpos_vertex>", z),
                            e.fragmentShader = H + e.fragmentShader,
                            e.fragmentShader = e.fragmentShader.replace("#include <transmission_fragment>", N)
                        }
                    }
                    async onValuesChange() {
                        if (await super.onValuesChange(),
                        this.material) {
                            const e = this.material.uniforms.ocularEmissiveMap.value;
                            e.flipY = !0,
                            this.material.uniforms.aspect = {
                                value: e.image.width / e.image.height
                            },
                            this.material.needsUpdate = !0
                        }
                    }
                }
                var G = n(6816);
                const B = n(9275)
                  , W = n(8542)
                  , X = n(3451)
                  , Y = n(5181)
                  , q = n(3188)
                  , K = n(12);
                class $ extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        parallaxMode: {
                            defaultValue: "USE_OCCLUSION_PARALLAX",
                            label: "Mode",
                            options: [{
                                label: "basic",
                                value: "USE_BASIC_PARALLAX"
                            }, {
                                label: "steep",
                                value: "USE_STEEP_PARALLAX"
                            }, {
                                label: "occlusion",
                                value: "USE_OCCLUSION_PARALLAX"
                            }, {
                                label: "relief",
                                value: "USE_RELIEF_PARALLAX"
                            }],
                            type: "Select"
                        },
                        parallaxMap: {
                            defaultValue: "",
                            label: "Map",
                            type: "String"
                        },
                        parallaxMapChannel: {
                            defaultValue: [1, 0, 0],
                            label: "Map Channel",
                            type: "Vector"
                        },
                        parallaxMapInverted: {
                            defaultValue: !1,
                            label: "Inverted",
                            type: "Boolean"
                        },
                        parallaxClip: {
                            defaultValue: !1,
                            label: "Clip Edges",
                            type: "Boolean"
                        },
                        parallaxClipOffset: {
                            defaultValue: .01,
                            label: "Clip Offset",
                            min: 0,
                            max: .2,
                            step: .001,
                            type: "Slider"
                        },
                        parallaxScale: {
                            defaultValue: .05,
                            label: "Scale",
                            min: 0,
                            max: 1,
                            step: .001,
                            type: "Slider"
                        },
                        parallaxMinLayers: {
                            defaultValue: 20,
                            label: "Min. Layers",
                            min: 1,
                            max: 128,
                            step: 1,
                            type: "Slider"
                        },
                        parallaxMaxLayers: {
                            defaultValue: 25,
                            label: "Max. Layers",
                            min: 1,
                            max: 128,
                            step: 1,
                            type: "Slider"
                        },
                        parallaxAOUseOwnUV: {
                            defaultValue: !1,
                            label: "AO uses Own UV",
                            type: "Boolean"
                        },
                        parallaxUseLightmap: {
                            defaultValue: !1,
                            label: "Use Lightmap",
                            type: "Boolean"
                        },
                        parallaxLightmapUseOwnUV: {
                            defaultValue: !1,
                            label: "Lightmap uses Own UV",
                            type: "Boolean"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.VertexShader,
                                type: a.hl.Replace,
                                token: "#include <uv_pars_vertex>",
                                chunk: B
                            }, {
                                target: a.rP.VertexShader,
                                type: a.hl.Replace,
                                token: "#include <uv_vertex>",
                                chunk: W
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.Replace,
                                token: "#include <uv_pars_fragment>",
                                chunk: X
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectAfter,
                                token: "#include <bumpmap_pars_fragment>",
                                chunk: Y
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectBefore,
                                token: "#include <clipping_planes_fragment>",
                                chunk: q
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectBefore,
                                token: "#include <tonemapping_fragment>",
                                chunk: K
                            }],
                            layer: e,
                            material: t,
                            name: "ParallaxMappingShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    parallaxMapChannel = new T.Vector3;
                    parallaxUvTransform = new T.Vector4(1,1,.5,.5);
                    async onStateChange(e) {
                        super.onStateChange(e),
                        this.onValuesChange()
                    }
                    async onValuesChange() {
                        if (await super.onValuesChange(),
                        this.fields.parallaxMap) {
                            const e = await G.j.get(this.fields.parallaxMap);
                            e.flipY = !1,
                            e.wrapS = T.RepeatWrapping,
                            e.wrapT = T.RepeatWrapping,
                            this.material.map && (e.repeat = this.material.map.repeat,
                            e.center = this.material.map.center,
                            e.offset = this.material.map.offset,
                            e.flipY = this.material.map.flipY,
                            e.wrapS = this.material.map.wrapS,
                            e.wrapT = this.material.map.wrapT),
                            this.material.uniforms.parallaxMap = {
                                value: e
                            },
                            this.material.needsUpdate = !0,
                            this.material.defines = {
                                USE_BASIC_PARALLAX: "define_USE_BASIC_PARALLAX" === this.fields.uniforms?.parallaxMode,
                                USE_STEEP_PARALLAX: "define_USE_STEEP_PARALLAX" === this.fields.uniforms?.parallaxMode,
                                USE_OCCLUSION_PARALLAX: "define_USE_OCCLUSION_PARALLAX" === this.fields.uniforms?.parallaxMode,
                                USE_RELIEF_PARALLAX: "define_USE_RELIEF_PARALLAX" === this.fields.uniforms?.parallaxMode
                            },
                            this.material.map && (this.parallaxUvTransform.x = this.material.map.repeat.x,
                            this.parallaxUvTransform.y = this.material.map.repeat.y,
                            this.parallaxUvTransform.z = this.material.map.offset.x,
                            this.parallaxUvTransform.w = this.material.map.offset.y),
                            this.material.uniforms.parallaxUvTransform = {
                                value: this.parallaxUvTransform
                            },
                            this.material.uniformsNeedUpdate = !0,
                            this.material.needsUpdate = !0
                        }
                        this.material.defines = {
                            USE_BASIC_PARALLAX: "USE_BASIC_PARALLAX" === this.fields.parallaxMode,
                            USE_STEEP_PARALLAX: "USE_STEEP_PARALLAX" === this.fields.parallaxMode,
                            USE_OCCLUSION_PARALLAX: "USE_OCCLUSION_PARALLAX" === this.fields.parallaxMode,
                            USE_RELIEF_PARALLAX: "USE_RELIEF_PARALLAX" === this.fields.parallaxMode
                        },
                        this.fields.parallaxMapChannel && (this.parallaxMapChannel.x = this.fields.parallaxMapChannel[0],
                        this.parallaxMapChannel.y = this.fields.parallaxMapChannel[1],
                        this.parallaxMapChannel.z = this.fields.parallaxMapChannel[2]),
                        this.material.map && (this.parallaxUvTransform.x = this.material.map.repeat.x,
                        this.parallaxUvTransform.y = this.material.map.repeat.y,
                        this.parallaxUvTransform.z = this.material.map.offset.x,
                        this.parallaxUvTransform.w = this.material.map.offset.y),
                        this.material.uniforms.parallaxUvTransform = {
                            value: this.parallaxUvTransform
                        },
                        this.material.uniforms.parallaxMapChannel = {
                            value: this.parallaxMapChannel
                        },
                        this.material.uniformsNeedUpdate = !0,
                        this.material.needsUpdate = !0
                    }
                }
                var Q = n(14);
                class Z extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        toneMapped: {
                            dataType: "Boolean",
                            defaultValue: !1,
                            type: "Boolean"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [],
                            layer: e,
                            material: t,
                            name: "ToneMapShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                }
                class J extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        transparent: {
                            dataType: "Boolean",
                            defaultValue: !1,
                            type: "Boolean"
                        },
                        opacity: {
                            dataType: "number",
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 1,
                            render: e=>"interpolation" !== e?.transition,
                            step: .001,
                            type: "Slider"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [],
                            layer: e,
                            material: t,
                            name: "TransparencyShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    _opacities = {};
                    createInterpolationValues() {
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._opacities[e] = t.opacity
                        }
                        ))
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition && this.timeline.on("update", (()=>{
                            this.animationHelper?.opacity && (this.material.opacity = this.animationHelper.opacity)
                        }
                        ))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global");
                        let t = 0;
                        Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const s = this._opacities[`${e}:${i.label}`] ?? this._opacities[e];
                            t += s * i.interpolation
                        }
                        )),
                        this.material.opacity = t
                    }
                }
                const ee = n(5004)
                  , te = n(3557);
                class ne extends a.zd {
                    static fields = {
                        id: {
                            defaultValue: "",
                            editable: !1,
                            label: "ID",
                            type: "String"
                        },
                        exposure: {
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            render: e=>"interpolation" !== e?.transition,
                            step: .01,
                            type: "Slider"
                        },
                        ...i.Ah,
                        interpolation: {
                            defaultValue: "",
                            render: e=>"interpolation" === e.transition,
                            type: "String"
                        }
                    };
                    constructor({layer: e, material: t, scene: n, values: i}) {
                        super({
                            instructions: [{
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectAfter,
                                token: "#include <common>",
                                chunk: ee
                            }, {
                                target: a.rP.FragmentShader,
                                type: a.hl.InjectBefore,
                                token: "#include <tonemapping_fragment>",
                                chunk: te
                            }],
                            layer: e,
                            material: t,
                            name: "AdditionalExposureShaderChunk",
                            scene: n,
                            values: i
                        })
                    }
                    _exposures = {};
                    createInterpolationValues() {
                        Object.entries(this.fields.states).forEach((([e,t])=>{
                            e = e.replace(/_/g, ":"),
                            this._exposures[e] = t.exposure
                        }
                        ))
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        "keyframes" === this.values.transition ? this.timeline.on("update", (()=>{
                            this.animationHelper?.exposure && (this.material.uniforms.exposure.value = this.animationHelper.exposure)
                        }
                        )) : this.timeline && (this.timeline.addKeyframe(this.material.uniforms.exposure, {
                            value: [null, this.fields.exposure]
                        }),
                        this.timeline.play(this.animationSkip))
                    }
                    onLoop() {
                        if (!this.interpolation || !this.layer.isVisible)
                            return;
                        const e = this.scene.state.get("global");
                        let t = 0;
                        Object.entries(this.interpolation.interpolations).forEach((([n,i],a)=>{
                            const s = this._exposures[`${e}:${i.label}`] ?? this._exposures[e];
                            t += s * i.interpolation
                        }
                        )),
                        this.material.uniforms.exposure.value = t
                    }
                }
            },
            5271: function(e, t, n) {
                "use strict";
                n.d(t, {
                    f: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(6443)
                  , s = n(3395);
                class r {
                    id;
                    name;
                    type;
                    _currentActionData;
                    _currentActionTimeout;
                    _animations;
                    _data;
                    _scene;
                    constructor({animations: e, data: t, scene: n}) {
                        this._animations = e,
                        this._data = t,
                        this._scene = n,
                        this._scene.eventPool?.register(this),
                        this.createActions(),
                        this._scene.ready.then((()=>{
                            this.onStateChange()
                        }
                        ))
                    }
                    _actions = new Map;
                    get actions() {
                        return this._actions
                    }
                    createActions() {
                        this._data.actions.forEach(((e,t)=>{
                            const n = new a.p({
                                action: this.getAction(e.name),
                                data: e
                            });
                            this._actions.set(e.name, n)
                        }
                        ))
                    }
                    getAction(e) {
                        const t = this._animations.clips.find((t=>t.name === e));
                        return t?.action
                    }
                    onStateChange() {
                        const e = this._scene.state.getAll();
                        let t;
                        if (this._actions.forEach((n=>{
                            const i = {};
                            n.states.forEach((e=>{
                                const t = this._scene.statesManager.states.find((t=>e === t.value));
                                if (t) {
                                    const e = i[t.category] ?? [];
                                    e.push(t.value),
                                    i[t.category] = e
                                }
                            }
                            ));
                            let a = 1;
                            for (const [t,n] of Object.entries(i)) {
                                const i = e ? e[t] : null;
                                a *= i && -1 !== n.indexOf(i) ? 1 : 0
                            }
                            a && (t = n)
                        }
                        )),
                        t && t !== this._currentActionData)
                            this.animate(t);
                        else if (this._currentActionData && this._currentActionData.fadeOnChangeState) {
                            const e = this.getAction(this._currentActionData.name);
                            e && (e.fadeOut(this._currentActionData.fadeOutTime),
                            this._currentActionData = null)
                        }
                    }
                    animate(e) {
                        let t;
                        this._currentActionTimeout && (window.clearTimeout(this._currentActionTimeout),
                        this._currentActionTimeout = void 0);
                        const n = this.getAction(e.name)
                          , a = e.duration;
                        if (this._currentActionData && (t = this.getAction(this._currentActionData.name),
                        t && (t.setLoop(this._currentActionData.loop, this._currentActionData.repetitions),
                        t.clampWhenFinished = this._currentActionData.clampWhenFinished)),
                        n) {
                            const s = ()=>{
                                n.reset(),
                                n.clampWhenFinished = e.clampWhenFinished,
                                n.enabled = !0,
                                n.setLoop(e.loop, e.loop === i.LoopRepeat ? 1 / 0 : e.repetitions),
                                n.time = 0,
                                n.timeScale = e.timeScale,
                                n.weight = e.weight,
                                n.play(),
                                t ? (e.syncWithPreviousAction && n.syncWith(t),
                                n.crossFadeFrom(t, a, !1)) : n.fadeIn(a)
                            }
                            ;
                            if (e.delay > 0) {
                                const t = 1e3 * e.delay;
                                this._currentActionTimeout = window.setTimeout(s, t)
                            } else
                                s()
                        } else
                            t && t.fadeOut(a);
                        this._currentActionData = e
                    }
                    destroy() {
                        this._actions.forEach((e=>{
                            e.destroy()
                        }
                        )),
                        s.H.destroy(this)
                    }
                }
            },
            6443: function(e, t, n) {
                "use strict";
                n.d(t, {
                    p: function() {
                        return s
                    }
                });
                var i = n(4468)
                  , a = n(3395);
                class s {
                    get name() {
                        return this._data.name
                    }
                    _action;
                    _data;
                    _clampWhenFinished;
                    delay;
                    duration;
                    _loop;
                    _repetitions;
                    startOnNextLoop;
                    states;
                    syncWithPreviousAction;
                    _timeScale;
                    _weight;
                    fadeOnChangeState;
                    fadeOutTime;
                    constructor({action: e, data: t}) {
                        this._action = e,
                        this._data = t,
                        this.clampWhenFinished = t.clampWhenFinished ?? !0,
                        this.delay = isNaN(t.delay) ? 0 : t.delay,
                        this.duration = t.duration ?? 0,
                        this.loop = t.loop ?? i.LoopRepeat,
                        this.repetitions = t.repetitions ?? 1 / 0,
                        this.startOnNextLoop = t.startOnNextLoop ?? !1,
                        this.states = [...t.states],
                        this.syncWithPreviousAction = t.syncWithPreviousAction ?? !1,
                        this.timeScale = t.timeScale ?? 1,
                        this.weight = t.weight ?? 1,
                        this.fadeOnChangeState = t.fadeOnChangeState ?? !1,
                        this.fadeOutTime = t.fadeOutTime ?? 0
                    }
                    get clampWhenFinished() {
                        return this._clampWhenFinished
                    }
                    set clampWhenFinished(e) {
                        this._clampWhenFinished = e,
                        this._action.clampWhenFinished = e
                    }
                    get loop() {
                        return this._loop
                    }
                    set loop(e) {
                        this._loop = e,
                        this._action.setLoop(this.loop, this.repetitions)
                    }
                    get repetitions() {
                        return this._repetitions
                    }
                    set repetitions(e) {
                        this._repetitions = e,
                        this._action?.setLoop(this.loop, this.repetitions)
                    }
                    get timeScale() {
                        return this._timeScale
                    }
                    set timeScale(e) {
                        this._timeScale = e,
                        this._action.timeScale = e
                    }
                    get weight() {
                        return this._weight
                    }
                    set weight(e) {
                        this._weight = e,
                        this._action.weight = e
                    }
                    destroy() {
                        a.H.destroy(this)
                    }
                }
            },
            9629: function(e, t, n) {
                "use strict";
                n.d(t, {
                    I: function() {
                        return s
                    }
                });
                var i = n(4468)
                  , a = n(3395);
                class s {
                    _animations;
                    _clip;
                    _data;
                    get name() {
                        return this._data.name
                    }
                    _scene;
                    constructor({animations: e, clip: t, data: n, scene: i}) {
                        this._animations = e,
                        this._clip = t,
                        this._data = n,
                        this._scene = i,
                        this._scene.eventPool?.register(this),
                        this.createAction()
                    }
                    _action;
                    get action() {
                        return this._action
                    }
                    createAction() {
                        this._action && this._action.setEffectiveWeight(0);
                        let e = this._clip;
                        this._data?.isAdditive && (e = i.AnimationUtils.makeClipAdditive(e)),
                        this._action = this._animations.mixer.clipAction(e)
                    }
                    destroy() {
                        this._action.stop(),
                        a.H.destroy(this)
                    }
                }
            },
            981: function(e, t, n) {
                "use strict";
                n.d(t, {
                    F: function() {
                        return o
                    }
                });
                var i = n(4468)
                  , a = n(3395)
                  , s = n(5271)
                  , r = n(9629);
                class o extends i.EventDispatcher {
                    _data;
                    _file;
                    _scene;
                    constructor({data: e, file: t, scene: n}) {
                        super(),
                        this._data = e,
                        this._file = t,
                        this._scene = n,
                        this._scene.eventPool?.register(this),
                        this.createMixer(),
                        this.createGLTF()
                    }
                    _mixer;
                    get mixer() {
                        return this._mixer
                    }
                    createMixer() {
                        this._mixer = new i.AnimationMixer(this._scene)
                    }
                    _animations = [];
                    get animations() {
                        return this._animations
                    }
                    _clips = [];
                    get clips() {
                        return this._clips
                    }
                    createGLTF() {
                        const e = [...this._file.animations];
                        e.length > 0 && e.push(new i.AnimationClip("None",1,[])),
                        this._clips = e.map((e=>{
                            const t = this._data.clips.find((t=>t.name === e.name));
                            return new r.I({
                                animations: this,
                                clip: e,
                                data: t,
                                scene: this._scene
                            })
                        }
                        )),
                        this._animations = this._data.animations.map((e=>new s.f({
                            animations: this,
                            data: e,
                            scene: this._scene
                        })))
                    }
                    onLoop({delta: e}) {
                        this._mixer?.update?.(e)
                    }
                    destroy() {
                        this._animations.forEach((e=>{
                            e.destroy()
                        }
                        )),
                        this._clips.forEach((e=>{
                            e.destroy()
                        }
                        )),
                        this._mixer && this._mixer.stopAllAction(),
                        a.H.destroy(this)
                    }
                }
            },
            3456: function(e, t, n) {
                "use strict";
                n.d(t, {
                    a: function() {
                        return s
                    },
                    o: function() {
                        return a
                    }
                });
                var i = n(3395);
                class a {
                    _key;
                    _onUpdate;
                    constructor(e, t) {
                        this._key = e,
                        this._onUpdate = t
                    }
                    update(e, t) {
                        this._onUpdate?.(t)
                    }
                    destroy() {
                        i.H.destroy(this)
                    }
                }
                class s {
                    _map = new Map;
                    _bindings = new Map;
                    constructor(e) {
                        e && this.setAll(e)
                    }
                    setAll(e) {
                        for (const t in e)
                            this.set(t, e[t])
                    }
                    getAll() {
                        const e = {};
                        return Array.from(this.getKeys()).forEach((t=>{
                            e[t] = this.get(t)
                        }
                        )),
                        e
                    }
                    set(e, t) {
                        this._map.set(e, t);
                        const n = this._bindings.get(e);
                        n && n.forEach((n=>{
                            n.update?.(e, t)
                        }
                        ))
                    }
                    get(e) {
                        return this._map.get(e)
                    }
                    getKeys() {
                        return this._map.keys()
                    }
                    bind(e, t) {
                        const n = new a(e,t);
                        this._bindings.has(e) ? this._bindings.get(e).push(n) : this._bindings.set(e, [n]);
                        const i = this._map.get(e);
                        return i && n.update(e, i),
                        n
                    }
                    destroy() {
                        this._map.clear(),
                        this._bindings.forEach((e=>{
                            e?.destroy?.()
                        }
                        )),
                        this._bindings.clear(),
                        i.H.destroy(this)
                    }
                }
            },
            7699: function(e, t, n) {
                "use strict";
                n.d(t, {
                    h: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(9653)
                  , s = n(1536);
                class r extends i.PerspectiveCamera {
                    scene;
                    constructor({name: e="BaseCamera", position: t=[0, 0, 0], rotation: n=[0, 0, 0], scene: i}={
                        scene: a.Lotus.scene
                    }) {
                        super(),
                        this.layers.enableAll(),
                        this.layers.disable(s.Q6),
                        this.name = e,
                        this.near = 3,
                        this.position.fromArray(t),
                        this.rotation.fromArray(n),
                        this.scene = i,
                        this.scene.eventPool?.register(this)
                    }
                    calculateUnitSize(e=this.position.z) {
                        const t = this.fov * Math.PI / 180
                          , n = 2 * Math.tan(t / 2) * e;
                        return {
                            height: n,
                            width: n * this.aspect
                        }
                    }
                    onResize({ratio: e}) {
                        this.aspect = e,
                        this.updateProjectionMatrix()
                    }
                }
            },
            9283: function(e, t, n) {
                "use strict";
                n.d(t, {
                    Z: function() {
                        return f
                    }
                });
                var i = n(4468)
                  , a = n(7340)
                  , s = n(4370)
                  , r = n(9653)
                  , o = n(7699)
                  , l = n(2840)
                  , h = n(4282)
                  , c = n(306)
                  , d = n(3395)
                  , u = n(6060)
                  , p = n(7716)
                  , m = n(5103);
                class f {
                    _scene;
                    _domElement;
                    constructor({scene: e}) {
                        this._scene = e,
                        this._scene.eventPool?.register(this),
                        this._domElement = this._scene.renderer.domElement,
                        this.onKeyPress = this.onKeyPress.bind(this),
                        this.onTransformChange = this.onTransformChange.bind(this),
                        this.onTransformDragged = this.onTransformDragged.bind(this),
                        this.createCamera(),
                        this.createGrid(),
                        this.createAxis(),
                        this.createOrbit(),
                        this.createCommands(),
                        this.createTransform(),
                        this.createCameraHelper(),
                        this.createOutlineHandler()
                    }
                    _viewportOptions = {
                        background: "#fff",
                        width: "100%",
                        height: "100%",
                        grid: !0,
                        axis: !0,
                        frustum: !1,
                        select: !0
                    };
                    _selected = null;
                    _hold = {
                        timer: null,
                        timeOffset: 0,
                        isHolding: !1
                    };
                    _outlineHandler;
                    get outlineHandler() {
                        return this._outlineHandler
                    }
                    createOutlineHandler() {
                        this._outlineHandler = new m.L({
                            scene: this._scene
                        })
                    }
                    destroyOutlineHandler() {
                        this._outlineHandler.destroy()
                    }
                    _camera;
                    get camera() {
                        return this._camera
                    }
                    createCamera() {
                        this._camera = new o.h({
                            scene: this._scene
                        }),
                        this._camera.layers.enableAll()
                    }
                    _axis;
                    _axisHelper;
                    createAxis() {
                        this._axis = new s.j(this._camera,this._domElement),
                        this._axis.visible = this._isEnabled,
                        this._axisHelper = new i.AxesHelper(100),
                        this._axisHelper.layers.set(p.Q6),
                        this._axisHelper.visible = !!this._isEnabled && this._viewportOptions.axis,
                        this._scene.add(this._axisHelper)
                    }
                    destroyAxis() {
                        this._axisHelper?.dispose(),
                        this._axis?.dispose()
                    }
                    _gridHelper;
                    createGrid() {
                        this._gridHelper = new i.GridHelper(80,50,2236962,2434341),
                        this._gridHelper.layers.set(p.Q6),
                        this._gridHelper.position.y = -1e-4,
                        this._gridHelper.visible = !!this._isEnabled && this._viewportOptions.grid,
                        this._scene.add(this._gridHelper)
                    }
                    destroyGrid() {
                        this._gridHelper?.dispose()
                    }
                    _cameraHelper;
                    _cameraHelperFrustum;
                    async createCameraHelper() {
                        this._cameraHelper = new i.CameraHelper(this._scene.camera),
                        this._cameraHelperFrustum = new i.CameraHelper(this._scene.camera),
                        this._scene.add(this._cameraHelper),
                        this._scene.add(this._cameraHelperFrustum),
                        this.setCameraHelperFrustum(!1)
                    }
                    setCameraHelperColors() {
                        const e = new i.Color(4495684)
                          , t = new i.Color(16729156)
                          , n = new i.Color(255)
                          , a = new i.Color(7829367)
                          , s = new i.Color(6710886);
                        this._cameraHelper?.setColors(e, t, n, a, s)
                    }
                    setCameraHelperFrustum(e=!0) {
                        e ? (this._cameraHelper.geometry.setDrawRange(0, 64),
                        this._cameraHelperFrustum.visible = !1) : (this._cameraHelper.geometry.setDrawRange(0, 8),
                        this._cameraHelperFrustum.geometry.setDrawRange(24, 14),
                        this._cameraHelperFrustum.visible = !0)
                    }
                    destroyCameraHelper() {
                        this._cameraHelper?.dispose(),
                        this._cameraHelperFrustum?.dispose()
                    }
                    _orbit;
                    get orbit() {
                        return this._orbit
                    }
                    createOrbit() {
                        this._orbit = new a.z(this._camera,this._domElement),
                        this._orbit.enableDamping = !0,
                        this._camera.position.x = 20,
                        this._camera.position.y = 20,
                        this._camera.position.z = 30
                    }
                    destroyOrbit() {
                        this._orbit.dispose()
                    }
                    centerOrbit() {
                        this._orbit.target.set(0, 0, 0)
                    }
                    createCommands() {
                        window.addEventListener("keypress", this.onKeyPress, !1)
                    }
                    destroyCommands() {
                        window.removeEventListener("keypress", this.onKeyPress)
                    }
                    _transform;
                    get transform() {
                        return this._transform
                    }
                    _transformRaycaster;
                    createTransform() {
                        this._transform = new l.w({
                            camera: this._camera,
                            domElement: this._domElement,
                            scene: this._scene
                        }),
                        this._transform.on("change", this.onTransformChange),
                        this._transform.on("dragging", this.onTransformDragged),
                        this._transformRaycaster = new i.Raycaster,
                        this._transformRaycaster.layers.set(1)
                    }
                    destroyTransform() {
                        this._transform.destroy()
                    }
                    setViewportOptions(e) {
                        this._viewportOptions = e,
                        this._axisHelper.visible = !!this._isEnabled && this._viewportOptions.axis,
                        this._gridHelper.visible = !!this._isEnabled && this._viewportOptions.grid;
                        const t = !!this._isEnabled && this._viewportOptions.frustum;
                        this.setCameraHelperFrustum(t),
                        this._viewportOptions.select || (this._selected = null,
                        this._outlineHandler?.addSelection(null, !0),
                        this.outlineHandler.render(this._scene, this._camera))
                    }
                    onKeyPress(e) {
                        "a" === e.key.toLocaleLowerCase() && this.centerOrbit(),
                        "f" === e.key.toLocaleLowerCase() && this.centerOrbit()
                    }
                    onPointerStart(e) {
                        this._isEnabled && (this._hold.isHolding = !0)
                    }
                    onPointerEnd(e) {
                        if (!this._isEnabled)
                            return;
                        clearTimeout(this._hold.timer),
                        this._hold.timer = setTimeout((()=>{
                            this._hold.isHolding = !1
                        }
                        ), this._hold.timeOffset);
                        const t = Math.abs(this._scene.pointer.delta.x)
                          , n = Math.abs(this._scene.pointer.delta.y);
                        if (!(t > 5 || n > 5) && this._viewportOptions.select && this._isEnabled) {
                            this._transformRaycaster.setFromCamera(this._scene.pointer.normalized, this._orbit.object);
                            const e = Array.from(this._outlineHandler?.objects)
                              , [t] = this._transformRaycaster.intersectObjects(e);
                            if (t) {
                                const e = t.object;
                                e && (this._selected = e.userData.layerData,
                                this._outlineHandler?.addSelection(e, !0),
                                r.Lotus.dispatch({
                                    type: c.a.SET_LAYER,
                                    id: e.userData.layerData.id
                                })),
                                this.outlineHandler.render(this._scene, this._camera)
                            } else
                                this._outlineHandler.removeSelection()
                        }
                    }
                    onTransformChange(e) {
                        const {object: t} = e.target;
                        r.Lotus.dispatch({
                            type: c.a.SET_LAYER_VALUES,
                            object: t
                        })
                    }
                    onTransformDragged(e) {
                        this.onTransformChange(e),
                        this._orbit.enabled = !e.value
                    }
                    setMode(e) {
                        this._transform?.setMode(e)
                    }
                    attach(e) {
                        this._isEnabled && this._transform?.attach(e)
                    }
                    detach() {
                        this._transform?.detach()
                    }
                    get gizmoEnabled() {
                        return this._transform.gizmoEnabled
                    }
                    set gizmoEnabled(e) {
                        this._transform.gizmoEnabled = e
                    }
                    _isEnabled = u.h.IS_DEVELOPMENT && !h.Z.isPhoneBreakpoint();
                    get isEnabled() {
                        return this._isEnabled
                    }
                    set isEnabled(e) {
                        this._isEnabled = e,
                        this._axis.visible = e,
                        this._orbit.enabled = e,
                        this._isEnabled ? (this._axisHelper.visible = this._viewportOptions.axis,
                        this._gridHelper.visible = this._viewportOptions.grid,
                        this.setCameraHelperFrustum(this._viewportOptions.frustum)) : (this._axisHelper.visible = e,
                        this._gridHelper.visible = e,
                        this._cameraHelperFrustum.visible = e),
                        this._cameraHelper.visible = e,
                        this.outlineHandler?.setEnabled(e),
                        this._isEnabled || this.detach(),
                        r.Lotus.tryRequestAnimationFrame()
                    }
                    onLoop() {
                        this._isEnabled && (this._axis?.render(this._scene.renderer),
                        this._orbit?.update?.(),
                        this._cameraHelper?.camera?.updateMatrixWorld(!0),
                        this._cameraHelper?.update?.(),
                        this._cameraHelperFrustum?.update?.(),
                        this._selected && this.outlineHandler.render(this._scene, this._camera))
                    }
                    destroy() {
                        this.destroyAxis(),
                        this.destroyOrbit(),
                        this.destroyGrid(),
                        this.destroyCameraHelper(),
                        this.destroyCommands(),
                        this.destroyTransform(),
                        d.H.destroy(this)
                    }
                }
            },
            9888: function(e, t, n) {
                "use strict";
                n.d(t, {
                    E: function() {
                        return o
                    }
                });
                var i = n(4468)
                  , a = n(1334)
                  , s = n(4103)
                  , r = n(3395);
                class o {
                    static _uSourceTextureID = "uSourceTexture";
                    static _uDestinationTextureID = "uDestinationTexture";
                    constructor(e) {
                        this.createCrossFade(e),
                        this.createRenderTarget()
                    }
                    _crossFadeRenderToTexture;
                    createCrossFade(e) {
                        this._crossFadeRenderToTexture = new a.e(e,s.CrossFadeRenderTargetsFragment),
                        this._crossFadeRenderToTexture.setUniform(o._uSourceTextureID, null),
                        this._crossFadeRenderToTexture.setUniform(o._uDestinationTextureID, null)
                    }
                    destroyCrossFade() {
                        this._crossFadeRenderToTexture.destroy()
                    }
                    _renderTarget;
                    get renderTarget() {
                        return this._renderTarget
                    }
                    createRenderTarget() {
                        this._renderTarget = new i.WebGLRenderTarget(1024,1024,{
                            depthBuffer: !1,
                            generateMipmaps: !1,
                            magFilter: i.NearestFilter,
                            minFilter: i.NearestFilter
                        }),
                        this._renderTarget.texture.name = "CrossFadeTexture",
                        this._renderTarget.scissorTest = !0
                    }
                    destroyRenderTarget() {
                        this._renderTarget.texture.dispose(),
                        this._renderTarget.dispose()
                    }
                    setSourceFromTexture(e, t=!0) {
                        this.setupCrossFadeTexture(o._uSourceTextureID, e, t)
                    }
                    setDestinationFromTexture(e, t=!0) {
                        this.setupCrossFadeTexture(o._uDestinationTextureID, e, t)
                    }
                    setupCrossFadeTexture(e, t, n=!0) {
                        let i = t;
                        n && (i = t.clone()),
                        this._crossFadeRenderToTexture.setUniform(e, i),
                        n && i.dispose()
                    }
                    fade(e) {
                        this._crossFadeRenderToTexture.setUniform("uInterpolation", e),
                        this._crossFadeRenderToTexture.render(this._renderTarget)
                    }
                    destroy() {
                        this.destroyCrossFade(),
                        this.destroyRenderTarget(),
                        r.H.destroy(this)
                    }
                }
            },
            6719: function(e, t, n) {
                "use strict";
                n.d(t, {
                    c: function() {
                        return N
                    },
                    i: function() {
                        return I
                    }
                });
                var i = n(4468)
                  , a = n(361)
                  , s = n.n(a)
                  , r = n(8446)
                  , o = n.n(r)
                  , l = n(9734)
                  , h = n.n(l)
                  , c = n(9653)
                  , d = n(9137)
                  , u = n(3456)
                  , p = n(9283)
                  , m = n(1837)
                  , f = n(5778)
                  , _ = n(5487)
                  , g = n(1501)
                  , v = n(2319)
                  , y = n(7699)
                  , M = n(6356)
                  , S = n(9249)
                  , x = n(812)
                  , b = n(8107)
                  , T = n(7684)
                  , C = n(4378)
                  , E = n(6327)
                  , w = n(3395);
                class A {
                    _stats;
                    _scene;
                    _element;
                    _initial;
                    _now;
                    constructor({scene: e}) {
                        this._initial = window.performance.now(),
                        this._now = window.performance.now(),
                        this._scene = e,
                        this._scene.eventPool?.register(this),
                        this._element = document.createElement("div"),
                        this._element.style.height = "100vh",
                        this._element.style.left = "0",
                        this._element.style.pointerEvents = "none",
                        this._element.style.position = "fixed",
                        this._element.style.top = "0",
                        this._element.style.width = "100vw",
                        this._element.style.zIndex = "100000",
                        this._scene.element.appendChild(this._element),
                        this.createPanel(),
                        this.createPerformance()
                    }
                    createPanel() {
                        this._stats = new E.Z,
                        this._stats.init(this._scene.renderer.domElement),
                        this._scene.onBeforeRender = ()=>{
                            this._stats.begin()
                        }
                        ,
                        this._scene.onAfterRender = ()=>{
                            this._stats.end()
                        }
                        ,
                        this._element.appendChild(this._stats.container)
                    }
                    destroyPanel() {
                        this._element.removeChild(this._stats.container)
                    }
                    _performance;
                    _performanceButton;
                    _performanceContent;
                    _performanceSizes;
                    createSpan(e) {
                        const t = document.createElement("span");
                        return t.style.display = "block",
                        t.innerHTML = e,
                        t
                    }
                    createPerformance() {
                        this._performance = document.createElement("div"),
                        Object.assign(this._performance.style, {
                            background: "rgba(255, 255, 255, 0.75)",
                            borderRadius: "0 0 0 5px",
                            font: '10px "SFMono-Regular", monospace',
                            position: "absolute",
                            right: 0,
                            top: 0,
                            zIndex: 1e3
                        }),
                        this._performanceContent = document.createElement("div"),
                        Object.assign(this._performanceContent.style, {
                            display: "none",
                            padding: "5px"
                        }),
                        this._performanceButton = document.createElement("button"),
                        this._performanceButton.innerHTML = "Open",
                        this._performanceButton.addEventListener("click", (()=>{
                            "Open" === this._performanceButton.innerHTML ? (this._performanceButton.innerHTML = "Close",
                            this._performanceContent.style.display = "block") : (this._performanceButton.innerHTML = "Open",
                            this._performanceContent.style.display = "none")
                        }
                        )),
                        Object.assign(this._performanceButton.style, {
                            background: "rgba(255, 255, 255, 0.75)",
                            borderRadius: "0 0 0 5px",
                            cursor: "pointer",
                            padding: "5px",
                            position: "absolute",
                            right: 0,
                            top: 0
                        }),
                        this._performance.appendChild(this._performanceContent),
                        this._performance.appendChild(this._performanceButton),
                        document.documentElement.appendChild(this._performance),
                        this.createSizes(),
                        this.createExtensions(),
                        this._scene.loader.loaded.then((()=>this.createAssetLoaded())),
                        this._scene.layersCreated.then((()=>this.createLayersCreated())),
                        this._scene.layersReady.then((()=>this.createLayersReady())),
                        this._scene.ready.then((()=>this.createSceneReady())),
                        this._scene.frameReady.then((()=>this.createFrameReady())),
                        this._scene.frameReady.then((()=>this.createLoaded()))
                    }
                    createSizes() {
                        this._performanceSizes = document.createElement("span"),
                        this._performanceContent.appendChild(this._performanceSizes)
                    }
                    createExtensions() {
                        const e = this._scene.renderer.domElement.getContext("webgl2")
                          , t = this.createSpan(`<strong>WebGL 2 Extensions: </strong> <br>${e.getSupportedExtensions().join("<br>")}`);
                        this._performanceContent.appendChild(t)
                    }
                    createAssetLoaded() {
                        const e = window.performance.now()
                          , t = this.createSpan(`<strong>Assets Loaded:</strong> ${e - this._now}ms`);
                        this._performanceContent.appendChild(t),
                        this._now = e
                    }
                    createLayersCreated() {
                        const e = window.performance.now()
                          , t = this.createSpan(`<strong>Layers Created:</strong> ${e - this._now}ms`);
                        this._performanceContent.appendChild(t),
                        this._now = e
                    }
                    createLayersReady() {
                        const e = window.performance.now()
                          , t = this.createSpan(`<strong>Layers Ready:</strong> ${e - this._now}ms`);
                        this._performanceContent.appendChild(t),
                        this._now = e
                    }
                    createSceneReady() {
                        const e = window.performance.now()
                          , t = this.createSpan(`<strong>Scene Ready:</strong> ${e - this._now}ms`);
                        this._performanceContent.appendChild(t),
                        this._now = e
                    }
                    createFrameReady() {
                        const e = window.performance.now()
                          , t = this.createSpan(`<strong>First Frame:</strong> ${e - this._now}ms`);
                        this._performanceContent.appendChild(t),
                        this._now = e
                    }
                    createLoaded() {
                        const e = window.performance.now()
                          , t = this.createSpan(`<strong>Total Time:</strong> ${e - this._initial}ms`);
                        this._performanceContent.appendChild(t)
                    }
                    onResize({height: e, width: t}) {
                        this._performanceSizes.innerHTML = `\n      <strong>Browser Height:</strong> ${e}px<br>\n      <strong>Browser Width:</strong> ${t}px<br>\n      <strong>Canvas Height:</strong> ${this._scene.renderer.domElement.height}px<br>\n      <strong>Canvas Width:</strong> ${this._scene.renderer.domElement.width}px\n    `
                    }
                    destroy() {
                        this._performance.parentNode.removeChild(this._performance),
                        this._element.parentNode.removeChild(this._element),
                        this.destroyPanel(),
                        w.H.destroy(this)
                    }
                }
                var L = n(4912)
                  , V = n(6816)
                  , R = n(8626)
                  , P = n(6062)
                  , F = n(927)
                  , U = n(8373)
                  , O = n(4104)
                  , D = n(6060)
                  , k = n(149);
                const I = {
                    configuration: {
                        class: ""
                    },
                    layer: void 0,
                    layers: [],
                    renderer: {
                        alpha: !0,
                        antialias: !0,
                        blit: !1,
                        clearColor: [0, 0, 0],
                        clearColorAlpha: 0,
                        forceDoubleSideDisabled: !1,
                        forceEnvMapCompile: !0,
                        forceMapCompile: !0,
                        forceMetalnessMapCompile: !0,
                        forceNormalMapCompile: !0,
                        forceRoughnessMapCompile: !0,
                        outputColorSpace: i.SRGBColorSpace,
                        powerPreference: "high-performance",
                        premultipliedAlpha: !0,
                        stencil: !1,
                        toneMapping: i.ACESFilmicToneMapping,
                        toneMappingExposure: 1
                    },
                    states: [{
                        id: "default",
                        label: "Default",
                        category: "global",
                        value: "default"
                    }],
                    state: "default"
                };
                class N extends i.Scene {
                    data;
                    ready;
                    frameReady;
                    element = document.documentElement;
                    renderer;
                    isReady = !1;
                    isSceneCompiled = !1;
                    constructor({data: e=I, element: t=document.documentElement, id: n="CustomScene", renderer: i}) {
                        super(),
                        this.data = s()(e),
                        this.element = t,
                        this.name = `${n}`,
                        this.renderer = i,
                        this.ready = Promise.create(),
                        this.frameReady = Promise.create(),
                        this.init()
                    }
                    async init(e) {
                        this.addEventListeners(),
                        this.createEventPool(),
                        this.createAppState(e),
                        this.createRenderer(),
                        this.createLoop(),
                        this.createKeyboard(),
                        this.createPointer(),
                        this.createViewport(),
                        this.createLoader(),
                        this.createStats(),
                        await this.loader.loaded,
                        this.createLayers(this.data.layers),
                        await this.layersCreated,
                        this.createControls(),
                        await this.layersReady,
                        await this.compileScenes(),
                        this.onFirstFrame(),
                        await this.frameReady,
                        this.create()
                    }
                    create() {}
                    onAssetLibraryAdded(e) {
                        this._eventPool.trigger({
                            name: "assetAdded"
                        }, e.asset)
                    }
                    async compileScenes() {
                        const e = Array.from(V.j.assets).filter((([e,t])=>"gltf" === t.type)).map((([e,t])=>t.asset)).filter((({scene: e})=>e.parent)).map((({scene: e})=>()=>this.renderer.compileMacro(e, this.camera)))
                          , t = c.Lotus.tasks.add(e, "compilation").map((({promise: e})=>e));
                        await Promise.all(t),
                        await this.renderer.compileScene(this, this.camera),
                        this.isSceneCompiled = !0,
                        this.ready?.resolve()
                    }
                    onFirstFrame() {
                        const e = ()=>{
                            this.isReady = !0,
                            this.frameReady?.resolve()
                        }
                        ;
                        c.Lotus.tasks.length ? c.Lotus.tasks.ready.then(e) : e(),
                        this.setObjectFadeRenderTargetEnabled(),
                        D.h.IS_DEVELOPMENT && R.U.initialize()
                    }
                    onStateChange(e) {}
                    _loader;
                    get loader() {
                        return this._loader
                    }
                    createLoader() {
                        this._loader = new b.a({
                            scene: this
                        })
                    }
                    destroyLoader() {
                        this._loader.destroy()
                    }
                    _state;
                    get state() {
                        return this._state
                    }
                    _statesManager;
                    get statesManager() {
                        return this._statesManager
                    }
                    createAppState(e) {
                        const t = {
                            ...e
                        };
                        this.data.states?.forEach((e=>{
                            t[e.category] || (t[e.category] = e.value)
                        }
                        )),
                        this._state = new u.a(t),
                        this._statesManager = new d.G({
                            appState: this._state,
                            data: this.data.states,
                            scene: this
                        })
                    }
                    destroyAppState() {
                        this._statesManager.destroy(),
                        this._state.destroy()
                    }
                    _eventPool;
                    get eventPool() {
                        return this._eventPool
                    }
                    createEventPool() {
                        this._eventPool = new m.I,
                        this._eventPool.register(this)
                    }
                    destroyEventPool() {
                        this._eventPool.destroy()
                    }
                    createRenderer() {
                        F.G.initialize(this.renderer),
                        this.element.appendChild(this.renderer.domElement),
                        this._eventPool.register(this.renderer)
                    }
                    destroyRenderer() {
                        F.G.destroy(),
                        this.renderer.destroy(),
                        this.renderer = void 0
                    }
                    stats;
                    createStats() {
                        k.D.get("stats") && (this.stats = new A({
                            scene: this
                        }))
                    }
                    destroyStats() {
                        this.stats?.destroy()
                    }
                    camera;
                    async createCamera(e) {
                        e ? e instanceof S.s ? this.camera = e.camera : this.camera = e : this.camera = new y.h({
                            position: [0, 0, 10],
                            scene: this
                        })
                    }
                    switchCamera(e) {
                        this.camera = e
                    }
                    destroyCamera() {
                        this.camera = null
                    }
                    controls;
                    createControls() {
                        D.h.IS_PRODUCTION || (this.controls = new p.Z({
                            scene: this
                        }))
                    }
                    setControls(e) {
                        this.controls && (this.controls.isEnabled = e),
                        this.setObjectFadeRenderTargetEnabled()
                    }
                    setControlsViewportOptions(e) {
                        this.controls.setViewportOptions(e)
                    }
                    setObjectFadeRenderTargetEnabled() {
                        if (!this._objectFadeRenderTargetHandler)
                            return;
                        const e = !this.controls?.isEnabled;
                        this._objectFadeRenderTargetHandler.setRenderEnabled(e),
                        this._objectFadeRenderTargetHandler.checkIfCanEnable()
                    }
                    destroyControls() {
                        this.controls?.destroy()
                    }
                    _objectFadeRenderTargetHandler;
                    get objectFadeRenderTargetHandler() {
                        return this._objectFadeRenderTargetHandler
                    }
                    createObjectFadeRenderTargetHandler() {
                        this._objectFadeRenderTargetHandler = new M.$({
                            initialValue: 0,
                            renderer: this.renderer,
                            scene: this
                        })
                    }
                    destroyObjectFadeRenderTargetHandler() {
                        this._objectFadeRenderTargetHandler?.destroy()
                    }
                    keyboard;
                    createKeyboard() {
                        this.keyboard = new x.N({
                            scene: this
                        })
                    }
                    destroyKeyboard() {
                        this.keyboard.destroy()
                    }
                    loop;
                    createLoop() {
                        this.loop = new T.r({
                            scene: this
                        })
                    }
                    destroyLoop() {
                        this.loop.destroy()
                    }
                    pointer;
                    createPointer() {
                        this.pointer = new C.g({
                            scene: this
                        })
                    }
                    destroyPointer() {
                        this.pointer.destroy()
                    }
                    viewport;
                    createViewport() {
                        this.viewport = new L.l({
                            scene: this
                        })
                    }
                    destroyViewport() {
                        this.viewport.destroy()
                    }
                    layersCreated = Promise.create();
                    layersReady = Promise.create();
                    _layers = [];
                    async createLayers(e) {
                        const t = (e = h()(e, (e=>e.scripts && Object.keys(e.scripts).join(",").includes("Environment") ? 0 : 1))).find((e=>{
                            if (e.scripts)
                                return Object.keys(e.scripts).join(",").includes("Camera")
                        }
                        ));
                        t ? e = h()(e, (e=>e === t ? 0 : 1)) : this.createCamera();
                        const n = e.map((e=>()=>this.createLayer(e)))
                          , i = c.Lotus.tasks.add(n, "layer");
                        await Promise.all(i.map((e=>e.promise))),
                        this._eventPool.trigger({
                            name: "layersCreated"
                        }),
                        this.layersCreated?.resolve(),
                        this._layers && await Promise.all(this._layers.map((e=>e.ready))),
                        this._eventPool.trigger({
                            name: "layersReady"
                        }),
                        this.layersReady?.resolve()
                    }
                    onLayersCreated() {}
                    onLayersReady() {}
                    createLayer(e) {
                        let t;
                        switch (e.type) {
                        case "component":
                            t = f.T;
                            break;
                        case "file":
                            t = _.e;
                            break;
                        case "mesh":
                            t = v.Z;
                            break;
                        case "group":
                            t = g.e
                        }
                        const n = new t({
                            data: e,
                            scene: this
                        });
                        if (n.isKeyframeObjectFade && this.createObjectFadeRenderTargetHandler(),
                        n.isCamera && !this.camera) {
                            const [e] = n.scripts.values();
                            this.createCamera(e)
                        }
                        return this._layers.push(n),
                        n
                    }
                    destroyLayer(e) {
                        e.destroy?.(),
                        O.B.remove(this._layers, e)
                    }
                    updateLayers(e) {
                        this._layers.forEach((t=>{
                            const n = e.find((e=>e.id === t.id));
                            n ? n.type === t.data.type ? t.onLayerChange(n) : (this.destroyLayer(t),
                            this.createLayer(n)) : this.destroyLayer(t)
                        }
                        )),
                        e.filter((e=>{
                            const t = this._layers?.find((t=>t.id === e.id));
                            return void 0 === t
                        }
                        )).forEach((e=>{
                            this.createLayer(e)
                        }
                        ))
                    }
                    getAllLayers() {
                        return this._layers
                    }
                    getLayers(e) {
                        return e.map((e=>this._layers.find((t=>t.id === e))))
                    }
                    getLayer(e) {
                        return this._layers.find((t=>t.id === e))
                    }
                    getObjects(e) {
                        const t = [];
                        return e.forEach((e=>{
                            this.traverse((n=>{
                                n.userData?.uuid === e && t.push(n)
                            }
                            )),
                            this._layers.forEach((n=>{
                                n.id === e && t.push(n.element)
                            }
                            ))
                        }
                        )),
                        t
                    }
                    getObject(e) {
                        let t;
                        return this.traverse((n=>{
                            n.userData?.uuid === e && (t = n)
                        }
                        )),
                        t
                    }
                    changeState(e, t) {
                        this._statesManager?.change?.({
                            category: e,
                            value: t
                        })
                    }
                    onDataChange(e) {
                        this.isReady && (o()(this.data, e) || (this.statesManager.onDataChange(e.states),
                        this.updateLayers(e.layers),
                        this.eventPool.trigger({
                            name: "rendererChange"
                        }, e.renderer),
                        this.data = s()(e),
                        c.Lotus.tryRequestAnimationFrame()))
                    }
                    layer;
                    onCurrentLayerChange(e) {
                        this.controls && (this.layer && this.layer.onBlur?.(),
                        e && (this.layer = this._layers?.find((t=>t.id === e?.id)),
                        this.layer && (this.layer.onFocus?.(),
                        c.Lotus.tryRequestAnimationFrame())))
                    }
                    onLoop() {
                        if (!this.isSceneCompiled)
                            return;
                        const e = this.controls?.isEnabled
                          , t = e ? this.controls?.camera : this.camera;
                        t && (this._objectFadeRenderTargetHandler?.enabled && !e && this._objectFadeRenderTargetHandler.render(this, t),
                        this.renderer.compose(this, t)),
                        P.F.isInitialized && P.F.render()
                    }
                    onHotReload({event: e, path: t}) {
                        c.Lotus.tryRequestAnimationFrame()
                    }
                    onHotReloadLayer(e) {
                        const t = this.getLayer(e);
                        t && t.onHotReload({
                            isForced: !0
                        }),
                        c.Lotus.tryRequestAnimationFrame()
                    }
                    addEventListeners() {
                        this.onAssetLibraryAdded = this.onAssetLibraryAdded.bind(this),
                        V.j.addEventListener("load", this.onAssetLibraryAdded)
                    }
                    removeEventListeners() {
                        V.j.removeEventListener("load", this.onAssetLibraryAdded)
                    }
                    destroy() {
                        return this.isReady = !1,
                        new Promise((e=>{
                            P.F.destroy(),
                            this.destroyLoop(),
                            this.onCurrentLayerChange(null),
                            this.destroyEventPool(),
                            w.H.dispose(this),
                            this._layers?.forEach((e=>{
                                e.destroy()
                            }
                            )),
                            this.destroyObjectFadeRenderTargetHandler(),
                            this.destroyControls(),
                            this.destroyCamera(),
                            this.destroyLoader(),
                            this.destroyStats(),
                            this.destroyViewport(),
                            this.destroyPointer(),
                            this.destroyKeyboard(),
                            this.destroyAppState(),
                            this.destroyRenderer(),
                            this.removeEventListeners(),
                            w.H.destroyTraverse(this),
                            V.j.clear(),
                            U.q.clear(),
                            e(!0)
                        }
                        ))
                    }
                }
            },
            1919: function(e, t, n) {
                "use strict";
                n.d(t, {
                    I: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(7716)
                  , s = n(3395);
                class r extends i.Mesh {
                    static NAME = "EnvironmentBackground";
                    _environment;
                    _scene;
                    constructor({environment: e, scene: t}) {
                        const n = new i.BoxGeometry(1,1,1);
                        n.deleteAttribute("normal"),
                        n.deleteAttribute("uv");
                        const s = i.UniformsUtils.clone(i.ShaderLib.backgroundCube.uniforms);
                        s.envMap.value = e.envMap,
                        super(n, new i.ShaderMaterial({
                            name: r.NAME,
                            uniforms: s,
                            vertexShader: i.ShaderLib.backgroundCube.vertexShader,
                            fragmentShader: i.ShaderLib.backgroundCube.fragmentShader,
                            side: i.BackSide,
                            depthTest: !1,
                            depthWrite: !1,
                            fog: !1
                        })),
                        this.frustumCulled = !1,
                        this.visible = !1,
                        this.onBeforeRender = function(e, t, n) {
                            this.matrixWorld.copyPosition(n.matrixWorld)
                        }
                        ,
                        this.renderOrder = -1,
                        this.layers.set(a.m1),
                        Object.defineProperty(this.material, "envMap", {
                            get: function() {
                                return this.uniforms.envMap.value
                            },
                            set: function(e) {
                                this.uniforms.envMap.value = e
                            }
                        }),
                        this._environment = e,
                        this._environment.parseMaterial(this),
                        this._scene = t,
                        this._scene.add(this)
                    }
                    destroy() {
                        s.H.dispose(this),
                        s.H.destroy(this)
                    }
                }
            },
            7175: function(e, t, n) {
                "use strict";
                n.d(t, {
                    r: function() {
                        return c
                    }
                });
                var i = n(4468)
                  , a = n(4147)
                  , s = n(1334)
                  , r = n(4103)
                  , o = n(4282)
                  , l = n(927)
                  , h = n(3395);
                class c {
                    static _uSourceTextureID = "uSourceTexture";
                    static _uDestinationTextureID = "uDestinationTexture";
                    static generateEmptyTexture() {
                        const e = o.Z.pmremCubeFaceSizeTest()
                          , t = e * e * 4
                          , n = o.Z.dataTextureBufferTest(t)
                          , a = new i.DataTexture(n,e,e,i.RGBAFormat,o.Z.dataTextureTypeTest(),i.UVMapping,i.ClampToEdgeWrapping,i.ClampToEdgeWrapping,i.LinearFilter,i.LinearFilter,1,i.LinearSRGBColorSpace);
                        return a.flipY = !0,
                        a
                    }
                    _map;
                    get map() {
                        return this._map
                    }
                    _crossFadeRenderToTexture;
                    _resizeRenderToTexture;
                    _renderer;
                    constructor(e, t) {
                        let n = !1;
                        t || (n = !0,
                        t = c.generateEmptyTexture()),
                        this._renderer = e,
                        this.createCrossFade(e),
                        this.createResize(e),
                        this.initWithTexture(t),
                        n && t.dispose()
                    }
                    createCrossFade(e) {
                        this._crossFadeRenderToTexture = new s.e(e,r.CrossFadeRenderTargetsFragment),
                        this._crossFadeRenderToTexture.setUniform(c._uSourceTextureID, null),
                        this._crossFadeRenderToTexture.setUniform(c._uDestinationTextureID, null)
                    }
                    destroyCrossFade() {
                        this._crossFadeRenderToTexture.destroy()
                    }
                    createResize(e) {
                        this._resizeRenderToTexture = new s.e(e,r.ScreenQuadFragment)
                    }
                    destroyResize() {
                        this._resizeRenderToTexture.destroy()
                    }
                    getMapFromTexture(e, t) {
                        if (void 0 !== this._map) {
                            if (e.source.data.width !== this._map.sourceWidth || e.source.data.height !== this._map.sourceHeight || void 0 === e.source.data.data) {
                                const t = new i.WebGLRenderTarget(this._map.sourceWidth,this._map.sourceHeight,{
                                    depthBuffer: !1,
                                    colorSpace: e.colorSpace,
                                    format: i.RGBAFormat,
                                    generateMipmaps: !1,
                                    magFilter: e.magFilter,
                                    minFilter: e.minFilter,
                                    type: o.Z.dataTextureTypeTest(),
                                    wrapS: e.wrapS,
                                    wrapT: e.wrapT
                                });
                                this._resizeRenderToTexture.setUniform("uMainTexture", e),
                                this._resizeRenderToTexture.render(t),
                                e.dispose(),
                                e = this.bufferToPixels(t),
                                t.texture.dispose(),
                                t.dispose()
                            }
                            return this.createMapWithTexture(e, t)
                        }
                        console.error("[EnvironmentTexture] is not initialized, make sure to do it by `initWithTexture` and try again")
                    }
                    createMapWithTexture(e, t) {
                        if (t) {
                            const e = a.H.get(t);
                            if (e)
                                return e
                        }
                        const n = e.clone()
                          , i = l.G.pmremGenerator.fromEquirectangular(n);
                        return n.dispose(),
                        t && a.H.add(t, i),
                        i
                    }
                    initWithTexture(e) {
                        this._map = this.createMapWithTexture(e),
                        this._map.sourceWidth = e.source.data.width,
                        this._map.sourceHeight = e.source.data.height
                    }
                    setSourceFromMap(e, t=!0) {
                        let n = e.texture;
                        t && (n = this.bufferToPixels(e)),
                        this._crossFadeRenderToTexture.setUniform(c._uSourceTextureID, n)
                    }
                    setDestinationFromMap(e, t=!0) {
                        let n = e.texture;
                        t && (n = this.bufferToPixels(e)),
                        this._crossFadeRenderToTexture.setUniform(c._uDestinationTextureID, n)
                    }
                    setSourceFromTexture(e, t=!0) {
                        this.setupCrossFadeTexture(c._uSourceTextureID, e, t)
                    }
                    setDestinationFromTexture(e, t=!0) {
                        this.setupCrossFadeTexture(c._uDestinationTextureID, e, t)
                    }
                    _textures = new Set;
                    destroyTextures() {
                        this._textures.forEach((e=>{
                            e.dispose()
                        }
                        )),
                        this._textures.clear()
                    }
                    bufferToPixels(e) {
                        const t = e.width * e.height * 4
                          , n = o.Z.dataTextureBufferTest(t);
                        this._renderer.readRenderTargetPixels(e, 0, 0, e.width, e.height, n);
                        const a = new i.DataTexture(n,e.width,e.height,i.RGBAFormat,o.Z.dataTextureTypeTest(),e.texture.mapping,e.texture.wrapS,e.texture.wrapT,e.texture.magFilter,e.texture.minFilter,e.texture.anisotropy,e.texture.colorSpace);
                        return a.flipY = e.texture.flipY,
                        a.needsUpdate = !0,
                        this._textures.add(a),
                        a
                    }
                    setupCrossFadeTexture(e, t, n=!0) {
                        let i = t;
                        n && (i = t.clone());
                        const a = this.getMapFromTexture(i);
                        this._crossFadeRenderToTexture.setUniform(e, a.texture),
                        n && i.dispose()
                    }
                    fade(e) {
                        this._crossFadeRenderToTexture.setUniform("uInterpolation", e),
                        this._crossFadeRenderToTexture.render(this._map)
                    }
                    destroy() {
                        this._map.dispose(),
                        this.destroyTextures(),
                        this.destroyCrossFade(),
                        this.destroyResize(),
                        a.H.destroy(),
                        h.H.destroy(this)
                    }
                }
            },
            4147: function(e, t, n) {
                "use strict";
                n.d(t, {
                    H: function() {
                        return s
                    }
                });
                var i = n(3395)
                  , a = n(6060);
                const s = new class {
                    _map = new Map;
                    add(e, t) {
                        this._map.set(e, t)
                    }
                    get(e) {
                        return !a.h.IS_DEVELOPMENT && this._map.get(e)
                    }
                    destroy() {
                        this._map.forEach((e=>{
                            e.texture.dispose(),
                            e.dispose(),
                            i.H.destroy(e)
                        }
                        )),
                        this._map.clear()
                    }
                }
            },
            1837: function(e, t, n) {
                "use strict";
                n.d(t, {
                    I: function() {
                        return a
                    }
                });
                var i = n(3395);
                class a {
                    _data = {};
                    _fireAtStart = {};
                    _instances = [];
                    _listeners = {};
                    on(e, t) {
                        this._listeners[e] = this._listeners[e] || [],
                        this._listeners[e].push(t)
                    }
                    off(e, t) {
                        e in this._listeners != 0 && this._listeners[e].splice(this._listeners[e].indexOf(t), 1)
                    }
                    register(e) {
                        this._instances.push(e);
                        for (const t in this._fireAtStart)
                            this.fireMethod(e, t)
                    }
                    unregister(e) {
                        const t = this._instances.indexOf(e);
                        t > -1 && this._instances.splice(t, 1)
                    }
                    nameToMethod(e) {
                        return `on${e.charAt(0).toUpperCase() + e.slice(1)}`
                    }
                    fireMethod(e, t) {
                        const n = e[this.nameToMethod(t)];
                        "function" == typeof n && n.call(e, this._data[t])
                    }
                    trigger({name: e, fireAtStart: t=!1}, n={}) {
                        if (this._data[e] = n,
                        t && (this._fireAtStart[e] = !0),
                        e in this._listeners)
                            for (let t = 0; t < this._listeners[e].length; t++)
                                this._listeners[e][t].call(this, n);
                        this._instances.forEach((t=>this.fireMethod(t, e)))
                    }
                    destroy() {
                        this._instances.forEach((e=>{
                            this.unregister(e)
                        }
                        )),
                        i.H.destroy(this)
                    }
                }
            },
            6870: function(e, t, n) {
                "use strict";
                n.d(t, {
                    zd: function() {
                        return C
                    },
                    rP: function() {
                        return m
                    },
                    hl: function() {
                        return f
                    }
                });
                var i = n(8446)
                  , a = n.n(i)
                  , s = n(4468)
                  , r = n(9653)
                  , o = n(9888)
                  , l = n(7175)
                  , h = n(1334)
                  , c = n(3395)
                  , d = n(149)
                  , u = n(6062);
                class p {
                    _scene;
                    constructor({scene: e}) {
                        this._scene = e,
                        this._scene.eventPool?.register(this),
                        this.createRTT(this._scene.renderer),
                        this.createMap()
                    }
                    _rtt;
                    get rtt() {
                        return this._rtt
                    }
                    _opacities = new s.Vector4(0);
                    createRTT(e) {
                        this._rtt = new h.e(e,"\n        precision highp float;\n\n        varying vec2 vUv;\n\n        uniform sampler2D tMap1;\n        uniform sampler2D tMap2;\n        uniform sampler2D tMap3;\n        uniform sampler2D tMap4;\n\n        uniform vec4 uMapOpacities;\n\n        void main() {\n          vec4 map1 = texture(tMap1, vUv) * uMapOpacities.x;\n          vec4 map2 = texture(tMap2, vUv) * uMapOpacities.y;\n          vec4 map3 = texture(tMap3, vUv) * uMapOpacities.z;\n          vec4 map4 = texture(tMap4, vUv) * uMapOpacities.w;\n\n          vec4 mapColor = map1 + map2 + map3 + map4;\n\n          gl_FragColor = mapColor;\n        }\n      "),
                        this._rtt.setUniform("tMap1", null),
                        this._rtt.setUniform("tMap2", null),
                        this._rtt.setUniform("tMap3", null),
                        this._rtt.setUniform("tMap4", null),
                        this._rtt.setUniform("uMapOpacities", this._opacities)
                    }
                    destroyRTT() {
                        this._rtt.destroy()
                    }
                    setTextures(e) {
                        e.forEach(((e,t)=>{
                            this.setTexture(e, t)
                        }
                        ))
                    }
                    setTexture(e, t=0) {
                        this._rtt.setUniform(`tMap${t + 1}`, e)
                    }
                    setOpacities(e) {
                        this._opacities.fromArray(e)
                    }
                    setOpacity(e, t) {
                        switch (t) {
                        case 0:
                            return this._opacities.x = e;
                        case 1:
                            return this._opacities.y = e;
                        case 2:
                            return this._opacities.z = e;
                        case 3:
                            return this._opacities.w = e
                        }
                    }
                    _map;
                    get map() {
                        return this._map
                    }
                    createMap() {
                        this._map = new s.WebGLRenderTarget(1024,1024,{
                            depthBuffer: !1,
                            generateMipmaps: !1,
                            magFilter: s.NearestFilter,
                            minFilter: s.NearestFilter
                        }),
                        this._map.texture.name = "InterpolationTexture",
                        this._map.scissorTest = !0,
                        d.D.get("interpolationTextureDebug") && u.F.addTexture(this._map.texture)
                    }
                    destroyRenderTarget() {
                        this._map.texture.dispose(),
                        this._map.dispose()
                    }
                    render() {
                        this._rtt.render(this._map)
                    }
                    destroy() {
                        this.destroyRTT(),
                        this.destroyRenderTarget(),
                        c.H.destroy(this)
                    }
                }
                var m, f, _ = n(9138), g = n(6816), v = n(5070), y = n(1983), M = n(8877), S = n(7166), x = n.n(S), b = n(2410), T = n.n(b);
                !function(e) {
                    e[e.VertexShader = 0] = "VertexShader",
                    e[e.FragmentShader = 1] = "FragmentShader"
                }(m || (m = {})),
                function(e) {
                    e[e.InjectBefore = 0] = "InjectBefore",
                    e[e.Replace = 1] = "Replace",
                    e[e.InjectAfter = 2] = "InjectAfter"
                }(f || (f = {}));
                class C {
                    ready = Promise.create();
                    isInjectableShaderChunk = !0;
                    static _injectableMaterialType = "InjectableMaterial";
                    static _shaderIDs = {
                        MeshDepthMaterial: "depth",
                        MeshDistanceMaterial: "distanceRGBA",
                        MeshNormalMaterial: "normal",
                        MeshBasicMaterial: "basic",
                        MeshLambertMaterial: "lambert",
                        MeshPhongMaterial: "phong",
                        MeshToonMaterial: "toon",
                        MeshStandardMaterial: "physical",
                        MeshPhysicalMaterial: "physical",
                        MeshMatcapMaterial: "matcap",
                        LineBasicMaterial: "basic",
                        LineDashedMaterial: "dashed",
                        PointsMaterial: "points",
                        ShadowMaterial: "shadow",
                        SpriteMaterial: "sprite"
                    };
                    layer;
                    material;
                    name;
                    scene;
                    variants;
                    values;
                    constructor({layer: e, material: t, name: n, instructions: i, scene: a, values: r, variants: o}) {
                        this.layer = e,
                        this.material = t,
                        this.name = n,
                        this.variants = o,
                        this.values = r,
                        this.scene = a,
                        this.scene?.eventPool?.register(this);
                        {
                            const e = this.material
                              , t = this.constructor.name;
                            if (e.type !== C._injectableMaterialType) {
                                const t = C._shaderIDs[e.type];
                                if (void 0 !== t) {
                                    const n = s.ShaderLib[t];
                                    e.uniforms = s.UniformsUtils.clone(n.uniforms),
                                    e.vertexShader = n.vertexShader,
                                    e.fragmentShader = n.fragmentShader
                                }
                                e.chunks = [],
                                e.type = C._injectableMaterialType,
                                e.chunksNeedUpdate = !1
                            }
                            if (e.chunks.includes(t))
                                return;
                            e.chunks.push(t);
                            for (const t of i) {
                                let n;
                                switch (t.type) {
                                case f.InjectBefore:
                                    n = t.chunk + "\n" + t.token;
                                    break;
                                case f.Replace:
                                    n = t.chunk;
                                    break;
                                case f.InjectAfter:
                                    n = t.token + "\n" + t.chunk
                                }
                                t.target === m.VertexShader ? e.vertexShader = e.vertexShader.replace(t.token, n) : e.fragmentShader = e.fragmentShader.replace(t.token, n)
                            }
                            this.onDataChange(r),
                            e[`is${n}`] = !0
                        }
                    }
                    traverse(e, t) {
                        for (const n in e)
                            e[n] && "object" == typeof e[n] ? (t(e[n]),
                            this.traverse(e[n], t)) : t(e[n])
                    }
                    preload() {
                        if (!this._fields)
                            return;
                        const e = async e=>{
                            if ("string" == typeof e && T().IMAGES.test(e)) {
                                if (this.createTexture(),
                                this._textures.get(e) && !r.Lotus.IS_HOT_RELOADING)
                                    return;
                                const t = await g.j.get(e);
                                this._texture instanceof l.r && this._texture.getMapFromTexture?.(t, e),
                                this._textures?.set(e, t)
                            }
                        }
                        ;
                        this._keyframes.forEach((t=>{
                            x().traverse(t, (async(t,n,i)=>{
                                e(i)
                            }
                            ))
                        }
                        )),
                        x().traverse(this._fields.states, ((t,n,i)=>{
                            e(i)
                        }
                        ))
                    }
                    _texture;
                    get texture() {
                        return this._texture
                    }
                    set texture(e) {
                        this._texture = e
                    }
                    _textures = new Map;
                    get textures() {
                        return this._textures
                    }
                    createTexture() {
                        this._texture || ("keyframes" === this._fields.transition ? "EnvironmentShaderChunk" === this.name ? this._texture = new l.r(this.scene.renderer) : this._texture = new o.E(this.scene.renderer) : "interpolation" === this._fields.transition && (this._texture = new p({
                            scene: this.scene
                        })))
                    }
                    destroyTexture() {
                        this._texture?.destroy(),
                        this._texture = null
                    }
                    _keyframesJSON;
                    _keyframes = new Map;
                    get keyframes() {
                        return this._keyframes
                    }
                    async createKeyframes() {
                        this._keyframesJSON = await g.j.get(this._fields.keyframes),
                        this._keyframes = v.E.generateAnimationMap(this._keyframesJSON)
                    }
                    onStateChange({category: e, currentState: t, previousState: n}) {
                        if (this._fields && (this._fields?.generateStateValues(t),
                        this._fields.transition)) {
                            if ("keyframes" === this._fields.transition) {
                                const i = v.E.findAnimation({
                                    keyframes: this._keyframes,
                                    category: e,
                                    currentState: t,
                                    previousState: n
                                });
                                return void 0 === i && (this._timeline = new _.TY({
                                    duration: this._fields?.duration,
                                    delay: this._fields?.delay,
                                    easeFunctionType: this._fields?.easeFunctionType,
                                    easeCurveType: this._fields?.easeCurveType
                                })),
                                this.playTimeline({
                                    animation: i
                                })
                            }
                            if ("standard" === this._fields.transition) {
                                let e = this._fields?.duration
                                  , n = this._fields?.delay
                                  , i = this._fields?.easeFunctionType
                                  , a = this._fields?.easeCurveType;
                                if (this._fields?.useAnimationOut) {
                                    let s = !0;
                                    (this._fields?.variants || this._fields?.__ORIGINAL__?.variants).forEach((e=>{
                                        e.states.includes(t) && (s = !1)
                                    }
                                    )),
                                    s && (e = this._fields?.durationOut ?? this._fields?.duration,
                                    n = this._fields?.delayOut ?? this._fields?.delay,
                                    i = this._fields?.easeFunctionTypeOut ?? this._fields?.easeFunctionType,
                                    a = this._fields?.easeCurveTypeOut ?? this._fields?.easeCurveType)
                                }
                                this._timeline = new _.TY({
                                    duration: e,
                                    delay: n,
                                    easeFunctionType: i,
                                    easeCurveType: a
                                })
                            }
                        }
                    }
                    _animation;
                    _animationType = "none";
                    _animationSkip = !1;
                    get animationSkip() {
                        return this._animationSkip
                    }
                    _animationHelper = {};
                    get animationHelper() {
                        return this._animationHelper
                    }
                    set animationHelper(e) {
                        this._animationHelper = e
                    }
                    _timeline;
                    get timeline() {
                        return this._timeline
                    }
                    playTimeline({animation: e=this._animation, options: t, isSkip: n=this._animationSkip}) {
                        if (!a()(this._animation, e))
                            return this._animation = e,
                            this._timeline?.destroy(),
                            this._timeline = new _.TY(t),
                            "none" === this._animationType ? (v.E.setupTimeline({
                                animation: e,
                                element: this._animationHelper,
                                timeline: this._timeline
                            }),
                            this._timeline.on("start", (()=>this._animationType = "keyframe"))) : (v.E.setupTransition({
                                animation: e,
                                element: this._animationHelper,
                                timeline: this._timeline
                            }),
                            this._timeline.on("start", (()=>this._animationType = "transition"))),
                            this._timeline.on("complete", (()=>{
                                this._animationType = "none"
                            }
                            )),
                            this._timeline.play(n),
                            this._timeline
                    }
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    _interpolation;
                    get interpolation() {
                        return this._interpolation
                    }
                    async onDataChange(e, t=!0) {
                        if (e && !a()(this._fields?.ORIGINAL, e)) {
                            if (this._fields?.destroy(),
                            this._fields = M.O.create(e, this.scene),
                            this._fields?.keyframes && await this.createKeyframes(),
                            this._fields?.interpolation) {
                                const e = this.scene.getLayer(this.fields.interpolation);
                                this._interpolation = e.scripts.get("InteractiveCameraInterpolation")
                            }
                            t && this.onValuesChange(),
                            this.ready?.resolve()
                        }
                    }
                    createInterpolationValues() {}
                    async onValuesChange() {
                        if (!this._fields)
                            return;
                        this.preload();
                        const e = await y.R.uniformFromValues(this._fields);
                        return y.R.updateMaterialUniforms(this.material, e),
                        this.material.uniformsNeedUpdate = !0,
                        this.material.needsUpdate = !0,
                        this._animationSkip = this._fields.animationSkip,
                        "interpolation" === this._fields.transition && this.createInterpolationValues(),
                        e
                    }
                    async onHotReload({isForced: e, path: t}) {
                        if (this._fields?.generateStateValues(),
                        !this._fields)
                            return;
                        let n = !1;
                        x().traverse(this._fields?.ORIGINAL, (async(e,i,a)=>{
                            "string" == typeof a && t.includes?.(a) && (n = !0)
                        }
                        )),
                        n && this.onValuesChange()
                    }
                    destroy() {
                        this._fields?.destroy(),
                        this._keyframes && (this._keyframes.forEach((e=>{
                            c.H.destroy(e)
                        }
                        )),
                        this._keyframes.clear()),
                        this._timeline?.destroy(),
                        this._textures && (this._textures.forEach((e=>{
                            e.dispose()
                        }
                        )),
                        this._textures?.clear()),
                        this.destroyTexture(),
                        c.H.disposeMaterial(this.material),
                        c.H.destroy(this)
                    }
                }
            },
            3342: function(e, t, n) {
                "use strict";
                n.d(t, {
                    W: function() {
                        return c
                    },
                    l: function() {
                        return h
                    }
                });
                var i = n(9653)
                  , a = n(9138)
                  , s = n(5070)
                  , r = n(3395)
                  , o = n(6060)
                  , l = n(8877);
                const h = {
                    animation: {
                        defaultValue: "",
                        type: "String"
                    },
                    animationAutoPlay: {
                        defaultValue: !0,
                        type: "Boolean"
                    },
                    animationSkip: {
                        defaultValue: !1,
                        type: "Boolean"
                    },
                    animationTransition: {
                        defaultValue: !1,
                        type: "Boolean"
                    }
                };
                class c {
                    ready = Promise.create();
                    fieldsRuntime = {};
                    _name;
                    get name() {
                        return this._name
                    }
                    _layer;
                    get layer() {
                        return this._layer
                    }
                    _scene;
                    get scene() {
                        return this._scene
                    }
                    constructor({fields: e, layer: t, name: n, scene: i}) {
                        this._layer = t,
                        this._name = n,
                        this._scene = i,
                        this.onDataChange(e),
                        this._scene.eventPool?.register(this)
                    }
                    _gltf;
                    get gltf() {
                        return this._gltf
                    }
                    set gltf(e) {
                        this._gltf = e
                    }
                    _json;
                    get json() {
                        return this._json
                    }
                    set json(e) {
                        this._json = e
                    }
                    _keyframes = new Map;
                    get keyframes() {
                        return this._keyframes
                    }
                    async createKeyframes(e=!0) {
                        this._keyframes = s.E.generateAnimationMap(this._json),
                        this._fields && (await this.scene.ready,
                        e && !this._timeline && this.playFirstAnimation())
                    }
                    playFirstAnimation() {
                        const [,e] = Array.from(this._keyframes.entries()).find((([e,t])=>e.endsWith?.(`_${this._fields.animation}`))) || [];
                        e && this.playTimeline({
                            animation: e,
                            isSkip: !0
                        })
                    }
                    onStateChange({category: e, currentState: t, previousState: n}, i=!0) {
                        this._fields?.generateStateValues();
                        const a = s.E.findAnimation({
                            keyframes: this._keyframes,
                            category: e,
                            currentState: t,
                            previousState: n
                        });
                        return a ? (i && this.playTimeline({
                            animation: a
                        }),
                        a) : null
                    }
                    _animation;
                    get animation() {
                        return this._animation
                    }
                    _animationAutoPlay = !0;
                    get animationAutoPlay() {
                        return this._animationAutoPlay
                    }
                    set animationAutoPlay(e) {
                        this._animationAutoPlay = e
                    }
                    _animationSkip = !1;
                    get animationSkip() {
                        return this._animationSkip
                    }
                    set animationSkip(e) {
                        this._animationSkip = e
                    }
                    _animationTransition = !1;
                    get animationTransition() {
                        return this._animationTransition
                    }
                    set animationTransition(e) {
                        this._animationTransition = e
                    }
                    _animationType = "none";
                    get animationType() {
                        return this._animationType
                    }
                    _timeline;
                    get timeline() {
                        return this._timeline
                    }
                    playTimeline({animation: e=this._animation, element: t=this._layer.element, isSkip: n=!1, destroyOnComplete: r=!0}) {
                        this._animation = e,
                        this._timeline?.destroy(),
                        this._timeline = new a.TY({},r),
                        "none" !== this._animationType || this._animationTransition ? (s.E.setupTransition({
                            animation: e,
                            element: t,
                            layer: this._layer,
                            timeline: this._timeline
                        }),
                        this._timeline.on("start", (()=>this._animationType = "transition"))) : (s.E.setupTimeline({
                            animation: e,
                            element: t,
                            timeline: this._timeline
                        }),
                        this._timeline.on("start", (()=>this._animationType = "keyframe"))),
                        this._timeline.on("update", (()=>{
                            i.Lotus.tryRequestAnimationFrame()
                        }
                        )),
                        this._timeline.on("complete", (()=>{
                            this._animationType = "none"
                        }
                        ))
                    }
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    onDataChange(e) {
                        if (this._fields?.destroy(),
                        this._fields = l.O.create(e, this._scene),
                        void 0 !== this.fields.animationAutoPlay && (this._animationAutoPlay = this.fields.animationAutoPlay),
                        void 0 !== this.fields.animationSkip && (this._animationSkip = this.fields.animationSkip),
                        void 0 !== this.fields.animationTransition && (this._animationTransition = this.fields.animationTransition),
                        this.onDataChangeValues(),
                        o.h.IS_DEVELOPMENT) {
                            const e = Array.from(this.keyframes.entries()).map((([e,t])=>({
                                label: e,
                                value: e
                            })));
                            e.push({
                                label: "None",
                                value: ""
                            }),
                            this.fieldsRuntime.preview = {
                                defaultValue: "",
                                onChange: this.onPreview.bind(this),
                                options: e,
                                type: "Select"
                            }
                        }
                    }
                    async onDataChangeValues() {}
                    onPreview({value: e}) {
                        const t = this._keyframes.get(e);
                        this.playTimeline({
                            animation: t
                        })
                    }
                    destroy() {
                        this._fields?.destroy(),
                        this._gltf && r.H.dispose(this._gltf.scene),
                        this._keyframes && (this._keyframes.forEach((e=>{
                            r.H.destroy(e)
                        }
                        )),
                        this._keyframes.clear()),
                        this._timeline?.destroy(),
                        r.H.destroy(this)
                    }
                }
            },
            5778: function(e, t, n) {
                "use strict";
                n.d(t, {
                    T: function() {
                        return a
                    }
                });
                var i = n(6450);
                class a extends i.m {
                }
            },
            5487: function(e, t, n) {
                "use strict";
                n.d(t, {
                    e: function() {
                        return M
                    }
                });
                var i = n(1966)
                  , a = n.n(i)
                  , s = n(5564)
                  , r = n.n(s)
                  , o = n(8446)
                  , l = n.n(o)
                  , h = n(4293)
                  , c = n.n(h)
                  , d = n(5937)
                  , u = n.n(d)
                  , p = n(4468)
                  , m = n(9653)
                  , f = n(981)
                  , _ = n(6450)
                  , g = n(6816)
                  , v = n(8626)
                  , y = n(6060);
                class M extends _.m {
                    _file;
                    get file() {
                        return this._file
                    }
                    async createFile(e) {
                        return e.file ? (this._file = await g.j.get(e.file),
                        this._file.scene.traverse((t=>{
                            const n = t;
                            if (n.isMesh) {
                                const t = n.material.name
                                  , i = e.materials?.[`${t}`]?.layer;
                                void 0 !== i && n.layers.set(i)
                            }
                        }
                        )),
                        this.element = this.file.scene,
                        Promise.resolve()) : (this.element = new p.Group,
                        Promise.resolve())
                    }
                    _animations;
                    get animations() {
                        return this._animations
                    }
                    createAnimations(e) {
                        this._file && (this._animations && (this._animations.destroy(),
                        this._animations = null),
                        this._file.animations.length > 0 && (this._animations = new f.F({
                            data: e.fileAnimations,
                            file: this._file,
                            scene: this.scene
                        })))
                    }
                    _materials = new Map;
                    get materials() {
                        return this._materials
                    }
                    async createMaterials(e) {
                        return this._materials?.clear(),
                        this.element?.traverse((e=>{
                            const t = e;
                            if (t.isMesh) {
                                const e = t.material;
                                e && this._materials.set(e.name, e.clone())
                            }
                        }
                        )),
                        Promise.resolve()
                    }
                    _chunks = new Map;
                    get chunks() {
                        return this._chunks
                    }
                    createChunks(e) {
                        const t = Promise.create();
                        if (!e.materials)
                            return t.resolve();
                        const n = new Map;
                        this.element.traverse((e=>{
                            const t = e;
                            if (t.isMesh) {
                                const e = t.material
                                  , i = t.material.isShaderMaterial;
                                e && !i && n.set(e.name, e)
                            }
                        }
                        )),
                        this.data?.materials && n.forEach((t=>{
                            this.data.materials[t.name]?.chunks && 0 !== a()(Object.keys(this.data.materials[t.name].chunks), Object.keys(e.materials[t.name].chunks)).length && Object.keys(this.data.materials[t.name].chunks).forEach((e=>{
                                const i = `${t.name}_${e}`
                                  , a = this._chunks?.get(i);
                                let s;
                                a && (this.element.traverse((e=>{
                                    const t = e;
                                    if (t.isMesh) {
                                        const e = t.material;
                                        e.uuid === a.material.uuid && (s || (s = this._materials.get(e.name).clone(),
                                        n.set(e.name, s)),
                                        t.material = s)
                                    }
                                }
                                )),
                                this._chunks.delete(i))
                            }
                            ))
                        }
                        ));
                        const i = Object.entries(e.materials).filter((([e,t])=>0 !== t.chunks.length)).map((([e,t])=>{
                            const i = n.get(e);
                            if (!i)
                                return Promise.resolve();
                            const a = Object.entries(t.chunks).map((([e,t])=>{
                                const n = `${i.name}_${e}`
                                  , a = this._chunks?.get(n);
                                if (a)
                                    return a.onDataChange(t);
                                {
                                    const a = ()=>{
                                        const a = new (m.Lotus.chunks.get(e))({
                                            layer: this,
                                            material: i,
                                            scene: this.scene,
                                            values: t,
                                            variants: t.variants
                                        });
                                        this._chunks?.set(n, a)
                                    }
                                    ;
                                    return m.Lotus.tasks.add(a, "chunk").promise
                                }
                            }
                            ));
                            return a
                        }
                        ));
                        return Promise.all(r()(i)).then((()=>{
                            t.resolve(!0)
                        }
                        )),
                        t
                    }
                    updateChunks(e) {
                        this._chunks.forEach(((t,n)=>{
                            let i = !0;
                            const {chunks: a} = e.materials[`${t.material.name}`];
                            Object.entries(a).forEach((([e,n])=>{
                                t.name === e && (i = !1,
                                t.onDataChange(n))
                            }
                            )),
                            i && (t.destroy(),
                            this._chunks.delete(n))
                        }
                        ))
                    }
                    _shaders = new Map;
                    async createShaders(e) {
                        if (await this.scene.ready,
                        !e.nodes)
                            return;
                        const t = u()(e.nodes, ((e,t)=>!l()(this.data?.nodes?.[t], e)));
                        Object.keys(t).forEach((t=>{
                            if (!e.nodes[t].shader) {
                                const e = this.element.getObjectByName(t);
                                if (e) {
                                    const n = e.material;
                                    n.isShaderMaterial && (n.destroy(),
                                    this._shaders.delete(t)),
                                    e.materialOriginal && (e.material = e.materialOriginal)
                                }
                            }
                        }
                        )),
                        Object.entries(e.nodes).filter((([e,t])=>t.shader)).forEach((([e,t])=>{
                            const n = this.element.getObjectByName(e)
                              , i = this._shaders.get(e);
                            if (i)
                                if (t.shader === i.name)
                                    i.onDataChange(t.shaderValues);
                                else {
                                    const i = n.material
                                      , a = this.createShader(t);
                                    i.destroy(),
                                    n.material = a,
                                    this._shaders.set(e, a)
                                }
                            else {
                                const i = n.material
                                  , a = this.createShader(t);
                                y.h.IS_PRODUCTION && i.dispose(),
                                n.material = a,
                                n.materialOriginal = i,
                                this._shaders.set(e, a)
                            }
                        }
                        ))
                    }
                    createShader(e) {
                        const {shader: t="UVTestShader", shaderValues: n={}} = e;
                        if (t)
                            return new (m.Lotus.shaders.get(t))({
                                fields: n,
                                layer: this,
                                name: t,
                                scene: this.scene
                            })
                    }
                    async onLayerChange(e) {
                        if (l()(this.data, e) && !m.Lotus.IS_HOT_RELOADING)
                            return;
                        this.element.removeFromParent();
                        const t = this.onBlur()
                          , n = !c()(e.file)
                          , i = this.data?.file !== e.file;
                        (n && i || m.Lotus.IS_HOT_RELOADING) && (await this.createFile(e),
                        this.createAnimations(e),
                        y.h.IS_DEVELOPMENT && this.createMaterials(e)),
                        this.createShaders(e),
                        await this.createChunks(e),
                        t && this.onFocus(),
                        await super.onLayerChange(e),
                        this.scene?.eventPool?.trigger({
                            name: "layerLoaded"
                        }, this)
                    }
                    async onHotReload({isForced: e, path: t}) {
                        if (v.U.checkFilePath(this.data.file, t) || e)
                            return this._chunks.clear(),
                            this._shaders.clear(),
                            await this.onLayerChange(this.data),
                            v.U.refreshGLTFTextures(this._file),
                            this.scripts.forEach((t=>{
                                t.onHotReload({
                                    isForced: e
                                })
                            }
                            )),
                            void m.Lotus.tryRequestAnimationFrame();
                        (this._file || e) && (v.U.parseGLTFTextures(this._file, t),
                        m.Lotus.tryRequestAnimationFrame())
                    }
                    destroy() {
                        this._animations?.destroy?.(),
                        this._chunks && (this._chunks.forEach((e=>{
                            e.destroy()
                        }
                        )),
                        this._chunks.clear()),
                        super.destroy()
                    }
                }
            },
            1501: function(e, t, n) {
                "use strict";
                n.d(t, {
                    e: function() {
                        return a
                    }
                });
                var i = n(6450);
                class a extends i.m {
                }
            },
            2319: function(e, t, n) {
                "use strict";
                n.d(t, {
                    Z: function() {
                        return l
                    }
                });
                var i = n(8446)
                  , a = n.n(i)
                  , s = n(4468)
                  , r = n(9653)
                  , o = n(6450);
                class l extends o.m {
                    async create(e) {
                        this.createMesh(e),
                        super.create(e)
                    }
                    createMesh(e) {
                        const t = this.createGeometry(e)
                          , n = this.createMaterial(e);
                        this.element = new s.Mesh(t,n),
                        e.renderOrder && (this.element.renderOrder = e.renderOrder),
                        this.element.name = e.name
                    }
                    createGeometry(e) {
                        const {geometry: t="Box"} = e;
                        return r.Lotus.geometries.get(t)
                    }
                    createMaterial(e) {
                        const {shader: t="UVTestShader", shaderValues: n={}} = e;
                        if (t)
                            return new (r.Lotus.shaders.get(t))({
                                fields: n,
                                name: `${e.name}:${t}`,
                                scene: this.scene
                            })
                    }
                    updateGeometry(e) {
                        const t = this.element;
                        e.geometry && e.geometry !== this.data?.geometry && (t.geometry = this.createGeometry(e))
                    }
                    updateMaterial(e) {
                        const t = this.element
                          , n = t.material;
                        n.name !== e.shader && (n.destroy(),
                        t.material = this.createMaterial(e)),
                        void 0 !== e.blending && (n.blending = e.blending),
                        void 0 !== e.depthTest && (n.depthTest = e.depthTest),
                        void 0 !== e.depthWrite && (n.depthWrite = e.depthWrite),
                        void 0 !== e.side && (n.side = e.side),
                        void 0 !== e.transparent && (n.transparent = e.transparent)
                    }
                    updateShader(e) {
                        const t = this.element;
                        t.material.onDataChange?.(e.shaderValues)
                    }
                    async onLayerChange(e) {
                        a()(this.data, e) && !r.Lotus.IS_HOT_RELOADING || (this.updateGeometry(e),
                        this.updateMaterial(e),
                        this.updateShader(e),
                        super.onLayerChange(e))
                    }
                }
            },
            6450: function(e, t, n) {
                "use strict";
                n.d(t, {
                    m: function() {
                        return c
                    }
                });
                var i = n(4468)
                  , a = n(361)
                  , s = n.n(a)
                  , r = n(8446)
                  , o = n.n(r)
                  , l = n(9653)
                  , h = n(3395);
                class c {
                    ready = Promise.create();
                    scene;
                    data;
                    get name() {
                        return this.data.name
                    }
                    get id() {
                        return this.data?.id
                    }
                    isCamera = !1;
                    isKeyframeObjectFade = !1;
                    constructor({data: e, scene: t}) {
                        this.data = {
                            id: e.id,
                            name: e.name,
                            scripts: e.scripts,
                            shader: e.shader,
                            type: e.type
                        },
                        this.scene = t,
                        this.scene.eventPool?.register(this),
                        this.scene.dispatchEvent?.({
                            message: `Layer.init - ${e.name}`,
                            type: "debug"
                        }),
                        this.init(e)
                    }
                    async init(e) {
                        await this.create(e),
                        this._element || this.createGroup(),
                        await this.onLayerChange(e),
                        this.scene.dispatchEvent?.({
                            message: `Layer.ready - ${e.name}`,
                            type: "debug"
                        }),
                        this.ready?.resolve()
                    }
                    _element;
                    set element(e) {
                        this._element = e
                    }
                    get element() {
                        return this._element
                    }
                    createGroup() {
                        this._element = new i.Group,
                        this._element.name = this.data.name,
                        this.scene?.add(this._element)
                    }
                    async create(e) {
                        await this.createScripts(e)
                    }
                    _scripts = new Map;
                    get scripts() {
                        return this._scripts
                    }
                    async createScripts(e) {
                        if (e.scripts)
                            for (const [t,n] of Object.entries(e.scripts)) {
                                const e = l.Lotus.scripts.get(t);
                                if (e) {
                                    const i = new e({
                                        fields: n,
                                        layer: this,
                                        scene: this.scene
                                    });
                                    this._scripts.set(t, i),
                                    i.ready && await i.ready
                                } else
                                    console.warn(`Script Class ${t} doesn't exist.`)
                            }
                    }
                    updateScripts(e) {
                        e.scripts && (o()(this.data.scripts, e.scripts) && !l.Lotus.IS_HOT_RELOADING || Object.entries(e.scripts).forEach((([e,t])=>{
                            const n = this._scripts?.get(e);
                            n && n.onDataChange?.(t)
                        }
                        )))
                    }
                    async onLayerChange(e) {
                        o()(this.data, e) && !l.Lotus.IS_HOT_RELOADING || (this.updateScripts(e),
                        this.updatePosition(e),
                        this.updateVisibility(e),
                        this.updateParent(e),
                        this.data = s()(e))
                    }
                    _isFocused = !1;
                    get isFocused() {
                        return this._isFocused
                    }
                    onFocus() {
                        this._isFocused = !0,
                        this._scripts?.forEach((e=>{
                            e?.onFocus?.()
                        }
                        )),
                        (this.element instanceof i.Group || this.element instanceof i.Mesh) && (this.element.userData = {
                            ...this.element.userData,
                            layer: this
                        },
                        this.scene.controls?.attach(this.element))
                    }
                    onBlur() {
                        const e = this._isFocused;
                        return this._scripts?.forEach((e=>{
                            e.onBlur?.()
                        }
                        )),
                        this.scene?.controls?.detach(),
                        this._isFocused = !1,
                        e
                    }
                    add(e) {
                        this.element.add(e)
                    }
                    remove(e) {
                        this.element.remove(e)
                    }
                    updateParent(e) {
                        if (e?.parent) {
                            const t = this.scene.getLayer(e.parent);
                            t && t.add?.(this.element)
                        } else
                            this.element && this.scene?.add?.(this.element)
                    }
                    updatePosition(e) {
                        e.position && this.element.position.fromArray(e.position),
                        e.rotation && this.element.rotation.fromArray(e.rotation.map(i.MathUtils.degToRad)),
                        e.scale && this.element.scale.fromArray(e.scale)
                    }
                    updateVisibility(e) {
                        void 0 !== e.visible && (this.element.visible = e.visible)
                    }
                    onHotReload({isForced: e, path: t}) {}
                    _isVisible = !0;
                    get isVisible() {
                        return this._isVisible
                    }
                    show() {
                        this._isVisible = !0,
                        this._element.visible = !0
                    }
                    hide() {
                        this._isVisible = !1,
                        this._element.visible = !1
                    }
                    destroy() {
                        this.onBlur(),
                        this.element && (this.element.removeFromParent?.(),
                        h.H.dispose(this.element)),
                        this._scripts && (this._scripts.forEach((e=>{
                            e.destroy?.()
                        }
                        )),
                        this._scripts.clear()),
                        h.H.destroy(this)
                    }
                }
            },
            6356: function(e, t, n) {
                "use strict";
                n.d(t, {
                    $: function() {
                        return l
                    }
                });
                var i = n(4468)
                  , a = n(9653)
                  , s = n(1334)
                  , r = n(7716)
                  , o = n(3395);
                class l {
                    _fadeRenderTarget;
                    _renderEnabled = !1;
                    get renderEnabled() {
                        return this._renderEnabled
                    }
                    setRenderEnabled(e) {
                        this._renderEnabled = e,
                        this.setFadeTargetsVisibility(!0),
                        this.setNonFadeTargetsVisibility(!0),
                        this._quad && (this._quad.visible = e)
                    }
                    _enabled = !1;
                    get enabled() {
                        return this._enabled
                    }
                    setEnabled(e) {
                        this._renderEnabled && (this._enabled = e,
                        this.setFadeTargetsVisibility(!e && this._fade > .5),
                        this.setNonFadeTargetsVisibility(!0),
                        this._quad && (this._quad.visible = e))
                    }
                    checkIfCanEnable(e=-1) {
                        (e = -1 === e ? this._fade : e) < .999 && e > .001 ? this.setEnabled(!0) : this.setEnabled(!1)
                    }
                    _renderer;
                    _scene;
                    _quad;
                    _fade;
                    constructor({initialValue: e, renderer: t, scene: n}) {
                        this._fade = e,
                        this._renderer = t,
                        this._scene = n,
                        this._scene.eventPool?.register(this),
                        this._fadeRenderTarget = this._renderer.createRenderTarget(),
                        this.createQuad()
                    }
                    createQuad() {
                        const e = s.e.screenQuadGeometry
                          , t = new i.ShaderMaterial({
                            depthFunc: i.AlwaysDepth,
                            depthWrite: !1,
                            uniforms: {
                                uFade: {
                                    value: this._fade
                                },
                                uQuadTexture: {
                                    value: this._fadeRenderTarget.texture
                                }
                            },
                            vertexShader: "\n        precision highp float;\n\n        varying vec2 vUv;\n\n        void main() {\n          vUv = uv;\n          gl_Position = vec4(position, 1.);\n        }\n      ",
                            fragmentShader: `\n        precision highp float;\n\n        varying vec2 vUv;\n\n        uniform sampler2D uQuadTexture;\n        uniform float uFade;\n\n        void main() {\n          vec4 quad = texture2D(uQuadTexture, vUv);\n          quad.a *= uFade;\n\n          gl_FragColor = quad;\n\n          ${this._scene.renderer.blit ? "" : "#include <colorspace_fragment>"}\n        }\n      `,
                            transparent: !0
                        });
                        this._quad = new i.Mesh(e,t),
                        this._quad.layers.set(r.m1),
                        this._quad.frustumCulled = !1,
                        this._quad.renderOrder = Number.MAX_SAFE_INTEGER,
                        this._quad.visible = !1,
                        this._scene.add(this._quad)
                    }
                    destroyQuad() {
                        this._scene.remove(this._quad),
                        o.H.dispose(this._quad)
                    }
                    fade(e) {
                        !isNaN(e) && this._quad && (this._fade = e,
                        this._quad.material.uniforms.uFade.value = this._fade)
                    }
                    onResize({height: e, width: t}) {
                        const n = t * this._renderer.dpr
                          , i = e * this._renderer.dpr;
                        this._fadeRenderTarget.setSize(n, i)
                    }
                    _fadeTargets = new Set;
                    _fadeTargetsByName = {};
                    get fadeTargets() {
                        return this._fadeTargets
                    }
                    set fadeTargets(e) {
                        this._fadeTargets = e
                    }
                    get fadeTargetsByName() {
                        return this._fadeTargetsByName
                    }
                    addFadeTargetByName(e, t) {
                        !(t instanceof i.Object3D || t instanceof i.Group || t instanceof i.Mesh) || t.layers.isEnabled(r.m1) || t.layers.isEnabled(r.Q6) ? console.error(`[ObjectFadeRenderTargetHandler] ${t.name} is not suitable as fade targets`) : (this._fadeTargetsByName[e] || (this._fadeTargetsByName[e] = new Set),
                        this._fadeTargetsByName[e].add(t))
                    }
                    addFadeTarget(e) {
                        !(e instanceof i.Object3D || e instanceof i.Group || e instanceof i.Mesh) || e.layers.isEnabled(r.m1) || e.layers.isEnabled(r.Q6) ? console.error(`[ObjectFadeRenderTargetHandler] ${e.name} is not suitable as fade targets`) : this._fadeTargets?.add(e)
                    }
                    setFadeTargetsVisibility(e) {
                        this._fadeTargets?.forEach((t=>{
                            t.visible = e
                        }
                        ))
                    }
                    _nonFadeTargets = new Set;
                    get nonFadeTargets() {
                        return this._nonFadeTargets
                    }
                    addNonFadeTarget(e) {
                        !(e instanceof i.Group || e instanceof i.Mesh) || e.layers.isEnabled(r.AR) || e.layers.isEnabled(r.m1) || e.layers.isEnabled(r.Q6) ? console.error(`[ObjectFadeRenderTargetHandler] ${e.name} is not suitable as non-fade targets`) : this._nonFadeTargets?.add(e)
                    }
                    setNonFadeTargetsVisibility(e) {
                        this._nonFadeTargets?.forEach((t=>{
                            t.visible = e
                        }
                        ))
                    }
                    render(e, t) {
                        const n = this._renderer.getRenderTarget();
                        this._scene.renderer.blit && (this._renderer.outputColorSpace = i.LinearSRGBColorSpace,
                        this._renderer.toneMapping = i.NoToneMapping),
                        this._renderer.setClearColor(0, 0),
                        this._renderer.setRenderTarget(this._fadeRenderTarget),
                        this._renderer.clear(),
                        this._quad.visible = !1,
                        this.setFadeTargetsVisibility(!1),
                        this.setNonFadeTargetsVisibility(!0),
                        e.overrideMaterial = this._renderer.depthMaterial,
                        this._renderer.render(e, t),
                        e.overrideMaterial = null,
                        this.setFadeTargetsVisibility(!0),
                        this.setNonFadeTargetsVisibility(!1),
                        this._renderer.render(e, t),
                        this._scene.renderer.blit && (this._renderer.outputColorSpace = this._renderer.outputColorSpaceOriginal,
                        this._renderer.toneMapping = this._renderer.toneMappingOriginal),
                        this._renderer.setRenderTarget(n),
                        this._renderer.setClearColor(this._renderer.background, this._renderer.backgroundAlpha),
                        this._quad.visible = this._renderEnabled,
                        this.setFadeTargetsVisibility(!1),
                        this.setNonFadeTargetsVisibility(!0),
                        a.Lotus.tryRequestAnimationFrame()
                    }
                    destroy() {
                        this._fadeRenderTarget.texture.dispose(),
                        this._fadeRenderTarget.dispose(),
                        this.destroyQuad(),
                        this._fadeTargets.clear(),
                        this._nonFadeTargets.clear(),
                        o.H.destroy(this)
                    }
                }
            },
            5103: function(e, t, n) {
                "use strict";
                n.d(t, {
                    L: function() {
                        return l
                    }
                });
                var i = n(4468)
                  , a = n(9653)
                  , s = n(1334)
                  , r = n(7716)
                  , o = n(3395);
                class l {
                    _renderTarget;
                    _enabled = !1;
                    get enabled() {
                        return this._enabled
                    }
                    setEnabled(e) {
                        this._enabled = e,
                        this._quad && (this._quad.visible = e)
                    }
                    _renderer;
                    _scene;
                    _quad;
                    constructor({scene: e}) {
                        this._scene = e,
                        this._scene.eventPool?.register(this),
                        this._renderer = e.renderer,
                        this._renderTarget = this._renderer.createRenderTarget(),
                        this.updateObjectsListFromScene(this._scene),
                        this.createMaterial(),
                        this.createQuad()
                    }
                    _overrideMaterial;
                    createMaterial() {
                        this._overrideMaterial = new i.MeshBasicMaterial({
                            transparent: !1,
                            color: 16777215,
                            side: i.DoubleSide,
                            fog: !1,
                            depthFunc: i.AlwaysDepth,
                            depthWrite: !0
                        })
                    }
                    _material;
                    createQuad() {
                        const e = s.e.screenQuadGeometry;
                        this._material = new i.ShaderMaterial({
                            depthFunc: i.AlwaysDepth,
                            depthWrite: !1,
                            uniforms: {
                                uEdgeColor: {
                                    value: new i.Vector3(0,.2,.8)
                                },
                                uZoom: {
                                    value: 1
                                },
                                uLineSize: {
                                    value: 3
                                },
                                uTexSize: {
                                    value: new i.Vector2(100,100)
                                },
                                uTexture: {
                                    value: this._renderTarget.texture
                                }
                            },
                            vertexShader: "\n        precision highp float;\n\n        varying vec2 vUv;\n\n        void main() {\n          vUv = uv;\n          gl_Position = vec4(position, 1.);\n        }\n      ",
                            fragmentShader: "\n        precision highp float;\n\n        varying vec2 vUv;\n        uniform sampler2D uTexture;\n        uniform float uLineSize;\n        uniform float uZoom;\n        uniform vec2 uTexSize;\n        uniform vec3 uEdgeColor;\n\n        void main() {\n          vec4 base = texture2D(uTexture, vUv);\n          float baseAlpha = base.a > 0.0 ? 1.0 : 0.0;\n\n          vec2 invSize = 1.0 / uTexSize;\n          vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize) * uZoom * uLineSize;\n\n          vec4 c1 = texture2D( uTexture, vUv + uvOffset.xy);\n          vec4 c2 = texture2D( uTexture, vUv - uvOffset.xy);\n          vec4 c3 = texture2D( uTexture, vUv + uvOffset.yw);\n          vec4 c4 = texture2D( uTexture, vUv - uvOffset.yw);\n          \n          vec4 combined = c1 + c2 + c3 + c4;\n          float alpha = clamp(combined.a, 0.0, 1.0);\n          alpha = alpha > 0.0 ? 1.0 : 0.0;\n          alpha = alpha * (1.0 - baseAlpha);\n\n          gl_FragColor = vec4(uEdgeColor, alpha);\n        }\n      ",
                            transparent: !0
                        }),
                        this._quad = new i.Mesh(e,this._material),
                        this._quad.layers.set(r.m1),
                        this._quad.name = "outlineQuadMesh",
                        this._quad.frustumCulled = !1,
                        this._quad.renderOrder = Number.MAX_SAFE_INTEGER,
                        this._quad.visible = !1,
                        this._scene.add(this._quad)
                    }
                    destroyQuad() {
                        this._quad && (this._scene && this._scene.remove(this._quad),
                        o.H.dispose(this._quad))
                    }
                    onResize({height: e, width: t}) {
                        const n = t * this._renderer.dpr * .5
                          , a = e * this._renderer.dpr * .5;
                        this._material.uniforms.uTexSize.value = new i.Vector2(n,a),
                        this._renderTarget.setSize(n, a)
                    }
                    _objects = new Set;
                    get objects() {
                        return this._objects
                    }
                    _helpers = new Set;
                    get helpers() {
                        return this._helpers
                    }
                    _selectedObjects = new Set;
                    get selectedObjects() {
                        return this._selectedObjects
                    }
                    _selectedNode = null;
                    setCurrentMeshAndMaterial(e) {
                        if (a.Lotus.EditorRef && this._selectedNode !== e) {
                            const t = e ? e.name : ""
                              , n = e ? e.material.name : "";
                            a.Lotus.EditorRef.setViewportValue({
                                currentSelection: {
                                    mesh: t,
                                    material: n
                                }
                            }),
                            this._selectedNode = e
                        }
                    }
                    updateObjectsListFromScene(e=null) {
                        (e = e || this._scene) && e.layersReady.then((()=>{
                            e.getAllLayers().forEach((e=>{
                                this.addNode(e._element, e.data)
                            }
                            )),
                            e.children.forEach((e=>{
                                this.addNode(e, null)
                            }
                            ))
                        }
                        ))
                    }
                    addNode(e, t) {
                        t = t || {
                            id: ""
                        },
                        e instanceof i.Mesh ? this.addObject(e, t) : e instanceof i.Group ? 0 === e.children.length ? this.addHelper(e) : this.addObjectsFromObjectRecursive(e, t) : this.addHelper(e)
                    }
                    addObjectsFromObjectRecursive(e, t) {
                        e.children.forEach((e=>{
                            e instanceof i.Mesh ? this.addObject(e, t) : e instanceof i.Group && 0 === e.children.length || e instanceof i.Points ? this.addHelper(e) : this.addObjectsFromObjectRecursive(e, t)
                        }
                        ))
                    }
                    addHelper(e) {
                        this._helpers?.has(e) || (e.userData.visible = e.visible,
                        e.layers.enable(0),
                        this._helpers?.add(e))
                    }
                    addObject(e, t) {
                        e instanceof i.Mesh && !e.layers.isEnabled(r.m1) && !e.layers.isEnabled(r.Q6) ? this._objects?.has(e) || (e.userData.visible = e.visible,
                        e.userData.layerData = t,
                        e.layers.enable(1),
                        this._objects?.add(e)) : this.addHelper(e)
                    }
                    addSelection(e, t) {
                        t && (this.setCurrentMeshAndMaterial(null),
                        this.removeSelection()),
                        e instanceof i.Mesh && !e.layers.isEnabled(r.m1) && !e.layers.isEnabled(r.Q6) && (this._selectedObjects?.has(e) || (this.setCurrentMeshAndMaterial(e),
                        this._selectedObjects?.add(e)))
                    }
                    removeSelection(e=null) {
                        null != e ? this._selectedObjects?.delete(e) : this._selectedObjects?.clear()
                    }
                    setNonSelectedObjectsVisibility(e) {
                        this._objects?.forEach((t=>{
                            this._selectedObjects.has(t) || this.setNodeVisibility(t, e)
                        }
                        )),
                        this._helpers?.forEach((t=>{
                            this.setNodeVisibility(t, e)
                        }
                        ))
                    }
                    setNodeVisibility(e, t) {
                        t ? e.visible = e.userData.visible : (e.userData.visible = e.visible,
                        e.visible = t)
                    }
                    render(e, t) {
                        const n = this._renderer.getRenderTarget();
                        this._renderer.setClearColor(0, 0),
                        this._renderer.setRenderTarget(this._renderTarget),
                        this._renderer.clear(),
                        this._quad.visible = !1,
                        this.setNonSelectedObjectsVisibility(!1),
                        e.overrideMaterial = this._overrideMaterial,
                        this._renderer.render(e, t),
                        e.overrideMaterial = null,
                        this._renderer.setRenderTarget(n),
                        this._renderer.setClearColor(this._renderer.background, this._renderer.backgroundAlpha),
                        this.setNonSelectedObjectsVisibility(!0),
                        this._quad.visible = !0
                    }
                    destroy() {
                        this._renderTarget.texture.dispose(),
                        this._renderTarget.dispose(),
                        this.destroyQuad(),
                        this._objects.clear(),
                        this._selectedObjects.clear(),
                        o.H.destroy(this)
                    }
                }
            },
            1334: function(e, t, n) {
                "use strict";
                n.d(t, {
                    e: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(4103)
                  , s = n(3395);
                class r {
                    static _screenCamera;
                    static get screenCamera() {
                        return void 0 === this._screenCamera && (this._screenCamera = new i.OrthographicCamera(-.5,.5,.5,-.5,.1,1),
                        this._screenCamera.position.z = .5),
                        this._screenCamera
                    }
                    static _screenQuadGeometry;
                    static get screenQuadGeometry() {
                        return void 0 === this._screenQuadGeometry && (this._screenQuadGeometry = new i.PlaneGeometry(2,2,1,1),
                        this._screenQuadGeometry.deleteAttribute("normal")),
                        this._screenQuadGeometry
                    }
                    _material;
                    _scene;
                    _renderer;
                    constructor(e, t, n=void 0) {
                        this._renderer = e,
                        this._material = new i.ShaderMaterial(n ?? {
                            depthTest: !1,
                            depthWrite: !1,
                            transparent: !0,
                            stencilWrite: !1,
                            fog: !1,
                            lights: !1,
                            toneMapped: !1,
                            vertexShader: a.ScreenQuadVertex,
                            fragmentShader: t
                        });
                        const s = new i.Mesh(r.screenQuadGeometry,this._material);
                        s.matrixAutoUpdate = !1,
                        this._scene = new i.Scene,
                        this._scene.add(s)
                    }
                    setUniform(e, t) {
                        this._material.uniforms[e] ? this._material.uniforms[e].value = t : this._material.uniforms[e] = {
                            value: t
                        }
                    }
                    render(e=null) {
                        if (this._renderer)
                            if (null !== e) {
                                const t = this._renderer.getRenderTarget();
                                this._renderer.setRenderTarget(e),
                                this._renderer.render(this._scene, r.screenCamera),
                                this._renderer.setRenderTarget(t)
                            } else
                                this._renderer.render(this._scene, r.screenCamera)
                    }
                    async compileAsync(e) {
                        this._renderer?.compile(e, r.screenCamera)
                    }
                    destroy() {
                        s.H.disposeGeometry(r.screenQuadGeometry),
                        s.H.disposeMaterial(this._material),
                        s.H.dispose(this._scene),
                        s.H.destroy(this)
                    }
                }
            },
            1987: function(e, t, n) {
                "use strict";
                n.d(t, {
                    T: function() {
                        return h
                    }
                });
                var i = n(4468)
                  , a = n(9653)
                  , s = n(1334)
                  , r = n(4282)
                  , o = n(927)
                  , l = n(4103);
                class h extends i.WebGLRenderer {
                    _antialias;
                    _background = new i.Color;
                    get background() {
                        return this._background
                    }
                    _backgroundAlpha = 0;
                    get backgroundAlpha() {
                        return this._backgroundAlpha
                    }
                    _blit;
                    get blit() {
                        return this._blit
                    }
                    _stencil;
                    _outputColorSpace;
                    get outputColorSpaceOriginal() {
                        return this._outputColorSpace
                    }
                    _toneMapping;
                    get toneMappingOriginal() {
                        return this._toneMapping
                    }
                    constructor({alpha: e, antialias: t, blit: n, clearColor: i, clearColorAlpha: a, forceDoubleSideDisabled: s, forceEnvMapCompile: r, forceMapCompile: o, forceMetalnessMapCompile: l, forceNormalMapCompile: h, forceRoughnessMapCompile: c, outputColorSpace: d, powerPreference: u, premultipliedAlpha: p, stencil: m, toneMapping: f, toneMappingExposure: _}) {
                        super({
                            alpha: e,
                            antialias: t,
                            premultipliedAlpha: p,
                            powerPreference: u,
                            stencil: m
                        }),
                        this.getContext().getExtension("EXT_float_blend"),
                        this.autoClear = !1,
                        this._antialias = t,
                        this._blit = n,
                        this._stencil = m,
                        this.setDPR(),
                        this._renderTarget = this.createRenderTarget(),
                        this.initialize(),
                        this.onResize(),
                        this.onRendererChange({
                            clearColor: i,
                            clearColorAlpha: a,
                            forceDoubleSideDisabled: s,
                            forceEnvMapCompile: r,
                            forceMapCompile: o,
                            forceMetalnessMapCompile: l,
                            forceNormalMapCompile: h,
                            forceRoughnessMapCompile: c,
                            outputColorSpace: d,
                            toneMapping: f,
                            toneMappingExposure: _
                        })
                    }
                    initialize() {
                        this.createBlit(),
                        this.createDepthMaterial()
                    }
                    _rtt;
                    createBlit() {
                        if (!this._blit)
                            return;
                        const e = "\n      precision highp float;\n\n      varying vec2 vUv;\n\n      uniform sampler2D tDiffuse;\n\n      void main() {\n        gl_FragColor = texture2D(tDiffuse, vUv);\n\n        #include <tonemapping_fragment>\n        #include <colorspace_fragment>\n      }\n    ";
                        this._rtt = new s.e(this,e,{
                            alphaToCoverage: !0,
                            depthTest: !1,
                            depthWrite: !1,
                            fog: !1,
                            fragmentShader: e.trim(),
                            lights: !1,
                            name: "Renderer",
                            stencilWrite: !1,
                            toneMapped: !0,
                            transparent: !0,
                            vertexShader: l.ScreenQuadVertex
                        }),
                        this._rtt.setUniform("tDiffuse", this._renderTarget.texture)
                    }
                    destroyBlit() {
                        this._rtt?.destroy()
                    }
                    _depthMaterial;
                    get depthMaterial() {
                        return this._depthMaterial
                    }
                    createDepthMaterial() {
                        this._depthMaterial = new i.MeshBasicMaterial({
                            colorWrite: !1,
                            name: "RendererDepth"
                        })
                    }
                    destroyDepthMaterial() {
                        this._depthMaterial.dispose()
                    }
                    _renderTarget;
                    createDepthTexture(e, t) {
                        const n = new i.DepthTexture(e,t);
                        return n.format = this._stencil ? i.DepthStencilFormat : i.DepthFormat,
                        n
                    }
                    createRenderTarget() {
                        const e = this.width * this.dpr
                          , t = this.height * this.dpr
                          , n = new i.WebGLRenderTarget(e,t,{
                            depthBuffer: !0,
                            generateMipmaps: !1,
                            magFilter: i.NearestFilter,
                            minFilter: i.NearestFilter,
                            samples: this._antialias ? r.Z.rtSamplesTest() : 0,
                            stencilBuffer: this._stencil,
                            type: i.HalfFloatType
                        });
                        return n.depthTexture = this.createDepthTexture(e, t),
                        n
                    }
                    destroyRenderTarget() {
                        this._renderTarget && (this._renderTarget.texture.dispose(),
                        this._renderTarget.dispose())
                    }
                    compose(e, t) {
                        this._rtt ? (this.getRenderTarget() !== this._renderTarget && this.setRenderTarget(this._renderTarget),
                        this.outputColorSpace = i.LinearSRGBColorSpace,
                        this.toneMapping = i.NoToneMapping,
                        this.clear(),
                        this.render(e, t),
                        this.outputColorSpace = this._outputColorSpace,
                        this.toneMapping = this._toneMapping,
                        this.setRenderTarget(null),
                        this._rtt.render()) : (this.clear(),
                        this.render(e, t))
                    }
                    _height;
                    get height() {
                        return this._height
                    }
                    _width;
                    get width() {
                        return this._width
                    }
                    onResize(e) {
                        const {height: t=window.innerHeight, width: n=window.innerWidth} = e || {};
                        this.setSize(n, t),
                        this._height = t,
                        this._width = n,
                        this._renderTarget.setSize(n * this.dpr, t * this.dpr)
                    }
                    onRendererChange({clearColor: e=[1, 1, 1], clearColorAlpha: t=0, outputColorSpace: n, toneMapping: i, toneMappingExposure: s, forceDoubleSideDisabled: r, forceEnvMapCompile: o, forceMapCompile: l, forceMetalnessMapCompile: h, forceNormalMapCompile: c, forceRoughnessMapCompile: d}) {
                        this._background.setRGB(e[0], e[1], e[2]),
                        this._backgroundAlpha = t,
                        this.setClearColor(this._background, this._backgroundAlpha),
                        this._outputColorSpace = n,
                        this.outputColorSpace !== n && (this.outputColorSpace = n),
                        this._toneMapping = i,
                        this.toneMapping !== i && (this.toneMapping = i),
                        this.toneMappingExposure !== s && (this.toneMappingExposure = s),
                        this.forceDoubleSideDisabled = r ?? this.forceDoubleSideDisabled,
                        this.forceEnvMapCompile = o ?? this.forceEnvMapCompile,
                        this.forceMapCompile = l ?? this.forceMapCompile,
                        this.forceMetalnessMapCompile = h ?? this.forceMetalnessMapCompile,
                        this.forceNormalMapCompile = c ?? this.forceNormalMapCompile,
                        this.forceRoughnessMapCompile = d ?? this.forceRoughnessMapCompile,
                        a.Lotus.tryRequestAnimationFrame()
                    }
                    _dpr;
                    get dpr() {
                        return this._dpr
                    }
                    setDPR() {
                        this._dpr = r.Z.dprTest(),
                        this.setPixelRatio(this._dpr)
                    }
                    _transmissionMapSize = 1024;
                    get transmissionMapSize() {
                        return this._transmissionMapSize
                    }
                    set transmissionMapSize(e) {
                        this._transmissionMapSize = r.Z.transmissionMapSizeTest(e),
                        this.setTransmissionRenderTargetSize(e)
                    }
                    forceDoubleSideDisabled = !1;
                    forceEnvMapCompile = !0;
                    forceMapCompile = !0;
                    forceMetalnessMapCompile = !0;
                    forceNormalMapCompile = !0;
                    forceRoughnessMapCompile = !0;
                    setupSelectiveCompile(e) {
                        e.traverse((e=>{
                            if (e instanceof i.Mesh) {
                                const t = e.material;
                                this.forceDoubleSideDisabled && t.side === i.DoubleSide && (t.side = i.FrontSide),
                                t instanceof i.MeshStandardMaterial && (this.forceEnvMapCompile && (t.envMap = t.envMap ?? o.G.envMap),
                                this.forceMapCompile && (t.map = t.map ?? o.G.white1x1),
                                this.forceMetalnessMapCompile && (t.metalnessMap = t.metalnessMap ?? o.G.white1x1),
                                this.forceNormalMapCompile && (t.normalMap = t.normalMap ?? o.G.normal1x1),
                                this.forceRoughnessMapCompile && (t.roughnessMap = t.roughnessMap ?? o.G.white1x1))
                            }
                        }
                        ))
                    }
                    compileScene(e, t) {
                        return new Promise((async n=>{
                            this.setupSelectiveCompile(e),
                            this._rtt && this.getRenderTarget() !== this._renderTarget && this.setRenderTarget(this._renderTarget),
                            this.outputColorSpace = i.LinearSRGBColorSpace,
                            this.toneMapping = i.NoToneMapping,
                            e.dispatchEvent({
                                message: "compileMacro",
                                type: "debug"
                            }),
                            await this.compileMacro(e, t, !0),
                            this._rtt && await this._rtt.compileAsync(e),
                            this.outputColorSpace = this._outputColorSpace,
                            this.toneMapping = this._toneMapping,
                            n(!0)
                        }
                        ))
                    }
                    destroy() {
                        this.domElement.parentNode.removeChild(this.domElement),
                        this.destroyBlit(),
                        this.destroyDepthMaterial(),
                        this.renderLists.dispose(),
                        this.info.programs.forEach(((e,t)=>{
                            0 !== t && 1 !== t && e.destroy()
                        }
                        ))
                    }
                }
            },
            5636: function(e, t, n) {
                "use strict";
                n.d(t, {
                    e: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(3395)
                  , s = n(8877);
                class r extends i.ShaderMaterial {
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    _scene;
                    constructor({defines: e={}, fields: t, fragmentShader: n, extensions: i={
                        derivatives: !0
                    }, name: a, uniforms: s={}, scene: r, vertexShader: o}) {
                        super({
                            defines: e,
                            extensions: i,
                            fragmentShader: n,
                            vertexShader: o,
                            uniforms: s
                        }),
                        this._scene = r,
                        this._scene?.eventPool?.register(this),
                        this.name = a,
                        this.onDataChange(t)
                    }
                    onStateChange({category: e, currentState: t, previousState: n}) {
                        this.fields?.generateStateValues(),
                        this.onValuesChange()
                    }
                    onDataChange(e) {
                        this._fields?.destroy(),
                        this._fields = s.O.create(e, this._scene),
                        this.onValuesChange()
                    }
                    onValuesChange() {
                        if (this._fields)
                            for (const e of Object.entries(this._fields.values)) {
                                let[t,n] = e;
                                n.includes?.("#") && (n = new i.Color(n)),
                                this.uniforms && (this.uniforms[t].value = n)
                            }
                    }
                    destroy() {
                        this.dispose(),
                        a.H.destroy(this)
                    }
                }
            },
            9137: function(e, t, n) {
                "use strict";
                n.d(t, {
                    G: function() {
                        return l
                    }
                });
                var i = n(361)
                  , a = n.n(i)
                  , s = n(8446)
                  , r = n.n(s)
                  , o = n(3395);
                class l {
                    _appState;
                    _appStateBindings;
                    _scene;
                    constructor({appState: e, data: t, scene: n}) {
                        this._scene = n,
                        this._scene.eventPool?.register(this),
                        this.onAppStateChange = this.onAppStateChange.bind(this),
                        this._appState = e,
                        this._appStateBindings = Array.from(this._appState.getKeys()).map((e=>this._appState.bind(e, (t=>this.onAppStateChange(e, t))))),
                        this._state = this._appState.get("global"),
                        this.onDataChange(t)
                    }
                    _previousStates = {};
                    onAppStateChange(e, t) {
                        this._scene.eventPool?.trigger({
                            name: "stateChange"
                        }, {
                            category: e,
                            previousState: this._previousStates[e],
                            currentState: t
                        }),
                        this._previousStates[e] = t
                    }
                    addCategory(e) {
                        const t = this._appState.bind(e, (t=>this.onAppStateChange(e, t)));
                        this._appStateBindings.push(t)
                    }
                    _state;
                    get state() {
                        return this._state
                    }
                    change({category: e, value: t}) {
                        this._appState.set(e, t)
                    }
                    _states;
                    get states() {
                        return this._states
                    }
                    onDataChange(e) {
                        r()(this._states, e) || (this._states = a()(e))
                    }
                    destroy() {
                        this._appStateBindings.forEach((e=>{
                            e.destroy()
                        }
                        )),
                        o.H.destroy(this)
                    }
                }
            },
            5395: function(e, t, n) {
                "use strict";
                n.d(t, {
                    o: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(9707)
                  , s = n(14);
                class r extends i.RectAreaLight {
                    static _chunkMap = new Map;
                    static _textureMap = new Map;
                    static getLayerMasksForChunk() {
                        const e = this._textureMap.keys()
                          , t = [];
                        for (const n of e)
                            t.push(n.layers.mask);
                        return t
                    }
                    _helper;
                    get helper() {
                        return void 0 === this._helper && this.addHelper(),
                        this._helper
                    }
                    _texture;
                    _color;
                    _bounds;
                    _hasHelper = !1;
                    get hasHelper() {
                        return this._hasHelper
                    }
                    constructor(e) {
                        void 0 !== i.UniformsLib.LTC_FLOAT_1 && void 0 !== i.UniformsLib.LTC_FLOAT_2 || a.a.init();
                        const t = e.color
                          , n = e.texture
                          , s = n?.source.data.width ?? 1
                          , o = n?.source.data.height ?? 1
                          , l = Math.max(s, o)
                          , h = e.width ?? s / l
                          , c = e.height ?? o / l;
                        h / c != s / o && console.warn("[TexturedAreaLight] Ratio is not matched with the source texture"),
                        super(t, e.intensity ?? 1, h, c),
                        r._textureMap.set(this, n),
                        this._texture = n,
                        this._color = t,
                        this._bounds = new i.Vector2(e.boundsX ?? 1,e.boundsY ?? 1),
                        this._hasHelper = e.needsHelper ?? !1,
                        this._hasHelper && this.addHelper()
                    }
                    dispose() {
                        this.removeFromParent(),
                        void 0 !== this.helper && (this.helper.geometry.dispose(),
                        this.helper.material.dispose()),
                        this._texture?.dispose(),
                        r._textureMap.delete(this),
                        super.dispose()
                    }
                    addHelper() {
                        const e = new i.PlaneGeometry(this._bounds.x,this._bounds.y,1,1);
                        e.rotateY(Math.PI);
                        const t = new i.MeshBasicMaterial({
                            color: this._color,
                            side: i.FrontSide,
                            map: this._texture,
                            fog: !1,
                            transparent: this._texture?.format === i.RGBAFormat
                        });
                        this._helper = new i.Mesh(e,t),
                        this.add(this._helper),
                        this._hasHelper = !0
                    }
                    static updateTexture(e, t) {
                        if (t.needsUpdate = !0,
                        this._textureMap.set(e, t),
                        e.hasHelper) {
                            const n = e.helper.material;
                            n.map = t,
                            n.needsUpdate = !0
                        }
                    }
                    static updateChunks() {
                        for (const e of this._chunkMap.values())
                            e.areaLightMaps = [...r._textureMap.values()]
                    }
                    static setupSceneMaterials(e) {
                        e.traverse((e=>{
                            const t = e.material;
                            if (void 0 !== t && (t instanceof i.MeshStandardMaterial || t instanceof i.MeshPhysicalMaterial)) {
                                let n = this._chunkMap.get(t);
                                void 0 === n ? (n = new s.vT({
                                    material: t,
                                    areaLightMaps: [...r._textureMap.values()],
                                    lightLayerMasks: [...r.getLayerMasksForChunk()],
                                    objectLayerMask: e.layers.mask ?? -1
                                }),
                                this._chunkMap.set(t, n)) : (n.areaLightMaps = [...r._textureMap.values()],
                                n.lightLayerMasks = [...r.getLayerMasksForChunk()],
                                n.objectLayerMask = e.layers.mask ?? -1)
                            }
                        }
                        ))
                    }
                }
            },
            9138: function(e, t, n) {
                "use strict";
                n.d(t, {
                    Ah: function() {
                        return o
                    },
                    TY: function() {
                        return l
                    },
                    aR: function() {
                        return i
                    },
                    tl: function() {
                        return a
                    }
                });
                var i, a, s = n(9653), r = n(3395);
                !function(e) {
                    e.Linear = "linear",
                    e.EaseIn = "easeIn",
                    e.EaseOut = "easeOut",
                    e.EaseInOut = "easeInOut",
                    e.Custom = "custom"
                }(i || (i = {})),
                function(e) {
                    e.Quad = "Quad",
                    e.Cubic = "Cubic",
                    e.Quart = "Quart",
                    e.Quint = "Quint",
                    e.Sin = "Sin",
                    e.Elastic = "Elastic",
                    e.Back = "Back"
                }(a || (a = {}));
                const o = {
                    animationSkip: {
                        defaultValue: !1,
                        render: e=>"interpolation" !== e.transition,
                        type: "Boolean"
                    },
                    transition: {
                        dataType: "String",
                        defaultValue: "standard",
                        options: [{
                            label: "Standard",
                            value: "standard"
                        }, {
                            label: "Keyframes",
                            value: "keyframes"
                        }, {
                            label: "Interpolation",
                            value: "interpolation"
                        }],
                        type: "Select"
                    },
                    keyframes: {
                        defaultValue: "",
                        render: e=>"keyframes" === e.transition,
                        type: "String"
                    },
                    duration: {
                        defaultValue: 1,
                        min: 0,
                        max: 10,
                        render: e=>"standard" === e.transition,
                        step: .01,
                        type: "Slider"
                    },
                    delay: {
                        defaultValue: 0,
                        min: 0,
                        max: 10,
                        render: e=>"standard" === e.transition,
                        step: .01,
                        type: "Slider"
                    },
                    easeFunctionType: {
                        defaultValue: i.Linear,
                        options: [{
                            label: "Linear",
                            value: i.Linear
                        }, {
                            label: "Ease In",
                            value: i.EaseIn
                        }, {
                            label: "Ease Out",
                            value: i.EaseOut
                        }, {
                            label: "Ease In Out",
                            value: i.EaseInOut
                        }],
                        render: e=>"standard" === e.transition,
                        type: "Select"
                    },
                    easeCurveType: {
                        defaultValue: a.Cubic,
                        options: [{
                            label: "Quad",
                            value: a.Quad
                        }, {
                            label: "Cubic",
                            value: a.Cubic
                        }, {
                            label: "Quart",
                            value: a.Quart
                        }],
                        render: e=>"standard" === e.transition,
                        type: "Select"
                    },
                    useAnimationOut: {
                        defaultValue: !1,
                        render: e=>"standard" === e.transition,
                        type: "Boolean"
                    },
                    durationOut: {
                        defaultValue: 1,
                        min: 0,
                        max: 10,
                        render: e=>"standard" === e.transition && !0 === e.useAnimationOut,
                        step: .01,
                        type: "Slider"
                    },
                    delayOut: {
                        defaultValue: 0,
                        min: 0,
                        max: 10,
                        render: e=>"standard" === e.transition && !0 === e.useAnimationOut,
                        step: .01,
                        type: "Slider"
                    },
                    easeFunctionTypeOut: {
                        defaultValue: i.Linear,
                        options: [{
                            label: "Linear",
                            value: i.Linear
                        }, {
                            label: "Ease In",
                            value: i.EaseIn
                        }, {
                            label: "Ease Out",
                            value: i.EaseOut
                        }, {
                            label: "Ease In Out",
                            value: i.EaseInOut
                        }],
                        render: e=>"standard" === e.transition && !0 === e.useAnimationOut,
                        type: "Select"
                    },
                    easeCurveTypeOut: {
                        defaultValue: a.Cubic,
                        options: [{
                            label: "Quad",
                            value: a.Quad
                        }, {
                            label: "Cubic",
                            value: a.Cubic
                        }, {
                            label: "Quart",
                            value: a.Quart
                        }],
                        render: e=>"standard" === e.transition && !0 === e.useAnimationOut,
                        type: "Select"
                    }
                };
                class l {
                    _properties;
                    _timeline;
                    get timeline() {
                        return this._timeline
                    }
                    get progress() {
                        return this._timeline?.progressValue
                    }
                    set progress(e) {
                        this._timeline && (this._timeline.progressValue = e)
                    }
                    forceUpdate(e={}) {
                        this._timeline && this._timeline.forceUpdate(e)
                    }
                    get delay() {
                        return this._properties.delay ?? 0
                    }
                    get duration() {
                        return this._properties.duration ?? 2
                    }
                    get easeFunctionType() {
                        return this._properties.easeFunctionType ?? i.EaseInOut
                    }
                    get easeCurveType() {
                        return this._properties.easeCurveType ?? a.Cubic
                    }
                    get easeFunction() {
                        return this.easeFunctionType === i.Linear ? this.easeFunctionType : `${this.easeFunctionType}${this.easeCurveType}`
                    }
                    get isPaused() {
                        return this._timeline?._isPaused ?? !0
                    }
                    constructor(e={}, t=!0) {
                        this.reset(e, t)
                    }
                    reset(e, t=!0) {
                        this._properties = e,
                        this._timeline = s.Lotus.AnimSystem.createTimeGroup(),
                        this._timeline.on("update", (()=>s.Lotus.tryRequestAnimationFrame())),
                        t && this._timeline.on("complete", (()=>this.destroy()))
                    }
                    addKeyframe(e, t) {
                        const n = {
                            ...t,
                            start: t?.start ?? this.delay,
                            end: t?.end ?? this.delay + this.duration,
                            easeFunction: t?.easeFunction ?? this.easeFunction
                        };
                        return this._timeline.addKeyframe(e, n)
                    }
                    addEvent(e, t) {
                        return this._timeline.addEvent(e, t)
                    }
                    setDuration(e) {
                        this._properties.duration = e
                    }
                    setDelay(e) {
                        this._properties.delay = e
                    }
                    setEaseFunction(e) {
                        this._properties.easeFunctionType = e
                    }
                    setEaseCurve(e) {
                        this._properties.easeCurveType = e
                    }
                    on(e, t) {
                        "update" === e ? (this._timeline.rafEmitter.on("update", t),
                        this._timeline.on("complete", t)) : this._timeline.on(e, t)
                    }
                    timeScale(e) {
                        this._timeline.timeScale(e)
                    }
                    play(e) {
                        const t = e ? this._timeline.duration - .1 : 0;
                        this._timeline.play(t)
                    }
                    restart() {
                        this._timeline.restart()
                    }
                    destroy() {
                        this._timeline && (this._timeline.pause(),
                        this._timeline.remove()),
                        r.H.destroy(this)
                    }
                }
            },
            2840: function(e, t, n) {
                "use strict";
                n.d(t, {
                    w: function() {
                        return o
                    }
                });
                var i = n(197)
                  , a = n(9653)
                  , s = n(3395)
                  , r = n(7716);
                class o {
                    _camera;
                    _domElement;
                    _scene;
                    constructor({camera: e, domElement: t, scene: n}) {
                        this._camera = e || n.controls.camera,
                        this._domElement = t || n.renderer.domElement,
                        this._scene = n,
                        this.createControls(),
                        this.addEventListeners()
                    }
                    get enabled() {
                        return this._controls.enabled
                    }
                    _controls;
                    _gizmoEnabled = !1;
                    createControls() {
                        this._controls = new i.Ys(this._camera,this._domElement),
                        this._controls.traverse((e=>{
                            e.layers.set(r.Q6)
                        }
                        )),
                        this._controls.getRaycaster().layers.set(r.Q6),
                        this._controls.layers.set(r.Q6),
                        this._scene.add(this._controls)
                    }
                    get gizmoEnabled() {
                        return this._gizmoEnabled
                    }
                    set gizmoEnabled(e) {
                        this._gizmoEnabled = e,
                        this.enableTransformControls()
                    }
                    enableTransformControls() {
                        const e = 1 * (this.gizmoEnabled ? 1 : 0) == 1;
                        this._controls.enabled = e,
                        this._controls._gizmo.visible = e
                    }
                    destroyControls() {
                        this._controls.dispose()
                    }
                    attach(e) {
                        if (e.userData?.layer?.isCamera) {
                            const t = e.userData.layer.scripts.get("AnimatedCamera");
                            t && (e = t.camera)
                        }
                        this._controls.attach(e),
                        this.enableTransformControls()
                    }
                    detach() {
                        this._controls.detach(),
                        this.enableTransformControls()
                    }
                    on(e, t) {
                        switch (e) {
                        case "change":
                            this._controls.addEventListener("objectChange", t);
                            break;
                        case "dragging":
                            this._controls.addEventListener("dragging-changed", t)
                        }
                    }
                    setMode(e) {
                        this._controls?.setMode(e)
                    }
                    hide() {
                        this._controls.enabled = !1,
                        this._controls.visible = !1
                    }
                    show() {
                        this._controls.enabled = !0,
                        this._controls.visible = !0
                    }
                    onDraggingChanged(e) {
                        a.Lotus.scene && (a.Lotus.scene.controls.orbit.enabled = !e.value)
                    }
                    addEventListeners() {
                        this.onDraggingChanged = this.onDraggingChanged.bind(this),
                        this._controls.addEventListener("dragging-changed", this.onDraggingChanged)
                    }
                    removeEventListeners() {
                        this._controls.removeEventListener("dragging-changed", this.onDraggingChanged)
                    }
                    destroy() {
                        this.removeEventListeners(),
                        this.destroyControls(),
                        s.H.destroy(this)
                    }
                }
            },
            2060: function(e, t, n) {
                "use strict";
                n.d(t, {
                    fw: function() {
                        return a.f
                    },
                    pf: function() {
                        return s.p
                    },
                    IE: function() {
                        return r.I
                    },
                    FK: function() {
                        return i.F
                    },
                    aB: function() {
                        return f.a
                    },
                    oM: function() {
                        return f.o
                    },
                    ZX: function() {
                        return _.Z
                    },
                    Ep: function() {
                        return g.E
                    },
                    cl: function() {
                        return v.c
                    },
                    cG: function() {
                        return T
                    },
                    IZ: function() {
                        return o.I
                    },
                    rE: function() {
                        return l.r
                    },
                    H1: function() {
                        return h.H
                    },
                    ID: function() {
                        return C.I
                    },
                    iW: function() {
                        return v.i
                    },
                    zd: function() {
                        return E.zd
                    },
                    rP: function() {
                        return E.rP
                    },
                    hl: function() {
                        return E.hl
                    },
                    WK: function() {
                        return w.W
                    },
                    lW: function() {
                        return w.l
                    },
                    mh: function() {
                        return c.m
                    },
                    TT: function() {
                        return d.T
                    },
                    ex: function() {
                        return u.e
                    },
                    pv: function() {
                        return p.e
                    },
                    ZK: function() {
                        return m.Z
                    },
                    $k: function() {
                        return A.$
                    },
                    LI: function() {
                        return L.L
                    },
                    ez: function() {
                        return R.e
                    },
                    Th: function() {
                        return V.T
                    },
                    yJ: function() {
                        return P.e
                    },
                    GC: function() {
                        return F.G
                    },
                    on: function() {
                        return U.o
                    },
                    TY: function() {
                        return O.TY
                    },
                    tl: function() {
                        return O.tl
                    },
                    aR: function() {
                        return O.aR
                    },
                    Ah: function() {
                        return O.Ah
                    },
                    wx: function() {
                        return D.w
                    }
                });
                var i = n(981)
                  , a = n(5271)
                  , s = n(6443)
                  , r = n(9629)
                  , o = n(1919)
                  , l = n(7175)
                  , h = n(4147)
                  , c = n(6450)
                  , d = n(5778)
                  , u = n(5487)
                  , p = n(1501)
                  , m = n(2319)
                  , f = n(3456)
                  , _ = n(9283)
                  , g = n(9888)
                  , v = n(6719)
                  , y = n(4468)
                  , M = n(9653)
                  , S = n(6555)
                  , x = n(7716)
                  , b = n(3395);
                class T extends y.Object3D {
                    _scene;
                    constructor({color: e, geometry: t, scale: n, scene: i}) {
                        super(),
                        this._scene = i,
                        this.createMaterial(e),
                        this.createGeometry(t),
                        this.createMesh(n),
                        this._scene.add(this),
                        this.hide()
                    }
                    _material;
                    createMaterial(e) {
                        let t;
                        switch (e) {
                        case "green":
                            t = S.F1;
                            break;
                        case "red":
                            t = S.yg;
                            break;
                        case "blue":
                            t = S.pI
                        }
                        this._material = new y.MeshBasicMaterial({
                            color: t
                        })
                    }
                    _geometry;
                    createGeometry(e) {
                        this._geometry = M.Lotus.geometries.get(e)
                    }
                    _mesh;
                    createMesh(e) {
                        this._mesh = new y.Mesh(this._geometry,this._material),
                        this._mesh.scale.fromArray(e),
                        this._mesh.layers.set(x.Q6),
                        this.add(this._mesh)
                    }
                    show() {
                        this.visible = !0
                    }
                    hide() {
                        this.visible = !1
                    }
                    destroy() {
                        b.H.dispose(this),
                        b.H.destroy(this)
                    }
                }
                var C = n(1837)
                  , E = n(6870)
                  , w = n(3342)
                  , A = n(6356)
                  , L = n(5103)
                  , V = n(1987)
                  , R = n(1334)
                  , P = n(5636)
                  , F = n(9137)
                  , U = n(5395)
                  , O = n(9138)
                  , D = n(2840)
            },
            9249: function(e, t, n) {
                "use strict";
                n.d(t, {
                    s: function() {
                        return u
                    }
                });
                var i = n(4468)
                  , a = n(9653)
                  , s = n(7699)
                  , r = n(3342)
                  , o = n(6816)
                  , l = n(8626)
                  , h = n(3395)
                  , c = n(6925)
                  , d = n(3510);
                class u extends r.W {
                    static fields = {
                        ...r.l,
                        json: {
                            defaultValue: "",
                            type: "String"
                        },
                        fovMultiplier: {
                            defaultValue: 1,
                            type: "Number"
                        },
                        strength: {
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        moveXY: {
                            defaultValue: [1, 1],
                            isVariant: !0,
                            type: "Vector"
                        },
                        lerp: {
                            defaultValue: .04,
                            isVariant: !0,
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        touchMultiplier: {
                            defaultValue: 2,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            step: .01,
                            type: "Slider"
                        },
                        isDraggable: {
                            defaultValue: !0,
                            type: "Boolean"
                        }
                    };
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            fields: e,
                            layer: t,
                            name: "KeyframeCamera",
                            scene: n
                        }),
                        this.layer.isCamera = !0,
                        this.createCamera(),
                        this.createStructure(),
                        this.onDataChange(e)
                    }
                    camera;
                    createCamera() {
                        this.camera = new s.h({
                            scene: this.scene
                        }),
                        this.layer.element = this.camera,
                        this.scene.add(this.camera)
                    }
                    _structure;
                    createStructure() {
                        this._structure = new i.Group,
                        this._structure.camera = new s.h({
                            name: "camera",
                            scene: this.scene
                        }),
                        this._structure.wrapper = new i.Group,
                        this._structure.wrapper.name = "wrapper",
                        this._structure.wrapper.add(this._structure.camera),
                        this._structure.local = new i.Group,
                        this._structure.local.name = "local",
                        this._structure.local.add(this._structure.wrapper),
                        this._structure.world = new i.Group,
                        this._structure.world.name = "world",
                        this._structure.world.add(this._structure.local),
                        this._structure.add(this._structure.world),
                        this.scene.add(this._structure)
                    }
                    onStateChange(e) {
                        super.onStateChange(e),
                        this._lerp = this.fields.lerp,
                        this._strength = this.fields.strength,
                        this._moveXY.fromArray(this.fields.moveXY)
                    }
                    playTimeline({animation: e, destroyOnComplete: t=!0, isSkip: n=this.animationSkip}={}) {
                        if (super.playTimeline({
                            animation: e,
                            destroyOnComplete: t,
                            element: this._structure,
                            isSkip: n
                        }),
                        "none" !== this.animationType) {
                            const t = e.nodes.cameraXform?.focalLength.value ?? this._structure.camera.fov;
                            this.timeline.addKeyframe(this._structure.camera, {
                                start: 0,
                                end: 2,
                                fov: [null, t]
                            })
                        }
                        this.animationAutoPlay && this.timeline.play(n)
                    }
                    onPointerMove() {
                        this.scene.pointer.isTouching && a.Lotus.tryRequestAnimationFrame()
                    }
                    _fovMultiplier = .78;
                    _lerp = .04;
                    _move = new i.Vector3;
                    _moveXY = new i.Vector2;
                    _strength = 1;
                    _position = new i.Vector3;
                    _lookAt = new i.Vector3(0,0,0);
                    _lookAtMatrix = new i.Matrix4;
                    _up = new i.Vector3(0,1,0);
                    _ratio = 1;
                    onLoop() {
                        this._structure.camera.getWorldPosition(this.camera.position),
                        this._structure.camera.getWorldQuaternion(this.camera.quaternion),
                        this._structure.camera.fov !== this.camera.fov && (this.camera.fov = d.D.convertToHorizontal(this._structure.camera.fov),
                        this.camera.fov *= this._fovMultiplier);
                        const e = 45 / this.camera.fov;
                        this._ratio = c.M.lerp(this._ratio, e, this._lerp),
                        this.fields.isDraggable ? this.scene.pointer.isTouching ? (this._move.x = -.1 * this.scene.pointer.move.x * this._strength * this._moveXY.x * this._ratio,
                        this._move.y = .1 * this.scene.pointer.move.y * this._strength * this._moveXY.y * this._ratio,
                        this.scene.pointer.isTouch && (this._move.x *= this.fields.touchMultiplier,
                        this._move.y *= this.fields.touchMultiplier)) : (this._move.x = 0,
                        this._move.y = 0) : (this._move.x = this.scene.pointer.normalized.x * this._strength * this._moveXY.x * this._ratio,
                        this._move.y = this.scene.pointer.normalized.y * this._strength * this._moveXY.y * this._ratio),
                        this._position.x = c.M.lerp(this._position.x, this._move.x, this._lerp),
                        this._position.y = c.M.lerp(this._position.y, this._move.y, this._lerp),
                        this._position.z = c.M.lerp(this._position.z, this._move.z, this._lerp);
                        const t = Number(this._position.x.toFixed(5))
                          , n = Number(this._position.y.toFixed(5))
                          , i = Number(this._position.z.toFixed(5));
                        this._structure.camera.position.x === t && this._structure.camera.position.y === n && this._structure.camera.position.z === i || (this._structure.camera.position.x = t,
                        this._structure.camera.position.y = n,
                        this._structure.camera.position.z = i,
                        a.Lotus.tryRequestAnimationFrame()),
                        this._lookAt.set(0, 0, -this._structure.wrapper.position.distanceTo(this._structure.local.position)),
                        this._lookAtMatrix.lookAt(this._position, this._lookAt, this._up),
                        this._structure.camera.quaternion.setFromRotationMatrix(this._lookAtMatrix)
                    }
                    async onDataChangeValues() {
                        this.fields.fovMultiplier && (this._fovMultiplier = this.fields.fovMultiplier),
                        this._lerp = this.fields.lerp,
                        this._strength = this.fields.strength,
                        this.fields?.moveXY && this._moveXY?.fromArray(this.fields.moveXY),
                        this.fields?.json && (this.json = await o.j.get(this.fields.json)),
                        this.json && this.createKeyframes(),
                        this.ready?.resolve()
                    }
                    async onHotReload({isForced: e, path: t}) {
                        (l.U.checkFilePath(this.fields.json, t) || e) && (await this.onDataChangeValues(),
                        this.playTimeline())
                    }
                    destroy() {
                        h.H.dispose(this._structure),
                        super.destroy()
                    }
                }
            },
            1887: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    AmbientLight: function() {
                        return r
                    },
                    AnimatedCamera: function() {
                        return u
                    },
                    InteractiveCamera: function() {
                        return _
                    },
                    InteractiveCameraInterpolation: function() {
                        return M
                    },
                    InterpolationEnvironment: function() {
                        return R
                    },
                    InterpolationEnvironmentEditor: function() {
                        return U
                    },
                    KeyframeCamera: function() {
                        return O.s
                    },
                    KeyframeCrossFadeEnvironment: function() {
                        return G
                    },
                    KeyframeEnvironment: function() {
                        return B
                    },
                    KeyframeObject: function() {
                        return W
                    },
                    KeyframeObjectFade: function() {
                        return Q
                    },
                    KeyframeTexturedAreaLight: function() {
                        return J
                    },
                    KeyframeTimelineCamera: function() {
                        return te
                    }
                });
                var i = n(4468)
                  , a = n(3395)
                  , s = n(8877);
                class r extends i.AmbientLight {
                    static fields = {
                        color: {
                            defaultValue: "#ffffff",
                            isVariant: !0,
                            label: "Color",
                            type: "Color"
                        },
                        intensity: {
                            defaultValue: 1,
                            isVariant: !0,
                            label: "Intensity",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        }
                    };
                    _fields;
                    _layer;
                    _scene;
                    _color = new i.Color;
                    constructor({fields: e, layer: t, scene: n}) {
                        super(),
                        this._layer = t,
                        this._scene = n,
                        this.color = this._color,
                        this.name = "AmbientLight",
                        this.onDataChange(e),
                        this._scene.eventPool?.register(this),
                        this._scene.add(this)
                    }
                    onStateChange() {
                        this._fields?.generateStateValues(),
                        this.onValuesChange()
                    }
                    onDataChange(e) {
                        this._fields?.destroy(),
                        this._fields = s.O.create(e, this._scene),
                        this.onValuesChange()
                    }
                    onValuesChange() {
                        this._color.setHex(this._fields.color),
                        this.color = this._color,
                        this.intensity = this._fields.intensity
                    }
                    destroy() {
                        this.dispose(),
                        a.H.dispose(this),
                        a.H.destroy(this)
                    }
                }
                var o = n(9653)
                  , l = n(7699)
                  , h = n(9138)
                  , c = n(6925);
                const d = .001;
                class u extends l.h {
                    static fields = {
                        offsetX: {
                            defaultValue: 0,
                            isVariant: !0,
                            label: "Offset X",
                            min: -100,
                            max: 100,
                            step: .1,
                            type: "Slider"
                        },
                        offsetY: {
                            defaultValue: 0,
                            isVariant: !0,
                            label: "Offset Y",
                            min: -100,
                            max: 100,
                            step: .1,
                            type: "Slider"
                        },
                        zoom: {
                            defaultValue: .9,
                            isVariant: !0,
                            label: "Zoom",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        rotationX: {
                            defaultValue: 0,
                            isVariant: !0,
                            label: "Rotation X",
                            min: 0,
                            max: 360,
                            step: .1,
                            type: "Slider"
                        },
                        rotationY: {
                            defaultValue: 0,
                            isVariant: !0,
                            label: "Rotation Y",
                            min: 0,
                            max: 360,
                            step: .1,
                            type: "Slider"
                        },
                        rotationZ: {
                            defaultValue: 0,
                            isVariant: !0,
                            label: "Rotation Z",
                            min: 0,
                            max: 360,
                            step: .1,
                            type: "Slider"
                        },
                        fov: {
                            defaultValue: 45,
                            isVariant: !0,
                            label: "FOV",
                            min: 1,
                            max: 150,
                            step: 1,
                            type: "Slider"
                        },
                        lookAt: {
                            defaultValue: [0, 0, 0],
                            isVariant: !0,
                            label: "Look At",
                            type: "Vector"
                        },
                        strength: {
                            defaultValue: 1,
                            isVariant: !0,
                            label: "Move Strength",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        moveXY: {
                            defaultValue: [4, 4],
                            isVariant: !1,
                            label: "Move XY",
                            type: "Vector"
                        },
                        interpolation: {
                            defaultValue: .04,
                            isVariant: !1,
                            label: "Interpolation",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        time: {
                            defaultValue: 1,
                            isVariant: !0,
                            label: "Time",
                            type: "Number"
                        },
                        ease: {
                            defaultValue: "easeInOutQuad",
                            isVariant: !0,
                            label: "Ease",
                            type: "Ease"
                        }
                    };
                    _lookAt = new i.Vector3;
                    _move = new i.Vector2;
                    _moveTarget = new i.Vector2;
                    _moveXY = new i.Vector2;
                    _strength = 1;
                    _lerp = .1;
                    _ratio = 1;
                    _offsetXY = new i.Vector2;
                    _rotation = new i.Quaternion;
                    _zoom = .2;
                    _forward = new i.Vector3(0,0,1);
                    _up = new i.Vector3(0,1,0);
                    _right = new i.Vector3(1,0,0);
                    _xQuaternion = new i.Quaternion;
                    _yQuaternion = new i.Quaternion;
                    _currentState = "";
                    _fov = 45;
                    _offsetMoveXY = new i.Vector2;
                    _previousOffsetLookAt = new i.Vector2;
                    setCameraRotationOffset(e, t) {
                        this._offsetMoveXY.x = e,
                        this._offsetMoveXY.y = t
                    }
                    _offsetLookAt = new i.Vector3;
                    setCameraLookAtOffset(e, t, n) {
                        this._offsetLookAt.x = e,
                        this._offsetLookAt.y = t,
                        this._offsetLookAt.z = n
                    }
                    _strengthMultiplier = 1;
                    get strengthMultiplier() {
                        return this._strengthMultiplier
                    }
                    set strengthMultiplier(e) {
                        this._strengthMultiplier = e
                    }
                    setStrengthMultiplier(e) {
                        this._strengthMultiplier = e
                    }
                    _zoomOffset = 0;
                    setCameraZoomOffset(e) {
                        this._zoomOffset = e
                    }
                    _skipAnimation = !1;
                    get skipAnimation() {
                        return this._skipAnimation
                    }
                    set skipAnimation(e) {
                        this._skipAnimation = e
                    }
                    setSkipAnimation(e) {
                        this._skipAnimation = e
                    }
                    _autoPlay = !0;
                    get autoPlay() {
                        return this._autoPlay
                    }
                    set autoPlay(e) {
                        this._autoPlay = e
                    }
                    setAutoPlay(e) {
                        this._autoPlay = e
                    }
                    _isAnimating = !1;
                    get isAnimating() {
                        return this._isAnimating
                    }
                    get timelineValue() {
                        return this._timelineValue
                    }
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    _layer;
                    _scene;
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            name: "AnimatedCamera",
                            scene: n
                        }),
                        this._layer = t,
                        this._layer.isCamera = !0,
                        this._scene = n,
                        this.createCamera(),
                        this.onDataChange(e)
                    }
                    _rig;
                    _pivot;
                    _timeline;
                    _timelineValue;
                    _isTimelineAnimating = !1;
                    createCamera() {
                        this._pivot = new i.Group,
                        this._pivot.name = "cameraMove",
                        this._pivot.add(this),
                        this._rig = new i.Group,
                        this._rig.name = "cameraRig",
                        this._rig.add(this._pivot),
                        this._scene.add(this._rig)
                    }
                    destroyCamera() {
                        this._scene.remove(this._rig),
                        a.H.dispose(this._rig),
                        a.H.dispose(this._pivot)
                    }
                    updateTimelineProgress(e) {
                        !this._autoPlay && this._timeline && (this._timeline.progress = e)
                    }
                    _zoomRatio = 420;
                    setZoomRatio(e=420) {
                        this._zoomRatio = e
                    }
                    getZoom(e) {
                        return (1 - e) * this._zoomRatio
                    }
                    getTimeline() {
                        return this._timeline
                    }
                    setTimeline(e=null) {
                        this._timeline = e
                    }
                    createAnimationTimeline(e="timeline", t, n, i=1, a="spring(1, 10, 100, 0)", s=!0) {
                        return this._isTimelineAnimating = !1,
                        this._timeline?.destroy(),
                        this._timelineValue = {
                            value: 0
                        },
                        this._timeline = new h.TY({},s),
                        this._timeline.timeline.name = e,
                        this._timeline.addKeyframe(this._timelineValue, {
                            value: [0, 1.003],
                            start: 0,
                            end: i,
                            easeFunction: a
                        }),
                        this._timeline.on("start", (()=>{
                            this._isTimelineAnimating = !0,
                            this._timelineValue.value = 0
                        }
                        )),
                        this._timeline.on("update", (()=>{
                            if (this._isTimelineAnimating) {
                                let e = this._timelineValue.value;
                                e = e > 1 ? 1 : e,
                                this.animate(n, e, t, !1)
                            }
                        }
                        )),
                        this._timeline.on("complete", (()=>{
                            this._isTimelineAnimating = !1,
                            this._timelineValue.value = 1
                        }
                        )),
                        this._timeline
                    }
                    animate(e, t, n=null, a=!0) {
                        if (null === n && (n = this.getCurrentFields()),
                        a && (t *= c.M.getRelativeDelta()),
                        t = (t = t > 1 ? 1 : t) < 0 ? 0 : t,
                        n && e && 0 !== t && t <= 1) {
                            let a = 0
                              , s = 0
                              , r = 0
                              , l = 0
                              , h = 0
                              , c = 0;
                            e.offsetXY && (this._offsetXY.lerpVectors(n.offsetXY, e.offsetXY, t),
                            l = e.offsetXY.distanceTo(this._offsetXY)),
                            e.rotation && (this._rotation.slerpQuaternions(n.rotation, e.rotation, t),
                            r = e.rotation.angleTo(this._rotation)),
                            e.zoom && (this._zoom = i.MathUtils.lerp(n.zoom, e.zoom, t),
                            a = e.zoom - this._zoom),
                            e.fov && (this._fov = i.MathUtils.lerp(n.fov, e.fov, t),
                            s = e.fov - this._fov),
                            e.strength && (this._strength = i.MathUtils.lerp(n.strength, e.strength, t),
                            c = e.strength - this._strength),
                            e.lookAt && (this._lookAt.lerpVectors(n.lookAt, e.lookAt, t),
                            h = e.lookAt.distanceTo(this._lookAt)),
                            this._isAnimating = !(a <= d && s <= d && r <= d && l <= d && h <= d && c <= d),
                            this._isAnimating && o.Lotus.tryRequestAnimationFrame()
                        }
                    }
                    getFieldsFromStateVariant(e) {
                        let t = null;
                        return (this._fields?.variants || this._fields?.__ORIGINAL__?.variants).forEach((n=>{
                            if (n.states.includes(e)) {
                                const e = new i.Euler(n.rotationX * i.MathUtils.DEG2RAD,n.rotationY * i.MathUtils.DEG2RAD,n.rotationZ * i.MathUtils.DEG2RAD,"XYZ");
                                t = {
                                    offsetXY: new i.Vector2(n.offsetX,n.offsetY),
                                    zoom: n.zoom || .9,
                                    rotation: (new i.Quaternion).setFromEuler(e),
                                    fov: n.fov || 45,
                                    strength: n.strength || 1,
                                    lookAt: (new i.Vector3).fromArray(n.lookAt)
                                }
                            }
                        }
                        )),
                        t
                    }
                    getCurrentFields() {
                        return {
                            offsetXY: (new i.Vector2).copy(this._offsetXY),
                            zoom: this._zoom,
                            rotation: (new i.Quaternion).copy(this._rotation),
                            fov: this._fov,
                            strength: this._strength,
                            lookAt: this._lookAt
                        }
                    }
                    setCameraFields(e) {
                        if (this._timeline && this._timeline?.destroy(),
                        void 0 !== e.rotationX || void 0 !== e.rotationY || void 0 !== e.rotationZ) {
                            const t = e.rotationX || 0
                              , n = e.rotationY || 0
                              , a = e.rotationZ || 0
                              , s = new i.Euler(t * i.MathUtils.DEG2RAD,n * i.MathUtils.DEG2RAD,a * i.MathUtils.DEG2RAD,"XYZ");
                            this._rotation.setFromEuler(s)
                        } else
                            void 0 !== e.rotation && (this._rotation = e.rotation);
                        void 0 !== e.offsetX && void 0 !== e.offsetY ? this._offsetXY = new i.Vector2(e.offsetX,e.offsetY) : void 0 !== e.offsetXY && (this._offsetXY = e.offsetXY),
                        void 0 !== e.zoom && (this._zoom = e.zoom),
                        this._fov = e.fov || this._fov,
                        void 0 !== e.lookAt && (e.lookAt.length ? this._lookAt = (new i.Vector3).fromArray(e.lookAt) : this._lookAt = e.lookAt),
                        this._strength = e.strength || this._strength
                    }
                    createTimeLineFromStates(e, t, n) {
                        const i = this.getFieldsFromStateVariant(e)
                          , a = this.getFieldsFromStateVariant(t);
                        this.createAnimationTimeline("customTimeline", i, a, 1, n)
                    }
                    updateDirectionVectors() {
                        this.getWorldDirection(this._forward),
                        this._up.copy(this.up).applyQuaternion(this.quaternion),
                        this._right.crossVectors(this._forward, this._up).normalize()
                    }
                    onStateChange({currentState: e, previousState: t}) {
                        if (this._fields?.generateStateValues(),
                        this._currentState = e,
                        this._autoPlay) {
                            const e = {
                                offsetXY: (new i.Vector2).copy(this._offsetXY),
                                zoom: this._zoom,
                                rotation: (new i.Quaternion).copy(this._rotation),
                                fov: this._fov,
                                strength: this._strength,
                                lookAt: this._lookAt
                            }
                              , t = new i.Euler(this._fields.rotationX * i.MathUtils.DEG2RAD,this._fields.rotationY * i.MathUtils.DEG2RAD,this._fields.rotationZ * i.MathUtils.DEG2RAD,"XYZ")
                              , n = {
                                offsetXY: new i.Vector2(this._fields.offsetX,this._fields.offsetY),
                                zoom: this._fields.zoom,
                                rotation: (new i.Quaternion).setFromEuler(t),
                                fov: this._fields.fov,
                                strength: this._fields.strength,
                                lookAt: (new i.Vector3).fromArray(this._fields.lookAt)
                            };
                            this.createAnimationTimeline("stateTimeline", e, n, this._fields.time ?? 1, this._fields.ease ?? "spring(1, 10, 100, 0)").play(this._skipAnimation)
                        }
                        this._skipAnimation = !1,
                        this.onValuesChange()
                    }
                    onPointerMove() {
                        this._scene.pointer.isTouching && o.Lotus.tryRequestAnimationFrame()
                    }
                    onDataChange(e) {
                        this._fields?.destroy(),
                        this._fields = s.O.create(e, this._scene),
                        this.setCameraFields(this._fields),
                        this.onValuesChange()
                    }
                    onValuesChange() {
                        this._lerp = this._fields.interpolation,
                        this._moveXY = (new i.Vector2).fromArray(this._fields.moveXY)
                    }
                    compareVector2(e, t, n) {
                        return Math.abs(e.x - t) > 1e-5 || Math.abs(e.y - n) > 1e-5
                    }
                    compareVector3(e, t, n, i) {
                        return Math.abs(e.x - t) > 1e-5 || Math.abs(e.y - n) > 1e-5 || Math.abs(e.z - i) > 1e-5
                    }
                    compareQuaternion(e, t, n, i, a) {
                        return Math.abs(e.x - t) > 1e-5 || Math.abs(e.y - n) > 1e-5 || Math.abs(e.z - i) > 1e-5 || Math.abs(e.w - a) > 1e-5
                    }
                    onLoop() {
                        let e = !1
                          , t = !1;
                        const n = this._lerp * c.M.getRelativeDelta()
                          , a = 45 / this.fov;
                        this._ratio = i.MathUtils.lerp(this._ratio, a, n);
                        const s = this._strength * this._strengthMultiplier
                          , r = this.getZoom(this._zoom);
                        s > 0 && this._scene.pointer.isTouching ? (this._moveTarget.x = -.1 * this._scene.pointer.move.x * this._moveXY.x * s * this._ratio,
                        this._moveTarget.y = .1 * this._scene.pointer.move.y * this._moveXY.y * s * this._ratio,
                        this._scene.pointer.isTouch && (this._moveTarget.x *= 2,
                        this._moveTarget.y *= 2)) : (this._moveTarget.x = 0,
                        this._moveTarget.y = 0),
                        this._move.x = i.MathUtils.lerp(this._move.x, this._moveTarget.x, n),
                        this._move.y = i.MathUtils.lerp(this._move.y, this._moveTarget.y, n),
                        e = this.compareVector2(this._move, this._moveTarget.x, this._moveTarget.y) || this.compareVector2(this._offsetMoveXY, this._previousOffsetLookAt.x, this._previousOffsetLookAt.y),
                        e && (this._xQuaternion.setFromAxisAngle(this._up, (this._move.x + this._offsetMoveXY.x) * i.MathUtils.DEG2RAD),
                        this._yQuaternion.setFromAxisAngle(this._right, -(this._move.y + this._offsetMoveXY.y) * i.MathUtils.DEG2RAD),
                        this._pivot.quaternion.multiplyQuaternions(this._xQuaternion, this._yQuaternion),
                        this._previousOffsetLookAt.x = this._offsetMoveXY.x,
                        this._previousOffsetLookAt.y = this._offsetMoveXY.y),
                        t = this.fov !== this._fov || this.compareVector3(this._pivot.position, this._lookAt.x + this._offsetLookAt.x, this._lookAt.y + this._offsetLookAt.y, this._lookAt.z + this._offsetLookAt.z) || this.compareVector3(this.position, this._offsetXY.x - this._lookAt.x - this._offsetLookAt.x, this._offsetXY.y - this._lookAt.y - this._offsetLookAt.y, r + this._zoomOffset - this._lookAt.z - this._offsetLookAt.z) || this.compareQuaternion(this._rig.quaternion, this._rotation.x, this._rotation.y, this._rotation.z, this._rotation.w),
                        t && (this._pivot.position.x = this._lookAt.x + this._offsetLookAt.x,
                        this._pivot.position.y = this._lookAt.y + this._offsetLookAt.y,
                        this._pivot.position.z = this._lookAt.z + this._offsetLookAt.z,
                        this._rig.quaternion.copy(this._rotation),
                        this.position.x = this._offsetXY.x - this._lookAt.x - this._offsetLookAt.x,
                        this.position.y = this._offsetXY.y - this._lookAt.y - this._offsetLookAt.y,
                        this.position.z = r + this._zoomOffset - this._lookAt.z - this._offsetLookAt.z,
                        this.fov !== this._fov && (this.fov = this._fov,
                        this.updateProjectionMatrix())),
                        (t || e || this._isAnimating) && o.Lotus.tryRequestAnimationFrame()
                    }
                    destroy() {
                        this.destroyCamera(),
                        a.H.dispose(this),
                        a.H.destroy(this)
                    }
                }
                var p = n(361)
                  , m = n.n(p)
                  , f = n(6816);
                class _ extends l.h {
                    static fields = {
                        dampX: {
                            defaultValue: .35,
                            isVariant: !0,
                            label: "Damp X",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        dampY: {
                            defaultValue: .4,
                            label: "Damp Y",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        mobileDampX: {
                            defaultValue: .15,
                            isVariant: !0,
                            label: "Mobile Damp X",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        mobileDampY: {
                            defaultValue: .15,
                            label: "Mobile Damp Y",
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        maxChangePerFrame: {
                            defaultValue: 170,
                            label: "Speed limit",
                            min: 0,
                            max: 300,
                            step: 1,
                            type: "Slider"
                        },
                        polarFalloffPointMax: {
                            defaultValue: 180,
                            isVariant: !0,
                            label: "Polar Viewing Falloff Max Point",
                            min: 0,
                            max: 180,
                            step: .5,
                            type: "Slider"
                        },
                        polarFalloffPointMin: {
                            defaultValue: -180,
                            isVariant: !0,
                            label: "Polar Viewing Falloff Min Point",
                            min: -180,
                            max: 180,
                            step: .5,
                            type: "Slider"
                        },
                        polarFalloffStrength: {
                            defaultValue: .5,
                            isVariant: !0,
                            label: "Polar Viewing Falloff Intensity",
                            min: .01,
                            max: 2,
                            step: .01,
                            type: "Slider"
                        },
                        dragDelay: {
                            defaultValue: .2,
                            isVariant: !0,
                            label: "Drag Delay",
                            min: .001,
                            max: 1,
                            step: .001,
                            type: "Slider"
                        },
                        throw: {
                            defaultValue: .25,
                            label: "Throw",
                            min: .001,
                            max: 10,
                            step: .001,
                            type: "Slider"
                        },
                        snapStrength: {
                            defaultValue: .095,
                            label: "Snap Strength",
                            min: .001,
                            max: .2,
                            step: .001,
                            type: "Slider"
                        },
                        maxPolarAngle: {
                            defaultValue: 180,
                            isVariant: !0,
                            label: "Max Polar Angle",
                            min: 0,
                            max: 360,
                            step: 1,
                            type: "Slider"
                        },
                        minPolarAngle: {
                            defaultValue: -180,
                            isVariant: !0,
                            label: "Min Polar Angle",
                            min: -360,
                            max: 0,
                            step: 1,
                            type: "Slider"
                        },
                        angles: {
                            defaultValue: "/uploads/Camera/Angles.json",
                            label: "Angles JSON file",
                            type: "String"
                        },
                        currentState: {
                            defaultValue: "default",
                            label: "Current state name",
                            type: "String"
                        },
                        stateTransitionStrength: {
                            defaultValue: .095,
                            label: "State transition snap strength",
                            min: .001,
                            max: .2,
                            step: .001,
                            type: "Slider"
                        },
                        stateTransitionShouldUseEasingCurve: {
                            defaultValue: !1,
                            label: "Transition should use easing curve instead of snap strength",
                            type: "Boolean"
                        },
                        stateTransitionEasingFunction: {
                            defaultValue: "easeInOutQuad",
                            label: "Transition easing function",
                            type: "String"
                        },
                        stateTransitionEasingDuration: {
                            defaultValue: 1,
                            label: "Transition easing duration",
                            min: 0,
                            type: "Number"
                        },
                        zoom: {
                            defaultValue: 1,
                            min: 1,
                            type: "Number"
                        }
                    };
                    ready = Promise.create();
                    get stateTransitionRemainingAngle() {
                        return this._stateTransitioning ? this._stateTransitionReferencePosition.setFromSphericalCoords(this._radius, this._phi * i.MathUtils.DEG2RAD, this._theta * i.MathUtils.DEG2RAD).angleTo(this._stateTransitionTargetPosition) * i.MathUtils.RAD2DEG : 0
                    }
                    _storedAngles;
                    _anglesData;
                    _angleFileData;
                    _closestXAngle;
                    _closestYAngle;
                    _nearest;
                    _theta = 0;
                    _phi = 0;
                    _lookAt = new i.Vector3;
                    _onMouseDownPosition = new i.Vector2;
                    _onMouseDownTheta = 30;
                    _onMouseDownPhi = 20;
                    _radius;
                    _fov;
                    _dampY;
                    _dampX;
                    _mobileDampX;
                    _mobileDampY;
                    _maxChangePerFrame;
                    _snapStrength;
                    _stateTransitionStrength = .05;
                    _stateTransitioning = !1;
                    _stateTransitionReferencePosition = new i.Vector3;
                    _stateTransitionTargetPosition = new i.Vector3;
                    _stateTransitionShouldUseEasingCurve = !1;
                    _stateTransitionEasingFunction = "linear";
                    _stateTransitionEasingDuration = 2;
                    _stateAnimProperties;
                    _maxPolarAngle;
                    _minPolarAngle;
                    _polarFalloffPointMax = 269;
                    _polarFalloffPointMin = -89;
                    _polarFalloffStrength = .5;
                    _dragDelay = .2;
                    _proposedPositionTheta;
                    _proposedPositionPhi;
                    _storedRadius;
                    _radiusChangelerp = .15;
                    _fovChangelerp = .15;
                    _storedOffsetY;
                    _offsetYChangelerp = .15;
                    _throw;
                    _animatedValuesChanged = !1;
                    _defaultX;
                    _defaultY;
                    _deviceViewportWidth;
                    _fields;
                    _layer;
                    _scene;
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            name: "InteractiveCamera",
                            scene: n
                        }),
                        this._layer = t,
                        this._layer.element = this,
                        this._layer.isCamera = !0,
                        this._scene = n,
                        this._scene.add(this),
                        this.onDataChange(e),
                        this._timestamp = null,
                        this._lastMouseX = null,
                        this._lastMouseY = null,
                        this._deviceViewportWidth = window.innerWidth,
                        this._scene.state.bind(this._stateCategory, this.onCameraStateChange.bind(this))
                    }
                    _timeline;
                    createTimeline() {
                        this._timeline?.destroy(),
                        this._timeline = new h.TY
                    }
                    _stateCategory = "InteractiveCamera";
                    _currentState = "default";
                    _stateChangeRequest;
                    _stateChangeRequestCallback;
                    onCameraStateChange(e) {
                        this._fields?.generateStateValues(e),
                        this._currentState = this._scene.state.get(this._stateCategory) || this._fields.currentState || "default",
                        this.onValuesChange(),
                        this._stateTransitionShouldUseEasingCurve && (this.createStateAnimPropertiesObject(),
                        this.createTimeline(),
                        this._timeline.addKeyframe(this._stateAnimProperties, {
                            easeFunction: this._stateTransitionEasingFunction,
                            start: 0,
                            end: this._stateTransitionEasingDuration,
                            theta: [this._theta, this._closestXAngle],
                            phi: [this._phi, this._closestYAngle],
                            radius: [this._radius, this._storedRadius],
                            fov: [this.fov, this._fov],
                            offsetY: [this.view?.offsetY, this._storedOffsetY * Math.min(this._scene.viewport.width, this._scene.viewport.height)]
                        }),
                        this._timeline.play()),
                        this._stateChangeRequest === this._currentState && null != this._stateChangeRequestCallback && this._stateChangeRequestCallback(),
                        this._stateChangeRequest = null,
                        this._stateChangeRequestCallback = null
                    }
                    changeState(e, t) {
                        this._stateChangeRequest = e,
                        this._stateChangeRequestCallback = t,
                        this._scene.changeState(this._stateCategory, e)
                    }
                    createStateAnimPropertiesObject() {
                        this._stateAnimProperties = {
                            theta: this._theta,
                            phi: this._phi,
                            radius: this._radius,
                            fov: this.fov,
                            offsetY: this.view?.offsetY ?? 0
                        }
                    }
                    async onDataChange(e) {
                        this._fields?.destroy(),
                        this._fields = s.O.create(e, this._scene),
                        this._fields?.angles && (this._angleFileData = await f.j.get(this._fields.angles)),
                        this.createStateAnimPropertiesObject(),
                        this.onValuesChange(),
                        this.ready?.resolve()
                    }
                    startingAngle;
                    onValuesChange() {
                        this._angleFileData && (this.zoom = this._fields.zoom ?? 1,
                        this._anglesData = m()(this._angleFileData).angles[this._currentState],
                        this._storedAngles = this._anglesData["control-angles"],
                        this.startingAngle = this._anglesData["starting-angle"],
                        Array.isArray(this.startingAngle) || (this.startingAngle = [this.startingAngle]),
                        [this._defaultX,this._defaultY,this._fov,this._storedRadius,this._storedOffsetY] = this.getClosestControlAngle(this.startingAngle),
                        this._animatedValuesChanged || (this._radius = this._anglesData.radius,
                        this.fov = this._anglesData.fov,
                        this.setViewOffset(this._scene.viewport.width, this._scene.viewport.height, 0, this._storedOffsetY * Math.min(this._scene.viewport.width, this._scene.viewport.height), this._scene.viewport.width, this._scene.viewport.height)),
                        this._dampX = this._fields.dampX,
                        this._dampY = this._fields.dampY,
                        this._mobileDampX = this._fields.mobileDampX,
                        this._mobileDampY = this._fields.mobileDampY,
                        this._maxChangePerFrame = this._fields.maxChangePerFrame ?? 100,
                        this._snapStrength = this._fields.snapStrength,
                        this._dragDelay = this._fields.dragDelay,
                        this._maxPolarAngle = this._fields.maxPolarAngle,
                        this._minPolarAngle = this._fields.minPolarAngle,
                        this._polarFalloffPointMax = this._fields.polarFalloffPointMax ?? 269,
                        this._polarFalloffPointMin = this._fields.polarFalloffPointMin ?? -89,
                        this._polarFalloffStrength = this._fields.polarFalloffStrength ?? .05,
                        this._throw = this._fields.throw,
                        this._stateTransitionStrength = this._fields.stateTransitionStrength ?? .095,
                        this._stateTransitionShouldUseEasingCurve = this._fields.stateTransitionShouldUseEasingCurve,
                        this._stateTransitionEasingFunction = this._fields.stateTransitionEasingFunction,
                        this._stateTransitionEasingDuration = this._fields.stateTransitionEasingDuration,
                        this.updateStateStartingPositions(),
                        this._stateTransitionTargetPosition.setFromSphericalCoords(this._storedRadius, this._defaultY * i.MathUtils.DEG2RAD, this._defaultX * i.MathUtils.DEG2RAD),
                        this.cameraRotationCalc(),
                        this._animatedValuesChanged = !0,
                        o.Lotus.tryRequestAnimationFrame())
                    }
                    updateStateStartingPositions() {
                        this._stateTransitioning = !0,
                        this._closestXAngle = this._defaultX,
                        this._closestYAngle = this._defaultY,
                        this._nearest = this._storedAngles.findIndex((e=>e.theta === this._closestXAngle && e.phi === this._closestYAngle)),
                        this._nearest = this._storedAngles[this._nearest]
                    }
                    animateValuesToNewState() {
                        this.onValuesChange && this._fields.states && (this._stateTransitioning && this._stateTransitionShouldUseEasingCurve ? (this._radius = this._stateAnimProperties.radius,
                        this.fov = this._fov = this._stateAnimProperties.fov,
                        this.setViewOffset(this._scene.viewport.width, this._scene.viewport.height, 0, this._stateAnimProperties.offsetY, this._scene.viewport.width, this._scene.viewport.height)) : (this._radius = c.M.lerp(this._radius, this._storedRadius, this._radiusChangelerp),
                        this.fov = c.M.lerp(this.fov, this._fov, this._fovChangelerp),
                        this.setViewOffset(this._scene.viewport.width, this._scene.viewport.height, 0, c.M.lerp(this.view?.offsetY ?? this._storedOffsetY * Math.min(this._scene.viewport.width, this._scene.viewport.height), this._storedOffsetY * Math.min(this._scene.viewport.width, this._scene.viewport.height), this._offsetYChangelerp), this._scene.viewport.width, this._scene.viewport.height)))
                    }
                    _lockPositionX = !1;
                    _dragging = !1;
                    pointerPositionX;
                    pointerPositionY;
                    onPointerStart(e) {
                        this.isEnabled && (this._stateTransitioning = !1,
                        this._dragging = !0,
                        this._onMouseDownTheta = this._theta,
                        this._onMouseDownPhi = this._phi,
                        this._onMouseDownPosition.x = e.pointer.x,
                        this._onMouseDownPosition.y = e.pointer.y,
                        this.pointerPositionX = e.pointer.x,
                        this.pointerPositionY = e.pointer.y)
                    }
                    onPointerMove(e) {
                        this.isEnabled && this._dragging && (this.pointerPositionX = e.pointer.x,
                        this.pointerPositionY = e.pointer.y,
                        o.Lotus.tryRequestAnimationFrame())
                    }
                    onPointerEnd(e) {
                        this.isEnabled && this._dragging && (this._dragging = !1,
                        this._storedAngles && 0 !== e.pointer.distance && (this._onMouseDownPosition.x = e.pointer.x - this._onMouseDownPosition.x,
                        this._onMouseDownPosition.y = e.pointer.y - this._onMouseDownPosition.y,
                        [this._closestXAngle,this._closestYAngle,this._fov,this._storedRadius,this._storedOffsetY] = this.getClosestControlAngle(),
                        o.Lotus.tryRequestAnimationFrame()))
                    }
                    userUpdatedValues() {
                        this.isEnabled && this._dragging && 0 !== this._scene.pointer.distance && (this.mouseSpeed(),
                        this.polarFalloff(),
                        this.proposedPositionCalculator(),
                        this._proposedPositionTheta > this._theta ? this._proposedPositionTheta = Math.min(this._proposedPositionTheta, this._theta + this._maxChangePerFrame) : this._proposedPositionTheta = Math.max(this._proposedPositionTheta, this._theta - this._maxChangePerFrame),
                        this._proposedPositionPhi > this._polarFalloffPointMax ? this._proposedPositionPhi = this._polarFalloffPointMax + (this._proposedPositionPhi - this._polarFalloffPointMax) * Math.pow(1 / (this._proposedPositionPhi - this._polarFalloffPointMax + 1), this._polarFalloffStrength) : this._proposedPositionPhi < this._polarFalloffPointMin && (this._proposedPositionPhi = this._polarFalloffPointMin - (this._polarFalloffPointMin - this._proposedPositionPhi) * Math.pow(1 / (this._polarFalloffPointMin - this._proposedPositionPhi + 1), this._polarFalloffStrength)),
                        this._proposedPositionTheta > 360 ? (this._proposedPositionTheta -= 360,
                        this._theta -= 360,
                        this._onMouseDownTheta -= 360) : this._proposedPositionTheta < 0 && (this._proposedPositionTheta += 360,
                        this._theta += 360,
                        this._onMouseDownTheta += 360),
                        this._theta = c.M.lerp(this._theta, this._proposedPositionTheta, this._dragDelay),
                        this._phi = c.M.lerp(this._phi, this._proposedPositionPhi, this._dragDelay),
                        this._phi = Math.min(this._maxPolarAngle, Math.max(this._minPolarAngle, this._phi)),
                        this.cameraRotationCalc(),
                        [this._closestXAngle,this._closestYAngle,this._fov,this._storedRadius,this._storedOffsetY] = this.getClosestControlAngle(),
                        o.Lotus.tryRequestAnimationFrame())
                    }
                    get touchControlSensitivityAdjustmentX() {
                        return Math.pow(390 / this._deviceViewportWidth, .5) * this._mobileDampX
                    }
                    get touchControlSensitivityAdjustmentY() {
                        return Math.pow(390 / this._deviceViewportWidth, .5) * this._mobileDampY
                    }
                    isMobile = !1;
                    proposedPositionCalculator() {
                        if (this.isMobile)
                            return this._proposedPositionTheta = -(this.pointerPositionX - this._onMouseDownPosition.x) * this.touchControlSensitivityAdjustmentX + this._onMouseDownTheta,
                            void (this._proposedPositionPhi = -(this.pointerPositionY - this._onMouseDownPosition.y) * this.touchControlSensitivityAdjustmentY + this._onMouseDownPhi);
                        this._proposedPositionTheta = -(this.pointerPositionX - this._onMouseDownPosition.x) * this._dampX + this._onMouseDownTheta,
                        this._proposedPositionPhi = -(this.pointerPositionY - this._onMouseDownPosition.y) * this._dampY + this._onMouseDownPhi
                    }
                    polarFalloff() {
                        this._phi < this._polarFalloffPointMin || this._phi > this._polarFalloffPointMax ? (this._lockPositionX || (this._dampX = this._dampX / 1.5,
                        this._onMouseDownPosition.x = this.pointerPositionX,
                        this._onMouseDownTheta = this._theta),
                        this._lockPositionX = !0) : (this._lockPositionX && (this._dampX = this._fields.dampX,
                        this._onMouseDownPosition.x = this.pointerPositionX,
                        this._onMouseDownTheta = this._theta),
                        this._lockPositionX = !1)
                    }
                    _currentAngle;
                    getClosestControlAngle(e=this._storedAngles, t=this._anglesData) {
                        const n = (e,t)=>Math.sqrt(Math.pow(e.phi - t.phi, 2) + Math.pow(e.theta - t.theta, 2))
                          , i = {
                            phi: this._proposedPositionPhi,
                            theta: this._proposedPositionTheta - this._speedX * this._throw
                        };
                        return this._nearest = e.reduce(((e,t)=>n(e, i) <= n(t, i) ? e : t)),
                        [this._nearest.theta, this._nearest.phi, this._nearest.fov ?? t.fov ?? this.fov, this._nearest.radius || t.radius || this._radius, this._nearest.offset ?? t.offset ?? 0]
                    }
                    snapToAngles() {
                        if (this._dragging)
                            return;
                        if (void 0 === this._closestXAngle || void 0 === !this._closestXAngle)
                            return;
                        this.animateValuesToNewState(),
                        this._stateTransitioning ? this._stateTransitionShouldUseEasingCurve ? (this._theta = this._stateAnimProperties.theta,
                        this._phi = this._stateAnimProperties.phi) : (this._theta = c.M.lerp(this._theta, this._closestXAngle, this._stateTransitionStrength),
                        this._phi = c.M.lerp(this._phi, this._closestYAngle, this._stateTransitionStrength)) : (this._theta = c.M.lerp(this._theta, this._closestXAngle, this._snapStrength),
                        this._phi = c.M.lerp(this._phi, this._closestYAngle, this._snapStrength)),
                        this.cameraRotationCalc();
                        const e = Math.round(1e3 * this._closestYAngle) / 1e3
                          , t = Math.round(1e3 * this._closestXAngle) / 1e3
                          , n = Math.round(1e3 * this._phi) / 1e3;
                        t === Math.round(1e3 * this._theta) / 1e3 && e === n || o.Lotus.tryRequestAnimationFrame()
                    }
                    _timestamp;
                    _lastMouseX;
                    _lastMouseY;
                    _speedX;
                    _speedY;
                    mouseSpeed() {
                        if (null === this._timestamp)
                            return this._timestamp = Date.now(),
                            this._lastMouseX = this.pointerPositionX,
                            void (this._lastMouseY = this._scene.pointer.y);
                        const e = Date.now()
                          , t = e - this._timestamp
                          , n = this.pointerPositionX - this._lastMouseX
                          , i = this._scene.pointer.y - this._lastMouseY;
                        this._speedX = Math.round(n / t * 100),
                        this._speedY = Math.round(i / t * 100),
                        this._timestamp = e,
                        this._lastMouseX = this.pointerPositionX,
                        this._lastMouseY = this._scene.pointer.y
                    }
                    onLoop(e) {
                        this.snapToAngles(),
                        this.userUpdatedValues()
                    }
                    onResize(e) {
                        super.onResize(e),
                        this._deviceViewportWidth = e.width
                    }
                    cameraRotationCalc() {
                        this.position.setFromSphericalCoords(this._radius, this._phi * i.MathUtils.DEG2RAD, this._theta * i.MathUtils.DEG2RAD),
                        this._phi < 0 || this._phi > 180 ? this.up.set(0, -1, 0) : this.up.set(0, 1, 0),
                        this.lookAt(this._lookAt)
                    }
                    _isEnabled = !0;
                    get isEnabled() {
                        const e = this._isEnabled
                          , t = !this.scene.controls || !this.scene.controls.isEnabled;
                        return e && t
                    }
                    disable() {
                        this._isEnabled = !1,
                        this._dragging = !1
                    }
                    enable() {
                        this._isEnabled = !0
                    }
                    destroy() {
                        a.H.destroy(this)
                    }
                }
                var g = n(5578)
                  , v = n.n(g)
                  , y = n(149);
                class M extends i.EventDispatcher {
                    static fields = {
                        angles: {
                            defaultValue: "/uploads/Camera/Angles.json",
                            type: "String"
                        }
                    };
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    _layer;
                    _scene;
                    constructor({fields: e, layer: t, scene: n}) {
                        super(),
                        this._layer = t,
                        this._scene = n,
                        this.onDataChange(e),
                        this._scene.eventPool?.register(this)
                    }
                    _angles;
                    _camera;
                    async onDataChange(e) {
                        this._fields?.destroy(),
                        this._fields = s.O.create(e, this._scene),
                        await this._scene.layersCreated,
                        this._fields.angles && (this._angles = await f.j.get(this._fields.angles)),
                        this._angles && this.onValuesChange()
                    }
                    _positions;
                    get positions() {
                        return this._positions
                    }
                    async onValuesChange() {
                        this._positions = v()(this._angles.angles.default["control-angles"], (e=>e.label)).filter((e=>e.label)).map(((e,t)=>{
                            if (e.vector = (new i.Vector3).setFromSphericalCoords(this._angles.angles.default.radius, e.phi * i.MathUtils.DEG2RAD, e.theta * i.MathUtils.DEG2RAD),
                            y.D.get("interpolationCameraDebug")) {
                                const t = new i.Mesh(new i.BoxGeometry(1,1),new i.MeshNormalMaterial);
                                t.position.copy(e.vector),
                                this._scene.add(t)
                            }
                            return e
                        }
                        ))
                    }
                    _angle;
                    get angle() {
                        return this._angle
                    }
                    _data = [];
                    get data() {
                        return this._data
                    }
                    _position = new i.Vector3;
                    _interpolations = {};
                    get interpolations() {
                        return this._interpolations
                    }
                    onLoop() {
                        if (!this._scene.camera || !this._positions)
                            return;
                        this._scene.camera.getWorldPosition(this._position),
                        this._positions.forEach((e=>{
                            e.distance = this._position.distanceTo(e.vector),
                            e.multiplier = i.MathUtils.mapLinear(e.distance, 0, e.threshold, 1, 0),
                            e.multiplier = i.MathUtils.clamp(e.multiplier, 0, 1)
                        }
                        ));
                        const e = this._positions.sort(((e,t)=>t.multiplier - e.multiplier))
                          , [t,n,a,s] = e.slice(0, 4);
                        t.interpolation = 0 === t.distance ? 1 : 1 / t.distance,
                        n.interpolation = 0 === n.distance ? 1 : 1 / n.distance,
                        a.interpolation = 0 === a.distance ? 1 : 1 / a.distance,
                        s.interpolation = 0 === s.distance ? 1 : 1 / s.distance,
                        t.interpolation *= t.multiplier,
                        n.interpolation *= n.multiplier,
                        a.interpolation *= a.multiplier,
                        s.interpolation *= s.multiplier;
                        const r = t.interpolation + n.interpolation + a.interpolation + s.interpolation;
                        t.interpolation /= r,
                        n.interpolation /= r,
                        a.interpolation /= r,
                        s.interpolation /= r,
                        this._interpolations = {
                            a: t,
                            b: n,
                            c: a,
                            d: s
                        },
                        this._angle !== this._interpolations.a.label && (this._angle = this._interpolations.a.label,
                        this.dispatchEvent({
                            angle: this._angle,
                            type: "angle"
                        }))
                    }
                    destroy() {
                        a.H.destroy(this)
                    }
                }
                var S = n(9734)
                  , x = n.n(S)
                  , b = n(1334)
                  , T = n(4282)
                  , C = n(927);
                class E {
                    _gltf;
                    _scene;
                    constructor({gltf: e, scene: t}) {
                        this._gltf = e,
                        this._scene = t,
                        this._scene.eventPool?.register(this),
                        this.createRTT(this._scene.renderer),
                        this.createMap()
                    }
                    _rtt;
                    get rtt() {
                        return this._rtt
                    }
                    _opacities = new i.Vector4(0);
                    createRTT(e) {
                        this._rtt = new b.e(e,"\n        precision highp float;\n\n        varying vec2 vUv;\n        \n        uniform sampler2D tMap1;\n        uniform sampler2D tMap2;\n        uniform sampler2D tMap3;\n        uniform sampler2D tMap4;\n\n        uniform vec4 uMapOpacities;\n\n        void main() {\n          vec4 map1 = texture(tMap1, vUv) * uMapOpacities.x;\n          vec4 map2 = texture(tMap2, vUv) * uMapOpacities.y;\n          vec4 map3 = texture(tMap3, vUv) * uMapOpacities.z;\n          vec4 map4 = texture(tMap4, vUv) * uMapOpacities.w;\n\n          vec4 mapColor = map1 + map2 + map3 + map4;\n\n          gl_FragColor = mapColor;\n        }\n      "),
                        this._rtt.setUniform("tMap1", null),
                        this._rtt.setUniform("tMap2", null),
                        this._rtt.setUniform("tMap3", null),
                        this._rtt.setUniform("tMap4", null),
                        this._rtt.setUniform("uMapOpacities", this._opacities)
                    }
                    setTextures(e) {
                        e.forEach(((e,t)=>{
                            this.setTexture(e, t)
                        }
                        ))
                    }
                    setTexture(e, t=0) {
                        this._rtt.setUniform(`tMap${t + 1}`, e)
                    }
                    setOpacities(e) {
                        this._opacities.fromArray(e)
                    }
                    setOpacity(e, t) {
                        switch (t) {
                        case 0:
                            return this._opacities.x = e;
                        case 1:
                            return this._opacities.y = e;
                        case 2:
                            return this._opacities.z = e;
                        case 3:
                            return this._opacities.w = e
                        }
                    }
                    destroyRTT() {
                        this._rtt.destroy()
                    }
                    _map;
                    get map() {
                        return this._map
                    }
                    createMap() {
                        const e = C.G.pmremGenerator.fromScene(this._gltf).clone();
                        this._map = e,
                        this._map.sourceWidth = e.texture.source.data.width,
                        this._map.sourceHeight = e.texture.source.data.height
                    }
                    destroyMap() {
                        this._map.dispose()
                    }
                    getMapTexture(e) {
                        const t = e.width * e.height * 4
                          , n = T.Z.dataTextureBufferTest(t);
                        this._scene.renderer.readRenderTargetPixels(e, 0, 0, e.width, e.height, n);
                        const a = new i.DataTexture(n,e.width,e.height,i.RGBAFormat,T.Z.dataTextureTypeTest(),e.texture.mapping,e.texture.wrapS,e.texture.wrapT,e.texture.magFilter,e.texture.minFilter,e.texture.anisotropy,e.texture.colorSpace);
                        return a.flipY = e.texture.flipY,
                        a.needsUpdate = !0,
                        a
                    }
                    render() {
                        this._rtt.render(this._map)
                    }
                    destroy() {
                        this.destroyRTT(),
                        this.destroyMap(),
                        a.H.destroy(this)
                    }
                }
                var w = n(8506)
                  , A = n(8626)
                  , L = n(5070)
                  , V = n(6062);
                class R {
                    static fields = {
                        degrees: {
                            defaultValue: 0,
                            type: "Number"
                        },
                        interpolation: {
                            defaultValue: "",
                            type: "String"
                        },
                        gltf: {
                            defaultValue: "",
                            type: "String"
                        },
                        materials: {
                            defaultValue: "",
                            isVariant: !0,
                            type: "String"
                        },
                        nodes: {
                            defaultValue: "",
                            isVariant: !0,
                            type: "String"
                        },
                        state: {
                            defaultValue: "",
                            type: "String"
                        },
                        layer: {
                            defaultValue: 0,
                            type: "Number"
                        },
                        debug: {
                            defaultValue: !1,
                            type: "Boolean"
                        }
                    };
                    fieldsRuntime = {};
                    ready = Promise.create();
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    _name;
                    _layer;
                    get layer() {
                        return this._layer
                    }
                    _scene;
                    get scene() {
                        return this._scene
                    }
                    constructor({fields: e, layer: t, scene: n}) {
                        this._layer = t,
                        this._name = "InterpolationEnvironment",
                        this._scene = n,
                        this.onDataChange(e),
                        this._scene.eventPool?.register(this)
                    }
                    _gltf;
                    get gltf() {
                        return this._gltf
                    }
                    set gltf(e) {
                        this._gltf = e
                    }
                    _interpolation;
                    async createInterpolation() {
                        if (await this._scene.layersCreated,
                        this._fields.interpolation) {
                            const e = this._scene.getLayer(this._fields.interpolation);
                            this._interpolation = e.scripts.get("InteractiveCameraInterpolation")
                        }
                    }
                    _animations = new Map;
                    get animations() {
                        return this._animations
                    }
                    _map = new Map;
                    get map() {
                        return this._map
                    }
                    createKeyframes() {
                        return Promise.all(Object.entries(this._fields.states).map((async([e,t])=>{
                            const n = await f.j.get(t.nodes)
                              , i = await f.j.get(t.materials)
                              , a = {};
                            Object.entries(n).forEach((([e,t])=>{
                                a[e] = {
                                    nodes: t.nodes
                                }
                            }
                            )),
                            Object.entries(i).forEach((([e,t])=>{
                                a[e].materials = t.materials
                            }
                            )),
                            this._map.set(e, a);
                            const s = L.E.generateAnimationMap(a);
                            this._animations.set(e, s)
                        }
                        )))
                    }
                    destroyKeyframes() {
                        this._animations && (this._animations.forEach((e=>{
                            a.H.destroy(e)
                        }
                        )),
                        this._animations.clear())
                    }
                    onStateChange({category: e, currentState: t, previousState: n}) {
                        this._fields?.generateStateValues(),
                        e === this._fields.state && this._state !== t && (this._state = t,
                        this.createEnvironmentTextures(t))
                    }
                    _texture;
                    get texture() {
                        return this._texture
                    }
                    _textureTransition;
                    createEnvironmentCrossFade() {
                        this._texture || (this._texture = new E({
                            gltf: this._gltf.scene,
                            scene: this.scene
                        }),
                        y.D.get("interpolationEnvironmentDebug") && V.F.addTexture(this._texture.map.texture))
                    }
                    destroyEnvironmentCrossFade() {
                        this._texture?.destroy()
                    }
                    _textures = new Map;
                    get textures() {
                        return this._textures
                    }
                    _textureTasks = [];
                    async createEnvironmentTextures(e=this.state) {
                        const t = this._animations.get(e);
                        if (!t)
                            return;
                        this.destroyEnvironmentTextures();
                        const n = x()(this._interpolation.positions, "distance").map((({label: e})=>[e, t.get(e)]));
                        this._textureTransition = new E({
                            gltf: this._gltf.scene,
                            scene: this.scene
                        });
                        const a = n.map((([t,n])=>()=>{
                            this.scene.renderer.setClearColor(0, 1),
                            L.E.setMaterialsValues(this._gltf.scene, n),
                            L.E.setNodesValues(this._gltf.scene, n);
                            const a = parseFloat(this._fields.degrees);
                            0 !== a && (this._gltf.scene.rotation.y = i.MathUtils.degToRad(a));
                            const s = C.G.pmremGenerator.fromScene(this._gltf.scene, 0, this.scene.camera.near, this.scene.camera.far)
                              , r = this._textureTransition.getMapTexture(s);
                            this._textures.set(`${e}:${t}`, r),
                            this.scene.renderer.setClearColor(this.scene.renderer.background, this.scene.renderer.backgroundAlpha)
                        }
                        ));
                        a.shift()(),
                        this._textureTasks = o.Lotus.tasks.add(a, "environment")
                    }
                    destroyEnvironmentTextures() {
                        this._textureTasks && this._textureTasks.forEach((e=>{
                            e.cancel?.()
                        }
                        )),
                        this._textures.forEach((e=>e.dispose())),
                        this._textures.clear()
                    }
                    onDataChange(e) {
                        this._fields?.destroy(),
                        this._fields = s.O.create(e, this._scene),
                        this.onDataChangeValues()
                    }
                    async onDataChangeValues() {
                        this._gltf?.scene?.parent?.remove(this._gltf.scene),
                        this._fields?.gltf && (this._gltf = await f.j.get(this._fields.gltf)),
                        this._gltf ? (this.createEnvironmentCrossFade(),
                        await this.createKeyframes(),
                        this.ready?.resolve()) : this.ready?.resolve(),
                        this._fields?.debug && this.scene.add(this._gltf.scene),
                        this.createInterpolation()
                    }
                    _chunks = new Map;
                    onLayerLoaded(e) {
                        e.element && e.element.traverse((e=>{
                            this.parseMaterial(e)
                        }
                        ))
                    }
                    async parseMaterial(e) {
                        const t = e;
                        if (!t.isMesh)
                            return;
                        const n = t.material
                          , a = n instanceof i.MeshStandardMaterial
                          , s = t.layers.isEnabled(this._fields.layer);
                        if (!a || !s)
                            return;
                        const r = parseFloat(this._fields.degrees);
                        if (0 !== r) {
                            let e = this._chunks.get(n);
                            if (void 0 === e) {
                                const t = i.MathUtils.degToRad(-1 * r - 90);
                                e = new w.u({
                                    material: n,
                                    scene: this.scene,
                                    values: {
                                        envMap: this._texture.map.texture,
                                        envMapBlurriness: {
                                            value: 0
                                        },
                                        envMapOrientation: {
                                            value: new i.Vector3(0,t,0)
                                        },
                                        envMapStrength: {
                                            value: 1
                                        }
                                    }
                                }),
                                this._chunks.set(n, e)
                            }
                        } else
                            await this.scene.ready,
                            n.envMap = this._texture.map.texture
                    }
                    async onHotReload({isForced: e, path: t}) {
                        await A.U.parseGLTFTextures(this._gltf, t);
                        const n = A.U.checkFilePath(this._fields.gltf, t);
                        (n || e) && (await this.onDataChangeValues(),
                        (n || e) && A.U.refreshGLTFTextures(this._gltf),
                        this.createEnvironmentTextures())
                    }
                    _state;
                    get state() {
                        return this._scene.state.get(this._fields.state)
                    }
                    onFrame() {
                        !this._textureTasks.length && this._textureTransition && (this._textureTransition.destroy(),
                        this._textureTransition = null)
                    }
                    onLoop() {
                        if (!this._interpolation || !this.layer.isVisible)
                            return;
                        const {a: e, b: t, c: n, d: i} = this._interpolation.interpolations;
                        e && this._texture && (this._texture.render(),
                        this._texture.setTextures([this._textures.get(`${this.state}:${e.label}`), this._textures.get(`${this.state}:${t.label}`), this._textures.get(`${this.state}:${n.label}`), this._textures.get(`${this.state}:${i.label}`)]),
                        this._texture.setOpacities([e.interpolation, t.interpolation, n.interpolation, i.interpolation]))
                    }
                    destroy() {
                        this._fields?.destroy(),
                        this._gltf && a.H.dispose(this._gltf.scene),
                        this.destroyEnvironmentCrossFade(),
                        this.destroyEnvironmentTextures(),
                        this.destroyKeyframes(),
                        a.H.destroy(this)
                    }
                }
                var P = n(306)
                  , F = n(994);
                class U {
                    static fields = {
                        interpolation: {
                            defaultValue: "",
                            type: "String"
                        }
                    };
                    fieldsRuntime = {};
                    ready = Promise.create();
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    _layer;
                    get layer() {
                        return this._layer
                    }
                    _scene;
                    get scene() {
                        return this._scene
                    }
                    constructor({fields: e, layer: t, scene: n}) {
                        this._layer = t,
                        this._scene = n,
                        this.createEditor(e),
                        this.ready?.resolve(),
                        this._scene.eventPool?.register(this)
                    }
                    _environment;
                    async createEditor(e) {
                        await this._scene.layersCreated,
                        this._environment = this._layer.scripts.get("InterpolationEnvironment"),
                        this.createFields()
                    }
                    createFields() {
                        const e = this._environment.map.get(this._environment.state);
                        if (!e)
                            return;
                        const t = async()=>{
                            const t = JSON.stringify(e, null, 4)
                              , n = F.f.get("api", "/assets/save");
                            200 === (await window.fetch(n, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    body: t,
                                    file: this._environment.fields.materials
                                })
                            })).status ? alert(`Saved to ${this._environment.fields.materials}.`) : alert(`Something went wrong saving ${this._environment.fields.materials}, see console logs.`)
                        }
                        ;
                        this.fieldsRuntime.export = {
                            label: "Save",
                            onClick: ()=>t(),
                            type: "Button"
                        };
                        const n = t=>{
                            const n = L.E.generateAnimationMap(e).get(t);
                            L.E.setMaterialsValues(this._environment.gltf.scene, n),
                            L.E.setNodesValues(this._environment.gltf.scene, n);
                            const i = C.G.pmremGenerator.fromScene(this._environment.gltf.scene, 0, this.scene.camera.near, this.scene.camera.far)
                              , a = this._environment.texture.getMapTexture(i);
                            this._environment.textures.set(`${this._environment.state}:${t}`, a),
                            o.Lotus.tryRequestAnimationFrame()
                        }
                        ;
                        Object.entries(e).forEach((([e,t])=>{
                            this.fieldsRuntime[`${e}`] = {
                                label: e,
                                type: "None"
                            },
                            Object.entries(t.materials).forEach((([t,i])=>{
                                const a = `${t.split(":")[0]}`;
                                this.fieldsRuntime[`${e}:${t}:emissive`] = {
                                    label: e,
                                    type: "None"
                                },
                                this.fieldsRuntime[`${e}:${t}:emissive`] = {
                                    defaultValue: [i.emissiveR, i.emissiveG, i.emissiveB],
                                    label: `${a}:emissive`,
                                    onChange: ({value: t})=>{
                                        const [a,s,r] = t;
                                        i.emissiveR = a,
                                        i.emissiveG = s,
                                        i.emissiveB = r,
                                        n(e)
                                    }
                                    ,
                                    type: "Vector"
                                },
                                this.fieldsRuntime[`${e}:${t}:emissiveIntensity`] = {
                                    defaultValue: i.emissiveIntensity,
                                    label: `${a}:emissiveIntensity`,
                                    min: 0,
                                    max: 40,
                                    onChange: ({value: t})=>{
                                        i.emissiveIntensity = t,
                                        n(e)
                                    }
                                    ,
                                    type: "Slider"
                                },
                                this.fieldsRuntime[`${e}:${t}:opacity`] = {
                                    defaultValue: i.opacity,
                                    label: `${a}:opacity`,
                                    min: 0,
                                    max: 1,
                                    onChange: ({value: t})=>{
                                        i.opacity = t,
                                        n(e)
                                    }
                                    ,
                                    type: "Slider"
                                }
                            }
                            ))
                        }
                        ))
                    }
                    onStateChange() {
                        this.createFields(),
                        o.Lotus.dispatch({
                            type: P.a.FORCE_UPDATE
                        })
                    }
                    destroy() {
                        a.H.destroy(this)
                    }
                }
                var O = n(9249)
                  , D = n(8721)
                  , k = n.n(D)
                  , I = n(4908)
                  , N = n.n(I)
                  , H = n(1919)
                  , z = n(7175)
                  , j = n(3342);
                class G extends j.W {
                    static fields = {
                        ...j.l,
                        debug: {
                            defaultValue: !1,
                            type: "Boolean"
                        },
                        ...(0,
                        C.x)("envMap", !0),
                        envMapBlurriness: {
                            defaultValue: 0,
                            isVariant: !0,
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        },
                        envMapOrientation: {
                            defaultValue: [0, 0, 0],
                            isVariant: !0,
                            type: "Vector"
                        },
                        envMapStrength: {
                            defaultValue: 1,
                            isVariant: !0,
                            min: 0,
                            max: 10,
                            step: .01,
                            type: "Slider"
                        },
                        json: {
                            defaultValue: "",
                            type: "String"
                        },
                        layer: {
                            defaultValue: 0,
                            type: "Number"
                        }
                    };
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            fields: e,
                            layer: t,
                            name: "KeyframeCrossFadeEnvironment",
                            scene: n
                        }),
                        this.createTexture(e),
                        this.createBackground(),
                        this.onDataChange(e)
                    }
                    async onLayerLoaded(e) {
                        if (await this.scene.layersReady,
                        e.element) {
                            const t = [];
                            e.element.traverse((e=>{
                                const n = this.parseMaterial(e);
                                n && t.push(n)
                            }
                            )),
                            o.Lotus.tasks.add(t, "environment")
                        }
                    }
                    _background;
                    get background() {
                        return this._background
                    }
                    createBackground() {
                        this._background = new H.I({
                            environment: this,
                            scene: this.scene
                        })
                    }
                    destroyBackground() {
                        this._background?.destroy()
                    }
                    chunks = new Map;
                    parseMaterial(e) {
                        const t = e;
                        if (!t.isMesh)
                            return;
                        const n = t.material;
                        let i = !1;
                        const a = k()(n, "envMap")
                          , s = t.layers.isEnabled(this.fields.layer);
                        return a && s && (i = !0),
                        i ? ()=>{
                            let e = this.chunks.get(n);
                            void 0 === e && (e = new w.u({
                                material: n,
                                scene: this.scene,
                                values: {
                                    envMap: this.envMap,
                                    envMapBlurriness: this._bluriness,
                                    envMapOrientation: this._orientation,
                                    envMapStrength: this._strength
                                }
                            }),
                            this.chunks.set(n, e))
                        }
                        : void 0
                    }
                    _texture;
                    get texture() {
                        return this._texture
                    }
                    async createTexture(e) {
                        if (e.json || e.variants.length)
                            this._texture = new z.r(this.scene.renderer);
                        else {
                            const t = await f.j.get(e.envMap);
                            t && (t.mapping = i.EquirectangularReflectionMapping,
                            t.needsUpdate = !0,
                            this._texture = t)
                        }
                    }
                    destroyTexture() {
                        this._texture instanceof z.r && this._texture?.destroy()
                    }
                    get envMap() {
                        let e;
                        return e = this._texture instanceof z.r ? this._texture.map.texture : this._texture,
                        e
                    }
                    _textures = new Map;
                    async preloadTextures() {
                        if (!this._textures)
                            return;
                        if (!(this.texture instanceof z.r)) {
                            const e = await f.j.get(this.fields.envMap);
                            return e && (e.mapping = i.EquirectangularReflectionMapping,
                            e.needsUpdate = !0,
                            this._texture = e),
                            this.chunks.forEach((e=>{
                                e.material.envMap = this._texture
                            }
                            )),
                            this.ready?.resolve()
                        }
                        let e = [this.fields.envMap];
                        this.json && Object.values(this.json).map((t=>{
                            const n = t.components.KeyframeCrossFadeEnvironment.envMap;
                            Array.isArray(n) ? n.forEach((t=>{
                                const {startValue: n, endValue: i} = t;
                                e.push(n),
                                e.push(i)
                            }
                            )) : n && e.push(n)
                        }
                        )),
                        e = N()(e);
                        const t = [];
                        for (let n = 0; n < e.length; n += 1) {
                            const i = e[n];
                            if (!this._textures.has(i) && i) {
                                const e = f.j.get(i).then((e=>{
                                    const t = this._texture
                                      , a = t.getMapFromTexture(e, i);
                                    this._textures.set(i, a),
                                    0 === n && (t.setSourceFromMap(a, !1),
                                    t.setDestinationFromMap(a, !1),
                                    t.fade(0))
                                }
                                ));
                                t.push(e)
                            }
                        }
                        Promise.all(t).then((()=>{
                            this.ready?.resolve()
                        }
                        ))
                    }
                    _animationHelper = {};
                    playTimeline({animation: e, destroyOnComplete: t=!0, isSkip: n=this.animationSkip}) {
                        super.playTimeline({
                            animation: e,
                            destroyOnComplete: t,
                            element: this._animationHelper,
                            isSkip: n
                        });
                        const i = this._texture;
                        this.timeline.on("envMap", (e=>{
                            window.requestAnimationFrame((()=>{
                                const t = this._textures.get(e.startValue)
                                  , n = this._textures.get(e.endValue);
                                i.setSourceFromMap(t, !1),
                                i.setDestinationFromMap(n, !1),
                                i.fade(0)
                            }
                            ))
                        }
                        )),
                        this.timeline.on("update", (()=>{
                            void 0 !== this._animationHelper?.envMap && i.fade(this._animationHelper?.envMap),
                            void 0 !== this._animationHelper?.envMapBlurriness && (this._bluriness.value = this._animationHelper?.envMapBlurriness),
                            void 0 !== this._animationHelper?.envMapOrientation && (this._orientation.value = this._animationHelper?.envMapOrientation),
                            void 0 !== this._animationHelper?.envMapStrength && (this._strength.value = this._animationHelper?.envMapStrength)
                        }
                        )),
                        this.timeline.play(n)
                    }
                    _bluriness = {
                        value: 0
                    };
                    _orientation = {
                        value: new i.Vector3
                    };
                    _strength = {
                        value: 1
                    };
                    async onDataChangeValues() {
                        this._bluriness && (this._bluriness.value = this.fields.envMapBlurriness),
                        this._orientation && this._orientation.value.fromArray(this.fields.envMapOrientation.map(i.MathUtils.degToRad)),
                        this._strength && (this._strength.value = this.fields.envMapStrength),
                        this.fields?.json && (this.json = await f.j.get(this.fields.json),
                        this.json && this.createKeyframes()),
                        this.background && (this.background.visible = this.fields?.debug),
                        this.chunks?.forEach((e=>{
                            e.onValuesChange()
                        }
                        )),
                        this.preloadTextures()
                    }
                    async onHotReload({isForced: e, path: t}) {
                        const n = A.U.checkFilePath(this.fields.envMap, t)
                          , i = A.U.checkFilePath(this.fields.json, t);
                        (n || i || e) && (await this.onDataChangeValues(),
                        this.playTimeline({
                            animation: void 0,
                            isSkip: !0
                        }))
                    }
                    destroy() {
                        this.destroyTexture(),
                        super.destroy()
                    }
                }
                class B extends j.W {
                    static fields = {
                        ...j.l,
                        gltf: {
                            defaultValue: "",
                            type: "String"
                        },
                        json: {
                            defaultValue: "",
                            type: "String"
                        },
                        layer: {
                            defaultValue: 0,
                            type: "Number"
                        },
                        debug: {
                            defaultValue: !1,
                            type: "Boolean"
                        }
                    };
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            fields: e,
                            layer: t,
                            name: "KeyframeEnvironment",
                            scene: n
                        }),
                        this.onDataChange(e)
                    }
                    playTimeline({animation: e, destroyOnComplete: t=!0, isSkip: n=this.animationSkip}) {
                        super.playTimeline({
                            animation: e,
                            destroyOnComplete: t,
                            element: this.gltf.scene,
                            isSkip: n
                        }),
                        this.animationAutoPlay && this.timeline.play(n)
                    }
                    async onDataChangeValues() {
                        this.gltf?.scene?.parent?.remove(this.gltf.scene),
                        this.fields?.gltf && (this.gltf = await f.j.get(this.fields.gltf)),
                        this.fields?.json && (this.json = await f.j.get(this.fields.json)),
                        this.gltf && this.json && this.createKeyframes(),
                        this.fields?.debug && this.scene.add(this.gltf.scene),
                        this.ready?.resolve()
                    }
                    _meshes = [];
                    onLayerLoaded(e) {
                        e.element && e.element.traverse((e=>{
                            this.addMesh(e)
                        }
                        )),
                        o.Lotus.tasks.add((()=>{
                            this.onRender(),
                            o.Lotus.tryRequestAnimationFrame()
                        }
                        ), "environment")
                    }
                    addMesh(e) {
                        e.isMesh && e.layers.isEnabled(this.fields.layer) && -1 === this._meshes.indexOf(e) && this._meshes.push(e)
                    }
                    removeMesh(e) {
                        const t = this._meshes.indexOf(e);
                        -1 !== t && this._meshes.splice(t, 1),
                        this.onRender()
                    }
                    async onHotReload({isForced: e, path: t}) {
                        await A.U.parseGLTFTextures(this.gltf, t),
                        this.onRender();
                        const n = A.U.checkFilePath(this.fields.gltf, t)
                          , i = A.U.checkFilePath(this.fields.json, t);
                        (n || i || e) && (await this.onDataChangeValues(),
                        (n || e) && A.U.refreshGLTFTextures(this.gltf),
                        this.playTimeline({
                            animation: void 0,
                            isSkip: !0
                        }))
                    }
                    _pmremRenderTarget = null;
                    onLoop() {
                        this.timeline?.isPaused || this.onRender()
                    }
                    onRender() {
                        const e = C.G.pmremGenerator;
                        if (!this.gltf || !e || !this.scene.isSceneCompiled)
                            return;
                        if (this.scene.renderer.setClearColor(0, 1),
                        T.Z.isIOS164()) {
                            const t = i.PMREMGenerator
                              , n = e._cubeSize
                              , a = 3 * Math.max(n, 112)
                              , s = 4 * n
                              , r = t.enableHDR ? i.HalfFloatType : i.UnsignedByteType
                              , o = t.renderTargetSampleCount;
                            if (null === this._pmremRenderTarget || this._pmremRenderTarget.width !== a || this._pmremRenderTarget.height !== s || this._pmremRenderTarget.texture.type !== r || this._pmremRenderTarget.samples !== o) {
                                this._pmremRenderTarget = e.fromScene(this.gltf.scene, 0, this.scene.camera.near, this.scene.camera.far);
                                const t = new i.DepthTexture(a,s);
                                this._pmremRenderTarget.depthTexture = t
                            } else {
                                this._pmremRenderTarget.scissorTest = !0;
                                const t = this.scene.renderer.getRenderTarget();
                                this.scene.renderer.setRenderTarget(this._pmremRenderTarget),
                                this.scene.renderer.clear(),
                                this.scene.renderer.setRenderTarget(t),
                                this._pmremRenderTarget = e.fromScene(this.gltf.scene, 0, this.scene.camera.near, this.scene.camera.far, this._pmremRenderTarget)
                            }
                        } else
                            this._pmremRenderTarget = e.fromScene(this.gltf.scene, 0, this.scene.camera.near, this.scene.camera.far);
                        const t = this._pmremRenderTarget.texture;
                        this._meshes.forEach((e=>{
                            const n = e.material;
                            n instanceof i.MeshStandardMaterial && (n.envMap = t)
                        }
                        )),
                        this.scene.renderer.setClearColor(this.scene.renderer.background, this.scene.renderer.backgroundAlpha)
                    }
                }
                class W extends j.W {
                    static fields = {
                        ...j.l,
                        json: {
                            defaultValue: "",
                            type: "String"
                        }
                    };
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            fields: e,
                            layer: t,
                            name: "KeyframeObject",
                            scene: n
                        }),
                        this.onDataChange(e)
                    }
                    playTimeline({animation: e, destroyOnComplete: t=!0, isSkip: n=this.animationSkip}) {
                        super.playTimeline({
                            animation: e,
                            isSkip: n,
                            destroyOnComplete: t
                        }),
                        this.animationAutoPlay && window.requestAnimationFrame((()=>{
                            this.timeline.play(n)
                        }
                        ))
                    }
                    async onDataChangeValues() {
                        this.fields?.json && (this.json = await f.j.get(this.fields.json)),
                        this.json && this.createKeyframes(),
                        this.ready?.resolve()
                    }
                    async onHotReload({isForced: e, path: t}) {
                        (A.U.checkFilePath(this.fields.json, t) || e) && (await this.onDataChangeValues(),
                        this.playTimeline({
                            animation: void 0,
                            isSkip: !0
                        }))
                    }
                }
                var X = n(8804)
                  , Y = n.n(X)
                  , q = n(928)
                  , K = n.n(q)
                  , $ = n(7716);
                class Q extends j.W {
                    static fields = {
                        ...j.l,
                        json: {
                            defaultValue: "",
                            type: "String"
                        },
                        jsonFadeTargets: {
                            defaultValue: "",
                            label: "jsonFadeTargets (optional)",
                            type: "String"
                        }
                    };
                    _handler;
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            fields: e,
                            layer: t,
                            name: "KeyframeObjectFade",
                            scene: n
                        }),
                        this.layer.isKeyframeObjectFade = !0,
                        this.createStructure(),
                        this.onDataChange(e),
                        this.scene.frameReady.then((()=>{
                            this._handler = this.scene.objectFadeRenderTargetHandler,
                            this.createFadeTargets(),
                            this.playFirstAnimation()
                        }
                        ))
                    }
                    getCurrentValue() {
                        return this._structure.fade
                    }
                    _structure;
                    createStructure() {
                        this._structure = new i.Group,
                        this.scene.add(this._structure)
                    }
                    _jsonFadeTargets;
                    createFadeTargets() {
                        if (this._jsonFadeTargets) {
                            const e = this._jsonFadeTargets.animationTargets;
                            for (const t in e)
                                for (let n = 0; n < e[t].targets.length; n++) {
                                    const i = e[t].targets[n]
                                      , a = this.layer.element.getObjectByName(i);
                                    this._handler.addFadeTargetByName(t, a),
                                    this._handler.addFadeTarget(a)
                                }
                        } else
                            this._handler.addFadeTarget(this.layer.element);
                        this.layer.element?.traverse((e=>{
                            e instanceof i.Mesh && e.layers.enable($.AR)
                        }
                        )),
                        this.scene.traverse((e=>{
                            e instanceof i.Mesh && !e.layers.isEnabled($.m1) && !e.layers.isEnabled($.AR) && !e.layers.isEnabled($.Q6) && this._handler?.addNonFadeTarget(e)
                        }
                        ))
                    }
                    onStateChange(e) {
                        const t = super.onStateChange(e, !1);
                        if (!t)
                            return;
                        const {keyframes: n} = t.components.KeyFrameObjectFade.fade
                          , i = Y()(n).startValue
                          , a = K()(n).endValue;
                        if (this._jsonFadeTargets) {
                            this._structure.fade = i;
                            const t = this._jsonFadeTargets.animationTargets;
                            for (const n in t)
                                for (let i = 0; i < t[n].animations.length; i++)
                                    if (e.currentState.includes(t[n].animations[i])) {
                                        this._handler.fadeTargets = this._handler.fadeTargetsByName[n];
                                        break
                                    }
                        }
                        i !== a && this.animationAutoPlay && this.playTimeline({
                            animation: t,
                            isSkip: this.animationSkip
                        })
                    }
                    playTimeline({animation: e, destroyOnComplete: t=!0, isSkip: n=this.animationSkip}) {
                        super.playTimeline({
                            animation: e,
                            destroyOnComplete: t,
                            element: this._structure,
                            isSkip: n
                        });
                        const i = ()=>{
                            this._structure && this._handler && (this._handler.checkIfCanEnable(this._structure.fade),
                            this._handler.fade(this._structure.fade))
                        }
                        ;
                        this.timeline.on("start", i),
                        this.timeline.on("update", i),
                        this.animationAutoPlay && this.timeline.play(n)
                    }
                    async onDataChangeValues() {
                        this.fields?.json && (this.json = await f.j.get(this.fields.json)),
                        this.fields?.jsonFadeTargets && (this._jsonFadeTargets = await f.j.get(this.fields.jsonFadeTargets)),
                        this.json && this.createKeyframes(!1),
                        this.ready?.resolve()
                    }
                    async onHotReload({isForced: e, path: t}) {
                        (A.U.checkFilePath(this.fields.json, t) || e) && (await this.onDataChangeValues(),
                        this.playTimeline({
                            animation: void 0,
                            isSkip: !0
                        }))
                    }
                }
                var Z = n(5395);
                class J extends j.W {
                    static fields = {
                        ...j.l,
                        gltf: {
                            defaultValue: "",
                            type: "String"
                        },
                        json: {
                            defaultValue: "",
                            type: "String"
                        },
                        showLights: {
                            defaultValue: !0,
                            type: "Boolean"
                        },
                        showGeometries: {
                            defaultValue: !1,
                            type: "Boolean"
                        },
                        layer: {
                            defaultValue: 0,
                            type: "Number"
                        }
                    };
                    _lightsMap = new Map;
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            fields: e,
                            layer: t,
                            name: "KeyframeTexturedAreaLight",
                            scene: n
                        }),
                        this.onDataChange(e)
                    }
                    onSceneReady() {
                        Z.o.setupSceneMaterials(this.scene)
                    }
                    createGLTF() {
                        for (const e of this._lightsMap.values())
                            e.dispose();
                        this._lightsMap.clear(),
                        this.gltf.scene.traverse((e=>{
                            const t = e
                              , n = t.material;
                            if (n instanceof i.MeshStandardMaterial) {
                                const e = n.emissiveMap
                                  , i = n.emissive
                                  , a = n.emissiveIntensity;
                                t.geometry.computeBoundingBox();
                                const s = t.geometry.boundingBox.max.x - t.geometry.boundingBox.min.x
                                  , r = t.geometry.boundingBox.max.y - t.geometry.boundingBox.min.y
                                  , o = t.scale.x * s
                                  , l = t.scale.y * r;
                                if (void 0 === e)
                                    console.error("[KeyframeTexturedAreaLight]: Emissive Textures are missing, failed to generate TexturedAreaLight");
                                else {
                                    const h = new Z.o({
                                        color: i,
                                        texture: e,
                                        width: o,
                                        height: l,
                                        boundsX: s,
                                        boundsY: r,
                                        intensity: a,
                                        needsHelper: this.fields?.showLights ?? !0
                                    });
                                    n.visible = this.fields?.showGeometries ?? !0,
                                    t.add(h),
                                    this._lightsMap.set(t, h)
                                }
                            }
                        }
                        )),
                        this.scene.add(this.gltf.scene)
                    }
                    playTimeline({animation: e, destroyOnComplete: t=!0, isSkip: n=this.animationSkip}) {
                        super.playTimeline({
                            animation: e,
                            destroyOnComplete: t,
                            element: this.gltf.scene,
                            isSkip: n
                        }),
                        this.animationAutoPlay && (this.timeline.on("complete", (()=>{
                            L.E.setNodesValues(this.gltf.scene, e)
                        }
                        )),
                        this.timeline.play(n))
                    }
                    async onDataChangeValues() {
                        if (this.fields?.gltf && (this.gltf = await f.j.get(this.fields.gltf)),
                        this.fields?.json && (this.json = await f.j.get(this.fields.json)),
                        this.gltf && this.json && (this.createGLTF(),
                        this.createKeyframes()),
                        this._lightsMap)
                            for (const [e,t] of this._lightsMap)
                                t.layers.enable(this.fields.layer),
                                e.material.visible = this.fields.showGeometries,
                                t.helper.visible = this.fields.showLights;
                        Z.o.setupSceneMaterials(this.scene),
                        this.ready?.resolve()
                    }
                    async onHotReload({isForced: e, path: t}) {
                        (A.U.parseGLTFTextures(this.gltf, t) || e) && o.Lotus.tryRequestAnimationFrame();
                        const n = A.U.checkFilePath(this.fields.gltf, t)
                          , i = A.U.checkFilePath(this.fields.json, t);
                        (n || i || e) && (await this.onDataChangeValues(),
                        (n || e) && A.U.refreshGLTFTextures(this.gltf),
                        this.playTimeline({
                            animation: void 0,
                            isSkip: !0
                        }),
                        o.Lotus.tryRequestAnimationFrame())
                    }
                    onAfterHotReload() {
                        Z.o.setupSceneMaterials(this.scene)
                    }
                }
                var ee = n(6060);
                class te extends l.h {
                    ready = Promise.create();
                    static fields = {
                        animation: {
                            defaultValue: "",
                            type: "String"
                        },
                        json: {
                            defaultValue: "",
                            type: "String"
                        },
                        fov: {
                            defaultValue: 50,
                            type: "Number"
                        },
                        offset: {
                            defaultValue: 0,
                            type: "Number"
                        }
                    };
                    fieldsRuntime = {};
                    layer;
                    constructor({fields: e, layer: t, scene: n}) {
                        super({
                            name: "KeyframeTimelineCamera",
                            scene: n
                        }),
                        this.layer = t,
                        this.layer.element = this,
                        this.layer.isCamera = !0,
                        this.onDataChange(e)
                    }
                    _fields;
                    get fields() {
                        return this._fields
                    }
                    _json;
                    get json() {
                        return this._json
                    }
                    onDataChange(e) {
                        this._fields?.destroy(),
                        this._fields = s.O.create(e, this.scene),
                        this.onDataChangeValues()
                    }
                    async onDataChangeValues() {
                        this.fov = this.fields.fov ?? 50,
                        this.fields?.json && (this._json = await f.j.get(this.fields.json)),
                        this._json && this.createKeyframes();
                        const e = this._fields.offset ?? 0;
                        this.setViewOffset(this.scene.viewport.width, this.scene.viewport.height, 0, e * Math.min(this.scene.viewport.width, this.scene.viewport.height), this.scene.viewport.width, this.scene.viewport.height),
                        this.ready?.resolve()
                    }
                    _keyframes = new Map;
                    get keyframes() {
                        return this._keyframes
                    }
                    _timeline;
                    createKeyframes() {
                        if (this._keyframes = L.E.generateAnimationMap(this._json),
                        ee.h.IS_DEVELOPMENT) {
                            const e = Array.from(this.keyframes.entries()).map((([e,t])=>({
                                label: e,
                                value: e
                            })));
                            e.push({
                                label: "None",
                                value: ""
                            }),
                            this.fieldsRuntime.preview = {
                                defaultValue: "",
                                onChange: this.onPreview.bind(this),
                                options: e,
                                type: "Select"
                            }
                        }
                        this._timeline = this.createTimeline(this._fields.animation)
                    }
                    createTimeline(e) {
                        const t = new h.TY
                          , n = this._keyframes.get(e);
                        return L.E.setupTimeline({
                            animation: n,
                            element: this.scene,
                            timeline: t
                        }),
                        t.on("start", (()=>{
                            this.dispatchEvent({
                                animation: e,
                                type: "animation:start"
                            })
                        }
                        )),
                        t.on("update", (()=>{
                            this.dispatchEvent({
                                animation: e,
                                type: "animation:update"
                            })
                        }
                        )),
                        t.on("complete", (()=>{
                            this.dispatchEvent({
                                animation: e,
                                type: "animation:ended"
                            })
                        }
                        )),
                        t
                    }
                    async onHotReload({isForced: e, path: t}) {
                        (A.U.checkFilePath(this.fields.json, t) || e) && await this.onDataChangeValues()
                    }
                    onPreview({value: e}) {
                        this._timeline?.destroy(),
                        this._timeline = this.createTimeline(e),
                        this._timeline.play()
                    }
                    destroy() {
                        this._timeline?.destroy(),
                        a.H.destroy(this)
                    }
                }
            },
            1902: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    Box: function() {
                        return a
                    },
                    Plane: function() {
                        return s
                    },
                    Sphere: function() {
                        return r
                    },
                    Tetrahedron: function() {
                        return o
                    }
                });
                var i = n(4468);
                const a = new i.BoxGeometry(1,1,1)
                  , s = new i.PlaneGeometry(1,1,1,1)
                  , r = new i.SphereGeometry(1,32,32)
                  , o = new i.TetrahedronGeometry(1,0)
            },
            812: function(e, t, n) {
                "use strict";
                n.d(t, {
                    N: function() {
                        return a
                    }
                });
                var i = n(3395);
                class a {
                    _scene;
                    constructor({scene: e}) {
                        this._scene = e,
                        this.addEventListeners()
                    }
                    onKeyDown(e) {
                        this._scene.eventPool.trigger({
                            name: "keyboard"
                        }, e)
                    }
                    addEventListeners() {
                        this.onKeyDown = this.onKeyDown.bind(this),
                        window.addEventListener("keydown", this.onKeyDown)
                    }
                    removeEventListeners() {
                        window.removeEventListener("keydown", this.onKeyDown)
                    }
                    destroy() {
                        this.removeEventListeners(),
                        i.H.destroy(this)
                    }
                }
            },
            8107: function(e, t, n) {
                "use strict";
                n.d(t, {
                    a: function() {
                        return c
                    }
                });
                var i = n(4468)
                  , a = n(6816)
                  , s = n(132)
                  , r = n(927)
                  , o = n(3395);
                const l = n(7166)
                  , h = n(2410);
                class c extends i.EventDispatcher {
                    _assets = new Map;
                    _scene;
                    loaded = Promise.create();
                    constructor({scene: e}) {
                        super(),
                        this._scene = e,
                        this.createAssets(),
                        this.addEventListeners()
                    }
                    async createAssets() {
                        if (await new Promise((e=>{
                            const t = [];
                            l.traverse(this._scene.data, (async(e,n,i)=>{
                                if (i?.includes?.("/uploads") && this.addAsset(e, n, i),
                                i?.endsWith?.(".json")) {
                                    const e = Promise.create();
                                    t.push(e);
                                    const n = await s.I.load(i);
                                    l.traverse(n, (async(e,t,n)=>{
                                        n?.includes?.("/uploads") && this.addAsset(e, t, n)
                                    }
                                    )),
                                    e.resolve()
                                }
                            }
                            )),
                            Promise.all(t).then(e)
                        }
                        )),
                        this._assets.forEach((async({options: e, value: t})=>{
                            h.IMAGES.test(t) ? r.G.load(t, e) : h.OBJECTS.test(t) && s.I.load(t)
                        }
                        )),
                        0 === this._assets.size)
                            return this.onLoad()
                    }
                    addAsset(e, t, n) {
                        if (["map", "Map"].some((t=>e.endsWith(t)))) {
                            const i = {
                                channel: t[`${e}UV`],
                                colorSpace: t[`${e}ColorSpace`],
                                flipY: t[`${e}FlipY`],
                                wrapS: t[`${e}WrapS`],
                                wrapT: t[`${e}WrapT`]
                            };
                            return this._assets.set(n, {
                                options: i,
                                value: n
                            })
                        }
                        this._assets.set(n, {
                            value: n
                        })
                    }
                    onAssetLoaded({asset: e, assets: t}) {
                        this._scene.eventPool.trigger({
                            name: "assetLoaded"
                        }, e);
                        const n = Array.from(this._assets.values())
                          , i = Array.from(t.values())
                          , a = Math.floor(i.length / n.length * 100);
                        this.dispatchEvent({
                            progress: a,
                            type: "load"
                        }),
                        a >= 100 && this.onLoad()
                    }
                    onLoad() {
                        this.dispatchEvent({
                            progress: 100,
                            type: "loaded"
                        }),
                        this.loaded.resolve()
                    }
                    addEventListeners() {
                        this.onAssetLoaded = this.onAssetLoaded.bind(this),
                        a.j.addEventListener("load", this.onAssetLoaded)
                    }
                    removeEventListeners() {
                        a.j.removeEventListener("load", this.onAssetLoaded)
                    }
                    destroy() {
                        this.removeEventListeners(),
                        this._assets.clear(),
                        o.H.destroy(this)
                    }
                }
            },
            7684: function(e, t, n) {
                "use strict";
                n.d(t, {
                    r: function() {
                        return o
                    }
                });
                var i = n(9653)
                  , a = n(3395)
                  , s = n(9294)
                  , r = n.n(s);
                class o {
                    _emitter = new (r());
                    _scene;
                    _fps = 60;
                    _fpsInterval = 1e3 / this._fps;
                    _timeCurrent = 0;
                    _timeElapsed = 0;
                    _timeLast = 0;
                    _delta = 0;
                    get delta() {
                        return this._delta
                    }
                    _deltaCurrent = 0;
                    _deltaElapsed = 0;
                    _deltaLast = 0;
                    constructor({scene: e}) {
                        this._scene = e,
                        this.onUpdate = this.onUpdate.bind(this),
                        this._emitter.on("update", this.onUpdate),
                        this._emitter.run()
                    }
                    onUpdate() {
                        this._timeCurrent = window.performance.now(),
                        this._timeElapsed = this._timeCurrent - this._timeLast,
                        this._timeLast = this._timeCurrent - this._timeElapsed % this._fpsInterval,
                        this._timeElapsed > this._fpsInterval && (this._deltaCurrent = window.performance.now(),
                        this._deltaElapsed = this._deltaCurrent - this._deltaLast,
                        this._deltaLast = this._deltaCurrent,
                        this._delta = this._deltaElapsed / 1e3),
                        (i.Lotus.IS_HOT_RELOADING || this._timeElapsed > this._fpsInterval && this._shouldDrawFrame) && this.onRender(),
                        this.onFrame(),
                        this._emitter.run()
                    }
                    onFrame() {
                        i.Lotus.tasks.onFrame(),
                        this._scene.eventPool?.trigger({
                            name: "frame"
                        })
                    }
                    onRender() {
                        this._scene.eventPool?.trigger({
                            name: "loop"
                        }, {
                            delta: this._delta
                        }),
                        this.cancelAnimationFrame()
                    }
                    _shouldDrawFrame = !1;
                    async tryRequestAnimationFrame() {
                        window.requestAnimationFrame((()=>{
                            this._shouldDrawFrame = !0
                        }
                        ))
                    }
                    cancelAnimationFrame() {
                        this._scene.controls?.isEnabled || (this._shouldDrawFrame = !1)
                    }
                    destroy() {
                        this.cancelAnimationFrame(),
                        this._emitter.destroy(),
                        a.H.destroy(this)
                    }
                }
            },
            4378: function(e, t, n) {
                "use strict";
                n.d(t, {
                    g: function() {
                        return s
                    }
                });
                var i = n(4468)
                  , a = n(3395);
                class s {
                    _element;
                    _elementBounds;
                    _scene;
                    _x = 0;
                    get x() {
                        return this._x
                    }
                    _y = 0;
                    get y() {
                        return this._y
                    }
                    _isTouch = !1;
                    get isTouch() {
                        return this._isTouch
                    }
                    _isTouching = !1;
                    get isTouching() {
                        return this._isTouching
                    }
                    _distance = 0;
                    get distance() {
                        return this._distance
                    }
                    _hold = new i.Vector2;
                    get hold() {
                        return this._hold
                    }
                    _last = new i.Vector2;
                    get last() {
                        return this._last
                    }
                    _delta = new i.Vector2;
                    get delta() {
                        return this._delta
                    }
                    _move = new i.Vector2;
                    get move() {
                        return this._move
                    }
                    _world = new i.Vector3;
                    get world() {
                        return this._world
                    }
                    _normalized = new i.Vector2;
                    get normalized() {
                        return this._normalized
                    }
                    _temp = new i.Vector3;
                    constructor({scene: e}) {
                        this._scene = e,
                        this.changeEventListeners(this._scene.element)
                    }
                    _onPointerTest = e=>!0;
                    get onPointerTest() {
                        return this._onPointerTest
                    }
                    set onPointerTest(e) {
                        this._onPointerTest = e
                    }
                    _raycaster = new i.Raycaster;
                    checkRaycast() {
                        this._raycaster.setFromCamera(this._normalized, this._scene.camera);
                        const e = this._raycaster.intersectObjects(this._scene.children, !0);
                        return this._onPointerTest(e)
                    }
                    getPointer(e) {
                        this._elementBounds = this._element.getBoundingClientRect();
                        const t = {
                            x: 0,
                            y: 0
                        }
                          , n = e.touches
                          , i = e.changedTouches
                          , a = e;
                        return n?.length ? (t.x = n[0].clientX - this._elementBounds.left,
                        t.y = n[0].clientY - this._elementBounds.top) : i?.length ? (t.x = i[0].clientX - this._elementBounds.left,
                        t.y = i[0].clientY - this._elementBounds.top) : (t.x = a.clientX - this._elementBounds.left,
                        t.y = a.clientY - this._elementBounds.top),
                        t
                    }
                    onTouchStart(e) {
                        const t = this.getPointer(e);
                        this.onStart({
                            event: e,
                            x: t.x,
                            y: t.y,
                            isTouch: !0
                        })
                    }
                    onTouchMove(e) {
                        const t = this.getPointer(e);
                        this.onMove({
                            event: e,
                            x: t.x,
                            y: t.y
                        })
                    }
                    onTouchEnd(e) {
                        const t = this.getPointer(e);
                        this.onEnd({
                            event: e,
                            x: t.x,
                            y: t.y
                        })
                    }
                    onMouseDown(e) {
                        const t = this.getPointer(e);
                        this.onStart({
                            event: e,
                            x: t.x,
                            y: t.y
                        })
                    }
                    onMouseMove(e) {
                        const t = this.getPointer(e);
                        this.onMove({
                            event: e,
                            x: t.x,
                            y: t.y
                        })
                    }
                    onMouseUp(e) {
                        const t = this.getPointer(e);
                        this.onEnd({
                            event: e,
                            x: t.x,
                            y: t.y
                        })
                    }
                    onStart({event: e, x: t, y: n, isTouch: i}) {
                        this._isTouch = i,
                        this._isTouching = !0,
                        this._x = t,
                        this._y = n,
                        this._hold.set(t, n),
                        this._last.set(t, n),
                        this._delta.set(0, 0),
                        this._move.set(0, 0),
                        this._normalized.x = this._x / this._scene.viewport.width * 2 - 1,
                        this._normalized.y = -this._y / this._scene.viewport.height * 2 + 1,
                        this._distance = 0,
                        i && this.checkRaycast() && e.preventDefault(),
                        this._scene.eventPool.trigger({
                            name: "pointerStart"
                        }, {
                            pointer: this
                        })
                    }
                    onMove({event: e, x: t, y: n}) {
                        if (this._isTouching && (this._move.x = t - this._hold.x,
                        this._move.y = n - this._hold.y),
                        this._x = t,
                        this._y = n,
                        this._delta.x = t - this._last.x,
                        this._delta.y = n - this._last.y,
                        this._distance += this._delta.length(),
                        this._normalized.x = this._x / this._scene.viewport.width * 2 - 1,
                        this._normalized.y = -this._y / this._scene.viewport.height * 2 + 1,
                        this._temp.x = this._normalized.x,
                        this._temp.y = this._normalized.y,
                        this._temp.z = .5,
                        this._scene.camera) {
                            const e = this._scene.camera;
                            if (e) {
                                this._temp.unproject(e);
                                const t = this._temp.sub(e.position).normalize()
                                  , n = e.position.z / t.z;
                                this._world.copy(e.position).add(t.multiplyScalar(n))
                            }
                        }
                        this._scene.eventPool && (this._scene.eventPool.trigger({
                            name: "pointerMove"
                        }, {
                            pointer: this
                        }),
                        this._isTouching && this._scene.eventPool.trigger({
                            name: "pointerDrag"
                        }, {
                            pointer: this
                        }))
                    }
                    onEnd({event: e}) {
                        this._scene.eventPool.trigger({
                            name: "pointerEnd"
                        }, {
                            pointer: this
                        }),
                        this._delta.set(0, 0),
                        this._move.set(0, 0),
                        this._x = .5 * this._scene.viewport.width,
                        this._y = .5 * this._scene.viewport.height,
                        this._normalized.x = this._x / this._scene.viewport.width * 2 - 1,
                        this._normalized.y = -this._y / this._scene.viewport.height * 2 + 1,
                        this._distance = 0,
                        this._isTouching = !1
                    }
                    changeEventListeners(e) {
                        this.addEventListeners(e)
                    }
                    addEventListeners(e) {
                        this._element && this.removeEventListeners(),
                        this._element = e;
                        const t = {
                            passive: !1
                        };
                        this.onTouchStart = this.onTouchStart.bind(this),
                        this.onTouchMove = this.onTouchMove.bind(this),
                        this.onTouchEnd = this.onTouchEnd.bind(this),
                        this._element.addEventListener("touchstart", this.onTouchStart, t),
                        document.addEventListener("touchmove", this.onTouchMove, t),
                        document.addEventListener("touchend", this.onTouchEnd, t),
                        document.addEventListener("touchcancel", this.onTouchEnd, t),
                        this.onMouseDown = this.onMouseDown.bind(this),
                        this.onMouseMove = this.onMouseMove.bind(this),
                        this.onMouseUp = this.onMouseUp.bind(this),
                        this._element.addEventListener("mousedown", this.onMouseDown),
                        document.addEventListener("mousemove", this.onMouseMove),
                        document.addEventListener("mouseup", this.onMouseUp),
                        this.onEnd = this.onEnd.bind(this),
                        document.addEventListener("mouseleave", this.onEnd),
                        document.addEventListener("contextmenu", this.onEnd)
                    }
                    removeEventListeners() {
                        this._element.removeEventListener("touchstart", this.onTouchStart),
                        document.removeEventListener("touchmove", this.onTouchMove),
                        document.removeEventListener("touchend", this.onTouchEnd),
                        document.removeEventListener("touchcancel", this.onTouchEnd),
                        this._element.removeEventListener("mousedown", this.onMouseDown),
                        document.removeEventListener("mousemove", this.onMouseMove),
                        document.removeEventListener("mouseup", this.onMouseUp),
                        document.removeEventListener("mouseleave", this.onEnd),
                        document.removeEventListener("contextmenu", this.onEnd)
                    }
                    destroy() {
                        this.removeEventListeners(),
                        a.H.destroy(this)
                    }
                }
            },
            4912: function(e, t, n) {
                "use strict";
                n.d(t, {
                    l: function() {
                        return l
                    }
                });
                var i = n(4468)
                  , a = n(3279)
                  , s = n.n(a)
                  , r = n(9653)
                  , o = n(3395);
                class l {
                    _element;
                    _scene;
                    constructor({scene: e}) {
                        this.onResize = s()(this.onResize, 1),
                        this._element = e.element,
                        this._scene = e,
                        this._scene.layersCreated.then((()=>{
                            this.onResize()
                        }
                        )),
                        this.createObserver()
                    }
                    _resizeObserver;
                    createObserver() {
                        this._resizeObserver = new ResizeObserver((e=>{
                            this.onResize()
                        }
                        )),
                        this._resizeObserver.observe(this._element)
                    }
                    destroyObserver() {
                        this._resizeObserver.disconnect()
                    }
                    bounds;
                    height = window.innerHeight;
                    width = window.innerWidth;
                    uniform = new i.Vector2(window.innerWidth,window.innerHeight);
                    ratio = window.innerWidth / window.innerHeight;
                    windowHeight = window.innerHeight;
                    windowWidth = window.innerWidth;
                    onResize() {
                        this.bounds = this._element.getBoundingClientRect(),
                        this.height = this.bounds?.height || window.innerHeight,
                        this.width = this.bounds?.width || window.innerWidth,
                        this.ratio = this.width / this.height,
                        this.uniform.x = this.width,
                        this.uniform.y = this.height,
                        this.windowHeight = window.innerHeight,
                        this.windowWidth = window.innerWidth,
                        this._scene.eventPool.trigger({
                            name: "resize"
                        }, {
                            height: this.height,
                            ratio: this.ratio,
                            uniform: this.uniform,
                            width: this.width,
                            windowHeight: this.windowHeight,
                            windowWidth: this.windowWidth
                        }),
                        r.Lotus.tryRequestAnimationFrame()
                    }
                    destroy() {
                        this.onResize.cancel?.(),
                        this.destroyObserver(),
                        o.H.destroy(this)
                    }
                }
            },
            6544: function(e, t, n) {
                "use strict";
                n.d(t, {
                    N1: function() {
                        return i.N
                    },
                    aN: function() {
                        return a.a
                    },
                    gb: function() {
                        return r.g
                    },
                    l_: function() {
                        return o.l
                    },
                    rN: function() {
                        return s.r
                    }
                });
                var i = n(812)
                  , a = n(8107)
                  , s = n(7684)
                  , r = n(4378)
                  , o = n(4912)
            },
            9653: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    AdditionalBrightnessShaderChunk: function() {
                        return g.AdditionalBrightnessShaderChunk
                    },
                    AdditionalBrightnessShaderChunkFragment: function() {
                        return g.AdditionalBrightnessShaderChunkFragment
                    },
                    AdditionalBrightnessShaderChunkVars: function() {
                        return g.AdditionalBrightnessShaderChunkVars
                    },
                    AdditionalExposureShaderChunk: function() {
                        return g.AdditionalExposureShaderChunk
                    },
                    AdditionalExposureShaderChunkFragment: function() {
                        return g.AdditionalExposureShaderChunkFragment
                    },
                    AdditionalExposureShaderChunkVars: function() {
                        return g.AdditionalExposureShaderChunkVars
                    },
                    AdditionalGammaShaderChunk: function() {
                        return g.AdditionalGammaShaderChunk
                    },
                    AdditionalGammaShaderChunkFragment: function() {
                        return g.AdditionalGammaShaderChunkFragment
                    },
                    AdditionalGammaShaderChunkVars: function() {
                        return g.AdditionalGammaShaderChunkVars
                    },
                    AdditionalSaturationShaderChunk: function() {
                        return g.AdditionalSaturationShaderChunk
                    },
                    AdditionalSaturationShaderChunkFragment: function() {
                        return g.AdditionalSaturationShaderChunkFragment
                    },
                    AdditionalSaturationShaderChunkVars: function() {
                        return g.AdditionalSaturationShaderChunkVars
                    },
                    AlphaMapParsShaderChunkFragment: function() {
                        return g.AlphaMapParsShaderChunkFragment
                    },
                    AlphaMapShaderChunk: function() {
                        return g.AlphaMapShaderChunk
                    },
                    AlphaMapShaderChunkFragment: function() {
                        return g.AlphaMapShaderChunkFragment
                    },
                    AmbientLight: function() {
                        return y.AmbientLight
                    },
                    AnimatedCamera: function() {
                        return y.AnimatedCamera
                    },
                    Animation: function() {
                        return v.fw
                    },
                    AnimationActionExtended: function() {
                        return v.pf
                    },
                    AnimationClipExtended: function() {
                        return v.IE
                    },
                    Animations: function() {
                        return v.FK
                    },
                    AoChannelMixerShaderChunk: function() {
                        return g.AoChannelMixerShaderChunk
                    },
                    AoMapFragment: function() {
                        return g.AoMapFragment
                    },
                    AoMapFragmentParameters: function() {
                        return g.AoMapFragmentParameters
                    },
                    AppState: function() {
                        return v.aB
                    },
                    AppStateBinding: function() {
                        return v.oM
                    },
                    AssetLibrary: function() {
                        return T.jx
                    },
                    BlendModeShaderChunk: function() {
                        return g.BlendModeShaderChunk
                    },
                    Box: function() {
                        return M.Box
                    },
                    COLOR_BLACK: function() {
                        return A.Sx
                    },
                    COLOR_BLUE: function() {
                        return A.pI
                    },
                    COLOR_GREEN: function() {
                        return A.F1
                    },
                    COLOR_RED: function() {
                        return A.yg
                    },
                    COLOR_WHITE: function() {
                        return A.Yf
                    },
                    Chunks: function() {
                        return x.So
                    },
                    ColorAdjustmentShaderChunk: function() {
                        return g.ColorAdjustmentShaderChunk
                    },
                    ColorShader: function() {
                        return b.ColorShader
                    },
                    Controls: function() {
                        return v.ZX
                    },
                    CrossFadeEnvironmentFragment: function() {
                        return g.CrossFadeEnvironmentFragment
                    },
                    CrossFadeEnvironmentShaderChunk: function() {
                        return g.CrossFadeEnvironmentShaderChunk
                    },
                    CrossFadeRenderTargetsFragment: function() {
                        return b.CrossFadeRenderTargetsFragment
                    },
                    CrossFadeTexture: function() {
                        return v.Ep
                    },
                    CustomLightsFragmentBegin: function() {
                        return g.CustomLightsFragmentBegin
                    },
                    CustomLightsPhysicalParsFragment: function() {
                        return g.CustomLightsPhysicalParsFragment
                    },
                    CustomScene: function() {
                        return v.cl
                    },
                    CustomUVParsFragment: function() {
                        return g.CustomUVParsFragment
                    },
                    CustomUVParsVertex: function() {
                        return g.CustomUVParsVertex
                    },
                    CustomUVVertex: function() {
                        return g.CustomUVVertex
                    },
                    Debug: function() {
                        return v.cG
                    },
                    DepthModeShaderChunk: function() {
                        return g.DepthModeShaderChunk
                    },
                    EnvironmentBackground: function() {
                        return v.IZ
                    },
                    EnvironmentFragment: function() {
                        return g.EnvironmentFragment
                    },
                    EnvironmentShaderChunk: function() {
                        return g.EnvironmentShaderChunk
                    },
                    EnvironmentTexture: function() {
                        return v.rE
                    },
                    EnvironmentTextureMap: function() {
                        return v.H1
                    },
                    EventPool: function() {
                        return v.ID
                    },
                    Exposure: function() {
                        return g.Exposure
                    },
                    ExposureFragment: function() {
                        return g.ExposureFragment
                    },
                    ExposureVars: function() {
                        return g.ExposureVars
                    },
                    FADE_LAYER: function() {
                        return A.AR
                    },
                    FresnelShaderChunk: function() {
                        return g.FresnelShaderChunk
                    },
                    Geometries: function() {
                        return x.yw
                    },
                    HIDDEN_LAYER: function() {
                        return A.Q6
                    },
                    HotReload: function() {
                        return T.US
                    },
                    INITIAL_DATA: function() {
                        return v.iW
                    },
                    InjectableShaderChunk: function() {
                        return v.zd
                    },
                    InjectableShaderChunkInstructionTarget: function() {
                        return v.rP
                    },
                    InjectableShaderChunkInstructionType: function() {
                        return v.hl
                    },
                    InteractiveCamera: function() {
                        return y.InteractiveCamera
                    },
                    InteractiveCameraInterpolation: function() {
                        return y.InteractiveCameraInterpolation
                    },
                    InterpolationEnvironment: function() {
                        return y.InterpolationEnvironment
                    },
                    InterpolationEnvironmentEditor: function() {
                        return y.InterpolationEnvironmentEditor
                    },
                    Keyboard: function() {
                        return S.N1
                    },
                    Keyframe: function() {
                        return v.WK
                    },
                    KeyframeCamera: function() {
                        return y.KeyframeCamera
                    },
                    KeyframeCrossFadeEnvironment: function() {
                        return y.KeyframeCrossFadeEnvironment
                    },
                    KeyframeEnvironment: function() {
                        return y.KeyframeEnvironment
                    },
                    KeyframeFields: function() {
                        return v.lW
                    },
                    KeyframeObject: function() {
                        return y.KeyframeObject
                    },
                    KeyframeObjectFade: function() {
                        return y.KeyframeObjectFade
                    },
                    KeyframeTexturedAreaLight: function() {
                        return y.KeyframeTexturedAreaLight
                    },
                    KeyframeTimelineCamera: function() {
                        return y.KeyframeTimelineCamera
                    },
                    Keyframes: function() {
                        return T.E4
                    },
                    Layer: function() {
                        return v.mh
                    },
                    LayerComponent: function() {
                        return v.TT
                    },
                    LayerFile: function() {
                        return v.ex
                    },
                    LayerGroup: function() {
                        return v.pv
                    },
                    LayerMesh: function() {
                        return v.ZK
                    },
                    LightMapFragment: function() {
                        return g.LightMapFragment
                    },
                    LightMapParsFragment: function() {
                        return g.LightMapParsFragment
                    },
                    LightMapShaderChunk: function() {
                        return g.LightMapShaderChunk
                    },
                    Loader: function() {
                        return S.aN
                    },
                    Loop: function() {
                        return S.rN
                    },
                    Lotus: function() {
                        return V
                    },
                    NON_RENDERABLE_LAYER: function() {
                        return A.m1
                    },
                    Noise: function() {
                        return b.Noise
                    },
                    NoiseBackgroundShader: function() {
                        return b.NoiseBackgroundShader
                    },
                    ObjectFadeRenderTargetHandler: function() {
                        return v.$k
                    },
                    ObjectLoader: function() {
                        return T.Gq
                    },
                    ObjectLoaderManager: function() {
                        return T.Ie
                    },
                    OcularShaderChunk: function() {
                        return g.OcularShaderChunk
                    },
                    OutlineHandler: function() {
                        return v.LI
                    },
                    ParallaxMappingFragment: function() {
                        return g.ParallaxMappingFragment
                    },
                    ParallaxMappingFragmentFinal: function() {
                        return g.ParallaxMappingFragmentFinal
                    },
                    ParallaxMappingParsFragment: function() {
                        return g.ParallaxMappingParsFragment
                    },
                    ParallaxMappingShaderChunk: function() {
                        return g.ParallaxMappingShaderChunk
                    },
                    Plane: function() {
                        return M.Plane
                    },
                    Pointer: function() {
                        return S.gb
                    },
                    Range: function() {
                        return b.Range
                    },
                    RenderToTexture: function() {
                        return v.ez
                    },
                    Renderer: function() {
                        return v.Th
                    },
                    ScreenQuadFragment: function() {
                        return b.ScreenQuadFragment
                    },
                    ScreenQuadVertex: function() {
                        return b.ScreenQuadVertex
                    },
                    Scripts: function() {
                        return x.KC
                    },
                    Settings: function() {
                        return x.Zr
                    },
                    Shader: function() {
                        return v.yJ
                    },
                    ShaderFragment: function() {
                        return g.ShaderFragment
                    },
                    ShaderFragmentPars: function() {
                        return g.ShaderFragmentPars
                    },
                    ShaderVertexWorldPos: function() {
                        return g.ShaderVertexWorldPos
                    },
                    Shaders: function() {
                        return x.my
                    },
                    Sphere: function() {
                        return M.Sphere
                    },
                    States: function() {
                        return v.GC
                    },
                    THREE: function() {
                        return s
                    },
                    Tasks: function() {
                        return x.hS
                    },
                    Tetrahedron: function() {
                        return M.Tetrahedron
                    },
                    TextureDebugger: function() {
                        return T.F9
                    },
                    TextureFields: function() {
                        return T.x6
                    },
                    TextureLoaderManager: function() {
                        return T.GA
                    },
                    TexturedAreaLight: function() {
                        return v.on
                    },
                    TexturedAreaLightShaderChunk: function() {
                        return g.TexturedAreaLightShaderChunk
                    },
                    Timeline: function() {
                        return v.TY
                    },
                    TimelineEaseCurveType: function() {
                        return v.tl
                    },
                    TimelineEaseFunctionType: function() {
                        return v.aR
                    },
                    TimelineFields: function() {
                        return v.Ah
                    },
                    ToneMapShaderChunk: function() {
                        return g.ToneMapShaderChunk
                    },
                    Transform: function() {
                        return v.wx
                    },
                    TransparencyShaderChunk: function() {
                        return g.TransparencyShaderChunk
                    },
                    UVTestShader: function() {
                        return b.UVTestShader
                    },
                    Viewport: function() {
                        return S.l_
                    },
                    WaitList: function() {
                        return T.q_
                    },
                    WaitListItem: function() {
                        return T.CL
                    },
                    instance: function() {
                        return R
                    }
                });
                var i = n(308)
                  , a = n.n(i)
                  , s = n(4468)
                  , r = (n(7581),
                n(7260),
                n(6719))
                  , o = n(1987)
                  , l = n(4104)
                  , h = n(132)
                  , c = n(4282)
                  , d = n(994)
                  , u = n(9721)
                  , p = n(4796)
                  , m = n(6790)
                  , f = n(4889)
                  , _ = n(660)
                  , g = n(6143)
                  , v = n(2060)
                  , y = n(1887)
                  , M = n(1902)
                  , S = n(6544)
                  , x = n(7335)
                  , b = n(4103)
                  , T = n(8925)
                  , C = n(1968)
                  , E = {};
                for (var w in C)
                    ["default", "Lotus", "instance", "THREE", "AdditionalBrightnessShaderChunk", "AdditionalBrightnessShaderChunkFragment", "AdditionalBrightnessShaderChunkVars", "AdditionalExposureShaderChunk", "AdditionalExposureShaderChunkFragment", "AdditionalExposureShaderChunkVars", "AdditionalGammaShaderChunk", "AdditionalGammaShaderChunkFragment", "AdditionalGammaShaderChunkVars", "AdditionalSaturationShaderChunk", "AdditionalSaturationShaderChunkFragment", "AdditionalSaturationShaderChunkVars", "AlphaMapParsShaderChunkFragment", "AlphaMapShaderChunk", "AlphaMapShaderChunkFragment", "AoChannelMixerShaderChunk", "AoMapFragment", "AoMapFragmentParameters", "BlendModeShaderChunk", "ColorAdjustmentShaderChunk", "CrossFadeEnvironmentFragment", "CrossFadeEnvironmentShaderChunk", "CustomLightsFragmentBegin", "CustomLightsPhysicalParsFragment", "CustomUVParsFragment", "CustomUVParsVertex", "CustomUVVertex", "DepthModeShaderChunk", "EnvironmentFragment", "EnvironmentShaderChunk", "Exposure", "ExposureFragment", "ExposureVars", "FresnelShaderChunk", "LightMapFragment", "LightMapParsFragment", "LightMapShaderChunk", "OcularShaderChunk", "ParallaxMappingFragment", "ParallaxMappingFragmentFinal", "ParallaxMappingParsFragment", "ParallaxMappingShaderChunk", "ShaderFragment", "ShaderFragmentPars", "ShaderVertexWorldPos", "TexturedAreaLightShaderChunk", "ToneMapShaderChunk", "TransparencyShaderChunk", "Animation", "AnimationActionExtended", "AnimationClipExtended", "Animations", "AppState", "AppStateBinding", "Controls", "CrossFadeTexture", "CustomScene", "Debug", "EnvironmentBackground", "EnvironmentTexture", "EnvironmentTextureMap", "EventPool", "INITIAL_DATA", "InjectableShaderChunk", "InjectableShaderChunkInstructionTarget", "InjectableShaderChunkInstructionType", "Keyframe", "KeyframeFields", "Layer", "LayerComponent", "LayerFile", "LayerGroup", "LayerMesh", "ObjectFadeRenderTargetHandler", "OutlineHandler", "RenderToTexture", "Renderer", "Shader", "States", "TexturedAreaLight", "Timeline", "TimelineEaseCurveType", "TimelineEaseFunctionType", "TimelineFields", "Transform", "AmbientLight", "AnimatedCamera", "InteractiveCamera", "InteractiveCameraInterpolation", "InterpolationEnvironment", "InterpolationEnvironmentEditor", "KeyframeCamera", "KeyframeCrossFadeEnvironment", "KeyframeEnvironment", "KeyframeObject", "KeyframeObjectFade", "KeyframeTexturedAreaLight", "KeyframeTimelineCamera", "Box", "Plane", "Sphere", "Tetrahedron", "Keyboard", "Loader", "Loop", "Pointer", "Viewport", "Chunks", "Geometries", "Scripts", "Settings", "Shaders", "Tasks", "ColorShader", "CrossFadeRenderTargetsFragment", "Noise", "NoiseBackgroundShader", "Range", "ScreenQuadFragment", "ScreenQuadVertex", "UVTestShader", "AssetLibrary", "HotReload", "Keyframes", "ObjectLoader", "ObjectLoaderManager", "TextureDebugger", "TextureFields", "TextureLoaderManager", "WaitList", "WaitListItem"].indexOf(w) < 0 && (E[w] = function(e) {
                        return C[e]
                    }
                    .bind(0, w));
                n.d(t, E);
                var A = n(1536);
                class L extends s.EventDispatcher {
                    settings = c.Z;
                    chunks = new u.S;
                    geometries = new p.y;
                    scripts = new m.K;
                    shaders = new f.m;
                    tasks = new _.h;
                    dispatch = a();
                    IS_HOT_RELOADING = !1;
                    scene;
                    sceneReady = Promise.create();
                    async createEditor({dispatch: e, element: t, scene: n}) {
                        if (await this.ready,
                        this.dispatch = e,
                        this.scene) {
                            const e = this.scene;
                            l.B.remove(this._scenes, e),
                            await e.destroy()
                        }
                        if (n) {
                            const e = await this.createScene({
                                element: t,
                                id: n
                            });
                            e && (this.scene = e,
                            this.sceneReady.resolve())
                        }
                    }
                    _scenes = [];
                    _scenesClasses = new Map;
                    _scenesData = new Map;
                    async createScene({element: e, id: t}) {
                        await this.ready;
                        const n = this._scenesData.get(t);
                        if (this.renderer)
                            this.renderer.initialize();
                        else if (!this.createRenderer(n)) {
                            const e = "This browser doesn't support WebGL 2.";
                            return this.dispatchEvent({
                                message: e,
                                type: "unsupported"
                            }),
                            console.warn(e)
                        }
                        const i = {
                            data: n,
                            element: e,
                            id: t,
                            renderer: this.renderer
                        };
                        let a;
                        try {
                            a = new (this._scenesClasses.get(t))(i)
                        } catch (e) {
                            console.error(e),
                            console.warn(`'${t}' custom scene not found in Lotus.instance().initialize(), falling back to default 'CustomScene' class.`),
                            a = new r.c(i)
                        }
                        return this._scenes.push(a),
                        this.scene = a,
                        a
                    }
                    AnimSystem;
                    ReactRoot;
                    EditorRef;
                    createDependencies(e) {
                        Object.entries(e).forEach((([e,t])=>{
                            this[e] = t
                        }
                        ))
                    }
                    createTHREE() {
                        s.DefaultLoadingManager.onError = ()=>{
                            this.dispatchEvent({
                                message: "There was an error initializing an asset from your Lotus scene.",
                                type: "error"
                            })
                        }
                    }
                    renderer;
                    createRenderer(e) {
                        const t = e?.renderer ?? r.i.renderer;
                        return this.renderer = new o.T(t),
                        h.I.initialize(),
                        this.renderer.capabilities.isWebGL2
                    }
                    onSceneChange(e) {
                        e && this.scene?.onDataChange(e)
                    }
                    onCurrentLayerChange(e) {
                        this.scene?.onCurrentLayerChange?.(e)
                    }
                    ready = Promise.create();
                    async initialize({dependencies: e, paths: t, scenesClasses: n, scenesData: i}) {
                        if (this.chunks.isInitialized || this.chunks.initialize(),
                        this.geometries.isInitialized || this.geometries.initialize(),
                        this.scripts.isInitialized || this.scripts.initialize(),
                        this.shaders.isInitialized || this.shaders.initialize(),
                        !this.settings.isInitialized)
                            return console.warn("\n        Make sure you're initializing Settings using\n        Lotus.instance().settings.initialize();\n      ");
                        if (await this.settings.ready,
                        !this.settings.isSupported()) {
                            const e = "Lotus is not supported in this browser or device.";
                            return this.dispatchEvent({
                                message: e,
                                type: "unsupported"
                            }),
                            console.warn(e)
                        }
                        this.createDependencies(e),
                        this.createTHREE(),
                        d.f.initialize(t),
                        this._scenesClasses = n,
                        this._scenesData = i,
                        this.ready.resolve()
                    }
                    tryRequestAnimationFrame(e) {
                        this.scene?.loop?.tryRequestAnimationFrame()
                    }
                    cancelAnimationFrame() {
                        this.scene?.loop?.cancelAnimationFrame()
                    }
                }
                const V = new L
                  , R = ()=>V
            },
            9721: function(e, t, n) {
                "use strict";
                n.d(t, {
                    S: function() {
                        return a
                    }
                });
                var i = n(6143);
                class a {
                    _isInitialized = !1;
                    get isInitialized() {
                        return this._isInitialized
                    }
                    _entries = new Map;
                    get entries() {
                        return this._entries
                    }
                    initialize(e) {
                        for (const [e,t] of Object.entries(i))
                            "function" == typeof t && this._entries.set(e, t);
                        if (e)
                            for (const [t,n] of Object.entries(e))
                                this._entries.set(t, n);
                        this._isInitialized = !0
                    }
                    get(e) {
                        return this._entries.get(e)
                    }
                }
            },
            4796: function(e, t, n) {
                "use strict";
                n.d(t, {
                    y: function() {
                        return a
                    }
                });
                var i = n(1902);
                class a {
                    _isInitialized = !1;
                    get isInitialized() {
                        return this._isInitialized
                    }
                    _entries = new Map;
                    get entries() {
                        return this._entries
                    }
                    initialize(e) {
                        for (const [e,t] of Object.entries(i))
                            this._entries.set(e, t);
                        if (e)
                            for (const [t,n] of Object.entries(e))
                                this._entries.set(t, n);
                        this._isInitialized = !0
                    }
                    get(e) {
                        return this._entries.get(e)
                    }
                }
            },
            6790: function(e, t, n) {
                "use strict";
                n.d(t, {
                    K: function() {
                        return a
                    }
                });
                var i = n(1887);
                class a {
                    _isInitialized = !1;
                    get isInitialized() {
                        return this._isInitialized
                    }
                    _entries = new Map;
                    get entries() {
                        return this._entries
                    }
                    initialize(e) {
                        for (const [e,t] of Object.entries(i))
                            "function" == typeof t && this._entries.set(e, t);
                        if (e)
                            for (const [t,n] of Object.entries(e))
                                this._entries.set(t, n);
                        this._isInitialized = !0
                    }
                    get(e) {
                        return this._entries.get(e)
                    }
                }
            },
            4282: function(e, t, n) {
                "use strict";
                n.d(t, {
                    Z: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(6925)
                  , s = n(149);
                const r = new class {
                    ready = Promise.create();
                    _featureDetect;
                    _userAgent;
                    _isInitialized = !1;
                    get isInitialized() {
                        return this._isInitialized
                    }
                    initialize(e) {
                        this._featureDetect = e.FeatureDetect,
                        this._userAgent = e.UserAgent,
                        this.ready.resolve(),
                        this._isInitialized = !0
                    }
                    isPhoneBreakpoint() {
                        return window.innerWidth <= 884
                    }
                    isTabletBreakpoint() {
                        return window.innerWidth <= 1440
                    }
                    isIPhoneBreakpoint() {
                        return this._featureDetect.touchAvailable() && this.isPhoneBreakpoint()
                    }
                    isIPadBreakpoint() {
                        return this._featureDetect.touchAvailable() && this.isTabletBreakpoint()
                    }
                    _gltfTextureTasks = !1;
                    get gltfTextureTasks() {
                        return this._gltfTextureTasks
                    }
                    set gltfTextureTasks(e) {
                        this._gltfTextureTasks = e
                    }
                    gltfTextureTasksTest() {
                        return !!s.D.get("gltfTextureTasks") || this._gltfTextureTasks
                    }
                    transmissionMapSizeTest(e=1024) {
                        const t = s.D.get("transmissionMapSize");
                        return t ? this._pmremGenerator.CubeFaceSize[t] : e
                    }
                    _pmremGenerator = i.PMREMGenerator;
                    _pmremCubeFaceSizeLimit = 1024;
                    get pmremCubeFaceSizeLimit() {
                        return this._pmremCubeFaceSizeLimit
                    }
                    set pmremCubeFaceSizeLimit(e) {
                        this._pmremCubeFaceSizeLimit = e
                    }
                    pmremCubeFaceSizeTest() {
                        const e = s.D.get("pmremCubeFaceSize");
                        if (e)
                            return this._pmremGenerator.CubeFaceSize[e];
                        if (this.isIPhoneBreakpoint()) {
                            const e = Math.min(this._pmremCubeFaceSizeLimit, 128);
                            return this._pmremGenerator.CubeFaceSize[e]
                        }
                        if (this.isIPadBreakpoint()) {
                            const e = Math.min(this._pmremCubeFaceSizeLimit, 256);
                            return this._pmremGenerator.CubeFaceSize[e]
                        }
                        if (this.isPhoneBreakpoint()) {
                            const e = Math.min(this._pmremCubeFaceSizeLimit, a.M.nextPow2(1024, -2));
                            return this._pmremGenerator.CubeFaceSize[e]
                        }
                        if (this.isTabletBreakpoint()) {
                            const e = Math.min(this._pmremCubeFaceSizeLimit, a.M.nextPow2(1024, -1));
                            return this._pmremGenerator.CubeFaceSize[e]
                        }
                        const t = Math.min(this._pmremCubeFaceSizeLimit, 1024);
                        return this._pmremGenerator.CubeFaceSize[t]
                    }
                    getResolutionGroup() {
                        const e = (e,t,n)=>e >= t && e <= n
                          , t = window.outerHeight
                          , n = window.outerWidth;
                        return e(n, 834, 1024) && e(t, 1194, 1366) || e(t, 834, 1024) && e(n, 1194, 1366) ? {
                            group: "a",
                            type: "tablet"
                        } : e(n, 810, 820) && e(t, 1080, 1180) || e(t, 810, 820) && e(n, 1080, 1180) ? {
                            group: "b",
                            type: "tablet"
                        } : e(n, 744, 768) && e(t, 1024, 1133) || e(t, 744, 768) && e(n, 1024, 1133) ? {
                            group: "c",
                            type: "tablet"
                        } : e(n, 393, 430) && e(t, 852, 932) || e(t, 393, 430) && e(n, 852, 932) ? {
                            group: "a",
                            type: "phone"
                        } : 390 === n && 844 === t || 390 === t && 844 === n ? {
                            group: "b",
                            type: "phone"
                        } : 414 === n && 896 === t || 414 === t && 896 === n ? {
                            group: "c",
                            type: "phone"
                        } : 375 === n && 812 === t || 375 === t && 812 === n ? {
                            group: "d",
                            type: "phone"
                        } : 414 === n && 736 === t || 414 === t && 736 === n ? {
                            group: "e",
                            type: "phone"
                        } : 375 === n && 667 === t || 375 === t && 667 === n ? {
                            group: "f",
                            type: "phone"
                        } : {
                            group: "s",
                            type: "unknown"
                        }
                    }
                    dprTest(e=window.devicePixelRatio) {
                        const t = s.D.get("dpr");
                        return t ? Number(t) : (this._featureDetect.touchAvailable(),
                        e)
                    }
                    rtSamplesTest() {
                        const e = s.D.get("rtSamples");
                        return e ? Number(e) : 4
                    }
                    dataTextureBufferTest(e) {
                        return this.isFirefox() ? new Float32Array(e) : new Uint16Array(e)
                    }
                    dataTextureTypeTest() {
                        return this.isFirefox() ? i.FloatType : i.HalfFloatType
                    }
                    isSupported() {
                        if (!this._userAgent)
                            return;
                        const {browser: e} = this._userAgent
                          , {safari: t, version: n} = e
                          , i = t && 15 === n.major && 4 === n.minor
                          , a = t && 16 === n.major && 4 === n.minor;
                        return !i && !a
                    }
                    isIOS164() {
                        if (!this._userAgent)
                            return;
                        const {browser: e, os: t} = this._userAgent
                          , {version: n} = e;
                        return t.ios && 16 === n.major && 4 === n.minor
                    }
                    isFirefox() {
                        if (!this._userAgent)
                            return;
                        const {browser: e} = this._userAgent;
                        return e.firefox
                    }
                }
            },
            4889: function(e, t, n) {
                "use strict";
                n.d(t, {
                    m: function() {
                        return a
                    }
                });
                var i = n(4103);
                class a {
                    _isInitialized = !1;
                    get isInitialized() {
                        return this._isInitialized
                    }
                    _entries = new Map;
                    get entries() {
                        return this._entries
                    }
                    initialize(e) {
                        for (const [e,t] of Object.entries(i))
                            "function" == typeof t && this._entries.set(e, t);
                        if (e)
                            for (const [t,n] of Object.entries(e))
                                this._entries.set(t, n);
                        this._isInitialized = !0
                    }
                    get(e) {
                        return this._entries.get(e)
                    }
                }
            },
            660: function(e, t, n) {
                "use strict";
                n.d(t, {
                    h: function() {
                        return o
                    }
                });
                var i = n(9653)
                  , a = n(4104)
                  , s = n(3395)
                  , r = n(149);
                class o {
                    ready = Promise.create();
                    constructor() {
                        r.D.get("tasksThreshold") && (this._frameThreshold = parseInt(r.D.get("tasksThreshold")))
                    }
                    get length() {
                        return this._tasks.length
                    }
                    _tasks = [];
                    get tasks() {
                        return this._tasks
                    }
                    add(e, t) {
                        return Array.isArray(e) ? e.map((e=>this.create(e, t))) : this.create(e, t)
                    }
                    create(e, t) {
                        const n = Promise.create()
                          , i = {
                            onTaskResolve: ()=>{
                                const t = e();
                                n.resolve(t)
                            }
                            ,
                            onTaskCancel: ()=>{
                                n.reject()
                            }
                            ,
                            promise: n,
                            type: t,
                            cancel: ()=>this.remove(i)
                        };
                        return this._tasks.push(i),
                        i
                    }
                    resolve(e) {
                        i.Lotus.scene?.dispatchEvent?.({
                            message: "Running Task",
                            type: "debug"
                        }),
                        e.onTaskResolve(),
                        this.remove(e)
                    }
                    remove(e) {
                        a.B.remove(this._tasks, e),
                        s.H.destroy(e),
                        i.Lotus.scene.isSceneCompiled && 0 === this._tasks.length && (i.Lotus.tryRequestAnimationFrame(),
                        window.requestAnimationFrame((()=>{
                            this.ready.resolve()
                        }
                        )))
                    }
                    _frame = 0;
                    _frameThreshold = 1;
                    onFrame() {
                        i.Lotus.IS_HOT_RELOADING && this._tasks.forEach((e=>this.resolve(e))),
                        this._frame += 1,
                        this._tasks.length && this._frame % this._frameThreshold == 0 && this.resolve(this._tasks[0])
                    }
                    destroy() {
                        s.H.destroy(this)
                    }
                }
            },
            7335: function(e, t, n) {
                "use strict";
                n.d(t, {
                    KC: function() {
                        return s.K
                    },
                    So: function() {
                        return i.S
                    },
                    Zr: function() {
                        return r.Z
                    },
                    hS: function() {
                        return l.h
                    },
                    my: function() {
                        return o.m
                    },
                    yw: function() {
                        return a.y
                    }
                });
                var i = n(9721)
                  , a = n(4796)
                  , s = n(6790)
                  , r = n(4282)
                  , o = n(4889)
                  , l = n(660)
            },
            7581: function() {
                "use strict";
                Promise.create = ()=>{
                    let e, t;
                    const n = new Promise(((n,i)=>{
                        e = n,
                        t = i
                    }
                    ));
                    return n.resolve = e,
                    n.reject = t,
                    n
                }
            },
            306: function(e, t, n) {
                "use strict";
                n.d(t, {
                    a: function() {
                        return i
                    }
                });
                const i = {
                    ADD_GROUP: "ADD_GROUP",
                    ADD_LAYER: "ADD_LAYER",
                    REMOVE_LAYER: "REMOVE_LAYER",
                    SET_LAYER: "SET_LAYER",
                    SET_LAYER_VALUE: "SET_LAYER_VALUE",
                    SET_LAYER_VALUES: "SET_LAYER_VALUES",
                    SET_LAYER_FROM_UI: "SET_LAYER_FROM_UI",
                    REORDER_LAYER: "REORDER_LAYER",
                    SET_SCENE: "SET_SCENE",
                    SAVE_SCENE: "SAVE_SCENE",
                    DOWNLOAD_SCENE: "DOWNLOAD_SCENE",
                    DELETE_SCENE: "DELETE_SCENE",
                    FORCE_UPDATE: "FORCE_UPDATE",
                    IMPORT: "IMPORT",
                    SET_STATE: "SET_STATE"
                }
            },
            4103: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    ColorShader: function() {
                        return s
                    },
                    CrossFadeRenderTargetsFragment: function() {
                        return h
                    },
                    Noise: function() {
                        return u
                    },
                    NoiseBackgroundShader: function() {
                        return r
                    },
                    Range: function() {
                        return p
                    },
                    ScreenQuadFragment: function() {
                        return c
                    },
                    ScreenQuadVertex: function() {
                        return d
                    },
                    UVTestShader: function() {
                        return l
                    }
                });
                var i = n(4468)
                  , a = n(5636);
                class s extends a.e {
                    static fields = {
                        uColor: {
                            defaultValue: [0, 0, 0],
                            isVariant: !0,
                            type: "Vector"
                        },
                        uAlpha: {
                            defaultValue: 1,
                            isVariant: !0,
                            max: 1,
                            min: 0,
                            type: "Slider"
                        }
                    };
                    constructor({fields: e, name: t="ColorShader", scene: a}) {
                        const r = n(8168)
                          , o = n(6351)
                          , l = {
                            uColor: {
                                value: e.uColor ?? s.fields.uColor.defaultValue
                            },
                            uAlpha: {
                                value: e.uAlpha ?? s.fields.uAlpha.defaultValue
                            }
                        };
                        super({
                            fields: e,
                            fragmentShader: r,
                            name: t,
                            scene: a,
                            uniforms: {
                                uColor: {
                                    value: new i.Color(l.uColor.value)
                                },
                                uAlpha: {
                                    value: l.uAlpha.value
                                }
                            },
                            vertexShader: o
                        }),
                        Object.defineProperty(this, "opacity", {
                            get: function() {
                                return this.uniforms?.uAlpha?.value ?? 0
                            },
                            set: function(e) {
                                this.uniforms.uAlpha.value = e
                            }
                        }),
                        this.transparent = !0
                    }
                }
                class r extends a.e {
                    static fields = {
                        uPrimaryColor: {
                            defaultValue: "#000000",
                            isVariant: !0,
                            type: "Color"
                        },
                        uSecondaryColor: {
                            defaultValue: "#ff00ff",
                            isVariant: !0,
                            type: "Color"
                        },
                        uMultiplier: {
                            defaultValue: [1, 1, 1],
                            isVariant: !0,
                            type: "Vector"
                        },
                        uVelocity: {
                            defaultValue: .1,
                            isVariant: !0,
                            min: 0,
                            max: 1,
                            step: .01,
                            type: "Slider"
                        }
                    };
                    constructor({fields: e, name: t="NoiseBackgroundShader", scene: a}) {
                        const s = n(4511)
                          , o = n(6586)
                          , l = {
                            uPrimaryColor: {
                                value: e.uPrimaryColor ?? r.fields.uPrimaryColor.defaultValue
                            },
                            uSecondaryColor: {
                                value: e.uSecondaryColor ?? r.fields.uSecondaryColor.defaultValue
                            },
                            uMultiplier: {
                                value: e.uMultiplier ?? r.fields.uMultiplier.defaultValue
                            },
                            uVelocity: {
                                value: e.uVelocity ?? r.fields.uVelocity.defaultValue
                            }
                        };
                        super({
                            fields: e,
                            fragmentShader: s,
                            name: t,
                            scene: a,
                            uniforms: {
                                uPrimaryColor: {
                                    value: new i.Color(l.uPrimaryColor.value)
                                },
                                uSecondaryColor: {
                                    value: new i.Color(l.uSecondaryColor.value)
                                },
                                uMultiplier: {
                                    value: l.uMultiplier.value
                                },
                                uTime: {
                                    value: 0
                                },
                                uVelocity: {
                                    value: l.uVelocity.value
                                }
                            },
                            vertexShader: o
                        })
                    }
                    onLoop() {
                        this.uniforms && (this.uniforms.uTime.value += .001)
                    }
                }
                var o = n(927);
                class l extends a.e {
                    constructor({fields: e, name: t="UVTestShader", scene: i}) {
                        super({
                            fields: e,
                            fragmentShader: n(3839),
                            name: t,
                            scene: i,
                            uniforms: {
                                tMap: {
                                    value: null
                                }
                            },
                            vertexShader: n(5398)
                        }),
                        o.G.load("/shared/uv.png").then((e=>{
                            this.uniforms && (this.uniforms.tMap.value = e)
                        }
                        ))
                    }
                    onStateChange() {}
                    onDataChange() {}
                }
                const h = n(3763)
                  , c = n(4182)
                  , d = n(8469)
                  , u = n(1363)
                  , p = n(2901)
            },
            6816: function(e, t, n) {
                "use strict";
                n.d(t, {
                    j: function() {
                        return u
                    }
                });
                var i = n(4468)
                  , a = n(9653)
                  , s = n(132)
                  , r = n(927)
                  , o = n(6060)
                  , l = n(994)
                  , h = n(2410)
                  , c = n.n(h);
                class d extends i.EventDispatcher {
                    _assets = new Map;
                    get assets() {
                        return this._assets
                    }
                    add({asset: e, src: t, type: n}) {
                        o.h.IS_DEVELOPMENT && (t = t.split("?")[0]);
                        const i = {
                            asset: e,
                            src: t,
                            type: n
                        };
                        this._assets.set(t, i),
                        this.dispatchEvent({
                            asset: i,
                            assets: this._assets,
                            type: "load"
                        })
                    }
                    async get(e, t) {
                        const n = l.f.get("assets", e)
                          , i = this._assets.get(n);
                        if (a.Lotus.IS_HOT_RELOADING) {
                            let n;
                            if (c().TEXTURES.test(e))
                                n = await r.G.load(e, t);
                            else if (c().IMAGES.test(e)) {
                                const e = document.createElement("img");
                                e.src = `${i.src}?${+new Date}`,
                                e.onload = ()=>{
                                    i.asset.image = e,
                                    i.asset.needsUpdate = !0
                                }
                                ,
                                n = i.asset
                            } else
                                n = await s.I.load(e, t);
                            return n
                        }
                        return i ? i.asset : c().OBJECTS.test(e) ? await s.I.load(e, t) : c().IMAGES.test(e) ? await r.G.load(e, t) : null
                    }
                    clear() {
                        this._assets.clear()
                    }
                }
                const u = new d
            },
            8626: function(e, t, n) {
                "use strict";
                n.d(t, {
                    U: function() {
                        return r
                    }
                });
                var i = n(928)
                  , a = n.n(i)
                  , s = n(9653);
                class r {
                    static initialize() {
                        const e = new WebSocket("ws://localhost:4041");
                        let t, n = !1;
                        s.Lotus.scene?.ready.then((()=>{
                            setTimeout((()=>{
                                n = !0
                            }
                            ), 5e3)
                        }
                        )),
                        e.onopen = i=>{
                            e.onmessage = ({data: e})=>{
                                if (!n)
                                    return;
                                const i = JSON.parse(e);
                                "uploads" === i.event && (s.Lotus.IS_HOT_RELOADING = !0,
                                s.Lotus.scene?.eventPool.trigger({
                                    name: "hotReload"
                                }, i),
                                clearTimeout(t),
                                t = setTimeout((()=>{
                                    s.Lotus.IS_HOT_RELOADING = !1,
                                    s.Lotus.tryRequestAnimationFrame()
                                }
                                ), 1e3))
                            }
                            ,
                            e.onclose = e=>{}
                        }
                    }
                    static checkFilePath = (e,t)=>{
                        const n = a()(t?.split?.("/"));
                        return e?.includes?.(n) ?? e
                    }
                    ;
                    static parseGLTFTextures = async(e,t)=>{
                        const n = Promise.create();
                        let i = !1;
                        const r = e?.parser?.textureCache
                          , o = a()(t?.split?.("/")) ?? !1;
                        if (r && o) {
                            const e = Object.values(r).map((e=>e))
                              , n = (await Promise.all(e)).filter((e=>o.includes(e.name))).map((e=>{
                                const n = Promise.create()
                                  , a = document.createElement("img");
                                return a.src = `/assets/${t.split("/assets/")[1]}?${+new Date}`,
                                a.onload = ()=>{
                                    e.image = a,
                                    e.needsUpdate = !0,
                                    i = !0,
                                    n.resolve(!0),
                                    s.Lotus.tryRequestAnimationFrame()
                                }
                                ,
                                n
                            }
                            ));
                            await Promise.all(n)
                        }
                        return n.resolve(i),
                        n
                    }
                    ;
                    static refreshGLTFTextures = async e=>{
                        const t = e?.parser?.textureCache;
                        if (t) {
                            const e = Object.values(t).map((e=>e));
                            (await Promise.all(e)).forEach((e=>{
                                const t = document.createElement("img");
                                t.src = `${e.source.data.src}?${+new Date}`,
                                t.onload = ()=>{
                                    e.image = t,
                                    e.needsUpdate = !0,
                                    s.Lotus.tryRequestAnimationFrame()
                                }
                            }
                            ))
                        }
                    }
                }
            },
            5070: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.d(__webpack_exports__, {
                    E: function() {
                        return Keyframes
                    }
                });
                var lodash_has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8721)
                  , lodash_has__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_0__)
                  , lodash_last__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(928)
                  , lodash_last__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(lodash_last__WEBPACK_IMPORTED_MODULE_1__)
                  , three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4468)
                  , lotus_singletons_AssetLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6816);
                class KeyframesManager {
                    findAnimation({keyframes: e, category: t, currentState: n, previousState: i}) {
                        const a = `${n}`
                          , s = `${i}_${a}`
                          , r = `${t}:${a}`
                          , o = `${t}:${s}`
                          , l = e.get(a)
                          , h = e.get(s)
                          , c = e.get(r);
                        return e.get(o) || c || h || l
                    }
                    convertValue(e, t) {
                        if ("rotationOrder" === e)
                            switch (t) {
                            case "XYZ":
                                t = "ZYX";
                                break;
                            case "YZX":
                                t = "XZY";
                                break;
                            case "ZXY":
                                t = "YXZ"
                            }
                        return ["rotationX", "rotationY", "rotationZ"].includes(e) && (t = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.degToRad(t)),
                        t
                    }
                    parseJSON({json: e, options: t}) {
                        if (!e)
                            return;
                        const n = {};
                        Object.entries(e).forEach((([e,i])=>{
                            n[e] || (n[e] = {}),
                            Object.entries(i).forEach((([i,a])=>{
                                n[e][i] || (n[e][i] = {}),
                                Object.entries(a).forEach((([a,s])=>{
                                    n[e][i][a] || (n[e][i][a] = {}),
                                    Object.entries(s).forEach((([s,r])=>{
                                        let o;
                                        if ("string" == typeof r)
                                            ;
                                        else if (Array.isArray(r))
                                            o = r.map((e=>{
                                                let {start: t, end: n, startValue: i, endValue: a, easeFunction: r} = e;
                                                return i = this.convertValue(s, i),
                                                a = this.convertValue(s, a),
                                                r = "string" == typeof r ? `${r}` : `cubic-bezier(${r.join(",")})`,
                                                {
                                                    easeFunction: r,
                                                    end: n,
                                                    endValue: a,
                                                    start: t,
                                                    startValue: i
                                                }
                                            }
                                            )),
                                            r = lodash_last__WEBPACK_IMPORTED_MODULE_1___default()(r).endValue;
                                        else if (r === Number(r)) {
                                            const e = t?.defaultEasing ?? [.3333, 0, .6666, 1]
                                              , n = this.convertValue(s, r)
                                              , i = this.convertValue(s, r);
                                            o = [{
                                                easeFunction: `cubic-bezier(${e.join(",")})`,
                                                end: t?.defaultEnd ?? 2,
                                                endValue: i,
                                                start: t?.defaultStart ?? 0,
                                                startValue: n
                                            }]
                                        }
                                        r = this.convertValue(s, r),
                                        n[e][i][a][s] = {
                                            keyframes: o,
                                            value: r
                                        }
                                    }
                                    ))
                                }
                                ))
                            }
                            ))
                        }
                        ));
                        const i = new Map;
                        return Object.entries(n).forEach((([e,t])=>{
                            i.set(e, t)
                        }
                        )),
                        i
                    }
                    generateAnimationMap(e, t) {
                        return this.parseJSON({
                            json: e,
                            options: t
                        })
                    }
                    findMaterialTarget(e, t) {
                        let n;
                        return e.traverse?.((e=>{
                            if (e.isMesh) {
                                const i = e.material;
                                i.name === t && (n = i)
                            }
                        }
                        )),
                        n
                    }
                    findNodeTarget(e, t) {
                        t = t.replace(":", "");
                        let n = e.getObjectByName(t);
                        return n || (n = e.getObjectByName(t.replace("Xform", ""))),
                        n
                    }
                    checkRGBXYZ(e) {
                        const t = ["X", "Y", "Z"].some((t=>e.endsWith(t)))
                          , n = ["R", "G", "B"].some((t=>e.endsWith(t)));
                        return !e.includes("flip") && (t || n)
                    }
                    setNodeValue(e, t, n) {
                        if (null != n)
                            if (Keyframes.checkRGBXYZ(t)) {
                                const i = t.slice(0, -1)
                                  , a = lodash_last__WEBPACK_IMPORTED_MODULE_1___default()(t).toLowerCase();
                                e[i][a] = n
                            } else
                                "rotationOrder" === t ? e.rotation.reorder(n) : e[t] = n
                    }
                    async setMaterialValue(material, property, value) {
                        if (null != value)
                            if (Keyframes.checkRGBXYZ(property)) {
                                const e = property.slice(0, -1)
                                  , t = lodash_last__WEBPACK_IMPORTED_MODULE_1___default()(property).toLowerCase();
                                lodash_has__WEBPACK_IMPORTED_MODULE_0___default()(material, e) && (material[e][t] = value)
                            } else if (property.toLowerCase().includes("map"))
                                if (property.includes(".")) {
                                    const dotIndex = property.indexOf(".")
                                      , baseProperty = property.slice(0, dotIndex)
                                      , secondProperty = property.slice(dotIndex + 1, property.length);
                                    material[baseProperty][secondProperty] = eval(value)
                                } else {
                                    const e = await lotus_singletons_AssetLibrary__WEBPACK_IMPORTED_MODULE_2__.j.get(value);
                                    material[property] && (e.anisotropy = material[property].anisotropy,
                                    e.colorSpace = material[property].colorSpace,
                                    e.flipY = material[property].flipY),
                                    e.needsUpdate = !0,
                                    material[property] = e
                                }
                            else
                                material[property] = value
                    }
                    setMaterialsValues(e, t) {
                        t && Object.entries(t.materials).forEach((t=>{
                            const [n,i] = t
                              , a = Keyframes.findMaterialTarget(e, n);
                            a && Object.entries(i).forEach((e=>{
                                const [t,{value: n}] = e;
                                Keyframes.setMaterialValue(a, t, n)
                            }
                            ))
                        }
                        ))
                    }
                    setNodesValues(e, t) {
                        t && Object.entries(t.nodes).forEach((t=>{
                            const [n,i] = t
                              , a = Keyframes.findNodeTarget(e, n);
                            a && Object.entries(i).forEach((e=>{
                                const [t,{value: n}] = e;
                                Keyframes.setNodeValue(a, t, n)
                            }
                            ))
                        }
                        ))
                    }
                    setupTimeline({animation: e, element: t, timeline: n}) {
                        e && (e.components && Object.entries(e.components).forEach((e=>{
                            this.animateComponent({
                                element: t,
                                entry: e,
                                timeline: n,
                                isSkippable: !1
                            })
                        }
                        )),
                        e.materials && Object.entries(e.materials).forEach((e=>{
                            this.animateMaterial({
                                element: t,
                                entry: e,
                                timeline: n,
                                isSkippable: !1
                            })
                        }
                        )),
                        e.nodes && Object.entries(e.nodes).forEach((e=>{
                            this.animateNode({
                                element: t,
                                entry: e,
                                timeline: n,
                                isSkippable: !1
                            })
                        }
                        )))
                    }
                    cache = new Map;
                    helpers = new Map;
                    setupTransition({animation: e, element: t, layer: n, timeline: i}) {
                        const a = {
                            value: 0
                        };
                        if (i.addKeyframe(a, {
                            start: 0,
                            end: 2,
                            value: [0, 1]
                        }),
                        e.components && Object.entries(e.components).forEach((e=>{
                            this.animateComponent({
                                element: t,
                                entry: e,
                                timeline: i,
                                isSkippable: !0
                            })
                        }
                        )),
                        e.materials && Object.entries(e.materials).forEach((e=>{
                            this.animateMaterial({
                                element: t,
                                entry: e,
                                timeline: i,
                                isSkippable: !0
                            })
                        }
                        )),
                        e.nodes) {
                            const s = this.cache.get(n.name) ?? t.clone(!0)
                              , r = this.helpers.get(n.name) ?? t.clone(!0);
                            this.cache.has(n.name) || this.cache.set(n.name, s),
                            this.helpers.has(n.name) || this.helpers.set(n.name, r),
                            Keyframes.setNodesValues(r, e),
                            Object.entries(e.nodes).forEach((([e,n])=>{
                                const o = Keyframes.findNodeTarget(s, e)
                                  , l = Keyframes.findNodeTarget(r, e)
                                  , h = Keyframes.findNodeTarget(t, e);
                                o && l && (o.position.copy(h.position),
                                o.quaternion.copy(h.quaternion),
                                o.scale.copy(h.scale),
                                i.on("update", (()=>{
                                    h.position.copy(o.position).lerp(l.position, a.value),
                                    h.quaternion.copy(o.quaternion).slerp(l.quaternion, a.value),
                                    h.scale.copy(o.scale).lerp(l.scale, a.value)
                                }
                                )))
                            }
                            ))
                        }
                    }
                    generateKeyframe(e, t, n, i) {
                        let {startValue: a, endValue: s} = e;
                        return void 0 !== n && !1 !== n && (a = n),
                        void 0 !== i && !1 !== i && (s = i),
                        {
                            start: e.start,
                            end: e.end,
                            easeFunction: e.easeFunction,
                            [t]: [a, s]
                        }
                    }
                    addKeyframe({data: e, element: t, index: n, isSkippable: i, property: a, timeline: s}) {
                        if (a.includes("_"))
                            return;
                        const r = "string" == typeof e.startValue && "string" == typeof e.endValue
                          , o = "string" != typeof e.startValue && "string" != typeof e.endValue;
                        if (Array.isArray(e.endValue))
                            t[a] = {
                                x: 0,
                                y: 0,
                                z: 0
                            },
                            e.endValue.forEach(((n,r)=>{
                                const o = 0 === r ? "x" : 1 === r ? "y" : "z"
                                  , l = 0 === r && i && t[a][o]
                                  , h = this.generateKeyframe(e, o, l, n);
                                s.addKeyframe(t[a], h)
                            }
                            ));
                        else if (Keyframes.checkRGBXYZ(a)) {
                            const r = a.slice(0, -1)
                              , o = lodash_last__WEBPACK_IMPORTED_MODULE_1___default()(a).toLowerCase();
                            if (lodash_has__WEBPACK_IMPORTED_MODULE_0___default()(t, r)) {
                                const a = 0 === n && i && t[r][o]
                                  , l = this.generateKeyframe(e, o, a);
                                s.addKeyframe(t[r], l)
                            }
                        } else if (r) {
                            const r = 0 === n && i && t[a]
                              , o = this.generateKeyframe({
                                ...e,
                                startValue: 0,
                                endValue: 1
                            }, a, r);
                            s.addKeyframe(t, o),
                            0 === e.start ? s.on("start", (t=>{
                                s.timeline.trigger(a, e, t)
                            }
                            )) : s.addEvent(t, {
                                start: e.start,
                                onEvent: t=>{
                                    s.timeline.trigger(a, e, t)
                                }
                            })
                        } else if (o) {
                            const r = 0 === n && i && t[a]
                              , o = this.generateKeyframe(e, a, r);
                            s.addKeyframe(t, o)
                        }
                    }
                    animateNode({element: e, entry: t, timeline: n, isSkippable: i}) {
                        const [a,s] = t
                          , r = Keyframes.findNodeTarget(e, a);
                        r && Object.entries(s).forEach((e=>{
                            let[t,{keyframes: a, value: s}] = e;
                            "focalLength" === t && (t = "fov"),
                            a ? a.forEach(((e,a)=>{
                                this.addKeyframe({
                                    data: e,
                                    element: r,
                                    index: a,
                                    isSkippable: i,
                                    property: t,
                                    timeline: n
                                })
                            }
                            )) : Keyframes.setNodeValue(r, t, s)
                        }
                        ))
                    }
                    animateMaterial({element: e, entry: t, timeline: n, isSkippable: i}) {
                        const [a,s] = t
                          , r = this.findMaterialTarget(e, a);
                        r && Object.entries(s).forEach((async e=>{
                            const [t,{keyframes: a, value: s}] = e;
                            a ? a.forEach(((e,a)=>{
                                this.addKeyframe({
                                    data: e,
                                    element: r,
                                    index: a,
                                    isSkippable: i,
                                    property: t,
                                    timeline: n
                                })
                            }
                            )) : Keyframes.setMaterialValue(r, t, s)
                        }
                        ))
                    }
                    animateComponent({element: e, entry: t, timeline: n, isSkippable: i}) {
                        const [a,s] = t;
                        return e && Object.entries(s).forEach((t=>{
                            const [a,{keyframes: s, value: r}] = t;
                            s ? s.forEach(((t,s)=>{
                                this.addKeyframe({
                                    data: t,
                                    element: e,
                                    index: s,
                                    isSkippable: i,
                                    property: a,
                                    timeline: n
                                })
                            }
                            )) : e[a] = r
                        }
                        )),
                        []
                    }
                }
                const Keyframes = new KeyframesManager
            },
            132: function(e, t, n) {
                "use strict";
                n.d(t, {
                    G: function() {
                        return f
                    },
                    I: function() {
                        return _
                    }
                });
                var i = n(4468)
                  , a = n(4237)
                  , s = n(6497)
                  , r = n(9653)
                  , o = n(4282)
                  , l = n(6816)
                  , h = n(927)
                  , c = n(8373)
                  , d = n(6060)
                  , u = n(994);
                const p = n(7166)
                  , m = n(2410);
                class f extends i.EventDispatcher {
                    _gltfLoader = new a.E;
                    get gltfLoader() {
                        return this._gltfLoader
                    }
                    _dracoLoader = new s._;
                    get dracoLoader() {
                        return this._dracoLoader
                    }
                    async initialize() {
                        this._gltfLoader.setDRACOLoader(this._dracoLoader),
                        this._gltfLoader.setKTX2Loader(h.G.ktx2Loader);
                        const e = this._gltfLoader;
                        o.Z.gltfTextureTasksTest() && (e.setRenderer?.(r.Lotus.renderer),
                        e.setTextureTasks?.(r.Lotus.tasks)),
                        this._dracoLoader.setDecoderPath(u.f.get("dependencies", "/draco/")),
                        this.onError = this.onError.bind(this),
                        this.onProgress = this.onProgress.bind(this)
                    }
                    cleanupObjectNode(e) {
                        e.geometry?.attributes?.uv1 || (e.geometry.attributes.uv1 = e.geometry.attributes.uv)
                    }
                    findChildMesh(e) {
                        e.children.forEach((e=>{
                            e instanceof i.Mesh ? this.cleanupObjectNode(e) : this.findChildMesh(e)
                        }
                        ))
                    }
                    cleanupGLTF(e) {
                        e.scenes && e.scenes.forEach((e=>{
                            e instanceof i.Mesh ? this.cleanupObjectNode(e) : e instanceof i.Group && this.findChildMesh(e)
                        }
                        ))
                    }
                    load(e, t) {
                        const n = e = u.f.get("assets", e);
                        d.h.IS_DEVELOPMENT && (e = `${e}?${+new Date}`);
                        const i = c.q.hasItem(n);
                        if (r.Lotus.IS_HOT_RELOADING || !i) {
                            const i = new c.C;
                            let a = Promise.resolve(null);
                            return m.GLTF.test(e) ? a = this.loadGLTF(e, i, t) : m.JSON.test(e) && (a = this.loadJSON(e, i, t)),
                            i.promise = a,
                            c.q.addItem(n, i),
                            a
                        }
                        {
                            const i = c.q.getItem(n);
                            if (i.isReady) {
                                const n = i.asset;
                                return this.onComplete({
                                    asset: n,
                                    options: t,
                                    src: e
                                }),
                                Promise.resolve(n)
                            }
                            return i.promise
                        }
                    }
                    loadGLTF(e, t, n) {
                        return new Promise((i=>{
                            this._gltfLoader.load(e, (a=>{
                                this.cleanupGLTF(a),
                                t.markReady(a),
                                this.onComplete({
                                    asset: a,
                                    options: n,
                                    src: e
                                }),
                                i(a)
                            }
                            ), (t=>{
                                this.onProgress({
                                    event: t,
                                    options: n,
                                    src: e
                                })
                            }
                            ), (t=>{
                                this.onError({
                                    event: t,
                                    options: n,
                                    src: e
                                })
                            }
                            ))
                        }
                        ))
                    }
                    loadJSON(e, t, n) {
                        return new Promise((i=>{
                            window.fetch(e).then((async a=>{
                                const s = await a.json();
                                t.markReady(s),
                                p.traverse(s, (e=>{
                                    m.IMAGES.test(e) && h.G.load(e)
                                }
                                )),
                                this.onComplete({
                                    asset: s,
                                    options: n,
                                    src: e
                                }),
                                i(s)
                            }
                            ))
                        }
                        ))
                    }
                    onError({event: e, options: t, src: n}) {
                        t?.onError?.(n, e),
                        console.error(e),
                        r.Lotus.dispatchEvent({
                            message: `There was an error loading the asset '${n}'.`,
                            type: "error"
                        })
                    }
                    onProgress({event: e, options: t, src: n}) {
                        t?.onProgress?.(n, e)
                    }
                    onComplete({asset: e, options: t, src: n}) {
                        let i;
                        t?.onLoad?.(n, e),
                        m.GLTF.test(n) ? i = "gltf" : m.JSON.test(n) && (i = "json"),
                        l.j.add({
                            asset: e,
                            src: n,
                            type: i
                        })
                    }
                }
                const _ = new f
            },
            6062: function(e, t, n) {
                "use strict";
                n.d(t, {
                    F: function() {
                        return r
                    }
                });
                var i = n(4468)
                  , a = n(9653)
                  , s = n(1334);
                const r = new class {
                    _scene = new i.Scene;
                    _scale = .1;
                    _sprites = [];
                    get isInitialized() {
                        return 0 !== this._sprites.length
                    }
                    get _itemsInRow() {
                        return Math.floor(1 / this._scale)
                    }
                    addTexture(e) {
                        const t = new i.Sprite(new i.SpriteMaterial({
                            map: e,
                            depthWrite: !1,
                            depthTest: !0,
                            transparent: !1,
                            depthFunc: i.AlwaysDepth
                        }))
                          , n = this._sprites.length % this._itemsInRow
                          , a = Math.floor(this._sprites.length / this._itemsInRow)
                          , s = this._scale
                          , r = this._scale * window.innerWidth / window.innerHeight
                          , o = new i.Vector2(s,r)
                          , l = new i.Vector2(o.x,o.y).multiplyScalar(.5)
                          , h = o.x * n - .5 + l.x
                          , c = .5 - l.y - a * o.y;
                        t.position.set(h, c, 0),
                        t.scale.set(o.x, o.y, o.y),
                        this._sprites.push(t),
                        this._scene.add(t)
                    }
                    render() {
                        const e = a.Lotus.renderer
                          , t = e.getRenderTarget();
                        e.setRenderTarget(null),
                        e.clearDepth(),
                        e.render(this._scene, s.e.screenCamera),
                        e.setRenderTarget(t)
                    }
                    destroy() {
                        this._scene.traverse((e=>{
                            e instanceof i.Mesh && (e.geometry.dispose(),
                            e.material.dispose())
                        }
                        )),
                        this._sprites.forEach((e=>{
                            e.removeFromParent()
                        }
                        )),
                        this._sprites = []
                    }
                }
            },
            927: function(e, t, n) {
                "use strict";
                n.d(t, {
                    G: function() {
                        return g
                    },
                    x: function() {
                        return _
                    }
                });
                var i = n(4293)
                  , a = n.n(i)
                  , s = n(4468)
                  , r = n(7651)
                  , o = n(3051)
                  , l = n(4604)
                  , h = n(9653)
                  , c = n(6816)
                  , d = n(8373)
                  , u = n(4282)
                  , p = n(6060)
                  , m = n(994);
                const f = n(2410)
                  , _ = (e,t=!1,n)=>({
                    [`${e}`]: {
                        defaultValue: "",
                        isVariant: t,
                        render: n,
                        type: "String"
                    },
                    [`${e}UV`]: {
                        dataType: "Number",
                        defaultValue: 0,
                        options: [{
                            label: "UV 0",
                            value: 0
                        }, {
                            label: "UV 1",
                            value: 1
                        }],
                        type: "Select"
                    },
                    [`${e}WrapS`]: {
                        dataType: "Number",
                        defaultValue: s.RepeatWrapping,
                        options: [{
                            label: "RepeatWrapping",
                            value: s.RepeatWrapping
                        }, {
                            label: "ClampToEdgeWrapping",
                            value: s.ClampToEdgeWrapping
                        }, {
                            label: "MirroredRepeatWrapping",
                            value: s.MirroredRepeatWrapping
                        }],
                        type: "Select"
                    },
                    [`${e}WrapT`]: {
                        dataType: "Number",
                        defaultValue: s.RepeatWrapping,
                        options: [{
                            label: "RepeatWrapping",
                            value: s.RepeatWrapping
                        }, {
                            label: "ClampToEdgeWrapping",
                            value: s.ClampToEdgeWrapping
                        }, {
                            label: "MirroredRepeatWrapping",
                            value: s.MirroredRepeatWrapping
                        }],
                        type: "Select"
                    },
                    [`${e}FlipY`]: {
                        defaultValue: !0,
                        type: "Boolean"
                    },
                    [`${e}ColorSpace`]: {
                        dataType: "String",
                        defaultValue: s.SRGBColorSpace,
                        options: [{
                            label: "LinearSRGBColorSpace",
                            value: s.LinearSRGBColorSpace
                        }, {
                            label: "SRGBColorSpace",
                            value: s.SRGBColorSpace
                        }],
                        type: "Select"
                    }
                })
                  , g = new class {
                    _envMap;
                    get envMap() {
                        if (!this._envMap) {
                            const e = 1024
                              , t = 1024
                              , n = t * e * 4
                              , i = u.Z.dataTextureBufferTest(n).fill(0);
                            this._envMap = new s.DataTexture(i,t,e,s.RGBAFormat,u.Z.dataTextureTypeTest(),s.UVMapping,s.RepeatWrapping,s.RepeatWrapping,s.NearestFilter,s.NearestFilter,0,s.LinearSRGBColorSpace),
                            this._envMap.mapping = s.EquirectangularReflectionMapping,
                            this._envMap.needsUpdate = !0
                        }
                        return this._envMap
                    }
                    _black1x1;
                    get black1x1() {
                        return this._black1x1 || (this._black1x1 = new s.DataTexture(new Uint8Array([0, 0, 0, 0]),1,1,s.RGBAFormat,s.UnsignedByteType,s.UVMapping,s.RepeatWrapping,s.RepeatWrapping,s.NearestFilter,s.NearestFilter,0,s.LinearSRGBColorSpace),
                        this._black1x1.needsUpdate = !0),
                        this._black1x1
                    }
                    _white1x1;
                    get white1x1() {
                        return this._white1x1 || (this._white1x1 = new s.DataTexture(new Uint8Array([255, 255, 255, 255]),1,1,s.RGBAFormat,s.UnsignedByteType,s.UVMapping,s.RepeatWrapping,s.RepeatWrapping,s.NearestFilter,s.NearestFilter,0,s.LinearSRGBColorSpace),
                        this._white1x1.needsUpdate = !0),
                        this._white1x1
                    }
                    _normal1x1;
                    get normal1x1() {
                        return this._normal1x1 || (this._normal1x1 = new s.DataTexture(new Uint8Array([128, 128, 255, 255]),1,1,s.RGBAFormat,s.UnsignedByteType,s.UVMapping,s.RepeatWrapping,s.RepeatWrapping,s.NearestFilter,s.NearestFilter,0,s.LinearSRGBColorSpace),
                        this._normal1x1.needsUpdate = !0),
                        this._normal1x1
                    }
                    _pmremGenerator;
                    get pmremGenerator() {
                        return this._pmremGenerator
                    }
                    _exrLoader = new r.I;
                    _ktx2Loader = new l.a;
                    get ktx2Loader() {
                        return this._ktx2Loader
                    }
                    _rgbeLoader = new o.x;
                    _textureLoader = new s.TextureLoader;
                    initialize(e) {
                        if (!this._pmremGenerator) {
                            const t = u.Z.pmremCubeFaceSizeTest();
                            s.PMREMGenerator.setCubeTextureSize(t),
                            this._pmremGenerator = new s.PMREMGenerator(e),
                            this._pmremGenerator.compileCubemapShader(),
                            this._pmremGenerator.compileEquirectangularShader()
                        }
                        const t = m.f.get("dependencies", "/basis/");
                        this._ktx2Loader.setTranscoderPath(t),
                        this._ktx2Loader.setWorkerLimit(4),
                        this._ktx2Loader.detectSupport(e)
                    }
                    async load(e, t) {
                        if (!e)
                            return console.trace("[TextureLoader] Error trying to load asset, check stack trace."),
                            Promise.resolve();
                        const n = e = m.f.get("assets", e);
                        p.h.IS_DEVELOPMENT && (e = `${e}?${+new Date}`);
                        const i = d.q.hasItem(n);
                        if (h.Lotus.IS_HOT_RELOADING || !i) {
                            h.Lotus.scene.dispatchEvent({
                                message: `TextureLoader.load - ${e}`,
                                type: "debug"
                            });
                            const i = new d.C
                              , a = this.loadTexture(e, i, t);
                            return i.promise = a,
                            d.q.addItem(n, i),
                            a
                        }
                        {
                            const i = d.q.getItem(n);
                            return i.isReady ? (this.onComplete({
                                asset: i.asset,
                                options: t,
                                src: e
                            }),
                            Promise.resolve(i.asset)) : i.promise
                        }
                    }
                    loadTexture(e, t, n) {
                        let i;
                        return i = f.EXR.test(e) ? this._exrLoader : f.HDR.test(e) ? this._rgbeLoader : f.KTX.test(e) ? this._ktx2Loader : this._textureLoader,
                        new Promise((s=>{
                            i.load(e, (i=>{
                                n && (Object.keys(n).forEach((e=>{
                                    const t = n[e];
                                    a()(t) || (i[e] = t)
                                }
                                )),
                                i.needsUpdate = !0),
                                t.markReady(i),
                                h.Lotus.tasks.add((()=>{
                                    h.Lotus.scene.dispatchEvent({
                                        message: `TextureLoader.task.initTexture - ${e}`,
                                        type: "debug"
                                    }),
                                    h.Lotus.scene.renderer.initTexture(i)
                                }
                                ), "texture"),
                                this.onComplete({
                                    asset: i,
                                    options: n,
                                    src: e
                                }),
                                s(i)
                            }
                            ), (t=>{
                                this.onProgress({
                                    event: t,
                                    options: n,
                                    src: e
                                })
                            }
                            ), (t=>{
                                this.onError({
                                    event: t,
                                    options: n,
                                    src: e
                                })
                            }
                            ))
                        }
                        ))
                    }
                    onError({event: e, options: t, src: n}) {
                        t?.onError?.(n, e),
                        h.Lotus.dispatchEvent({
                            message: `There was an error loading the asset '${n}'.`,
                            type: "error"
                        })
                    }
                    onProgress({event: e, options: t, src: n}) {
                        t?.onProgress?.(n, e)
                    }
                    onComplete({asset: e, options: t, src: n}) {
                        let i;
                        e.needsUpdate = !0,
                        t?.onLoad?.(n, e),
                        i = f.EXR.test(n) ? "exr" : f.HDR.test(n) ? "hdr" : f.KTX.test(n) ? "ktx2" : "image",
                        c.j.add({
                            asset: e,
                            src: n,
                            type: i
                        })
                    }
                    destroy() {
                        this._pmremGenerator.dispose(),
                        this._pmremGenerator = void 0
                    }
                }
            },
            8373: function(e, t, n) {
                "use strict";
                n.d(t, {
                    C: function() {
                        return i
                    },
                    q: function() {
                        return a
                    }
                });
                class i {
                    _asset;
                    _promise;
                    get asset() {
                        return this._asset
                    }
                    set promise(e) {
                        this._promise = e
                    }
                    get promise() {
                        return this._promise
                    }
                    _isReady;
                    get isReady() {
                        return this._isReady
                    }
                    constructor() {
                        this._isReady = !1
                    }
                    markReady(e) {
                        this._asset = e,
                        this._isReady = !0
                    }
                }
                class a {
                    static _map = new Map;
                    static addItem(e, t) {
                        return this._map.set(e, t)
                    }
                    static getItem(e) {
                        return this._map.get(e)
                    }
                    static hasItem(e) {
                        return this._map.has(e)
                    }
                    static clear() {
                        this._map.clear()
                    }
                }
            },
            8925: function(e, t, n) {
                "use strict";
                n.d(t, {
                    CL: function() {
                        return h.C
                    },
                    E4: function() {
                        return s.E
                    },
                    F9: function() {
                        return o.F
                    },
                    GA: function() {
                        return l.G
                    },
                    Gq: function() {
                        return r.G
                    },
                    Ie: function() {
                        return r.I
                    },
                    US: function() {
                        return a.U
                    },
                    jx: function() {
                        return i.j
                    },
                    q_: function() {
                        return h.q
                    },
                    x6: function() {
                        return l.x
                    }
                });
                var i = n(6816)
                  , a = n(8626)
                  , s = n(5070)
                  , r = n(132)
                  , o = n(6062)
                  , l = n(927)
                  , h = n(8373)
            },
            4104: function(e, t, n) {
                "use strict";
                n.d(t, {
                    B: function() {
                        return i
                    }
                });
                class i {
                    static remove(e, t) {
                        const n = e.indexOf(t);
                        return n > -1 && e.splice(n, 1)
                    }
                    static insert(e, t, n) {
                        return [...e.slice(0, n), t, ...e.slice(n)]
                    }
                }
            },
            701: function(e, t, n) {
                "use strict";
                n.d(t, {
                    l: function() {
                        return i
                    }
                });
                class i {
                    static download(e, t) {
                        const n = document.createElement("a");
                        n.href = e,
                        n.setAttribute("download", t),
                        document.body.appendChild(n),
                        n.click(),
                        n.remove()
                    }
                }
            },
            3395: function(e, t, n) {
                "use strict";
                n.d(t, {
                    H: function() {
                        return a
                    }
                });
                var i = n(4468);
                const a = new class {
                    disposeGeometry(e) {
                        e.dispose()
                    }
                    disposeMaterial(e) {
                        const t = e=>{
                            e.alphaMap && e.alphaMap.dispose(),
                            e.aoMap && e.aoMap.dispose(),
                            e.bumpMap && e.bumpMap.dispose(),
                            e.displacementMap && e.displacementMap.dispose(),
                            e.emissiveMap && e.emissiveMap.dispose(),
                            e.envMap && e.envMap.dispose(),
                            e.lightMap && e.lightMap.dispose(),
                            e.map && e.map.dispose(),
                            e.metalnessMap && e.metalnessMap.dispose(),
                            e.normalMap && e.normalMap.dispose(),
                            e.roughnessMap && e.roughnessMap.dispose(),
                            e.alphaMap && e.alphaMap.dispose(),
                            e.alphaMap && e.alphaMap.dispose(),
                            e.alphaMap && e.alphaMap.dispose(),
                            e.alphaMap && e.alphaMap.dispose(),
                            e.clearcoatRoughnessMap && e.clearcoatRoughnessMap.dispose(),
                            e.clearcoatRoughnessMap && e.clearcoatRoughnessMap.dispose(),
                            e.clearcoatRoughnessMap && e.clearcoatRoughnessMap.dispose(),
                            e.clearcoatRoughnessMap && e.clearcoatRoughnessMap.dispose(),
                            e.clearcoatMap && e.clearcoatMap.dispose(),
                            e.clearcoatNormalMap && e.clearcoatNormalMap.dispose(),
                            e.clearcoatRoughnessMap && e.clearcoatRoughnessMap.dispose(),
                            e.sheenRoughnessMap && e.sheenRoughnessMap.dispose(),
                            e.sheenColorMap && e.sheenColorMap.dispose(),
                            e.specularIntensityMap && e.specularIntensityMap.dispose(),
                            e.specularColorMap && e.specularColorMap.dispose(),
                            e.thicknessMap && e.thicknessMap.dispose(),
                            e.transmissionMap && e.transmissionMap.dispose(),
                            e.dispose()
                        }
                        ;
                        Array.isArray(e) ? e.forEach(((e,n)=>{
                            t(n)
                        }
                        )) : t(e)
                    }
                    dispose(e) {
                        e.traverse((e=>{
                            e.geometry && this.disposeGeometry(e.geometry),
                            e.material && this.disposeMaterial(e.material)
                        }
                        ))
                    }
                    traverse(e, t) {
                        for (const n in e)
                            e[n] && "object" == typeof e[n] ? (t(e[n]),
                            this.traverse(e[n], t)) : t(e[n])
                    }
                    destroyTraverse(e) {
                        for (const t in e) {
                            const n = e[t];
                            ["_renderer", "_scene", "_timeline", "renderer", "scene", "timeline"].includes(t) ? e[t] = void 0 : "object" == typeof n && (Array.isArray(n) ? n.forEach((e=>{
                                this.destroy(e)
                            }
                            )) : this.destroy(n))
                        }
                        this.destroy(e)
                    }
                    destroy(e) {
                        if (!(e instanceof Element || e instanceof i.Euler || e instanceof i.Quaternion || e instanceof i.Vector2 || e instanceof i.Vector3 || e instanceof i.Vector4)) {
                            "string" == typeof e && (e = void 0);
                            for (const t in e) {
                                const n = e[t];
                                n instanceof i.Euler || n instanceof i.Quaternion || n instanceof i.Vector2 || n instanceof i.Vector3 || n instanceof i.Vector4 || (["_renderer", "_scene", "_timeline", "renderer", "scene", "timeline"].includes(t),
                                e[t] = void 0)
                            }
                        }
                    }
                }
            },
            6060: function(e, t, n) {
                "use strict";
                n.d(t, {
                    h: function() {
                        return s
                    }
                });
                var i = n(149);
                window.ENVIRONMENT = "production";
                const a = i.D.get("environment");
                a && (window.ENVIRONMENT = a);
                const s = new class {
                    IS_DEVELOPMENT = "production" !== window.ENVIRONMENT;
                    IS_PRODUCTION = "production" === window.ENVIRONMENT
                }
            },
            3510: function(e, t, n) {
                "use strict";
                n.d(t, {
                    D: function() {
                        return i
                    }
                });
                class i {
                    static convertToHorizontal(e, t=36) {
                        return 2 * Math.atan(t / (2 * e)) * (180 / Math.PI)
                    }
                }
            },
            7234: function(e, t, n) {
                "use strict";
                n.d(t, {
                    O: function() {
                        return a
                    }
                });
                var i = n(994);
                class a {
                    static async getKeyframesJson(e) {
                        const t = i.f.get("assets", e)
                          , n = await window.fetch(t);
                        return await n.json()
                    }
                    static getAllAnimationsByState(e, t) {
                        return Object.entries(e).filter((e=>{
                            const [n] = e;
                            return n.includes(t)
                        }
                        )).reduce(((e,t)=>({
                            ...e,
                            [t[0]]: t[1]
                        })), {})
                    }
                    static getAnimationByName(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : {}
                    }
                    static copyAllAnimationsFromState(e, t, n, i=!1) {
                        let a = {};
                        return Object.entries(e).forEach((e=>{
                            if (e[0].includes(t)) {
                                const i = e[0].replace(t, n);
                                a[i] = e[1]
                            }
                        }
                        )),
                        i && (a = {
                            ...e,
                            ...a
                        }),
                        a
                    }
                }
            },
            6925: function(e, t, n) {
                "use strict";
                n.d(t, {
                    M: function() {
                        return s
                    }
                });
                var i = n(9653)
                  , a = n(4468);
                class s {
                    static nextPow2(e, t) {
                        const n = Math.log2(a.MathUtils.floorPowerOfTwo(e)) + t;
                        return Math.pow(2, n < 1 ? 1 : n)
                    }
                    static lerp(e, t, n, r=i.Lotus.scene.loop.delta, o=60) {
                        const l = s.delta(n, r, o);
                        return a.MathUtils.lerp(e, t, l)
                    }
                    static getRelativeDelta(e=i.Lotus.scene.loop.delta, t=60) {
                        return e / (1 / t)
                    }
                    static delta(e, t=i.Lotus.scene.loop.delta, n=60) {
                        const a = s.getRelativeDelta(t, n)
                          , r = 1 - e;
                        return 1 - Math.pow(r, a)
                    }
                }
            },
            149: function(e, t, n) {
                "use strict";
                n.d(t, {
                    D: function() {
                        return i
                    }
                });
                const i = new class {
                    _isEnabled = window.LOTUS_DEBUG;
                    _params = new URLSearchParams(window.location.search);
                    setEnabled(e) {
                        this._isEnabled = e
                    }
                    get(e) {
                        return !!this._isEnabled && this._params?.get(e)
                    }
                    set(e, t) {
                        this._params.set(e, t),
                        window.location.search = this._params.toString()
                    }
                }
            },
            7260: function(e, t, n) {
                "use strict";
                var i = n(701);
                class a {
                    constructor() {
                        console.log("Recording frame performance..."),
                        window.addEventListener("click", (e=>{
                            e.shiftKey && this.download()
                        }
                        )),
                        window.addEventListener("touchstart", (e=>{
                            3 === e.touches.length && this.download()
                        }
                        )),
                        this.loop = this.loop.bind(this),
                        window.requestAnimationFrame((()=>{
                            window.requestAnimationFrame((()=>{
                                window.requestAnimationFrame((()=>{
                                    this._now = performance.now(),
                                    window.requestAnimationFrame(this.loop)
                                }
                                ))
                            }
                            ))
                        }
                        ))
                    }
                    compactTimestamp(e=new Date) {
                        return `${e.getFullYear()}${e.getMonth().toString().padStart(2, "0")}${e.getDate().toString().padStart(2, "0")}-${e.getHours().toString().padStart(2, "0")}${e.getMinutes().toString().padStart(2, "0")}`
                    }
                    cleanupLabelForFilename(e) {
                        return (e = (e = (e = e.toLocaleLowerCase()).replace(/ /g, "-")).replace(/[^a-z0-9-]/g, "_")).replace(/-*_+-*/g, "_")
                    }
                    getStatisticsForFrametimes(e) {
                        try {
                            const t = e.filter((e=>!isNaN(parseFloat(e))))
                              , n = t.reduce(((e,t)=>e + t)) / t.length;
                            t.sort(((e,t)=>e - t));
                            const i = t[0]
                              , a = (t[Math.floor(t.length / 4)] + t[Math.ceil(t.length / 4)]) / 2
                              , s = (t[Math.floor(t.length / 2)] + t[Math.ceil(t.length / 2)]) / 2
                              , r = (t[Math.floor(t.length / 4 * 3)] + t[Math.ceil(t.length / 4 * 3)]) / 2
                              , o = t[t.length - 1];
                            return `\n        # Average: ${n.toPrecision(4)} ms\n        # Quartiles: ${i} -- [ ${a} | ${s} | ${r} ] -- ${o} ms\n        #\n        # Total Frames: ${t.length.toString().padStart(4, " ")}\n        # Below 55 FPS: ${t.reduce(((e,t)=>e + (t > 1e3 / 55 ? 1 : 0)), 0).toString().padStart(4, " ")}\n        # Below 25 FPS: ${t.reduce(((e,t)=>e + (t > 40 ? 1 : 0)), 0).toString().padStart(4, " ")}\n        # Below 15 FPS: ${t.reduce(((e,t)=>e + (t > 1e3 / 15 ? 1 : 0)), 0).toString().padStart(4, " ")}\n        # Below 05 FPS: ${t.reduce(((e,t)=>e + (t > 200 ? 1 : 0)), 0).toString().padStart(4, " ")}\n        # Below 01 FPS: ${t.reduce(((e,t)=>e + (t > 1e3 ? 1 : 0)), 0).toString().padStart(4, " ")}\n      `.replace(/ {2}/g, "")
                        } catch (e) {
                            return `\n        # Error computing stats.\n        # ${e.message}\n      `.replace(/ {2}/g, "")
                        }
                    }
                    createButton() {
                        const e = document.createElement("button");
                        e.addEventListener("click", (t=>{
                            t.stopImmediatePropagation(),
                            this.download(),
                            document.body.removeChild(e)
                        }
                        )),
                        Object.assign(e.style, {
                            background: "dodgerblue",
                            borderRadius: "3px",
                            color: "white",
                            fontFamily: "monospace",
                            fontWeight: "bold",
                            height: "var(--height)",
                            left: "calc(50% - var(--width) / 2)",
                            position: "fixed",
                            top: "calc(50% - var(--height) / 2)",
                            width: "var(--width)",
                            zIndex: 1e3
                        }),
                        e.style.setProperty("--height", "66px"),
                        e.style.setProperty("--width", "280px"),
                        e.textContent = "Download Perfomance Data",
                        document.body.appendChild(e)
                    }
                    _now;
                    _runLoop = !0;
                    _frametimes = [];
                    _timeout = 120;
                    _Lotus = null;
                    _LotusInstance = null;
                    _LotusScene = null;
                    _LotusSceneFrameReady = null;
                    add(e) {
                        this._frametimes.push(e)
                    }
                    loopLotus() {
                        null === this._Lotus ? window.Lotus && (this._Lotus = window.Lotus,
                        this.add("#! Lotus appears")) : null === this._LotusInstance ? window.Lotus.instance && (this._LotusInstance = window.Lotus.instance(),
                        this.add("#! Lotus instance appears")) : null === this._LotusScene ? this._LotusInstance.scene && (this._LotusScene = this._LotusInstance.scene,
                        this.add("#! Lotus scene appears")) : null === this._LotusSceneFrameReady && this._LotusScene.frameReady && (this._LotusSceneFrameReady = this._LotusScene.frameReady,
                        this.add("#! Lotus frameReady appears"),
                        this._LotusScene.frameReady.then((()=>{
                            this.add("#! Lotus frameReady"),
                            this.createButton()
                        }
                        )),
                        this._LotusScene.layersCreated.then((()=>{
                            this.add("#! Lotus layersCreated")
                        }
                        )),
                        this._LotusScene.layersReady.then((()=>{
                            this.add("#! Lotus layersReady")
                        }
                        )),
                        this._LotusScene.addEventListener("debug", (({message: e})=>{
                            this.add(`#! ${e}`)
                        }
                        )),
                        this._LotusScene.ready.then((()=>{
                            this.add("#! Lotus ready")
                        }
                        )))
                    }
                    loop() {
                        const e = performance.now()
                          , t = Math.round(e - this._now);
                        if (this._now = e,
                        this.add(t),
                        this.loopLotus(),
                        this._frametimes.length % 60 == 0) {
                            const e = this._frametimes.slice(this._frametimes.length - 60).filter((e=>!isNaN(parseFloat(e))))
                              , t = e.reduce(((e,t)=>e + t)) / 60;
                            console.log("Average FPS", e.length, t)
                        }
                        e > 1e3 * this._timeout && (console.log("Performance Timeout", e, 1e3 * this._timeout),
                        this._frametimes.push(`Timeout ${this._timeout}`),
                        this._runLoop = !1),
                        this._runLoop && window.requestAnimationFrame(this.loop)
                    }
                    download() {
                        console.log("Frametimes", this._frametimes);
                        const e = prompt("Enter description of test (e.g. device and OS version):", "Untitled");
                        if (null === e)
                            return;
                        let t = "";
                        e.length > 0 && (t = `-${this.cleanupLabelForFilename(e)}`);
                        const n = `raf${this.compactTimestamp()}${t}.log`
                          , a = this.getStatisticsForFrametimes(this._frametimes)
                          , s = `\n      # ${e}\n      # ${this.compactTimestamp()}\n      # ${window.location.toString()}\n      # ${navigator.userAgent}\n\n      ${a}\n\n      ${this._frametimes.join("\n")}\n    `.replace(/ {2}/g, "");
                        i.l.download(`data:text/plain;charset=utf-8,${encodeURIComponent(s)}`, n),
                        setTimeout((()=>{
                            alert(`Data downloaded to ${n}\n\n\nPerformance Summary (included in file):\n${a}`)
                        }
                        ), 100)
                    }
                }
                const s = new URLSearchParams(window.location.search);
                window.LOTUS_DEBUG && s.get("report") && new a
            },
            994: function(e, t, n) {
                "use strict";
                n.d(t, {
                    f: function() {
                        return i
                    }
                });
                const i = new class {
                    _api = "api";
                    _assets = "assets";
                    _dependencies = "assets/dependencies";
                    initialize(e) {
                        if (e)
                            for (const [t,n] of Object.entries(e))
                                n && this.set(t, n)
                    }
                    set(e, t) {
                        if (t)
                            switch (e) {
                            case "api":
                                this._api = t;
                                break;
                            case "assets":
                                this._assets = t;
                                break;
                            case "dependencies":
                                this._dependencies = t
                            }
                    }
                    get(e, t) {
                        switch (e) {
                        case "api":
                            return `${this._api}${t}`;
                        case "assets":
                            return `${this._assets}${t}`;
                        case "dependencies":
                            return `${this._dependencies}${t}`
                        }
                    }
                }
            },
            1983: function(e, t, n) {
                "use strict";
                n.d(t, {
                    LR: function() {
                        return c
                    },
                    O5: function() {
                        return u
                    },
                    R: function() {
                        return p
                    },
                    yb: function() {
                        return d
                    }
                });
                var i = n(8721)
                  , a = n.n(i)
                  , s = n(4293)
                  , r = n.n(s)
                  , o = n(4468)
                  , l = n(6816)
                  , h = n(927);
                const c = ["number", "boolean", "vector2", "vector3", "vector4", "quaternion", "array", "float32array", "texture", "cubetexture", "int32array", "matrix3", "matrix4", "color"]
                  , d = ["number, boolean", "vector2, array2, float32array2, int32array2", "vector3, array3, float32array3, color, int32array3", "vector4, array4, float32array4, quaternion, int32array4", "matrix3, array9, float32array9, int32array9", "matrix4, array16, float32array16, , int32array16"]
                  , u = /^.*\.(jpg|bmp|png|jpeg|exr|hdr|gif|dds|webp|heif|heic|tga|pic)$/i;
                class p {
                    static filterValues(e) {
                        return e ? Object.entries(e).filter((([e,t])=>!["__ORIGINAL__", "_states", "_scene", "chunk", "id", "transition", "duration", "easeFunctionType", "easeCurveType", "keyframes"].includes(e) && !["UV", "Encoding", "FlipY", "WrapS", "WrapT"].some((t=>e.endsWith(t))))) : e
                    }
                    static async uniformFromValues(e) {
                        const t = {}
                          , n = p.filterValues(e).map((async([n,i])=>{
                            if (i.value && (i = i.value),
                            !r()(i)) {
                                if ("string" == typeof i) {
                                    if (["map", "Map"].some((e=>n.endsWith(e)))) {
                                        let a = await l.j.get(i);
                                        return a ? Object.assign(a, {
                                            channel: e[`${n}UV`] ?? 0,
                                            colorSpace: e[`${n}ColorSpace`] ?? o.LinearSRGBColorSpace,
                                            flipY: e[`${n}FlipY`] ?? !0,
                                            wrapS: e[`${n}WrapS`] ?? o.ClampToEdgeWrapping,
                                            wrapT: e[`${n}WrapT`] ?? o.ClampToEdgeWrapping,
                                            needsUpdate: !0
                                        }) : a = h.G.black1x1,
                                        t[n] = {
                                            value: a
                                        },
                                        a
                                    }
                                    if (i.includes("#")) {
                                        const e = new o.Color(i);
                                        t[n] = {
                                            value: e
                                        }
                                    }
                                } else
                                    Array.isArray(i) ? t[n] = {
                                        value: (new o.Vector3).fromArray(i)
                                    } : t[n] = {
                                        value: i
                                    };
                                return Promise.resolve()
                            }
                        }
                        ));
                        return await Promise.all(n),
                        t
                    }
                    static updateMaterialUniforms(e, t) {
                        Object.entries(t).forEach((([t,n])=>{
                            a()(e, t) ? e[t] = n.value ?? n : ("object" == typeof n || n.value && (n = n.value),
                            e.uniforms[t] = n)
                        }
                        ))
                    }
                    static updateMaterialUniform(e, t, n) {
                        let i = n.constructor.name;
                        if ("string" !== i) {
                            if (void 0 !== n.value) {
                                if ("string" == typeof n.value)
                                    return;
                                return e.uniforms[t] = n
                            }
                            if ("Object" === i && (i = (n = this.validateObjectValue(n)).constructor.name),
                            this.getValueLengthString(i, n),
                            this.isValueTypeValid(i))
                                if (void 0 === e.uniforms[t])
                                    try {
                                        e.uniforms[t] = {
                                            value: n
                                        }
                                    } catch (e) {}
                                else if (e.uniforms[t].value) {
                                    const n = e.uniforms[t].value.constructor.name;
                                    this.getValueLengthString(n, e.uniforms[t].value)
                                } else
                                    try {
                                        e.uniforms[t].value = n
                                    } catch (e) {}
                        }
                    }
                    static isMatchingValueAndUniform(e, t, n="", i="") {
                        e = e.toLowerCase() + n,
                        t = t.toLowerCase() + i;
                        let a = !1;
                        return a = e === t || d.findIndex((t=>t.includes(e))) === d.findIndex((e=>e.includes(t))),
                        a
                    }
                    static isValueTypeValid(e) {
                        return !0
                    }
                    static getValueLengthString(e, t) {
                        return !0
                    }
                    static validateObjectValue(e) {
                        let t = e;
                        return Object.prototype.hasOwnProperty.call(e, "elements") ? t = Object.values(e.elements) : Object.prototype.hasOwnProperty.call(e, "x") && (t = Object.values(e)),
                        t
                    }
                }
            },
            8877: function(e, t, n) {
                "use strict";
                n.d(t, {
                    O: function() {
                        return o
                    }
                });
                var i = n(361)
                  , a = n.n(i)
                  , s = n(3395)
                  , r = n(7166);
                class o {
                    static create(e, t) {
                        return new o({
                            fields: e,
                            scene: t
                        })
                    }
                    __ORIGINAL__;
                    get ORIGINAL() {
                        return this.__ORIGINAL__
                    }
                    _scene;
                    _states = {};
                    get states() {
                        return this._states
                    }
                    constructor({fields: e, scene: t}) {
                        this.__ORIGINAL__ = a()(e),
                        this._scene = t;
                        const n = this.__ORIGINAL__.variants;
                        if (n?.length) {
                            const t = this._scene.state?.get("global");
                            t && (this._states[t] = this.__ORIGINAL__,
                            n?.map((t=>{
                                const n = r.assign(e, t);
                                t.states?.forEach((e=>{
                                    this._states[e] = n
                                }
                                ))
                            }
                            )),
                            this.generateStateValues())
                        } else {
                            const e = this._scene.state?.get("global");
                            e && (this._states[e] = this.__ORIGINAL__,
                            this.generateStateValues())
                        }
                    }
                    generateStateValues(e=this._scene.state.get("global")) {
                        const t = this._states[e] ?? this.__ORIGINAL__
                          , n = Object.keys(this.__ORIGINAL__).filter((e=>!["chunk", "id", "variants"].includes(e)));
                        t && Object.entries(t).filter((([e,t])=>-1 !== n.indexOf(e))).forEach((([e,t])=>{
                            this[e] = t
                        }
                        ))
                    }
                    get values() {
                        const e = {};
                        return Object.entries(this).forEach((([t,n])=>{
                            t.includes("_") || (e[t] = n)
                        }
                        )),
                        e
                    }
                    destroy() {
                        s.H.destroy(this)
                    }
                }
            },
            1968: function(e, t, n) {
                "use strict";
                n.r(t),
                n.d(t, {
                    ArrayUtils: function() {
                        return i.B
                    },
                    DOMUtils: function() {
                        return s.l
                    },
                    DisposeUtils: function() {
                        return a.H
                    },
                    EnvironmentUtils: function() {
                        return r.h
                    },
                    FOVUtils: function() {
                        return o.D
                    },
                    ImageFileFilter: function() {
                        return m.O5
                    },
                    KeyframeUtils: function() {
                        return l.O
                    },
                    MathUtils: function() {
                        return h.M
                    },
                    QueryUtils: function() {
                        return p.D
                    },
                    URLUtils: function() {
                        return f.f
                    },
                    UniformUtils: function() {
                        return m.R
                    },
                    VariantsUtils: function() {
                        return _.O
                    },
                    uniformTypeRelation: function() {
                        return m.yb
                    },
                    uniformTypes: function() {
                        return m.LR
                    }
                });
                var i = n(4104)
                  , a = n(3395)
                  , s = n(701)
                  , r = n(6060)
                  , o = n(3510)
                  , l = n(7234)
                  , h = n(6925)
                  , c = n(7166)
                  , d = {};
                for (var u in c)
                    ["default", "ArrayUtils", "DisposeUtils", "DOMUtils", "EnvironmentUtils", "FOVUtils", "KeyframeUtils", "MathUtils"].indexOf(u) < 0 && (d[u] = function(e) {
                        return c[e]
                    }
                    .bind(0, u));
                n.d(t, d);
                var p = n(149)
                  , m = n(1983)
                  , f = n(994)
                  , _ = n(8877)
            },
            6555: function(e, t, n) {
                "use strict";
                n.d(t, {
                    F1: function() {
                        return r
                    },
                    Sx: function() {
                        return a
                    },
                    Yf: function() {
                        return l
                    },
                    pI: function() {
                        return s
                    },
                    yg: function() {
                        return o
                    }
                });
                var i = n(4468);
                const a = new i.Color("#000000")
                  , s = new i.Color("#0000ff")
                  , r = new i.Color("#00ff00")
                  , o = new i.Color("#ff0000")
                  , l = new i.Color("#ffffff")
            },
            7716: function(e, t, n) {
                "use strict";
                n.d(t, {
                    AR: function() {
                        return s
                    },
                    Q6: function() {
                        return i
                    },
                    m1: function() {
                        return a
                    }
                });
                const i = 31
                  , a = 30
                  , s = 29
            },
            1536: function(e, t, n) {
                "use strict";
                n.d(t, {
                    AR: function() {
                        return a.AR
                    },
                    F1: function() {
                        return i.F1
                    },
                    Q6: function() {
                        return a.Q6
                    },
                    Sx: function() {
                        return i.Sx
                    },
                    Yf: function() {
                        return i.Yf
                    },
                    m1: function() {
                        return a.m1
                    },
                    pI: function() {
                        return i.pI
                    },
                    yg: function() {
                        return i.yg
                    }
                });
                var i = n(6555)
                  , a = n(7716)
            },
            358: function(e) {
                e.exports = "gl_FragColor.rgb = adjustBrightness(gl_FragColor.rgb, brightness);\n"
            },
            9606: function(e) {
                e.exports = "uniform float brightness;\n\nvec3 adjustBrightness(vec3 color, float value) {\n  return color + value;\n}\n"
            },
            2850: function(e) {
                e.exports = "gl_FragColor.rgb = adjustGamma(gl_FragColor.rgb, gamma);\n"
            },
            8998: function(e) {
                e.exports = "uniform float gamma;\n\nvec3 adjustGamma(vec3 value, float gamma) {\n  return pow(value, vec3(1.0 - gamma));\n}\n"
            },
            1470: function(e) {
                e.exports = "gl_FragColor.rgb = adjustSaturation(gl_FragColor.rgb, saturation);\n"
            },
            1404: function(e) {
                e.exports = "uniform float saturation;\n\nfloat getLuminance(vec3 value) {\n  return dot(value, vec3(0.22, 0.707, 0.071));\n}\n\nvec3 adjustSaturation(vec3 value, float saturation) {\n  float luminance = getLuminance(value);\n\n  return mix(vec3(luminance), value, saturation);\n}\n"
            },
            3998: function(e) {
                e.exports = "#ifdef USE_ALPHAMAP\n\tfloat alphaMask = 1.0;\n\tif(alphaMapOpacity < 1.0){\t\t\n\t\talphaMask = mix(texture2D( alphaMap, vAlphaMapUv )[ alphaMapChannel ], 1.0, alphaMapOpacity);\n\t}\n\tdiffuseColor.a *= alphaMask;\n#endif"
            },
            3244: function(e) {
                e.exports = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n  uniform float alphaMapOpacity;\n\tuniform int alphaMapChannel;\n#endif"
            },
            6028: function(e) {
                e.exports = "#ifdef USE_AOMAP\n\n  // reads channel R G B and mix AO with aoMapChannelMixer\n  vec4 aoMapColors = texture2D( aoMap, vAoMapUv );\n  float mixRG = mix(aoMapColors.x, aoMapColors.y , aoMapChannelMixer.y);\n  float mixRGB = mix(mixRG, aoMapColors.z , aoMapChannelMixer.z);\n  float ambientOcclusion = ( mixRGB - 1.0 ) * aoMapIntensity + 1.0;\n\n  reflectedLight.indirectDiffuse *= ambientOcclusion;\n\n  #if defined( USE_ENVMAP ) && defined( STANDARD )\n\n    float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n    reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\n  #endif\n\n#endif\n"
            },
            8845: function(e) {
                e.exports = "#ifdef USE_AOMAP\n  uniform sampler2D aoMap;\n  uniform float aoMapIntensity;\n  uniform vec3 aoMapChannelMixer;\n#endif\n"
            },
            8939: function(e) {
                e.exports = "// *** IMPORTANT ***\n//\n// This is a quick hack to enable rotation for IBL for scene background \n// and PBR lighting in Standard/Physical shaders. This chunk is identical as the original \n// three's `cube_uv_reflection_fragment` but only difference is in `textureCubeUV` Where \n// it transforms `sampleDir` with `envMapOrientation`. \n// Make sure to check if there is any updates in the original chunk whenever you update \n// threejs version\n\n\n#ifdef ENVMAP_TYPE_CUBE_UV\n\n  uniform float envMapBlurriness;\n  uniform vec3 envMapOrientation;\n  uniform float envMapStrength;\n\n  #define cubeUV_minMipLevel 4.0\n  #define cubeUV_minTileSize 16.0\n\n  // These shader functions convert between the UV coordinates of a single face of\n  // a cubemap, the 0-5 integer index of a cube face, and the direction vector for\n  // sampling a textureCube (not generally normalized ).\n\n  float getFace(vec3 direction) {\n\n    vec3 absDirection = abs(direction);\n\n    float face = -1.0;\n\n    if(absDirection.x > absDirection.z) {\n\n      if(absDirection.x > absDirection.y)\n\n        face = direction.x > 0.0 ? 0.0 : 3.0;\n\n      else\n\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n\n    } else {\n\n      if(absDirection.z > absDirection.y)\n\n        face = direction.z > 0.0 ? 2.0 : 5.0;\n\n      else\n\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n\n    }\n\n    return face;\n\n  }\n\n    // RH coordinate system; PMREM face-indexing convention\n  vec2 getUV(vec3 direction, float face) {\n\n    vec2 uv;\n\n    if(face == 0.0) {\n\n      uv = vec2(direction.z, direction.y) / abs(direction.x); // pos x\n\n    } else if(face == 1.0) {\n\n      uv = vec2(-direction.x, -direction.z) / abs(direction.y); // pos y\n\n    } else if(face == 2.0) {\n\n      uv = vec2(-direction.x, direction.y) / abs(direction.z); // pos z\n\n    } else if(face == 3.0) {\n\n      uv = vec2(-direction.z, direction.y) / abs(direction.x); // neg x\n\n    } else if(face == 4.0) {\n\n      uv = vec2(-direction.x, direction.z) / abs(direction.y); // neg y\n\n    } else {\n\n      uv = vec2(direction.x, direction.y) / abs(direction.z); // neg z\n\n    }\n\n    return 0.5 * (uv + 1.0);\n\n  }\n\n  vec3 bilinearCubeUV(sampler2D envMap, vec3 direction, float mipInt) {\n\n    float face = getFace(direction);\n\n    float filterInt = max(cubeUV_minMipLevel - mipInt, 0.0);\n\n    mipInt = max(mipInt, cubeUV_minMipLevel);\n\n    float faceSize = exp2(mipInt);\n\n    highp vec2 uv = getUV(direction, face) * (faceSize - 2.0) + 1.0; // #25071\n\n    if(face > 2.0) {\n\n      uv.y += faceSize;\n\n      face -= 3.0;\n\n    }\n\n    uv.x += face * faceSize;\n\n    uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\n    uv.y += 4.0 * (exp2(CUBEUV_MAX_MIP) - faceSize);\n\n    uv.x *= CUBEUV_TEXEL_WIDTH;\n    uv.y *= CUBEUV_TEXEL_HEIGHT;\n\n      #ifdef texture2DGradEXT\n\n    return texture2DGradEXT(envMap, uv, vec2(0.0), vec2(0.0)).rgb; // disable anisotropic filtering\n\n      #else\n\n    return texture2D(envMap, uv).rgb;\n\n      #endif\n\n  }\n\n    // These defines must match with PMREMGenerator\n\n    #define cubeUV_r0 1.0\n    #define cubeUV_v0 0.339\n    #define cubeUV_m0 - 2.0\n    #define cubeUV_r1 0.8\n    #define cubeUV_v1 0.276\n    #define cubeUV_m1 - 1.0\n    #define cubeUV_r4 0.4\n    #define cubeUV_v4 0.046\n    #define cubeUV_m4 2.0\n    #define cubeUV_r5 0.305\n    #define cubeUV_v5 0.016\n    #define cubeUV_m5 3.0\n    #define cubeUV_r6 0.21\n    #define cubeUV_v6 0.0038\n    #define cubeUV_m6 4.0\n\n  float roughnessToMip(float roughness) {\n\n    float mip = 0.0;\n\n    if(roughness >= cubeUV_r1) {\n\n      mip = (cubeUV_r0 - roughness) * (cubeUV_m1 - cubeUV_m0) / (cubeUV_r0 - cubeUV_r1) + cubeUV_m0;\n\n    } else if(roughness >= cubeUV_r4) {\n\n      mip = (cubeUV_r1 - roughness) * (cubeUV_m4 - cubeUV_m1) / (cubeUV_r1 - cubeUV_r4) + cubeUV_m1;\n\n    } else if(roughness >= cubeUV_r5) {\n\n      mip = (cubeUV_r4 - roughness) * (cubeUV_m5 - cubeUV_m4) / (cubeUV_r4 - cubeUV_r5) + cubeUV_m4;\n\n    } else if(roughness >= cubeUV_r6) {\n\n      mip = (cubeUV_r5 - roughness) * (cubeUV_m6 - cubeUV_m5) / (cubeUV_r5 - cubeUV_r6) + cubeUV_m5;\n\n    } else {\n\n      mip = -2.0 * log2(1.16 * roughness); // 1.16 = 1.79^0.25\n    }\n\n    return mip;\n\n  }\n\n  // https://gist.github.com/keijiro/ee439d5e7388f3aafc5296005c8c3f33\n  mat3 angleAxis3x3(float angle, vec3 axis) {\n    \n    float c = cos(angle);\n    float s = sin(angle);\n\n    float t = 1. - c;\n    float x = axis.x;\n    float y = axis.y;\n    float z = axis.z;\n\n    return mat3(\n      t * x * x + c, t * x * y - s * z, t * x * z + s * y, \n      t * x * y + s * z, t * y * y + c, t * y * z - s * x, \n      t * x * z - s * y, t * y * z + s * x, t * z * z + c\n    );\n\n  }\n\n  // 90 deg PI/2 rad\n  #define ENV_ORIENTATION_Y_OFFSET 1.57079632679\n\n  vec4 textureCubeUV(sampler2D envMap, vec3 sampleDir, float roughness) {\n\n    vec3 forward = vec3(0, 0, 1);\n    vec3 right = vec3(1, 0, 0);\n    vec3 up = vec3(0, 1, 0);\n\n    roughness += envMapBlurriness;\n\n    sampleDir =\n      angleAxis3x3(envMapOrientation.y + ENV_ORIENTATION_Y_OFFSET, up)\n      * angleAxis3x3(envMapOrientation.x, right)\n      * angleAxis3x3(envMapOrientation.z, forward)\n      * sampleDir;\n\n    float mip = clamp(roughnessToMip(roughness), cubeUV_m0, CUBEUV_MAX_MIP);\n\n    float mipF = fract(mip);\n\n    float mipInt = floor(mip);\n\n    vec3 color0 = bilinearCubeUV(envMap, sampleDir, mipInt);\n\n    if(mipF == 0.0) {\n\n      return vec4(color0 * envMapStrength, 1.0);\n\n    } else {\n\n      vec3 color1 = bilinearCubeUV(envMap, sampleDir, mipInt + 1.0);\n\n      return vec4(mix(color0, color1, mipF) * envMapStrength, 1.0);\n\n    }\n\n  }\n\n#endif\n"
            },
            3557: function(e) {
                e.exports = "gl_FragColor.rgb = setExposure(gl_FragColor.rgb, exposure);\n"
            },
            5004: function(e) {
                e.exports = "uniform float exposure;\n\nvec3 setExposure(vec3 value, float exposure) {\n  return vec3(1.0) - exp(-value * exposure);\n}\n"
            },
            574: function(e) {
                e.exports = "// *** IMPORTANT ***\n//\n// This is a quick hack to enable rotation for IBL for scene background \n// and PBR lighting in Standard/Physical shaders. This chunk is identical as the original \n// three's `cube_uv_reflection_fragment` but only difference is in `textureCubeUV` Where \n// it transforms `sampleDir` with `envMapOrientation`. \n// Make sure to check if there is any updates in the original chunk whenever you update \n// threejs version\n\n\n#ifdef ENVMAP_TYPE_CUBE_UV\n\nuniform float envMapBlurriness;\nuniform vec3 envMapOrientation;\n\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_minTileSize 16.0\n\n// These shader functions convert between the UV coordinates of a single face of\n// a cubemap, the 0-5 integer index of a cube face, and the direction vector for\n// sampling a textureCube (not generally normalized ).\n\nfloat getFace(vec3 direction) {\n\n    vec3 absDirection = abs(direction);\n\n    float face = -1.0;\n\n    if(absDirection.x > absDirection.z) {\n\n        if(absDirection.x > absDirection.y)\n\n            face = direction.x > 0.0 ? 0.0 : 3.0;\n\n        else\n\n            face = direction.y > 0.0 ? 1.0 : 4.0;\n\n    } else {\n\n        if(absDirection.z > absDirection.y)\n\n            face = direction.z > 0.0 ? 2.0 : 5.0;\n\n        else\n\n            face = direction.y > 0.0 ? 1.0 : 4.0;\n\n    }\n\n    return face;\n\n}\n\n  // RH coordinate system; PMREM face-indexing convention\nvec2 getUV(vec3 direction, float face) {\n\n    vec2 uv;\n\n    if(face == 0.0) {\n\n        uv = vec2(direction.z, direction.y) / abs(direction.x); // pos x\n\n    } else if(face == 1.0) {\n\n        uv = vec2(-direction.x, -direction.z) / abs(direction.y); // pos y\n\n    } else if(face == 2.0) {\n\n        uv = vec2(-direction.x, direction.y) / abs(direction.z); // pos z\n\n    } else if(face == 3.0) {\n\n        uv = vec2(-direction.z, direction.y) / abs(direction.x); // neg x\n\n    } else if(face == 4.0) {\n\n        uv = vec2(-direction.x, direction.z) / abs(direction.y); // neg y\n\n    } else {\n\n        uv = vec2(direction.x, direction.y) / abs(direction.z); // neg z\n\n    }\n\n    return 0.5 * (uv + 1.0);\n\n}\n\nvec3 bilinearCubeUV(sampler2D envMap, vec3 direction, float mipInt) {\n\n    float face = getFace(direction);\n\n    float filterInt = max(cubeUV_minMipLevel - mipInt, 0.0);\n\n    mipInt = max(mipInt, cubeUV_minMipLevel);\n\n    float faceSize = exp2(mipInt);\n\n    highp vec2 uv = getUV(direction, face) * (faceSize - 2.0) + 1.0; // #25071\n\n    if(face > 2.0) {\n\n        uv.y += faceSize;\n\n        face -= 3.0;\n\n    }\n\n    uv.x += face * faceSize;\n\n    uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\n    uv.y += 4.0 * (exp2(CUBEUV_MAX_MIP) - faceSize);\n\n    uv.x *= CUBEUV_TEXEL_WIDTH;\n    uv.y *= CUBEUV_TEXEL_HEIGHT;\n\n    #ifdef texture2DGradEXT\n\n    return texture2DGradEXT(envMap, uv, vec2(0.0), vec2(0.0)).rgb; // disable anisotropic filtering\n\n    #else\n\n    return texture2D(envMap, uv).rgb;\n\n    #endif\n\n}\n\n  // These defines must match with PMREMGenerator\n\n  #define cubeUV_r0 1.0\n  #define cubeUV_v0 0.339\n  #define cubeUV_m0 - 2.0\n  #define cubeUV_r1 0.8\n  #define cubeUV_v1 0.276\n  #define cubeUV_m1 - 1.0\n  #define cubeUV_r4 0.4\n  #define cubeUV_v4 0.046\n  #define cubeUV_m4 2.0\n  #define cubeUV_r5 0.305\n  #define cubeUV_v5 0.016\n  #define cubeUV_m5 3.0\n  #define cubeUV_r6 0.21\n  #define cubeUV_v6 0.0038\n  #define cubeUV_m6 4.0\n\nfloat roughnessToMip(float roughness) {\n\n    float mip = 0.0;\n\n    if(roughness >= cubeUV_r1) {\n\n        mip = (cubeUV_r0 - roughness) * (cubeUV_m1 - cubeUV_m0) / (cubeUV_r0 - cubeUV_r1) + cubeUV_m0;\n\n    } else if(roughness >= cubeUV_r4) {\n\n        mip = (cubeUV_r1 - roughness) * (cubeUV_m4 - cubeUV_m1) / (cubeUV_r1 - cubeUV_r4) + cubeUV_m1;\n\n    } else if(roughness >= cubeUV_r5) {\n\n        mip = (cubeUV_r4 - roughness) * (cubeUV_m5 - cubeUV_m4) / (cubeUV_r4 - cubeUV_r5) + cubeUV_m4;\n\n    } else if(roughness >= cubeUV_r6) {\n\n        mip = (cubeUV_r5 - roughness) * (cubeUV_m6 - cubeUV_m5) / (cubeUV_r5 - cubeUV_r6) + cubeUV_m5;\n\n    } else {\n\n        mip = -2.0 * log2(1.16 * roughness); // 1.16 = 1.79^0.25\n    }\n\n    return mip;\n\n}\n\n// https://gist.github.com/keijiro/ee439d5e7388f3aafc5296005c8c3f33\nmat3 angleAxis3x3(float angle, vec3 axis) {\n    \n    float c = cos(angle);\n    float s = sin(angle);\n\n    float t = 1. - c;\n    float x = axis.x;\n    float y = axis.y;\n    float z = axis.z;\n\n    return mat3(\n        t * x * x + c, t * x * y - s * z, t * x * z + s * y, \n        t * x * y + s * z, t * y * y + c, t * y * z - s * x, \n        t * x * z - s * y, t * y * z + s * x, t * z * z + c\n    );\n\n}\n\n// 90 deg PI/2 rad\n#define ENV_ORIENTATION_Y_OFFSET 1.57079632679\n\nvec4 textureCubeUV(sampler2D envMap, vec3 sampleDir, float roughness) {\n\n    vec3 forward = vec3(0, 0, 1);\n    vec3 right = vec3(1, 0, 0);\n    vec3 up = vec3(0, 1, 0);\n\n    roughness += envMapBlurriness;\n\n    sampleDir = angleAxis3x3(envMapOrientation.y + ENV_ORIENTATION_Y_OFFSET, up) * angleAxis3x3(envMapOrientation.x, right) * angleAxis3x3(envMapOrientation.z, forward) * sampleDir;\n\n    float mip = clamp(roughnessToMip(roughness), cubeUV_m0, CUBEUV_MAX_MIP);\n\n    float mipF = fract(mip);\n\n    float mipInt = floor(mip);\n\n    vec3 color0 = bilinearCubeUV(envMap, sampleDir, mipInt);\n\n    if(mipF == 0.0) {\n\n        return vec4(color0, 1.0);\n\n    } else {\n\n        vec3 color1 = bilinearCubeUV(envMap, sampleDir, mipInt + 1.0);\n\n        return vec4(mix(color0, color1, mipF), 1.0);\n\n    }\n\n}\n#endif\n"
            },
            5168: function(e) {
                e.exports = "gl_FragColor.rgb = adjustExposure(gl_FragColor.rgb, exposure);\n"
            },
            901: function(e) {
                e.exports = "uniform float exposure;\n\nvec3 adjustExposure(vec3 value, float exposure) {\n  return value * pow(2.0, exposure);\n}\n"
            },
            4789: function(e) {
                e.exports = "#ifdef USE_LIGHTMAP\n\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n  uniform vec3 lightMapColor;\n\n#endif\n"
            },
            403: function(e) {
                e.exports = "#if defined( RE_IndirectDiffuse )\n\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n    lightMapTexel.rgb *= lightMapColor;\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\n\t\tirradiance += lightMapIrradiance;\n\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tiblIrradiance += getIBLIrradiance( geometry.normal );\n\n\t#endif\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n\t#ifdef USE_ANISOTROPY\n\n\t\tradiance += getIBLAnisotropyRadiance( geometry.viewDir, geometry.normal, material.roughness, material.anisotropyB, material.anisotropy );\n\n\t#else\n\n\t\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\n\t#endif\n\n#endif\n"
            },
            3592: function(e) {
                e.exports = "\nvec3 v = normalize(cameraPosition - vWorldPosition);\nvec3 n = inverseTransformDirection(mix(vec3(0.0, 0.0, 1.0), normal, ocularNormalScaling), viewMatrix);\nvec3 vRefraction = normalize(refract(-v, normalize(n), 1.0 / ocularIOR));\n\n// rotate environment\n// TODO: roll these rotations into a single matrix, move into vertex shader\n// vRefraction = rotateAxis(vRefraction, vec3(1., 0., 0.), rotateV); // pitch\n// vRefraction = rotateAxis(vRefraction, vec3(0., 1., 0.), rotateH); // yaw\n// vRefraction = rotateAxis(vRefraction, vec3(0., 0., 1.), rotateImage); // roll\n// vRefraction = normalize(vRefraction);\n\nvec2 offset = vec2(imageCenterH, imageCenterV);\n\n// planar\nvec3 up = vec3(0., 1., 0.);\nvec3 right = vec3(1., 0., 0.);\n\nvec3 p0 = emissiveWorldPos;\nvec3 p1 =\nrotateAxis(\n  rotateAxis(\n    vec3(1., 0., 0.),\n    right,\n    rotateV\n  ),\n  up,\n  rotateH\n);\nvec3 p2 = \nrotateAxis(\n  rotateAxis(\n    vec3(0., 1., 0.),\n    right,\n    rotateV\n  ),\n  up,\n  rotateH\n);\n\n\nvec3 la = vWorldPosition;\nvec3 lb = vWorldPosition + vRefraction;\nvec4 intersectionResult = planeLineIntersection(p0, p1, p2, la, lb);\nfloat intersectionIndicator = intersectionResult.x;\nvec3 intersectionLocation = intersectionResult.yzw;\n\n// I don't know why the first dot uses negative vectors.  ¯\\_(ツ)_/¯ \nfloat planarU = dot(p0, -p1) + dot(intersectionLocation, p1);\nfloat planarV = dot(p0, -p2) + dot(intersectionLocation, p2);\n\n// totalEmissiveRadiance.r = planarU;\n// totalEmissiveRadiance.g = planarV;\nvec2 lookupBasis = vec2(planarU, planarV);\n// end planar\n\n\nvec2 lookupUv = lookupBasis * vec2(1.0, aspect) * (1.0 / zoom) + offset;\n\ntotalEmissiveRadiance = texture2D(ocularEmissiveMap, lookupUv, bias).rgb;\n\ntotalEmissiveRadiance *= smoothstep(0.0, vignette, lookupUv.x);\ntotalEmissiveRadiance *= smoothstep(1.0, 1.0 - vignette, lookupUv.x);\ntotalEmissiveRadiance *= smoothstep(0.0, vignette, lookupUv.y);\ntotalEmissiveRadiance *= smoothstep(1.0, 1.0 - vignette, lookupUv.y);\n\nfloat glancing = pow(dot(n, v), pow(2.0, glancingShape));\ntotalEmissiveRadiance *= 1.0 - (1.0 - glancing) * glancingAmount;\ntotalEmissiveRadiance *= ocularEmissiveIntensity;\n\ntotalEmissiveRadiance.r = mix(totalEmissiveRadiance.r, mod(lookupBasis.x, 1.0), planeDebugGrid);\ntotalEmissiveRadiance.g = mix(totalEmissiveRadiance.g, mod(lookupBasis.y, 1.0), planeDebugGrid);\n// totalEmissiveRadiance.b += clamp(intersectionIndicator, 0., 1.);\n\n"
            },
            6912: function(e) {
                e.exports = 'varying vec3 vWorldPosition;\nuniform float ocularIOR;\nuniform float ocularNormalScaling;\nuniform float glancingAmount;\nuniform float glancingShape;\nuniform float imageCenterH;\nuniform float imageCenterV;\nuniform float rotateH;\nuniform float rotateV;\nuniform float rotateImage;\nuniform float zoom;\nuniform vec3 emissiveWorldPos;\nuniform float vignette;\nuniform float bias;\nuniform float aspect;\nuniform float planeDebugGrid;\n\nuniform sampler2D ocularEmissiveMap;\nuniform float ocularEmissiveIntensity;\n\n//  from https://www.neilmendoza.com/glsl-rotation-about-an-arbitrary-axis/\nvec3 rotateAxis(vec3 p, vec3 axis, float angle) {\n  return mix(\n    dot(axis, p) * axis, \n    p,\n    cos(angle)) +\n    cross(axis, p) *\n    sin(angle)\n  ;\n}\n\n/*\nCopyright 2021 Antoine Morin-Paulhus\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n/*\n  Find the intersection of a plane and a line.\n  Parameters:\n  P0 : A point on the plane\n  P01: Another point of the plane\n  P02: Another point of the plane\n  la: Line point a\n  lb: Line point b\n       .P01_________\n       |            |\n       |        lb  |\n       |       /    |\n    P0 .______/_____.P02\n             /\n            /la\n  Returns a vector vec.xyzw where x is and indicator. x < 0 if there is no intersection or\n  infinite intersections (line is on plane).\n  Otherwise, the intersection point coordinates are returned in vec.yzw.\n*/\nvec4 planeLineIntersection(vec3 P0, vec3 P01, vec3 P02, vec3 la, vec3 lb) {\n  // Many thanks to wikipedia\n  // Reference:\n  // https://en.wikipedia.org/wiki/Line%E2%80%93plane_intersection\n  vec3 lab = lb - la;\n  float det = - dot(lab, cross(P01,P02));\n\n  if (abs(det) < 0.01) {\n    return vec4(-1.0,0.0,0.0,0.0);\n  }\n\n  float t = 1.0/det * dot(cross(P01, P02), la - P0);\n  float u = 1.0/det * dot(cross(P02, -lab), la - P0);\n  float v = 1.0/det * dot(cross(-lab, P01), la - P0);\n\n  vec3 x = P0 + P01 * u + P02 * v;\n\n  float indicator = 1.0;\n\n  // Return if intersection is not between la and lb\n  // This can be useful depending on your use case.\n  //if (t < 0.0 || t > 1.0) {\n  //  indicator = -2.0;\n  //}\n\n  if (u < -0.01 || v < -0.01 || u > 1.01 || v > 1.01) {\n    indicator = -3.0;\n  }\n\n  vec4 ret;\n  ret.xyzw = vec4(indicator, x);\n  return ret;\n}\n'
            },
            6379: function(e) {
                e.exports = "\nvec4 worldPosition = vec4( transformed, 1.0 );\nworldPosition = modelMatrix * worldPosition;\nvWorldPosition = worldPosition.xyz;\n"
            },
            3451: function(e) {
                e.exports = "#ifdef USE_UV\n\n    varying vec2 o_vUv;\n  vec2 vUv;\n\n#endif\n#ifdef USE_MAP\n\n    varying vec2 o_vMapUv;\n  vec2 vMapUv;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n  varying vec2 vAlphaMapUv;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n  varying vec2 o_vLightMapUv;\n  vec2 vLightMapUv;\n\n#endif\n#ifdef USE_AOMAP\n\n  varying vec2 o_vAoMapUv;\n  vec2 vAoMapUv;\n\n#endif\n#ifdef USE_BUMPMAP\n\n    varying vec2 o_vBumpMapUv;\n  vec2 vBumpMapUv;\n\n#endif\n#ifdef USE_NORMALMAP\n\n    varying vec2 o_vNormalMapUv;\n  vec2 vNormalMapUv;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n    varying vec2 o_vEmissiveMapUv;\n  vec2 vEmissiveMapUv;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n    varying vec2 o_vMetalnessMapUv;\n  vec2 vMetalnessMapUv;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n    varying vec2 o_vRoughnessMapUv;\n  vec2 vRoughnessMapUv;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n  varying vec2 o_vClearcoatMapUv;\n  vec2 vClearcoatMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n  varying vec2 o_vClearcoatNormalMapUv;\n  vec2 vClearcoatNormalMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n  varying vec2 o_vClearcoatRoughnessMapUv;\n  vec2 vClearcoatRoughnessMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n  varying vec2 o_vIridescenceMapUv;\n  vec2 vIridescenceMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n  varying vec2 o_vIridescenceThicknessMapUv;\n  vec2 vIridescenceThicknessMapUv;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n  varying vec2 o_vSheenColorMapUv;\n  vec2 vSheenColorMapUv;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n  varying vec2 o_vSheenRoughnessMapUv;\n  vec2 vSheenRoughnessMapUv;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n    varying vec2 o_vSpecularMapUv;\n  vec2 vSpecularMapUv;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n    varying vec2 o_vSpecularColorMapUv;\n  vec2 vSpecularColorMapUv;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n    varying vec2 o_vSpecularIntensityMapUv;\n  vec2 vSpecularIntensityMapUv;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n  uniform mat3 transmissionMapTransform;\n  varying vec2 vTransmissionMapUv;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n  uniform mat3 thicknessMapTransform;\n  varying vec2 vThicknessMapUv;\n\n#endif\n"
            },
            9275: function(e) {
                e.exports = "#ifdef USE_UV\n\n  varying vec2 o_vUv;\n\n#endif\n#ifdef USE_UV2\n\n  attribute vec2 uv2;\n\n#endif\n#ifdef USE_MAP\n\n  uniform mat3 mapTransform;\n  varying vec2 o_vMapUv;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n  uniform mat3 alphaMapTransform;\n  varying vec2 vAlphaMapUv;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n  uniform mat3 lightMapTransform;\n  varying vec2 o_vLightMapUv;\n\n#endif\n#ifdef USE_AOMAP\n\n  uniform mat3 aoMapTransform;\n  varying vec2 o_vAoMapUv;\n\n#endif\n#ifdef USE_BUMPMAP\n\n  uniform mat3 bumpMapTransform;\n  varying vec2 o_vBumpMapUv;\n\n#endif\n#ifdef USE_NORMALMAP\n\n  uniform mat3 normalMapTransform;\n  varying vec2 o_vNormalMapUv;\n\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\n  uniform mat3 displacementMapTransform;\n  varying vec2 vDisplacementMapUv;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n  uniform mat3 emissiveMapTransform;\n  varying vec2 o_vEmissiveMapUv;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n  uniform mat3 metalnessMapTransform;\n  varying vec2 o_vMetalnessMapUv;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n  uniform mat3 roughnessMapTransform;\n  varying vec2 o_vRoughnessMapUv;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n  uniform mat3 clearcoatMapTransform;\n  varying vec2 o_vClearcoatMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n  uniform mat3 clearcoatNormalMapTransform;\n  varying vec2 o_vClearcoatNormalMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n  uniform mat3 clearcoatRoughnessMapTransform;\n  varying vec2 o_vClearcoatRoughnessMapUv;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n  uniform mat3 sheenColorMapTransform;\n  varying vec2 o_vSheenColorMapUv;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n  uniform mat3 sheenRoughnessMapTransform;\n  varying vec2 o_vSheenRoughnessMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n  uniform mat3 iridescenceMapTransform;\n  varying vec2 o_vIridescenceMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n  uniform mat3 iridescenceThicknessMapTransform;\n  varying vec2 o_vIridescenceThicknessMapUv;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n  uniform mat3 specularMapTransform;\n  varying vec2 o_vSpecularMapUv;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n  uniform mat3 specularColorMapTransform;\n  varying vec2 o_vSpecularColorMapUv;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n  uniform mat3 specularIntensityMapTransform;\n  varying vec2 o_vSpecularIntensityMapUv;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n  uniform mat3 transmissionMapTransform;\n  varying vec2 vTransmissionMapUv;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n  uniform mat3 thicknessMapTransform;\n  varying vec2 vThicknessMapUv;\n\n#endif\n"
            },
            8542: function(e) {
                e.exports = "#ifdef USE_UV\n\n  o_vUv = vec3( uv, 1 ).xy;\n\n#endif\n#ifdef USE_MAP\n\n  o_vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n  vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n  o_vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_AOMAP\n\n  o_vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_BUMPMAP\n\n  o_vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_NORMALMAP\n\n  o_vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\n  vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n  o_vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n  o_vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n  o_vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n  o_vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n  o_vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n  o_vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n  o_vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n  o_vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n  o_vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n  o_vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n  o_vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n  o_vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n  o_vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n  vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n  vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n\n#endif\n"
            },
            3188: function(e) {
                e.exports = "vec2 parallaxUV = vec2(0, 0);\n\n#ifdef USE_UV\n\n    parallaxUV = getParallaxMappingUV(-vViewPosition, normalize(vNormal), normalize(vViewPosition), o_vUv);\n\n    if(clipBorders(parallaxUV))\n        discard;\n\n    vUv = parallaxUV;\n\n#endif\n#ifdef USE_MAP\n\n    parallaxUV = getParallaxMappingUV(-vViewPosition, normalize(vNormal), normalize(vViewPosition), o_vMapUv);\n\n    if(clipBorders(parallaxUV))\n        discard;\n\n    vMapUv = parallaxUV;\n\n#endif\n#ifdef USE_BUMPMAP\n\n  vBumpMapUv = parallaxUV;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n    vLightMapUv = o_vLightMapUv;\n\n    if(parallaxUseLightmap > 0.5)\n  {\n        if(parallaxLightmapUseOwnUV > 0.5)\n            vLightMapUv = getParallaxMappingUV(-vViewPosition, normalize(vNormal), normalize(vViewPosition), o_vLightMapUv);\n        else\n            vLightMapUv = parallaxUV;\n    }\n\n#endif\n#ifdef USE_AOMAP\n\n    vAoMapUv = o_vAoMapUv;\n\n    if(parallaxAOUseOwnUV > 0.5)\n        vAoMapUv = getParallaxMappingUV(-vViewPosition, normalize(vNormal), normalize(vViewPosition), o_vAoMapUv);\n    else\n        vAoMapUv = parallaxUV;\n\n#endif\n#ifdef USE_NORMALMAP\n\n    vNormalMapUv = parallaxUV;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n    vEmissiveMapUv = parallaxUV;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n    vMetalnessMapUv = parallaxUV;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n    vRoughnessMapUv = parallaxUV;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n  vClearcoatMapUv = parallaxUV;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n  vClearcoatNormalMapUv = parallaxUV;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n  vClearcoatRoughnessMapUv = parallaxUV;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n  vIridescenceMapUv = parallaxUV;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n  vIridescenceThicknessMapUv = parallaxUV;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n  vSheenColorMapUv = parallaxUV;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n  vSheenRoughnessMapUv = parallaxUV;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n    vSpecularMapUv = parallaxUV;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n    vSpecularColorMapUv = parallaxUV;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n    vSpecularIntensityMapUv = parallaxUV;\n\n#endif\n"
            },
            12: function(e) {
                e.exports = "gl_FragColor.rgb = setParallaxMappingColor(gl_FragColor.rgb);"
            },
            5181: function(e) {
                e.exports = "uniform sampler2D parallaxMap;\nuniform float parallaxScale;\nuniform float parallaxMinLayers;\nuniform float parallaxMaxLayers;\n\nuniform float parallaxClip;\nuniform float parallaxMapInverted;\nuniform vec3 parallaxMapChannel;\n\nuniform vec4 parallaxUvTransform;\nuniform float parallaxClipOffset;\n\nuniform float parallaxAOUseOwnUV;\nuniform float parallaxUseLightmap;\nuniform float parallaxLightmapUseOwnUV;\n\nbool clipBorders(vec2 uv)\n{\n  vec4 clip = parallaxUvTransform;\n  clip.x += clip.z;\n  clip.y += clip.w;\n  clip.xy += -parallaxClipOffset;\n  clip.zw += parallaxClipOffset;\n\n    return parallaxClip > .5 && (uv.x > clip.x || uv.y > clip.y || uv.x < clip.z || uv.y < clip.w);\n}\n\nfloat sampleHeightMap(vec2 uv)\n{\n    if(parallaxMapInverted > .5)\n      return dot(vec4(parallaxMapChannel, 0.0), 1. - texture2D(parallaxMap, uv));\n  else\n      return dot(vec4(parallaxMapChannel, 0.0), texture2D(parallaxMap, uv));\n}\n\n#ifdef USE_BASIC_PARALLAX\n\n  vec2 parallaxMapping(vec3 V, vec2 uv) {\n    \n    float initialHeight = sampleHeightMap(uv);\n\n    // Offset Limiting\n    vec2 texCoordOffset = parallaxScale * V.xy * initialHeight;\n    return uv - texCoordOffset;\n  }\n\n#else\n\n  vec2 parallaxMapping(in vec3 V, vec2 uv) {\n\n    // Determine number of layers from angle between V and N\n    float numLayers = mix(parallaxMaxLayers, parallaxMinLayers, abs(dot(vec3(0.0, 0.0, 1.0), V)));\n    float layerHeight = 1.0/numLayers;\n    float currentLayerHeight = 0.0;\n\n    // Shift of texture coordinates for each iteration\n    vec2 dtex = parallaxScale * V.xy/V.z/numLayers;\n    vec2 currentTextureCoords = uv;\n    float heightFromTexture = sampleHeightMap(currentTextureCoords);\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < 30; i += 1 ) \n    {\n      if (heightFromTexture <= currentLayerHeight) \n        break;\n\n      currentLayerHeight += layerHeight;\n\n      // Shift texture coordinates along vector V\n      currentTextureCoords -= dtex;\n      heightFromTexture = sampleHeightMap(currentTextureCoords);\n    }\n    #pragma unroll_loop_end\n\n    #ifdef USE_STEEP_PARALLAX\n\n      return currentTextureCoords;\n\n    #elif defined(USE_RELIEF_PARALLAX)\n\n      vec2 deltaTexCoord = dtex / 2.0;\n      float deltaHeight = layerHeight / 2.0;\n\n      // Return to the mid point of previous layer\n      currentTextureCoords += deltaTexCoord;\n      currentLayerHeight -= deltaHeight;\n\n      // Binary search to increase precision of Steep Parallax Mapping\n      const int numSearches = 5;\n\n      #pragma unroll_loop_start\n      for (int i = 0; i < numSearches; i += 1) \n      {\n        deltaTexCoord /= 2.0;\n        deltaHeight /= 2.0;\n        heightFromTexture = sampleHeightMap(currentTextureCoords);\n        // Shift along or against vector V\n\n        // Below the surface\n        if(heightFromTexture > currentLayerHeight) \n        {\n          \n          currentTextureCoords -= deltaTexCoord;\n          currentLayerHeight += deltaHeight;\n\n        // above the surface\n        } else { \n\n          currentTextureCoords += deltaTexCoord;\n          currentLayerHeight -= deltaHeight;\n        }\n      }\n      #pragma unroll_loop_end\n\n      return currentTextureCoords;\n\n    #elif defined(USE_OCCLUSION_PARALLAX)\n\n      vec2 prevTCoords = currentTextureCoords + dtex;\n\n      // Heights for linear interpolation\n      float nextH = heightFromTexture - currentLayerHeight;\n      float prevH = sampleHeightMap(prevTCoords) - currentLayerHeight + layerHeight;\n\n      // Proportions for linear interpolation\n      float weight = nextH/(nextH - prevH);\n\n      // Interpolation of texture coordinates\n      return prevTCoords * weight + currentTextureCoords * (1.0 - weight);\n\n    #else\n\n      return currentTextureCoords;\n\n    #endif\n  }\n\n#endif\n\nvec2 getParallaxMappingUV(vec3 surfPosition, vec3 surfNormal, vec3 viewPosition, vec2 uv) {\n   vec2 texDx = dFdx(uv);\n  vec2 texDy = dFdy(uv);\n\n  vec3 vSigmaX = dFdx(surfPosition);\n  vec3 vSigmaY = dFdy(surfPosition);\n  vec3 vR1 = cross(vSigmaY, surfNormal);\n  vec3 vR2 = cross(surfNormal, vSigmaX);\n  float fDet = dot(vSigmaX, vR1);\n\n  vec2 vProjVscr = (1.0 / fDet) * vec2(dot(vR1, viewPosition), dot(vR2, viewPosition));\n  vec3 vProjVtex;\n\n  vProjVtex.xy = texDx * vProjVscr.x + texDy * vProjVscr.y;\n  vProjVtex.z = dot(surfNormal, viewPosition);\n\n  return parallaxMapping(vProjVtex, uv);\n}\n\n// Used for debug\nvec3 setParallaxMappingColor(vec3 value) {\n  return value ;\n}\n"
            },
            7501: function(e) {
                e.exports = "// *** IMPORTANT ***\n//\n// This is a quick hack to enable textured area light for `THREE.RectAreaLight`\n// in Standard/Physical shaders.\n// Make sure to check if there is any updates in the original chunk whenever you update \n// threejs version\n\n/**\n * This is a template that can be used to light a material, it uses pluggable\n * RenderEquations (RE)for specific lighting scenarios.\n *\n * Instructions for use:\n * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined\n * - Create a material parameter that is to be passed as the third parameter to your lighting functions.\n *\n * TODO:\n * - Add area light support.\n * - Add sphere light support.\n * - Add diffuse light probe (irradiance cubemap) support.\n */\n\nGeometricContext geometry;\n\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n#ifdef USE_CLEARCOAT\n\n  geometry.clearcoatNormal = clearcoatNormal;\n\n#endif\n\n#ifdef USE_IRIDESCENCE\n\n  float dotNVi = saturate( dot( normal, geometry.viewDir ) );\n\n  if ( material.iridescenceThickness == 0.0 ) {\n\n    material.iridescence = 0.0;\n\n  } else {\n\n    material.iridescence = saturate( material.iridescence );\n\n  }\n\n  if ( material.iridescence > 0.0 ) {\n\n    material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\n    // Iridescence F0 approximation\n    material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\n  }\n\n#endif\n\nIncidentLight directLight;\n\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n  PointLight pointLight;\n  #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n  PointLightShadow pointLightShadow;\n  #endif\n\n  #pragma unroll_loop_start\n  for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n    pointLight = pointLights[ i ];\n\n    getPointLightInfo( pointLight, geometry, directLight );\n\n    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n    pointLightShadow = pointLightShadows[ i ];\n    directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n    #endif\n\n    RE_Direct( directLight, geometry, material, reflectedLight );\n\n  }\n  #pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n  SpotLight spotLight;\n  vec4 spotColor;\n  vec3 spotLightCoord;\n  bool inSpotLightMap;\n\n  #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n  SpotLightShadow spotLightShadow;\n  #endif\n\n  #pragma unroll_loop_start\n  for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n    spotLight = spotLights[ i ];\n\n    getSpotLightInfo( spotLight, geometry, directLight );\n\n    // spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]\n    #if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n    #define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n    #elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n    #define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n    #else\n    #define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n    #endif\n\n    #if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n      spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n      inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n      spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n      directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n    #endif\n\n    #undef SPOT_LIGHT_MAP_INDEX\n\n    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n    spotLightShadow = spotLightShadows[ i ];\n    directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n    #endif\n\n    RE_Direct( directLight, geometry, material, reflectedLight );\n\n  }\n  #pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n  DirectionalLight directionalLight;\n  #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n  DirectionalLightShadow directionalLightShadow;\n  #endif\n\n  #pragma unroll_loop_start\n  for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n    directionalLight = directionalLights[ i ];\n\n    getDirectionalLightInfo( directionalLight, geometry, directLight );\n\n    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n    directionalLightShadow = directionalLightShadows[ i ];\n    directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n    #endif\n\n    RE_Direct( directLight, geometry, material, reflectedLight );\n\n  }\n  #pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n  RectAreaLight rectAreaLight;\n\n  // FIXME:\n  int rectIndex = 0;\n  #pragma unroll_loop_start\n  for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n    \n    rectAreaLight = rectAreaLights[ i ];\n\n    RE_Direct_RectArea( rectIndex, rectAreaLight, geometry, material, reflectedLight );\n    rectIndex++;\n\n  }\n  #pragma unroll_loop_end\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n  vec3 iblIrradiance = vec3( 0.0 );\n\n  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n  irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n\n  #if ( NUM_HEMI_LIGHTS > 0 )\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n  vec3 radiance = vec3( 0.0 );\n  vec3 clearcoatRadiance = vec3( 0.0 );\n\n#endif\n"
            },
            580: function(e) {
                e.exports = '// *** IMPORTANT ***\n//\n// This is a quick hack to enable textured area light for `THREE.RectAreaLight`\n// in Standard/Physical shaders.\n// Make sure to check if there is any updates in the original chunk whenever you update \n// threejs version\n\nstruct PhysicalMaterial {\n\n  vec3 diffuseColor;\n  float roughness;\n  vec3 specularColor;\n  float specularF90;\n\n  #ifdef USE_CLEARCOAT\n    float clearcoat;\n    float clearcoatRoughness;\n    vec3 clearcoatF0;\n    float clearcoatF90;\n  #endif\n\n  #ifdef USE_IRIDESCENCE\n    float iridescence;\n    float iridescenceIOR;\n    float iridescenceThickness;\n    vec3 iridescenceFresnel;\n    vec3 iridescenceF0;\n  #endif\n\n  #ifdef USE_SHEEN\n    vec3 sheenColor;\n    float sheenRoughness;\n  #endif\n\n  #ifdef IOR\n    float ior;\n  #endif\n\n  #ifdef USE_TRANSMISSION\n    float transmission;\n    float transmissionAlpha;\n    float thickness;\n    float attenuationDistance;\n    vec3 attenuationColor;\n  #endif\n\n};\n\n// FIXME:\n// Can\'t find a way to make dynamic indexing for sampler array, for now limit the count to 4 and manully sample it with number\n// See `FetchDiffuseFilteredTexture` as well\nuniform sampler2D areaLightMaps [ 4 ];\n// uniform sampler2D areaLightMaps [ NUM_RECT_AREA_LIGHTS ];\nuniform int lightLayerMasks [ 4 ];\nuniform int objectLayerMask;\n\n// temporary\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec3 sheenSpecular = vec3( 0.0 );\n\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n  float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n  float x2 = x * x;\n  float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n\n  return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n  float a2 = pow2( alpha );\n\n  float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n  float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n  return 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is "roughness squared" in Disney’s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n  float a2 = pow2( alpha );\n\n  float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n  return RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n#ifdef USE_CLEARCOAT\n\n  // GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility\n  vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\n    vec3 f0 = material.clearcoatF0;\n    float f90 = material.clearcoatF90;\n    float roughness = material.clearcoatRoughness;\n\n    float alpha = pow2( roughness ); // UE4\'s roughness\n\n    vec3 halfDir = normalize( lightDir + viewDir );\n\n    float dotNL = saturate( dot( normal, lightDir ) );\n    float dotNV = saturate( dot( normal, viewDir ) );\n    float dotNH = saturate( dot( normal, halfDir ) );\n    float dotVH = saturate( dot( viewDir, halfDir ) );\n\n    vec3 F = F_Schlick( f0, f90, dotVH );\n\n    float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n    float D = D_GGX( alpha, dotNH );\n\n    return F * ( V * D );\n\n  }\n\n#endif\n\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\n  vec3 f0 = material.specularColor;\n  float f90 = material.specularF90;\n  float roughness = material.roughness;\n\n  float alpha = pow2( roughness ); // UE4\'s roughness\n\n  vec3 halfDir = normalize( lightDir + viewDir );\n\n  float dotNL = saturate( dot( normal, lightDir ) );\n  float dotNV = saturate( dot( normal, viewDir ) );\n  float dotNH = saturate( dot( normal, halfDir ) );\n  float dotVH = saturate( dot( viewDir, halfDir ) );\n\n  vec3 F = F_Schlick( f0, f90, dotVH );\n\n  #ifdef USE_IRIDESCENCE\n\n    F = mix( F, material.iridescenceFresnel, material.iridescence );\n\n  #endif\n\n  float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n  float D = D_GGX( alpha, dotNH );\n\n  return F * ( V * D );\n\n}\n\n// Rect Area Light\n\nvec3 FetchDiffuseFilteredTexture(int index, vec3 p1_, vec3 p2_, vec3 p3_, vec3 p4_)\n{\n  // area light plane basis\n  vec3 V1 = p2_ - p1_;\n  vec3 V2 = p4_ - p1_;\n  vec3 planeOrtho = (cross(V1, V2));\n  float planeAreaSquared = dot(planeOrtho, planeOrtho);\n  float planeDistxPlaneArea = dot(planeOrtho, p1_);\n  // orthonormal projection of (0,0,0) in area light space\n  vec3 P = planeDistxPlaneArea * planeOrtho / planeAreaSquared - p1_;\n\n  // find tex coords of P\n  float dot_V1_V2 = dot(V1,V2);\n  float inv_dot_V1_V1 = 1.0 / dot(V1, V1);\n  vec3 V2_ = V2 - V1 * dot_V1_V2 * inv_dot_V1_V1;\n  vec2 Puv;\n  Puv.y = dot(V2_, P) / dot(V2_, V2_);\n  Puv.x = dot(V1, P)*inv_dot_V1_V1 - dot_V1_V2*inv_dot_V1_V1*Puv.y;\n  \n  // Clamp uv to prevent repeat sampling\n  Puv = min(max(Puv, 0.), 1.);\n\n  // LOD\n  float d = abs(planeDistxPlaneArea) / pow(planeAreaSquared, 0.75);\n  d = log(512.0*d)/log(3.0);\n\n  // return texture2DLod(texLightFiltered, vec2(0.125, 0.125) + 0.75 * Puv, log(2048.0*d)/log(3.0) ).rgb;\n  \n  // FIXME:\n  // Can\'t find a way to make dynamic indexing for sampler array, for now limit the count to 4 and manully sample it with number\n  if (index == 1) {\n    vec4 color = texture(areaLightMaps[1], Puv, d );\n    return color.rgb * color.a;\n  } else if (index == 2) {\n    vec4 color = texture(areaLightMaps[2], Puv, d );\n    return color.rgb * color.a;\n  } else if (index == 3) {\n    vec4 color = texture(areaLightMaps[3], Puv, d );\n    return color.rgb * color.a;\n  } else {\n    vec4 color = texture(areaLightMaps[0], Puv, d );\n    return color.rgb * color.a;\n  }\n}\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n  const float LUT_SIZE = 64.0;\n  const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n  const float LUT_BIAS = 0.5 / LUT_SIZE;\n\n  float dotNV = saturate( dot( N, V ) );\n\n  // texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n  vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n  uv = uv * LUT_SCALE + LUT_BIAS;\n\n  return uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n  // Real-Time Area Lighting: a Journey from Research to Production (p.102)\n  // An approximation of the form factor of a horizon-clipped rectangle.\n\n  float l = length( f );\n\n  return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n  float x = dot( v1, v2 );\n\n  float y = abs( x );\n\n  // rational polynomial approximation to theta / sin( theta ) / 2PI\n  float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n  float b = 3.4175940 + ( 4.1616724 + y ) * y;\n  float v = a / b;\n\n  float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n  return cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( in int index, const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n  // bail if point is on back side of plane of light\n  // assumes ccw winding order of light vertices\n  vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n  vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n  vec3 lightNormal = cross( v1, v2 );\n\n  if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n  // construct orthonormal basis around N\n  vec3 T1, T2;\n  T1 = normalize( V - N * dot( V, N ) );\n  T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n  // compute transform\n  mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n  // transform rect\n  vec3 coords[ 4 ];\n  coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n  coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n  coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n  coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n  // https://eheitzresearch.wordpress.com/415-2/\n  // https://advances.realtimerendering.com/s2016/s2016_ltc_rnd.pdf\n  vec3 c = FetchDiffuseFilteredTexture(index, coords[0], coords[1], coords[2], coords[3]).rgb;\n\n  // project rect onto sphere\n  coords[ 0 ] = normalize( coords[ 0 ] );\n  coords[ 1 ] = normalize( coords[ 1 ] );\n  coords[ 2 ] = normalize( coords[ 2 ] );\n  coords[ 3 ] = normalize( coords[ 3 ] );\n\n  // calculate vector form factor\n  vec3 vectorFormFactor = vec3( 0.0 );\n  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n  // adjust for horizon clipping\n  float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n/*\n  // alternate method of adjusting for horizon clipping (see referece)\n  // refactoring required\n  float len = length( vectorFormFactor );\n  float z = vectorFormFactor.z / len;\n\n  const float LUT_SIZE = 64.0;\n  const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n  const float LUT_BIAS = 0.5 / LUT_SIZE;\n\n  // tabulated horizon-clipped sphere, apparently...\n  vec2 uv = vec2( z * 0.5 + 0.5, len );\n  uv = uv * LUT_SCALE + LUT_BIAS;\n\n  float scale = texture2D( ltc_2, uv ).w;\n\n  float result = len * scale;\n*/\n\n  float bitmask = float(lightLayerMasks [ index ] & objectLayerMask);\n  return vec3( result * c ) * bitmask;\n\n}\n\n// End Rect Area Light\n\n#if defined( USE_SHEEN )\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs\nfloat D_Charlie( float roughness, float dotNH ) {\n\n  float alpha = pow2( roughness );\n\n  // Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"\n  float invAlpha = 1.0 / alpha;\n  float cos2h = dotNH * dotNH;\n  float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16\n\n  return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n\n}\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\n  // Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"\n  return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n\n}\n\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\n  vec3 halfDir = normalize( lightDir + viewDir );\n\n  float dotNL = saturate( dot( normal, lightDir ) );\n  float dotNV = saturate( dot( normal, viewDir ) );\n  float dotNH = saturate( dot( normal, halfDir ) );\n\n  float D = D_Charlie( sheenRoughness, dotNH );\n  float V = V_Neubelt( dotNV, dotNL );\n\n  return sheenColor * ( D * V );\n\n}\n\n#endif\n\n// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from \n// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found\n// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\n  float dotNV = saturate( dot( normal, viewDir ) );\n\n  float r2 = roughness * roughness;\n\n  float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\n  float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\n  float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\n  return saturate( DG * RECIPROCAL_PI );\n\n}\n\n// Analytical approximation of the DFG LUT, one half of the\n// split-sum approximation used in indirect specular lighting.\n// via \'environmentBRDF\' from "Physically Based Shading on Mobile"\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\n  float dotNV = saturate( dot( normal, viewDir ) );\n\n  const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n  const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n  vec4 r = roughness * c0 + c1;\n\n  float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n  vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\n  return fab;\n\n}\n\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\n  vec2 fab = DFGApprox( normal, viewDir, roughness );\n\n  return specularColor * fab.x + specularF90 * fab.y;\n\n}\n\n// Fdez-Agüera\'s "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"\n// Approximates multiscattering in order to preserve energy.\n// http://www.jcgt.org/published/0008/01/03/\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\n  vec2 fab = DFGApprox( normal, viewDir, roughness );\n\n  #ifdef USE_IRIDESCENCE\n\n    vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\n  #else\n\n    vec3 Fr = specularColor;\n\n  #endif\n\n  vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\n  float Ess = fab.x + fab.y;\n  float Ems = 1.0 - Ess;\n\n  vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21\n  vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\n  singleScatter += FssEss;\n  multiScatter += Fms * Ems;\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n  void RE_Direct_RectArea_Physical( in int index, const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n    vec3 normal = geometry.normal;\n    vec3 viewDir = geometry.viewDir;\n    vec3 position = geometry.position;\n    vec3 lightPos = rectAreaLight.position;\n    vec3 halfWidth = rectAreaLight.halfWidth;\n    vec3 halfHeight = rectAreaLight.halfHeight;\n    vec3 lightColor = rectAreaLight.color;\n    float roughness = material.roughness;\n\n    vec3 rectCoords[ 4 ];\n    rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction\n    rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n    rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n    rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\n    vec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n    vec4 t1 = texture2D( ltc_1, uv );\n    vec4 t2 = texture2D( ltc_2, uv );\n\n    mat3 mInv = mat3(\n      vec3( t1.x, 0, t1.y ),\n      vec3(    0, 1,    0 ),\n      vec3( t1.z, 0, t1.w )\n    );\n\n    // LTC Fresnel Approximation by Stephen Hill\n    // http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n    vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n    reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( index, normal, viewDir, position, mInv, rectCoords );\n\n    reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( index, normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n  }\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n  float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\n  vec3 irradiance = dotNL * directLight.color;\n\n  #ifdef USE_CLEARCOAT\n\n    float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\n    vec3 ccIrradiance = dotNLcc * directLight.color;\n\n    clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );\n\n  #endif\n\n  #ifdef USE_SHEEN\n\n    sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );\n\n  #endif\n\n  reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );\n\n  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\n  #ifdef USE_CLEARCOAT\n\n    clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\n  #endif\n\n  #ifdef USE_SHEEN\n\n    sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );\n\n  #endif\n\n  // Both indirect specular and indirect diffuse light accumulate here\n\n  vec3 singleScattering = vec3( 0.0 );\n  vec3 multiScattering = vec3( 0.0 );\n  vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\n  #ifdef USE_IRIDESCENCE\n\n    computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\n  #else\n\n    computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\n  #endif\n\n  vec3 totalScattering = singleScattering + multiScattering;\n  vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\n  reflectedLight.indirectSpecular += radiance * singleScattering;\n  reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\n  reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\n}\n\n#define RE_Direct        RE_Direct_Physical\n#define RE_Direct_RectArea    RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse    RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular    RE_IndirectSpecular_Physical\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n  return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n'
            },
            8168: function(e) {
                e.exports = "precision highp float;\n\nuniform vec3 uColor;\nuniform float uAlpha;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nvoid main() {\n  vec4 color = vec4(uColor, uAlpha);\n\n  gl_FragColor = color;\n}\n"
            },
            6351: function(e) {
                e.exports = "precision highp float;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nvoid main() {\n  vPos = position;\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"
            },
            3763: function(e) {
                e.exports = "precision highp float;\n\nvarying vec2 vUv;\n\nuniform sampler2D uSourceTexture;\nuniform sampler2D uDestinationTexture;\n\nuniform float uInterpolation;\n\nvoid main() {\n  vec4 source = texture2D(uSourceTexture, vUv);\n  vec4 destination = texture2D(uDestinationTexture, vUv);\n\n  gl_FragColor = mix(source, destination, uInterpolation);\n}\n"
            },
            4511: function(e) {
                e.exports = "precision highp float;\n\nuniform vec3 uPrimaryColor;\nuniform vec3 uSecondaryColor;\n\nuniform vec3 uMultiplier;\nuniform float uTime;\nuniform float uVelocity;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nfloat range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n  float oldRange = oldMax - oldMin;\n  float newRange = newMax - newMin;\n  return (((oldValue - oldMin) * newRange) / oldRange) + newMin;\n}\n\nfloat crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n  return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMax, newMin), max(newMin, newMax));\n}\n\nvec2 crange(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {\n  vec2 v;\n  v.x = crange(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = crange(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  return v;\n}\n\nvec2 range(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {\n  vec2 v;\n  v.x = range(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = range(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  return v;\n}\n\nvec3 crange(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {\n  vec3 v;\n  v.x = crange(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = crange(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  v.z = crange(oldValue.z, oldMin.z, oldMax.z, newMin.z, newMax.z);\n  return v;\n}\n\nvec3 range(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {\n  vec3 v;\n  v.x = range(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = range(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  v.z = range(oldValue.z, oldMin.z, oldMax.z, newMin.z, newMax.z);\n  return v;\n}\n\n\nfloat cnoise(vec2 v) {\n  float t = v.x * 0.3;\n  v.y *= 0.8;\n  float noise = 0.0;\n  float s = 0.5;\n  noise += range(sin(v.x * 0.9 / s + t * 10.0) + sin(v.x * 2.4 / s + t * 15.0) + sin(v.x * -3.5 / s + t * 4.0) + sin(v.x * -2.5 / s + t * 7.1), -1.0, 1.0, -0.3, 0.3);\n  noise += range(sin(v.y * -0.3 / s + t * 18.0) + sin(v.y * 1.6 / s + t * 18.0) + sin(v.y * 2.6 / s + t * 8.0) + sin(v.y * -2.6 / s + t * 4.5), -1.0, 1.0, -0.3, 0.3);\n  return noise;\n}\n\nfloat cnoise(vec3 v) {\n  float t = v.z * 0.3;\n  v.y *= 0.8;\n  float noise = 0.0;\n  float s = 0.5;\n  noise += range(sin(v.x * 0.9 / s + t * 10.0) + sin(v.x * 2.4 / s + t * 15.0) + sin(v.x * -3.5 / s + t * 4.0) + sin(v.x * -2.5 / s + t * 7.1), -1.0, 1.0, -0.3, 0.3);\n  noise += range(sin(v.y * -0.3 / s + t * 18.0) + sin(v.y * 1.6 / s + t * 18.0) + sin(v.y * 2.6 / s + t * 8.0) + sin(v.y * -2.6 / s + t * 4.5), -1.0, 1.0, -0.3, 0.3);\n  return noise;\n}\n\nfloat getNoise(vec2 uv, float time) {\n  float x = uv.x * uv.y * time * 1000.0;\n  x = mod(x, 13.0) * mod(x, 123.0);\n  float dx = mod(x, 0.01);\n  float amount = clamp(0.1 + dx * 100.0, 0.0, 1.0);\n  return amount;\n}\n\nhighp float getRandom(vec2 co) {\n  highp float a = 12.9898;\n  highp float b = 78.233;\n  highp float c = 43758.5453;\n  highp float dt = dot(co.xy, vec2(a, b));\n  highp float sn = mod(dt, 3.14);\n  return fract(sin(sn) * c);\n}\n\n\nvoid main() {\n  vec4 color = vec4(mix(uPrimaryColor, uSecondaryColor, cnoise(vPos * uMultiplier + uTime * uVelocity)), 1.0);\n\n  gl_FragColor = color;\n}\n"
            },
            6586: function(e) {
                e.exports = "precision highp float;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nvoid main() {\n  vPos = position;\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"
            },
            4182: function(e) {
                e.exports = "precision highp float;\nvarying vec2 vUv;\nuniform sampler2D uMainTexture;\n\nvoid main() {\n  gl_FragColor = texture2D(uMainTexture, vUv);\n}\n"
            },
            8469: function(e) {
                e.exports = "varying vec2 vUv;\n\nvoid main() {\n  gl_Position = vec4(position, 1);\n\n  vUv = uv;\n}\n"
            },
            3839: function(e) {
                e.exports = "precision highp float;\n\nuniform sampler2D tMap;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nvoid main() {\n  vec4 color = texture2D(tMap, vUv);\n\n  gl_FragColor = color;\n}\n"
            },
            5398: function(e) {
                e.exports = "precision highp float;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nvoid main() {\n  vPos = position;\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"
            },
            1363: function(e) {
                e.exports = "float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n  float oldRange = oldMax - oldMin;\n  float newRange = newMax - newMin;\n  return (((oldValue - oldMin) * newRange) / oldRange) + newMin;\n}\n\nfloat crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n  return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMax, newMin), max(newMin, newMax));\n}\n\nvec2 crange(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {\n  vec2 v;\n  v.x = crange(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = crange(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  return v;\n}\n\nvec2 range(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {\n  vec2 v;\n  v.x = range(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = range(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  return v;\n}\n\nvec3 crange(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {\n  vec3 v;\n  v.x = crange(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = crange(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  v.z = crange(oldValue.z, oldMin.z, oldMax.z, newMin.z, newMax.z);\n  return v;\n}\n\nvec3 range(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {\n  vec3 v;\n  v.x = range(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = range(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  v.z = range(oldValue.z, oldMin.z, oldMax.z, newMin.z, newMax.z);\n  return v;\n}\n\n\nfloat cnoise(vec2 v) {\n  float t = v.x * 0.3;\n  v.y *= 0.8;\n  float noise = 0.0;\n  float s = 0.5;\n  noise += range(sin(v.x * 0.9 / s + t * 10.0) + sin(v.x * 2.4 / s + t * 15.0) + sin(v.x * -3.5 / s + t * 4.0) + sin(v.x * -2.5 / s + t * 7.1), -1.0, 1.0, -0.3, 0.3);\n  noise += range(sin(v.y * -0.3 / s + t * 18.0) + sin(v.y * 1.6 / s + t * 18.0) + sin(v.y * 2.6 / s + t * 8.0) + sin(v.y * -2.6 / s + t * 4.5), -1.0, 1.0, -0.3, 0.3);\n  return noise;\n}\n\nfloat cnoise(vec3 v) {\n  float t = v.z * 0.3;\n  v.y *= 0.8;\n  float noise = 0.0;\n  float s = 0.5;\n  noise += range(sin(v.x * 0.9 / s + t * 10.0) + sin(v.x * 2.4 / s + t * 15.0) + sin(v.x * -3.5 / s + t * 4.0) + sin(v.x * -2.5 / s + t * 7.1), -1.0, 1.0, -0.3, 0.3);\n  noise += range(sin(v.y * -0.3 / s + t * 18.0) + sin(v.y * 1.6 / s + t * 18.0) + sin(v.y * 2.6 / s + t * 8.0) + sin(v.y * -2.6 / s + t * 4.5), -1.0, 1.0, -0.3, 0.3);\n  return noise;\n}\n\nfloat getNoise(vec2 uv, float time) {\n  float x = uv.x * uv.y * time * 1000.0;\n  x = mod(x, 13.0) * mod(x, 123.0);\n  float dx = mod(x, 0.01);\n  float amount = clamp(0.1 + dx * 100.0, 0.0, 1.0);\n  return amount;\n}\n\nhighp float getRandom(vec2 co) {\n  highp float a = 12.9898;\n  highp float b = 78.233;\n  highp float c = 43758.5453;\n  highp float dt = dot(co.xy, vec2(a, b));\n  highp float sn = mod(dt, 3.14);\n  return fract(sin(sn) * c);\n}\n"
            },
            2901: function(e) {
                e.exports = "float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n  float oldRange = oldMax - oldMin;\n  float newRange = newMax - newMin;\n  return (((oldValue - oldMin) * newRange) / oldRange) + newMin;\n}\n\nfloat crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n  return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMax, newMin), max(newMin, newMax));\n}\n\nvec2 crange(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {\n  vec2 v;\n  v.x = crange(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = crange(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  return v;\n}\n\nvec2 range(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {\n  vec2 v;\n  v.x = range(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = range(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  return v;\n}\n\nvec3 crange(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {\n  vec3 v;\n  v.x = crange(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = crange(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  v.z = crange(oldValue.z, oldMin.z, oldMax.z, newMin.z, newMax.z);\n  return v;\n}\n\nvec3 range(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {\n  vec3 v;\n  v.x = range(oldValue.x, oldMin.x, oldMax.x, newMin.x, newMax.x);\n  v.y = range(oldValue.y, oldMin.y, oldMax.y, newMin.y, newMax.y);\n  v.z = range(oldValue.z, oldMin.z, oldMax.z, newMin.z, newMax.z);\n  return v;\n}\n"
            }
        }, __webpack_module_cache__ = {}, deferred;
        function __webpack_require__(e) {
            var t = __webpack_module_cache__[e];
            if (void 0 !== t)
                return t.exports;
            var n = __webpack_module_cache__[e] = {
                id: e,
                loaded: !1,
                exports: {}
            };
            return __webpack_modules__[e](n, n.exports, __webpack_require__),
            n.loaded = !0,
            n.exports
        }
        __webpack_require__.m = __webpack_modules__,
        deferred = [],
        __webpack_require__.O = function(e, t, n, i) {
            if (!t) {
                var a = 1 / 0;
                for (l = 0; l < deferred.length; l++) {
                    t = deferred[l][0],
                    n = deferred[l][1],
                    i = deferred[l][2];
                    for (var s = !0, r = 0; r < t.length; r++)
                        (!1 & i || a >= i) && Object.keys(__webpack_require__.O).every((function(e) {
                            return __webpack_require__.O[e](t[r])
                        }
                        )) ? t.splice(r--, 1) : (s = !1,
                        i < a && (a = i));
                    if (s) {
                        deferred.splice(l--, 1);
                        var o = n();
                        void 0 !== o && (e = o)
                    }
                }
                return e
            }
            i = i || 0;
            for (var l = deferred.length; l > 0 && deferred[l - 1][2] > i; l--)
                deferred[l] = deferred[l - 1];
            deferred[l] = [t, n, i]
        }
        ,
        __webpack_require__.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return __webpack_require__.d(t, {
                a: t
            }),
            t
        }
        ,
        __webpack_require__.d = function(e, t) {
            for (var n in t)
                __webpack_require__.o(t, n) && !__webpack_require__.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: t[n]
                })
        }
        ,
        __webpack_require__.g = function() {
            if ("object" == typeof globalThis)
                return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" == typeof window)
                    return window
            }
        }(),
        __webpack_require__.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        __webpack_require__.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        __webpack_require__.nmd = function(e) {
            return e.paths = [],
            e.children || (e.children = []),
            e
        }
        ,
        function() {
            var e = {
                179: 0
            };
            __webpack_require__.O.j = function(t) {
                return 0 === e[t]
            }
            ;
            var t = function(t, n) {
                var i, a, s = n[0], r = n[1], o = n[2], l = 0;
                if (s.some((function(t) {
                    return 0 !== e[t]
                }
                ))) {
                    for (i in r)
                        __webpack_require__.o(r, i) && (__webpack_require__.m[i] = r[i]);
                    if (o)
                        var h = o(__webpack_require__)
                }
                for (t && t(n); l < s.length; l++)
                    a = s[l],
                    __webpack_require__.o(e, a) && e[a] && e[a][0](),
                    e[a] = 0;
                return __webpack_require__.O(h)
            }
              , n = self.webpackChunkLotus = self.webpackChunkLotus || [];
            n.forEach(t.bind(null, 0)),
            n.push = t.bind(null, n.push.bind(n))
        }();
        var __webpack_exports__ = __webpack_require__.O(void 0, [926, 203], (function() {
            return __webpack_require__(9653)
        }
        ));
        return __webpack_exports__ = __webpack_require__.O(__webpack_exports__),
        __webpack_exports__
    }()
}
));
