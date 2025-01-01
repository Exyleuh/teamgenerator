"use strict";
(self.webpackChunk_7DSRando = self.webpackChunk_7DSRando || []).push([
  [179],
  {
    391: () => {
      let Se = null,
        Zr = 1;
      function be(e) {
        const n = Se;
        return (Se = e), n;
      }
      function rg(e) {
        if ((!go(e) || e.dirty) && (e.dirty || e.lastCleanEpoch !== Zr)) {
          if (!e.producerMustRecompute(e) && !Yl(e))
            return (e.dirty = !1), void (e.lastCleanEpoch = Zr);
          e.producerRecomputeValue(e),
            (e.dirty = !1),
            (e.lastCleanEpoch = Zr);
        }
      }
      function Yl(e) {
        Qr(e);
        for (let n = 0; n < e.producerNode.length; n++) {
          const t = e.producerNode[n],
            r = e.producerLastReadVersion[n];
          if (r !== t.version || (rg(t), r !== t.version)) return !0;
        }
        return !1;
      }
      function ta(e, n) {
        if (
          (function ug(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          Qr(e),
          1 === e.liveConsumerNode.length
        )
          for (let r = 0; r < e.producerNode.length; r++)
            ta(e.producerNode[r], e.producerIndexOfThis[r]);
        const t = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[n] = e.liveConsumerNode[t]),
          (e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          n < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[n],
            i = e.liveConsumerNode[n];
          Qr(i), (i.producerIndexOfThis[r] = n);
        }
      }
      function go(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function Qr(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let dg = null;
      function _e(e) {
        return "function" == typeof e;
      }
      function Jl(e) {
        const t = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const eu = Jl(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function na(e, n) {
        if (e) {
          const t = e.indexOf(n);
          0 <= t && e.splice(t, 1);
        }
      }
      class rt {
        constructor(n) {
          (this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            (this.closed = !0);
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const o of t) o.remove(this);
              else t.remove(this);
            const { initialTeardown: r } = this;
            if (_e(r))
              try {
                r();
              } catch (o) {
                n = o instanceof eu ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  mg(o);
                } catch (s) {
                  (n = n ?? []),
                    s instanceof eu ? (n = [...n, ...s.errors]) : n.push(s);
                }
            }
            if (n) throw new eu(n);
          }
        }
        add(n) {
          var t;
          if (n && n !== this)
            if (this.closed) mg(n);
            else {
              if (n instanceof rt) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              ((this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : [])
              ).push(n);
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this;
          return t === n || (Array.isArray(t) && t.includes(n));
        }
        _addParent(n) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
        }
        _removeParent(n) {
          const { _parentage: t } = this;
          t === n
            ? (this._parentage = null)
            : Array.isArray(t) && na(t, n);
        }
        remove(n) {
          const { _finalizers: t } = this;
          t && na(t, n),
            n instanceof rt && n._removeParent(this);
        }
      }
      rt.EMPTY = (() => {
        const e = new rt();
        return (e.closed = !0), e;
      })();
      const pg = rt.EMPTY;
      function gg(e) {
        return (
          e instanceof rt ||
          (e && "closed" in e && _e(e.remove) && _e(e.add) && _e(e.unsubscribe))
        );
      }
      function mg(e) {
        _e(e) ? e() : e.unsubscribe();
      }
      const dr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        ra = {
          setTimeout(e, n, ...t) {
            const { delegate: r } = ra;
            return r?.setTimeout ? r.setTimeout(e, n, ...t) : setTimeout(e, n, ...t);
          },
          clearTimeout(e) {
            const { delegate: n } = ra;
            return (n?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function vg(e) {
        ra.setTimeout(() => {
          const { onUnhandledError: n } = dr;
          if (!n) throw e;
          n(e);
        });
      }
      function tu() {}
      const BM = nu("C", void 0, void 0);
      function nu(e, n, t) {
        return { kind: e, value: n, error: t };
      }
      let fr = null;
      function ia(e) {
        if (dr.useDeprecatedSynchronousErrorHandling) {
          const n = !fr;
          if (
            ((fr = { errorThrown: !1, error: null }),
            e(),
            n)
          ) {
            const { errorThrown: t, error: r } = fr;
            if (((fr = null), t)) throw r;
          }
        } else e();
      }
      class ru extends rt {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? (this.destination = n)
              : (this.destination = WM);
        }
        static create(n, t, r) {
          return new ou(n, t, r);
        }
        next(n) {
          this.isStopped ? su(function UM(e) {
            return nu("N", e, void 0);
          }(n), this) : this._next(n);
        }
        error(n) {
          this.isStopped
            ? su(function HM(e) {
                return nu("E", void 0, e);
              }(n), this)
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped ? su(BM, this) : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const zM = Function.prototype.bind;
      function iu(e, n) {
        return zM.call(e, n);
      }
      class GM {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(n);
            } catch (r) {
              oa(r);
            }
        }
        error(n) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(n);
            } catch (r) {
              oa(r);
            }
          else oa(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (t) {
              oa(t);
            }
        }
      }
      class ou extends ru {
        constructor(n, t, r) {
          let i;
          if ((super(), _e(n) || !n))
            i = { next: n ?? void 0, error: t ?? void 0, complete: r ?? void 0 };
          else {
            let o;
            this && dr.useDeprecatedNextContext
              ? ((o = Object.create(n)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: n.next && iu(n.next, o),
                  error: n.error && iu(n.error, o),
                  complete: n.complete && iu(n.complete, o),
                }))
              : (i = n);
          }
          this.destination = new GM(i);
        }
      }
      function oa(e) {
        dr.useDeprecatedSynchronousErrorHandling
          ? (function $M(e) {
              dr.useDeprecatedSynchronousErrorHandling && fr && ((fr.errorThrown = !0), (fr.error = e));
            })(e)
          : vg(e);
      }
      function su(e, n) {
        const { onStoppedNotification: t } = dr;
        t && ra.setTimeout(() => t(e, n));
      }
      const WM = {
        closed: !0,
        next: tu,
        error: function qM(e) {
          throw e;
        },
        complete: tu,
      };
      const TwitchContentRemoval = `All references to 'twitch-container' removed.`
      console.log(TwitchContentRemoval);
    },
  },
]);
