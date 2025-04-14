
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "createNeutron", () => $5668bd9d69d14160$export$5a73cd1d96004641);
var $789d092e86e51d30$export$9c040c38f8402bb4 = /*#__PURE__*/ function(NeutronType) {
    /**
   * emit only when explicitly called
   */ NeutronType["Default"] = "default";
    /**
   * always re-emit latest state to any new watcher
   */ NeutronType["ReEmit"] = "re-emit-for-new-watcher";
    return NeutronType;
}({});


const $5668bd9d69d14160$export$20783ea8a9ad2c8d = (previousState, emitted = false)=>(behavior = (0, $789d092e86e51d30$export$9c040c38f8402bb4).Default)=>{
        const watchers = new Set();
        /**
   * unsubscribes from current neutron
   */ const abandon = (watcherToRemove)=>watchers.delete(watcherToRemove);
        /**
   * subscribes to current neutron
   */ const watch = (watcher)=>{
            watchers.add(watcher);
            if (behavior === (0, $789d092e86e51d30$export$9c040c38f8402bb4).ReEmit && emitted === true) emitToSingleWatcher(watcher, previousState);
            return ()=>abandon(watcher);
        };
        const emitToSingleWatcher = (watcher, nextState, previousState)=>watcher(nextState, previousState);
        /**
   * fires new data to all observers
   */ const emit = (nextState)=>{
            watchers.forEach((watcher)=>emitToSingleWatcher(watcher, nextState, previousState));
            previousState = nextState;
            emitted = true;
        };
        /**
   * return array of current watchers
   */ const getWatchers = ()=>Array.from(watchers);
        return {
            watch: watch,
            abandon: abandon,
            emit: emit,
            getWatchers: getWatchers
        };
    };
const $5668bd9d69d14160$export$5a73cd1d96004641 = (behavior)=>$5668bd9d69d14160$export$20783ea8a9ad2c8d()(behavior);




//# sourceMappingURL=index.js.map
