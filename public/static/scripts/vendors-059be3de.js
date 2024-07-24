(self.webpackChunkLotus = self.webpackChunkLotus || []).push([
  [926],
  {
    9530: function (e) {
      e.exports = { majorVersionNumber: "3.x" };
    },
    9294: function (e, A, t) {
      "use strict";
      var n,
        r = t(7256).EventEmitterMicro,
        i = t(7453),
        o = t(8260);
      function s(e) {
        (e = e || {}),
          r.call(this),
          (this.id = o.getNewID()),
          (this.executor = e.executor || i),
          this._reset(),
          (this._willRun = !1),
          (this._didDestroy = !1);
      }
      ((n = s.prototype = Object.create(r.prototype)).run = function () {
        return this._willRun || (this._willRun = !0), this._subscribe();
      }),
        (n.cancel = function () {
          this._unsubscribe(),
            this._willRun && (this._willRun = !1),
            this._reset();
        }),
        (n.destroy = function () {
          var e = this.willRun();
          return (
            this.cancel(),
            (this.executor = null),
            r.prototype.destroy.call(this),
            (this._didDestroy = !0),
            e
          );
        }),
        (n.willRun = function () {
          return this._willRun;
        }),
        (n.isRunning = function () {
          return this._isRunning;
        }),
        (n._subscribe = function () {
          return this.executor.subscribe(this);
        }),
        (n._unsubscribe = function () {
          return this.executor.unsubscribe(this);
        }),
        (n._onAnimationFrameStart = function (e) {
          (this._isRunning = !0),
            (this._willRun = !1),
            this._didEmitFrameData ||
              ((this._didEmitFrameData = !0), this.trigger("start", e));
        }),
        (n._onAnimationFrameEnd = function (e) {
          this._willRun || (this.trigger("stop", e), this._reset());
        }),
        (n._reset = function () {
          (this._didEmitFrameData = !1), (this._isRunning = !1);
        }),
        (e.exports = s);
    },
    4385: function (e, A, t) {
      "use strict";
      var n,
        r = t(858);
      function i(e) {
        (e = e || {}),
          this._reset(),
          this.updatePhases(),
          (this.eventEmitter = new r()),
          (this._willRun = !1),
          (this._totalSubscribeCount = -1);
        var A = null,
          t = null;
        "undefined" != typeof window
          ? ((A = window.requestAnimationFrame),
            (t = window.cancelAnimationFrame))
          : (A = t = function () {}),
          (this._requestAnimationFrame = A),
          (this._cancelAnimationFrame = t),
          (this._boundOnAnimationFrame = this._onAnimationFrame.bind(this)),
          (this._boundOnExternalAnimationFrame =
            this._onExternalAnimationFrame.bind(this));
      }
      ((n = i.prototype).frameRequestedPhase = "requested"),
        (n.startPhase = "start"),
        (n.runPhases = ["update", "external", "draw"]),
        (n.endPhase = "end"),
        (n.disabledPhase = "disabled"),
        (n.beforePhaseEventPrefix = "before:"),
        (n.afterPhaseEventPrefix = "after:"),
        (n.subscribe = function (e, A) {
          return (
            this._totalSubscribeCount++,
            this._nextFrameSubscribers[e.id] ||
              (A
                ? this._nextFrameSubscribersOrder.unshift(e.id)
                : this._nextFrameSubscribersOrder.push(e.id),
              (this._nextFrameSubscribers[e.id] = e),
              this._nextFrameSubscriberArrayLength++,
              this._nextFrameSubscriberCount++,
              this._run()),
            this._totalSubscribeCount
          );
        }),
        (n.subscribeImmediate = function (e, A) {
          return (
            this._totalSubscribeCount++,
            this._subscribers[e.id] ||
              (A
                ? this._subscribersOrder.splice(
                    this._currentSubscriberIndex + 1,
                    0,
                    e.id
                  )
                : this._subscribersOrder.unshift(e.id),
              (this._subscribers[e.id] = e),
              this._subscriberArrayLength++,
              this._subscriberCount++),
            this._totalSubscribeCount
          );
        }),
        (n.unsubscribe = function (e) {
          return (
            !!this._nextFrameSubscribers[e.id] &&
            ((this._nextFrameSubscribers[e.id] = null),
            this._nextFrameSubscriberCount--,
            0 === this._nextFrameSubscriberCount && this._cancel(),
            !0)
          );
        }),
        (n.getSubscribeID = function () {
          return (this._totalSubscribeCount += 1);
        }),
        (n.destroy = function () {
          var e = this._cancel();
          return (
            this.eventEmitter.destroy(),
            (this.eventEmitter = null),
            (this.phases = null),
            (this._subscribers = null),
            (this._subscribersOrder = null),
            (this._nextFrameSubscribers = null),
            (this._nextFrameSubscribersOrder = null),
            (this._rafData = null),
            (this._boundOnAnimationFrame = null),
            (this._onExternalAnimationFrame = null),
            e
          );
        }),
        (n.useExternalAnimationFrame = function (e) {
          if ("boolean" == typeof e) {
            var A = this._isUsingExternalAnimationFrame;
            return (
              e &&
                this._animationFrame &&
                (this._cancelAnimationFrame.call(window, this._animationFrame),
                (this._animationFrame = null)),
              !this._willRun ||
                e ||
                this._animationFrame ||
                (this._animationFrame = this._requestAnimationFrame.call(
                  window,
                  this._boundOnAnimationFrame
                )),
              (this._isUsingExternalAnimationFrame = e),
              e ? this._boundOnExternalAnimationFrame : A || !1
            );
          }
        }),
        (n.updatePhases = function () {
          this.phases || (this.phases = []),
            (this.phases.length = 0),
            this.phases.push(this.frameRequestedPhase),
            this.phases.push(this.startPhase),
            Array.prototype.push.apply(this.phases, this.runPhases),
            this.phases.push(this.endPhase),
            (this._runPhasesLength = this.runPhases.length),
            (this._phasesLength = this.phases.length);
        }),
        (n._run = function () {
          if (!this._willRun)
            return (
              (this._willRun = !0),
              0 === this.lastFrameTime &&
                (this.lastFrameTime = performance.now()),
              (this._animationFrameActive = !0),
              this._isUsingExternalAnimationFrame ||
                (this._animationFrame = this._requestAnimationFrame.call(
                  window,
                  this._boundOnAnimationFrame
                )),
              this.phase === this.disabledPhase &&
                ((this.phaseIndex = 0),
                (this.phase = this.phases[this.phaseIndex])),
              !0
            );
        }),
        (n._cancel = function () {
          var e = !1;
          return (
            this._animationFrameActive &&
              (this._animationFrame &&
                (this._cancelAnimationFrame.call(window, this._animationFrame),
                (this._animationFrame = null)),
              (this._animationFrameActive = !1),
              (this._willRun = !1),
              (e = !0)),
            this._isRunning || this._reset(),
            e
          );
        }),
        (n._onAnimationFrame = function (e) {
          for (
            this._subscribers = this._nextFrameSubscribers,
              this._subscribersOrder = this._nextFrameSubscribersOrder,
              this._subscriberArrayLength =
                this._nextFrameSubscriberArrayLength,
              this._subscriberCount = this._nextFrameSubscriberCount,
              this._nextFrameSubscribers = {},
              this._nextFrameSubscribersOrder = [],
              this._nextFrameSubscriberArrayLength = 0,
              this._nextFrameSubscriberCount = 0,
              this.phaseIndex = 0,
              this.phase = this.phases[this.phaseIndex],
              this._isRunning = !0,
              this._willRun = !1,
              this._didRequestNextRAF = !1,
              this._rafData.delta = e - this.lastFrameTime,
              this.lastFrameTime = e,
              this._rafData.fps = 0,
              this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
              0 !== this._rafData.delta &&
                (this._rafData.fps = 1e3 / this._rafData.delta),
              this._rafData.time = e,
              this._rafData.naturalFps = this._rafData.fps,
              this._rafData.timeNow = Date.now(),
              this.phaseIndex++,
              this.phase = this.phases[this.phaseIndex],
              this.eventEmitter.trigger(
                this.beforePhaseEventPrefix + this.phase
              ),
              this._currentSubscriberIndex = 0;
            this._currentSubscriberIndex < this._subscriberArrayLength;
            this._currentSubscriberIndex++
          )
            null !==
              this._subscribers[
                this._subscribersOrder[this._currentSubscriberIndex]
              ] &&
              !1 ===
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ]._didDestroy &&
              this._subscribers[
                this._subscribersOrder[this._currentSubscriberIndex]
              ]._onAnimationFrameStart(this._rafData);
          for (
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
              this._runPhaseIndex = 0;
            this._runPhaseIndex < this._runPhasesLength;
            this._runPhaseIndex++
          ) {
            for (
              this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(
                  this.beforePhaseEventPrefix + this.phase
                ),
                this._currentSubscriberIndex = 0;
              this._currentSubscriberIndex < this._subscriberArrayLength;
              this._currentSubscriberIndex++
            )
              null !==
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ] &&
                !1 ===
                  this._subscribers[
                    this._subscribersOrder[this._currentSubscriberIndex]
                  ]._didDestroy &&
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ].trigger(this.phase, this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase);
          }
          for (
            this.phaseIndex++,
              this.phase = this.phases[this.phaseIndex],
              this.eventEmitter.trigger(
                this.beforePhaseEventPrefix + this.phase
              ),
              this._currentSubscriberIndex = 0;
            this._currentSubscriberIndex < this._subscriberArrayLength;
            this._currentSubscriberIndex++
          )
            null !==
              this._subscribers[
                this._subscribersOrder[this._currentSubscriberIndex]
              ] &&
              !1 ===
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ]._didDestroy &&
              this._subscribers[
                this._subscribersOrder[this._currentSubscriberIndex]
              ]._onAnimationFrameEnd(this._rafData);
          this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
            this._willRun
              ? ((this.phaseIndex = 0),
                (this.phaseIndex = this.phases[this.phaseIndex]))
              : this._reset();
        }),
        (n._onExternalAnimationFrame = function (e) {
          this._isUsingExternalAnimationFrame && this._onAnimationFrame(e);
        }),
        (n._reset = function () {
          this._rafData || (this._rafData = {}),
            (this._rafData.time = 0),
            (this._rafData.delta = 0),
            (this._rafData.fps = 0),
            (this._rafData.naturalFps = 0),
            (this._rafData.timeNow = 0),
            (this._subscribers = {}),
            (this._subscribersOrder = []),
            (this._currentSubscriberIndex = -1),
            (this._subscriberArrayLength = 0),
            (this._subscriberCount = 0),
            (this._nextFrameSubscribers = {}),
            (this._nextFrameSubscribersOrder = []),
            (this._nextFrameSubscriberArrayLength = 0),
            (this._nextFrameSubscriberCount = 0),
            (this._didEmitFrameData = !1),
            (this._animationFrame = null),
            (this._animationFrameActive = !1),
            (this._isRunning = !1),
            (this._shouldReset = !1),
            (this.lastFrameTime = 0),
            (this._runPhaseIndex = -1),
            (this.phaseIndex = -1),
            (this.phase = this.disabledPhase);
        }),
        (e.exports = i);
    },
    8260: function (e, A, t) {
      "use strict";
      var n = t(3494).SharedInstance,
        r = t(9530).majorVersionNumber,
        i = function () {
          this._currentID = 0;
        };
      (i.prototype.getNewID = function () {
        return this._currentID++, "raf:" + this._currentID;
      }),
        (e.exports = n.share(
          "@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance",
          r,
          i
        ));
    },
    7453: function (e, A, t) {
      "use strict";
      var n = t(3494).SharedInstance,
        r = t(9530).majorVersionNumber,
        i = t(4385);
      e.exports = n.share(
        "@marcom/ac-raf-emitter/sharedRAFExecutorInstance",
        r,
        i
      );
    },
    3494: function (e, A, t) {
      "use strict";
      e.exports = { SharedInstance: t(7814) };
    },
    7814: function (e) {
      "use strict";
      var A,
        t = "undefined" != typeof window ? window : {},
        n = "SharedInstance",
        r = t.AC,
        i =
          ((A = {}),
          {
            get: function (e, t) {
              var n = null;
              return A[e] && A[e][t] && (n = A[e][t]), n;
            },
            set: function (e, t, n) {
              return (
                A[e] || (A[e] = {}),
                (A[e][t] = "function" == typeof n ? new n() : n),
                A[e][t]
              );
            },
            share: function (e, A, t) {
              var n = this.get(e, A);
              return n || (n = this.set(e, A, t)), n;
            },
            remove: function (e, t) {
              var n = typeof t;
              if ("string" !== n && "number" !== n) A[e] && (A[e] = null);
              else {
                if (!A[e] || !A[e][t]) return;
                A[e][t] = null;
              }
            },
          });
      r || (r = t.AC = {}), r[n] || (r[n] = i), (e.exports = r[n]);
    },
    8552: function (e, A, t) {
      var n = t(852)(t(5639), "DataView");
      e.exports = n;
    },
    1989: function (e, A, t) {
      var n = t(1789),
        r = t(401),
        i = t(7667),
        o = t(1327),
        s = t(1866);
      function a(e) {
        var A = -1,
          t = null == e ? 0 : e.length;
        for (this.clear(); ++A < t; ) {
          var n = e[A];
          this.set(n[0], n[1]);
        }
      }
      (a.prototype.clear = n),
        (a.prototype.delete = r),
        (a.prototype.get = i),
        (a.prototype.has = o),
        (a.prototype.set = s),
        (e.exports = a);
    },
    8407: function (e, A, t) {
      var n = t(7040),
        r = t(4125),
        i = t(2117),
        o = t(7518),
        s = t(4705);
      function a(e) {
        var A = -1,
          t = null == e ? 0 : e.length;
        for (this.clear(); ++A < t; ) {
          var n = e[A];
          this.set(n[0], n[1]);
        }
      }
      (a.prototype.clear = n),
        (a.prototype.delete = r),
        (a.prototype.get = i),
        (a.prototype.has = o),
        (a.prototype.set = s),
        (e.exports = a);
    },
    7071: function (e, A, t) {
      var n = t(852)(t(5639), "Map");
      e.exports = n;
    },
    3369: function (e, A, t) {
      var n = t(4785),
        r = t(1285),
        i = t(6e3),
        o = t(9916),
        s = t(5265);
      function a(e) {
        var A = -1,
          t = null == e ? 0 : e.length;
        for (this.clear(); ++A < t; ) {
          var n = e[A];
          this.set(n[0], n[1]);
        }
      }
      (a.prototype.clear = n),
        (a.prototype.delete = r),
        (a.prototype.get = i),
        (a.prototype.has = o),
        (a.prototype.set = s),
        (e.exports = a);
    },
    3818: function (e, A, t) {
      var n = t(852)(t(5639), "Promise");
      e.exports = n;
    },
    8525: function (e, A, t) {
      var n = t(852)(t(5639), "Set");
      e.exports = n;
    },
    8668: function (e, A, t) {
      var n = t(3369),
        r = t(619),
        i = t(2385);
      function o(e) {
        var A = -1,
          t = null == e ? 0 : e.length;
        for (this.__data__ = new n(); ++A < t; ) this.add(e[A]);
      }
      (o.prototype.add = o.prototype.push = r),
        (o.prototype.has = i),
        (e.exports = o);
    },
    6384: function (e, A, t) {
      var n = t(8407),
        r = t(7465),
        i = t(3779),
        o = t(7599),
        s = t(4758),
        a = t(4309);
      function c(e) {
        var A = (this.__data__ = new n(e));
        this.size = A.size;
      }
      (c.prototype.clear = r),
        (c.prototype.delete = i),
        (c.prototype.get = o),
        (c.prototype.has = s),
        (c.prototype.set = a),
        (e.exports = c);
    },
    2705: function (e, A, t) {
      var n = t(5639).Symbol;
      e.exports = n;
    },
    1149: function (e, A, t) {
      var n = t(5639).Uint8Array;
      e.exports = n;
    },
    577: function (e, A, t) {
      var n = t(852)(t(5639), "WeakMap");
      e.exports = n;
    },
    6874: function (e) {
      e.exports = function (e, A, t) {
        switch (t.length) {
          case 0:
            return e.call(A);
          case 1:
            return e.call(A, t[0]);
          case 2:
            return e.call(A, t[0], t[1]);
          case 3:
            return e.call(A, t[0], t[1], t[2]);
        }
        return e.apply(A, t);
      };
    },
    7412: function (e) {
      e.exports = function (e, A) {
        for (
          var t = -1, n = null == e ? 0 : e.length;
          ++t < n && !1 !== A(e[t], t, e);

        );
        return e;
      };
    },
    4963: function (e) {
      e.exports = function (e, A) {
        for (
          var t = -1, n = null == e ? 0 : e.length, r = 0, i = [];
          ++t < n;

        ) {
          var o = e[t];
          A(o, t, e) && (i[r++] = o);
        }
        return i;
      };
    },
    7443: function (e, A, t) {
      var n = t(2118);
      e.exports = function (e, A) {
        return !(null == e || !e.length) && n(e, A, 0) > -1;
      };
    },
    1196: function (e) {
      e.exports = function (e, A, t) {
        for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
          if (t(A, e[n])) return !0;
        return !1;
      };
    },
    4636: function (e, A, t) {
      var n = t(2545),
        r = t(5694),
        i = t(1469),
        o = t(4144),
        s = t(5776),
        a = t(4954),
        c = Object.prototype.hasOwnProperty;
      e.exports = function (e, A) {
        var t = i(e),
          h = !t && r(e),
          g = !t && !h && o(e),
          l = !t && !h && !g && a(e),
          u = t || h || g || l,
          I = u ? n(e.length, String) : [],
          E = I.length;
        for (var B in e)
          (!A && !c.call(e, B)) ||
            (u &&
              ("length" == B ||
                (g && ("offset" == B || "parent" == B)) ||
                (l &&
                  ("buffer" == B || "byteLength" == B || "byteOffset" == B)) ||
                s(B, E))) ||
            I.push(B);
        return I;
      };
    },
    9932: function (e) {
      e.exports = function (e, A) {
        for (var t = -1, n = null == e ? 0 : e.length, r = Array(n); ++t < n; )
          r[t] = A(e[t], t, e);
        return r;
      };
    },
    2488: function (e) {
      e.exports = function (e, A) {
        for (var t = -1, n = A.length, r = e.length; ++t < n; ) e[r + t] = A[t];
        return e;
      };
    },
    2908: function (e) {
      e.exports = function (e, A) {
        for (var t = -1, n = null == e ? 0 : e.length; ++t < n; )
          if (A(e[t], t, e)) return !0;
        return !1;
      };
    },
    4865: function (e, A, t) {
      var n = t(9465),
        r = t(7813),
        i = Object.prototype.hasOwnProperty;
      e.exports = function (e, A, t) {
        var o = e[A];
        (i.call(e, A) && r(o, t) && (void 0 !== t || A in e)) || n(e, A, t);
      };
    },
    8470: function (e, A, t) {
      var n = t(7813);
      e.exports = function (e, A) {
        for (var t = e.length; t--; ) if (n(e[t][0], A)) return t;
        return -1;
      };
    },
    4037: function (e, A, t) {
      var n = t(8363),
        r = t(3674);
      e.exports = function (e, A) {
        return e && n(A, r(A), e);
      };
    },
    3886: function (e, A, t) {
      var n = t(8363),
        r = t(1704);
      e.exports = function (e, A) {
        return e && n(A, r(A), e);
      };
    },
    9465: function (e, A, t) {
      var n = t(8777);
      e.exports = function (e, A, t) {
        "__proto__" == A && n
          ? n(e, A, {
              configurable: !0,
              enumerable: !0,
              value: t,
              writable: !0,
            })
          : (e[A] = t);
      };
    },
    5990: function (e, A, t) {
      var n = t(6384),
        r = t(7412),
        i = t(4865),
        o = t(4037),
        s = t(3886),
        a = t(4626),
        c = t(278),
        h = t(8805),
        g = t(1911),
        l = t(8234),
        u = t(6904),
        I = t(4160),
        E = t(3824),
        B = t(9148),
        C = t(8517),
        p = t(1469),
        f = t(4144),
        d = t(6688),
        Q = t(3218),
        m = t(2928),
        w = t(3674),
        y = t(1704),
        x = "[object Arguments]",
        b = "[object Function]",
        S = "[object Object]",
        _ = {};
      (_[x] =
        _["[object Array]"] =
        _["[object ArrayBuffer]"] =
        _["[object DataView]"] =
        _["[object Boolean]"] =
        _["[object Date]"] =
        _["[object Float32Array]"] =
        _["[object Float64Array]"] =
        _["[object Int8Array]"] =
        _["[object Int16Array]"] =
        _["[object Int32Array]"] =
        _["[object Map]"] =
        _["[object Number]"] =
        _[S] =
        _["[object RegExp]"] =
        _["[object Set]"] =
        _["[object String]"] =
        _["[object Symbol]"] =
        _["[object Uint8Array]"] =
        _["[object Uint8ClampedArray]"] =
        _["[object Uint16Array]"] =
        _["[object Uint32Array]"] =
          !0),
        (_["[object Error]"] = _[b] = _["[object WeakMap]"] = !1),
        (e.exports = function e(A, t, D, R, v, F) {
          var T,
            M = 1 & t,
            L = 2 & t,
            G = 4 & t;
          if ((D && (T = v ? D(A, R, v, F) : D(A)), void 0 !== T)) return T;
          if (!Q(A)) return A;
          var U = p(A);
          if (U) {
            if (((T = E(A)), !M)) return c(A, T);
          } else {
            var k = I(A),
              N = k == b || "[object GeneratorFunction]" == k;
            if (f(A)) return a(A, M);
            if (k == S || k == x || (N && !v)) {
              if (((T = L || N ? {} : C(A)), !M))
                return L ? g(A, s(T, A)) : h(A, o(T, A));
            } else {
              if (!_[k]) return v ? A : {};
              T = B(A, k, M);
            }
          }
          F || (F = new n());
          var P = F.get(A);
          if (P) return P;
          F.set(A, T),
            m(A)
              ? A.forEach(function (n) {
                  T.add(e(n, t, D, n, A, F));
                })
              : d(A) &&
                A.forEach(function (n, r) {
                  T.set(r, e(n, t, D, r, A, F));
                });
          var O = U ? void 0 : (G ? (L ? u : l) : L ? y : w)(A);
          return (
            r(O || A, function (n, r) {
              O && (n = A[(r = n)]), i(T, r, e(n, t, D, r, A, F));
            }),
            T
          );
        });
    },
    3118: function (e, A, t) {
      var n = t(3218),
        r = Object.create,
        i = (function () {
          function e() {}
          return function (A) {
            if (!n(A)) return {};
            if (r) return r(A);
            e.prototype = A;
            var t = new e();
            return (e.prototype = void 0), t;
          };
        })();
      e.exports = i;
    },
    731: function (e, A, t) {
      var n = t(8668),
        r = t(7443),
        i = t(1196),
        o = t(9932),
        s = t(1717),
        a = t(4757);
      e.exports = function (e, A, t, c) {
        var h = -1,
          g = r,
          l = !0,
          u = e.length,
          I = [],
          E = A.length;
        if (!u) return I;
        t && (A = o(A, s(t))),
          c
            ? ((g = i), (l = !1))
            : A.length >= 200 && ((g = a), (l = !1), (A = new n(A)));
        e: for (; ++h < u; ) {
          var B = e[h],
            C = null == t ? B : t(B);
          if (((B = c || 0 !== B ? B : 0), l && C == C)) {
            for (var p = E; p--; ) if (A[p] === C) continue e;
            I.push(B);
          } else g(A, C, c) || I.push(B);
        }
        return I;
      };
    },
    9881: function (e, A, t) {
      var n = t(7816),
        r = t(9291)(n);
      e.exports = r;
    },
    1848: function (e) {
      e.exports = function (e, A, t, n) {
        for (var r = e.length, i = t + (n ? 1 : -1); n ? i-- : ++i < r; )
          if (A(e[i], i, e)) return i;
        return -1;
      };
    },
    1078: function (e, A, t) {
      var n = t(2488),
        r = t(7285);
      e.exports = function e(A, t, i, o, s) {
        var a = -1,
          c = A.length;
        for (i || (i = r), s || (s = []); ++a < c; ) {
          var h = A[a];
          t > 0 && i(h)
            ? t > 1
              ? e(h, t - 1, i, o, s)
              : n(s, h)
            : o || (s[s.length] = h);
        }
        return s;
      };
    },
    8483: function (e, A, t) {
      var n = t(5063)();
      e.exports = n;
    },
    7816: function (e, A, t) {
      var n = t(8483),
        r = t(3674);
      e.exports = function (e, A) {
        return e && n(e, A, r);
      };
    },
    7786: function (e, A, t) {
      var n = t(1811),
        r = t(327);
      e.exports = function (e, A) {
        for (var t = 0, i = (A = n(A, e)).length; null != e && t < i; )
          e = e[r(A[t++])];
        return t && t == i ? e : void 0;
      };
    },
    8866: function (e, A, t) {
      var n = t(2488),
        r = t(1469);
      e.exports = function (e, A, t) {
        var i = A(e);
        return r(e) ? i : n(i, t(e));
      };
    },
    4239: function (e, A, t) {
      var n = t(2705),
        r = t(9607),
        i = t(2333),
        o = n ? n.toStringTag : void 0;
      e.exports = function (e) {
        return null == e
          ? void 0 === e
            ? "[object Undefined]"
            : "[object Null]"
          : o && o in Object(e)
          ? r(e)
          : i(e);
      };
    },
    8565: function (e) {
      var A = Object.prototype.hasOwnProperty;
      e.exports = function (e, t) {
        return null != e && A.call(e, t);
      };
    },
    13: function (e) {
      e.exports = function (e, A) {
        return null != e && A in Object(e);
      };
    },
    2118: function (e, A, t) {
      var n = t(1848),
        r = t(2722),
        i = t(2351);
      e.exports = function (e, A, t) {
        return A == A ? i(e, A, t) : n(e, r, t);
      };
    },
    9454: function (e, A, t) {
      var n = t(4239),
        r = t(7005);
      e.exports = function (e) {
        return r(e) && "[object Arguments]" == n(e);
      };
    },
    939: function (e, A, t) {
      var n = t(2492),
        r = t(7005);
      e.exports = function e(A, t, i, o, s) {
        return (
          A === t ||
          (null == A || null == t || (!r(A) && !r(t))
            ? A != A && t != t
            : n(A, t, i, o, e, s))
        );
      };
    },
    2492: function (e, A, t) {
      var n = t(6384),
        r = t(7114),
        i = t(8351),
        o = t(6096),
        s = t(4160),
        a = t(1469),
        c = t(4144),
        h = t(4954),
        g = "[object Arguments]",
        l = "[object Array]",
        u = "[object Object]",
        I = Object.prototype.hasOwnProperty;
      e.exports = function (e, A, t, E, B, C) {
        var p = a(e),
          f = a(A),
          d = p ? l : s(e),
          Q = f ? l : s(A),
          m = (d = d == g ? u : d) == u,
          w = (Q = Q == g ? u : Q) == u,
          y = d == Q;
        if (y && c(e)) {
          if (!c(A)) return !1;
          (p = !0), (m = !1);
        }
        if (y && !m)
          return (
            C || (C = new n()),
            p || h(e) ? r(e, A, t, E, B, C) : i(e, A, d, t, E, B, C)
          );
        if (!(1 & t)) {
          var x = m && I.call(e, "__wrapped__"),
            b = w && I.call(A, "__wrapped__");
          if (x || b) {
            var S = x ? e.value() : e,
              _ = b ? A.value() : A;
            return C || (C = new n()), B(S, _, t, E, C);
          }
        }
        return !!y && (C || (C = new n()), o(e, A, t, E, B, C));
      };
    },
    5588: function (e, A, t) {
      var n = t(4160),
        r = t(7005);
      e.exports = function (e) {
        return r(e) && "[object Map]" == n(e);
      };
    },
    2958: function (e, A, t) {
      var n = t(6384),
        r = t(939);
      e.exports = function (e, A, t, i) {
        var o = t.length,
          s = o,
          a = !i;
        if (null == e) return !s;
        for (e = Object(e); o--; ) {
          var c = t[o];
          if (a && c[2] ? c[1] !== e[c[0]] : !(c[0] in e)) return !1;
        }
        for (; ++o < s; ) {
          var h = (c = t[o])[0],
            g = e[h],
            l = c[1];
          if (a && c[2]) {
            if (void 0 === g && !(h in e)) return !1;
          } else {
            var u = new n();
            if (i) var I = i(g, l, h, e, A, u);
            if (!(void 0 === I ? r(l, g, 3, i, u) : I)) return !1;
          }
        }
        return !0;
      };
    },
    2722: function (e) {
      e.exports = function (e) {
        return e != e;
      };
    },
    8458: function (e, A, t) {
      var n = t(3560),
        r = t(5346),
        i = t(3218),
        o = t(346),
        s = /^\[object .+?Constructor\]$/,
        a = Function.prototype,
        c = Object.prototype,
        h = a.toString,
        g = c.hasOwnProperty,
        l = RegExp(
          "^" +
            h
              .call(g)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      e.exports = function (e) {
        return !(!i(e) || r(e)) && (n(e) ? l : s).test(o(e));
      };
    },
    9221: function (e, A, t) {
      var n = t(4160),
        r = t(7005);
      e.exports = function (e) {
        return r(e) && "[object Set]" == n(e);
      };
    },
    8749: function (e, A, t) {
      var n = t(4239),
        r = t(1780),
        i = t(7005),
        o = {};
      (o["[object Float32Array]"] =
        o["[object Float64Array]"] =
        o["[object Int8Array]"] =
        o["[object Int16Array]"] =
        o["[object Int32Array]"] =
        o["[object Uint8Array]"] =
        o["[object Uint8ClampedArray]"] =
        o["[object Uint16Array]"] =
        o["[object Uint32Array]"] =
          !0),
        (o["[object Arguments]"] =
          o["[object Array]"] =
          o["[object ArrayBuffer]"] =
          o["[object Boolean]"] =
          o["[object DataView]"] =
          o["[object Date]"] =
          o["[object Error]"] =
          o["[object Function]"] =
          o["[object Map]"] =
          o["[object Number]"] =
          o["[object Object]"] =
          o["[object RegExp]"] =
          o["[object Set]"] =
          o["[object String]"] =
          o["[object WeakMap]"] =
            !1),
        (e.exports = function (e) {
          return i(e) && r(e.length) && !!o[n(e)];
        });
    },
    7206: function (e, A, t) {
      var n = t(1573),
        r = t(6432),
        i = t(6557),
        o = t(1469),
        s = t(9601);
      e.exports = function (e) {
        return "function" == typeof e
          ? e
          : null == e
          ? i
          : "object" == typeof e
          ? o(e)
            ? r(e[0], e[1])
            : n(e)
          : s(e);
      };
    },
    280: function (e, A, t) {
      var n = t(5726),
        r = t(6916),
        i = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        if (!n(e)) return r(e);
        var A = [];
        for (var t in Object(e))
          i.call(e, t) && "constructor" != t && A.push(t);
        return A;
      };
    },
    313: function (e, A, t) {
      var n = t(3218),
        r = t(5726),
        i = t(3498),
        o = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        if (!n(e)) return i(e);
        var A = r(e),
          t = [];
        for (var s in e)
          ("constructor" != s || (!A && o.call(e, s))) && t.push(s);
        return t;
      };
    },
    9199: function (e, A, t) {
      var n = t(9881),
        r = t(8612);
      e.exports = function (e, A) {
        var t = -1,
          i = r(e) ? Array(e.length) : [];
        return (
          n(e, function (e, n, r) {
            i[++t] = A(e, n, r);
          }),
          i
        );
      };
    },
    1573: function (e, A, t) {
      var n = t(2958),
        r = t(1499),
        i = t(2634);
      e.exports = function (e) {
        var A = r(e);
        return 1 == A.length && A[0][2]
          ? i(A[0][0], A[0][1])
          : function (t) {
              return t === e || n(t, e, A);
            };
      };
    },
    6432: function (e, A, t) {
      var n = t(939),
        r = t(7361),
        i = t(9095),
        o = t(5403),
        s = t(9162),
        a = t(2634),
        c = t(327);
      e.exports = function (e, A) {
        return o(e) && s(A)
          ? a(c(e), A)
          : function (t) {
              var o = r(t, e);
              return void 0 === o && o === A ? i(t, e) : n(A, o, 3);
            };
      };
    },
    2689: function (e, A, t) {
      var n = t(9932),
        r = t(7786),
        i = t(7206),
        o = t(9199),
        s = t(1131),
        a = t(1717),
        c = t(5022),
        h = t(6557),
        g = t(1469);
      e.exports = function (e, A, t) {
        A = A.length
          ? n(A, function (e) {
              return g(e)
                ? function (A) {
                    return r(A, 1 === e.length ? e[0] : e);
                  }
                : e;
            })
          : [h];
        var l = -1;
        A = n(A, a(i));
        var u = o(e, function (e, t, r) {
          return {
            criteria: n(A, function (A) {
              return A(e);
            }),
            index: ++l,
            value: e,
          };
        });
        return s(u, function (e, A) {
          return c(e, A, t);
        });
      };
    },
    3012: function (e, A, t) {
      var n = t(7786),
        r = t(611),
        i = t(1811);
      e.exports = function (e, A, t) {
        for (var o = -1, s = A.length, a = {}; ++o < s; ) {
          var c = A[o],
            h = n(e, c);
          t(h, c) && r(a, i(c, e), h);
        }
        return a;
      };
    },
    371: function (e) {
      e.exports = function (e) {
        return function (A) {
          return null == A ? void 0 : A[e];
        };
      };
    },
    9152: function (e, A, t) {
      var n = t(7786);
      e.exports = function (e) {
        return function (A) {
          return n(A, e);
        };
      };
    },
    5976: function (e, A, t) {
      var n = t(6557),
        r = t(5357),
        i = t(61);
      e.exports = function (e, A) {
        return i(r(e, A, n), e + "");
      };
    },
    611: function (e, A, t) {
      var n = t(4865),
        r = t(1811),
        i = t(5776),
        o = t(3218),
        s = t(327);
      e.exports = function (e, A, t, a) {
        if (!o(e)) return e;
        for (
          var c = -1, h = (A = r(A, e)).length, g = h - 1, l = e;
          null != l && ++c < h;

        ) {
          var u = s(A[c]),
            I = t;
          if ("__proto__" === u || "constructor" === u || "prototype" === u)
            return e;
          if (c != g) {
            var E = l[u];
            void 0 === (I = a ? a(E, u, l) : void 0) &&
              (I = o(E) ? E : i(A[c + 1]) ? [] : {});
          }
          n(l, u, I), (l = l[u]);
        }
        return e;
      };
    },
    6560: function (e, A, t) {
      var n = t(5703),
        r = t(8777),
        i = t(6557),
        o = r
          ? function (e, A) {
              return r(e, "toString", {
                configurable: !0,
                enumerable: !1,
                value: n(A),
                writable: !0,
              });
            }
          : i;
      e.exports = o;
    },
    1131: function (e) {
      e.exports = function (e, A) {
        var t = e.length;
        for (e.sort(A); t--; ) e[t] = e[t].value;
        return e;
      };
    },
    2545: function (e) {
      e.exports = function (e, A) {
        for (var t = -1, n = Array(e); ++t < e; ) n[t] = A(t);
        return n;
      };
    },
    531: function (e, A, t) {
      var n = t(2705),
        r = t(9932),
        i = t(1469),
        o = t(3448),
        s = n ? n.prototype : void 0,
        a = s ? s.toString : void 0;
      e.exports = function e(A) {
        if ("string" == typeof A) return A;
        if (i(A)) return r(A, e) + "";
        if (o(A)) return a ? a.call(A) : "";
        var t = A + "";
        return "0" == t && 1 / A == -1 / 0 ? "-0" : t;
      };
    },
    7561: function (e, A, t) {
      var n = t(7990),
        r = /^\s+/;
      e.exports = function (e) {
        return e ? e.slice(0, n(e) + 1).replace(r, "") : e;
      };
    },
    1717: function (e) {
      e.exports = function (e) {
        return function (A) {
          return e(A);
        };
      };
    },
    5652: function (e, A, t) {
      var n = t(8668),
        r = t(7443),
        i = t(1196),
        o = t(4757),
        s = t(3593),
        a = t(1814);
      e.exports = function (e, A, t) {
        var c = -1,
          h = r,
          g = e.length,
          l = !0,
          u = [],
          I = u;
        if (t) (l = !1), (h = i);
        else if (g >= 200) {
          var E = A ? null : s(e);
          if (E) return a(E);
          (l = !1), (h = o), (I = new n());
        } else I = A ? [] : u;
        e: for (; ++c < g; ) {
          var B = e[c],
            C = A ? A(B) : B;
          if (((B = t || 0 !== B ? B : 0), l && C == C)) {
            for (var p = I.length; p--; ) if (I[p] === C) continue e;
            A && I.push(C), u.push(B);
          } else h(I, C, t) || (I !== u && I.push(C), u.push(B));
        }
        return u;
      };
    },
    4757: function (e) {
      e.exports = function (e, A) {
        return e.has(A);
      };
    },
    1811: function (e, A, t) {
      var n = t(1469),
        r = t(5403),
        i = t(5514),
        o = t(9833);
      e.exports = function (e, A) {
        return n(e) ? e : r(e, A) ? [e] : i(o(e));
      };
    },
    4318: function (e, A, t) {
      var n = t(1149);
      e.exports = function (e) {
        var A = new e.constructor(e.byteLength);
        return new n(A).set(new n(e)), A;
      };
    },
    4626: function (e, A, t) {
      e = t.nmd(e);
      var n = t(5639),
        r = A && !A.nodeType && A,
        i = r && e && !e.nodeType && e,
        o = i && i.exports === r ? n.Buffer : void 0,
        s = o ? o.allocUnsafe : void 0;
      e.exports = function (e, A) {
        if (A) return e.slice();
        var t = e.length,
          n = s ? s(t) : new e.constructor(t);
        return e.copy(n), n;
      };
    },
    7157: function (e, A, t) {
      var n = t(4318);
      e.exports = function (e, A) {
        var t = A ? n(e.buffer) : e.buffer;
        return new e.constructor(t, e.byteOffset, e.byteLength);
      };
    },
    3147: function (e) {
      var A = /\w*$/;
      e.exports = function (e) {
        var t = new e.constructor(e.source, A.exec(e));
        return (t.lastIndex = e.lastIndex), t;
      };
    },
    419: function (e, A, t) {
      var n = t(2705),
        r = n ? n.prototype : void 0,
        i = r ? r.valueOf : void 0;
      e.exports = function (e) {
        return i ? Object(i.call(e)) : {};
      };
    },
    7133: function (e, A, t) {
      var n = t(4318);
      e.exports = function (e, A) {
        var t = A ? n(e.buffer) : e.buffer;
        return new e.constructor(t, e.byteOffset, e.length);
      };
    },
    6393: function (e, A, t) {
      var n = t(3448);
      e.exports = function (e, A) {
        if (e !== A) {
          var t = void 0 !== e,
            r = null === e,
            i = e == e,
            o = n(e),
            s = void 0 !== A,
            a = null === A,
            c = A == A,
            h = n(A);
          if (
            (!a && !h && !o && e > A) ||
            (o && s && c && !a && !h) ||
            (r && s && c) ||
            (!t && c) ||
            !i
          )
            return 1;
          if (
            (!r && !o && !h && e < A) ||
            (h && t && i && !r && !o) ||
            (a && t && i) ||
            (!s && i) ||
            !c
          )
            return -1;
        }
        return 0;
      };
    },
    5022: function (e, A, t) {
      var n = t(6393);
      e.exports = function (e, A, t) {
        for (
          var r = -1,
            i = e.criteria,
            o = A.criteria,
            s = i.length,
            a = t.length;
          ++r < s;

        ) {
          var c = n(i[r], o[r]);
          if (c) return r >= a ? c : c * ("desc" == t[r] ? -1 : 1);
        }
        return e.index - A.index;
      };
    },
    278: function (e) {
      e.exports = function (e, A) {
        var t = -1,
          n = e.length;
        for (A || (A = Array(n)); ++t < n; ) A[t] = e[t];
        return A;
      };
    },
    8363: function (e, A, t) {
      var n = t(4865),
        r = t(9465);
      e.exports = function (e, A, t, i) {
        var o = !t;
        t || (t = {});
        for (var s = -1, a = A.length; ++s < a; ) {
          var c = A[s],
            h = i ? i(t[c], e[c], c, t, e) : void 0;
          void 0 === h && (h = e[c]), o ? r(t, c, h) : n(t, c, h);
        }
        return t;
      };
    },
    8805: function (e, A, t) {
      var n = t(8363),
        r = t(9551);
      e.exports = function (e, A) {
        return n(e, r(e), A);
      };
    },
    1911: function (e, A, t) {
      var n = t(8363),
        r = t(1442);
      e.exports = function (e, A) {
        return n(e, r(e), A);
      };
    },
    4429: function (e, A, t) {
      var n = t(5639)["__core-js_shared__"];
      e.exports = n;
    },
    9291: function (e, A, t) {
      var n = t(8612);
      e.exports = function (e, A) {
        return function (t, r) {
          if (null == t) return t;
          if (!n(t)) return e(t, r);
          for (
            var i = t.length, o = A ? i : -1, s = Object(t);
            (A ? o-- : ++o < i) && !1 !== r(s[o], o, s);

          );
          return t;
        };
      };
    },
    5063: function (e) {
      e.exports = function (e) {
        return function (A, t, n) {
          for (var r = -1, i = Object(A), o = n(A), s = o.length; s--; ) {
            var a = o[e ? s : ++r];
            if (!1 === t(i[a], a, i)) break;
          }
          return A;
        };
      };
    },
    3593: function (e, A, t) {
      var n = t(8525),
        r = t(308),
        i = t(1814),
        o =
          n && 1 / i(new n([, -0]))[1] == 1 / 0
            ? function (e) {
                return new n(e);
              }
            : r;
      e.exports = o;
    },
    8777: function (e, A, t) {
      var n = t(852),
        r = (function () {
          try {
            var e = n(Object, "defineProperty");
            return e({}, "", {}), e;
          } catch (e) {}
        })();
      e.exports = r;
    },
    7114: function (e, A, t) {
      var n = t(8668),
        r = t(2908),
        i = t(4757);
      e.exports = function (e, A, t, o, s, a) {
        var c = 1 & t,
          h = e.length,
          g = A.length;
        if (h != g && !(c && g > h)) return !1;
        var l = a.get(e),
          u = a.get(A);
        if (l && u) return l == A && u == e;
        var I = -1,
          E = !0,
          B = 2 & t ? new n() : void 0;
        for (a.set(e, A), a.set(A, e); ++I < h; ) {
          var C = e[I],
            p = A[I];
          if (o) var f = c ? o(p, C, I, A, e, a) : o(C, p, I, e, A, a);
          if (void 0 !== f) {
            if (f) continue;
            E = !1;
            break;
          }
          if (B) {
            if (
              !r(A, function (e, A) {
                if (!i(B, A) && (C === e || s(C, e, t, o, a))) return B.push(A);
              })
            ) {
              E = !1;
              break;
            }
          } else if (C !== p && !s(C, p, t, o, a)) {
            E = !1;
            break;
          }
        }
        return a.delete(e), a.delete(A), E;
      };
    },
    8351: function (e, A, t) {
      var n = t(2705),
        r = t(1149),
        i = t(7813),
        o = t(7114),
        s = t(8776),
        a = t(1814),
        c = n ? n.prototype : void 0,
        h = c ? c.valueOf : void 0;
      e.exports = function (e, A, t, n, c, g, l) {
        switch (t) {
          case "[object DataView]":
            if (e.byteLength != A.byteLength || e.byteOffset != A.byteOffset)
              return !1;
            (e = e.buffer), (A = A.buffer);
          case "[object ArrayBuffer]":
            return !(e.byteLength != A.byteLength || !g(new r(e), new r(A)));
          case "[object Boolean]":
          case "[object Date]":
          case "[object Number]":
            return i(+e, +A);
          case "[object Error]":
            return e.name == A.name && e.message == A.message;
          case "[object RegExp]":
          case "[object String]":
            return e == A + "";
          case "[object Map]":
            var u = s;
          case "[object Set]":
            var I = 1 & n;
            if ((u || (u = a), e.size != A.size && !I)) return !1;
            var E = l.get(e);
            if (E) return E == A;
            (n |= 2), l.set(e, A);
            var B = o(u(e), u(A), n, c, g, l);
            return l.delete(e), B;
          case "[object Symbol]":
            if (h) return h.call(e) == h.call(A);
        }
        return !1;
      };
    },
    6096: function (e, A, t) {
      var n = t(8234),
        r = Object.prototype.hasOwnProperty;
      e.exports = function (e, A, t, i, o, s) {
        var a = 1 & t,
          c = n(e),
          h = c.length;
        if (h != n(A).length && !a) return !1;
        for (var g = h; g--; ) {
          var l = c[g];
          if (!(a ? l in A : r.call(A, l))) return !1;
        }
        var u = s.get(e),
          I = s.get(A);
        if (u && I) return u == A && I == e;
        var E = !0;
        s.set(e, A), s.set(A, e);
        for (var B = a; ++g < h; ) {
          var C = e[(l = c[g])],
            p = A[l];
          if (i) var f = a ? i(p, C, l, A, e, s) : i(C, p, l, e, A, s);
          if (!(void 0 === f ? C === p || o(C, p, t, i, s) : f)) {
            E = !1;
            break;
          }
          B || (B = "constructor" == l);
        }
        if (E && !B) {
          var d = e.constructor,
            Q = A.constructor;
          d == Q ||
            !("constructor" in e) ||
            !("constructor" in A) ||
            ("function" == typeof d &&
              d instanceof d &&
              "function" == typeof Q &&
              Q instanceof Q) ||
            (E = !1);
        }
        return s.delete(e), s.delete(A), E;
      };
    },
    1957: function (e, A, t) {
      var n = "object" == typeof t.g && t.g && t.g.Object === Object && t.g;
      e.exports = n;
    },
    8234: function (e, A, t) {
      var n = t(8866),
        r = t(9551),
        i = t(3674);
      e.exports = function (e) {
        return n(e, i, r);
      };
    },
    6904: function (e, A, t) {
      var n = t(8866),
        r = t(1442),
        i = t(1704);
      e.exports = function (e) {
        return n(e, i, r);
      };
    },
    5050: function (e, A, t) {
      var n = t(7019);
      e.exports = function (e, A) {
        var t = e.__data__;
        return n(A) ? t["string" == typeof A ? "string" : "hash"] : t.map;
      };
    },
    1499: function (e, A, t) {
      var n = t(9162),
        r = t(3674);
      e.exports = function (e) {
        for (var A = r(e), t = A.length; t--; ) {
          var i = A[t],
            o = e[i];
          A[t] = [i, o, n(o)];
        }
        return A;
      };
    },
    852: function (e, A, t) {
      var n = t(8458),
        r = t(7801);
      e.exports = function (e, A) {
        var t = r(e, A);
        return n(t) ? t : void 0;
      };
    },
    5924: function (e, A, t) {
      var n = t(5569)(Object.getPrototypeOf, Object);
      e.exports = n;
    },
    9607: function (e, A, t) {
      var n = t(2705),
        r = Object.prototype,
        i = r.hasOwnProperty,
        o = r.toString,
        s = n ? n.toStringTag : void 0;
      e.exports = function (e) {
        var A = i.call(e, s),
          t = e[s];
        try {
          e[s] = void 0;
          var n = !0;
        } catch (e) {}
        var r = o.call(e);
        return n && (A ? (e[s] = t) : delete e[s]), r;
      };
    },
    9551: function (e, A, t) {
      var n = t(4963),
        r = t(479),
        i = Object.prototype.propertyIsEnumerable,
        o = Object.getOwnPropertySymbols,
        s = o
          ? function (e) {
              return null == e
                ? []
                : ((e = Object(e)),
                  n(o(e), function (A) {
                    return i.call(e, A);
                  }));
            }
          : r;
      e.exports = s;
    },
    1442: function (e, A, t) {
      var n = t(2488),
        r = t(5924),
        i = t(9551),
        o = t(479),
        s = Object.getOwnPropertySymbols
          ? function (e) {
              for (var A = []; e; ) n(A, i(e)), (e = r(e));
              return A;
            }
          : o;
      e.exports = s;
    },
    4160: function (e, A, t) {
      var n = t(8552),
        r = t(7071),
        i = t(3818),
        o = t(8525),
        s = t(577),
        a = t(4239),
        c = t(346),
        h = "[object Map]",
        g = "[object Promise]",
        l = "[object Set]",
        u = "[object WeakMap]",
        I = "[object DataView]",
        E = c(n),
        B = c(r),
        C = c(i),
        p = c(o),
        f = c(s),
        d = a;
      ((n && d(new n(new ArrayBuffer(1))) != I) ||
        (r && d(new r()) != h) ||
        (i && d(i.resolve()) != g) ||
        (o && d(new o()) != l) ||
        (s && d(new s()) != u)) &&
        (d = function (e) {
          var A = a(e),
            t = "[object Object]" == A ? e.constructor : void 0,
            n = t ? c(t) : "";
          if (n)
            switch (n) {
              case E:
                return I;
              case B:
                return h;
              case C:
                return g;
              case p:
                return l;
              case f:
                return u;
            }
          return A;
        }),
        (e.exports = d);
    },
    7801: function (e) {
      e.exports = function (e, A) {
        return null == e ? void 0 : e[A];
      };
    },
    222: function (e, A, t) {
      var n = t(1811),
        r = t(5694),
        i = t(1469),
        o = t(5776),
        s = t(1780),
        a = t(327);
      e.exports = function (e, A, t) {
        for (var c = -1, h = (A = n(A, e)).length, g = !1; ++c < h; ) {
          var l = a(A[c]);
          if (!(g = null != e && t(e, l))) break;
          e = e[l];
        }
        return g || ++c != h
          ? g
          : !!(h = null == e ? 0 : e.length) &&
              s(h) &&
              o(l, h) &&
              (i(e) || r(e));
      };
    },
    1789: function (e, A, t) {
      var n = t(4536);
      e.exports = function () {
        (this.__data__ = n ? n(null) : {}), (this.size = 0);
      };
    },
    401: function (e) {
      e.exports = function (e) {
        var A = this.has(e) && delete this.__data__[e];
        return (this.size -= A ? 1 : 0), A;
      };
    },
    7667: function (e, A, t) {
      var n = t(4536),
        r = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        var A = this.__data__;
        if (n) {
          var t = A[e];
          return "__lodash_hash_undefined__" === t ? void 0 : t;
        }
        return r.call(A, e) ? A[e] : void 0;
      };
    },
    1327: function (e, A, t) {
      var n = t(4536),
        r = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        var A = this.__data__;
        return n ? void 0 !== A[e] : r.call(A, e);
      };
    },
    1866: function (e, A, t) {
      var n = t(4536);
      e.exports = function (e, A) {
        var t = this.__data__;
        return (
          (this.size += this.has(e) ? 0 : 1),
          (t[e] = n && void 0 === A ? "__lodash_hash_undefined__" : A),
          this
        );
      };
    },
    3824: function (e) {
      var A = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        var t = e.length,
          n = new e.constructor(t);
        return (
          t &&
            "string" == typeof e[0] &&
            A.call(e, "index") &&
            ((n.index = e.index), (n.input = e.input)),
          n
        );
      };
    },
    9148: function (e, A, t) {
      var n = t(4318),
        r = t(7157),
        i = t(3147),
        o = t(419),
        s = t(7133);
      e.exports = function (e, A, t) {
        var a = e.constructor;
        switch (A) {
          case "[object ArrayBuffer]":
            return n(e);
          case "[object Boolean]":
          case "[object Date]":
            return new a(+e);
          case "[object DataView]":
            return r(e, t);
          case "[object Float32Array]":
          case "[object Float64Array]":
          case "[object Int8Array]":
          case "[object Int16Array]":
          case "[object Int32Array]":
          case "[object Uint8Array]":
          case "[object Uint8ClampedArray]":
          case "[object Uint16Array]":
          case "[object Uint32Array]":
            return s(e, t);
          case "[object Map]":
          case "[object Set]":
            return new a();
          case "[object Number]":
          case "[object String]":
            return new a(e);
          case "[object RegExp]":
            return i(e);
          case "[object Symbol]":
            return o(e);
        }
      };
    },
    8517: function (e, A, t) {
      var n = t(3118),
        r = t(5924),
        i = t(5726);
      e.exports = function (e) {
        return "function" != typeof e.constructor || i(e) ? {} : n(r(e));
      };
    },
    7285: function (e, A, t) {
      var n = t(2705),
        r = t(5694),
        i = t(1469),
        o = n ? n.isConcatSpreadable : void 0;
      e.exports = function (e) {
        return i(e) || r(e) || !!(o && e && e[o]);
      };
    },
    5776: function (e) {
      var A = /^(?:0|[1-9]\d*)$/;
      e.exports = function (e, t) {
        var n = typeof e;
        return (
          !!(t = null == t ? 9007199254740991 : t) &&
          ("number" == n || ("symbol" != n && A.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
        );
      };
    },
    6612: function (e, A, t) {
      var n = t(7813),
        r = t(8612),
        i = t(5776),
        o = t(3218);
      e.exports = function (e, A, t) {
        if (!o(t)) return !1;
        var s = typeof A;
        return (
          !!("number" == s
            ? r(t) && i(A, t.length)
            : "string" == s && A in t) && n(t[A], e)
        );
      };
    },
    5403: function (e, A, t) {
      var n = t(1469),
        r = t(3448),
        i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        o = /^\w*$/;
      e.exports = function (e, A) {
        if (n(e)) return !1;
        var t = typeof e;
        return (
          !(
            "number" != t &&
            "symbol" != t &&
            "boolean" != t &&
            null != e &&
            !r(e)
          ) ||
          o.test(e) ||
          !i.test(e) ||
          (null != A && e in Object(A))
        );
      };
    },
    7019: function (e) {
      e.exports = function (e) {
        var A = typeof e;
        return "string" == A || "number" == A || "symbol" == A || "boolean" == A
          ? "__proto__" !== e
          : null === e;
      };
    },
    5346: function (e, A, t) {
      var n,
        r = t(4429),
        i = (n = /[^.]+$/.exec((r && r.keys && r.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + n
          : "";
      e.exports = function (e) {
        return !!i && i in e;
      };
    },
    5726: function (e) {
      var A = Object.prototype;
      e.exports = function (e) {
        var t = e && e.constructor;
        return e === (("function" == typeof t && t.prototype) || A);
      };
    },
    9162: function (e, A, t) {
      var n = t(3218);
      e.exports = function (e) {
        return e == e && !n(e);
      };
    },
    7040: function (e) {
      e.exports = function () {
        (this.__data__ = []), (this.size = 0);
      };
    },
    4125: function (e, A, t) {
      var n = t(8470),
        r = Array.prototype.splice;
      e.exports = function (e) {
        var A = this.__data__,
          t = n(A, e);
        return !(
          t < 0 ||
          (t == A.length - 1 ? A.pop() : r.call(A, t, 1), --this.size, 0)
        );
      };
    },
    2117: function (e, A, t) {
      var n = t(8470);
      e.exports = function (e) {
        var A = this.__data__,
          t = n(A, e);
        return t < 0 ? void 0 : A[t][1];
      };
    },
    7518: function (e, A, t) {
      var n = t(8470);
      e.exports = function (e) {
        return n(this.__data__, e) > -1;
      };
    },
    4705: function (e, A, t) {
      var n = t(8470);
      e.exports = function (e, A) {
        var t = this.__data__,
          r = n(t, e);
        return r < 0 ? (++this.size, t.push([e, A])) : (t[r][1] = A), this;
      };
    },
    4785: function (e, A, t) {
      var n = t(1989),
        r = t(8407),
        i = t(7071);
      e.exports = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new n(),
            map: new (i || r)(),
            string: new n(),
          });
      };
    },
    1285: function (e, A, t) {
      var n = t(5050);
      e.exports = function (e) {
        var A = n(this, e).delete(e);
        return (this.size -= A ? 1 : 0), A;
      };
    },
    6e3: function (e, A, t) {
      var n = t(5050);
      e.exports = function (e) {
        return n(this, e).get(e);
      };
    },
    9916: function (e, A, t) {
      var n = t(5050);
      e.exports = function (e) {
        return n(this, e).has(e);
      };
    },
    5265: function (e, A, t) {
      var n = t(5050);
      e.exports = function (e, A) {
        var t = n(this, e),
          r = t.size;
        return t.set(e, A), (this.size += t.size == r ? 0 : 1), this;
      };
    },
    8776: function (e) {
      e.exports = function (e) {
        var A = -1,
          t = Array(e.size);
        return (
          e.forEach(function (e, n) {
            t[++A] = [n, e];
          }),
          t
        );
      };
    },
    2634: function (e) {
      e.exports = function (e, A) {
        return function (t) {
          return null != t && t[e] === A && (void 0 !== A || e in Object(t));
        };
      };
    },
    4523: function (e, A, t) {
      var n = t(8306);
      e.exports = function (e) {
        var A = n(e, function (e) {
            return 500 === t.size && t.clear(), e;
          }),
          t = A.cache;
        return A;
      };
    },
    4536: function (e, A, t) {
      var n = t(852)(Object, "create");
      e.exports = n;
    },
    6916: function (e, A, t) {
      var n = t(5569)(Object.keys, Object);
      e.exports = n;
    },
    3498: function (e) {
      e.exports = function (e) {
        var A = [];
        if (null != e) for (var t in Object(e)) A.push(t);
        return A;
      };
    },
    1167: function (e, A, t) {
      e = t.nmd(e);
      var n = t(1957),
        r = A && !A.nodeType && A,
        i = r && e && !e.nodeType && e,
        o = i && i.exports === r && n.process,
        s = (function () {
          try {
            return (
              (i && i.require && i.require("util").types) ||
              (o && o.binding && o.binding("util"))
            );
          } catch (e) {}
        })();
      e.exports = s;
    },
    2333: function (e) {
      var A = Object.prototype.toString;
      e.exports = function (e) {
        return A.call(e);
      };
    },
    5569: function (e) {
      e.exports = function (e, A) {
        return function (t) {
          return e(A(t));
        };
      };
    },
    5357: function (e, A, t) {
      var n = t(6874),
        r = Math.max;
      e.exports = function (e, A, t) {
        return (
          (A = r(void 0 === A ? e.length - 1 : A, 0)),
          function () {
            for (
              var i = arguments, o = -1, s = r(i.length - A, 0), a = Array(s);
              ++o < s;

            )
              a[o] = i[A + o];
            o = -1;
            for (var c = Array(A + 1); ++o < A; ) c[o] = i[o];
            return (c[A] = t(a)), n(e, this, c);
          }
        );
      };
    },
    5639: function (e, A, t) {
      var n = t(1957),
        r = "object" == typeof self && self && self.Object === Object && self,
        i = n || r || Function("return this")();
      e.exports = i;
    },
    619: function (e) {
      e.exports = function (e) {
        return this.__data__.set(e, "__lodash_hash_undefined__"), this;
      };
    },
    2385: function (e) {
      e.exports = function (e) {
        return this.__data__.has(e);
      };
    },
    1814: function (e) {
      e.exports = function (e) {
        var A = -1,
          t = Array(e.size);
        return (
          e.forEach(function (e) {
            t[++A] = e;
          }),
          t
        );
      };
    },
    61: function (e, A, t) {
      var n = t(6560),
        r = t(1275)(n);
      e.exports = r;
    },
    1275: function (e) {
      var A = Date.now;
      e.exports = function (e) {
        var t = 0,
          n = 0;
        return function () {
          var r = A(),
            i = 16 - (r - n);
          if (((n = r), i > 0)) {
            if (++t >= 800) return arguments[0];
          } else t = 0;
          return e.apply(void 0, arguments);
        };
      };
    },
    7465: function (e, A, t) {
      var n = t(8407);
      e.exports = function () {
        (this.__data__ = new n()), (this.size = 0);
      };
    },
    3779: function (e) {
      e.exports = function (e) {
        var A = this.__data__,
          t = A.delete(e);
        return (this.size = A.size), t;
      };
    },
    7599: function (e) {
      e.exports = function (e) {
        return this.__data__.get(e);
      };
    },
    4758: function (e) {
      e.exports = function (e) {
        return this.__data__.has(e);
      };
    },
    4309: function (e, A, t) {
      var n = t(8407),
        r = t(7071),
        i = t(3369);
      e.exports = function (e, A) {
        var t = this.__data__;
        if (t instanceof n) {
          var o = t.__data__;
          if (!r || o.length < 199)
            return o.push([e, A]), (this.size = ++t.size), this;
          t = this.__data__ = new i(o);
        }
        return t.set(e, A), (this.size = t.size), this;
      };
    },
    2351: function (e) {
      e.exports = function (e, A, t) {
        for (var n = t - 1, r = e.length; ++n < r; ) if (e[n] === A) return n;
        return -1;
      };
    },
    5514: function (e, A, t) {
      var n = t(4523),
        r =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        i = /\\(\\)?/g,
        o = n(function (e) {
          var A = [];
          return (
            46 === e.charCodeAt(0) && A.push(""),
            e.replace(r, function (e, t, n, r) {
              A.push(n ? r.replace(i, "$1") : t || e);
            }),
            A
          );
        });
      e.exports = o;
    },
    327: function (e, A, t) {
      var n = t(3448);
      e.exports = function (e) {
        if ("string" == typeof e || n(e)) return e;
        var A = e + "";
        return "0" == A && 1 / e == -1 / 0 ? "-0" : A;
      };
    },
    346: function (e) {
      var A = Function.prototype.toString;
      e.exports = function (e) {
        if (null != e) {
          try {
            return A.call(e);
          } catch (e) {}
          try {
            return e + "";
          } catch (e) {}
        }
        return "";
      };
    },
    7990: function (e) {
      var A = /\s/;
      e.exports = function (e) {
        for (var t = e.length; t-- && A.test(e.charAt(t)); );
        return t;
      };
    },
    361: function (e, A, t) {
      var n = t(5990);
      e.exports = function (e) {
        return n(e, 5);
      };
    },
    5703: function (e) {
      e.exports = function (e) {
        return function () {
          return e;
        };
      };
    },
    3279: function (e, A, t) {
      var n = t(3218),
        r = t(7771),
        i = t(4841),
        o = Math.max,
        s = Math.min;
      e.exports = function (e, A, t) {
        var a,
          c,
          h,
          g,
          l,
          u,
          I = 0,
          E = !1,
          B = !1,
          C = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        function p(A) {
          var t = a,
            n = c;
          return (a = c = void 0), (I = A), (g = e.apply(n, t));
        }
        function f(e) {
          var t = e - u;
          return void 0 === u || t >= A || t < 0 || (B && e - I >= h);
        }
        function d() {
          var e = r();
          if (f(e)) return Q(e);
          l = setTimeout(
            d,
            (function (e) {
              var t = A - (e - u);
              return B ? s(t, h - (e - I)) : t;
            })(e)
          );
        }
        function Q(e) {
          return (l = void 0), C && a ? p(e) : ((a = c = void 0), g);
        }
        function m() {
          var e = r(),
            t = f(e);
          if (((a = arguments), (c = this), (u = e), t)) {
            if (void 0 === l)
              return (function (e) {
                return (I = e), (l = setTimeout(d, A)), E ? p(e) : g;
              })(u);
            if (B) return clearTimeout(l), (l = setTimeout(d, A)), p(u);
          }
          return void 0 === l && (l = setTimeout(d, A)), g;
        }
        return (
          (A = i(A) || 0),
          n(t) &&
            ((E = !!t.leading),
            (h = (B = "maxWait" in t) ? o(i(t.maxWait) || 0, A) : h),
            (C = "trailing" in t ? !!t.trailing : C)),
          (m.cancel = function () {
            void 0 !== l && clearTimeout(l), (I = 0), (a = u = c = l = void 0);
          }),
          (m.flush = function () {
            return void 0 === l ? g : Q(r());
          }),
          m
        );
      };
    },
    1966: function (e, A, t) {
      var n = t(731),
        r = t(1078),
        i = t(5976),
        o = t(9246),
        s = i(function (e, A) {
          return o(e) ? n(e, r(A, 1, o, !0)) : [];
        });
      e.exports = s;
    },
    7813: function (e) {
      e.exports = function (e, A) {
        return e === A || (e != e && A != A);
      };
    },
    8804: function (e, A, t) {
      e.exports = t(1175);
    },
    5564: function (e, A, t) {
      var n = t(1078);
      e.exports = function (e) {
        return null != e && e.length ? n(e, 1) : [];
      };
    },
    7361: function (e, A, t) {
      var n = t(7786);
      e.exports = function (e, A, t) {
        var r = null == e ? void 0 : n(e, A);
        return void 0 === r ? t : r;
      };
    },
    8721: function (e, A, t) {
      var n = t(8565),
        r = t(222);
      e.exports = function (e, A) {
        return null != e && r(e, A, n);
      };
    },
    9095: function (e, A, t) {
      var n = t(13),
        r = t(222);
      e.exports = function (e, A) {
        return null != e && r(e, A, n);
      };
    },
    1175: function (e) {
      e.exports = function (e) {
        return e && e.length ? e[0] : void 0;
      };
    },
    6557: function (e) {
      e.exports = function (e) {
        return e;
      };
    },
    5694: function (e, A, t) {
      var n = t(9454),
        r = t(7005),
        i = Object.prototype,
        o = i.hasOwnProperty,
        s = i.propertyIsEnumerable,
        a = n(
          (function () {
            return arguments;
          })()
        )
          ? n
          : function (e) {
              return r(e) && o.call(e, "callee") && !s.call(e, "callee");
            };
      e.exports = a;
    },
    1469: function (e) {
      var A = Array.isArray;
      e.exports = A;
    },
    8612: function (e, A, t) {
      var n = t(3560),
        r = t(1780);
      e.exports = function (e) {
        return null != e && r(e.length) && !n(e);
      };
    },
    9246: function (e, A, t) {
      var n = t(8612),
        r = t(7005);
      e.exports = function (e) {
        return r(e) && n(e);
      };
    },
    4144: function (e, A, t) {
      e = t.nmd(e);
      var n = t(5639),
        r = t(5062),
        i = A && !A.nodeType && A,
        o = i && e && !e.nodeType && e,
        s = o && o.exports === i ? n.Buffer : void 0,
        a = (s ? s.isBuffer : void 0) || r;
      e.exports = a;
    },
    8446: function (e, A, t) {
      var n = t(939);
      e.exports = function (e, A) {
        return n(e, A);
      };
    },
    3560: function (e, A, t) {
      var n = t(4239),
        r = t(3218);
      e.exports = function (e) {
        if (!r(e)) return !1;
        var A = n(e);
        return (
          "[object Function]" == A ||
          "[object GeneratorFunction]" == A ||
          "[object AsyncFunction]" == A ||
          "[object Proxy]" == A
        );
      };
    },
    1780: function (e) {
      e.exports = function (e) {
        return (
          "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
        );
      };
    },
    6688: function (e, A, t) {
      var n = t(5588),
        r = t(1717),
        i = t(1167),
        o = i && i.isMap,
        s = o ? r(o) : n;
      e.exports = s;
    },
    4293: function (e) {
      e.exports = function (e) {
        return null == e;
      };
    },
    3218: function (e) {
      e.exports = function (e) {
        var A = typeof e;
        return null != e && ("object" == A || "function" == A);
      };
    },
    7005: function (e) {
      e.exports = function (e) {
        return null != e && "object" == typeof e;
      };
    },
    2928: function (e, A, t) {
      var n = t(9221),
        r = t(1717),
        i = t(1167),
        o = i && i.isSet,
        s = o ? r(o) : n;
      e.exports = s;
    },
    3448: function (e, A, t) {
      var n = t(4239),
        r = t(7005);
      e.exports = function (e) {
        return "symbol" == typeof e || (r(e) && "[object Symbol]" == n(e));
      };
    },
    4954: function (e, A, t) {
      var n = t(8749),
        r = t(1717),
        i = t(1167),
        o = i && i.isTypedArray,
        s = o ? r(o) : n;
      e.exports = s;
    },
    3674: function (e, A, t) {
      var n = t(4636),
        r = t(280),
        i = t(8612);
      e.exports = function (e) {
        return i(e) ? n(e) : r(e);
      };
    },
    1704: function (e, A, t) {
      var n = t(4636),
        r = t(313),
        i = t(8612);
      e.exports = function (e) {
        return i(e) ? n(e, !0) : r(e);
      };
    },
    928: function (e) {
      e.exports = function (e) {
        var A = null == e ? 0 : e.length;
        return A ? e[A - 1] : void 0;
      };
    },
    8306: function (e, A, t) {
      var n = t(3369);
      function r(e, A) {
        if ("function" != typeof e || (null != A && "function" != typeof A))
          throw new TypeError("Expected a function");
        var t = function () {
          var n = arguments,
            r = A ? A.apply(this, n) : n[0],
            i = t.cache;
          if (i.has(r)) return i.get(r);
          var o = e.apply(this, n);
          return (t.cache = i.set(r, o) || i), o;
        };
        return (t.cache = new (r.Cache || n)()), t;
      }
      (r.Cache = n), (e.exports = r);
    },
    308: function (e) {
      e.exports = function () {};
    },
    7771: function (e, A, t) {
      var n = t(5639);
      e.exports = function () {
        return n.Date.now();
      };
    },
    5937: function (e, A, t) {
      var n = t(9932),
        r = t(7206),
        i = t(3012),
        o = t(6904);
      e.exports = function (e, A) {
        if (null == e) return {};
        var t = n(o(e), function (e) {
          return [e];
        });
        return (
          (A = r(A)),
          i(e, t, function (e, t) {
            return A(e, t[0]);
          })
        );
      };
    },
    9601: function (e, A, t) {
      var n = t(371),
        r = t(9152),
        i = t(5403),
        o = t(327);
      e.exports = function (e) {
        return i(e) ? n(o(e)) : r(e);
      };
    },
    9734: function (e, A, t) {
      var n = t(1078),
        r = t(2689),
        i = t(5976),
        o = t(6612),
        s = i(function (e, A) {
          if (null == e) return [];
          var t = A.length;
          return (
            t > 1 && o(e, A[0], A[1])
              ? (A = [])
              : t > 2 && o(A[0], A[1], A[2]) && (A = [A[0]]),
            r(e, n(A, 1), [])
          );
        });
      e.exports = s;
    },
    479: function (e) {
      e.exports = function () {
        return [];
      };
    },
    5062: function (e) {
      e.exports = function () {
        return !1;
      };
    },
    4841: function (e, A, t) {
      var n = t(7561),
        r = t(3218),
        i = t(3448),
        o = /^[-+]0x[0-9a-f]+$/i,
        s = /^0b[01]+$/i,
        a = /^0o[0-7]+$/i,
        c = parseInt;
      e.exports = function (e) {
        if ("number" == typeof e) return e;
        if (i(e)) return NaN;
        if (r(e)) {
          var A = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = r(A) ? A + "" : A;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = n(e);
        var t = s.test(e);
        return t || a.test(e) ? c(e.slice(2), t ? 2 : 8) : o.test(e) ? NaN : +e;
      };
    },
    9833: function (e, A, t) {
      var n = t(531);
      e.exports = function (e) {
        return null == e ? "" : n(e);
      };
    },
    4908: function (e, A, t) {
      var n = t(5652);
      e.exports = function (e) {
        return e && e.length ? n(e) : [];
      };
    },
    5578: function (e, A, t) {
      var n = t(7206),
        r = t(5652);
      e.exports = function (e, A) {
        return e && e.length ? r(e, n(A, 2)) : [];
      };
    },
    7340: function (e, A, t) {
      "use strict";
      t.d(A, {
        z: function () {
          return s;
        },
      });
      var n = t(4468);
      const r = { type: "change" },
        i = { type: "start" },
        o = { type: "end" };
      class s extends n.EventDispatcher {
        constructor(e, A) {
          super(),
            (this.object = e),
            (this.domElement = A),
            (this.domElement.style.touchAction = "none"),
            (this.enabled = !0),
            (this.target = new n.Vector3()),
            (this.minDistance = 0),
            (this.maxDistance = 1 / 0),
            (this.minZoom = 0),
            (this.maxZoom = 1 / 0),
            (this.minPolarAngle = 0),
            (this.maxPolarAngle = Math.PI),
            (this.minAzimuthAngle = -1 / 0),
            (this.maxAzimuthAngle = 1 / 0),
            (this.enableDamping = !1),
            (this.dampingFactor = 0.05),
            (this.enableZoom = !0),
            (this.zoomSpeed = 1),
            (this.enableRotate = !0),
            (this.rotateSpeed = 1),
            (this.enablePan = !0),
            (this.panSpeed = 1),
            (this.screenSpacePanning = !0),
            (this.keyPanSpeed = 7),
            (this.autoRotate = !1),
            (this.autoRotateSpeed = 2),
            (this.keys = {
              LEFT: "ArrowLeft",
              UP: "ArrowUp",
              RIGHT: "ArrowRight",
              BOTTOM: "ArrowDown",
            }),
            (this.mouseButtons = {
              LEFT: n.MOUSE.ROTATE,
              MIDDLE: n.MOUSE.DOLLY,
              RIGHT: n.MOUSE.PAN,
            }),
            (this.touches = { ONE: n.TOUCH.ROTATE, TWO: n.TOUCH.DOLLY_PAN }),
            (this.target0 = this.target.clone()),
            (this.position0 = this.object.position.clone()),
            (this.zoom0 = this.object.zoom),
            (this._domElementKeyEvents = null),
            (this.getPolarAngle = function () {
              return h.phi;
            }),
            (this.getAzimuthalAngle = function () {
              return h.theta;
            }),
            (this.getDistance = function () {
              return this.object.position.distanceTo(this.target);
            }),
            (this.listenToKeyEvents = function (e) {
              e.addEventListener("keydown", J), (this._domElementKeyEvents = e);
            }),
            (this.stopListenToKeyEvents = function () {
              this._domElementKeyEvents.removeEventListener("keydown", J),
                (this._domElementKeyEvents = null);
            }),
            (this.saveState = function () {
              t.target0.copy(t.target),
                t.position0.copy(t.object.position),
                (t.zoom0 = t.object.zoom);
            }),
            (this.reset = function () {
              t.target.copy(t.target0),
                t.object.position.copy(t.position0),
                (t.object.zoom = t.zoom0),
                t.object.updateProjectionMatrix(),
                t.dispatchEvent(r),
                t.update(),
                (a = s.NONE);
            }),
            (this.update = (function () {
              const A = new n.Vector3(),
                i = new n.Quaternion().setFromUnitVectors(
                  e.up,
                  new n.Vector3(0, 1, 0)
                ),
                o = i.clone().invert(),
                E = new n.Vector3(),
                B = new n.Quaternion(),
                C = new n.Vector3(),
                p = 2 * Math.PI;
              return function () {
                const e = t.object.position;
                A.copy(e).sub(t.target),
                  A.applyQuaternion(i),
                  h.setFromVector3(A),
                  t.autoRotate &&
                    a === s.NONE &&
                    S(((2 * Math.PI) / 60 / 60) * t.autoRotateSpeed),
                  t.enableDamping
                    ? ((h.theta += g.theta * t.dampingFactor),
                      (h.phi += g.phi * t.dampingFactor))
                    : ((h.theta += g.theta), (h.phi += g.phi));
                let n = t.minAzimuthAngle,
                  f = t.maxAzimuthAngle;
                return (
                  isFinite(n) &&
                    isFinite(f) &&
                    (n < -Math.PI ? (n += p) : n > Math.PI && (n -= p),
                    f < -Math.PI ? (f += p) : f > Math.PI && (f -= p),
                    (h.theta =
                      n <= f
                        ? Math.max(n, Math.min(f, h.theta))
                        : h.theta > (n + f) / 2
                        ? Math.max(n, h.theta)
                        : Math.min(f, h.theta))),
                  (h.phi = Math.max(
                    t.minPolarAngle,
                    Math.min(t.maxPolarAngle, h.phi)
                  )),
                  h.makeSafe(),
                  (h.radius *= l),
                  (h.radius = Math.max(
                    t.minDistance,
                    Math.min(t.maxDistance, h.radius)
                  )),
                  !0 === t.enableDamping
                    ? t.target.addScaledVector(u, t.dampingFactor)
                    : t.target.add(u),
                  A.setFromSpherical(h),
                  A.applyQuaternion(o),
                  e.copy(t.target).add(A),
                  t.object.lookAt(t.target),
                  !0 === t.enableDamping
                    ? ((g.theta *= 1 - t.dampingFactor),
                      (g.phi *= 1 - t.dampingFactor),
                      u.multiplyScalar(1 - t.dampingFactor))
                    : (g.set(0, 0, 0), u.set(0, 0, 0)),
                  (l = 1),
                  !!(
                    I ||
                    E.distanceToSquared(t.object.position) > c ||
                    8 * (1 - B.dot(t.object.quaternion)) > c ||
                    C.distanceToSquared(t.target) > 0
                  ) &&
                    (t.dispatchEvent(r),
                    E.copy(t.object.position),
                    B.copy(t.object.quaternion),
                    C.copy(t.target),
                    (I = !1),
                    !0)
                );
              };
            })()),
            (this.dispose = function () {
              t.domElement.removeEventListener("contextmenu", K),
                t.domElement.removeEventListener("pointerdown", H),
                t.domElement.removeEventListener("pointercancel", Y),
                t.domElement.removeEventListener("wheel", j),
                t.domElement.removeEventListener("pointermove", q),
                t.domElement.removeEventListener("pointerup", Y),
                null !== t._domElementKeyEvents &&
                  (t._domElementKeyEvents.removeEventListener("keydown", J),
                  (t._domElementKeyEvents = null));
            });
          const t = this,
            s = {
              NONE: -1,
              ROTATE: 0,
              DOLLY: 1,
              PAN: 2,
              TOUCH_ROTATE: 3,
              TOUCH_PAN: 4,
              TOUCH_DOLLY_PAN: 5,
              TOUCH_DOLLY_ROTATE: 6,
            };
          let a = s.NONE;
          const c = 1e-6,
            h = new n.Spherical(),
            g = new n.Spherical();
          let l = 1;
          const u = new n.Vector3();
          let I = !1;
          const E = new n.Vector2(),
            B = new n.Vector2(),
            C = new n.Vector2(),
            p = new n.Vector2(),
            f = new n.Vector2(),
            d = new n.Vector2(),
            Q = new n.Vector2(),
            m = new n.Vector2(),
            w = new n.Vector2(),
            y = [],
            x = {};
          function b() {
            return Math.pow(0.95, t.zoomSpeed);
          }
          function S(e) {
            g.theta -= e;
          }
          function _(e) {
            g.phi -= e;
          }
          const D = (function () {
              const e = new n.Vector3();
              return function (A, t) {
                e.setFromMatrixColumn(t, 0), e.multiplyScalar(-A), u.add(e);
              };
            })(),
            R = (function () {
              const e = new n.Vector3();
              return function (A, n) {
                !0 === t.screenSpacePanning
                  ? e.setFromMatrixColumn(n, 1)
                  : (e.setFromMatrixColumn(n, 0),
                    e.crossVectors(t.object.up, e)),
                  e.multiplyScalar(A),
                  u.add(e);
              };
            })(),
            v = (function () {
              const e = new n.Vector3();
              return function (A, n) {
                const r = t.domElement;
                if (t.object.isPerspectiveCamera) {
                  const i = t.object.position;
                  e.copy(i).sub(t.target);
                  let o = e.length();
                  (o *= Math.tan(((t.object.fov / 2) * Math.PI) / 180)),
                    D((2 * A * o) / r.clientHeight, t.object.matrix),
                    R((2 * n * o) / r.clientHeight, t.object.matrix);
                } else
                  t.object.isOrthographicCamera
                    ? (D(
                        (A * (t.object.right - t.object.left)) /
                          t.object.zoom /
                          r.clientWidth,
                        t.object.matrix
                      ),
                      R(
                        (n * (t.object.top - t.object.bottom)) /
                          t.object.zoom /
                          r.clientHeight,
                        t.object.matrix
                      ))
                    : (console.warn(
                        "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
                      ),
                      (t.enablePan = !1));
              };
            })();
          function F(e) {
            t.object.isPerspectiveCamera
              ? (l /= e)
              : t.object.isOrthographicCamera
              ? ((t.object.zoom = Math.max(
                  t.minZoom,
                  Math.min(t.maxZoom, t.object.zoom * e)
                )),
                t.object.updateProjectionMatrix(),
                (I = !0))
              : (console.warn(
                  "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
                ),
                (t.enableZoom = !1));
          }
          function T(e) {
            t.object.isPerspectiveCamera
              ? (l *= e)
              : t.object.isOrthographicCamera
              ? ((t.object.zoom = Math.max(
                  t.minZoom,
                  Math.min(t.maxZoom, t.object.zoom / e)
                )),
                t.object.updateProjectionMatrix(),
                (I = !0))
              : (console.warn(
                  "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
                ),
                (t.enableZoom = !1));
          }
          function M(e) {
            E.set(e.clientX, e.clientY);
          }
          function L(e) {
            p.set(e.clientX, e.clientY);
          }
          function G() {
            if (1 === y.length) E.set(y[0].pageX, y[0].pageY);
            else {
              const e = 0.5 * (y[0].pageX + y[1].pageX),
                A = 0.5 * (y[0].pageY + y[1].pageY);
              E.set(e, A);
            }
          }
          function U() {
            if (1 === y.length) p.set(y[0].pageX, y[0].pageY);
            else {
              const e = 0.5 * (y[0].pageX + y[1].pageX),
                A = 0.5 * (y[0].pageY + y[1].pageY);
              p.set(e, A);
            }
          }
          function k() {
            const e = y[0].pageX - y[1].pageX,
              A = y[0].pageY - y[1].pageY,
              t = Math.sqrt(e * e + A * A);
            Q.set(0, t);
          }
          function N(e) {
            if (1 == y.length) B.set(e.pageX, e.pageY);
            else {
              const A = X(e),
                t = 0.5 * (e.pageX + A.x),
                n = 0.5 * (e.pageY + A.y);
              B.set(t, n);
            }
            C.subVectors(B, E).multiplyScalar(t.rotateSpeed);
            const A = t.domElement;
            S((2 * Math.PI * C.x) / A.clientHeight),
              _((2 * Math.PI * C.y) / A.clientHeight),
              E.copy(B);
          }
          function P(e) {
            if (1 === y.length) f.set(e.pageX, e.pageY);
            else {
              const A = X(e),
                t = 0.5 * (e.pageX + A.x),
                n = 0.5 * (e.pageY + A.y);
              f.set(t, n);
            }
            d.subVectors(f, p).multiplyScalar(t.panSpeed),
              v(d.x, d.y),
              p.copy(f);
          }
          function O(e) {
            const A = X(e),
              n = e.pageX - A.x,
              r = e.pageY - A.y,
              i = Math.sqrt(n * n + r * r);
            m.set(0, i),
              w.set(0, Math.pow(m.y / Q.y, t.zoomSpeed)),
              F(w.y),
              Q.copy(m);
          }
          function H(e) {
            !1 !== t.enabled &&
              (0 === y.length &&
                (t.domElement.setPointerCapture(e.pointerId),
                t.domElement.addEventListener("pointermove", q),
                t.domElement.addEventListener("pointerup", Y)),
              (function (e) {
                y.push(e);
              })(e),
              "touch" === e.pointerType
                ? (function (e) {
                    switch ((V(e), y.length)) {
                      case 1:
                        switch (t.touches.ONE) {
                          case n.TOUCH.ROTATE:
                            if (!1 === t.enableRotate) return;
                            G(), (a = s.TOUCH_ROTATE);
                            break;
                          case n.TOUCH.PAN:
                            if (!1 === t.enablePan) return;
                            U(), (a = s.TOUCH_PAN);
                            break;
                          default:
                            a = s.NONE;
                        }
                        break;
                      case 2:
                        switch (t.touches.TWO) {
                          case n.TOUCH.DOLLY_PAN:
                            if (!1 === t.enableZoom && !1 === t.enablePan)
                              return;
                            t.enableZoom && k(),
                              t.enablePan && U(),
                              (a = s.TOUCH_DOLLY_PAN);
                            break;
                          case n.TOUCH.DOLLY_ROTATE:
                            if (!1 === t.enableZoom && !1 === t.enableRotate)
                              return;
                            t.enableZoom && k(),
                              t.enableRotate && G(),
                              (a = s.TOUCH_DOLLY_ROTATE);
                            break;
                          default:
                            a = s.NONE;
                        }
                        break;
                      default:
                        a = s.NONE;
                    }
                    a !== s.NONE && t.dispatchEvent(i);
                  })(e)
                : (function (e) {
                    let A;
                    switch (e.button) {
                      case 0:
                        A = t.mouseButtons.LEFT;
                        break;
                      case 1:
                        A = t.mouseButtons.MIDDLE;
                        break;
                      case 2:
                        A = t.mouseButtons.RIGHT;
                        break;
                      default:
                        A = -1;
                    }
                    switch (A) {
                      case n.MOUSE.DOLLY:
                        if (!1 === t.enableZoom) return;
                        !(function (e) {
                          Q.set(e.clientX, e.clientY);
                        })(e),
                          (a = s.DOLLY);
                        break;
                      case n.MOUSE.ROTATE:
                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                          if (!1 === t.enablePan) return;
                          L(e), (a = s.PAN);
                        } else {
                          if (!1 === t.enableRotate) return;
                          M(e), (a = s.ROTATE);
                        }
                        break;
                      case n.MOUSE.PAN:
                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                          if (!1 === t.enableRotate) return;
                          M(e), (a = s.ROTATE);
                        } else {
                          if (!1 === t.enablePan) return;
                          L(e), (a = s.PAN);
                        }
                        break;
                      default:
                        a = s.NONE;
                    }
                    a !== s.NONE && t.dispatchEvent(i);
                  })(e));
          }
          function q(e) {
            !1 !== t.enabled &&
              ("touch" === e.pointerType
                ? (function (e) {
                    switch ((V(e), a)) {
                      case s.TOUCH_ROTATE:
                        if (!1 === t.enableRotate) return;
                        N(e), t.update();
                        break;
                      case s.TOUCH_PAN:
                        if (!1 === t.enablePan) return;
                        P(e), t.update();
                        break;
                      case s.TOUCH_DOLLY_PAN:
                        if (!1 === t.enableZoom && !1 === t.enablePan) return;
                        !(function (e) {
                          t.enableZoom && O(e), t.enablePan && P(e);
                        })(e),
                          t.update();
                        break;
                      case s.TOUCH_DOLLY_ROTATE:
                        if (!1 === t.enableZoom && !1 === t.enableRotate)
                          return;
                        !(function (e) {
                          t.enableZoom && O(e), t.enableRotate && N(e);
                        })(e),
                          t.update();
                        break;
                      default:
                        a = s.NONE;
                    }
                  })(e)
                : (function (e) {
                    switch (a) {
                      case s.ROTATE:
                        if (!1 === t.enableRotate) return;
                        !(function (e) {
                          B.set(e.clientX, e.clientY),
                            C.subVectors(B, E).multiplyScalar(t.rotateSpeed);
                          const A = t.domElement;
                          S((2 * Math.PI * C.x) / A.clientHeight),
                            _((2 * Math.PI * C.y) / A.clientHeight),
                            E.copy(B),
                            t.update();
                        })(e);
                        break;
                      case s.DOLLY:
                        if (!1 === t.enableZoom) return;
                        !(function (e) {
                          m.set(e.clientX, e.clientY),
                            w.subVectors(m, Q),
                            w.y > 0 ? F(b()) : w.y < 0 && T(b()),
                            Q.copy(m),
                            t.update();
                        })(e);
                        break;
                      case s.PAN:
                        if (!1 === t.enablePan) return;
                        !(function (e) {
                          f.set(e.clientX, e.clientY),
                            d.subVectors(f, p).multiplyScalar(t.panSpeed),
                            v(d.x, d.y),
                            p.copy(f),
                            t.update();
                        })(e);
                    }
                  })(e));
          }
          function Y(e) {
            !(function (e) {
              delete x[e.pointerId];
              for (let A = 0; A < y.length; A++)
                if (y[A].pointerId == e.pointerId) return void y.splice(A, 1);
            })(e),
              0 === y.length &&
                (t.domElement.releasePointerCapture(e.pointerId),
                t.domElement.removeEventListener("pointermove", q),
                t.domElement.removeEventListener("pointerup", Y)),
              t.dispatchEvent(o),
              (a = s.NONE);
          }
          function j(e) {
            !1 !== t.enabled &&
              !1 !== t.enableZoom &&
              a === s.NONE &&
              (e.preventDefault(),
              t.dispatchEvent(i),
              (function (e) {
                e.deltaY < 0 ? T(b()) : e.deltaY > 0 && F(b()), t.update();
              })(e),
              t.dispatchEvent(o));
          }
          function J(e) {
            !1 !== t.enabled &&
              !1 !== t.enablePan &&
              (function (e) {
                let A = !1;
                switch (e.code) {
                  case t.keys.UP:
                    e.ctrlKey || e.metaKey || e.shiftKey
                      ? _(
                          (2 * Math.PI * t.rotateSpeed) /
                            t.domElement.clientHeight
                        )
                      : v(0, t.keyPanSpeed),
                      (A = !0);
                    break;
                  case t.keys.BOTTOM:
                    e.ctrlKey || e.metaKey || e.shiftKey
                      ? _(
                          (-2 * Math.PI * t.rotateSpeed) /
                            t.domElement.clientHeight
                        )
                      : v(0, -t.keyPanSpeed),
                      (A = !0);
                    break;
                  case t.keys.LEFT:
                    e.ctrlKey || e.metaKey || e.shiftKey
                      ? S(
                          (2 * Math.PI * t.rotateSpeed) /
                            t.domElement.clientHeight
                        )
                      : v(t.keyPanSpeed, 0),
                      (A = !0);
                    break;
                  case t.keys.RIGHT:
                    e.ctrlKey || e.metaKey || e.shiftKey
                      ? S(
                          (-2 * Math.PI * t.rotateSpeed) /
                            t.domElement.clientHeight
                        )
                      : v(-t.keyPanSpeed, 0),
                      (A = !0);
                }
                A && (e.preventDefault(), t.update());
              })(e);
          }
          function K(e) {
            !1 !== t.enabled && e.preventDefault();
          }
          function V(e) {
            let A = x[e.pointerId];
            void 0 === A && ((A = new n.Vector2()), (x[e.pointerId] = A)),
              A.set(e.pageX, e.pageY);
          }
          function X(e) {
            const A = e.pointerId === y[0].pointerId ? y[1] : y[0];
            return x[A.pointerId];
          }
          t.domElement.addEventListener("contextmenu", K),
            t.domElement.addEventListener("pointerdown", H),
            t.domElement.addEventListener("pointercancel", Y),
            t.domElement.addEventListener("wheel", j, { passive: !1 }),
            this.update();
        }
      }
    },
    197: function (e, A, t) {
      "use strict";
      t.d(A, {
        Ys: function () {
          return u;
        },
      });
      var n = t(4468);
      const r = new n.Raycaster(),
        i = new n.Vector3(),
        o = new n.Vector3(),
        s = new n.Quaternion(),
        a = {
          X: new n.Vector3(1, 0, 0),
          Y: new n.Vector3(0, 1, 0),
          Z: new n.Vector3(0, 0, 1),
        },
        c = { type: "change" },
        h = { type: "mouseDown" },
        g = { type: "mouseUp", mode: null },
        l = { type: "objectChange" };
      class u extends n.Object3D {
        constructor(e, A) {
          super(),
            void 0 === A &&
              (console.warn(
                'THREE.TransformControls: The second parameter "domElement" is now mandatory.'
              ),
              (A = document)),
            (this.isTransformControls = !0),
            (this.visible = !1),
            (this.domElement = A),
            (this.domElement.style.touchAction = "none");
          const t = new M();
          (this._gizmo = t), this.add(t);
          const r = new L();
          (this._plane = r), this.add(r);
          const i = this;
          function o(e, A) {
            let n = A;
            Object.defineProperty(i, e, {
              get: function () {
                return void 0 !== n ? n : A;
              },
              set: function (A) {
                n !== A &&
                  ((n = A),
                  (r[e] = A),
                  (t[e] = A),
                  i.dispatchEvent({ type: e + "-changed", value: A }),
                  i.dispatchEvent(c));
              },
            }),
              (i[e] = A),
              (r[e] = A),
              (t[e] = A);
          }
          o("camera", e),
            o("object", void 0),
            o("enabled", !0),
            o("axis", null),
            o("mode", "translate"),
            o("translationSnap", null),
            o("rotationSnap", null),
            o("scaleSnap", null),
            o("space", "world"),
            o("size", 1),
            o("dragging", !1),
            o("showX", !0),
            o("showY", !0),
            o("showZ", !0);
          const s = new n.Vector3(),
            a = new n.Vector3(),
            h = new n.Quaternion(),
            g = new n.Quaternion(),
            l = new n.Vector3(),
            u = new n.Quaternion(),
            f = new n.Vector3(),
            d = new n.Vector3(),
            Q = new n.Vector3(),
            m = new n.Vector3();
          o("worldPosition", s),
            o("worldPositionStart", a),
            o("worldQuaternion", h),
            o("worldQuaternionStart", g),
            o("cameraPosition", l),
            o("cameraQuaternion", u),
            o("pointStart", f),
            o("pointEnd", d),
            o("rotationAxis", Q),
            o("rotationAngle", 0),
            o("eye", m),
            (this._offset = new n.Vector3()),
            (this._startNorm = new n.Vector3()),
            (this._endNorm = new n.Vector3()),
            (this._cameraScale = new n.Vector3()),
            (this._parentPosition = new n.Vector3()),
            (this._parentQuaternion = new n.Quaternion()),
            (this._parentQuaternionInv = new n.Quaternion()),
            (this._parentScale = new n.Vector3()),
            (this._worldScaleStart = new n.Vector3()),
            (this._worldQuaternionInv = new n.Quaternion()),
            (this._worldScale = new n.Vector3()),
            (this._positionStart = new n.Vector3()),
            (this._quaternionStart = new n.Quaternion()),
            (this._scaleStart = new n.Vector3()),
            (this._getPointer = I.bind(this)),
            (this._onPointerDown = B.bind(this)),
            (this._onPointerHover = E.bind(this)),
            (this._onPointerMove = C.bind(this)),
            (this._onPointerUp = p.bind(this)),
            this.domElement.addEventListener(
              "pointerdown",
              this._onPointerDown
            ),
            this.domElement.addEventListener(
              "pointermove",
              this._onPointerHover
            ),
            this.domElement.addEventListener("pointerup", this._onPointerUp);
        }
        updateMatrixWorld() {
          void 0 !== this.object &&
            (this.object.updateMatrixWorld(),
            null === this.object.parent
              ? console.error(
                  "TransformControls: The attached 3D object must be a part of the scene graph."
                )
              : this.object.parent.matrixWorld.decompose(
                  this._parentPosition,
                  this._parentQuaternion,
                  this._parentScale
                ),
            this.object.matrixWorld.decompose(
              this.worldPosition,
              this.worldQuaternion,
              this._worldScale
            ),
            this._parentQuaternionInv.copy(this._parentQuaternion).invert(),
            this._worldQuaternionInv.copy(this.worldQuaternion).invert()),
            this.camera.updateMatrixWorld(),
            this.camera.matrixWorld.decompose(
              this.cameraPosition,
              this.cameraQuaternion,
              this._cameraScale
            ),
            this.camera.isOrthographicCamera
              ? this.camera.getWorldDirection(this.eye).negate()
              : this.eye
                  .copy(this.cameraPosition)
                  .sub(this.worldPosition)
                  .normalize(),
            super.updateMatrixWorld(this);
        }
        pointerHover(e) {
          if (void 0 === this.object || !0 === this.dragging) return;
          r.setFromCamera(e, this.camera);
          const A = f(this._gizmo.picker[this.mode], r);
          this.axis = A ? A.object.name : null;
        }
        pointerDown(e) {
          if (
            void 0 !== this.object &&
            !0 !== this.dragging &&
            0 === e.button &&
            null !== this.axis
          ) {
            r.setFromCamera(e, this.camera);
            const A = f(this._plane, r, !0);
            A &&
              (this.object.updateMatrixWorld(),
              this.object.parent.updateMatrixWorld(),
              this._positionStart.copy(this.object.position),
              this._quaternionStart.copy(this.object.quaternion),
              this._scaleStart.copy(this.object.scale),
              this.object.matrixWorld.decompose(
                this.worldPositionStart,
                this.worldQuaternionStart,
                this._worldScaleStart
              ),
              this.pointStart.copy(A.point).sub(this.worldPositionStart)),
              (this.dragging = !0),
              (h.mode = this.mode),
              this.dispatchEvent(h);
          }
        }
        pointerMove(e) {
          const A = this.axis,
            t = this.mode,
            n = this.object;
          let h = this.space;
          if (
            ("scale" === t
              ? (h = "local")
              : ("E" !== A && "XYZE" !== A && "XYZ" !== A) || (h = "world"),
            void 0 === n ||
              null === A ||
              !1 === this.dragging ||
              -1 !== e.button)
          )
            return;
          r.setFromCamera(e, this.camera);
          const g = f(this._plane, r, !0);
          if (g) {
            if (
              (this.pointEnd.copy(g.point).sub(this.worldPositionStart),
              "translate" === t)
            )
              this._offset.copy(this.pointEnd).sub(this.pointStart),
                "local" === h &&
                  "XYZ" !== A &&
                  this._offset.applyQuaternion(this._worldQuaternionInv),
                -1 === A.indexOf("X") && (this._offset.x = 0),
                -1 === A.indexOf("Y") && (this._offset.y = 0),
                -1 === A.indexOf("Z") && (this._offset.z = 0),
                "local" === h && "XYZ" !== A
                  ? this._offset
                      .applyQuaternion(this._quaternionStart)
                      .divide(this._parentScale)
                  : this._offset
                      .applyQuaternion(this._parentQuaternionInv)
                      .divide(this._parentScale),
                n.position.copy(this._offset).add(this._positionStart),
                this.translationSnap &&
                  ("local" === h &&
                    (n.position.applyQuaternion(
                      s.copy(this._quaternionStart).invert()
                    ),
                    -1 !== A.search("X") &&
                      (n.position.x =
                        Math.round(n.position.x / this.translationSnap) *
                        this.translationSnap),
                    -1 !== A.search("Y") &&
                      (n.position.y =
                        Math.round(n.position.y / this.translationSnap) *
                        this.translationSnap),
                    -1 !== A.search("Z") &&
                      (n.position.z =
                        Math.round(n.position.z / this.translationSnap) *
                        this.translationSnap),
                    n.position.applyQuaternion(this._quaternionStart)),
                  "world" === h &&
                    (n.parent &&
                      n.position.add(
                        i.setFromMatrixPosition(n.parent.matrixWorld)
                      ),
                    -1 !== A.search("X") &&
                      (n.position.x =
                        Math.round(n.position.x / this.translationSnap) *
                        this.translationSnap),
                    -1 !== A.search("Y") &&
                      (n.position.y =
                        Math.round(n.position.y / this.translationSnap) *
                        this.translationSnap),
                    -1 !== A.search("Z") &&
                      (n.position.z =
                        Math.round(n.position.z / this.translationSnap) *
                        this.translationSnap),
                    n.parent &&
                      n.position.sub(
                        i.setFromMatrixPosition(n.parent.matrixWorld)
                      )));
            else if ("scale" === t) {
              if (-1 !== A.search("XYZ")) {
                let e = this.pointEnd.length() / this.pointStart.length();
                this.pointEnd.dot(this.pointStart) < 0 && (e *= -1),
                  o.set(e, e, e);
              } else
                i.copy(this.pointStart),
                  o.copy(this.pointEnd),
                  i.applyQuaternion(this._worldQuaternionInv),
                  o.applyQuaternion(this._worldQuaternionInv),
                  o.divide(i),
                  -1 === A.search("X") && (o.x = 1),
                  -1 === A.search("Y") && (o.y = 1),
                  -1 === A.search("Z") && (o.z = 1);
              n.scale.copy(this._scaleStart).multiply(o),
                this.scaleSnap &&
                  (-1 !== A.search("X") &&
                    (n.scale.x =
                      Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap ||
                      this.scaleSnap),
                  -1 !== A.search("Y") &&
                    (n.scale.y =
                      Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap ||
                      this.scaleSnap),
                  -1 !== A.search("Z") &&
                    (n.scale.z =
                      Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap ||
                      this.scaleSnap));
            } else if ("rotate" === t) {
              this._offset.copy(this.pointEnd).sub(this.pointStart);
              const e =
                20 /
                this.worldPosition.distanceTo(
                  i.setFromMatrixPosition(this.camera.matrixWorld)
                );
              "E" === A
                ? (this.rotationAxis.copy(this.eye),
                  (this.rotationAngle = this.pointEnd.angleTo(this.pointStart)),
                  this._startNorm.copy(this.pointStart).normalize(),
                  this._endNorm.copy(this.pointEnd).normalize(),
                  (this.rotationAngle *=
                    this._endNorm.cross(this._startNorm).dot(this.eye) < 0
                      ? 1
                      : -1))
                : "XYZE" === A
                ? (this.rotationAxis
                    .copy(this._offset)
                    .cross(this.eye)
                    .normalize(),
                  (this.rotationAngle =
                    this._offset.dot(
                      i.copy(this.rotationAxis).cross(this.eye)
                    ) * e))
                : ("X" !== A && "Y" !== A && "Z" !== A) ||
                  (this.rotationAxis.copy(a[A]),
                  i.copy(a[A]),
                  "local" === h && i.applyQuaternion(this.worldQuaternion),
                  (this.rotationAngle =
                    this._offset.dot(i.cross(this.eye).normalize()) * e)),
                this.rotationSnap &&
                  (this.rotationAngle =
                    Math.round(this.rotationAngle / this.rotationSnap) *
                    this.rotationSnap),
                "local" === h && "E" !== A && "XYZE" !== A
                  ? (n.quaternion.copy(this._quaternionStart),
                    n.quaternion
                      .multiply(
                        s.setFromAxisAngle(
                          this.rotationAxis,
                          this.rotationAngle
                        )
                      )
                      .normalize())
                  : (this.rotationAxis.applyQuaternion(
                      this._parentQuaternionInv
                    ),
                    n.quaternion.copy(
                      s.setFromAxisAngle(this.rotationAxis, this.rotationAngle)
                    ),
                    n.quaternion.multiply(this._quaternionStart).normalize());
            }
            this.dispatchEvent(c), this.dispatchEvent(l);
          }
        }
        pointerUp(e) {
          0 === e.button &&
            (this.dragging &&
              null !== this.axis &&
              ((g.mode = this.mode), this.dispatchEvent(g)),
            (this.dragging = !1),
            (this.axis = null));
        }
        dispose() {
          this.domElement.removeEventListener(
            "pointerdown",
            this._onPointerDown
          ),
            this.domElement.removeEventListener(
              "pointermove",
              this._onPointerHover
            ),
            this.domElement.removeEventListener(
              "pointermove",
              this._onPointerMove
            ),
            this.domElement.removeEventListener("pointerup", this._onPointerUp),
            this.traverse(function (e) {
              e.geometry && e.geometry.dispose(),
                e.material && e.material.dispose();
            });
        }
        attach(e) {
          return (this.object = e), (this.visible = !0), this;
        }
        detach() {
          return (
            (this.object = void 0),
            (this.visible = !1),
            (this.axis = null),
            this
          );
        }
        reset() {
          this.enabled &&
            this.dragging &&
            (this.object.position.copy(this._positionStart),
            this.object.quaternion.copy(this._quaternionStart),
            this.object.scale.copy(this._scaleStart),
            this.dispatchEvent(c),
            this.dispatchEvent(l),
            this.pointStart.copy(this.pointEnd));
        }
        getRaycaster() {
          return r;
        }
        getMode() {
          return this.mode;
        }
        setMode(e) {
          this.mode = e;
        }
        setTranslationSnap(e) {
          this.translationSnap = e;
        }
        setRotationSnap(e) {
          this.rotationSnap = e;
        }
        setScaleSnap(e) {
          this.scaleSnap = e;
        }
        setSize(e) {
          this.size = e;
        }
        setSpace(e) {
          this.space = e;
        }
      }
      function I(e) {
        if (this.domElement.ownerDocument.pointerLockElement)
          return { x: 0, y: 0, button: e.button };
        {
          const A = this.domElement.getBoundingClientRect();
          return {
            x: ((e.clientX - A.left) / A.width) * 2 - 1,
            y: (-(e.clientY - A.top) / A.height) * 2 + 1,
            button: e.button,
          };
        }
      }
      function E(e) {
        if (this.enabled)
          switch (e.pointerType) {
            case "mouse":
            case "pen":
              this.pointerHover(this._getPointer(e));
          }
      }
      function B(e) {
        this.enabled &&
          (document.pointerLockElement ||
            this.domElement.setPointerCapture(e.pointerId),
          this.domElement.addEventListener("pointermove", this._onPointerMove),
          this.pointerHover(this._getPointer(e)),
          this.pointerDown(this._getPointer(e)));
      }
      function C(e) {
        this.enabled && this.pointerMove(this._getPointer(e));
      }
      function p(e) {
        this.enabled &&
          (this.domElement.releasePointerCapture(e.pointerId),
          this.domElement.removeEventListener(
            "pointermove",
            this._onPointerMove
          ),
          this.pointerUp(this._getPointer(e)));
      }
      function f(e, A, t) {
        const n = A.intersectObject(e, !0);
        for (let e = 0; e < n.length; e++)
          if (n[e].object.visible || t) return n[e];
        return !1;
      }
      const d = new n.Euler(),
        Q = new n.Vector3(0, 1, 0),
        m = new n.Vector3(0, 0, 0),
        w = new n.Matrix4(),
        y = new n.Quaternion(),
        x = new n.Quaternion(),
        b = new n.Vector3(),
        S = new n.Matrix4(),
        _ = new n.Vector3(1, 0, 0),
        D = new n.Vector3(0, 1, 0),
        R = new n.Vector3(0, 0, 1),
        v = new n.Vector3(),
        F = new n.Vector3(),
        T = new n.Vector3();
      class M extends n.Object3D {
        constructor() {
          super(),
            (this.isTransformControlsGizmo = !0),
            (this.type = "TransformControlsGizmo");
          const e = new n.MeshBasicMaterial({
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              toneMapped: !1,
              transparent: !0,
            }),
            A = new n.LineBasicMaterial({
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              toneMapped: !1,
              transparent: !0,
            }),
            t = e.clone();
          t.opacity = 0.15;
          const r = A.clone();
          r.opacity = 0.5;
          const i = e.clone();
          i.color.setHex(16711680);
          const o = e.clone();
          o.color.setHex(65280);
          const s = e.clone();
          s.color.setHex(255);
          const a = e.clone();
          a.color.setHex(16711680), (a.opacity = 0.5);
          const c = e.clone();
          c.color.setHex(65280), (c.opacity = 0.5);
          const h = e.clone();
          h.color.setHex(255), (h.opacity = 0.5);
          const g = e.clone();
          g.opacity = 0.25;
          const l = e.clone();
          l.color.setHex(16776960),
            (l.opacity = 0.25),
            e.clone().color.setHex(16776960);
          const u = e.clone();
          u.color.setHex(7895160);
          const I = new n.CylinderGeometry(0, 0.04, 0.1, 12);
          I.translate(0, 0.05, 0);
          const E = new n.BoxGeometry(0.08, 0.08, 0.08);
          E.translate(0, 0.04, 0);
          const B = new n.BufferGeometry();
          B.setAttribute(
            "position",
            new n.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3)
          );
          const C = new n.CylinderGeometry(0.0075, 0.0075, 0.5, 3);
          function p(e, A) {
            const t = new n.TorusGeometry(e, 0.0075, 3, 64, A * Math.PI * 2);
            return t.rotateY(Math.PI / 2), t.rotateX(Math.PI / 2), t;
          }
          C.translate(0, 0.25, 0);
          const f = {
              X: [
                [new n.Mesh(I, i), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
                [new n.Mesh(I, i), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
                [new n.Mesh(C, i), [0, 0, 0], [0, 0, -Math.PI / 2]],
              ],
              Y: [
                [new n.Mesh(I, o), [0, 0.5, 0]],
                [new n.Mesh(I, o), [0, -0.5, 0], [Math.PI, 0, 0]],
                [new n.Mesh(C, o)],
              ],
              Z: [
                [new n.Mesh(I, s), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
                [new n.Mesh(I, s), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
                [new n.Mesh(C, s), null, [Math.PI / 2, 0, 0]],
              ],
              XYZ: [
                [
                  new n.Mesh(new n.OctahedronGeometry(0.1, 0), g.clone()),
                  [0, 0, 0],
                ],
              ],
              XY: [
                [
                  new n.Mesh(new n.BoxGeometry(0.15, 0.15, 0.01), h.clone()),
                  [0.15, 0.15, 0],
                ],
              ],
              YZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.15, 0.15, 0.01), a.clone()),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.15, 0.15, 0.01), c.clone()),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
            },
            d = {
              X: [
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0.3, 0, 0],
                  [0, 0, -Math.PI / 2],
                ],
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [-0.3, 0, 0],
                  [0, 0, Math.PI / 2],
                ],
              ],
              Y: [
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, 0.3, 0],
                ],
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, -0.3, 0],
                  [0, 0, Math.PI],
                ],
              ],
              Z: [
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, 0, 0.3],
                  [Math.PI / 2, 0, 0],
                ],
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, 0, -0.3],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XYZ: [[new n.Mesh(new n.OctahedronGeometry(0.2, 0), t)]],
              XY: [
                [
                  new n.Mesh(new n.BoxGeometry(0.2, 0.2, 0.01), t),
                  [0.15, 0.15, 0],
                ],
              ],
              YZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.2, 0.2, 0.01), t),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.2, 0.2, 0.01), t),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
            },
            Q = {
              START: [
                [
                  new n.Mesh(new n.OctahedronGeometry(0.01, 2), r),
                  null,
                  null,
                  null,
                  "helper",
                ],
              ],
              END: [
                [
                  new n.Mesh(new n.OctahedronGeometry(0.01, 2), r),
                  null,
                  null,
                  null,
                  "helper",
                ],
              ],
              DELTA: [
                [
                  new n.Line(
                    (function () {
                      const e = new n.BufferGeometry();
                      return (
                        e.setAttribute(
                          "position",
                          new n.Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
                        ),
                        e
                      );
                    })(),
                    r
                  ),
                  null,
                  null,
                  null,
                  "helper",
                ],
              ],
              X: [
                [
                  new n.Line(B, r.clone()),
                  [-1e3, 0, 0],
                  null,
                  [1e6, 1, 1],
                  "helper",
                ],
              ],
              Y: [
                [
                  new n.Line(B, r.clone()),
                  [0, -1e3, 0],
                  [0, 0, Math.PI / 2],
                  [1e6, 1, 1],
                  "helper",
                ],
              ],
              Z: [
                [
                  new n.Line(B, r.clone()),
                  [0, 0, -1e3],
                  [0, -Math.PI / 2, 0],
                  [1e6, 1, 1],
                  "helper",
                ],
              ],
            },
            m = {
              XYZE: [[new n.Mesh(p(0.5, 1), u), null, [0, Math.PI / 2, 0]]],
              X: [[new n.Mesh(p(0.5, 0.5), i)]],
              Y: [[new n.Mesh(p(0.5, 0.5), o), null, [0, 0, -Math.PI / 2]]],
              Z: [[new n.Mesh(p(0.5, 0.5), s), null, [0, Math.PI / 2, 0]]],
              E: [[new n.Mesh(p(0.75, 1), l), null, [0, Math.PI / 2, 0]]],
            },
            w = {
              AXIS: [
                [
                  new n.Line(B, r.clone()),
                  [-1e3, 0, 0],
                  null,
                  [1e6, 1, 1],
                  "helper",
                ],
              ],
            },
            y = {
              XYZE: [[new n.Mesh(new n.SphereGeometry(0.25, 10, 8), t)]],
              X: [
                [
                  new n.Mesh(new n.TorusGeometry(0.5, 0.1, 4, 24), t),
                  [0, 0, 0],
                  [0, -Math.PI / 2, -Math.PI / 2],
                ],
              ],
              Y: [
                [
                  new n.Mesh(new n.TorusGeometry(0.5, 0.1, 4, 24), t),
                  [0, 0, 0],
                  [Math.PI / 2, 0, 0],
                ],
              ],
              Z: [
                [
                  new n.Mesh(new n.TorusGeometry(0.5, 0.1, 4, 24), t),
                  [0, 0, 0],
                  [0, 0, -Math.PI / 2],
                ],
              ],
              E: [[new n.Mesh(new n.TorusGeometry(0.75, 0.1, 2, 24), t)]],
            },
            x = {
              X: [
                [new n.Mesh(E, i), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
                [new n.Mesh(C, i), [0, 0, 0], [0, 0, -Math.PI / 2]],
                [new n.Mesh(E, i), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
              ],
              Y: [
                [new n.Mesh(E, o), [0, 0.5, 0]],
                [new n.Mesh(C, o)],
                [new n.Mesh(E, o), [0, -0.5, 0], [0, 0, Math.PI]],
              ],
              Z: [
                [new n.Mesh(E, s), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
                [new n.Mesh(C, s), [0, 0, 0], [Math.PI / 2, 0, 0]],
                [new n.Mesh(E, s), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
              ],
              XY: [
                [
                  new n.Mesh(new n.BoxGeometry(0.15, 0.15, 0.01), h),
                  [0.15, 0.15, 0],
                ],
              ],
              YZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.15, 0.15, 0.01), a),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.15, 0.15, 0.01), c),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XYZ: [[new n.Mesh(new n.BoxGeometry(0.1, 0.1, 0.1), g.clone())]],
            },
            b = {
              X: [
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0.3, 0, 0],
                  [0, 0, -Math.PI / 2],
                ],
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [-0.3, 0, 0],
                  [0, 0, Math.PI / 2],
                ],
              ],
              Y: [
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, 0.3, 0],
                ],
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, -0.3, 0],
                  [0, 0, Math.PI],
                ],
              ],
              Z: [
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, 0, 0.3],
                  [Math.PI / 2, 0, 0],
                ],
                [
                  new n.Mesh(new n.CylinderGeometry(0.2, 0, 0.6, 4), t),
                  [0, 0, -0.3],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XY: [
                [
                  new n.Mesh(new n.BoxGeometry(0.2, 0.2, 0.01), t),
                  [0.15, 0.15, 0],
                ],
              ],
              YZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.2, 0.2, 0.01), t),
                  [0, 0.15, 0.15],
                  [0, Math.PI / 2, 0],
                ],
              ],
              XZ: [
                [
                  new n.Mesh(new n.BoxGeometry(0.2, 0.2, 0.01), t),
                  [0.15, 0, 0.15],
                  [-Math.PI / 2, 0, 0],
                ],
              ],
              XYZ: [
                [new n.Mesh(new n.BoxGeometry(0.2, 0.2, 0.2), t), [0, 0, 0]],
              ],
            },
            S = {
              X: [
                [
                  new n.Line(B, r.clone()),
                  [-1e3, 0, 0],
                  null,
                  [1e6, 1, 1],
                  "helper",
                ],
              ],
              Y: [
                [
                  new n.Line(B, r.clone()),
                  [0, -1e3, 0],
                  [0, 0, Math.PI / 2],
                  [1e6, 1, 1],
                  "helper",
                ],
              ],
              Z: [
                [
                  new n.Line(B, r.clone()),
                  [0, 0, -1e3],
                  [0, -Math.PI / 2, 0],
                  [1e6, 1, 1],
                  "helper",
                ],
              ],
            };
          function _(e) {
            const A = new n.Object3D();
            for (const t in e)
              for (let n = e[t].length; n--; ) {
                const r = e[t][n][0].clone(),
                  i = e[t][n][1],
                  o = e[t][n][2],
                  s = e[t][n][3],
                  a = e[t][n][4];
                (r.name = t),
                  (r.tag = a),
                  i && r.position.set(i[0], i[1], i[2]),
                  o && r.rotation.set(o[0], o[1], o[2]),
                  s && r.scale.set(s[0], s[1], s[2]),
                  r.updateMatrix();
                const c = r.geometry.clone();
                c.applyMatrix4(r.matrix),
                  (r.geometry = c),
                  (r.renderOrder = 1 / 0),
                  r.position.set(0, 0, 0),
                  r.rotation.set(0, 0, 0),
                  r.scale.set(1, 1, 1),
                  A.add(r);
              }
            return A;
          }
          (this.gizmo = {}),
            (this.picker = {}),
            (this.helper = {}),
            this.add((this.gizmo.translate = _(f))),
            this.add((this.gizmo.rotate = _(m))),
            this.add((this.gizmo.scale = _(x))),
            this.add((this.picker.translate = _(d))),
            this.add((this.picker.rotate = _(y))),
            this.add((this.picker.scale = _(b))),
            this.add((this.helper.translate = _(Q))),
            this.add((this.helper.rotate = _(w))),
            this.add((this.helper.scale = _(S))),
            (this.picker.translate.visible = !1),
            (this.picker.rotate.visible = !1),
            (this.picker.scale.visible = !1);
        }
        updateMatrixWorld(e) {
          const A =
            "local" === ("scale" === this.mode ? "local" : this.space)
              ? this.worldQuaternion
              : x;
          (this.gizmo.translate.visible = "translate" === this.mode),
            (this.gizmo.rotate.visible = "rotate" === this.mode),
            (this.gizmo.scale.visible = "scale" === this.mode),
            (this.helper.translate.visible = "translate" === this.mode),
            (this.helper.rotate.visible = "rotate" === this.mode),
            (this.helper.scale.visible = "scale" === this.mode);
          let t = [];
          (t = t.concat(this.picker[this.mode].children)),
            (t = t.concat(this.gizmo[this.mode].children)),
            (t = t.concat(this.helper[this.mode].children));
          for (let e = 0; e < t.length; e++) {
            const n = t[e];
            let r;
            if (
              ((n.visible = !0),
              n.rotation.set(0, 0, 0),
              n.position.copy(this.worldPosition),
              (r = this.camera.isOrthographicCamera
                ? (this.camera.top - this.camera.bottom) / this.camera.zoom
                : this.worldPosition.distanceTo(this.cameraPosition) *
                  Math.min(
                    (1.9 * Math.tan((Math.PI * this.camera.fov) / 360)) /
                      this.camera.zoom,
                    7
                  )),
              n.scale.set(1, 1, 1).multiplyScalar((r * this.size) / 4),
              "helper" !== n.tag)
            ) {
              if (
                (n.quaternion.copy(A),
                "translate" === this.mode || "scale" === this.mode)
              ) {
                const e = 0.99,
                  t = 0.2;
                "X" === n.name &&
                  Math.abs(Q.copy(_).applyQuaternion(A).dot(this.eye)) > e &&
                  (n.scale.set(1e-10, 1e-10, 1e-10), (n.visible = !1)),
                  "Y" === n.name &&
                    Math.abs(Q.copy(D).applyQuaternion(A).dot(this.eye)) > e &&
                    (n.scale.set(1e-10, 1e-10, 1e-10), (n.visible = !1)),
                  "Z" === n.name &&
                    Math.abs(Q.copy(R).applyQuaternion(A).dot(this.eye)) > e &&
                    (n.scale.set(1e-10, 1e-10, 1e-10), (n.visible = !1)),
                  "XY" === n.name &&
                    Math.abs(Q.copy(R).applyQuaternion(A).dot(this.eye)) < t &&
                    (n.scale.set(1e-10, 1e-10, 1e-10), (n.visible = !1)),
                  "YZ" === n.name &&
                    Math.abs(Q.copy(_).applyQuaternion(A).dot(this.eye)) < t &&
                    (n.scale.set(1e-10, 1e-10, 1e-10), (n.visible = !1)),
                  "XZ" === n.name &&
                    Math.abs(Q.copy(D).applyQuaternion(A).dot(this.eye)) < t &&
                    (n.scale.set(1e-10, 1e-10, 1e-10), (n.visible = !1));
              } else
                "rotate" === this.mode &&
                  (y.copy(A),
                  Q.copy(this.eye).applyQuaternion(s.copy(A).invert()),
                  -1 !== n.name.search("E") &&
                    n.quaternion.setFromRotationMatrix(
                      w.lookAt(this.eye, m, D)
                    ),
                  "X" === n.name &&
                    (s.setFromAxisAngle(_, Math.atan2(-Q.y, Q.z)),
                    s.multiplyQuaternions(y, s),
                    n.quaternion.copy(s)),
                  "Y" === n.name &&
                    (s.setFromAxisAngle(D, Math.atan2(Q.x, Q.z)),
                    s.multiplyQuaternions(y, s),
                    n.quaternion.copy(s)),
                  "Z" === n.name &&
                    (s.setFromAxisAngle(R, Math.atan2(Q.y, Q.x)),
                    s.multiplyQuaternions(y, s),
                    n.quaternion.copy(s)));
              (n.visible =
                n.visible && (-1 === n.name.indexOf("X") || this.showX)),
                (n.visible =
                  n.visible && (-1 === n.name.indexOf("Y") || this.showY)),
                (n.visible =
                  n.visible && (-1 === n.name.indexOf("Z") || this.showZ)),
                (n.visible =
                  n.visible &&
                  (-1 === n.name.indexOf("E") ||
                    (this.showX && this.showY && this.showZ))),
                (n.material._color =
                  n.material._color || n.material.color.clone()),
                (n.material._opacity =
                  n.material._opacity || n.material.opacity),
                n.material.color.copy(n.material._color),
                (n.material.opacity = n.material._opacity),
                this.enabled &&
                  this.axis &&
                  (n.name === this.axis ||
                    this.axis.split("").some(function (e) {
                      return n.name === e;
                    })) &&
                  (n.material.color.setHex(16776960), (n.material.opacity = 1));
            } else
              (n.visible = !1),
                "AXIS" === n.name
                  ? ((n.visible = !!this.axis),
                    "X" === this.axis &&
                      (s.setFromEuler(d.set(0, 0, 0)),
                      n.quaternion.copy(A).multiply(s),
                      Math.abs(Q.copy(_).applyQuaternion(A).dot(this.eye)) >
                        0.9 && (n.visible = !1)),
                    "Y" === this.axis &&
                      (s.setFromEuler(d.set(0, 0, Math.PI / 2)),
                      n.quaternion.copy(A).multiply(s),
                      Math.abs(Q.copy(D).applyQuaternion(A).dot(this.eye)) >
                        0.9 && (n.visible = !1)),
                    "Z" === this.axis &&
                      (s.setFromEuler(d.set(0, Math.PI / 2, 0)),
                      n.quaternion.copy(A).multiply(s),
                      Math.abs(Q.copy(R).applyQuaternion(A).dot(this.eye)) >
                        0.9 && (n.visible = !1)),
                    "XYZE" === this.axis &&
                      (s.setFromEuler(d.set(0, Math.PI / 2, 0)),
                      Q.copy(this.rotationAxis),
                      n.quaternion.setFromRotationMatrix(w.lookAt(m, Q, D)),
                      n.quaternion.multiply(s),
                      (n.visible = this.dragging)),
                    "E" === this.axis && (n.visible = !1))
                  : "START" === n.name
                  ? (n.position.copy(this.worldPositionStart),
                    (n.visible = this.dragging))
                  : "END" === n.name
                  ? (n.position.copy(this.worldPosition),
                    (n.visible = this.dragging))
                  : "DELTA" === n.name
                  ? (n.position.copy(this.worldPositionStart),
                    n.quaternion.copy(this.worldQuaternionStart),
                    i
                      .set(1e-10, 1e-10, 1e-10)
                      .add(this.worldPositionStart)
                      .sub(this.worldPosition)
                      .multiplyScalar(-1),
                    i.applyQuaternion(
                      this.worldQuaternionStart.clone().invert()
                    ),
                    n.scale.copy(i),
                    (n.visible = this.dragging))
                  : (n.quaternion.copy(A),
                    this.dragging
                      ? n.position.copy(this.worldPositionStart)
                      : n.position.copy(this.worldPosition),
                    this.axis && (n.visible = -1 !== this.axis.search(n.name)));
          }
          super.updateMatrixWorld(e);
        }
      }
      class L extends n.Mesh {
        constructor() {
          super(
            new n.PlaneGeometry(1e5, 1e5, 2, 2),
            new n.MeshBasicMaterial({
              visible: !1,
              wireframe: !0,
              side: n.DoubleSide,
              transparent: !0,
              opacity: 0.1,
              toneMapped: !1,
            })
          ),
            (this.isTransformControlsPlane = !0),
            (this.type = "TransformControlsPlane");
        }
        updateMatrixWorld(e) {
          let A = this.space;
          switch (
            (this.position.copy(this.worldPosition),
            "scale" === this.mode && (A = "local"),
            v.copy(_).applyQuaternion("local" === A ? this.worldQuaternion : x),
            F.copy(D).applyQuaternion("local" === A ? this.worldQuaternion : x),
            T.copy(R).applyQuaternion("local" === A ? this.worldQuaternion : x),
            Q.copy(F),
            this.mode)
          ) {
            case "translate":
            case "scale":
              switch (this.axis) {
                case "X":
                  Q.copy(this.eye).cross(v), b.copy(v).cross(Q);
                  break;
                case "Y":
                  Q.copy(this.eye).cross(F), b.copy(F).cross(Q);
                  break;
                case "Z":
                  Q.copy(this.eye).cross(T), b.copy(T).cross(Q);
                  break;
                case "XY":
                  b.copy(T);
                  break;
                case "YZ":
                  b.copy(v);
                  break;
                case "XZ":
                  Q.copy(T), b.copy(F);
                  break;
                case "XYZ":
                case "E":
                  b.set(0, 0, 0);
              }
              break;
            default:
              b.set(0, 0, 0);
          }
          0 === b.length()
            ? this.quaternion.copy(this.cameraQuaternion)
            : (S.lookAt(i.set(0, 0, 0), b, Q),
              this.quaternion.setFromRotationMatrix(S)),
            super.updateMatrixWorld(e);
        }
      }
    },
    4370: function (e, A, t) {
      "use strict";
      t.d(A, {
        j: function () {
          return r;
        },
      });
      var n = t(4468);
      class r extends n.Object3D {
        constructor(e, A) {
          super(),
            (this.isViewHelper = !0),
            (this.animating = !1),
            (this.center = new n.Vector3());
          const t = new n.Color("#ff3653"),
            r = new n.Color("#8adb00"),
            i = new n.Color("#2c8fff"),
            o = [],
            s = new n.Raycaster(),
            a = new n.Vector2(),
            c = new n.Object3D(),
            h = new n.OrthographicCamera(-2, 2, 2, -2, 0, 4);
          h.position.set(0, 0, 2);
          const g = new n.BoxGeometry(0.8, 0.05, 0.05).translate(0.4, 0, 0),
            l = new n.Mesh(g, R(t)),
            u = new n.Mesh(g, R(r)),
            I = new n.Mesh(g, R(i));
          (u.rotation.z = Math.PI / 2),
            (I.rotation.y = -Math.PI / 2),
            this.add(l),
            this.add(I),
            this.add(u);
          const E = new n.Sprite(v(t, "X"));
          E.userData.type = "posX";
          const B = new n.Sprite(v(r, "Y"));
          B.userData.type = "posY";
          const C = new n.Sprite(v(i, "Z"));
          C.userData.type = "posZ";
          const p = new n.Sprite(v(t));
          p.userData.type = "negX";
          const f = new n.Sprite(v(r));
          f.userData.type = "negY";
          const d = new n.Sprite(v(i));
          (d.userData.type = "negZ"),
            (E.position.x = 1),
            (B.position.y = 1),
            (C.position.z = 1),
            (p.position.x = -1),
            p.scale.setScalar(0.8),
            (f.position.y = -1),
            f.scale.setScalar(0.8),
            (d.position.z = -1),
            d.scale.setScalar(0.8),
            this.add(E),
            this.add(B),
            this.add(C),
            this.add(p),
            this.add(f),
            this.add(d),
            o.push(E),
            o.push(B),
            o.push(C),
            o.push(p),
            o.push(f),
            o.push(d);
          const Q = new n.Vector3(),
            m = 128,
            w = 2 * Math.PI;
          this.render = function (t) {
            this.quaternion.copy(e.quaternion).invert(),
              this.updateMatrixWorld(),
              Q.set(0, 0, 1),
              Q.applyQuaternion(e.quaternion),
              Q.x >= 0
                ? ((E.material.opacity = 1), (p.material.opacity = 0.5))
                : ((E.material.opacity = 0.5), (p.material.opacity = 1)),
              Q.y >= 0
                ? ((B.material.opacity = 1), (f.material.opacity = 0.5))
                : ((B.material.opacity = 0.5), (f.material.opacity = 1)),
              Q.z >= 0
                ? ((C.material.opacity = 1), (d.material.opacity = 0.5))
                : ((C.material.opacity = 0.5), (d.material.opacity = 1));
            const n = A.offsetWidth - m;
            t.clearDepth(),
              t.getViewport(_),
              t.setViewport(n, 0, m, m),
              t.render(this, h),
              t.setViewport(_.x, _.y, _.z, _.w);
          };
          const y = new n.Vector3(),
            x = new n.Quaternion(),
            b = new n.Quaternion(),
            S = new n.Quaternion(),
            _ = new n.Vector4();
          let D = 0;
          function R(e) {
            return new n.MeshBasicMaterial({ color: e, toneMapped: !1 });
          }
          function v(e, A = null) {
            const t = document.createElement("canvas");
            (t.width = 64), (t.height = 64);
            const r = t.getContext("2d");
            r.beginPath(),
              r.arc(32, 32, 16, 0, 2 * Math.PI),
              r.closePath(),
              (r.fillStyle = e.getStyle()),
              r.fill(),
              null !== A &&
                ((r.font = "24px Arial"),
                (r.textAlign = "center"),
                (r.fillStyle = "#000000"),
                r.fillText(A, 32, 41));
            const i = new n.CanvasTexture(t);
            return new n.SpriteMaterial({ map: i, toneMapped: !1 });
          }
          (this.handleClick = function (t) {
            if (!0 === this.animating) return !1;
            const r = A.getBoundingClientRect(),
              i = r.left + (A.offsetWidth - m),
              g = r.top + (A.offsetHeight - m);
            (a.x = ((t.clientX - i) / (r.right - i)) * 2 - 1),
              (a.y = (-(t.clientY - g) / (r.bottom - g)) * 2 + 1),
              s.setFromCamera(a, h);
            const l = s.intersectObjects(o);
            return (
              l.length > 0 &&
              ((function (A, t) {
                switch (A.userData.type) {
                  case "posX":
                    y.set(1, 0, 0),
                      x.setFromEuler(new n.Euler(0, 0.5 * Math.PI, 0));
                    break;
                  case "posY":
                    y.set(0, 1, 0),
                      x.setFromEuler(new n.Euler(0.5 * -Math.PI, 0, 0));
                    break;
                  case "posZ":
                    y.set(0, 0, 1), x.setFromEuler(new n.Euler());
                    break;
                  case "negX":
                    y.set(-1, 0, 0),
                      x.setFromEuler(new n.Euler(0, 0.5 * -Math.PI, 0));
                    break;
                  case "negY":
                    y.set(0, -1, 0),
                      x.setFromEuler(new n.Euler(0.5 * Math.PI, 0, 0));
                    break;
                  case "negZ":
                    y.set(0, 0, -1), x.setFromEuler(new n.Euler(0, Math.PI, 0));
                    break;
                  default:
                    console.error("ViewHelper: Invalid axis.");
                }
                (D = e.position.distanceTo(t)),
                  y.multiplyScalar(D).add(t),
                  c.position.copy(t),
                  c.lookAt(e.position),
                  b.copy(c.quaternion),
                  c.lookAt(y),
                  S.copy(c.quaternion);
              })(l[0].object, this.center),
              (this.animating = !0),
              !0)
            );
          }),
            (this.update = function (A) {
              const t = A * w;
              b.rotateTowards(S, t),
                e.position
                  .set(0, 0, 1)
                  .applyQuaternion(b)
                  .multiplyScalar(D)
                  .add(this.center),
                e.quaternion.rotateTowards(x, t),
                0 === b.angleTo(S) && (this.animating = !1);
            }),
            (this.dispose = function () {
              g.dispose(),
                l.material.dispose(),
                u.material.dispose(),
                I.material.dispose(),
                E.material.map.dispose(),
                B.material.map.dispose(),
                C.material.map.dispose(),
                p.material.map.dispose(),
                f.material.map.dispose(),
                d.material.map.dispose(),
                E.material.dispose(),
                B.material.dispose(),
                C.material.dispose(),
                p.material.dispose(),
                f.material.dispose(),
                d.material.dispose();
            });
        }
      }
    },
    9707: function (e, A, t) {
      "use strict";
      t.d(A, {
        a: function () {
          return r;
        },
      });
      var n = t(4468);
      class r {
        static init() {
          const e = [
              1, 0, 0, 2e-5, 1, 0, 0, 503905e-9, 1, 0, 0, 0.00201562, 1, 0, 0,
              0.00453516, 1, 0, 0, 0.00806253, 1, 0, 0, 0.0125978, 1, 0, 0,
              0.018141, 1, 0, 0, 0.0246924, 1, 0, 0, 0.0322525, 1, 0, 0,
              0.0408213, 1, 0, 0, 0.0503999, 1, 0, 0, 0.0609894, 1, 0, 0,
              0.0725906, 1, 0, 0, 0.0852058, 1, 0, 0, 0.0988363, 1, 0, 0,
              0.113484, 1, 0, 0, 0.129153, 1, 0, 0, 0.145839, 1, 0, 0, 0.163548,
              1, 0, 0, 0.182266, 1, 0, 0, 0.201942, 1, 0, 0, 0.222314, 1, 0, 0,
              0.241906, 1, 0, 0, 0.262314, 1, 0, 0, 0.285754, 1, 0, 0, 0.310159,
              1, 0, 0, 0.335426, 1, 0, 0, 0.361341, 1, 0, 0, 0.387445, 1, 0, 0,
              0.412784, 1, 0, 0, 0.438197, 1, 0, 0, 0.466966, 1, 0, 0, 0.49559,
              1, 0, 0, 0.523448, 1, 0, 0, 0.549938, 1, 0, 0, 0.57979, 1, 0, 0,
              0.608746, 1, 0, 0, 0.636185, 1, 0, 0, 0.664748, 1, 0, 0, 0.69313,
              1, 0, 0, 0.71966, 1, 0, 0, 0.747662, 1, 0, 0, 0.774023, 1, 0, 0,
              0.799775, 1, 0, 0, 0.825274, 1, 0, 0, 0.849156, 1, 0, 0, 0.873248,
              1, 0, 0, 0.89532, 1, 0, 0, 0.917565, 1, 0, 0, 0.937863, 1, 0, 0,
              0.958139, 1, 0, 0, 0.976563, 1, 0, 0, 0.994658, 1, 0, 0, 1.0112,
              1, 0, 0, 1.02712, 1, 0, 0, 1.04189, 1, 0, 0, 1.05568, 1, 0, 0,
              1.06877, 1, 0, 0, 1.08058, 1, 0, 0, 1.09194, 1, 0, 0, 1.10191, 1,
              0, 0, 1.11161, 1, 0, 0, 1.1199, 1, 0, 0, 1.12813, 0.999547,
              -4.48815e-7, 0.0224417, 199902e-10, 0.999495, -113079e-10,
              0.0224406, 503651e-9, 0.999496, -452317e-10, 0.0224406,
              0.00201461, 0.999496, -101772e-9, 0.0224406, 0.00453287, 0.999495,
              -180928e-9, 0.0224406, 0.00805845, 0.999497, -282702e-9,
              0.0224406, 0.0125914, 0.999496, -407096e-9, 0.0224406, 0.0181319,
              0.999498, -554114e-9, 0.0224406, 0.02468, 0.999499, -723768e-9,
              0.0224406, 0.0322363, 0.999495, -916058e-9, 0.0224405, 0.0408009,
              0.999499, -0.00113101, 0.0224408, 0.050375, 0.999494, -0.00136863,
              0.0224405, 0.0609586, 0.999489, -0.00162896, 0.0224401, 0.0725537,
              0.999489, -0.00191201, 0.0224414, 0.0851619, 0.999498,
              -0.00221787, 0.0224413, 0.0987867, 0.999492, -0.00254642,
              0.0224409, 0.113426, 0.999507, -0.00289779, 0.0224417, 0.129088,
              0.999494, -0.0032716, 0.0224386, 0.145767, 0.999546, -0.0036673,
              0.0224424, 0.163472, 0.999543, -0.00408166, 0.0224387, 0.182182,
              0.999499, -0.00450056, 0.0224338, 0.201843, 0.999503, -0.00483661,
              0.0224203, 0.222198, 0.999546, -0.00452928, 0.022315, 0.241714,
              0.999508, -0.00587403, 0.0224329, 0.262184, 0.999509, -0.00638806,
              0.0224271, 0.285609, 0.999501, -0.00691028, 0.0224166, 0.309998,
              0.999539, -0.00741979, 0.0223989, 0.335262, 0.999454, -0.00786282,
              0.0223675, 0.361154, 0.999529, -0.00811928, 0.0222828, 0.387224,
              0.999503, -0.00799941, 0.0221063, 0.41252, 0.999561, -0.00952753,
              0.0223057, 0.438006, 0.999557, -0.0099134, 0.0222065, 0.466735,
              0.999541, -0.0100935, 0.0220402, 0.495332, 0.999562, -0.00996821,
              0.0218067, 0.523197, 0.999556, -0.0105031, 0.0217096, 0.550223,
              0.999561, -0.0114191, 0.0217215, 0.579498, 0.999588, -0.0111818,
              0.0213357, 0.608416, 0.999633, -0.0107725, 0.0208689, 0.635965,
              0.999527, -0.0121671, 0.0210149, 0.664476, 0.999508, -0.0116005,
              0.020431, 0.692786, 0.999568, -0.0115604, 0.0199791, 0.719709,
              0.999671, -0.0121117, 0.0197415, 0.74737, 0.999688, -0.0110769,
              0.0188846, 0.773692, 0.99962, -0.0122368, 0.0188452, 0.799534,
              0.999823, -0.0110325, 0.0178001, 0.825046, 0.999599, -0.0114923,
              0.0174221, 0.849075, 0.999619, -0.0105923, 0.0164345, 0.872999,
              0.999613, -0.0105988, 0.0158227, 0.895371, 0.99964, -0.00979861,
              0.0148131, 0.917364, 0.99977, -0.00967238, 0.0140721, 0.938002,
              0.999726, -0.00869175, 0.0129543, 0.957917, 0.99973, -0.00866872,
              0.0122329, 0.976557, 0.999773, -0.00731956, 0.0108958, 0.994459,
              0.999811, -0.00756027, 0.0102715, 1.01118, 0.999862, -0.00583732,
              0.00878781, 1.02701, 0.999835, -0.00631438, 0.00827529, 1.04186,
              0.999871, -0.00450785, 0.00674583, 1.05569, 0.999867, -0.00486079,
              0.00621041, 1.06861, 0.999939, -0.00322072, 0.00478301, 1.08064,
              0.999918, -0.00318199, 0.00406395, 1.09181, 1.00003, -0.00193348,
              0.00280682, 1.10207, 0.999928, -0.00153729, 0.00198741, 1.11152,
              0.999933, -623666e-9, 917714e-9, 1.12009, 1, -102387e-11,
              9.07581e-7, 1.12813, 0.997866, -8.96716e-7, 0.0448334, 199584e-10,
              0.997987, -225945e-10, 0.0448389, 502891e-9, 0.997987,
              -903781e-10, 0.0448388, 0.00201156, 0.997985, -203351e-9,
              0.0448388, 0.00452602, 0.997986, -361514e-9, 0.0448388,
              0.00804629, 0.997987, -56487e-8, 0.0448389, 0.0125724, 0.997988,
              -813423e-9, 0.0448389, 0.0181045, 0.997984, -0.00110718,
              0.0448387, 0.0246427, 0.997985, -0.00144616, 0.0448388, 0.0321875,
              0.997987, -0.00183038, 0.044839, 0.0407392, 0.997983, -0.00225987,
              0.0448387, 0.0502986, 0.997991, -0.00273467, 0.0448389, 0.0608667,
              0.997984, -0.00325481, 0.0448384, 0.0724444, 0.998002,
              -0.00382043, 0.044839, 0.0850348, 0.997997, -0.00443145,
              0.0448396, 0.0986372, 0.998007, -0.00508796, 0.0448397, 0.113255,
              0.998008, -0.00578985, 0.04484, 0.128891, 0.998003, -0.00653683,
              0.0448384, 0.145548, 0.997983, -0.00732713, 0.0448358, 0.163221,
              0.997985, -0.00815454, 0.0448358, 0.181899, 0.998005, -0.00898985,
              0.0448286, 0.201533, 0.998026, -0.00964404, 0.0447934, 0.221821,
              0.998055, -0.00922677, 0.044611, 0.241282, 0.99804, -0.0117361,
              0.0448245, 0.261791, 0.998048, -0.0127628, 0.0448159, 0.285181,
              0.998088, -0.0138055, 0.0447996, 0.30954, 0.998058, -0.0148206,
              0.0447669, 0.334751, 0.998099, -0.0156998, 0.044697, 0.36061,
              0.998116, -0.0161976, 0.0445122, 0.386603, 0.998195, -0.015945,
              0.0441711, 0.411844, 0.998168, -0.0183947, 0.0444255, 0.43773,
              0.998184, -0.0197913, 0.0443809, 0.466009, 0.998251, -0.0201426,
              0.0440689, 0.494574, 0.998305, -0.0198847, 0.0435632, 0.522405,
              0.998273, -0.0210577, 0.043414, 0.549967, 0.998254, -0.0227901,
              0.0433943, 0.578655, 0.998349, -0.0223108, 0.0426529, 0.60758,
              0.99843, -0.0223088, 0.042, 0.635524, 0.998373, -0.0241141,
              0.0418987, 0.663621, 0.998425, -0.0231446, 0.0408118, 0.691906,
              0.998504, -0.0233684, 0.0400565, 0.719339, 0.998443, -0.0241652,
              0.0394634, 0.74643, 0.99848, -0.0228715, 0.0380002, 0.773086,
              0.998569, -0.023519, 0.0372322, 0.798988, 0.998619, -0.0223108,
              0.0356468, 0.824249, 0.998594, -0.0223105, 0.034523, 0.848808,
              0.998622, -0.0213426, 0.0328887, 0.87227, 0.998669, -0.0207912,
              0.0314374, 0.895157, 0.998705, -0.0198416, 0.0296925, 0.916769,
              0.998786, -0.0189168, 0.0279634, 0.937773, 0.998888, -0.0178811,
              0.0261597, 0.957431, 0.99906, -0.0166845, 0.0242159, 0.976495,
              0.999038, -0.0155464, 0.0222638, 0.994169, 0.999237, -0.0141349,
              0.0201967, 1.01112, 0.999378, -0.0129324, 0.0181744, 1.02692,
              0.999433, -0.0113192, 0.0159898, 1.04174, 0.999439, -0.0101244,
              0.0140385, 1.05559, 0.999614, -0.00837456, 0.0117826, 1.06852,
              0.999722, -0.00721769, 0.00983745, 1.08069, 0.999817, -0.00554067,
              0.00769002, 1.09176, 0.99983, -0.00426961, 0.005782, 1.10211,
              0.999964, -0.00273904, 0.00374503, 1.11152, 1.00001, -0.00136739,
              0.00187176, 1.12031, 0.999946, 393227e-10, -28919e-9, 1.12804,
              0.995847, -13435e-10, 0.0671785, 19916e-9, 0.995464, -338387e-10,
              0.0671527, 501622e-9, 0.99547, -135355e-9, 0.0671531, 0.00200649,
              0.995471, -30455e-8, 0.0671532, 0.00451461, 0.99547, -541423e-9,
              0.0671531, 0.008026, 0.995471, -84598e-8, 0.0671531, 0.0125407,
              0.99547, -0.00121823, 0.0671531, 0.0180589, 0.99547, -0.00165817,
              0.0671531, 0.0245806, 0.995463, -0.00216583, 0.0671526, 0.0321062,
              0.995468, -0.00274127, 0.0671527, 0.0406366, 0.995474,
              -0.00338447, 0.0671534, 0.0501717, 0.995473, -0.00409554,
              0.0671533, 0.0607131, 0.995478, -0.00487451, 0.0671531, 0.0722618,
              0.995476, -0.00572148, 0.0671532, 0.0848191, 0.995477,
              -0.00663658, 0.0671539, 0.0983882, 0.995498, -0.00761986,
              0.0671541, 0.112972, 0.995509, -0.00867094, 0.0671542, 0.128568,
              0.995509, -0.00978951, 0.0671531, 0.145183, 0.995503, -0.0109725,
              0.0671491, 0.162808, 0.995501, -0.012211, 0.0671465, 0.181441,
              0.99553, -0.0134565, 0.0671371, 0.201015, 0.99555, -0.014391,
              0.0670831, 0.221206, 0.99558, -0.014351, 0.0668883, 0.240813,
              0.995577, -0.0173997, 0.0671055, 0.261257, 0.995602, -0.0191111,
              0.0671178, 0.284467, 0.995623, -0.0206705, 0.0670946, 0.308765,
              0.995658, -0.022184, 0.0670472, 0.333905, 0.995705, -0.0234832,
              0.0669417, 0.359677, 0.995719, -0.0241933, 0.0666714, 0.385554,
              0.995786, -0.0243539, 0.066266, 0.410951, 0.995887, -0.0271866,
              0.0664367, 0.437163, 0.995944, -0.0296012, 0.0664931, 0.464842,
              0.996004, -0.0301045, 0.0660105, 0.49332, 0.996128, -0.0298311,
              0.0652694, 0.521131, 0.996253, -0.0316426, 0.0650739, 0.549167,
              0.996244, -0.0339043, 0.0649433, 0.57737, 0.996309, -0.033329,
              0.0638926, 0.606073, 0.996417, -0.0338935, 0.0630849, 0.634527,
              0.996372, -0.0353104, 0.0625083, 0.66256, 0.996542, -0.0348942,
              0.0611986, 0.690516, 0.996568, -0.0351614, 0.060069, 0.718317,
              0.996711, -0.0354317, 0.0588522, 0.74528, 0.996671, -0.0349513,
              0.0571902, 0.772061, 0.996865, -0.0345622, 0.0555321, 0.798089,
              0.996802, -0.0342566, 0.0537816, 0.823178, 0.996992, -0.0330862,
              0.0516095, 0.847949, 0.996944, -0.0324666, 0.0495537, 0.871431,
              0.997146, -0.0309544, 0.0470302, 0.894357, 0.997189, -0.0299372,
              0.0446043, 0.916142, 0.997471, -0.0281389, 0.0418812, 0.937193,
              0.997515, -0.0268702, 0.0391823, 0.957, 0.997812, -0.0247166,
              0.0361338, 0.975936, 0.998027, -0.0233525, 0.0333945, 0.99391,
              0.998233, -0.0209839, 0.0301917, 1.01075, 0.998481, -0.0194309,
              0.027271, 1.02669, 0.998859, -0.0169728, 0.0240162, 1.04173,
              0.99894, -0.0152322, 0.0210517, 1.05551, 0.999132, -0.0127497,
              0.0178632, 1.06856, 0.999369, -0.0108282, 0.014787, 1.08054,
              0.999549, -0.00845886, 0.0116185, 1.09185, 0.999805, -0.0063937,
              0.00867209, 1.10207, 0.99985, -0.00414582, 0.00566823, 1.1117,
              0.999912, -0.00207443, 0.00277562, 1.12022, 1.00001, 870226e-10,
              -53766e-9, 1.12832, 0.991943, -178672e-11, 0.0893382, 198384e-10,
              0.991952, -450183e-10, 0.089339, 499849e-9, 0.991956, -180074e-9,
              0.0893394, 0.0019994, 0.991955, -405167e-9, 0.0893393, 0.00449867,
              0.991953, -720298e-9, 0.0893391, 0.00799764, 0.991955,
              -0.00112548, 0.0893393, 0.0124964, 0.991957, -0.0016207,
              0.0893395, 0.0179951, 0.991958, -0.00220601, 0.0893396, 0.0244939,
              0.991947, -0.00288137, 0.0893385, 0.0319929, 0.991962,
              -0.00364693, 0.0893399, 0.0404933, 0.991965, -0.00450264,
              0.0893399, 0.049995, 0.99198, -0.00544862, 0.0893411, 0.0604995,
              0.99197, -0.00648491, 0.0893397, 0.0720074, 0.991976, -0.00761164,
              0.089341, 0.0845207, 0.99198, -0.00882891, 0.0893405, 0.0980413,
              0.991982, -0.0101367, 0.0893396, 0.112571, 0.992008, -0.011535,
              0.0893415, 0.128115, 0.992026, -0.0130228, 0.0893414, 0.144672,
              0.992064, -0.0145966, 0.0893418, 0.162241, 0.992041, -0.0162421,
              0.0893359, 0.180801, 0.992086, -0.0178888, 0.0893214, 0.200302,
              0.992157, -0.0190368, 0.0892401, 0.220332, 0.992181, -0.0195584,
              0.0890525, 0.240144, 0.992175, -0.0227257, 0.0892153, 0.260728,
              0.99221, -0.0254195, 0.089304, 0.283473, 0.99222, -0.0274883,
              0.0892703, 0.307673, 0.992317, -0.0294905, 0.0892027, 0.332729,
              0.992374, -0.0311861, 0.0890577, 0.358387, 0.992505, -0.0320656,
              0.0886994, 0.384102, 0.992568, -0.0329715, 0.0883198, 0.409767,
              0.992675, -0.036006, 0.0883602, 0.436145, 0.992746, -0.0392897,
              0.0884591, 0.463217, 0.992873, -0.0399337, 0.0878287, 0.491557,
              0.992934, -0.040231, 0.0870108, 0.519516, 0.993091, -0.0422013,
              0.0865857, 0.547741, 0.993259, -0.0443503, 0.0861937, 0.575792,
              0.993455, -0.0446368, 0.0851187, 0.604233, 0.993497, -0.0454299,
              0.0840576, 0.632925, 0.993694, -0.0463296, 0.0829671, 0.660985,
              0.993718, -0.0470619, 0.0817185, 0.688714, 0.993973, -0.0468838,
              0.0800294, 0.716743, 0.994207, -0.046705, 0.0781286, 0.74377,
              0.994168, -0.0469698, 0.0763337, 0.77042, 0.9945, -0.0456816,
              0.0738184, 0.796659, 0.994356, -0.0455518, 0.0715545, 0.821868,
              0.994747, -0.0439488, 0.0686085, 0.846572, 0.994937, -0.0430056,
              0.065869, 0.870435, 0.995142, -0.0413414, 0.0626446, 0.893272,
              0.995451, -0.0396521, 0.05929, 0.915376, 0.995445, -0.0378453,
              0.0558503, 0.936196, 0.995967, -0.0355219, 0.0520949, 0.956376,
              0.996094, -0.0335146, 0.048377, 0.975327, 0.996622, -0.030682,
              0.0442575, 0.993471, 0.996938, -0.0285504, 0.0404693, 1.01052,
              0.997383, -0.0253399, 0.0360903, 1.02637, 0.997714, -0.0231651,
              0.0322176, 1.04139, 0.998249, -0.0198138, 0.0278433, 1.05542,
              0.998596, -0.0174337, 0.0238759, 1.06846, 0.998946, -0.0141349,
              0.0195944, 1.08056, 0.99928, -0.0115603, 0.0156279, 1.09181,
              0.999507, -0.00839065, 0.0114607, 1.10213, 0.999697, -0.005666,
              0.00763325, 1.11169, 0.999869, -0.00269902, 0.00364946, 1.12042,
              1.00001, 623836e-10, -319288e-10, 1.12832, 0.987221, -222675e-11,
              0.111332, 197456e-10, 0.98739, -561116e-10, 0.111351, 497563e-9,
              0.987448, -224453e-9, 0.111357, 0.00199031, 0.987441, -505019e-9,
              0.111357, 0.0044782, 0.987442, -897816e-9, 0.111357, 0.00796129,
              0.987442, -0.00140284, 0.111357, 0.0124396, 0.987444, -0.00202012,
              0.111357, 0.0179132, 0.987442, -0.00274964, 0.111357, 0.0243824,
              0.987446, -0.00359147, 0.111357, 0.0318474, 0.987435, -0.00454562,
              0.111356, 0.0403086, 0.987461, -0.00561225, 0.111358, 0.0497678,
              0.987458, -0.00679125, 0.111358, 0.0602239, 0.987443, -0.0080828,
              0.111356, 0.0716792, 0.987476, -0.0094872, 0.111358, 0.0841364,
              0.98749, -0.0110044, 0.111361, 0.097597, 0.987508, -0.0126344,
              0.111362, 0.112062, 0.987494, -0.0143767, 0.111357, 0.127533,
              0.987526, -0.0162307, 0.111359, 0.144015, 0.987558, -0.0181912,
              0.111361, 0.161502, 0.987602, -0.0202393, 0.111355, 0.179979,
              0.987692, -0.022273, 0.111346, 0.199386, 0.987702, -0.0235306,
              0.111215, 0.219183, 0.987789, -0.0247628, 0.111061, 0.239202,
              0.987776, -0.0280668, 0.111171, 0.259957, 0.987856, -0.0316751,
              0.111327, 0.282198, 0.987912, -0.0342468, 0.111282, 0.306294,
              0.988, -0.0367205, 0.111198, 0.331219, 0.988055, -0.0387766,
              0.110994, 0.356708, 0.988241, -0.0397722, 0.110547, 0.382234,
              0.988399, -0.0416076, 0.110198, 0.408227, 0.988539, -0.0448192,
              0.110137, 0.434662, 0.988661, -0.0483793, 0.110143, 0.461442,
              0.988967, -0.0495895, 0.109453, 0.489318, 0.989073, -0.0506797,
              0.108628, 0.517516, 0.989274, -0.0526953, 0.108003, 0.545844,
              0.989528, -0.054578, 0.107255, 0.573823, 0.989709, -0.0561503,
              0.106294, 0.601944, 0.989991, -0.056866, 0.104896, 0.630855,
              0.990392, -0.0572914, 0.103336, 0.658925, 0.990374, -0.0586224,
              0.10189, 0.686661, 0.990747, -0.0584764, 0.099783, 0.714548,
              0.991041, -0.0582662, 0.0974309, 0.74186, 0.991236, -0.0584118,
              0.0951678, 0.768422, 0.991585, -0.0573055, 0.0921581, 0.794817,
              0.991984, -0.0564241, 0.0891167, 0.820336, 0.9921, -0.0553608,
              0.085805, 0.84493, 0.992749, -0.0533816, 0.0820354, 0.868961,
              0.99288, -0.0518661, 0.0782181, 0.891931, 0.993511, -0.0492492,
              0.0738935, 0.914186, 0.993617, -0.0471956, 0.0696402, 0.93532,
              0.99411, -0.044216, 0.0649659, 0.95543, 0.994595, -0.0416654,
              0.0603177, 0.974685, 0.994976, -0.0384314, 0.0553493, 0.992807,
              0.995579, -0.0353491, 0.0503942, 1.00996, 0.996069, -0.0319787,
              0.0452123, 1.02606, 0.996718, -0.028472, 0.0400112, 1.04114,
              0.997173, -0.0250789, 0.0349456, 1.05517, 0.997818, -0.0213326,
              0.029653, 1.0683, 0.998318, -0.0178509, 0.024549, 1.0805,
              0.998853, -0.0141118, 0.0194197, 1.09177, 0.999218, -0.0105914,
              0.0143869, 1.1022, 0.999594, -0.00693474, 0.00943517, 1.11175,
              0.99975, -0.00340478, 0.00464051, 1.12056, 1.00001, 109172e-9,
              -112821e-9, 1.12853, 0.983383, -266524e-11, 0.133358, 196534e-10,
              0.981942, -671009e-10, 0.133162, 494804e-9, 0.981946, -268405e-9,
              0.133163, 0.00197923, 0.981944, -603912e-9, 0.133163, 0.00445326,
              0.981941, -0.00107362, 0.133162, 0.00791693, 0.981946,
              -0.00167755, 0.133163, 0.0123703, 0.981944, -0.00241569, 0.133162,
              0.0178135, 0.981945, -0.00328807, 0.133163, 0.0242466, 0.981945,
              -0.00429472, 0.133162, 0.03167, 0.981955, -0.00543573, 0.133164,
              0.0400846, 0.981951, -0.00671105, 0.133163, 0.0494901, 0.981968,
              -0.00812092, 0.133165, 0.0598886, 0.981979, -0.00966541, 0.133166,
              0.0712811, 0.981996, -0.0113446, 0.133168, 0.083669, 0.982014,
              -0.0131585, 0.133169, 0.0970533, 0.982011, -0.0151073, 0.133167,
              0.111438, 0.982062, -0.0171906, 0.133172, 0.126826, 0.9821,
              -0.0194067, 0.133175, 0.143215, 0.982149, -0.0217502, 0.133176,
              0.160609, 0.982163, -0.0241945, 0.133173, 0.178981, 0.982247,
              -0.0265907, 0.133148, 0.198249, 0.982291, -0.027916, 0.132974,
              0.217795, 0.982396, -0.0299663, 0.132868, 0.238042, 0.982456,
              -0.0334544, 0.132934, 0.258901, 0.982499, -0.0378636, 0.133137,
              0.280639, 0.982617, -0.0409274, 0.133085, 0.304604, 0.98274,
              -0.0438523, 0.132985, 0.329376, 0.982944, -0.0462288, 0.132728,
              0.354697, 0.98308, -0.0475995, 0.132228, 0.380102, 0.983391,
              -0.0501901, 0.131924, 0.406256, 0.983514, -0.0535899, 0.131737,
              0.432735, 0.98373, -0.0571858, 0.131567, 0.459359, 0.984056,
              -0.0592353, 0.130932, 0.486637, 0.984234, -0.0610488, 0.130092,
              0.51509, 0.984748, -0.0630758, 0.12923, 0.543461, 0.985073,
              -0.0647398, 0.128174, 0.571376, 0.985195, -0.0671941, 0.127133,
              0.599414, 0.985734, -0.0681345, 0.125576, 0.628134, 0.986241,
              -0.0686089, 0.123639, 0.656399, 0.986356, -0.0698511, 0.121834,
              0.684258, 0.986894, -0.0700931, 0.119454, 0.711818, 0.987382,
              -0.0698321, 0.116718, 0.739511, 0.988109, -0.0693975, 0.113699,
              0.766267, 0.988363, -0.0689584, 0.110454, 0.792456, 0.989112,
              -0.0672353, 0.106602, 0.81813, 0.989241, -0.0662034, 0.10267,
              0.842889, 0.990333, -0.0638938, 0.0981381, 0.867204, 0.990591,
              -0.0618534, 0.0935388, 0.89038, 0.991106, -0.0593117, 0.088553,
              0.912576, 0.991919, -0.0562676, 0.0832187, 0.934118, 0.992111,
              -0.0534085, 0.0778302, 0.954254, 0.992997, -0.0495459, 0.0720453,
              0.973722, 0.993317, -0.0463707, 0.0663458, 0.991949, 0.994133,
              -0.0421245, 0.0601883, 1.00936, 0.994705, -0.0384977, 0.0542501,
              1.02559, 0.995495, -0.0340956, 0.0479862, 1.04083, 0.996206,
              -0.030105, 0.041887, 1.05497, 0.996971, -0.0256095, 0.0355355,
              1.06824, 0.997796, -0.0213932, 0.0293655, 1.08056, 0.998272,
              -0.0169612, 0.0232926, 1.09182, 0.998857, -0.0126756, 0.0172786,
              1.10219, 0.99939, -0.00832486, 0.0113156, 1.11192, 0.999752,
              -0.00410826, 0.00557892, 1.12075, 1, 150957e-9, -119101e-9,
              1.12885, 0.975169, -309397e-11, 0.154669, 195073e-10, 0.975439,
              -779608e-10, 0.154712, 491534e-9, 0.975464, -311847e-9, 0.154716,
              0.00196617, 0.975464, -701656e-9, 0.154716, 0.00442387, 0.975462,
              -0.0012474, 0.154715, 0.0078647, 0.975461, -0.00194906, 0.154715,
              0.0122886, 0.975464, -0.00280667, 0.154715, 0.0176959, 0.975468,
              -0.00382025, 0.154716, 0.0240867, 0.975471, -0.00498985, 0.154716,
              0.0314612, 0.975472, -0.00631541, 0.154717, 0.0398199, 0.975486,
              -0.00779719, 0.154718, 0.0491639, 0.975489, -0.00943505, 0.154718,
              0.0594932, 0.975509, -0.0112295, 0.154721, 0.0708113, 0.97554,
              -0.0131802, 0.154724, 0.0831176, 0.975557, -0.0152876, 0.154726,
              0.096415, 0.975585, -0.0175512, 0.154728, 0.110705, 0.975605,
              -0.0199713, 0.154729, 0.125992, 0.975645, -0.0225447, 0.154729,
              0.142272, 0.975711, -0.0252649, 0.154735, 0.159549, 0.975788,
              -0.0280986, 0.154736, 0.177805, 0.975872, -0.0308232, 0.154704,
              0.196911, 0.975968, -0.0324841, 0.154525, 0.216324, 0.976063,
              -0.0351281, 0.154432, 0.236628, 0.976157, -0.0388618, 0.15446,
              0.257539, 0.976204, -0.0437704, 0.154665, 0.278975, 0.976358,
              -0.047514, 0.154652, 0.302606, 0.976571, -0.0508638, 0.154535,
              0.327204, 0.976725, -0.0534995, 0.154221, 0.352276, 0.977013,
              -0.0555547, 0.153737, 0.377696, 0.977294, -0.0586728, 0.153403,
              0.403855, 0.977602, -0.0622715, 0.15312, 0.430333, 0.977932,
              -0.0658166, 0.152755, 0.456855, 0.978241, -0.0689877, 0.152233,
              0.483668, 0.978602, -0.0712805, 0.15132, 0.512097, 0.979234,
              -0.0732775, 0.150235, 0.540455, 0.97977, -0.075163, 0.148978,
              0.568486, 0.979995, -0.0778026, 0.147755, 0.596524, 0.98078,
              -0.0791854, 0.146019, 0.624825, 0.981628, -0.0799666, 0.143906,
              0.653403, 0.982067, -0.0808532, 0.141561, 0.681445, 0.98271,
              -0.0816024, 0.139025, 0.708918, 0.983734, -0.0812511, 0.135764,
              0.736594, 0.98431, -0.0806201, 0.132152, 0.763576, 0.985071,
              -0.0801605, 0.12846, 0.789797, 0.98618, -0.0784208, 0.124084,
              0.815804, 0.986886, -0.0766643, 0.1193, 0.840869, 0.987485,
              -0.0747744, 0.114236, 0.864952, 0.988431, -0.0716701, 0.108654,
              0.888431, 0.988886, -0.0691609, 0.102994, 0.910963, 0.990024,
              -0.0654048, 0.0967278, 0.932629, 0.990401, -0.0619765, 0.090384,
              0.95313, 0.991093, -0.0579296, 0.0837885, 0.972587, 0.992018,
              -0.0536576, 0.0770171, 0.991184, 0.992536, -0.0493719, 0.0701486,
              1.00863, 0.993421, -0.0444813, 0.062953, 1.02494, 0.993928,
              -0.040008, 0.0560455, 1.04017, 0.994994, -0.0347982, 0.04856,
              1.05463, 0.995866, -0.0301017, 0.0416152, 1.06807, 0.996916,
              -0.0248225, 0.0342597, 1.08039, 0.997766, -0.0199229, 0.0271668,
              1.09177, 0.998479, -0.0147422, 0.0201387, 1.10235, 0.99921,
              -0.00980173, 0.0131944, 1.11206, 0.999652, -0.0047426, 0.00640712,
              1.12104, 0.999998, 891673e-10, -10379e-8, 1.12906, 0.967868,
              -351885e-11, 0.175947, 193569e-10, 0.968001, -886733e-10,
              0.175972, 487782e-9, 0.96801, -354697e-9, 0.175973, 0.00195115,
              0.968012, -798063e-9, 0.175974, 0.00439006, 0.968011, -0.00141879,
              0.175973, 0.00780461, 0.968011, -0.00221686, 0.175973, 0.0121948,
              0.968016, -0.00319231, 0.175974, 0.0175607, 0.968019, -0.00434515,
              0.175974, 0.0239027, 0.968018, -0.00567538, 0.175974, 0.0312208,
              0.968033, -0.00718308, 0.175977, 0.0395158, 0.968049, -0.00886836,
              0.175979, 0.0487885, 0.968047, -0.0107312, 0.175978, 0.0590394,
              0.968072, -0.0127719, 0.175981, 0.0702705, 0.968108, -0.0149905,
              0.175986, 0.0824836, 0.968112, -0.0173866, 0.175985, 0.0956783,
              0.968173, -0.0199611, 0.175993, 0.109862, 0.96827, -0.0227128,
              0.176008, 0.125033, 0.968292, -0.025639, 0.17601, 0.141193,
              0.968339, -0.0287299, 0.176007, 0.158336, 0.968389, -0.0319399,
              0.176001, 0.176441, 0.968501, -0.034941, 0.175962, 0.195359,
              0.968646, -0.0370812, 0.175793, 0.214686, 0.968789, -0.0402329,
              0.175708, 0.234973, 0.96886, -0.0442601, 0.1757, 0.255871,
              0.969013, -0.049398, 0.175876, 0.277238, 0.969242, -0.0539932,
              0.17594, 0.300326, 0.969419, -0.0577299, 0.175781, 0.324702,
              0.969763, -0.0605643, 0.175432, 0.349527, 0.970093, -0.0634488,
              0.174992, 0.374976, 0.970361, -0.0670589, 0.174611, 0.401097,
              0.970825, -0.0708246, 0.174226, 0.427496, 0.971214, -0.0742871,
              0.173684, 0.453858, 0.971622, -0.0782608, 0.173186, 0.480637,
              0.972175, -0.0813151, 0.172288, 0.508655, 0.972944, -0.0832678,
              0.170979, 0.536973, 0.973595, -0.0855964, 0.169573, 0.565138,
              0.974345, -0.0882163, 0.168152, 0.593222, 0.975233, -0.0901671,
              0.166314, 0.621201, 0.976239, -0.0912111, 0.163931, 0.649919,
              0.977289, -0.0916959, 0.161106, 0.678011, 0.978076, -0.0927061,
              0.158272, 0.705717, 0.979533, -0.0925562, 0.15475, 0.733228,
              0.980335, -0.0918159, 0.150638, 0.760454, 0.981808, -0.0908508,
              0.146201, 0.786918, 0.983061, -0.0896172, 0.141386, 0.812953,
              0.984148, -0.0871588, 0.135837, 0.838281, 0.985047, -0.0850624,
              0.130135, 0.862594, 0.986219, -0.0818541, 0.123882, 0.88633,
              0.987043, -0.0784523, 0.117126, 0.908952, 0.988107, -0.0749601,
              0.110341, 0.930744, 0.988955, -0.0703548, 0.102885, 0.951728,
              0.989426, -0.0662798, 0.0954167, 0.971166, 0.990421, -0.0610834,
              0.0876331, 0.989984, 0.991032, -0.0562936, 0.0797785, 1.00765,
              0.992041, -0.0508154, 0.0718166, 1.02434, 0.992794, -0.0454045,
              0.0637125, 1.03976, 0.993691, -0.0398194, 0.0555338, 1.05418,
              0.994778, -0.0341482, 0.0473388, 1.06772, 0.995915, -0.028428,
              0.0391016, 1.08028, 0.997109, -0.022642, 0.0309953, 1.09185,
              0.998095, -0.0168738, 0.0230288, 1.10247, 0.998985, -0.0111274,
              0.0150722, 1.11229, 0.999581, -0.00543881, 0.00740605, 1.12131,
              1.00003, 162239e-9, -105549e-9, 1.12946, 0.959505, -393734e-11,
              0.196876, 191893e-10, 0.959599, -992157e-10, 0.196895, 483544e-9,
              0.959641, -396868e-9, 0.196903, 0.0019342, 0.959599, -892948e-9,
              0.196895, 0.00435193, 0.959603, -0.00158747, 0.196896, 0.0077368,
              0.959604, -0.00248042, 0.196896, 0.0120888, 0.959605, -0.00357184,
              0.196896, 0.0174082, 0.959605, -0.00486169, 0.196896, 0.0236949,
              0.959613, -0.00635008, 0.196897, 0.0309497, 0.959619, -0.00803696,
              0.196898, 0.0391725, 0.959636, -0.00992255, 0.196901, 0.0483649,
              0.959634, -0.0120067, 0.1969, 0.0585266, 0.959675, -0.0142898,
              0.196906, 0.0696609, 0.959712, -0.0167717, 0.196911, 0.0817678,
              0.959752, -0.0194524, 0.196918, 0.0948494, 0.959807, -0.0223321,
              0.196925, 0.10891, 0.959828, -0.0254091, 0.196924, 0.123947,
              0.959906, -0.0286815, 0.196934, 0.139968, 0.960005, -0.0321371,
              0.196944, 0.156968, 0.960071, -0.0357114, 0.196936, 0.17491,
              0.960237, -0.0389064, 0.196882, 0.193597, 0.960367, -0.041623,
              0.196731, 0.21285, 0.960562, -0.0452655, 0.196654, 0.233075,
              0.960735, -0.0496207, 0.196643, 0.253941, 0.960913, -0.0549379,
              0.196774, 0.275278, 0.961121, -0.0603414, 0.196893, 0.297733,
              0.96139, -0.0644244, 0.196717, 0.321877, 0.961818, -0.067556,
              0.196314, 0.346476, 0.962175, -0.0712709, 0.195917, 0.371907,
              0.96255, -0.0752848, 0.1955, 0.397916, 0.963164, -0.0792073,
              0.195026, 0.424229, 0.963782, -0.0828225, 0.194424, 0.450637,
              0.964306, -0.0873119, 0.193831, 0.477288, 0.964923, -0.0911051,
              0.192973, 0.504716, 0.966048, -0.093251, 0.19151, 0.533053,
              0.967024, -0.0958983, 0.190013, 0.561366, 0.968038, -0.09835,
              0.188253, 0.589464, 0.969152, -0.100754, 0.186257, 0.617433,
              0.970557, -0.102239, 0.183775, 0.645801, 0.972104, -0.102767,
              0.180645, 0.674278, 0.973203, -0.103492, 0.177242, 0.702004,
              0.975123, -0.103793, 0.17345, 0.729529, 0.97641, -0.102839,
              0.168886, 0.756712, 0.978313, -0.101687, 0.163892, 0.783801,
              0.980036, -0.100314, 0.158439, 0.809671, 0.981339, -0.097836,
              0.152211, 0.835402, 0.982794, -0.0950006, 0.145679, 0.860081,
              0.984123, -0.0920994, 0.138949, 0.883757, 0.984918, -0.0878641,
              0.131283, 0.90685, 0.985999, -0.083939, 0.123464, 0.928786,
              0.987151, -0.0791234, 0.115324, 0.94983, 0.987827, -0.0739332,
              0.106854, 0.96962, 0.988806, -0.0688088, 0.0982691, 0.98861,
              0.989588, -0.0628962, 0.0893456, 1.00667, 0.990438, -0.0573146,
              0.0805392, 1.02344, 0.991506, -0.0509433, 0.0713725, 1.03933,
              0.992492, -0.0448724, 0.0623732, 1.05378, 0.993663, -0.0383497,
              0.0530838, 1.06747, 0.994956, -0.0319593, 0.0439512, 1.08007,
              0.99634, -0.025401, 0.0347803, 1.09182, 0.99761, -0.0189687,
              0.0257954, 1.1025, 0.99863, -0.0124441, 0.0169893, 1.11247,
              0.99947, -0.00614003, 0.00829498, 1.12151, 1.00008, 216624e-9,
              -146107e-9, 1.12993, 0.950129, -434955e-11, 0.217413, 190081e-10,
              0.950264, -10957e-8, 0.217444, 47884e-8, 0.9503, -438299e-9,
              0.217451, 0.00191543, 0.950246, -986124e-9, 0.21744, 0.00430951,
              0.950246, -0.00175311, 0.21744, 0.00766137, 0.950245, -0.00273923,
              0.21744, 0.011971, 0.950253, -0.00394453, 0.217441, 0.0172385,
              0.950258, -0.00536897, 0.217442, 0.0234641, 0.950267, -0.00701262,
              0.217444, 0.030648, 0.950277, -0.00887551, 0.217446, 0.038791,
              0.950284, -0.0109576, 0.217446, 0.0478931, 0.950312, -0.0132591,
              0.217451, 0.0579568, 0.950334, -0.01578, 0.217454, 0.0689821,
              0.950378, -0.0185204, 0.217462, 0.0809714, 0.950417, -0.0214803,
              0.217467, 0.0939265, 0.950488, -0.0246594, 0.217479, 0.10785,
              0.950534, -0.0280565, 0.217483, 0.122743, 0.950633, -0.0316685,
              0.217498, 0.138611, 0.950698, -0.0354787, 0.217499, 0.155442,
              0.950844, -0.0394003, 0.217507, 0.173208, 0.950999, -0.0426812,
              0.217419, 0.191605, 0.951221, -0.0461302, 0.217317, 0.21084,
              0.951412, -0.0502131, 0.217238, 0.230945, 0.951623, -0.0549183,
              0.21722, 0.251745, 0.951867, -0.0604493, 0.217306, 0.273001,
              0.952069, -0.0665189, 0.217466, 0.294874, 0.952459, -0.0709179,
              0.217266, 0.318732, 0.952996, -0.0746112, 0.216891, 0.34318,
              0.953425, -0.0789252, 0.216503, 0.36849, 0.953885, -0.0833293,
              0.216042, 0.394373, 0.954617, -0.087371, 0.215469, 0.420505,
              0.955429, -0.0914054, 0.214802, 0.446907, 0.956068, -0.0961671,
              0.214146, 0.473522, 0.957094, -0.10048, 0.213286, 0.50052,
              0.958372, -0.103248, 0.211796, 0.528715, 0.959654, -0.106033,
              0.21016, 0.557065, 0.961305, -0.108384, 0.208149, 0.585286,
              0.962785, -0.111122, 0.206024, 0.613334, 0.964848, -0.112981,
              0.203442, 0.641334, 0.966498, -0.113717, 0.19996, 0.669955,
              0.968678, -0.114121, 0.196105, 0.698094, 0.970489, -0.114524,
              0.191906, 0.725643, 0.972903, -0.113792, 0.186963, 0.752856,
              0.974701, -0.112406, 0.181343, 0.780013, 0.976718, -0.110685,
              0.175185, 0.806268, 0.978905, -0.108468, 0.168535, 0.832073,
              0.980267, -0.105061, 0.161106, 0.857149, 0.981967, -0.101675,
              0.153387, 0.881145, 0.983063, -0.0974492, 0.145199, 0.904255,
              0.984432, -0.0925815, 0.136527, 0.926686, 0.985734, -0.0877983,
              0.127584, 0.947901, 0.986228, -0.081884, 0.118125, 0.968111,
              0.98719, -0.0761208, 0.108594, 0.98719, 0.988228, -0.0698196,
              0.0989996, 1.00559, 0.989046, -0.0632739, 0.0890074, 1.02246,
              0.990242, -0.056522, 0.0790832, 1.03841, 0.991252, -0.0495272,
              0.0689182, 1.05347, 0.992542, -0.0425373, 0.0588592, 1.06724,
              0.994096, -0.0353198, 0.0486833, 1.08009, 0.995593, -0.028235,
              0.0385977, 1.09177, 0.99711, -0.0209511, 0.0286457, 1.10274,
              0.998263, -0.0139289, 0.0188497, 1.11262, 0.999254, -0.0067359,
              0.009208, 1.12191, 0.999967, 141846e-9, -657764e-10, 1.13024,
              0.935608, -474692e-11, 0.236466, 187817e-10, 0.93996, -11971e-8,
              0.237568, 473646e-9, 0.939959, -478845e-9, 0.237567, 0.0018946,
              0.939954, -0.0010774, 0.237566, 0.00426284, 0.939956, -0.00191538,
              0.237566, 0.00757842, 0.939954, -0.00299277, 0.237566, 0.0118413,
              0.93996, -0.00430961, 0.237567, 0.0170518, 0.939969, -0.00586589,
              0.237569, 0.02321, 0.939982, -0.00766166, 0.237572, 0.0303164,
              0.939987, -0.00969686, 0.237572, 0.0383711, 0.939997, -0.0119715,
              0.237574, 0.0473751, 0.940031, -0.0144858, 0.237581, 0.0573298,
              0.940073, -0.0172399, 0.237589, 0.0682366, 0.94012, -0.0202335,
              0.237598, 0.080097, 0.940162, -0.0234663, 0.237604, 0.0929116,
              0.940237, -0.0269387, 0.237615, 0.106686, 0.940328, -0.0306489,
              0.237632, 0.121421, 0.940419, -0.0345917, 0.237645, 0.137115,
              0.940522, -0.0387481, 0.237654, 0.153766, 0.940702, -0.0429906,
              0.237661, 0.17133, 0.940871, -0.0465089, 0.237561, 0.189502,
              0.941103, -0.050531, 0.23748, 0.208616, 0.941369, -0.0550657,
              0.237423, 0.228595, 0.941641, -0.0601337, 0.237399, 0.249287,
              0.941903, -0.0658804, 0.237443, 0.270467, 0.942224, -0.0722674,
              0.237597, 0.292024, 0.942633, -0.0771788, 0.237419, 0.315272,
              0.943172, -0.0815623, 0.237068, 0.339579, 0.943691, -0.0863973,
              0.236682, 0.364717, 0.944382, -0.0911536, 0.236213, 0.390435,
              0.945392, -0.0952967, 0.235562, 0.416425, 0.946185, -0.0998948,
              0.234832, 0.442772, 0.947212, -0.104796, 0.234114, 0.469347,
              0.948778, -0.10928, 0.233222, 0.496162, 0.950149, -0.113081,
              0.231845, 0.523978, 0.951989, -0.115893, 0.230005, 0.552295,
              0.953921, -0.11846, 0.227862, 0.580569, 0.955624, -0.12115,
              0.225439, 0.608698, 0.958234, -0.123373, 0.222635, 0.636696,
              0.960593, -0.124519, 0.219093, 0.665208, 0.963201, -0.124736,
              0.214749, 0.693557, 0.965642, -0.125012, 0.210059, 0.721334,
              0.968765, -0.124661, 0.204935, 0.748613, 0.971753, -0.122996,
              0.198661, 0.776224, 0.973751, -0.120998, 0.191823, 0.802461,
              0.976709, -0.118583, 0.184359, 0.828399, 0.977956, -0.115102,
              0.176437, 0.853693, 0.979672, -0.111077, 0.167681, 0.877962,
              0.981816, -0.10688, 0.158872, 0.901564, 0.98238, -0.101469,
              0.149398, 0.924057, 0.983964, -0.0960013, 0.139436, 0.945751,
              0.984933, -0.0899626, 0.12943, 0.966272, 0.985694, -0.0832973,
              0.11894, 0.985741, 0.986822, -0.0767082, 0.108349, 1.00407,
              0.987725, -0.0693614, 0.0976026, 1.02154, 0.98877, -0.06211,
              0.086652, 1.03757, 0.990129, -0.0544143, 0.0756182, 1.05296,
              0.991337, -0.046744, 0.0645753, 1.06683, 0.992978, -0.0387931,
              0.0534683, 1.0798, 0.994676, -0.030973, 0.0424137, 1.09181,
              0.99645, -0.0230311, 0.0314035, 1.10286, 0.997967, -0.0152065,
              0.0206869, 1.11291, 0.99922, -0.00744837, 0.010155, 1.12237,
              1.00002, 240209e-9, -752767e-10, 1.13089, 0.922948, -515351e-11,
              0.255626, 186069e-10, 0.928785, -129623e-9, 0.257244, 468009e-9,
              0.928761, -51849e-8, 0.257237, 0.00187202, 0.928751, -0.0011666,
              0.257235, 0.00421204, 0.928751, -0.00207395, 0.257234, 0.0074881,
              0.928754, -0.00324055, 0.257235, 0.0117002, 0.92876, -0.00466639,
              0.257236, 0.0168486, 0.928763, -0.00635149, 0.257237, 0.0229334,
              0.928774, -0.00829584, 0.257239, 0.029955, 0.928791, -0.0104995,
              0.257243, 0.0379139, 0.928804, -0.0129623, 0.257245, 0.0468108,
              0.928847, -0.0156846, 0.257255, 0.0566473, 0.92889, -0.0186661,
              0.257263, 0.0674246, 0.928924, -0.0219067, 0.257268, 0.0791433,
              0.928989, -0.0254066, 0.257282, 0.0918076, 0.92909, -0.0291651,
              0.257301, 0.105419, 0.92918, -0.0331801, 0.257316, 0.119978,
              0.92929, -0.0374469, 0.257332, 0.135491, 0.929453, -0.041939,
              0.257357, 0.151948, 0.929586, -0.0464612, 0.257347, 0.169275,
              0.929858, -0.0503426, 0.257269, 0.187257, 0.930125, -0.0548409,
              0.257199, 0.206204, 0.930403, -0.0598063, 0.257149, 0.22601,
              0.930726, -0.0652437, 0.257122, 0.246561, 0.931098, -0.0712376,
              0.257153, 0.267618, 0.931396, -0.0777506, 0.257237, 0.288993,
              0.931947, -0.0832374, 0.257124, 0.311527, 0.932579, -0.0883955,
              0.25683, 0.335697, 0.933194, -0.0937037, 0.256444, 0.360634,
              0.934013, -0.0987292, 0.255939, 0.386126, 0.935307, -0.103215,
              0.255282, 0.412018, 0.936374, -0.108234, 0.254538, 0.438292,
              0.93776, -0.113234, 0.253728, 0.464805, 0.939599, -0.118013,
              0.25275, 0.491464, 0.941036, -0.122661, 0.251404, 0.518751,
              0.94337, -0.125477, 0.249435, 0.547133, 0.945318, -0.128374,
              0.247113, 0.575456, 0.947995, -0.130996, 0.244441, 0.60372,
              0.950818, -0.133438, 0.241352, 0.63174, 0.954378, -0.135004,
              0.237849, 0.659971, 0.957151, -0.135313, 0.233188, 0.688478,
              0.960743, -0.13521, 0.228001, 0.716767, 0.964352, -0.135007,
              0.222249, 0.744349, 0.967273, -0.133523, 0.21542, 0.771786,
              0.969767, -0.131155, 0.208039, 0.798639, 0.973195, -0.128492,
              0.200076, 0.824774, 0.975557, -0.125094, 0.191451, 0.850222,
              0.977692, -0.120578, 0.18184, 0.874761, 0.98026, -0.115882,
              0.172102, 0.898497, 0.981394, -0.110372, 0.161859, 0.921636,
              0.982386, -0.10415, 0.15108, 0.943467, 0.983783, -0.0978128,
              0.140407, 0.964045, 0.98422, -0.0906171, 0.129058, 0.98398,
              0.985447, -0.0832921, 0.117614, 1.00276, 0.986682, -0.0754412,
              0.10585, 1.02047, 0.987326, -0.0673885, 0.0940943, 1.03678,
              0.988707, -0.0592565, 0.0822093, 1.05218, 0.990185, -0.050717,
              0.070192, 1.06652, 0.991866, -0.0423486, 0.0582081, 1.07965,
              0.993897, -0.0336118, 0.0460985, 1.09188, 0.995841, -0.0252178,
              0.0342737, 1.10307, 0.997605, -0.0164893, 0.0224829, 1.11324,
              0.999037, -0.00817112, 0.0110647, 1.12262, 1.00003, 291686e-9,
              -168673e-9, 1.13139, 0.915304, -552675e-11, 0.275999, 183285e-10,
              0.91668, -139285e-9, 0.276414, 461914e-9, 0.916664, -55713e-8,
              0.276409, 0.00184763, 0.916653, -0.00125354, 0.276406, 0.00415715,
              0.916651, -0.00222851, 0.276405, 0.00739053, 0.916655,
              -0.00348205, 0.276406, 0.0115478, 0.916653, -0.00501414, 0.276405,
              0.0166291, 0.916667, -0.00682478, 0.276409, 0.0226346, 0.91668,
              -0.00891398, 0.276412, 0.0295648, 0.91669, -0.0112817, 0.276413,
              0.0374199, 0.916727, -0.013928, 0.276422, 0.0462016, 0.916759,
              -0.0168528, 0.276429, 0.0559101, 0.916793, -0.0200558, 0.276436,
              0.0665466, 0.916849, -0.0235373, 0.276448, 0.0781139, 0.916964,
              -0.0272973, 0.276474, 0.0906156, 0.917047, -0.0313344, 0.276491,
              0.104051, 0.917152, -0.0356465, 0.276511, 0.118424, 0.917286,
              -0.0402271, 0.276533, 0.133736, 0.917469, -0.0450408, 0.276564,
              0.149978, 0.917686, -0.0497872, 0.276563, 0.167057, 0.917953,
              -0.0540937, 0.276493, 0.184846, 0.918228, -0.0590709, 0.276437,
              0.203614, 0.918572, -0.0644277, 0.276398, 0.223212, 0.918918,
              -0.0702326, 0.276362, 0.243584, 0.919356, -0.076484, 0.276383,
              0.264465, 0.919842, -0.0830808, 0.276434, 0.285701, 0.920451,
              -0.0892972, 0.276407, 0.307559, 0.921113, -0.095016, 0.276128,
              0.331501, 0.921881, -0.100771, 0.275754, 0.356207, 0.923027,
              -0.106029, 0.275254, 0.381477, 0.924364, -0.111029, 0.274595,
              0.40722, 0.925818, -0.116345, 0.273841, 0.433385, 0.92746,
              -0.121424, 0.272913, 0.459848, 0.929167, -0.12657, 0.271837,
              0.486493, 0.931426, -0.131581, 0.270575, 0.513432, 0.934001,
              -0.135038, 0.268512, 0.541502, 0.936296, -0.138039, 0.266135,
              0.569658, 0.939985, -0.140687, 0.263271, 0.598375, 0.943516,
              -0.143247, 0.260058, 0.626563, 0.94782, -0.145135, 0.256138,
              0.654711, 0.951023, -0.145733, 0.251154, 0.683285, 0.955338,
              -0.145554, 0.245562, 0.711831, 0.959629, -0.145008, 0.239265,
              0.739573, 0.963123, -0.144003, 0.232064, 0.767027, 0.966742,
              -0.141289, 0.224036, 0.794359, 0.969991, -0.138247, 0.215305,
              0.820361, 0.973403, -0.134786, 0.206051, 0.846548, 0.975317,
              -0.129966, 0.195914, 0.871541, 0.977647, -0.12471, 0.185184,
              0.895313, 0.980137, -0.119086, 0.174161, 0.918398, 0.981031,
              -0.112297, 0.162792, 0.940679, 0.982037, -0.105372, 0.150952,
              0.961991, 0.983164, -0.097821, 0.138921, 0.981913, 0.983757,
              -0.0897245, 0.126611, 1.00109, 0.985036, -0.0815974, 0.114228,
              1.01902, 0.986289, -0.0727725, 0.101389, 1.03604, 0.987329,
              -0.0639323, 0.0886476, 1.05149, 0.989193, -0.0548109, 0.0756837,
              1.06619, 0.990716, -0.045687, 0.0627581, 1.07948, 0.992769,
              -0.0364315, 0.0498337, 1.09172, 0.99524, -0.0271761, 0.0370305,
              1.1033, 0.997154, -0.0179609, 0.0243959, 1.11353, 0.998845,
              -0.00878063, 0.0119567, 1.12319, 1.00002, 259038e-9, -108146e-9,
              1.13177, 0.903945, -591681e-11, 0.295126, 181226e-10, 0.903668,
              -148672e-9, 0.295037, 455367e-9, 0.903677, -594683e-9, 0.29504,
              0.00182145, 0.903673, -0.00133805, 0.295039, 0.00409831, 0.903666,
              -0.00237872, 0.295036, 0.00728584, 0.903668, -0.00371676,
              0.295037, 0.0113842, 0.903679, -0.00535212, 0.29504, 0.0163936,
              0.903684, -0.00728479, 0.295041, 0.0223141, 0.903698, -0.00951473,
              0.295044, 0.0291462, 0.903718, -0.0120419, 0.295049, 0.0368904,
              0.903754, -0.0148664, 0.295058, 0.0455477, 0.903801, -0.017988,
              0.29507, 0.0551194, 0.903851, -0.0214064, 0.295082, 0.0656058,
              0.903921, -0.0251219, 0.295097, 0.0770109, 0.904002, -0.0291337,
              0.295116, 0.0893354, 0.904111, -0.033441, 0.29514, 0.102583,
              0.904246, -0.0380415, 0.295169, 0.116755, 0.904408, -0.0429258,
              0.295202, 0.131853, 0.904637, -0.0480468, 0.295245, 0.147869,
              0.904821, -0.0529208, 0.295214, 0.164658, 0.905163, -0.0577748,
              0.295185, 0.182274, 0.905469, -0.0631763, 0.295143, 0.200828,
              0.905851, -0.068917, 0.295112, 0.2202, 0.906322, -0.0750861,
              0.295104, 0.240372, 0.906761, -0.0815855, 0.295086, 0.261082,
              0.90735, -0.0882138, 0.295095, 0.282123, 0.908087, -0.095082,
              0.295139, 0.303563, 0.908826, -0.101488, 0.29492, 0.327028,
              0.909832, -0.107577, 0.294577, 0.351464, 0.911393, -0.113033,
              0.294115, 0.376497, 0.912804, -0.118629, 0.293446, 0.402115,
              0.914081, -0.124232, 0.292581, 0.428111, 0.91637, -0.129399,
              0.29166, 0.454442, 0.91814, -0.134892, 0.290422, 0.481024,
              0.921179, -0.140069, 0.289194, 0.507924, 0.924544, -0.144431,
              0.287421, 0.535557, 0.927995, -0.147498, 0.284867, 0.563984,
              0.931556, -0.150197, 0.281722, 0.5923, 0.935777, -0.152711,
              0.278207, 0.620832, 0.940869, -0.154836, 0.274148, 0.649069,
              0.945994, -0.155912, 0.269057, 0.677746, 0.949634, -0.155641,
              0.262799, 0.706293, 0.955032, -0.154809, 0.256097, 0.734278,
              0.95917, -0.153678, 0.248618, 0.761751, 0.962931, -0.151253,
              0.239794, 0.789032, 0.966045, -0.147625, 0.230281, 0.815422,
              0.96971, -0.143964, 0.220382, 0.841787, 0.972747, -0.139464,
              0.209846, 0.867446, 0.975545, -0.133459, 0.198189, 0.892004,
              0.978381, -0.127424, 0.186362, 0.915458, 0.979935, -0.120506,
              0.173964, 0.937948, 0.980948, -0.11282, 0.161429, 0.959732,
              0.982234, -0.104941, 0.148557, 0.980118, 0.982767, -0.0962905,
              0.135508, 0.999463, 0.983544, -0.0873625, 0.122338, 1.01756,
              0.984965, -0.0783447, 0.108669, 1.03492, 0.986233, -0.0684798,
              0.0949911, 1.05087, 0.987796, -0.0590867, 0.0811386, 1.0656,
              0.989885, -0.0489145, 0.0673099, 1.0794, 0.991821, -0.0391,
              0.0535665, 1.09174, 0.99448, -0.029087, 0.0397529, 1.10341,
              0.996769, -0.019114, 0.0261463, 1.11383, 0.998641, -0.00947007,
              0.0128731, 1.1237, 0.999978, 446316e-9, -169093e-9, 1.13253,
              0.888362, -627064e-11, 0.312578, 178215e-10, 0.889988, -157791e-9,
              0.313148, 448451e-9, 0.889825, -631076e-9, 0.313092, 0.00179356,
              0.88984, -0.00141994, 0.313097, 0.00403554, 0.889828, -0.0025243,
              0.313092, 0.00717429, 0.889831, -0.00394421, 0.313093, 0.0112099,
              0.889831, -0.00567962, 0.313093, 0.0161425, 0.889844, -0.00773051,
              0.313096, 0.0219724, 0.889858, -0.0100968, 0.3131, 0.0286999,
              0.889882, -0.0127786, 0.313106, 0.0363256, 0.889918, -0.0157757,
              0.313116, 0.0448509, 0.889967, -0.0190878, 0.313129, 0.0542758,
              0.89003, -0.022715, 0.313145, 0.0646032, 0.890108, -0.0266566,
              0.313165, 0.0758339, 0.890218, -0.0309131, 0.313193, 0.0879729,
              0.890351, -0.0354819, 0.313226, 0.101019, 0.89051, -0.0403613,
              0.313263, 0.114979, 0.890672, -0.0455385, 0.313294, 0.129848,
              0.890882, -0.0509444, 0.313333, 0.145616, 0.891189, -0.0559657,
              0.313324, 0.162122, 0.891457, -0.0613123, 0.313281, 0.179524,
              0.891856, -0.0671488, 0.313281, 0.197855, 0.892312, -0.0732732,
              0.313268, 0.216991, 0.892819, -0.0797865, 0.313263, 0.236924,
              0.893369, -0.0865269, 0.313247, 0.257433, 0.894045, -0.0931592,
              0.313205, 0.278215, 0.894884, -0.100532, 0.313276, 0.299467,
              0.895832, -0.107716, 0.313205, 0.322276, 0.897043, -0.114099,
              0.312873, 0.34642, 0.898515, -0.119941, 0.312331, 0.371187,
              0.900191, -0.126044, 0.311731, 0.396656, 0.90188, -0.131808,
              0.310859, 0.422488, 0.904359, -0.137289, 0.309857, 0.448744,
              0.906923, -0.142991, 0.308714, 0.475239, 0.910634, -0.148253,
              0.307465, 0.501983, 0.914502, -0.153332, 0.305774, 0.529254,
              0.919046, -0.156646, 0.303156, 0.557709, 0.923194, -0.159612,
              0.299928, 0.586267, 0.928858, -0.162027, 0.296245, 0.614925,
              0.934464, -0.164203, 0.291832, 0.643187, 0.939824, -0.165602,
              0.286565, 0.671601, 0.944582, -0.165383, 0.280073, 0.700213,
              0.949257, -0.164439, 0.272891, 0.728432, 0.954389, -0.162953,
              0.264771, 0.756082, 0.958595, -0.161007, 0.255927, 0.78369,
              0.962138, -0.157243, 0.245769, 0.810769, 0.966979, -0.152872,
              0.235127, 0.836999, 0.969566, -0.148209, 0.22347, 0.862684,
              0.972372, -0.142211, 0.211147, 0.887847, 0.975916, -0.135458,
              0.198606, 0.911843, 0.978026, -0.128398, 0.185498, 0.934795,
              0.979686, -0.120313, 0.17171, 0.956787, 0.980748, -0.11166,
              0.158159, 0.978046, 0.981622, -0.103035, 0.144399, 0.997693,
              0.982356, -0.0930328, 0.13001, 1.01642, 0.983308, -0.0834627,
              0.115778, 1.03366, 0.985037, -0.0732249, 0.101327, 1.05014,
              0.986493, -0.0628145, 0.086554, 1.06507, 0.988484, -0.0526556,
              0.0720413, 1.07907, 0.991051, -0.0415744, 0.0571151, 1.09189,
              0.993523, -0.0314275, 0.0426643, 1.10369, 0.99628, -0.0203603,
              0.0279325, 1.11423, 0.998344, -0.0102446, 0.0138182, 1.12421,
              0.999997, 42612e-8, -193628e-9, 1.1333, 0.871555, -660007e-11,
              0.329176, 174749e-10, 0.875255, -166579e-9, 0.330571, 441051e-9,
              0.875644, -666394e-9, 0.330718, 0.00176441, 0.875159, -0.00149903,
              0.330536, 0.00396899, 0.87516, -0.00266493, 0.330536, 0.007056,
              0.875158, -0.00416393, 0.330535, 0.0110251, 0.87516, -0.00599598,
              0.330535, 0.0158764, 0.875163, -0.00816108, 0.330536, 0.0216101,
              0.875174, -0.0106591, 0.330538, 0.0282266, 0.875199, -0.0134899,
              0.330545, 0.0357266, 0.875257, -0.0166538, 0.330563, 0.0441117,
              0.875304, -0.0201501, 0.330575, 0.0533821, 0.875373, -0.0239785,
              0.330595, 0.0635395, 0.875464, -0.0281389, 0.330619, 0.0745872,
              0.875565, -0.0326301, 0.330645, 0.0865255, 0.875691, -0.0374516,
              0.330676, 0.0993599, 0.875897, -0.0425993, 0.330733, 0.113093,
              0.876091, -0.0480576, 0.330776, 0.127722, 0.876353, -0.0537216,
              0.330826, 0.143227, 0.876649, -0.0589807, 0.330809, 0.159462,
              0.877034, -0.0647865, 0.330819, 0.176642, 0.877443, -0.0709789,
              0.330817, 0.194702, 0.877956, -0.0774782, 0.330832, 0.213577,
              0.878499, -0.0843175, 0.330822, 0.233246, 0.879144, -0.0912714,
              0.330804, 0.253512, 0.879982, -0.0980824, 0.330766, 0.274137,
              0.88097, -0.105823, 0.330864, 0.295209, 0.882051, -0.113671,
              0.330896, 0.317226, 0.883397, -0.120303, 0.330545, 0.341068,
              0.884987, -0.12667, 0.330068, 0.365613, 0.886789, -0.133118,
              0.329418, 0.390807, 0.889311, -0.139024, 0.328683, 0.416494,
              0.891995, -0.144971, 0.327729, 0.442618, 0.895106, -0.150747,
              0.326521, 0.469131, 0.899527, -0.156283, 0.325229, 0.495921,
              0.90504, -0.161707, 0.32378, 0.523162, 0.909875, -0.165661,
              0.32122, 0.55092, 0.91561, -0.168755, 0.317942, 0.579928,
              0.921225, -0.171193, 0.313983, 0.608539, 0.927308, -0.17319,
              0.309636, 0.636854, 0.933077, -0.174819, 0.304262, 0.66523,
              0.938766, -0.175002, 0.297563, 0.693609, 0.943667, -0.173946,
              0.289613, 0.722157, 0.949033, -0.172221, 0.281227, 0.750021,
              0.953765, -0.169869, 0.271545, 0.777466, 0.95804, -0.166578,
              0.261034, 0.804853, 0.962302, -0.161761, 0.249434, 0.831569,
              0.966544, -0.156636, 0.237484, 0.857779, 0.969372, -0.150784,
              0.224395, 0.883051, 0.972486, -0.143672, 0.210786, 0.907864,
              0.975853, -0.135772, 0.196556, 0.931223, 0.977975, -0.127942,
              0.182307, 0.954061, 0.979122, -0.118347, 0.167607, 0.97531,
              0.980719, -0.109112, 0.152739, 0.995666, 0.981223, -0.0991789,
              0.137932, 1.01475, 0.98216, -0.0883553, 0.122692, 1.03253,
              0.983379, -0.0780825, 0.107493, 1.04917, 0.985434, -0.0665646,
              0.0917791, 1.06464, 0.987332, -0.0557714, 0.0764949, 1.07896,
              0.990004, -0.0442805, 0.060721, 1.09199, 0.992975, -0.0331676,
              0.0452284, 1.10393, 0.995811, -0.0219547, 0.0297934, 1.11476,
              0.9982, -0.0107613, 0.0146415, 1.12484, 1.00002, 248678e-9,
              -14555e-8, 1.13413, 0.859519, -693595e-11, 0.347264, 171673e-10,
              0.859843, -17503e-8, 0.347394, 433219e-9, 0.859656, -700076e-9,
              0.347319, 0.00173277, 0.859671, -0.00157517, 0.347325, 0.00389875,
              0.859669, -0.00280028, 0.347324, 0.00693112, 0.85967, -0.0043754,
              0.347324, 0.01083, 0.859665, -0.00630049, 0.347321, 0.0155954,
              0.859685, -0.0085755, 0.347328, 0.0212278, 0.859694, -0.0112003,
              0.347329, 0.0277273, 0.859718, -0.0141747, 0.347336, 0.0350946,
              0.85976, -0.0174988, 0.347348, 0.0433314, 0.85982, -0.0211722,
              0.347366, 0.0524384, 0.859892, -0.0251941, 0.347387, 0.0624168,
              0.860006, -0.0295649, 0.347422, 0.0732708, 0.860122, -0.0342825,
              0.347453, 0.0849999, 0.860282, -0.0393462, 0.347499, 0.0976102,
              0.860482, -0.0447513, 0.347554, 0.111104, 0.860719, -0.0504775,
              0.347614, 0.125479, 0.860998, -0.0563577, 0.347666, 0.140703,
              0.861322, -0.0619473, 0.347662, 0.156681, 0.861724, -0.0681277,
              0.347684, 0.173597, 0.862198, -0.0746567, 0.347709, 0.191371,
              0.862733, -0.0815234, 0.347727, 0.209976, 0.863371, -0.0886643,
              0.347744, 0.229351, 0.86414, -0.0957908, 0.347734, 0.24934,
              0.865138, -0.102912, 0.34772, 0.269797, 0.866182, -0.110924,
              0.3478, 0.290654, 0.867436, -0.119223, 0.347911, 0.312074,
              0.869087, -0.126197, 0.347649, 0.335438, 0.870859, -0.133145,
              0.347222, 0.359732, 0.872997, -0.139869, 0.346645, 0.38467,
              0.875939, -0.146089, 0.345935, 0.41019, 0.879012, -0.152334,
              0.345012, 0.436218, 0.883353, -0.15821, 0.343924, 0.462641,
              0.888362, -0.164097, 0.342636, 0.489449, 0.895026, -0.169528,
              0.341351, 0.516629, 0.900753, -0.174408, 0.339115, 0.544109,
              0.906814, -0.17751, 0.335809, 0.572857, 0.912855, -0.180101,
              0.331597, 0.601554, 0.919438, -0.182116, 0.32698, 0.630198,
              0.925962, -0.183494, 0.321449, 0.658404, 0.931734, -0.184159,
              0.314595, 0.686625, 0.93762, -0.18304, 0.306462, 0.71531,
              0.943858, -0.181323, 0.297514, 0.744272, 0.948662, -0.178683,
              0.287447, 0.771462, 0.953299, -0.175379, 0.276166, 0.798593,
              0.957346, -0.170395, 0.263758, 0.8256, 0.962565, -0.165042,
              0.251019, 0.852575, 0.966075, -0.158655, 0.237011, 0.878316,
              0.969048, -0.151707, 0.222518, 0.90329, 0.972423, -0.143271,
              0.207848, 0.927745, 0.975833, -0.134824, 0.192463, 0.950859,
              0.977629, -0.125444, 0.1768, 0.972947, 0.978995, -0.114949,
              0.161033, 0.993263, 0.980533, -0.104936, 0.145523, 1.01337,
              0.980745, -0.0935577, 0.129799, 1.03128, 0.981814, -0.0822956,
              0.113486, 1.04825, 0.983943, -0.0710082, 0.0972925, 1.06405,
              0.986141, -0.0587931, 0.0808138, 1.0785, 0.988878, -0.0472755,
              0.0644915, 1.09204, 0.992132, -0.0349128, 0.0478128, 1.10413,
              0.9953, -0.0232407, 0.031621, 1.11527, 0.998117, -0.0112713,
              0.0154935, 1.12551, 1.00003, 339743e-9, -195763e-9, 1.13504,
              0.845441, -729126e-11, 0.364305, 169208e-10, 0.843588, -183164e-9,
              0.363506, 425067e-9, 0.843412, -73253e-8, 0.36343, 0.00169999,
              0.843401, -0.00164818, 0.363426, 0.00382495, 0.843399,
              -0.00293008, 0.363425, 0.00679993, 0.843401, -0.00457822,
              0.363425, 0.010625, 0.843394, -0.00659249, 0.363421, 0.0153002,
              0.843398, -0.00897282, 0.363421, 0.0208258, 0.843415, -0.0117191,
              0.363426, 0.0272024, 0.843438, -0.0148312, 0.363432, 0.0344305,
              0.843483, -0.018309, 0.363447, 0.0425116, 0.84356, -0.0221521,
              0.363472, 0.0514471, 0.843646, -0.0263597, 0.363499, 0.061238,
              0.843743, -0.0309315, 0.363527, 0.0718873, 0.84388, -0.0358658,
              0.363569, 0.0833969, 0.844079, -0.0411624, 0.363631, 0.0957742,
              0.844279, -0.0468128, 0.363688, 0.109015, 0.844549, -0.0527923,
              0.363761, 0.123124, 0.844858, -0.0588204, 0.363817, 0.138044,
              0.84522, -0.0647573, 0.36383, 0.153755, 0.845669, -0.0713181,
              0.363879, 0.170394, 0.846155, -0.0781697, 0.363908, 0.187861,
              0.846789, -0.0853913, 0.363969, 0.206176, 0.847502, -0.0928086,
              0.363999, 0.225244, 0.8484, -0.10005, 0.363997, 0.244926,
              0.849461, -0.107615, 0.364008, 0.265188, 0.850562, -0.115814,
              0.364055, 0.28587, 0.851962, -0.124334, 0.364179, 0.306926,
              0.854326, -0.131995, 0.364233, 0.329605, 0.856295, -0.139338,
              0.363856, 0.35359, 0.858857, -0.146346, 0.363347, 0.37831,
              0.862428, -0.152994, 0.362807, 0.403722, 0.866203, -0.159463,
              0.361963, 0.429537, 0.871629, -0.165623, 0.36112, 0.456, 0.877365,
              -0.171649, 0.359917, 0.482773, 0.883744, -0.177151, 0.35848,
              0.509705, 0.890693, -0.182381, 0.356523, 0.537215, 0.897278,
              -0.186076, 0.3533, 0.565493, 0.903958, -0.188602, 0.349095,
              0.594293, 0.910908, -0.190755, 0.344215, 0.623165, 0.918117,
              -0.192063, 0.338606, 0.651573, 0.924644, -0.192758, 0.331544,
              0.679869, 0.931054, -0.192238, 0.323163, 0.708668, 0.937303,
              -0.190035, 0.313529, 0.737201, 0.943387, -0.187162, 0.303152,
              0.764977, 0.948494, -0.183876, 0.29146, 0.792683, 0.952546,
              -0.178901, 0.277917, 0.819228, 0.958077, -0.173173, 0.264753,
              0.846559, 0.962462, -0.16645, 0.25002, 0.872962, 0.966569,
              -0.159452, 0.234873, 0.898729, 0.969108, -0.15074, 0.218752,
              0.923126, 0.973072, -0.141523, 0.202673, 0.947278, 0.975452,
              -0.132075, 0.186326, 0.969938, 0.977784, -0.121257, 0.169396,
              0.991325, 0.97899, -0.110182, 0.153044, 1.01123, 0.979777,
              -0.0989634, 0.136485, 1.0299, 0.980865, -0.0865894, 0.119343,
              1.04727, 0.982432, -0.0746115, 0.102452, 1.06341, 0.984935,
              -0.0621822, 0.0852423, 1.07834, 0.987776, -0.0495694, 0.0678546,
              1.092, 0.99103, -0.0372386, 0.0506917, 1.1043, 0.99474,
              -0.0244353, 0.0333316, 1.11576, 0.997768, -0.0121448, 0.0164348,
              1.12617, 1.00003, 31774e-8, -169504e-9, 1.13598, 0.825551,
              -756799e-11, 0.378425, 165099e-10, 0.82664, -190922e-9, 0.378923,
              416504e-9, 0.826323, -763495e-9, 0.378779, 0.0016656, 0.826359,
              -0.00171789, 0.378795, 0.00374768, 0.82636, -0.00305402, 0.378795,
              0.00666259, 0.826368, -0.00477185, 0.378798, 0.0104104, 0.826364,
              -0.00687131, 0.378795, 0.0149912, 0.826368, -0.00935232, 0.378795,
              0.0204054, 0.826376, -0.0122146, 0.378797, 0.0266532, 0.826399,
              -0.0154581, 0.378803, 0.0337355, 0.82646, -0.0190825, 0.378824,
              0.0416537, 0.826525, -0.0230873, 0.378846, 0.0504091, 0.826614,
              -0.0274719, 0.378876, 0.0600032, 0.82674, -0.0322355, 0.378917,
              0.0704393, 0.826888, -0.0373766, 0.378964, 0.0817195, 0.827078,
              -0.0428936, 0.379024, 0.0938492, 0.827318, -0.0487778, 0.379099,
              0.106828, 0.82764, -0.0549935, 0.379199, 0.120659, 0.827926,
              -0.0611058, 0.379227, 0.13526, 0.828325, -0.0675054, 0.379275,
              0.150713, 0.828801, -0.0743455, 0.379332, 0.167034, 0.8294,
              -0.0815523, 0.379415, 0.184209, 0.830094, -0.0890779, 0.379495,
              0.202203, 0.8309, -0.096736, 0.379555, 0.220945, 0.831943,
              -0.104135, 0.379577, 0.240306, 0.833037, -0.112106, 0.379604,
              0.260317, 0.834278, -0.120554, 0.379668, 0.2808, 0.836192,
              -0.129128, 0.3799, 0.301654, 0.838671, -0.137541, 0.380109,
              0.323502, 0.840939, -0.14523, 0.379809, 0.347176, 0.844575,
              -0.15248, 0.379593, 0.371706, 0.848379, -0.159607, 0.37909,
              0.39688, 0.853616, -0.166267, 0.378617, 0.422702, 0.858921,
              -0.172698, 0.377746, 0.448919, 0.865324, -0.178823, 0.376749,
              0.475661, 0.872207, -0.184542, 0.375363, 0.502599, 0.880018,
              -0.189836, 0.373657, 0.529914, 0.88694, -0.194294, 0.370673,
              0.557683, 0.894779, -0.197022, 0.36662, 0.586848, 0.902242,
              -0.199108, 0.36138, 0.615831, 0.909914, -0.200398, 0.355434,
              0.644478, 0.917088, -0.20094, 0.348173, 0.672905, 0.923888,
              -0.200671, 0.339482, 0.701327, 0.930495, -0.198773, 0.32956,
              0.730101, 0.937247, -0.195394, 0.318363, 0.758383, 0.943108,
              -0.191956, 0.306323, 0.786539, 0.948296, -0.187227, 0.292576,
              0.813637, 0.953472, -0.181165, 0.278234, 0.840793, 0.958485,
              -0.174119, 0.263054, 0.867712, 0.962714, -0.166564, 0.246756,
              0.893635, 0.966185, -0.158181, 0.229945, 0.919028, 0.970146,
              -0.148275, 0.212633, 0.943413, 0.973491, -0.138157, 0.195229,
              0.966627, 0.975741, -0.127574, 0.178048, 0.988817, 0.977238,
              -0.11554, 0.160312, 1.00924, 0.978411, -0.10364, 0.142857,
              1.02845, 0.979811, -0.0913122, 0.125317, 1.04648, 0.98116,
              -0.0782558, 0.107627, 1.06284, 0.983543, -0.0655957, 0.0895862,
              1.07798, 0.986789, -0.0520411, 0.0713756, 1.092, 0.990292,
              -0.0389727, 0.053228, 1.10484, 0.994187, -0.025808, 0.0351945,
              1.11642, 0.997499, -0.0126071, 0.0173198, 1.12703, 0.999999,
              275604e-9, -148602e-9, 1.13674, 0.81075, -78735e-10, 0.394456,
              161829e-10, 0.808692, -198293e-9, 0.393453, 407564e-9, 0.80846,
              -792877e-9, 0.39334, 0.00162965, 0.808595, -0.00178416, 0.393407,
              0.00366711, 0.808597, -0.00317182, 0.393408, 0.00651934, 0.808598,
              -0.00495589, 0.393408, 0.0101866, 0.808591, -0.00713627, 0.393403,
              0.0146689, 0.808592, -0.00971285, 0.393402, 0.0199667, 0.80861,
              -0.0126855, 0.393407, 0.0260803, 0.808633, -0.0160538, 0.393413,
              0.0330107, 0.80868, -0.0198175, 0.393429, 0.0407589, 0.808748,
              -0.0239758, 0.393453, 0.0493264, 0.808854, -0.0285286, 0.39349,
              0.0587161, 0.808992, -0.0334748, 0.39354, 0.0689304, 0.809141,
              -0.0388116, 0.393588, 0.0799707, 0.809352, -0.0445375, 0.39366,
              0.0918432, 0.809608, -0.0506427, 0.393742, 0.104549, 0.809915,
              -0.0570708, 0.393834, 0.118085, 0.810253, -0.0633526, 0.393885,
              0.132377, 0.810687, -0.0700966, 0.393953, 0.147537, 0.811233,
              -0.0772274, 0.394047, 0.163543, 0.811865, -0.0847629, 0.394148,
              0.180394, 0.812648, -0.0925663, 0.394265, 0.198051, 0.813583,
              -0.100416, 0.394363, 0.216443, 0.814683, -0.108119, 0.394402,
              0.235502, 0.815948, -0.11644, 0.394489, 0.255242, 0.817278,
              -0.125036, 0.394542, 0.275441, 0.819605, -0.133655, 0.39486,
              0.296094, 0.822256, -0.142682, 0.395248, 0.317309, 0.825349,
              -0.150756, 0.395241, 0.340516, 0.829605, -0.158392, 0.395285,
              0.364819, 0.83391, -0.165801, 0.394922, 0.389736, 0.839808,
              -0.172677, 0.394691, 0.415409, 0.845708, -0.179448, 0.394006,
              0.441546, 0.853025, -0.185746, 0.393279, 0.46832, 0.859666,
              -0.191684, 0.391655, 0.495302, 0.86789, -0.197146, 0.390068,
              0.52262, 0.875845, -0.201904, 0.38727, 0.550336, 0.882634,
              -0.205023, 0.382688, 0.578825, 0.891076, -0.207098, 0.377543,
              0.608103, 0.900589, -0.208474, 0.371752, 0.63723, 0.90791,
              -0.209068, 0.364016, 0.665769, 0.915971, -0.208655, 0.355593,
              0.694428, 0.923455, -0.20729, 0.345439, 0.723224, 0.931514,
              -0.203821, 0.334099, 0.751925, 0.937885, -0.19986, 0.321069,
              0.780249, 0.943136, -0.194993, 0.306571, 0.8077, 0.948818,
              -0.189132, 0.291556, 0.83497, 0.954433, -0.181617, 0.275745,
              0.86188, 0.959078, -0.173595, 0.258695, 0.888562, 0.962705,
              -0.164855, 0.240825, 0.914008, 0.966753, -0.155129, 0.22268,
              0.939145, 0.970704, -0.144241, 0.204542, 0.963393, 0.973367,
              -0.133188, 0.185927, 0.985983, 0.975984, -0.121146, 0.167743,
              1.00704, 0.976994, -0.108366, 0.149218, 1.02715, 0.978485,
              -0.0956746, 0.13131, 1.0455, 0.980074, -0.0820733, 0.112513,
              1.06221, 0.98225, -0.0684061, 0.0938323, 1.07782, 0.98553,
              -0.0549503, 0.0749508, 1.09199, 0.989529, -0.0407857, 0.055848,
              1.10508, 0.993536, -0.0271978, 0.0368581, 1.11684, 0.997247,
              -0.0132716, 0.0181845, 1.12789, 1, 431817e-9, -198809e-9, 1.13792,
              0.785886, -812608e-11, 0.405036, 157669e-10, 0.790388, -205278e-9,
              0.407355, 398297e-9, 0.790145, -820824e-9, 0.407231, 0.00159263,
              0.790135, -0.00184681, 0.407226, 0.00358336, 0.790119,
              -0.00328316, 0.407218, 0.00637039, 0.790126, -0.00512988, 0.40722,
              0.0099539, 0.79013, -0.00738684, 0.407221, 0.0143339, 0.790135,
              -0.0100538, 0.407221, 0.0195107, 0.790134, -0.0131306, 0.407217,
              0.0254848, 0.79016, -0.0166169, 0.407224, 0.0322572, 0.790197,
              -0.020512, 0.407236, 0.0398284, 0.790273, -0.0248157, 0.407263,
              0.0482014, 0.790381, -0.029527, 0.407304, 0.0573777, 0.790521,
              -0.0346446, 0.407355, 0.0673602, 0.790704, -0.0401665, 0.40742,
              0.0781522, 0.790925, -0.0460896, 0.407499, 0.0897582, 0.791195,
              -0.0524017, 0.407589, 0.10218, 0.791522, -0.0590121, 0.407691,
              0.11541, 0.791878, -0.0654876, 0.407748, 0.12939, 0.792361,
              -0.0725207, 0.407849, 0.144237, 0.792942, -0.0799844, 0.407963,
              0.159924, 0.79362, -0.0877896, 0.408087, 0.176425, 0.794529,
              -0.0958451, 0.408259, 0.193733, 0.795521, -0.103827, 0.408362,
              0.211756, 0.796778, -0.111937, 0.408482, 0.230524, 0.798027,
              -0.120521, 0.408547, 0.249967, 0.799813, -0.129242, 0.408721,
              0.269926, 0.802387, -0.138048, 0.409148, 0.290338, 0.805279,
              -0.147301, 0.409641, 0.311193, 0.809251, -0.155895, 0.410154,
              0.333611, 0.813733, -0.163942, 0.410297, 0.357615, 0.819081,
              -0.171666, 0.410373, 0.382339, 0.825427, -0.178905, 0.410348,
              0.407828, 0.83172, -0.185812, 0.409486, 0.434034, 0.83877,
              -0.192318, 0.408776, 0.460493, 0.845817, -0.198249, 0.407176,
              0.487346, 0.854664, -0.204034, 0.405719, 0.514832, 0.863495,
              -0.208908, 0.403282, 0.542401, 0.871883, -0.212765, 0.399293,
              0.570683, 0.88065, -0.214911, 0.393803, 0.599947, 0.89004,
              -0.216214, 0.387536, 0.62932, 0.898476, -0.216745, 0.379846,
              0.658319, 0.906738, -0.216387, 0.370625, 0.687138, 0.914844,
              -0.215053, 0.360139, 0.71601, 0.923877, -0.212007, 0.348849,
              0.745124, 0.931925, -0.207481, 0.335639, 0.773366, 0.938054,
              -0.202418, 0.320798, 0.801636, 0.943895, -0.196507, 0.304772,
              0.829055, 0.949468, -0.189009, 0.288033, 0.856097, 0.955152,
              -0.180539, 0.270532, 0.88301, 0.959403, -0.171437, 0.251639,
              0.909296, 0.963309, -0.161661, 0.232563, 0.934868, 0.967399,
              -0.150425, 0.213231, 0.959662, 0.972009, -0.138659, 0.194247,
              0.98302, 0.97433, -0.126595, 0.174718, 1.00517, 0.975823,
              -0.113205, 0.155518, 1.02566, 0.976371, -0.0996096, 0.136709,
              1.04418, 0.978705, -0.0860754, 0.117571, 1.06146, 0.981477,
              -0.0714438, 0.0980046, 1.07777, 0.984263, -0.0572304, 0.0782181,
              1.09214, 0.988423, -0.0428875, 0.0584052, 1.10553, 0.993,
              -0.0282442, 0.038522, 1.11758, 0.99704, -0.0140183, 0.0190148,
              1.12864, 0.999913, 369494e-9, -145203e-9, 1.13901, 0.777662,
              -84153e-10, 0.423844, 154403e-10, 0.770458, -211714e-9, 0.419915,
              38845e-8, 0.770716, -846888e-9, 0.420055, 0.00155386, 0.770982,
              -0.00190567, 0.420202, 0.00349653, 0.770981, -0.00338782,
              0.420201, 0.00621606, 0.77098, -0.00529338, 0.4202, 0.00971274,
              0.770983, -0.00762223, 0.4202, 0.0139867, 0.770985, -0.0103741,
              0.420198, 0.0190381, 0.770996, -0.0135489, 0.4202, 0.0248677,
              0.771029, -0.0171461, 0.420212, 0.0314764, 0.771052, -0.0211647,
              0.420215, 0.0388648, 0.771131, -0.0256048, 0.420245, 0.047036,
              0.771235, -0.0304647, 0.420284, 0.0559911, 0.771383, -0.0357436,
              0.420341, 0.0657346, 0.771591, -0.0414392, 0.420423, 0.0762694,
              0.771819, -0.0475462, 0.420506, 0.0875984, 0.772123, -0.0540506,
              0.420617, 0.099727, 0.772464, -0.060797, 0.42072, 0.112637,
              0.772855, -0.0675393, 0.420799, 0.126313, 0.773317, -0.0748323,
              0.420893, 0.140824, 0.773981, -0.0825681, 0.421058, 0.15617,
              0.774746, -0.0906307, 0.421226, 0.172322, 0.77566, -0.0988982,
              0.421397, 0.189253, 0.776837, -0.106994, 0.421569, 0.206912,
              0.778097, -0.115528, 0.421704, 0.225359, 0.779588, -0.124317,
              0.421849, 0.24447, 0.781574, -0.133139, 0.422097, 0.264156,
              0.784451, -0.142179, 0.422615, 0.284318, 0.787682, -0.15165,
              0.423269, 0.304902, 0.792433, -0.160771, 0.424396, 0.3265,
              0.797359, -0.169166, 0.424772, 0.35014, 0.803986, -0.177149,
              0.425475, 0.374768, 0.809504, -0.184745, 0.424996, 0.399928,
              0.815885, -0.19173, 0.424247, 0.425796, 0.823513, -0.198525,
              0.423515, 0.452287, 0.832549, -0.204709, 0.422787, 0.479321,
              0.841653, -0.210447, 0.421187, 0.506718, 0.850401, -0.215501,
              0.418519, 0.53432, 0.859854, -0.219752, 0.414715, 0.56242,
              0.869364, -0.222305, 0.409462, 0.591558, 0.878837, -0.223744,
              0.402926, 0.621074, 0.888636, -0.224065, 0.395043, 0.650538,
              0.898132, -0.223742, 0.38564, 0.679538, 0.907181, -0.222308,
              0.375378, 0.708674, 0.915621, -0.219837, 0.363212, 0.737714,
              0.9239, -0.215233, 0.349313, 0.767014, 0.931644, -0.209592,
              0.334162, 0.795133, 0.938887, -0.203644, 0.317943, 0.823228,
              0.945282, -0.196349, 0.300581, 0.850822, 0.950758, -0.18742,
              0.282195, 0.877594, 0.956146, -0.177879, 0.262481, 0.904564,
              0.960355, -0.167643, 0.242487, 0.930741, 0.965256, -0.156671,
              0.222668, 0.955868, 0.968029, -0.144123, 0.201907, 0.979869,
              0.97251, -0.131305, 0.18202, 1.00291, 0.974925, -0.118335,
              0.161909, 1.02392, 0.975402, -0.103714, 0.142129, 1.0433,
              0.976987, -0.089415, 0.122447, 1.06089, 0.979677, -0.0748858,
              0.102248, 1.07713, 0.983184, -0.0596086, 0.0814851, 1.09218,
              0.987466, -0.0447671, 0.0609484, 1.10585, 0.992348, -0.0295217,
              0.0401835, 1.11829, 0.996674, -0.0143917, 0.0198163, 1.12966,
              1.00003, 321364e-9, -149983e-9, 1.1402, 0.757901, -869074e-11,
              0.436176, 151011e-10, 0.751195, -217848e-9, 0.432317, 378533e-9,
              0.751178, -871373e-9, 0.432307, 0.0015141, 0.751195, -0.00196061,
              0.432317, 0.0034068, 0.751198, -0.00348552, 0.432318, 0.00605659,
              0.751195, -0.00544599, 0.432315, 0.00946353, 0.751207,
              -0.00784203, 0.43232, 0.013628, 0.751213, -0.0106732, 0.43232,
              0.0185499, 0.751221, -0.0139393, 0.432319, 0.0242302, 0.751244,
              -0.0176398, 0.432325, 0.0306694, 0.7513, -0.0217743, 0.432348,
              0.0378698, 0.751358, -0.0263412, 0.432367, 0.0458321, 0.751458,
              -0.0313396, 0.432404, 0.0545587, 0.751608, -0.0367682, 0.432464,
              0.0640543, 0.7518, -0.0426246, 0.43254, 0.0743222, 0.752065,
              -0.0489031, 0.432645, 0.0853668, 0.752376, -0.0555828, 0.432762,
              0.0971911, 0.752715, -0.0623861, 0.432859, 0.109768, 0.753137,
              -0.069415, 0.432958, 0.123126, 0.753676, -0.0770039, 0.433099,
              0.137308, 0.754345, -0.084971, 0.433272, 0.15229, 0.755235,
              -0.0932681, 0.433504, 0.168075, 0.756186, -0.10171, 0.433693,
              0.184625, 0.757363, -0.110019, 0.433857, 0.201897, 0.75884,
              -0.11887, 0.434102, 0.220014, 0.760467, -0.127881, 0.434306,
              0.238778, 0.762969, -0.136766, 0.434751, 0.258172, 0.765823,
              -0.14612, 0.43529, 0.278062, 0.769676, -0.15566, 0.436236,
              0.298437, 0.774909, -0.165177, 0.437754, 0.319532, 0.77994,
              -0.17402, 0.438343, 0.342505, 0.785757, -0.182201, 0.438609,
              0.366693, 0.792487, -0.190104, 0.438762, 0.391668, 0.80038,
              -0.197438, 0.438795, 0.417494, 0.808494, -0.204365, 0.438226,
              0.443933, 0.817695, -0.210714, 0.437283, 0.470929, 0.828111,
              -0.216651, 0.436087, 0.498569, 0.837901, -0.221804, 0.433717,
              0.526165, 0.847813, -0.226318, 0.430133, 0.554155, 0.858314,
              -0.229297, 0.425213, 0.582822, 0.868891, -0.230999, 0.418576,
              0.612847, 0.878941, -0.231155, 0.410405, 0.642445, 0.888809,
              -0.230935, 0.400544, 0.672024, 0.898089, -0.229343, 0.389613,
              0.701366, 0.908081, -0.226886, 0.377197, 0.730763, 0.916819,
              -0.222676, 0.363397, 0.759642, 0.924968, -0.216835, 0.347437,
              0.788775, 0.932906, -0.210245, 0.32995, 0.817135, 0.940025,
              -0.202992, 0.312262, 0.844912, 0.946101, -0.19436, 0.293313,
              0.872164, 0.952835, -0.184125, 0.273638, 0.899443, 0.957347,
              -0.173657, 0.252385, 0.926389, 0.961434, -0.162204, 0.231038,
              0.951947, 0.965522, -0.14979, 0.209834, 0.976751, 0.969412,
              -0.136307, 0.188821, 1.00022, 0.973902, -0.122527, 0.168013,
              1.02229, 0.974045, -0.108213, 0.147634, 1.04199, 0.975775,
              -0.0927397, 0.12705, 1.06019, 0.978383, -0.0778212, 0.106309,
              1.07711, 0.98211, -0.0621216, 0.0849279, 1.09245, 0.986517,
              -0.0463847, 0.0633519, 1.10651, 0.991696, -0.0309353, 0.0419698,
              1.11903, 0.996349, -0.0150914, 0.0206272, 1.13073, 1.00003,
              442449e-9, -231396e-9, 1.14146, 0.727498, -885074e-11, 0.441528,
              145832e-10, 0.730897, -223525e-9, 0.443589, 368298e-9, 0.730796,
              -893996e-9, 0.443528, 0.00147303, 0.730805, -0.00201149, 0.443533,
              0.00331433, 0.730814, -0.00357596, 0.443538, 0.00589222, 0.730815,
              -0.00558734, 0.443538, 0.00920678, 0.730822, -0.00804544, 0.44354,
              0.0132582, 0.730836, -0.0109501, 0.443545, 0.0180468, 0.730848,
              -0.0143008, 0.443546, 0.0235732, 0.730871, -0.0180969, 0.443552,
              0.0298382, 0.730915, -0.022338, 0.443567, 0.0368438, 0.730982,
              -0.0270225, 0.443591, 0.044591, 0.731076, -0.0321491, 0.443627,
              0.0530831, 0.731245, -0.0377166, 0.443699, 0.0623243, 0.73144,
              -0.0437216, 0.443777, 0.0723181, 0.7317, -0.0501576, 0.443881,
              0.0830691, 0.732034, -0.0569942, 0.444014, 0.0945809, 0.732388,
              -0.0638756, 0.444113, 0.106825, 0.732853, -0.071203, 0.444247,
              0.119859, 0.733473, -0.0790076, 0.444442, 0.13369, 0.734195,
              -0.0871937, 0.444645, 0.148304, 0.735069, -0.095696, 0.444877,
              0.163702, 0.736169, -0.10426, 0.445133, 0.179861, 0.73747,
              -0.112853, 0.44537, 0.196778, 0.738991, -0.12199, 0.445651,
              0.214496, 0.740865, -0.131153, 0.445958, 0.232913, 0.743637,
              -0.140245, 0.446548, 0.251977, 0.746797, -0.149722, 0.447246,
              0.271551, 0.751517, -0.159341, 0.448656, 0.291774, 0.756156,
              -0.169106, 0.449866, 0.312455, 0.761519, -0.178436, 0.450919,
              0.334552, 0.768295, -0.186904, 0.451776, 0.358491, 0.776613,
              -0.195117, 0.452832, 0.383446, 0.783966, -0.202695, 0.45249,
              0.408945, 0.793542, -0.20985, 0.452587, 0.435364, 0.803192,
              -0.216403, 0.451852, 0.462336, 0.813892, -0.22251, 0.450708,
              0.48987, 0.824968, -0.227676, 0.4486, 0.517697, 0.835859,
              -0.232443, 0.445156, 0.545975, 0.846825, -0.235775, 0.440351,
              0.574483, 0.858085, -0.237897, 0.433641, 0.604246, 0.868825,
              -0.238074, 0.425354, 0.634101, 0.879638, -0.237661, 0.415383,
              0.664201, 0.889966, -0.236186, 0.404136, 0.693918, 0.899479,
              -0.233599, 0.390917, 0.723481, 0.908769, -0.229737, 0.376352,
              0.75258, 0.917966, -0.223836, 0.360372, 0.781764, 0.926304,
              -0.217067, 0.342551, 0.811139, 0.934626, -0.209309, 0.324238,
              0.839585, 0.941841, -0.20071, 0.304484, 0.867044, 0.94789,
              -0.190602, 0.283607, 0.894579, 0.954196, -0.179253, 0.262205,
              0.921743, 0.958383, -0.167646, 0.239847, 0.948026, 0.963119,
              -0.155073, 0.218078, 0.973296, 0.966941, -0.141426, 0.195899,
              0.998135, 0.970836, -0.126849, 0.174121, 1.02021, 0.973301,
              -0.112296, 0.153052, 1.04085, 0.97448, -0.0964965, 0.131733,
              1.05946, 0.977045, -0.080489, 0.10997, 1.07693, 0.980751,
              -0.064844, 0.0881657, 1.09254, 0.985475, -0.0481938, 0.0657987,
              1.10697, 0.991089, -0.0319185, 0.0435215, 1.12004, 0.996122,
              -0.0158088, 0.0214779, 1.13173, 1.00001, 372455e-9, -200295e-9,
              1.14291, 0.708622, -907597e-11, 0.45304, 141962e-10, 0.711162,
              -228911e-9, 0.454662, 358052e-9, 0.709812, -914446e-9, 0.453797,
              0.00143034, 0.709865, -0.00205819, 0.453834, 0.00321935, 0.709864,
              -0.00365894, 0.453833, 0.00572331, 0.709855, -0.00571692,
              0.453826, 0.00894278, 0.709862, -0.00823201, 0.453828, 0.012878,
              0.709875, -0.011204, 0.453832, 0.0175295, 0.709896, -0.0146323,
              0.453839, 0.0228978, 0.709925, -0.0185163, 0.453847, 0.0289839,
              0.709974, -0.0228551, 0.453866, 0.0357894, 0.710045, -0.0276473,
              0.453892, 0.0433161, 0.710133, -0.032891, 0.453924, 0.0515665,
              0.710292, -0.0385851, 0.453992, 0.0605458, 0.710485, -0.0447254,
              0.45407, 0.0702574, 0.710769, -0.0513051, 0.454192, 0.0807077,
              0.711106, -0.0582733, 0.454329, 0.091896, 0.711516, -0.0652866,
              0.45446, 0.103814, 0.712071, -0.0728426, 0.454653, 0.116508,
              0.712676, -0.0808307, 0.45484, 0.129968, 0.713476, -0.0892216,
              0.455096, 0.144206, 0.714377, -0.0979047, 0.455346, 0.159212,
              0.715579, -0.106531, 0.455647, 0.174973, 0.716977, -0.115492,
              0.455961, 0.191504, 0.71862, -0.124821, 0.456315, 0.208835,
              0.72084, -0.134079, 0.4568, 0.226869, 0.723786, -0.143427,
              0.457521, 0.245582, 0.727464, -0.153061, 0.458475, 0.264957,
              0.732771, -0.162768, 0.460239, 0.284948, 0.736515, -0.172627,
              0.460899, 0.30522, 0.743519, -0.182487, 0.463225, 0.326717,
              0.750041, -0.191295, 0.464027, 0.350113, 0.758589, -0.199746,
              0.465227, 0.374782, 0.767703, -0.207584, 0.465877, 0.400226,
              0.777484, -0.214973, 0.465996, 0.426442, 0.788792, -0.221796,
              0.466019, 0.453688, 0.800194, -0.228038, 0.465083, 0.481246,
              0.811234, -0.233346, 0.462506, 0.509086, 0.822859, -0.238073,
              0.459257, 0.537338, 0.835082, -0.241764, 0.454863, 0.566108,
              0.846332, -0.244241, 0.448163, 0.595126, 0.858355, -0.244736,
              0.439709, 0.625574, 0.87034, -0.244278, 0.429837, 0.65617,
              0.881027, -0.24255, 0.418002, 0.686029, 0.891007, -0.239912,
              0.404325, 0.716039, 0.900874, -0.236133, 0.389222, 0.745518,
              0.911072, -0.230672, 0.373269, 0.775026, 0.920359, -0.22356,
              0.355083, 0.804521, 0.928604, -0.215591, 0.335533, 0.834045,
              0.937175, -0.206503, 0.315278, 0.861612, 0.942825, -0.196684,
              0.293653, 0.889131, 0.949805, -0.185116, 0.271503, 0.916853,
              0.955535, -0.172703, 0.248821, 0.943541, 0.959843, -0.159978,
              0.225591, 0.970132, 0.964393, -0.146375, 0.202719, 0.994709,
              0.968008, -0.131269, 0.179928, 1.0186, 0.971013, -0.11569,
              0.158007, 1.03928, 0.973334, -0.1003, 0.13624, 1.05887, 0.975775,
              -0.0833352, 0.1138, 1.07652, 0.979579, -0.0668981, 0.0913141,
              1.09297, 0.984323, -0.0500902, 0.0683051, 1.10734, 0.990351,
              -0.0332377, 0.0451771, 1.12084, 0.995823, -0.0161491, 0.0221705,
              1.13296, 1.0001, 234083e-9, -108712e-9, 1.14441, 0.683895,
              -924677e-11, 0.46015, 137429e-10, 0.68833, -233383e-9, 0.463134,
              346865e-9, 0.688368, -933547e-9, 0.463159, 0.00138748, 0.688367,
              -0.00210049, 0.463159, 0.00312187, 0.688369, -0.00373415,
              0.463159, 0.00555004, 0.688377, -0.00583449, 0.463163, 0.00867216,
              0.688386, -0.00840128, 0.463166, 0.0124884, 0.688398, -0.0114343,
              0.463169, 0.0169993, 0.688418, -0.0149329, 0.463175, 0.0222054,
              0.688453, -0.0188964, 0.463188, 0.028108, 0.688515, -0.0233239,
              0.463214, 0.0347085, 0.68857, -0.0282136, 0.463231, 0.0420091,
              0.688679, -0.033564, 0.463276, 0.0500132, 0.688854, -0.0393733,
              0.463356, 0.0587255, 0.689038, -0.0456354, 0.46343, 0.0681476,
              0.689321, -0.0523433, 0.463553, 0.0782897, 0.689662, -0.059412,
              0.463693, 0.0891501, 0.690188, -0.0665736, 0.4639, 0.100735,
              0.690755, -0.0743106, 0.464107, 0.113074, 0.691405, -0.0824722,
              0.464329, 0.126161, 0.692198, -0.0910484, 0.464585, 0.140007,
              0.693196, -0.0998778, 0.464893, 0.154612, 0.69454, -0.108651,
              0.465285, 0.169984, 0.695921, -0.117855, 0.465596, 0.186106,
              0.697749, -0.12734, 0.466056, 0.203034, 0.700375, -0.136714,
              0.466771, 0.220703, 0.703395, -0.146386, 0.467579, 0.239062,
              0.707904, -0.156096, 0.469067, 0.258188, 0.711673, -0.165904,
              0.469851, 0.277759, 0.717489, -0.175812, 0.471815, 0.297935,
              0.724051, -0.185931, 0.47389, 0.318916, 0.731965, -0.195238,
              0.47587, 0.341591, 0.741151, -0.204021, 0.477523, 0.366062,
              0.751416, -0.212113, 0.478881, 0.391396, 0.761848, -0.21979,
              0.479226, 0.417599, 0.771886, -0.2267, 0.478495, 0.444401,
              0.783998, -0.232991, 0.477622, 0.472084, 0.796523, -0.238645,
              0.475833, 0.500193, 0.808851, -0.243396, 0.472568, 0.52865,
              0.821191, -0.247226, 0.467857, 0.557362, 0.834261, -0.250102,
              0.461871, 0.586768, 0.846762, -0.251056, 0.453543, 0.617085,
              0.859867, -0.250604, 0.443494, 0.647659, 0.871948, -0.248783,
              0.431711, 0.678119, 0.882967, -0.245855, 0.417911, 0.708399,
              0.892826, -0.242168, 0.401993, 0.738256, 0.90332, -0.237062,
              0.385371, 0.767999, 0.913633, -0.22997, 0.366837, 0.798191,
              0.922774, -0.221687, 0.346372, 0.827756, 0.931371, -0.212345,
              0.325682, 0.856425, 0.938929, -0.20206, 0.303665, 0.884299,
              0.944821, -0.190981, 0.280786, 0.912023, 0.951792, -0.178065,
              0.2573, 0.939669, 0.957712, -0.164634, 0.233448, 0.96655,
              0.961912, -0.150863, 0.209504, 0.992366, 0.966382, -0.13577,
              0.18597, 1.01633, 0.969588, -0.119593, 0.162905, 1.03843,
              0.971777, -0.103203, 0.14053, 1.05841, 0.97433, -0.0865888,
              0.117909, 1.07632, 0.978686, -0.0690829, 0.0944101, 1.09326,
              0.983281, -0.0516568, 0.0705671, 1.10796, 0.989562, -0.034558,
              0.0468592, 1.12182, 0.995465, -0.0167808, 0.0229846, 1.1342,
              0.999991, 373016e-9, -235606e-9, 1.1459, 0.662251, -939016e-11,
              0.468575, 132714e-10, 0.666634, -237624e-9, 0.471675, 335842e-9,
              0.666411, -950385e-9, 0.471516, 0.00134321, 0.666399, -0.00213833,
              0.471509, 0.00302221, 0.666386, -0.0038014, 0.471499, 0.00537283,
              0.666405, -0.00593958, 0.471511, 0.00839533, 0.666406,
              -0.00855253, 0.471508, 0.0120898, 0.666428, -0.0116401, 0.471519,
              0.0164569, 0.666444, -0.0152015, 0.471522, 0.0214971, 0.66649,
              -0.0192362, 0.471543, 0.027212, 0.666537, -0.0237428, 0.471558,
              0.033603, 0.666617, -0.0287198, 0.471591, 0.0406728, 0.666718,
              -0.0341647, 0.471631, 0.0484238, 0.666889, -0.0400759, 0.47171,
              0.0568621, 0.667104, -0.0464479, 0.471805, 0.0659915, 0.667374,
              -0.0532677, 0.471923, 0.0758178, 0.667772, -0.0603805, 0.472098,
              0.0863425, 0.668371, -0.0677392, 0.472363, 0.0975917, 0.668971,
              -0.0756028, 0.472596, 0.109567, 0.669696, -0.0839293, 0.472869,
              0.122272, 0.670481, -0.0926683, 0.473126, 0.135718, 0.6715,
              -0.1016, 0.473442, 0.149914, 0.672911, -0.110566, 0.47389,
              0.164882, 0.674512, -0.119984, 0.474354, 0.180602, 0.67651,
              -0.129574, 0.474922, 0.19711, 0.679292, -0.139106, 0.475764,
              0.214371, 0.682798, -0.148993, 0.476886, 0.232405, 0.686955,
              -0.158737, 0.478179, 0.251153, 0.691406, -0.168754, 0.479432,
              0.270436, 0.697438, -0.178703, 0.481481, 0.290374, 0.704761,
              -0.188955, 0.484143, 0.311044, 0.713599, -0.198814, 0.487007,
              0.333003, 0.723194, -0.207869, 0.488962, 0.357144, 0.732601,
              -0.216189, 0.489815, 0.382169, 0.744193, -0.22398, 0.490888,
              0.408227, 0.754907, -0.231156, 0.490355, 0.434928, 0.767403,
              -0.23747, 0.489548, 0.462599, 0.78107, -0.243503, 0.488274,
              0.490908, 0.793893, -0.248114, 0.484843, 0.519421, 0.807296,
              -0.25222, 0.4803, 0.548561, 0.820529, -0.255265, 0.474097,
              0.577772, 0.833716, -0.256741, 0.466041, 0.607782, 0.848403,
              -0.25637, 0.456547, 0.638807, 0.860755, -0.254804, 0.443946,
              0.670058, 0.874012, -0.251834, 0.430852, 0.700749, 0.885619,
              -0.247867, 0.414903, 0.731446, 0.896069, -0.242634, 0.397276,
              0.761191, 0.906266, -0.236093, 0.378535, 0.791053, 0.916759,
              -0.227543, 0.358038, 0.821298, 0.92523, -0.21783, 0.335705,
              0.850747, 0.93436, -0.207534, 0.313797, 0.879258, 0.941631,
              -0.195983, 0.289671, 0.907734, 0.947564, -0.183567, 0.265319,
              0.935206, 0.953681, -0.169345, 0.240815, 0.962739, 0.960008,
              -0.154909, 0.216119, 0.989227, 0.964145, -0.140161, 0.192096,
              1.01465, 0.968171, -0.123411, 0.167855, 1.03737, 0.969859,
              -0.106525, 0.144817, 1.05767, 0.972666, -0.0891023, 0.12149,
              1.0761, 0.977055, -0.0718094, 0.0975306, 1.09336, 0.982527,
              -0.0534213, 0.0730217, 1.10878, 0.989001, -0.0355579, 0.0483366,
              1.12285, 0.99512, -0.0176383, 0.023938, 1.13548, 1.00007,
              368831e-9, -211581e-9, 1.14744, 0.651047, -960845e-11, 0.484101,
              12922e-9, 0.644145, -241347e-9, 0.478968, 324578e-9, 0.64396,
              -965142e-9, 0.478831, 0.00129798, 0.64396, -0.00217154, 0.47883,
              0.00292046, 0.643968, -0.00386049, 0.478835, 0.00519202, 0.643974,
              -0.00603186, 0.478838, 0.0081128, 0.643977, -0.0086854, 0.478836,
              0.011683, 0.643982, -0.0118207, 0.478834, 0.0159031, 0.644024,
              -0.0154374, 0.478856, 0.0207743, 0.644059, -0.0195343, 0.478868,
              0.0262975, 0.644122, -0.0241103, 0.478896, 0.0324747, 0.644207,
              -0.0291638, 0.478933, 0.039309, 0.64432, -0.0346919, 0.478981,
              0.0468029, 0.644481, -0.0406919, 0.479053, 0.0549614, 0.644722,
              -0.047159, 0.479169, 0.0637909, 0.645013, -0.0540748, 0.479302,
              0.0732974, 0.645503, -0.0612001, 0.479541, 0.0834898, 0.646117,
              -0.0687303, 0.479829, 0.0943873, 0.646707, -0.0767846, 0.480061,
              0.105991, 0.647431, -0.0852465, 0.480343, 0.11831, 0.64831,
              -0.0940719, 0.48066, 0.131348, 0.649486, -0.103056, 0.481083,
              0.14514, 0.650864, -0.112261, 0.481528, 0.159676, 0.652604,
              -0.121852, 0.482102, 0.174979, 0.654825, -0.131505, 0.482813,
              0.191079, 0.657876, -0.141189, 0.483876, 0.207927, 0.661339,
              -0.151239, 0.48499, 0.225586, 0.665463, -0.161091, 0.486279,
              0.243947, 0.670542, -0.171235, 0.487968, 0.262957, 0.677361,
              -0.181347, 0.49053, 0.282781, 0.685672, -0.191679, 0.493862,
              0.303311, 0.694551, -0.201781, 0.49699, 0.324607, 0.703753,
              -0.211164, 0.498884, 0.347916, 0.713703, -0.219675, 0.500086,
              0.372628, 0.725911, -0.227836, 0.501554, 0.398694, 0.73862,
              -0.23533, 0.502193, 0.425529, 0.752118, -0.241786, 0.501811,
              0.453209, 0.76579, -0.247865, 0.500185, 0.481381, 0.779568,
              -0.252696, 0.497159, 0.51011, 0.793991, -0.256802, 0.492765,
              0.539322, 0.808182, -0.259942, 0.486827, 0.569078, 0.821698,
              -0.261703, 0.478386, 0.598818, 0.836009, -0.262006, 0.468772,
              0.629762, 0.849824, -0.260333, 0.456352, 0.661366, 0.863888,
              -0.257398, 0.442533, 0.69295, 0.876585, -0.253264, 0.426573,
              0.723608, 0.888665, -0.248026, 0.408964, 0.754378, 0.899537,
              -0.241487, 0.389677, 0.784761, 0.9094, -0.233463, 0.368516,
              0.814688, 0.920166, -0.223397, 0.346624, 0.845009, 0.928899,
              -0.21255, 0.322717, 0.874431, 0.937156, -0.200869, 0.298698,
              0.902922, 0.943861, -0.188387, 0.273491, 0.931356, 0.949557,
              -0.174341, 0.247866, 0.958854, 0.955862, -0.158994, 0.222496,
              0.986098, 0.961721, -0.143664, 0.197522, 1.01229, 0.965976,
              -0.127412, 0.17302, 1.03571, 0.968652, -0.109798, 0.148954,
              1.05699, 0.971084, -0.0916787, 0.125044, 1.07587, 0.975584,
              -0.0739634, 0.100577, 1.09372, 0.98122, -0.055322, 0.0753666,
              1.10948, 0.988253, -0.0366825, 0.0498899, 1.12394, 0.99482,
              -0.0180389, 0.024611, 1.13694, 1.00001, 229839e-9, -188283e-9,
              1.14919, 0.613867, -964198e-11, 0.479449, 123452e-10, 0.621485,
              -244534e-9, 0.485399, 313091e-9, 0.621429, -978202e-9, 0.485353,
              0.00125245, 0.62112, -0.00220004, 0.485114, 0.00281687, 0.621119,
              -0.0039111, 0.485112, 0.00500783, 0.621122, -0.00611091, 0.485112,
              0.00782498, 0.621133, -0.00879922, 0.485117, 0.0112687, 0.621152,
              -0.0119756, 0.485125, 0.0153394, 0.621183, -0.0156396, 0.485139,
              0.0200382, 0.621227, -0.0197898, 0.485158, 0.0253663, 0.621298,
              -0.0244253, 0.485192, 0.0313261, 0.621388, -0.0295441, 0.485233,
              0.0379204, 0.621507, -0.0351432, 0.485286, 0.0451523, 0.621693,
              -0.0412198, 0.485378, 0.0530277, 0.621933, -0.0477673, 0.485495,
              0.0615522, 0.622232, -0.0547574, 0.485635, 0.0707316, 0.622809,
              -0.0619417, 0.485943, 0.0805883, 0.623407, -0.069625, 0.486232,
              0.0911267, 0.62406, -0.077796, 0.486516, 0.102354, 0.624835,
              -0.0863731, 0.486838, 0.114279, 0.625758, -0.095251, 0.487188,
              0.126902, 0.627043, -0.104299, 0.487695, 0.140285, 0.628438,
              -0.113724, 0.488163, 0.154397, 0.630325, -0.123417, 0.488858,
              0.169267, 0.632801, -0.133137, 0.489754, 0.184941, 0.635784,
              -0.143052, 0.490815, 0.20136, 0.639406, -0.153132, 0.492048,
              0.218643, 0.643872, -0.163143, 0.49363, 0.236615, 0.6499,
              -0.17333, 0.496009, 0.255449, 0.657201, -0.183622, 0.498994,
              0.275006, 0.666221, -0.194019, 0.502888, 0.295354, 0.674419,
              -0.204192, 0.505459, 0.316244, 0.683729, -0.21406, 0.507771,
              0.33849, 0.695584, -0.222854, 0.510245, 0.363166, 0.708583,
              -0.231315, 0.512293, 0.389071, 0.721233, -0.238911, 0.512747,
              0.415737, 0.735134, -0.245657, 0.512482, 0.443331, 0.750179,
              -0.251879, 0.511526, 0.471891, 0.765073, -0.256911, 0.508935,
              0.500892, 0.779794, -0.261144, 0.504341, 0.530294, 0.794801,
              -0.264316, 0.498515, 0.560144, 0.810339, -0.266276, 0.491015,
              0.590213, 0.824818, -0.266981, 0.481126, 0.620865, 0.839375,
              -0.265778, 0.468685, 0.652687, 0.853043, -0.262748, 0.453925,
              0.684759, 0.867335, -0.258474, 0.437912, 0.716209, 0.88037,
              -0.253187, 0.419648, 0.747508, 0.891711, -0.246476, 0.39982,
              0.77797, 0.902896, -0.238735, 0.37879, 0.808586, 0.913601,
              -0.22885, 0.355891, 0.838843, 0.923019, -0.217656, 0.331773,
              0.869014, 0.933432, -0.205539, 0.307356, 0.898512, 0.939691,
              -0.192595, 0.281321, 0.9269, 0.946938, -0.178945, 0.255441,
              0.955297, 0.952372, -0.163587, 0.229013, 0.983231, 0.95909,
              -0.147214, 0.203179, 1.00971, 0.963675, -0.13064, 0.17792,
              1.03438, 0.968247, -0.113121, 0.152898, 1.05625, 0.97001,
              -0.0945824, 0.128712, 1.07598, 0.974458, -0.0755648, 0.103349,
              1.094, 0.980168, -0.0571998, 0.0776731, 1.1104, 0.987295,
              -0.0377994, 0.0514445, 1.12491, 0.994432, -0.0186417, 0.025429,
              1.13851, 0.999975, 542714e-9, -282356e-9, 1.15108, 0.592656,
              -980249e-11, 0.486018, 119532e-10, 0.598467, -247275e-9, 0.490781,
              301531e-9, 0.597934, -988317e-9, 0.490343, 0.00120517, 0.597903,
              -0.00222366, 0.490319, 0.0027116, 0.597913, -0.00395315, 0.490327,
              0.00482077, 0.597919, -0.00617653, 0.490329, 0.00753264, 0.597936,
              -0.00889375, 0.490339, 0.0108478, 0.597956, -0.0121043, 0.490347,
              0.0147668, 0.597992, -0.0158073, 0.490365, 0.0192905, 0.598032,
              -0.0200017, 0.490382, 0.0244204, 0.598109, -0.0246865, 0.49042,
              0.0301593, 0.598215, -0.0298594, 0.490474, 0.03651, 0.59833,
              -0.0355167, 0.490524, 0.0434757, 0.598525, -0.0416559, 0.490624,
              0.0510629, 0.598778, -0.0482692, 0.490753, 0.0592781, 0.599135,
              -0.0553114, 0.49094, 0.0681304, 0.599802, -0.062542, 0.491328,
              0.0776467, 0.600361, -0.0703638, 0.491598, 0.0878184, 0.60101,
              -0.0786256, 0.491882, 0.0986573, 0.601811, -0.0872962, 0.492232,
              0.11018, 0.602861, -0.0962284, 0.492684, 0.1224, 0.604167,
              -0.10538, 0.493213, 0.135354, 0.605693, -0.114896, 0.493799,
              0.149034, 0.607682, -0.124654, 0.494576, 0.163469, 0.610672,
              -0.13456, 0.4959, 0.178747, 0.613313, -0.144581, 0.496713,
              0.194723, 0.617603, -0.154703, 0.498499, 0.211617, 0.622174,
              -0.16489, 0.500188, 0.229183, 0.628855, -0.175164, 0.503072,
              0.247786, 0.636963, -0.185565, 0.506798, 0.267116, 0.644866,
              -0.195911, 0.509719, 0.28702, 0.653741, -0.206104, 0.512776,
              0.307763, 0.664942, -0.216447, 0.516812, 0.329631, 0.67633,
              -0.22552, 0.519181, 0.353515, 0.690012, -0.234316, 0.521681,
              0.379226, 0.704243, -0.242032, 0.523129, 0.405901, 0.719396,
              -0.249172, 0.523768, 0.433585, 0.734471, -0.255543, 0.522541,
              0.462085, 0.750539, -0.260697, 0.520217, 0.491233, 0.766365,
              -0.26501, 0.516293, 0.521094, 0.781677, -0.268409, 0.509708,
              0.551014, 0.797132, -0.270399, 0.501944, 0.581463, 0.812655,
              -0.271247, 0.492025, 0.612402, 0.828592, -0.270708, 0.480424,
              0.643798, 0.844044, -0.268085, 0.465955, 0.67682, 0.857305,
              -0.263459, 0.448425, 0.708496, 0.87114, -0.258151, 0.430243,
              0.74046, 0.884936, -0.251171, 0.410578, 0.771583, 0.895772,
              -0.243305, 0.38862, 0.802234, 0.906961, -0.234037, 0.365214,
              0.833179, 0.917775, -0.222714, 0.34116, 0.86353, 0.927883,
              -0.210175, 0.31572, 0.893557, 0.936617, -0.196925, 0.289159,
              0.922976, 0.943384, -0.182788, 0.261996, 0.951606, 0.949713,
              -0.167965, 0.235324, 0.979958, 0.955818, -0.151109, 0.208408,
              1.00765, 0.961344, -0.133834, 0.182591, 1.03329, 0.965469,
              -0.115987, 0.156958, 1.0557, 0.968693, -0.09746, 0.132239,
              1.07583, 0.973165, -0.0778514, 0.106195, 1.09451, 0.979387,
              -0.0585067, 0.0797669, 1.11137, 0.98671, -0.0390409, 0.0530263,
              1.12643, 0.994093, -0.019408, 0.0263163, 1.14016, 1.00002,
              540029e-9, -194487e-9, 1.15299, 0.574483, -989066e-11, 0.494533,
              114896e-10, 0.574478, -249127e-9, 0.494528, 289403e-9, 0.574607,
              -996811e-9, 0.494637, 0.00115797, 0.574396, -0.00224241, 0.494458,
              0.00260498, 0.574377, -0.00398632, 0.49444, 0.00463102, 0.574386,
              -0.00622836, 0.494445, 0.00723623, 0.574401, -0.0089683, 0.494453,
              0.010421, 0.574419, -0.0122056, 0.49446, 0.0141859, 0.574459,
              -0.0159396, 0.494481, 0.0185322, 0.574525, -0.0201692, 0.49452,
              0.0234617, 0.574587, -0.0248924, 0.494547, 0.0289762, 0.574697,
              -0.0301074, 0.494604, 0.0350797, 0.574853, -0.0358114, 0.494688,
              0.0417767, 0.575027, -0.041999, 0.494772, 0.0490718, 0.575294,
              -0.0486618, 0.494915, 0.0569728, 0.575733, -0.0557148, 0.495173,
              0.0654955, 0.576356, -0.0630489, 0.495537, 0.0746612, 0.576944,
              -0.0709285, 0.495836, 0.0844615, 0.57765, -0.0792723, 0.496177,
              0.0949142, 0.578491, -0.0880167, 0.496563, 0.10603, 0.579639,
              -0.0969462, 0.497096, 0.117841, 0.580989, -0.10622, 0.497684,
              0.130367, 0.582587, -0.115861, 0.498337, 0.143609, 0.584951,
              -0.125605, 0.499414, 0.157625, 0.587602, -0.135608, 0.500518,
              0.172413, 0.59076, -0.145742, 0.501767, 0.187999, 0.594992,
              -0.155934, 0.503542, 0.20445, 0.600656, -0.166303, 0.506135,
              0.221764, 0.607816, -0.176681, 0.509542, 0.24002, 0.61522,
              -0.187071, 0.51263, 0.258992, 0.623702, -0.197465, 0.516021,
              0.278773, 0.634192, -0.207816, 0.520422, 0.299377, 0.644936,
              -0.218183, 0.524073, 0.320802, 0.657888, -0.2278, 0.528049,
              0.34384, 0.670666, -0.236747, 0.52986, 0.36916, 0.685626,
              -0.24484, 0.531892, 0.395867, 0.701304, -0.252071, 0.532727,
              0.423488, 0.717727, -0.258714, 0.532146, 0.452201, 0.733914,
              -0.264211, 0.529883, 0.481579, 0.750529, -0.26859, 0.5259,
              0.511558, 0.76747, -0.272046, 0.51999, 0.542042, 0.785189,
              -0.274225, 0.513083, 0.572799, 0.800954, -0.275189, 0.502936,
              0.603816, 0.816962, -0.274946, 0.490921, 0.635461, 0.83336,
              -0.272695, 0.47684, 0.6676, 0.848143, -0.268223, 0.459405,
              0.70051, 0.861818, -0.262768, 0.440319, 0.732902, 0.876828,
              -0.255872, 0.420123, 0.765084, 0.889312, -0.247703, 0.398379,
              0.796391, 0.900412, -0.238381, 0.374496, 0.827333, 0.912251,
              -0.227783, 0.349874, 0.858385, 0.921792, -0.214832, 0.323181,
              0.888652, 0.931273, -0.200949, 0.296624, 0.917763, 0.940295,
              -0.186537, 0.269211, 0.947878, 0.946812, -0.171538, 0.241447,
              0.977016, 0.953588, -0.155254, 0.213829, 1.00501, 0.958841,
              -0.137156, 0.186807, 1.03179, 0.963746, -0.118699, 0.160706,
              1.05502, 0.966468, -0.0998358, 0.135504, 1.07568, 0.971178,
              -0.0805186, 0.109131, 1.09479, 0.97831, -0.0599348, 0.0818293,
              1.1123, 0.985886, -0.0399661, 0.0545872, 1.12771, 0.994021,
              -0.0198682, 0.0269405, 1.14186, 1.00009, 271022e-9, -12989e-8,
              1.15514, 0.538716, -990918e-11, 0.486732, 109675e-10, 0.550656,
              -250642e-9, 0.497518, 277412e-9, 0.55057, -0.00100265, 0.497441,
              0.00110974, 0.550903, -0.00225672, 0.497733, 0.00249779, 0.550568,
              -0.00401046, 0.497438, 0.00443906, 0.550574, -0.00626613, 0.49744,
              0.00693637, 0.550591, -0.0090226, 0.497449, 0.00998921, 0.550623,
              -0.0122795, 0.497469, 0.0135984, 0.550667, -0.0160361, 0.497495,
              0.0177654, 0.550724, -0.0202908, 0.497526, 0.0224915, 0.550792,
              -0.0250421, 0.497557, 0.0277795, 0.550918, -0.0302878, 0.49763,
              0.0336334, 0.551058, -0.0360241, 0.497701, 0.0400573, 0.551276,
              -0.0422473, 0.497824, 0.0470585, 0.551551, -0.0489441, 0.497977,
              0.0546433, 0.552074, -0.0559596, 0.498312, 0.0628367, 0.552681,
              -0.0633978, 0.498679, 0.071646, 0.553324, -0.0713176, 0.499031,
              0.0810746, 0.554011, -0.0797268, 0.499365, 0.091129, 0.55488,
              -0.0885238, 0.499779, 0.101837, 0.556171, -0.0974417, 0.500444,
              0.113239, 0.557498, -0.106841, 0.501025, 0.125316, 0.559299,
              -0.116533, 0.501864, 0.138128, 0.561647, -0.126298, 0.502967,
              0.151695, 0.564347, -0.136388, 0.504129, 0.16604, 0.567863,
              -0.146576, 0.505713, 0.181207, 0.572569, -0.156832, 0.507953,
              0.197259, 0.578919, -0.167323, 0.511186, 0.214258, 0.585387,
              -0.177712, 0.514042, 0.232038, 0.593134, -0.188184, 0.517484,
              0.250733, 0.603295, -0.198717, 0.522345, 0.270454, 0.613854,
              -0.209177, 0.526751, 0.290807, 0.626092, -0.219644, 0.531595,
              0.312202, 0.637868, -0.229494, 0.534721, 0.334435, 0.652458,
              -0.238718, 0.538304, 0.359184, 0.666985, -0.247061, 0.539875,
              0.385637, 0.683301, -0.254652, 0.541042, 0.41328, 0.69998,
              -0.261376, 0.540735, 0.441903, 0.717824, -0.267085, 0.539139,
              0.471609, 0.734617, -0.271465, 0.534958, 0.501446, 0.753663,
              -0.27528, 0.53032, 0.532571, 0.770512, -0.277617, 0.522134,
              0.563641, 0.787356, -0.278525, 0.51206, 0.595067, 0.806252,
              -0.278512, 0.50119, 0.627226, 0.822061, -0.277023, 0.486791,
              0.659402, 0.838959, -0.273175, 0.470467, 0.692874, 0.85379,
              -0.267238, 0.450688, 0.725702, 0.868268, -0.260327, 0.429741,
              0.75832, 0.881994, -0.251946, 0.407223, 0.790189, 0.893885,
              -0.242432, 0.383214, 0.821625, 0.905118, -0.231904, 0.357297,
              0.853011, 0.916045, -0.219545, 0.330733, 0.883773, 0.927614,
              -0.205378, 0.303916, 0.914435, 0.936005, -0.190388, 0.275941,
              0.944502, 0.944533, -0.1749, 0.247493, 0.974439, 0.950758,
              -0.158588, 0.218996, 1.00286, 0.957078, -0.141027, 0.191559,
              1.0304, 0.962448, -0.121507, 0.164457, 1.05466, 0.964993,
              -0.102068, 0.138636, 1.0761, 0.970017, -0.0822598, 0.111861,
              1.09541, 0.97661, -0.062033, 0.0843438, 1.11317, 0.985073,
              -0.0409832, 0.0558496, 1.12911, 0.993515, -0.020146, 0.0275331,
              1.1438, 1.00006, 27329e-8, -107883e-9, 1.15736, 0.525324,
              -999341e-11, 0.498153, 105385e-10, 0.526513, -251605e-9, 0.499277,
              265329e-9, 0.526517, -0.00100641, 0.499282, 0.0010613, 0.526588,
              -0.00226466, 0.499337, 0.00238823, 0.526539, -0.0040255, 0.499302,
              0.00424535, 0.526547, -0.00628954, 0.499306, 0.00663364, 0.526561,
              -0.00905628, 0.499313, 0.00955337, 0.526593, -0.0123253, 0.499334,
              0.0130054, 0.526642, -0.0160957, 0.499365, 0.0169911, 0.5267,
              -0.0203661, 0.499396, 0.0215122, 0.526792, -0.0251347, 0.499451,
              0.0265718, 0.526904, -0.0303985, 0.499511, 0.0321732, 0.527079,
              -0.0361554, 0.499617, 0.0383231, 0.527285, -0.0423982, 0.499731,
              0.045026, 0.527602, -0.0491121, 0.499924, 0.0522936, 0.528166,
              -0.0561127, 0.500306, 0.0601528, 0.52879, -0.0635988, 0.5007,
              0.0686059, 0.529421, -0.071581, 0.501048, 0.0776518, 0.530144,
              -0.0799854, 0.501421, 0.0873148, 0.531062, -0.0888032, 0.501884,
              0.0976084, 0.532374, -0.0977643, 0.50259, 0.108588, 0.533828,
              -0.107197, 0.50329, 0.120234, 0.53581, -0.116887, 0.504312,
              0.132602, 0.538063, -0.126755, 0.505365, 0.145721, 0.5409,
              -0.136819, 0.506668, 0.159617, 0.544882, -0.147117, 0.508731,
              0.174369, 0.550238, -0.157446, 0.511601, 0.190028, 0.556038,
              -0.167988, 0.514431, 0.206587, 0.563031, -0.178364, 0.517808,
              0.224046, 0.571543, -0.189007, 0.521937, 0.242503, 0.582255,
              -0.199546, 0.527415, 0.261977, 0.59272, -0.210084, 0.531682,
              0.282162, 0.605648, -0.220448, 0.537123, 0.303426, 0.61785,
              -0.230593, 0.540664, 0.325323, 0.632223, -0.240238, 0.544467,
              0.348993, 0.648819, -0.24887, 0.547594, 0.375462, 0.665825,
              -0.256657, 0.54912, 0.403024, 0.683389, -0.263711, 0.549294,
              0.431773, 0.701495, -0.269666, 0.547649, 0.461494, 0.719197,
              -0.274169, 0.543786, 0.491623, 0.737906, -0.278124, 0.538644,
              0.522994, 0.756652, -0.280632, 0.531057, 0.554775, 0.775279,
              -0.281741, 0.521972, 0.586441, 0.792688, -0.281652, 0.509613,
              0.618596, 0.811894, -0.280345, 0.496497, 0.651462, 0.827938,
              -0.277128, 0.47968, 0.684023, 0.844837, -0.271646, 0.460688,
              0.718024, 0.859239, -0.264397, 0.438872, 0.751207, 0.874088,
              -0.256144, 0.41577, 0.784232, 0.887693, -0.246311, 0.391369,
              0.816191, 0.899402, -0.235497, 0.365872, 0.847828, 0.910973,
              -0.223631, 0.338618, 0.87934, 0.92204, -0.209874, 0.310803,
              0.910325, 0.930987, -0.194265, 0.281802, 0.940695, 0.94,
              -0.178125, 0.252836, 0.970958, 0.948018, -0.161479, 0.224239,
              1.00078, 0.955141, -0.144038, 0.195857, 1.0288, 0.960513,
              -0.124915, 0.168487, 1.05371, 0.963964, -0.104284, 0.141495,
              1.07596, 0.968713, -0.0838732, 0.114437, 1.09628, 0.975524,
              -0.0635579, 0.0863105, 1.11448, 0.98431, -0.042291, 0.0574774,
              1.13069, 0.992916, -0.0209131, 0.0284343, 1.14568, 0.999926,
              743097e-9, -379265e-9, 1.15955, 0.501042, -998428e-11, 0.498726,
              100306e-10, 0.502992, -252112e-9, 0.500665, 253283e-9, 0.502417,
              -0.00100791, 0.500092, 0.00101259, 0.502965, -0.00226919,
              0.500621, 0.00227978, 0.502318, -0.00403109, 0.499994, 0.00405011,
              0.502333, -0.00629832, 0.500005, 0.00632868, 0.502362,
              -0.00906907, 0.500027, 0.00911446, 0.502369, -0.0123423, 0.500023,
              0.0124078, 0.50243, -0.0161178, 0.500066, 0.016211, 0.502493,
              -0.0203937, 0.500103, 0.0205256, 0.502592, -0.0251684, 0.500166,
              0.0253548, 0.502707, -0.0304389, 0.50023, 0.0307029, 0.502881,
              -0.0362015, 0.500335, 0.0365753, 0.503124, -0.0424507, 0.500488,
              0.0429798, 0.503443, -0.0491582, 0.500686, 0.0499268, 0.504083,
              -0.0561476, 0.501155, 0.0574541, 0.504668, -0.0636846, 0.501524,
              0.0655408, 0.505319, -0.0716834, 0.501904, 0.0742072, 0.50609,
              -0.0800925, 0.502321, 0.0834699, 0.507122, -0.0888425, 0.502896,
              0.0933603, 0.508414, -0.097855, 0.503603, 0.10391, 0.509955,
              -0.107304, 0.504416, 0.115113, 0.512061, -0.116921, 0.505565,
              0.127054, 0.514419, -0.12689, 0.506732, 0.139709, 0.517529,
              -0.136934, 0.508338, 0.153173, 0.522085, -0.147327, 0.510987,
              0.167528, 0.526986, -0.157612, 0.513527, 0.182708, 0.533122,
              -0.168213, 0.516717, 0.198881, 0.540807, -0.178688, 0.520832,
              0.215986, 0.550687, -0.189511, 0.52632, 0.234335, 0.560567,
              -0.199998, 0.531009, 0.253375, 0.571698, -0.210652, 0.535839,
              0.273499, 0.584364, -0.220917, 0.541091, 0.294355, 0.599066,
              -0.23137, 0.546875, 0.316525, 0.614148, -0.241206, 0.551306,
              0.339671, 0.631157, -0.250379, 0.555187, 0.36531, 0.647919,
              -0.258397, 0.556595, 0.392767, 0.666112, -0.265528, 0.556949,
              0.421397, 0.686158, -0.271827, 0.556617, 0.451433, 0.704838,
              -0.27674, 0.552975, 0.482131, 0.723957, -0.280733, 0.547814,
              0.513458, 0.74262, -0.283359, 0.53997, 0.545446, 0.762009,
              -0.284541, 0.530422, 0.57775, 0.781314, -0.284507, 0.518546,
              0.610434, 0.799116, -0.283309, 0.504178, 0.643178, 0.817604,
              -0.280378, 0.48843, 0.676248, 0.83459, -0.275619, 0.469457,
              0.709698, 0.850974, -0.26856, 0.447698, 0.744245, 0.866747,
              -0.260094, 0.424791, 0.777695, 0.881412, -0.249929, 0.399913,
              0.810392, 0.8936, -0.239137, 0.37308, 0.842872, 0.905943,
              -0.226818, 0.345705, 0.874677, 0.916408, -0.213699, 0.31706,
              0.906257, 0.927215, -0.198428, 0.288444, 0.936881, 0.935625,
              -0.181643, 0.258329, 0.96795, 0.944076, -0.164386, 0.228488,
              0.998216, 0.951229, -0.146339, 0.199763, 1.02689, 0.958793,
              -0.127709, 0.172153, 1.0535, 0.963219, -0.107244, 0.144989,
              1.07646, 0.967562, -0.0857764, 0.11685, 1.09675, 0.974866,
              -0.0645377, 0.0880571, 1.11576, 0.983353, -0.0431732, 0.0587352,
              1.13227, 0.992503, -0.0218356, 0.0294181, 1.1478, 1.00003,
              605203e-9, -231013e-9, 1.16207, 0.482935, -101177e-10, 0.504695,
              968142e-11, 0.477554, -251521e-9, 0.499071, 240676e-9, 0.477904,
              -0.00100683, 0.499436, 96342e-8, 0.478368, -0.00226636, 0.499899,
              0.0021687, 0.477977, -0.00402719, 0.499513, 0.00385384, 0.477993,
              -0.00629226, 0.499525, 0.0060221, 0.478011, -0.00906011, 0.499536,
              0.00867289, 0.478051, -0.0123305, 0.499566, 0.0118074, 0.478089,
              -0.016102, 0.499587, 0.0154269, 0.478171, -0.0203736, 0.499645,
              0.0195341, 0.478254, -0.025143, 0.499692, 0.0241318, 0.47839,
              -0.0304071, 0.499779, 0.0292247, 0.478588, -0.0361631, 0.499911,
              0.0348196, 0.478812, -0.0424023, 0.500046, 0.0409231, 0.479208,
              -0.0490724, 0.500326, 0.047552, 0.479841, -0.0560722, 0.500805,
              0.0547377, 0.480392, -0.0636125, 0.501152, 0.0624607, 0.481068,
              -0.0716134, 0.501561, 0.0707473, 0.481898, -0.0800062, 0.502054,
              0.0796118, 0.483022, -0.0886568, 0.502728, 0.0890974, 0.484332,
              -0.0977553, 0.503479, 0.0992099, 0.486126, -0.107173, 0.504546,
              0.10999, 0.488066, -0.11677, 0.50557, 0.121476, 0.490521,
              -0.126725, 0.506849, 0.133672, 0.494232, -0.136793, 0.50911,
              0.146731, 0.498302, -0.147116, 0.511345, 0.160577, 0.503565,
              -0.157446, 0.514344, 0.175335, 0.510902, -0.168121, 0.518824,
              0.191207, 0.519263, -0.178799, 0.523666, 0.208058, 0.528204,
              -0.189407, 0.528296, 0.225875, 0.538854, -0.200145, 0.533724,
              0.244782, 0.551278, -0.210701, 0.539833, 0.264753, 0.565222,
              -0.221303, 0.546131, 0.285745, 0.579403, -0.231688, 0.551496,
              0.307592, 0.595469, -0.241718, 0.556809, 0.330582, 0.610929,
              -0.250992, 0.559641, 0.354995, 0.629433, -0.259602, 0.562379,
              0.382471, 0.648504, -0.267038, 0.563676, 0.411126, 0.66756,
              -0.273388, 0.562092, 0.440924, 0.689143, -0.278788, 0.560807,
              0.472118, 0.709056, -0.282783, 0.555701, 0.503774, 0.729855,
              -0.285836, 0.548698, 0.536364, 0.748954, -0.287078, 0.538544,
              0.56895, 0.768373, -0.287133, 0.526711, 0.601991, 0.78827,
              -0.285839, 0.512511, 0.635403, 0.807465, -0.283238, 0.496323,
              0.668797, 0.825194, -0.27906, 0.477638, 0.702584, 0.842203,
              -0.272286, 0.456253, 0.736393, 0.857749, -0.263854, 0.432412,
              0.77096, 0.874799, -0.253943, 0.407806, 0.80489, 0.887497,
              -0.24237, 0.38033, 0.83771, 0.89966, -0.230278, 0.352446,
              0.870376, 0.911753, -0.21646, 0.323268, 0.902256, 0.923011,
              -0.202071, 0.294314, 0.933306, 0.932375, -0.185519, 0.264104,
              0.965177, 0.940537, -0.167604, 0.234035, 0.996303, 0.948904,
              -0.149068, 0.20412, 1.0261, 0.955263, -0.129539, 0.175431,
              1.05304, 0.960303, -0.109932, 0.148116, 1.07617, 0.965512,
              -0.0880572, 0.119693, 1.09742, 0.973466, -0.0660548, 0.0901619,
              1.11721, 0.98284, -0.0439228, 0.0599875, 1.13436, 0.992216,
              -0.0219588, 0.0298975, 1.15006, 0.999946, 119402e-9, -208547e-10,
              1.16471, 0.447827, -100414e-10, 0.491543, 914833e-11, 0.454778,
              -251257e-9, 0.499172, 22891e-8, 0.453519, -0.00100342, 0.497787,
              914184e-9, 0.45357, -0.00225776, 0.497847, 0.00205701, 0.453578,
              -0.00401371, 0.497855, 0.00365705, 0.45357, -0.00627107, 0.497841,
              0.00571453, 0.453598, -0.00902968, 0.497864, 0.00823019, 0.453627,
              -0.0122888, 0.497882, 0.0112049, 0.453684, -0.0160475, 0.497923,
              0.0146405, 0.453764, -0.0203044, 0.49798, 0.0185394, 0.453866,
              -0.0250576, 0.498049, 0.0229054, 0.453996, -0.0303028, 0.49813,
              0.0277424, 0.454196, -0.0360379, 0.498267, 0.0330587, 0.454457,
              -0.0422521, 0.498445, 0.0388613, 0.454926, -0.0488393, 0.498812,
              0.0451767, 0.455525, -0.0558653, 0.499272, 0.0520153, 0.456074,
              -0.0633772, 0.499625, 0.0593754, 0.456752, -0.0713606, 0.500049,
              0.0672751, 0.457648, -0.07971, 0.500615, 0.0757447, 0.458849,
              -0.0883032, 0.501399, 0.0848231, 0.46029, -0.0974095, 0.502293,
              0.0945135, 0.462, -0.106729, 0.503301, 0.104848, 0.464121,
              -0.116354, 0.504533, 0.115884, 0.466889, -0.126214, 0.506172,
              0.127652, 0.470744, -0.136324, 0.508667, 0.14024, 0.47488,
              -0.146595, 0.510995, 0.153673, 0.480845, -0.157027, 0.514832,
              0.168053, 0.488262, -0.167658, 0.519506, 0.183508, 0.496547,
              -0.178343, 0.524347, 0.199948, 0.506254, -0.188916, 0.52983,
              0.217503, 0.517961, -0.199975, 0.536357, 0.236272, 0.531484,
              -0.210624, 0.543641, 0.256096, 0.545496, -0.221227, 0.550048,
              0.277085, 0.559497, -0.231568, 0.555076, 0.298615, 0.575752,
              -0.241698, 0.560541, 0.321547, 0.591999, -0.251172, 0.564156,
              0.345602, 0.610654, -0.260178, 0.567607, 0.371851, 0.630484,
              -0.268094, 0.56923, 0.40076, 0.651807, -0.274661, 0.569779,
              0.430801, 0.67239, -0.280331, 0.566791, 0.461939, 0.693024,
              -0.284501, 0.562007, 0.493854, 0.715473, -0.287852, 0.555791,
              0.526992, 0.736323, -0.28929, 0.546345, 0.560102, 0.755771,
              -0.289405, 0.534, 0.593543, 0.775424, -0.2881, 0.519114, 0.627256,
              0.795447, -0.285562, 0.502543, 0.661464, 0.815319, -0.281416,
              0.484773, 0.695206, 0.831769, -0.275523, 0.463445, 0.729044,
              0.849464, -0.267516, 0.440269, 0.764069, 0.866775, -0.257584,
              0.415049, 0.799089, 0.881252, -0.245817, 0.388049, 0.831948,
              0.894209, -0.233127, 0.35889, 0.865526, 0.906922, -0.219579,
              0.329915, 0.89818, 0.919686, -0.204491, 0.300441, 0.930013,
              0.929044, -0.188962, 0.269445, 0.962061, 0.938393, -0.171079,
              0.238402, 0.994214, 0.94661, -0.15199, 0.208204, 1.02533,
              0.953095, -0.131953, 0.178653, 1.0529, 0.958644, -0.111233,
              0.150684, 1.0771, 0.963925, -0.0903098, 0.122359, 1.09855,
              0.971995, -0.0680505, 0.0923342, 1.11874, 0.981658, -0.0448512,
              0.0614195, 1.13635, 0.991649, -0.0221931, 0.0303582, 1.15238,
              0.999985, 393403e-9, -111086e-9, 1.16772, 0.396806, -971563e-11,
              0.457671, 842355e-11, 0.429186, -249421e-9, 0.495017, 21625e-8,
              0.429324, -998052e-9, 0.495173, 865322e-9, 0.429175, -0.00224487,
              0.494999, 0.00194637, 0.429129, -0.00399041, 0.494952, 0.00346004,
              0.429153, -0.00623476, 0.494974, 0.00540684, 0.429168, -0.0089773,
              0.494983, 0.00778714, 0.429207, -0.0122175, 0.495012, 0.0106022,
              0.429257, -0.0159542, 0.495047, 0.0138535, 0.429338, -0.0201864,
              0.495106, 0.0175443, 0.429431, -0.0249104, 0.495165, 0.0216774,
              0.429587, -0.0301252, 0.495279, 0.0262594, 0.429796, -0.0358249,
              0.495432, 0.0312968, 0.430065, -0.0419972, 0.495621, 0.0367985,
              0.430588, -0.0485144, 0.496061, 0.042798, 0.43113, -0.0555028,
              0.496472, 0.0492914, 0.431743, -0.0629852, 0.496904, 0.0562907,
              0.432448, -0.0709256, 0.497369, 0.0638056, 0.433414, -0.0791942,
              0.498032, 0.071885, 0.434638, -0.0877346, 0.498854, 0.0805517,
              0.43611, -0.0968056, 0.499812, 0.0898047, 0.437859, -0.106002,
              0.500891, 0.0997142, 0.440017, -0.115648, 0.502198, 0.110289,
              0.443236, -0.125427, 0.504389, 0.121644, 0.44697, -0.135492,
              0.506809, 0.133769, 0.451689, -0.145746, 0.509858, 0.146787,
              0.45811, -0.156219, 0.514247, 0.160793, 0.465305, -0.166834,
              0.518816, 0.175791, 0.474085, -0.177546, 0.524331, 0.191906,
              0.484808, -0.188262, 0.53104, 0.209199, 0.49732, -0.199346,
              0.538511, 0.227825, 0.509693, -0.209951, 0.544554, 0.247269,
              0.524367, -0.220533, 0.551616, 0.267978, 0.539228, -0.231082,
              0.557368, 0.289672, 0.55644, -0.241342, 0.563782, 0.31268,
              0.574204, -0.250964, 0.568851, 0.33651, 0.593388, -0.260306,
              0.57312, 0.362219, 0.613358, -0.268667, 0.574916, 0.390322,
              0.634512, -0.275591, 0.575053, 0.420478, 0.65563, -0.281328,
              0.572404, 0.451614, 0.678265, -0.285948, 0.568893, 0.484112,
              0.70011, -0.289408, 0.561878, 0.517348, 0.723005, -0.291328,
              0.55359, 0.551355, 0.743744, -0.291418, 0.541099, 0.585109,
              0.763949, -0.290252, 0.526489, 0.619487, 0.784186, -0.287648,
              0.509496, 0.65404, 0.804304, -0.283782, 0.491484, 0.688649,
              0.823629, -0.278067, 0.470517, 0.723133, 0.84094, -0.270588,
              0.44705, 0.757163, 0.857852, -0.261188, 0.421252, 0.792816,
              0.874934, -0.249313, 0.394191, 0.827248, 0.888709, -0.236492,
              0.365359, 0.861074, 0.902589, -0.222185, 0.336016, 0.894417,
              0.914201, -0.207314, 0.30527, 0.926825, 0.925978, -0.191146,
              0.274532, 0.9595, 0.93512, -0.174135, 0.243393, 0.991583,
              0.943656, -0.155231, 0.212414, 1.02356, 0.951719, -0.134403,
              0.182005, 1.05239, 0.957164, -0.113023, 0.153043, 1.07754,
              0.962656, -0.0914493, 0.124186, 1.09984, 0.970695, -0.0694179,
              0.0941654, 1.12, 0.980749, -0.0466199, 0.0629671, 1.13849,
              0.991205, -0.0227032, 0.0311146, 1.15494, 0.999884, 632388e-9,
              -254483e-9, 1.1706, 0.379821, -957289e-11, 0.460637, 789337e-11,
              0.405188, -247483e-9, 0.491396, 204064e-9, 0.404796, -989434e-9,
              0.490914, 815853e-9, 0.40483, -0.00222607, 0.490949, 0.00183559,
              0.40473, -0.00395723, 0.49084, 0.00326332, 0.404731, -0.00618287,
              0.490836, 0.00509945, 0.404768, -0.00890258, 0.490871, 0.00734463,
              0.404791, -0.0121156, 0.490883, 0.00999992, 0.404857, -0.0158214,
              0.490938, 0.0130676, 0.404943, -0.0200178, 0.491004, 0.0165503,
              0.405059, -0.0247027, 0.491093, 0.0204521, 0.405213, -0.0298729,
              0.491205, 0.0247788, 0.405399, -0.0355226, 0.491333, 0.0295373,
              0.405731, -0.0416352, 0.491604, 0.034741, 0.406303, -0.0480807,
              0.492116, 0.0404255, 0.406814, -0.0550458, 0.492506, 0.0465732,
              0.407404, -0.0624652, 0.492926, 0.0532058, 0.408149, -0.0702958,
              0.493442, 0.0603442, 0.409128, -0.0784623, 0.494136, 0.0680297,
              0.410408, -0.087007, 0.495054, 0.0762786, 0.411813, -0.0959639,
              0.495962, 0.0851046, 0.413735, -0.105075, 0.497257, 0.0945878,
              0.416137, -0.114646, 0.498882, 0.104725, 0.41934, -0.124394,
              0.501132, 0.11563, 0.423326, -0.134328, 0.503883, 0.127325,
              0.428419, -0.14458, 0.50747, 0.139911, 0.43484, -0.154979,
              0.511964, 0.153481, 0.442641, -0.165628, 0.517328, 0.168114,
              0.452511, -0.176365, 0.524258, 0.183995, 0.463473, -0.187298,
              0.531248, 0.200953, 0.475564, -0.198244, 0.538367, 0.219176,
              0.488664, -0.208938, 0.545175, 0.238514, 0.504073, -0.219599,
              0.553227, 0.259129, 0.520832, -0.230378, 0.560653, 0.280997,
              0.538455, -0.240703, 0.567523, 0.303821, 0.55709, -0.250548,
              0.573287, 0.327948, 0.576646, -0.259964, 0.577795, 0.353362,
              0.596705, -0.268721, 0.580077, 0.380336, 0.618053, -0.276054,
              0.58018, 0.4101, 0.640303, -0.282176, 0.578747, 0.44161, 0.662365,
              -0.286931, 0.574294, 0.474106, 0.684542, -0.290521, 0.567035,
              0.507549, 0.707984, -0.292672, 0.558687, 0.541853, 0.730913,
              -0.293189, 0.547606, 0.576581, 0.752948, -0.292199, 0.533471,
              0.61172, 0.773452, -0.289508, 0.516395, 0.646339, 0.794715,
              -0.285716, 0.497873, 0.682131, 0.814251, -0.280051, 0.476845,
              0.716396, 0.833057, -0.272873, 0.453449, 0.751503, 0.84959,
              -0.263982, 0.427857, 0.786085, 0.867022, -0.252745, 0.400335,
              0.821355, 0.882277, -0.239655, 0.371304, 0.85646, 0.895375,
              -0.225386, 0.340397, 0.890828, 0.909347, -0.209587, 0.310005,
              0.923532, 0.921885, -0.193433, 0.2796, 0.956419, 0.932127,
              -0.176135, 0.247276, 0.989445, 0.941869, -0.157872, 0.216186,
              1.02221, 0.949735, -0.137577, 0.185602, 1.05195, 0.956617,
              -0.115285, 0.155767, 1.07822, 0.961974, -0.0928418, 0.126103,
              1.10149, 0.96972, -0.0700592, 0.0956758, 1.12207, 0.98012,
              -0.0474671, 0.0643269, 1.1408, 0.990825, -0.0238113, 0.0320863,
              1.1577, 0.999876, 381574e-9, -812203e-10, 1.17403, 0.367636,
              -961342e-11, 0.469176, 753287e-11, 0.380377, -244772e-9, 0.485434,
              191797e-9, 0.380416, -978857e-9, 0.485475, 767015e-9, 0.380376,
              -0.00220165, 0.485435, 0.00172522, 0.380419, -0.00391408,
              0.485487, 0.00306734, 0.380438, -0.00611549, 0.485505, 0.00479332,
              0.380462, -0.00880558, 0.485525, 0.00690391, 0.380496, -0.0119837,
              0.485551, 0.00940039, 0.38056, -0.0156487, 0.485605, 0.0122848,
              0.38064, -0.0197988, 0.485666, 0.0155601, 0.380767, -0.0244324,
              0.48577, 0.0192313, 0.380909, -0.0295444, 0.485871, 0.0233032,
              0.381142, -0.0351321, 0.48606, 0.0277861, 0.381472, -0.0411535,
              0.486336, 0.0326939, 0.382015, -0.0475408, 0.486833, 0.0380565,
              0.382523, -0.0544395, 0.487231, 0.0438615, 0.383129, -0.061784,
              0.487683, 0.0501332, 0.383952, -0.0695085, 0.488313, 0.0568996,
              0.38498, -0.0775819, 0.489077, 0.0641952, 0.386331, -0.0860443,
              0.490113, 0.0720324, 0.387788, -0.0948406, 0.491099, 0.0804379,
              0.389808, -0.103899, 0.492566, 0.0894899, 0.39252, -0.113313,
              0.494601, 0.0992098, 0.395493, -0.123007, 0.496619, 0.109641,
              0.399826, -0.132859, 0.499912, 0.120919, 0.405341, -0.143077,
              0.504061, 0.133107, 0.411932, -0.153465, 0.508905, 0.146263,
              0.420591, -0.164108, 0.515482, 0.160544, 0.43101, -0.174893,
              0.523191, 0.176123, 0.441881, -0.185839, 0.53026, 0.192757,
              0.453919, -0.196633, 0.537295, 0.210535, 0.468715, -0.207611,
              0.546156, 0.229886, 0.485182, -0.218517, 0.555173, 0.250543,
              0.501926, -0.229249, 0.562728, 0.27221, 0.51785, -0.239481,
              0.567494, 0.294892, 0.536947, -0.249395, 0.573889, 0.318987,
              0.557115, -0.259, 0.578831, 0.344348, 0.577966, -0.268075,
              0.582055, 0.371223, 0.599489, -0.276115, 0.583307, 0.399834,
              0.62479, -0.282523, 0.583902, 0.431415, 0.647504, -0.287663,
              0.57953, 0.464301, 0.670601, -0.291538, 0.573103, 0.498123,
              0.693539, -0.293842, 0.563731, 0.532662, 0.717385, -0.294681,
              0.553169, 0.567925, 0.741533, -0.293717, 0.539908, 0.603502,
              0.762142, -0.291156, 0.521902, 0.639074, 0.783014, -0.28719,
              0.502815, 0.674439, 0.805158, -0.281773, 0.482598, 0.710497,
              0.823646, -0.274682, 0.458949, 0.7456, 0.841879, -0.266184,
              0.433129, 0.781085, 0.859515, -0.255682, 0.406064, 0.816,
              0.875335, -0.242849, 0.376509, 0.851074, 0.890147, -0.228329,
              0.345502, 0.886473, 0.903144, -0.212491, 0.31428, 0.920751,
              0.916618, -0.195695, 0.282994, 0.954606, 0.927953, -0.178267,
              0.251091, 0.988402, 0.937414, -0.159549, 0.219107, 1.02141,
              0.946823, -0.140022, 0.18896, 1.05167, 0.954651, -0.118154,
              0.158667, 1.07819, 0.959955, -0.0946636, 0.128808, 1.1025,
              0.96858, -0.0711792, 0.0973787, 1.12391, 0.97938, -0.0475046,
              0.0650965, 1.14322, 0.990498, -0.024059, 0.0326267, 1.16077,
              0.999844, -512408e-10, 112444e-9, 1.17727, 0.316912, -934977e-11,
              0.425996, 695559e-11, 0.356423, -241372e-9, 0.479108, 179562e-9,
              0.356272, -965292e-9, 0.478897, 71811e-8, 0.356262, -0.00217182,
              0.478894, 0.00161574, 0.356265, -0.00386092, 0.478895, 0.00287261,
              0.356278, -0.0060324, 0.478905, 0.00448907, 0.356293, -0.00868565,
              0.478914, 0.00646572, 0.356346, -0.0118207, 0.478965, 0.00880438,
              0.356395, -0.0154355, 0.479001, 0.0115066, 0.356484, -0.019529,
              0.479075, 0.0145762, 0.356609, -0.0240991, 0.47918, 0.018018,
              0.356766, -0.0291413, 0.479305, 0.0218379, 0.357009, -0.0346498,
              0.479512, 0.0260454, 0.357424, -0.0405462, 0.479909, 0.0306657,
              0.357899, -0.0468825, 0.480337, 0.0357054, 0.358424, -0.0536887,
              0.480771, 0.0411728, 0.359041, -0.0609416, 0.481242, 0.0470841,
              0.359903, -0.0685239, 0.481943, 0.0534831, 0.360932, -0.0764883,
              0.482741, 0.0603795, 0.362196, -0.0848364, 0.483688, 0.0678028,
              0.363847, -0.0935002, 0.484947, 0.0758086, 0.365972, -0.102471,
              0.486588, 0.0844173, 0.368741, -0.111751, 0.488787, 0.0937199,
              0.372146, -0.121334, 0.491405, 0.103732, 0.377114, -0.131147,
              0.495604, 0.114608, 0.38226, -0.141213, 0.499436, 0.126345,
              0.389609, -0.151632, 0.505334, 0.139116, 0.397925, -0.162073,
              0.51168, 0.152995, 0.407824, -0.172819, 0.518876, 0.168071,
              0.420014, -0.183929, 0.527639, 0.184495, 0.434266, -0.195032,
              0.537588, 0.20232, 0.447352, -0.205792, 0.544379, 0.221189,
              0.463726, -0.216704, 0.553422, 0.241616, 0.481406, -0.227531,
              0.562074, 0.263298, 0.498707, -0.238017, 0.568227, 0.286116,
              0.518039, -0.247936, 0.574473, 0.3101, 0.538277, -0.257437,
              0.579191, 0.335401, 0.561166, -0.266829, 0.584807, 0.362246,
              0.583189, -0.275329, 0.586476, 0.390609, 0.606024, -0.28234,
              0.585578, 0.420998, 0.632419, -0.287924, 0.584496, 0.454357,
              0.656128, -0.291972, 0.577766, 0.488233, 0.679953, -0.29456,
              0.56875, 0.523248, 0.704654, -0.295816, 0.558388, 0.559168,
              0.729016, -0.295157, 0.544826, 0.595326, 0.752062, -0.292779,
              0.528273, 0.631864, 0.773138, -0.288681, 0.508482, 0.667793,
              0.794869, -0.283358, 0.487341, 0.704035, 0.815101, -0.27608,
              0.46354, 0.739925, 0.834212, -0.26767, 0.438672, 0.775539,
              0.852368, -0.257397, 0.411239, 0.810895, 0.870207, -0.245689,
              0.3829, 0.846472, 0.884063, -0.231452, 0.351496, 0.881788,
              0.898284, -0.215561, 0.31895, 0.917438, 0.912964, -0.198208,
              0.287367, 0.952422, 0.924666, -0.180426, 0.254487, 0.987551,
              0.934429, -0.161525, 0.222226, 1.02142, 0.943485, -0.141197,
              0.191143, 1.05218, 0.9521, -0.120085, 0.161112, 1.07937, 0.957876,
              -0.0975881, 0.130982, 1.10403, 0.966943, -0.0726842, 0.0990553,
              1.12616, 0.978313, -0.0483705, 0.0662818, 1.14619, 0.990048,
              -0.0239072, 0.0329243, 1.16413, 0.999984, 461885e-9, -772859e-10,
              1.18099, 0.321287, -935049e-11, 0.455413, 659662e-11, 0.332595,
              -237513e-9, 0.471437, 167562e-9, 0.332729, -949964e-9, 0.471618,
              670192e-9, 0.332305, -0.00213618, 0.471028, 0.00150712, 0.332326,
              -0.00379765, 0.471055, 0.00267959, 0.332344, -0.00593353,
              0.471072, 0.00418751, 0.332356, -0.00854349, 0.471077, 0.00603172,
              0.332403, -0.0116268, 0.471121, 0.00821362, 0.332461, -0.0151824,
              0.47117, 0.0107357, 0.332552, -0.0192088, 0.471251, 0.0136014,
              0.332657, -0.0237024, 0.47133, 0.0168152, 0.332835, -0.0286615,
              0.471487, 0.0203853, 0.333083, -0.0340765, 0.471708, 0.0243212,
              0.333547, -0.0398563, 0.47219, 0.0286518, 0.333989, -0.0460916,
              0.472587, 0.0333763, 0.334532, -0.0527897, 0.473054, 0.0385084,
              0.335167, -0.0599284, 0.473568, 0.0440638, 0.33608, -0.0673514,
              0.474362, 0.0500962, 0.337146, -0.0752237, 0.475231, 0.0566022,
              0.338462, -0.083418, 0.476282, 0.0636272, 0.34014, -0.0919382,
              0.477615, 0.0712153, 0.342341, -0.100741, 0.479404, 0.079417,
              0.345088, -0.109905, 0.481618, 0.0882631, 0.349049, -0.119369,
              0.485081, 0.0978851, 0.353939, -0.129033, 0.489317, 0.108336,
              0.359893, -0.139038, 0.494309, 0.119698, 0.366945, -0.149411,
              0.499983, 0.132024, 0.375814, -0.159843, 0.507185, 0.145558,
              0.387112, -0.170664, 0.516392, 0.160433, 0.40023, -0.181897,
              0.526519, 0.176648, 0.412555, -0.192785, 0.53423, 0.193922,
              0.427023, -0.203663, 0.542741, 0.212662, 0.443685, -0.214695,
              0.552066, 0.232944, 0.461499, -0.225561, 0.560762, 0.254495,
              0.480975, -0.236257, 0.569421, 0.277531, 0.501, -0.24639,
              0.576101, 0.301724, 0.521691, -0.256101, 0.581493, 0.327112,
              0.543478, -0.265289, 0.585221, 0.353917, 0.566094, -0.273938,
              0.587614, 0.381941, 0.589578, -0.281679, 0.587991, 0.41172,
              0.614583, -0.287655, 0.585928, 0.444148, 0.641813, -0.292228,
              0.582092, 0.478617, 0.666189, -0.295172, 0.57398, 0.51397,
              0.690475, -0.29648, 0.561676, 0.550118, 0.715543, -0.296203,
              0.548758, 0.586933, 0.740405, -0.293999, 0.532792, 0.62384,
              0.762183, -0.28998, 0.512735, 0.660723, 0.786069, -0.28478,
              0.492402, 0.69807, 0.806812, -0.277568, 0.469058, 0.734422,
              0.826987, -0.268951, 0.443017, 0.770946, 0.844588, -0.259049,
              0.415501, 0.80699, 0.863725, -0.2471, 0.387328, 0.842107,
              0.879137, -0.234157, 0.356108, 0.878078, 0.894634, -0.218719,
              0.324315, 0.914058, 0.909162, -0.201293, 0.291813, 0.949922,
              0.92072, -0.18267, 0.258474, 0.985337, 0.93158, -0.163212,
              0.225593, 1.0205, 0.941238, -0.142771, 0.193986, 1.05273,
              0.949293, -0.120956, 0.163392, 1.08075, 0.956226, -0.0985743,
              0.132934, 1.10559, 0.96546, -0.075118, 0.101255, 1.12823,
              0.977403, -0.0497921, 0.0675441, 1.149, 0.989648, -0.0241574,
              0.0334681, 1.16765, 1.00001, 5762e-7, -184807e-9, 1.18519,
              0.303474, -916603e-11, 0.4542, 61243e-10, 0.308894, -232869e-9,
              0.462306, 155592e-9, 0.309426, -931661e-9, 0.463093, 622499e-9,
              0.308643, -0.0020949, 0.461933, 0.00139979, 0.308651, -0.0037242,
              0.461941, 0.00248874, 0.308662, -0.00581873, 0.46195, 0.00388933,
              0.308687, -0.00837818, 0.461974, 0.00560247, 0.308728, -0.0114016,
              0.462011, 0.00762948, 0.308789, -0.0148884, 0.462067, 0.00997326,
              0.308882, -0.0188369, 0.462151, 0.0126375, 0.309007, -0.0232436,
              0.462263, 0.0156271, 0.30918, -0.0281054, 0.462417, 0.0189498,
              0.309442, -0.0334065, 0.462667, 0.0226167, 0.309901, -0.0390589,
              0.463162, 0.0266614, 0.310331, -0.0452042, 0.463555, 0.0310715,
              0.310858, -0.0517735, 0.464019, 0.0358698, 0.311576, -0.0587359,
              0.464669, 0.0410848, 0.312436, -0.0660383, 0.465406, 0.0467453,
              0.313526, -0.0737266, 0.466339, 0.0528718, 0.314903, -0.0817574,
              0.467504, 0.0595039, 0.316814, -0.090167, 0.469226, 0.0666888,
              0.318965, -0.0987555, 0.470981, 0.0744658, 0.322077, -0.107792,
              0.473814, 0.082912, 0.325947, -0.117098, 0.477241, 0.0920846,
              0.331008, -0.126602, 0.48184, 0.102137, 0.337893, -0.136619,
              0.488334, 0.113135, 0.345106, -0.146838, 0.494415, 0.12511,
              0.355111, -0.157357, 0.503275, 0.138356, 0.365095, -0.167955,
              0.510966, 0.152686, 0.378344, -0.179157, 0.521508, 0.16856,
              0.391599, -0.190143, 0.530455, 0.18561, 0.407786, -0.20123,
              0.541275, 0.204308, 0.425294, -0.212456, 0.551784, 0.224623,
              0.444021, -0.223568, 0.561493, 0.246172, 0.463418, -0.234154,
              0.569886, 0.268979, 0.484077, -0.244546, 0.577116, 0.293411,
              0.505513, -0.254301, 0.582914, 0.318936, 0.527672, -0.263564,
              0.587208, 0.345856, 0.550565, -0.272332, 0.589277, 0.374054,
              0.573656, -0.280011, 0.588426, 0.403276, 0.59827, -0.286924,
              0.587504, 0.43474, 0.624731, -0.291994, 0.583401, 0.468767,
              0.652396, -0.295159, 0.576997, 0.504411, 0.67732, -0.296954,
              0.565863, 0.54114, 0.703147, -0.296877, 0.552316, 0.57816,
              0.728715, -0.295147, 0.536773, 0.616124, 0.752448, -0.291275,
              0.51771, 0.653885, 0.775169, -0.285905, 0.496087, 0.691537,
              0.799307, -0.279064, 0.474232, 0.729251, 0.819482, -0.270294,
              0.447676, 0.766267, 0.837659, -0.260032, 0.419656, 0.802616,
              0.856903, -0.248497, 0.391328, 0.838583, 0.873325, -0.235252,
              0.360285, 0.874711, 0.889788, -0.221126, 0.329215, 0.91077,
              0.904486, -0.204304, 0.296392, 0.94653, 0.917711, -0.185562,
              0.262159, 0.983828, 0.928969, -0.165635, 0.229142, 1.01955,
              0.939707, -0.14442, 0.19673, 1.05317, 0.948167, -0.122147,
              0.165095, 1.0823, 0.955222, -0.099098, 0.13451, 1.10791, 0.964401,
              -0.0755332, 0.102476, 1.1312, 0.976605, -0.0513817, 0.0689667,
              1.15218, 0.989085, -0.0258499, 0.034506, 1.17129, 0.999908,
              617773e-9, -271268e-9, 1.18961, 0.285803, -905752e-11, 0.452348,
              572272e-11, 0.284689, -22732e-8, 0.450581, 143626e-9, 0.285263,
              -910214e-9, 0.451482, 575099e-9, 0.285302, -0.00204784, 0.451553,
              0.00129395, 0.285318, -0.00364057, 0.451574, 0.0023006, 0.28533,
              -0.00568813, 0.451585, 0.00359547, 0.285361, -0.00819001,
              0.451618, 0.00517934, 0.285397, -0.0111458, 0.45165, 0.007054,
              0.285447, -0.0145536, 0.451688, 0.00922167, 0.285527, -0.0184127,
              0.451758, 0.0116869, 0.285688, -0.0227207, 0.451929, 0.0144555,
              0.28584, -0.0274712, 0.452055, 0.0175341, 0.286136, -0.0326278,
              0.452369, 0.0209406, 0.286574, -0.0381792, 0.452853, 0.0246965,
              0.287012, -0.0441879, 0.453272, 0.0287996, 0.287542, -0.0506096,
              0.453752, 0.033268, 0.288299, -0.0573634, 0.454488, 0.0381504,
              0.289186, -0.0645458, 0.455294, 0.0434447, 0.290302, -0.0720405,
              0.456301, 0.0491973, 0.291776, -0.0799046, 0.457648, 0.0554453,
              0.29372, -0.088117, 0.459483, 0.0622311, 0.296052, -0.0965328,
              0.461571, 0.0695992, 0.299563, -0.105409, 0.465085, 0.077658,
              0.30335, -0.114553, 0.468506, 0.0864176, 0.309167, -0.123917,
              0.474423, 0.0961078, 0.31529, -0.13381, 0.47995, 0.106643,
              0.324163, -0.144021, 0.488592, 0.118322, 0.333272, -0.154382,
              0.496461, 0.131133, 0.344224, -0.165015, 0.50562, 0.145208,
              0.357733, -0.176168, 0.516719, 0.16073, 0.373046, -0.187468,
              0.528513, 0.177807, 0.38788, -0.198488, 0.537713, 0.196072,
              0.405133, -0.209545, 0.547999, 0.21605, 0.423845, -0.220724,
              0.55759, 0.237484, 0.443777, -0.231518, 0.566246, 0.26039,
              0.464824, -0.242035, 0.574326, 0.284835, 0.486635, -0.251898,
              0.58037, 0.310518, 0.51012, -0.261304, 0.58568, 0.337678,
              0.535301, -0.270384, 0.590197, 0.366242, 0.559193, -0.27841,
              0.590569, 0.395873, 0.583544, -0.285325, 0.588161, 0.426857,
              0.608834, -0.291113, 0.584249, 0.459477, 0.635753, -0.294882,
              0.57763, 0.494734, 0.664367, -0.297088, 0.569479, 0.532023,
              0.689688, -0.297364, 0.555064, 0.569629, 0.715732, -0.295949,
              0.539522, 0.608124, 0.741307, -0.292259, 0.521613, 0.646231,
              0.764949, -0.287063, 0.49969, 0.684938, 0.788599, -0.28012,
              0.476747, 0.723548, 0.81048, -0.27153, 0.45116, 0.761135,
              0.831372, -0.261289, 0.424101, 0.798916, 0.850092, -0.249559,
              0.39443, 0.835952, 0.867777, -0.236348, 0.363849, 0.871606,
              0.884632, -0.221569, 0.332477, 0.907843, 0.90047, -0.20618,
              0.300667, 0.944187, 0.914524, -0.188771, 0.266552, 0.981371,
              0.926892, -0.168362, 0.232349, 1.01841, 0.937951, -0.146761,
              0.199359, 1.05308, 0.947236, -0.123813, 0.1675, 1.0839, 0.954367,
              -0.099984, 0.136166, 1.11047, 0.963907, -0.0759278, 0.103808,
              1.13414, 0.976218, -0.0511367, 0.0697061, 1.15575, 0.988772,
              -0.0267415, 0.0352529, 1.17531, 0.999888, -520778e-9, 289926e-9,
              1.19389, 0.263546, -883274e-11, 0.441896, 526783e-11, 0.262352,
              -221849e-9, 0.439889, 132311e-9, 0.262325, -886683e-9, 0.439848,
              528824e-9, 0.26228, -0.00199476, 0.439765, 0.00118975, 0.262372,
              -0.00354671, 0.439922, 0.00211568, 0.26239, -0.00554141, 0.439941,
              0.00330652, 0.262412, -0.00797888, 0.439961, 0.00476346, 0.262453,
              -0.0108584, 0.440002, 0.00648818, 0.262528, -0.0141788, 0.440085,
              0.0084835, 0.262615, -0.017938, 0.440166, 0.0107533, 0.262744,
              -0.0221346, 0.440291, 0.0133044, 0.262939, -0.026762, 0.440493,
              0.0161445, 0.263277, -0.0317573, 0.440889, 0.0192974, 0.26368,
              -0.0371832, 0.441338, 0.0227699, 0.264106, -0.0430371, 0.441753,
              0.0265698, 0.264624, -0.0493035, 0.442227, 0.0307178, 0.265378,
              -0.0558669, 0.442985, 0.0352616, 0.266253, -0.0628718, 0.443795,
              0.0401968, 0.267478, -0.0701569, 0.445008, 0.04559, 0.269062,
              -0.077845, 0.446599, 0.0514539, 0.270926, -0.0857941, 0.448349,
              0.0578382, 0.273693, -0.0940773, 0.451221, 0.0648363, 0.276746,
              -0.102704, 0.454097, 0.0724389, 0.281693, -0.111735, 0.459517,
              0.0808744, 0.287335, -0.121004, 0.46531, 0.0901551, 0.29448,
              -0.130734, 0.472605, 0.100371, 0.30257, -0.140777, 0.480251,
              0.111644, 0.312465, -0.15111, 0.489444, 0.124111, 0.324856,
              -0.16189, 0.500919, 0.137979, 0.33774, -0.172946, 0.511317,
              0.153163, 0.35255, -0.184152, 0.522684, 0.169817, 0.367786,
              -0.19522, 0.53248, 0.187886, 0.385474, -0.20632, 0.543326,
              0.207634, 0.404976, -0.217744, 0.554109, 0.229165, 0.425203,
              -0.228691, 0.563395, 0.252068, 0.446704, -0.239299, 0.571565,
              0.276471, 0.468951, -0.249348, 0.577935, 0.302323, 0.493487,
              -0.258933, 0.584309, 0.329882, 0.517861, -0.268009, 0.58773,
              0.358525, 0.543309, -0.276238, 0.589612, 0.388585, 0.569704,
              -0.28356, 0.589294, 0.419787, 0.594871, -0.289497, 0.585137,
              0.452114, 0.622555, -0.294452, 0.580356, 0.486466, 0.651167,
              -0.296918, 0.57185, 0.523079, 0.677332, -0.297647, 0.558428,
              0.5611, 0.703718, -0.296321, 0.542232, 0.599592, 0.730262,
              -0.293339, 0.524541, 0.639138, 0.754304, -0.288036, 0.502691,
              0.677978, 0.778051, -0.281018, 0.479212, 0.716537, 0.801557,
              -0.272414, 0.454071, 0.75586, 0.822559, -0.262419, 0.425952,
              0.794477, 0.843051, -0.250702, 0.397313, 0.832664, 0.86232,
              -0.237264, 0.366534, 0.869876, 0.879044, -0.222716, 0.334816,
              0.906973, 0.896362, -0.206827, 0.303143, 0.943558, 0.910342,
              -0.189659, 0.269699, 0.979759, 0.924119, -0.171108, 0.236411,
              1.01718, 0.935374, -0.149579, 0.202224, 1.05289, 0.944295,
              -0.126295, 0.16989, 1.08496, 0.952227, -0.101511, 0.138089,
              1.11256, 0.962041, -0.0766392, 0.105053, 1.1375, 0.97528,
              -0.0511967, 0.070329, 1.15983, 0.988476, -0.025463, 0.0351268,
              1.17987, 0.999962, 286808e-10, 145564e-10, 1.19901, 0.227089,
              -841413e-11, 0.404216, 472707e-11, 0.239725, -215083e-9, 0.426708,
              120833e-9, 0.239904, -860718e-9, 0.427028, 483555e-9, 0.239911,
              -0.00193661, 0.427039, 0.00108806, 0.239914, -0.00344276, 0.42704,
              0.00193457, 0.239933, -0.00537907, 0.427064, 0.00302363, 0.239944,
              -0.00774482, 0.427065, 0.00435604, 0.239993, -0.01054, 0.427122,
              0.00593398, 0.240052, -0.0137626, 0.427179, 0.00775987, 0.240148,
              -0.0174115, 0.427279, 0.00983854, 0.240278, -0.021484, 0.42741,
              0.0121763, 0.240472, -0.0259729, 0.427618, 0.0147827, 0.240839,
              -0.0308131, 0.428086, 0.0176837, 0.241201, -0.0360893, 0.428482,
              0.0208775, 0.241626, -0.0417723, 0.428907, 0.0243821, 0.242207,
              -0.0478337, 0.42952, 0.0282228, 0.24298, -0.0542199, 0.430332,
              0.0324333, 0.243881, -0.0610015, 0.431222, 0.0370252, 0.245123,
              -0.0680874, 0.432512, 0.0420535, 0.24667, -0.0755482, 0.434088,
              0.0475414, 0.248779, -0.0832873, 0.436323, 0.0535542, 0.251665,
              -0.0913546, 0.439509, 0.0601716, 0.255305, -0.0998489, 0.443478,
              0.0674282, 0.260049, -0.108576, 0.448713, 0.0754673, 0.266192,
              -0.117754, 0.455524, 0.084339, 0.273158, -0.127294, 0.4627,
              0.0941683, 0.282131, -0.137311, 0.472068, 0.10515, 0.293332,
              -0.147736, 0.483565, 0.117402, 0.304667, -0.158357, 0.493702,
              0.130824, 0.317785, -0.169274, 0.504708, 0.145724, 0.333245,
              -0.180595, 0.517107, 0.16215, 0.349843, -0.191892, 0.528849,
              0.180149, 0.367944, -0.203168, 0.540301, 0.199746, 0.387579,
              -0.214443, 0.551514, 0.221047, 0.408247, -0.225624, 0.560906,
              0.243981, 0.43014, -0.236422, 0.56959, 0.268513, 0.452669,
              -0.24654, 0.576098, 0.294409, 0.476196, -0.256157, 0.580925,
              0.322002, 0.501157, -0.265289, 0.584839, 0.351052, 0.527632,
              -0.273671, 0.587614, 0.3812, 0.555754, -0.281254, 0.589119,
              0.412994, 0.581682, -0.287448, 0.585204, 0.445498, 0.608196,
              -0.292614, 0.579006, 0.479505, 0.635661, -0.296068, 0.571297,
              0.514643, 0.664999, -0.297395, 0.560855, 0.552213, 0.691039,
              -0.296645, 0.544525, 0.591365, 0.7179, -0.293785, 0.526535,
              0.630883, 0.744059, -0.289089, 0.50545, 0.670932, 0.76863,
              -0.282239, 0.482514, 0.710904, 0.793273, -0.273688, 0.457246,
              0.750259, 0.814731, -0.26328, 0.428872, 0.78948, 0.835603,
              -0.251526, 0.399384, 0.828597, 0.85489, -0.238339, 0.368811,
              0.866892, 0.872828, -0.223607, 0.336617, 0.90563, 0.889462,
              -0.207538, 0.303997, 0.943538, 0.904929, -0.190297, 0.270812,
              0.980591, 0.919101, -0.172034, 0.237453, 1.01935, 0.930536,
              -0.152058, 0.204431, 1.05498, 0.941223, -0.129515, 0.172495,
              1.08717, 0.94982, -0.104263, 0.140175, 1.11551, 0.960592,
              -0.0781944, 0.106465, 1.14098, 0.974629, -0.051688, 0.0711592,
              1.16418, 0.98811, -0.0253929, 0.0354432, 1.18465, 1.00004,
              804378e-9, -330876e-9, 1.20462, 0.214668, -821282e-11, 0.406619,
              433582e-11, 0.218053, -208144e-9, 0.413025, 109887e-9, 0.217987,
              -832212e-9, 0.412901, 439362e-9, 0.217971, -0.00187246, 0.412876,
              988623e-9, 0.217968, -0.00332855, 0.41286, 0.00175772, 0.217985,
              -0.00520055, 0.412882, 0.00274729, 0.218014, -0.00748814,
              0.412916, 0.00395842, 0.218054, -0.0101901, 0.412957, 0.00539274,
              0.218106, -0.0133057, 0.413005, 0.00705348, 0.218217, -0.0168342,
              0.413139, 0.00894581, 0.218338, -0.0207707, 0.413258, 0.0110754,
              0.21855, -0.0251001, 0.413509, 0.0134551, 0.218913, -0.0297861,
              0.413992, 0.0161081, 0.219265, -0.0348956, 0.414383, 0.0190307,
              0.219696, -0.0403909, 0.414839, 0.0222458, 0.220329, -0.0462003,
              0.415567, 0.025792, 0.220989, -0.0524208, 0.41621, 0.0296637,
              0.222027, -0.058948, 0.417385, 0.0339323, 0.223301, -0.0658208,
              0.418779, 0.0386055, 0.224988, -0.0730347, 0.420665, 0.0437355,
              0.227211, -0.0805274, 0.423198, 0.0493844, 0.230131, -0.088395,
              0.426566, 0.0556135, 0.233908, -0.0966208, 0.43091, 0.0624829,
              0.239092, -0.105223, 0.437148, 0.0701636, 0.245315, -0.11424,
              0.444302, 0.0786949, 0.253166, -0.12368, 0.453262, 0.0882382,
              0.262374, -0.133569, 0.463211, 0.0988682, 0.273145, -0.143836,
              0.474271, 0.110727, 0.285512, -0.154577, 0.4863, 0.123945,
              0.299512, -0.165501, 0.498817, 0.138581, 0.314287, -0.176698,
              0.510341, 0.154676, 0.331083, -0.188066, 0.522583, 0.172459,
              0.349615, -0.199597, 0.534879, 0.191979, 0.369318, -0.210843,
              0.546083, 0.21309, 0.390377, -0.222068, 0.5562, 0.235998,
              0.412411, -0.233059, 0.564704, 0.260518, 0.435715, -0.24357,
              0.572314, 0.286795, 0.461196, -0.253356, 0.579395, 0.314559,
              0.485587, -0.262362, 0.581985, 0.343581, 0.511908, -0.270895,
              0.584347, 0.374367, 0.539798, -0.278452, 0.58505, 0.406015,
              0.567974, -0.284877, 0.583344, 0.439168, 0.594303, -0.290124,
              0.577348, 0.473005, 0.622951, -0.294183, 0.570751, 0.508534,
              0.652404, -0.296389, 0.561541, 0.544764, 0.679291, -0.296605,
              0.546426, 0.582927, 0.706437, -0.294095, 0.528599, 0.622681,
              0.734485, -0.28978, 0.508676, 0.663567, 0.758841, -0.283363,
              0.484768, 0.704092, 0.78537, -0.275015, 0.460434, 0.745101,
              0.807315, -0.264689, 0.432166, 0.784712, 0.8271, -0.252597,
              0.401807, 0.824241, 0.849191, -0.239154, 0.371458, 0.863803,
              0.867046, -0.224451, 0.338873, 0.903063, 0.8852, -0.208342,
              0.306175, 0.942763, 0.901771, -0.190684, 0.272759, 0.981559,
              0.915958, -0.172105, 0.239306, 1.02048, 0.928046, -0.152214,
              0.206071, 1.05765, 0.939961, -0.130247, 0.17367, 1.08999,
              0.948711, -0.10672, 0.142201, 1.11829, 0.959305, -0.0808688,
              0.108454, 1.14467, 0.973009, -0.0539145, 0.0728109, 1.16839,
              0.987631, -0.0262947, 0.0360625, 1.19004, 0.999978, 0.00132758,
              -559424e-9, 1.21058, 0.193925, -793421e-11, 0.391974, 392537e-11,
              0.196746, -200315e-9, 0.397675, 991033e-10, 0.19667, -801099e-9,
              0.397521, 396342e-9, 0.196633, -0.00180246, 0.397445, 891829e-9,
              0.196654, -0.00320443, 0.397482, 0.00158582, 0.196659,
              -0.00500647, 0.39748, 0.00247867, 0.196683, -0.0072086, 0.397506,
              0.00357167, 0.196728, -0.00981001, 0.397562, 0.00486675, 0.196792,
              -0.0128096, 0.397633, 0.00636707, 0.19689, -0.0162055, 0.397746,
              0.00807752, 0.197017, -0.0199943, 0.397884, 0.0100052, 0.19729,
              -0.024139, 0.39827, 0.0121691, 0.197583, -0.0286671, 0.398639,
              0.0145755, 0.197927, -0.0335858, 0.399034, 0.0172355, 0.198383,
              -0.0388806, 0.399554, 0.0201718, 0.199002, -0.0444736, 0.400289,
              0.0234194, 0.199739, -0.0504583, 0.401111, 0.026984, 0.200784,
              -0.056729, 0.402349, 0.0309217, 0.202075, -0.0633643, 0.403841,
              0.0352496, 0.203898, -0.0703247, 0.406076, 0.0400313, 0.206199,
              -0.0775565, 0.408841, 0.0453282, 0.209252, -0.085184, 0.41259,
              0.0511794, 0.213638, -0.0931994, 0.418288, 0.0577459, 0.21881,
              -0.101617, 0.424681, 0.0650508, 0.225642, -0.11052, 0.433429,
              0.0732759, 0.233717, -0.119772, 0.442897, 0.0824683, 0.242823,
              -0.129505, 0.452888, 0.0927484, 0.254772, -0.139906, 0.466407,
              0.104417, 0.266603, -0.150402, 0.477413, 0.117211, 0.28073,
              -0.161395, 0.490519, 0.131598, 0.295399, -0.172465, 0.50201,
              0.147407, 0.312705, -0.183982, 0.515311, 0.165031, 0.331335,
              -0.195532, 0.52786, 0.184336, 0.351037, -0.206971, 0.5392,
              0.205361, 0.372175, -0.218117, 0.54941, 0.228043, 0.394548,
              -0.229327, 0.558642, 0.25267, 0.419598, -0.240052, 0.567861,
              0.279071, 0.443922, -0.249937, 0.573332, 0.306882, 0.471495,
              -0.259407, 0.58013, 0.33661, 0.496769, -0.267749, 0.580564,
              0.367328, 0.524951, -0.275524, 0.581696, 0.399753, 0.55318,
              -0.282148, 0.579885, 0.433134, 0.581577, -0.287533, 0.575471,
              0.467534, 0.609231, -0.291612, 0.567445, 0.502943, 0.637478,
              -0.293911, 0.557657, 0.53871, 0.667795, -0.295096, 0.546535,
              0.576568, 0.694272, -0.294073, 0.529561, 0.614929, 0.722937,
              -0.290386, 0.510561, 0.655909, 0.749682, -0.284481, 0.487846,
              0.697663, 0.774754, -0.276188, 0.462487, 0.738515, 0.799301,
              -0.266215, 0.43481, 0.779802, 0.820762, -0.254116, 0.404879,
              0.820045, 0.843231, -0.240393, 0.374559, 0.860294, 0.861857,
              -0.225503, 0.341582, 0.900965, 0.880815, -0.209382, 0.308778,
              0.941727, 0.89766, -0.19155, 0.275232, 0.980916, 0.912926,
              -0.172346, 0.240938, 1.02162, 0.926391, -0.151799, 0.207223,
              1.0597, 0.938429, -0.129968, 0.17484, 1.09291, 0.947834, -0.10651,
              0.142984, 1.12248, 0.958432, -0.0824098, 0.109902, 1.149,
              0.972402, -0.0565242, 0.0744454, 1.1733, 0.987191, -0.028427,
              0.0373794, 1.19538, 0.999975, 385685e-10, -4203e-8, 1.21676,
              0.178114, -766075e-11, 0.385418, 354027e-11, 0.176074, -191966e-9,
              0.381002, 887135e-10, 0.17601, -767549e-9, 0.380861, 354715e-9,
              0.17598, -0.00172696, 0.380798, 798168e-9, 0.175994, -0.00307012,
              0.380824, 0.00141928, 0.176017, -0.00479684, 0.380858, 0.00221859,
              0.176019, -0.00690648, 0.380839, 0.00319714, 0.176072,
              -0.00939888, 0.380913, 0.0043572, 0.176131, -0.0122726, 0.380979,
              0.005702, 0.176239, -0.0155264, 0.38112, 0.00723689, 0.176371,
              -0.0191551, 0.381272, 0.00896907, 0.176638, -0.023117, 0.381669,
              0.0109194, 0.176912, -0.0274633, 0.382015, 0.0130903, 0.177279,
              -0.032173, 0.382476, 0.0154949, 0.17774, -0.0372219, 0.383041,
              0.0181669, 0.178344, -0.0426132, 0.38378, 0.0211209, 0.179153,
              -0.0483309, 0.384773, 0.0243899, 0.180197, -0.0543447, 0.386076,
              0.0280062, 0.181581, -0.0607122, 0.387809, 0.032004, 0.18344,
              -0.0673855, 0.390205, 0.036453, 0.186139, -0.0743989, 0.393944,
              0.0414162, 0.189432, -0.0817731, 0.39832, 0.0469394, 0.193795,
              -0.0895464, 0.404188, 0.0531442, 0.199641, -0.0978264, 0.4121,
              0.0601374, 0.206679, -0.106499, 0.421425, 0.0680078, 0.214865,
              -0.115654, 0.431504, 0.076919, 0.224406, -0.125268, 0.442526,
              0.0868835, 0.235876, -0.135475, 0.455465, 0.0981875, 0.248335,
              -0.146023, 0.4681, 0.110759, 0.262868, -0.157016, 0.482069,
              0.124885, 0.278962, -0.168245, 0.496182, 0.140645, 0.295082,
              -0.17958, 0.507401, 0.157838, 0.313738, -0.191227, 0.520252,
              0.17695, 0.333573, -0.202718, 0.531708, 0.197817, 0.356433,
              -0.214424, 0.544509, 0.220785, 0.378853, -0.225492, 0.55373,
              0.245306, 0.402717, -0.236236, 0.561348, 0.271593, 0.428375,
              -0.246568, 0.568538, 0.299776, 0.454724, -0.255941, 0.573462,
              0.329433, 0.482291, -0.264511, 0.576356, 0.360598, 0.509706,
              -0.272129, 0.576446, 0.393204, 0.538805, -0.278979, 0.575298,
              0.427227, 0.568919, -0.284528, 0.572154, 0.462157, 0.596804,
              -0.288801, 0.564691, 0.497997, 0.625987, -0.291334, 0.555134,
              0.534467, 0.656414, -0.292722, 0.545051, 0.571736, 0.683916,
              -0.292185, 0.528813, 0.610158, 0.711809, -0.290043, 0.51106,
              0.649061, 0.739547, -0.285246, 0.490103, 0.690081, 0.766914,
              -0.277647, 0.465523, 0.732554, 0.791375, -0.267603, 0.437718,
              0.773982, 0.814772, -0.256109, 0.40882, 0.81609, 0.836691,
              -0.242281, 0.377823, 0.856849, 0.856984, -0.227155, 0.34496,
              0.898363, 0.876332, -0.210395, 0.311335, 0.939471, 0.894988,
              -0.192612, 0.277703, 0.980799, 0.911113, -0.173236, 0.243019,
              1.02215, 0.924092, -0.152258, 0.209037, 1.06139, 0.936828,
              -0.129575, 0.175909, 1.09635, 0.946869, -0.10594, 0.143852,
              1.12707, 0.958284, -0.081318, 0.110289, 1.15419, 0.972325,
              -0.0556133, 0.0747232, 1.17909, 0.986878, -0.0297899, 0.0383149,
              1.20163, 0.999936, -0.00197169, 912402e-9, 1.22338, 0.151174,
              -720365e-11, 0.351531, 309789e-11, 0.155594, -18279e-8, 0.361806,
              78608e-9, 0.156099, -731569e-9, 0.362982, 314615e-9, 0.156053,
              -0.00164578, 0.362869, 707845e-9, 0.156093, -0.0029261, 0.362961,
              0.00125884, 0.156099, -0.00457155, 0.362959, 0.00196783, 0.15612,
              -0.00658224, 0.362982, 0.00283622, 0.156168, -0.00895774,
              0.363048, 0.00386625, 0.156221, -0.0116962, 0.363101, 0.00506109,
              0.156324, -0.0147973, 0.363241, 0.00642675, 0.156476, -0.0182503,
              0.363448, 0.00797175, 0.156731, -0.0220266, 0.36384, 0.00971484,
              0.156994, -0.026176, 0.364179, 0.0116575, 0.157341, -0.0306701,
              0.36462, 0.0138207, 0.157867, -0.0354591, 0.365364, 0.0162356,
              0.15846, -0.0406141, 0.366111, 0.0189092, 0.159308, -0.0460519,
              0.367248, 0.021885, 0.160426, -0.0518096, 0.368767, 0.0252004,
              0.161877, -0.0578906, 0.370745, 0.0288825, 0.163995, -0.0642812,
              0.373831, 0.0330139, 0.16655, -0.0710067, 0.377366, 0.0376283,
              0.170237, -0.0781522, 0.382799, 0.0428493, 0.175096, -0.0857172,
              0.389915, 0.0487324, 0.181069, -0.0938025, 0.398487, 0.0554214,
              0.188487, -0.102363, 0.408799, 0.0630189, 0.197029, -0.111343,
              0.419991, 0.071634, 0.206684, -0.120812, 0.431455, 0.0812797,
              0.218698, -0.131033, 0.445746, 0.0923651, 0.230726, -0.141373,
              0.457471, 0.104545, 0.245516, -0.152387, 0.472388, 0.118449,
              0.261551, -0.163628, 0.486671, 0.133923, 0.277437, -0.174814,
              0.49762, 0.150849, 0.296662, -0.186713, 0.51162, 0.169924,
              0.31795, -0.198513, 0.525435, 0.190848, 0.339422, -0.210119,
              0.536267, 0.213504, 0.362143, -0.221354, 0.545982, 0.237947,
              0.387198, -0.23224, 0.555364, 0.264427, 0.412349, -0.24257,
              0.561489, 0.292519, 0.439274, -0.252284, 0.566903, 0.322561,
              0.466779, -0.261023, 0.569614, 0.353952, 0.496011, -0.26899,
              0.571589, 0.387278, 0.524964, -0.275498, 0.570325, 0.421356,
              0.556518, -0.281449, 0.568792, 0.457314, 0.584363, -0.285526,
              0.560268, 0.493199, 0.614214, -0.28844, 0.55205, 0.530276,
              0.645684, -0.289777, 0.541906, 0.56855, 0.673446, -0.289722,
              0.526464, 0.606927, 0.701924, -0.287792, 0.509872, 0.645945,
              0.73037, -0.284315, 0.490649, 0.685564, 0.757405, -0.278804,
              0.467964, 0.726511, 0.784025, -0.269543, 0.441468, 0.768601,
              0.808255, -0.258117, 0.41216, 0.811321, 0.830739, -0.244728,
              0.380606, 0.853496, 0.851914, -0.229428, 0.348111, 0.895374,
              0.872586, -0.212508, 0.314732, 0.937674, 0.891581, -0.194025,
              0.280338, 0.979869, 0.907641, -0.174711, 0.245203, 1.02253,
              0.922233, -0.153509, 0.21077, 1.06371, 0.935878, -0.130418,
              0.177399, 1.09972, 0.946338, -0.105558, 0.144507, 1.13124,
              0.957265, -0.080059, 0.110508, 1.15973, 0.971668, -0.0539766,
              0.0742311, 1.18515, 0.9866, -0.0277101, 0.0375224, 1.20858,
              1.00021, -515531e-9, 135226e-9, 1.23135, 0.137468, -686011e-11,
              0.345041, 273315e-11, 0.13703, -173378e-9, 0.343936, 690761e-10,
              0.136986, -693048e-9, 0.34383, 276126e-9, 0.136964, -0.00155931,
              0.343761, 621337e-9, 0.137003, -0.00277211, 0.343863, 0.00110494,
              0.137012, -0.00433103, 0.343868, 0.00172744, 0.137043,
              -0.00623606, 0.343916, 0.00249022, 0.13709, -0.0084868, 0.343986,
              0.00339559, 0.137145, -0.0110814, 0.344045, 0.00444687, 0.137242,
              -0.0140187, 0.344177, 0.00565007, 0.137431, -0.0172713, 0.344491,
              0.00701868, 0.137644, -0.0208605, 0.344805, 0.00856042, 0.13791,
              -0.024792, 0.345172, 0.0102863, 0.138295, -0.0290461, 0.345734,
              0.0122185, 0.138764, -0.0335957, 0.346371, 0.0143771, 0.139415,
              -0.038467, 0.347298, 0.0167894, 0.140272, -0.0436176, 0.348527,
              0.0194895, 0.141457, -0.0491016, 0.350276, 0.0225043, 0.14303,
              -0.0548764, 0.352646, 0.0258962, 0.145289, -0.0610096, 0.356206,
              0.0297168, 0.148502, -0.0674777, 0.361488, 0.0340562, 0.152188,
              -0.074345, 0.367103, 0.0389534, 0.157359, -0.0817442, 0.375247,
              0.0445541, 0.16379, -0.0896334, 0.385064, 0.0509535, 0.171376,
              -0.098005, 0.396082, 0.0582611, 0.179901, -0.106817, 0.407418,
              0.06654, 0.189892, -0.116239, 0.420031, 0.075994, 0.201838,
              -0.12627, 0.434321, 0.0867239, 0.214311, -0.136701, 0.447631,
              0.0987517, 0.228902, -0.147616, 0.462046, 0.112353, 0.245107,
              -0.158871, 0.476942, 0.127605, 0.262292, -0.170261, 0.490285,
              0.144469, 0.281215, -0.182017, 0.503783, 0.163282, 0.301058,
              -0.193729, 0.515505, 0.183873, 0.322752, -0.205512, 0.52682,
              0.206466, 0.347547, -0.217214, 0.539473, 0.231194, 0.370969,
              -0.227966, 0.546625, 0.257288, 0.397533, -0.238555, 0.55472,
              0.285789, 0.42398, -0.248278, 0.559468, 0.315746, 0.452928,
              -0.257422, 0.564095, 0.347724, 0.482121, -0.265306, 0.565426,
              0.380922, 0.510438, -0.272043, 0.563205, 0.415639, 0.541188,
              -0.277614, 0.561087, 0.451702, 0.571667, -0.281927, 0.554922,
              0.48845, 0.602432, -0.285015, 0.546838, 0.526442, 0.634126,
              -0.286512, 0.537415, 0.564896, 0.662816, -0.286388, 0.522906,
              0.604037, 0.692411, -0.284734, 0.507003, 0.643795, 0.720946,
              -0.281297, 0.488398, 0.68298, 0.748293, -0.276262, 0.466353,
              0.723466, 0.776931, -0.269978, 0.443573, 0.764565, 0.801065,
              -0.260305, 0.415279, 0.805838, 0.825843, -0.247426, 0.384773,
              0.849985, 0.84807, -0.232437, 0.352555, 0.893174, 0.869122,
              -0.215806, 0.318642, 0.936564, 0.888963, -0.197307, 0.28381,
              0.980253, 0.905547, -0.177203, 0.247888, 1.02463, 0.918554,
              -0.155542, 0.212904, 1.06714, 0.931395, -0.131948, 0.1787,
              1.10451, 0.941749, -0.106723, 0.145902, 1.13694, 0.954551,
              -0.0804939, 0.111193, 1.1666, 0.970279, -0.0534239, 0.0744697,
              1.19249, 0.986117, -0.0257452, 0.0368788, 1.21665, 0.999938,
              0.00190634, -0.0010291, 1.23981, 0.118493, -647439e-11, 0.32272,
              23772e-10, 0.118765, -163023e-9, 0.323456, 598573e-10, 0.118772,
              -65212e-8, 0.323477, 239447e-9, 0.118843, -0.00146741, 0.323657,
              538881e-9, 0.118804, -0.00260846, 0.323553, 95826e-8, 0.118826,
              -0.00407576, 0.323595, 0.00149845, 0.118846, -0.00586826,
              0.323617, 0.00216047, 0.118886, -0.00798578, 0.32367, 0.00294679,
              0.118947, -0.0104273, 0.323753, 0.00386124, 0.119055, -0.0131909,
              0.323922, 0.00490999, 0.119241, -0.0162444, 0.324251, 0.00610804,
              0.11944, -0.0196339, 0.324544, 0.00745805, 0.119739, -0.0233378,
              0.325026, 0.00897805, 0.12011, -0.0273179, 0.325586, 0.0106895,
              0.120571, -0.0316143, 0.326231, 0.0126073, 0.12124, -0.0361939,
              0.327264, 0.0147654, 0.122162, -0.0410511, 0.328733, 0.0172001,
              0.123378, -0.0462233, 0.330659, 0.0199375, 0.125183, -0.0517109,
              0.333754, 0.0230498, 0.127832, -0.0575652, 0.338507, 0.026597,
              0.130909, -0.0637441, 0.343666, 0.0306345, 0.135221, -0.0704302,
              0.351063, 0.035273, 0.14082, -0.0776364, 0.360604, 0.0406137,
              0.146781, -0.0852293, 0.369638, 0.0466788, 0.155121, -0.0935351,
              0.3827, 0.0537628, 0.16398, -0.102234, 0.39522, 0.0617985,
              0.173926, -0.111465, 0.40793, 0.07097, 0.185137, -0.121296,
              0.42105, 0.0813426, 0.19826, -0.13169, 0.435735, 0.0931596,
              0.212938, -0.142614, 0.450932, 0.106547, 0.229046, -0.153884,
              0.465726, 0.121575, 0.246246, -0.165382, 0.479461, 0.138286,
              0.264637, -0.176806, 0.492106, 0.15666, 0.284959, -0.188793,
              0.504774, 0.17728, 0.308157, -0.200763, 0.518805, 0.19988,
              0.330951, -0.21239, 0.528231, 0.224293, 0.3549, -0.223521,
              0.536376, 0.250541, 0.381502, -0.234169, 0.544846, 0.278902,
              0.409529, -0.244077, 0.551717, 0.309227, 0.437523, -0.253363,
              0.55517, 0.341426, 0.467624, -0.261659, 0.557772, 0.37518,
              0.497268, -0.268498, 0.556442, 0.41007, 0.528294, -0.274018,
              0.553915, 0.446445, 0.559053, -0.278169, 0.549153, 0.483779,
              0.589329, -0.281229, 0.539878, 0.522249, 0.622503, -0.282902,
              0.53162, 0.561754, 0.652382, -0.282815, 0.518119, 0.601544,
              0.681847, -0.281247, 0.502187, 0.641574, 0.712285, -0.277986,
              0.484824, 0.682633, 0.740094, -0.273017, 0.463483, 0.723426,
              0.768478, -0.266692, 0.441299, 0.763747, 0.794556, -0.258358,
              0.415238, 0.805565, 0.819408, -0.248807, 0.386912, 0.847254,
              0.843411, -0.236214, 0.356165, 0.891091, 0.862397, -0.219794,
              0.320562, 0.936174, 0.883113, -0.201768, 0.285322, 0.982562,
              0.90023, -0.181672, 0.249713, 1.02862, 0.915192, -0.159279,
              0.214546, 1.07163, 0.928458, -0.134725, 0.180285, 1.10995,
              0.94069, -0.10913, 0.147119, 1.14354, 0.953409, -0.0821315,
              0.112492, 1.17372, 0.969537, -0.0542677, 0.0752014, 1.20043,
              0.985612, -0.0259096, 0.0370361, 1.22528, 0.999835, 0.00298198,
              -0.00151801, 1.24959, 0.10097, -602574e-11, 0.300277, 202619e-11,
              0.101577, -152164e-9, 0.302077, 511662e-10, 0.101572, -608889e-9,
              0.302066, 204751e-9, 0.101566, -0.00136997, 0.302047, 460753e-9,
              0.101592, -0.00243557, 0.302114, 819497e-9, 0.101608, -0.0038053,
              0.30214, 0.00128154, 0.101627, -0.00547906, 0.30216, 0.0018483,
              0.101669, -0.00745647, 0.302224, 0.00252223, 0.101732,
              -0.00973615, 0.302318, 0.00330716, 0.101844, -0.0123097, 0.302513,
              0.00421061, 0.102025, -0.0151681, 0.30285, 0.00524481, 0.102224,
              -0.0183334, 0.303166, 0.0064154, 0.102515, -0.0217819, 0.303654,
              0.00774063, 0.102886, -0.0255067, 0.304243, 0.0092398, 0.103395,
              -0.029514, 0.305089, 0.0109339, 0.104109, -0.0337912, 0.306301,
              0.0128561, 0.105074, -0.0383565, 0.30798, 0.0150338, 0.10654,
              -0.0432132, 0.310726, 0.0175228, 0.108478, -0.0484244, 0.314351,
              0.0203648, 0.111015, -0.0539339, 0.319032, 0.0236325, 0.114682,
              -0.0598885, 0.32605, 0.0274188, 0.11911, -0.0663375, 0.334109,
              0.0317905, 0.124736, -0.0733011, 0.344013, 0.0368502, 0.131479,
              -0.0807744, 0.355358, 0.0427104, 0.139283, -0.0888204, 0.367614,
              0.0494788, 0.148054, -0.0973394, 0.380072, 0.0572367, 0.159037,
              -0.10665, 0.395678, 0.0662704, 0.169794, -0.116221, 0.40795,
              0.0763192, 0.18314, -0.126632, 0.423546, 0.087956, 0.197515,
              -0.137383, 0.438213, 0.101042, 0.213514, -0.148641, 0.453248,
              0.115827, 0.23065, -0.160117, 0.46688, 0.132283, 0.249148,
              -0.171807, 0.479962, 0.150644, 0.270219, -0.183695, 0.494618,
              0.171073, 0.292338, -0.195574, 0.506937, 0.193378, 0.314999,
              -0.207205, 0.516463, 0.217585, 0.340991, -0.218955, 0.528123,
              0.24428, 0.367982, -0.229917, 0.537025, 0.272784, 0.39432,
              -0.239737, 0.541627, 0.302742, 0.423364, -0.249048, 0.546466,
              0.335112, 0.453751, -0.257329, 0.549466, 0.369032, 0.48416,
              -0.264623, 0.549503, 0.404577, 0.515262, -0.270411, 0.547008,
              0.441337, 0.547036, -0.274581, 0.542249, 0.479162, 0.576614,
              -0.277266, 0.533015, 0.517904, 0.611143, -0.279144, 0.525512,
              0.558508, 0.640989, -0.279001, 0.51154, 0.598995, 0.671182,
              -0.277324, 0.495641, 0.639935, 0.700848, -0.273908, 0.477526,
              0.681017, 0.729862, -0.269063, 0.457955, 0.722764, 0.758273,
              -0.262282, 0.434846, 0.764349, 0.784121, -0.254281, 0.409203,
              0.806206, 0.809798, -0.24505, 0.382694, 0.848617, 0.834953,
              -0.233861, 0.354034, 0.892445, 0.856817, -0.221308, 0.321764,
              0.936263, 0.877609, -0.205996, 0.288118, 0.982401, 0.897489,
              -0.186702, 0.253277, 1.02975, 0.913792, -0.164618, 0.217963,
              1.07488, 0.92785, -0.140023, 0.183221, 1.11487, 0.940378,
              -0.11328, 0.149385, 1.14947, 0.95273, -0.0853958, 0.114152,
              1.1807, 0.969059, -0.0568698, 0.0769845, 1.20912, 0.985574,
              -0.0276502, 0.0381186, 1.23498, 0.999943, 0.00239052, -0.00126861,
              1.25987, 0.0852715, -560067e-11, 0.279021, 171162e-11, 0.0854143,
              -140871e-9, 0.279483, 430516e-10, 0.0854191, -563385e-9, 0.2795,
              172184e-9, 0.0854188, -0.00126753, 0.279493, 387464e-9, 0.0854229,
              -0.00225337, 0.279501, 68918e-8, 0.0854443, -0.00352086, 0.279549,
              0.00107803, 0.0854697, -0.00506962, 0.279591, 0.00155536,
              0.0855093, -0.00689873, 0.279652, 0.00212354, 0.0855724,
              -0.00900821, 0.279752, 0.00278703, 0.0856991, -0.0113799,
              0.280011, 0.0035551, 0.085855, -0.0140314, 0.280297, 0.00443449,
              0.0860682, -0.016963, 0.280682, 0.00543636, 0.086344, -0.0201438,
              0.281159, 0.0065788, 0.0867426, -0.0235999, 0.281886, 0.00787977,
              0.087239, -0.0273069, 0.282745, 0.0093606, 0.0879815, -0.031269,
              0.284139, 0.011056, 0.0891258, -0.035531, 0.28647, 0.0130065,
              0.0906909, -0.0400947, 0.289708, 0.0152495, 0.0927624, -0.0449638,
              0.293904, 0.0178454, 0.0958376, -0.0502427, 0.300471, 0.0208915,
              0.0995827, -0.0559514, 0.30806, 0.0244247, 0.104526, -0.0622152,
              0.317874, 0.0285721, 0.110532, -0.0690046, 0.329332, 0.0334227,
              0.117385, -0.0763068, 0.341217, 0.0390466, 0.12522, -0.084184,
              0.353968, 0.0455786, 0.134037, -0.0925248, 0.366797, 0.0530773,
              0.144014, -0.101487, 0.380209, 0.0617424, 0.156013, -0.111273,
              0.395956, 0.071777, 0.168872, -0.121431, 0.41053, 0.0830905,
              0.183089, -0.132105, 0.425073, 0.0959341, 0.198763, -0.143286,
              0.439833, 0.110448, 0.216159, -0.154841, 0.454507, 0.126769,
              0.234859, -0.166588, 0.468368, 0.14495, 0.255879, -0.178626,
              0.482846, 0.165233, 0.27677, -0.190218, 0.493489, 0.187217,
              0.301184, -0.202227, 0.506549, 0.211659, 0.325852, -0.213764,
              0.5158, 0.237922, 0.352824, -0.22487, 0.525442, 0.26632, 0.380882,
              -0.235246, 0.532487, 0.296691, 0.410137, -0.244847, 0.537703,
              0.329179, 0.439787, -0.253122, 0.540361, 0.363135, 0.472291,
              -0.260517, 0.542734, 0.399222, 0.501856, -0.266519, 0.538826,
              0.436352, 0.534816, -0.270905, 0.535152, 0.474505, 0.565069,
              -0.273826, 0.525979, 0.513988, 0.597154, -0.275333, 0.516394,
              0.554852, 0.630473, -0.275314, 0.506206, 0.596592, 0.660574,
              -0.273323, 0.489769, 0.638117, 0.692015, -0.270008, 0.472578,
              0.680457, 0.720647, -0.265001, 0.452134, 0.723008, 0.750528,
              -0.258311, 0.430344, 0.765954, 0.777568, -0.250046, 0.405624,
              0.809012, 0.80387, -0.240114, 0.378339, 0.852425, 0.828439,
              -0.228737, 0.349877, 0.895346, 0.851472, -0.216632, 0.318968,
              0.940695, 0.873906, -0.202782, 0.287489, 0.987235, 0.89467,
              -0.187059, 0.254394, 1.03348, 0.912281, -0.168818, 0.221294,
              1.07812, 0.927358, -0.146494, 0.18675, 1.11928, 0.940385,
              -0.120009, 0.152322, 1.15609, 0.952672, -0.0917183, 0.117514,
              1.18875, 0.968496, -0.0620321, 0.0797405, 1.21821, 0.985236,
              -0.0314945, 0.0402383, 1.24523, 0.99998, -575153e-9, 110644e-9,
              1.27133, 0.0702429, -512222e-11, 0.255273, 140947e-11, 0.0702981,
              -128826e-9, 0.255469, 354488e-10, 0.0703691, -515562e-9, 0.255727,
              141874e-9, 0.0703805, -0.00116, 0.255754, 31929e-8, 0.0703961,
              -0.00206224, 0.255813, 567999e-9, 0.0704102, -0.00322223,
              0.255839, 88871e-8, 0.0704298, -0.00463928, 0.255863, 0.00128272,
              0.0704759, -0.00631375, 0.255953, 0.00175283, 0.0705434,
              -0.00824317, 0.256079, 0.00230342, 0.0706693, -0.010412, 0.25636,
              0.0029443, 0.0708189, -0.0128439, 0.256647, 0.00368031, 0.0710364,
              -0.0155177, 0.257084, 0.00452614, 0.0713223, -0.0184374, 0.257637,
              0.00549706, 0.0717182, -0.0216002, 0.258416, 0.00661246, 0.072321,
              -0.0249966, 0.259699, 0.00790147, 0.0731446, -0.0286566, 0.261475,
              0.0093884, 0.0743352, -0.0325888, 0.264132, 0.0111186, 0.0760676,
              -0.036843, 0.26815, 0.013145, 0.078454, -0.0414292, 0.273636,
              0.0155251, 0.0818618, -0.0464634, 0.281653, 0.0183525, 0.0857382,
              -0.0519478, 0.289992, 0.0216642, 0.0908131, -0.0579836, 0.30066,
              0.0255956, 0.0967512, -0.0645124, 0.312204, 0.0301954, 0.103717,
              -0.0716505, 0.325001, 0.0356017, 0.111596, -0.0793232, 0.338129,
              0.041896, 0.120933, -0.087645, 0.352853, 0.0492447, 0.130787,
              -0.096492, 0.366192, 0.0576749, 0.142311, -0.105973, 0.380864,
              0.0673969, 0.155344, -0.116182, 0.396575, 0.0785899, 0.169535,
              -0.126815, 0.411443, 0.0912377, 0.185173, -0.138015, 0.426256,
              0.105607, 0.201755, -0.149325, 0.439607, 0.121551, 0.221334,
              -0.161207, 0.455467, 0.139608, 0.241461, -0.173162, 0.469096,
              0.159591, 0.26294, -0.18504, 0.481014, 0.18156, 0.286776,
              -0.196881, 0.493291, 0.205781, 0.311596, -0.208311, 0.503556,
              0.231819, 0.338667, -0.219671, 0.513268, 0.260274, 0.366021,
              -0.230451, 0.519414, 0.290862, 0.395875, -0.240131, 0.526766,
              0.323196, 0.425564, -0.248566, 0.52905, 0.357071, 0.457094,
              -0.256195, 0.530796, 0.393262, 0.488286, -0.262331, 0.528703,
              0.430797, 0.522291, -0.267141, 0.52727, 0.470231, 0.554172,
              -0.270411, 0.519848, 0.510477, 0.586427, -0.271986, 0.510307,
              0.551594, 0.619638, -0.27192, 0.499158, 0.593849, 0.650656,
              -0.269817, 0.483852, 0.636314, 0.68284, -0.266267, 0.467515,
              0.679679, 0.714356, -0.26113, 0.44931, 0.723884, 0.742717,
              -0.254067, 0.425789, 0.767245, 0.770894, -0.245652, 0.401144,
              0.811819, 0.797358, -0.235554, 0.374224, 0.856315, 0.823377,
              -0.223896, 0.346167, 0.901077, 0.847456, -0.210865, 0.316056,
              0.946502, 0.870697, -0.196574, 0.284503, 0.993711, 0.891068,
              -0.180814, 0.251628, 1.04134, 0.909267, -0.163314, 0.219065,
              1.08609, 0.925653, -0.143304, 0.186446, 1.12702, 0.940017,
              -0.121322, 0.153416, 1.16371, 0.952398, -0.0973872, 0.120334,
              1.19712, 0.967568, -0.0698785, 0.08352, 1.22791, 0.984772,
              -0.0390031, 0.0439209, 1.25672, 1.00026, -0.0070087, 0.00315668,
              1.28428, 0.0556653, -459654e-11, 0.227325, 112556e-11, 0.0565238,
              -116382e-9, 0.230826, 284985e-10, 0.0565717, -465666e-9, 0.231026,
              114036e-9, 0.0565859, -0.00104773, 0.231079, 256656e-9, 0.0565761,
              -0.00186255, 0.231025, 45663e-8, 0.0565913, -0.00291002, 0.231058,
              714664e-9, 0.0566108, -0.00418998, 0.231085, 0.00103224,
              0.0566532, -0.00570206, 0.231169, 0.00141202, 0.0567473,
              -0.00743666, 0.231417, 0.00186018, 0.0568567, -0.00940298,
              0.231661, 0.00238264, 0.0569859, -0.0115991, 0.231895, 0.00298699,
              0.0572221, -0.0140096, 0.232456, 0.00368957, 0.057519, -0.0166508,
              0.233096, 0.00450303, 0.0579534, -0.01951, 0.234094, 0.00544945,
              0.0585922, -0.0225991, 0.235629, 0.00655564, 0.0595647,
              -0.0259416, 0.238106, 0.00785724, 0.0609109, -0.0295661, 0.241557,
              0.00939127, 0.0628751, -0.0335126, 0.246652, 0.0112198, 0.0656908,
              -0.0378604, 0.254091, 0.0134168, 0.0691347, -0.0426543, 0.262666,
              0.0160374, 0.0732165, -0.0478967, 0.272029, 0.0191514, 0.0782863,
              -0.0536716, 0.283007, 0.0228597, 0.0843973, -0.0600683, 0.295732,
              0.0272829, 0.0913598, -0.0670095, 0.308779, 0.032484, 0.0994407,
              -0.0745516, 0.322886, 0.0385886, 0.108189, -0.082712, 0.336408,
              0.0457133, 0.118574, -0.0914927, 0.351692, 0.0539832, 0.129989,
              -0.100854, 0.366502, 0.0635162, 0.142722, -0.110837, 0.381675,
              0.0744386, 0.156654, -0.121353, 0.3963, 0.0868483, 0.172151,
              -0.132414, 0.411477, 0.100963, 0.188712, -0.143809, 0.42508,
              0.116795, 0.208093, -0.155765, 0.441328, 0.134715, 0.227936,
              -0.167608, 0.454328, 0.154396, 0.249495, -0.179579, 0.467235,
              0.176179, 0.27362, -0.191488, 0.480248, 0.200193, 0.296371,
              -0.202618, 0.487886, 0.225775, 0.324234, -0.214133, 0.499632,
              0.25441, 0.353049, -0.225212, 0.509532, 0.285077, 0.381785,
              -0.234875, 0.514265, 0.317047, 0.414038, -0.244205, 0.521282,
              0.351874, 0.445251, -0.252145, 0.522931, 0.388279, 0.476819,
              -0.258433, 0.520947, 0.425825, 0.509209, -0.263411, 0.517669,
              0.465104, 0.542759, -0.266732, 0.512841, 0.505741, 0.574822,
              -0.268263, 0.503317, 0.547611, 0.609324, -0.268489, 0.493035,
              0.590953, 0.641772, -0.266941, 0.478816, 0.63488, 0.674049,
              -0.263297, 0.462863, 0.679072, 0.705071, -0.257618, 0.442931,
              0.723487, 0.734709, -0.250625, 0.421299, 0.768708, 0.763704,
              -0.24179, 0.397085, 0.814375, 0.791818, -0.231115, 0.370577,
              0.859907, 0.817439, -0.21922, 0.34232, 0.906715, 0.843202,
              -0.205658, 0.312627, 0.953943, 0.866639, -0.190563, 0.280933,
              1.00185, 0.888129, -0.173978, 0.248393, 1.05105, 0.907239,
              -0.155485, 0.216007, 1.09704, 0.923893, -0.134782, 0.183233,
              1.13857, 0.938882, -0.11249, 0.150376, 1.17539, 0.952464,
              -0.0890706, 0.117177, 1.20924, 0.968529, -0.0646523, 0.0813095,
              1.24055, 0.984763, -0.038606, 0.0439378, 1.27018, 1.00053,
              -0.01238, 0.00598668, 1.29873, 0.0437928, -409594e-11, 0.204012,
              8.79224e-7, 0.0440166, -103395e-9, 0.205049, 221946e-10,
              0.0440529, -413633e-9, 0.205225, 887981e-10, 0.0440493,
              -930594e-9, 0.2052, 199858e-9, 0.0439884, -0.00165352, 0.204901,
              355495e-9, 0.0440716, -0.0025849, 0.205255, 556983e-9, 0.0440968,
              -0.00372222, 0.205311, 805326e-9, 0.0441359, -0.00506478,
              0.205391, 0.00110333, 0.0442231, -0.00660384, 0.205638,
              0.00145768, 0.0443254, -0.00835246, 0.205877, 0.00187275,
              0.0444832, -0.0102992, 0.20627, 0.00235938, 0.0447001, -0.0124449,
              0.206796, 0.0029299, 0.0450168, -0.0147935, 0.207593, 0.0036005,
              0.0454816, -0.017336, 0.208819, 0.00439246, 0.0462446, -0.0201156,
              0.211036, 0.00533864, 0.0473694, -0.0231568, 0.214388, 0.00646984,
              0.0490191, -0.0264941, 0.219357, 0.00783856, 0.0512776, -0.030184,
              0.226061, 0.00950182, 0.0541279, -0.0342661, 0.234094, 0.0115156,
              0.0578989, -0.0388539, 0.244297, 0.0139687, 0.0620835, -0.0438735,
              0.254457, 0.0169015, 0.0673497, -0.04951, 0.266706, 0.0204554,
              0.0731759, -0.0556263, 0.278753, 0.0246606, 0.0803937, -0.0624585,
              0.29309, 0.0297126, 0.0879287, -0.0697556, 0.305856, 0.0355868,
              0.0970669, -0.0778795, 0.321059, 0.0425768, 0.106508, -0.0863541,
              0.333873, 0.05056, 0.11776, -0.0955935, 0.349008, 0.0598972,
              0.130081, -0.105438, 0.363776, 0.0706314, 0.144454, -0.115899,
              0.380112, 0.0828822, 0.1596, -0.126827, 0.394843, 0.0967611,
              0.176097, -0.138161, 0.409033, 0.112381, 0.194726, -0.149904,
              0.424257, 0.129952, 0.213944, -0.161675, 0.436945, 0.149333,
              0.235516, -0.173659, 0.450176, 0.170892, 0.260564, -0.185963,
              0.466305, 0.194984, 0.285183, -0.197582, 0.477328, 0.220805,
              0.311095, -0.208697, 0.486566, 0.248694, 0.338924, -0.219519,
              0.494811, 0.279015, 0.369757, -0.229766, 0.504065, 0.311725,
              0.3996, -0.238879, 0.507909, 0.345844, 0.430484, -0.246802,
              0.509805, 0.381749, 0.46413, -0.253924, 0.511436, 0.420251,
              0.497077, -0.259319, 0.508787, 0.459957, 0.530434, -0.263297,
              0.50394, 0.501356, 0.565725, -0.265619, 0.49804, 0.544252,
              0.599254, -0.265842, 0.487346, 0.587856, 0.631251, -0.263978,
              0.472975, 0.631969, 0.663972, -0.26043, 0.457135, 0.677471,
              0.697724, -0.255358, 0.439844, 0.723744, 0.727725, -0.248308,
              0.417872, 0.770653, 0.756417, -0.239181, 0.39273, 0.817357,
              0.785419, -0.22814, 0.367839, 0.864221, 0.81266, -0.215681,
              0.339449, 0.912701, 0.839391, -0.201623, 0.309279, 0.962419,
              0.86366, -0.185624, 0.278029, 1.0122, 0.885028, -0.16797,
              0.245294, 1.06186, 0.904639, -0.148336, 0.212689, 1.10934,
              0.922048, -0.12637, 0.179616, 1.15063, 0.936952, -0.102928,
              0.146749, 1.18885, 0.951895, -0.0785268, 0.112733, 1.22352,
              0.967198, -0.0530153, 0.0760056, 1.25681, 0.984405, -0.02649,
              0.0383183, 1.28762, 1.00021, 70019e-8, -20039e-8, 1.31656,
              0.0325964, -355447e-11, 0.176706, 6.55682e-7, 0.0329333,
              -899174e-10, 0.178527, 165869e-10, 0.0329181, -359637e-9,
              0.178453, 663498e-10, 0.0329085, -808991e-9, 0.178383, 149332e-9,
              0.0329181, -0.00143826, 0.178394, 265873e-9, 0.0329425,
              -0.00224678, 0.178517, 416597e-9, 0.0329511, -0.00323575, 0.17849,
              603299e-9, 0.033011, -0.00439875, 0.178695, 829422e-9, 0.0330733,
              -0.00574059, 0.178843, 0.00109908, 0.0331857, -0.00725896,
              0.179176, 0.00141933, 0.0333445, -0.00895289, 0.179618, 0.0017999,
              0.0335674, -0.0108219, 0.180238, 0.00225316, 0.033939, -0.0128687,
              0.181417, 0.00279765, 0.0345239, -0.015114, 0.183395, 0.0034564,
              0.0354458, -0.017596, 0.186616, 0.00425864, 0.0368313, -0.0203524,
              0.191547, 0.00524936, 0.0386115, -0.0234105, 0.197508, 0.00647033,
              0.0410303, -0.0268509, 0.205395, 0.00798121, 0.0442245,
              -0.0307481, 0.215365, 0.0098557, 0.0478659, -0.0350863, 0.225595,
              0.0121417, 0.0522416, -0.0399506, 0.236946, 0.0149385, 0.0574513,
              -0.045357, 0.249442, 0.0183189, 0.0631208, -0.0512863, 0.261222,
              0.0223644, 0.0701124, -0.0579273, 0.275418, 0.0272418, 0.0777331,
              -0.0650652, 0.288989, 0.0329458, 0.0862709, -0.0728813, 0.302546,
              0.0396819, 0.096103, -0.081363, 0.317164, 0.04757, 0.106976,
              -0.0904463, 0.331733, 0.0567012, 0.119175, -0.100105, 0.34661,
              0.067202, 0.132919, -0.110375, 0.362249, 0.0792588, 0.147727,
              -0.121115, 0.376978, 0.0928672, 0.163618, -0.132299, 0.390681,
              0.108228, 0.182234, -0.143887, 0.406571, 0.125502, 0.201809,
              -0.155827, 0.42042, 0.144836, 0.225041, -0.168357, 0.438411,
              0.166706, 0.247621, -0.18004, 0.450368, 0.189909, 0.27097,
              -0.191536, 0.460083, 0.215251, 0.296658, -0.203024, 0.469765,
              0.243164, 0.325892, -0.214056, 0.481837, 0.273388, 0.35406,
              -0.224104, 0.487474, 0.305344, 0.384372, -0.233489, 0.492773,
              0.339741, 0.41749, -0.241874, 0.498451, 0.376287, 0.45013,
              -0.248834, 0.499632, 0.414195, 0.481285, -0.254658, 0.495233,
              0.454077, 0.519183, -0.259367, 0.496401, 0.496352, 0.551544,
              -0.261818, 0.487686, 0.538798, 0.587349, -0.262964, 0.479453,
              0.583626, 0.621679, -0.262128, 0.467709, 0.629451, 0.654991,
              -0.258998, 0.452123, 0.67566, 0.686873, -0.254119, 0.433495,
              0.723248, 0.719801, -0.246946, 0.413657, 0.771156, 0.750355,
              -0.237709, 0.390366, 0.81989, 0.780033, -0.226549, 0.364947,
              0.868601, 0.809254, -0.214186, 0.337256, 0.920034, 0.836576,
              -0.199639, 0.307395, 0.971706, 0.861774, -0.183169, 0.275431,
              1.02479, 0.885707, -0.165111, 0.243431, 1.07837, 0.904742,
              -0.144363, 0.210921, 1.12783, 0.915604, -0.121305, 0.17647,
              1.17254, 0.930959, -0.0962119, 0.143106, 1.21012, 0.948404,
              -0.069969, 0.108112, 1.24474, 0.967012, -0.0427586, 0.0708478,
              1.27718, 0.984183, -0.0147043, 0.032335, 1.3083, 0.999577,
              0.0142165, -0.00726867, 1.3382, 0.0229227, -299799e-11, 0.148623,
              4.62391e-7, 0.0232194, -758796e-10, 0.15054, 117033e-10,
              0.0232315, -303636e-9, 0.15063, 468397e-10, 0.0232354, -683189e-9,
              0.150624, 105472e-9, 0.0232092, -0.0012136, 0.150445, 187744e-9,
              0.0232523, -0.00189765, 0.150679, 294847e-9, 0.0232828,
              -0.00273247, 0.150789, 428013e-9, 0.0233371, -0.00371287,
              0.150995, 591134e-9, 0.0234015, -0.00484794, 0.15118, 787642e-9,
              0.023514, -0.00612877, 0.151562, 0.00102547, 0.023679,
              -0.00756125, 0.152116, 0.00131351, 0.0239559, -0.00914651,
              0.153162, 0.00166594, 0.0244334, -0.010904, 0.155133, 0.00210182,
              0.025139, -0.0128615, 0.158035, 0.00264406, 0.0262598, -0.0150628,
              0.162751, 0.00332923, 0.0277875, -0.0175532, 0.168944, 0.00419773,
              0.0298472, -0.0203981, 0.176835, 0.00530034, 0.0325444, -0.023655,
              0.186686, 0.00669777, 0.0355581, -0.0272982, 0.196248, 0.00842661,
              0.0392841, -0.0314457, 0.207352, 0.0105854, 0.0436815, -0.0361157,
              0.219279, 0.0132458, 0.0485272, -0.0412932, 0.230728, 0.0164736,
              0.0541574, -0.0470337, 0.242994, 0.0203715, 0.0609479, -0.0535002,
              0.257042, 0.0250953, 0.0685228, -0.0605409, 0.27102, 0.0306856,
              0.0768042, -0.0680553, 0.28406, 0.037193, 0.0864844, -0.0765011,
              0.299186, 0.0449795, 0.0969415, -0.0852674, 0.3132, 0.0538316,
              0.108478, -0.0947333, 0.327138, 0.0641149, 0.121705, -0.10481,
              0.342345, 0.0759185, 0.136743, -0.115474, 0.358472, 0.0894116,
              0.152986, -0.126536, 0.374067, 0.104562, 0.170397, -0.138061,
              0.388267, 0.121632, 0.191392, -0.150203, 0.406467, 0.140996,
              0.211566, -0.161751, 0.418641, 0.161696, 0.233567, -0.173407,
              0.430418, 0.184557, 0.257769, -0.185397, 0.44277, 0.210092,
              0.28531, -0.197048, 0.457191, 0.237827, 0.311726, -0.20784,
              0.464712, 0.267253, 0.340537, -0.218345, 0.472539, 0.299332,
              0.372921, -0.228306, 0.482331, 0.333988, 0.402924, -0.236665,
              0.484378, 0.369722, 0.434475, -0.244097, 0.484717, 0.407836,
              0.469736, -0.250547, 0.487093, 0.448465, 0.505045, -0.25511,
              0.485575, 0.490263, 0.540262, -0.258444, 0.481225, 0.534495,
              0.576347, -0.259903, 0.473481, 0.579451, 0.608656, -0.259572,
              0.4603, 0.625604, 0.646679, -0.257908, 0.450341, 0.674511,
              0.679902, -0.253663, 0.431561, 0.723269, 0.714159, -0.247419,
              0.412684, 0.773263, 0.745345, -0.239122, 0.389388, 0.824182,
              0.778248, -0.228837, 0.365361, 0.876634, 0.807208, -0.216197,
              0.337667, 0.92945, 0.835019, -0.201772, 0.307197, 0.985261,
              0.860261, -0.185291, 0.274205, 1.04299, 0.877601, -0.165809,
              0.240178, 1.09816, 0.898211, -0.143897, 0.207571, 1.14694,
              0.915789, -0.119513, 0.174904, 1.19008, 0.931831, -0.0932919,
              0.141423, 1.2297, 0.949244, -0.0656528, 0.105603, 1.26553,
              0.967527, -0.0370262, 0.0679551, 1.29986, 0.984139, -0.00730117,
              0.0283133, 1.33252, 0.999713, 0.0234648, -0.0121785, 1.36397,
              0.0152135, -245447e-11, 0.122795, 3.04092e-7, 0.0151652,
              -615778e-10, 0.122399, 76292e-10, 0.0151181, -245948e-9, 0.122023,
              304802e-10, 0.0151203, -553394e-9, 0.12203, 686634e-10, 0.015125,
              -983841e-9, 0.122037, 122463e-9, 0.0151427, -0.00153774, 0.12214,
              192706e-9, 0.0151708, -0.0022103, 0.122237, 281219e-9, 0.0152115,
              -0.00300741, 0.12238, 390804e-9, 0.0152877, -0.00392494, 0.1227,
              526317e-9, 0.015412, -0.00496597, 0.123244, 69443e-8, 0.0156201,
              -0.00613314, 0.124228, 90547e-8, 0.0159658, -0.00744113, 0.125945,
              0.0011732, 0.0165674, -0.00892546, 0.129098, 0.00151888, 0.017487,
              -0.010627, 0.133865, 0.00197007, 0.018839, -0.0126043, 0.140682,
              0.0025637, 0.020554, -0.0148814, 0.148534, 0.00333637, 0.0226727,
              -0.0175123, 0.157381, 0.00433738, 0.0251879, -0.0205266, 0.166685,
              0.00561664, 0.0283635, -0.0240319, 0.177796, 0.00725563,
              0.0318694, -0.0279432, 0.188251, 0.00928811, 0.0361044,
              -0.0324313, 0.200038, 0.011835, 0.0406656, -0.0373527, 0.210685,
              0.0149146, 0.0463846, -0.0430132, 0.224182, 0.0187254, 0.0525696,
              -0.0491013, 0.23634, 0.0232283, 0.0598083, -0.0559175, 0.250013,
              0.0286521, 0.0679437, -0.0633657, 0.263981, 0.0350634, 0.0771181,
              -0.0714602, 0.278072, 0.0425882, 0.0881273, -0.0803502, 0.29511,
              0.0514487, 0.0996628, -0.0896903, 0.309976, 0.0615766, 0.112702,
              -0.099644, 0.325611, 0.0732139, 0.126488, -0.109829, 0.339321,
              0.0862324, 0.142625, -0.120859, 0.35574, 0.101275, 0.15953,
              -0.131956, 0.369845, 0.117892, 0.176991, -0.143145, 0.38146,
              0.136205, 0.199715, -0.155292, 0.40052, 0.157252, 0.220787,
              -0.167066, 0.412055, 0.179966, 0.243697, -0.178396, 0.423133,
              0.204418, 0.272106, -0.190433, 0.439524, 0.232141, 0.297637,
              -0.201265, 0.447041, 0.261109, 0.325273, -0.211834, 0.454488,
              0.292627, 0.357219, -0.221889, 0.465004, 0.326669, 0.387362,
              -0.230729, 0.468527, 0.362426, 0.423131, -0.23924, 0.475836,
              0.401533, 0.45543, -0.246067, 0.475017, 0.441902, 0.493393,
              -0.251557, 0.478017, 0.484239, 0.526253, -0.255571, 0.4709,
              0.528586, 0.560554, -0.257752, 0.463167, 0.574346, 0.599306,
              -0.258076, 0.456452, 0.621655, 0.634541, -0.256471, 0.443725,
              0.670492, 0.668907, -0.253283, 0.428719, 0.721943, 0.705619,
              -0.247562, 0.411348, 0.772477, 0.739034, -0.240626, 0.388939,
              0.8264, 0.771408, -0.231493, 0.36425, 0.881702, 0.803312,
              -0.220125, 0.337321, 0.9385, 0.828457, -0.206645, 0.305364,
              0.997437, 0.854819, -0.190664, 0.273715, 1.05693, 0.878666,
              -0.171429, 0.242218, 1.11251, 0.898404, -0.149235, 0.209556,
              1.16398, 0.917416, -0.12435, 0.176863, 1.21014, 0.933133,
              -0.0972703, 0.142775, 1.25178, 0.95066, -0.0683607, 0.106735,
              1.29028, 0.968589, -0.0378724, 0.0681609, 1.32703, 0.984776,
              -0.00605712, 0.0273966, 1.36158, 0.99994, 0.0263276, -0.0138124,
              1.3943, 0.00867437, -186005e-11, 0.0928979, 1.73682e-7,
              0.00864003, -466389e-10, 0.0925237, 435505e-11, 0.00864593,
              -186594e-9, 0.0925806, 174322e-10, 0.00864095, -419639e-9,
              0.0924903, 392862e-10, 0.00863851, -746272e-9, 0.0924589,
              702598e-10, 0.00868531, -0.00116456, 0.0929, 111188e-9,
              0.00869667, -0.00167711, 0.0928529, 163867e-9, 0.00874332,
              -0.00228051, 0.0930914, 23104e-8, 0.00882709, -0.00297864,
              0.0935679, 31741e-8, 0.00898874, -0.00377557, 0.0946165,
              430186e-9, 0.00929346, -0.00469247, 0.0967406, 580383e-9,
              0.00978271, -0.00575491, 0.100084, 783529e-9, 0.0105746,
              -0.00701514, 0.105447, 0.00106304, 0.0116949, -0.00851797,
              0.112494, 0.00144685, 0.0130419, -0.0102757, 0.119876, 0.00196439,
              0.0148375, -0.012381, 0.129034, 0.00266433, 0.0168725, -0.01482,
              0.137812, 0.00358364, 0.0193689, -0.0176563, 0.147696, 0.00478132,
              0.0222691, -0.0209211, 0.157795, 0.00631721, 0.0256891,
              -0.0246655, 0.168431, 0.00826346, 0.0294686, -0.0288597, 0.178587,
              0.0106714, 0.0340412, -0.0336441, 0.190251, 0.0136629, 0.0393918,
              -0.039033, 0.202999, 0.0173272, 0.0453947, -0.0450087, 0.215655,
              0.0217448, 0.0521936, -0.0515461, 0.228686, 0.0269941, 0.0600279,
              -0.058817, 0.242838, 0.033272, 0.0692398, -0.0667228, 0.258145,
              0.0406457, 0.0793832, -0.0752401, 0.273565, 0.0492239, 0.0902297,
              -0.0841851, 0.287735, 0.0590105, 0.102014, -0.0936479, 0.301161,
              0.0702021, 0.116054, -0.103967, 0.317438, 0.0832001, 0.13191,
              -0.114622, 0.334166, 0.0977951, 0.148239, -0.125452, 0.348192,
              0.113985, 0.165809, -0.136453, 0.361094, 0.131928, 0.184616,
              -0.147648, 0.373534, 0.151811, 0.207491, -0.159607, 0.39101,
              0.174476, 0.230106, -0.171119, 0.402504, 0.198798, 0.257036,
              -0.182906, 0.418032, 0.225796, 0.281172, -0.193605, 0.425468,
              0.254027, 0.312034, -0.204771, 0.440379, 0.285713, 0.340402,
              -0.214988, 0.445406, 0.319196, 0.370231, -0.224711, 0.44968,
              0.35537, 0.407105, -0.233516, 0.460747, 0.393838, 0.439037,
              -0.240801, 0.460624, 0.433747, 0.47781, -0.24762, 0.465957,
              0.477234, 0.510655, -0.251823, 0.460054, 0.52044, 0.550584,
              -0.255552, 0.459172, 0.567853, 0.585872, -0.257036, 0.450311,
              0.615943, 0.620466, -0.257535, 0.437763, 0.667693, 0.660496,
              -0.255248, 0.426639, 0.718988, 0.695578, -0.251141, 0.409185,
              0.772503, 0.732176, -0.244718, 0.39015, 0.827023, 0.760782,
              -0.236782, 0.362594, 0.885651, 0.79422, -0.225923, 0.33711,
              0.943756, 0.824521, -0.213855, 0.308272, 1.00874, 0.854964,
              -0.197723, 0.278529, 1.06764, 0.878065, -0.179209, 0.246208,
              1.12836, 0.899834, -0.157569, 0.21329, 1.18318, 0.918815,
              -0.133206, 0.181038, 1.23161, 0.934934, -0.106545, 0.146993,
              1.27644, 0.952115, -0.0780574, 0.111175, 1.31842, 0.96906,
              -0.0478279, 0.0728553, 1.35839, 0.985178, -0.0160014, 0.032579,
              1.39697, 1.00039, 0.0173126, -0.0095256, 1.43312, 0.00384146,
              -124311e-11, 0.0613583, 7.78271e-8, 0.00390023, -314043e-10,
              0.0622919, 196626e-11, 0.00389971, -125622e-9, 0.0622632,
              787379e-11, 0.00389491, -282352e-9, 0.0620659, 1778e-8,
              0.00391618, -502512e-9, 0.0624687, 320918e-10, 0.00392662,
              -784458e-9, 0.0625113, 515573e-10, 0.00396053, -0.00112907,
              0.0628175, 778668e-10, 0.00401911, -0.00153821, 0.0633286,
              113811e-9, 0.00414994, -0.0020208, 0.0646443, 16445e-8,
              0.00441223, -0.00260007, 0.0673886, 237734e-9, 0.00484427,
              -0.0033097, 0.0716528, 345929e-9, 0.00549109, -0.00418966,
              0.0774998, 505987e-9, 0.00636293, -0.00527331, 0.0844758,
              739208e-9, 0.00746566, -0.00660428, 0.0921325, 0.00107347,
              0.00876625, -0.00818826, 0.0997067, 0.00153691, 0.0103125,
              -0.0100811, 0.107433, 0.00217153, 0.0123309, -0.0123643, 0.117088,
              0.00303427, 0.0146274, -0.0150007, 0.126438, 0.00416018,
              0.0172295, -0.0180531, 0.135672, 0.00561513, 0.0204248,
              -0.0215962, 0.146244, 0.007478, 0.0241597, -0.0256234, 0.157481,
              0.00981046, 0.0284693, -0.0302209, 0.169125, 0.0127148, 0.033445,
              -0.0353333, 0.181659, 0.0162453, 0.0391251, -0.0410845, 0.1944,
              0.0205417, 0.0454721, -0.0473451, 0.207082, 0.0256333, 0.0530983,
              -0.0542858, 0.221656, 0.0317036, 0.0615356, -0.0618384, 0.236036,
              0.0388319, 0.0703363, -0.0697631, 0.248398, 0.046974, 0.0810391,
              -0.0784757, 0.263611, 0.0565246, 0.0920144, -0.0873488, 0.275857,
              0.0671724, 0.105584, -0.0973652, 0.292555, 0.0798105, 0.119506,
              -0.107271, 0.306333, 0.0935945, 0.134434, -0.117608, 0.318888,
              0.109106, 0.153399, -0.128938, 0.337552, 0.127074, 0.171258,
              -0.139944, 0.349955, 0.14643, 0.191059, -0.151288, 0.361545,
              0.168, 0.215069, -0.163018, 0.378421, 0.192082, 0.237838,
              -0.174226, 0.38879, 0.217838, 0.266965, -0.186063, 0.405857,
              0.246931, 0.292827, -0.196909, 0.414146, 0.277505, 0.324352,
              -0.207473, 0.426955, 0.310711, 0.354427, -0.217713, 0.433429,
              0.346794, 0.389854, -0.227183, 0.443966, 0.385237, 0.420749,
              -0.235131, 0.44471, 0.424955, 0.459597, -0.242786, 0.451729,
              0.468446, 0.495316, -0.248767, 0.45072, 0.513422, 0.534903,
              -0.253351, 0.450924, 0.560618, 0.572369, -0.256277, 0.445266,
              0.609677, 0.612383, -0.2576, 0.438798, 0.660995, 0.644037,
              -0.256931, 0.421693, 0.713807, 0.686749, -0.254036, 0.4109,
              0.767616, 0.719814, -0.249785, 0.390151, 0.82533, 0.754719,
              -0.244283, 0.367847, 0.888311, 0.792022, -0.235076, 0.345013,
              0.948177, 0.822404, -0.225061, 0.316193, 1.01661, 0.853084,
              -0.211113, 0.287013, 1.08075, 0.879871, -0.19449, 0.255424,
              1.14501, 0.901655, -0.174023, 0.222879, 1.20203, 0.919957,
              -0.1509, 0.18989, 1.25698, 0.938412, -0.124923, 0.15606, 1.30588,
              0.953471, -0.0968139, 0.120512, 1.3529, 0.970451, -0.066734,
              0.0828515, 1.3986, 0.985522, -0.034734, 0.0424458, 1.44148,
              1.00099, -0.00102222, 678929e-9, 1.48398, 965494e-9, -6.27338e-7,
              0.0306409, 1.97672e-8, 99168e-8, -158573e-10, 0.0314638,
              4.99803e-7, 991068e-9, -634012e-10, 0.031363, 200682e-11,
              974567e-9, -14144e-8, 0.03036, 457312e-11, 998079e-9, -252812e-9,
              0.031496, 860131e-11, 0.00102243, -396506e-9, 0.0319955,
              148288e-10, 0.00107877, -577593e-9, 0.0331376, 249141e-10,
              0.00121622, -816816e-9, 0.0359396, 423011e-10, 0.0014455,
              -0.00113761, 0.0399652, 724613e-10, 0.00178791, -0.00156959,
              0.0450556, 123929e-9, 0.00225668, -0.00214064, 0.0508025,
              208531e-9, 0.00285627, -0.00287655, 0.0568443, 341969e-9,
              0.0035991, -0.00380271, 0.0630892, 544158e-9, 0.00455524,
              -0.00496264, 0.0702204, 842423e-9, 0.00569143, -0.0063793,
              0.0773426, 0.00126704, 0.00716928, -0.00813531, 0.0860839,
              0.00186642, 0.00885307, -0.0101946, 0.0944079, 0.00267014,
              0.0109316, -0.0126386, 0.103951, 0.00374033, 0.0133704,
              -0.0154876, 0.113786, 0.0051304, 0.0161525, -0.0187317, 0.123477,
              0.00688858, 0.0194267, -0.0224652, 0.133986, 0.00910557,
              0.0230967, -0.0265976, 0.143979, 0.0118074, 0.0273627, -0.0312848,
              0.154645, 0.0151266, 0.0323898, -0.0365949, 0.166765, 0.0191791,
              0.0379225, -0.0422914, 0.177932, 0.0239236, 0.0447501, -0.0487469,
              0.19167, 0.0296568, 0.0519391, -0.0556398, 0.203224, 0.0362924,
              0.0599464, -0.0631646, 0.215652, 0.0440585, 0.0702427, -0.0714308,
              0.232089, 0.0531619, 0.0806902, -0.0800605, 0.245258, 0.0634564,
              0.0923194, -0.0892815, 0.258609, 0.0752481, 0.106938, -0.09931,
              0.276654, 0.0888914, 0.121238, -0.109575, 0.289847, 0.104055,
              0.138817, -0.120461, 0.307566, 0.121266, 0.15595, -0.131209,
              0.320117, 0.139944, 0.178418, -0.143049, 0.339677, 0.161591,
              0.197875, -0.154074, 0.349886, 0.184303, 0.224368, -0.166307,
              0.369352, 0.210669, 0.252213, -0.178051, 0.386242, 0.238895,
              0.277321, -0.189335, 0.395294, 0.269182, 0.310332, -0.200683,
              0.412148, 0.302508, 0.338809, -0.210856, 0.418266, 0.337264,
              0.372678, -0.220655, 0.428723, 0.374881, 0.405632, -0.230053,
              0.433887, 0.415656, 0.442293, -0.237993, 0.439911, 0.457982,
              0.477256, -0.244897, 0.440175, 0.502831, 0.515592, -0.250657,
              0.441079, 0.550277, 0.550969, -0.255459, 0.435219, 0.601102,
              0.592883, -0.257696, 0.432882, 0.651785, 0.629092, -0.259894,
              0.421054, 0.708961, 0.672033, -0.258592, 0.41177, 0.763806,
              0.709147, -0.256525, 0.395267, 0.824249, 0.745367, -0.254677,
              0.375013, 0.8951, 0.784715, -0.247892, 0.353906, 0.959317,
              0.818107, -0.240162, 0.327801, 1.03153, 0.847895, -0.229741,
              0.298821, 1.10601, 0.879603, -0.213084, 0.269115, 1.164, 0.902605,
              -0.195242, 0.236606, 1.22854, 0.922788, -0.174505, 0.203442,
              1.29017, 0.944831, -0.150169, 0.169594, 1.34157, 0.959656,
              -0.124099, 0.135909, 1.3956, 0.972399, -0.0960626, 0.0990563,
              1.45128, 0.986549, -0.0657097, 0.0602348, 1.50312, 1.00013,
              -0.0333558, 0.0186694, 1.55364, 619747e-11, -1e-7, 0.00778326,
              796756e-16, 2.37499e-8, -9.99999e-8, 282592e-10, 1.14596e-10,
              100292e-11, -166369e-11, 250354e-9, 6.77492e-9, 350752e-11,
              -637769e-11, 357289e-9, 6.31655e-8, 826445e-11, -174689e-10,
              516179e-9, 3.1851e-7, 242481e-10, -450868e-10, 0.0010223,
              130577e-11, 455631e-10, -89044e-9, 0.00144302, 374587e-11,
              971222e-10, -178311e-9, 0.00241912, 102584e-10, 171403e-9,
              -313976e-9, 0.00354938, 236481e-10, 292747e-9, -520026e-9,
              0.00513765, 496014e-10, 789827e-9, -0.00118187, 0.0238621,
              139056e-9, 0.00114093, -0.00171827, 0.0286691, 244093e-9,
              0.00176119, -0.00249667, 0.0368565, 420623e-9, 0.0022233,
              -0.00333742, 0.0400469, 65673e-8, 0.00343382, -0.00481976,
              0.0535751, 0.00109323, 0.00427602, -0.00600755, 0.057099,
              0.00155268, 0.00461435, -0.00737637, 0.0551084, 0.00215031,
              0.00695698, -0.00971401, 0.0715767, 0.00316529, 0.00867619,
              -0.0120943, 0.0793314, 0.00436995, 0.0106694, -0.0148202,
              0.0869391, 0.0058959, 0.0140351, -0.0183501, 0.101572, 0.00798757,
              0.0168939, -0.022006, 0.11018, 0.0104233, 0.020197, -0.0261568,
              0.119041, 0.0134167, 0.0254702, -0.0312778, 0.135404, 0.0173009,
              0.0298384, -0.0362469, 0.1437, 0.0215428, 0.035159, -0.042237,
              0.15512, 0.0268882, 0.0427685, -0.0488711, 0.17128, 0.033235,
              0.0494848, -0.0557997, 0.181813, 0.0404443, 0.0592394, -0.0635578,
              0.198745, 0.0490043, 0.0681463, -0.071838, 0.210497, 0.0588239,
              0.0804753, -0.0809297, 0.228864, 0.0702835, 0.0942205, -0.0906488,
              0.247008, 0.0834012, 0.106777, -0.100216, 0.258812, 0.0975952,
              0.124471, -0.110827, 0.278617, 0.114162, 0.138389, -0.121193,
              0.287049, 0.131983, 0.159543, -0.13253, 0.307151, 0.152541,
              0.176432, -0.143611, 0.31564, 0.174673, 0.201723, -0.15548,
              0.33538, 0.199842, 0.229721, -0.167166, 0.355256, 0.227097,
              0.250206, -0.178238, 0.360047, 0.256014, 0.282118, -0.189905,
              0.378761, 0.28855, 0.312821, -0.201033, 0.39181, 0.323348,
              0.341482, -0.211584, 0.397716, 0.360564, 0.377368, -0.221314,
              0.410141, 0.400004, 0.418229, -0.230474, 0.423485, 0.442371,
              0.444881, -0.239443, 0.418874, 0.488796, 0.488899, -0.245987,
              0.427545, 0.535012, 0.520317, -0.253948, 0.422147, 0.589678,
              0.568566, -0.256616, 0.42719, 0.637683, 0.599607, -0.26376,
              0.415114, 0.703363, 0.64222, -0.268687, 0.408715, 0.771363,
              0.685698, -0.2694, 0.399722, 0.83574, 0.732327, -0.266642,
              0.388651, 0.897764, 0.769873, -0.267712, 0.369198, 0.983312,
              0.806733, -0.263479, 0.346802, 1.06222, 0.843466, -0.254575,
              0.321368, 1.13477, 0.873008, -0.242749, 0.29211, 1.20712,
              0.908438, -0.22725, 0.262143, 1.27465, 0.936321, -0.207621,
              0.228876, 1.33203, 0.950353, -0.187932, 0.19484, 1.40439, 0.96442,
              -0.165154, 0.163178, 1.4732, 0.979856, -0.139302, 0.127531,
              1.53574, 0.982561, -0.11134, 0.0903457, 1.59982, 0.996389,
              -0.0808124, 0.0489007, 1.6577,
            ],
            A = [
              1, 0, 0, 0, 1, 791421e-36, 0, 0, 1, 104392e-29, 0, 0, 1,
              349405e-26, 0, 0, 1, 109923e-23, 0, 0, 1, 947414e-22, 0, 0, 1,
              359627e-20, 0, 0, 1, 772053e-19, 0, 0, 1, 108799e-17, 0, 0, 1,
              110655e-16, 0, 0, 1, 865818e-16, 0, 0, 0.999998, 5.45037e-10, 0,
              0, 0.999994, 2.85095e-9, 0, 0, 0.999989, 1.26931e-8, 0, 0,
              0.999973, 4.89938e-8, 0, 0, 0.999947, 1.66347e-7, 0, 0, 0.999894,
              5.02694e-7, 0, 0, 0.999798, 136532e-11, 0, 0, 0.999617,
              335898e-11, 0, 0, 0.999234, 752126e-11, 0, 0, 0.998258,
              152586e-10, 0, 0, 0.99504, 266207e-10, 0, 0, 0.980816, 236802e-10,
              0, 0, 0.967553, 207684e-11, 0, 0, 0.966877, 403733e-11, 0, 0,
              0.965752, 741174e-11, 0, 0, 0.96382, 127746e-10, 0, 0, 0.960306,
              202792e-10, 0, 0, 0.953619, 280232e-10, 0, 0, 0.941103,
              278816e-10, 0, 0, 0.926619, 160221e-10, 0, 0, 0.920983,
              235164e-10, 0, 0, 0.912293, 311924e-10, 0, 0.0158731, 0.899277,
              348118e-10, 0, 0.0476191, 0.880884, 26041e-9, 0, 0.0793651,
              0.870399, 338726e-10, 0, 0.111111, 0.856138, 392906e-10, 0,
              0.142857, 0.837436, 372874e-10, 0, 0.174603, 0.820973, 392558e-10,
              0, 0.206349, 0.803583, 434658e-10, 0, 0.238095, 0.782168,
              40256e-9, 0, 0.269841, 0.764107, 448159e-10, 0, 0.301587,
              0.743092, 457627e-10, 0, 0.333333, 0.721626, 455314e-10, 0,
              0.365079, 0.700375, 477335e-10, 0, 0.396825, 0.677334, 461072e-10,
              0, 0.428571, 0.655702, 484393e-10, 0, 0.460317, 0.632059,
              464583e-10, 0, 0.492064, 0.610125, 483923e-10, 0, 0.52381,
              0.58653, 464342e-10, 0, 0.555556, 0.564508, 477033e-10, 0,
              0.587302, 0.541405, 459263e-10, 0, 0.619048, 0.519556, 46412e-9,
              0, 0.650794, 0.497292, 448913e-10, 0, 0.68254, 0.475898,
              445789e-10, 0, 0.714286, 0.454722, 433496e-10, 0, 0.746032,
              0.434042, 423054e-10, 0, 0.777778, 0.414126, 413737e-10, 0,
              0.809524, 0.394387, 397265e-10, 0, 0.84127, 0.375841, 390709e-10,
              0, 0.873016, 0.357219, 369938e-10, 0, 0.904762, 0.340084,
              365618e-10, 0, 0.936508, 0.322714, 342533e-10, 0, 0.968254,
              0.306974, 339596e-10, 0, 1, 1, 101524e-23, 0, 0, 1, 10292e-22, 0,
              0, 1, 130908e-23, 0, 0, 1, 473331e-23, 0, 0, 1, 625319e-22, 0, 0,
              1, 107932e-20, 0, 0, 1, 163779e-19, 0, 0, 1, 203198e-18, 0, 0, 1,
              204717e-17, 0, 0, 0.999999, 168995e-16, 0, 0, 0.999998,
              1.15855e-10, 0, 0, 0.999996, 6.6947e-10, 0, 0, 0.999991,
              3.30863e-9, 0, 0, 0.999983, 1.41737e-8, 0, 0, 0.999968,
              5.32626e-8, 0, 0, 0.99994, 1.77431e-7, 0, 0, 0.999891, 5.28835e-7,
              0, 0, 0.999797, 142169e-11, 0, 0, 0.999617, 347057e-11, 0, 0,
              0.999227, 77231e-10, 0, 0, 0.998239, 155753e-10, 0, 0, 0.994937,
              268495e-10, 0, 0, 0.980225, 213742e-10, 0, 0, 0.967549, 21631e-10,
              0, 0, 0.966865, 417989e-11, 0, 0, 0.965739, 763341e-11, 0, 0,
              0.963794, 130892e-10, 0, 0, 0.960244, 206456e-10, 0, 0, 0.953495,
              282016e-10, 0, 148105e-9, 0.940876, 271581e-10, 0, 0.002454,
              0.926569, 164159e-10, 0, 0.00867491, 0.920905, 239521e-10, 0,
              0.01956, 0.912169, 315127e-10, 0, 0.035433, 0.899095, 346626e-10,
              0, 0.056294, 0.882209, 290223e-10, 0, 0.0818191, 0.870272,
              342992e-10, 0, 0.111259, 0.855977, 394164e-10, 0, 0.142857,
              0.837431, 372343e-10, 0, 0.174603, 0.820826, 396691e-10, 0,
              0.206349, 0.803408, 435395e-10, 0, 0.238095, 0.782838, 419579e-10,
              0, 0.269841, 0.763941, 450953e-10, 0, 0.301587, 0.742904,
              455847e-10, 0, 0.333333, 0.721463, 458833e-10, 0, 0.365079,
              0.700197, 477159e-10, 0, 0.396825, 0.677501, 470641e-10, 0,
              0.428571, 0.655527, 484732e-10, 0, 0.460317, 0.6324, 476834e-10,
              0, 0.492064, 0.609964, 484213e-10, 0, 0.52381, 0.586839,
              475541e-10, 0, 0.555556, 0.564353, 476951e-10, 0, 0.587302,
              0.541589, 467611e-10, 0, 0.619048, 0.519413, 463493e-10, 0,
              0.650794, 0.497337, 453994e-10, 0, 0.68254, 0.475797, 445308e-10,
              0, 0.714286, 0.454659, 435787e-10, 0, 0.746032, 0.434065,
              424839e-10, 0, 0.777778, 0.414018, 41436e-9, 0, 0.809524, 0.39455,
              401902e-10, 0, 0.84127, 0.375742, 390813e-10, 0, 0.873016,
              0.357501, 377116e-10, 0, 0.904762, 0.339996, 36535e-9, 0,
              0.936508, 0.323069, 351265e-10, 0, 0.968254, 0.306897, 339112e-10,
              0, 1, 1, 10396e-19, 0, 0, 1, 104326e-20, 0, 0, 1, 110153e-20, 0,
              0, 1, 144668e-20, 0, 0, 1, 34528e-19, 0, 0, 1, 175958e-19, 0, 0,
              1, 12627e-17, 0, 0, 1, 936074e-18, 0, 0, 1, 645742e-17, 0, 0,
              0.999998, 401228e-16, 0, 0, 0.999997, 2.22338e-10, 0, 0, 0.999995,
              1.0967e-9, 0, 0, 0.999991, 4.82132e-9, 0, 0, 0.999981, 1.89434e-8,
              0, 0, 0.999967, 6.67716e-8, 0, 0, 0.999938, 2.12066e-7, 0, 0,
              0.999886, 6.0977e-7, 0, 0, 0.999792, 159504e-11, 0, 0, 0.999608,
              381191e-11, 0, 0, 0.999209, 833727e-11, 0, 0, 0.998179,
              165288e-10, 0, 0, 0.994605, 274387e-10, 0, 0, 0.979468,
              167316e-10, 0, 0, 0.967529, 242877e-11, 0, 0, 0.966836,
              461696e-11, 0, 0, 0.96569, 830977e-11, 0, 0, 0.963706, 140427e-10,
              0, 244659e-11, 0.960063, 217353e-10, 0, 760774e-9, 0.953113,
              286606e-10, 0, 0.00367261, 0.940192, 247691e-10, 0, 0.00940263,
              0.927731, 195814e-10, 0, 0.018333, 0.920669, 252531e-10, 0,
              0.0306825, 0.911799, 324277e-10, 0, 0.0465556, 0.89857,
              340982e-10, 0, 0.0659521, 0.883283, 319622e-10, 0, 0.0887677,
              0.86989, 35548e-9, 0, 0.114784, 0.855483, 397143e-10, 0, 0.143618,
              0.837987, 391665e-10, 0, 0.174606, 0.820546, 411306e-10, 0,
              0.206349, 0.802878, 436753e-10, 0, 0.238095, 0.783402, 444e-7, 0,
              0.269841, 0.763439, 458726e-10, 0, 0.301587, 0.742925, 467097e-10,
              0, 0.333333, 0.721633, 478887e-10, 0, 0.365079, 0.69985,
              481251e-10, 0, 0.396825, 0.67783, 491811e-10, 0, 0.428571,
              0.655126, 488199e-10, 0, 0.460318, 0.632697, 496025e-10, 0,
              0.492064, 0.609613, 48829e-9, 0, 0.52381, 0.587098, 492754e-10, 0,
              0.555556, 0.564119, 482625e-10, 0, 0.587302, 0.541813, 482807e-10,
              0, 0.619048, 0.519342, 471552e-10, 0, 0.650794, 0.497514,
              466765e-10, 0, 0.68254, 0.475879, 455582e-10, 0, 0.714286,
              0.454789, 446007e-10, 0, 0.746032, 0.434217, 435382e-10, 0,
              0.777778, 0.414086, 421753e-10, 0, 0.809524, 0.394744, 412093e-10,
              0, 0.84127, 0.375782, 396634e-10, 0, 0.873016, 0.357707,
              386419e-10, 0, 0.904762, 0.340038, 370345e-10, 0, 0.936508,
              0.323284, 359725e-10, 0, 0.968254, 0.306954, 3436e-8, 0, 1, 1,
              599567e-19, 0, 0, 1, 600497e-19, 0, 0, 1, 614839e-19, 0, 0, 1,
              686641e-19, 0, 0, 1, 972658e-19, 0, 0, 1, 221271e-18, 0, 0, 1,
              833195e-18, 0, 0, 1, 403601e-17, 0, 0, 0.999999, 206001e-16, 0, 0,
              0.999998, 1.01739e-10, 0, 0, 0.999997, 4.70132e-10, 0, 0,
              0.999993, 2.00436e-9, 0, 0, 0.999988, 7.83682e-9, 0, 0, 0.999979,
              2.80338e-8, 0, 0, 0.999962, 9.17033e-8, 0, 0, 0.999933,
              2.74514e-7, 0, 0, 0.999881, 7.53201e-7, 0, 0, 0.999783,
              189826e-11, 0, 0, 0.999594, 440279e-11, 0, 0, 0.999178, 93898e-10,
              0, 0, 0.998073, 181265e-10, 0, 0, 0.993993, 280487e-10, 0, 0,
              0.979982, 149422e-10, 0, 0, 0.968145, 378481e-11, 0, 0, 0.966786,
              53771e-10, 0, 0, 0.965611, 947508e-11, 0, 388934e-10, 0.963557,
              156616e-10, 0, 9693e-7, 0.959752, 235144e-10, 0, 0.00370329,
              0.952461, 291568e-10, 0, 0.00868428, 0.940193, 240102e-10, 0,
              0.0161889, 0.929042, 231235e-10, 0, 0.0263948, 0.920266,
              273968e-10, 0, 0.0394088, 0.911178, 337915e-10, 0, 0.0552818,
              0.897873, 333629e-10, 0, 0.0740138, 0.884053, 351405e-10, 0,
              0.0955539, 0.869455, 378034e-10, 0, 0.119795, 0.854655,
              399378e-10, 0, 0.14656, 0.838347, 419108e-10, 0, 0.175573,
              0.820693, 440831e-10, 0, 0.206388, 0.802277, 445599e-10, 0,
              0.238095, 0.783634, 472691e-10, 0, 0.269841, 0.763159, 476984e-10,
              0, 0.301587, 0.742914, 491487e-10, 0, 0.333333, 0.721662,
              502312e-10, 0, 0.365079, 0.699668, 502817e-10, 0, 0.396825,
              0.677839, 51406e-9, 0, 0.428571, 0.655091, 511095e-10, 0,
              0.460317, 0.632665, 516067e-10, 0, 0.492064, 0.609734, 512255e-10,
              0, 0.52381, 0.587043, 510263e-10, 0, 0.555556, 0.564298, 50565e-9,
              0, 0.587302, 0.541769, 497951e-10, 0, 0.619048, 0.519529,
              492698e-10, 0, 0.650794, 0.497574, 482066e-10, 0, 0.68254,
              0.476028, 473689e-10, 0, 0.714286, 0.454961, 461941e-10, 0,
              0.746032, 0.434341, 450618e-10, 0, 0.777778, 0.414364, 438355e-10,
              0, 0.809524, 0.394832, 424196e-10, 0, 0.84127, 0.376109,
              412563e-10, 0, 0.873016, 0.35779, 396226e-10, 0, 0.904762,
              0.340379, 384886e-10, 0, 0.936508, 0.323385, 368214e-10, 0,
              0.968254, 0.307295, 356636e-10, 0, 1, 1, 106465e-17, 0, 0, 1,
              106555e-17, 0, 0, 1, 107966e-17, 0, 0, 1, 114601e-17, 0, 0, 1,
              137123e-17, 0, 0, 1, 21243e-16, 0, 0, 0.999999, 489653e-17, 0, 0,
              0.999999, 160283e-16, 0, 0, 0.999998, 62269e-15, 0, 0, 0.999997,
              2.51859e-10, 0, 0, 0.999996, 9.96192e-10, 0, 0, 0.999992,
              3.74531e-9, 0, 0, 0.999986, 1.32022e-8, 0, 0, 0.999975,
              4.33315e-8, 0, 0, 0.999959, 1.31956e-7, 0, 0, 0.999927,
              3.72249e-7, 0, 0, 0.999871, 9.72461e-7, 0, 0, 0.999771,
              235343e-11, 0, 0, 0.999572, 52768e-10, 0, 0, 0.999133, 109237e-10,
              0, 0, 0.997912, 203675e-10, 0, 0, 0.993008, 279396e-10, 0, 0,
              0.980645, 139604e-10, 0, 0, 0.970057, 646596e-11, 0, 0, 0.966717,
              65089e-10, 0, 474145e-10, 0.965497, 111863e-10, 0, 89544e-8,
              0.96334, 179857e-10, 0, 0.0032647, 0.959294, 259045e-10, 0,
              0.0075144, 0.951519, 292327e-10, 0, 0.0138734, 0.940517,
              249769e-10, 0, 0.0224952, 0.93014, 26803e-9, 0, 0.0334828,
              0.91972, 303656e-10, 0, 0.0468973, 0.910294, 353323e-10, 0,
              0.0627703, 0.897701, 351002e-10, 0, 0.0811019, 0.884522,
              388104e-10, 0, 0.10186, 0.869489, 412932e-10, 0, 0.124985,
              0.853983, 415781e-10, 0, 0.150372, 0.838425, 454066e-10, 0,
              0.177868, 0.820656, 471624e-10, 0, 0.207245, 0.801875, 475243e-10,
              0, 0.238143, 0.783521, 505621e-10, 0, 0.269841, 0.763131,
              50721e-9, 0, 0.301587, 0.74261, 523293e-10, 0, 0.333333, 0.72148,
              528699e-10, 0, 0.365079, 0.699696, 538677e-10, 0, 0.396825,
              0.677592, 539255e-10, 0, 0.428571, 0.65525, 546367e-10, 0,
              0.460317, 0.632452, 541348e-10, 0, 0.492064, 0.609903, 544976e-10,
              0, 0.52381, 0.586928, 536201e-10, 0, 0.555556, 0.564464,
              535185e-10, 0, 0.587302, 0.541801, 524949e-10, 0, 0.619048,
              0.519681, 51812e-9, 0, 0.650794, 0.497685, 507687e-10, 0, 0.68254,
              0.47622, 496243e-10, 0, 0.714286, 0.455135, 485714e-10, 0,
              0.746032, 0.4346, 471847e-10, 0, 0.777778, 0.414564, 459294e-10,
              0, 0.809524, 0.395165, 444705e-10, 0, 0.84127, 0.376333,
              430772e-10, 0, 0.873016, 0.358197, 416229e-10, 0, 0.904762,
              0.34064, 401019e-10, 0, 0.936508, 0.323816, 386623e-10, 0,
              0.968254, 0.307581, 370933e-10, 0, 1, 1, 991541e-17, 0, 0, 1,
              992077e-17, 0, 0, 1, 100041e-16, 0, 0, 1, 10385e-15, 0, 0, 1,
              115777e-16, 0, 0, 1, 150215e-16, 0, 0, 0.999999, 254738e-16, 0, 0,
              0.999999, 598822e-16, 0, 0, 0.999998, 1.79597e-10, 0, 0, 0.999997,
              6.02367e-10, 0, 0, 0.999994, 2.06835e-9, 0, 0, 0.99999,
              6.94952e-9, 0, 0, 0.999984, 2.23363e-8, 0, 0, 0.999972,
              6.78578e-8, 0, 0, 0.999952, 1.93571e-7, 0, 0, 0.999919,
              5.16594e-7, 0, 0, 0.99986, 128739e-11, 0, 0, 0.999753, 299298e-11,
              0, 0, 0.999546, 648258e-11, 0, 0, 0.999074, 129985e-10, 0, 0,
              0.997671, 232176e-10, 0, 0, 0.991504, 256701e-10, 0, 0, 0.981148,
              131141e-10, 0, 0, 0.971965, 869048e-11, 0, 280182e-10, 0.966624,
              808301e-11, 0, 695475e-9, 0.965344, 135235e-10, 0, 0.00265522,
              0.963048, 210592e-10, 0, 0.00622975, 0.958673, 287473e-10, 0,
              0.0116234, 0.950262, 281379e-10, 0, 0.018976, 0.940836,
              271089e-10, 0, 0.0283844, 0.930996, 30926e-9, 0, 0.0399151,
              0.919848, 348359e-10, 0, 0.0536063, 0.909136, 366092e-10, 0,
              0.0694793, 0.897554, 384162e-10, 0, 0.0875342, 0.884691,
              430971e-10, 0, 0.107749, 0.869414, 447803e-10, 0, 0.130087,
              0.853462, 452858e-10, 0, 0.154481, 0.838187, 495769e-10, 0,
              0.180833, 0.820381, 502709e-10, 0, 0.209005, 0.801844, 522713e-10,
              0, 0.238791, 0.783061, 541505e-10, 0, 0.269869, 0.763205,
              553712e-10, 0, 0.301587, 0.742362, 564909e-10, 0, 0.333333,
              0.721393, 572646e-10, 0, 0.365079, 0.699676, 581012e-10, 0,
              0.396825, 0.677395, 58096e-9, 0, 0.428571, 0.655208, 585766e-10,
              0, 0.460317, 0.632451, 583602e-10, 0, 0.492064, 0.609839,
              580234e-10, 0, 0.52381, 0.587093, 577161e-10, 0, 0.555556,
              0.564467, 568447e-10, 0, 0.587302, 0.542043, 563166e-10, 0,
              0.619048, 0.519826, 55156e-9, 0, 0.650794, 0.497952, 541682e-10,
              0, 0.68254, 0.476477, 528971e-10, 0, 0.714286, 0.455412,
              514952e-10, 0, 0.746032, 0.434926, 502222e-10, 0, 0.777778,
              0.4149, 485779e-10, 0, 0.809524, 0.395552, 472242e-10, 0, 0.84127,
              0.376712, 454891e-10, 0, 0.873016, 0.358622, 440924e-10, 0,
              0.904762, 0.341048, 422984e-10, 0, 0.936508, 0.324262, 408582e-10,
              0, 0.968254, 0.308013, 390839e-10, 0, 1, 1, 613913e-16, 0, 0, 1,
              614145e-16, 0, 0, 1, 617708e-16, 0, 0, 1, 633717e-16, 0, 0, 1,
              681648e-16, 0, 0, 1, 808291e-16, 0, 0, 1, 1.14608e-10, 0, 0,
              0.999998, 2.10507e-10, 0, 0, 0.999997, 4.99595e-10, 0, 0,
              0.999995, 1.39897e-9, 0, 0, 0.999994, 4.19818e-9, 0, 0, 0.999988,
              1.27042e-8, 0, 0, 0.999979, 3.75153e-8, 0, 0, 0.999965,
              1.06206e-7, 0, 0, 0.999945, 2.85381e-7, 0, 0, 0.999908,
              7.23611e-7, 0, 0, 0.999846, 17255e-10, 0, 0, 0.999733, 386104e-11,
              0, 0, 0.999511, 808493e-11, 0, 0, 0.998993, 156884e-10, 0, 0,
              0.997326, 265538e-10, 0, 0, 0.989706, 206466e-10, 0, 0, 0.981713,
              130756e-10, 0, 70005e-10, 0.973636, 106473e-10, 0, 464797e-9,
              0.966509, 10194e-9, 0, 0.00201743, 0.965149, 165881e-10, 0,
              0.00497549, 0.962669, 249147e-10, 0, 0.00953262, 0.95786,
              317449e-10, 0, 0.0158211, 0.949334, 281045e-10, 0, 0.0239343,
              0.941041, 303263e-10, 0, 0.0339372, 0.931575, 356754e-10, 0,
              0.0458738, 0.920102, 397075e-10, 0, 0.059772, 0.908002,
              384886e-10, 0, 0.075645, 0.897269, 43027e-9, 0, 0.0934929,
              0.884559, 479925e-10, 0, 0.113302, 0.869161, 48246e-9, 0,
              0.135045, 0.853342, 509505e-10, 0, 0.158678, 0.837633, 542846e-10,
              0, 0.184136, 0.820252, 554139e-10, 0, 0.211325, 0.801872,
              581412e-10, 0, 0.240113, 0.782418, 585535e-10, 0, 0.270306,
              0.7631, 610923e-10, 0, 0.301594, 0.742183, 613678e-10, 0,
              0.333333, 0.721098, 627275e-10, 0, 0.365079, 0.699512, 629413e-10,
              0, 0.396825, 0.677372, 636351e-10, 0, 0.428571, 0.655059,
              633555e-10, 0, 0.460317, 0.632567, 636513e-10, 0, 0.492064,
              0.609784, 628965e-10, 0, 0.52381, 0.587237, 625546e-10, 0,
              0.555556, 0.564525, 615825e-10, 0, 0.587302, 0.542181, 605048e-10,
              0, 0.619048, 0.520017, 596329e-10, 0, 0.650794, 0.498204,
              581516e-10, 0, 0.68254, 0.476742, 569186e-10, 0, 0.714286,
              0.455803, 553833e-10, 0, 0.746032, 0.435251, 537807e-10, 0,
              0.777778, 0.415374, 522025e-10, 0, 0.809524, 0.395921, 503421e-10,
              0, 0.84127, 0.377253, 488211e-10, 0, 0.873016, 0.359021,
              468234e-10, 0, 0.904762, 0.341637, 453269e-10, 0, 0.936508,
              0.3247, 433014e-10, 0, 0.968254, 0.308625, 418007e-10, 0, 1, 1,
              2.86798e-10, 0, 0, 1, 2.86877e-10, 0, 0, 1, 2.88094e-10, 0, 0, 1,
              2.93506e-10, 0, 0, 1, 3.09262e-10, 0, 0, 0.999999, 3.48593e-10, 0,
              0, 0.999999, 4.44582e-10, 0, 0, 0.999998, 6.88591e-10, 0, 0,
              0.999996, 1.34391e-9, 0, 0, 0.999993, 3.17438e-9, 0, 0, 0.999989,
              8.35609e-9, 0, 0, 0.999983, 2.28677e-8, 0, 0, 0.999974,
              6.23361e-8, 0, 0, 0.999959, 1.65225e-7, 0, 0, 0.999936,
              4.19983e-7, 0, 0, 0.999896, 101546e-11, 0, 0, 0.99983, 232376e-11,
              0, 0, 0.999709, 50156e-10, 0, 0, 0.999469, 10167e-9, 0, 0,
              0.998886, 190775e-10, 0, 0, 0.996819, 300511e-10, 0, 0, 0.988837,
              185092e-10, 0, 1.68222e-7, 0.982178, 134622e-10, 0, 259622e-9,
              0.975017, 125961e-10, 0, 0.00142595, 0.967101, 13507e-9, 0,
              0.00382273, 0.964905, 205003e-10, 0, 0.00764164, 0.96218,
              29546e-9, 0, 0.0130121, 0.956821, 343738e-10, 0, 0.0200253,
              0.948829, 305063e-10, 0, 0.0287452, 0.941092, 346487e-10, 0,
              0.039218, 0.931883, 412061e-10, 0, 0.0514748, 0.920211,
              444651e-10, 0, 0.0655351, 0.907307, 431252e-10, 0, 0.0814082,
              0.89684, 490382e-10, 0, 0.0990939, 0.884119, 53334e-9, 0,
              0.118583, 0.869148, 54114e-9, 0, 0.139856, 0.853377, 578536e-10,
              0, 0.162882, 0.836753, 592285e-10, 0, 0.187615, 0.820063,
              622787e-10, 0, 0.213991, 0.801694, 645492e-10, 0, 0.241918,
              0.782116, 65353e-9, 0, 0.271267, 0.762673, 674344e-10, 0,
              0.301847, 0.742133, 682788e-10, 0, 0.333333, 0.720779, 691959e-10,
              0, 0.365079, 0.699386, 696817e-10, 0, 0.396826, 0.67732,
              699583e-10, 0, 0.428572, 0.654888, 698447e-10, 0, 0.460318,
              0.632499, 694063e-10, 0, 0.492064, 0.609825, 691612e-10, 0,
              0.52381, 0.587287, 681576e-10, 0, 0.555556, 0.564743, 674138e-10,
              0, 0.587302, 0.542409, 661617e-10, 0, 0.619048, 0.520282,
              647785e-10, 0, 0.650794, 0.498506, 633836e-10, 0, 0.68254,
              0.477102, 615905e-10, 0, 0.714286, 0.456167, 601013e-10, 0,
              0.746032, 0.435728, 581457e-10, 0, 0.777778, 0.415809, 564215e-10,
              0, 0.809524, 0.396517, 544997e-10, 0, 0.84127, 0.377737,
              525061e-10, 0, 0.873016, 0.359698, 506831e-10, 0, 0.904762,
              0.342164, 48568e-9, 0, 0.936508, 0.325417, 467826e-10, 0,
              0.968254, 0.309186, 446736e-10, 0, 1, 1, 1.09018e-9, 0, 0, 1,
              1.0904e-9, 0, 0, 1, 1.09393e-9, 0, 0, 1, 1.1095e-9, 0, 0, 1,
              1.154e-9, 0, 0, 1, 1.26089e-9, 0, 0, 0.999999, 1.5059e-9, 0, 0,
              0.999997, 2.07899e-9, 0, 0, 0.999994, 3.48164e-9, 0, 0, 0.999993,
              7.05728e-9, 0, 0, 0.999987, 1.63692e-8, 0, 0, 0.999981,
              4.06033e-8, 0, 0, 0.999969, 1.0245e-7, 0, 0, 0.999953, 2.55023e-7,
              0, 0, 0.999925, 6.1511e-7, 0, 0, 0.999881, 142218e-11, 0, 0,
              0.99981, 313086e-11, 0, 0, 0.99968, 653119e-11, 0, 0, 0.999418,
              12832e-9, 0, 0, 0.998748, 232497e-10, 0, 0, 0.996066, 329522e-10,
              0, 0, 0.988379, 179613e-10, 0, 108799e-9, 0.982567, 143715e-10, 0,
              921302e-9, 0.976097, 148096e-10, 0, 0.00280738, 0.968475,
              178905e-10, 0, 0.00596622, 0.964606, 253921e-10, 0, 0.0105284,
              0.961564, 348623e-10, 0, 0.0165848, 0.955517, 357612e-10, 0,
              0.0242, 0.948381, 343493e-10, 0, 0.03342, 0.941095, 405849e-10, 0,
              0.0442777, 0.931923, 475394e-10, 0, 0.0567958, 0.91996,
              484328e-10, 0, 0.0709879, 0.907419, 502146e-10, 0, 0.086861,
              0.89618, 561654e-10, 0, 0.104415, 0.88337, 587612e-10, 0,
              0.123643, 0.869046, 618057e-10, 0, 0.144531, 0.853278, 657392e-10,
              0, 0.167057, 0.836091, 66303e-9, 0, 0.191188, 0.819644,
              704445e-10, 0, 0.216878, 0.801246, 714071e-10, 0, 0.244062,
              0.782031, 740093e-10, 0, 0.272649, 0.762066, 74685e-9, 0,
              0.302509, 0.741964, 766647e-10, 0, 0.333442, 0.720554, 766328e-10,
              0, 0.365079, 0.699098, 777857e-10, 0, 0.396826, 0.677189,
              774633e-10, 0, 0.428572, 0.65484, 776235e-10, 0, 0.460318,
              0.632496, 770316e-10, 0, 0.492064, 0.609908, 762669e-10, 0,
              0.52381, 0.587312, 753972e-10, 0, 0.555556, 0.564938, 739994e-10,
              0, 0.587302, 0.542577, 728382e-10, 0, 0.619048, 0.52062, 71112e-9,
              0, 0.650794, 0.498819, 694004e-10, 0, 0.68254, 0.477555,
              675575e-10, 0, 0.714286, 0.456568, 653449e-10, 0, 0.746032,
              0.436278, 636068e-10, 0, 0.777778, 0.41637, 613466e-10, 0,
              0.809524, 0.397144, 594177e-10, 0, 0.84127, 0.378412, 570987e-10,
              0, 0.873016, 0.360376, 550419e-10, 0, 0.904762, 0.342906,
              527422e-10, 0, 0.936508, 0.326136, 506544e-10, 0, 0.968254,
              0.30997, 484307e-10, 0, 1, 1, 3.54014e-9, 0, 0, 1, 3.54073e-9, 0,
              0, 1, 3.54972e-9, 0, 0, 1, 3.58929e-9, 0, 0, 1, 3.70093e-9, 0, 0,
              0.999999, 3.96194e-9, 0, 0, 0.999998, 4.53352e-9, 0, 0, 0.999997,
              5.78828e-9, 0, 0, 0.999994, 8.63812e-9, 0, 0, 0.999991,
              1.53622e-8, 0, 0, 0.999985, 3.16356e-8, 0, 0, 0.999977,
              7.12781e-8, 0, 0, 0.999964, 1.66725e-7, 0, 0, 0.999945,
              3.90501e-7, 0, 0, 0.999912, 8.95622e-7, 0, 0, 0.999866,
              198428e-11, 0, 0, 0.999786, 421038e-11, 0, 0, 0.999647,
              850239e-11, 0, 0, 0.999356, 162059e-10, 0, 0, 0.998563,
              282652e-10, 0, 0, 0.994928, 336309e-10, 0, 244244e-10, 0.987999,
              178458e-10, 0, 523891e-9, 0.982893, 159162e-10, 0, 0.00194729,
              0.977044, 178056e-10, 0, 0.00451099, 0.969972, 230624e-10, 0,
              0.00835132, 0.964237, 313922e-10, 0, 0.013561, 0.960791,
              406145e-10, 0, 0.0202056, 0.954292, 372796e-10, 0, 0.0283321,
              0.948052, 403199e-10, 0, 0.0379739, 0.940938, 479537e-10, 0,
              0.0491551, 0.931689, 545292e-10, 0, 0.0618918, 0.91987, 54038e-9,
              0, 0.0761941, 0.907665, 589909e-10, 0, 0.0920672, 0.895281,
              642651e-10, 0, 0.109511, 0.882621, 659707e-10, 0, 0.12852,
              0.86873, 709973e-10, 0, 0.149085, 0.853008, 742221e-10, 0,
              0.171189, 0.835944, 761754e-10, 0, 0.194809, 0.818949, 797052e-10,
              0, 0.21991, 0.800951, 812434e-10, 0, 0.246447, 0.781847,
              838075e-10, 0, 0.274352, 0.761649, 84501e-9, 0, 0.303535, 0.74152,
              860258e-10, 0, 0.333857, 0.720495, 866233e-10, 0, 0.365104,
              0.698742, 868326e-10, 0, 0.396826, 0.677096, 87133e-9, 0,
              0.428572, 0.654782, 863497e-10, 0, 0.460318, 0.632335, 860206e-10,
              0, 0.492064, 0.610031, 849337e-10, 0, 0.52381, 0.587457,
              838279e-10, 0, 0.555556, 0.56513, 82309e-9, 0, 0.587302, 0.542877,
              803542e-10, 0, 0.619048, 0.5209, 786928e-10, 0, 0.650794,
              0.499291, 765171e-10, 0, 0.68254, 0.477971, 744753e-10, 0,
              0.714286, 0.457221, 72209e-9, 0, 0.746032, 0.436803, 697448e-10,
              0, 0.777778, 0.417083, 675333e-10, 0, 0.809524, 0.397749,
              648058e-10, 0, 0.84127, 0.379177, 625759e-10, 0, 0.873016,
              0.361061, 598584e-10, 0, 0.904762, 0.343713, 575797e-10, 0,
              0.936508, 0.326894, 549999e-10, 0, 0.968254, 0.310816, 527482e-10,
              0, 1, 1, 1.0153e-8, 0, 0, 1, 1.01544e-8, 0, 0, 1, 1.01751e-8, 0,
              0, 1, 1.02662e-8, 0, 0, 1, 1.0521e-8, 0, 0, 0.999999, 1.11049e-8,
              0, 0, 0.999999, 1.23408e-8, 0, 0, 0.999996, 1.4924e-8, 0, 0,
              0.999992, 2.04471e-8, 0, 0, 0.999989, 3.26539e-8, 0, 0, 0.99998,
              6.03559e-8, 0, 0, 0.999971, 1.23936e-7, 0, 0, 0.999955,
              2.69058e-7, 0, 0, 0.999933, 5.93604e-7, 0, 0, 0.999901,
              129633e-11, 0, 0, 0.999847, 275621e-11, 0, 0, 0.999761,
              564494e-11, 0, 0, 0.999607, 110485e-10, 0, 0, 0.999282,
              204388e-10, 0, 0, 0.99831, 341084e-10, 0, 2.2038e-7, 0.993288,
              294949e-10, 0, 242388e-9, 0.987855, 192736e-10, 0, 0.0012503,
              0.983167, 182383e-10, 0, 0.0032745, 0.977908, 218633e-10, 0,
              0.00646321, 0.971194, 290662e-10, 0, 0.0109133, 0.963867,
              386401e-10, 0, 0.0166927, 0.95982, 462827e-10, 0, 0.0238494,
              0.953497, 420705e-10, 0, 0.0324178, 0.947621, 477743e-10, 0,
              0.0424225, 0.940611, 568258e-10, 0, 0.0538808, 0.931174,
              618061e-10, 0, 0.0668047, 0.919919, 627098e-10, 0, 0.0812014,
              0.907856, 694714e-10, 0, 0.0970745, 0.894509, 735008e-10, 0,
              0.114424, 0.881954, 763369e-10, 0, 0.133246, 0.868309, 821896e-10,
              0, 0.153534, 0.852511, 83769e-9, 0, 0.175275, 0.835821,
              881615e-10, 0, 0.198453, 0.817981, 896368e-10, 0, 0.223042,
              0.800504, 930906e-10, 0, 0.249009, 0.78141, 945056e-10, 0,
              0.276304, 0.761427, 963605e-10, 0, 0.304862, 0.74094, 968088e-10,
              0, 0.334584, 0.720233, 981481e-10, 0, 0.365322, 0.698592,
              979122e-10, 0, 0.396826, 0.676763, 981057e-10, 0, 0.428571,
              0.654808, 973956e-10, 0, 0.460318, 0.632326, 962619e-10, 0,
              0.492064, 0.610049, 952996e-10, 0, 0.52381, 0.58763, 933334e-10,
              0, 0.555556, 0.565261, 917573e-10, 0, 0.587302, 0.543244,
              896636e-10, 0, 0.619048, 0.521273, 873304e-10, 0, 0.650794,
              0.499818, 852648e-10, 0, 0.68254, 0.478536, 823961e-10, 0,
              0.714286, 0.457826, 79939e-9, 0, 0.746032, 0.437549, 77126e-9, 0,
              0.777778, 0.41776, 743043e-10, 0, 0.809524, 0.39863, 716426e-10,
              0, 0.84127, 0.379954, 686456e-10, 0, 0.873016, 0.362025,
              660514e-10, 0, 0.904762, 0.344581, 630755e-10, 0, 0.936508,
              0.327909, 605439e-10, 0, 0.968254, 0.311736, 576345e-10, 0, 1, 1,
              2.63344e-8, 0, 0, 1, 2.63373e-8, 0, 0, 1, 2.63815e-8, 0, 0, 1,
              2.65753e-8, 0, 0, 1, 2.71132e-8, 0, 0, 0.999999, 2.83279e-8, 0, 0,
              0.999997, 3.0833e-8, 0, 0, 0.999995, 3.58711e-8, 0, 0, 0.999992,
              4.61266e-8, 0, 0, 0.999985, 6.7574e-8, 0, 0, 0.999977, 1.1358e-7,
              0, 0, 0.999966, 2.13657e-7, 0, 0, 0.999948, 4.31151e-7, 0, 0,
              0.999923, 8.96656e-7, 0, 0, 0.999884, 186603e-11, 0, 0, 0.999826,
              381115e-11, 0, 0, 0.999732, 754184e-11, 0, 0, 0.999561,
              143192e-10, 0, 0, 0.999191, 257061e-10, 0, 0, 0.997955,
              405724e-10, 0, 744132e-10, 0.992228, 276537e-10, 0, 716477e-9,
              0.987638, 208885e-10, 0, 0.0022524, 0.983395, 215226e-10, 0,
              0.00484816, 0.978614, 270795e-10, 0, 0.00860962, 0.972389,
              365282e-10, 0, 0.0136083, 0.964392, 474747e-10, 0, 0.0198941,
              0.95861, 509141e-10, 0, 0.0275023, 0.952806, 48963e-9, 0,
              0.0364584, 0.94712, 571119e-10, 0, 0.04678, 0.940104, 671704e-10,
              0, 0.0584799, 0.930398, 687586e-10, 0, 0.0715665, 0.919866,
              738161e-10, 0, 0.086045, 0.907853, 813235e-10, 0, 0.101918,
              0.894078, 834582e-10, 0, 0.119186, 0.881177, 892093e-10, 0,
              0.137845, 0.867575, 944548e-10, 0, 0.157891, 0.852107, 969607e-10,
              0, 0.179316, 0.835502, 101456e-9, 0, 0.202106, 0.81756, 103256e-9,
              0, 0.226243, 0.79984, 106954e-9, 0, 0.251704, 0.780998, 108066e-9,
              0, 0.278451, 0.761132, 110111e-9, 0, 0.306436, 0.740429,
              110459e-9, 0, 0.335586, 0.719836, 111219e-9, 0, 0.365796,
              0.698467, 11145e-8, 0, 0.3969, 0.676446, 110393e-9, 0, 0.428571,
              0.654635, 110035e-9, 0, 0.460318, 0.632411, 108548e-9, 0,
              0.492064, 0.609986, 106963e-9, 0, 0.52381, 0.587872, 105238e-9, 0,
              0.555556, 0.565528, 102665e-9, 0, 0.587302, 0.543563, 100543e-9,
              0, 0.619048, 0.52176, 976182e-10, 0, 0.650794, 0.500188,
              947099e-10, 0, 0.68254, 0.479204, 919929e-10, 0, 0.714286,
              0.458413, 886139e-10, 0, 0.746032, 0.438314, 857839e-10, 0,
              0.777778, 0.418573, 82411e-9, 0, 0.809524, 0.39947, 792211e-10, 0,
              0.84127, 0.380892, 759546e-10, 0, 0.873016, 0.362953, 727571e-10,
              0, 0.904762, 0.345601, 695738e-10, 0, 0.936508, 0.328895,
              664907e-10, 0, 0.968254, 0.312808, 634277e-10, 0, 1, 1,
              6.28647e-8, 0, 0, 1, 6.28705e-8, 0, 0, 1, 6.29587e-8, 0, 0, 1,
              6.33441e-8, 0, 0, 0.999999, 6.44087e-8, 0, 0, 0.999998,
              6.67856e-8, 0, 0, 0.999997, 7.15889e-8, 0, 0, 0.999995,
              8.09577e-8, 0, 0, 0.999989, 9.92764e-8, 0, 0, 0.999983,
              1.35834e-7, 0, 0, 0.999974, 2.10482e-7, 0, 0, 0.999959,
              3.65215e-7, 0, 0, 0.999939, 6.86693e-7, 0, 0, 0.999911, 13472e-10,
              0, 0, 0.999868, 26731e-10, 0, 0, 0.999804, 524756e-11, 0, 0,
              0.9997, 100403e-10, 0, 0, 0.99951, 185019e-10, 0, 0, 0.999078,
              322036e-10, 0, 620676e-11, 0.997428, 470002e-10, 0, 341552e-9,
              0.99162, 287123e-10, 0, 0.00143727, 0.987479, 234706e-10, 0,
              0.00349201, 0.983582, 260083e-10, 0, 0.0066242, 0.979186,
              337927e-10, 0, 0.0109113, 0.97325, 454689e-10, 0, 0.0164064,
              0.965221, 573759e-10, 0, 0.0231463, 0.957262, 544114e-10, 0,
              0.0311571, 0.952211, 587006e-10, 0, 0.0404572, 0.946631,
              692256e-10, 0, 0.0510592, 0.939391, 787819e-10, 0, 0.0629723,
              0.929795, 792368e-10, 0, 0.0762025, 0.91965, 875075e-10, 0,
              0.090753, 0.907737, 950903e-10, 0, 0.106626, 0.893899, 972963e-10,
              0, 0.123822, 0.880239, 10459e-8, 0, 0.142337, 0.866562, 107689e-9,
              0, 0.16217, 0.85164, 113081e-9, 0, 0.183314, 0.835021, 116636e-9,
              0, 0.20576, 0.817311, 120074e-9, 0, 0.229496, 0.798845, 121921e-9,
              0, 0.254502, 0.780479, 12475e-8, 0, 0.280753, 0.760694, 125255e-9,
              0, 0.308212, 0.740142, 126719e-9, 0, 0.336825, 0.719248, 12636e-8,
              0, 0.366517, 0.698209, 126712e-9, 0, 0.397167, 0.676398,
              125769e-9, 0, 0.428578, 0.654378, 124432e-9, 0, 0.460318,
              0.632484, 123272e-9, 0, 0.492064, 0.610113, 12085e-8, 0, 0.52381,
              0.587931, 118411e-9, 0, 0.555556, 0.565872, 11569e-8, 0, 0.587302,
              0.543814, 112521e-9, 0, 0.619048, 0.522265, 109737e-9, 0,
              0.650794, 0.500835, 106228e-9, 0, 0.68254, 0.479818, 102591e-9, 0,
              0.714286, 0.459258, 991288e-10, 0, 0.746032, 0.439061, 952325e-10,
              0, 0.777778, 0.419552, 91895e-9, 0, 0.809524, 0.400399,
              879051e-10, 0, 0.84127, 0.381976, 844775e-10, 0, 0.873016,
              0.364009, 806316e-10, 0, 0.904762, 0.346761, 771848e-10, 0,
              0.936508, 0.330049, 735429e-10, 0, 0.968254, 0.314018, 702103e-10,
              0, 1, 1, 1.39968e-7, 0, 0, 1, 1.39979e-7, 0, 0, 1, 1.40145e-7, 0,
              0, 1, 1.4087e-7, 0, 0, 0.999999, 1.42865e-7, 0, 0, 0.999998,
              1.47279e-7, 0, 0, 0.999997, 1.56057e-7, 0, 0, 0.999992, 1.7276e-7,
              0, 0, 0.999989, 2.04352e-7, 0, 0, 0.99998, 2.6494e-7, 0, 0,
              0.999969, 3.83435e-7, 0, 0, 0.999953, 6.18641e-7, 0, 0, 0.999929,
              108755e-11, 0, 0, 0.999898, 201497e-11, 0, 0, 0.999849,
              381346e-11, 0, 0, 0.999778, 719815e-11, 0, 0, 0.999661,
              133215e-10, 0, 0, 0.999451, 238313e-10, 0, 0, 0.998936,
              401343e-10, 0, 113724e-9, 0.99662, 517346e-10, 0, 820171e-9,
              0.991094, 304323e-10, 0, 0.00238143, 0.987487, 281757e-10, 0,
              0.00493527, 0.983731, 320048e-10, 0, 0.00856859, 0.979647,
              423905e-10, 0, 0.0133393, 0.973837, 562935e-10, 0, 0.0192863,
              0.96584, 677442e-10, 0, 0.0264369, 0.956309, 623073e-10, 0,
              0.03481, 0.951523, 704131e-10, 0, 0.0444184, 0.946003, 836594e-10,
              0, 0.0552713, 0.938454, 911736e-10, 0, 0.0673749, 0.929279,
              938264e-10, 0, 0.0807329, 0.919239, 103754e-9, 0, 0.0953479,
              0.907293, 109928e-9, 0, 0.111221, 0.893936, 115257e-9, 0,
              0.128352, 0.879674, 122265e-9, 0, 0.14674, 0.865668, 125733e-9, 0,
              0.166382, 0.850998, 132305e-9, 0, 0.187276, 0.834498, 134844e-9,
              0, 0.209413, 0.816903, 139276e-9, 0, 0.232786, 0.798235,
              140984e-9, 0, 0.257382, 0.779724, 14378e-8, 0, 0.283181, 0.760251,
              144623e-9, 0, 0.310156, 0.739808, 145228e-9, 0, 0.338269,
              0.718762, 14539e-8, 0, 0.367461, 0.697815, 144432e-9, 0, 0.397646,
              0.67631, 143893e-9, 0, 0.428685, 0.654278, 141846e-9, 0, 0.460318,
              0.632347, 13935e-8, 0, 0.492064, 0.610296, 137138e-9, 0, 0.52381,
              0.588039, 133806e-9, 0, 0.555556, 0.566218, 130755e-9, 0,
              0.587302, 0.544346, 127128e-9, 0, 0.619048, 0.522701, 123002e-9,
              0, 0.650794, 0.501542, 119443e-9, 0, 0.68254, 0.480508, 115055e-9,
              0, 0.714286, 0.460092, 111032e-9, 0, 0.746032, 0.440021,
              106635e-9, 0, 0.777778, 0.420446, 102162e-9, 0, 0.809524,
              0.401512, 98184e-9, 0, 0.84127, 0.38299, 936497e-10, 0, 0.873016,
              0.365232, 89813e-9, 0, 0.904762, 0.347865, 853073e-10, 0,
              0.936508, 0.331342, 817068e-10, 0, 0.968254, 0.315202, 773818e-10,
              0, 1, 1, 2.9368e-7, 0, 0, 1, 2.937e-7, 0, 0, 1, 2.93998e-7, 0, 0,
              1, 2.95298e-7, 0, 0, 0.999999, 2.98865e-7, 0, 0, 0.999998,
              3.067e-7, 0, 0, 0.999995, 3.22082e-7, 0, 0, 0.999992, 3.50767e-7,
              0, 0, 0.999986, 4.03538e-7, 0, 0, 0.999976, 5.01372e-7, 0, 0,
              0.999964, 6.8562e-7, 0, 0, 0.999945, 10374e-10, 0, 0, 0.999919,
              171269e-11, 0, 0, 0.999882, 300175e-11, 0, 0, 0.999829,
              542144e-11, 0, 0, 0.999749, 984182e-11, 0, 0, 0.99962, 176213e-10,
              0, 0, 0.999382, 305995e-10, 0, 138418e-10, 0.998751, 496686e-10,
              0, 389844e-9, 0.995344, 510733e-10, 0, 0.00150343, 0.990768,
              345829e-10, 0, 0.00352451, 0.987464, 342841e-10, 0, 0.00655379,
              0.983846, 399072e-10, 0, 0.0106554, 0.980007, 533219e-10, 0,
              0.0158723, 0.974494, 696992e-10, 0, 0.0222333, 0.96622,
              776754e-10, 0, 0.029758, 0.956273, 747718e-10, 0, 0.0384596,
              0.950952, 864611e-10, 0, 0.0483473, 0.945215, 100464e-9, 0,
              0.0594266, 0.937287, 103729e-9, 0, 0.0717019, 0.928649, 111665e-9,
              0, 0.0851752, 0.918791, 12353e-8, 0, 0.0998479, 0.906685,
              127115e-9, 0, 0.115721, 0.893706, 13628e-8, 0, 0.132794, 0.879248,
              142427e-9, 0, 0.151067, 0.864685, 148091e-9, 0, 0.170538,
              0.850032, 153517e-9, 0, 0.191204, 0.833853, 157322e-9, 0,
              0.213063, 0.816353, 161086e-9, 0, 0.236107, 0.797834, 164111e-9,
              0, 0.260329, 0.778831, 165446e-9, 0, 0.285714, 0.759756,
              167492e-9, 0, 0.312243, 0.739419, 166928e-9, 0, 0.339887,
              0.718491, 167e-6, 0, 0.368604, 0.697392, 165674e-9, 0, 0.398329,
              0.676102, 163815e-9, 0, 0.428961, 0.654243, 162003e-9, 0,
              0.460331, 0.632176, 158831e-9, 0, 0.492064, 0.610407, 155463e-9,
              0, 0.52381, 0.588394, 152062e-9, 0, 0.555556, 0.56645, 147665e-9,
              0, 0.587302, 0.5449, 14375e-8, 0, 0.619048, 0.523276, 138905e-9,
              0, 0.650794, 0.502179, 134189e-9, 0, 0.68254, 0.481359, 129392e-9,
              0, 0.714286, 0.46092, 124556e-9, 0, 0.746032, 0.441084, 11957e-8,
              0, 0.777778, 0.421517, 114652e-9, 0, 0.809524, 0.402721,
              109688e-9, 0, 0.84127, 0.384222, 104667e-9, 0, 0.873016, 0.366534,
              999633e-10, 0, 0.904762, 0.349205, 950177e-10, 0, 0.936508,
              0.332702, 907301e-10, 0, 0.968254, 0.316599, 859769e-10, 0, 1, 1,
              5.85473e-7, 0, 0, 1, 5.85507e-7, 0, 0, 1, 5.8602e-7, 0, 0,
              0.999999, 5.88259e-7, 0, 0, 0.999999, 5.94381e-7, 0, 0, 0.999998,
              6.07754e-7, 0, 0, 0.999995, 6.33729e-7, 0, 0, 0.99999, 6.8137e-7,
              0, 0, 0.999984, 7.67003e-7, 0, 0, 0.999973, 9.21212e-7, 0, 0,
              0.999959, 120218e-11, 0, 0, 0.999936, 172024e-11, 0, 0, 0.999907,
              268088e-11, 0, 0, 0.999866, 445512e-11, 0, 0, 0.999806,
              768481e-11, 0, 0, 0.999716, 1342e-8, 0, 0, 0.999576, 232473e-10,
              0, 0, 0.9993, 391694e-10, 0, 129917e-9, 0.998498, 608429e-10, 0,
              845035e-9, 0.994132, 489743e-10, 0, 0.00237616, 0.99031,
              384644e-10, 0, 0.00484456, 0.987409, 421768e-10, 0, 0.00832472,
              0.983981, 504854e-10, 0, 0.0128643, 0.980268, 671028e-10, 0,
              0.0184947, 0.974875, 852749e-10, 0, 0.025237, 0.966063, 85531e-9,
              0, 0.0331046, 0.956779, 900588e-10, 0, 0.0421067, 0.950259,
              10577e-8, 0, 0.0522487, 0.944239, 119458e-9, 0, 0.0635343,
              0.936341, 122164e-9, 0, 0.0759654, 0.928047, 134929e-9, 0,
              0.0895434, 0.918065, 145544e-9, 0, 0.104269, 0.906267, 150531e-9,
              0, 0.120142, 0.893419, 161652e-9, 0, 0.137163, 0.878758, 16593e-8,
              0, 0.15533, 0.863699, 174014e-9, 0, 0.174645, 0.848876, 177877e-9,
              0, 0.195106, 0.833032, 184049e-9, 0, 0.21671, 0.815557, 186088e-9,
              0, 0.239454, 0.797323, 19054e-8, 0, 0.263332, 0.778124, 191765e-9,
              0, 0.288336, 0.758929, 192535e-9, 0, 0.314451, 0.738979,
              192688e-9, 0, 0.341658, 0.718213, 191522e-9, 0, 0.369924,
              0.696947, 190491e-9, 0, 0.399202, 0.675807, 187913e-9, 0,
              0.429416, 0.654147, 184451e-9, 0, 0.460447, 0.63229, 181442e-9, 0,
              0.492064, 0.610499, 177139e-9, 0, 0.523809, 0.588747, 172596e-9,
              0, 0.555555, 0.566783, 167457e-9, 0, 0.587301, 0.545359,
              162518e-9, 0, 0.619048, 0.523984, 156818e-9, 0, 0.650794,
              0.502917, 151884e-9, 0, 0.68254, 0.482294, 145514e-9, 0, 0.714286,
              0.461945, 140199e-9, 0, 0.746032, 0.442133, 134101e-9, 0,
              0.777778, 0.422705, 128374e-9, 0, 0.809524, 0.403916, 122996e-9,
              0, 0.84127, 0.38554, 116808e-9, 0, 0.873016, 0.367909, 111973e-9,
              0, 0.904762, 0.350651, 105938e-9, 0, 0.936508, 0.334208,
              101355e-9, 0, 0.968254, 0.318123, 957629e-10, 0, 1, 1, 111633e-11,
              0, 0, 1, 111639e-11, 0, 0, 1, 111725e-11, 0, 0, 1, 112096e-11, 0,
              0, 0.999999, 11311e-10, 0, 0, 0.999997, 115315e-11, 0, 0,
              0.999995, 11956e-10, 0, 0, 0.999989, 127239e-11, 0, 0, 0.999981,
              140772e-11, 0, 0, 0.999969, 164541e-11, 0, 0, 0.999952,
              206607e-11, 0, 0, 0.999928, 281783e-11, 0, 0, 0.999895,
              416835e-11, 0, 0, 0.999848, 658728e-11, 0, 0, 0.999781,
              108648e-10, 0, 0, 0.999682, 182579e-10, 0, 0, 0.999523,
              306003e-10, 0, 159122e-10, 0.999205, 499862e-10, 0, 391184e-9,
              0.998131, 73306e-9, 0, 0.00147534, 0.993334, 513229e-10, 0,
              0.0034227, 0.99016, 467783e-10, 0, 0.00632232, 0.987321,
              523413e-10, 0, 0.0102295, 0.984099, 64267e-9, 0, 0.0151794,
              0.980432, 843042e-10, 0, 0.0211947, 0.974976, 102819e-9, 0,
              0.0282899, 0.966429, 996234e-10, 0, 0.0364739, 0.957633,
              111074e-9, 0, 0.0457522, 0.949422, 128644e-9, 0, 0.0561278,
              0.943045, 140076e-9, 0, 0.0676023, 0.935448, 146349e-9, 0,
              0.0801762, 0.927225, 161854e-9, 0, 0.0938499, 0.917033, 169135e-9,
              0, 0.108623, 0.905762, 179987e-9, 0, 0.124496, 0.892879,
              189832e-9, 0, 0.141469, 0.878435, 195881e-9, 0, 0.159541,
              0.863114, 20466e-8, 0, 0.178713, 0.84776, 209473e-9, 0, 0.198985,
              0.832084, 214861e-9, 0, 0.220355, 0.814915, 217695e-9, 0,
              0.242823, 0.796711, 220313e-9, 0, 0.266385, 0.777603, 22313e-8, 0,
              0.291036, 0.757991, 222471e-9, 0, 0.316767, 0.738371, 222869e-9,
              0, 0.343563, 0.717872, 221243e-9, 0, 0.371402, 0.696619,
              218089e-9, 0, 0.400248, 0.675379, 21562e-8, 0, 0.430047, 0.65411,
              21169e-8, 0, 0.460709, 0.63241, 206947e-9, 0, 0.492079, 0.61046,
              201709e-9, 0, 0.52381, 0.58903, 196753e-9, 0, 0.555556, 0.567267,
              189637e-9, 0, 0.587302, 0.545886, 184735e-9, 0, 0.619048,
              0.524714, 177257e-9, 0, 0.650794, 0.503789, 171424e-9, 0, 0.68254,
              0.483204, 164688e-9, 0, 0.714286, 0.462976, 157172e-9, 0,
              0.746032, 0.443294, 151341e-9, 0, 0.777778, 0.423988, 143737e-9,
              0, 0.809524, 0.405325, 138098e-9, 0, 0.84127, 0.386981, 130698e-9,
              0, 0.873016, 0.369436, 125276e-9, 0, 0.904762, 0.35219, 118349e-9,
              0, 0.936508, 0.335804, 11312e-8, 0, 0.968254, 0.319749, 106687e-9,
              0, 1, 1, 204685e-11, 0, 0, 1, 204694e-11, 0, 0, 1, 204831e-11, 0,
              0, 0.999999, 205428e-11, 0, 0, 0.999999, 207056e-11, 0, 0,
              0.999997, 210581e-11, 0, 0, 0.999993, 21732e-10, 0, 0, 0.999987,
              229365e-11, 0, 0, 0.999979, 250243e-11, 0, 0, 0.999965,
              286127e-11, 0, 0, 0.999947, 348028e-11, 0, 0, 0.999918,
              455588e-11, 0, 0, 0.999881, 643303e-11, 0, 0, 0.999828,
              970064e-11, 0, 0, 0.999753, 153233e-10, 0, 0, 0.999642, 24793e-9,
              0, 0, 0.999464, 402032e-10, 0, 122947e-9, 0.999089, 635852e-10, 0,
              807414e-9, 0.997567, 857026e-10, 0, 0.00227206, 0.992903,
              594912e-10, 0, 0.00462812, 0.990011, 578515e-10, 0, 0.00794162,
              0.987192, 65399e-9, 0, 0.0122534, 0.98418, 819675e-10, 0,
              0.0175888, 0.980491, 105514e-9, 0, 0.0239635, 0.974779, 121532e-9,
              0, 0.031387, 0.96675, 119144e-9, 0, 0.0398644, 0.958248,
              136125e-9, 0, 0.0493982, 0.948884, 155408e-9, 0, 0.0599896,
              0.941673, 162281e-9, 0, 0.0716382, 0.934521, 176754e-9, 0,
              0.0843437, 0.926205, 192873e-9, 0, 0.0981056, 0.916089, 200038e-9,
              0, 0.112923, 0.904963, 213624e-9, 0, 0.128796, 0.892089,
              221834e-9, 0, 0.145725, 0.878028, 232619e-9, 0, 0.163709, 0.86249,
              238632e-9, 0, 0.182749, 0.846587, 247002e-9, 0, 0.202847,
              0.830988, 250702e-9, 0, 0.224001, 0.814165, 255562e-9, 0,
              0.246214, 0.796135, 257505e-9, 0, 0.269482, 0.777052, 258625e-9,
              0, 0.293805, 0.757201, 258398e-9, 0, 0.319176, 0.737655,
              256714e-9, 0, 0.345587, 0.717477, 255187e-9, 0, 0.373021,
              0.696433, 251792e-9, 0, 0.401454, 0.675084, 247223e-9, 0,
              0.430844, 0.653907, 242213e-9, 0, 0.461125, 0.632561, 237397e-9,
              0, 0.492187, 0.610658, 229313e-9, 0, 0.52381, 0.589322, 224402e-9,
              0, 0.555556, 0.567857, 216116e-9, 0, 0.587302, 0.54652, 209124e-9,
              0, 0.619048, 0.525433, 201601e-9, 0, 0.650794, 0.504679,
              192957e-9, 0, 0.68254, 0.484203, 186052e-9, 0, 0.714286, 0.464203,
              177672e-9, 0, 0.746032, 0.444549, 170005e-9, 0, 0.777778,
              0.425346, 162401e-9, 0, 0.809524, 0.406706, 1544e-7, 0, 0.84127,
              0.388576, 147437e-9, 0, 0.873016, 0.37094, 139493e-9, 0, 0.904762,
              0.353996, 133219e-9, 0, 0.936508, 0.337391, 125573e-9, 0,
              0.968254, 0.321648, 119867e-9, 0, 1, 1, 362511e-11, 0, 0, 1,
              362525e-11, 0, 0, 1, 362739e-11, 0, 0, 0.999999, 363673e-11, 0, 0,
              0.999998, 366214e-11, 0, 0, 0.999996, 371698e-11, 0, 0, 0.999992,
              382116e-11, 0, 0, 0.999986, 400554e-11, 0, 0, 0.999976,
              432058e-11, 0, 0, 0.999961, 485194e-11, 0, 0, 0.999938,
              574808e-11, 0, 0, 0.999908, 726643e-11, 0, 0, 0.999865,
              984707e-11, 0, 0, 0.999807, 142217e-10, 0, 0, 0.999723,
              215581e-10, 0, 0, 0.999602, 336114e-10, 0, 119113e-10, 0.999398,
              527353e-10, 0, 355813e-9, 0.998946, 805809e-10, 0, 0.00137768,
              0.996647, 942908e-10, 0, 0.00322469, 0.992298, 668733e-10, 0,
              0.00597897, 0.989802, 716564e-10, 0, 0.00968903, 0.987019,
              821355e-10, 0, 0.0143845, 0.984219, 104555e-9, 0, 0.0200831,
              0.980425, 131245e-9, 0, 0.0267948, 0.974241, 139613e-9, 0,
              0.034525, 0.967006, 145931e-9, 0, 0.0432757, 0.95893, 167153e-9,
              0, 0.0530471, 0.949157, 188146e-9, 0, 0.0638386, 0.94062,
              194625e-9, 0, 0.0756487, 0.933509, 213721e-9, 0, 0.0884762,
              0.925088, 229616e-9, 0, 0.10232, 0.915178, 239638e-9, 0, 0.117178,
              0.904093, 254814e-9, 0, 0.133051, 0.891337, 263685e-9, 0,
              0.149939, 0.877326, 274789e-9, 0, 0.167841, 0.861794, 280534e-9,
              0, 0.18676, 0.845758, 289534e-9, 0, 0.206696, 0.829792, 294446e-9,
              0, 0.22765, 0.813037, 296877e-9, 0, 0.249625, 0.795285, 300217e-9,
              0, 0.27262, 0.776323, 299826e-9, 0, 0.296636, 0.756673, 299787e-9,
              0, 0.321671, 0.736856, 297867e-9, 0, 0.347718, 0.716883,
              294052e-9, 0, 0.374768, 0.696089, 289462e-9, 0, 0.402804, 0.67505,
              285212e-9, 0, 0.431796, 0.653509, 27653e-8, 0, 0.461695, 0.63258,
              271759e-9, 0, 0.49242, 0.61104, 262811e-9, 0, 0.523822, 0.589567,
              255151e-9, 0, 0.555556, 0.568322, 246434e-9, 0, 0.587302,
              0.547235, 237061e-9, 0, 0.619048, 0.52616, 228343e-9, 0, 0.650794,
              0.505716, 219236e-9, 0, 0.68254, 0.485274, 209595e-9, 0, 0.714286,
              0.465411, 201011e-9, 0, 0.746032, 0.445854, 19109e-8, 0, 0.777778,
              0.426911, 182897e-9, 0, 0.809524, 0.408222, 173569e-9, 0, 0.84127,
              0.390307, 165496e-9, 0, 0.873016, 0.372624, 156799e-9, 0,
              0.904762, 0.355804, 14917e-8, 0, 0.936508, 0.33924, 140907e-9, 0,
              0.968254, 0.323534, 134062e-9, 0, 1, 1, 622487e-11, 0, 0, 1,
              62251e-10, 0, 0, 1, 622837e-11, 0, 0, 0.999999, 624259e-11, 0, 0,
              0.999998, 628127e-11, 0, 0, 0.999996, 636451e-11, 0, 0, 0.999991,
              65218e-10, 0, 0, 0.999984, 679782e-11, 0, 0, 0.999973, 726361e-11,
              0, 0, 0.999955, 803644e-11, 0, 0, 0.999931, 931397e-11, 0, 0,
              0.999896, 114299e-10, 0, 0, 0.999847, 149402e-10, 0, 0, 0.999784,
              207461e-10, 0, 0, 0.999692, 302493e-10, 0, 0, 0.999554,
              454957e-10, 0, 997275e-10, 0.999326, 690762e-10, 0, 724813e-9,
              0.998757, 101605e-9, 0, 0.0020972, 0.995367, 958745e-10, 0,
              0.00432324, 0.99209, 832808e-10, 0, 0.00746347, 0.989517,
              887601e-10, 0, 0.0115534, 0.987008, 10564e-8, 0, 0.0166134,
              0.98421, 133179e-9, 0, 0.0226552, 0.98021, 161746e-9, 0,
              0.0296838, 0.973676, 161821e-9, 0, 0.0377016, 0.967052, 178635e-9,
              0, 0.0467079, 0.959385, 206765e-9, 0, 0.0567013, 0.949461,
              22476e-8, 0, 0.0676796, 0.939578, 23574e-8, 0, 0.0796403,
              0.932416, 25893e-8, 0, 0.0925812, 0.923759, 271228e-9, 0,
              0.106501, 0.914223, 289165e-9, 0, 0.121397, 0.902942, 301156e-9,
              0, 0.13727, 0.890419, 313852e-9, 0, 0.15412, 0.876639, 324408e-9,
              0, 0.171946, 0.861316, 33249e-8, 0, 0.190751, 0.84496, 338497e-9,
              0, 0.210537, 0.828427, 345861e-9, 0, 0.231305, 0.811871,
              347863e-9, 0, 0.253057, 0.794397, 350225e-9, 0, 0.275797,
              0.775726, 349915e-9, 0, 0.299525, 0.75617, 347297e-9, 0, 0.324242,
              0.736091, 344232e-9, 0, 0.349947, 0.716213, 340835e-9, 0,
              0.376633, 0.695736, 332369e-9, 0, 0.404289, 0.674961, 327943e-9,
              0, 0.432895, 0.653518, 318533e-9, 0, 0.462415, 0.632574,
              310391e-9, 0, 0.492788, 0.61134, 300755e-9, 0, 0.523909, 0.590017,
              290506e-9, 0, 0.555556, 0.568752, 280446e-9, 0, 0.587302,
              0.548061, 269902e-9, 0, 0.619048, 0.52711, 258815e-9, 0, 0.650794,
              0.506682, 248481e-9, 0, 0.68254, 0.486524, 237141e-9, 0, 0.714286,
              0.466812, 226872e-9, 0, 0.746032, 0.44732, 216037e-9, 0, 0.777778,
              0.428473, 205629e-9, 0, 0.809524, 0.409921, 195691e-9, 0, 0.84127,
              0.392028, 185457e-9, 0, 0.873016, 0.374606, 176436e-9, 0,
              0.904762, 0.357601, 166508e-9, 0, 0.936508, 0.341348, 158385e-9,
              0, 0.968254, 0.32542, 149203e-9, 0, 1, 1, 103967e-10, 0, 0, 1,
              10397e-9, 0, 0, 1, 104019e-10, 0, 0, 0.999999, 104231e-10, 0, 0,
              0.999998, 104806e-10, 0, 0, 0.999995, 106042e-10, 0, 0, 0.999991,
              108366e-10, 0, 0, 0.999982, 112415e-10, 0, 0, 0.999968,
              119174e-10, 0, 0, 0.99995, 130227e-10, 0, 0, 0.999922, 148176e-10,
              0, 0, 0.999884, 177303e-10, 0, 0, 0.99983, 224564e-10, 0, 0,
              0.999758, 300966e-10, 0, 0, 0.999654, 423193e-10, 0, 549083e-11,
              0.999503, 614848e-10, 0, 296087e-9, 0.999237, 903576e-10, 0,
              0.00123144, 0.998491, 1271e-7, 0, 0.00295954, 0.994594, 107754e-9,
              0, 0.00555829, 0.99178, 103025e-9, 0, 0.00907209, 0.989265,
              11154e-8, 0, 0.0135257, 0.986998, 136296e-9, 0, 0.0189327,
              0.984137, 169154e-9, 0, 0.0252993, 0.979798, 196671e-9, 0,
              0.0326272, 0.97337, 196678e-9, 0, 0.0409157, 0.967239, 223121e-9,
              0, 0.0501623, 0.959543, 253809e-9, 0, 0.0603638, 0.949466,
              265972e-9, 0, 0.0715171, 0.939074, 288372e-9, 0, 0.0836187,
              0.931118, 310983e-9, 0, 0.0966657, 0.922525, 325561e-9, 0,
              0.110656, 0.912983, 345725e-9, 0, 0.125588, 0.901617, 3556e-7, 0,
              0.141461, 0.889487, 374012e-9, 0, 0.158275, 0.875787, 383445e-9,
              0, 0.176031, 0.860654, 393972e-9, 0, 0.19473, 0.844417, 400311e-9,
              0, 0.214374, 0.82741, 405004e-9, 0, 0.234967, 0.810545, 407378e-9,
              0, 0.256512, 0.793312, 407351e-9, 0, 0.279011, 0.774847,
              406563e-9, 0, 0.302468, 0.755621, 404903e-9, 0, 0.326887,
              0.735511, 397486e-9, 0, 0.352266, 0.715435, 39357e-8, 0, 0.378605,
              0.695403, 384739e-9, 0, 0.405897, 0.674681, 376108e-9, 0, 0.43413,
              0.65359, 365997e-9, 0, 0.463277, 0.632471, 354957e-9, 0, 0.493295,
              0.61151, 343593e-9, 0, 0.524106, 0.59064, 331841e-9, 0, 0.555561,
              0.569386, 318891e-9, 0, 0.587302, 0.548785, 3072e-7, 0, 0.619048,
              0.528146, 29361e-8, 0, 0.650794, 0.507872, 281709e-9, 0, 0.68254,
              0.487805, 268627e-9, 0, 0.714286, 0.468196, 255887e-9, 0,
              0.746032, 0.448922, 243997e-9, 0, 0.777778, 0.430093, 231662e-9,
              0, 0.809524, 0.411845, 220339e-9, 0, 0.84127, 0.393808, 208694e-9,
              0, 0.873016, 0.376615, 198045e-9, 0, 0.904762, 0.359655,
              187375e-9, 0, 0.936508, 0.343452, 177371e-9, 0, 0.968254, 0.32765,
              167525e-9, 0, 1, 1, 169351e-10, 0, 0, 1, 169356e-10, 0, 0, 1,
              169427e-10, 0, 0, 0.999999, 169736e-10, 0, 0, 0.999998,
              170575e-10, 0, 0, 0.999995, 172372e-10, 0, 0, 0.99999, 175739e-10,
              0, 0, 0.999979, 181568e-10, 0, 0, 0.999966, 191206e-10, 0, 0,
              0.999944, 20677e-9, 0, 0, 0.999912, 231644e-10, 0, 0, 0.999869,
              271268e-10, 0, 0, 0.999811, 334272e-10, 0, 0, 0.99973, 433979e-10,
              0, 0, 0.999617, 590083e-10, 0, 680315e-10, 0.999445, 829497e-10,
              0, 612796e-9, 0.999138, 118019e-9, 0, 0.00187408, 0.998095,
              156712e-9, 0, 0.00395791, 0.993919, 125054e-9, 0, 0.00692144,
              0.991333, 126091e-9, 0, 0.0107962, 0.989226, 144912e-9, 0,
              0.0155986, 0.986954, 175737e-9, 0, 0.0213364, 0.983982, 213883e-9,
              0, 0.0280114, 0.979128, 234526e-9, 0, 0.0356226, 0.973327,
              243725e-9, 0, 0.0441668, 0.967416, 2773e-7, 0, 0.0536399,
              0.959729, 308799e-9, 0, 0.0640376, 0.949758, 322447e-9, 0,
              0.0753554, 0.939173, 350021e-9, 0, 0.0875893, 0.9296, 370089e-9,
              0, 0.100736, 0.921181, 391365e-9, 0, 0.114793, 0.91164, 413636e-9,
              0, 0.129759, 0.900435, 427068e-9, 0, 0.145632, 0.888183,
              441046e-9, 0, 0.162412, 0.874772, 454968e-9, 0, 0.180101,
              0.859566, 461882e-9, 0, 0.1987, 0.843579, 471556e-9, 0, 0.218213,
              0.826453, 474335e-9, 0, 0.238641, 0.809164, 477078e-9, 0,
              0.259989, 0.792179, 47755e-8, 0, 0.282262, 0.773866, 472573e-9, 0,
              0.305464, 0.754944, 469765e-9, 0, 0.329599, 0.735133, 462371e-9,
              0, 0.35467, 0.714858, 453674e-9, 0, 0.380678, 0.694829, 443888e-9,
              0, 0.407622, 0.674453, 432052e-9, 0, 0.435493, 0.653685,
              420315e-9, 0, 0.464275, 0.632666, 406829e-9, 0, 0.493938,
              0.611676, 392234e-9, 0, 0.524422, 0.591193, 379208e-9, 0,
              0.555624, 0.570145, 36319e-8, 0, 0.587302, 0.549566, 349111e-9, 0,
              0.619048, 0.529278, 334166e-9, 0, 0.650794, 0.509026, 318456e-9,
              0, 0.68254, 0.489186, 30449e-8, 0, 0.714286, 0.469662, 289051e-9,
              0, 0.746032, 0.450691, 275494e-9, 0, 0.777778, 0.431841,
              261437e-9, 0, 0.809524, 0.413752, 247846e-9, 0, 0.84127, 0.395951,
              235085e-9, 0, 0.873016, 0.378633, 222245e-9, 0, 0.904762, 0.36194,
              210533e-9, 0, 0.936508, 0.345599, 198494e-9, 0, 0.968254,
              0.329999, 188133e-9, 0, 1, 1, 269663e-10, 0, 0, 1, 26967e-9, 0, 0,
              1, 269772e-10, 0, 0, 0.999999, 270214e-10, 0, 0, 0.999998,
              271415e-10, 0, 0, 0.999994, 27398e-9, 0, 0, 0.999988, 278771e-10,
              0, 0, 0.999977, 287019e-10, 0, 0, 0.999961, 300544e-10, 0, 0,
              0.999937, 322138e-10, 0, 0, 0.999904, 356163e-10, 0, 0, 0.999854,
              409465e-10, 0, 0, 0.99979, 492651e-10, 0, 0, 0.999699, 621722e-10,
              0, 8.8288e-7, 0.999572, 819715e-10, 0, 223369e-9, 0.999381,
              111689e-9, 0, 0.00105414, 0.999016, 153862e-9, 0, 0.0026493,
              0.997437, 187667e-9, 0, 0.00508608, 0.993545, 155672e-9, 0,
              0.00840554, 0.991135, 161455e-9, 0, 0.012629, 0.989157, 188241e-9,
              0, 0.0177661, 0.986874, 226229e-9, 0, 0.0238198, 0.983714,
              268668e-9, 0, 0.0307887, 0.978301, 277109e-9, 0, 0.0386688,
              0.973227, 303446e-9, 0, 0.0474554, 0.967317, 341851e-9, 0,
              0.0571428, 0.959477, 370885e-9, 0, 0.0677256, 0.950012, 392753e-9,
              0, 0.0791988, 0.939484, 42781e-8, 0, 0.0915576, 0.928135,
              443866e-9, 0, 0.104798, 0.919819, 472959e-9, 0, 0.118918,
              0.910049, 491551e-9, 0, 0.133915, 0.899181, 512616e-9, 0,
              0.149788, 0.886881, 523563e-9, 0, 0.166537, 0.87359, 540183e-9, 0,
              0.184164, 0.858613, 547386e-9, 0, 0.202669, 0.842809, 554809e-9,
              0, 0.222056, 0.825727, 558316e-9, 0, 0.242329, 0.808086,
              557824e-9, 0, 0.263492, 0.790728, 556346e-9, 0, 0.285551,
              0.772987, 552672e-9, 0, 0.30851, 0.7541, 543738e-9, 0, 0.332376,
              0.734669, 536107e-9, 0, 0.357153, 0.714411, 523342e-9, 0,
              0.382845, 0.694196, 512238e-9, 0, 0.409454, 0.674252, 497465e-9,
              0, 0.436977, 0.65357, 481096e-9, 0, 0.465404, 0.632999, 467054e-9,
              0, 0.494713, 0.611994, 448771e-9, 0, 0.524864, 0.591604,
              431889e-9, 0, 0.555779, 0.571134, 415238e-9, 0, 0.587302,
              0.550528, 396369e-9, 0, 0.619048, 0.530292, 379477e-9, 0,
              0.650794, 0.510364, 361488e-9, 0, 0.68254, 0.490749, 343787e-9, 0,
              0.714286, 0.471266, 327822e-9, 0, 0.746032, 0.452462, 310626e-9,
              0, 0.777778, 0.433907, 295352e-9, 0, 0.809524, 0.415659,
              279179e-9, 0, 0.84127, 0.398138, 264685e-9, 0, 0.873016, 0.380833,
              249905e-9, 0, 0.904762, 0.364247, 236282e-9, 0, 0.936508,
              0.348041, 222905e-9, 0, 0.968254, 0.332389, 210522e-9, 0, 1, 1,
              420604e-10, 0, 0, 1, 420614e-10, 0, 0, 1, 420757e-10, 0, 0,
              0.999999, 42138e-9, 0, 0, 0.999997, 423067e-10, 0, 0, 0.999993,
              426668e-10, 0, 0, 0.999986, 433372e-10, 0, 0, 0.999974,
              444857e-10, 0, 0, 0.999956, 463554e-10, 0, 0, 0.99993, 493105e-10,
              0, 0, 0.999892, 539077e-10, 0, 0, 0.999838, 610005e-10, 0, 0,
              0.999767, 718822e-10, 0, 0, 0.999666, 884581e-10, 0, 365471e-10,
              0.999525, 113398e-9, 0, 485623e-9, 0.999311, 150043e-9, 0,
              0.00162096, 0.998865, 200063e-9, 0, 0.00355319, 0.996278,
              211014e-9, 0, 0.00633818, 0.992956, 189672e-9, 0, 0.0100043,
              0.991017, 210262e-9, 0, 0.0145648, 0.989055, 244292e-9, 0,
              0.0200237, 0.986741, 290481e-9, 0, 0.0263798, 0.983288, 334303e-9,
              0, 0.033629, 0.977784, 340307e-9, 0, 0.0417652, 0.973037,
              377864e-9, 0, 0.0507821, 0.967181, 4239e-7, 0, 0.060673, 0.958971,
              443854e-9, 0, 0.0714314, 0.950093, 483039e-9, 0, 0.0830518,
              0.939552, 517934e-9, 0, 0.0955288, 0.927678, 539449e-9, 0,
              0.108859, 0.918278, 568604e-9, 0, 0.123038, 0.908449, 588505e-9,
              0, 0.138065, 0.897713, 612473e-9, 0, 0.153938, 0.885533,
              625575e-9, 0, 0.170657, 0.872131, 63854e-8, 0, 0.188224, 0.857517,
              647034e-9, 0, 0.20664, 0.841796, 65209e-8, 0, 0.225909, 0.824726,
              6544e-7, 0, 0.246035, 0.807297, 655744e-9, 0, 0.267022, 0.789058,
              646716e-9, 0, 0.288878, 0.77189, 643898e-9, 0, 0.311607, 0.753082,
              629973e-9, 0, 0.335216, 0.7341, 621564e-9, 0, 0.359713, 0.714094,
              605171e-9, 0, 0.385103, 0.693839, 588752e-9, 0, 0.41139, 0.673891,
              573294e-9, 0, 0.438576, 0.653565, 552682e-9, 0, 0.466656,
              0.633326, 533446e-9, 0, 0.495617, 0.612582, 514635e-9, 0,
              0.525431, 0.59205, 49303e-8, 0, 0.556041, 0.571918, 471842e-9, 0,
              0.587338, 0.551572, 451713e-9, 0, 0.619048, 0.531553, 430049e-9,
              0, 0.650794, 0.51175, 410445e-9, 0, 0.68254, 0.49238, 390098e-9,
              0, 0.714286, 0.473143, 370033e-9, 0, 0.746032, 0.45423, 351205e-9,
              0, 0.777778, 0.435963, 332049e-9, 0, 0.809524, 0.41787, 315021e-9,
              0, 0.84127, 0.400387, 297315e-9, 0, 0.873016, 0.383332, 281385e-9,
              0, 0.904762, 0.366665, 265397e-9, 0, 0.936508, 0.350633,
              250601e-9, 0, 0.968254, 0.334964, 23589e-8, 0, 1, 1, 643736e-10,
              0, 0, 1, 64375e-9, 0, 0, 1, 643947e-10, 0, 0, 0.999999, 64481e-9,
              0, 0, 0.999997, 647143e-10, 0, 0, 0.999994, 652119e-10, 0, 0,
              0.999985, 661359e-10, 0, 0, 0.999972, 677116e-10, 0, 0, 0.999952,
              702599e-10, 0, 0, 0.999922, 742517e-10, 0, 0, 0.99988, 803906e-10,
              0, 0, 0.99982, 897315e-10, 0, 0, 0.999741, 103838e-9, 0, 0,
              0.999629, 12496e-8, 0, 149024e-9, 0.999474, 156161e-9, 0,
              861027e-9, 0.999229, 201034e-9, 0, 0.00231198, 0.998662,
              259069e-9, 0, 0.00458147, 0.995299, 245439e-9, 0, 0.00770895,
              0.992732, 24498e-8, 0, 0.0117126, 0.990847, 273211e-9, 0,
              0.0165989, 0.988911, 316492e-9, 0, 0.0223674, 0.98654, 37161e-8,
              0, 0.0290135, 0.982636, 410352e-9, 0, 0.0365309, 0.977346,
              421756e-9, 0, 0.0449117, 0.972909, 475578e-9, 0, 0.0541481,
              0.966821, 522482e-9, 0, 0.0642326, 0.958686, 545008e-9, 0,
              0.075158, 0.949754, 589286e-9, 0, 0.0869181, 0.939184, 619995e-9,
              0, 0.0995074, 0.927505, 654266e-9, 0, 0.112922, 0.916606,
              682362e-9, 0, 0.127157, 0.906707, 704286e-9, 0, 0.142212,
              0.895937, 725909e-9, 0, 0.158085, 0.883913, 743939e-9, 0,
              0.174776, 0.870642, 755157e-9, 0, 0.192287, 0.856241, 764387e-9,
              0, 0.210619, 0.84069, 771032e-9, 0, 0.229775, 0.823728, 765906e-9,
              0, 0.249761, 0.806481, 767604e-9, 0, 0.270582, 0.787924,
              754385e-9, 0, 0.292243, 0.770588, 749668e-9, 0, 0.314753,
              0.751991, 731613e-9, 0, 0.338118, 0.733407, 717655e-9, 0,
              0.362347, 0.713688, 700604e-9, 0, 0.387447, 0.693595, 678765e-9,
              0, 0.413424, 0.673426, 657042e-9, 0, 0.440284, 0.65359, 635892e-9,
              0, 0.468027, 0.633576, 611569e-9, 0, 0.496645, 0.613144,
              586011e-9, 0, 0.526122, 0.592711, 563111e-9, 0, 0.556417,
              0.572722, 537699e-9, 0, 0.587451, 0.552762, 512556e-9, 0,
              0.619048, 0.532985, 489757e-9, 0, 0.650794, 0.513219, 464139e-9,
              0, 0.68254, 0.493992, 442193e-9, 0, 0.714286, 0.47509, 418629e-9,
              0, 0.746032, 0.456287, 397045e-9, 0, 0.777778, 0.438152,
              375504e-9, 0, 0.809524, 0.420294, 35492e-8, 0, 0.84127, 0.402749,
              335327e-9, 0, 0.873016, 0.385879, 316422e-9, 0, 0.904762,
              0.369352, 298333e-9, 0, 0.936508, 0.353301, 281417e-9, 0,
              0.968254, 0.337781, 265203e-9, 0, 1, 1, 968267e-10, 0, 0, 1,
              968284e-10, 0, 0, 1, 968556e-10, 0, 0, 0.999999, 969733e-10, 0, 0,
              0.999997, 972913e-10, 0, 0, 0.999993, 979688e-10, 0, 0, 0.999984,
              992239e-10, 0, 0, 0.999969, 101356e-9, 0, 0, 0.999946, 104784e-9,
              0, 0, 0.999913, 110111e-9, 0, 0, 0.999868, 118217e-9, 0, 0,
              0.999801, 130396e-9, 0, 0, 0.999712, 148523e-9, 0, 124907e-10,
              0.999589, 175233e-9, 0, 355405e-9, 0.999416, 213999e-9, 0,
              0.0013528, 0.999136, 268529e-9, 0, 0.00312557, 0.998367,
              333088e-9, 0, 0.00573045, 0.994701, 304757e-9, 0, 0.00919397,
              0.992497, 318031e-9, 0, 0.0135261, 0.990608, 353863e-9, 0,
              0.0187278, 0.988715, 409044e-9, 0, 0.0247947, 0.986241, 472967e-9,
              0, 0.0317196, 0.981696, 495104e-9, 0, 0.039494, 0.977097,
              532873e-9, 0, 0.0481087, 0.972583, 594447e-9, 0, 0.0575549,
              0.966142, 636867e-9, 0, 0.0678242, 0.95823, 669899e-9, 0,
              0.0789089, 0.949677, 719499e-9, 0, 0.0908023, 0.939226, 750584e-9,
              0, 0.103499, 0.927501, 793183e-9, 0, 0.116993, 0.915199, 81995e-8,
              0, 0.131282, 0.90498, 847654e-9, 0, 0.146364, 0.894243, 868929e-9,
              0, 0.162237, 0.882154, 884278e-9, 0, 0.178902, 0.869161,
              898108e-9, 0, 0.196358, 0.854751, 901254e-9, 0, 0.21461, 0.839368,
              90679e-8, 0, 0.23366, 0.822874, 901541e-9, 0, 0.253512, 0.805514,
              897297e-9, 0, 0.274174, 0.78716, 881856e-9, 0, 0.29565, 0.769061,
              870032e-9, 0, 0.31795, 0.751, 851719e-9, 0, 0.341081, 0.732614,
              830671e-9, 0, 0.365053, 0.713171, 806569e-9, 0, 0.389874,
              0.693472, 78338e-8, 0, 0.415553, 0.673528, 756404e-9, 0, 0.442098,
              0.653397, 726872e-9, 0, 0.469512, 0.633781, 700494e-9, 0,
              0.497794, 0.613877, 67105e-8, 0, 0.526935, 0.593506, 640361e-9, 0,
              0.556908, 0.573667, 613502e-9, 0, 0.587657, 0.553932, 583177e-9,
              0, 0.61906, 0.534345, 554375e-9, 0, 0.650794, 0.515042, 527811e-9,
              0, 0.68254, 0.495674, 499367e-9, 0, 0.714286, 0.477132, 47429e-8,
              0, 0.746032, 0.458609, 447726e-9, 0, 0.777778, 0.440354,
              424205e-9, 0, 0.809524, 0.422765, 399549e-9, 0, 0.84127, 0.405472,
              378315e-9, 0, 0.873016, 0.388482, 355327e-9, 0, 0.904762,
              0.372191, 336122e-9, 0, 0.936508, 0.356099, 315247e-9, 0,
              0.968254, 0.340737, 29794e-8, 0, 1, 1, 143327e-9, 0, 0, 1,
              14333e-8, 0, 0, 1, 143366e-9, 0, 0, 0.999999, 143524e-9, 0, 0,
              0.999996, 143952e-9, 0, 0, 0.999991, 144862e-9, 0, 0, 0.999981,
              146544e-9, 0, 0, 0.999966, 149391e-9, 0, 0, 0.999941, 153946e-9,
              0, 0, 0.999905, 160971e-9, 0, 0, 0.999852, 171562e-9, 0, 0,
              0.99978, 18729e-8, 0, 0, 0.999681, 210386e-9, 0, 826239e-10,
              0.999546, 243906e-9, 0, 664807e-9, 0.999352, 291739e-9, 0,
              0.00196192, 0.999027, 357419e-9, 0, 0.00405941, 0.997886,
              422349e-9, 0, 0.00699664, 0.99419, 385008e-9, 0, 0.0107896,
              0.99214, 409775e-9, 0, 0.0154415, 0.990274, 456418e-9, 0,
              0.0209488, 0.988455, 527008e-9, 0, 0.0273037, 0.985804, 597685e-9,
              0, 0.0344969, 0.98103, 613124e-9, 0, 0.0425183, 0.976674,
              668321e-9, 0, 0.0513575, 0.972021, 736985e-9, 0, 0.0610046,
              0.965274, 773789e-9, 0, 0.0714508, 0.958046, 830852e-9, 0,
              0.0826877, 0.949333, 875766e-9, 0, 0.0947085, 0.939135, 917088e-9,
              0, 0.107507, 0.927119, 952244e-9, 0, 0.121078, 0.91469, 990626e-9,
              0, 0.135419, 0.903006, 0.00101304, 0, 0.150526, 0.892368,
              0.00103834, 0, 0.166399, 0.880231, 0.00105002, 0, 0.183038,
              0.867432, 0.00106331, 0, 0.200443, 0.853208, 0.00106783, 0,
              0.218618, 0.837956, 0.00106458, 0, 0.237566, 0.821772, 0.00105945,
              0, 0.257291, 0.804328, 0.00104685, 0, 0.2778, 0.786465,
              0.00103178, 0, 0.2991, 0.768004, 0.00101077, 0, 0.321199, 0.74972,
              985504e-9, 0, 0.344106, 0.731682, 962893e-9, 0, 0.36783, 0.712813,
              932146e-9, 0, 0.392383, 0.693139, 89871e-8, 0, 0.417774, 0.673566,
              869678e-9, 0, 0.444013, 0.653483, 835525e-9, 0, 0.471107,
              0.633891, 799853e-9, 0, 0.49906, 0.614433, 766838e-9, 0, 0.527869,
              0.594586, 732227e-9, 0, 0.557517, 0.574769, 696442e-9, 0,
              0.587966, 0.555149, 663935e-9, 0, 0.61913, 0.535898, 629826e-9, 0,
              0.650794, 0.516753, 596486e-9, 0, 0.68254, 0.497816, 567078e-9, 0,
              0.714286, 0.479034, 534399e-9, 0, 0.746032, 0.460975, 507013e-9,
              0, 0.777778, 0.442935, 477421e-9, 0, 0.809524, 0.425263,
              451101e-9, 0, 0.84127, 0.408248, 424964e-9, 0, 0.873016, 0.391339,
              39993e-8, 0, 0.904762, 0.37513, 377619e-9, 0, 0.936508, 0.359172,
              354418e-9, 0, 0.968254, 0.343876, 334823e-9, 0, 1, 1, 209042e-9,
              0, 0, 1, 209045e-9, 0, 0, 1, 209093e-9, 0, 0, 0.999999, 209304e-9,
              0, 0, 0.999996, 209871e-9, 0, 0, 0.999991, 211078e-9, 0, 0,
              0.999979, 213304e-9, 0, 0, 0.999963, 217061e-9, 0, 0, 0.999933,
              223042e-9, 0, 0, 0.999894, 232206e-9, 0, 0, 0.999837, 245901e-9,
              0, 0, 0.999756, 266023e-9, 0, 102927e-11, 0.999648, 295204e-9, 0,
              233468e-9, 0.999499, 336958e-9, 0, 0.00108237, 0.999283,
              395563e-9, 0, 0.00268832, 0.998896, 473785e-9, 0, 0.00511138,
              0.997006, 520008e-9, 0, 0.00837705, 0.993819, 497261e-9, 0,
              0.0124928, 0.991632, 523722e-9, 0, 0.0174561, 0.989875, 587258e-9,
              0, 0.0232596, 0.988109, 676329e-9, 0, 0.0298932, 0.985155,
              747701e-9, 0, 0.0373453, 0.980479, 768803e-9, 0, 0.0456045,
              0.976271, 841054e-9, 0, 0.0546593, 0.971347, 911469e-9, 0,
              0.0644994, 0.964528, 953057e-9, 0, 0.0751152, 0.957632,
              0.00102221, 0, 0.0864981, 0.948681, 0.00106122, 0, 0.0986407,
              0.938716, 0.00111857, 0, 0.111537, 0.926629, 0.00114762, 0,
              0.125182, 0.914025, 0.00118995, 0, 0.139571, 0.901026, 0.00121228,
              0, 0.154703, 0.890358, 0.00123946, 0, 0.170576, 0.878283,
              0.0012527, 0, 0.18719, 0.865459, 0.00125536, 0, 0.204547,
              0.851407, 0.00126134, 0, 0.222648, 0.836276, 0.00124759, 0,
              0.241498, 0.820436, 0.00124443, 0, 0.261101, 0.803253, 0.00122071,
              0, 0.281465, 0.785562, 0.00120107, 0, 0.302595, 0.76718,
              0.00117762, 0, 0.324501, 0.748551, 0.00114289, 0, 0.347192,
              0.730564, 0.00110872, 0, 0.370679, 0.712253, 0.00107636, 0,
              0.394973, 0.692867, 0.00103646, 0, 0.420085, 0.673695, 996793e-9,
              0, 0.446027, 0.653912, 95675e-8, 0, 0.47281, 0.634129, 916739e-9,
              0, 0.500441, 0.615004, 874401e-9, 0, 0.528921, 0.595587,
              833411e-9, 0, 0.558244, 0.575965, 794556e-9, 0, 0.588384, 0.5566,
              75196e-8, 0, 0.619281, 0.537428, 716381e-9, 0, 0.650795, 0.518623,
              676558e-9, 0, 0.68254, 0.499964, 64074e-8, 0, 0.714286, 0.481356,
              605984e-9, 0, 0.746032, 0.463279, 570256e-9, 0, 0.777778,
              0.445673, 540138e-9, 0, 0.809524, 0.428032, 507299e-9, 0, 0.84127,
              0.411112, 479553e-9, 0, 0.873016, 0.394444, 450737e-9, 0,
              0.904762, 0.378247, 424269e-9, 0, 0.936508, 0.362415, 399111e-9,
              0, 0.968254, 0.347103, 375274e-9, 0, 1, 1, 300729e-9, 0, 0, 1,
              300733e-9, 0, 0, 1, 300797e-9, 0, 0, 0.999998, 301072e-9, 0, 0,
              0.999996, 301817e-9, 0, 0, 0.999989, 303398e-9, 0, 0, 0.999977,
              306309e-9, 0, 0, 0.999958, 311209e-9, 0, 0, 0.999927, 318975e-9,
              0, 0, 0.999884, 330804e-9, 0, 0, 0.99982, 34834e-8, 0, 0,
              0.999733, 373854e-9, 0, 326995e-10, 0.999613, 410424e-9, 0,
              477174e-9, 0.999447, 462047e-9, 0, 0.00161099, 0.999204,
              533322e-9, 0, 0.00353153, 0.998725, 624964e-9, 0, 0.00627965,
              0.995871, 631786e-9, 0, 0.0098693, 0.993194, 632017e-9, 0,
              0.0143011, 0.991541, 68923e-8, 0, 0.019568, 0.989773, 766892e-9,
              0, 0.0256593, 0.987647, 863668e-9, 0, 0.0325625, 0.984193,
              922089e-9, 0, 0.0402647, 0.980016, 970749e-9, 0, 0.0487532,
              0.975859, 0.00106027, 0, 0.058016, 0.970514, 0.00112239, 0,
              0.0680419, 0.963625, 0.00117212, 0, 0.0788208, 0.956959,
              0.00125211, 0, 0.0903439, 0.947956, 0.00129411, 0, 0.102604,
              0.93809, 0.00135879, 0, 0.115594, 0.92659, 0.00139309, 0,
              0.129309, 0.913829, 0.00143253, 0, 0.143745, 0.90005, 0.00145809,
              0, 0.158901, 0.888129, 0.0014748, 0, 0.174774, 0.87607,
              0.00148756, 0, 0.191365, 0.863461, 0.00148714, 0, 0.208674,
              0.849594, 0.00148892, 0, 0.226705, 0.834531, 0.00146496, 0,
              0.245461, 0.81903, 0.0014579, 0, 0.264947, 0.802122, 0.00143039,
              0, 0.28517, 0.78445, 0.00139717, 0, 0.306137, 0.766434,
              0.00136312, 0, 0.327857, 0.747816, 0.00132597, 0, 0.350341,
              0.729519, 0.00128323, 0, 0.373598, 0.711454, 0.00123803, 0,
              0.397642, 0.692699, 0.00119097, 0, 0.422485, 0.673723, 0.00114565,
              0, 0.448139, 0.654386, 0.00109552, 0, 0.474619, 0.634673,
              0.00104553, 0, 0.501933, 0.615554, 99985e-8, 0, 0.530089,
              0.596462, 948207e-9, 0, 0.559087, 0.577385, 902299e-9, 0,
              0.588913, 0.558257, 856448e-9, 0, 0.619525, 0.5392, 810395e-9, 0,
              0.650826, 0.520543, 768558e-9, 0, 0.68254, 0.502206, 7239e-7, 0,
              0.714286, 0.48402, 685794e-9, 0, 0.746032, 0.465779, 64471e-8, 0,
              0.777778, 0.448455, 609583e-9, 0, 0.809524, 0.431091, 57227e-8, 0,
              0.84127, 0.414147, 54042e-8, 0, 0.873016, 0.39765, 506545e-9, 0,
              0.904762, 0.381576, 477635e-9, 0, 0.936508, 0.365881, 448446e-9,
              0, 0.968254, 0.350582, 421424e-9, 0, 1, 1, 427144e-9, 0, 0, 1,
              427151e-9, 0, 0, 1, 427232e-9, 0, 0, 0.999998, 42759e-8, 0, 0,
              0.999995, 428555e-9, 0, 0, 0.999988, 430603e-9, 0, 0, 0.999976,
              434368e-9, 0, 0, 0.999952, 440688e-9, 0, 0, 0.999919, 450667e-9,
              0, 0, 0.999871, 46578e-8, 0, 0, 0.999801, 488024e-9, 0, 0,
              0.999704, 520092e-9, 0, 129791e-9, 0.999572, 565553e-9, 0,
              821056e-9, 0.999389, 628906e-9, 0, 0.00225241, 0.999114,
              714911e-9, 0, 0.00449109, 0.998488, 819218e-9, 0, 0.00756249,
              0.995234, 80415e-8, 0, 0.0114716, 0.993021, 830181e-9, 0,
              0.0162131, 0.991407, 902645e-9, 0, 0.021776, 0.989625, 996934e-9,
              0, 0.0281471, 0.987064, 0.00109707, 0, 0.0353118, 0.983265,
              0.00114353, 0, 0.0432562, 0.979535, 0.0012272, 0, 0.0519665,
              0.975224, 0.00132642, 0, 0.0614298, 0.969574, 0.00138092, 0,
              0.0716348, 0.963021, 0.00145896, 0, 0.0825709, 0.956046,
              0.00152834, 0, 0.094229, 0.947136, 0.00158217, 0, 0.106602,
              0.937313, 0.0016347, 0, 0.119682, 0.926073, 0.00168383, 0,
              0.133465, 0.913121, 0.00171627, 0, 0.147947, 0.899165, 0.00174229,
              0, 0.163125, 0.885891, 0.00176137, 0, 0.178998, 0.873783,
              0.00176406, 0, 0.195566, 0.861331, 0.00176156, 0, 0.21283,
              0.847569, 0.00175346, 0, 0.230793, 0.832785, 0.00172753, 0,
              0.249459, 0.817442, 0.00170204, 0, 0.268832, 0.800613, 0.00166576,
              0, 0.28892, 0.783597, 0.00162909, 0, 0.30973, 0.76571, 0.0015826,
              0, 0.331271, 0.747021, 0.00153106, 0, 0.353554, 0.728593,
              0.00148036, 0, 0.37659, 0.710661, 0.00142808, 0, 0.400391,
              0.692426, 0.00136906, 0, 0.424973, 0.673623, 0.00131066, 0,
              0.450347, 0.65494, 0.00125569, 0, 0.476531, 0.635448, 0.00119517,
              0, 0.503535, 0.616221, 0.00113828, 0, 0.531372, 0.597531,
              0.0010816, 0, 0.560047, 0.578795, 0.00102673, 0, 0.589554,
              0.559892, 970985e-9, 0, 0.619869, 0.541307, 919773e-9, 0,
              0.650923, 0.522608, 868479e-9, 0, 0.68254, 0.504484, 82137e-8, 0,
              0.714286, 0.486603, 772916e-9, 0, 0.746032, 0.468802, 730353e-9,
              0, 0.777778, 0.451172, 684955e-9, 0, 0.809524, 0.434348,
              647565e-9, 0, 0.84127, 0.417445, 605863e-9, 0, 0.873016, 0.401077,
              571885e-9, 0, 0.904762, 0.385039, 536034e-9, 0, 0.936508,
              0.369483, 504227e-9, 0, 0.968254, 0.354272, 473165e-9, 0, 1, 1,
              599525e-9, 0, 0, 1, 599533e-9, 0, 0, 1, 599639e-9, 0, 0, 0.999998,
              600097e-9, 0, 0, 0.999994, 601336e-9, 0, 0, 0.999987, 603958e-9,
              0, 0, 0.999972, 608775e-9, 0, 0, 0.999949, 616842e-9, 0, 0,
              0.999912, 629534e-9, 0, 0, 0.999857, 648658e-9, 0, 0, 0.999781,
              676615e-9, 0, 538873e-11, 0.999674, 716574e-9, 0, 308602e-9,
              0.999528, 772641e-9, 0, 0.00127003, 0.999326, 849806e-9, 0,
              0.00300783, 0.999009, 952682e-9, 0, 0.00556637, 0.998112,
              0.00106394, 0, 0.00895889, 0.994496, 0.00102228, 0, 0.0131827,
              0.992806, 0.00108586, 0, 0.0182277, 0.991211, 0.0011759, 0,
              0.0240795, 0.989415, 0.00128955, 0, 0.030723, 0.986499,
              0.00139038, 0, 0.0381418, 0.982679, 0.00144539, 0, 0.046321,
              0.978839, 0.00153954, 0, 0.0552459, 0.974295, 0.00164417, 0,
              0.0649034, 0.968784, 0.00171517, 0, 0.0752814, 0.962324,
              0.00180282, 0, 0.0863693, 0.954956, 0.00186387, 0, 0.0981578,
              0.94624, 0.00193817, 0, 0.110639, 0.936517, 0.00198156, 0,
              0.123806, 0.925186, 0.00203042, 0, 0.137655, 0.91252, 0.0020664,
              0, 0.15218, 0.898441, 0.00207822, 0, 0.16738, 0.884394, 0.0020992,
              0, 0.183253, 0.871273, 0.00208748, 0, 0.199799, 0.859057,
              0.00208686, 0, 0.21702, 0.845243, 0.00205519, 0, 0.234918,
              0.830723, 0.00202868, 0, 0.253496, 0.815801, 0.00199501, 0,
              0.272761, 0.79914, 0.00194193, 0, 0.292719, 0.782372, 0.00188824,
              0, 0.313377, 0.76482, 0.00183695, 0, 0.334745, 0.746586,
              0.00177418, 0, 0.356833, 0.7281, 0.00170628, 0, 0.379654,
              0.709842, 0.00164063, 0, 0.403221, 0.692019, 0.00157355, 0,
              0.427548, 0.67364, 0.00150262, 0, 0.452651, 0.655277, 0.00143473,
              0, 0.478545, 0.636438, 0.00136371, 0, 0.505246, 0.617364,
              0.00129911, 0, 0.532768, 0.598603, 0.00123014, 0, 0.561122,
              0.580195, 0.00116587, 0, 0.590309, 0.561786, 0.00110398, 0,
              0.620318, 0.543377, 0.00104148, 0, 0.651102, 0.525093, 983984e-9,
              0, 0.682545, 0.506791, 92667e-8, 0, 0.714286, 0.489291, 874326e-9,
              0, 0.746032, 0.471811, 821734e-9, 0, 0.777778, 0.454435,
              774698e-9, 0, 0.809524, 0.437493, 727302e-9, 0, 0.84127, 0.420977,
              684039e-9, 0, 0.873016, 0.404729, 64373e-8, 0, 0.904762, 0.388756,
              60285e-8, 0, 0.936508, 0.373344, 56765e-8, 0, 0.968254, 0.358191,
              531929e-9, 0, 1, 1, 832169e-9, 0, 0, 1, 832178e-9, 0, 0, 1,
              83231e-8, 0, 0, 0.999998, 832893e-9, 0, 0, 0.999995, 834465e-9, 0,
              0, 0.999985, 837791e-9, 0, 0, 0.999969, 843893e-9, 0, 0, 0.999944,
              854086e-9, 0, 0, 0.999903, 870071e-9, 0, 0, 0.999843, 894042e-9,
              0, 0, 0.999759, 928865e-9, 0, 531805e-10, 0.999643, 978242e-9, 0,
              579365e-9, 0.99948, 0.00104684, 0, 0.00182774, 0.999255,
              0.00114012, 0, 0.00387804, 0.998885, 0.00126188, 0, 0.00675709,
              0.997405, 0.00135888, 0, 0.010468, 0.99424, 0.00133626, 0,
              0.0150018, 0.992458, 0.00140905, 0, 0.0203443, 0.990929,
              0.00152305, 0, 0.0264786, 0.989116, 0.00165882, 0, 0.0333875,
              0.985624, 0.00174128, 0, 0.0410536, 0.982003, 0.00182108, 0,
              0.0494609, 0.978336, 0.00194498, 0, 0.0585941, 0.973184,
              0.00202708, 0, 0.0684396, 0.9678, 0.00212166, 0, 0.0789851,
              0.961348, 0.00221366, 0, 0.0902199, 0.953841, 0.00228219, 0,
              0.102134, 0.94534, 0.00235662, 0, 0.114721, 0.935552, 0.00240572,
              0, 0.127972, 0.924064, 0.00244405, 0, 0.141884, 0.911827,
              0.00247557, 0, 0.156451, 0.897731, 0.00248374, 0, 0.171672,
              0.883409, 0.00249863, 0, 0.187545, 0.868625, 0.00246688, 0,
              0.20407, 0.856529, 0.00246523, 0, 0.221249, 0.842999, 0.00242368,
              0, 0.239083, 0.828505, 0.00237354, 0, 0.257578, 0.813825,
              0.00232588, 0, 0.276738, 0.797813, 0.00226731, 0, 0.296569,
              0.781097, 0.00219704, 0, 0.31708, 0.764038, 0.00212394, 0,
              0.338281, 0.746067, 0.00204786, 0, 0.360181, 0.727687, 0.00196728,
              0, 0.382794, 0.709571, 0.00188779, 0, 0.406133, 0.691503,
              0.00180532, 0, 0.430213, 0.673673, 0.00171849, 0, 0.45505,
              0.655732, 0.00164147, 0, 0.480662, 0.637399, 0.00155858, 0,
              0.507065, 0.618616, 0.00147641, 0, 0.534278, 0.60005, 0.00140125,
              0, 0.562313, 0.581713, 0.00132441, 0, 0.59118, 0.563546,
              0.00125014, 0, 0.620875, 0.545605, 0.00118249, 0, 0.651373,
              0.527559, 0.0011116, 0, 0.682593, 0.509764, 0.00104979, 0,
              0.714286, 0.49193, 985977e-9, 0, 0.746032, 0.475011, 928592e-9, 0,
              0.777778, 0.457878, 873466e-9, 0, 0.809524, 0.440979, 819585e-9,
              0, 0.84127, 0.424613, 772365e-9, 0, 0.873016, 0.408549, 722195e-9,
              0, 0.904762, 0.392771, 680014e-9, 0, 0.936508, 0.377317,
              636797e-9, 0, 0.968254, 0.362352, 598318e-9, 0, 1, 1, 0.00114313,
              0, 0, 1, 0.00114314, 0, 0, 0.999999, 0.00114331, 0, 0, 0.999998,
              0.00114404, 0, 0, 0.999994, 0.00114601, 0, 0, 0.999984,
              0.00115019, 0, 0, 0.999967, 0.00115784, 0, 0, 0.999937, 0.0011706,
              0, 0, 0.999894, 0.00119054, 0, 0, 0.999828, 0.00122031, 0, 0,
              0.999735, 0.00126331, 0, 169263e-9, 0.999606, 0.00132382, 0,
              949167e-9, 0.999426, 0.0014071, 0, 0.00249668, 0.999173,
              0.00151895, 0, 0.00486392, 0.99873, 0.00166102, 0, 0.00806323,
              0.996243, 0.0017023, 0, 0.0120895, 0.993779, 0.00172782, 0,
              0.0169288, 0.9919, 0.0018108, 0, 0.0225633, 0.990524, 0.00196028,
              0, 0.028974, 0.98868, 0.00212014, 0, 0.036142, 0.984663,
              0.00217598, 0, 0.044049, 0.981457, 0.00230563, 0, 0.0526781,
              0.977608, 0.00243966, 0, 0.0620137, 0.972215, 0.00251336, 0,
              0.0720418, 0.966798, 0.0026285, 0, 0.0827499, 0.960241,
              0.00271409, 0, 0.0941271, 0.952489, 0.00278381, 0, 0.106164,
              0.944127, 0.00285399, 0, 0.118852, 0.934282, 0.00290994, 0,
              0.132185, 0.923271, 0.00294558, 0, 0.146157, 0.910803, 0.00296269,
              0, 0.160766, 0.896705, 0.00296803, 0, 0.176007, 0.88238,
              0.00296637, 0, 0.19188, 0.867116, 0.00293163, 0, 0.208385,
              0.853636, 0.00289418, 0, 0.225523, 0.840469, 0.00284663, 0,
              0.243296, 0.82639, 0.00278594, 0, 0.261709, 0.811759, 0.00271618,
              0, 0.280767, 0.796113, 0.00263187, 0, 0.300476, 0.779518,
              0.00254589, 0, 0.320845, 0.763142, 0.00246003, 0, 0.341883,
              0.745464, 0.00236529, 0, 0.363601, 0.727491, 0.00226536, 0,
              0.386011, 0.709414, 0.00216375, 0, 0.409128, 0.691396, 0.00207127,
              0, 0.432967, 0.67368, 0.00197106, 0, 0.457545, 0.656049,
              0.00187022, 0, 0.482881, 0.638188, 0.00177605, 0, 0.508992,
              0.620177, 0.00168482, 0, 0.535899, 0.601506, 0.00158909, 0,
              0.563619, 0.58362, 0.00150583, 0, 0.592165, 0.565496, 0.00141791,
              0, 0.621544, 0.54789, 0.00133693, 0, 0.651743, 0.530323,
              0.00126038, 0, 0.682709, 0.512795, 0.00118556, 0, 0.714286,
              0.495199, 0.00111527, 0, 0.746032, 0.478101, 0.0010489, 0,
              0.777778, 0.461511, 984264e-9, 0, 0.809524, 0.444879, 92591e-8, 0,
              0.84127, 0.428424, 866582e-9, 0, 0.873016, 0.412495, 814463e-9, 0,
              0.904762, 0.396975, 764498e-9, 0, 0.936508, 0.381614, 715967e-9,
              0, 0.968254, 0.366732, 672483e-9, 0, 1, 1, 0.00155501, 0, 0, 1,
              0.00155503, 0, 0, 1, 0.00155524, 0, 0, 0.999998, 0.00155615, 0, 0,
              0.999994, 0.0015586, 0, 0, 0.999983, 0.00156379, 0, 0, 0.999963,
              0.0015733, 0, 0, 0.999932, 0.00158911, 0, 0, 0.999882, 0.00161376,
              0, 0, 0.99981, 0.00165041, 0, 100875e-10, 0.999708, 0.00170304, 0,
              367658e-9, 0.999565, 0.00177658, 0, 0.0014234, 0.999368,
              0.00187688, 0, 0.00327939, 0.999081, 0.00200989, 0, 0.00596629,
              0.99852, 0.00217177, 0, 0.0094852, 0.99549, 0.0021745, 0,
              0.013824, 0.993252, 0.00222357, 0, 0.0189642, 0.991727,
              0.00235022, 0, 0.0248856, 0.989951, 0.00250561, 0, 0.0315669,
              0.988029, 0.00268829, 0, 0.0389882, 0.984029, 0.0027496, 0,
              0.0471302, 0.980683, 0.00289793, 0, 0.0559754, 0.976554,
              0.00303315, 0, 0.0655081, 0.97139, 0.00313257, 0, 0.0757138,
              0.965544, 0.00323656, 0, 0.08658, 0.95912, 0.00333432, 0,
              0.0980954, 0.951183, 0.0034039, 0, 0.110251, 0.942974, 0.00347515,
              0, 0.123038, 0.932642, 0.00350381, 0, 0.13645, 0.922158,
              0.00354519, 0, 0.150482, 0.909404, 0.00353851, 0, 0.165129,
              0.896071, 0.0035435, 0, 0.18039, 0.881206, 0.00349936, 0,
              0.196263, 0.866077, 0.00347256, 0, 0.212748, 0.85093, 0.003415, 0,
              0.229847, 0.837703, 0.00333367, 0, 0.247561, 0.823878, 0.003249,
              0, 0.265895, 0.809449, 0.00316347, 0, 0.284854, 0.794379,
              0.00306351, 0, 0.304445, 0.778138, 0.0029499, 0, 0.324675,
              0.761997, 0.00284099, 0, 0.345555, 0.744938, 0.00272104, 0,
              0.367095, 0.727212, 0.00260715, 0, 0.389309, 0.709549, 0.00248855,
              0, 0.41221, 0.691704, 0.00236783, 0, 0.435814, 0.673689,
              0.00225178, 0, 0.460138, 0.656453, 0.00213765, 0, 0.485203,
              0.639128, 0.00202178, 0, 0.511028, 0.621512, 0.00191443, 0,
              0.537634, 0.603598, 0.00180977, 0, 0.565041, 0.58559, 0.00170456,
              0, 0.593268, 0.567852, 0.00160927, 0, 0.622327, 0.5503,
              0.00151395, 0, 0.652217, 0.533033, 0.00142499, 0, 0.682907,
              0.515942, 0.00133955, 0, 0.714296, 0.498814, 0.0012602, 0,
              0.746032, 0.481595, 0.00118188, 0, 0.777778, 0.465117, 0.00111171,
              0, 0.809524, 0.448865, 0.00104091, 0, 0.84127, 0.432711,
              976618e-9, 0, 0.873016, 0.416822, 91859e-8, 0, 0.904762, 0.401272,
              857704e-9, 0, 0.936508, 0.386226, 807172e-9, 0, 0.968254,
              0.371321, 75464e-8, 0, 1, 1, 0.00209596, 0, 0, 1, 0.00209598, 0,
              0, 1, 0.00209624, 0, 0, 0.999997, 0.00209736, 0, 0, 0.999991,
              0.00210039, 0, 0, 0.999979, 0.00210678, 0, 0, 0.999959,
              0.00211847, 0, 0, 0.999925, 0.0021379, 0, 0, 0.99987, 0.00216809,
              0, 0, 0.999791, 0.00221281, 0, 681487e-10, 0.999677, 0.00227669,
              0, 658161e-9, 0.999521, 0.00236533, 0, 0.00200635, 0.999301,
              0.00248514, 0, 0.0041779, 0.998977, 0.00264185, 0, 0.00718648,
              0.998191, 0.00281695, 0, 0.0110239, 0.994801, 0.00278518, 0,
              0.015672, 0.993091, 0.00288774, 0, 0.0211091, 0.991571,
              0.00303931, 0, 0.0273123, 0.9897, 0.00321643, 0, 0.034259,
              0.987023, 0.00337332, 0, 0.0419282, 0.983289, 0.00346146, 0,
              0.0502998, 0.979892, 0.00363704, 0, 0.0593562, 0.975111,
              0.00373601, 0, 0.069081, 0.970351, 0.0038842, 0, 0.0794598,
              0.964131, 0.00397053, 0, 0.0904798, 0.957747, 0.00408078, 0,
              0.10213, 0.949536, 0.00413533, 0, 0.1144, 0.941372, 0.00420305, 0,
              0.127284, 0.931049, 0.00422815, 0, 0.140772, 0.920647, 0.00425048,
              0, 0.154862, 0.908033, 0.0042281, 0, 0.169548, 0.895028,
              0.00422026, 0, 0.184828, 0.879968, 0.00415042, 0, 0.200701,
              0.864875, 0.00408821, 0, 0.217167, 0.84918, 0.00400909, 0,
              0.234227, 0.834934, 0.00391178, 0, 0.251884, 0.821397, 0.00380066,
              0, 0.270141, 0.807135, 0.00367974, 0, 0.289004, 0.792363,
              0.00355172, 0, 0.308479, 0.776661, 0.003411, 0, 0.328575,
              0.760705, 0.00328123, 0, 0.349301, 0.744408, 0.00314003, 0,
              0.370668, 0.726994, 0.0029906, 0, 0.392689, 0.709598, 0.00285034,
              0, 0.415379, 0.692112, 0.00271179, 0, 0.438754, 0.674435,
              0.00257185, 0, 0.46283, 0.65676, 0.00243425, 0, 0.48763, 0.639982,
              0.00230351, 0, 0.513173, 0.622983, 0.0021777, 0, 0.539482,
              0.605471, 0.00204991, 0, 0.566579, 0.58796, 0.00193759, 0,
              0.594488, 0.570463, 0.00181976, 0, 0.623226, 0.553058, 0.00171497,
              0, 0.6528, 0.535894, 0.00161109, 0, 0.683198, 0.519089,
              0.00151394, 0, 0.714354, 0.502454, 0.00142122, 0, 0.746032,
              0.485681, 0.00133488, 0, 0.777778, 0.468935, 0.00124975, 0,
              0.809524, 0.452951, 0.00117309, 0, 0.84127, 0.437139, 0.00110155,
              0, 0.873016, 0.421446, 0.00103124, 0, 0.904762, 0.405951,
              966387e-9, 0, 0.936508, 0.391003, 908119e-9, 0, 0.968254,
              0.376198, 848057e-9, 0, 1, 1, 0.00280076, 0, 0, 1, 0.00280078, 0,
              0, 0.999999, 0.00280109, 0, 0, 0.999997, 0.00280246, 0, 0,
              0.999992, 0.00280616, 0, 0, 0.999979, 0.00281396, 0, 0, 0.999956,
              0.00282822, 0, 0, 0.999916, 0.00285186, 0, 0, 0.999857, 0.0028885,
              0, 0, 0.999768, 0.00294259, 0, 196026e-9, 0.999645, 0.00301946, 0,
              0.00104842, 0.99947, 0.00312541, 0, 0.00270199, 0.999229,
              0.00326733, 0, 0.00519449, 0.998852, 0.00344992, 0, 0.00852602,
              0.997558, 0.00361052, 0, 0.0126804, 0.994417, 0.0035898, 0,
              0.017635, 0.992824, 0.00372393, 0, 0.023365, 0.991344, 0.00390695,
              0, 0.0298456, 0.989337, 0.00410392, 0, 0.0370529, 0.985811,
              0.00420987, 0, 0.0449651, 0.982772, 0.00437488, 0, 0.0535615,
              0.979001, 0.00455069, 0, 0.0628243, 0.974102, 0.00464462, 0,
              0.0727368, 0.969197, 0.00480577, 0, 0.0832844, 0.962759,
              0.00487818, 0, 0.0944545, 0.956207, 0.00498176, 0, 0.106236,
              0.947909, 0.00503392, 0, 0.118619, 0.939596, 0.00507474, 0,
              0.131595, 0.929642, 0.00509798, 0, 0.145159, 0.918807, 0.00508476,
              0, 0.159305, 0.906921, 0.00505634, 0, 0.174028, 0.893312,
              0.00498845, 0, 0.189327, 0.878933, 0.0049133, 0, 0.2052, 0.863986,
              0.0048259, 0, 0.221647, 0.847936, 0.00470848, 0, 0.23867,
              0.832253, 0.00456889, 0, 0.25627, 0.818619, 0.00442726, 0,
              0.274453, 0.804788, 0.00427677, 0, 0.293222, 0.790241, 0.00411906,
              0, 0.312585, 0.775162, 0.00394833, 0, 0.33255, 0.759463,
              0.00377366, 0, 0.353126, 0.743598, 0.00361026, 0, 0.374324,
              0.72697, 0.00343627, 0, 0.396158, 0.709646, 0.00326422, 0,
              0.418641, 0.69277, 0.00309717, 0, 0.44179, 0.675371, 0.0029356, 0,
              0.465624, 0.657863, 0.00277712, 0, 0.490163, 0.640772, 0.00261738,
              0, 0.515429, 0.624441, 0.0024737, 0, 0.541445, 0.607497,
              0.00233125, 0, 0.568236, 0.590438, 0.00218994, 0, 0.595828,
              0.573224, 0.0020664, 0, 0.624242, 0.556168, 0.00193526, 0,
              0.653496, 0.539232, 0.00182463, 0, 0.683588, 0.522352, 0.00170735,
              0, 0.714482, 0.506172, 0.00160555, 0, 0.746032, 0.489842,
              0.00150451, 0, 0.777778, 0.473463, 0.00140938, 0, 0.809524,
              0.457266, 0.00132568, 0, 0.84127, 0.441609, 0.0012376, 0,
              0.873016, 0.426348, 0.00116265, 0, 0.904762, 0.411002, 0.00108935,
              0, 0.936508, 0.396045, 0.00101946, 0, 0.968254, 0.381448,
              955665e-9, 0, 1, 1, 0.0037121, 0, 0, 1, 0.00371213, 0, 0, 1,
              0.00371251, 0, 0, 0.999997, 0.00371417, 0, 0, 0.99999, 0.00371863,
              0, 0, 0.999977, 0.00372807, 0, 0, 0.99995, 0.00374529, 0, 0,
              0.999908, 0.0037738, 0, 0, 0.999843, 0.00381789, 0, 123596e-10,
              0.999745, 0.00388273, 0, 407442e-9, 0.999608, 0.00397443, 0,
              0.0015447, 0.999415, 0.00409998, 0, 0.00351385, 0.999143,
              0.00426662, 0, 0.0063316, 0.9987, 0.00447625, 0, 0.00998679,
              0.996363, 0.00455323, 0, 0.0144569, 0.994021, 0.00461052, 0,
              0.0197151, 0.992372, 0.00476359, 0, 0.0257344, 0.991007,
              0.00499101, 0, 0.0324882, 0.988767, 0.0051972, 0, 0.0399517,
              0.984872, 0.00528407, 0, 0.0481022, 0.982004, 0.00548926, 0,
              0.0569191, 0.977714, 0.00564385, 0, 0.0663839, 0.973076,
              0.0057693, 0, 0.0764801, 0.967565, 0.0058924, 0, 0.0871928,
              0.961384, 0.00599629, 0, 0.0985095, 0.954435, 0.00605998, 0,
              0.110419, 0.946303, 0.0061133, 0, 0.122912, 0.937662, 0.00612028,
              0, 0.13598, 0.927867, 0.00612209, 0, 0.149617, 0.916475,
              0.00604813, 0, 0.163817, 0.90541, 0.00603088, 0, 0.178577,
              0.891591, 0.00592218, 0, 0.193894, 0.877573, 0.00578854, 0,
              0.209767, 0.862511, 0.00566648, 0, 0.226196, 0.846861, 0.00551481,
              0, 0.243182, 0.83068, 0.00533754, 0, 0.260728, 0.815725,
              0.00515487, 0, 0.278837, 0.802321, 0.0049655, 0, 0.297515,
              0.787826, 0.00475421, 0, 0.316768, 0.773454, 0.00456002, 0,
              0.336605, 0.758224, 0.00434727, 0, 0.357034, 0.74265, 0.00414444,
              0, 0.378067, 0.726729, 0.00393738, 0, 0.399717, 0.710155,
              0.00373575, 0, 0.421998, 0.693312, 0.00353736, 0, 0.444928,
              0.67653, 0.00334368, 0, 0.468523, 0.659444, 0.00315981, 0,
              0.492806, 0.642051, 0.00297809, 0, 0.517798, 0.625758, 0.00280592,
              0, 0.543525, 0.609615, 0.00264254, 0, 0.570012, 0.592919,
              0.00248459, 0, 0.597288, 0.576298, 0.00233327, 0, 0.625379,
              0.559489, 0.00219519, 0, 0.654307, 0.542891, 0.00205441, 0,
              0.684084, 0.526255, 0.00193385, 0, 0.714693, 0.509853, 0.00180745,
              0, 0.746044, 0.494131, 0.00169817, 0, 0.777778, 0.478114,
              0.0015913, 0, 0.809524, 0.462274, 0.00148981, 0, 0.84127,
              0.446412, 0.00139537, 0, 0.873016, 0.431274, 0.00130984, 0,
              0.904762, 0.41635, 0.00122403, 0, 0.936508, 0.401476, 0.00114809,
              0, 0.968254, 0.386993, 0.00107563, 0, 1, 1, 0.00488216, 0, 0, 1,
              0.0048822, 0, 0, 1, 0.00488265, 0, 0, 0.999997, 0.00488463, 0, 0,
              0.999988, 0.00488999, 0, 0, 0.999974, 0.00490129, 0, 0, 0.999946,
              0.00492191, 0, 0, 0.999897, 0.00495598, 0, 0, 0.999825,
              0.00500855, 0, 744791e-10, 0.999718, 0.00508559, 0, 712744e-9,
              0.999565, 0.005194, 0, 0.00215249, 0.999352, 0.00534147, 0,
              0.00444576, 0.999046, 0.00553523, 0, 0.00759218, 0.998492,
              0.00577016, 0, 0.0115714, 0.995564, 0.00578487, 0, 0.0163557,
              0.993339, 0.00586414, 0, 0.021915, 0.991834, 0.00606002, 0,
              0.0282201, 0.990496, 0.00633312, 0, 0.0352433, 0.987826,
              0.00651941, 0, 0.042959, 0.98383, 0.00660842, 0, 0.0513439,
              0.98109, 0.00685523, 0, 0.0603772, 0.976131, 0.00695778, 0,
              0.0700402, 0.971922, 0.00714236, 0, 0.0803163, 0.965901,
              0.00721437, 0, 0.0911908, 0.959606, 0.00732017, 0, 0.102651,
              0.952504, 0.00735788, 0, 0.114686, 0.944365, 0.00738493, 0,
              0.127286, 0.935652, 0.00737969, 0, 0.140443, 0.925813, 0.00733612,
              0, 0.154151, 0.914397, 0.00723094, 0, 0.168405, 0.903257,
              0.00714002, 0, 0.183201, 0.890015, 0.00700149, 0, 0.198536,
              0.876014, 0.00682813, 0, 0.214409, 0.861436, 0.00665567, 0,
              0.23082, 0.845752, 0.00644526, 0, 0.24777, 0.829169, 0.00621635,
              0, 0.265263, 0.813435, 0.00597789, 0, 0.283301, 0.799701,
              0.00575694, 0, 0.301889, 0.785726, 0.00549866, 0, 0.321035,
              0.77152, 0.0052503, 0, 0.340746, 0.75683, 0.00499619, 0, 0.361032,
              0.741951, 0.0047543, 0, 0.381904, 0.726367, 0.0045084, 0,
              0.403374, 0.710537, 0.00426784, 0, 0.425457, 0.693965, 0.00403487,
              0, 0.448169, 0.677724, 0.0038075, 0, 0.47153, 0.66117, 0.00359431,
              0, 0.495561, 0.644274, 0.00338354, 0, 0.520284, 0.627449,
              0.00318163, 0, 0.545725, 0.611645, 0.00299672, 0, 0.571911,
              0.595614, 0.00281016, 0, 0.598873, 0.579426, 0.00264252, 0,
              0.62664, 0.563016, 0.00247509, 0, 0.655239, 0.546728, 0.00232647,
              0, 0.684692, 0.530539, 0.00217803, 0, 0.714999, 0.514164,
              0.00204216, 0, 0.746106, 0.498344, 0.00191403, 0, 0.777778,
              0.482957, 0.00179203, 0, 0.809524, 0.467336, 0.00167695, 0,
              0.84127, 0.451994, 0.00157567, 0, 0.873016, 0.436514, 0.00147113,
              0, 0.904762, 0.42178, 0.00138034, 0, 0.936508, 0.407271,
              0.00129219, 0, 0.968254, 0.392822, 0.0012098, 0, 1, 1, 0.00637427,
              0, 0, 1, 0.00637431, 0, 0, 0.999999, 0.00637485, 0, 0, 0.999996,
              0.00637721, 0, 0, 0.999987, 0.00638357, 0, 0, 0.999971, 0.006397,
              0, 0, 0.999939, 0.00642142, 0, 0, 0.999888, 0.00646177, 0, 0,
              0.999807, 0.00652387, 0, 207916e-9, 0.999689, 0.00661454, 0,
              0.00112051, 0.99952, 0.00674155, 0, 0.00287719, 0.999283,
              0.00691313, 0, 0.00550145, 0.998936, 0.00713598, 0, 0.00897928,
              0.998165, 0.00738501, 0, 0.0132829, 0.994847, 0.00734388, 0,
              0.01838, 0.993182, 0.00749991, 0, 0.0242381, 0.991665, 0.0077246,
              0, 0.030826, 0.989708, 0.00797579, 0, 0.0381152, 0.986663,
              0.00813011, 0, 0.0460794, 0.983288, 0.00830365, 0, 0.0546951,
              0.980104, 0.00853496, 0, 0.0639411, 0.974855, 0.00861045, 0,
              0.0737988, 0.97045, 0.00879133, 0, 0.0842516, 0.964509,
              0.00886377, 0, 0.0952848, 0.957594, 0.00890346, 0, 0.106886,
              0.950546, 0.00893289, 0, 0.119044, 0.942225, 0.00890074, 0,
              0.131749, 0.933365, 0.00886826, 0, 0.144994, 0.923202, 0.0087316,
              0, 0.158772, 0.912605, 0.00863082, 0, 0.173078, 0.901099,
              0.00847403, 0, 0.187908, 0.888177, 0.00825838, 0, 0.203261,
              0.873955, 0.00801834, 0, 0.219134, 0.860091, 0.00779026, 0,
              0.235527, 0.84434, 0.00752478, 0, 0.252443, 0.828517, 0.00724074,
              0, 0.269883, 0.81239, 0.00693769, 0, 0.287851, 0.79721,
              0.00664817, 0, 0.306352, 0.783489, 0.00634763, 0, 0.325393,
              0.769514, 0.00604221, 0, 0.344981, 0.755419, 0.00573568, 0,
              0.365126, 0.741083, 0.00544359, 0, 0.385839, 0.726059, 0.00515515,
              0, 0.407132, 0.710809, 0.00487139, 0, 0.42902, 0.695052,
              0.00459846, 0, 0.45152, 0.678886, 0.00433412, 0, 0.474651,
              0.663042, 0.00407981, 0, 0.498433, 0.646634, 0.00384264, 0,
              0.52289, 0.630117, 0.00360897, 0, 0.548048, 0.613804, 0.00338863,
              0, 0.573936, 0.598338, 0.00318486, 0, 0.600584, 0.582687,
              0.00298377, 0, 0.628027, 0.566809, 0.00280082, 0, 0.656295,
              0.550817, 0.00262255, 0, 0.685417, 0.534937, 0.00245835, 0,
              0.715406, 0.519151, 0.00230574, 0, 0.74624, 0.503118, 0.0021549,
              0, 0.777778, 0.487723, 0.00202008, 0, 0.809524, 0.472725,
              0.00189355, 0, 0.84127, 0.457599, 0.00177108, 0, 0.873016,
              0.442558, 0.00165843, 0, 0.904762, 0.427624, 0.00155494, 0,
              0.936508, 0.413171, 0.00145273, 0, 0.968254, 0.399122, 0.00136454,
              0, 1, 1, 0.00826496, 0, 0, 1, 0.00826499, 0, 0, 1, 0.00826564, 0,
              0, 0.999996, 0.00826842, 0, 0, 0.999987, 0.00827589, 0, 0,
              0.999967, 0.00829167, 0, 0, 0.999933, 0.00832037, 0, 0, 0.999876,
              0.00836768, 0, 109338e-10, 0.999786, 0.00844031, 0, 427145e-9,
              0.999655, 0.00854603, 0, 0.0016384, 0.999468, 0.00869337, 0,
              0.00372392, 0.999203, 0.008891, 0, 0.00668513, 0.998803,
              0.00914387, 0, 0.0104968, 0.99748, 0.00935838, 0, 0.015125,
              0.994446, 0.00933309, 0, 0.0205338, 0.99292, 0.00953084, 0,
              0.0266884, 0.991414, 0.0097893, 0, 0.0335565, 0.989049, 0.0100228,
              0, 0.0411086, 0.98582, 0.0101664, 0, 0.0493181, 0.982441,
              0.0103582, 0, 0.0581613, 0.978595, 0.0105292, 0, 0.0676169,
              0.973495, 0.0106274, 0, 0.0776661, 0.968405, 0.0107261, 0,
              0.0882926, 0.962717, 0.0108234, 0, 0.0994817, 0.955478, 0.0108102,
              0, 0.111221, 0.948275, 0.0107914, 0, 0.123499, 0.940006,
              0.0107161, 0, 0.136308, 0.930831, 0.0106309, 0, 0.149639,
              0.920648, 0.0104083, 0, 0.163485, 0.910205, 0.0102312, 0,
              0.177843, 0.898445, 0.0100051, 0, 0.192707, 0.885986, 0.00971928,
              0, 0.208077, 0.872204, 0.00940747, 0, 0.22395, 0.858436,
              0.0091085, 0, 0.240326, 0.843454, 0.00876595, 0, 0.257208,
              0.827437, 0.00839794, 0, 0.274596, 0.811488, 0.00803692, 0,
              0.292496, 0.796039, 0.00767352, 0, 0.310911, 0.781083, 0.0073097,
              0, 0.329849, 0.767642, 0.00694032, 0, 0.349316, 0.753901,
              0.00657476, 0, 0.369323, 0.740131, 0.00622699, 0, 0.38988,
              0.725845, 0.0058838, 0, 0.410999, 0.710991, 0.00555586, 0,
              0.432696, 0.696002, 0.00523089, 0, 0.454987, 0.680461, 0.00492494,
              0, 0.47789, 0.664875, 0.00463464, 0, 0.501426, 0.649273,
              0.00435422, 0, 0.52562, 0.63302, 0.0040875, 0, 0.550498, 0.61705,
              0.00384075, 0, 0.576089, 0.601154, 0.00359557, 0, 0.602427,
              0.586008, 0.00337636, 0, 0.629544, 0.570699, 0.00316019, 0,
              0.657479, 0.555166, 0.00296033, 0, 0.686264, 0.539645, 0.00277552,
              0, 0.715924, 0.524159, 0.00259499, 0, 0.746459, 0.508682,
              0.00243257, 0, 0.777789, 0.493163, 0.00227851, 0, 0.809524,
              0.478004, 0.00213083, 0, 0.84127, 0.46347, 0.00199502, 0,
              0.873016, 0.448778, 0.00186967, 0, 0.904762, 0.434105, 0.00174732,
              0, 0.936508, 0.419576, 0.00163861, 0, 0.968254, 0.405541,
              0.00153341, 0, 1, 1, 0.0106462, 0, 0, 1, 0.0106462, 0, 0,
              0.999999, 0.010647, 0, 0, 0.999995, 0.0106502, 0, 0, 0.999985,
              0.0106589, 0, 0, 0.999964, 0.0106773, 0, 0, 0.999925, 0.0107106,
              0, 0, 0.999861, 0.0107655, 0, 712986e-10, 0.999763, 0.0108497, 0,
              743959e-9, 0.999616, 0.0109716, 0, 0.00227361, 0.999408,
              0.0111408, 0, 0.0046983, 0.999112, 0.0113659, 0, 0.00800158,
              0.998637, 0.0116475, 0, 0.0121493, 0.996223, 0.0117231, 0,
              0.0171023, 0.994006, 0.0118064, 0, 0.0228218, 0.992444, 0.0120254,
              0, 0.0292711, 0.991028, 0.0123314, 0, 0.036417, 0.98803,
              0.0124954, 0, 0.0442295, 0.984816, 0.0126538, 0, 0.0526815,
              0.981399, 0.0128537, 0, 0.0617492, 0.977085, 0.0129694, 0,
              0.0714114, 0.972154, 0.013091, 0, 0.0816495, 0.966617, 0.0131166,
              0, 0.0924472, 0.960628, 0.0131583, 0, 0.10379, 0.953295,
              0.0131094, 0, 0.115665, 0.94575, 0.0129966, 0, 0.128062, 0.937654,
              0.0128796, 0, 0.140972, 0.927716, 0.0126477, 0, 0.154387,
              0.917932, 0.0123889, 0, 0.168301, 0.907719, 0.012131, 0, 0.182709,
              0.89584, 0.0118013, 0, 0.197608, 0.883526, 0.0114145, 0, 0.212994,
              0.870301, 0.0110075, 0, 0.228867, 0.856272, 0.0106019, 0,
              0.245227, 0.842251, 0.0101938, 0, 0.262074, 0.826466, 0.00973254,
              0, 0.279412, 0.810859, 0.0092846, 0, 0.297244, 0.795051,
              0.00883304, 0, 0.315575, 0.780053, 0.00840272, 0, 0.334412,
              0.76575, 0.00796438, 0, 0.35376, 0.752298, 0.00752526, 0,
              0.373631, 0.739153, 0.00711486, 0, 0.394034, 0.725514, 0.00670361,
              0, 0.414983, 0.711473, 0.00632656, 0, 0.436491, 0.696936,
              0.00595206, 0, 0.458575, 0.682126, 0.00559191, 0, 0.481253,
              0.667027, 0.00525362, 0, 0.504547, 0.651875, 0.00493805, 0,
              0.528481, 0.636463, 0.00462848, 0, 0.553081, 0.620641, 0.00433936,
              0, 0.578377, 0.604931, 0.00407, 0, 0.604404, 0.589549, 0.00380864,
              0, 0.631197, 0.574712, 0.00357049, 0, 0.658795, 0.559775,
              0.00334466, 0, 0.687238, 0.544514, 0.00312505, 0, 0.716559,
              0.529555, 0.00293199, 0, 0.746776, 0.514402, 0.00274204, 0,
              0.777849, 0.499302, 0.00256647, 0, 0.809524, 0.484114, 0.00239901,
              0, 0.84127, 0.469308, 0.00225148, 0, 0.873016, 0.455133,
              0.00210178, 0, 0.904762, 0.440939, 0.0019727, 0, 0.936508,
              0.426627, 0.00184382, 0, 0.968254, 0.412509, 0.00172548, 0, 1, 1,
              0.013628, 0, 0, 1, 0.0136281, 0, 0, 0.999999, 0.0136289, 0, 0,
              0.999995, 0.0136327, 0, 0, 0.999983, 0.0136427, 0, 0, 0.99996,
              0.0136638, 0, 0, 0.999917, 0.0137022, 0, 0, 0.999846, 0.0137652,
              0, 204597e-9, 0.999736, 0.0138615, 0, 0.00116837, 0.999573,
              0.0140007, 0, 0.00303325, 0.99934, 0.0141927, 0, 0.00580613,
              0.999004, 0.0144457, 0, 0.00945626, 0.998407, 0.0147489, 0,
              0.0139421, 0.995464, 0.014731, 0, 0.0192202, 0.993328, 0.0148283,
              0, 0.0252495, 0.991799, 0.0150797, 0, 0.0319921, 0.990397,
              0.0154316, 0, 0.0394138, 0.986835, 0.0155005, 0, 0.0474843,
              0.983938, 0.0157308, 0, 0.0561763, 0.980154, 0.0158753, 0,
              0.0654661, 0.975659, 0.0159581, 0, 0.0753326, 0.970171, 0.0159832,
              0, 0.0857571, 0.964803, 0.0160084, 0, 0.0967236, 0.958366,
              0.0159484, 0, 0.108218, 0.950613, 0.0158001, 0, 0.120227,
              0.942874, 0.0155845, 0, 0.132741, 0.935005, 0.0154292, 0,
              0.145751, 0.924991, 0.0150742, 0, 0.159249, 0.914814, 0.0146757,
              0, 0.17323, 0.904743, 0.0143097, 0, 0.187687, 0.893216, 0.0138695,
              0, 0.202619, 0.880769, 0.0133706, 0, 0.218021, 0.868136,
              0.0128606, 0, 0.233894, 0.85469, 0.0123403, 0, 0.250238, 0.840593,
              0.0118091, 0, 0.267052, 0.825808, 0.011253, 0, 0.284341, 0.81009,
              0.0107099, 0, 0.302106, 0.79504, 0.0101636, 0, 0.320354, 0.779757,
              0.00964041, 0, 0.33909, 0.764697, 0.00911896, 0, 0.358322,
              0.750913, 0.00859533, 0, 0.378059, 0.738175, 0.00811592, 0,
              0.398311, 0.725242, 0.00764504, 0, 0.41909, 0.711864, 0.00718885,
              0, 0.440412, 0.698009, 0.00675843, 0, 0.462292, 0.683841,
              0.00634984, 0, 0.484748, 0.669391, 0.00595502, 0, 0.507802,
              0.654731, 0.00558671, 0, 0.531477, 0.639805, 0.00523578, 0,
              0.555802, 0.624789, 0.00490834, 0, 0.580805, 0.609325, 0.00459448,
              0, 0.606522, 0.593975, 0.00430342, 0, 0.63299, 0.578983,
              0.00403019, 0, 0.66025, 0.564442, 0.0037707, 0, 0.688346,
              0.549835, 0.0035316, 0, 0.717319, 0.535039, 0.00330255, 0, 0.7472,
              0.520403, 0.00308932, 0, 0.777982, 0.505687, 0.00289335, 0,
              0.809524, 0.490939, 0.00270818, 0, 0.84127, 0.476233, 0.0025343,
              0, 0.873016, 0.461624, 0.00237097, 0, 0.904762, 0.447833,
              0.00222065, 0, 0.936508, 0.433992, 0.00207561, 0, 0.968254,
              0.420147, 0.00194955, 0, 1, 1, 0.0173415, 0, 0, 1, 0.0173416, 0,
              0, 0.999999, 0.0173426, 0, 0, 0.999995, 0.0173468, 0, 0, 0.999983,
              0.0173582, 0, 0, 0.999954, 0.0173822, 0, 0, 0.999908, 0.0174258,
              0, 669501e-11, 0.999828, 0.0174973, 0, 427399e-9, 0.999705,
              0.0176063, 0, 0.00171019, 0.999524, 0.0177631, 0, 0.0039248,
              0.999263, 0.0179781, 0, 0.00705382, 0.998878, 0.018258, 0,
              0.0110552, 0.998012, 0.0185551, 0, 0.0158812, 0.994614, 0.0184264,
              0, 0.0214852, 0.993132, 0.0186385, 0, 0.0278239, 0.991563,
              0.0189067, 0, 0.0348585, 0.989298, 0.0191577, 0, 0.0425544,
              0.986036, 0.0192522, 0, 0.050881, 0.982558, 0.0194063, 0,
              0.059811, 0.978531, 0.019486, 0, 0.0693209, 0.974198, 0.0195847,
              0, 0.0793895, 0.968148, 0.0194749, 0, 0.0899984, 0.962565,
              0.0194277, 0, 0.101132, 0.956041, 0.0192991, 0, 0.112775,
              0.947749, 0.0189893, 0, 0.124917, 0.94018, 0.018704, 0, 0.137547,
              0.93165, 0.0183458, 0, 0.150655, 0.921798, 0.0178775, 0, 0.164236,
              0.911573, 0.0173618, 0, 0.178281, 0.901569, 0.0168482, 0,
              0.192788, 0.890341, 0.016265, 0, 0.207752, 0.877835, 0.0156199, 0,
              0.223171, 0.865472, 0.0149516, 0, 0.239044, 0.852905, 0.0143274,
              0, 0.255371, 0.838906, 0.0136643, 0, 0.272153, 0.824888,
              0.0129903, 0, 0.289393, 0.809977, 0.0123218, 0, 0.307093,
              0.794697, 0.0116572, 0, 0.325259, 0.780028, 0.0110307, 0,
              0.343896, 0.765124, 0.0104236, 0, 0.363012, 0.750411, 0.0098219,
              0, 0.382617, 0.737264, 0.00924397, 0, 0.402719, 0.724799,
              0.00868719, 0, 0.423332, 0.712253, 0.00816476, 0, 0.444469,
              0.699267, 0.00767262, 0, 0.466146, 0.685618, 0.00719746, 0,
              0.488383, 0.671736, 0.00673916, 0, 0.511199, 0.657777, 0.00631937,
              0, 0.534618, 0.643497, 0.00592411, 0, 0.558668, 0.62889,
              0.00553928, 0, 0.58338, 0.614299, 0.0051934, 0, 0.608787,
              0.599197, 0.00485985, 0, 0.634929, 0.584175, 0.00454357, 0,
              0.661849, 0.569541, 0.00425787, 0, 0.689594, 0.555193, 0.00397905,
              0, 0.718211, 0.540947, 0.00372364, 0, 0.747742, 0.526593,
              0.00348599, 0, 0.778205, 0.512335, 0.00326103, 0, 0.80953,
              0.498017, 0.00305137, 0, 0.84127, 0.483609, 0.00285485, 0,
              0.873016, 0.469368, 0.00267472, 0, 0.904762, 0.455037, 0.00249945,
              0, 0.936508, 0.441493, 0.00234792, 0, 0.968254, 0.428147,
              0.00219936, 0, 1, 1, 0.0219422, 0, 0, 1, 0.0219423, 0, 0,
              0.999998, 0.0219434, 0, 0, 0.999993, 0.0219481, 0, 0, 0.999981,
              0.021961, 0, 0, 0.999949, 0.0219879, 0, 0, 0.999896, 0.0220367, 0,
              593194e-10, 0.999808, 0.0221167, 0, 75364e-8, 0.99967, 0.0222383,
              0, 0.00237884, 0.999466, 0.0224125, 0, 0.00495612, 0.999174,
              0.0226495, 0, 0.00844887, 0.998725, 0.0229525, 0, 0.0128058,
              0.996979, 0.0231123, 0, 0.0179742, 0.994317, 0.0230742, 0,
              0.0239047, 0.992781, 0.0232895, 0, 0.0305526, 0.991191, 0.0235734,
              0, 0.0378786, 0.987787, 0.0236152, 0, 0.0458475, 0.985092,
              0.0237994, 0, 0.0544287, 0.981121, 0.0238553, 0, 0.0635952,
              0.976924, 0.0238706, 0, 0.0733233, 0.97218, 0.0238704, 0,
              0.0835922, 0.965956, 0.0236598, 0, 0.0943839, 0.959998, 0.0234735,
              0, 0.105682, 0.953245, 0.0232277, 0, 0.117474, 0.944445,
              0.0226973, 0, 0.129747, 0.937087, 0.0223527, 0, 0.142491,
              0.928341, 0.0218144, 0, 0.155697, 0.9184, 0.0211516, 0, 0.169358,
              0.907959, 0.0204553, 0, 0.183469, 0.89808, 0.0197673, 0, 0.198024,
              0.887047, 0.0189915, 0, 0.21302, 0.875221, 0.0182082, 0, 0.228455,
              0.86269, 0.0173584, 0, 0.244329, 0.850735, 0.0165718, 0, 0.260639,
              0.837545, 0.0157524, 0, 0.277389, 0.823639, 0.0149482, 0, 0.29458,
              0.809699, 0.0141431, 0, 0.312216, 0.794797, 0.0133527, 0, 0.3303,
              0.780578, 0.0126193, 0, 0.34884, 0.766019, 0.0118914, 0, 0.367842,
              0.751447, 0.0111839, 0, 0.387315, 0.737275, 0.010514, 0, 0.40727,
              0.724545, 0.00987277, 0, 0.427717, 0.712644, 0.00926569, 0,
              0.448671, 0.700432, 0.00869029, 0, 0.470149, 0.687664, 0.00814691,
              0, 0.492167, 0.674288, 0.00763012, 0, 0.514746, 0.660966,
              0.00714437, 0, 0.537911, 0.647264, 0.00668457, 0, 0.561688,
              0.633431, 0.00626581, 0, 0.586108, 0.619133, 0.00585593, 0,
              0.611206, 0.604935, 0.00548188, 0, 0.637022, 0.590236, 0.00513288,
              0, 0.663599, 0.575473, 0.0047906, 0, 0.690989, 0.561228,
              0.00448895, 0, 0.719242, 0.547054, 0.00420233, 0, 0.748411,
              0.533175, 0.00392869, 0, 0.778531, 0.519163, 0.00367445, 0,
              0.809583, 0.505328, 0.00344097, 0, 0.84127, 0.491446, 0.00322003,
              0, 0.873016, 0.477356, 0.00301283, 0, 0.904762, 0.46356,
              0.00282592, 0, 0.936508, 0.449623, 0.00264956, 0, 0.968254,
              0.436068, 0.00246956, 0, 1, 1, 0.0276135, 0, 0, 1, 0.0276136, 0,
              0, 0.999998, 0.0276148, 0, 0, 0.999993, 0.0276201, 0, 0, 0.999976,
              0.0276342, 0, 0, 0.999945, 0.027664, 0, 0, 0.999884, 0.0277179, 0,
              18679e-8, 0.999784, 0.027806, 0, 0.00119607, 0.99963, 0.0279394,
              0, 0.00318407, 0.999401, 0.0281295, 0, 0.00613601, 0.999066,
              0.0283858, 0, 0.00999963, 0.998524, 0.0287027, 0, 0.0147164,
              0.995702, 0.0286256, 0, 0.0202295, 0.993593, 0.0286733, 0,
              0.0264876, 0.992067, 0.0288989, 0, 0.0334452, 0.990548, 0.0292135,
              0, 0.0410621, 0.986775, 0.0291296, 0, 0.0493032, 0.984054,
              0.0293099, 0, 0.0581381, 0.979481, 0.0291881, 0, 0.0675397,
              0.975297, 0.0291598, 0, 0.0774848, 0.96981, 0.028954, 0,
              0.0879528, 0.963524, 0.028628, 0, 0.0989258, 0.957398, 0.0283135,
              0, 0.110388, 0.950088, 0.0278469, 0, 0.122327, 0.941538,
              0.0271798, 0, 0.134729, 0.933332, 0.0265388, 0, 0.147587,
              0.924392, 0.0257776, 0, 0.160889, 0.914581, 0.024916, 0, 0.174631,
              0.904347, 0.0240242, 0, 0.188806, 0.894324, 0.0231229, 0,
              0.203409, 0.883724, 0.022153, 0, 0.218437, 0.872207, 0.0211355, 0,
              0.233888, 0.859927, 0.0201048, 0, 0.249761, 0.848373, 0.0191263,
              0, 0.266056, 0.836023, 0.0181306, 0, 0.282774, 0.82289, 0.0171718,
              0, 0.299917, 0.809324, 0.0162196, 0, 0.317488, 0.795361,
              0.0152622, 0, 0.335493, 0.781253, 0.01439, 0, 0.353936, 0.767338,
              0.013533, 0, 0.372825, 0.753156, 0.0127244, 0, 0.392168, 0.739122,
              0.0119454, 0, 0.411976, 0.725358, 0.0112054, 0, 0.432259,
              0.712949, 0.010487, 0, 0.453032, 0.701621, 0.00984032, 0, 0.47431,
              0.689703, 0.00921495, 0, 0.496111, 0.677216, 0.00862492, 0,
              0.518456, 0.664217, 0.00806882, 0, 0.541367, 0.65137, 0.00755922,
              0, 0.564872, 0.638, 0.00705705, 0, 0.589001, 0.62453, 0.00661266,
              0, 0.613789, 0.610601, 0.00618432, 0, 0.639277, 0.59676,
              0.00578033, 0, 0.66551, 0.582433, 0.00540927, 0, 0.692539,
              0.568026, 0.00506104, 0, 0.720422, 0.55414, 0.0047353, 0,
              0.749216, 0.540178, 0.00442889, 0, 0.778974, 0.526513, 0.00414363,
              0, 0.809711, 0.512954, 0.00388237, 0, 0.84127, 0.499403,
              0.00362875, 0, 0.873016, 0.486026, 0.00340827, 0, 0.904762,
              0.472345, 0.00318598, 0, 0.936508, 0.458828, 0.00297635, 0,
              0.968254, 0.445379, 0.00279447, 0, 1, 1, 0.0345716, 0, 0, 1,
              0.0345717, 0, 0, 0.999999, 0.034573, 0, 0, 0.999991, 0.0345787, 0,
              0, 0.999974, 0.0345941, 0, 0, 0.999937, 0.0346263, 0, 188589e-11,
              0.999869, 0.0346847, 0, 409238e-9, 0.999757, 0.0347798, 0,
              0.0017674, 0.999582, 0.0349233, 0, 0.00413658, 0.999322,
              0.0351265, 0, 0.00747408, 0.998939, 0.0353967, 0, 0.0117157,
              0.998219, 0.0357018, 0, 0.0167966, 0.994974, 0.0354726, 0,
              0.0226572, 0.993201, 0.0355621, 0, 0.0292445, 0.991573, 0.0357641,
              0, 0.0365123, 0.989301, 0.0359252, 0, 0.0444203, 0.985712,
              0.0358017, 0, 0.0529334, 0.982411, 0.0358353, 0, 0.0620214,
              0.977827, 0.035617, 0, 0.0716574, 0.973278, 0.0354398, 0,
              0.0818186, 0.967397, 0.0350483, 0, 0.0924846, 0.960696, 0.0344795,
              0, 0.103638, 0.954349, 0.0339861, 0, 0.115263, 0.946066,
              0.0331323, 0, 0.127348, 0.938012, 0.032359, 0, 0.13988, 0.929413,
              0.0314413, 0, 0.152849, 0.920355, 0.0304103, 0, 0.166248,
              0.910586, 0.0292785, 0, 0.18007, 0.900609, 0.0281391, 0, 0.194308,
              0.890093, 0.0269103, 0, 0.208958, 0.880013, 0.0257269, 0,
              0.224018, 0.869001, 0.0244671, 0, 0.239485, 0.85751, 0.0232252, 0,
              0.255359, 0.84582, 0.0220117, 0, 0.271638, 0.834383, 0.0208274, 0,
              0.288324, 0.822158, 0.0196628, 0, 0.305419, 0.809056, 0.0185306,
              0, 0.322927, 0.795832, 0.0174174, 0, 0.340851, 0.782547,
              0.0163758, 0, 0.359199, 0.7689, 0.015391, 0, 0.377975, 0.755526,
              0.0144488, 0, 0.397189, 0.741681, 0.0135372, 0, 0.416851,
              0.728178, 0.0126957, 0, 0.436971, 0.714642, 0.0118812, 0,
              0.457564, 0.702756, 0.0111165, 0, 0.478644, 0.69175, 0.0104145, 0,
              0.500229, 0.680159, 0.00974439, 0, 0.522339, 0.668073, 0.00911926,
              0, 0.544997, 0.655405, 0.00851393, 0, 0.56823, 0.642921,
              0.00797637, 0, 0.592068, 0.629993, 0.00745119, 0, 0.616546,
              0.616828, 0.00696972, 0, 0.641705, 0.603305, 0.00652425, 0,
              0.66759, 0.589833, 0.00610188, 0, 0.694255, 0.575945, 0.00570834,
              0, 0.72176, 0.561745, 0.00533384, 0, 0.750168, 0.548277,
              0.00500001, 0, 0.779545, 0.534467, 0.00467582, 0, 0.809933,
              0.521032, 0.00438092, 0, 0.841272, 0.507877, 0.00410348, 0,
              0.873016, 0.494654, 0.00383618, 0, 0.904762, 0.481592, 0.00358699,
              0, 0.936508, 0.468509, 0.00337281, 0, 0.968254, 0.455293,
              0.00316196, 0, 1, 1, 0.0430698, 0, 0, 1, 0.0430699, 0, 0,
              0.999998, 0.0430713, 0, 0, 0.999991, 0.0430773, 0, 0, 0.99997,
              0.0430936, 0, 0, 0.999928, 0.0431277, 0, 406396e-10, 0.999852,
              0.0431893, 0, 744376e-9, 0.999724, 0.0432895, 0, 0.0024806,
              0.999527, 0.0434397, 0, 0.00524779, 0.99923, 0.0436507, 0,
              0.00898164, 0.998783, 0.0439255, 0, 0.0136083, 0.997507,
              0.0441104, 0, 0.0190582, 0.994418, 0.0438225, 0, 0.0252694,
              0.992864, 0.0439396, 0, 0.0321879, 0.991127, 0.0440962, 0,
              0.039767, 0.987331, 0.0438408, 0, 0.0479667, 0.984819, 0.0438991,
              0, 0.056752, 0.980384, 0.0435906, 0, 0.0660929, 0.975846,
              0.0432543, 0, 0.075963, 0.970748, 0.0428293, 0, 0.0863398,
              0.964303, 0.042153, 0, 0.0972035, 0.95772, 0.0414111, 0, 0.108537,
              0.950747, 0.0405893, 0, 0.120325, 0.942533, 0.0394887, 0,
              0.132554, 0.934045, 0.0383544, 0, 0.145215, 0.924942, 0.037057, 0,
              0.158296, 0.915811, 0.0356993, 0, 0.17179, 0.90612, 0.0342401, 0,
              0.185691, 0.896434, 0.0328078, 0, 0.199993, 0.886021, 0.031288, 0,
              0.214691, 0.876081, 0.0297776, 0, 0.229782, 0.865608, 0.0282334,
              0, 0.245265, 0.854924, 0.026749, 0, 0.261138, 0.843607, 0.02526,
              0, 0.277401, 0.832456, 0.0238214, 0, 0.294056, 0.821342,
              0.0224682, 0, 0.311104, 0.809303, 0.0211297, 0, 0.328548,
              0.796468, 0.0198387, 0, 0.346394, 0.784046, 0.0186227, 0,
              0.364645, 0.771262, 0.0174561, 0, 0.38331, 0.758118, 0.0163806, 0,
              0.402396, 0.745075, 0.0153287, 0, 0.421912, 0.731926, 0.0143647,
              0, 0.44187, 0.71863, 0.0134363, 0, 0.462283, 0.705414, 0.0125603,
              0, 0.483165, 0.693792, 0.0117508, 0, 0.504535, 0.683108,
              0.0110016, 0, 0.52641, 0.67183, 0.0102757, 0, 0.548816, 0.66015,
              0.00962044, 0, 0.571776, 0.647907, 0.00898031, 0, 0.595323,
              0.635734, 0.00840811, 0, 0.619489, 0.623208, 0.00786211, 0,
              0.644317, 0.610438, 0.00734953, 0, 0.669852, 0.597345, 0.00687688,
              0, 0.696148, 0.584138, 0.00643469, 0, 0.723267, 0.5707,
              0.00602236, 0, 0.75128, 0.556966, 0.0056324, 0, 0.780258,
              0.543607, 0.00528277, 0, 0.810268, 0.530213, 0.00493999, 0,
              0.841311, 0.516912, 0.00462265, 0, 0.873016, 0.503916, 0.0043307,
              0, 0.904762, 0.491146, 0.00406858, 0, 0.936508, 0.478439,
              0.00381436, 0, 0.968254, 0.465834, 0.00358003, 0, 1, 1, 0.0534039,
              0, 0, 1, 0.053404, 0, 0, 0.999998, 0.0534055, 0, 0, 0.999989,
              0.0534116, 0, 0, 0.999968, 0.0534283, 0, 0, 0.999918, 0.0534633,
              0, 155895e-9, 0.99983, 0.0535262, 0, 0.00120914, 0.999685,
              0.0536281, 0, 0.00334944, 0.999461, 0.0537799, 0, 0.00653077,
              0.999119, 0.0539902, 0, 0.0106718, 0.998582, 0.0542524, 0,
              0.0156907, 0.995919, 0.0540318, 0, 0.0215147, 0.993735, 0.0538914,
              0, 0.0280801, 0.992126, 0.0539557, 0, 0.0353323, 0.990266,
              0.0540401, 0, 0.0432247, 0.986317, 0.0536064, 0, 0.0517172,
              0.983213, 0.0534425, 0, 0.0607754, 0.978303, 0.0528622, 0,
              0.0703698, 0.973665, 0.0523363, 0, 0.0804742, 0.968091, 0.0516165,
              0, 0.0910667, 0.961026, 0.0505434, 0, 0.102128, 0.954333,
              0.049523, 0, 0.113641, 0.946372, 0.0481698, 0, 0.125591, 0.938254,
              0.0467674, 0, 0.137965, 0.929516, 0.0452341, 0, 0.150754,
              0.920106, 0.0435083, 0, 0.163947, 0.910899, 0.0417399, 0,
              0.177537, 0.901532, 0.0399389, 0, 0.191516, 0.891919, 0.0380901,
              0, 0.205881, 0.882006, 0.0362341, 0, 0.220626, 0.871965,
              0.0343444, 0, 0.235749, 0.862145, 0.0324832, 0, 0.251248,
              0.852058, 0.0306681, 0, 0.267121, 0.84161, 0.0289097, 0, 0.283368,
              0.830806, 0.0272079, 0, 0.299992, 0.820476, 0.0256089, 0,
              0.316992, 0.809514, 0.0240394, 0, 0.334374, 0.797865, 0.0225379,
              0, 0.35214, 0.785621, 0.0211235, 0, 0.370296, 0.773765, 0.0197908,
              0, 0.388849, 0.761629, 0.0185235, 0, 0.407807, 0.748891,
              0.0173358, 0, 0.427178, 0.736437, 0.0162305, 0, 0.446974,
              0.723707, 0.0151778, 0, 0.467207, 0.710606, 0.0141791, 0,
              0.487892, 0.698019, 0.0132592, 0, 0.509046, 0.686203, 0.0123887,
              0, 0.530687, 0.675692, 0.0115976, 0, 0.552839, 0.664826,
              0.0108325, 0, 0.575527, 0.65349, 0.0101348, 0, 0.59878, 0.641774,
              0.00947756, 0, 0.622634, 0.629794, 0.00886058, 0, 0.647128,
              0.617647, 0.00828526, 0, 0.672308, 0.60534, 0.00775312, 0,
              0.698231, 0.592718, 0.00726033, 0, 0.724958, 0.579746, 0.00679731,
              0, 0.752563, 0.566763, 0.00636111, 0, 0.781127, 0.553515,
              0.00595228, 0, 0.810733, 0.540118, 0.00556876, 0, 0.841426,
              0.527325, 0.00523051, 0, 0.873016, 0.514265, 0.00490712, 0,
              0.904762, 0.501406, 0.00460297, 0, 0.936508, 0.488922, 0.00431247,
              0, 0.968254, 0.476541, 0.0040472, 0, 1, 1, 0.0659184, 0, 0, 1,
              0.0659185, 0, 0, 0.999998, 0.06592, 0, 0, 0.999988, 0.0659259, 0,
              0, 0.999963, 0.0659423, 0, 0, 0.999907, 0.0659764, 0, 374198e-9,
              0.999806, 0.0660376, 0, 0.00182071, 0.999639, 0.0661361, 0,
              0.0043894, 0.999378, 0.0662814, 0, 0.00800055, 0.998985,
              0.0664779, 0, 0.0125594, 0.998285, 0.0666914, 0, 0.0179786,
              0.995071, 0.0661989, 0, 0.0241822, 0.993172, 0.0660454, 0,
              0.031106, 0.991438, 0.0660105, 0, 0.0386952, 0.988428, 0.0656875,
              0, 0.0469032, 0.985218, 0.0652913, 0, 0.0556905, 0.981128,
              0.0647107, 0, 0.065023, 0.976015, 0.0638491, 0, 0.0748717,
              0.97097, 0.062993, 0, 0.0852112, 0.964582, 0.0617927, 0,
              0.0960199, 0.957383, 0.0603626, 0, 0.107279, 0.949969, 0.0588128,
              0, 0.118971, 0.941843, 0.0570274, 0, 0.131084, 0.933624,
              0.0551885, 0, 0.143604, 0.924543, 0.053122, 0, 0.156521, 0.914919,
              0.0508897, 0, 0.169825, 0.905773, 0.0486418, 0, 0.18351, 0.896434,
              0.0463364, 0, 0.197569, 0.887195, 0.0440623, 0, 0.211997,
              0.877706, 0.0417799, 0, 0.226789, 0.867719, 0.03945, 0, 0.241944,
              0.858587, 0.037243, 0, 0.257458, 0.849317, 0.0350956, 0, 0.273331,
              0.839585, 0.0329852, 0, 0.289563, 0.829856, 0.0310028, 0,
              0.306154, 0.819589, 0.0290953, 0, 0.323108, 0.809714, 0.0272738,
              0, 0.340426, 0.79934, 0.0255631, 0, 0.358113, 0.788224, 0.0239175,
              0, 0.376175, 0.776619, 0.0223831, 0, 0.394616, 0.76521, 0.0209298,
              0, 0.413445, 0.753716, 0.0195786, 0, 0.432671, 0.741564,
              0.0183001, 0, 0.452305, 0.729413, 0.0171259, 0, 0.472358,
              0.717146, 0.0159933, 0, 0.492845, 0.70436, 0.0149495, 0, 0.513783,
              0.69219, 0.0139681, 0, 0.535189, 0.680289, 0.0130577, 0, 0.557087,
              0.669611, 0.0122198, 0, 0.5795, 0.659113, 0.0114174, 0, 0.602459,
              0.648148, 0.0106729, 0, 0.625997, 0.636905, 0.00998997, 0,
              0.650154, 0.625154, 0.00934313, 0, 0.674976, 0.613481, 0.00874839,
              0, 0.700518, 0.60154, 0.00818265, 0, 0.726845, 0.58943,
              0.00766889, 0, 0.754032, 0.576828, 0.00717153, 0, 0.782167,
              0.564194, 0.00672696, 0, 0.811344, 0.551501, 0.00630863, 0,
              0.841644, 0.538635, 0.00592177, 0, 0.873016, 0.525724, 0.00554888,
              0, 0.904762, 0.513209, 0.00520225, 0, 0.936508, 0.500457,
              0.00488231, 0, 0.968254, 0.48799, 0.00457153, 0, 1, 1, 0.0810131,
              0, 0, 1, 0.0810133, 0, 0, 0.999997, 0.0810145, 0, 0, 0.999985,
              0.08102, 0, 0, 0.999956, 0.0810347, 0, 195026e-10, 0.999893,
              0.0810656, 0, 719316e-9, 0.999777, 0.0811205, 0, 0.00259774,
              0.999583, 0.081208, 0, 0.00561807, 0.999281, 0.0813343, 0,
              0.00967472, 0.998813, 0.0814969, 0, 0.0146627, 0.997597,
              0.0815217, 0, 0.0204902, 0.994379, 0.0808502, 0, 0.0270802,
              0.992744, 0.0806792, 0, 0.0343674, 0.990745, 0.0804589, 0,
              0.0422974, 0.986646, 0.0796107, 0, 0.0508242, 0.983611, 0.0790913,
              0, 0.0599087, 0.978869, 0.0780746, 0, 0.0695175, 0.973475,
              0.0768218, 0, 0.0796223, 0.967845, 0.0754926, 0, 0.0901983,
              0.960778, 0.0737063, 0, 0.101224, 0.953333, 0.0718052, 0,
              0.112682, 0.945274, 0.0695946, 0, 0.124555, 0.936955, 0.0672492,
              0, 0.136831, 0.928319, 0.0647732, 0, 0.149496, 0.919075,
              0.0620947, 0, 0.162542, 0.909114, 0.0591816, 0, 0.175958,
              0.900137, 0.0563917, 0, 0.189739, 0.891069, 0.0535392, 0,
              0.203877, 0.882262, 0.0507642, 0, 0.218368, 0.873232, 0.0479793,
              0, 0.233208, 0.864042, 0.045226, 0, 0.248393, 0.855002, 0.0425413,
              0, 0.263923, 0.846569, 0.0400126, 0, 0.279796, 0.837714,
              0.0375269, 0, 0.296012, 0.828918, 0.0352027, 0, 0.312573,
              0.819783, 0.0330011, 0, 0.329479, 0.810129, 0.0308908, 0,
              0.346734, 0.800866, 0.0289112, 0, 0.364342, 0.79093, 0.0270255, 0,
              0.382307, 0.780593, 0.0252758, 0, 0.400637, 0.769511, 0.0236178,
              0, 0.419337, 0.758558, 0.0220652, 0, 0.438418, 0.747632,
              0.0206289, 0, 0.457889, 0.736146, 0.0192873, 0, 0.477761,
              0.724093, 0.0180333, 0, 0.49805, 0.71234, 0.0168264, 0, 0.51877,
              0.700201, 0.015746, 0, 0.53994, 0.687949, 0.0147027, 0, 0.561581,
              0.676163, 0.0137512, 0, 0.583718, 0.665001, 0.0128655, 0, 0.60638,
              0.65472, 0.0120366, 0, 0.629599, 0.644213, 0.0112604, 0, 0.653415,
              0.633382, 0.0105413, 0, 0.677874, 0.62212, 0.00986498, 0, 0.70303,
              0.610631, 0.00923308, 0, 0.728948, 0.599078, 0.00864206, 0,
              0.755706, 0.587519, 0.00811784, 0, 0.783396, 0.575505, 0.00761237,
              0, 0.812121, 0.563148, 0.00713949, 0, 0.841989, 0.550828,
              0.00668379, 0, 0.873035, 0.538458, 0.00627715, 0, 0.904762,
              0.525905, 0.00588336, 0, 0.936508, 0.513517, 0.00552687, 0,
              0.968254, 0.501395, 0.00519681, 0, 1, 1, 0.0991506, 0, 0, 1,
              0.0991504, 0, 0, 0.999996, 0.0991515, 0, 0, 0.999984, 0.0991558,
              0, 0, 0.999947, 0.0991672, 0, 114389e-9, 0.999874, 0.0991912, 0,
              0.00121503, 0.999739, 0.0992331, 0, 0.00356108, 0.999514,
              0.0992983, 0, 0.00705578, 0.999159, 0.0993877, 0, 0.011574,
              0.998586, 0.0994837, 0, 0.017003, 0.995731, 0.0988425, 0,
              0.0232484, 0.993384, 0.098276, 0, 0.0302318, 0.991615, 0.0979269,
              0, 0.0378884, 0.989029, 0.0973432, 0, 0.0461641, 0.985373,
              0.0963539, 0, 0.0550136, 0.981278, 0.0952306, 0, 0.0643988,
              0.975777, 0.0936233, 0, 0.0742868, 0.970526, 0.0920219, 0,
              0.0846501, 0.963755, 0.0898912, 0, 0.0954644, 0.956676, 0.0876064,
              0, 0.106709, 0.948099, 0.0847751, 0, 0.118367, 0.939718,
              0.0818638, 0, 0.130423, 0.931305, 0.078857, 0, 0.142862, 0.922342,
              0.0756127, 0, 0.155674, 0.912842, 0.0721473, 0, 0.168849,
              0.903304, 0.0686195, 0, 0.182378, 0.89411, 0.0650589, 0, 0.196255,
              0.885512, 0.0616022, 0, 0.210473, 0.877193, 0.0582434, 0,
              0.225027, 0.86877, 0.0548979, 0, 0.239915, 0.860267, 0.0516095, 0,
              0.255132, 0.851915, 0.048468, 0, 0.270678, 0.843912, 0.0454447, 0,
              0.286551, 0.83604, 0.0425612, 0, 0.302751, 0.828245, 0.0398752, 0,
              0.31928, 0.820159, 0.0373198, 0, 0.336138, 0.81167, 0.034916, 0,
              0.35333, 0.802659, 0.0326402, 0, 0.370858, 0.793921, 0.0304901, 0,
              0.388728, 0.784713, 0.0284857, 0, 0.406944, 0.774946, 0.0266186,
              0, 0.425515, 0.76448, 0.0248593, 0, 0.444449, 0.753793, 0.0232114,
              0, 0.463756, 0.743506, 0.0217039, 0, 0.483447, 0.732555,
              0.0202841, 0, 0.503535, 0.720965, 0.0189648, 0, 0.524036,
              0.709422, 0.0177189, 0, 0.544968, 0.697756, 0.0165626, 0, 0.56635,
              0.685565, 0.015483, 0, 0.588208, 0.673987, 0.0144892, 0, 0.610569,
              0.66244, 0.0135607, 0, 0.633466, 0.651675, 0.0126956, 0, 0.656936,
              0.641598, 0.0118788, 0, 0.681025, 0.63121, 0.0111261, 0, 0.705788,
              0.620514, 0.010437, 0, 0.731289, 0.609366, 0.00978747, 0,
              0.757606, 0.598137, 0.00917257, 0, 0.784834, 0.586966, 0.00859778,
              0, 0.813085, 0.575549, 0.00806803, 0, 0.842485, 0.563797,
              0.00757294, 0, 0.87313, 0.551758, 0.00710592, 0, 0.904762,
              0.539894, 0.0066841, 0, 0.936508, 0.527901, 0.00627901, 0,
              0.968254, 0.515819, 0.00590506, 0, 1, 1, 0.120864, 0, 0, 1,
              0.120864, 0, 0, 0.999996, 0.120864, 0, 0, 0.99998, 0.120867, 0, 0,
              0.99994, 0.120872, 0, 323781e-9, 0.999852, 0.120884, 0,
              0.00188693, 0.999693, 0.120903, 0, 0.00473489, 0.999426, 0.120929,
              0, 0.00872704, 0.999002, 0.120955, 0, 0.0137237, 0.998235,
              0.120918, 0, 0.0196068, 0.994608, 0.119764, 0, 0.0262803,
              0.992997, 0.119265, 0, 0.0336657, 0.990968, 0.11863, 0, 0.0416987,
              0.987002, 0.117261, 0, 0.0503261, 0.983524, 0.116009, 0,
              0.0595035, 0.97875, 0.114252, 0, 0.0691935, 0.972652, 0.11193, 0,
              0.0793645, 0.966613, 0.109555, 0, 0.0899894, 0.959275, 0.106612,
              0, 0.101045, 0.951272, 0.103375, 0, 0.112512, 0.942323, 0.0996594,
              0, 0.124372, 0.933679, 0.0958841, 0, 0.136611, 0.924822,
              0.0919265, 0, 0.149216, 0.915742, 0.0878061, 0, 0.162176,
              0.906348, 0.0834894, 0, 0.175482, 0.896883, 0.079085, 0, 0.189125,
              0.88774, 0.0746745, 0, 0.203098, 0.87986, 0.0705773, 0, 0.217396,
              0.871998, 0.0665005, 0, 0.232015, 0.864325, 0.0625413, 0, 0.24695,
              0.856685, 0.0586781, 0, 0.2622, 0.84925, 0.0550063, 0, 0.277761,
              0.841719, 0.0514727, 0, 0.293634, 0.834755, 0.0481398, 0,
              0.309819, 0.827853, 0.0450172, 0, 0.326315, 0.820888, 0.0420969,
              0, 0.343126, 0.813616, 0.0393702, 0, 0.360254, 0.805767,
              0.0367771, 0, 0.377701, 0.797338, 0.0343274, 0, 0.395474,
              0.789122, 0.0320529, 0, 0.413577, 0.780601, 0.0299485, 0,
              0.432018, 0.771424, 0.0279812, 0, 0.450804, 0.761502, 0.0261054,
              0, 0.469944, 0.751166, 0.0243942, 0, 0.489451, 0.741276,
              0.0228087, 0, 0.509337, 0.730898, 0.0213265, 0, 0.529617,
              0.719878, 0.0199307, 0, 0.550307, 0.708379, 0.0186574, 0,
              0.571428, 0.697165, 0.0174446, 0, 0.593003, 0.685554, 0.0163144,
              0, 0.615059, 0.673631, 0.015276, 0, 0.637628, 0.662385, 0.0143003,
              0, 0.660746, 0.651059, 0.0134112, 0, 0.68446, 0.640451, 0.0125794,
              0, 0.70882, 0.630536, 0.011793, 0, 0.733893, 0.620316, 0.0110547,
              0, 0.759756, 0.609722, 0.0103668, 0, 0.786505, 0.598804,
              0.00973009, 0, 0.814259, 0.587871, 0.00912812, 0, 0.843157,
              0.577121, 0.00858916, 0, 0.87334, 0.566019, 0.00807333, 0,
              0.904762, 0.554664, 0.00759687, 0, 0.936508, 0.543101, 0.00714759,
              0, 0.968254, 0.531558, 0.00673418, 0, 1, 1, 0.146767, 0, 0, 1,
              0.146767, 0, 0, 0.999997, 0.146767, 0, 0, 0.999977, 0.146765, 0,
              320658e-11, 0.999929, 0.146762, 0, 682576e-9, 0.999823, 0.146753,
              0, 0.00276402, 0.999633, 0.146735, 0, 0.00614771, 0.999314,
              0.146699, 0, 0.0106613, 0.998796, 0.14662, 0, 0.0161546, 0.997124,
              0.146107, 0, 0.0225063, 0.994062, 0.144857, 0, 0.0296198,
              0.992154, 0.144011, 0, 0.037417, 0.989186, 0.142712, 0, 0.0458348,
              0.985279, 0.140926, 0, 0.0548211, 0.980826, 0.13885, 0, 0.0643326,
              0.975056, 0.136168, 0, 0.074333, 0.969005, 0.133217, 0, 0.0847917,
              0.961554, 0.12959, 0, 0.0956828, 0.954206, 0.125886, 0, 0.106984,
              0.945046, 0.121335, 0, 0.118675, 0.935678, 0.116492, 0, 0.130741,
              0.926748, 0.111635, 0, 0.143166, 0.917764, 0.106625, 0, 0.155939,
              0.908358, 0.101325, 0, 0.169049, 0.899219, 0.0960249, 0, 0.182487,
              0.890089, 0.0906527, 0, 0.196245, 0.881488, 0.0853905, 0,
              0.210317, 0.874031, 0.0804177, 0, 0.224697, 0.866932, 0.0756005,
              0, 0.23938, 0.859976, 0.0709019, 0, 0.254364, 0.853375, 0.0664391,
              0, 0.269646, 0.846971, 0.0622012, 0, 0.285223, 0.840483, 0.058129,
              0, 0.301096, 0.833969, 0.0542762, 0, 0.317265, 0.82806, 0.0507042,
              0, 0.333729, 0.822128, 0.047368, 0, 0.350491, 0.815989, 0.044272,
              0, 0.367554, 0.809336, 0.0413444, 0, 0.38492, 0.802177, 0.038601,
              0, 0.402594, 0.79441, 0.0360227, 0, 0.420582, 0.786573, 0.0336383,
              0, 0.438891, 0.778619, 0.0314321, 0, 0.457527, 0.77, 0.029362, 0,
              0.476499, 0.760698, 0.0274102, 0, 0.49582, 0.750932, 0.0256146, 0,
              0.5155, 0.740993, 0.023974, 0, 0.535555, 0.731159, 0.0224182, 0,
              0.556, 0.720836, 0.0209889, 0, 0.576855, 0.709913, 0.0196411, 0,
              0.598143, 0.698415, 0.0183824, 0, 0.619888, 0.68745, 0.0172222, 0,
              0.642123, 0.676154, 0.0161509, 0, 0.664883, 0.664383, 0.0151397,
              0, 0.688211, 0.6533, 0.0141873, 0, 0.71216, 0.642072, 0.0133105,
              0, 0.736792, 0.631412, 0.0124932, 0, 0.762186, 0.621622,
              0.0117408, 0, 0.788439, 0.611681, 0.0110358, 0, 0.815672, 0.60142,
              0.0103775, 0, 0.844034, 0.59083, 0.00975623, 0, 0.873699,
              0.580254, 0.00918084, 0, 0.904765, 0.569841, 0.00864721, 0,
              0.936508, 0.559224, 0.00815731, 0, 0.968254, 0.548315, 0.00767924,
              0, 1, 1, 0.177563, 0, 0, 1, 0.177563, 0, 0, 0.999994, 0.177562, 0,
              0, 0.999972, 0.177555, 0, 664171e-10, 0.999914, 0.177536, 0,
              0.0012276, 0.999787, 0.177496, 0, 0.00388025, 0.999556, 0.17742,
              0, 0.00783463, 0.999165, 0.177285, 0, 0.0128953, 0.9985, 0.177037,
              0, 0.0189053, 0.995388, 0.175634, 0, 0.025742, 0.993102, 0.174375,
              0, 0.033309, 0.990992, 0.173121, 0, 0.0415298, 0.986932, 0.170896,
              0, 0.0503425, 0.982786, 0.16847, 0, 0.0596964, 0.977592, 0.165455,
              0, 0.0695498, 0.971075, 0.161676, 0, 0.0798676, 0.963967,
              0.157458, 0, 0.0906201, 0.956397, 0.152836, 0, 0.101783, 0.947489,
              0.147467, 0, 0.113333, 0.937564, 0.14145, 0, 0.125254, 0.928182,
              0.135383, 0, 0.137529, 0.919027, 0.129212, 0, 0.150144, 0.909618,
              0.12276, 0, 0.163088, 0.900492, 0.116273, 0, 0.176351, 0.891671,
              0.1098, 0, 0.189924, 0.883146, 0.103362, 0, 0.203799, 0.875151,
              0.0970799, 0, 0.21797, 0.868338, 0.0911732, 0, 0.232433, 0.862033,
              0.0854966, 0, 0.247182, 0.856107, 0.0800691, 0, 0.262216,
              0.850644, 0.0749618, 0, 0.27753, 0.845261, 0.070079, 0, 0.293124,
              0.839885, 0.0654321, 0, 0.308997, 0.834609, 0.0610975, 0,
              0.325149, 0.829083, 0.0569741, 0, 0.341581, 0.82404, 0.0531736, 0,
              0.358294, 0.818968, 0.049665, 0, 0.37529, 0.813496, 0.0463856, 0,
              0.392573, 0.807533, 0.0433217, 0, 0.410148, 0.80099, 0.0404402, 0,
              0.428019, 0.793891, 0.0377578, 0, 0.446192, 0.786281, 0.0352616,
              0, 0.464676, 0.778773, 0.0329577, 0, 0.483478, 0.770737, 0.030808,
              0, 0.502608, 0.762094, 0.0287964, 0, 0.522079, 0.752898,
              0.0269254, 0, 0.541905, 0.743306, 0.0251926, 0, 0.5621, 0.733416,
              0.023595, 0, 0.582684, 0.723742, 0.0221155, 0, 0.603677, 0.713542,
              0.0207435, 0, 0.625106, 0.702755, 0.019434, 0, 0.646998, 0.691484,
              0.0182046, 0, 0.66939, 0.680531, 0.0170771, 0, 0.692324, 0.66953,
              0.0160339, 0, 0.715849, 0.658126, 0.0150677, 0, 0.740028,
              0.646933, 0.0141551, 0, 0.764937, 0.636107, 0.0133179, 0,
              0.790673, 0.625271, 0.0125284, 0, 0.817358, 0.615225, 0.0117937,
              0, 0.84515, 0.605678, 0.0111181, 0, 0.874244, 0.59583, 0.0104759,
              0, 0.904828, 0.585704, 0.00986672, 0, 0.936508, 0.575413,
              0.00929712, 0, 0.968254, 0.565373, 0.00876713, 0, 1, 1, 0.214058,
              0, 0, 0.999999, 0.214058, 0, 0, 0.999994, 0.214055, 0, 0,
              0.999966, 0.214039, 0, 259642e-9, 0.999893, 0.213998, 0,
              0.00200075, 0.999737, 0.21391, 0, 0.00527775, 0.999449, 0.213745,
              0, 0.00983959, 0.99896, 0.213458, 0, 0.0154755, 0.9979, 0.212855,
              0, 0.0220249, 0.994278, 0.210779, 0, 0.0293654, 0.992254, 0.20926,
              0, 0.0374021, 0.98881, 0.206908, 0, 0.0460604, 0.984715, 0.204009,
              0, 0.0552802, 0.979738, 0.200471, 0, 0.0650127, 0.972884,
              0.195813, 0, 0.0752175, 0.965996, 0.190856, 0, 0.0858612,
              0.957974, 0.185077, 0, 0.0969155, 0.949155, 0.17868, 0, 0.108356,
              0.939288, 0.171513, 0, 0.120163, 0.928996, 0.163838, 0, 0.132319,
              0.919563, 0.156246, 0, 0.144808, 0.910004, 0.148359, 0, 0.157618,
              0.900791, 0.140417, 0, 0.170737, 0.892135, 0.132569, 0, 0.184155,
              0.883803, 0.124741, 0, 0.197866, 0.876034, 0.117091, 0, 0.211861,
              0.869219, 0.109835, 0, 0.226134, 0.863062, 0.102859, 0, 0.240682,
              0.857795, 0.0962928, 0, 0.255499, 0.853009, 0.0900725, 0,
              0.270583, 0.848603, 0.0842101, 0, 0.285931, 0.844335, 0.0786527,
              0, 0.301542, 0.840208, 0.0734397, 0, 0.317415, 0.836035,
              0.0685334, 0, 0.33355, 0.83172, 0.0639275, 0, 0.349948, 0.827135,
              0.0595909, 0, 0.36661, 0.822797, 0.0556204, 0, 0.383539, 0.818387,
              0.0519394, 0, 0.400738, 0.813565, 0.0485317, 0, 0.41821, 0.808142,
              0.0453138, 0, 0.435961, 0.802212, 0.0423354, 0, 0.453997, 0.79573,
              0.0395553, 0, 0.472324, 0.788741, 0.036988, 0, 0.490951, 0.781093,
              0.0345688, 0, 0.509887, 0.773597, 0.0323297, 0, 0.529144,
              0.765622, 0.0302719, 0, 0.548735, 0.757083, 0.0283477, 0,
              0.568674, 0.747992, 0.0265562, 0, 0.588979, 0.738591, 0.0248844,
              0, 0.609671, 0.728719, 0.0233342, 0, 0.630773, 0.719146,
              0.0219081, 0, 0.652314, 0.709165, 0.0205711, 0, 0.674328, 0.69875,
              0.0193248, 0, 0.696854, 0.687884, 0.0181582, 0, 0.719942,
              0.676818, 0.0170746, 0, 0.743651, 0.666247, 0.0160718, 0,
              0.768057, 0.655284, 0.0151262, 0, 0.793253, 0.64401, 0.0142561, 0,
              0.819363, 0.633353, 0.0134327, 0, 0.846547, 0.622674, 0.012653, 0,
              0.875017, 0.612265, 0.0119354, 0, 0.905021, 0.602455, 0.0112533,
              0, 0.936508, 0.593147, 0.0106234, 0, 0.968254, 0.583592,
              0.0100213, 0, 1, 1, 0.25717, 0, 0, 1, 0.25717, 0, 0, 0.999992,
              0.257164, 0, 0, 0.999958, 0.257135, 0, 641715e-9, 0.999864,
              0.25706, 0, 0.00305314, 0.999666, 0.256897, 0, 0.00700975,
              0.999302, 0.256596, 0, 0.0122194, 0.998663, 0.25607, 0, 0.0184622,
              0.995607, 0.254123, 0, 0.0255773, 0.993094, 0.252081, 0,
              0.0334439, 0.9907, 0.249867, 0, 0.0419696, 0.98594, 0.246118, 0,
              0.0510823, 0.981214, 0.242049, 0, 0.0607242, 0.974966, 0.236869,
              0, 0.0708486, 0.967589, 0.230724, 0, 0.081417, 0.95915, 0.223635,
              0, 0.0923974, 0.950257, 0.21596, 0, 0.103763, 0.940165, 0.207296,
              0, 0.115491, 0.929396, 0.197901, 0, 0.127562, 0.919288, 0.188437,
              0, 0.13996, 0.909428, 0.178762, 0, 0.15267, 0.900105, 0.169072, 0,
              0.165679, 0.891418, 0.159478, 0, 0.178979, 0.883347, 0.15002, 0,
              0.192558, 0.875992, 0.140813, 0, 0.20641, 0.869466, 0.13196, 0,
              0.220529, 0.863699, 0.123501, 0, 0.234907, 0.858553, 0.115436, 0,
              0.249542, 0.854379, 0.107901, 0, 0.264428, 0.850894, 0.10088, 0,
              0.279564, 0.847632, 0.0942296, 0, 0.294947, 0.844571, 0.0879861,
              0, 0.310575, 0.84163, 0.0821534, 0, 0.326448, 0.838542, 0.0766409,
              0, 0.342566, 0.835412, 0.0715322, 0, 0.358929, 0.831899,
              0.0666883, 0, 0.37554, 0.828177, 0.0622175, 0, 0.392399, 0.82416,
              0.0580452, 0, 0.409511, 0.820393, 0.054267, 0, 0.426878, 0.816068,
              0.0507172, 0, 0.444506, 0.811201, 0.0474041, 0, 0.4624, 0.805785,
              0.0443174, 0, 0.480566, 0.799878, 0.0414562, 0, 0.499013,
              0.793469, 0.0388147, 0, 0.517749, 0.786473, 0.0363453, 0,
              0.536785, 0.778874, 0.0340225, 0, 0.556134, 0.771277, 0.0318599,
              0, 0.575809, 0.763426, 0.0298859, 0, 0.595827, 0.755044,
              0.0280357, 0, 0.616207, 0.746161, 0.0262979, 0, 0.636973,
              0.737124, 0.0247295, 0, 0.65815, 0.72761, 0.0232514, 0, 0.679772,
              0.717822, 0.0218755, 0, 0.701876, 0.708279, 0.0205942, 0,
              0.724509, 0.698333, 0.0193947, 0, 0.74773, 0.68802, 0.0182717, 0,
              0.771609, 0.677321, 0.0172044, 0, 0.79624, 0.666504, 0.0162122, 0,
              0.821743, 0.656184, 0.0152924, 0, 0.84828, 0.64556, 0.0144326, 0,
              0.876069, 0.634636, 0.0136157, 0, 0.905404, 0.624124, 0.0128612,
              0, 0.936508, 0.613914, 0.0121435, 0, 0.968254, 0.603589,
              0.0114887, 0, 1, 1, 0.307946, 0, 0, 0.999999, 0.307945, 0, 0,
              0.999988, 0.307934, 0, 204479e-10, 0.999944, 0.307886, 0,
              0.00127833, 0.999824, 0.307756, 0, 0.00445047, 0.999565, 0.30748,
              0, 0.00914673, 0.999085, 0.306966, 0, 0.0150498, 0.998103,
              0.306004, 0, 0.0219367, 0.994249, 0.303028, 0, 0.0296485,
              0.991807, 0.300435, 0, 0.038068, 0.987773, 0.296554, 0, 0.0471062,
              0.982673, 0.2916, 0, 0.0566942, 0.976623, 0.285641, 0, 0.0667768,
              0.968757, 0.27815, 0, 0.0773099, 0.959849, 0.269529, 0, 0.088257,
              0.950663, 0.260248, 0, 0.0995879, 0.940129, 0.249704, 0, 0.111277,
              0.92895, 0.238291, 0, 0.123304, 0.917996, 0.226501, 0, 0.13565,
              0.907813, 0.214669, 0, 0.148299, 0.898305, 0.202835, 0, 0.161237,
              0.889626, 0.191158, 0, 0.174455, 0.88175, 0.179695, 0, 0.187941,
              0.874715, 0.168548, 0, 0.201687, 0.868746, 0.15792, 0, 0.215687,
              0.863703, 0.147807, 0, 0.229933, 0.859315, 0.138149, 0, 0.24442,
              0.855538, 0.128993, 0, 0.259145, 0.852428, 0.120414, 0, 0.274103,
              0.850168, 0.112498, 0, 0.289293, 0.848132, 0.105054, 0, 0.304711,
              0.846291, 0.0981087, 0, 0.320357, 0.844431, 0.0915942, 0, 0.33623,
              0.842493, 0.0855056, 0, 0.35233, 0.840368, 0.0798204, 0, 0.368658,
              0.83798, 0.0745097, 0, 0.385214, 0.83523, 0.0695424, 0, 0.402002,
              0.832091, 0.0649092, 0, 0.419023, 0.828667, 0.0606291, 0,
              0.436282, 0.824805, 0.0566523, 0, 0.453782, 0.820988, 0.0530229,
              0, 0.471529, 0.816635, 0.0496364, 0, 0.489528, 0.811725,
              0.0464658, 0, 0.507788, 0.806316, 0.0435082, 0, 0.526317,
              0.800469, 0.0407873, 0, 0.545124, 0.794107, 0.038255, 0, 0.564221,
              0.787218, 0.0358825, 0, 0.583621, 0.779872, 0.0336785, 0,
              0.603341, 0.772097, 0.0316379, 0, 0.623397, 0.764484, 0.0297379,
              0, 0.643812, 0.756428, 0.0279581, 0, 0.664611, 0.748022,
              0.0263153, 0, 0.685824, 0.739268, 0.0247799, 0, 0.707488, 0.73024,
              0.0233385, 0, 0.729646, 0.720893, 0.0220035, 0, 0.752354, 0.71119,
              0.0207555, 0, 0.77568, 0.701791, 0.0195843, 0, 0.799715, 0.692184,
              0.0184891, 0, 0.824574, 0.682258, 0.0174541, 0, 0.850417, 0.67206,
              0.0164873, 0, 0.877466, 0.661717, 0.0155959, 0, 0.90604, 0.651462,
              0.0147519, 0, 0.936528, 0.641467, 0.0139727, 0, 0.968254,
              0.631229, 0.0132363, 0, 1, 1, 0.367573, 0, 0, 0.999999, 0.367571,
              0, 0, 0.999984, 0.367553, 0, 183382e-9, 0.999925, 0.367473, 0,
              0.00225254, 0.999759, 0.367259, 0, 0.00628165, 0.99941, 0.366801,
              0, 0.0117858, 0.998739, 0.365946, 0, 0.0184359, 0.995529,
              0.363191, 0, 0.0260114, 0.992875, 0.360171, 0, 0.0343581,
              0.989135, 0.355981, 0, 0.0433637, 0.984166, 0.350401, 0,
              0.0529438, 0.977871, 0.343348, 0, 0.0630334, 0.96951, 0.334341, 0,
              0.0735805, 0.959964, 0.323862, 0, 0.0845437, 0.950162, 0.312521,
              0, 0.095889, 0.938882, 0.299577, 0, 0.107588, 0.926992, 0.285573,
              0, 0.119617, 0.915589, 0.271212, 0, 0.131957, 0.904791, 0.256611,
              0, 0.144591, 0.895177, 0.242224, 0, 0.157503, 0.886403, 0.227952,
              0, 0.170682, 0.878957, 0.214192, 0, 0.184117, 0.872418, 0.200795,
              0, 0.197799, 0.867029, 0.188015, 0, 0.21172, 0.862835, 0.175975,
              0, 0.225873, 0.859411, 0.164526, 0, 0.240253, 0.856655, 0.153693,
              0, 0.254854, 0.854519, 0.14352, 0, 0.269673, 0.852828, 0.13397, 0,
              0.284707, 0.851412, 0.124984, 0, 0.299953, 0.850609, 0.116748, 0,
              0.315408, 0.849855, 0.10905, 0, 0.331073, 0.849017, 0.101839, 0,
              0.346946, 0.848079, 0.0951359, 0, 0.363028, 0.846911, 0.0888774,
              0, 0.379318, 0.845445, 0.0830375, 0, 0.395818, 0.84362, 0.0775844,
              0, 0.41253, 0.841411, 0.0725054, 0, 0.429457, 0.838768, 0.0677691,
              0, 0.446602, 0.835801, 0.0634016, 0, 0.463968, 0.832341,
              0.0593095, 0, 0.481561, 0.828424, 0.0555121, 0, 0.499386,
              0.824312, 0.052024, 0, 0.51745, 0.819918, 0.0487865, 0, 0.535761,
              0.815072, 0.0457801, 0, 0.554328, 0.809863, 0.0430184, 0,
              0.573162, 0.804164, 0.0404245, 0, 0.592275, 0.798034, 0.0380146,
              0, 0.611681, 0.791436, 0.0357436, 0, 0.631398, 0.784498,
              0.0336475, 0, 0.651445, 0.777125, 0.0316666, 0, 0.671845,
              0.769365, 0.0298122, 0, 0.692628, 0.761579, 0.0281001, 0,
              0.713827, 0.753746, 0.0265049, 0, 0.735484, 0.745573, 0.0250067,
              0, 0.75765, 0.737083, 0.0236026, 0, 0.78039, 0.728545, 0.0223302,
              0, 0.803789, 0.719691, 0.0211243, 0, 0.82796, 0.710569, 0.0199983,
              0, 0.853056, 0.701216, 0.0189569, 0, 0.879298, 0.692094,
              0.0179702, 0, 0.907014, 0.682909, 0.0170418, 0, 0.936691,
              0.673509, 0.0161732, 0, 0.968254, 0.663863, 0.0153406, 0, 1, 1,
              0.437395, 0, 0, 0.999998, 0.437394, 0, 0, 0.99998, 0.437363, 0,
              616704e-9, 0.999891, 0.437232, 0, 0.00367925, 0.999656, 0.436877,
              0, 0.00867446, 0.999148, 0.436121, 0, 0.0150679, 0.997959,
              0.434564, 0, 0.022531, 0.993464, 0.430134, 0, 0.0308507, 0.990606,
              0.426077, 0, 0.0398805, 0.985027, 0.419397, 0, 0.0495148,
              0.978491, 0.41118, 0, 0.0596749, 0.969643, 0.40048, 0, 0.0703001,
              0.959189, 0.38769, 0, 0.0813427, 0.948223, 0.373575, 0, 0.0927641,
              0.935955, 0.357622, 0, 0.104533, 0.923237, 0.34043, 0, 0.116624,
              0.911074, 0.322735, 0, 0.129015, 0.899724, 0.30479, 0, 0.141687,
              0.890189, 0.287392, 0, 0.154626, 0.881796, 0.270248, 0, 0.167818,
              0.874781, 0.253659, 0, 0.181252, 0.869166, 0.237786, 0, 0.194918,
              0.864725, 0.222618, 0, 0.208807, 0.861565, 0.208356, 0, 0.222913,
              0.859284, 0.194867, 0, 0.237229, 0.857677, 0.18212, 0, 0.25175,
              0.856714, 0.17018, 0, 0.266473, 0.856155, 0.158969, 0, 0.281392,
              0.8558, 0.148413, 0, 0.296505, 0.855672, 0.138578, 0, 0.311811,
              0.855538, 0.129345, 0, 0.327306, 0.855689, 0.120861, 0, 0.342991,
              0.855767, 0.112969, 0, 0.358864, 0.855618, 0.105593, 0, 0.374925,
              0.85525, 0.0987451, 0, 0.391176, 0.854583, 0.0923727, 0, 0.407616,
              0.853534, 0.0864143, 0, 0.424249, 0.852061, 0.0808338, 0,
              0.441076, 0.850253, 0.0756771, 0, 0.4581, 0.848004, 0.0708612, 0,
              0.475324, 0.845333, 0.0663784, 0, 0.492754, 0.842376, 0.0622631,
              0, 0.510394, 0.838956, 0.0584112, 0, 0.528251, 0.835121,
              0.0548328, 0, 0.546331, 0.830842, 0.0514838, 0, 0.564644,
              0.826212, 0.048355, 0, 0.583198, 0.821522, 0.0454714, 0, 0.602005,
              0.816551, 0.0428263, 0, 0.621078, 0.811211, 0.0403612, 0,
              0.640434, 0.805479, 0.038039, 0, 0.660089, 0.799409, 0.0358739, 0,
              0.680066, 0.79306, 0.0338727, 0, 0.70039, 0.786395, 0.0319985, 0,
              0.721094, 0.779416, 0.030241, 0, 0.742215, 0.77214, 0.0285951, 0,
              0.7638, 0.764636, 0.0270747, 0, 0.785912, 0.756836, 0.0256354, 0,
              0.808628, 0.749315, 0.0243027, 0, 0.832055, 0.741561, 0.0230497,
              0, 0.856338, 0.733589, 0.0218801, 0, 0.88169, 0.725479, 0.020784,
              0, 0.908441, 0.717255, 0.0197702, 0, 0.937125, 0.708829,
              0.0188168, 0, 0.968254, 0.700191, 0.0179113, 0, 1, 1, 0.518937, 0,
              0, 0.999998, 0.518933, 0, 0, 0.999967, 0.518883, 0, 0.00147741,
              0.999832, 0.51866, 0, 0.00573221, 0.999466, 0.518057, 0, 0.011826,
              0.998644, 0.516752, 0, 0.0192116, 0.994458, 0.512347, 0, 0.027573,
              0.991223, 0.507675, 0, 0.0367099, 0.985515, 0.500188, 0, 0.046487,
              0.978308, 0.490408, 0, 0.0568071, 0.968359, 0.477357, 0,
              0.0675984, 0.95682, 0.461752, 0, 0.0788059, 0.943929, 0.443796, 0,
              0.090386, 0.930224, 0.423893, 0, 0.102304, 0.916514, 0.402682, 0,
              0.114532, 0.903653, 0.380914, 0, 0.127047, 0.892315, 0.359212, 0,
              0.139828, 0.882942, 0.338102, 0, 0.152861, 0.875438, 0.31773, 0,
              0.16613, 0.869642, 0.298186, 0, 0.179624, 0.865304, 0.279491, 0,
              0.193332, 0.862382, 0.261804, 0, 0.207247, 0.860666, 0.245146, 0,
              0.22136, 0.859788, 0.229406, 0, 0.235666, 0.859608, 0.214605, 0,
              0.250158, 0.859912, 0.200691, 0, 0.264832, 0.86053, 0.187623, 0,
              0.279684, 0.861368, 0.17539, 0, 0.294711, 0.862237, 0.163901, 0,
              0.309911, 0.863127, 0.153175, 0, 0.32528, 0.863923, 0.143147, 0,
              0.340819, 0.864567, 0.133781, 0, 0.356524, 0.865013, 0.125042, 0,
              0.372397, 0.86539, 0.116952, 0, 0.388438, 0.865591, 0.109476, 0,
              0.404645, 0.865517, 0.102542, 0, 0.421022, 0.865084, 0.0960688, 0,
              0.437569, 0.864309, 0.0900499, 0, 0.454287, 0.863151, 0.0844328,
              0, 0.471181, 0.861649, 0.0792218, 0, 0.488253, 0.859742,
              0.0743482, 0, 0.505507, 0.857446, 0.0697963, 0, 0.522947,
              0.854757, 0.0655364, 0, 0.54058, 0.851783, 0.061608, 0, 0.558412,
              0.848516, 0.0579701, 0, 0.576449, 0.844897, 0.0545742, 0,
              0.594701, 0.840956, 0.0514167, 0, 0.613178, 0.836676, 0.0484598,
              0, 0.631892, 0.832075, 0.0456934, 0, 0.650856, 0.827191,
              0.0431178, 0, 0.670088, 0.822295, 0.0407718, 0, 0.689606,
              0.817294, 0.0386032, 0, 0.709434, 0.812013, 0.0365675, 0, 0.7296,
              0.806465, 0.0346547, 0, 0.750138, 0.800691, 0.0328717, 0,
              0.771093, 0.794709, 0.031211, 0, 0.792519, 0.788493, 0.0296504, 0,
              0.814488, 0.782049, 0.0281782, 0, 0.837097, 0.775403, 0.0267965,
              0, 0.860481, 0.76857, 0.0255002, 0, 0.884842, 0.761536, 0.0242759,
              0, 0.910494, 0.754303, 0.0231142, 0, 0.937985, 0.74692, 0.0220305,
              0, 0.968254, 0.739745, 0.0210192, 0, 1, 1, 0.613914, 0, 0,
              0.999996, 0.613907, 0, 963597e-10, 0.999942, 0.613814, 0,
              0.00301247, 0.999704, 0.613407, 0, 0.00870385, 0.999046, 0.612302,
              0, 0.0160714, 0.995516, 0.608266, 0, 0.0245899, 0.991726,
              0.602863, 0, 0.0339681, 0.985157, 0.593956, 0, 0.0440254, 0.97642,
              0.581748, 0, 0.0546409, 0.964404, 0.565183, 0, 0.0657284,
              0.950601, 0.545273, 0, 0.0772246, 0.935158, 0.522129, 0,
              0.0890812, 0.919364, 0.496782, 0, 0.10126, 0.904754, 0.470571, 0,
              0.113731, 0.89176, 0.444037, 0, 0.126469, 0.881492, 0.418322, 0,
              0.139454, 0.873656, 0.393522, 0, 0.15267, 0.868053, 0.369795, 0,
              0.166101, 0.864336, 0.347171, 0, 0.179736, 0.862259, 0.325737, 0,
              0.193565, 0.861556, 0.305532, 0, 0.207578, 0.861776, 0.286416, 0,
              0.221769, 0.862661, 0.268355, 0, 0.23613, 0.864015, 0.251334, 0,
              0.250656, 0.865711, 0.235352, 0, 0.265343, 0.867519, 0.220302, 0,
              0.280187, 0.869351, 0.206161, 0, 0.295183, 0.871144, 0.192908, 0,
              0.31033, 0.872839, 0.180505, 0, 0.325624, 0.874307, 0.168848, 0,
              0.341065, 0.875667, 0.158021, 0, 0.35665, 0.876758, 0.147877, 0,
              0.37238, 0.87764, 0.138441, 0, 0.388253, 0.878237, 0.129627, 0,
              0.404269, 0.878563, 0.121415, 0, 0.42043, 0.878572, 0.113741, 0,
              0.436735, 0.87842, 0.106652, 0, 0.453187, 0.878057, 0.100097, 0,
              0.469786, 0.877413, 0.0940128, 0, 0.486536, 0.87646, 0.0883462, 0,
              0.503439, 0.875233, 0.0830924, 0, 0.520498, 0.8737, 0.0781975, 0,
              0.537717, 0.871873, 0.07364, 0, 0.555102, 0.86978, 0.0694103, 0,
              0.572657, 0.867405, 0.0654696, 0, 0.59039, 0.864751, 0.0617914, 0,
              0.608307, 0.861818, 0.0583491, 0, 0.626419, 0.858645, 0.0551443,
              0, 0.644733, 0.855307, 0.0521894, 0, 0.663264, 0.851736,
              0.0494334, 0, 0.682025, 0.847927, 0.0468504, 0, 0.701032,
              0.843888, 0.0444261, 0, 0.720308, 0.839629, 0.0421497, 0,
              0.739875, 0.835158, 0.0400082, 0, 0.759764, 0.830509, 0.0380076,
              0, 0.780014, 0.825714, 0.0361488, 0, 0.800673, 0.820729,
              0.0343956, 0, 0.821803, 0.815751, 0.0327781, 0, 0.843492,
              0.810752, 0.031275, 0, 0.86586, 0.805587, 0.0298542, 0, 0.889087,
              0.800317, 0.0285397, 0, 0.913466, 0.79489, 0.0272948, 0, 0.93952,
              0.789314, 0.0261139, 0, 0.96835, 0.783593, 0.0249938, 0, 1, 1,
              0.724258, 0, 0, 0.999992, 0.724243, 0, 726889e-9, 0.99987,
              0.724044, 0, 0.00569574, 0.999336, 0.72317, 0, 0.0131702,
              0.996271, 0.719432, 0, 0.0220738, 0.991159, 0.712576, 0,
              0.0319405, 0.982465, 0.700927, 0, 0.0425202, 0.97049, 0.684297, 0,
              0.0536599, 0.953973, 0.661244, 0, 0.065258, 0.935546, 0.633804, 0,
              0.0772427, 0.916596, 0.603071, 0, 0.0895616, 0.899353, 0.57105, 0,
              0.102175, 0.885216, 0.539206, 0, 0.11505, 0.875076, 0.508714, 0,
              0.128164, 0.868334, 0.479571, 0, 0.141495, 0.864414, 0.451796, 0,
              0.155026, 0.862678, 0.425328, 0, 0.168745, 0.862835, 0.400352, 0,
              0.182639, 0.864067, 0.376532, 0, 0.196699, 0.866086, 0.35391, 0,
              0.210915, 0.868557, 0.332424, 0, 0.225282, 0.871271, 0.312053, 0,
              0.239792, 0.874058, 0.292764, 0, 0.25444, 0.8768, 0.27453, 0,
              0.269223, 0.87939, 0.257297, 0, 0.284135, 0.8819, 0.24114, 0,
              0.299174, 0.884187, 0.225934, 0, 0.314337, 0.886262, 0.211669, 0,
              0.329622, 0.888119, 0.198311, 0, 0.345026, 0.889709, 0.185783, 0,
              0.360549, 0.891054, 0.174063, 0, 0.376189, 0.892196, 0.163143, 0,
              0.391946, 0.893101, 0.152952, 0, 0.407819, 0.893803, 0.143475, 0,
              0.423808, 0.894277, 0.134647, 0, 0.439914, 0.894532, 0.126434, 0,
              0.456137, 0.894576, 0.1188, 0, 0.472479, 0.894393, 0.111694, 0,
              0.48894, 0.893976, 0.105069, 0, 0.505523, 0.893346, 0.0989077, 0,
              0.52223, 0.892502, 0.0931724, 0, 0.539064, 0.891441, 0.0878276, 0,
              0.556028, 0.890276, 0.082903, 0, 0.573125, 0.888972, 0.0783505, 0,
              0.590361, 0.887469, 0.0741083, 0, 0.607741, 0.885785, 0.0701633,
              0, 0.62527, 0.883914, 0.0664835, 0, 0.642957, 0.881872, 0.0630567,
              0, 0.660809, 0.879651, 0.0598527, 0, 0.678836, 0.877267,
              0.0568615, 0, 0.69705, 0.874717, 0.05406, 0, 0.715465, 0.872012,
              0.0514378, 0, 0.734098, 0.869157, 0.0489805, 0, 0.752968,
              0.866155, 0.0466727, 0, 0.772101, 0.863014, 0.0445056, 0,
              0.791529, 0.859748, 0.0424733, 0, 0.81129, 0.856416, 0.0405957, 0,
              0.831438, 0.852958, 0.0388273, 0, 0.852044, 0.849382, 0.0371619,
              0, 0.87321, 0.845694, 0.0355959, 0, 0.89509, 0.841893, 0.0341155,
              0, 0.917932, 0.837981, 0.0327141, 0, 0.942204, 0.833963,
              0.0313856, 0, 0.968981, 0.829847, 0.0301275, 0, 1, 1, 0.85214, 0,
              0, 0.999969, 0.852095, 0, 0.00279627, 0.999483, 0.851408, 0,
              0.0107635, 0.994545, 0.84579, 0, 0.0206454, 0.986188, 0.835231, 0,
              0.0315756, 0.969847, 0.814687, 0, 0.0432021, 0.945951, 0.783735,
              0, 0.0553396, 0.91917, 0.746074, 0, 0.0678766, 0.895488, 0.706938,
              0, 0.0807395, 0.878232, 0.669534, 0, 0.0938767, 0.868252,
              0.635168, 0, 0.10725, 0.863873, 0.603069, 0, 0.120832, 0.863369,
              0.572514, 0, 0.134598, 0.86545, 0.543169, 0, 0.148533, 0.868803,
              0.514578, 0, 0.16262, 0.872794, 0.486762, 0, 0.176849, 0.87702,
              0.459811, 0, 0.19121, 0.881054, 0.433654, 0, 0.205694, 0.884974,
              0.408574, 0, 0.220294, 0.888587, 0.384525, 0, 0.235005, 0.891877,
              0.36156, 0, 0.24982, 0.894793, 0.339661, 0, 0.264737, 0.89743,
              0.318913, 0, 0.279751, 0.899796, 0.299302, 0, 0.294859, 0.901943,
              0.280843, 0, 0.310058, 0.903858, 0.263481, 0, 0.325346, 0.905574,
              0.247197, 0, 0.340721, 0.907069, 0.231915, 0, 0.356181, 0.908379,
              0.217614, 0, 0.371725, 0.90952, 0.20425, 0, 0.387353, 0.910483,
              0.191758, 0, 0.403063, 0.91128, 0.180092, 0, 0.418854, 0.911936,
              0.169222, 0, 0.434727, 0.912454, 0.159098, 0, 0.450682, 0.912835,
              0.149668, 0, 0.466718, 0.913078, 0.140884, 0, 0.482837, 0.913192,
              0.132709, 0, 0.499038, 0.913175, 0.125095, 0, 0.515324, 0.91304,
              0.118012, 0, 0.531695, 0.912781, 0.111417, 0, 0.548153, 0.91241,
              0.105281, 0, 0.5647, 0.911924, 0.0995691, 0, 0.581338, 0.911331,
              0.0942531, 0, 0.59807, 0.910637, 0.0893076, 0, 0.6149, 0.90984,
              0.0846998, 0, 0.63183, 0.908941, 0.0804044, 0, 0.648865, 0.907944,
              0.0763984, 0, 0.666011, 0.906857, 0.0726638, 0, 0.683273, 0.90568,
              0.0691783, 0, 0.700659, 0.904416, 0.0659222, 0, 0.718176,
              0.903067, 0.0628782, 0, 0.735834, 0.901637, 0.0600307, 0,
              0.753646, 0.900128, 0.0573647, 0, 0.771625, 0.898544, 0.0548668,
              0, 0.78979, 0.89689, 0.052527, 0, 0.808162, 0.895165, 0.0503306,
              0, 0.826771, 0.893371, 0.0482668, 0, 0.845654, 0.891572,
              0.0463605, 0, 0.864863, 0.889763, 0.0445998, 0, 0.884472,
              0.887894, 0.0429451, 0, 0.904592, 0.885967, 0.0413884, 0,
              0.925407, 0.883984, 0.0399225, 0, 0.947271, 0.881945, 0.0385405,
              0, 0.97105, 0.879854, 0.0372362, 0, 1, 0.999804, 0.995833, 0, 0,
              0.938155, 0.933611, 0, 0.0158731, 0.864755, 0.854311, 0,
              0.0317461, 0.888594, 0.865264, 0, 0.0476191, 0.905575, 0.863922,
              0, 0.0634921, 0.915125, 0.850558, 0, 0.0793651, 0.920665,
              0.829254, 0, 0.0952381, 0.924073, 0.802578, 0, 0.111111, 0.926304,
              0.772211, 0, 0.126984, 0.927829, 0.739366, 0, 0.142857, 0.928924,
              0.705033, 0, 0.15873, 0.92973, 0.670019, 0, 0.174603, 0.930339,
              0.634993, 0, 0.190476, 0.930811, 0.600485, 0, 0.206349, 0.931191,
              0.566897, 0, 0.222222, 0.93149, 0.534485, 0, 0.238095, 0.931737,
              0.503429, 0, 0.253968, 0.931939, 0.473811, 0, 0.269841, 0.932108,
              0.445668, 0, 0.285714, 0.93225, 0.418993, 0, 0.301587, 0.932371,
              0.393762, 0, 0.31746, 0.932474, 0.369939, 0, 0.333333, 0.932562,
              0.347479, 0, 0.349206, 0.932638, 0.326336, 0, 0.365079, 0.932703,
              0.306462, 0, 0.380952, 0.93276, 0.287805, 0, 0.396825, 0.932809,
              0.270313, 0, 0.412698, 0.932851, 0.253933, 0, 0.428571, 0.932887,
              0.23861, 0, 0.444444, 0.932917, 0.224289, 0, 0.460317, 0.932943,
              0.210917, 0, 0.47619, 0.932965, 0.19844, 0, 0.492063, 0.932982,
              0.186807, 0, 0.507937, 0.932995, 0.175966, 0, 0.52381, 0.933005,
              0.165869, 0, 0.539683, 0.933011, 0.156468, 0, 0.555556, 0.933013,
              0.147719, 0, 0.571429, 0.933013, 0.139579, 0, 0.587302, 0.93301,
              0.132007, 0, 0.603175, 0.933004, 0.124965, 0, 0.619048, 0.932994,
              0.118416, 0, 0.634921, 0.932982, 0.112326, 0, 0.650794, 0.932968,
              0.106663, 0, 0.666667, 0.93295, 0.101397, 0, 0.68254, 0.932931,
              0.0964993, 0, 0.698413, 0.932908, 0.0919438, 0, 0.714286,
              0.932883, 0.0877057, 0, 0.730159, 0.932856, 0.0837623, 0,
              0.746032, 0.932827, 0.0800921, 0, 0.761905, 0.932796, 0.0766754,
              0, 0.777778, 0.932762, 0.0734936, 0, 0.793651, 0.932727,
              0.0705296, 0, 0.809524, 0.932689, 0.0677676, 0, 0.825397, 0.93265,
              0.0651929, 0, 0.84127, 0.932609, 0.0627917, 0, 0.857143, 0.932565,
              0.0605515, 0, 0.873016, 0.932521, 0.0584606, 0, 0.888889,
              0.932474, 0.0565082, 0, 0.904762, 0.932427, 0.0546841, 0,
              0.920635, 0.932377, 0.0529793, 0, 0.936508, 0.932326, 0.0513851,
              0, 0.952381, 0.932274, 0.0498936, 0, 0.968254, 0.93222, 0.0484975,
              0, 0.984127, 0.932164, 0.0471899, 0, 1,
            ],
            t = new Float32Array(e),
            r = new Float32Array(A);
          (n.UniformsLib.LTC_FLOAT_1 = new n.DataTexture(
            t,
            64,
            64,
            n.RGBAFormat,
            n.FloatType,
            n.UVMapping,
            n.ClampToEdgeWrapping,
            n.ClampToEdgeWrapping,
            n.LinearFilter,
            n.NearestFilter,
            1
          )),
            (n.UniformsLib.LTC_FLOAT_2 = new n.DataTexture(
              r,
              64,
              64,
              n.RGBAFormat,
              n.FloatType,
              n.UVMapping,
              n.ClampToEdgeWrapping,
              n.ClampToEdgeWrapping,
              n.LinearFilter,
              n.NearestFilter,
              1
            )),
            (n.UniformsLib.LTC_FLOAT_1.needsUpdate = !0),
            (n.UniformsLib.LTC_FLOAT_2.needsUpdate = !0);
          const i = new Uint16Array(e.length);
          e.forEach(function (e, A) {
            i[A] = n.DataUtils.toHalfFloat(e);
          });
          const o = new Uint16Array(A.length);
          A.forEach(function (e, A) {
            o[A] = n.DataUtils.toHalfFloat(e);
          }),
            (n.UniformsLib.LTC_HALF_1 = new n.DataTexture(
              i,
              64,
              64,
              n.RGBAFormat,
              n.HalfFloatType,
              n.UVMapping,
              n.ClampToEdgeWrapping,
              n.ClampToEdgeWrapping,
              n.LinearFilter,
              n.NearestFilter,
              1
            )),
            (n.UniformsLib.LTC_HALF_2 = new n.DataTexture(
              o,
              64,
              64,
              n.RGBAFormat,
              n.HalfFloatType,
              n.UVMapping,
              n.ClampToEdgeWrapping,
              n.ClampToEdgeWrapping,
              n.LinearFilter,
              n.NearestFilter,
              1
            )),
            (n.UniformsLib.LTC_HALF_1.needsUpdate = !0),
            (n.UniformsLib.LTC_HALF_2.needsUpdate = !0);
        }
      }
    },
    6497: function (e, A, t) {
      "use strict";
      t.d(A, {
        _: function () {
          return i;
        },
      });
      var n = t(4468);
      const r = new WeakMap();
      class i extends n.Loader {
        constructor(e) {
          super(e),
            (this.decoderPath = ""),
            (this.decoderConfig = {}),
            (this.decoderBinary = null),
            (this.decoderPending = null),
            (this.workerLimit = 4),
            (this.workerPool = []),
            (this.workerNextTaskID = 1),
            (this.workerSourceURL = ""),
            (this.defaultAttributeIDs = {
              position: "POSITION",
              normal: "NORMAL",
              color: "COLOR",
              uv: "TEX_COORD",
            }),
            (this.defaultAttributeTypes = {
              position: "Float32Array",
              normal: "Float32Array",
              color: "Float32Array",
              uv: "Float32Array",
            });
        }
        setDecoderPath(e) {
          return (this.decoderPath = e), this;
        }
        setDecoderConfig(e) {
          return (this.decoderConfig = e), this;
        }
        setWorkerLimit(e) {
          return (this.workerLimit = e), this;
        }
        load(e, A, t, r) {
          const i = new n.FileLoader(this.manager);
          i.setPath(this.path),
            i.setResponseType("arraybuffer"),
            i.setRequestHeader(this.requestHeader),
            i.setWithCredentials(this.withCredentials),
            i.load(
              e,
              (e) => {
                this.parse(e, A, r);
              },
              t,
              r
            );
        }
        parse(e, A, t) {
          this.decodeDracoFile(e, A, null, null, n.SRGBColorSpace).catch(t);
        }
        decodeDracoFile(e, A, t, r, i = n.LinearSRGBColorSpace) {
          const o = {
            attributeIDs: t || this.defaultAttributeIDs,
            attributeTypes: r || this.defaultAttributeTypes,
            useUniqueIDs: !!t,
            vertexColorSpace: i,
          };
          return this.decodeGeometry(e, o).then(A);
        }
        decodeGeometry(e, A) {
          const t = JSON.stringify(A);
          if (r.has(e)) {
            const A = r.get(e);
            if (A.key === t) return A.promise;
            if (0 === e.byteLength)
              throw new Error(
                "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
              );
          }
          let n;
          const i = this.workerNextTaskID++,
            o = e.byteLength,
            s = this._getWorker(i, o)
              .then(
                (t) => (
                  (n = t),
                  new Promise((t, r) => {
                    (n._callbacks[i] = { resolve: t, reject: r }),
                      n.postMessage(
                        { type: "decode", id: i, taskConfig: A, buffer: e },
                        [e]
                      );
                  })
                )
              )
              .then((e) => this._createGeometry(e.geometry));
          return (
            s
              .catch(() => !0)
              .then(() => {
                n && i && this._releaseTask(n, i);
              }),
            r.set(e, { key: t, promise: s }),
            s
          );
        }
        _createGeometry(e) {
          const A = new n.BufferGeometry();
          e.index && A.setIndex(new n.BufferAttribute(e.index.array, 1));
          for (let t = 0; t < e.attributes.length; t++) {
            const r = e.attributes[t],
              i = r.name,
              o = r.array,
              s = r.itemSize,
              a = new n.BufferAttribute(o, s);
            "color" === i &&
              (this._assignVertexColorSpace(a, r.vertexColorSpace),
              (a.normalized = o instanceof Float32Array == 0)),
              A.setAttribute(i, a);
          }
          return A;
        }
        _assignVertexColorSpace(e, A) {
          if (A !== n.SRGBColorSpace) return;
          const t = new n.Color();
          for (let A = 0, n = e.count; A < n; A++)
            t.fromBufferAttribute(e, A).convertSRGBToLinear(),
              e.setXYZ(A, t.r, t.g, t.b);
        }
        _loadLibrary(e, A) {
          const t = new n.FileLoader(this.manager);
          return (
            t.setPath(this.decoderPath),
            t.setResponseType(A),
            t.setWithCredentials(this.withCredentials),
            new Promise((A, n) => {
              t.load(e, A, void 0, n);
            })
          );
        }
        preload() {
          return this._initDecoder(), this;
        }
        _initDecoder() {
          if (this.decoderPending) return this.decoderPending;
          const e =
              "object" != typeof WebAssembly ||
              "js" === this.decoderConfig.type,
            A = [];
          return (
            e
              ? A.push(this._loadLibrary("draco_decoder.js", "text"))
              : (A.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
                A.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
            (this.decoderPending = Promise.all(A).then((A) => {
              const t = A[0];
              e || (this.decoderConfig.wasmBinary = A[1]);
              const n = o.toString(),
                r = [
                  "/* draco decoder */",
                  t,
                  "",
                  "/* worker */",
                  n.substring(n.indexOf("{") + 1, n.lastIndexOf("}")),
                ].join("\n");
              this.workerSourceURL = URL.createObjectURL(new Blob([r]));
            })),
            this.decoderPending
          );
        }
        _getWorker(e, A) {
          return this._initDecoder().then(() => {
            if (this.workerPool.length < this.workerLimit) {
              const e = new Worker(this.workerSourceURL);
              (e._callbacks = {}),
                (e._taskCosts = {}),
                (e._taskLoad = 0),
                e.postMessage({
                  type: "init",
                  decoderConfig: this.decoderConfig,
                }),
                (e.onmessage = function (A) {
                  const t = A.data;
                  switch (t.type) {
                    case "decode":
                      e._callbacks[t.id].resolve(t);
                      break;
                    case "error":
                      e._callbacks[t.id].reject(t);
                      break;
                    default:
                      console.error(
                        'THREE.DRACOLoader: Unexpected message, "' +
                          t.type +
                          '"'
                      );
                  }
                }),
                this.workerPool.push(e);
            } else
              this.workerPool.sort(function (e, A) {
                return e._taskLoad > A._taskLoad ? -1 : 1;
              });
            const t = this.workerPool[this.workerPool.length - 1];
            return (t._taskCosts[e] = A), (t._taskLoad += A), t;
          });
        }
        _releaseTask(e, A) {
          (e._taskLoad -= e._taskCosts[A]),
            delete e._callbacks[A],
            delete e._taskCosts[A];
        }
        debug() {
          console.log(
            "Task load: ",
            this.workerPool.map((e) => e._taskLoad)
          );
        }
        dispose() {
          for (let e = 0; e < this.workerPool.length; ++e)
            this.workerPool[e].terminate();
          return (
            (this.workerPool.length = 0),
            "" !== this.workerSourceURL &&
              URL.revokeObjectURL(this.workerSourceURL),
            this
          );
        }
      }
      function o() {
        let e, A;
        function t(e, A, t, n, r, i) {
          const o = i.num_components(),
            s = t.num_points() * o,
            a = s * r.BYTES_PER_ELEMENT,
            c = (function (e, A) {
              switch (A) {
                case Float32Array:
                  return e.DT_FLOAT32;
                case Int8Array:
                  return e.DT_INT8;
                case Int16Array:
                  return e.DT_INT16;
                case Int32Array:
                  return e.DT_INT32;
                case Uint8Array:
                  return e.DT_UINT8;
                case Uint16Array:
                  return e.DT_UINT16;
                case Uint32Array:
                  return e.DT_UINT32;
              }
            })(e, r),
            h = e._malloc(a);
          A.GetAttributeDataArrayForAllPoints(t, i, c, a, h);
          const g = new r(e.HEAPF32.buffer, h, s).slice();
          return e._free(h), { name: n, array: g, itemSize: o };
        }
        onmessage = function (n) {
          const r = n.data;
          switch (r.type) {
            case "init":
              (e = r.decoderConfig),
                (A = new Promise(function (A) {
                  (e.onModuleLoaded = function (e) {
                    A({ draco: e });
                  }),
                    DracoDecoderModule(e);
                }));
              break;
            case "decode":
              const n = r.buffer,
                i = r.taskConfig;
              A.then((e) => {
                const A = e.draco,
                  o = new A.Decoder();
                try {
                  const e = (function (e, A, n, r) {
                      const i = r.attributeIDs,
                        o = r.attributeTypes;
                      let s, a;
                      const c = A.GetEncodedGeometryType(n);
                      if (c === e.TRIANGULAR_MESH)
                        (s = new e.Mesh()),
                          (a = A.DecodeArrayToMesh(n, n.byteLength, s));
                      else {
                        if (c !== e.POINT_CLOUD)
                          throw new Error(
                            "THREE.DRACOLoader: Unexpected geometry type."
                          );
                        (s = new e.PointCloud()),
                          (a = A.DecodeArrayToPointCloud(n, n.byteLength, s));
                      }
                      if (!a.ok() || 0 === s.ptr)
                        throw new Error(
                          "THREE.DRACOLoader: Decoding failed: " + a.error_msg()
                        );
                      const h = { index: null, attributes: [] };
                      for (const n in i) {
                        const a = self[o[n]];
                        let c, g;
                        if (r.useUniqueIDs)
                          (g = i[n]), (c = A.GetAttributeByUniqueId(s, g));
                        else {
                          if (((g = A.GetAttributeId(s, e[i[n]])), -1 === g))
                            continue;
                          c = A.GetAttribute(s, g);
                        }
                        const l = t(e, A, s, n, a, c);
                        "color" === n &&
                          (l.vertexColorSpace = r.vertexColorSpace),
                          h.attributes.push(l);
                      }
                      return (
                        c === e.TRIANGULAR_MESH &&
                          (h.index = (function (e, A, t) {
                            const n = 3 * t.num_faces(),
                              r = 4 * n,
                              i = e._malloc(r);
                            A.GetTrianglesUInt32Array(t, r, i);
                            const o = new Uint32Array(
                              e.HEAPF32.buffer,
                              i,
                              n
                            ).slice();
                            return e._free(i), { array: o, itemSize: 1 };
                          })(e, A, s)),
                        e.destroy(s),
                        h
                      );
                    })(A, o, new Int8Array(n), i),
                    s = e.attributes.map((e) => e.array.buffer);
                  e.index && s.push(e.index.array.buffer),
                    self.postMessage(
                      { type: "decode", id: r.id, geometry: e },
                      s
                    );
                } catch (e) {
                  console.error(e),
                    self.postMessage({
                      type: "error",
                      id: r.id,
                      error: e.message,
                    });
                } finally {
                  A.destroy(o);
                }
              });
          }
        };
      }
    },
    7651: function (e, A, t) {
      "use strict";
      t.d(A, {
        I: function () {
          return i;
        },
      });
      var n = t(4468),
        r = t(728);
      class i extends n.DataTextureLoader {
        constructor(e) {
          super(e),
            (this.type = n.HalfFloatType),
            (this.workerPool = new r.h());
          const A = i.ParserWorker.toString(),
            t = [A.substring(A.indexOf("{") + 1, A.lastIndexOf("}"))].join(
              "\n"
            );
          (this.url = URL.createObjectURL(new Blob([t]))),
            this.workerPool.setWorkerCreator(() => new Worker(this.url));
        }
        async parse(e) {
          const A = this.type;
          return this.workerPool.postMessage({ type: A, buffer: e });
        }
        setDataType(e) {
          return (this.type = e), this;
        }
        load(e, A, t, r) {
          return super.load(
            e,
            function (e, t) {
              (e.colorSpace = t.colorSpace),
                (e.minFilter = n.LinearFilter),
                (e.magFilter = n.LinearFilter),
                (e.generateMipmaps = !1),
                (e.flipY = !1),
                A && A(e, t);
            },
            t,
            r
          );
        }
        setWorkerLimit(e) {
          return this.workerPool.setWorkerLimit(e), this;
        }
        dispose() {
          this.workerPool.dispose(), this.url && URL.revokeObjectURL(this.url);
        }
      }
      i.ParserWorker = function () {
        const e = 1015,
          A = 1016,
          t = "srgb-linear",
          n = (function () {
            const e = new ArrayBuffer(4),
              A = new Float32Array(e),
              t = new Uint32Array(e),
              n = new Uint32Array(512),
              r = new Uint32Array(512);
            for (let e = 0; e < 256; ++e) {
              const A = e - 127;
              A < -27
                ? ((n[e] = 0),
                  (n[256 | e] = 32768),
                  (r[e] = 24),
                  (r[256 | e] = 24))
                : A < -14
                ? ((n[e] = 1024 >> (-A - 14)),
                  (n[256 | e] = (1024 >> (-A - 14)) | 32768),
                  (r[e] = -A - 1),
                  (r[256 | e] = -A - 1))
                : A <= 15
                ? ((n[e] = (A + 15) << 10),
                  (n[256 | e] = ((A + 15) << 10) | 32768),
                  (r[e] = 13),
                  (r[256 | e] = 13))
                : A < 128
                ? ((n[e] = 31744),
                  (n[256 | e] = 64512),
                  (r[e] = 24),
                  (r[256 | e] = 24))
                : ((n[e] = 31744),
                  (n[256 | e] = 64512),
                  (r[e] = 13),
                  (r[256 | e] = 13));
            }
            const i = new Uint32Array(2048),
              o = new Uint32Array(64),
              s = new Uint32Array(64);
            for (let e = 1; e < 1024; ++e) {
              let A = e << 13,
                t = 0;
              for (; 0 == (8388608 & A); ) (A <<= 1), (t -= 8388608);
              (A &= -8388609), (t += 947912704), (i[e] = A | t);
            }
            for (let e = 1024; e < 2048; ++e)
              i[e] = 939524096 + ((e - 1024) << 13);
            for (let e = 1; e < 31; ++e) o[e] = e << 23;
            (o[31] = 1199570944), (o[32] = 2147483648);
            for (let e = 33; e < 63; ++e) o[e] = 2147483648 + ((e - 32) << 23);
            o[63] = 3347054592;
            for (let e = 1; e < 64; ++e) 32 !== e && (s[e] = 1024);
            return {
              floatView: A,
              uint32View: t,
              baseTable: n,
              shiftTable: r,
              mantissaTable: i,
              exponentTable: o,
              offsetTable: s,
            };
          })();
        function r(e) {
          var A;
          Math.abs(e) > 65504 &&
            console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),
            (A = e),
            (e = Math.max(-65504, Math.min(65504, A))),
            (n.floatView[0] = e);
          const t = n.uint32View[0],
            r = (t >> 23) & 511;
          return n.baseTable[r] + ((8388607 & t) >> n.shiftTable[r]);
        }
        var i = function (e) {
          return URL.createObjectURL(
            new Blob([e], { type: "text/javascript" })
          );
        };
        try {
          URL.revokeObjectURL(i(""));
        } catch (e) {
          i = function (e) {
            return "data:application/javascript;charset=UTF-8," + encodeURI(e);
          };
        }
        var o = Uint8Array,
          s = Uint16Array,
          a = Uint32Array,
          c = new o([
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
            4, 5, 5, 5, 5, 0, 0, 0, 0,
          ]),
          h = new o([
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
            10, 10, 11, 11, 12, 12, 13, 13, 0, 0,
          ]),
          g = function (e, A) {
            for (var t = new s(31), n = 0; n < 31; ++n)
              t[n] = A += 1 << e[n - 1];
            var r = new a(t[30]);
            for (n = 1; n < 30; ++n)
              for (var i = t[n]; i < t[n + 1]; ++i)
                r[i] = ((i - t[n]) << 5) | n;
            return [t, r];
          },
          l = g(c, 2),
          u = l[0],
          I = l[1];
        (u[28] = 258), (I[258] = 28);
        for (var E = new s(32768), B = 0; B < 32768; ++B) {
          var C = ((43690 & B) >>> 1) | ((21845 & B) << 1);
          (C =
            ((61680 & (C = ((52428 & C) >>> 2) | ((13107 & C) << 2))) >>> 4) |
            ((3855 & C) << 4)),
            (E[B] = (((65280 & C) >>> 8) | ((255 & C) << 8)) >>> 1);
        }
        var p = new o(288);
        for (B = 0; B < 144; ++B) p[B] = 8;
        for (B = 144; B < 256; ++B) p[B] = 9;
        for (B = 256; B < 280; ++B) p[B] = 7;
        for (B = 280; B < 288; ++B) p[B] = 8;
        var f = new o(32);
        for (B = 0; B < 32; ++B) f[B] = 5;
        var d = new o(0),
          Q = "undefined" != typeof TextDecoder && new TextDecoder();
        try {
          Q.decode(d, { stream: !0 });
        } catch (e) {}
        function m(e, A) {
          return (function (e, A, t) {
            var n = e.length;
            if (!n || (t && !t.l && n < 5)) return A || new o(0);
            var r = !A || t,
              i = !t || t.i;
            t || (t = {}), A || (A = new o(3 * n));
            var l,
              I = function (e) {
                var t = A.length;
                if (e > t) {
                  var n = new o(Math.max(2 * t, e));
                  n.set(A), (A = n);
                }
              },
              B = function (e, A, t) {
                var n = (A / 8) | 0;
                return ((e[n] | (e[n + 1] << 8)) >> (7 & A)) & t;
              },
              C = function (e, A, t) {
                for (var n = e.length, r = 0, i = new s(A); r < n; ++r)
                  ++i[e[r] - 1];
                var o,
                  a = new s(A);
                for (r = 0; r < A; ++r) a[r] = (a[r - 1] + i[r - 1]) << 1;
                if (t) {
                  o = new s(1 << A);
                  var c = 15 - A;
                  for (r = 0; r < n; ++r)
                    if (e[r])
                      for (
                        var h = (r << 4) | e[r],
                          g = A - e[r],
                          l = a[e[r] - 1]++ << g,
                          u = l | ((1 << g) - 1);
                        l <= u;
                        ++l
                      )
                        o[E[l] >>> c] = h;
                } else
                  for (o = new s(n), r = 0; r < n; ++r)
                    e[r] && (o[r] = E[a[e[r] - 1]++] >>> (15 - e[r]));
                return o;
              },
              d = function (e) {
                for (var A = e[0], t = 1; t < e.length; ++t)
                  e[t] > A && (A = e[t]);
                return A;
              },
              Q = function (e, A) {
                var t = (A / 8) | 0;
                return (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16)) >> (7 & A);
              },
              m = C(p, 9, 1),
              w = C(f, 5, 1),
              y = new o([
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1,
                15,
              ]),
              x = g(h, 0),
              b = x[0],
              S = (x[1], t.f || 0),
              _ = t.p || 0,
              D = t.b || 0,
              R = t.l,
              v = t.d,
              F = t.m,
              T = t.n,
              M = 8 * n;
            do {
              if (!R) {
                t.f = S = B(e, _, 1);
                var L = B(e, _ + 1, 3);
                if (((_ += 3), !L)) {
                  var G =
                      e[(K = (((l = _) / 8) | 0) + (7 & l && 1) + 4) - 4] |
                      (e[K - 3] << 8),
                    U = K + G;
                  if (U > n) {
                    if (i) throw "unexpected EOF";
                    break;
                  }
                  r && I(D + G),
                    A.set(e.subarray(K, U), D),
                    (t.b = D += G),
                    (t.p = _ = 8 * U);
                  continue;
                }
                if (1 == L) (R = m), (v = w), (F = 9), (T = 5);
                else {
                  if (2 != L) throw "invalid block type";
                  var k = B(e, _, 31) + 257,
                    N = B(e, _ + 10, 15) + 4,
                    P = k + B(e, _ + 5, 31) + 1;
                  _ += 14;
                  for (var O = new o(P), H = new o(19), q = 0; q < N; ++q)
                    H[y[q]] = B(e, _ + 3 * q, 7);
                  _ += 3 * N;
                  var Y = d(H),
                    j = (1 << Y) - 1,
                    J = C(H, Y, 1);
                  for (q = 0; q < P; ) {
                    var K,
                      V = J[B(e, _, j)];
                    if (((_ += 15 & V), (K = V >>> 4) < 16)) O[q++] = K;
                    else {
                      var X = 0,
                        W = 0;
                      for (
                        16 == K
                          ? ((W = 3 + B(e, _, 3)), (_ += 2), (X = O[q - 1]))
                          : 17 == K
                          ? ((W = 3 + B(e, _, 7)), (_ += 3))
                          : 18 == K && ((W = 11 + B(e, _, 127)), (_ += 7));
                        W--;

                      )
                        O[q++] = X;
                    }
                  }
                  var z = O.subarray(0, k),
                    Z = O.subarray(k);
                  (F = d(z)), (T = d(Z)), (R = C(z, F, 1)), (v = C(Z, T, 1));
                }
                if (_ > M) {
                  if (i) throw "unexpected EOF";
                  break;
                }
              }
              r && I(D + 131072);
              for (var $ = (1 << F) - 1, ee = (1 << T) - 1, Ae = _; ; Ae = _) {
                var te = (X = R[Q(e, _) & $]) >>> 4;
                if ((_ += 15 & X) > M) {
                  if (i) throw "unexpected EOF";
                  break;
                }
                if (!X) throw "invalid length/literal";
                if (te < 256) A[D++] = te;
                else {
                  if (256 == te) {
                    (Ae = _), (R = null);
                    break;
                  }
                  var ne = te - 254;
                  te > 264 &&
                    ((ne = B(e, _, (1 << (oe = c[(q = te - 257)])) - 1) + u[q]),
                    (_ += oe));
                  var re = v[Q(e, _) & ee],
                    ie = re >>> 4;
                  if (!re) throw "invalid distance";
                  if (((_ += 15 & re), (Z = b[ie]), ie > 3)) {
                    var oe = h[ie];
                    (Z += Q(e, _) & ((1 << oe) - 1)), (_ += oe);
                  }
                  if (_ > M) {
                    if (i) throw "unexpected EOF";
                    break;
                  }
                  r && I(D + 131072);
                  for (var se = D + ne; D < se; D += 4)
                    (A[D] = A[D - Z]),
                      (A[D + 1] = A[D + 1 - Z]),
                      (A[D + 2] = A[D + 2 - Z]),
                      (A[D + 3] = A[D + 3 - Z]);
                  D = se;
                }
              }
              (t.l = R),
                (t.p = Ae),
                (t.b = D),
                R && ((S = 1), (t.m = F), (t.d = v), (t.n = T));
            } while (!S);
            return D == A.length
              ? A
              : (function (e, A, t) {
                  (null == A || A < 0) && (A = 0),
                    (null == t || t > e.length) && (t = e.length);
                  var n = new (e instanceof s ? s : e instanceof a ? a : o)(
                    t - A
                  );
                  return n.set(e.subarray(A, t)), n;
                })(A, 0, D);
          })(
            ((function (e) {
              if (
                8 != (15 & e[0]) ||
                e[0] >>> 4 > 7 ||
                ((e[0] << 8) | e[1]) % 31
              )
                throw "invalid zlib data";
              if (32 & e[1])
                throw "invalid zlib data: preset dictionaries not supported";
            })(e),
            e.subarray(2, -4)),
            A
          );
        }
        self.onmessage = function (n) {
          const i = n.data.type,
            o = n.data.buffer,
            s = 65536,
            a = 14,
            c = 65537,
            h = 1 << a,
            g = h - 1,
            l = 32768,
            u = 65535,
            I = 59,
            E = 63,
            B = 2 + E - I,
            C = 4,
            p = 4,
            f = 2,
            d = 1,
            Q = Math.pow(2.7182818, 2.2),
            w = { l: 0, c: 0, lc: 0 };
          function y(e, A, t, n, r) {
            for (; t < e; ) (A = (A << 8) | re(n, r)), (t += 8);
            (t -= e), (w.l = (A >> t) & ((1 << e) - 1)), (w.c = A), (w.lc = t);
          }
          const x = new Array(59);
          function b(e, A, t, n, r, i) {
            const o = A;
            let s = 0,
              a = 0;
            for (; n <= r; n++) {
              if (o.value - A.value > t) return !1;
              y(6, s, a, e, o);
              const c = w.l;
              if (((s = w.c), (a = w.lc), (i[n] = c), c == E)) {
                if (o.value - A.value > t)
                  throw new Error("Something wrong with hufUnpackEncTable");
                y(8, s, a, e, o);
                let c = w.l + B;
                if (((s = w.c), (a = w.lc), n + c > r + 1))
                  throw new Error("Something wrong with hufUnpackEncTable");
                for (; c--; ) i[n++] = 0;
                n--;
              } else if (c >= I) {
                let e = c - I + 2;
                if (n + e > r + 1)
                  throw new Error("Something wrong with hufUnpackEncTable");
                for (; e--; ) i[n++] = 0;
                n--;
              }
            }
            !(function (e) {
              for (let e = 0; e <= 58; ++e) x[e] = 0;
              for (let A = 0; A < c; ++A) x[e[A]] += 1;
              let A = 0;
              for (let e = 58; e > 0; --e) {
                const t = (A + x[e]) >> 1;
                (x[e] = A), (A = t);
              }
              for (let A = 0; A < c; ++A) {
                const t = e[A];
                t > 0 && (e[A] = t | (x[t]++ << 6));
              }
            })(i);
          }
          function S(e) {
            return 63 & e;
          }
          function _(e) {
            return e >> 6;
          }
          const D = { c: 0, lc: 0 };
          function R(e, A, t, n) {
            (e = (e << 8) | re(t, n)), (A += 8), (D.c = e), (D.lc = A);
          }
          const v = { c: 0, lc: 0 };
          function F(e, A, t, n, r, i, o, s, a) {
            if (e == A) {
              n < 8 && (R(t, n, r, i), (t = D.c), (n = D.lc));
              let e = t >> (n -= 8);
              if (((e = new Uint8Array([e])[0]), s.value + e > a)) return !1;
              const A = o[s.value - 1];
              for (; e-- > 0; ) o[s.value++] = A;
            } else {
              if (!(s.value < a)) return !1;
              o[s.value++] = e;
            }
            (v.c = t), (v.lc = n);
          }
          function T(e) {
            return 65535 & e;
          }
          function M(e) {
            const A = T(e);
            return A > 32767 ? A - 65536 : A;
          }
          const L = { a: 0, b: 0 };
          function G(e, A) {
            const t = M(e),
              n = M(A),
              r = t + (1 & n) + (n >> 1),
              i = r,
              o = r - n;
            (L.a = i), (L.b = o);
          }
          function U(e, A) {
            const t = T(e),
              n = T(A),
              r = (t - (n >> 1)) & u,
              i = (n + r - l) & u;
            (L.a = i), (L.b = r);
          }
          function k(e, A, t, n, r, i, o) {
            const s = o < 16384,
              a = t > r ? r : t;
            let c,
              h,
              g = 1;
            for (; g <= a; ) g <<= 1;
            for (g >>= 1, c = g, g >>= 1; g >= 1; ) {
              h = 0;
              const o = h + i * (r - c),
                a = i * g,
                l = i * c,
                u = n * g,
                I = n * c;
              let E, B, C, p;
              for (; h <= o; h += l) {
                let r = h;
                const i = h + n * (t - c);
                for (; r <= i; r += I) {
                  const t = r + u,
                    n = r + a,
                    i = n + u;
                  s
                    ? (G(e[r + A], e[n + A]),
                      (E = L.a),
                      (C = L.b),
                      G(e[t + A], e[i + A]),
                      (B = L.a),
                      (p = L.b),
                      G(E, B),
                      (e[r + A] = L.a),
                      (e[t + A] = L.b),
                      G(C, p),
                      (e[n + A] = L.a),
                      (e[i + A] = L.b))
                    : (U(e[r + A], e[n + A]),
                      (E = L.a),
                      (C = L.b),
                      U(e[t + A], e[i + A]),
                      (B = L.a),
                      (p = L.b),
                      U(E, B),
                      (e[r + A] = L.a),
                      (e[t + A] = L.b),
                      U(C, p),
                      (e[n + A] = L.a),
                      (e[i + A] = L.b));
                }
                if (t & g) {
                  const t = r + a;
                  s ? G(e[r + A], e[t + A]) : U(e[r + A], e[t + A]),
                    (E = L.a),
                    (e[t + A] = L.b),
                    (e[r + A] = E);
                }
              }
              if (r & g) {
                let r = h;
                const i = h + n * (t - c);
                for (; r <= i; r += I) {
                  const t = r + u;
                  s ? G(e[r + A], e[t + A]) : U(e[r + A], e[t + A]),
                    (E = L.a),
                    (e[t + A] = L.b),
                    (e[r + A] = E);
                }
              }
              (c = g), (g >>= 1);
            }
            return h;
          }
          function N(e, A, t, n, r, i) {
            const o = t.value,
              s = ne(A, t),
              l = ne(A, t);
            t.value += 4;
            const u = ne(A, t);
            if (((t.value += 4), s < 0 || s >= c || l < 0 || l >= c))
              throw new Error("Something wrong with HUF_ENCSIZE");
            const I = new Array(c),
              E = new Array(h);
            if (
              ((function (e) {
                for (let A = 0; A < h; A++)
                  (e[A] = {}), (e[A].len = 0), (e[A].lit = 0), (e[A].p = null);
              })(E),
              b(e, t, n - (t.value - o), s, l, I),
              u > 8 * (n - (t.value - o)))
            )
              throw new Error("Something wrong with hufUncompress");
            !(function (e, A, t, n) {
              for (; A <= t; A++) {
                const t = _(e[A]),
                  r = S(e[A]);
                if (t >> r) throw new Error("Invalid table entry");
                if (r > a) {
                  const e = n[t >> (r - a)];
                  if (e.len) throw new Error("Invalid table entry");
                  if ((e.lit++, e.p)) {
                    const A = e.p;
                    e.p = new Array(e.lit);
                    for (let t = 0; t < e.lit - 1; ++t) e.p[t] = A[t];
                  } else e.p = new Array(1);
                  e.p[e.lit - 1] = A;
                } else if (r) {
                  let e = 0;
                  for (let i = 1 << (a - r); i > 0; i--) {
                    const i = n[(t << (a - r)) + e];
                    if (i.len || i.p) throw new Error("Invalid table entry");
                    (i.len = r), (i.lit = A), e++;
                  }
                }
              }
            })(I, s, l, E),
              (function (e, A, t, n, r, i, o, s, c) {
                let h = 0,
                  l = 0;
                const u = o,
                  I = Math.trunc(n.value + (r + 7) / 8);
                for (; n.value < I; )
                  for (R(h, l, t, n), h = D.c, l = D.lc; l >= a; ) {
                    const r = A[(h >> (l - a)) & g];
                    if (r.len)
                      (l -= r.len),
                        F(r.lit, i, h, l, t, n, s, c, u),
                        (h = v.c),
                        (l = v.lc);
                    else {
                      if (!r.p) throw new Error("hufDecode issues");
                      let A;
                      for (A = 0; A < r.lit; A++) {
                        const o = S(e[r.p[A]]);
                        for (; l < o && n.value < I; )
                          R(h, l, t, n), (h = D.c), (l = D.lc);
                        if (
                          l >= o &&
                          _(e[r.p[A]]) == ((h >> (l - o)) & ((1 << o) - 1))
                        ) {
                          (l -= o),
                            F(r.p[A], i, h, l, t, n, s, c, u),
                            (h = v.c),
                            (l = v.lc);
                          break;
                        }
                      }
                      if (A == r.lit) throw new Error("hufDecode issues");
                    }
                  }
                const E = (8 - r) & 7;
                for (h >>= E, l -= E; l > 0; ) {
                  const e = A[(h << (a - l)) & g];
                  if (!e.len) throw new Error("hufDecode issues");
                  (l -= e.len),
                    F(e.lit, i, h, l, t, n, s, c, u),
                    (h = v.c),
                    (l = v.lc);
                }
              })(I, E, e, t, u, l, i, r, { value: 0 });
          }
          function P(e) {
            for (let A = 1; A < e.length; A++) {
              const t = e[A - 1] + e[A] - 128;
              e[A] = t;
            }
          }
          function O(e, A) {
            let t = 0,
              n = Math.floor((e.length + 1) / 2),
              r = 0;
            const i = e.length - 1;
            for (; !(r > i || ((A[r++] = e[t++]), r > i)); ) A[r++] = e[n++];
          }
          function H(e) {
            let A = e.byteLength;
            const t = new Array();
            let n = 0;
            const r = new DataView(e);
            for (; A > 0; ) {
              const e = r.getInt8(n++);
              if (e < 0) {
                const i = -e;
                A -= i + 1;
                for (let e = 0; e < i; e++) t.push(r.getUint8(n++));
              } else {
                const i = e;
                A -= 2;
                const o = r.getUint8(n++);
                for (let e = 0; e < i + 1; e++) t.push(o);
              }
            }
            return t;
          }
          function q(e, A, t) {
            let n,
              r = 1;
            for (; r < 64; )
              (n = A[e.value]),
                65280 == n
                  ? (r = 64)
                  : n >> 8 == 255
                  ? (r += 255 & n)
                  : ((t[r] = n), r++),
                e.value++;
          }
          function Y(e, A) {
            (A[0] = ce(e[0])),
              (A[1] = ce(e[1])),
              (A[2] = ce(e[5])),
              (A[3] = ce(e[6])),
              (A[4] = ce(e[14])),
              (A[5] = ce(e[15])),
              (A[6] = ce(e[27])),
              (A[7] = ce(e[28])),
              (A[8] = ce(e[2])),
              (A[9] = ce(e[4])),
              (A[10] = ce(e[7])),
              (A[11] = ce(e[13])),
              (A[12] = ce(e[16])),
              (A[13] = ce(e[26])),
              (A[14] = ce(e[29])),
              (A[15] = ce(e[42])),
              (A[16] = ce(e[3])),
              (A[17] = ce(e[8])),
              (A[18] = ce(e[12])),
              (A[19] = ce(e[17])),
              (A[20] = ce(e[25])),
              (A[21] = ce(e[30])),
              (A[22] = ce(e[41])),
              (A[23] = ce(e[43])),
              (A[24] = ce(e[9])),
              (A[25] = ce(e[11])),
              (A[26] = ce(e[18])),
              (A[27] = ce(e[24])),
              (A[28] = ce(e[31])),
              (A[29] = ce(e[40])),
              (A[30] = ce(e[44])),
              (A[31] = ce(e[53])),
              (A[32] = ce(e[10])),
              (A[33] = ce(e[19])),
              (A[34] = ce(e[23])),
              (A[35] = ce(e[32])),
              (A[36] = ce(e[39])),
              (A[37] = ce(e[45])),
              (A[38] = ce(e[52])),
              (A[39] = ce(e[54])),
              (A[40] = ce(e[20])),
              (A[41] = ce(e[22])),
              (A[42] = ce(e[33])),
              (A[43] = ce(e[38])),
              (A[44] = ce(e[46])),
              (A[45] = ce(e[51])),
              (A[46] = ce(e[55])),
              (A[47] = ce(e[60])),
              (A[48] = ce(e[21])),
              (A[49] = ce(e[34])),
              (A[50] = ce(e[37])),
              (A[51] = ce(e[47])),
              (A[52] = ce(e[50])),
              (A[53] = ce(e[56])),
              (A[54] = ce(e[59])),
              (A[55] = ce(e[61])),
              (A[56] = ce(e[35])),
              (A[57] = ce(e[36])),
              (A[58] = ce(e[48])),
              (A[59] = ce(e[49])),
              (A[60] = ce(e[57])),
              (A[61] = ce(e[58])),
              (A[62] = ce(e[62])),
              (A[63] = ce(e[63]));
          }
          function j(e) {
            const A = 0.5 * Math.cos(0.7853975),
              t = 0.5 * Math.cos(3.14159 / 16),
              n = 0.5 * Math.cos(3.14159 / 8),
              r = 0.5 * Math.cos((3 * 3.14159) / 16),
              i = 0.5 * Math.cos(0.981746875),
              o = 0.5 * Math.cos((3 * 3.14159) / 8),
              s = 0.5 * Math.cos(1.374445625),
              a = new Array(4),
              c = new Array(4),
              h = new Array(4),
              g = new Array(4);
            for (let l = 0; l < 8; ++l) {
              const u = 8 * l;
              (a[0] = n * e[u + 2]),
                (a[1] = o * e[u + 2]),
                (a[2] = n * e[u + 6]),
                (a[3] = o * e[u + 6]),
                (c[0] =
                  t * e[u + 1] + r * e[u + 3] + i * e[u + 5] + s * e[u + 7]),
                (c[1] =
                  r * e[u + 1] - s * e[u + 3] - t * e[u + 5] - i * e[u + 7]),
                (c[2] =
                  i * e[u + 1] - t * e[u + 3] + s * e[u + 5] + r * e[u + 7]),
                (c[3] =
                  s * e[u + 1] - i * e[u + 3] + r * e[u + 5] - t * e[u + 7]),
                (h[0] = A * (e[u + 0] + e[u + 4])),
                (h[3] = A * (e[u + 0] - e[u + 4])),
                (h[1] = a[0] + a[3]),
                (h[2] = a[1] - a[2]),
                (g[0] = h[0] + h[1]),
                (g[1] = h[3] + h[2]),
                (g[2] = h[3] - h[2]),
                (g[3] = h[0] - h[1]),
                (e[u + 0] = g[0] + c[0]),
                (e[u + 1] = g[1] + c[1]),
                (e[u + 2] = g[2] + c[2]),
                (e[u + 3] = g[3] + c[3]),
                (e[u + 4] = g[3] - c[3]),
                (e[u + 5] = g[2] - c[2]),
                (e[u + 6] = g[1] - c[1]),
                (e[u + 7] = g[0] - c[0]);
            }
            for (let l = 0; l < 8; ++l)
              (a[0] = n * e[16 + l]),
                (a[1] = o * e[16 + l]),
                (a[2] = n * e[48 + l]),
                (a[3] = o * e[48 + l]),
                (c[0] =
                  t * e[8 + l] + r * e[24 + l] + i * e[40 + l] + s * e[56 + l]),
                (c[1] =
                  r * e[8 + l] - s * e[24 + l] - t * e[40 + l] - i * e[56 + l]),
                (c[2] =
                  i * e[8 + l] - t * e[24 + l] + s * e[40 + l] + r * e[56 + l]),
                (c[3] =
                  s * e[8 + l] - i * e[24 + l] + r * e[40 + l] - t * e[56 + l]),
                (h[0] = A * (e[l] + e[32 + l])),
                (h[3] = A * (e[l] - e[32 + l])),
                (h[1] = a[0] + a[3]),
                (h[2] = a[1] - a[2]),
                (g[0] = h[0] + h[1]),
                (g[1] = h[3] + h[2]),
                (g[2] = h[3] - h[2]),
                (g[3] = h[0] - h[1]),
                (e[0 + l] = g[0] + c[0]),
                (e[8 + l] = g[1] + c[1]),
                (e[16 + l] = g[2] + c[2]),
                (e[24 + l] = g[3] + c[3]),
                (e[32 + l] = g[3] - c[3]),
                (e[40 + l] = g[2] - c[2]),
                (e[48 + l] = g[1] - c[1]),
                (e[56 + l] = g[0] - c[0]);
          }
          function J(e) {
            for (let A = 0; A < 64; ++A) {
              const t = e[0][A],
                n = e[1][A],
                r = e[2][A];
              (e[0][A] = t + 1.5747 * r),
                (e[1][A] = t - 0.1873 * n - 0.4682 * r),
                (e[2][A] = t + 1.8556 * n);
            }
          }
          function K(e, A, t) {
            for (let n = 0; n < 64; ++n) A[t + n] = r(V(e[n]));
          }
          function V(e) {
            return e <= 1
              ? Math.sign(e) * Math.pow(Math.abs(e), 2.2)
              : Math.sign(e) * Math.pow(Q, Math.abs(e) - 1);
          }
          function X(e) {
            return new DataView(e.array.buffer, e.offset.value, e.size);
          }
          function W(e) {
            const A = e.viewer.buffer.slice(
                e.offset.value,
                e.offset.value + e.size
              ),
              t = new Uint8Array(H(A)),
              n = new Uint8Array(t.length);
            return P(t), O(t, n), new DataView(n.buffer);
          }
          function z(e) {
            const A = m(e.array.slice(e.offset.value, e.offset.value + e.size)),
              t = new Uint8Array(A.length);
            return P(A), O(A, t), new DataView(t.buffer);
          }
          function Z(e) {
            const A = e.viewer,
              t = { value: e.offset.value },
              n = new Uint16Array(
                e.width * e.scanlineBlockSize * (e.channels * e.type)
              ),
              r = new Uint8Array(8192);
            let i = 0;
            const o = new Array(e.channels);
            for (let A = 0; A < e.channels; A++)
              (o[A] = {}),
                (o[A].start = i),
                (o[A].end = o[A].start),
                (o[A].nx = e.width),
                (o[A].ny = e.lines),
                (o[A].size = e.type),
                (i += o[A].nx * o[A].ny * o[A].size);
            const a = he(A, t),
              c = he(A, t);
            if (c >= 8192)
              throw new Error(
                "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE"
              );
            if (a <= c) for (let e = 0; e < c - a + 1; e++) r[e + a] = ie(A, t);
            const h = new Uint16Array(s),
              g = (function (e, A) {
                let t = 0;
                for (let n = 0; n < s; ++n)
                  (0 == n || e[n >> 3] & (1 << (7 & n))) && (A[t++] = n);
                const n = t - 1;
                for (; t < s; ) A[t++] = 0;
                return n;
              })(r, h),
              l = ne(A, t);
            N(e.array, A, t, l, n, i);
            for (let A = 0; A < e.channels; ++A) {
              const e = o[A];
              for (let t = 0; t < o[A].size; ++t)
                k(n, e.start + t, e.nx, e.size, e.ny, e.nx * e.size, g);
            }
            !(function (e, A, t) {
              for (let n = 0; n < t; ++n) A[n] = e[A[n]];
            })(h, n, i);
            let u = 0;
            const I = new Uint8Array(n.buffer.byteLength);
            for (let A = 0; A < e.lines; A++)
              for (let A = 0; A < e.channels; A++) {
                const e = o[A],
                  t = e.nx * e.size,
                  r = new Uint8Array(n.buffer, e.end * f, t * f);
                I.set(r, u), (u += t * f), (e.end += t);
              }
            return new DataView(I.buffer);
          }
          function $(e) {
            const A = m(e.array.slice(e.offset.value, e.offset.value + e.size)),
              t = e.lines * e.channels * e.width,
              n = 1 == e.type ? new Uint16Array(t) : new Uint32Array(t);
            let r = 0,
              i = 0;
            const o = new Array(4);
            for (let t = 0; t < e.lines; t++)
              for (let t = 0; t < e.channels; t++) {
                let t = 0;
                switch (e.type) {
                  case 1:
                    (o[0] = r), (o[1] = o[0] + e.width), (r = o[1] + e.width);
                    for (let r = 0; r < e.width; ++r)
                      (t += (A[o[0]++] << 8) | A[o[1]++]), (n[i] = t), i++;
                    break;
                  case 2:
                    (o[0] = r),
                      (o[1] = o[0] + e.width),
                      (o[2] = o[1] + e.width),
                      (r = o[2] + e.width);
                    for (let r = 0; r < e.width; ++r)
                      (t +=
                        (A[o[0]++] << 24) |
                        (A[o[1]++] << 16) |
                        (A[o[2]++] << 8)),
                        (n[i] = t),
                        i++;
                }
              }
            return new DataView(n.buffer);
          }
          function ee(e) {
            const A = e.viewer,
              t = { value: e.offset.value },
              n = new Uint8Array(e.width * e.lines * (e.channels * e.type * f)),
              r = {
                version: oe(A, t),
                unknownUncompressedSize: oe(A, t),
                unknownCompressedSize: oe(A, t),
                acCompressedSize: oe(A, t),
                dcCompressedSize: oe(A, t),
                rleCompressedSize: oe(A, t),
                rleUncompressedSize: oe(A, t),
                rleRawSize: oe(A, t),
                totalAcUncompressedCount: oe(A, t),
                totalDcUncompressedCount: oe(A, t),
                acCompression: oe(A, t),
              };
            if (r.version < 2)
              throw new Error(
                "EXRLoader.parse: " +
                  Be.compression +
                  " version " +
                  r.version +
                  " is unsupported"
              );
            const i = new Array();
            let o = he(A, t) - f;
            for (; o > 0; ) {
              const e = Ae(A.buffer, t),
                n = ie(A, t),
                r = (n >> 2) & 3,
                s = new Int8Array([(n >> 4) - 1])[0],
                a = ie(A, t);
              i.push({ name: e, index: s, type: a, compression: r }),
                (o -= e.length + 3);
            }
            const s = Be.channels,
              a = new Array(e.channels);
            for (let A = 0; A < e.channels; ++A) {
              const t = (a[A] = {}),
                n = s[A];
              (t.name = n.name),
                (t.compression = 0),
                (t.decoded = !1),
                (t.type = n.pixelType),
                (t.pLinear = n.pLinear),
                (t.width = e.width),
                (t.height = e.lines);
            }
            const c = { idx: new Array(3) };
            for (let A = 0; A < e.channels; ++A) {
              const e = a[A];
              for (let t = 0; t < i.length; ++t) {
                const n = i[t];
                e.name == n.name &&
                  ((e.compression = n.compression),
                  n.index >= 0 && (c.idx[n.index] = A),
                  (e.offset = A));
              }
            }
            let h, g, l;
            if (r.acCompressedSize > 0)
              switch (r.acCompression) {
                case 0:
                  (h = new Uint16Array(r.totalAcUncompressedCount)),
                    N(
                      e.array,
                      A,
                      t,
                      r.acCompressedSize,
                      h,
                      r.totalAcUncompressedCount
                    );
                  break;
                case 1:
                  const n = m(
                    e.array.slice(t.value, t.value + r.totalAcUncompressedCount)
                  );
                  (h = new Uint16Array(n.buffer)),
                    (t.value += r.totalAcUncompressedCount);
              }
            if (r.dcCompressedSize > 0) {
              const A = { array: e.array, offset: t, size: r.dcCompressedSize };
              (g = new Uint16Array(z(A).buffer)),
                (t.value += r.dcCompressedSize);
            }
            r.rleRawSize > 0 &&
              ((l = H(
                m(e.array.slice(t.value, t.value + r.rleCompressedSize)).buffer
              )),
              (t.value += r.rleCompressedSize));
            let u = 0;
            const I = new Array(a.length);
            for (let e = 0; e < I.length; ++e) I[e] = new Array();
            for (let A = 0; A < e.lines; ++A)
              for (let A = 0; A < a.length; ++A)
                I[A].push(u), (u += a[A].width * e.type * f);
            !(function (e, A, t, n, r, i) {
              let o = new DataView(i.buffer);
              const s = t[e.idx[0]].width,
                a = t[e.idx[0]].height,
                c = Math.floor(s / 8),
                h = Math.ceil(s / 8),
                g = Math.ceil(a / 8),
                l = s - 8 * (h - 1),
                u = a - 8 * (g - 1),
                I = { value: 0 },
                E = new Array(3),
                B = new Array(3),
                C = new Array(3),
                p = new Array(3),
                d = new Array(3);
              for (let t = 0; t < 3; ++t)
                (d[t] = A[e.idx[t]]),
                  (E[t] = t < 1 ? 0 : E[t - 1] + h * g),
                  (B[t] = new Float32Array(64)),
                  (C[t] = new Uint16Array(64)),
                  (p[t] = new Uint16Array(64 * h));
              for (let A = 0; A < g; ++A) {
                let i = 8;
                A == g - 1 && (i = u);
                let s = 8;
                for (let e = 0; e < h; ++e) {
                  e == h - 1 && (s = l);
                  for (let e = 0; e < 3; ++e)
                    C[e].fill(0),
                      (C[e][0] = r[E[e]++]),
                      q(I, n, C[e]),
                      Y(C[e], B[e]),
                      j(B[e]);
                  J(B);
                  for (let A = 0; A < 3; ++A) K(B[A], p[A], 64 * e);
                }
                let a = 0;
                for (let n = 0; n < 3; ++n) {
                  const r = t[e.idx[n]].type;
                  for (let e = 8 * A; e < 8 * A + i; ++e) {
                    a = d[n][e];
                    for (let A = 0; A < c; ++A) {
                      const t = 64 * A + 8 * (7 & e);
                      o.setUint16(a + 0 * f * r, p[n][t + 0], !0),
                        o.setUint16(a + 1 * f * r, p[n][t + 1], !0),
                        o.setUint16(a + 2 * f * r, p[n][t + 2], !0),
                        o.setUint16(a + 3 * f * r, p[n][t + 3], !0),
                        o.setUint16(a + 4 * f * r, p[n][t + 4], !0),
                        o.setUint16(a + 5 * f * r, p[n][t + 5], !0),
                        o.setUint16(a + 6 * f * r, p[n][t + 6], !0),
                        o.setUint16(a + 7 * f * r, p[n][t + 7], !0),
                        (a += 8 * f * r);
                    }
                  }
                  if (c != h)
                    for (let e = 8 * A; e < 8 * A + i; ++e) {
                      const A = d[n][e] + 8 * c * f * r,
                        t = 64 * c + 8 * (7 & e);
                      for (let e = 0; e < s; ++e)
                        o.setUint16(A + e * f * r, p[n][t + e], !0);
                    }
                }
              }
              const Q = new Uint16Array(s);
              o = new DataView(i.buffer);
              for (let A = 0; A < 3; ++A) {
                t[e.idx[A]].decoded = !0;
                const n = t[e.idx[A]].type;
                if (2 == t[A].type)
                  for (let e = 0; e < a; ++e) {
                    const t = d[A][e];
                    for (let e = 0; e < s; ++e)
                      Q[e] = o.getUint16(t + e * f * n, !0);
                    for (let e = 0; e < s; ++e)
                      o.setFloat32(t + e * f * n, ce(Q[e]), !0);
                  }
              }
            })(c, I, a, h, g, n);
            for (let A = 0; A < a.length; ++A) {
              const t = a[A];
              if (!t.decoded) {
                if (2 !== t.compression)
                  throw new Error(
                    "EXRLoader.parse: unsupported channel compression"
                  );
                {
                  let r = 0,
                    i = 0;
                  for (let o = 0; o < e.lines; ++o) {
                    let e = I[A][r];
                    for (let A = 0; A < t.width; ++A) {
                      for (let A = 0; A < f * t.type; ++A)
                        n[e++] = l[i + A * t.width * t.height];
                      i++;
                    }
                    r++;
                  }
                }
              }
            }
            return new DataView(n.buffer);
          }
          function Ae(e, A) {
            const t = new Uint8Array(e);
            let n = 0;
            for (; 0 != t[A.value + n]; ) n += 1;
            const r = new TextDecoder().decode(t.slice(A.value, A.value + n));
            return (A.value = A.value + n + 1), r;
          }
          function te(e, A) {
            const t = e.getInt32(A.value, !0);
            return (A.value = A.value + p), t;
          }
          function ne(e, A) {
            const t = e.getUint32(A.value, !0);
            return (A.value = A.value + p), t;
          }
          function re(e, A) {
            const t = e[A.value];
            return (A.value = A.value + d), t;
          }
          function ie(e, A) {
            const t = e.getUint8(A.value);
            return (A.value = A.value + d), t;
          }
          const oe = function (e, A) {
            let t;
            return (
              (t =
                "getBigInt64" in DataView.prototype
                  ? Number(e.getBigInt64(A.value, !0))
                  : e.getUint32(A.value + 4, !0) +
                    Number(e.getUint32(A.value, !0) << 32)),
              (A.value += 8),
              t
            );
          };
          function se(e, A) {
            const t = e.getFloat32(A.value, !0);
            return (A.value += C), t;
          }
          function ae(e, A) {
            return r(se(e, A));
          }
          function ce(e) {
            const A = (31744 & e) >> 10,
              t = 1023 & e;
            return (
              (e >> 15 ? -1 : 1) *
              (A
                ? 31 === A
                  ? t
                    ? NaN
                    : 1 / 0
                  : Math.pow(2, A - 15) * (1 + t / 1024)
                : (t / 1024) * 6103515625e-14)
            );
          }
          function he(e, A) {
            const t = e.getUint16(A.value, !0);
            return (A.value += f), t;
          }
          function ge(e, A) {
            return ce(he(e, A));
          }
          function le(e, A, t, n, r) {
            return "string" === n || "stringvector" === n || "iccProfile" === n
              ? (function (e, A, t) {
                  const n = new TextDecoder().decode(
                    new Uint8Array(e).slice(A.value, A.value + t)
                  );
                  return (A.value = A.value + t), n;
                })(A, t, r)
              : "chlist" === n
              ? (function (e, A, t, n) {
                  const r = t.value,
                    i = [];
                  for (; t.value < r + n - 1; ) {
                    const n = Ae(A, t),
                      r = te(e, t),
                      o = ie(e, t);
                    t.value += 3;
                    const s = te(e, t),
                      a = te(e, t);
                    i.push({
                      name: n,
                      pixelType: r,
                      pLinear: o,
                      xSampling: s,
                      ySampling: a,
                    });
                  }
                  return (t.value += 1), i;
                })(e, A, t, r)
              : "chromaticities" === n
              ? (function (e, A) {
                  return {
                    redX: se(e, A),
                    redY: se(e, A),
                    greenX: se(e, A),
                    greenY: se(e, A),
                    blueX: se(e, A),
                    blueY: se(e, A),
                    whiteX: se(e, A),
                    whiteY: se(e, A),
                  };
                })(e, t)
              : "compression" === n
              ? (function (e, A) {
                  return [
                    "NO_COMPRESSION",
                    "RLE_COMPRESSION",
                    "ZIPS_COMPRESSION",
                    "ZIP_COMPRESSION",
                    "PIZ_COMPRESSION",
                    "PXR24_COMPRESSION",
                    "B44_COMPRESSION",
                    "B44A_COMPRESSION",
                    "DWAA_COMPRESSION",
                    "DWAB_COMPRESSION",
                  ][ie(e, A)];
                })(e, t)
              : "box2i" === n
              ? (function (e, A) {
                  return {
                    xMin: ne(e, A),
                    yMin: ne(e, A),
                    xMax: ne(e, A),
                    yMax: ne(e, A),
                  };
                })(e, t)
              : "lineOrder" === n
              ? (function (e, A) {
                  return ["INCREASING_Y"][ie(e, A)];
                })(e, t)
              : "float" === n
              ? se(e, t)
              : "v2f" === n
              ? (function (e, A) {
                  return [se(e, A), se(e, A)];
                })(e, t)
              : "v3f" === n
              ? (function (e, A) {
                  return [se(e, A), se(e, A), se(e, A)];
                })(e, t)
              : "int" === n
              ? te(e, t)
              : "rational" === n
              ? (function (e, A) {
                  return [te(e, A), ne(e, A)];
                })(e, t)
              : "timecode" === n
              ? (function (e, A) {
                  return [ne(e, A), ne(e, A)];
                })(e, t)
              : "preview" === n
              ? ((t.value += r), "skipped")
              : void (t.value += r);
          }
          const ue = new DataView(o),
            Ie = new Uint8Array(o),
            Ee = { value: 0 },
            Be = (function (e, A, t) {
              const n = {};
              if (20000630 != e.getUint32(0, !0))
                throw new Error(
                  "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format."
                );
              n.version = e.getUint8(4);
              const r = e.getUint8(5);
              (n.spec = {
                singleTile: !!(2 & r),
                longName: !!(4 & r),
                deepFormat: !!(8 & r),
                multiPart: !!(16 & r),
              }),
                (t.value = 8);
              let i = !0;
              for (; i; ) {
                const r = Ae(A, t);
                if (0 == r) i = !1;
                else {
                  const i = Ae(A, t),
                    o = le(e, A, t, i, ne(e, t));
                  void 0 === o
                    ? console.warn(
                        `EXRLoader.parse: skipped unknown header attribute type '${i}'.`
                      )
                    : (n[r] = o);
                }
              }
              if (0 != (-5 & r))
                throw (
                  (console.error("EXRHeader:", n),
                  new Error(
                    "THREE.EXRLoader: provided file is currently unsupported."
                  ))
                );
              return n;
            })(ue, o, Ee),
            Ce = (function (n, r, i, o, s) {
              const a = {
                size: 0,
                viewer: r,
                array: i,
                offset: o,
                width: n.dataWindow.xMax - n.dataWindow.xMin + 1,
                height: n.dataWindow.yMax - n.dataWindow.yMin + 1,
                channels: n.channels.length,
                bytesPerLine: null,
                lines: null,
                inputSize: null,
                type: n.channels[0].pixelType,
                uncompress: null,
                getter: null,
                format: null,
                colorSpace: t,
              };
              switch (n.compression) {
                case "NO_COMPRESSION":
                  (a.lines = 1), (a.uncompress = X);
                  break;
                case "RLE_COMPRESSION":
                  (a.lines = 1), (a.uncompress = W);
                  break;
                case "ZIPS_COMPRESSION":
                  (a.lines = 1), (a.uncompress = z);
                  break;
                case "ZIP_COMPRESSION":
                  (a.lines = 16), (a.uncompress = z);
                  break;
                case "PIZ_COMPRESSION":
                  (a.lines = 32), (a.uncompress = Z);
                  break;
                case "PXR24_COMPRESSION":
                  (a.lines = 16), (a.uncompress = $);
                  break;
                case "DWAA_COMPRESSION":
                  (a.lines = 32), (a.uncompress = ee);
                  break;
                case "DWAB_COMPRESSION":
                  (a.lines = 256), (a.uncompress = ee);
                  break;
                default:
                  throw new Error(
                    "EXRLoader.parse: " + n.compression + " is unsupported"
                  );
              }
              if (((a.scanlineBlockSize = a.lines), 1 == a.type))
                switch (s) {
                  case e:
                    (a.getter = ge), (a.inputSize = f);
                    break;
                  case A:
                    (a.getter = he), (a.inputSize = f);
                }
              else {
                if (2 != a.type)
                  throw new Error(
                    "EXRLoader.parse: unsupported pixelType " +
                      a.type +
                      " for " +
                      n.compression +
                      "."
                  );
                switch (s) {
                  case e:
                    (a.getter = se), (a.inputSize = C);
                    break;
                  case A:
                    (a.getter = ae), (a.inputSize = C);
                }
              }
              a.blockCount = (n.dataWindow.yMax + 1) / a.scanlineBlockSize;
              for (let e = 0; e < a.blockCount; e++) oe(r, o);
              a.outputChannels = 3 == a.channels ? 4 : a.channels;
              const c = a.width * a.height * a.outputChannels;
              switch (s) {
                case e:
                  (a.byteArray = new Float32Array(c)),
                    a.channels < a.outputChannels && a.byteArray.fill(1, 0, c);
                  break;
                case A:
                  (a.byteArray = new Uint16Array(c)),
                    a.channels < a.outputChannels &&
                      a.byteArray.fill(15360, 0, c);
                  break;
                default:
                  console.error("THREE.EXRLoader: unsupported type: ", s);
              }
              return (
                (a.bytesPerLine = a.width * a.inputSize * a.channels),
                4 == a.outputChannels
                  ? ((a.format = 1023), (a.colorSpace = t))
                  : ((a.format = 1028), (a.colorSpace = "")),
                a
              );
            })(Be, ue, Ie, Ee, i),
            pe = { value: 0 },
            fe = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
          for (let e = 0; e < Ce.height / Ce.scanlineBlockSize; e++) {
            const A = ne(ue, Ee);
            (Ce.size = ne(ue, Ee)),
              (Ce.lines =
                A + Ce.scanlineBlockSize > Ce.height
                  ? Ce.height - A
                  : Ce.scanlineBlockSize);
            const t =
              Ce.size < Ce.lines * Ce.bytesPerLine ? Ce.uncompress(Ce) : X(Ce);
            Ee.value += Ce.size;
            for (let A = 0; A < Ce.scanlineBlockSize; A++) {
              const n = A + e * Ce.scanlineBlockSize;
              if (n >= Ce.height) break;
              for (let e = 0; e < Ce.channels; e++) {
                const r = fe[Be.channels[e].name];
                for (let i = 0; i < Ce.width; i++) {
                  pe.value =
                    (A * (Ce.channels * Ce.width) + e * Ce.width + i) *
                    Ce.inputSize;
                  const o =
                    (Ce.height - 1 - n) * (Ce.width * Ce.outputChannels) +
                    i * Ce.outputChannels +
                    r;
                  Ce.byteArray[o] = Ce.getter(t, pe);
                }
              }
            }
          }
          const de = {
            header: Be,
            width: Ce.width,
            height: Ce.height,
            data: Ce.byteArray,
            format: Ce.format,
            colorSpace: Ce.colorSpace,
            type: i,
          };
          self.postMessage(de, [Ce.byteArray.buffer]);
        };
      };
    },
    4237: function (e, A, t) {
      "use strict";
      t.d(A, {
        E: function () {
          return i;
        },
      });
      var n = t(4468);
      function r(e, A) {
        if (A === n.TrianglesDrawMode)
          return (
            console.warn(
              "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."
            ),
            e
          );
        if (A === n.TriangleFanDrawMode || A === n.TriangleStripDrawMode) {
          let t = e.getIndex();
          if (null === t) {
            const A = [],
              n = e.getAttribute("position");
            if (void 0 === n)
              return (
                console.error(
                  "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
                ),
                e
              );
            for (let e = 0; e < n.count; e++) A.push(e);
            e.setIndex(A), (t = e.getIndex());
          }
          const r = t.count - 2,
            i = [];
          if (A === n.TriangleFanDrawMode)
            for (let e = 1; e <= r; e++)
              i.push(t.getX(0)), i.push(t.getX(e)), i.push(t.getX(e + 1));
          else
            for (let e = 0; e < r; e++)
              e % 2 == 0
                ? (i.push(t.getX(e)),
                  i.push(t.getX(e + 1)),
                  i.push(t.getX(e + 2)))
                : (i.push(t.getX(e + 2)),
                  i.push(t.getX(e + 1)),
                  i.push(t.getX(e)));
          i.length / 3 !== r &&
            console.error(
              "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."
            );
          const o = e.clone();
          return o.setIndex(i), o.clearGroups(), o;
        }
        return (
          console.error(
            "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",
            A
          ),
          e
        );
      }
      class i extends n.Loader {
        constructor(e) {
          super(e),
            (this.dracoLoader = null),
            (this.ktx2Loader = null),
            (this.meshoptDecoder = null),
            (this.renderer = null),
            (this.textureTasks = null),
            (this.pluginCallbacks = []),
            this.register(function (e) {
              return new g(e);
            }),
            this.register(function (e) {
              return new f(e);
            }),
            this.register(function (e) {
              return new d(e);
            }),
            this.register(function (e) {
              return new Q(e);
            }),
            this.register(function (e) {
              return new u(e);
            }),
            this.register(function (e) {
              return new I(e);
            }),
            this.register(function (e) {
              return new E(e);
            }),
            this.register(function (e) {
              return new B(e);
            }),
            this.register(function (e) {
              return new h(e);
            }),
            this.register(function (e) {
              return new C(e);
            }),
            this.register(function (e) {
              return new l(e);
            }),
            this.register(function (e) {
              return new p(e);
            }),
            this.register(function (e) {
              return new a(e);
            }),
            this.register(function (e) {
              return new m(e);
            }),
            this.register(function (e) {
              return new w(e);
            }),
            this.register(function (e) {
              return new D(e);
            }),
            this.register(function (e) {
              return new R(e);
            }),
            this.register(function (e) {
              return new v(e);
            }),
            this.register(function (e) {
              return new F(e);
            });
        }
        load(e, A, t, r) {
          const i = this;
          let o;
          (o =
            "" !== this.resourcePath
              ? this.resourcePath
              : "" !== this.path
              ? this.path
              : n.LoaderUtils.extractUrlBase(e)),
            this.manager.itemStart(e);
          const s = function (A) {
              r ? r(A) : console.error(A),
                i.manager.itemError(e),
                i.manager.itemEnd(e);
            },
            a = new n.FileLoader(this.manager);
          a.setPath(this.path),
            a.setResponseType("arraybuffer"),
            a.setRequestHeader(this.requestHeader),
            a.setWithCredentials(this.withCredentials),
            a.load(
              e,
              function (t) {
                try {
                  i.parse(
                    t,
                    o,
                    function (t) {
                      A(t), i.manager.itemEnd(e);
                    },
                    s
                  );
                } catch (e) {
                  s(e);
                }
              },
              t,
              s
            );
        }
        setDRACOLoader(e) {
          return (this.dracoLoader = e), this;
        }
        setDDSLoader() {
          throw new Error(
            'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
          );
        }
        setKTX2Loader(e) {
          return (this.ktx2Loader = e), this;
        }
        setMeshoptDecoder(e) {
          return (this.meshoptDecoder = e), this;
        }
        setRenderer(e) {
          this.renderer = e;
        }
        setTextureTasks(e) {
          this.textureTasks = e;
        }
        register(e) {
          return (
            -1 === this.pluginCallbacks.indexOf(e) &&
              this.pluginCallbacks.push(e),
            this
          );
        }
        unregister(e) {
          return (
            -1 !== this.pluginCallbacks.indexOf(e) &&
              this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
            this
          );
        }
        parse(e, A, t, n) {
          let r;
          const i = {},
            o = {},
            a = new TextDecoder();
          if ("string" == typeof e) r = JSON.parse(e);
          else if (e instanceof ArrayBuffer)
            if (a.decode(new Uint8Array(e, 0, 4)) === y) {
              try {
                i[s.KHR_BINARY_GLTF] = new x(e);
              } catch (e) {
                return void (n && n(e));
              }
              r = JSON.parse(i[s.KHR_BINARY_GLTF].content);
            } else r = JSON.parse(a.decode(e));
          else r = e;
          if (void 0 === r.asset || r.asset.version[0] < 2)
            return void (
              n &&
              n(
                new Error(
                  "THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."
                )
              )
            );
          const h = new z(r, {
            path: A || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder,
            renderer: this.renderer,
            textureTasks: this.textureTasks,
          });
          h.fileLoader.setRequestHeader(this.requestHeader);
          for (let e = 0; e < this.pluginCallbacks.length; e++) {
            const A = this.pluginCallbacks[e](h);
            (o[A.name] = A), (i[A.name] = !0);
          }
          if (r.extensionsUsed)
            for (let e = 0; e < r.extensionsUsed.length; ++e) {
              const A = r.extensionsUsed[e],
                t = r.extensionsRequired || [];
              switch (A) {
                case s.KHR_MATERIALS_UNLIT:
                  i[A] = new c();
                  break;
                case s.KHR_DRACO_MESH_COMPRESSION:
                  i[A] = new b(r, this.dracoLoader);
                  break;
                case s.KHR_TEXTURE_TRANSFORM:
                  i[A] = new S();
                  break;
                case s.KHR_MESH_QUANTIZATION:
                  i[A] = new _();
                  break;
                default:
                  t.indexOf(A) >= 0 &&
                    void 0 === o[A] &&
                    console.warn(
                      'THREE.GLTFLoader: Unknown extension "' + A + '".'
                    );
              }
            }
          h.setExtensions(i), h.setPlugins(o), h.parse(t, n);
        }
        parseAsync(e, A) {
          const t = this;
          return new Promise(function (n, r) {
            t.parse(e, A, n, r);
          });
        }
      }
      function o() {
        let e = {};
        return {
          get: function (A) {
            return e[A];
          },
          add: function (A, t) {
            e[A] = t;
          },
          remove: function (A) {
            delete e[A];
          },
          removeAll: function () {
            e = {};
          },
        };
      }
      const s = {
        KHR_BINARY_GLTF: "KHR_binary_glTF",
        KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
        KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
        KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
        KHR_MATERIALS_IOR: "KHR_materials_ior",
        KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
        KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
        KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
        KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
        KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
        KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
        KHR_MATERIALS_VOLUME: "KHR_materials_volume",
        KHR_TEXTURE_BASISU: "KHR_texture_basisu",
        KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
        KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
        KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
        EXT_TEXTURE_WEBP: "EXT_texture_webp",
        EXT_TEXTURE_AVIF: "EXT_texture_avif",
        EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
        EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing",
        LTS_MATERIALS_OPACITY_MAP: "LTS_materials_opacity_map",
        LTS_RENDERER_PROPERTIES: "LTS_renderer_properties",
        LTS_MATERIALS_EXTENDED_TRANSMISSION:
          "LTS_materials_extended_transmission",
        LTS_MATERIALS_LIGHTMAP: "LTS_materials_lightmap",
        LTS_NODES_RENDER_ORDER: "LTS_nodes_render_order",
        LTS_SAMPLERS_ANISO_FILTERING: "LTS_samplers_aniso_filtering",
      };
      class a {
        constructor(e) {
          (this.parser = e),
            (this.name = s.KHR_LIGHTS_PUNCTUAL),
            (this.cache = { refs: {}, uses: {} });
        }
        _markDefs() {
          const e = this.parser,
            A = this.parser.json.nodes || [];
          for (let t = 0, n = A.length; t < n; t++) {
            const n = A[t];
            n.extensions &&
              n.extensions[this.name] &&
              void 0 !== n.extensions[this.name].light &&
              e._addNodeRef(this.cache, n.extensions[this.name].light);
          }
        }
        _loadLight(e) {
          const A = this.parser,
            t = "light:" + e;
          let r = A.cache.get(t);
          if (r) return r;
          const i = A.json,
            o = (((i.extensions && i.extensions[this.name]) || {}).lights ||
              [])[e];
          let s;
          const a = new n.Color(16777215);
          void 0 !== o.color && a.fromArray(o.color);
          const c = void 0 !== o.range ? o.range : 0;
          switch (o.type) {
            case "directional":
              (s = new n.DirectionalLight(a)),
                s.target.position.set(0, 0, -1),
                s.add(s.target);
              break;
            case "point":
              (s = new n.PointLight(a)), (s.distance = c);
              break;
            case "spot":
              (s = new n.SpotLight(a)),
                (s.distance = c),
                (o.spot = o.spot || {}),
                (o.spot.innerConeAngle =
                  void 0 !== o.spot.innerConeAngle ? o.spot.innerConeAngle : 0),
                (o.spot.outerConeAngle =
                  void 0 !== o.spot.outerConeAngle
                    ? o.spot.outerConeAngle
                    : Math.PI / 4),
                (s.angle = o.spot.outerConeAngle),
                (s.penumbra =
                  1 - o.spot.innerConeAngle / o.spot.outerConeAngle),
                s.target.position.set(0, 0, -1),
                s.add(s.target);
              break;
            default:
              throw new Error(
                "THREE.GLTFLoader: Unexpected light type: " + o.type
              );
          }
          return (
            s.position.set(0, 0, 0),
            (s.decay = 2),
            j(s, o),
            void 0 !== o.intensity && (s.intensity = o.intensity),
            (s.name = A.createUniqueName(o.name || "light_" + e)),
            (r = Promise.resolve(s)),
            A.cache.add(t, r),
            r
          );
        }
        getDependency(e, A) {
          if ("light" === e) return this._loadLight(A);
        }
        createNodeAttachment(e) {
          const A = this,
            t = this.parser,
            n = t.json.nodes[e],
            r = ((n.extensions && n.extensions[this.name]) || {}).light;
          return void 0 === r
            ? null
            : this._loadLight(r).then(function (e) {
                return t._getNodeRef(A.cache, r, e);
              });
        }
      }
      class c {
        constructor() {
          this.name = s.KHR_MATERIALS_UNLIT;
        }
        getMaterialType() {
          return n.MeshBasicMaterial;
        }
        extendParams(e, A, t) {
          const r = [];
          (e.color = new n.Color(1, 1, 1)), (e.opacity = 1);
          const i = A.pbrMetallicRoughness;
          if (i) {
            if (Array.isArray(i.baseColorFactor)) {
              const A = i.baseColorFactor;
              e.color.fromArray(A), (e.opacity = A[3]);
            }
            void 0 !== i.baseColorTexture &&
              r.push(
                t.assignTexture(e, "map", i.baseColorTexture, n.SRGBColorSpace)
              );
          }
          return Promise.all(r);
        }
      }
      class h {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_EMISSIVE_STRENGTH);
        }
        extendMaterialParams(e, A) {
          const t = this.parser.json.materials[e];
          if (!t.extensions || !t.extensions[this.name])
            return Promise.resolve();
          const n = t.extensions[this.name].emissiveStrength;
          return void 0 !== n && (A.emissiveIntensity = n), Promise.resolve();
        }
      }
      class g {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_CLEARCOAT);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            r = t.json.materials[e];
          if (!r.extensions || !r.extensions[this.name])
            return Promise.resolve();
          const i = [],
            o = r.extensions[this.name];
          if (
            (void 0 !== o.clearcoatFactor && (A.clearcoat = o.clearcoatFactor),
            void 0 !== o.clearcoatTexture &&
              i.push(t.assignTexture(A, "clearcoatMap", o.clearcoatTexture)),
            void 0 !== o.clearcoatRoughnessFactor &&
              (A.clearcoatRoughness = o.clearcoatRoughnessFactor),
            void 0 !== o.clearcoatRoughnessTexture &&
              i.push(
                t.assignTexture(
                  A,
                  "clearcoatRoughnessMap",
                  o.clearcoatRoughnessTexture
                )
              ),
            void 0 !== o.clearcoatNormalTexture &&
              (i.push(
                t.assignTexture(
                  A,
                  "clearcoatNormalMap",
                  o.clearcoatNormalTexture
                )
              ),
              void 0 !== o.clearcoatNormalTexture.scale))
          ) {
            const e = o.clearcoatNormalTexture.scale;
            A.clearcoatNormalScale = new n.Vector2(e, e);
          }
          return Promise.all(i);
        }
      }
      class l {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_IRIDESCENCE);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            n = t.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          const r = [],
            i = n.extensions[this.name];
          return (
            void 0 !== i.iridescenceFactor &&
              (A.iridescence = i.iridescenceFactor),
            void 0 !== i.iridescenceTexture &&
              r.push(
                t.assignTexture(A, "iridescenceMap", i.iridescenceTexture)
              ),
            void 0 !== i.iridescenceIor &&
              (A.iridescenceIOR = i.iridescenceIor),
            void 0 === A.iridescenceThicknessRange &&
              (A.iridescenceThicknessRange = [100, 400]),
            void 0 !== i.iridescenceThicknessMinimum &&
              (A.iridescenceThicknessRange[0] = i.iridescenceThicknessMinimum),
            void 0 !== i.iridescenceThicknessMaximum &&
              (A.iridescenceThicknessRange[1] = i.iridescenceThicknessMaximum),
            void 0 !== i.iridescenceThicknessTexture &&
              r.push(
                t.assignTexture(
                  A,
                  "iridescenceThicknessMap",
                  i.iridescenceThicknessTexture
                )
              ),
            Promise.all(r)
          );
        }
      }
      class u {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_SHEEN);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            r = t.json.materials[e];
          if (!r.extensions || !r.extensions[this.name])
            return Promise.resolve();
          const i = [];
          (A.sheenColor = new n.Color(0, 0, 0)),
            (A.sheenRoughness = 0),
            (A.sheen = 1);
          const o = r.extensions[this.name];
          return (
            void 0 !== o.sheenColorFactor &&
              A.sheenColor.fromArray(o.sheenColorFactor),
            void 0 !== o.sheenRoughnessFactor &&
              (A.sheenRoughness = o.sheenRoughnessFactor),
            void 0 !== o.sheenColorTexture &&
              i.push(
                t.assignTexture(
                  A,
                  "sheenColorMap",
                  o.sheenColorTexture,
                  n.SRGBColorSpace
                )
              ),
            void 0 !== o.sheenRoughnessTexture &&
              i.push(
                t.assignTexture(A, "sheenRoughnessMap", o.sheenRoughnessTexture)
              ),
            Promise.all(i)
          );
        }
      }
      class I {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_TRANSMISSION);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            n = t.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          const r = [],
            i = n.extensions[this.name];
          return (
            void 0 !== i.transmissionFactor &&
              (A.transmission = i.transmissionFactor),
            void 0 !== i.transmissionTexture &&
              r.push(
                t.assignTexture(A, "transmissionMap", i.transmissionTexture)
              ),
            Promise.all(r)
          );
        }
      }
      class E {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_VOLUME);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            r = t.json.materials[e];
          if (!r.extensions || !r.extensions[this.name])
            return Promise.resolve();
          const i = [],
            o = r.extensions[this.name];
          (A.thickness = void 0 !== o.thicknessFactor ? o.thicknessFactor : 0),
            void 0 !== o.thicknessTexture &&
              i.push(t.assignTexture(A, "thicknessMap", o.thicknessTexture)),
            (A.attenuationDistance = o.attenuationDistance || 1 / 0);
          const s = o.attenuationColor || [1, 1, 1];
          return (
            (A.attenuationColor = new n.Color(s[0], s[1], s[2])), Promise.all(i)
          );
        }
      }
      class B {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_IOR);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser.json.materials[e];
          if (!t.extensions || !t.extensions[this.name])
            return Promise.resolve();
          const n = t.extensions[this.name];
          return (A.ior = void 0 !== n.ior ? n.ior : 1.5), Promise.resolve();
        }
      }
      class C {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_SPECULAR);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            r = t.json.materials[e];
          if (!r.extensions || !r.extensions[this.name])
            return Promise.resolve();
          const i = [],
            o = r.extensions[this.name];
          (A.specularIntensity =
            void 0 !== o.specularFactor ? o.specularFactor : 1),
            void 0 !== o.specularTexture &&
              i.push(
                t.assignTexture(A, "specularIntensityMap", o.specularTexture)
              );
          const s = o.specularColorFactor || [1, 1, 1];
          return (
            (A.specularColor = new n.Color(s[0], s[1], s[2])),
            void 0 !== o.specularColorTexture &&
              i.push(
                t.assignTexture(
                  A,
                  "specularColorMap",
                  o.specularColorTexture,
                  n.SRGBColorSpace
                )
              ),
            Promise.all(i)
          );
        }
      }
      class p {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_MATERIALS_ANISOTROPY);
        }
        getMaterialType(e) {
          const A = this.parser.json.materials[e];
          return A.extensions && A.extensions[this.name]
            ? n.MeshPhysicalMaterial
            : null;
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            n = t.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          const r = [],
            i = n.extensions[this.name];
          return (
            void 0 !== i.anisotropyStrength &&
              (A.anisotropy = i.anisotropyStrength),
            void 0 !== i.anisotropyRotation &&
              (A.anisotropyRotation = i.anisotropyRotation),
            void 0 !== i.anisotropyTexture &&
              r.push(t.assignTexture(A, "anisotropyMap", i.anisotropyTexture)),
            Promise.all(r)
          );
        }
      }
      class f {
        constructor(e) {
          (this.parser = e), (this.name = s.KHR_TEXTURE_BASISU);
        }
        loadTexture(e) {
          const A = this.parser,
            t = A.json,
            n = t.textures[e];
          if (!n.extensions || !n.extensions[this.name]) return null;
          const r = n.extensions[this.name],
            i = A.options.ktx2Loader;
          if (!i) {
            if (
              t.extensionsRequired &&
              t.extensionsRequired.indexOf(this.name) >= 0
            )
              throw new Error(
                "THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"
              );
            return null;
          }
          return A.loadTextureImage(e, r.source, i);
        }
      }
      class d {
        constructor(e) {
          (this.parser = e),
            (this.name = s.EXT_TEXTURE_WEBP),
            (this.isSupported = null);
        }
        loadTexture(e) {
          const A = this.name,
            t = this.parser,
            n = t.json,
            r = n.textures[e];
          if (!r.extensions || !r.extensions[A]) return null;
          const i = r.extensions[A],
            o = n.images[i.source];
          let s = t.textureLoader;
          if (o.uri) {
            const e = t.options.manager.getHandler(o.uri);
            null !== e && (s = e);
          }
          return this.detectSupport().then(function (r) {
            if (r) return t.loadTextureImage(e, i.source, s);
            if (n.extensionsRequired && n.extensionsRequired.indexOf(A) >= 0)
              throw new Error(
                "THREE.GLTFLoader: WebP required by asset but unsupported."
              );
            return t.loadTexture(e);
          });
        }
        detectSupport() {
          return (
            this.isSupported ||
              (this.isSupported = new Promise(function (e) {
                const A = new Image();
                (A.src =
                  "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
                  (A.onload = A.onerror =
                    function () {
                      e(1 === A.height);
                    });
              })),
            this.isSupported
          );
        }
      }
      class Q {
        constructor(e) {
          (this.parser = e),
            (this.name = s.EXT_TEXTURE_AVIF),
            (this.isSupported = null);
        }
        loadTexture(e) {
          const A = this.name,
            t = this.parser,
            n = t.json,
            r = n.textures[e];
          if (!r.extensions || !r.extensions[A]) return null;
          const i = r.extensions[A],
            o = n.images[i.source];
          let s = t.textureLoader;
          if (o.uri) {
            const e = t.options.manager.getHandler(o.uri);
            null !== e && (s = e);
          }
          return this.detectSupport().then(function (r) {
            if (r) return t.loadTextureImage(e, i.source, s);
            if (n.extensionsRequired && n.extensionsRequired.indexOf(A) >= 0)
              throw new Error(
                "THREE.GLTFLoader: AVIF required by asset but unsupported."
              );
            return t.loadTexture(e);
          });
        }
        detectSupport() {
          return (
            this.isSupported ||
              (this.isSupported = new Promise(function (e) {
                const A = new Image();
                (A.src =
                  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI="),
                  (A.onload = A.onerror =
                    function () {
                      e(1 === A.height);
                    });
              })),
            this.isSupported
          );
        }
      }
      class m {
        constructor(e) {
          (this.name = s.EXT_MESHOPT_COMPRESSION), (this.parser = e);
        }
        loadBufferView(e) {
          const A = this.parser.json,
            t = A.bufferViews[e];
          if (t.extensions && t.extensions[this.name]) {
            const e = t.extensions[this.name],
              n = this.parser.getDependency("buffer", e.buffer),
              r = this.parser.options.meshoptDecoder;
            if (!r || !r.supported) {
              if (
                A.extensionsRequired &&
                A.extensionsRequired.indexOf(this.name) >= 0
              )
                throw new Error(
                  "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files"
                );
              return null;
            }
            return n.then(function (A) {
              const t = e.byteOffset || 0,
                n = e.byteLength || 0,
                i = e.count,
                o = e.byteStride,
                s = new Uint8Array(A, t, n);
              return r.decodeGltfBufferAsync
                ? r
                    .decodeGltfBufferAsync(i, o, s, e.mode, e.filter)
                    .then(function (e) {
                      return e.buffer;
                    })
                : r.ready.then(function () {
                    const A = new ArrayBuffer(i * o);
                    return (
                      r.decodeGltfBuffer(
                        new Uint8Array(A),
                        i,
                        o,
                        s,
                        e.mode,
                        e.filter
                      ),
                      A
                    );
                  });
            });
          }
          return null;
        }
      }
      class w {
        constructor(e) {
          (this.name = s.EXT_MESH_GPU_INSTANCING), (this.parser = e);
        }
        createNodeMesh(e) {
          const A = this.parser.json,
            t = A.nodes[e];
          if (!t.extensions || !t.extensions[this.name] || void 0 === t.mesh)
            return null;
          const r = A.meshes[t.mesh];
          for (const e of r.primitives)
            if (
              e.mode !== G.TRIANGLES &&
              e.mode !== G.TRIANGLE_STRIP &&
              e.mode !== G.TRIANGLE_FAN &&
              void 0 !== e.mode
            )
              return null;
          const i = t.extensions[this.name].attributes,
            o = [],
            s = {};
          for (const e in i)
            o.push(
              this.parser
                .getDependency("accessor", i[e])
                .then((A) => ((s[e] = A), s[e]))
            );
          return o.length < 1
            ? null
            : (o.push(this.parser.createNodeMesh(e)),
              Promise.all(o).then((e) => {
                const A = e.pop(),
                  t = A.isGroup ? A.children : [A],
                  r = e[0].count,
                  i = [];
                for (const e of t) {
                  const A = new n.Matrix4(),
                    t = new n.Vector3(),
                    o = new n.Quaternion(),
                    a = new n.Vector3(1, 1, 1),
                    c = new n.InstancedMesh(e.geometry, e.material, r);
                  for (let e = 0; e < r; e++)
                    s.TRANSLATION && t.fromBufferAttribute(s.TRANSLATION, e),
                      s.ROTATION && o.fromBufferAttribute(s.ROTATION, e),
                      s.SCALE && a.fromBufferAttribute(s.SCALE, e),
                      c.setMatrixAt(e, A.compose(t, o, a));
                  for (const A in s)
                    "TRANSLATION" !== A &&
                      "ROTATION" !== A &&
                      "SCALE" !== A &&
                      e.geometry.setAttribute(A, s[A]);
                  n.Object3D.prototype.copy.call(c, e),
                    this.parser.assignFinalMaterial(c),
                    i.push(c);
                }
                return A.isGroup ? (A.clear(), A.add(...i), A) : i[0];
              }));
        }
      }
      const y = "glTF";
      class x {
        constructor(e) {
          (this.name = s.KHR_BINARY_GLTF),
            (this.content = null),
            (this.body = null);
          const A = new DataView(e, 0, 12),
            t = new TextDecoder();
          if (
            ((this.header = {
              magic: t.decode(new Uint8Array(e.slice(0, 4))),
              version: A.getUint32(4, !0),
              length: A.getUint32(8, !0),
            }),
            this.header.magic !== y)
          )
            throw new Error(
              "THREE.GLTFLoader: Unsupported glTF-Binary header."
            );
          if (this.header.version < 2)
            throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
          const n = this.header.length - 12,
            r = new DataView(e, 12);
          let i = 0;
          for (; i < n; ) {
            const A = r.getUint32(i, !0);
            i += 4;
            const n = r.getUint32(i, !0);
            if (((i += 4), 1313821514 === n)) {
              const n = new Uint8Array(e, 12 + i, A);
              this.content = t.decode(n);
            } else if (5130562 === n) {
              const t = 12 + i;
              this.body = e.slice(t, t + A);
            }
            i += A;
          }
          if (null === this.content)
            throw new Error("THREE.GLTFLoader: JSON content not found.");
        }
      }
      class b {
        constructor(e, A) {
          if (!A)
            throw new Error(
              "THREE.GLTFLoader: No DRACOLoader instance provided."
            );
          (this.name = s.KHR_DRACO_MESH_COMPRESSION),
            (this.json = e),
            (this.dracoLoader = A),
            this.dracoLoader.preload();
        }
        decodePrimitive(e, A) {
          const t = this.json,
            n = this.dracoLoader,
            r = e.extensions[this.name].bufferView,
            i = e.extensions[this.name].attributes,
            o = {},
            s = {},
            a = {};
          for (const e in i) {
            const A = O[e] || e.toLowerCase();
            o[A] = i[e];
          }
          for (const A in e.attributes) {
            const n = O[A] || A.toLowerCase();
            if (void 0 !== i[A]) {
              const r = t.accessors[e.attributes[A]],
                i = U[r.componentType];
              (a[n] = i.name), (s[n] = !0 === r.normalized);
            }
          }
          return A.getDependency("bufferView", r).then(function (e) {
            return new Promise(function (A) {
              n.decodeDracoFile(
                e,
                function (e) {
                  for (const A in e.attributes) {
                    const t = e.attributes[A],
                      n = s[A];
                    void 0 !== n && (t.normalized = n);
                  }
                  A(e);
                },
                o,
                a
              );
            });
          });
        }
      }
      class S {
        constructor() {
          this.name = s.KHR_TEXTURE_TRANSFORM;
        }
        extendTexture(e, A) {
          return (void 0 !== A.texCoord && A.texCoord !== e.channel) ||
            void 0 !== A.offset ||
            void 0 !== A.rotation ||
            void 0 !== A.scale
            ? ((e = e.clone()),
              void 0 !== A.texCoord && (e.channel = A.texCoord),
              void 0 !== A.offset && e.offset.fromArray(A.offset),
              void 0 !== A.rotation && (e.rotation = A.rotation),
              void 0 !== A.scale && e.repeat.fromArray(A.scale),
              (e.needsUpdate = !0),
              e)
            : e;
        }
      }
      class _ {
        constructor() {
          this.name = s.KHR_MESH_QUANTIZATION;
        }
      }
      class D {
        constructor(e) {
          (this.parser = e), (this.name = s.LTS_MATERIALS_OPACITY_MAP);
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            n = t.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          const r = [],
            i = n.extensions[this.name];
          return (
            void 0 !== i.opacityMap &&
              r.push(t.assignTexture(A, "alphaMap", i.opacityMap)),
            (A.alphaMapChannel = i.channel || 0),
            Promise.all(r)
          );
        }
      }
      class R {
        constructor(e) {
          (this.parser = e), (this.name = s.LTS_RENDERER_PROPERTIES);
        }
        extendScene(e) {
          if (
            !this.parser.json.extensions ||
            !this.parser.json.extensions[this.name]
          )
            return Promise.resolve();
          const A = this.parser.json.extensions[this.name];
          return (e[this.name] = { ...A }), Promise.resolve();
        }
      }
      class v extends I {
        constructor(e) {
          super(e), (this.name = s.LTS_MATERIALS_EXTENDED_TRANSMISSION);
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            n = t.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          const r = [],
            i = n.extensions[this.name];
          return (
            void 0 !== i.transmissionFactor &&
              ((A.transmission = i.transmissionFactor),
              (A.transmissionLodBias = i.transmissionLodBias)),
            void 0 !== i.transmissionTexture &&
              r.push(
                t.assignTexture(A, "transmissionMap", i.transmissionTexture)
              ),
            Promise.all(r)
          );
        }
      }
      class F {
        constructor(e) {
          (this.parser = e), (this.name = s.LTS_MATERIALS_LIGHTMAP);
        }
        extendMaterialParams(e, A) {
          const t = this.parser,
            n = t.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          const r = [],
            i = n.extensions[this.name];
          return (
            void 0 !== i.lightMapTexture &&
              r.push(t.assignTexture(A, "lightMap", i.lightMapTexture)),
            (A.lightMapIntensity = i.lightMapIntensity || 1),
            Promise.all(r)
          );
        }
      }
      class T extends n.Interpolant {
        constructor(e, A, t, n) {
          super(e, A, t, n);
        }
        copySampleValue_(e) {
          const A = this.resultBuffer,
            t = this.sampleValues,
            n = this.valueSize,
            r = e * n * 3 + n;
          for (let e = 0; e !== n; e++) A[e] = t[r + e];
          return A;
        }
        interpolate_(e, A, t, n) {
          const r = this.resultBuffer,
            i = this.sampleValues,
            o = this.valueSize,
            s = 2 * o,
            a = 3 * o,
            c = n - A,
            h = (t - A) / c,
            g = h * h,
            l = g * h,
            u = e * a,
            I = u - a,
            E = -2 * l + 3 * g,
            B = l - g,
            C = 1 - E,
            p = B - g + h;
          for (let e = 0; e !== o; e++) {
            const A = i[I + e + o],
              t = i[I + e + s] * c,
              n = i[u + e + o],
              a = i[u + e] * c;
            r[e] = C * A + p * t + E * n + B * a;
          }
          return r;
        }
      }
      const M = new n.Quaternion();
      class L extends T {
        interpolate_(e, A, t, n) {
          const r = super.interpolate_(e, A, t, n);
          return M.fromArray(r).normalize().toArray(r), r;
        }
      }
      const G = {
          FLOAT: 5126,
          FLOAT_MAT3: 35675,
          FLOAT_MAT4: 35676,
          FLOAT_VEC2: 35664,
          FLOAT_VEC3: 35665,
          FLOAT_VEC4: 35666,
          LINEAR: 9729,
          REPEAT: 10497,
          SAMPLER_2D: 35678,
          POINTS: 0,
          LINES: 1,
          LINE_LOOP: 2,
          LINE_STRIP: 3,
          TRIANGLES: 4,
          TRIANGLE_STRIP: 5,
          TRIANGLE_FAN: 6,
          UNSIGNED_BYTE: 5121,
          UNSIGNED_SHORT: 5123,
        },
        U = {
          5120: Int8Array,
          5121: Uint8Array,
          5122: Int16Array,
          5123: Uint16Array,
          5125: Uint32Array,
          5126: Float32Array,
        },
        k = {
          9728: n.NearestFilter,
          9729: n.LinearFilter,
          9984: n.NearestMipmapNearestFilter,
          9985: n.LinearMipmapNearestFilter,
          9986: n.NearestMipmapLinearFilter,
          9987: n.LinearMipmapLinearFilter,
        },
        N = {
          33071: n.ClampToEdgeWrapping,
          33648: n.MirroredRepeatWrapping,
          10497: n.RepeatWrapping,
        },
        P = {
          SCALAR: 1,
          VEC2: 2,
          VEC3: 3,
          VEC4: 4,
          MAT2: 4,
          MAT3: 9,
          MAT4: 16,
        },
        O = {
          POSITION: "position",
          NORMAL: "normal",
          TANGENT: "tangent",
          TEXCOORD_0: "uv",
          TEXCOORD_1: "uv1",
          TEXCOORD_2: "uv2",
          TEXCOORD_3: "uv3",
          COLOR_0: "color",
          WEIGHTS_0: "skinWeight",
          JOINTS_0: "skinIndex",
        },
        H = {
          scale: "scale",
          translation: "position",
          rotation: "quaternion",
          weights: "morphTargetInfluences",
        },
        q = {
          CUBICSPLINE: void 0,
          LINEAR: n.InterpolateLinear,
          STEP: n.InterpolateDiscrete,
        };
      function Y(e, A, t) {
        for (const n in t.extensions)
          void 0 === e[n] &&
            ((A.userData.gltfExtensions = A.userData.gltfExtensions || {}),
            (A.userData.gltfExtensions[n] = t.extensions[n]));
      }
      function j(e, A) {
        void 0 !== A.extras &&
          ("object" == typeof A.extras
            ? Object.assign(e.userData, A.extras)
            : console.warn(
                "THREE.GLTFLoader: Ignoring primitive type .extras, " + A.extras
              ));
      }
      function J(e, A) {
        if ((e.updateMorphTargets(), void 0 !== A.weights))
          for (let t = 0, n = A.weights.length; t < n; t++)
            e.morphTargetInfluences[t] = A.weights[t];
        if (A.extras && Array.isArray(A.extras.targetNames)) {
          const t = A.extras.targetNames;
          if (e.morphTargetInfluences.length === t.length) {
            e.morphTargetDictionary = {};
            for (let A = 0, n = t.length; A < n; A++)
              e.morphTargetDictionary[t[A]] = A;
          } else
            console.warn(
              "THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names."
            );
        }
      }
      function K(e) {
        let A;
        const t = e.extensions && e.extensions[s.KHR_DRACO_MESH_COMPRESSION];
        if (
          ((A = t
            ? "draco:" + t.bufferView + ":" + t.indices + ":" + V(t.attributes)
            : e.indices + ":" + V(e.attributes) + ":" + e.mode),
          void 0 !== e.targets)
        )
          for (let t = 0, n = e.targets.length; t < n; t++)
            A += ":" + V(e.targets[t]);
        return A;
      }
      function V(e) {
        let A = "";
        const t = Object.keys(e).sort();
        for (let n = 0, r = t.length; n < r; n++)
          A += t[n] + ":" + e[t[n]] + ";";
        return A;
      }
      function X(e) {
        switch (e) {
          case Int8Array:
            return 1 / 127;
          case Uint8Array:
            return 1 / 255;
          case Int16Array:
            return 1 / 32767;
          case Uint16Array:
            return 1 / 65535;
          default:
            throw new Error(
              "THREE.GLTFLoader: Unsupported normalized accessor component type."
            );
        }
      }
      const W = new n.Matrix4();
      class z {
        constructor(e = {}, A = {}) {
          (this.json = e),
            (this.extensions = {}),
            (this.plugins = {}),
            (this.options = A),
            (this.cache = new o()),
            (this.associations = new Map()),
            (this.primitiveCache = {}),
            (this.nodeCache = {}),
            (this.meshCache = { refs: {}, uses: {} }),
            (this.cameraCache = { refs: {}, uses: {} }),
            (this.lightCache = { refs: {}, uses: {} }),
            (this.sourceCache = {}),
            (this.textureCache = {}),
            (this.textureIndex = 0),
            (this.nodeNamesUsed = {});
          let t = !1,
            r = !1,
            i = -1;
          "undefined" != typeof navigator &&
            ((t =
              !0 ===
              /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
            (r = navigator.userAgent.indexOf("Firefox") > -1),
            (i = r ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1)),
            "undefined" == typeof createImageBitmap || t || (r && i < 98)
              ? (this.textureLoader = new n.TextureLoader(this.options.manager))
              : (this.textureLoader = new n.ImageBitmapLoader(
                  this.options.manager
                )),
            this.textureLoader.setCrossOrigin(this.options.crossOrigin),
            this.textureLoader.setRequestHeader(this.options.requestHeader),
            (this.fileLoader = new n.FileLoader(this.options.manager)),
            this.fileLoader.setResponseType("arraybuffer"),
            "use-credentials" === this.options.crossOrigin &&
              this.fileLoader.setWithCredentials(!0);
        }
        setExtensions(e) {
          this.extensions = e;
        }
        setPlugins(e) {
          this.plugins = e;
        }
        parse(e, A) {
          const t = this,
            n = this.json,
            r = this.extensions;
          this.cache.removeAll(),
            (this.nodeCache = {}),
            this._invokeAll(function (e) {
              return e._markDefs && e._markDefs();
            }),
            Promise.all(
              this._invokeAll(function (e) {
                return e.beforeRoot && e.beforeRoot();
              })
            )
              .then(function () {
                return Promise.all([
                  t.getDependencies("scene"),
                  t.getDependencies("animation"),
                  t.getDependencies("camera"),
                ]);
              })
              .then(function (A) {
                const i = {
                  scene: A[0][n.scene || 0],
                  scenes: A[0],
                  animations: A[1],
                  cameras: A[2],
                  asset: n.asset,
                  parser: t,
                  userData: {},
                };
                Y(r, i, n),
                  j(i, n),
                  Promise.all(
                    t._invokeAll(function (e) {
                      return e.afterRoot && e.afterRoot(i);
                    })
                  ).then(function () {
                    e(i);
                  });
              })
              .catch(A);
        }
        _markDefs() {
          const e = this.json.nodes || [],
            A = this.json.skins || [],
            t = this.json.meshes || [];
          for (let t = 0, n = A.length; t < n; t++) {
            const n = A[t].joints;
            for (let A = 0, t = n.length; A < t; A++) e[n[A]].isBone = !0;
          }
          for (let A = 0, n = e.length; A < n; A++) {
            const n = e[A];
            void 0 !== n.mesh &&
              (this._addNodeRef(this.meshCache, n.mesh),
              void 0 !== n.skin && (t[n.mesh].isSkinnedMesh = !0)),
              void 0 !== n.camera &&
                this._addNodeRef(this.cameraCache, n.camera);
          }
        }
        _addNodeRef(e, A) {
          void 0 !== A &&
            (void 0 === e.refs[A] && (e.refs[A] = e.uses[A] = 0), e.refs[A]++);
        }
        _getNodeRef(e, A, t) {
          if (e.refs[A] <= 1) return t;
          const n = t.clone(),
            r = (e, A) => {
              const t = this.associations.get(e);
              null != t && this.associations.set(A, t);
              for (const [t, n] of e.children.entries()) r(n, A.children[t]);
            };
          return r(t, n), (n.name += "_instance_" + e.uses[A]++), n;
        }
        _invokeOne(e) {
          const A = Object.values(this.plugins);
          A.push(this);
          for (let t = 0; t < A.length; t++) {
            const n = e(A[t]);
            if (n) return n;
          }
          return null;
        }
        _invokeAll(e) {
          const A = Object.values(this.plugins);
          A.unshift(this);
          const t = [];
          for (let n = 0; n < A.length; n++) {
            const r = e(A[n]);
            r && t.push(r);
          }
          return t;
        }
        getDependency(e, A) {
          const t = e + ":" + A;
          let n = this.cache.get(t);
          if (!n) {
            switch (e) {
              case "scene":
                n = this.loadScene(A);
                break;
              case "node":
                n = this._invokeOne(function (e) {
                  return e.loadNode && e.loadNode(A);
                });
                break;
              case "mesh":
                n = this._invokeOne(function (e) {
                  return e.loadMesh && e.loadMesh(A);
                });
                break;
              case "accessor":
                n = this.loadAccessor(A);
                break;
              case "bufferView":
                n = this._invokeOne(function (e) {
                  return e.loadBufferView && e.loadBufferView(A);
                });
                break;
              case "buffer":
                n = this.loadBuffer(A);
                break;
              case "material":
                n = this._invokeOne(function (e) {
                  return e.loadMaterial && e.loadMaterial(A);
                });
                break;
              case "texture":
                n = this._invokeOne(function (e) {
                  return e.loadTexture && e.loadTexture(A);
                });
                break;
              case "skin":
                n = this.loadSkin(A);
                break;
              case "animation":
                n = this._invokeOne(function (e) {
                  return e.loadAnimation && e.loadAnimation(A);
                });
                break;
              case "camera":
                n = this.loadCamera(A);
                break;
              default:
                if (
                  ((n = this._invokeOne(function (t) {
                    return (
                      t != this && t.getDependency && t.getDependency(e, A)
                    );
                  })),
                  !n)
                )
                  throw new Error("Unknown type: " + e);
            }
            this.cache.add(t, n);
          }
          return n;
        }
        getDependencies(e) {
          let A = this.cache.get(e);
          if (!A) {
            const t = this,
              n = this.json[e + ("mesh" === e ? "es" : "s")] || [];
            (A = Promise.all(
              n.map(function (A, n) {
                return t.getDependency(e, n);
              })
            )),
              this.cache.add(e, A);
          }
          return A;
        }
        loadBuffer(e) {
          const A = this.json.buffers[e],
            t = this.fileLoader;
          if (A.type && "arraybuffer" !== A.type)
            throw new Error(
              "THREE.GLTFLoader: " + A.type + " buffer type is not supported."
            );
          if (void 0 === A.uri && 0 === e)
            return Promise.resolve(this.extensions[s.KHR_BINARY_GLTF].body);
          const r = this.options;
          return new Promise(function (e, i) {
            t.load(
              n.LoaderUtils.resolveURL(A.uri, r.path),
              e,
              void 0,
              function () {
                i(
                  new Error(
                    'THREE.GLTFLoader: Failed to load buffer "' + A.uri + '".'
                  )
                );
              }
            );
          });
        }
        loadBufferView(e) {
          const A = this.json.bufferViews[e];
          return this.getDependency("buffer", A.buffer).then(function (e) {
            const t = A.byteLength || 0,
              n = A.byteOffset || 0;
            return e.slice(n, n + t);
          });
        }
        loadAccessor(e) {
          const A = this,
            t = this.json,
            r = this.json.accessors[e];
          if (void 0 === r.bufferView && void 0 === r.sparse) {
            const e = P[r.type],
              A = U[r.componentType],
              t = !0 === r.normalized,
              i = new A(r.count * e);
            return Promise.resolve(new n.BufferAttribute(i, e, t));
          }
          const i = [];
          return (
            void 0 !== r.bufferView
              ? i.push(this.getDependency("bufferView", r.bufferView))
              : i.push(null),
            void 0 !== r.sparse &&
              (i.push(
                this.getDependency("bufferView", r.sparse.indices.bufferView)
              ),
              i.push(
                this.getDependency("bufferView", r.sparse.values.bufferView)
              )),
            Promise.all(i).then(function (e) {
              const i = e[0],
                o = P[r.type],
                s = U[r.componentType],
                a = s.BYTES_PER_ELEMENT,
                c = a * o,
                h = r.byteOffset || 0,
                g =
                  void 0 !== r.bufferView
                    ? t.bufferViews[r.bufferView].byteStride
                    : void 0,
                l = !0 === r.normalized;
              let u, I;
              if (g && g !== c) {
                const e = Math.floor(h / g),
                  t =
                    "InterleavedBuffer:" +
                    r.bufferView +
                    ":" +
                    r.componentType +
                    ":" +
                    e +
                    ":" +
                    r.count;
                let c = A.cache.get(t);
                c ||
                  ((u = new s(i, e * g, (r.count * g) / a)),
                  (c = new n.InterleavedBuffer(u, g / a)),
                  A.cache.add(t, c)),
                  (I = new n.InterleavedBufferAttribute(c, o, (h % g) / a, l));
              } else (u = null === i ? new s(r.count * o) : new s(i, h, r.count * o)), (I = new n.BufferAttribute(u, o, l));
              if (void 0 !== r.sparse) {
                const A = P.SCALAR,
                  t = U[r.sparse.indices.componentType],
                  a = r.sparse.indices.byteOffset || 0,
                  c = r.sparse.values.byteOffset || 0,
                  h = new t(e[1], a, r.sparse.count * A),
                  g = new s(e[2], c, r.sparse.count * o);
                null !== i &&
                  (I = new n.BufferAttribute(
                    I.array.slice(),
                    I.itemSize,
                    I.normalized
                  ));
                for (let e = 0, A = h.length; e < A; e++) {
                  const A = h[e];
                  if (
                    (I.setX(A, g[e * o]),
                    o >= 2 && I.setY(A, g[e * o + 1]),
                    o >= 3 && I.setZ(A, g[e * o + 2]),
                    o >= 4 && I.setW(A, g[e * o + 3]),
                    o >= 5)
                  )
                    throw new Error(
                      "THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute."
                    );
                }
              }
              return I;
            })
          );
        }
        loadTexture(e) {
          const A = this.json,
            t = this.options,
            n = A.textures[e].source,
            r = A.images[n];
          let i = this.textureLoader;
          if (r.uri) {
            const e = t.manager.getHandler(r.uri);
            null !== e && (i = e);
          }
          return this.loadTextureImage(e, n, i);
        }
        loadTextureImage(e, A, t) {
          const r = this,
            i = this.json,
            o = i.textures[e],
            a = i.images[A],
            c = (a.uri || a.bufferView) + ":" + o.sampler;
          if (this.textureCache[c]) return this.textureCache[c];
          const h = this.loadImageSource(A, t)
            .then(function (A) {
              (A.flipY = !1),
                (A.name = o.name || a.name || ""),
                "" === A.name &&
                  "string" == typeof a.uri &&
                  !1 === a.uri.startsWith("data:image/") &&
                  (A.name = a.uri);
              const t = (i.samplers || {})[o.sampler] || {};
              if (
                ((A.magFilter = k[t.magFilter] || n.LinearFilter),
                (A.minFilter = k[t.minFilter] || n.LinearMipmapLinearFilter),
                (A.wrapS = N[t.wrapS] || n.RepeatWrapping),
                (A.wrapT = N[t.wrapT] || n.RepeatWrapping),
                t.extensions && t.extensions[s.LTS_SAMPLERS_ANISO_FILTERING])
              ) {
                const e =
                  t.extensions[s.LTS_SAMPLERS_ANISO_FILTERING].anisotropy;
                A.anisotropy = e;
              }
              return r.associations.set(A, { textures: e }), A;
            })
            .catch(function () {
              return null;
            });
          return (this.textureCache[c] = h), h;
        }
        loadImageSource(e, A) {
          const t = this.json,
            r = this.options;
          if (void 0 !== this.sourceCache[e])
            return this.sourceCache[e].then((e) => e.clone());
          const i = t.images[e],
            o = self.URL || self.webkitURL;
          let s = i.uri || "",
            a = !1;
          if (void 0 !== i.bufferView)
            s = this.getDependency("bufferView", i.bufferView).then(function (
              e
            ) {
              a = !0;
              const A = new Blob([e], { type: i.mimeType });
              return (s = o.createObjectURL(A)), s;
            });
          else if (void 0 === i.uri)
            throw new Error(
              "THREE.GLTFLoader: Image " + e + " is missing URI and bufferView"
            );
          const c = Promise.resolve(s)
            .then(function (e) {
              return new Promise(function (t, i) {
                let o = t;
                !0 === A.isImageBitmapLoader &&
                  (o = function (e) {
                    const A = new n.Texture(e);
                    (A.needsUpdate = !0), t(A);
                  }),
                  A.load(n.LoaderUtils.resolveURL(e, r.path), o, void 0, i);
              });
            })
            .then(function (e) {
              var A;
              return (
                !0 === a && o.revokeObjectURL(s),
                (e.userData.mimeType =
                  i.mimeType ||
                  ((A = i.uri).search(/\.jpe?g($|\?)/i) > 0 ||
                  0 === A.search(/^data\:image\/jpeg/)
                    ? "image/jpeg"
                    : A.search(/\.webp($|\?)/i) > 0 ||
                      0 === A.search(/^data\:image\/webp/)
                    ? "image/webp"
                    : "image/png")),
                e
              );
            })
            .catch(function (e) {
              throw (
                (console.error("THREE.GLTFLoader: Couldn't load texture", s), e)
              );
            });
          return (this.sourceCache[e] = c), c;
        }
        assignTexture(e, A, t, n) {
          const r = this;
          return (
            (this.textureIndex += 1),
            (() =>
              this.options.textureTasks
                ? new Promise((e) => {
                    const A = this.getDependency("texture", t.index);
                    this.options.textureTasks.add(() => {
                      this.options.renderer.initTexture(A), e(A);
                    }, "texture");
                  })
                : this.getDependency("texture", t.index))().then(function (i) {
              if (!i) return null;
              if (
                (void 0 !== t.texCoord &&
                  t.texCoord > 0 &&
                  ((i = i.clone()).channel = t.texCoord),
                r.extensions[s.KHR_TEXTURE_TRANSFORM])
              ) {
                const e =
                  void 0 !== t.extensions
                    ? t.extensions[s.KHR_TEXTURE_TRANSFORM]
                    : void 0;
                if (e) {
                  const A = r.associations.get(i);
                  (i = r.extensions[s.KHR_TEXTURE_TRANSFORM].extendTexture(
                    i,
                    e
                  )),
                    r.associations.set(i, A);
                }
              }
              return void 0 !== n && (i.colorSpace = n), (e[A] = i), i;
            })
          );
        }
        assignFinalMaterial(e) {
          const A = e.geometry;
          let t = e.material;
          const r = void 0 === A.attributes.tangent,
            i = void 0 !== A.attributes.color,
            o = void 0 === A.attributes.normal;
          if (e.isPoints) {
            const e = "PointsMaterial:" + t.uuid;
            let A = this.cache.get(e);
            A ||
              ((A = new n.PointsMaterial()),
              n.Material.prototype.copy.call(A, t),
              A.color.copy(t.color),
              (A.map = t.map),
              (A.sizeAttenuation = !1),
              this.cache.add(e, A)),
              (t = A);
          } else if (e.isLine) {
            const e = "LineBasicMaterial:" + t.uuid;
            let A = this.cache.get(e);
            A ||
              ((A = new n.LineBasicMaterial()),
              n.Material.prototype.copy.call(A, t),
              A.color.copy(t.color),
              (A.map = t.map),
              this.cache.add(e, A)),
              (t = A);
          }
          if (r || i || o) {
            let e = "ClonedMaterial:" + t.uuid + ":";
            r && (e += "derivative-tangents:"),
              i && (e += "vertex-colors:"),
              o && (e += "flat-shading:");
            let A = this.cache.get(e);
            A ||
              ((A = t.clone()),
              i && (A.vertexColors = !0),
              o && (A.flatShading = !0),
              r &&
                (A.normalScale && (A.normalScale.y *= -1),
                A.clearcoatNormalScale && (A.clearcoatNormalScale.y *= -1)),
              this.cache.add(e, A),
              this.associations.set(A, this.associations.get(t))),
              (t = A);
          }
          e.material = t;
        }
        getMaterialType() {
          return n.MeshStandardMaterial;
        }
        loadMaterial(e) {
          const A = this,
            t = this.json,
            r = this.extensions,
            i = t.materials[e];
          let o;
          const a = {},
            c = [];
          if ((i.extensions || {})[s.KHR_MATERIALS_UNLIT]) {
            const e = r[s.KHR_MATERIALS_UNLIT];
            (o = e.getMaterialType()), c.push(e.extendParams(a, i, A));
          } else {
            const t = i.pbrMetallicRoughness || {};
            if (
              ((a.color = new n.Color(1, 1, 1)),
              (a.opacity = 1),
              Array.isArray(t.baseColorFactor))
            ) {
              const e = t.baseColorFactor;
              a.color.fromArray(e), (a.opacity = e[3]);
            }
            void 0 !== t.baseColorTexture &&
              c.push(
                A.assignTexture(a, "map", t.baseColorTexture, n.SRGBColorSpace)
              ),
              (a.metalness =
                void 0 !== t.metallicFactor ? t.metallicFactor : 1),
              (a.roughness =
                void 0 !== t.roughnessFactor ? t.roughnessFactor : 1),
              void 0 !== t.metallicRoughnessTexture &&
                (c.push(
                  A.assignTexture(a, "metalnessMap", t.metallicRoughnessTexture)
                ),
                c.push(
                  A.assignTexture(a, "roughnessMap", t.metallicRoughnessTexture)
                )),
              (o = this._invokeOne(function (A) {
                return A.getMaterialType && A.getMaterialType(e);
              })),
              c.push(
                Promise.all(
                  this._invokeAll(function (A) {
                    return (
                      A.extendMaterialParams && A.extendMaterialParams(e, a)
                    );
                  })
                )
              );
          }
          !0 === i.doubleSided && (a.side = n.DoubleSide);
          const h = i.alphaMode || "OPAQUE";
          if (
            ("BLEND" === h
              ? ((a.transparent = !0), (a.depthWrite = !1))
              : ((a.transparent = !1),
                "MASK" === h &&
                  (a.alphaTest =
                    void 0 !== i.alphaCutoff ? i.alphaCutoff : 0.5)),
            void 0 !== i.normalTexture &&
              o !== n.MeshBasicMaterial &&
              (c.push(A.assignTexture(a, "normalMap", i.normalTexture)),
              (a.normalScale = new n.Vector2(1, 1)),
              void 0 !== i.normalTexture.scale))
          ) {
            const e = i.normalTexture.scale;
            a.normalScale.set(e, e);
          }
          return (
            void 0 !== i.occlusionTexture &&
              o !== n.MeshBasicMaterial &&
              (c.push(A.assignTexture(a, "aoMap", i.occlusionTexture)),
              void 0 !== i.occlusionTexture.strength &&
                (a.aoMapIntensity = i.occlusionTexture.strength)),
            void 0 !== i.emissiveFactor &&
              o !== n.MeshBasicMaterial &&
              (a.emissive = new n.Color().fromArray(i.emissiveFactor)),
            void 0 !== i.emissiveTexture &&
              o !== n.MeshBasicMaterial &&
              c.push(
                A.assignTexture(
                  a,
                  "emissiveMap",
                  i.emissiveTexture,
                  n.SRGBColorSpace
                )
              ),
            Promise.all(c).then(function () {
              const t = new o(a);
              return (
                i.name && (t.name = i.name),
                j(t, i),
                A.associations.set(t, { materials: e }),
                i.extensions && Y(r, t, i),
                t
              );
            })
          );
        }
        createUniqueName(e) {
          const A = n.PropertyBinding.sanitizeNodeName(e || "");
          return A in this.nodeNamesUsed
            ? A + "_" + ++this.nodeNamesUsed[A]
            : ((this.nodeNamesUsed[A] = 0), A);
        }
        loadGeometries(e) {
          const A = this,
            t = this.extensions,
            r = this.primitiveCache;
          function i(e) {
            return t[s.KHR_DRACO_MESH_COMPRESSION]
              .decodePrimitive(e, A)
              .then(function (t) {
                return Z(t, e, A);
              });
          }
          const o = [];
          for (let t = 0, a = e.length; t < a; t++) {
            const a = e[t],
              c = K(a),
              h = r[c];
            if (h) o.push(h.promise);
            else {
              let e;
              (e =
                a.extensions && a.extensions[s.KHR_DRACO_MESH_COMPRESSION]
                  ? i(a)
                  : Z(new n.BufferGeometry(), a, A)),
                (r[c] = { primitive: a, promise: e }),
                o.push(e);
            }
          }
          return Promise.all(o);
        }
        loadMesh(e) {
          const A = this,
            t = this.json,
            i = this.extensions,
            o = t.meshes[e],
            s = o.primitives,
            a = [];
          for (let e = 0, A = s.length; e < A; e++) {
            const A =
              void 0 === s[e].material
                ? (void 0 === (c = this.cache).DefaultMaterial &&
                    (c.DefaultMaterial = new n.MeshStandardMaterial({
                      color: 16777215,
                      emissive: 0,
                      metalness: 1,
                      roughness: 1,
                      transparent: !1,
                      depthTest: !0,
                      side: n.FrontSide,
                    })),
                  c.DefaultMaterial)
                : this.getDependency("material", s[e].material);
            a.push(A);
          }
          var c;
          return (
            a.push(A.loadGeometries(s)),
            Promise.all(a).then(function (t) {
              const a = t.slice(0, t.length - 1),
                c = t[t.length - 1],
                h = [];
              for (let t = 0, g = c.length; t < g; t++) {
                const g = c[t],
                  l = s[t];
                let u;
                const I = a[t];
                if (
                  l.mode === G.TRIANGLES ||
                  l.mode === G.TRIANGLE_STRIP ||
                  l.mode === G.TRIANGLE_FAN ||
                  void 0 === l.mode
                )
                  (u =
                    !0 === o.isSkinnedMesh
                      ? new n.SkinnedMesh(g, I)
                      : new n.Mesh(g, I)),
                    !0 === u.isSkinnedMesh && u.normalizeSkinWeights(),
                    l.mode === G.TRIANGLE_STRIP
                      ? (u.geometry = r(u.geometry, n.TriangleStripDrawMode))
                      : l.mode === G.TRIANGLE_FAN &&
                        (u.geometry = r(u.geometry, n.TriangleFanDrawMode));
                else if (l.mode === G.LINES) u = new n.LineSegments(g, I);
                else if (l.mode === G.LINE_STRIP) u = new n.Line(g, I);
                else if (l.mode === G.LINE_LOOP) u = new n.LineLoop(g, I);
                else {
                  if (l.mode !== G.POINTS)
                    throw new Error(
                      "THREE.GLTFLoader: Primitive mode unsupported: " + l.mode
                    );
                  u = new n.Points(g, I);
                }
                Object.keys(u.geometry.morphAttributes).length > 0 && J(u, o),
                  (u.name = A.createUniqueName(o.name || "mesh_" + e)),
                  j(u, o),
                  l.extensions && Y(i, u, l),
                  A.assignFinalMaterial(u),
                  h.push(u);
              }
              for (let t = 0, n = h.length; t < n; t++)
                A.associations.set(h[t], { meshes: e, primitives: t });
              if (1 === h.length) return o.extensions && Y(i, h[0], o), h[0];
              const g = new n.Group();
              o.extensions && Y(i, g, o), A.associations.set(g, { meshes: e });
              for (let e = 0, A = h.length; e < A; e++) g.add(h[e]);
              return g;
            })
          );
        }
        loadCamera(e) {
          let A;
          const t = this.json.cameras[e],
            r = t[t.type];
          if (r)
            return (
              "perspective" === t.type
                ? (A = new n.PerspectiveCamera(
                    n.MathUtils.radToDeg(r.yfov),
                    r.aspectRatio || 1,
                    r.znear || 1,
                    r.zfar || 2e6
                  ))
                : "orthographic" === t.type &&
                  (A = new n.OrthographicCamera(
                    -r.xmag,
                    r.xmag,
                    r.ymag,
                    -r.ymag,
                    r.znear,
                    r.zfar
                  )),
              t.name && (A.name = this.createUniqueName(t.name)),
              j(A, t),
              Promise.resolve(A)
            );
          console.warn("THREE.GLTFLoader: Missing camera parameters.");
        }
        loadSkin(e) {
          const A = this.json.skins[e],
            t = [];
          for (let e = 0, n = A.joints.length; e < n; e++)
            t.push(this._loadNodeShallow(A.joints[e]));
          return (
            void 0 !== A.inverseBindMatrices
              ? t.push(this.getDependency("accessor", A.inverseBindMatrices))
              : t.push(null),
            Promise.all(t).then(function (e) {
              const t = e.pop(),
                r = e,
                i = [],
                o = [];
              for (let e = 0, s = r.length; e < s; e++) {
                const s = r[e];
                if (s) {
                  i.push(s);
                  const A = new n.Matrix4();
                  null !== t && A.fromArray(t.array, 16 * e), o.push(A);
                } else
                  console.warn(
                    'THREE.GLTFLoader: Joint "%s" could not be found.',
                    A.joints[e]
                  );
              }
              return new n.Skeleton(i, o);
            })
          );
        }
        loadAnimation(e) {
          const A = this.json,
            t = this,
            r = A.animations[e],
            i = r.name ? r.name : "animation_" + e,
            o = [],
            s = [],
            a = [],
            c = [],
            h = [];
          for (let e = 0, A = r.channels.length; e < A; e++) {
            const A = r.channels[e],
              t = r.samplers[A.sampler],
              n = A.target,
              i = n.node,
              g = void 0 !== r.parameters ? r.parameters[t.input] : t.input,
              l = void 0 !== r.parameters ? r.parameters[t.output] : t.output;
            void 0 !== n.node &&
              (o.push(this.getDependency("node", i)),
              s.push(this.getDependency("accessor", g)),
              a.push(this.getDependency("accessor", l)),
              c.push(t),
              h.push(n));
          }
          return Promise.all([
            Promise.all(o),
            Promise.all(s),
            Promise.all(a),
            Promise.all(c),
            Promise.all(h),
          ]).then(function (e) {
            const A = e[0],
              r = e[1],
              o = e[2],
              s = e[3],
              a = e[4],
              c = [];
            for (let e = 0, n = A.length; e < n; e++) {
              const n = A[e],
                i = r[e],
                h = o[e],
                g = s[e],
                l = a[e];
              if (void 0 === n) continue;
              n.updateMatrix && (n.updateMatrix(), (n.matrixAutoUpdate = !0));
              const u = t._createAnimationTracks(n, i, h, g, l);
              if (u) for (let e = 0; e < u.length; e++) c.push(u[e]);
            }
            return new n.AnimationClip(i, void 0, c);
          });
        }
        createNodeMesh(e) {
          const A = this.json,
            t = this,
            n = A.nodes[e];
          return void 0 === n.mesh
            ? null
            : t.getDependency("mesh", n.mesh).then(function (e) {
                const A = t._getNodeRef(t.meshCache, n.mesh, e);
                return (
                  void 0 !== n.weights &&
                    A.traverse(function (e) {
                      if (e.isMesh)
                        for (let A = 0, t = n.weights.length; A < t; A++)
                          e.morphTargetInfluences[A] = n.weights[A];
                    }),
                  A
                );
              });
        }
        loadNode(e) {
          const A = this,
            t = this.json.nodes[e],
            n = A._loadNodeShallow(e),
            r = [],
            i = t.children || [];
          for (let e = 0, t = i.length; e < t; e++)
            r.push(A.getDependency("node", i[e]));
          const o =
            void 0 === t.skin
              ? Promise.resolve(null)
              : A.getDependency("skin", t.skin);
          return Promise.all([n, Promise.all(r), o]).then(function (e) {
            const A = e[0],
              n = e[1],
              r = e[2];
            null !== r &&
              A.traverse(function (e) {
                e.isSkinnedMesh && e.bind(r, W);
              });
            for (let e = 0, t = n.length; e < t; e++) A.add(n[e]);
            if (t.extensions && t.extensions[s.LTS_NODES_RENDER_ORDER]) {
              const e = t.extensions[s.LTS_NODES_RENDER_ORDER].renderOrder;
              A.renderOrder = e;
            }
            return A;
          });
        }
        _loadNodeShallow(e) {
          const A = this.json,
            t = this.extensions,
            r = this;
          if (void 0 !== this.nodeCache[e]) return this.nodeCache[e];
          const i = A.nodes[e],
            o = i.name ? r.createUniqueName(i.name) : "",
            s = [],
            a = r._invokeOne(function (A) {
              return A.createNodeMesh && A.createNodeMesh(e);
            });
          return (
            a && s.push(a),
            void 0 !== i.camera &&
              s.push(
                r.getDependency("camera", i.camera).then(function (e) {
                  return r._getNodeRef(r.cameraCache, i.camera, e);
                })
              ),
            r
              ._invokeAll(function (A) {
                return A.createNodeAttachment && A.createNodeAttachment(e);
              })
              .forEach(function (e) {
                s.push(e);
              }),
            (this.nodeCache[e] = Promise.all(s).then(function (A) {
              let s;
              if (
                ((s =
                  !0 === i.isBone
                    ? new n.Bone()
                    : A.length > 1
                    ? new n.Group()
                    : 1 === A.length
                    ? A[0]
                    : new n.Object3D()),
                s !== A[0])
              )
                for (let e = 0, t = A.length; e < t; e++) s.add(A[e]);
              if (
                (i.name && ((s.userData.name = i.name), (s.name = o)),
                j(s, i),
                i.extensions && Y(t, s, i),
                void 0 !== i.matrix)
              ) {
                const e = new n.Matrix4();
                e.fromArray(i.matrix), s.applyMatrix4(e);
              } else void 0 !== i.translation && s.position.fromArray(i.translation), void 0 !== i.rotation && s.quaternion.fromArray(i.rotation), void 0 !== i.scale && s.scale.fromArray(i.scale);
              return (
                r.associations.has(s) || r.associations.set(s, {}),
                (r.associations.get(s).nodes = e),
                s
              );
            })),
            this.nodeCache[e]
          );
        }
        loadScene(e) {
          const A = this.extensions,
            t = this.json.scenes[e],
            r = this,
            i = new n.Group();
          t.name && (i.name = r.createUniqueName(t.name)),
            j(i, t),
            t.extensions && Y(A, i, t);
          const o = t.nodes || [],
            s = [];
          for (let e = 0, A = o.length; e < A; e++)
            s.push(r.getDependency("node", o[e]));
          return (
            s.push(
              Promise.all(
                this._invokeAll(function (e) {
                  return e.extendScene && e.extendScene(i);
                })
              )
            ),
            Promise.all(s).then(function (e) {
              for (let A = 0, t = e.length; A < t; A++)
                e[A] instanceof n.Object3D && i.add(e[A]);
              return (
                (r.associations = ((e) => {
                  const A = new Map();
                  for (const [e, t] of r.associations)
                    (e instanceof n.Material || e instanceof n.Texture) &&
                      A.set(e, t);
                  return (
                    e.traverse((e) => {
                      const t = r.associations.get(e);
                      null != t && A.set(e, t);
                    }),
                    A
                  );
                })(i)),
                i
              );
            })
          );
        }
        _createAnimationTracks(e, A, t, r, i) {
          const o = [],
            s = e.name ? e.name : e.uuid,
            a = [];
          let c;
          switch (
            (H[i.path] === H.weights
              ? e.traverse(function (e) {
                  e.morphTargetInfluences && a.push(e.name ? e.name : e.uuid);
                })
              : a.push(s),
            H[i.path])
          ) {
            case H.weights:
              c = n.NumberKeyframeTrack;
              break;
            case H.rotation:
              c = n.QuaternionKeyframeTrack;
              break;
            default:
              switch (t.itemSize) {
                case 1:
                  c = n.NumberKeyframeTrack;
                  break;
                case 2:
                case 3:
                  c = n.VectorKeyframeTrack;
              }
          }
          const h =
              void 0 !== r.interpolation
                ? q[r.interpolation]
                : n.InterpolateLinear,
            g = this._getArrayFromAccessor(t);
          for (let e = 0, t = a.length; e < t; e++) {
            const t = new c(a[e] + "." + H[i.path], A.array, g, h);
            "CUBICSPLINE" === h && this._createCubicSplineTrackInterpolant(t),
              o.push(t);
          }
          return o;
        }
        _getArrayFromAccessor(e) {
          let A = e.array;
          if (e.normalized) {
            const e = X(A.constructor),
              t = new Float32Array(A.length);
            for (let n = 0, r = A.length; n < r; n++) t[n] = A[n] * e;
            A = t;
          }
          return A;
        }
        _createCubicSplineTrackInterpolant(e) {
          (e.createInterpolant = function (e) {
            return new (this instanceof n.QuaternionKeyframeTrack ? L : T)(
              this.times,
              this.values,
              this.getValueSize() / 3,
              e
            );
          }),
            (e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline =
              !0);
        }
      }
      function Z(e, A, t) {
        const r = A.attributes,
          i = [];
        function o(A, n) {
          return t.getDependency("accessor", A).then(function (A) {
            e.setAttribute(n, A);
          });
        }
        for (const A in r) {
          const t = O[A] || A.toLowerCase();
          t in e.attributes || i.push(o(r[A], t));
        }
        if (void 0 !== A.indices && !e.index) {
          const n = t.getDependency("accessor", A.indices).then(function (A) {
            e.setIndex(A);
          });
          i.push(n);
        }
        return (
          j(e, A),
          (function (e, A, t) {
            const r = A.attributes,
              i = new n.Box3();
            if (void 0 === r.POSITION) return;
            {
              const e = t.json.accessors[r.POSITION],
                A = e.min,
                o = e.max;
              if (void 0 === A || void 0 === o)
                return void console.warn(
                  "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
                );
              if (
                (i.set(
                  new n.Vector3(A[0], A[1], A[2]),
                  new n.Vector3(o[0], o[1], o[2])
                ),
                e.normalized)
              ) {
                const A = X(U[e.componentType]);
                i.min.multiplyScalar(A), i.max.multiplyScalar(A);
              }
            }
            const o = A.targets;
            if (void 0 !== o) {
              const e = new n.Vector3(),
                A = new n.Vector3();
              for (let n = 0, r = o.length; n < r; n++) {
                const r = o[n];
                if (void 0 !== r.POSITION) {
                  const n = t.json.accessors[r.POSITION],
                    i = n.min,
                    o = n.max;
                  if (void 0 !== i && void 0 !== o) {
                    if (
                      (A.setX(Math.max(Math.abs(i[0]), Math.abs(o[0]))),
                      A.setY(Math.max(Math.abs(i[1]), Math.abs(o[1]))),
                      A.setZ(Math.max(Math.abs(i[2]), Math.abs(o[2]))),
                      n.normalized)
                    ) {
                      const e = X(U[n.componentType]);
                      A.multiplyScalar(e);
                    }
                    e.max(A);
                  } else
                    console.warn(
                      "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
                    );
                }
              }
              i.expandByVector(e);
            }
            e.boundingBox = i;
            const s = new n.Sphere();
            i.getCenter(s.center),
              (s.radius = i.min.distanceTo(i.max) / 2),
              (e.boundingSphere = s);
          })(e, A, t),
          Promise.all(i).then(function () {
            return void 0 !== A.targets
              ? (function (e, A, t) {
                  let n = !1,
                    r = !1,
                    i = !1;
                  for (let e = 0, t = A.length; e < t; e++) {
                    const t = A[e];
                    if (
                      (void 0 !== t.POSITION && (n = !0),
                      void 0 !== t.NORMAL && (r = !0),
                      void 0 !== t.COLOR_0 && (i = !0),
                      n && r && i)
                    )
                      break;
                  }
                  if (!n && !r && !i) return Promise.resolve(e);
                  const o = [],
                    s = [],
                    a = [];
                  for (let c = 0, h = A.length; c < h; c++) {
                    const h = A[c];
                    if (n) {
                      const A =
                        void 0 !== h.POSITION
                          ? t.getDependency("accessor", h.POSITION)
                          : e.attributes.position;
                      o.push(A);
                    }
                    if (r) {
                      const A =
                        void 0 !== h.NORMAL
                          ? t.getDependency("accessor", h.NORMAL)
                          : e.attributes.normal;
                      s.push(A);
                    }
                    if (i) {
                      const A =
                        void 0 !== h.COLOR_0
                          ? t.getDependency("accessor", h.COLOR_0)
                          : e.attributes.color;
                      a.push(A);
                    }
                  }
                  return Promise.all([
                    Promise.all(o),
                    Promise.all(s),
                    Promise.all(a),
                  ]).then(function (A) {
                    const t = A[0],
                      o = A[1],
                      s = A[2];
                    return (
                      n && (e.morphAttributes.position = t),
                      r && (e.morphAttributes.normal = o),
                      i && (e.morphAttributes.color = s),
                      (e.morphTargetsRelative = !0),
                      e
                    );
                  });
                })(e, A.targets, t)
              : e;
          })
        );
      }
    },
    4604: function (e, A, t) {
      "use strict";
      t.d(A, {
        a: function () {
          return p;
        },
      });
      var n = t(4468),
        r = t(728);
      class i {
        constructor() {
          (this.vkFormat = 0),
            (this.typeSize = 1),
            (this.pixelWidth = 0),
            (this.pixelHeight = 0),
            (this.pixelDepth = 0),
            (this.layerCount = 0),
            (this.faceCount = 1),
            (this.supercompressionScheme = 0),
            (this.levels = []),
            (this.dataFormatDescriptor = [
              {
                vendorId: 0,
                descriptorType: 0,
                descriptorBlockSize: 0,
                versionNumber: 2,
                colorModel: 0,
                colorPrimaries: 1,
                transferFunction: 2,
                flags: 0,
                texelBlockDimension: [0, 0, 0, 0],
                bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
                samples: [],
              },
            ]),
            (this.keyValue = {}),
            (this.globalData = null);
        }
      }
      class o {
        constructor(e, A, t, n) {
          (this._dataView = new DataView(e.buffer, e.byteOffset + A, t)),
            (this._littleEndian = n),
            (this._offset = 0);
        }
        _nextUint8() {
          const e = this._dataView.getUint8(this._offset);
          return (this._offset += 1), e;
        }
        _nextUint16() {
          const e = this._dataView.getUint16(this._offset, this._littleEndian);
          return (this._offset += 2), e;
        }
        _nextUint32() {
          const e = this._dataView.getUint32(this._offset, this._littleEndian);
          return (this._offset += 4), e;
        }
        _nextUint64() {
          const e =
            this._dataView.getUint32(this._offset, this._littleEndian) +
            2 ** 32 *
              this._dataView.getUint32(this._offset + 4, this._littleEndian);
          return (this._offset += 8), e;
        }
        _nextInt32() {
          const e = this._dataView.getInt32(this._offset, this._littleEndian);
          return (this._offset += 4), e;
        }
        _skip(e) {
          return (this._offset += e), this;
        }
        _scan(e, A = 0) {
          const t = this._offset;
          let n = 0;
          for (; this._dataView.getUint8(this._offset) !== A && n < e; )
            n++, this._offset++;
          return (
            n < e && this._offset++,
            new Uint8Array(
              this._dataView.buffer,
              this._dataView.byteOffset + t,
              n
            )
          );
        }
      }
      new Uint8Array([0]);
      const s = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
      function a(e) {
        return "undefined" != typeof TextDecoder
          ? new TextDecoder().decode(e)
          : Buffer.from(e).toString("utf8");
      }
      let c, h, g;
      const l = {
        env: {
          emscripten_notify_memory_growth: function (e) {
            g = new Uint8Array(h.exports.memory.buffer);
          },
        },
      };
      class u {
        init() {
          return (
            c ||
            ((c =
              "undefined" != typeof fetch
                ? fetch("data:application/wasm;base64," + I)
                    .then((e) => e.arrayBuffer())
                    .then((e) => WebAssembly.instantiate(e, l))
                    .then(this._init)
                : WebAssembly.instantiate(Buffer.from(I, "base64"), l).then(
                    this._init
                  )),
            c)
          );
        }
        _init(e) {
          (h = e.instance), l.env.emscripten_notify_memory_growth(0);
        }
        decode(e, A = 0) {
          if (!h)
            throw new Error("ZSTDDecoder: Await .init() before decoding.");
          const t = e.byteLength,
            n = h.exports.malloc(t);
          g.set(e, n),
            (A = A || Number(h.exports.ZSTD_findDecompressedSize(n, t)));
          const r = h.exports.malloc(A),
            i = h.exports.ZSTD_decompress(r, A, n, t),
            o = g.slice(r, r + i);
          return h.exports.free(n), h.exports.free(r), o;
        }
      }
      const I =
          "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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",
        E = new WeakMap();
      let B,
        C = 0;
      class p extends n.Loader {
        constructor(e) {
          super(e),
            (this.transcoderPath = ""),
            (this.transcoderBinary = null),
            (this.transcoderPending = null),
            (this.workerPool = new r.h()),
            (this.workerSourceURL = ""),
            (this.workerConfig = null),
            "undefined" != typeof MSC_TRANSCODER &&
              console.warn(
                'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.'
              );
        }
        setTranscoderPath(e) {
          return (this.transcoderPath = e), this;
        }
        setWorkerLimit(e) {
          return this.workerPool.setWorkerLimit(e), this;
        }
        detectSupport(e) {
          return (
            !0 === e.isWebGPURenderer
              ? (this.workerConfig = {
                  astcSupported: e.hasFeature("texture-compression-astc"),
                  etc1Supported: !1,
                  etc2Supported: e.hasFeature("texture-compression-etc2"),
                  dxtSupported: e.hasFeature("texture-compression-bc"),
                  bptcSupported: !1,
                  pvrtcSupported: !1,
                })
              : ((this.workerConfig = {
                  astcSupported: e.extensions.has(
                    "WEBGL_compressed_texture_astc"
                  ),
                  etc1Supported: e.extensions.has(
                    "WEBGL_compressed_texture_etc1"
                  ),
                  etc2Supported: e.extensions.has(
                    "WEBGL_compressed_texture_etc"
                  ),
                  dxtSupported: e.extensions.has(
                    "WEBGL_compressed_texture_s3tc"
                  ),
                  bptcSupported: e.extensions.has(
                    "EXT_texture_compression_bptc"
                  ),
                  pvrtcSupported:
                    e.extensions.has("WEBGL_compressed_texture_pvrtc") ||
                    e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc"),
                }),
                e.capabilities.isWebGL2 &&
                  (this.workerConfig.etc1Supported = !1)),
            this
          );
        }
        init() {
          if (!this.transcoderPending) {
            const e = new n.FileLoader(this.manager);
            e.setPath(this.transcoderPath),
              e.setWithCredentials(this.withCredentials);
            const A = e.loadAsync("basis_transcoder.js"),
              t = new n.FileLoader(this.manager);
            t.setPath(this.transcoderPath),
              t.setResponseType("arraybuffer"),
              t.setWithCredentials(this.withCredentials);
            const r = t.loadAsync("basis_transcoder.wasm");
            (this.transcoderPending = Promise.all([A, r]).then(([e, A]) => {
              const t = p.BasisWorker.toString(),
                n = [
                  "/* constants */",
                  "let _EngineFormat = " + JSON.stringify(p.EngineFormat),
                  "let _TranscoderFormat = " +
                    JSON.stringify(p.TranscoderFormat),
                  "let _BasisFormat = " + JSON.stringify(p.BasisFormat),
                  "/* basis_transcoder.js */",
                  e,
                  "/* worker */",
                  t.substring(t.indexOf("{") + 1, t.lastIndexOf("}")),
                ].join("\n");
              (this.workerSourceURL = URL.createObjectURL(new Blob([n]))),
                (this.transcoderBinary = A),
                this.workerPool.setWorkerCreator(() => {
                  const e = new Worker(this.workerSourceURL),
                    A = this.transcoderBinary.slice(0);
                  return (
                    e.postMessage(
                      {
                        type: "init",
                        config: this.workerConfig,
                        transcoderBinary: A,
                      },
                      [A]
                    ),
                    e
                  );
                });
            })),
              C > 0 &&
                console.warn(
                  "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
                ),
              C++;
          }
          return this.transcoderPending;
        }
        load(e, A, t, r) {
          if (null === this.workerConfig)
            throw new Error(
              "THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`."
            );
          const i = new n.FileLoader(this.manager);
          i.setResponseType("arraybuffer"),
            i.setWithCredentials(this.withCredentials),
            i.load(
              e,
              (e) => {
                if (E.has(e)) return E.get(e).promise.then(A).catch(r);
                this._createTexture(e)
                  .then((e) => (A ? A(e) : null))
                  .catch(r);
              },
              t,
              r
            );
        }
        _createTextureFrom(e, A) {
          const {
            faces: t,
            width: r,
            height: i,
            format: o,
            type: s,
            error: a,
            dfdTransferFn: c,
            dfdFlags: h,
          } = e;
          if ("error" === s) return Promise.reject(a);
          let g;
          if (6 === A.faceCount)
            (g = new n.CompressedTexture()),
              (g.image = t),
              (g.format = o),
              (g.type = n.UnsignedByteType);
          else {
            const e = t[0].mipmaps;
            g =
              A.layerCount > 1
                ? new n.CompressedArrayTexture(
                    e,
                    r,
                    i,
                    A.layerCount,
                    o,
                    n.UnsignedByteType
                  )
                : new n.CompressedTexture(e, r, i, o, n.UnsignedByteType);
          }
          return (
            (g.minFilter =
              1 === t[0].mipmaps.length
                ? n.LinearFilter
                : n.LinearMipmapLinearFilter),
            (g.magFilter = n.LinearFilter),
            (g.generateMipmaps = !1),
            (g.needsUpdate = !0),
            (g.colorSpace = 2 === c ? n.SRGBColorSpace : n.NoColorSpace),
            (g.premultiplyAlpha = !!(1 & h)),
            g
          );
        }
        async _createTexture(e, A = {}) {
          const t = (function (e) {
            const A = new Uint8Array(e.buffer, e.byteOffset, s.length);
            if (
              A[0] !== s[0] ||
              A[1] !== s[1] ||
              A[2] !== s[2] ||
              A[3] !== s[3] ||
              A[4] !== s[4] ||
              A[5] !== s[5] ||
              A[6] !== s[6] ||
              A[7] !== s[7] ||
              A[8] !== s[8] ||
              A[9] !== s[9] ||
              A[10] !== s[10] ||
              A[11] !== s[11]
            )
              throw new Error("Missing KTX 2.0 identifier.");
            const t = new i(),
              n = 17 * Uint32Array.BYTES_PER_ELEMENT,
              r = new o(e, s.length, n, !0);
            (t.vkFormat = r._nextUint32()),
              (t.typeSize = r._nextUint32()),
              (t.pixelWidth = r._nextUint32()),
              (t.pixelHeight = r._nextUint32()),
              (t.pixelDepth = r._nextUint32()),
              (t.layerCount = r._nextUint32()),
              (t.faceCount = r._nextUint32());
            const c = r._nextUint32();
            t.supercompressionScheme = r._nextUint32();
            const h = r._nextUint32(),
              g = r._nextUint32(),
              l = r._nextUint32(),
              u = r._nextUint32(),
              I = r._nextUint64(),
              E = r._nextUint64(),
              B = new o(e, s.length + n, 3 * c * 8, !0);
            for (let A = 0; A < c; A++)
              t.levels.push({
                levelData: new Uint8Array(
                  e.buffer,
                  e.byteOffset + B._nextUint64(),
                  B._nextUint64()
                ),
                uncompressedByteLength: B._nextUint64(),
              });
            const C = new o(e, h, g, !0),
              p = {
                vendorId: C._skip(4)._nextUint16(),
                descriptorType: C._nextUint16(),
                versionNumber: C._nextUint16(),
                descriptorBlockSize: C._nextUint16(),
                colorModel: C._nextUint8(),
                colorPrimaries: C._nextUint8(),
                transferFunction: C._nextUint8(),
                flags: C._nextUint8(),
                texelBlockDimension: [
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                ],
                bytesPlane: [
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                ],
                samples: [],
              },
              f = (p.descriptorBlockSize / 4 - 6) / 4;
            for (let e = 0; e < f; e++) {
              const A = {
                bitOffset: C._nextUint16(),
                bitLength: C._nextUint8(),
                channelType: C._nextUint8(),
                samplePosition: [
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                  C._nextUint8(),
                ],
                sampleLower: -1 / 0,
                sampleUpper: 1 / 0,
              };
              64 & A.channelType
                ? ((A.sampleLower = C._nextInt32()),
                  (A.sampleUpper = C._nextInt32()))
                : ((A.sampleLower = C._nextUint32()),
                  (A.sampleUpper = C._nextUint32())),
                (p.samples[e] = A);
            }
            (t.dataFormatDescriptor.length = 0), t.dataFormatDescriptor.push(p);
            const d = new o(e, l, u, !0);
            for (; d._offset < u; ) {
              const e = d._nextUint32(),
                A = d._scan(e),
                n = a(A),
                r = d._scan(e - A.byteLength);
              (t.keyValue[n] = n.match(/^ktx/i) ? a(r) : r),
                d._offset % 4 && d._skip(4 - (d._offset % 4));
            }
            if (E <= 0) return t;
            const Q = new o(e, I, E, !0),
              m = Q._nextUint16(),
              w = Q._nextUint16(),
              y = Q._nextUint32(),
              x = Q._nextUint32(),
              b = Q._nextUint32(),
              S = Q._nextUint32(),
              _ = [];
            for (let e = 0; e < c; e++)
              _.push({
                imageFlags: Q._nextUint32(),
                rgbSliceByteOffset: Q._nextUint32(),
                rgbSliceByteLength: Q._nextUint32(),
                alphaSliceByteOffset: Q._nextUint32(),
                alphaSliceByteLength: Q._nextUint32(),
              });
            const D = I + Q._offset,
              R = D + y,
              v = R + x,
              F = v + b,
              T = new Uint8Array(e.buffer, e.byteOffset + D, y),
              M = new Uint8Array(e.buffer, e.byteOffset + R, x),
              L = new Uint8Array(e.buffer, e.byteOffset + v, b),
              G = new Uint8Array(e.buffer, e.byteOffset + F, S);
            return (
              (t.globalData = {
                endpointCount: m,
                selectorCount: w,
                imageDescs: _,
                endpointsData: T,
                selectorsData: M,
                tablesData: L,
                extendedData: G,
              }),
              t
            );
          })(new Uint8Array(e));
          if (0 !== t.vkFormat) {
            const e = [],
              A = [];
            for (let n = 0; n < t.levels.length; n++)
              A.push(
                m(t, n).then(function (A) {
                  e[n] = A;
                })
              );
            await Promise.all(A);
            const n = e[0];
            return (
              (n.mipmaps = e.map((e) => ({
                data: e.source.data,
                width: e.source.data.width,
                height: e.source.data.height,
                depth: e.source.data.depth,
              }))),
              n
            );
          }
          const n = A,
            r = this.init()
              .then(() =>
                this.workerPool.postMessage(
                  { type: "transcode", buffer: e, taskConfig: n },
                  [e]
                )
              )
              .then((e) => this._createTextureFrom(e.data, t));
          return E.set(e, { promise: r }), r;
        }
        dispose() {
          return (
            this.workerPool.dispose(),
            this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL),
            C--,
            this
          );
        }
      }
      (p.BasisFormat = { ETC1S: 0, UASTC_4x4: 1 }),
        (p.TranscoderFormat = {
          ETC1: 0,
          ETC2: 1,
          BC1: 2,
          BC3: 3,
          BC4: 4,
          BC5: 5,
          BC7_M6_OPAQUE_ONLY: 6,
          BC7_M5: 7,
          PVRTC1_4_RGB: 8,
          PVRTC1_4_RGBA: 9,
          ASTC_4x4: 10,
          ATC_RGB: 11,
          ATC_RGBA_INTERPOLATED_ALPHA: 12,
          RGBA32: 13,
          RGB565: 14,
          BGR565: 15,
          RGBA4444: 16,
        }),
        (p.EngineFormat = {
          RGBAFormat: n.RGBAFormat,
          RGBA_ASTC_4x4_Format: n.RGBA_ASTC_4x4_Format,
          RGBA_BPTC_Format: n.RGBA_BPTC_Format,
          RGBA_ETC2_EAC_Format: n.RGBA_ETC2_EAC_Format,
          RGBA_PVRTC_4BPPV1_Format: n.RGBA_PVRTC_4BPPV1_Format,
          RGBA_S3TC_DXT5_Format: n.RGBA_S3TC_DXT5_Format,
          RGB_ETC1_Format: n.RGB_ETC1_Format,
          RGB_ETC2_Format: n.RGB_ETC2_Format,
          RGB_PVRTC_4BPPV1_Format: n.RGB_PVRTC_4BPPV1_Format,
          RGB_S3TC_DXT1_Format: n.RGB_S3TC_DXT1_Format,
        }),
        (p.BasisWorker = function () {
          let e, A, t;
          const n = _EngineFormat,
            r = _TranscoderFormat,
            i = _BasisFormat;
          self.addEventListener("message", function (o) {
            const g = o.data;
            switch (g.type) {
              case "init":
                (e = g.config),
                  (l = g.transcoderBinary),
                  (A = new Promise((e) => {
                    (t = { wasmBinary: l, onRuntimeInitialized: e }), BASIS(t);
                  }).then(() => {
                    t.initializeBasis(),
                      void 0 === t.KTX2File &&
                        console.warn(
                          "THREE.KTX2Loader: Please update Basis Universal transcoder."
                        );
                  }));
                break;
              case "transcode":
                A.then(() => {
                  try {
                    const {
                      faces: A,
                      buffers: o,
                      width: l,
                      height: u,
                      hasAlpha: I,
                      format: E,
                      dfdTransferFn: B,
                      dfdFlags: C,
                    } = (function (A) {
                      const o = new t.KTX2File(new Uint8Array(A));
                      function g() {
                        o.close(), o.delete();
                      }
                      if (!o.isValid())
                        throw (
                          (g(),
                          new Error(
                            "THREE.KTX2Loader:\tInvalid or unsupported .ktx2 file"
                          ))
                        );
                      const l = o.isUASTC() ? i.UASTC_4x4 : i.ETC1S,
                        u = o.getWidth(),
                        I = o.getHeight(),
                        E = o.getLayers() || 1,
                        B = o.getLevels(),
                        C = o.getFaces(),
                        p = o.getHasAlpha(),
                        f = o.getDFDTransferFunc(),
                        d = o.getDFDFlags(),
                        { transcoderFormat: Q, engineFormat: m } = (function (
                          A,
                          t,
                          o,
                          h
                        ) {
                          let g, l;
                          const u = A === i.ETC1S ? s : a;
                          for (let n = 0; n < u.length; n++) {
                            const r = u[n];
                            if (
                              e[r.if] &&
                              r.basisFormat.includes(A) &&
                              !(h && r.transcoderFormat.length < 2) &&
                              (!r.needsPowerOfTwo || (c(t) && c(o)))
                            )
                              return (
                                (g = r.transcoderFormat[h ? 1 : 0]),
                                (l = r.engineFormat[h ? 1 : 0]),
                                { transcoderFormat: g, engineFormat: l }
                              );
                          }
                          return (
                            console.warn(
                              "THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."
                            ),
                            (g = r.RGBA32),
                            (l = n.RGBAFormat),
                            { transcoderFormat: g, engineFormat: l }
                          );
                        })(l, u, I, p);
                      if (!u || !I || !B)
                        throw (
                          (g(), new Error("THREE.KTX2Loader:\tInvalid texture"))
                        );
                      if (!o.startTranscoding())
                        throw (
                          (g(),
                          new Error(
                            "THREE.KTX2Loader: .startTranscoding failed"
                          ))
                        );
                      const w = [],
                        y = [];
                      for (let e = 0; e < C; e++) {
                        const A = [];
                        for (let t = 0; t < B; t++) {
                          const n = [];
                          let r, i;
                          for (let A = 0; A < E; A++) {
                            const s = o.getImageLevelInfo(t, A, e);
                            0 !== e ||
                              0 !== t ||
                              0 !== A ||
                              (s.origWidth % 4 == 0 && s.origHeight % 4 == 0) ||
                              console.warn(
                                "THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."
                              ),
                              B > 1
                                ? ((r = s.origWidth), (i = s.origHeight))
                                : ((r = s.width), (i = s.height));
                            const a = new Uint8Array(
                              o.getImageTranscodedSizeInBytes(t, A, 0, Q)
                            );
                            if (!o.transcodeImage(a, t, A, e, Q, 0, -1, -1))
                              throw (
                                (g(),
                                new Error(
                                  "THREE.KTX2Loader: .transcodeImage failed."
                                ))
                              );
                            n.push(a);
                          }
                          const s = h(n);
                          A.push({ data: s, width: r, height: i }),
                            y.push(s.buffer);
                        }
                        w.push({ mipmaps: A, width: u, height: I, format: m });
                      }
                      return (
                        g(),
                        {
                          faces: w,
                          buffers: y,
                          width: u,
                          height: I,
                          hasAlpha: p,
                          format: m,
                          dfdTransferFn: f,
                          dfdFlags: d,
                        }
                      );
                    })(g.buffer);
                    self.postMessage(
                      {
                        type: "transcode",
                        id: g.id,
                        faces: A,
                        width: l,
                        height: u,
                        hasAlpha: I,
                        format: E,
                        dfdTransferFn: B,
                        dfdFlags: C,
                      },
                      o
                    );
                  } catch (e) {
                    console.error(e),
                      self.postMessage({
                        type: "error",
                        id: g.id,
                        error: e.message,
                      });
                  }
                });
            }
            var l;
          });
          const o = [
              {
                if: "astcSupported",
                basisFormat: [i.UASTC_4x4],
                transcoderFormat: [r.ASTC_4x4, r.ASTC_4x4],
                engineFormat: [n.RGBA_ASTC_4x4_Format, n.RGBA_ASTC_4x4_Format],
                priorityETC1S: 1 / 0,
                priorityUASTC: 1,
                needsPowerOfTwo: !1,
              },
              {
                if: "bptcSupported",
                basisFormat: [i.ETC1S, i.UASTC_4x4],
                transcoderFormat: [r.BC7_M5, r.BC7_M5],
                engineFormat: [n.RGBA_BPTC_Format, n.RGBA_BPTC_Format],
                priorityETC1S: 3,
                priorityUASTC: 2,
                needsPowerOfTwo: !1,
              },
              {
                if: "dxtSupported",
                basisFormat: [i.ETC1S, i.UASTC_4x4],
                transcoderFormat: [r.BC1, r.BC3],
                engineFormat: [n.RGB_S3TC_DXT1_Format, n.RGBA_S3TC_DXT5_Format],
                priorityETC1S: 4,
                priorityUASTC: 5,
                needsPowerOfTwo: !1,
              },
              {
                if: "etc2Supported",
                basisFormat: [i.ETC1S, i.UASTC_4x4],
                transcoderFormat: [r.ETC1, r.ETC2],
                engineFormat: [n.RGB_ETC2_Format, n.RGBA_ETC2_EAC_Format],
                priorityETC1S: 1,
                priorityUASTC: 3,
                needsPowerOfTwo: !1,
              },
              {
                if: "etc1Supported",
                basisFormat: [i.ETC1S, i.UASTC_4x4],
                transcoderFormat: [r.ETC1],
                engineFormat: [n.RGB_ETC1_Format],
                priorityETC1S: 2,
                priorityUASTC: 4,
                needsPowerOfTwo: !1,
              },
              {
                if: "pvrtcSupported",
                basisFormat: [i.ETC1S, i.UASTC_4x4],
                transcoderFormat: [r.PVRTC1_4_RGB, r.PVRTC1_4_RGBA],
                engineFormat: [
                  n.RGB_PVRTC_4BPPV1_Format,
                  n.RGBA_PVRTC_4BPPV1_Format,
                ],
                priorityETC1S: 5,
                priorityUASTC: 6,
                needsPowerOfTwo: !0,
              },
            ],
            s = o.sort(function (e, A) {
              return e.priorityETC1S - A.priorityETC1S;
            }),
            a = o.sort(function (e, A) {
              return e.priorityUASTC - A.priorityUASTC;
            });
          function c(e) {
            return e <= 2 || (0 == (e & (e - 1)) && 0 !== e);
          }
          function h(e) {
            if (1 === e.length) return e[0];
            let A = 0;
            for (let t = 0; t < e.length; t++) A += e[t].byteLength;
            const t = new Uint8Array(A);
            let n = 0;
            for (let A = 0; A < e.length; A++) {
              const r = e[A];
              t.set(r, n), (n += r.byteLength);
            }
            return t;
          }
        });
      const f = {
          109: n.RGBAFormat,
          97: n.RGBAFormat,
          37: n.RGBAFormat,
          43: n.RGBAFormat,
          103: n.RGFormat,
          83: n.RGFormat,
          16: n.RGFormat,
          22: n.RGFormat,
          100: n.RedFormat,
          76: n.RedFormat,
          15: n.RedFormat,
          9: n.RedFormat,
        },
        d = {
          109: n.FloatType,
          97: n.HalfFloatType,
          37: n.UnsignedByteType,
          43: n.UnsignedByteType,
          103: n.FloatType,
          83: n.HalfFloatType,
          16: n.UnsignedByteType,
          22: n.UnsignedByteType,
          100: n.FloatType,
          76: n.HalfFloatType,
          15: n.UnsignedByteType,
          9: n.UnsignedByteType,
        },
        Q = {
          43: n.SRGBColorSpace,
          22: n.SRGBColorSpace,
          15: n.SRGBColorSpace,
        };
      async function m(e, A = 0) {
        const { vkFormat: t } = e,
          r = Math.max(1, e.pixelWidth >> A),
          i = Math.max(1, e.pixelHeight >> A),
          o = Math.max(1, e.pixelDepth >> A);
        if (void 0 === f[t])
          throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
        const s = e.levels[A];
        let a, c;
        if (0 === e.supercompressionScheme) a = s.levelData;
        else {
          if (2 !== e.supercompressionScheme)
            throw new Error(
              "THREE.KTX2Loader: Unsupported supercompressionScheme."
            );
          B ||
            (B = new Promise(async (e) => {
              const A = new u();
              await A.init(), e(A);
            })),
            (a = (await B).decode(s.levelData, s.uncompressedByteLength));
        }
        c =
          d[t] === n.FloatType
            ? new Float32Array(
                a.buffer,
                a.byteOffset,
                a.byteLength / Float32Array.BYTES_PER_ELEMENT
              )
            : d[t] === n.HalfFloatType
            ? new Uint16Array(
                a.buffer,
                a.byteOffset,
                a.byteLength / Uint16Array.BYTES_PER_ELEMENT
              )
            : a;
        const h =
          0 === o
            ? new n.DataTexture(c, r, i)
            : new n.Data3DTexture(c, r, i, o);
        return (
          (h.type = d[t]),
          (h.format = f[t]),
          (h.colorSpace = Q[t] || n.NoColorSpace),
          (h.needsUpdate = !0),
          Promise.resolve(h)
        );
      }
    },
    3051: function (e, A, t) {
      "use strict";
      t.d(A, {
        x: function () {
          return r;
        },
      });
      var n = t(4468);
      class r extends n.DataTextureLoader {
        constructor(e) {
          super(e), (this.type = n.HalfFloatType);
        }
        parse(e) {
          const A = function (e, A) {
              switch (e) {
                case 1:
                  console.error("THREE.RGBELoader Read Error: " + (A || ""));
                  break;
                case 2:
                  console.error("THREE.RGBELoader Write Error: " + (A || ""));
                  break;
                case 3:
                  console.error(
                    "THREE.RGBELoader Bad File Format: " + (A || "")
                  );
                  break;
                default:
                  console.error("THREE.RGBELoader: Error: " + (A || ""));
              }
              return -1;
            },
            t = function (e, A, t) {
              A = A || 1024;
              let n = e.pos,
                r = -1,
                i = 0,
                o = "",
                s = String.fromCharCode.apply(
                  null,
                  new Uint16Array(e.subarray(n, n + 128))
                );
              for (; 0 > (r = s.indexOf("\n")) && i < A && n < e.byteLength; )
                (o += s),
                  (i += s.length),
                  (n += 128),
                  (s += String.fromCharCode.apply(
                    null,
                    new Uint16Array(e.subarray(n, n + 128))
                  ));
              return (
                -1 < r && (!1 !== t && (e.pos += i + r + 1), o + s.slice(0, r))
              );
            },
            r = function (e, A, t, n) {
              const r = e[A + 3],
                i = Math.pow(2, r - 128) / 255;
              (t[n + 0] = e[A + 0] * i),
                (t[n + 1] = e[A + 1] * i),
                (t[n + 2] = e[A + 2] * i),
                (t[n + 3] = 1);
            },
            i = function (e, A, t, r) {
              const i = e[A + 3],
                o = Math.pow(2, i - 128) / 255;
              (t[r + 0] = n.DataUtils.toHalfFloat(
                Math.min(e[A + 0] * o, 65504)
              )),
                (t[r + 1] = n.DataUtils.toHalfFloat(
                  Math.min(e[A + 1] * o, 65504)
                )),
                (t[r + 2] = n.DataUtils.toHalfFloat(
                  Math.min(e[A + 2] * o, 65504)
                )),
                (t[r + 3] = n.DataUtils.toHalfFloat(1));
            },
            o = new Uint8Array(e);
          o.pos = 0;
          const s = (function (e) {
            const n = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
              r = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
              i = /^\s*FORMAT=(\S+)\s*$/,
              o = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
              s = {
                valid: 0,
                string: "",
                comments: "",
                programtype: "RGBE",
                format: "",
                gamma: 1,
                exposure: 1,
                width: 0,
                height: 0,
              };
            let a, c;
            if (e.pos >= e.byteLength || !(a = t(e)))
              return A(1, "no header found");
            if (!(c = a.match(/^#\?(\S+)/))) return A(3, "bad initial token");
            for (
              s.valid |= 1, s.programtype = c[1], s.string += a + "\n";
              (a = t(e)), !1 !== a;

            )
              if (((s.string += a + "\n"), "#" !== a.charAt(0))) {
                if (
                  ((c = a.match(n)) && (s.gamma = parseFloat(c[1])),
                  (c = a.match(r)) && (s.exposure = parseFloat(c[1])),
                  (c = a.match(i)) && ((s.valid |= 2), (s.format = c[1])),
                  (c = a.match(o)) &&
                    ((s.valid |= 4),
                    (s.height = parseInt(c[1], 10)),
                    (s.width = parseInt(c[2], 10))),
                  2 & s.valid && 4 & s.valid)
                )
                  break;
              } else s.comments += a + "\n";
            return 2 & s.valid
              ? 4 & s.valid
                ? s
                : A(3, "missing image size specifier")
              : A(3, "missing format specifier");
          })(o);
          if (-1 !== s) {
            const e = s.width,
              t = s.height,
              a = (function (e, t, n) {
                const r = t;
                if (
                  r < 8 ||
                  r > 32767 ||
                  2 !== e[0] ||
                  2 !== e[1] ||
                  128 & e[2]
                )
                  return new Uint8Array(e);
                if (r !== ((e[2] << 8) | e[3]))
                  return A(3, "wrong scanline width");
                const i = new Uint8Array(4 * t * n);
                if (!i.length) return A(4, "unable to allocate buffer space");
                let o = 0,
                  s = 0;
                const a = 4 * r,
                  c = new Uint8Array(4),
                  h = new Uint8Array(a);
                let g = n;
                for (; g > 0 && s < e.byteLength; ) {
                  if (s + 4 > e.byteLength) return A(1);
                  if (
                    ((c[0] = e[s++]),
                    (c[1] = e[s++]),
                    (c[2] = e[s++]),
                    (c[3] = e[s++]),
                    2 != c[0] || 2 != c[1] || ((c[2] << 8) | c[3]) != r)
                  )
                    return A(3, "bad rgbe scanline format");
                  let t,
                    n = 0;
                  for (; n < a && s < e.byteLength; ) {
                    t = e[s++];
                    const r = t > 128;
                    if ((r && (t -= 128), 0 === t || n + t > a))
                      return A(3, "bad scanline data");
                    if (r) {
                      const A = e[s++];
                      for (let e = 0; e < t; e++) h[n++] = A;
                    } else h.set(e.subarray(s, s + t), n), (n += t), (s += t);
                  }
                  const l = r;
                  for (let e = 0; e < l; e++) {
                    let A = 0;
                    (i[o] = h[e + A]),
                      (A += r),
                      (i[o + 1] = h[e + A]),
                      (A += r),
                      (i[o + 2] = h[e + A]),
                      (A += r),
                      (i[o + 3] = h[e + A]),
                      (o += 4);
                  }
                  g--;
                }
                return i;
              })(o.subarray(o.pos), e, t);
            if (-1 !== a) {
              let A, o, c;
              switch (this.type) {
                case n.FloatType:
                  c = a.length / 4;
                  const e = new Float32Array(4 * c);
                  for (let A = 0; A < c; A++) r(a, 4 * A, e, 4 * A);
                  (A = e), (o = n.FloatType);
                  break;
                case n.HalfFloatType:
                  c = a.length / 4;
                  const t = new Uint16Array(4 * c);
                  for (let e = 0; e < c; e++) i(a, 4 * e, t, 4 * e);
                  (A = t), (o = n.HalfFloatType);
                  break;
                default:
                  console.error(
                    "THREE.RGBELoader: unsupported type: ",
                    this.type
                  );
              }
              return {
                width: e,
                height: t,
                data: A,
                header: s.string,
                gamma: s.gamma,
                exposure: s.exposure,
                type: o,
              };
            }
          }
          return null;
        }
        setDataType(e) {
          return (this.type = e), this;
        }
        load(e, A, t, r) {
          return super.load(
            e,
            function (e, t) {
              switch (e.type) {
                case n.FloatType:
                case n.HalfFloatType:
                  (e.colorSpace = n.LinearSRGBColorSpace),
                    (e.minFilter = n.LinearFilter),
                    (e.magFilter = n.LinearFilter),
                    (e.generateMipmaps = !1),
                    (e.flipY = !0);
              }
              A && A(e, t);
            },
            t,
            r
          );
        }
      }
    },
    728: function (e, A, t) {
      "use strict";
      t.d(A, {
        h: function () {
          return n;
        },
      });
      class n {
        constructor(e = 4) {
          (this.pool = e),
            (this.queue = []),
            (this.workers = []),
            (this.workersResolve = []),
            (this.workerStatus = 0);
        }
        _initWorker(e) {
          if (!this.workers[e]) {
            const A = this.workerCreator();
            A.addEventListener("message", this._onMessage.bind(this, e)),
              (this.workers[e] = A);
          }
        }
        _getIdleWorker() {
          for (let e = 0; e < this.pool; e++)
            if (!(this.workerStatus & (1 << e))) return e;
          return -1;
        }
        _onMessage(e, A) {
          const t = this.workersResolve[e];
          if ((t && t(A), this.queue.length)) {
            const { resolve: A, msg: t, transfer: n } = this.queue.shift();
            (this.workersResolve[e] = A), this.workers[e].postMessage(t, n);
          } else this.workerStatus ^= 1 << e;
        }
        setWorkerCreator(e) {
          this.workerCreator = e;
        }
        setWorkerLimit(e) {
          this.pool = e;
        }
        postMessage(e, A) {
          return new Promise((t) => {
            const n = this._getIdleWorker();
            -1 !== n
              ? (this._initWorker(n),
                (this.workerStatus |= 1 << n),
                (this.workersResolve[n] = t),
                this.workers[n].postMessage(e, A))
              : this.queue.push({ resolve: t, msg: e, transfer: A });
          });
        }
        dispose() {
          this.workers.forEach((e) => e.terminate()),
            (this.workersResolve.length = 0),
            (this.workers.length = 0),
            (this.queue.length = 0),
            (this.workerStatus = 0);
        }
      }
    },
    6327: function (e, A, t) {
      "use strict";
      t.d(A, {
        Z: function () {
          return n;
        },
      });
      class n {
        constructor({
          logsPerSecond: e = 20,
          samplesLog: A = 100,
          samplesGraph: t = 10,
          precision: r = 2,
          minimal: i = !1,
          horizontal: o = !0,
          mode: s = 0,
        } = {}) {
          (this.mode = s),
            (this.horizontal = o),
            (this.container = document.createElement("div")),
            (this.container.style.cssText =
              "position:fixed;top:0;left:0;opacity:0.9;z-index:10000;"),
            i && (this.container.style.cssText += "cursor:pointer"),
            (this.canvasGpu = null),
            (this.gl = null),
            (this.query = null),
            (this.minimal = i),
            (this.beginTime = (performance || Date).now()),
            (this.prevTime = this.beginTime),
            (this.prevCpuTime = this.beginTime),
            (this.frames = 0),
            (this.averageCpu = { logs: [], graph: [] }),
            (this.averageGpu = { logs: [], graph: [] }),
            (this.queryCreated = !1),
            (this.fpsPanel = this.addPanel(
              new n.Panel("FPS", "#0ff", "#002"),
              0
            )),
            (this.msPanel = this.addPanel(
              new n.Panel("CPU", "#0f0", "#020"),
              1
            )),
            (this.gpuPanel = null),
            (this.samplesLog = A),
            (this.samplesGraph = t),
            (this.precision = r),
            (this.logsPerSecond = e),
            this.minimal
              ? (this.container.addEventListener(
                  "click",
                  (e) => {
                    e.preventDefault(),
                      this.showPanel(
                        ++this.mode % this.container.children.length
                      );
                  },
                  !1
                ),
                (this.mode = s),
                this.showPanel(this.mode))
              : window.addEventListener("resize", () => {
                  this.resizePanel(this.fpsPanel, 0),
                    this.resizePanel(this.msPanel, 1),
                    this.gpuPanel && this.resizePanel(this.gpuPanel, 2);
                });
        }
        resizePanel(e, A) {
          (e.canvas.style.position = "absolute"),
            this.minimal
              ? (e.canvas.style.display = "none")
              : ((e.canvas.style.display = "block"),
                this.horizontal
                  ? ((e.canvas.style.top = "0px"),
                    (e.canvas.style.left = (A * e.WIDTH) / e.PR + "px"))
                  : ((e.canvas.style.left = "0px"),
                    (e.canvas.style.top = (A * e.HEIGHT) / e.PR + "px")));
        }
        addPanel(e, A) {
          return (
            e.canvas &&
              (this.container.appendChild(e.canvas), this.resizePanel(e, A)),
            e
          );
        }
        showPanel(e) {
          for (let A = 0; A < this.container.children.length; A++)
            this.container.children[A].style.display =
              A === e ? "block" : "none";
          this.mode = e;
        }
        init(e) {
          (this.canvasGpu = e),
            this.canvasGpu &&
              ((this.gl = this.canvasGpu.getContext("webgl2")),
              (this.ext = this.gl
                ? this.gl.getExtension("EXT_disjoint_timer_query_webgl2")
                : null),
              this.ext &&
                (this.gpuPanel = this.addPanel(
                  new n.Panel("GPU", "#ff0", "#220"),
                  2
                )));
        }
        begin() {
          if ((this.beginProfiling("cpu-started"), this.gl && this.ext)) {
            if (this.query) {
              const e = this.gl.getQueryParameter(
                this.query,
                this.gl.QUERY_RESULT_AVAILABLE
              );
              if (
                ((this.disjoint = this.gl.getParameter(
                  this.ext.GPU_DISJOINT_EXT
                )),
                e && !this.disjoint)
              ) {
                this.ns = this.gl.getQueryParameter(
                  this.query,
                  this.gl.QUERY_RESULT
                );
                const A = 1e-6 * this.ns;
                (e || this.disjoint) &&
                  (this.gl.deleteQuery(this.query), (this.query = null)),
                  e && this.addToAverage(A, this.averageGpu);
              }
            }
            this.query ||
              ((this.queryCreated = !0),
              (this.query = this.gl.createQuery()),
              this.query &&
                this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.query));
          }
        }
        end() {
          (this.beginTime = this.endInternal()),
            this.endProfiling(
              "cpu-started",
              "cpu-finished",
              "cpu-duration",
              this.averageCpu
            ),
            this.gl &&
              this.ext &&
              this.queryCreated &&
              this.gl.getQuery(
                this.ext.TIME_ELAPSED_EXT,
                this.gl.CURRENT_QUERY
              ) &&
              this.gl.endQuery(this.ext.TIME_ELAPSED_EXT);
        }
        endInternal() {
          this.frames++;
          const e = (performance || Date).now();
          if (
            (e >= this.prevCpuTime + 1e3 / this.logsPerSecond &&
              (this.updatePanel(this.msPanel, this.averageCpu),
              this.updatePanel(this.gpuPanel, this.averageGpu),
              (this.prevCpuTime = e)),
            e >= this.prevTime + 1e3)
          ) {
            const A = (1e3 * this.frames) / (e - this.prevTime);
            this.fpsPanel.update(A, A, 100, 100, 0),
              (this.prevTime = e),
              (this.frames = 0);
          }
          return e;
        }
        addToAverage(e, A) {
          A.logs.push(e),
            A.logs.length > this.samplesLog && A.logs.shift(),
            A.graph.push(e),
            A.graph.length > this.samplesGraph && A.graph.shift();
        }
        beginProfiling(e) {
          window.performance && window.performance.mark(e);
        }
        endProfiling(e, A, t, n) {
          if (window.performance && A) {
            window.performance.mark(A);
            const r = performance.measure(t, e, A);
            this.addToAverage(r.duration, n);
          }
        }
        updatePanel(e, A) {
          if (A.logs.length > 0) {
            let t = 0,
              n = 0.01;
            for (let e = 0; e < A.logs.length; e++)
              (t += A.logs[e]), A.logs[e] > n && (n = A.logs[e]);
            let r = 0,
              i = 0.01;
            for (let e = 0; e < A.graph.length; e++)
              (r += A.graph[e]), A.graph[e] > i && (i = A.graph[e]);
            e &&
              e.update(
                t / Math.min(A.logs.length, this.samplesLog),
                r / Math.min(A.graph.length, this.samplesGraph),
                n,
                i,
                this.precision
              );
          }
        }
      }
      n.Panel = class {
        constructor(e, A, t) {
          (this.name = e),
            (this.fg = A),
            (this.bg = t),
            (this.PR = Math.round(window.devicePixelRatio || 1)),
            (this.WIDTH = 90 * this.PR),
            (this.HEIGHT = 48 * this.PR),
            (this.TEXT_X = 3 * this.PR),
            (this.TEXT_Y = 2 * this.PR),
            (this.GRAPH_X = 3 * this.PR),
            (this.GRAPH_Y = 15 * this.PR),
            (this.GRAPH_WIDTH = 84 * this.PR),
            (this.GRAPH_HEIGHT = 30 * this.PR),
            (this.canvas = document.createElement("canvas")),
            (this.canvas.width = 90 * this.PR),
            (this.canvas.height = 48 * this.PR),
            (this.canvas.style.width = "90px"),
            (this.canvas.style.position = "absolute"),
            (this.canvas.style.height = "48px"),
            (this.canvas.style.cssText = "width:90px;height:48px"),
            (this.context = this.canvas.getContext("2d")),
            this.context &&
              ((this.context.font =
                "bold " + 9 * this.PR + "px Helvetica,Arial,sans-serif"),
              (this.context.textBaseline = "top"),
              (this.context.fillStyle = this.bg),
              this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT),
              (this.context.fillStyle = this.fg),
              this.context.fillText(this.name, this.TEXT_X, this.TEXT_Y),
              this.context.fillRect(
                this.GRAPH_X,
                this.GRAPH_Y,
                this.GRAPH_WIDTH,
                this.GRAPH_HEIGHT
              ),
              (this.context.fillStyle = this.bg),
              (this.context.globalAlpha = 0.9),
              this.context.fillRect(
                this.GRAPH_X,
                this.GRAPH_Y,
                this.GRAPH_WIDTH,
                this.GRAPH_HEIGHT
              ));
        }
        update(e, A, t, n, r = 0) {
          let i = 1 / 0,
            o = 0;
          this.context &&
            ((i = Math.min(i, e)),
            (o = Math.max(t, e)),
            (n = Math.max(n, A)),
            (this.context.fillStyle = this.bg),
            (this.context.globalAlpha = 1),
            this.context.fillRect(0, 0, this.WIDTH, this.GRAPH_Y),
            (this.context.fillStyle = this.fg),
            this.context.fillText(
              e.toFixed(r) +
                " " +
                this.name +
                " (" +
                i.toFixed(r) +
                "-" +
                parseFloat(o.toFixed(r)) +
                ")",
              this.TEXT_X,
              this.TEXT_Y
            ),
            this.context.drawImage(
              this.canvas,
              this.GRAPH_X + this.PR,
              this.GRAPH_Y,
              this.GRAPH_WIDTH - this.PR,
              this.GRAPH_HEIGHT,
              this.GRAPH_X,
              this.GRAPH_Y,
              this.GRAPH_WIDTH - this.PR,
              this.GRAPH_HEIGHT
            ),
            this.context.fillRect(
              this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
              this.GRAPH_Y,
              this.PR,
              this.GRAPH_HEIGHT
            ),
            (this.context.fillStyle = this.bg),
            (this.context.globalAlpha = 0.9),
            this.context.fillRect(
              this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
              this.GRAPH_Y,
              this.PR,
              (1 - A / n) * this.GRAPH_HEIGHT
            ));
        }
      };
    },
  },
]);
