(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all3) => {
    __markAsModule(target);
    for (var name in all3)
      __defProp(target, name, { get: all3[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // example/.central/.central-build/node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "example/.central/.central-build/node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.1.0";
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            isMounted: function(publicInstance) {
              return false;
            },
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty2.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty2.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element2 = {
              $$typeof: REACT_ELEMENT_TYPE,
              type,
              key,
              ref,
              props,
              _owner: owner
            };
            {
              element2._store = {};
              Object.defineProperty(element2._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element2, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element2, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element2.props);
                Object.freeze(element2);
              }
            }
            return element2;
          };
          function createElement(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element2, config, children) {
            if (element2 === null || element2 === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element2 + ".");
            }
            var propName;
            var props = assign({}, element2.props);
            var key = element2.key;
            var ref = element2.ref;
            var self = element2._self;
            var source = element2._source;
            var owner = element2._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element2.type && element2.type.defaultProps) {
                defaultProps = element2.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element2.type, key, ref, self, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text4) {
            return text4.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element2, index2) {
            if (typeof element2 === "object" && element2 !== null && element2.key != null) {
              {
                checkKeyStringCoercion(element2.key);
              }
              return escape("" + element2.key);
            }
            return index2.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect(create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create2, deps);
          }
          function useInsertionEffect(create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create2, deps);
          }
          function useLayoutEffect(create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create2, deps);
          }
          function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create2, deps);
          }
          function useImperativeHandle(ref, create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create2, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element2) {
            {
              if (element2) {
                var owner = element2._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element2.type, element2._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element2) {
            {
              var has = Function.call.bind(hasOwnProperty2);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element2);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element2);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element2) {
            {
              if (element2) {
                var owner = element2._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element2.type, element2._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element2, parentType) {
            if (!element2._store || element2._store.validated || element2.key != null) {
              return;
            }
            element2._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element2 && element2._owner && element2._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element2._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element2);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element2) {
            {
              var type = element2.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element2.props, "prop", name, element2);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys2 = Object.keys(fragment.props);
              for (var i = 0; i < keys2.length; i++) {
                var key = keys2[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element2 = createElement.apply(this, arguments);
            if (element2 == null) {
              return element2;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element2);
            } else {
              validatePropTypes(element2);
            }
            return element2;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element2, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i = 0;
                try {
                  for (; i < queue.length; i++) {
                    var callback = queue[i];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.startTransition = startTransition;
          exports.unstable_act = act;
          exports.useCallback = useCallback;
          exports.useContext = useContext;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect;
          exports.useId = useId;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef;
          exports.useState = useState;
          exports.useSyncExternalStore = useSyncExternalStore;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // example/.central/.central-build/node_modules/react/index.js
  var require_react = __commonJS({
    "example/.central/.central-build/node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // example/.central/.central-build/node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js
  var require_react_dom_server_legacy_browser_development = __commonJS({
    "example/.central/.central-build/node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React3 = require_react();
          var ReactVersion = "18.1.0";
          var ReactSharedInternals = React3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          function scheduleWork(callback) {
            callback();
          }
          function beginWriting(destination) {
          }
          var prevWasCommentSegmenter = false;
          function writeChunk(destination, chunk) {
            writeChunkAndReturn(destination, chunk);
          }
          function writeChunkAndReturn(destination, chunk) {
            if (prevWasCommentSegmenter) {
              prevWasCommentSegmenter = false;
              if (chunk[0] !== "<") {
                destination.push("<!-- -->");
              }
            }
            if (chunk === "<!-- -->") {
              prevWasCommentSegmenter = true;
              return true;
            }
            return destination.push(chunk);
          }
          function completeWriting(destination) {
          }
          function close(destination) {
            destination.push(null);
          }
          function stringToChunk(content3) {
            return content3;
          }
          function stringToPrecomputedChunk(content3) {
            return content3;
          }
          function closeWithError(destination, error2) {
            destination.destroy(error2);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkAttributeStringCoercion(value, attributeName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkCSSPropertyStringCoercion(value, propName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkHtmlStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          var RESERVED = 0;
          var STRING = 1;
          var BOOLEANISH_STRING = 2;
          var BOOLEAN = 3;
          var OVERLOADED_BOOLEAN = 4;
          var NUMERIC = 5;
          var POSITIVE_NUMERIC = 6;
          var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
          var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
          var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
          var illegalAttributeNameCache = {};
          var validatedAttributeNameCache = {};
          function isAttributeNameSafe(attributeName) {
            if (hasOwnProperty2.call(validatedAttributeNameCache, attributeName)) {
              return true;
            }
            if (hasOwnProperty2.call(illegalAttributeNameCache, attributeName)) {
              return false;
            }
            if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
              validatedAttributeNameCache[attributeName] = true;
              return true;
            }
            illegalAttributeNameCache[attributeName] = true;
            {
              error("Invalid attribute name: `%s`", attributeName);
            }
            return false;
          }
          function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
            if (propertyInfo !== null && propertyInfo.type === RESERVED) {
              return false;
            }
            switch (typeof value) {
              case "function":
              case "symbol":
                return true;
              case "boolean": {
                if (isCustomComponentTag) {
                  return false;
                }
                if (propertyInfo !== null) {
                  return !propertyInfo.acceptsBooleans;
                } else {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  return prefix2 !== "data-" && prefix2 !== "aria-";
                }
              }
              default:
                return false;
            }
          }
          function getPropertyInfo(name) {
            return properties.hasOwnProperty(name) ? properties[name] : null;
          }
          function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
            this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
            this.attributeName = attributeName;
            this.attributeNamespace = attributeNamespace;
            this.mustUseProperty = mustUseProperty;
            this.propertyName = name;
            this.type = type;
            this.sanitizeURL = sanitizeURL2;
            this.removeEmptyString = removeEmptyString;
          }
          var properties = {};
          var reservedProps = [
            "children",
            "dangerouslySetInnerHTML",
            "defaultValue",
            "defaultChecked",
            "innerHTML",
            "suppressContentEditableWarning",
            "suppressHydrationWarning",
            "style"
          ];
          reservedProps.forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
          });
          [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
            var name = _ref[0], attributeName = _ref[1];
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
          });
          ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
          });
          [
            "allowFullScreen",
            "async",
            "autoFocus",
            "autoPlay",
            "controls",
            "default",
            "defer",
            "disabled",
            "disablePictureInPicture",
            "disableRemotePlayback",
            "formNoValidate",
            "hidden",
            "loop",
            "noModule",
            "noValidate",
            "open",
            "playsInline",
            "readOnly",
            "required",
            "reversed",
            "scoped",
            "seamless",
            "itemScope"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
          });
          [
            "checked",
            "multiple",
            "muted",
            "selected"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
          });
          [
            "capture",
            "download"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
          });
          [
            "cols",
            "rows",
            "size",
            "span"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
          });
          ["rowSpan", "start"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
          });
          var CAMELIZE = /[\-\:]([a-z])/g;
          var capitalize = function(token) {
            return token[1].toUpperCase();
          };
          [
            "accent-height",
            "alignment-baseline",
            "arabic-form",
            "baseline-shift",
            "cap-height",
            "clip-path",
            "clip-rule",
            "color-interpolation",
            "color-interpolation-filters",
            "color-profile",
            "color-rendering",
            "dominant-baseline",
            "enable-background",
            "fill-opacity",
            "fill-rule",
            "flood-color",
            "flood-opacity",
            "font-family",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-variant",
            "font-weight",
            "glyph-name",
            "glyph-orientation-horizontal",
            "glyph-orientation-vertical",
            "horiz-adv-x",
            "horiz-origin-x",
            "image-rendering",
            "letter-spacing",
            "lighting-color",
            "marker-end",
            "marker-mid",
            "marker-start",
            "overline-position",
            "overline-thickness",
            "paint-order",
            "panose-1",
            "pointer-events",
            "rendering-intent",
            "shape-rendering",
            "stop-color",
            "stop-opacity",
            "strikethrough-position",
            "strikethrough-thickness",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke-width",
            "text-anchor",
            "text-decoration",
            "text-rendering",
            "underline-position",
            "underline-thickness",
            "unicode-bidi",
            "unicode-range",
            "units-per-em",
            "v-alphabetic",
            "v-hanging",
            "v-ideographic",
            "v-mathematical",
            "vector-effect",
            "vert-adv-y",
            "vert-origin-x",
            "vert-origin-y",
            "word-spacing",
            "writing-mode",
            "xmlns:xlink",
            "x-height"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          [
            "xlink:actuate",
            "xlink:arcrole",
            "xlink:role",
            "xlink:show",
            "xlink:title",
            "xlink:type"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
          });
          [
            "xml:base",
            "xml:lang",
            "xml:space"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
          });
          ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
          });
          var xlinkHref = "xlinkHref";
          properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
          ["src", "href", "action", "formAction"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
          });
          var isUnitlessNumber = {
            animationIterationCount: true,
            aspectRatio: true,
            borderImageOutset: true,
            borderImageSlice: true,
            borderImageWidth: true,
            boxFlex: true,
            boxFlexGroup: true,
            boxOrdinalGroup: true,
            columnCount: true,
            columns: true,
            flex: true,
            flexGrow: true,
            flexPositive: true,
            flexShrink: true,
            flexNegative: true,
            flexOrder: true,
            gridArea: true,
            gridRow: true,
            gridRowEnd: true,
            gridRowSpan: true,
            gridRowStart: true,
            gridColumn: true,
            gridColumnEnd: true,
            gridColumnSpan: true,
            gridColumnStart: true,
            fontWeight: true,
            lineClamp: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            tabSize: true,
            widows: true,
            zIndex: true,
            zoom: true,
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeDasharray: true,
            strokeDashoffset: true,
            strokeMiterlimit: true,
            strokeOpacity: true,
            strokeWidth: true
          };
          function prefixKey(prefix2, key) {
            return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
          }
          var prefixes = ["Webkit", "ms", "Moz", "O"];
          Object.keys(isUnitlessNumber).forEach(function(prop) {
            prefixes.forEach(function(prefix2) {
              isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
            });
          });
          var hasReadOnlyValue = {
            button: true,
            checkbox: true,
            image: true,
            hidden: true,
            radio: true,
            reset: true,
            submit: true
          };
          function checkControlledValueProps(tagName, props) {
            {
              if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
                error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
              }
              if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
                error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
              }
            }
          }
          function isCustomComponent(tagName, props) {
            if (tagName.indexOf("-") === -1) {
              return typeof props.is === "string";
            }
            switch (tagName) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return false;
              default:
                return true;
            }
          }
          var ariaProperties = {
            "aria-current": 0,
            "aria-description": 0,
            "aria-details": 0,
            "aria-disabled": 0,
            "aria-hidden": 0,
            "aria-invalid": 0,
            "aria-keyshortcuts": 0,
            "aria-label": 0,
            "aria-roledescription": 0,
            "aria-autocomplete": 0,
            "aria-checked": 0,
            "aria-expanded": 0,
            "aria-haspopup": 0,
            "aria-level": 0,
            "aria-modal": 0,
            "aria-multiline": 0,
            "aria-multiselectable": 0,
            "aria-orientation": 0,
            "aria-placeholder": 0,
            "aria-pressed": 0,
            "aria-readonly": 0,
            "aria-required": 0,
            "aria-selected": 0,
            "aria-sort": 0,
            "aria-valuemax": 0,
            "aria-valuemin": 0,
            "aria-valuenow": 0,
            "aria-valuetext": 0,
            "aria-atomic": 0,
            "aria-busy": 0,
            "aria-live": 0,
            "aria-relevant": 0,
            "aria-dropeffect": 0,
            "aria-grabbed": 0,
            "aria-activedescendant": 0,
            "aria-colcount": 0,
            "aria-colindex": 0,
            "aria-colspan": 0,
            "aria-controls": 0,
            "aria-describedby": 0,
            "aria-errormessage": 0,
            "aria-flowto": 0,
            "aria-labelledby": 0,
            "aria-owns": 0,
            "aria-posinset": 0,
            "aria-rowcount": 0,
            "aria-rowindex": 0,
            "aria-rowspan": 0,
            "aria-setsize": 0
          };
          var warnedProperties = {};
          var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          function validateProperty(tagName, name) {
            {
              if (hasOwnProperty2.call(warnedProperties, name) && warnedProperties[name]) {
                return true;
              }
              if (rARIACamel.test(name)) {
                var ariaName = "aria-" + name.slice(4).toLowerCase();
                var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
                if (correctName == null) {
                  error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                  warnedProperties[name] = true;
                  return true;
                }
                if (name !== correctName) {
                  error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
              if (rARIA.test(name)) {
                var lowerCasedName = name.toLowerCase();
                var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
                if (standardName == null) {
                  warnedProperties[name] = true;
                  return false;
                }
                if (name !== standardName) {
                  error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
            }
            return true;
          }
          function warnInvalidARIAProps(type, props) {
            {
              var invalidProps = [];
              for (var key in props) {
                var isValid = validateProperty(type, key);
                if (!isValid) {
                  invalidProps.push(key);
                }
              }
              var unknownPropString = invalidProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (invalidProps.length === 1) {
                error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              } else if (invalidProps.length > 1) {
                error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              }
            }
          }
          function validateProperties(type, props) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnInvalidARIAProps(type, props);
          }
          var didWarnValueNull = false;
          function validateProperties$1(type, props) {
            {
              if (type !== "input" && type !== "textarea" && type !== "select") {
                return;
              }
              if (props != null && props.value === null && !didWarnValueNull) {
                didWarnValueNull = true;
                if (type === "select" && props.multiple) {
                  error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
                } else {
                  error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
                }
              }
            }
          }
          var possibleStandardNames = {
            accept: "accept",
            acceptcharset: "acceptCharset",
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            action: "action",
            allowfullscreen: "allowFullScreen",
            alt: "alt",
            as: "as",
            async: "async",
            autocapitalize: "autoCapitalize",
            autocomplete: "autoComplete",
            autocorrect: "autoCorrect",
            autofocus: "autoFocus",
            autoplay: "autoPlay",
            autosave: "autoSave",
            capture: "capture",
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            challenge: "challenge",
            charset: "charSet",
            checked: "checked",
            children: "children",
            cite: "cite",
            class: "className",
            classid: "classID",
            classname: "className",
            cols: "cols",
            colspan: "colSpan",
            content: "content",
            contenteditable: "contentEditable",
            contextmenu: "contextMenu",
            controls: "controls",
            controlslist: "controlsList",
            coords: "coords",
            crossorigin: "crossOrigin",
            dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
            data: "data",
            datetime: "dateTime",
            default: "default",
            defaultchecked: "defaultChecked",
            defaultvalue: "defaultValue",
            defer: "defer",
            dir: "dir",
            disabled: "disabled",
            disablepictureinpicture: "disablePictureInPicture",
            disableremoteplayback: "disableRemotePlayback",
            download: "download",
            draggable: "draggable",
            enctype: "encType",
            enterkeyhint: "enterKeyHint",
            for: "htmlFor",
            form: "form",
            formmethod: "formMethod",
            formaction: "formAction",
            formenctype: "formEncType",
            formnovalidate: "formNoValidate",
            formtarget: "formTarget",
            frameborder: "frameBorder",
            headers: "headers",
            height: "height",
            hidden: "hidden",
            high: "high",
            href: "href",
            hreflang: "hrefLang",
            htmlfor: "htmlFor",
            httpequiv: "httpEquiv",
            "http-equiv": "httpEquiv",
            icon: "icon",
            id: "id",
            imagesizes: "imageSizes",
            imagesrcset: "imageSrcSet",
            innerhtml: "innerHTML",
            inputmode: "inputMode",
            integrity: "integrity",
            is: "is",
            itemid: "itemID",
            itemprop: "itemProp",
            itemref: "itemRef",
            itemscope: "itemScope",
            itemtype: "itemType",
            keyparams: "keyParams",
            keytype: "keyType",
            kind: "kind",
            label: "label",
            lang: "lang",
            list: "list",
            loop: "loop",
            low: "low",
            manifest: "manifest",
            marginwidth: "marginWidth",
            marginheight: "marginHeight",
            max: "max",
            maxlength: "maxLength",
            media: "media",
            mediagroup: "mediaGroup",
            method: "method",
            min: "min",
            minlength: "minLength",
            multiple: "multiple",
            muted: "muted",
            name: "name",
            nomodule: "noModule",
            nonce: "nonce",
            novalidate: "noValidate",
            open: "open",
            optimum: "optimum",
            pattern: "pattern",
            placeholder: "placeholder",
            playsinline: "playsInline",
            poster: "poster",
            preload: "preload",
            profile: "profile",
            radiogroup: "radioGroup",
            readonly: "readOnly",
            referrerpolicy: "referrerPolicy",
            rel: "rel",
            required: "required",
            reversed: "reversed",
            role: "role",
            rows: "rows",
            rowspan: "rowSpan",
            sandbox: "sandbox",
            scope: "scope",
            scoped: "scoped",
            scrolling: "scrolling",
            seamless: "seamless",
            selected: "selected",
            shape: "shape",
            size: "size",
            sizes: "sizes",
            span: "span",
            spellcheck: "spellCheck",
            src: "src",
            srcdoc: "srcDoc",
            srclang: "srcLang",
            srcset: "srcSet",
            start: "start",
            step: "step",
            style: "style",
            summary: "summary",
            tabindex: "tabIndex",
            target: "target",
            title: "title",
            type: "type",
            usemap: "useMap",
            value: "value",
            width: "width",
            wmode: "wmode",
            wrap: "wrap",
            about: "about",
            accentheight: "accentHeight",
            "accent-height": "accentHeight",
            accumulate: "accumulate",
            additive: "additive",
            alignmentbaseline: "alignmentBaseline",
            "alignment-baseline": "alignmentBaseline",
            allowreorder: "allowReorder",
            alphabetic: "alphabetic",
            amplitude: "amplitude",
            arabicform: "arabicForm",
            "arabic-form": "arabicForm",
            ascent: "ascent",
            attributename: "attributeName",
            attributetype: "attributeType",
            autoreverse: "autoReverse",
            azimuth: "azimuth",
            basefrequency: "baseFrequency",
            baselineshift: "baselineShift",
            "baseline-shift": "baselineShift",
            baseprofile: "baseProfile",
            bbox: "bbox",
            begin: "begin",
            bias: "bias",
            by: "by",
            calcmode: "calcMode",
            capheight: "capHeight",
            "cap-height": "capHeight",
            clip: "clip",
            clippath: "clipPath",
            "clip-path": "clipPath",
            clippathunits: "clipPathUnits",
            cliprule: "clipRule",
            "clip-rule": "clipRule",
            color: "color",
            colorinterpolation: "colorInterpolation",
            "color-interpolation": "colorInterpolation",
            colorinterpolationfilters: "colorInterpolationFilters",
            "color-interpolation-filters": "colorInterpolationFilters",
            colorprofile: "colorProfile",
            "color-profile": "colorProfile",
            colorrendering: "colorRendering",
            "color-rendering": "colorRendering",
            contentscripttype: "contentScriptType",
            contentstyletype: "contentStyleType",
            cursor: "cursor",
            cx: "cx",
            cy: "cy",
            d: "d",
            datatype: "datatype",
            decelerate: "decelerate",
            descent: "descent",
            diffuseconstant: "diffuseConstant",
            direction: "direction",
            display: "display",
            divisor: "divisor",
            dominantbaseline: "dominantBaseline",
            "dominant-baseline": "dominantBaseline",
            dur: "dur",
            dx: "dx",
            dy: "dy",
            edgemode: "edgeMode",
            elevation: "elevation",
            enablebackground: "enableBackground",
            "enable-background": "enableBackground",
            end: "end",
            exponent: "exponent",
            externalresourcesrequired: "externalResourcesRequired",
            fill: "fill",
            fillopacity: "fillOpacity",
            "fill-opacity": "fillOpacity",
            fillrule: "fillRule",
            "fill-rule": "fillRule",
            filter: "filter",
            filterres: "filterRes",
            filterunits: "filterUnits",
            floodopacity: "floodOpacity",
            "flood-opacity": "floodOpacity",
            floodcolor: "floodColor",
            "flood-color": "floodColor",
            focusable: "focusable",
            fontfamily: "fontFamily",
            "font-family": "fontFamily",
            fontsize: "fontSize",
            "font-size": "fontSize",
            fontsizeadjust: "fontSizeAdjust",
            "font-size-adjust": "fontSizeAdjust",
            fontstretch: "fontStretch",
            "font-stretch": "fontStretch",
            fontstyle: "fontStyle",
            "font-style": "fontStyle",
            fontvariant: "fontVariant",
            "font-variant": "fontVariant",
            fontweight: "fontWeight",
            "font-weight": "fontWeight",
            format: "format",
            from: "from",
            fx: "fx",
            fy: "fy",
            g1: "g1",
            g2: "g2",
            glyphname: "glyphName",
            "glyph-name": "glyphName",
            glyphorientationhorizontal: "glyphOrientationHorizontal",
            "glyph-orientation-horizontal": "glyphOrientationHorizontal",
            glyphorientationvertical: "glyphOrientationVertical",
            "glyph-orientation-vertical": "glyphOrientationVertical",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            hanging: "hanging",
            horizadvx: "horizAdvX",
            "horiz-adv-x": "horizAdvX",
            horizoriginx: "horizOriginX",
            "horiz-origin-x": "horizOriginX",
            ideographic: "ideographic",
            imagerendering: "imageRendering",
            "image-rendering": "imageRendering",
            in2: "in2",
            in: "in",
            inlist: "inlist",
            intercept: "intercept",
            k1: "k1",
            k2: "k2",
            k3: "k3",
            k4: "k4",
            k: "k",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            kerning: "kerning",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            letterspacing: "letterSpacing",
            "letter-spacing": "letterSpacing",
            lightingcolor: "lightingColor",
            "lighting-color": "lightingColor",
            limitingconeangle: "limitingConeAngle",
            local: "local",
            markerend: "markerEnd",
            "marker-end": "markerEnd",
            markerheight: "markerHeight",
            markermid: "markerMid",
            "marker-mid": "markerMid",
            markerstart: "markerStart",
            "marker-start": "markerStart",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            mask: "mask",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            mathematical: "mathematical",
            mode: "mode",
            numoctaves: "numOctaves",
            offset: "offset",
            opacity: "opacity",
            operator: "operator",
            order: "order",
            orient: "orient",
            orientation: "orientation",
            origin: "origin",
            overflow: "overflow",
            overlineposition: "overlinePosition",
            "overline-position": "overlinePosition",
            overlinethickness: "overlineThickness",
            "overline-thickness": "overlineThickness",
            paintorder: "paintOrder",
            "paint-order": "paintOrder",
            panose1: "panose1",
            "panose-1": "panose1",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointerevents: "pointerEvents",
            "pointer-events": "pointerEvents",
            points: "points",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            prefix: "prefix",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            property: "property",
            r: "r",
            radius: "radius",
            refx: "refX",
            refy: "refY",
            renderingintent: "renderingIntent",
            "rendering-intent": "renderingIntent",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            resource: "resource",
            restart: "restart",
            result: "result",
            results: "results",
            rotate: "rotate",
            rx: "rx",
            ry: "ry",
            scale: "scale",
            security: "security",
            seed: "seed",
            shaperendering: "shapeRendering",
            "shape-rendering": "shapeRendering",
            slope: "slope",
            spacing: "spacing",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            speed: "speed",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stemh: "stemh",
            stemv: "stemv",
            stitchtiles: "stitchTiles",
            stopcolor: "stopColor",
            "stop-color": "stopColor",
            stopopacity: "stopOpacity",
            "stop-opacity": "stopOpacity",
            strikethroughposition: "strikethroughPosition",
            "strikethrough-position": "strikethroughPosition",
            strikethroughthickness: "strikethroughThickness",
            "strikethrough-thickness": "strikethroughThickness",
            string: "string",
            stroke: "stroke",
            strokedasharray: "strokeDasharray",
            "stroke-dasharray": "strokeDasharray",
            strokedashoffset: "strokeDashoffset",
            "stroke-dashoffset": "strokeDashoffset",
            strokelinecap: "strokeLinecap",
            "stroke-linecap": "strokeLinecap",
            strokelinejoin: "strokeLinejoin",
            "stroke-linejoin": "strokeLinejoin",
            strokemiterlimit: "strokeMiterlimit",
            "stroke-miterlimit": "strokeMiterlimit",
            strokewidth: "strokeWidth",
            "stroke-width": "strokeWidth",
            strokeopacity: "strokeOpacity",
            "stroke-opacity": "strokeOpacity",
            suppresscontenteditablewarning: "suppressContentEditableWarning",
            suppresshydrationwarning: "suppressHydrationWarning",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textanchor: "textAnchor",
            "text-anchor": "textAnchor",
            textdecoration: "textDecoration",
            "text-decoration": "textDecoration",
            textlength: "textLength",
            textrendering: "textRendering",
            "text-rendering": "textRendering",
            to: "to",
            transform: "transform",
            typeof: "typeof",
            u1: "u1",
            u2: "u2",
            underlineposition: "underlinePosition",
            "underline-position": "underlinePosition",
            underlinethickness: "underlineThickness",
            "underline-thickness": "underlineThickness",
            unicode: "unicode",
            unicodebidi: "unicodeBidi",
            "unicode-bidi": "unicodeBidi",
            unicoderange: "unicodeRange",
            "unicode-range": "unicodeRange",
            unitsperem: "unitsPerEm",
            "units-per-em": "unitsPerEm",
            unselectable: "unselectable",
            valphabetic: "vAlphabetic",
            "v-alphabetic": "vAlphabetic",
            values: "values",
            vectoreffect: "vectorEffect",
            "vector-effect": "vectorEffect",
            version: "version",
            vertadvy: "vertAdvY",
            "vert-adv-y": "vertAdvY",
            vertoriginx: "vertOriginX",
            "vert-origin-x": "vertOriginX",
            vertoriginy: "vertOriginY",
            "vert-origin-y": "vertOriginY",
            vhanging: "vHanging",
            "v-hanging": "vHanging",
            videographic: "vIdeographic",
            "v-ideographic": "vIdeographic",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            visibility: "visibility",
            vmathematical: "vMathematical",
            "v-mathematical": "vMathematical",
            vocab: "vocab",
            widths: "widths",
            wordspacing: "wordSpacing",
            "word-spacing": "wordSpacing",
            writingmode: "writingMode",
            "writing-mode": "writingMode",
            x1: "x1",
            x2: "x2",
            x: "x",
            xchannelselector: "xChannelSelector",
            xheight: "xHeight",
            "x-height": "xHeight",
            xlinkactuate: "xlinkActuate",
            "xlink:actuate": "xlinkActuate",
            xlinkarcrole: "xlinkArcrole",
            "xlink:arcrole": "xlinkArcrole",
            xlinkhref: "xlinkHref",
            "xlink:href": "xlinkHref",
            xlinkrole: "xlinkRole",
            "xlink:role": "xlinkRole",
            xlinkshow: "xlinkShow",
            "xlink:show": "xlinkShow",
            xlinktitle: "xlinkTitle",
            "xlink:title": "xlinkTitle",
            xlinktype: "xlinkType",
            "xlink:type": "xlinkType",
            xmlbase: "xmlBase",
            "xml:base": "xmlBase",
            xmllang: "xmlLang",
            "xml:lang": "xmlLang",
            xmlns: "xmlns",
            "xml:space": "xmlSpace",
            xmlnsxlink: "xmlnsXlink",
            "xmlns:xlink": "xmlnsXlink",
            xmlspace: "xmlSpace",
            y1: "y1",
            y2: "y2",
            y: "y",
            ychannelselector: "yChannelSelector",
            z: "z",
            zoomandpan: "zoomAndPan"
          };
          var validateProperty$1 = function() {
          };
          {
            var warnedProperties$1 = {};
            var EVENT_NAME_REGEX = /^on./;
            var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
            var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
            var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
            validateProperty$1 = function(tagName, name, value, eventRegistry) {
              if (hasOwnProperty2.call(warnedProperties$1, name) && warnedProperties$1[name]) {
                return true;
              }
              var lowerCasedName = name.toLowerCase();
              if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
                error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (eventRegistry != null) {
                var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
                if (registrationNameDependencies.hasOwnProperty(name)) {
                  return true;
                }
                var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
                if (registrationName != null) {
                  error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                  warnedProperties$1[name] = true;
                  return true;
                }
                if (EVENT_NAME_REGEX.test(name)) {
                  error("Unknown event handler property `%s`. It will be ignored.", name);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (EVENT_NAME_REGEX.test(name)) {
                if (INVALID_EVENT_NAME_REGEX.test(name)) {
                  error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
                return true;
              }
              if (lowerCasedName === "innerhtml") {
                error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "aria") {
                error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
                error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "number" && isNaN(value)) {
                error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
                warnedProperties$1[name] = true;
                return true;
              }
              var propertyInfo = getPropertyInfo(name);
              var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
              if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
                var standardName = possibleStandardNames[lowerCasedName];
                if (standardName !== name) {
                  error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (!isReserved && name !== lowerCasedName) {
                error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                if (value) {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
                } else {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (isReserved) {
                return true;
              }
              if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                warnedProperties$1[name] = true;
                return false;
              }
              if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
                error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
                warnedProperties$1[name] = true;
                return true;
              }
              return true;
            };
          }
          var warnUnknownProperties = function(type, props, eventRegistry) {
            {
              var unknownProps = [];
              for (var key in props) {
                var isValid = validateProperty$1(type, key, props[key], eventRegistry);
                if (!isValid) {
                  unknownProps.push(key);
                }
              }
              var unknownPropString = unknownProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (unknownProps.length === 1) {
                error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              } else if (unknownProps.length > 1) {
                error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              }
            }
          };
          function validateProperties$2(type, props, eventRegistry) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnUnknownProperties(type, props, eventRegistry);
          }
          var warnValidStyle = function() {
          };
          {
            var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
            var msPattern = /^-ms-/;
            var hyphenPattern = /-(.)/g;
            var badStyleValueWithSemicolonPattern = /;\s*$/;
            var warnedStyleNames = {};
            var warnedStyleValues = {};
            var warnedForNaNValue = false;
            var warnedForInfinityValue = false;
            var camelize = function(string3) {
              return string3.replace(hyphenPattern, function(_, character) {
                return character.toUpperCase();
              });
            };
            var warnHyphenatedStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported style property %s. Did you mean %s?", name, camelize(name.replace(msPattern, "ms-")));
            };
            var warnBadVendoredStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
            };
            var warnStyleValueWithSemicolon = function(name, value) {
              if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
                return;
              }
              warnedStyleValues[value] = true;
              error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
            };
            var warnStyleValueIsNaN = function(name, value) {
              if (warnedForNaNValue) {
                return;
              }
              warnedForNaNValue = true;
              error("`NaN` is an invalid value for the `%s` css style property.", name);
            };
            var warnStyleValueIsInfinity = function(name, value) {
              if (warnedForInfinityValue) {
                return;
              }
              warnedForInfinityValue = true;
              error("`Infinity` is an invalid value for the `%s` css style property.", name);
            };
            warnValidStyle = function(name, value) {
              if (name.indexOf("-") > -1) {
                warnHyphenatedStyleName(name);
              } else if (badVendoredStyleNamePattern.test(name)) {
                warnBadVendoredStyleName(name);
              } else if (badStyleValueWithSemicolonPattern.test(value)) {
                warnStyleValueWithSemicolon(name, value);
              }
              if (typeof value === "number") {
                if (isNaN(value)) {
                  warnStyleValueIsNaN(name, value);
                } else if (!isFinite(value)) {
                  warnStyleValueIsInfinity(name, value);
                }
              }
            };
          }
          var warnValidStyle$1 = warnValidStyle;
          var matchHtmlRegExp = /["'&<>]/;
          function escapeHtml(string3) {
            {
              checkHtmlStringCoercion(string3);
            }
            var str = "" + string3;
            var match = matchHtmlRegExp.exec(str);
            if (!match) {
              return str;
            }
            var escape;
            var html4 = "";
            var index2;
            var lastIndex = 0;
            for (index2 = match.index; index2 < str.length; index2++) {
              switch (str.charCodeAt(index2)) {
                case 34:
                  escape = "&quot;";
                  break;
                case 38:
                  escape = "&amp;";
                  break;
                case 39:
                  escape = "&#x27;";
                  break;
                case 60:
                  escape = "&lt;";
                  break;
                case 62:
                  escape = "&gt;";
                  break;
                default:
                  continue;
              }
              if (lastIndex !== index2) {
                html4 += str.substring(lastIndex, index2);
              }
              lastIndex = index2 + 1;
              html4 += escape;
            }
            return lastIndex !== index2 ? html4 + str.substring(lastIndex, index2) : html4;
          }
          function escapeTextForBrowser(text4) {
            if (typeof text4 === "boolean" || typeof text4 === "number") {
              return "" + text4;
            }
            return escapeHtml(text4);
          }
          var uppercasePattern = /([A-Z])/g;
          var msPattern$1 = /^ms-/;
          function hyphenateStyleName(name) {
            return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
          }
          var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
          var didWarn = false;
          function sanitizeURL(url) {
            {
              if (!didWarn && isJavaScriptProtocol.test(url)) {
                didWarn = true;
                error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
              }
            }
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          var startInlineScript = stringToPrecomputedChunk("<script>");
          var endInlineScript = stringToPrecomputedChunk("<\/script>");
          var startScriptSrc = stringToPrecomputedChunk('<script src="');
          var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
          var endAsyncScript = stringToPrecomputedChunk('" async=""><\/script>');
          function escapeBootstrapScriptContent(scriptText) {
            {
              checkHtmlStringCoercion(scriptText);
            }
            return ("" + scriptText).replace(scriptRegex, scriptReplacer);
          }
          var scriptRegex = /(<\/|<)(s)(cript)/gi;
          var scriptReplacer = function(match, prefix2, s, suffix) {
            return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
          };
          function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
            var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix;
            var inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
            var bootstrapChunks = [];
            if (bootstrapScriptContent !== void 0) {
              bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript);
            }
            if (bootstrapScripts !== void 0) {
              for (var i = 0; i < bootstrapScripts.length; i++) {
                bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
              }
            }
            if (bootstrapModules !== void 0) {
              for (var _i = 0; _i < bootstrapModules.length; _i++) {
                bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
              }
            }
            return {
              bootstrapChunks,
              startInlineScript: inlineScriptWithNonce,
              placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
              segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
              boundaryPrefix: idPrefix + "B:",
              idPrefix,
              nextSuspenseID: 0,
              sentCompleteSegmentFunction: false,
              sentCompleteBoundaryFunction: false,
              sentClientRenderFunction: false
            };
          }
          var ROOT_HTML_MODE = 0;
          var HTML_MODE = 1;
          var SVG_MODE = 2;
          var MATHML_MODE = 3;
          var HTML_TABLE_MODE = 4;
          var HTML_TABLE_BODY_MODE = 5;
          var HTML_TABLE_ROW_MODE = 6;
          var HTML_COLGROUP_MODE = 7;
          function createFormatContext(insertionMode, selectedValue) {
            return {
              insertionMode,
              selectedValue
            };
          }
          function getChildFormatContext(parentContext, type, props) {
            switch (type) {
              case "select":
                return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
              case "svg":
                return createFormatContext(SVG_MODE, null);
              case "math":
                return createFormatContext(MATHML_MODE, null);
              case "foreignObject":
                return createFormatContext(HTML_MODE, null);
              case "table":
                return createFormatContext(HTML_TABLE_MODE, null);
              case "thead":
              case "tbody":
              case "tfoot":
                return createFormatContext(HTML_TABLE_BODY_MODE, null);
              case "colgroup":
                return createFormatContext(HTML_COLGROUP_MODE, null);
              case "tr":
                return createFormatContext(HTML_TABLE_ROW_MODE, null);
            }
            if (parentContext.insertionMode >= HTML_TABLE_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            if (parentContext.insertionMode === ROOT_HTML_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            return parentContext;
          }
          var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
          function assignSuspenseBoundaryID(responseState) {
            var generatedID = responseState.nextSuspenseID++;
            return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
          }
          function makeId(responseState, treeId, localId) {
            var idPrefix = responseState.idPrefix;
            var id = ":" + idPrefix + "R" + treeId;
            if (localId > 0) {
              id += "H" + localId.toString(32);
            }
            return id + ":";
          }
          function encodeHTMLTextNode(text4) {
            return escapeTextForBrowser(text4);
          }
          var textSeparator = stringToPrecomputedChunk("<!-- -->");
          function pushTextInstance(target, text4, responseState) {
            if (text4 === "") {
              return;
            }
            target.push(stringToChunk(encodeHTMLTextNode(text4)), textSeparator);
          }
          var styleNameCache = new Map();
          function processStyleName(styleName) {
            var chunk = styleNameCache.get(styleName);
            if (chunk !== void 0) {
              return chunk;
            }
            var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
            styleNameCache.set(styleName, result);
            return result;
          }
          var styleAttributeStart = stringToPrecomputedChunk(' style="');
          var styleAssign = stringToPrecomputedChunk(":");
          var styleSeparator = stringToPrecomputedChunk(";");
          function pushStyle(target, responseState, style2) {
            if (typeof style2 !== "object") {
              throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
            }
            var isFirst = true;
            for (var styleName in style2) {
              if (!hasOwnProperty2.call(style2, styleName)) {
                continue;
              }
              var styleValue = style2[styleName];
              if (styleValue == null || typeof styleValue === "boolean" || styleValue === "") {
                continue;
              }
              var nameChunk = void 0;
              var valueChunk = void 0;
              var isCustomProperty = styleName.indexOf("--") === 0;
              if (isCustomProperty) {
                nameChunk = stringToChunk(escapeTextForBrowser(styleName));
                {
                  checkCSSPropertyStringCoercion(styleValue, styleName);
                }
                valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
              } else {
                {
                  warnValidStyle$1(styleName, styleValue);
                }
                nameChunk = processStyleName(styleName);
                if (typeof styleValue === "number") {
                  if (styleValue !== 0 && !hasOwnProperty2.call(isUnitlessNumber, styleName)) {
                    valueChunk = stringToChunk(styleValue + "px");
                  } else {
                    valueChunk = stringToChunk("" + styleValue);
                  }
                } else {
                  {
                    checkCSSPropertyStringCoercion(styleValue, styleName);
                  }
                  valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
                }
              }
              if (isFirst) {
                isFirst = false;
                target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
              } else {
                target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
              }
            }
            if (!isFirst) {
              target.push(attributeEnd);
            }
          }
          var attributeSeparator = stringToPrecomputedChunk(" ");
          var attributeAssign = stringToPrecomputedChunk('="');
          var attributeEnd = stringToPrecomputedChunk('"');
          var attributeEmptyString = stringToPrecomputedChunk('=""');
          function pushAttribute(target, responseState, name, value) {
            switch (name) {
              case "style": {
                pushStyle(target, responseState, value);
                return;
              }
              case "defaultValue":
              case "defaultChecked":
              case "innerHTML":
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                return;
            }
            if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
              return;
            }
            var propertyInfo = getPropertyInfo(name);
            if (propertyInfo !== null) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  if (!propertyInfo.acceptsBooleans) {
                    return;
                  }
                }
              }
              var attributeName = propertyInfo.attributeName;
              var attributeNameChunk = stringToChunk(attributeName);
              switch (propertyInfo.type) {
                case BOOLEAN:
                  if (value) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  }
                  return;
                case OVERLOADED_BOOLEAN:
                  if (value === true) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  } else if (value === false)
                    ;
                  else {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  return;
                case NUMERIC:
                  if (!isNaN(value)) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                case POSITIVE_NUMERIC:
                  if (!isNaN(value) && value >= 1) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                default:
                  if (propertyInfo.sanitizeURL) {
                    {
                      checkAttributeStringCoercion(value, attributeName);
                    }
                    value = "" + value;
                    sanitizeURL(value);
                  }
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
              }
            } else if (isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  if (prefix2 !== "data-" && prefix2 !== "aria-") {
                    return;
                  }
                }
              }
              target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          }
          var endOfStartTag = stringToPrecomputedChunk(">");
          var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
          function pushInnerHTML(target, innerHTML, children) {
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html4 = innerHTML.__html;
              if (html4 !== null && html4 !== void 0) {
                {
                  checkHtmlStringCoercion(html4);
                }
                target.push(stringToChunk("" + html4));
              }
            }
          }
          var didWarnDefaultInputValue = false;
          var didWarnDefaultChecked = false;
          var didWarnDefaultSelectValue = false;
          var didWarnDefaultTextareaValue = false;
          var didWarnInvalidOptionChildren = false;
          var didWarnInvalidOptionInnerHTML = false;
          var didWarnSelectedSetOnOption = false;
          function checkSelectProp(props, propName) {
            {
              var value = props[propName];
              if (value != null) {
                var array = isArray(value);
                if (props.multiple && !array) {
                  error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                } else if (!props.multiple && array) {
                  error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                }
              }
            }
          }
          function pushStartSelect(target, props, responseState) {
            {
              checkControlledValueProps("select", props);
              checkSelectProp(props, "value");
              checkSelectProp(props, "defaultValue");
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultSelectValue = true;
              }
            }
            target.push(startChunkForTag("select"));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function flattenOptionChildren(children) {
            var content3 = "";
            React3.Children.forEach(children, function(child) {
              if (child == null) {
                return;
              }
              content3 += child;
              {
                if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                  didWarnInvalidOptionChildren = true;
                  error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
                }
              }
            });
            return content3;
          }
          var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
          function pushStartOption(target, props, responseState, formatContext) {
            var selectedValue = formatContext.selectedValue;
            target.push(startChunkForTag("option"));
            var children = null;
            var value = null;
            var selected = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "selected":
                    selected = propValue;
                    {
                      if (!didWarnSelectedSetOnOption) {
                        error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                        didWarnSelectedSetOnOption = true;
                      }
                    }
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "value":
                    value = propValue;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (selectedValue != null) {
              var stringValue;
              if (value !== null) {
                {
                  checkAttributeStringCoercion(value, "value");
                }
                stringValue = "" + value;
              } else {
                {
                  if (innerHTML !== null) {
                    if (!didWarnInvalidOptionInnerHTML) {
                      didWarnInvalidOptionInnerHTML = true;
                      error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                    }
                  }
                }
                stringValue = flattenOptionChildren(children);
              }
              if (isArray(selectedValue)) {
                for (var i = 0; i < selectedValue.length; i++) {
                  {
                    checkAttributeStringCoercion(selectedValue[i], "value");
                  }
                  var v = "" + selectedValue[i];
                  if (v === stringValue) {
                    target.push(selectedMarkerAttribute);
                    break;
                  }
                }
              } else {
                {
                  checkAttributeStringCoercion(selectedValue, "select.value");
                }
                if ("" + selectedValue === stringValue) {
                  target.push(selectedMarkerAttribute);
                }
              }
            } else if (selected) {
              target.push(selectedMarkerAttribute);
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function pushInput(target, props, responseState) {
            {
              checkControlledValueProps("input", props);
              if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultChecked = true;
              }
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultInputValue = true;
              }
            }
            target.push(startChunkForTag("input"));
            var value = null;
            var defaultValue = null;
            var checked = null;
            var defaultChecked = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  case "defaultChecked":
                    defaultChecked = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "checked":
                    checked = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (checked !== null) {
              pushAttribute(target, responseState, "checked", checked);
            } else if (defaultChecked !== null) {
              pushAttribute(target, responseState, "checked", defaultChecked);
            }
            if (value !== null) {
              pushAttribute(target, responseState, "value", value);
            } else if (defaultValue !== null) {
              pushAttribute(target, responseState, "value", defaultValue);
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartTextArea(target, props, responseState) {
            {
              checkControlledValueProps("textarea", props);
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultTextareaValue = true;
              }
            }
            target.push(startChunkForTag("textarea"));
            var value = null;
            var defaultValue = null;
            var children = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (value === null && defaultValue !== null) {
              value = defaultValue;
            }
            target.push(endOfStartTag);
            if (children != null) {
              {
                error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
              }
              if (value != null) {
                throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
              }
              if (isArray(children)) {
                if (children.length > 1) {
                  throw new Error("<textarea> can only have at most one child.");
                }
                {
                  checkHtmlStringCoercion(children[0]);
                }
                value = "" + children[0];
              }
              {
                checkHtmlStringCoercion(children);
              }
              value = "" + children;
            }
            if (typeof value === "string" && value[0] === "\n") {
              target.push(leadingNewline);
            }
            if (value !== null) {
              {
                checkAttributeStringCoercion(value, "value");
              }
              target.push(stringToChunk(encodeHTMLTextNode("" + value)));
            }
            return null;
          }
          function pushSelfClosing(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartMenuItem(target, props, responseState) {
            target.push(startChunkForTag("menuitem"));
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            return null;
          }
          function pushStartGenericElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            if (typeof children === "string") {
              target.push(stringToChunk(encodeHTMLTextNode(children)));
              return null;
            }
            return children;
          }
          function pushStartCustomElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "style":
                    pushStyle(target, responseState, propValue);
                    break;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                    break;
                  default:
                    if (isAttributeNameSafe(propKey) && typeof propValue !== "function" && typeof propValue !== "symbol") {
                      target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                    }
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          var leadingNewline = stringToPrecomputedChunk("\n");
          function pushStartPreformattedElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html4 = innerHTML.__html;
              if (html4 !== null && html4 !== void 0) {
                if (typeof html4 === "string" && html4.length > 0 && html4[0] === "\n") {
                  target.push(leadingNewline, stringToChunk(html4));
                } else {
                  {
                    checkHtmlStringCoercion(html4);
                  }
                  target.push(stringToChunk("" + html4));
                }
              }
            }
            if (typeof children === "string" && children[0] === "\n") {
              target.push(leadingNewline);
            }
            return children;
          }
          var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
          var validatedTagCache = new Map();
          function startChunkForTag(tag) {
            var tagStartChunk = validatedTagCache.get(tag);
            if (tagStartChunk === void 0) {
              if (!VALID_TAG_REGEX.test(tag)) {
                throw new Error("Invalid tag: " + tag);
              }
              tagStartChunk = stringToPrecomputedChunk("<" + tag);
              validatedTagCache.set(tag, tagStartChunk);
            }
            return tagStartChunk;
          }
          var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
          function pushStartInstance(target, type, props, responseState, formatContext) {
            {
              validateProperties(type, props);
              validateProperties$1(type, props);
              validateProperties$2(type, props, null);
              if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
                error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
              }
              if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
                if (type.indexOf("-") === -1 && typeof props.is !== "string" && type.toLowerCase() !== type) {
                  error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type);
                }
              }
            }
            switch (type) {
              case "select":
                return pushStartSelect(target, props, responseState);
              case "option":
                return pushStartOption(target, props, responseState, formatContext);
              case "textarea":
                return pushStartTextArea(target, props, responseState);
              case "input":
                return pushInput(target, props, responseState);
              case "menuitem":
                return pushStartMenuItem(target, props, responseState);
              case "listing":
              case "pre": {
                return pushStartPreformattedElement(target, props, type, responseState);
              }
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                return pushSelfClosing(target, props, type, responseState);
              }
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph": {
                return pushStartGenericElement(target, props, type, responseState);
              }
              case "html": {
                if (formatContext.insertionMode === ROOT_HTML_MODE) {
                  target.push(DOCTYPE);
                }
                return pushStartGenericElement(target, props, type, responseState);
              }
              default: {
                if (type.indexOf("-") === -1 && typeof props.is !== "string") {
                  return pushStartGenericElement(target, props, type, responseState);
                } else {
                  return pushStartCustomElement(target, props, type, responseState);
                }
              }
            }
          }
          var endTag1 = stringToPrecomputedChunk("</");
          var endTag2 = stringToPrecomputedChunk(">");
          function pushEndInstance(target, type, props) {
            switch (type) {
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                break;
              }
              default: {
                target.push(endTag1, stringToChunk(type), endTag2);
              }
            }
          }
          function writeCompletedRoot(destination, responseState) {
            var bootstrapChunks = responseState.bootstrapChunks;
            var i = 0;
            for (; i < bootstrapChunks.length - 1; i++) {
              writeChunk(destination, bootstrapChunks[i]);
            }
            if (i < bootstrapChunks.length) {
              return writeChunkAndReturn(destination, bootstrapChunks[i]);
            }
            return true;
          }
          var placeholder1 = stringToPrecomputedChunk('<template id="');
          var placeholder2 = stringToPrecomputedChunk('"></template>');
          function writePlaceholder(destination, responseState, id) {
            writeChunk(destination, placeholder1);
            writeChunk(destination, responseState.placeholderPrefix);
            var formattedID = stringToChunk(id.toString(16));
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, placeholder2);
          }
          var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
          var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
          var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
          var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
          var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
          function writeStartCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
          }
          function writeStartPendingSuspenseBoundary(destination, responseState, id) {
            writeChunk(destination, startPendingSuspenseBoundary1);
            if (id === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, id);
            return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
          }
          function writeStartClientRenderedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
          }
          function writeEndCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndPendingSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
          var startSegmentHTML2 = stringToPrecomputedChunk('">');
          var endSegmentHTML = stringToPrecomputedChunk("</div>");
          var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
          var startSegmentSVG2 = stringToPrecomputedChunk('">');
          var endSegmentSVG = stringToPrecomputedChunk("</svg>");
          var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
          var startSegmentMathML2 = stringToPrecomputedChunk('">');
          var endSegmentMathML = stringToPrecomputedChunk("</math>");
          var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
          var startSegmentTable2 = stringToPrecomputedChunk('">');
          var endSegmentTable = stringToPrecomputedChunk("</table>");
          var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
          var startSegmentTableBody2 = stringToPrecomputedChunk('">');
          var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
          var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
          var startSegmentTableRow2 = stringToPrecomputedChunk('">');
          var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
          var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
          var startSegmentColGroup2 = stringToPrecomputedChunk('">');
          var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
          function writeStartSegment(destination, responseState, formatContext, id) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                writeChunk(destination, startSegmentHTML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentHTML2);
              }
              case SVG_MODE: {
                writeChunk(destination, startSegmentSVG);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentSVG2);
              }
              case MATHML_MODE: {
                writeChunk(destination, startSegmentMathML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentMathML2);
              }
              case HTML_TABLE_MODE: {
                writeChunk(destination, startSegmentTable);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTable2);
              }
              case HTML_TABLE_BODY_MODE: {
                writeChunk(destination, startSegmentTableBody);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableBody2);
              }
              case HTML_TABLE_ROW_MODE: {
                writeChunk(destination, startSegmentTableRow);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableRow2);
              }
              case HTML_COLGROUP_MODE: {
                writeChunk(destination, startSegmentColGroup);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentColGroup2);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          function writeEndSegment(destination, formatContext) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                return writeChunkAndReturn(destination, endSegmentHTML);
              }
              case SVG_MODE: {
                return writeChunkAndReturn(destination, endSegmentSVG);
              }
              case MATHML_MODE: {
                return writeChunkAndReturn(destination, endSegmentMathML);
              }
              case HTML_TABLE_MODE: {
                return writeChunkAndReturn(destination, endSegmentTable);
              }
              case HTML_TABLE_BODY_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableBody);
              }
              case HTML_TABLE_ROW_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableRow);
              }
              case HTML_COLGROUP_MODE: {
                return writeChunkAndReturn(destination, endSegmentColGroup);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
          var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
          var clientRenderFunction = 'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()}';
          var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
          var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
          var completeSegmentScript2 = stringToPrecomputedChunk('","');
          var completeSegmentScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteSegmentFunction) {
              responseState.sentCompleteSegmentFunction = true;
              writeChunk(destination, completeSegmentScript1Full);
            } else {
              writeChunk(destination, completeSegmentScript1Partial);
            }
            writeChunk(destination, responseState.segmentPrefix);
            var formattedID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, formattedID);
            writeChunk(destination, completeSegmentScript2);
            writeChunk(destination, responseState.placeholderPrefix);
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, completeSegmentScript3);
          }
          var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
          var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
          var completeBoundaryScript2 = stringToPrecomputedChunk('","');
          var completeBoundaryScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteBoundaryFunction) {
              responseState.sentCompleteBoundaryFunction = true;
              writeChunk(destination, completeBoundaryScript1Full);
            } else {
              writeChunk(destination, completeBoundaryScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            var formattedContentID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, boundaryID);
            writeChunk(destination, completeBoundaryScript2);
            writeChunk(destination, responseState.segmentPrefix);
            writeChunk(destination, formattedContentID);
            return writeChunkAndReturn(destination, completeBoundaryScript3);
          }
          var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
          var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
          var clientRenderScript2 = stringToPrecomputedChunk('")<\/script>');
          function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentClientRenderFunction) {
              responseState.sentClientRenderFunction = true;
              writeChunk(destination, clientRenderScript1Full);
            } else {
              writeChunk(destination, clientRenderScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, boundaryID);
            return writeChunkAndReturn(destination, clientRenderScript2);
          }
          function createResponseState$1(generateStaticMarkup, identifierPrefix) {
            var responseState = createResponseState(identifierPrefix, void 0);
            return {
              bootstrapChunks: responseState.bootstrapChunks,
              startInlineScript: responseState.startInlineScript,
              placeholderPrefix: responseState.placeholderPrefix,
              segmentPrefix: responseState.segmentPrefix,
              boundaryPrefix: responseState.boundaryPrefix,
              idPrefix: responseState.idPrefix,
              nextSuspenseID: responseState.nextSuspenseID,
              sentCompleteSegmentFunction: responseState.sentCompleteSegmentFunction,
              sentCompleteBoundaryFunction: responseState.sentCompleteBoundaryFunction,
              sentClientRenderFunction: responseState.sentClientRenderFunction,
              generateStaticMarkup
            };
          }
          function createRootFormatContext() {
            return {
              insertionMode: HTML_MODE,
              selectedValue: null
            };
          }
          function pushTextInstance$1(target, text4, responseState) {
            if (responseState.generateStaticMarkup) {
              target.push(stringToChunk(escapeTextForBrowser(text4)));
            } else {
              pushTextInstance(target, text4);
            }
          }
          function writeStartCompletedSuspenseBoundary$1(destination, responseState) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeStartCompletedSuspenseBoundary(destination);
          }
          function writeStartClientRenderedSuspenseBoundary$1(destination, responseState) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeStartClientRenderedSuspenseBoundary(destination);
          }
          function writeEndCompletedSuspenseBoundary$1(destination, responseState) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeEndCompletedSuspenseBoundary(destination);
          }
          function writeEndClientRenderedSuspenseBoundary$1(destination, responseState) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeEndClientRenderedSuspenseBoundary(destination);
          }
          var assign = Object.assign;
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_SCOPE_TYPE = Symbol.for("react.scope");
          var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode");
          var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
          var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeClassComponentFrame(ctor, source, ownerFn) {
            {
              return describeNativeComponentFrame(ctor, true);
            }
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component) {
            var prototype = Component.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element2) {
            {
              if (element2) {
                var owner = element2._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element2.type, element2._source, owner ? owner.type : null);
                ReactDebugCurrentFrame.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element2) {
            {
              var has = Function.call.bind(hasOwnProperty2);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element2);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element2);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var warnedAboutMissingGetChildContext;
          {
            warnedAboutMissingGetChildContext = {};
          }
          var emptyContextObject = {};
          {
            Object.freeze(emptyContextObject);
          }
          function getMaskedContext(type, unmaskedContext) {
            {
              var contextTypes = type.contextTypes;
              if (!contextTypes) {
                return emptyContextObject;
              }
              var context = {};
              for (var key in contextTypes) {
                context[key] = unmaskedContext[key];
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(contextTypes, context, "context", name);
              }
              return context;
            }
          }
          function processChildContext(instance, type, parentContext, childContextTypes) {
            {
              if (typeof instance.getChildContext !== "function") {
                {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!warnedAboutMissingGetChildContext[componentName]) {
                    warnedAboutMissingGetChildContext[componentName] = true;
                    error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                  }
                }
                return parentContext;
              }
              var childContext = instance.getChildContext();
              for (var contextKey in childContext) {
                if (!(contextKey in childContextTypes)) {
                  throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                }
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(childContextTypes, childContext, "child context", name);
              }
              return assign({}, parentContext, childContext);
            }
          }
          var rendererSigil;
          {
            rendererSigil = {};
          }
          var rootContextSnapshot = null;
          var currentActiveSnapshot = null;
          function popNode(prev) {
            {
              prev.context._currentValue2 = prev.parentValue;
            }
          }
          function pushNode(next) {
            {
              next.context._currentValue2 = next.value;
            }
          }
          function popToNearestCommonAncestor(prev, next) {
            if (prev === next)
              ;
            else {
              popNode(prev);
              var parentPrev = prev.parent;
              var parentNext = next.parent;
              if (parentPrev === null) {
                if (parentNext !== null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
              } else {
                if (parentNext === null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
                popToNearestCommonAncestor(parentPrev, parentNext);
              }
              pushNode(next);
            }
          }
          function popAllPrevious(prev) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev !== null) {
              popAllPrevious(parentPrev);
            }
          }
          function pushAllNext(next) {
            var parentNext = next.parent;
            if (parentNext !== null) {
              pushAllNext(parentNext);
            }
            pushNode(next);
          }
          function popPreviousToCommonLevel(prev, next) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (parentPrev.depth === next.depth) {
              popToNearestCommonAncestor(parentPrev, next);
            } else {
              popPreviousToCommonLevel(parentPrev, next);
            }
          }
          function popNextToCommonLevel(prev, next) {
            var parentNext = next.parent;
            if (parentNext === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (prev.depth === parentNext.depth) {
              popToNearestCommonAncestor(prev, parentNext);
            } else {
              popNextToCommonLevel(prev, parentNext);
            }
            pushNode(next);
          }
          function switchContext(newSnapshot) {
            var prev = currentActiveSnapshot;
            var next = newSnapshot;
            if (prev !== next) {
              if (prev === null) {
                pushAllNext(next);
              } else if (next === null) {
                popAllPrevious(prev);
              } else if (prev.depth === next.depth) {
                popToNearestCommonAncestor(prev, next);
              } else if (prev.depth > next.depth) {
                popPreviousToCommonLevel(prev, next);
              } else {
                popNextToCommonLevel(prev, next);
              }
              currentActiveSnapshot = next;
            }
          }
          function pushProvider(context, nextValue) {
            var prevValue;
            {
              prevValue = context._currentValue2;
              context._currentValue2 = nextValue;
              {
                if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer2 = rendererSigil;
              }
            }
            var prevNode = currentActiveSnapshot;
            var newNode = {
              parent: prevNode,
              depth: prevNode === null ? 0 : prevNode.depth + 1,
              context,
              parentValue: prevValue,
              value: nextValue
            };
            currentActiveSnapshot = newNode;
            return newNode;
          }
          function popProvider(context) {
            var prevSnapshot = currentActiveSnapshot;
            if (prevSnapshot === null) {
              throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            }
            {
              if (prevSnapshot.context !== context) {
                error("The parent context is not the expected context. This is probably a bug in React.");
              }
            }
            {
              var _value = prevSnapshot.parentValue;
              if (_value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
                prevSnapshot.context._currentValue2 = prevSnapshot.context._defaultValue;
              } else {
                prevSnapshot.context._currentValue2 = _value;
              }
              {
                if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer2 = rendererSigil;
              }
            }
            return currentActiveSnapshot = prevSnapshot.parent;
          }
          function getActiveContext() {
            return currentActiveSnapshot;
          }
          function readContext(context) {
            var value = context._currentValue2;
            return value;
          }
          function get(key) {
            return key._reactInternals;
          }
          function set(key, value) {
            key._reactInternals = value;
          }
          var didWarnAboutNoopUpdateForComponent = {};
          var didWarnAboutDeprecatedWillMount = {};
          var didWarnAboutUninitializedState;
          var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
          var didWarnAboutLegacyLifecyclesAndDerivedState;
          var didWarnAboutUndefinedDerivedState;
          var warnOnUndefinedDerivedState;
          var warnOnInvalidCallback;
          var didWarnAboutDirectlyAssigningPropsToState;
          var didWarnAboutContextTypeAndContextTypes;
          var didWarnAboutInvalidateContextType;
          {
            didWarnAboutUninitializedState = new Set();
            didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
            didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
            didWarnAboutDirectlyAssigningPropsToState = new Set();
            didWarnAboutUndefinedDerivedState = new Set();
            didWarnAboutContextTypeAndContextTypes = new Set();
            didWarnAboutInvalidateContextType = new Set();
            var didWarnOnInvalidCallback = new Set();
            warnOnInvalidCallback = function(callback, callerName) {
              if (callback === null || typeof callback === "function") {
                return;
              }
              var key = callerName + "_" + callback;
              if (!didWarnOnInvalidCallback.has(key)) {
                didWarnOnInvalidCallback.add(key);
                error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
              }
            };
            warnOnUndefinedDerivedState = function(type, partialState) {
              if (partialState === void 0) {
                var componentName = getComponentNameFromType(type) || "Component";
                if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                  didWarnAboutUndefinedDerivedState.add(componentName);
                  error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
                }
              }
            };
          }
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnAboutNoopUpdateForComponent[warningKey]) {
                return;
              }
              error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
              didWarnAboutNoopUpdateForComponent[warningKey] = true;
            }
          }
          var classComponentUpdater = {
            isMounted: function(inst) {
              return false;
            },
            enqueueSetState: function(inst, payload, callback) {
              var internals = get(inst);
              if (internals.queue === null) {
                warnNoop(inst, "setState");
              } else {
                internals.queue.push(payload);
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            },
            enqueueReplaceState: function(inst, payload, callback) {
              var internals = get(inst);
              internals.replace = true;
              internals.queue = [payload];
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            },
            enqueueForceUpdate: function(inst, callback) {
              var internals = get(inst);
              if (internals.queue === null) {
                warnNoop(inst, "forceUpdate");
              } else {
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            }
          };
          function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
            var partialState = getDerivedStateFromProps(nextProps, prevState);
            {
              warnOnUndefinedDerivedState(ctor, partialState);
            }
            var newState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
            return newState;
          }
          function constructClassInstance(ctor, props, maskedLegacyContext) {
            var context = emptyContextObject;
            var contextType = ctor.contextType;
            {
              if ("contextType" in ctor) {
                var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                  didWarnAboutInvalidateContextType.add(ctor);
                  var addendum = "";
                  if (contextType === void 0) {
                    addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                  } else if (typeof contextType !== "object") {
                    addendum = " However, it is set to a " + typeof contextType + ".";
                  } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                    addendum = " Did you accidentally pass the Context.Provider instead?";
                  } else if (contextType._context !== void 0) {
                    addendum = " Did you accidentally pass the Context.Consumer instead?";
                  } else {
                    addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                  }
                  error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
                }
              }
            }
            if (typeof contextType === "object" && contextType !== null) {
              context = readContext(contextType);
            } else {
              context = maskedLegacyContext;
            }
            var instance = new ctor(props, context);
            {
              if (typeof ctor.getDerivedStateFromProps === "function" && (instance.state === null || instance.state === void 0)) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutUninitializedState.has(componentName)) {
                  didWarnAboutUninitializedState.add(componentName);
                  error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
                }
              }
              if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
                var foundWillMountName = null;
                var foundWillReceivePropsName = null;
                var foundWillUpdateName = null;
                if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  foundWillMountName = "componentWillMount";
                } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                  foundWillMountName = "UNSAFE_componentWillMount";
                }
                if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                  foundWillReceivePropsName = "componentWillReceiveProps";
                } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                  foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
                }
                if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                  foundWillUpdateName = "componentWillUpdate";
                } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                  foundWillUpdateName = "UNSAFE_componentWillUpdate";
                }
                if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                  var _componentName = getComponentNameFromType(ctor) || "Component";
                  var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                  if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                    didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                    error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                  }
                }
              }
            }
            return instance;
          }
          function checkClassInstance(instance, ctor, newProps) {
            {
              var name = getComponentNameFromType(ctor) || "Component";
              var renderPresent = instance.render;
              if (!renderPresent) {
                if (ctor.prototype && typeof ctor.prototype.render === "function") {
                  error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
                } else {
                  error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
                }
              }
              if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
                error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
              }
              if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
              }
              if (instance.propTypes) {
                error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
              }
              if (instance.contextType) {
                error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
              }
              {
                if (instance.contextTypes) {
                  error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
                }
                if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                  didWarnAboutContextTypeAndContextTypes.add(ctor);
                  error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
                }
              }
              if (typeof instance.componentShouldUpdate === "function") {
                error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
              }
              if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
                error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
              }
              if (typeof instance.componentDidUnmount === "function") {
                error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
              }
              if (typeof instance.componentDidReceiveProps === "function") {
                error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
              }
              if (typeof instance.componentWillRecieveProps === "function") {
                error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
              }
              if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
                error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
              }
              var hasMutatedProps = instance.props !== newProps;
              if (instance.props !== void 0 && hasMutatedProps) {
                error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
              }
              if (instance.defaultProps) {
                error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
                didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
                error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
              }
              if (typeof instance.getDerivedStateFromProps === "function") {
                error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof instance.getDerivedStateFromError === "function") {
                error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof ctor.getSnapshotBeforeUpdate === "function") {
                error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
              }
              var _state = instance.state;
              if (_state && (typeof _state !== "object" || isArray(_state))) {
                error("%s.state: must be set to an object or null", name);
              }
              if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
                error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
              }
            }
          }
          function callComponentWillMount(type, instance) {
            var oldState = instance.state;
            if (typeof instance.componentWillMount === "function") {
              {
                if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!didWarnAboutDeprecatedWillMount[componentName]) {
                    warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", componentName);
                    didWarnAboutDeprecatedWillMount[componentName] = true;
                  }
                }
              }
              instance.componentWillMount();
            }
            if (typeof instance.UNSAFE_componentWillMount === "function") {
              instance.UNSAFE_componentWillMount();
            }
            if (oldState !== instance.state) {
              {
                error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component");
              }
              classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
            }
          }
          function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
            if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
              var oldQueue = internalInstance.queue;
              var oldReplace = internalInstance.replace;
              internalInstance.queue = null;
              internalInstance.replace = false;
              if (oldReplace && oldQueue.length === 1) {
                inst.state = oldQueue[0];
              } else {
                var nextState = oldReplace ? oldQueue[0] : inst.state;
                var dontMutate = true;
                for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                  var partial = oldQueue[i];
                  var partialState = typeof partial === "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
                  if (partialState != null) {
                    if (dontMutate) {
                      dontMutate = false;
                      nextState = assign({}, nextState, partialState);
                    } else {
                      assign(nextState, partialState);
                    }
                  }
                }
                inst.state = nextState;
              }
            } else {
              internalInstance.queue = null;
            }
          }
          function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
            {
              checkClassInstance(instance, ctor, newProps);
            }
            var initialState = instance.state !== void 0 ? instance.state : null;
            instance.updater = classComponentUpdater;
            instance.props = newProps;
            instance.state = initialState;
            var internalInstance = {
              queue: [],
              replace: false
            };
            set(instance, internalInstance);
            var contextType = ctor.contextType;
            if (typeof contextType === "object" && contextType !== null) {
              instance.context = readContext(contextType);
            } else {
              instance.context = maskedLegacyContext;
            }
            {
              if (instance.state === newProps) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                  didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                  error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
                }
              }
            }
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            if (typeof getDerivedStateFromProps === "function") {
              instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
            }
            if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
              callComponentWillMount(ctor, instance);
              processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
            }
          }
          var emptyTreeContext = {
            id: 1,
            overflow: ""
          };
          function getTreeId(context) {
            var overflow = context.overflow;
            var idWithLeadingBit = context.id;
            var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
            return id.toString(32) + overflow;
          }
          function pushTreeContext(baseContext, totalChildren, index2) {
            var baseIdWithLeadingBit = baseContext.id;
            var baseOverflow = baseContext.overflow;
            var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
            var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
            var slot = index2 + 1;
            var length = getBitLength(totalChildren) + baseLength;
            if (length > 30) {
              var numberOfOverflowBits = baseLength - baseLength % 5;
              var newOverflowBits = (1 << numberOfOverflowBits) - 1;
              var newOverflow = (baseId & newOverflowBits).toString(32);
              var restOfBaseId = baseId >> numberOfOverflowBits;
              var restOfBaseLength = baseLength - numberOfOverflowBits;
              var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
              var restOfNewBits = slot << restOfBaseLength;
              var id = restOfNewBits | restOfBaseId;
              var overflow = newOverflow + baseOverflow;
              return {
                id: 1 << restOfLength | id,
                overflow
              };
            } else {
              var newBits = slot << baseLength;
              var _id = newBits | baseId;
              var _overflow = baseOverflow;
              return {
                id: 1 << length | _id,
                overflow: _overflow
              };
            }
          }
          function getBitLength(number2) {
            return 32 - clz32(number2);
          }
          function getLeadingBit(id) {
            return 1 << getBitLength(id) - 1;
          }
          var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
          var log = Math.log;
          var LN2 = Math.LN2;
          function clz32Fallback(x) {
            var asUint = x >>> 0;
            if (asUint === 0) {
              return 32;
            }
            return 31 - (log(asUint) / LN2 | 0) | 0;
          }
          function is(x, y) {
            return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
          }
          var objectIs = typeof Object.is === "function" ? Object.is : is;
          var currentlyRenderingComponent = null;
          var currentlyRenderingTask = null;
          var firstWorkInProgressHook = null;
          var workInProgressHook = null;
          var isReRender = false;
          var didScheduleRenderPhaseUpdate = false;
          var localIdCounter = 0;
          var renderPhaseUpdates = null;
          var numberOfReRenders = 0;
          var RE_RENDER_LIMIT = 25;
          var isInHookUserCodeInDev = false;
          var currentHookNameInDev;
          function resolveCurrentlyRenderingComponent() {
            if (currentlyRenderingComponent === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
            {
              if (isInHookUserCodeInDev) {
                error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
              }
            }
            return currentlyRenderingComponent;
          }
          function areHookInputsEqual(nextDeps, prevDeps) {
            if (prevDeps === null) {
              {
                error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
              }
              return false;
            }
            {
              if (nextDeps.length !== prevDeps.length) {
                error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
              }
            }
            for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
              if (objectIs(nextDeps[i], prevDeps[i])) {
                continue;
              }
              return false;
            }
            return true;
          }
          function createHook() {
            if (numberOfReRenders > 0) {
              throw new Error("Rendered more hooks than during the previous render");
            }
            return {
              memoizedState: null,
              queue: null,
              next: null
            };
          }
          function createWorkInProgressHook() {
            if (workInProgressHook === null) {
              if (firstWorkInProgressHook === null) {
                isReRender = false;
                firstWorkInProgressHook = workInProgressHook = createHook();
              } else {
                isReRender = true;
                workInProgressHook = firstWorkInProgressHook;
              }
            } else {
              if (workInProgressHook.next === null) {
                isReRender = false;
                workInProgressHook = workInProgressHook.next = createHook();
              } else {
                isReRender = true;
                workInProgressHook = workInProgressHook.next;
              }
            }
            return workInProgressHook;
          }
          function prepareToUseHooks(task, componentIdentity) {
            currentlyRenderingComponent = componentIdentity;
            currentlyRenderingTask = task;
            {
              isInHookUserCodeInDev = false;
            }
            localIdCounter = 0;
          }
          function finishHooks(Component, props, children, refOrContext) {
            while (didScheduleRenderPhaseUpdate) {
              didScheduleRenderPhaseUpdate = false;
              localIdCounter = 0;
              numberOfReRenders += 1;
              workInProgressHook = null;
              children = Component(props, refOrContext);
            }
            resetHooksState();
            return children;
          }
          function checkDidRenderIdHook() {
            var didRenderIdHook = localIdCounter !== 0;
            return didRenderIdHook;
          }
          function resetHooksState() {
            {
              isInHookUserCodeInDev = false;
            }
            currentlyRenderingComponent = null;
            currentlyRenderingTask = null;
            didScheduleRenderPhaseUpdate = false;
            firstWorkInProgressHook = null;
            numberOfReRenders = 0;
            renderPhaseUpdates = null;
            workInProgressHook = null;
          }
          function readContext$1(context) {
            {
              if (isInHookUserCodeInDev) {
                error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
              }
            }
            return readContext(context);
          }
          function useContext(context) {
            {
              currentHookNameInDev = "useContext";
            }
            resolveCurrentlyRenderingComponent();
            return readContext(context);
          }
          function basicStateReducer(state, action) {
            return typeof action === "function" ? action(state) : action;
          }
          function useState(initialState) {
            {
              currentHookNameInDev = "useState";
            }
            return useReducer(basicStateReducer, initialState);
          }
          function useReducer(reducer, initialArg, init) {
            {
              if (reducer !== basicStateReducer) {
                currentHookNameInDev = "useReducer";
              }
            }
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            if (isReRender) {
              var queue = workInProgressHook.queue;
              var dispatch = queue.dispatch;
              if (renderPhaseUpdates !== null) {
                var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate !== void 0) {
                  renderPhaseUpdates.delete(queue);
                  var newState = workInProgressHook.memoizedState;
                  var update = firstRenderPhaseUpdate;
                  do {
                    var action = update.action;
                    {
                      isInHookUserCodeInDev = true;
                    }
                    newState = reducer(newState, action);
                    {
                      isInHookUserCodeInDev = false;
                    }
                    update = update.next;
                  } while (update !== null);
                  workInProgressHook.memoizedState = newState;
                  return [newState, dispatch];
                }
              }
              return [workInProgressHook.memoizedState, dispatch];
            } else {
              {
                isInHookUserCodeInDev = true;
              }
              var initialState;
              if (reducer === basicStateReducer) {
                initialState = typeof initialArg === "function" ? initialArg() : initialArg;
              } else {
                initialState = init !== void 0 ? init(initialArg) : initialArg;
              }
              {
                isInHookUserCodeInDev = false;
              }
              workInProgressHook.memoizedState = initialState;
              var _queue = workInProgressHook.queue = {
                last: null,
                dispatch: null
              };
              var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
              return [workInProgressHook.memoizedState, _dispatch];
            }
          }
          function useMemo(nextCreate, deps) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            if (workInProgressHook !== null) {
              var prevState = workInProgressHook.memoizedState;
              if (prevState !== null) {
                if (nextDeps !== null) {
                  var prevDeps = prevState[1];
                  if (areHookInputsEqual(nextDeps, prevDeps)) {
                    return prevState[0];
                  }
                }
              }
            }
            {
              isInHookUserCodeInDev = true;
            }
            var nextValue = nextCreate();
            {
              isInHookUserCodeInDev = false;
            }
            workInProgressHook.memoizedState = [nextValue, nextDeps];
            return nextValue;
          }
          function useRef(initialValue) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var previousRef = workInProgressHook.memoizedState;
            if (previousRef === null) {
              var ref = {
                current: initialValue
              };
              {
                Object.seal(ref);
              }
              workInProgressHook.memoizedState = ref;
              return ref;
            } else {
              return previousRef;
            }
          }
          function useLayoutEffect(create2, inputs) {
            {
              currentHookNameInDev = "useLayoutEffect";
              error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
            }
          }
          function dispatchAction(componentIdentity, queue, action) {
            if (numberOfReRenders >= RE_RENDER_LIMIT) {
              throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
            }
            if (componentIdentity === currentlyRenderingComponent) {
              didScheduleRenderPhaseUpdate = true;
              var update = {
                action,
                next: null
              };
              if (renderPhaseUpdates === null) {
                renderPhaseUpdates = new Map();
              }
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate === void 0) {
                renderPhaseUpdates.set(queue, update);
              } else {
                var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
                while (lastRenderPhaseUpdate.next !== null) {
                  lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
                }
                lastRenderPhaseUpdate.next = update;
              }
            }
          }
          function useCallback(callback, deps) {
            return useMemo(function() {
              return callback;
            }, deps);
          }
          function useMutableSource(source, getSnapshot, subscribe) {
            resolveCurrentlyRenderingComponent();
            return getSnapshot(source._source);
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            if (getServerSnapshot === void 0) {
              throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
            }
            return getServerSnapshot();
          }
          function useDeferredValue(value) {
            resolveCurrentlyRenderingComponent();
            return value;
          }
          function unsupportedStartTransition() {
            throw new Error("startTransition cannot be called during server rendering.");
          }
          function useTransition() {
            resolveCurrentlyRenderingComponent();
            return [false, unsupportedStartTransition];
          }
          function useId() {
            var task = currentlyRenderingTask;
            var treeId = getTreeId(task.treeContext);
            var responseState = currentResponseState;
            if (responseState === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
            }
            var localId = localIdCounter++;
            return makeId(responseState, treeId, localId);
          }
          function noop() {
          }
          var Dispatcher = {
            readContext: readContext$1,
            useContext,
            useMemo,
            useReducer,
            useRef,
            useState,
            useInsertionEffect: noop,
            useLayoutEffect,
            useCallback,
            useImperativeHandle: noop,
            useEffect: noop,
            useDebugValue: noop,
            useDeferredValue,
            useTransition,
            useId,
            useMutableSource,
            useSyncExternalStore
          };
          var currentResponseState = null;
          function setCurrentResponseState(responseState) {
            currentResponseState = responseState;
          }
          function getStackByComponentStackNode(componentStack) {
            try {
              var info = "";
              var node = componentStack;
              do {
                switch (node.tag) {
                  case 0:
                    info += describeBuiltInComponentFrame(node.type, null, null);
                    break;
                  case 1:
                    info += describeFunctionComponentFrame(node.type, null, null);
                    break;
                  case 2:
                    info += describeClassComponentFrame(node.type, null, null);
                    break;
                }
                node = node.parent;
              } while (node);
              return info;
            } catch (x) {
              return "\nError generating stack: " + x.message + "\n" + x.stack;
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          var PENDING = 0;
          var COMPLETED = 1;
          var FLUSHED = 2;
          var ABORTED = 3;
          var ERRORED = 4;
          var OPEN = 0;
          var CLOSING = 1;
          var CLOSED = 2;
          var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
          function defaultErrorHandler(error2) {
            console["error"](error2);
          }
          function noop$1() {
          }
          function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError) {
            var pingedTasks = [];
            var abortSet = new Set();
            var request = {
              destination: null,
              responseState,
              progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
              status: OPEN,
              fatalError: null,
              nextSegmentId: 0,
              allPendingTasks: 0,
              pendingRootTasks: 0,
              completedRootSegment: null,
              abortableTasks: abortSet,
              pingedTasks,
              clientRenderedBoundaries: [],
              completedBoundaries: [],
              partialBoundaries: [],
              onError: onError2 === void 0 ? defaultErrorHandler : onError2,
              onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
              onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
              onShellError: onShellError === void 0 ? noop$1 : onShellError,
              onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
            };
            var rootSegment = createPendingSegment(request, 0, null, rootFormatContext);
            rootSegment.parentFlushed = true;
            var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
            pingedTasks.push(rootTask);
            return request;
          }
          function pingTask(request, task) {
            var pingedTasks = request.pingedTasks;
            pingedTasks.push(task);
            if (pingedTasks.length === 1) {
              scheduleWork(function() {
                return performWork(request);
              });
            }
          }
          function createSuspenseBoundary(request, fallbackAbortableTasks) {
            return {
              id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
              rootSegmentID: -1,
              parentFlushed: false,
              pendingTasks: 0,
              forceClientRender: false,
              completedSegments: [],
              byteSize: 0,
              fallbackAbortableTasks
            };
          }
          function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
            request.allPendingTasks++;
            if (blockedBoundary === null) {
              request.pendingRootTasks++;
            } else {
              blockedBoundary.pendingTasks++;
            }
            var task = {
              node,
              ping: function() {
                return pingTask(request, task);
              },
              blockedBoundary,
              blockedSegment,
              abortSet,
              legacyContext,
              context,
              treeContext
            };
            {
              task.componentStack = null;
            }
            abortSet.add(task);
            return task;
          }
          function createPendingSegment(request, index2, boundary, formatContext) {
            return {
              status: PENDING,
              id: -1,
              index: index2,
              parentFlushed: false,
              chunks: [],
              children: [],
              formatContext,
              boundary
            };
          }
          var currentTaskInDEV = null;
          function getCurrentStackInDEV() {
            {
              if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
                return "";
              }
              return getStackByComponentStackNode(currentTaskInDEV.componentStack);
            }
          }
          function pushBuiltInComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 0,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushFunctionComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 1,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushClassComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 2,
                parent: task.componentStack,
                type
              };
            }
          }
          function popComponentStackInDEV(task) {
            {
              if (task.componentStack === null) {
                error("Unexpectedly popped too many stack frames. This is a bug in React.");
              } else {
                task.componentStack = task.componentStack.parent;
              }
            }
          }
          function logRecoverableError(request, error2) {
            var onError2 = request.onError;
            onError2(error2);
          }
          function fatalError(request, error2) {
            var onShellError = request.onShellError;
            onShellError(error2);
            var onFatalError = request.onFatalError;
            onFatalError(error2);
            if (request.destination !== null) {
              request.status = CLOSED;
              closeWithError(request.destination, error2);
            } else {
              request.status = CLOSING;
              request.fatalError = error2;
            }
          }
          function renderSuspenseBoundary(request, task, props) {
            pushBuiltInComponentStackInDEV(task, "Suspense");
            var parentBoundary = task.blockedBoundary;
            var parentSegment = task.blockedSegment;
            var fallback = props.fallback;
            var content3 = props.children;
            var fallbackAbortSet = new Set();
            var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
            var insertionIndex = parentSegment.chunks.length;
            var boundarySegment = createPendingSegment(request, insertionIndex, newBoundary, parentSegment.formatContext);
            parentSegment.children.push(boundarySegment);
            var contentRootSegment = createPendingSegment(request, 0, null, parentSegment.formatContext);
            contentRootSegment.parentFlushed = true;
            task.blockedBoundary = newBoundary;
            task.blockedSegment = contentRootSegment;
            try {
              renderNode(request, task, content3);
              contentRootSegment.status = COMPLETED;
              queueCompletedSegment(newBoundary, contentRootSegment);
              if (newBoundary.pendingTasks === 0) {
                popComponentStackInDEV(task);
                return;
              }
            } catch (error2) {
              contentRootSegment.status = ERRORED;
              logRecoverableError(request, error2);
              newBoundary.forceClientRender = true;
            } finally {
              task.blockedBoundary = parentBoundary;
              task.blockedSegment = parentSegment;
            }
            var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
            {
              suspendedFallbackTask.componentStack = task.componentStack;
            }
            request.pingedTasks.push(suspendedFallbackTask);
            popComponentStackInDEV(task);
          }
          function renderHostElement(request, task, type, props) {
            pushBuiltInComponentStackInDEV(task, type);
            var segment = task.blockedSegment;
            var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
            var prevContext = segment.formatContext;
            segment.formatContext = getChildFormatContext(prevContext, type, props);
            renderNode(request, task, children);
            segment.formatContext = prevContext;
            pushEndInstance(segment.chunks, type);
            popComponentStackInDEV(task);
          }
          function shouldConstruct$1(Component) {
            return Component.prototype && Component.prototype.isReactComponent;
          }
          function renderWithHooks(request, task, Component, props, secondArg) {
            var componentIdentity = {};
            prepareToUseHooks(task, componentIdentity);
            var result = Component(props, secondArg);
            return finishHooks(Component, props, result, secondArg);
          }
          function finishClassComponent(request, task, instance, Component, props) {
            var nextChildren = instance.render();
            {
              if (instance.props !== props) {
                if (!didWarnAboutReassigningProps) {
                  error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component) || "a component");
                }
                didWarnAboutReassigningProps = true;
              }
            }
            {
              var childContextTypes = Component.childContextTypes;
              if (childContextTypes !== null && childContextTypes !== void 0) {
                var previousContext = task.legacyContext;
                var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
                task.legacyContext = mergedContext;
                renderNodeDestructive(request, task, nextChildren);
                task.legacyContext = previousContext;
                return;
              }
            }
            renderNodeDestructive(request, task, nextChildren);
          }
          function renderClassComponent(request, task, Component, props) {
            pushClassComponentStackInDEV(task, Component);
            var maskedContext = getMaskedContext(Component, task.legacyContext);
            var instance = constructClassInstance(Component, props, maskedContext);
            mountClassInstance(instance, Component, props, maskedContext);
            finishClassComponent(request, task, instance, Component, props);
            popComponentStackInDEV(task);
          }
          var didWarnAboutBadClass = {};
          var didWarnAboutModulePatternComponent = {};
          var didWarnAboutContextTypeOnFunctionComponent = {};
          var didWarnAboutGetDerivedStateOnFunctionComponent = {};
          var didWarnAboutReassigningProps = false;
          var didWarnAboutGenerators = false;
          var didWarnAboutMaps = false;
          var hasWarnedAboutUsingContextAsConsumer = false;
          function renderIndeterminateComponent(request, task, Component, props) {
            var legacyContext;
            {
              legacyContext = getMaskedContext(Component, task.legacyContext);
            }
            pushFunctionComponentStackInDEV(task, Component);
            {
              if (Component.prototype && typeof Component.prototype.render === "function") {
                var componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutBadClass[componentName]) {
                  error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                  didWarnAboutBadClass[componentName] = true;
                }
              }
            }
            var value = renderWithHooks(request, task, Component, props, legacyContext);
            var hasId = checkDidRenderIdHook();
            {
              if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
                var _componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                  didWarnAboutModulePatternComponent[_componentName] = true;
                }
              }
            }
            if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
              {
                var _componentName2 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName2]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                  didWarnAboutModulePatternComponent[_componentName2] = true;
                }
              }
              mountClassInstance(value, Component, props, legacyContext);
              finishClassComponent(request, task, value, Component, props);
            } else {
              {
                validateFunctionComponentInDev(Component);
              }
              if (hasId) {
                var prevTreeContext = task.treeContext;
                var totalChildren = 1;
                var index2 = 0;
                task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index2);
                try {
                  renderNodeDestructive(request, task, value);
                } finally {
                  task.treeContext = prevTreeContext;
                }
              } else {
                renderNodeDestructive(request, task, value);
              }
            }
            popComponentStackInDEV(task);
          }
          function validateFunctionComponentInDev(Component) {
            {
              if (Component) {
                if (Component.childContextTypes) {
                  error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
                }
              }
              if (typeof Component.getDerivedStateFromProps === "function") {
                var _componentName3 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                  error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                  didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
                }
              }
              if (typeof Component.contextType === "object" && Component.contextType !== null) {
                var _componentName4 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                  error("%s: Function components do not support contextType.", _componentName4);
                  didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
                }
              }
            }
          }
          function resolveDefaultProps(Component, baseProps) {
            if (Component && Component.defaultProps) {
              var props = assign({}, baseProps);
              var defaultProps = Component.defaultProps;
              for (var propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
              return props;
            }
            return baseProps;
          }
          function renderForwardRef(request, task, type, props, ref) {
            pushFunctionComponentStackInDEV(task, type.render);
            var children = renderWithHooks(request, task, type.render, props, ref);
            var hasId = checkDidRenderIdHook();
            if (hasId) {
              var prevTreeContext = task.treeContext;
              var totalChildren = 1;
              var index2 = 0;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index2);
              try {
                renderNodeDestructive(request, task, children);
              } finally {
                task.treeContext = prevTreeContext;
              }
            } else {
              renderNodeDestructive(request, task, children);
            }
            popComponentStackInDEV(task);
          }
          function renderMemo(request, task, type, props, ref) {
            var innerType = type.type;
            var resolvedProps = resolveDefaultProps(innerType, props);
            renderElement(request, task, innerType, resolvedProps, ref);
          }
          function renderContextConsumer(request, task, context, props) {
            {
              if (context._context === void 0) {
                if (context !== context.Consumer) {
                  if (!hasWarnedAboutUsingContextAsConsumer) {
                    hasWarnedAboutUsingContextAsConsumer = true;
                    error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                }
              } else {
                context = context._context;
              }
            }
            var render = props.children;
            {
              if (typeof render !== "function") {
                error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
              }
            }
            var newValue = readContext(context);
            var newChildren = render(newValue);
            renderNodeDestructive(request, task, newChildren);
          }
          function renderContextProvider(request, task, type, props) {
            var context = type._context;
            var value = props.value;
            var children = props.children;
            var prevSnapshot;
            {
              prevSnapshot = task.context;
            }
            task.context = pushProvider(context, value);
            renderNodeDestructive(request, task, children);
            task.context = popProvider(context);
            {
              if (prevSnapshot !== task.context) {
                error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
              }
            }
          }
          function renderLazyComponent(request, task, lazyComponent, props, ref) {
            pushBuiltInComponentStackInDEV(task, "Lazy");
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;
            var Component = init(payload);
            var resolvedProps = resolveDefaultProps(Component, props);
            renderElement(request, task, Component, resolvedProps, ref);
            popComponentStackInDEV(task);
          }
          function renderElement(request, task, type, props, ref) {
            if (typeof type === "function") {
              if (shouldConstruct$1(type)) {
                renderClassComponent(request, task, type, props);
                return;
              } else {
                renderIndeterminateComponent(request, task, type, props);
                return;
              }
            }
            if (typeof type === "string") {
              renderHostElement(request, task, type, props);
              return;
            }
            switch (type) {
              case REACT_LEGACY_HIDDEN_TYPE:
              case REACT_DEBUG_TRACING_MODE_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_FRAGMENT_TYPE: {
                renderNodeDestructive(request, task, props.children);
                return;
              }
              case REACT_SUSPENSE_LIST_TYPE: {
                pushBuiltInComponentStackInDEV(task, "SuspenseList");
                renderNodeDestructive(request, task, props.children);
                popComponentStackInDEV(task);
                return;
              }
              case REACT_SCOPE_TYPE: {
                throw new Error("ReactDOMServer does not yet support scope components.");
              }
              case REACT_SUSPENSE_TYPE: {
                {
                  renderSuspenseBoundary(request, task, props);
                }
                return;
              }
            }
            if (typeof type === "object" && type !== null) {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE: {
                  renderForwardRef(request, task, type, props, ref);
                  return;
                }
                case REACT_MEMO_TYPE: {
                  renderMemo(request, task, type, props, ref);
                  return;
                }
                case REACT_PROVIDER_TYPE: {
                  renderContextProvider(request, task, type, props);
                  return;
                }
                case REACT_CONTEXT_TYPE: {
                  renderContextConsumer(request, task, type, props);
                  return;
                }
                case REACT_LAZY_TYPE: {
                  renderLazyComponent(request, task, type, props);
                  return;
                }
              }
            }
            var info = "";
            {
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
          }
          function validateIterable(iterable, iteratorFn) {
            {
              if (typeof Symbol === "function" && iterable[Symbol.toStringTag] === "Generator") {
                if (!didWarnAboutGenerators) {
                  error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                }
                didWarnAboutGenerators = true;
              }
              if (iterable.entries === iteratorFn) {
                if (!didWarnAboutMaps) {
                  error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
            }
          }
          function renderNodeDestructive(request, task, node) {
            task.node = node;
            if (typeof node === "object" && node !== null) {
              switch (node.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var element2 = node;
                  var type = element2.type;
                  var props = element2.props;
                  var ref = element2.ref;
                  renderElement(request, task, type, props, ref);
                  return;
                }
                case REACT_PORTAL_TYPE:
                  throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                case REACT_LAZY_TYPE: {
                  var lazyNode = node;
                  var payload = lazyNode._payload;
                  var init = lazyNode._init;
                  var resolvedNode = init(payload);
                  renderNodeDestructive(request, task, resolvedNode);
                  return;
                }
              }
              if (isArray(node)) {
                renderChildrenArray(request, task, node);
                return;
              }
              var iteratorFn = getIteratorFn(node);
              if (iteratorFn) {
                {
                  validateIterable(node, iteratorFn);
                }
                var iterator = iteratorFn.call(node);
                if (iterator) {
                  var step = iterator.next();
                  if (!step.done) {
                    var children = [];
                    do {
                      children.push(step.value);
                      step = iterator.next();
                    } while (!step.done);
                    renderChildrenArray(request, task, children);
                    return;
                  }
                  return;
                }
              }
              var childString = Object.prototype.toString.call(node);
              throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
            }
            if (typeof node === "string") {
              pushTextInstance$1(task.blockedSegment.chunks, node, request.responseState);
              return;
            }
            if (typeof node === "number") {
              pushTextInstance$1(task.blockedSegment.chunks, "" + node, request.responseState);
              return;
            }
            {
              if (typeof node === "function") {
                error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
              }
            }
          }
          function renderChildrenArray(request, task, children) {
            var totalChildren = children.length;
            for (var i = 0; i < totalChildren; i++) {
              var prevTreeContext = task.treeContext;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
              try {
                renderNode(request, task, children[i]);
              } finally {
                task.treeContext = prevTreeContext;
              }
            }
          }
          function spawnNewSuspendedTask(request, task, x) {
            var segment = task.blockedSegment;
            var insertionIndex = segment.chunks.length;
            var newSegment = createPendingSegment(request, insertionIndex, null, segment.formatContext);
            segment.children.push(newSegment);
            var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
            {
              if (task.componentStack !== null) {
                newTask.componentStack = task.componentStack.parent;
              }
            }
            var ping = newTask.ping;
            x.then(ping, ping);
          }
          function renderNode(request, task, node) {
            var previousFormatContext = task.blockedSegment.formatContext;
            var previousLegacyContext = task.legacyContext;
            var previousContext = task.context;
            var previousComponentStack = null;
            {
              previousComponentStack = task.componentStack;
            }
            try {
              return renderNodeDestructive(request, task, node);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                spawnNewSuspendedTask(request, task, x);
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                return;
              } else {
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                throw x;
              }
            }
          }
          function erroredTask(request, boundary, segment, error2) {
            logRecoverableError(request, error2);
            if (boundary === null) {
              fatalError(request, error2);
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function abortTaskSoft(task) {
            var request = this;
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            finishedTask(request, boundary, segment);
          }
          function abortTask(task) {
            var request = this;
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            if (boundary === null) {
              request.allPendingTasks--;
              if (request.status !== CLOSED) {
                request.status = CLOSED;
                if (request.destination !== null) {
                  close(request.destination);
                }
              }
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
              boundary.fallbackAbortableTasks.forEach(abortTask, request);
              boundary.fallbackAbortableTasks.clear();
              request.allPendingTasks--;
              if (request.allPendingTasks === 0) {
                var onAllReady = request.onAllReady;
                onAllReady();
              }
            }
          }
          function queueCompletedSegment(boundary, segment) {
            if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
              var childSegment = segment.children[0];
              childSegment.id = segment.id;
              childSegment.parentFlushed = true;
              if (childSegment.status === COMPLETED) {
                queueCompletedSegment(boundary, childSegment);
              }
            } else {
              var completedSegments = boundary.completedSegments;
              completedSegments.push(segment);
            }
          }
          function finishedTask(request, boundary, segment) {
            if (boundary === null) {
              if (segment.parentFlushed) {
                if (request.completedRootSegment !== null) {
                  throw new Error("There can only be one root segment. This is a bug in React.");
                }
                request.completedRootSegment = segment;
              }
              request.pendingRootTasks--;
              if (request.pendingRootTasks === 0) {
                request.onShellError = noop$1;
                var onShellReady = request.onShellReady;
                onShellReady();
              }
            } else {
              boundary.pendingTasks--;
              if (boundary.forceClientRender)
                ;
              else if (boundary.pendingTasks === 0) {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                  }
                }
                if (boundary.parentFlushed) {
                  request.completedBoundaries.push(boundary);
                }
                boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
                boundary.fallbackAbortableTasks.clear();
              } else {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                    var completedSegments = boundary.completedSegments;
                    if (completedSegments.length === 1) {
                      if (boundary.parentFlushed) {
                        request.partialBoundaries.push(boundary);
                      }
                    }
                  }
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function retryTask(request, task) {
            var segment = task.blockedSegment;
            if (segment.status !== PENDING) {
              return;
            }
            switchContext(task.context);
            var prevTaskInDEV = null;
            {
              prevTaskInDEV = currentTaskInDEV;
              currentTaskInDEV = task;
            }
            try {
              renderNodeDestructive(request, task, task.node);
              task.abortSet.delete(task);
              segment.status = COMPLETED;
              finishedTask(request, task.blockedBoundary, segment);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                var ping = task.ping;
                x.then(ping, ping);
              } else {
                task.abortSet.delete(task);
                segment.status = ERRORED;
                erroredTask(request, task.blockedBoundary, segment, x);
              }
            } finally {
              {
                currentTaskInDEV = prevTaskInDEV;
              }
            }
          }
          function performWork(request) {
            if (request.status === CLOSED) {
              return;
            }
            var prevContext = getActiveContext();
            var prevDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = Dispatcher;
            var prevGetCurrentStackImpl;
            {
              prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
              ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
            }
            var prevResponseState = currentResponseState;
            setCurrentResponseState(request.responseState);
            try {
              var pingedTasks = request.pingedTasks;
              var i;
              for (i = 0; i < pingedTasks.length; i++) {
                var task = pingedTasks[i];
                retryTask(request, task);
              }
              pingedTasks.splice(0, i);
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            } finally {
              setCurrentResponseState(prevResponseState);
              ReactCurrentDispatcher$1.current = prevDispatcher;
              {
                ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
              }
              if (prevDispatcher === Dispatcher) {
                switchContext(prevContext);
              }
            }
          }
          function flushSubtree(request, destination, segment) {
            segment.parentFlushed = true;
            switch (segment.status) {
              case PENDING: {
                var segmentID = segment.id = request.nextSegmentId++;
                return writePlaceholder(destination, request.responseState, segmentID);
              }
              case COMPLETED: {
                segment.status = FLUSHED;
                var r = true;
                var chunks = segment.chunks;
                var chunkIdx = 0;
                var children = segment.children;
                for (var childIdx = 0; childIdx < children.length; childIdx++) {
                  var nextChild = children[childIdx];
                  for (; chunkIdx < nextChild.index; chunkIdx++) {
                    writeChunk(destination, chunks[chunkIdx]);
                  }
                  r = flushSegment(request, destination, nextChild);
                }
                for (; chunkIdx < chunks.length - 1; chunkIdx++) {
                  writeChunk(destination, chunks[chunkIdx]);
                }
                if (chunkIdx < chunks.length) {
                  r = writeChunkAndReturn(destination, chunks[chunkIdx]);
                }
                return r;
              }
              default: {
                throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
              }
            }
          }
          function flushSegment(request, destination, segment) {
            var boundary = segment.boundary;
            if (boundary === null) {
              return flushSubtree(request, destination, segment);
            }
            boundary.parentFlushed = true;
            if (boundary.forceClientRender) {
              writeStartClientRenderedSuspenseBoundary$1(destination, request.responseState);
              flushSubtree(request, destination, segment);
              return writeEndClientRenderedSuspenseBoundary$1(destination, request.responseState);
            } else if (boundary.pendingTasks > 0) {
              boundary.rootSegmentID = request.nextSegmentId++;
              if (boundary.completedSegments.length > 0) {
                request.partialBoundaries.push(boundary);
              }
              var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
              writeStartPendingSuspenseBoundary(destination, request.responseState, id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else if (boundary.byteSize > request.progressiveChunkSize) {
              boundary.rootSegmentID = request.nextSegmentId++;
              request.completedBoundaries.push(boundary);
              writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else {
              writeStartCompletedSuspenseBoundary$1(destination, request.responseState);
              var completedSegments = boundary.completedSegments;
              if (completedSegments.length !== 1) {
                throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
              }
              var contentSegment = completedSegments[0];
              flushSegment(request, destination, contentSegment);
              return writeEndCompletedSuspenseBoundary$1(destination, request.responseState);
            }
          }
          function flushClientRenderedBoundary(request, destination, boundary) {
            return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id);
          }
          function flushSegmentContainer(request, destination, segment) {
            writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
            flushSegment(request, destination, segment);
            return writeEndSegment(destination, segment.formatContext);
          }
          function flushCompletedBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              flushPartiallyCompletedSegment(request, destination, boundary, segment);
            }
            completedSegments.length = 0;
            return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
          }
          function flushPartialBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
                i++;
                completedSegments.splice(0, i);
                return false;
              }
            }
            completedSegments.splice(0, i);
            return true;
          }
          function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
            if (segment.status === FLUSHED) {
              return true;
            }
            var segmentID = segment.id;
            if (segmentID === -1) {
              var rootSegmentID = segment.id = boundary.rootSegmentID;
              if (rootSegmentID === -1) {
                throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
              }
              return flushSegmentContainer(request, destination, segment);
            } else {
              flushSegmentContainer(request, destination, segment);
              return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
            }
          }
          function flushCompletedQueues(request, destination) {
            try {
              var completedRootSegment = request.completedRootSegment;
              if (completedRootSegment !== null && request.pendingRootTasks === 0) {
                flushSegment(request, destination, completedRootSegment);
                request.completedRootSegment = null;
                writeCompletedRoot(destination, request.responseState);
              }
              var clientRenderedBoundaries = request.clientRenderedBoundaries;
              var i;
              for (i = 0; i < clientRenderedBoundaries.length; i++) {
                var boundary = clientRenderedBoundaries[i];
                if (!flushClientRenderedBoundary(request, destination, boundary)) {
                  request.destination = null;
                  i++;
                  clientRenderedBoundaries.splice(0, i);
                  return;
                }
              }
              clientRenderedBoundaries.splice(0, i);
              var completedBoundaries = request.completedBoundaries;
              for (i = 0; i < completedBoundaries.length; i++) {
                var _boundary = completedBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary)) {
                  request.destination = null;
                  i++;
                  completedBoundaries.splice(0, i);
                  return;
                }
              }
              completedBoundaries.splice(0, i);
              completeWriting(destination);
              beginWriting(destination);
              var partialBoundaries = request.partialBoundaries;
              for (i = 0; i < partialBoundaries.length; i++) {
                var _boundary2 = partialBoundaries[i];
                if (!flushPartialBoundary(request, destination, _boundary2)) {
                  request.destination = null;
                  i++;
                  partialBoundaries.splice(0, i);
                  return;
                }
              }
              partialBoundaries.splice(0, i);
              var largeBoundaries = request.completedBoundaries;
              for (i = 0; i < largeBoundaries.length; i++) {
                var _boundary3 = largeBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary3)) {
                  request.destination = null;
                  i++;
                  largeBoundaries.splice(0, i);
                  return;
                }
              }
              largeBoundaries.splice(0, i);
            } finally {
              if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0) {
                {
                  if (request.abortableTasks.size !== 0) {
                    error("There was still abortable task at the root when we closed. This is a bug in React.");
                  }
                }
                close(destination);
              }
            }
          }
          function startWork(request) {
            scheduleWork(function() {
              return performWork(request);
            });
          }
          function startFlowing(request, destination) {
            if (request.status === CLOSING) {
              request.status = CLOSED;
              closeWithError(destination, request.fatalError);
              return;
            }
            if (request.status === CLOSED) {
              return;
            }
            if (request.destination !== null) {
              return;
            }
            request.destination = destination;
            try {
              flushCompletedQueues(request, destination);
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function abort(request) {
            try {
              var abortableTasks = request.abortableTasks;
              abortableTasks.forEach(abortTask, request);
              abortableTasks.clear();
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function onError() {
          }
          function renderToStringImpl(children, options, generateStaticMarkup) {
            var didFatal = false;
            var fatalError2 = null;
            var result = "";
            var destination = {
              push: function(chunk) {
                if (chunk !== null) {
                  result += chunk;
                }
                return true;
              },
              destroy: function(error2) {
                didFatal = true;
                fatalError2 = error2;
              }
            };
            var readyToStream = false;
            function onShellReady() {
              readyToStream = true;
            }
            var request = createRequest(children, createResponseState$1(generateStaticMarkup, options ? options.identifierPrefix : void 0), createRootFormatContext(), Infinity, onError, void 0, onShellReady, void 0, void 0);
            startWork(request);
            abort(request);
            startFlowing(request, destination);
            if (didFatal) {
              throw fatalError2;
            }
            if (!readyToStream) {
              throw new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
            }
            return result;
          }
          function renderToString(children, options) {
            return renderToStringImpl(children, options, false);
          }
          function renderToStaticMarkup(children, options) {
            return renderToStringImpl(children, options, true);
          }
          function renderToNodeStream() {
            throw new Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
          }
          function renderToStaticNodeStream() {
            throw new Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
          }
          exports.renderToNodeStream = renderToNodeStream;
          exports.renderToStaticMarkup = renderToStaticMarkup;
          exports.renderToStaticNodeStream = renderToStaticNodeStream;
          exports.renderToString = renderToString;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // example/.central/.central-build/node_modules/react-dom/cjs/react-dom-server.browser.development.js
  var require_react_dom_server_browser_development = __commonJS({
    "example/.central/.central-build/node_modules/react-dom/cjs/react-dom-server.browser.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React3 = require_react();
          var ReactVersion = "18.1.0";
          var ReactSharedInternals = React3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          function scheduleWork(callback) {
            callback();
          }
          var VIEW_SIZE = 512;
          var currentView = null;
          var writtenBytes = 0;
          function beginWriting(destination) {
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = 0;
          }
          function writeChunk(destination, chunk) {
            if (chunk.length === 0) {
              return;
            }
            if (chunk.length > VIEW_SIZE) {
              if (writtenBytes > 0) {
                destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
                currentView = new Uint8Array(VIEW_SIZE);
                writtenBytes = 0;
              }
              destination.enqueue(chunk);
              return;
            }
            var bytesToWrite = chunk;
            var allowableBytes = currentView.length - writtenBytes;
            if (allowableBytes < bytesToWrite.length) {
              if (allowableBytes === 0) {
                destination.enqueue(currentView);
              } else {
                currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes);
                destination.enqueue(currentView);
                bytesToWrite = bytesToWrite.subarray(allowableBytes);
              }
              currentView = new Uint8Array(VIEW_SIZE);
              writtenBytes = 0;
            }
            currentView.set(bytesToWrite, writtenBytes);
            writtenBytes += bytesToWrite.length;
          }
          function writeChunkAndReturn(destination, chunk) {
            writeChunk(destination, chunk);
            return true;
          }
          function completeWriting(destination) {
            if (currentView && writtenBytes > 0) {
              destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
              currentView = null;
              writtenBytes = 0;
            }
          }
          function close(destination) {
            destination.close();
          }
          var textEncoder = new TextEncoder();
          function stringToChunk(content3) {
            return textEncoder.encode(content3);
          }
          function stringToPrecomputedChunk(content3) {
            return textEncoder.encode(content3);
          }
          function closeWithError(destination, error2) {
            if (typeof destination.error === "function") {
              destination.error(error2);
            } else {
              destination.close();
            }
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkAttributeStringCoercion(value, attributeName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkCSSPropertyStringCoercion(value, propName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkHtmlStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          var RESERVED = 0;
          var STRING = 1;
          var BOOLEANISH_STRING = 2;
          var BOOLEAN = 3;
          var OVERLOADED_BOOLEAN = 4;
          var NUMERIC = 5;
          var POSITIVE_NUMERIC = 6;
          var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
          var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
          var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
          var illegalAttributeNameCache = {};
          var validatedAttributeNameCache = {};
          function isAttributeNameSafe(attributeName) {
            if (hasOwnProperty2.call(validatedAttributeNameCache, attributeName)) {
              return true;
            }
            if (hasOwnProperty2.call(illegalAttributeNameCache, attributeName)) {
              return false;
            }
            if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
              validatedAttributeNameCache[attributeName] = true;
              return true;
            }
            illegalAttributeNameCache[attributeName] = true;
            {
              error("Invalid attribute name: `%s`", attributeName);
            }
            return false;
          }
          function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
            if (propertyInfo !== null && propertyInfo.type === RESERVED) {
              return false;
            }
            switch (typeof value) {
              case "function":
              case "symbol":
                return true;
              case "boolean": {
                if (isCustomComponentTag) {
                  return false;
                }
                if (propertyInfo !== null) {
                  return !propertyInfo.acceptsBooleans;
                } else {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  return prefix2 !== "data-" && prefix2 !== "aria-";
                }
              }
              default:
                return false;
            }
          }
          function getPropertyInfo(name) {
            return properties.hasOwnProperty(name) ? properties[name] : null;
          }
          function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
            this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
            this.attributeName = attributeName;
            this.attributeNamespace = attributeNamespace;
            this.mustUseProperty = mustUseProperty;
            this.propertyName = name;
            this.type = type;
            this.sanitizeURL = sanitizeURL2;
            this.removeEmptyString = removeEmptyString;
          }
          var properties = {};
          var reservedProps = [
            "children",
            "dangerouslySetInnerHTML",
            "defaultValue",
            "defaultChecked",
            "innerHTML",
            "suppressContentEditableWarning",
            "suppressHydrationWarning",
            "style"
          ];
          reservedProps.forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
          });
          [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
            var name = _ref[0], attributeName = _ref[1];
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
          });
          ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
          });
          [
            "allowFullScreen",
            "async",
            "autoFocus",
            "autoPlay",
            "controls",
            "default",
            "defer",
            "disabled",
            "disablePictureInPicture",
            "disableRemotePlayback",
            "formNoValidate",
            "hidden",
            "loop",
            "noModule",
            "noValidate",
            "open",
            "playsInline",
            "readOnly",
            "required",
            "reversed",
            "scoped",
            "seamless",
            "itemScope"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
          });
          [
            "checked",
            "multiple",
            "muted",
            "selected"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
          });
          [
            "capture",
            "download"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
          });
          [
            "cols",
            "rows",
            "size",
            "span"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
          });
          ["rowSpan", "start"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
          });
          var CAMELIZE = /[\-\:]([a-z])/g;
          var capitalize = function(token) {
            return token[1].toUpperCase();
          };
          [
            "accent-height",
            "alignment-baseline",
            "arabic-form",
            "baseline-shift",
            "cap-height",
            "clip-path",
            "clip-rule",
            "color-interpolation",
            "color-interpolation-filters",
            "color-profile",
            "color-rendering",
            "dominant-baseline",
            "enable-background",
            "fill-opacity",
            "fill-rule",
            "flood-color",
            "flood-opacity",
            "font-family",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-variant",
            "font-weight",
            "glyph-name",
            "glyph-orientation-horizontal",
            "glyph-orientation-vertical",
            "horiz-adv-x",
            "horiz-origin-x",
            "image-rendering",
            "letter-spacing",
            "lighting-color",
            "marker-end",
            "marker-mid",
            "marker-start",
            "overline-position",
            "overline-thickness",
            "paint-order",
            "panose-1",
            "pointer-events",
            "rendering-intent",
            "shape-rendering",
            "stop-color",
            "stop-opacity",
            "strikethrough-position",
            "strikethrough-thickness",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke-width",
            "text-anchor",
            "text-decoration",
            "text-rendering",
            "underline-position",
            "underline-thickness",
            "unicode-bidi",
            "unicode-range",
            "units-per-em",
            "v-alphabetic",
            "v-hanging",
            "v-ideographic",
            "v-mathematical",
            "vector-effect",
            "vert-adv-y",
            "vert-origin-x",
            "vert-origin-y",
            "word-spacing",
            "writing-mode",
            "xmlns:xlink",
            "x-height"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          [
            "xlink:actuate",
            "xlink:arcrole",
            "xlink:role",
            "xlink:show",
            "xlink:title",
            "xlink:type"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
          });
          [
            "xml:base",
            "xml:lang",
            "xml:space"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
          });
          ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
          });
          var xlinkHref = "xlinkHref";
          properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
          ["src", "href", "action", "formAction"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
          });
          var isUnitlessNumber = {
            animationIterationCount: true,
            aspectRatio: true,
            borderImageOutset: true,
            borderImageSlice: true,
            borderImageWidth: true,
            boxFlex: true,
            boxFlexGroup: true,
            boxOrdinalGroup: true,
            columnCount: true,
            columns: true,
            flex: true,
            flexGrow: true,
            flexPositive: true,
            flexShrink: true,
            flexNegative: true,
            flexOrder: true,
            gridArea: true,
            gridRow: true,
            gridRowEnd: true,
            gridRowSpan: true,
            gridRowStart: true,
            gridColumn: true,
            gridColumnEnd: true,
            gridColumnSpan: true,
            gridColumnStart: true,
            fontWeight: true,
            lineClamp: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            tabSize: true,
            widows: true,
            zIndex: true,
            zoom: true,
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeDasharray: true,
            strokeDashoffset: true,
            strokeMiterlimit: true,
            strokeOpacity: true,
            strokeWidth: true
          };
          function prefixKey(prefix2, key) {
            return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
          }
          var prefixes = ["Webkit", "ms", "Moz", "O"];
          Object.keys(isUnitlessNumber).forEach(function(prop) {
            prefixes.forEach(function(prefix2) {
              isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
            });
          });
          var hasReadOnlyValue = {
            button: true,
            checkbox: true,
            image: true,
            hidden: true,
            radio: true,
            reset: true,
            submit: true
          };
          function checkControlledValueProps(tagName, props) {
            {
              if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
                error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
              }
              if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
                error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
              }
            }
          }
          function isCustomComponent(tagName, props) {
            if (tagName.indexOf("-") === -1) {
              return typeof props.is === "string";
            }
            switch (tagName) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return false;
              default:
                return true;
            }
          }
          var ariaProperties = {
            "aria-current": 0,
            "aria-description": 0,
            "aria-details": 0,
            "aria-disabled": 0,
            "aria-hidden": 0,
            "aria-invalid": 0,
            "aria-keyshortcuts": 0,
            "aria-label": 0,
            "aria-roledescription": 0,
            "aria-autocomplete": 0,
            "aria-checked": 0,
            "aria-expanded": 0,
            "aria-haspopup": 0,
            "aria-level": 0,
            "aria-modal": 0,
            "aria-multiline": 0,
            "aria-multiselectable": 0,
            "aria-orientation": 0,
            "aria-placeholder": 0,
            "aria-pressed": 0,
            "aria-readonly": 0,
            "aria-required": 0,
            "aria-selected": 0,
            "aria-sort": 0,
            "aria-valuemax": 0,
            "aria-valuemin": 0,
            "aria-valuenow": 0,
            "aria-valuetext": 0,
            "aria-atomic": 0,
            "aria-busy": 0,
            "aria-live": 0,
            "aria-relevant": 0,
            "aria-dropeffect": 0,
            "aria-grabbed": 0,
            "aria-activedescendant": 0,
            "aria-colcount": 0,
            "aria-colindex": 0,
            "aria-colspan": 0,
            "aria-controls": 0,
            "aria-describedby": 0,
            "aria-errormessage": 0,
            "aria-flowto": 0,
            "aria-labelledby": 0,
            "aria-owns": 0,
            "aria-posinset": 0,
            "aria-rowcount": 0,
            "aria-rowindex": 0,
            "aria-rowspan": 0,
            "aria-setsize": 0
          };
          var warnedProperties = {};
          var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          function validateProperty(tagName, name) {
            {
              if (hasOwnProperty2.call(warnedProperties, name) && warnedProperties[name]) {
                return true;
              }
              if (rARIACamel.test(name)) {
                var ariaName = "aria-" + name.slice(4).toLowerCase();
                var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
                if (correctName == null) {
                  error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                  warnedProperties[name] = true;
                  return true;
                }
                if (name !== correctName) {
                  error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
              if (rARIA.test(name)) {
                var lowerCasedName = name.toLowerCase();
                var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
                if (standardName == null) {
                  warnedProperties[name] = true;
                  return false;
                }
                if (name !== standardName) {
                  error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
            }
            return true;
          }
          function warnInvalidARIAProps(type, props) {
            {
              var invalidProps = [];
              for (var key in props) {
                var isValid = validateProperty(type, key);
                if (!isValid) {
                  invalidProps.push(key);
                }
              }
              var unknownPropString = invalidProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (invalidProps.length === 1) {
                error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              } else if (invalidProps.length > 1) {
                error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              }
            }
          }
          function validateProperties(type, props) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnInvalidARIAProps(type, props);
          }
          var didWarnValueNull = false;
          function validateProperties$1(type, props) {
            {
              if (type !== "input" && type !== "textarea" && type !== "select") {
                return;
              }
              if (props != null && props.value === null && !didWarnValueNull) {
                didWarnValueNull = true;
                if (type === "select" && props.multiple) {
                  error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
                } else {
                  error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
                }
              }
            }
          }
          var possibleStandardNames = {
            accept: "accept",
            acceptcharset: "acceptCharset",
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            action: "action",
            allowfullscreen: "allowFullScreen",
            alt: "alt",
            as: "as",
            async: "async",
            autocapitalize: "autoCapitalize",
            autocomplete: "autoComplete",
            autocorrect: "autoCorrect",
            autofocus: "autoFocus",
            autoplay: "autoPlay",
            autosave: "autoSave",
            capture: "capture",
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            challenge: "challenge",
            charset: "charSet",
            checked: "checked",
            children: "children",
            cite: "cite",
            class: "className",
            classid: "classID",
            classname: "className",
            cols: "cols",
            colspan: "colSpan",
            content: "content",
            contenteditable: "contentEditable",
            contextmenu: "contextMenu",
            controls: "controls",
            controlslist: "controlsList",
            coords: "coords",
            crossorigin: "crossOrigin",
            dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
            data: "data",
            datetime: "dateTime",
            default: "default",
            defaultchecked: "defaultChecked",
            defaultvalue: "defaultValue",
            defer: "defer",
            dir: "dir",
            disabled: "disabled",
            disablepictureinpicture: "disablePictureInPicture",
            disableremoteplayback: "disableRemotePlayback",
            download: "download",
            draggable: "draggable",
            enctype: "encType",
            enterkeyhint: "enterKeyHint",
            for: "htmlFor",
            form: "form",
            formmethod: "formMethod",
            formaction: "formAction",
            formenctype: "formEncType",
            formnovalidate: "formNoValidate",
            formtarget: "formTarget",
            frameborder: "frameBorder",
            headers: "headers",
            height: "height",
            hidden: "hidden",
            high: "high",
            href: "href",
            hreflang: "hrefLang",
            htmlfor: "htmlFor",
            httpequiv: "httpEquiv",
            "http-equiv": "httpEquiv",
            icon: "icon",
            id: "id",
            imagesizes: "imageSizes",
            imagesrcset: "imageSrcSet",
            innerhtml: "innerHTML",
            inputmode: "inputMode",
            integrity: "integrity",
            is: "is",
            itemid: "itemID",
            itemprop: "itemProp",
            itemref: "itemRef",
            itemscope: "itemScope",
            itemtype: "itemType",
            keyparams: "keyParams",
            keytype: "keyType",
            kind: "kind",
            label: "label",
            lang: "lang",
            list: "list",
            loop: "loop",
            low: "low",
            manifest: "manifest",
            marginwidth: "marginWidth",
            marginheight: "marginHeight",
            max: "max",
            maxlength: "maxLength",
            media: "media",
            mediagroup: "mediaGroup",
            method: "method",
            min: "min",
            minlength: "minLength",
            multiple: "multiple",
            muted: "muted",
            name: "name",
            nomodule: "noModule",
            nonce: "nonce",
            novalidate: "noValidate",
            open: "open",
            optimum: "optimum",
            pattern: "pattern",
            placeholder: "placeholder",
            playsinline: "playsInline",
            poster: "poster",
            preload: "preload",
            profile: "profile",
            radiogroup: "radioGroup",
            readonly: "readOnly",
            referrerpolicy: "referrerPolicy",
            rel: "rel",
            required: "required",
            reversed: "reversed",
            role: "role",
            rows: "rows",
            rowspan: "rowSpan",
            sandbox: "sandbox",
            scope: "scope",
            scoped: "scoped",
            scrolling: "scrolling",
            seamless: "seamless",
            selected: "selected",
            shape: "shape",
            size: "size",
            sizes: "sizes",
            span: "span",
            spellcheck: "spellCheck",
            src: "src",
            srcdoc: "srcDoc",
            srclang: "srcLang",
            srcset: "srcSet",
            start: "start",
            step: "step",
            style: "style",
            summary: "summary",
            tabindex: "tabIndex",
            target: "target",
            title: "title",
            type: "type",
            usemap: "useMap",
            value: "value",
            width: "width",
            wmode: "wmode",
            wrap: "wrap",
            about: "about",
            accentheight: "accentHeight",
            "accent-height": "accentHeight",
            accumulate: "accumulate",
            additive: "additive",
            alignmentbaseline: "alignmentBaseline",
            "alignment-baseline": "alignmentBaseline",
            allowreorder: "allowReorder",
            alphabetic: "alphabetic",
            amplitude: "amplitude",
            arabicform: "arabicForm",
            "arabic-form": "arabicForm",
            ascent: "ascent",
            attributename: "attributeName",
            attributetype: "attributeType",
            autoreverse: "autoReverse",
            azimuth: "azimuth",
            basefrequency: "baseFrequency",
            baselineshift: "baselineShift",
            "baseline-shift": "baselineShift",
            baseprofile: "baseProfile",
            bbox: "bbox",
            begin: "begin",
            bias: "bias",
            by: "by",
            calcmode: "calcMode",
            capheight: "capHeight",
            "cap-height": "capHeight",
            clip: "clip",
            clippath: "clipPath",
            "clip-path": "clipPath",
            clippathunits: "clipPathUnits",
            cliprule: "clipRule",
            "clip-rule": "clipRule",
            color: "color",
            colorinterpolation: "colorInterpolation",
            "color-interpolation": "colorInterpolation",
            colorinterpolationfilters: "colorInterpolationFilters",
            "color-interpolation-filters": "colorInterpolationFilters",
            colorprofile: "colorProfile",
            "color-profile": "colorProfile",
            colorrendering: "colorRendering",
            "color-rendering": "colorRendering",
            contentscripttype: "contentScriptType",
            contentstyletype: "contentStyleType",
            cursor: "cursor",
            cx: "cx",
            cy: "cy",
            d: "d",
            datatype: "datatype",
            decelerate: "decelerate",
            descent: "descent",
            diffuseconstant: "diffuseConstant",
            direction: "direction",
            display: "display",
            divisor: "divisor",
            dominantbaseline: "dominantBaseline",
            "dominant-baseline": "dominantBaseline",
            dur: "dur",
            dx: "dx",
            dy: "dy",
            edgemode: "edgeMode",
            elevation: "elevation",
            enablebackground: "enableBackground",
            "enable-background": "enableBackground",
            end: "end",
            exponent: "exponent",
            externalresourcesrequired: "externalResourcesRequired",
            fill: "fill",
            fillopacity: "fillOpacity",
            "fill-opacity": "fillOpacity",
            fillrule: "fillRule",
            "fill-rule": "fillRule",
            filter: "filter",
            filterres: "filterRes",
            filterunits: "filterUnits",
            floodopacity: "floodOpacity",
            "flood-opacity": "floodOpacity",
            floodcolor: "floodColor",
            "flood-color": "floodColor",
            focusable: "focusable",
            fontfamily: "fontFamily",
            "font-family": "fontFamily",
            fontsize: "fontSize",
            "font-size": "fontSize",
            fontsizeadjust: "fontSizeAdjust",
            "font-size-adjust": "fontSizeAdjust",
            fontstretch: "fontStretch",
            "font-stretch": "fontStretch",
            fontstyle: "fontStyle",
            "font-style": "fontStyle",
            fontvariant: "fontVariant",
            "font-variant": "fontVariant",
            fontweight: "fontWeight",
            "font-weight": "fontWeight",
            format: "format",
            from: "from",
            fx: "fx",
            fy: "fy",
            g1: "g1",
            g2: "g2",
            glyphname: "glyphName",
            "glyph-name": "glyphName",
            glyphorientationhorizontal: "glyphOrientationHorizontal",
            "glyph-orientation-horizontal": "glyphOrientationHorizontal",
            glyphorientationvertical: "glyphOrientationVertical",
            "glyph-orientation-vertical": "glyphOrientationVertical",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            hanging: "hanging",
            horizadvx: "horizAdvX",
            "horiz-adv-x": "horizAdvX",
            horizoriginx: "horizOriginX",
            "horiz-origin-x": "horizOriginX",
            ideographic: "ideographic",
            imagerendering: "imageRendering",
            "image-rendering": "imageRendering",
            in2: "in2",
            in: "in",
            inlist: "inlist",
            intercept: "intercept",
            k1: "k1",
            k2: "k2",
            k3: "k3",
            k4: "k4",
            k: "k",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            kerning: "kerning",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            letterspacing: "letterSpacing",
            "letter-spacing": "letterSpacing",
            lightingcolor: "lightingColor",
            "lighting-color": "lightingColor",
            limitingconeangle: "limitingConeAngle",
            local: "local",
            markerend: "markerEnd",
            "marker-end": "markerEnd",
            markerheight: "markerHeight",
            markermid: "markerMid",
            "marker-mid": "markerMid",
            markerstart: "markerStart",
            "marker-start": "markerStart",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            mask: "mask",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            mathematical: "mathematical",
            mode: "mode",
            numoctaves: "numOctaves",
            offset: "offset",
            opacity: "opacity",
            operator: "operator",
            order: "order",
            orient: "orient",
            orientation: "orientation",
            origin: "origin",
            overflow: "overflow",
            overlineposition: "overlinePosition",
            "overline-position": "overlinePosition",
            overlinethickness: "overlineThickness",
            "overline-thickness": "overlineThickness",
            paintorder: "paintOrder",
            "paint-order": "paintOrder",
            panose1: "panose1",
            "panose-1": "panose1",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointerevents: "pointerEvents",
            "pointer-events": "pointerEvents",
            points: "points",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            prefix: "prefix",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            property: "property",
            r: "r",
            radius: "radius",
            refx: "refX",
            refy: "refY",
            renderingintent: "renderingIntent",
            "rendering-intent": "renderingIntent",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            resource: "resource",
            restart: "restart",
            result: "result",
            results: "results",
            rotate: "rotate",
            rx: "rx",
            ry: "ry",
            scale: "scale",
            security: "security",
            seed: "seed",
            shaperendering: "shapeRendering",
            "shape-rendering": "shapeRendering",
            slope: "slope",
            spacing: "spacing",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            speed: "speed",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stemh: "stemh",
            stemv: "stemv",
            stitchtiles: "stitchTiles",
            stopcolor: "stopColor",
            "stop-color": "stopColor",
            stopopacity: "stopOpacity",
            "stop-opacity": "stopOpacity",
            strikethroughposition: "strikethroughPosition",
            "strikethrough-position": "strikethroughPosition",
            strikethroughthickness: "strikethroughThickness",
            "strikethrough-thickness": "strikethroughThickness",
            string: "string",
            stroke: "stroke",
            strokedasharray: "strokeDasharray",
            "stroke-dasharray": "strokeDasharray",
            strokedashoffset: "strokeDashoffset",
            "stroke-dashoffset": "strokeDashoffset",
            strokelinecap: "strokeLinecap",
            "stroke-linecap": "strokeLinecap",
            strokelinejoin: "strokeLinejoin",
            "stroke-linejoin": "strokeLinejoin",
            strokemiterlimit: "strokeMiterlimit",
            "stroke-miterlimit": "strokeMiterlimit",
            strokewidth: "strokeWidth",
            "stroke-width": "strokeWidth",
            strokeopacity: "strokeOpacity",
            "stroke-opacity": "strokeOpacity",
            suppresscontenteditablewarning: "suppressContentEditableWarning",
            suppresshydrationwarning: "suppressHydrationWarning",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textanchor: "textAnchor",
            "text-anchor": "textAnchor",
            textdecoration: "textDecoration",
            "text-decoration": "textDecoration",
            textlength: "textLength",
            textrendering: "textRendering",
            "text-rendering": "textRendering",
            to: "to",
            transform: "transform",
            typeof: "typeof",
            u1: "u1",
            u2: "u2",
            underlineposition: "underlinePosition",
            "underline-position": "underlinePosition",
            underlinethickness: "underlineThickness",
            "underline-thickness": "underlineThickness",
            unicode: "unicode",
            unicodebidi: "unicodeBidi",
            "unicode-bidi": "unicodeBidi",
            unicoderange: "unicodeRange",
            "unicode-range": "unicodeRange",
            unitsperem: "unitsPerEm",
            "units-per-em": "unitsPerEm",
            unselectable: "unselectable",
            valphabetic: "vAlphabetic",
            "v-alphabetic": "vAlphabetic",
            values: "values",
            vectoreffect: "vectorEffect",
            "vector-effect": "vectorEffect",
            version: "version",
            vertadvy: "vertAdvY",
            "vert-adv-y": "vertAdvY",
            vertoriginx: "vertOriginX",
            "vert-origin-x": "vertOriginX",
            vertoriginy: "vertOriginY",
            "vert-origin-y": "vertOriginY",
            vhanging: "vHanging",
            "v-hanging": "vHanging",
            videographic: "vIdeographic",
            "v-ideographic": "vIdeographic",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            visibility: "visibility",
            vmathematical: "vMathematical",
            "v-mathematical": "vMathematical",
            vocab: "vocab",
            widths: "widths",
            wordspacing: "wordSpacing",
            "word-spacing": "wordSpacing",
            writingmode: "writingMode",
            "writing-mode": "writingMode",
            x1: "x1",
            x2: "x2",
            x: "x",
            xchannelselector: "xChannelSelector",
            xheight: "xHeight",
            "x-height": "xHeight",
            xlinkactuate: "xlinkActuate",
            "xlink:actuate": "xlinkActuate",
            xlinkarcrole: "xlinkArcrole",
            "xlink:arcrole": "xlinkArcrole",
            xlinkhref: "xlinkHref",
            "xlink:href": "xlinkHref",
            xlinkrole: "xlinkRole",
            "xlink:role": "xlinkRole",
            xlinkshow: "xlinkShow",
            "xlink:show": "xlinkShow",
            xlinktitle: "xlinkTitle",
            "xlink:title": "xlinkTitle",
            xlinktype: "xlinkType",
            "xlink:type": "xlinkType",
            xmlbase: "xmlBase",
            "xml:base": "xmlBase",
            xmllang: "xmlLang",
            "xml:lang": "xmlLang",
            xmlns: "xmlns",
            "xml:space": "xmlSpace",
            xmlnsxlink: "xmlnsXlink",
            "xmlns:xlink": "xmlnsXlink",
            xmlspace: "xmlSpace",
            y1: "y1",
            y2: "y2",
            y: "y",
            ychannelselector: "yChannelSelector",
            z: "z",
            zoomandpan: "zoomAndPan"
          };
          var validateProperty$1 = function() {
          };
          {
            var warnedProperties$1 = {};
            var EVENT_NAME_REGEX = /^on./;
            var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
            var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
            var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
            validateProperty$1 = function(tagName, name, value, eventRegistry) {
              if (hasOwnProperty2.call(warnedProperties$1, name) && warnedProperties$1[name]) {
                return true;
              }
              var lowerCasedName = name.toLowerCase();
              if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
                error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (eventRegistry != null) {
                var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
                if (registrationNameDependencies.hasOwnProperty(name)) {
                  return true;
                }
                var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
                if (registrationName != null) {
                  error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                  warnedProperties$1[name] = true;
                  return true;
                }
                if (EVENT_NAME_REGEX.test(name)) {
                  error("Unknown event handler property `%s`. It will be ignored.", name);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (EVENT_NAME_REGEX.test(name)) {
                if (INVALID_EVENT_NAME_REGEX.test(name)) {
                  error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
                return true;
              }
              if (lowerCasedName === "innerhtml") {
                error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "aria") {
                error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
                error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "number" && isNaN(value)) {
                error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
                warnedProperties$1[name] = true;
                return true;
              }
              var propertyInfo = getPropertyInfo(name);
              var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
              if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
                var standardName = possibleStandardNames[lowerCasedName];
                if (standardName !== name) {
                  error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (!isReserved && name !== lowerCasedName) {
                error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                if (value) {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
                } else {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (isReserved) {
                return true;
              }
              if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                warnedProperties$1[name] = true;
                return false;
              }
              if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
                error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
                warnedProperties$1[name] = true;
                return true;
              }
              return true;
            };
          }
          var warnUnknownProperties = function(type, props, eventRegistry) {
            {
              var unknownProps = [];
              for (var key in props) {
                var isValid = validateProperty$1(type, key, props[key], eventRegistry);
                if (!isValid) {
                  unknownProps.push(key);
                }
              }
              var unknownPropString = unknownProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (unknownProps.length === 1) {
                error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              } else if (unknownProps.length > 1) {
                error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              }
            }
          };
          function validateProperties$2(type, props, eventRegistry) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnUnknownProperties(type, props, eventRegistry);
          }
          var warnValidStyle = function() {
          };
          {
            var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
            var msPattern = /^-ms-/;
            var hyphenPattern = /-(.)/g;
            var badStyleValueWithSemicolonPattern = /;\s*$/;
            var warnedStyleNames = {};
            var warnedStyleValues = {};
            var warnedForNaNValue = false;
            var warnedForInfinityValue = false;
            var camelize = function(string3) {
              return string3.replace(hyphenPattern, function(_, character) {
                return character.toUpperCase();
              });
            };
            var warnHyphenatedStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported style property %s. Did you mean %s?", name, camelize(name.replace(msPattern, "ms-")));
            };
            var warnBadVendoredStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
            };
            var warnStyleValueWithSemicolon = function(name, value) {
              if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
                return;
              }
              warnedStyleValues[value] = true;
              error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
            };
            var warnStyleValueIsNaN = function(name, value) {
              if (warnedForNaNValue) {
                return;
              }
              warnedForNaNValue = true;
              error("`NaN` is an invalid value for the `%s` css style property.", name);
            };
            var warnStyleValueIsInfinity = function(name, value) {
              if (warnedForInfinityValue) {
                return;
              }
              warnedForInfinityValue = true;
              error("`Infinity` is an invalid value for the `%s` css style property.", name);
            };
            warnValidStyle = function(name, value) {
              if (name.indexOf("-") > -1) {
                warnHyphenatedStyleName(name);
              } else if (badVendoredStyleNamePattern.test(name)) {
                warnBadVendoredStyleName(name);
              } else if (badStyleValueWithSemicolonPattern.test(value)) {
                warnStyleValueWithSemicolon(name, value);
              }
              if (typeof value === "number") {
                if (isNaN(value)) {
                  warnStyleValueIsNaN(name, value);
                } else if (!isFinite(value)) {
                  warnStyleValueIsInfinity(name, value);
                }
              }
            };
          }
          var warnValidStyle$1 = warnValidStyle;
          var matchHtmlRegExp = /["'&<>]/;
          function escapeHtml(string3) {
            {
              checkHtmlStringCoercion(string3);
            }
            var str = "" + string3;
            var match = matchHtmlRegExp.exec(str);
            if (!match) {
              return str;
            }
            var escape;
            var html4 = "";
            var index2;
            var lastIndex = 0;
            for (index2 = match.index; index2 < str.length; index2++) {
              switch (str.charCodeAt(index2)) {
                case 34:
                  escape = "&quot;";
                  break;
                case 38:
                  escape = "&amp;";
                  break;
                case 39:
                  escape = "&#x27;";
                  break;
                case 60:
                  escape = "&lt;";
                  break;
                case 62:
                  escape = "&gt;";
                  break;
                default:
                  continue;
              }
              if (lastIndex !== index2) {
                html4 += str.substring(lastIndex, index2);
              }
              lastIndex = index2 + 1;
              html4 += escape;
            }
            return lastIndex !== index2 ? html4 + str.substring(lastIndex, index2) : html4;
          }
          function escapeTextForBrowser(text4) {
            if (typeof text4 === "boolean" || typeof text4 === "number") {
              return "" + text4;
            }
            return escapeHtml(text4);
          }
          var uppercasePattern = /([A-Z])/g;
          var msPattern$1 = /^ms-/;
          function hyphenateStyleName(name) {
            return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
          }
          var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
          var didWarn = false;
          function sanitizeURL(url) {
            {
              if (!didWarn && isJavaScriptProtocol.test(url)) {
                didWarn = true;
                error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
              }
            }
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          var startInlineScript = stringToPrecomputedChunk("<script>");
          var endInlineScript = stringToPrecomputedChunk("<\/script>");
          var startScriptSrc = stringToPrecomputedChunk('<script src="');
          var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
          var endAsyncScript = stringToPrecomputedChunk('" async=""><\/script>');
          function escapeBootstrapScriptContent(scriptText) {
            {
              checkHtmlStringCoercion(scriptText);
            }
            return ("" + scriptText).replace(scriptRegex, scriptReplacer);
          }
          var scriptRegex = /(<\/|<)(s)(cript)/gi;
          var scriptReplacer = function(match, prefix2, s, suffix) {
            return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
          };
          function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
            var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix;
            var inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
            var bootstrapChunks = [];
            if (bootstrapScriptContent !== void 0) {
              bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript);
            }
            if (bootstrapScripts !== void 0) {
              for (var i = 0; i < bootstrapScripts.length; i++) {
                bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
              }
            }
            if (bootstrapModules !== void 0) {
              for (var _i = 0; _i < bootstrapModules.length; _i++) {
                bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
              }
            }
            return {
              bootstrapChunks,
              startInlineScript: inlineScriptWithNonce,
              placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
              segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
              boundaryPrefix: idPrefix + "B:",
              idPrefix,
              nextSuspenseID: 0,
              sentCompleteSegmentFunction: false,
              sentCompleteBoundaryFunction: false,
              sentClientRenderFunction: false
            };
          }
          var ROOT_HTML_MODE = 0;
          var HTML_MODE = 1;
          var SVG_MODE = 2;
          var MATHML_MODE = 3;
          var HTML_TABLE_MODE = 4;
          var HTML_TABLE_BODY_MODE = 5;
          var HTML_TABLE_ROW_MODE = 6;
          var HTML_COLGROUP_MODE = 7;
          function createFormatContext(insertionMode, selectedValue) {
            return {
              insertionMode,
              selectedValue
            };
          }
          function createRootFormatContext(namespaceURI) {
            var insertionMode = namespaceURI === "http://www.w3.org/2000/svg" ? SVG_MODE : namespaceURI === "http://www.w3.org/1998/Math/MathML" ? MATHML_MODE : ROOT_HTML_MODE;
            return createFormatContext(insertionMode, null);
          }
          function getChildFormatContext(parentContext, type, props) {
            switch (type) {
              case "select":
                return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
              case "svg":
                return createFormatContext(SVG_MODE, null);
              case "math":
                return createFormatContext(MATHML_MODE, null);
              case "foreignObject":
                return createFormatContext(HTML_MODE, null);
              case "table":
                return createFormatContext(HTML_TABLE_MODE, null);
              case "thead":
              case "tbody":
              case "tfoot":
                return createFormatContext(HTML_TABLE_BODY_MODE, null);
              case "colgroup":
                return createFormatContext(HTML_COLGROUP_MODE, null);
              case "tr":
                return createFormatContext(HTML_TABLE_ROW_MODE, null);
            }
            if (parentContext.insertionMode >= HTML_TABLE_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            if (parentContext.insertionMode === ROOT_HTML_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            return parentContext;
          }
          var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
          function assignSuspenseBoundaryID(responseState) {
            var generatedID = responseState.nextSuspenseID++;
            return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
          }
          function makeId(responseState, treeId, localId) {
            var idPrefix = responseState.idPrefix;
            var id = ":" + idPrefix + "R" + treeId;
            if (localId > 0) {
              id += "H" + localId.toString(32);
            }
            return id + ":";
          }
          function encodeHTMLTextNode(text4) {
            return escapeTextForBrowser(text4);
          }
          var textSeparator = stringToPrecomputedChunk("<!-- -->");
          function pushTextInstance(target, text4, responseState) {
            if (text4 === "") {
              return;
            }
            target.push(stringToChunk(encodeHTMLTextNode(text4)), textSeparator);
          }
          var styleNameCache = new Map();
          function processStyleName(styleName) {
            var chunk = styleNameCache.get(styleName);
            if (chunk !== void 0) {
              return chunk;
            }
            var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
            styleNameCache.set(styleName, result);
            return result;
          }
          var styleAttributeStart = stringToPrecomputedChunk(' style="');
          var styleAssign = stringToPrecomputedChunk(":");
          var styleSeparator = stringToPrecomputedChunk(";");
          function pushStyle(target, responseState, style2) {
            if (typeof style2 !== "object") {
              throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
            }
            var isFirst = true;
            for (var styleName in style2) {
              if (!hasOwnProperty2.call(style2, styleName)) {
                continue;
              }
              var styleValue = style2[styleName];
              if (styleValue == null || typeof styleValue === "boolean" || styleValue === "") {
                continue;
              }
              var nameChunk = void 0;
              var valueChunk = void 0;
              var isCustomProperty = styleName.indexOf("--") === 0;
              if (isCustomProperty) {
                nameChunk = stringToChunk(escapeTextForBrowser(styleName));
                {
                  checkCSSPropertyStringCoercion(styleValue, styleName);
                }
                valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
              } else {
                {
                  warnValidStyle$1(styleName, styleValue);
                }
                nameChunk = processStyleName(styleName);
                if (typeof styleValue === "number") {
                  if (styleValue !== 0 && !hasOwnProperty2.call(isUnitlessNumber, styleName)) {
                    valueChunk = stringToChunk(styleValue + "px");
                  } else {
                    valueChunk = stringToChunk("" + styleValue);
                  }
                } else {
                  {
                    checkCSSPropertyStringCoercion(styleValue, styleName);
                  }
                  valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
                }
              }
              if (isFirst) {
                isFirst = false;
                target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
              } else {
                target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
              }
            }
            if (!isFirst) {
              target.push(attributeEnd);
            }
          }
          var attributeSeparator = stringToPrecomputedChunk(" ");
          var attributeAssign = stringToPrecomputedChunk('="');
          var attributeEnd = stringToPrecomputedChunk('"');
          var attributeEmptyString = stringToPrecomputedChunk('=""');
          function pushAttribute(target, responseState, name, value) {
            switch (name) {
              case "style": {
                pushStyle(target, responseState, value);
                return;
              }
              case "defaultValue":
              case "defaultChecked":
              case "innerHTML":
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                return;
            }
            if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
              return;
            }
            var propertyInfo = getPropertyInfo(name);
            if (propertyInfo !== null) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  if (!propertyInfo.acceptsBooleans) {
                    return;
                  }
                }
              }
              var attributeName = propertyInfo.attributeName;
              var attributeNameChunk = stringToChunk(attributeName);
              switch (propertyInfo.type) {
                case BOOLEAN:
                  if (value) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  }
                  return;
                case OVERLOADED_BOOLEAN:
                  if (value === true) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  } else if (value === false)
                    ;
                  else {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  return;
                case NUMERIC:
                  if (!isNaN(value)) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                case POSITIVE_NUMERIC:
                  if (!isNaN(value) && value >= 1) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                default:
                  if (propertyInfo.sanitizeURL) {
                    {
                      checkAttributeStringCoercion(value, attributeName);
                    }
                    value = "" + value;
                    sanitizeURL(value);
                  }
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
              }
            } else if (isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  if (prefix2 !== "data-" && prefix2 !== "aria-") {
                    return;
                  }
                }
              }
              target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          }
          var endOfStartTag = stringToPrecomputedChunk(">");
          var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
          function pushInnerHTML(target, innerHTML, children) {
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html4 = innerHTML.__html;
              if (html4 !== null && html4 !== void 0) {
                {
                  checkHtmlStringCoercion(html4);
                }
                target.push(stringToChunk("" + html4));
              }
            }
          }
          var didWarnDefaultInputValue = false;
          var didWarnDefaultChecked = false;
          var didWarnDefaultSelectValue = false;
          var didWarnDefaultTextareaValue = false;
          var didWarnInvalidOptionChildren = false;
          var didWarnInvalidOptionInnerHTML = false;
          var didWarnSelectedSetOnOption = false;
          function checkSelectProp(props, propName) {
            {
              var value = props[propName];
              if (value != null) {
                var array = isArray(value);
                if (props.multiple && !array) {
                  error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                } else if (!props.multiple && array) {
                  error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                }
              }
            }
          }
          function pushStartSelect(target, props, responseState) {
            {
              checkControlledValueProps("select", props);
              checkSelectProp(props, "value");
              checkSelectProp(props, "defaultValue");
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultSelectValue = true;
              }
            }
            target.push(startChunkForTag("select"));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function flattenOptionChildren(children) {
            var content3 = "";
            React3.Children.forEach(children, function(child) {
              if (child == null) {
                return;
              }
              content3 += child;
              {
                if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                  didWarnInvalidOptionChildren = true;
                  error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
                }
              }
            });
            return content3;
          }
          var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
          function pushStartOption(target, props, responseState, formatContext) {
            var selectedValue = formatContext.selectedValue;
            target.push(startChunkForTag("option"));
            var children = null;
            var value = null;
            var selected = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "selected":
                    selected = propValue;
                    {
                      if (!didWarnSelectedSetOnOption) {
                        error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                        didWarnSelectedSetOnOption = true;
                      }
                    }
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "value":
                    value = propValue;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (selectedValue != null) {
              var stringValue;
              if (value !== null) {
                {
                  checkAttributeStringCoercion(value, "value");
                }
                stringValue = "" + value;
              } else {
                {
                  if (innerHTML !== null) {
                    if (!didWarnInvalidOptionInnerHTML) {
                      didWarnInvalidOptionInnerHTML = true;
                      error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                    }
                  }
                }
                stringValue = flattenOptionChildren(children);
              }
              if (isArray(selectedValue)) {
                for (var i = 0; i < selectedValue.length; i++) {
                  {
                    checkAttributeStringCoercion(selectedValue[i], "value");
                  }
                  var v = "" + selectedValue[i];
                  if (v === stringValue) {
                    target.push(selectedMarkerAttribute);
                    break;
                  }
                }
              } else {
                {
                  checkAttributeStringCoercion(selectedValue, "select.value");
                }
                if ("" + selectedValue === stringValue) {
                  target.push(selectedMarkerAttribute);
                }
              }
            } else if (selected) {
              target.push(selectedMarkerAttribute);
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function pushInput(target, props, responseState) {
            {
              checkControlledValueProps("input", props);
              if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultChecked = true;
              }
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultInputValue = true;
              }
            }
            target.push(startChunkForTag("input"));
            var value = null;
            var defaultValue = null;
            var checked = null;
            var defaultChecked = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  case "defaultChecked":
                    defaultChecked = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "checked":
                    checked = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (checked !== null) {
              pushAttribute(target, responseState, "checked", checked);
            } else if (defaultChecked !== null) {
              pushAttribute(target, responseState, "checked", defaultChecked);
            }
            if (value !== null) {
              pushAttribute(target, responseState, "value", value);
            } else if (defaultValue !== null) {
              pushAttribute(target, responseState, "value", defaultValue);
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartTextArea(target, props, responseState) {
            {
              checkControlledValueProps("textarea", props);
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultTextareaValue = true;
              }
            }
            target.push(startChunkForTag("textarea"));
            var value = null;
            var defaultValue = null;
            var children = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (value === null && defaultValue !== null) {
              value = defaultValue;
            }
            target.push(endOfStartTag);
            if (children != null) {
              {
                error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
              }
              if (value != null) {
                throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
              }
              if (isArray(children)) {
                if (children.length > 1) {
                  throw new Error("<textarea> can only have at most one child.");
                }
                {
                  checkHtmlStringCoercion(children[0]);
                }
                value = "" + children[0];
              }
              {
                checkHtmlStringCoercion(children);
              }
              value = "" + children;
            }
            if (typeof value === "string" && value[0] === "\n") {
              target.push(leadingNewline);
            }
            if (value !== null) {
              {
                checkAttributeStringCoercion(value, "value");
              }
              target.push(stringToChunk(encodeHTMLTextNode("" + value)));
            }
            return null;
          }
          function pushSelfClosing(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartMenuItem(target, props, responseState) {
            target.push(startChunkForTag("menuitem"));
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            return null;
          }
          function pushStartGenericElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            if (typeof children === "string") {
              target.push(stringToChunk(encodeHTMLTextNode(children)));
              return null;
            }
            return children;
          }
          function pushStartCustomElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "style":
                    pushStyle(target, responseState, propValue);
                    break;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                    break;
                  default:
                    if (isAttributeNameSafe(propKey) && typeof propValue !== "function" && typeof propValue !== "symbol") {
                      target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                    }
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          var leadingNewline = stringToPrecomputedChunk("\n");
          function pushStartPreformattedElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty2.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html4 = innerHTML.__html;
              if (html4 !== null && html4 !== void 0) {
                if (typeof html4 === "string" && html4.length > 0 && html4[0] === "\n") {
                  target.push(leadingNewline, stringToChunk(html4));
                } else {
                  {
                    checkHtmlStringCoercion(html4);
                  }
                  target.push(stringToChunk("" + html4));
                }
              }
            }
            if (typeof children === "string" && children[0] === "\n") {
              target.push(leadingNewline);
            }
            return children;
          }
          var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
          var validatedTagCache = new Map();
          function startChunkForTag(tag) {
            var tagStartChunk = validatedTagCache.get(tag);
            if (tagStartChunk === void 0) {
              if (!VALID_TAG_REGEX.test(tag)) {
                throw new Error("Invalid tag: " + tag);
              }
              tagStartChunk = stringToPrecomputedChunk("<" + tag);
              validatedTagCache.set(tag, tagStartChunk);
            }
            return tagStartChunk;
          }
          var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
          function pushStartInstance(target, type, props, responseState, formatContext) {
            {
              validateProperties(type, props);
              validateProperties$1(type, props);
              validateProperties$2(type, props, null);
              if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
                error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
              }
              if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
                if (type.indexOf("-") === -1 && typeof props.is !== "string" && type.toLowerCase() !== type) {
                  error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type);
                }
              }
            }
            switch (type) {
              case "select":
                return pushStartSelect(target, props, responseState);
              case "option":
                return pushStartOption(target, props, responseState, formatContext);
              case "textarea":
                return pushStartTextArea(target, props, responseState);
              case "input":
                return pushInput(target, props, responseState);
              case "menuitem":
                return pushStartMenuItem(target, props, responseState);
              case "listing":
              case "pre": {
                return pushStartPreformattedElement(target, props, type, responseState);
              }
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                return pushSelfClosing(target, props, type, responseState);
              }
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph": {
                return pushStartGenericElement(target, props, type, responseState);
              }
              case "html": {
                if (formatContext.insertionMode === ROOT_HTML_MODE) {
                  target.push(DOCTYPE);
                }
                return pushStartGenericElement(target, props, type, responseState);
              }
              default: {
                if (type.indexOf("-") === -1 && typeof props.is !== "string") {
                  return pushStartGenericElement(target, props, type, responseState);
                } else {
                  return pushStartCustomElement(target, props, type, responseState);
                }
              }
            }
          }
          var endTag1 = stringToPrecomputedChunk("</");
          var endTag2 = stringToPrecomputedChunk(">");
          function pushEndInstance(target, type, props) {
            switch (type) {
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                break;
              }
              default: {
                target.push(endTag1, stringToChunk(type), endTag2);
              }
            }
          }
          function writeCompletedRoot(destination, responseState) {
            var bootstrapChunks = responseState.bootstrapChunks;
            var i = 0;
            for (; i < bootstrapChunks.length - 1; i++) {
              writeChunk(destination, bootstrapChunks[i]);
            }
            if (i < bootstrapChunks.length) {
              return writeChunkAndReturn(destination, bootstrapChunks[i]);
            }
            return true;
          }
          var placeholder1 = stringToPrecomputedChunk('<template id="');
          var placeholder2 = stringToPrecomputedChunk('"></template>');
          function writePlaceholder(destination, responseState, id) {
            writeChunk(destination, placeholder1);
            writeChunk(destination, responseState.placeholderPrefix);
            var formattedID = stringToChunk(id.toString(16));
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, placeholder2);
          }
          var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
          var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
          var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
          var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
          var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
          function writeStartCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
          }
          function writeStartPendingSuspenseBoundary(destination, responseState, id) {
            writeChunk(destination, startPendingSuspenseBoundary1);
            if (id === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, id);
            return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
          }
          function writeStartClientRenderedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
          }
          function writeEndCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndPendingSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
          var startSegmentHTML2 = stringToPrecomputedChunk('">');
          var endSegmentHTML = stringToPrecomputedChunk("</div>");
          var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
          var startSegmentSVG2 = stringToPrecomputedChunk('">');
          var endSegmentSVG = stringToPrecomputedChunk("</svg>");
          var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
          var startSegmentMathML2 = stringToPrecomputedChunk('">');
          var endSegmentMathML = stringToPrecomputedChunk("</math>");
          var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
          var startSegmentTable2 = stringToPrecomputedChunk('">');
          var endSegmentTable = stringToPrecomputedChunk("</table>");
          var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
          var startSegmentTableBody2 = stringToPrecomputedChunk('">');
          var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
          var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
          var startSegmentTableRow2 = stringToPrecomputedChunk('">');
          var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
          var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
          var startSegmentColGroup2 = stringToPrecomputedChunk('">');
          var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
          function writeStartSegment(destination, responseState, formatContext, id) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                writeChunk(destination, startSegmentHTML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentHTML2);
              }
              case SVG_MODE: {
                writeChunk(destination, startSegmentSVG);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentSVG2);
              }
              case MATHML_MODE: {
                writeChunk(destination, startSegmentMathML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentMathML2);
              }
              case HTML_TABLE_MODE: {
                writeChunk(destination, startSegmentTable);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTable2);
              }
              case HTML_TABLE_BODY_MODE: {
                writeChunk(destination, startSegmentTableBody);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableBody2);
              }
              case HTML_TABLE_ROW_MODE: {
                writeChunk(destination, startSegmentTableRow);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableRow2);
              }
              case HTML_COLGROUP_MODE: {
                writeChunk(destination, startSegmentColGroup);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentColGroup2);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          function writeEndSegment(destination, formatContext) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                return writeChunkAndReturn(destination, endSegmentHTML);
              }
              case SVG_MODE: {
                return writeChunkAndReturn(destination, endSegmentSVG);
              }
              case MATHML_MODE: {
                return writeChunkAndReturn(destination, endSegmentMathML);
              }
              case HTML_TABLE_MODE: {
                return writeChunkAndReturn(destination, endSegmentTable);
              }
              case HTML_TABLE_BODY_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableBody);
              }
              case HTML_TABLE_ROW_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableRow);
              }
              case HTML_COLGROUP_MODE: {
                return writeChunkAndReturn(destination, endSegmentColGroup);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
          var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
          var clientRenderFunction = 'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()}';
          var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
          var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
          var completeSegmentScript2 = stringToPrecomputedChunk('","');
          var completeSegmentScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteSegmentFunction) {
              responseState.sentCompleteSegmentFunction = true;
              writeChunk(destination, completeSegmentScript1Full);
            } else {
              writeChunk(destination, completeSegmentScript1Partial);
            }
            writeChunk(destination, responseState.segmentPrefix);
            var formattedID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, formattedID);
            writeChunk(destination, completeSegmentScript2);
            writeChunk(destination, responseState.placeholderPrefix);
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, completeSegmentScript3);
          }
          var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
          var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
          var completeBoundaryScript2 = stringToPrecomputedChunk('","');
          var completeBoundaryScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteBoundaryFunction) {
              responseState.sentCompleteBoundaryFunction = true;
              writeChunk(destination, completeBoundaryScript1Full);
            } else {
              writeChunk(destination, completeBoundaryScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            var formattedContentID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, boundaryID);
            writeChunk(destination, completeBoundaryScript2);
            writeChunk(destination, responseState.segmentPrefix);
            writeChunk(destination, formattedContentID);
            return writeChunkAndReturn(destination, completeBoundaryScript3);
          }
          var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
          var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
          var clientRenderScript2 = stringToPrecomputedChunk('")<\/script>');
          function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentClientRenderFunction) {
              responseState.sentClientRenderFunction = true;
              writeChunk(destination, clientRenderScript1Full);
            } else {
              writeChunk(destination, clientRenderScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, boundaryID);
            return writeChunkAndReturn(destination, clientRenderScript2);
          }
          var assign = Object.assign;
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_SCOPE_TYPE = Symbol.for("react.scope");
          var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode");
          var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
          var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeClassComponentFrame(ctor, source, ownerFn) {
            {
              return describeNativeComponentFrame(ctor, true);
            }
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component) {
            var prototype = Component.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element2) {
            {
              if (element2) {
                var owner = element2._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element2.type, element2._source, owner ? owner.type : null);
                ReactDebugCurrentFrame.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element2) {
            {
              var has = Function.call.bind(hasOwnProperty2);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element2);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element2);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var warnedAboutMissingGetChildContext;
          {
            warnedAboutMissingGetChildContext = {};
          }
          var emptyContextObject = {};
          {
            Object.freeze(emptyContextObject);
          }
          function getMaskedContext(type, unmaskedContext) {
            {
              var contextTypes = type.contextTypes;
              if (!contextTypes) {
                return emptyContextObject;
              }
              var context = {};
              for (var key in contextTypes) {
                context[key] = unmaskedContext[key];
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(contextTypes, context, "context", name);
              }
              return context;
            }
          }
          function processChildContext(instance, type, parentContext, childContextTypes) {
            {
              if (typeof instance.getChildContext !== "function") {
                {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!warnedAboutMissingGetChildContext[componentName]) {
                    warnedAboutMissingGetChildContext[componentName] = true;
                    error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                  }
                }
                return parentContext;
              }
              var childContext = instance.getChildContext();
              for (var contextKey in childContext) {
                if (!(contextKey in childContextTypes)) {
                  throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                }
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(childContextTypes, childContext, "child context", name);
              }
              return assign({}, parentContext, childContext);
            }
          }
          var rendererSigil;
          {
            rendererSigil = {};
          }
          var rootContextSnapshot = null;
          var currentActiveSnapshot = null;
          function popNode(prev) {
            {
              prev.context._currentValue = prev.parentValue;
            }
          }
          function pushNode(next) {
            {
              next.context._currentValue = next.value;
            }
          }
          function popToNearestCommonAncestor(prev, next) {
            if (prev === next)
              ;
            else {
              popNode(prev);
              var parentPrev = prev.parent;
              var parentNext = next.parent;
              if (parentPrev === null) {
                if (parentNext !== null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
              } else {
                if (parentNext === null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
                popToNearestCommonAncestor(parentPrev, parentNext);
              }
              pushNode(next);
            }
          }
          function popAllPrevious(prev) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev !== null) {
              popAllPrevious(parentPrev);
            }
          }
          function pushAllNext(next) {
            var parentNext = next.parent;
            if (parentNext !== null) {
              pushAllNext(parentNext);
            }
            pushNode(next);
          }
          function popPreviousToCommonLevel(prev, next) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (parentPrev.depth === next.depth) {
              popToNearestCommonAncestor(parentPrev, next);
            } else {
              popPreviousToCommonLevel(parentPrev, next);
            }
          }
          function popNextToCommonLevel(prev, next) {
            var parentNext = next.parent;
            if (parentNext === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (prev.depth === parentNext.depth) {
              popToNearestCommonAncestor(prev, parentNext);
            } else {
              popNextToCommonLevel(prev, parentNext);
            }
            pushNode(next);
          }
          function switchContext(newSnapshot) {
            var prev = currentActiveSnapshot;
            var next = newSnapshot;
            if (prev !== next) {
              if (prev === null) {
                pushAllNext(next);
              } else if (next === null) {
                popAllPrevious(prev);
              } else if (prev.depth === next.depth) {
                popToNearestCommonAncestor(prev, next);
              } else if (prev.depth > next.depth) {
                popPreviousToCommonLevel(prev, next);
              } else {
                popNextToCommonLevel(prev, next);
              }
              currentActiveSnapshot = next;
            }
          }
          function pushProvider(context, nextValue) {
            var prevValue;
            {
              prevValue = context._currentValue;
              context._currentValue = nextValue;
              {
                if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer = rendererSigil;
              }
            }
            var prevNode = currentActiveSnapshot;
            var newNode = {
              parent: prevNode,
              depth: prevNode === null ? 0 : prevNode.depth + 1,
              context,
              parentValue: prevValue,
              value: nextValue
            };
            currentActiveSnapshot = newNode;
            return newNode;
          }
          function popProvider(context) {
            var prevSnapshot = currentActiveSnapshot;
            if (prevSnapshot === null) {
              throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            }
            {
              if (prevSnapshot.context !== context) {
                error("The parent context is not the expected context. This is probably a bug in React.");
              }
            }
            {
              var value = prevSnapshot.parentValue;
              if (value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
                prevSnapshot.context._currentValue = prevSnapshot.context._defaultValue;
              } else {
                prevSnapshot.context._currentValue = value;
              }
              {
                if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer = rendererSigil;
              }
            }
            return currentActiveSnapshot = prevSnapshot.parent;
          }
          function getActiveContext() {
            return currentActiveSnapshot;
          }
          function readContext(context) {
            var value = context._currentValue;
            return value;
          }
          function get(key) {
            return key._reactInternals;
          }
          function set(key, value) {
            key._reactInternals = value;
          }
          var didWarnAboutNoopUpdateForComponent = {};
          var didWarnAboutDeprecatedWillMount = {};
          var didWarnAboutUninitializedState;
          var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
          var didWarnAboutLegacyLifecyclesAndDerivedState;
          var didWarnAboutUndefinedDerivedState;
          var warnOnUndefinedDerivedState;
          var warnOnInvalidCallback;
          var didWarnAboutDirectlyAssigningPropsToState;
          var didWarnAboutContextTypeAndContextTypes;
          var didWarnAboutInvalidateContextType;
          {
            didWarnAboutUninitializedState = new Set();
            didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
            didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
            didWarnAboutDirectlyAssigningPropsToState = new Set();
            didWarnAboutUndefinedDerivedState = new Set();
            didWarnAboutContextTypeAndContextTypes = new Set();
            didWarnAboutInvalidateContextType = new Set();
            var didWarnOnInvalidCallback = new Set();
            warnOnInvalidCallback = function(callback, callerName) {
              if (callback === null || typeof callback === "function") {
                return;
              }
              var key = callerName + "_" + callback;
              if (!didWarnOnInvalidCallback.has(key)) {
                didWarnOnInvalidCallback.add(key);
                error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
              }
            };
            warnOnUndefinedDerivedState = function(type, partialState) {
              if (partialState === void 0) {
                var componentName = getComponentNameFromType(type) || "Component";
                if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                  didWarnAboutUndefinedDerivedState.add(componentName);
                  error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
                }
              }
            };
          }
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnAboutNoopUpdateForComponent[warningKey]) {
                return;
              }
              error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
              didWarnAboutNoopUpdateForComponent[warningKey] = true;
            }
          }
          var classComponentUpdater = {
            isMounted: function(inst) {
              return false;
            },
            enqueueSetState: function(inst, payload, callback) {
              var internals = get(inst);
              if (internals.queue === null) {
                warnNoop(inst, "setState");
              } else {
                internals.queue.push(payload);
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            },
            enqueueReplaceState: function(inst, payload, callback) {
              var internals = get(inst);
              internals.replace = true;
              internals.queue = [payload];
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            },
            enqueueForceUpdate: function(inst, callback) {
              var internals = get(inst);
              if (internals.queue === null) {
                warnNoop(inst, "forceUpdate");
              } else {
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            }
          };
          function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
            var partialState = getDerivedStateFromProps(nextProps, prevState);
            {
              warnOnUndefinedDerivedState(ctor, partialState);
            }
            var newState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
            return newState;
          }
          function constructClassInstance(ctor, props, maskedLegacyContext) {
            var context = emptyContextObject;
            var contextType = ctor.contextType;
            {
              if ("contextType" in ctor) {
                var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                  didWarnAboutInvalidateContextType.add(ctor);
                  var addendum = "";
                  if (contextType === void 0) {
                    addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                  } else if (typeof contextType !== "object") {
                    addendum = " However, it is set to a " + typeof contextType + ".";
                  } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                    addendum = " Did you accidentally pass the Context.Provider instead?";
                  } else if (contextType._context !== void 0) {
                    addendum = " Did you accidentally pass the Context.Consumer instead?";
                  } else {
                    addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                  }
                  error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
                }
              }
            }
            if (typeof contextType === "object" && contextType !== null) {
              context = readContext(contextType);
            } else {
              context = maskedLegacyContext;
            }
            var instance = new ctor(props, context);
            {
              if (typeof ctor.getDerivedStateFromProps === "function" && (instance.state === null || instance.state === void 0)) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutUninitializedState.has(componentName)) {
                  didWarnAboutUninitializedState.add(componentName);
                  error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
                }
              }
              if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
                var foundWillMountName = null;
                var foundWillReceivePropsName = null;
                var foundWillUpdateName = null;
                if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  foundWillMountName = "componentWillMount";
                } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                  foundWillMountName = "UNSAFE_componentWillMount";
                }
                if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                  foundWillReceivePropsName = "componentWillReceiveProps";
                } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                  foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
                }
                if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                  foundWillUpdateName = "componentWillUpdate";
                } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                  foundWillUpdateName = "UNSAFE_componentWillUpdate";
                }
                if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                  var _componentName = getComponentNameFromType(ctor) || "Component";
                  var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                  if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                    didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                    error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                  }
                }
              }
            }
            return instance;
          }
          function checkClassInstance(instance, ctor, newProps) {
            {
              var name = getComponentNameFromType(ctor) || "Component";
              var renderPresent = instance.render;
              if (!renderPresent) {
                if (ctor.prototype && typeof ctor.prototype.render === "function") {
                  error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
                } else {
                  error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
                }
              }
              if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
                error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
              }
              if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
              }
              if (instance.propTypes) {
                error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
              }
              if (instance.contextType) {
                error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
              }
              {
                if (instance.contextTypes) {
                  error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
                }
                if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                  didWarnAboutContextTypeAndContextTypes.add(ctor);
                  error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
                }
              }
              if (typeof instance.componentShouldUpdate === "function") {
                error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
              }
              if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
                error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
              }
              if (typeof instance.componentDidUnmount === "function") {
                error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
              }
              if (typeof instance.componentDidReceiveProps === "function") {
                error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
              }
              if (typeof instance.componentWillRecieveProps === "function") {
                error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
              }
              if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
                error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
              }
              var hasMutatedProps = instance.props !== newProps;
              if (instance.props !== void 0 && hasMutatedProps) {
                error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
              }
              if (instance.defaultProps) {
                error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
                didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
                error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
              }
              if (typeof instance.getDerivedStateFromProps === "function") {
                error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof instance.getDerivedStateFromError === "function") {
                error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof ctor.getSnapshotBeforeUpdate === "function") {
                error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
              }
              var _state = instance.state;
              if (_state && (typeof _state !== "object" || isArray(_state))) {
                error("%s.state: must be set to an object or null", name);
              }
              if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
                error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
              }
            }
          }
          function callComponentWillMount(type, instance) {
            var oldState = instance.state;
            if (typeof instance.componentWillMount === "function") {
              {
                if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!didWarnAboutDeprecatedWillMount[componentName]) {
                    warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", componentName);
                    didWarnAboutDeprecatedWillMount[componentName] = true;
                  }
                }
              }
              instance.componentWillMount();
            }
            if (typeof instance.UNSAFE_componentWillMount === "function") {
              instance.UNSAFE_componentWillMount();
            }
            if (oldState !== instance.state) {
              {
                error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component");
              }
              classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
            }
          }
          function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
            if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
              var oldQueue = internalInstance.queue;
              var oldReplace = internalInstance.replace;
              internalInstance.queue = null;
              internalInstance.replace = false;
              if (oldReplace && oldQueue.length === 1) {
                inst.state = oldQueue[0];
              } else {
                var nextState = oldReplace ? oldQueue[0] : inst.state;
                var dontMutate = true;
                for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                  var partial = oldQueue[i];
                  var partialState = typeof partial === "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
                  if (partialState != null) {
                    if (dontMutate) {
                      dontMutate = false;
                      nextState = assign({}, nextState, partialState);
                    } else {
                      assign(nextState, partialState);
                    }
                  }
                }
                inst.state = nextState;
              }
            } else {
              internalInstance.queue = null;
            }
          }
          function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
            {
              checkClassInstance(instance, ctor, newProps);
            }
            var initialState = instance.state !== void 0 ? instance.state : null;
            instance.updater = classComponentUpdater;
            instance.props = newProps;
            instance.state = initialState;
            var internalInstance = {
              queue: [],
              replace: false
            };
            set(instance, internalInstance);
            var contextType = ctor.contextType;
            if (typeof contextType === "object" && contextType !== null) {
              instance.context = readContext(contextType);
            } else {
              instance.context = maskedLegacyContext;
            }
            {
              if (instance.state === newProps) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                  didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                  error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
                }
              }
            }
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            if (typeof getDerivedStateFromProps === "function") {
              instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
            }
            if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
              callComponentWillMount(ctor, instance);
              processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
            }
          }
          var emptyTreeContext = {
            id: 1,
            overflow: ""
          };
          function getTreeId(context) {
            var overflow = context.overflow;
            var idWithLeadingBit = context.id;
            var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
            return id.toString(32) + overflow;
          }
          function pushTreeContext(baseContext, totalChildren, index2) {
            var baseIdWithLeadingBit = baseContext.id;
            var baseOverflow = baseContext.overflow;
            var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
            var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
            var slot = index2 + 1;
            var length = getBitLength(totalChildren) + baseLength;
            if (length > 30) {
              var numberOfOverflowBits = baseLength - baseLength % 5;
              var newOverflowBits = (1 << numberOfOverflowBits) - 1;
              var newOverflow = (baseId & newOverflowBits).toString(32);
              var restOfBaseId = baseId >> numberOfOverflowBits;
              var restOfBaseLength = baseLength - numberOfOverflowBits;
              var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
              var restOfNewBits = slot << restOfBaseLength;
              var id = restOfNewBits | restOfBaseId;
              var overflow = newOverflow + baseOverflow;
              return {
                id: 1 << restOfLength | id,
                overflow
              };
            } else {
              var newBits = slot << baseLength;
              var _id = newBits | baseId;
              var _overflow = baseOverflow;
              return {
                id: 1 << length | _id,
                overflow: _overflow
              };
            }
          }
          function getBitLength(number2) {
            return 32 - clz32(number2);
          }
          function getLeadingBit(id) {
            return 1 << getBitLength(id) - 1;
          }
          var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
          var log = Math.log;
          var LN2 = Math.LN2;
          function clz32Fallback(x) {
            var asUint = x >>> 0;
            if (asUint === 0) {
              return 32;
            }
            return 31 - (log(asUint) / LN2 | 0) | 0;
          }
          function is(x, y) {
            return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
          }
          var objectIs = typeof Object.is === "function" ? Object.is : is;
          var currentlyRenderingComponent = null;
          var currentlyRenderingTask = null;
          var firstWorkInProgressHook = null;
          var workInProgressHook = null;
          var isReRender = false;
          var didScheduleRenderPhaseUpdate = false;
          var localIdCounter = 0;
          var renderPhaseUpdates = null;
          var numberOfReRenders = 0;
          var RE_RENDER_LIMIT = 25;
          var isInHookUserCodeInDev = false;
          var currentHookNameInDev;
          function resolveCurrentlyRenderingComponent() {
            if (currentlyRenderingComponent === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
            {
              if (isInHookUserCodeInDev) {
                error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
              }
            }
            return currentlyRenderingComponent;
          }
          function areHookInputsEqual(nextDeps, prevDeps) {
            if (prevDeps === null) {
              {
                error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
              }
              return false;
            }
            {
              if (nextDeps.length !== prevDeps.length) {
                error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
              }
            }
            for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
              if (objectIs(nextDeps[i], prevDeps[i])) {
                continue;
              }
              return false;
            }
            return true;
          }
          function createHook() {
            if (numberOfReRenders > 0) {
              throw new Error("Rendered more hooks than during the previous render");
            }
            return {
              memoizedState: null,
              queue: null,
              next: null
            };
          }
          function createWorkInProgressHook() {
            if (workInProgressHook === null) {
              if (firstWorkInProgressHook === null) {
                isReRender = false;
                firstWorkInProgressHook = workInProgressHook = createHook();
              } else {
                isReRender = true;
                workInProgressHook = firstWorkInProgressHook;
              }
            } else {
              if (workInProgressHook.next === null) {
                isReRender = false;
                workInProgressHook = workInProgressHook.next = createHook();
              } else {
                isReRender = true;
                workInProgressHook = workInProgressHook.next;
              }
            }
            return workInProgressHook;
          }
          function prepareToUseHooks(task, componentIdentity) {
            currentlyRenderingComponent = componentIdentity;
            currentlyRenderingTask = task;
            {
              isInHookUserCodeInDev = false;
            }
            localIdCounter = 0;
          }
          function finishHooks(Component, props, children, refOrContext) {
            while (didScheduleRenderPhaseUpdate) {
              didScheduleRenderPhaseUpdate = false;
              localIdCounter = 0;
              numberOfReRenders += 1;
              workInProgressHook = null;
              children = Component(props, refOrContext);
            }
            resetHooksState();
            return children;
          }
          function checkDidRenderIdHook() {
            var didRenderIdHook = localIdCounter !== 0;
            return didRenderIdHook;
          }
          function resetHooksState() {
            {
              isInHookUserCodeInDev = false;
            }
            currentlyRenderingComponent = null;
            currentlyRenderingTask = null;
            didScheduleRenderPhaseUpdate = false;
            firstWorkInProgressHook = null;
            numberOfReRenders = 0;
            renderPhaseUpdates = null;
            workInProgressHook = null;
          }
          function readContext$1(context) {
            {
              if (isInHookUserCodeInDev) {
                error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
              }
            }
            return readContext(context);
          }
          function useContext(context) {
            {
              currentHookNameInDev = "useContext";
            }
            resolveCurrentlyRenderingComponent();
            return readContext(context);
          }
          function basicStateReducer(state, action) {
            return typeof action === "function" ? action(state) : action;
          }
          function useState(initialState) {
            {
              currentHookNameInDev = "useState";
            }
            return useReducer(basicStateReducer, initialState);
          }
          function useReducer(reducer, initialArg, init) {
            {
              if (reducer !== basicStateReducer) {
                currentHookNameInDev = "useReducer";
              }
            }
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            if (isReRender) {
              var queue = workInProgressHook.queue;
              var dispatch = queue.dispatch;
              if (renderPhaseUpdates !== null) {
                var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate !== void 0) {
                  renderPhaseUpdates.delete(queue);
                  var newState = workInProgressHook.memoizedState;
                  var update = firstRenderPhaseUpdate;
                  do {
                    var action = update.action;
                    {
                      isInHookUserCodeInDev = true;
                    }
                    newState = reducer(newState, action);
                    {
                      isInHookUserCodeInDev = false;
                    }
                    update = update.next;
                  } while (update !== null);
                  workInProgressHook.memoizedState = newState;
                  return [newState, dispatch];
                }
              }
              return [workInProgressHook.memoizedState, dispatch];
            } else {
              {
                isInHookUserCodeInDev = true;
              }
              var initialState;
              if (reducer === basicStateReducer) {
                initialState = typeof initialArg === "function" ? initialArg() : initialArg;
              } else {
                initialState = init !== void 0 ? init(initialArg) : initialArg;
              }
              {
                isInHookUserCodeInDev = false;
              }
              workInProgressHook.memoizedState = initialState;
              var _queue = workInProgressHook.queue = {
                last: null,
                dispatch: null
              };
              var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
              return [workInProgressHook.memoizedState, _dispatch];
            }
          }
          function useMemo(nextCreate, deps) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            if (workInProgressHook !== null) {
              var prevState = workInProgressHook.memoizedState;
              if (prevState !== null) {
                if (nextDeps !== null) {
                  var prevDeps = prevState[1];
                  if (areHookInputsEqual(nextDeps, prevDeps)) {
                    return prevState[0];
                  }
                }
              }
            }
            {
              isInHookUserCodeInDev = true;
            }
            var nextValue = nextCreate();
            {
              isInHookUserCodeInDev = false;
            }
            workInProgressHook.memoizedState = [nextValue, nextDeps];
            return nextValue;
          }
          function useRef(initialValue) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var previousRef = workInProgressHook.memoizedState;
            if (previousRef === null) {
              var ref = {
                current: initialValue
              };
              {
                Object.seal(ref);
              }
              workInProgressHook.memoizedState = ref;
              return ref;
            } else {
              return previousRef;
            }
          }
          function useLayoutEffect(create2, inputs) {
            {
              currentHookNameInDev = "useLayoutEffect";
              error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
            }
          }
          function dispatchAction(componentIdentity, queue, action) {
            if (numberOfReRenders >= RE_RENDER_LIMIT) {
              throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
            }
            if (componentIdentity === currentlyRenderingComponent) {
              didScheduleRenderPhaseUpdate = true;
              var update = {
                action,
                next: null
              };
              if (renderPhaseUpdates === null) {
                renderPhaseUpdates = new Map();
              }
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate === void 0) {
                renderPhaseUpdates.set(queue, update);
              } else {
                var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
                while (lastRenderPhaseUpdate.next !== null) {
                  lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
                }
                lastRenderPhaseUpdate.next = update;
              }
            }
          }
          function useCallback(callback, deps) {
            return useMemo(function() {
              return callback;
            }, deps);
          }
          function useMutableSource(source, getSnapshot, subscribe) {
            resolveCurrentlyRenderingComponent();
            return getSnapshot(source._source);
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            if (getServerSnapshot === void 0) {
              throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
            }
            return getServerSnapshot();
          }
          function useDeferredValue(value) {
            resolveCurrentlyRenderingComponent();
            return value;
          }
          function unsupportedStartTransition() {
            throw new Error("startTransition cannot be called during server rendering.");
          }
          function useTransition() {
            resolveCurrentlyRenderingComponent();
            return [false, unsupportedStartTransition];
          }
          function useId() {
            var task = currentlyRenderingTask;
            var treeId = getTreeId(task.treeContext);
            var responseState = currentResponseState;
            if (responseState === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
            }
            var localId = localIdCounter++;
            return makeId(responseState, treeId, localId);
          }
          function noop() {
          }
          var Dispatcher = {
            readContext: readContext$1,
            useContext,
            useMemo,
            useReducer,
            useRef,
            useState,
            useInsertionEffect: noop,
            useLayoutEffect,
            useCallback,
            useImperativeHandle: noop,
            useEffect: noop,
            useDebugValue: noop,
            useDeferredValue,
            useTransition,
            useId,
            useMutableSource,
            useSyncExternalStore
          };
          var currentResponseState = null;
          function setCurrentResponseState(responseState) {
            currentResponseState = responseState;
          }
          function getStackByComponentStackNode(componentStack) {
            try {
              var info = "";
              var node = componentStack;
              do {
                switch (node.tag) {
                  case 0:
                    info += describeBuiltInComponentFrame(node.type, null, null);
                    break;
                  case 1:
                    info += describeFunctionComponentFrame(node.type, null, null);
                    break;
                  case 2:
                    info += describeClassComponentFrame(node.type, null, null);
                    break;
                }
                node = node.parent;
              } while (node);
              return info;
            } catch (x) {
              return "\nError generating stack: " + x.message + "\n" + x.stack;
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          var PENDING = 0;
          var COMPLETED = 1;
          var FLUSHED = 2;
          var ABORTED = 3;
          var ERRORED = 4;
          var OPEN = 0;
          var CLOSING = 1;
          var CLOSED = 2;
          var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
          function defaultErrorHandler(error2) {
            console["error"](error2);
          }
          function noop$1() {
          }
          function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
            var pingedTasks = [];
            var abortSet = new Set();
            var request = {
              destination: null,
              responseState,
              progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
              status: OPEN,
              fatalError: null,
              nextSegmentId: 0,
              allPendingTasks: 0,
              pendingRootTasks: 0,
              completedRootSegment: null,
              abortableTasks: abortSet,
              pingedTasks,
              clientRenderedBoundaries: [],
              completedBoundaries: [],
              partialBoundaries: [],
              onError: onError === void 0 ? defaultErrorHandler : onError,
              onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
              onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
              onShellError: onShellError === void 0 ? noop$1 : onShellError,
              onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
            };
            var rootSegment = createPendingSegment(request, 0, null, rootFormatContext);
            rootSegment.parentFlushed = true;
            var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
            pingedTasks.push(rootTask);
            return request;
          }
          function pingTask(request, task) {
            var pingedTasks = request.pingedTasks;
            pingedTasks.push(task);
            if (pingedTasks.length === 1) {
              scheduleWork(function() {
                return performWork(request);
              });
            }
          }
          function createSuspenseBoundary(request, fallbackAbortableTasks) {
            return {
              id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
              rootSegmentID: -1,
              parentFlushed: false,
              pendingTasks: 0,
              forceClientRender: false,
              completedSegments: [],
              byteSize: 0,
              fallbackAbortableTasks
            };
          }
          function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
            request.allPendingTasks++;
            if (blockedBoundary === null) {
              request.pendingRootTasks++;
            } else {
              blockedBoundary.pendingTasks++;
            }
            var task = {
              node,
              ping: function() {
                return pingTask(request, task);
              },
              blockedBoundary,
              blockedSegment,
              abortSet,
              legacyContext,
              context,
              treeContext
            };
            {
              task.componentStack = null;
            }
            abortSet.add(task);
            return task;
          }
          function createPendingSegment(request, index2, boundary, formatContext) {
            return {
              status: PENDING,
              id: -1,
              index: index2,
              parentFlushed: false,
              chunks: [],
              children: [],
              formatContext,
              boundary
            };
          }
          var currentTaskInDEV = null;
          function getCurrentStackInDEV() {
            {
              if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
                return "";
              }
              return getStackByComponentStackNode(currentTaskInDEV.componentStack);
            }
          }
          function pushBuiltInComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 0,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushFunctionComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 1,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushClassComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 2,
                parent: task.componentStack,
                type
              };
            }
          }
          function popComponentStackInDEV(task) {
            {
              if (task.componentStack === null) {
                error("Unexpectedly popped too many stack frames. This is a bug in React.");
              } else {
                task.componentStack = task.componentStack.parent;
              }
            }
          }
          function logRecoverableError(request, error2) {
            var onError = request.onError;
            onError(error2);
          }
          function fatalError(request, error2) {
            var onShellError = request.onShellError;
            onShellError(error2);
            var onFatalError = request.onFatalError;
            onFatalError(error2);
            if (request.destination !== null) {
              request.status = CLOSED;
              closeWithError(request.destination, error2);
            } else {
              request.status = CLOSING;
              request.fatalError = error2;
            }
          }
          function renderSuspenseBoundary(request, task, props) {
            pushBuiltInComponentStackInDEV(task, "Suspense");
            var parentBoundary = task.blockedBoundary;
            var parentSegment = task.blockedSegment;
            var fallback = props.fallback;
            var content3 = props.children;
            var fallbackAbortSet = new Set();
            var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
            var insertionIndex = parentSegment.chunks.length;
            var boundarySegment = createPendingSegment(request, insertionIndex, newBoundary, parentSegment.formatContext);
            parentSegment.children.push(boundarySegment);
            var contentRootSegment = createPendingSegment(request, 0, null, parentSegment.formatContext);
            contentRootSegment.parentFlushed = true;
            task.blockedBoundary = newBoundary;
            task.blockedSegment = contentRootSegment;
            try {
              renderNode(request, task, content3);
              contentRootSegment.status = COMPLETED;
              queueCompletedSegment(newBoundary, contentRootSegment);
              if (newBoundary.pendingTasks === 0) {
                popComponentStackInDEV(task);
                return;
              }
            } catch (error2) {
              contentRootSegment.status = ERRORED;
              logRecoverableError(request, error2);
              newBoundary.forceClientRender = true;
            } finally {
              task.blockedBoundary = parentBoundary;
              task.blockedSegment = parentSegment;
            }
            var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
            {
              suspendedFallbackTask.componentStack = task.componentStack;
            }
            request.pingedTasks.push(suspendedFallbackTask);
            popComponentStackInDEV(task);
          }
          function renderHostElement(request, task, type, props) {
            pushBuiltInComponentStackInDEV(task, type);
            var segment = task.blockedSegment;
            var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
            var prevContext = segment.formatContext;
            segment.formatContext = getChildFormatContext(prevContext, type, props);
            renderNode(request, task, children);
            segment.formatContext = prevContext;
            pushEndInstance(segment.chunks, type);
            popComponentStackInDEV(task);
          }
          function shouldConstruct$1(Component) {
            return Component.prototype && Component.prototype.isReactComponent;
          }
          function renderWithHooks(request, task, Component, props, secondArg) {
            var componentIdentity = {};
            prepareToUseHooks(task, componentIdentity);
            var result = Component(props, secondArg);
            return finishHooks(Component, props, result, secondArg);
          }
          function finishClassComponent(request, task, instance, Component, props) {
            var nextChildren = instance.render();
            {
              if (instance.props !== props) {
                if (!didWarnAboutReassigningProps) {
                  error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component) || "a component");
                }
                didWarnAboutReassigningProps = true;
              }
            }
            {
              var childContextTypes = Component.childContextTypes;
              if (childContextTypes !== null && childContextTypes !== void 0) {
                var previousContext = task.legacyContext;
                var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
                task.legacyContext = mergedContext;
                renderNodeDestructive(request, task, nextChildren);
                task.legacyContext = previousContext;
                return;
              }
            }
            renderNodeDestructive(request, task, nextChildren);
          }
          function renderClassComponent(request, task, Component, props) {
            pushClassComponentStackInDEV(task, Component);
            var maskedContext = getMaskedContext(Component, task.legacyContext);
            var instance = constructClassInstance(Component, props, maskedContext);
            mountClassInstance(instance, Component, props, maskedContext);
            finishClassComponent(request, task, instance, Component, props);
            popComponentStackInDEV(task);
          }
          var didWarnAboutBadClass = {};
          var didWarnAboutModulePatternComponent = {};
          var didWarnAboutContextTypeOnFunctionComponent = {};
          var didWarnAboutGetDerivedStateOnFunctionComponent = {};
          var didWarnAboutReassigningProps = false;
          var didWarnAboutGenerators = false;
          var didWarnAboutMaps = false;
          var hasWarnedAboutUsingContextAsConsumer = false;
          function renderIndeterminateComponent(request, task, Component, props) {
            var legacyContext;
            {
              legacyContext = getMaskedContext(Component, task.legacyContext);
            }
            pushFunctionComponentStackInDEV(task, Component);
            {
              if (Component.prototype && typeof Component.prototype.render === "function") {
                var componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutBadClass[componentName]) {
                  error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                  didWarnAboutBadClass[componentName] = true;
                }
              }
            }
            var value = renderWithHooks(request, task, Component, props, legacyContext);
            var hasId = checkDidRenderIdHook();
            {
              if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
                var _componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                  didWarnAboutModulePatternComponent[_componentName] = true;
                }
              }
            }
            if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
              {
                var _componentName2 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName2]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                  didWarnAboutModulePatternComponent[_componentName2] = true;
                }
              }
              mountClassInstance(value, Component, props, legacyContext);
              finishClassComponent(request, task, value, Component, props);
            } else {
              {
                validateFunctionComponentInDev(Component);
              }
              if (hasId) {
                var prevTreeContext = task.treeContext;
                var totalChildren = 1;
                var index2 = 0;
                task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index2);
                try {
                  renderNodeDestructive(request, task, value);
                } finally {
                  task.treeContext = prevTreeContext;
                }
              } else {
                renderNodeDestructive(request, task, value);
              }
            }
            popComponentStackInDEV(task);
          }
          function validateFunctionComponentInDev(Component) {
            {
              if (Component) {
                if (Component.childContextTypes) {
                  error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
                }
              }
              if (typeof Component.getDerivedStateFromProps === "function") {
                var _componentName3 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                  error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                  didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
                }
              }
              if (typeof Component.contextType === "object" && Component.contextType !== null) {
                var _componentName4 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                  error("%s: Function components do not support contextType.", _componentName4);
                  didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
                }
              }
            }
          }
          function resolveDefaultProps(Component, baseProps) {
            if (Component && Component.defaultProps) {
              var props = assign({}, baseProps);
              var defaultProps = Component.defaultProps;
              for (var propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
              return props;
            }
            return baseProps;
          }
          function renderForwardRef(request, task, type, props, ref) {
            pushFunctionComponentStackInDEV(task, type.render);
            var children = renderWithHooks(request, task, type.render, props, ref);
            var hasId = checkDidRenderIdHook();
            if (hasId) {
              var prevTreeContext = task.treeContext;
              var totalChildren = 1;
              var index2 = 0;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index2);
              try {
                renderNodeDestructive(request, task, children);
              } finally {
                task.treeContext = prevTreeContext;
              }
            } else {
              renderNodeDestructive(request, task, children);
            }
            popComponentStackInDEV(task);
          }
          function renderMemo(request, task, type, props, ref) {
            var innerType = type.type;
            var resolvedProps = resolveDefaultProps(innerType, props);
            renderElement(request, task, innerType, resolvedProps, ref);
          }
          function renderContextConsumer(request, task, context, props) {
            {
              if (context._context === void 0) {
                if (context !== context.Consumer) {
                  if (!hasWarnedAboutUsingContextAsConsumer) {
                    hasWarnedAboutUsingContextAsConsumer = true;
                    error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                }
              } else {
                context = context._context;
              }
            }
            var render = props.children;
            {
              if (typeof render !== "function") {
                error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
              }
            }
            var newValue = readContext(context);
            var newChildren = render(newValue);
            renderNodeDestructive(request, task, newChildren);
          }
          function renderContextProvider(request, task, type, props) {
            var context = type._context;
            var value = props.value;
            var children = props.children;
            var prevSnapshot;
            {
              prevSnapshot = task.context;
            }
            task.context = pushProvider(context, value);
            renderNodeDestructive(request, task, children);
            task.context = popProvider(context);
            {
              if (prevSnapshot !== task.context) {
                error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
              }
            }
          }
          function renderLazyComponent(request, task, lazyComponent, props, ref) {
            pushBuiltInComponentStackInDEV(task, "Lazy");
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;
            var Component = init(payload);
            var resolvedProps = resolveDefaultProps(Component, props);
            renderElement(request, task, Component, resolvedProps, ref);
            popComponentStackInDEV(task);
          }
          function renderElement(request, task, type, props, ref) {
            if (typeof type === "function") {
              if (shouldConstruct$1(type)) {
                renderClassComponent(request, task, type, props);
                return;
              } else {
                renderIndeterminateComponent(request, task, type, props);
                return;
              }
            }
            if (typeof type === "string") {
              renderHostElement(request, task, type, props);
              return;
            }
            switch (type) {
              case REACT_LEGACY_HIDDEN_TYPE:
              case REACT_DEBUG_TRACING_MODE_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_FRAGMENT_TYPE: {
                renderNodeDestructive(request, task, props.children);
                return;
              }
              case REACT_SUSPENSE_LIST_TYPE: {
                pushBuiltInComponentStackInDEV(task, "SuspenseList");
                renderNodeDestructive(request, task, props.children);
                popComponentStackInDEV(task);
                return;
              }
              case REACT_SCOPE_TYPE: {
                throw new Error("ReactDOMServer does not yet support scope components.");
              }
              case REACT_SUSPENSE_TYPE: {
                {
                  renderSuspenseBoundary(request, task, props);
                }
                return;
              }
            }
            if (typeof type === "object" && type !== null) {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE: {
                  renderForwardRef(request, task, type, props, ref);
                  return;
                }
                case REACT_MEMO_TYPE: {
                  renderMemo(request, task, type, props, ref);
                  return;
                }
                case REACT_PROVIDER_TYPE: {
                  renderContextProvider(request, task, type, props);
                  return;
                }
                case REACT_CONTEXT_TYPE: {
                  renderContextConsumer(request, task, type, props);
                  return;
                }
                case REACT_LAZY_TYPE: {
                  renderLazyComponent(request, task, type, props);
                  return;
                }
              }
            }
            var info = "";
            {
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
          }
          function validateIterable(iterable, iteratorFn) {
            {
              if (typeof Symbol === "function" && iterable[Symbol.toStringTag] === "Generator") {
                if (!didWarnAboutGenerators) {
                  error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                }
                didWarnAboutGenerators = true;
              }
              if (iterable.entries === iteratorFn) {
                if (!didWarnAboutMaps) {
                  error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
            }
          }
          function renderNodeDestructive(request, task, node) {
            task.node = node;
            if (typeof node === "object" && node !== null) {
              switch (node.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var element2 = node;
                  var type = element2.type;
                  var props = element2.props;
                  var ref = element2.ref;
                  renderElement(request, task, type, props, ref);
                  return;
                }
                case REACT_PORTAL_TYPE:
                  throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                case REACT_LAZY_TYPE: {
                  var lazyNode = node;
                  var payload = lazyNode._payload;
                  var init = lazyNode._init;
                  var resolvedNode = init(payload);
                  renderNodeDestructive(request, task, resolvedNode);
                  return;
                }
              }
              if (isArray(node)) {
                renderChildrenArray(request, task, node);
                return;
              }
              var iteratorFn = getIteratorFn(node);
              if (iteratorFn) {
                {
                  validateIterable(node, iteratorFn);
                }
                var iterator = iteratorFn.call(node);
                if (iterator) {
                  var step = iterator.next();
                  if (!step.done) {
                    var children = [];
                    do {
                      children.push(step.value);
                      step = iterator.next();
                    } while (!step.done);
                    renderChildrenArray(request, task, children);
                    return;
                  }
                  return;
                }
              }
              var childString = Object.prototype.toString.call(node);
              throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
            }
            if (typeof node === "string") {
              pushTextInstance(task.blockedSegment.chunks, node, request.responseState);
              return;
            }
            if (typeof node === "number") {
              pushTextInstance(task.blockedSegment.chunks, "" + node, request.responseState);
              return;
            }
            {
              if (typeof node === "function") {
                error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
              }
            }
          }
          function renderChildrenArray(request, task, children) {
            var totalChildren = children.length;
            for (var i = 0; i < totalChildren; i++) {
              var prevTreeContext = task.treeContext;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
              try {
                renderNode(request, task, children[i]);
              } finally {
                task.treeContext = prevTreeContext;
              }
            }
          }
          function spawnNewSuspendedTask(request, task, x) {
            var segment = task.blockedSegment;
            var insertionIndex = segment.chunks.length;
            var newSegment = createPendingSegment(request, insertionIndex, null, segment.formatContext);
            segment.children.push(newSegment);
            var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
            {
              if (task.componentStack !== null) {
                newTask.componentStack = task.componentStack.parent;
              }
            }
            var ping = newTask.ping;
            x.then(ping, ping);
          }
          function renderNode(request, task, node) {
            var previousFormatContext = task.blockedSegment.formatContext;
            var previousLegacyContext = task.legacyContext;
            var previousContext = task.context;
            var previousComponentStack = null;
            {
              previousComponentStack = task.componentStack;
            }
            try {
              return renderNodeDestructive(request, task, node);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                spawnNewSuspendedTask(request, task, x);
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                return;
              } else {
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                throw x;
              }
            }
          }
          function erroredTask(request, boundary, segment, error2) {
            logRecoverableError(request, error2);
            if (boundary === null) {
              fatalError(request, error2);
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function abortTaskSoft(task) {
            var request = this;
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            finishedTask(request, boundary, segment);
          }
          function abortTask(task) {
            var request = this;
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            if (boundary === null) {
              request.allPendingTasks--;
              if (request.status !== CLOSED) {
                request.status = CLOSED;
                if (request.destination !== null) {
                  close(request.destination);
                }
              }
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
              boundary.fallbackAbortableTasks.forEach(abortTask, request);
              boundary.fallbackAbortableTasks.clear();
              request.allPendingTasks--;
              if (request.allPendingTasks === 0) {
                var onAllReady = request.onAllReady;
                onAllReady();
              }
            }
          }
          function queueCompletedSegment(boundary, segment) {
            if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
              var childSegment = segment.children[0];
              childSegment.id = segment.id;
              childSegment.parentFlushed = true;
              if (childSegment.status === COMPLETED) {
                queueCompletedSegment(boundary, childSegment);
              }
            } else {
              var completedSegments = boundary.completedSegments;
              completedSegments.push(segment);
            }
          }
          function finishedTask(request, boundary, segment) {
            if (boundary === null) {
              if (segment.parentFlushed) {
                if (request.completedRootSegment !== null) {
                  throw new Error("There can only be one root segment. This is a bug in React.");
                }
                request.completedRootSegment = segment;
              }
              request.pendingRootTasks--;
              if (request.pendingRootTasks === 0) {
                request.onShellError = noop$1;
                var onShellReady = request.onShellReady;
                onShellReady();
              }
            } else {
              boundary.pendingTasks--;
              if (boundary.forceClientRender)
                ;
              else if (boundary.pendingTasks === 0) {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                  }
                }
                if (boundary.parentFlushed) {
                  request.completedBoundaries.push(boundary);
                }
                boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
                boundary.fallbackAbortableTasks.clear();
              } else {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                    var completedSegments = boundary.completedSegments;
                    if (completedSegments.length === 1) {
                      if (boundary.parentFlushed) {
                        request.partialBoundaries.push(boundary);
                      }
                    }
                  }
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function retryTask(request, task) {
            var segment = task.blockedSegment;
            if (segment.status !== PENDING) {
              return;
            }
            switchContext(task.context);
            var prevTaskInDEV = null;
            {
              prevTaskInDEV = currentTaskInDEV;
              currentTaskInDEV = task;
            }
            try {
              renderNodeDestructive(request, task, task.node);
              task.abortSet.delete(task);
              segment.status = COMPLETED;
              finishedTask(request, task.blockedBoundary, segment);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                var ping = task.ping;
                x.then(ping, ping);
              } else {
                task.abortSet.delete(task);
                segment.status = ERRORED;
                erroredTask(request, task.blockedBoundary, segment, x);
              }
            } finally {
              {
                currentTaskInDEV = prevTaskInDEV;
              }
            }
          }
          function performWork(request) {
            if (request.status === CLOSED) {
              return;
            }
            var prevContext = getActiveContext();
            var prevDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = Dispatcher;
            var prevGetCurrentStackImpl;
            {
              prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
              ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
            }
            var prevResponseState = currentResponseState;
            setCurrentResponseState(request.responseState);
            try {
              var pingedTasks = request.pingedTasks;
              var i;
              for (i = 0; i < pingedTasks.length; i++) {
                var task = pingedTasks[i];
                retryTask(request, task);
              }
              pingedTasks.splice(0, i);
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            } finally {
              setCurrentResponseState(prevResponseState);
              ReactCurrentDispatcher$1.current = prevDispatcher;
              {
                ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
              }
              if (prevDispatcher === Dispatcher) {
                switchContext(prevContext);
              }
            }
          }
          function flushSubtree(request, destination, segment) {
            segment.parentFlushed = true;
            switch (segment.status) {
              case PENDING: {
                var segmentID = segment.id = request.nextSegmentId++;
                return writePlaceholder(destination, request.responseState, segmentID);
              }
              case COMPLETED: {
                segment.status = FLUSHED;
                var r = true;
                var chunks = segment.chunks;
                var chunkIdx = 0;
                var children = segment.children;
                for (var childIdx = 0; childIdx < children.length; childIdx++) {
                  var nextChild = children[childIdx];
                  for (; chunkIdx < nextChild.index; chunkIdx++) {
                    writeChunk(destination, chunks[chunkIdx]);
                  }
                  r = flushSegment(request, destination, nextChild);
                }
                for (; chunkIdx < chunks.length - 1; chunkIdx++) {
                  writeChunk(destination, chunks[chunkIdx]);
                }
                if (chunkIdx < chunks.length) {
                  r = writeChunkAndReturn(destination, chunks[chunkIdx]);
                }
                return r;
              }
              default: {
                throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
              }
            }
          }
          function flushSegment(request, destination, segment) {
            var boundary = segment.boundary;
            if (boundary === null) {
              return flushSubtree(request, destination, segment);
            }
            boundary.parentFlushed = true;
            if (boundary.forceClientRender) {
              writeStartClientRenderedSuspenseBoundary(destination, request.responseState);
              flushSubtree(request, destination, segment);
              return writeEndClientRenderedSuspenseBoundary(destination, request.responseState);
            } else if (boundary.pendingTasks > 0) {
              boundary.rootSegmentID = request.nextSegmentId++;
              if (boundary.completedSegments.length > 0) {
                request.partialBoundaries.push(boundary);
              }
              var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
              writeStartPendingSuspenseBoundary(destination, request.responseState, id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else if (boundary.byteSize > request.progressiveChunkSize) {
              boundary.rootSegmentID = request.nextSegmentId++;
              request.completedBoundaries.push(boundary);
              writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else {
              writeStartCompletedSuspenseBoundary(destination, request.responseState);
              var completedSegments = boundary.completedSegments;
              if (completedSegments.length !== 1) {
                throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
              }
              var contentSegment = completedSegments[0];
              flushSegment(request, destination, contentSegment);
              return writeEndCompletedSuspenseBoundary(destination, request.responseState);
            }
          }
          function flushClientRenderedBoundary(request, destination, boundary) {
            return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id);
          }
          function flushSegmentContainer(request, destination, segment) {
            writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
            flushSegment(request, destination, segment);
            return writeEndSegment(destination, segment.formatContext);
          }
          function flushCompletedBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              flushPartiallyCompletedSegment(request, destination, boundary, segment);
            }
            completedSegments.length = 0;
            return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
          }
          function flushPartialBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
                i++;
                completedSegments.splice(0, i);
                return false;
              }
            }
            completedSegments.splice(0, i);
            return true;
          }
          function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
            if (segment.status === FLUSHED) {
              return true;
            }
            var segmentID = segment.id;
            if (segmentID === -1) {
              var rootSegmentID = segment.id = boundary.rootSegmentID;
              if (rootSegmentID === -1) {
                throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
              }
              return flushSegmentContainer(request, destination, segment);
            } else {
              flushSegmentContainer(request, destination, segment);
              return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
            }
          }
          function flushCompletedQueues(request, destination) {
            beginWriting();
            try {
              var completedRootSegment = request.completedRootSegment;
              if (completedRootSegment !== null && request.pendingRootTasks === 0) {
                flushSegment(request, destination, completedRootSegment);
                request.completedRootSegment = null;
                writeCompletedRoot(destination, request.responseState);
              }
              var clientRenderedBoundaries = request.clientRenderedBoundaries;
              var i;
              for (i = 0; i < clientRenderedBoundaries.length; i++) {
                var boundary = clientRenderedBoundaries[i];
                if (!flushClientRenderedBoundary(request, destination, boundary)) {
                  request.destination = null;
                  i++;
                  clientRenderedBoundaries.splice(0, i);
                  return;
                }
              }
              clientRenderedBoundaries.splice(0, i);
              var completedBoundaries = request.completedBoundaries;
              for (i = 0; i < completedBoundaries.length; i++) {
                var _boundary = completedBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary)) {
                  request.destination = null;
                  i++;
                  completedBoundaries.splice(0, i);
                  return;
                }
              }
              completedBoundaries.splice(0, i);
              completeWriting(destination);
              beginWriting(destination);
              var partialBoundaries = request.partialBoundaries;
              for (i = 0; i < partialBoundaries.length; i++) {
                var _boundary2 = partialBoundaries[i];
                if (!flushPartialBoundary(request, destination, _boundary2)) {
                  request.destination = null;
                  i++;
                  partialBoundaries.splice(0, i);
                  return;
                }
              }
              partialBoundaries.splice(0, i);
              var largeBoundaries = request.completedBoundaries;
              for (i = 0; i < largeBoundaries.length; i++) {
                var _boundary3 = largeBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary3)) {
                  request.destination = null;
                  i++;
                  largeBoundaries.splice(0, i);
                  return;
                }
              }
              largeBoundaries.splice(0, i);
            } finally {
              completeWriting(destination);
              if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0) {
                {
                  if (request.abortableTasks.size !== 0) {
                    error("There was still abortable task at the root when we closed. This is a bug in React.");
                  }
                }
                close(destination);
              }
            }
          }
          function startWork(request) {
            scheduleWork(function() {
              return performWork(request);
            });
          }
          function startFlowing(request, destination) {
            if (request.status === CLOSING) {
              request.status = CLOSED;
              closeWithError(destination, request.fatalError);
              return;
            }
            if (request.status === CLOSED) {
              return;
            }
            if (request.destination !== null) {
              return;
            }
            request.destination = destination;
            try {
              flushCompletedQueues(request, destination);
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function abort(request) {
            try {
              var abortableTasks = request.abortableTasks;
              abortableTasks.forEach(abortTask, request);
              abortableTasks.clear();
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function renderToReadableStream(children, options) {
            return new Promise(function(resolve, reject) {
              var onFatalError;
              var onAllReady;
              var allReady = new Promise(function(res, rej) {
                onAllReady = res;
                onFatalError = rej;
              });
              function onShellReady() {
                var stream = new ReadableStream({
                  type: "bytes",
                  pull: function(controller) {
                    startFlowing(request, controller);
                  },
                  cancel: function(reason) {
                    abort(request);
                  }
                });
                stream.allReady = allReady;
                resolve(stream);
              }
              function onShellError(error2) {
                allReady.catch(function() {
                });
                reject(error2);
              }
              var request = createRequest(children, createResponseState(options ? options.identifierPrefix : void 0, options ? options.nonce : void 0, options ? options.bootstrapScriptContent : void 0, options ? options.bootstrapScripts : void 0, options ? options.bootstrapModules : void 0), createRootFormatContext(options ? options.namespaceURI : void 0), options ? options.progressiveChunkSize : void 0, options ? options.onError : void 0, onAllReady, onShellReady, onShellError, onFatalError);
              if (options && options.signal) {
                var signal = options.signal;
                var listener = function() {
                  abort(request);
                  signal.removeEventListener("abort", listener);
                };
                signal.addEventListener("abort", listener);
              }
              startWork(request);
            });
          }
          exports.renderToReadableStream = renderToReadableStream;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // example/.central/.central-build/node_modules/react-dom/server.browser.js
  var require_server_browser = __commonJS({
    "example/.central/.central-build/node_modules/react-dom/server.browser.js"(exports) {
      "use strict";
      var l;
      var s;
      if (false) {
        l = null;
        s = null;
      } else {
        l = require_react_dom_server_legacy_browser_development();
        s = require_react_dom_server_browser_development();
      }
      exports.version = l.version;
      exports.renderToString = l.renderToString;
      exports.renderToStaticMarkup = l.renderToStaticMarkup;
      exports.renderToNodeStream = l.renderToNodeStream;
      exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
      exports.renderToReadableStream = s.renderToReadableStream;
    }
  });

  // example/.central/.central-build/node_modules/central_0/index.jsx
  var require_central_0 = __commonJS({
    "example/.central/.central-build/node_modules/central_0/index.jsx"(exports, module) {
      var import_react3 = __toModule(require_react());
      var import_server = __toModule(require_server_browser());
      async function html4(content3) {
        return `
<!doctype html>
<hmtl lang=en>
	<head>
		<meta charset=utf-8>
		<title></title>
	</head>
	<body>
		${import_server.default.renderToStaticMarkup(content3)}
	</body>
</html>
`;
      }
      module.exports = {
        html: html4,
        ".central": {
          middleware: [
            [
              "*",
              [
                "all",
                (req, res, next) => {
                  console.log("root middleware", req.originalUrl);
                  next();
                }
              ]
            ]
          ]
        }
      };
    }
  });

  // example/calendar/2021/.central.js
  var require_central = __commonJS({
    "example/calendar/2021/.central.js"(exports, module) {
      var butts2 = "lol butts 2";
      var dongs = "haha dongs";
      module.exports = {
        butts: butts2,
        dongs
      };
    }
  });

  // example/finance/.central/index.js
  var index_exports = {};
  __export(index_exports, {
    butts: () => butts
  });
  var butts;
  var init_index = __esm({
    "example/finance/.central/index.js"() {
      butts = "lol, butts";
    }
  });

  // example/.central/.central-build/node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "example/.central/.central-build/node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty2.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // example/.central/.central-build/node_modules/markdown_central_1/node_modules/react/cjs/react.development.js
  var require_react_development2 = __commonJS({
    "example/.central/.central-build/node_modules/markdown_central_1/node_modules/react/cjs/react.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var _assign = require_object_assign();
          var ReactVersion = "17.0.2";
          var REACT_ELEMENT_TYPE = 60103;
          var REACT_PORTAL_TYPE = 60106;
          exports.Fragment = 60107;
          exports.StrictMode = 60108;
          exports.Profiler = 60114;
          var REACT_PROVIDER_TYPE = 60109;
          var REACT_CONTEXT_TYPE = 60110;
          var REACT_FORWARD_REF_TYPE = 60112;
          exports.Suspense = 60113;
          var REACT_SUSPENSE_LIST_TYPE = 60120;
          var REACT_MEMO_TYPE = 60115;
          var REACT_LAZY_TYPE = 60116;
          var REACT_BLOCK_TYPE = 60121;
          var REACT_SERVER_BLOCK_TYPE = 60122;
          var REACT_FUNDAMENTAL_TYPE = 60117;
          var REACT_SCOPE_TYPE = 60119;
          var REACT_OPAQUE_ID_TYPE = 60128;
          var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
          var REACT_OFFSCREEN_TYPE = 60130;
          var REACT_LEGACY_HIDDEN_TYPE = 60131;
          if (typeof Symbol === "function" && Symbol.for) {
            var symbolFor = Symbol.for;
            REACT_ELEMENT_TYPE = symbolFor("react.element");
            REACT_PORTAL_TYPE = symbolFor("react.portal");
            exports.Fragment = symbolFor("react.fragment");
            exports.StrictMode = symbolFor("react.strict_mode");
            exports.Profiler = symbolFor("react.profiler");
            REACT_PROVIDER_TYPE = symbolFor("react.provider");
            REACT_CONTEXT_TYPE = symbolFor("react.context");
            REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
            exports.Suspense = symbolFor("react.suspense");
            REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
            REACT_MEMO_TYPE = symbolFor("react.memo");
            REACT_LAZY_TYPE = symbolFor("react.lazy");
            REACT_BLOCK_TYPE = symbolFor("react.block");
            REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
            REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
            REACT_SCOPE_TYPE = symbolFor("react.scope");
            REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
            REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
            REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
            REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
          }
          var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: 0
          };
          var ReactCurrentOwner = {
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var IsSomeRendererActing = {
            current: false
          };
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner,
            IsSomeRendererActing,
            assign: _assign
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          }
          function warn(format) {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
          function error(format) {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return "" + item;
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            isMounted: function(publicInstance) {
              return false;
            },
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
              {
                throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
              }
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          _assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var functionName = innerType.displayName || innerType.name || "";
            return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentName(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case exports.Fragment:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case exports.Profiler:
                return "Profiler";
              case exports.StrictMode:
                return "StrictMode";
              case exports.Suspense:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  return getComponentName(type.type);
                case REACT_BLOCK_TYPE:
                  return getComponentName(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentName(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty2.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty2.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentName(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element2 = {
              $$typeof: REACT_ELEMENT_TYPE,
              type,
              key,
              ref,
              props,
              _owner: owner
            };
            {
              element2._store = {};
              Object.defineProperty(element2._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element2, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element2, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element2.props);
                Object.freeze(element2);
              }
            }
            return element2;
          };
          function createElement(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                key = "" + config.key;
              }
              self = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element2, config, children) {
            if (!!(element2 === null || element2 === void 0)) {
              {
                throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element2 + ".");
              }
            }
            var propName;
            var props = _assign({}, element2.props);
            var key = element2.key;
            var ref = element2.ref;
            var self = element2._self;
            var source = element2._source;
            var owner = element2._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                key = "" + config.key;
              }
              var defaultProps;
              if (element2.type && element2.type.defaultProps) {
                defaultProps = element2.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element2.type, key, ref, self, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text4) {
            return text4.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element2, index2) {
            if (typeof element2 === "object" && element2 !== null && element2.key != null) {
              return escape("" + element2.key);
            }
            return index2.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (Array.isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = "" + children;
                {
                  {
                    throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                  }
                }
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              {
                throw Error("React.Children.only expected to receive a single React element child.");
              }
            }
            return children;
          }
          function createContext(defaultValue, calculateChangedBits) {
            if (calculateChangedBits === void 0) {
              calculateChangedBits = null;
            } else {
              {
                if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                  error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
                }
              }
            }
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              _calculateChangedBits: calculateChangedBits,
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              _threadCount: 0,
              Provider: null,
              Consumer: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context,
                _calculateChangedBits: context._calculateChangedBits
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
              thenable.then(function(moduleObject) {
                if (payload._status === Pending) {
                  var defaultExport = moduleObject.default;
                  {
                    if (defaultExport === void 0) {
                      error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                    }
                  }
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = defaultExport;
                }
              }, function(error2) {
                if (payload._status === Pending) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
            }
            if (payload._status === Resolved) {
              return payload._result;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              _status: -1,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (render.displayName == null) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var enableScopeAPI = false;
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (type.displayName == null) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            if (!(dispatcher !== null)) {
              {
                throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context, unstable_observedBits) {
            var dispatcher = resolveDispatcher();
            {
              if (unstable_observedBits !== void 0) {
                error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks" : "");
              }
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context, unstable_observedBits);
          }
          function useState(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect(create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create2, deps);
          }
          function useLayoutEffect(create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create2, deps);
          }
          function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create2, deps);
          }
          function useImperativeHandle(ref, create2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create2, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: _assign({}, props, {
                    value: prevLog
                  }),
                  info: _assign({}, props, {
                    value: prevInfo
                  }),
                  warn: _assign({}, props, {
                    value: prevWarn
                  }),
                  error: _assign({}, props, {
                    value: prevError
                  }),
                  group: _assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: _assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: _assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case exports.Suspense:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_BLOCK_TYPE:
                  return describeFunctionComponentFrame(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element2) {
            {
              if (element2) {
                var owner = element2._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element2.type, element2._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element2) {
            {
              var has = Function.call.bind(Object.prototype.hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element2);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element2);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element2) {
            {
              if (element2) {
                var owner = element2._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element2.type, element2._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentName(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element2, parentType) {
            if (!element2._store || element2._store.validated || element2.key != null) {
              return;
            }
            element2._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element2 && element2._owner && element2._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentName(element2._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element2);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (Array.isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element2) {
            {
              var type = element2.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentName(type);
                checkPropTypes(propTypes, element2.props, "prop", name, element2);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentName(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys2 = Object.keys(fragment.props);
              for (var i = 0; i < keys2.length; i++) {
                var key = keys2[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (Array.isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element2 = createElement.apply(this, arguments);
            if (element2 == null) {
              return element2;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === exports.Fragment) {
              validateFragmentProps(element2);
            } else {
              validatePropTypes(element2);
            }
            return element2;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element2, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          {
            try {
              var frozenObject = Object.freeze({});
              new Map([[frozenObject, null]]);
              new Set([frozenObject]);
            } catch (e) {
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.PureComponent = PureComponent;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.useCallback = useCallback;
          exports.useContext = useContext;
          exports.useDebugValue = useDebugValue;
          exports.useEffect = useEffect;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef;
          exports.useState = useState;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // example/.central/.central-build/node_modules/markdown_central_1/node_modules/react/index.js
  var require_react2 = __commonJS({
    "example/.central/.central-build/node_modules/markdown_central_1/node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development2();
      }
    }
  });

  // example/.central/.central-build/node_modules/react-markdown/lib/uri-transformer.js
  function uriTransformer(uri) {
    const url = (uri || "").trim();
    const first = url.charAt(0);
    if (first === "#" || first === "/") {
      return url;
    }
    const colon = url.indexOf(":");
    if (colon === -1) {
      return url;
    }
    let index2 = -1;
    while (++index2 < protocols.length) {
      const protocol = protocols[index2];
      if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
        return url;
      }
    }
    index2 = url.indexOf("?");
    if (index2 !== -1 && colon > index2) {
      return url;
    }
    index2 = url.indexOf("#");
    if (index2 !== -1 && colon > index2) {
      return url;
    }
    return "javascript:void(0)";
  }
  var protocols;
  var init_uri_transformer = __esm({
    "example/.central/.central-build/node_modules/react-markdown/lib/uri-transformer.js"() {
      protocols = ["http", "https", "mailto", "tel"];
    }
  });

  // example/.central/.central-build/node_modules/is-buffer/index.js
  var require_is_buffer = __commonJS({
    "example/.central/.central-build/node_modules/is-buffer/index.js"(exports, module) {
      module.exports = function isBuffer2(obj) {
        return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      };
    }
  });

  // example/.central/.central-build/node_modules/unist-util-stringify-position/index.js
  function stringifyPosition(value) {
    if (!value || typeof value !== "object") {
      return "";
    }
    if ("position" in value || "type" in value) {
      return position(value.position);
    }
    if ("start" in value || "end" in value) {
      return position(value);
    }
    if ("line" in value || "column" in value) {
      return point(value);
    }
    return "";
  }
  function point(point3) {
    return index(point3 && point3.line) + ":" + index(point3 && point3.column);
  }
  function position(pos) {
    return point(pos && pos.start) + "-" + point(pos && pos.end);
  }
  function index(value) {
    return value && typeof value === "number" ? value : 1;
  }
  var init_unist_util_stringify_position = __esm({
    "example/.central/.central-build/node_modules/unist-util-stringify-position/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/vfile-message/index.js
  var VFileMessage;
  var init_vfile_message = __esm({
    "example/.central/.central-build/node_modules/vfile-message/index.js"() {
      init_unist_util_stringify_position();
      VFileMessage = class extends Error {
        constructor(reason, place, origin) {
          const parts = [null, null];
          let position2 = {
            start: { line: null, column: null },
            end: { line: null, column: null }
          };
          super();
          if (typeof place === "string") {
            origin = place;
            place = void 0;
          }
          if (typeof origin === "string") {
            const index2 = origin.indexOf(":");
            if (index2 === -1) {
              parts[1] = origin;
            } else {
              parts[0] = origin.slice(0, index2);
              parts[1] = origin.slice(index2 + 1);
            }
          }
          if (place) {
            if ("type" in place || "position" in place) {
              if (place.position) {
                position2 = place.position;
              }
            } else if ("start" in place || "end" in place) {
              position2 = place;
            } else if ("line" in place || "column" in place) {
              position2.start = place;
            }
          }
          this.name = stringifyPosition(place) || "1:1";
          this.message = typeof reason === "object" ? reason.message : reason;
          this.stack = typeof reason === "object" ? reason.stack : "";
          this.reason = this.message;
          this.fatal;
          this.line = position2.start.line;
          this.column = position2.start.column;
          this.source = parts[0];
          this.ruleId = parts[1];
          this.position = position2;
          this.actual;
          this.expected;
          this.file;
          this.url;
          this.note;
        }
      };
      VFileMessage.prototype.file = "";
      VFileMessage.prototype.name = "";
      VFileMessage.prototype.reason = "";
      VFileMessage.prototype.message = "";
      VFileMessage.prototype.stack = "";
      VFileMessage.prototype.fatal = null;
      VFileMessage.prototype.column = null;
      VFileMessage.prototype.line = null;
      VFileMessage.prototype.source = null;
      VFileMessage.prototype.ruleId = null;
      VFileMessage.prototype.position = null;
    }
  });

  // example/.central/.central-build/node_modules/vfile/lib/minpath.browser.js
  function basename(path2, ext) {
    if (ext !== void 0 && typeof ext !== "string") {
      throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path2);
    let start = 0;
    let end = -1;
    let index2 = path2.length;
    let seenNonSlash;
    if (ext === void 0 || ext.length === 0 || ext.length > path2.length) {
      while (index2--) {
        if (path2.charCodeAt(index2) === 47) {
          if (seenNonSlash) {
            start = index2 + 1;
            break;
          }
        } else if (end < 0) {
          seenNonSlash = true;
          end = index2 + 1;
        }
      }
      return end < 0 ? "" : path2.slice(start, end);
    }
    if (ext === path2) {
      return "";
    }
    let firstNonSlashEnd = -1;
    let extIndex = ext.length - 1;
    while (index2--) {
      if (path2.charCodeAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd < 0) {
          seenNonSlash = true;
          firstNonSlashEnd = index2 + 1;
        }
        if (extIndex > -1) {
          if (path2.charCodeAt(index2) === ext.charCodeAt(extIndex--)) {
            if (extIndex < 0) {
              end = index2;
            }
          } else {
            extIndex = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) {
      end = firstNonSlashEnd;
    } else if (end < 0) {
      end = path2.length;
    }
    return path2.slice(start, end);
  }
  function dirname(path2) {
    assertPath(path2);
    if (path2.length === 0) {
      return ".";
    }
    let end = -1;
    let index2 = path2.length;
    let unmatchedSlash;
    while (--index2) {
      if (path2.charCodeAt(index2) === 47) {
        if (unmatchedSlash) {
          end = index2;
          break;
        }
      } else if (!unmatchedSlash) {
        unmatchedSlash = true;
      }
    }
    return end < 0 ? path2.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path2.charCodeAt(0) === 47 ? "//" : path2.slice(0, end);
  }
  function extname(path2) {
    assertPath(path2);
    let index2 = path2.length;
    let end = -1;
    let startPart = 0;
    let startDot = -1;
    let preDotState = 0;
    let unmatchedSlash;
    while (index2--) {
      const code2 = path2.charCodeAt(index2);
      if (code2 === 47) {
        if (unmatchedSlash) {
          startPart = index2 + 1;
          break;
        }
        continue;
      }
      if (end < 0) {
        unmatchedSlash = true;
        end = index2 + 1;
      }
      if (code2 === 46) {
        if (startDot < 0) {
          startDot = index2;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot > -1) {
        preDotState = -1;
      }
    }
    if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path2.slice(startDot, end);
  }
  function join(...segments) {
    let index2 = -1;
    let joined;
    while (++index2 < segments.length) {
      assertPath(segments[index2]);
      if (segments[index2]) {
        joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
      }
    }
    return joined === void 0 ? "." : normalize(joined);
  }
  function normalize(path2) {
    assertPath(path2);
    const absolute = path2.charCodeAt(0) === 47;
    let value = normalizeString(path2, !absolute);
    if (value.length === 0 && !absolute) {
      value = ".";
    }
    if (value.length > 0 && path2.charCodeAt(path2.length - 1) === 47) {
      value += "/";
    }
    return absolute ? "/" + value : value;
  }
  function normalizeString(path2, allowAboveRoot) {
    let result = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let index2 = -1;
    let code2;
    let lastSlashIndex;
    while (++index2 <= path2.length) {
      if (index2 < path2.length) {
        code2 = path2.charCodeAt(index2);
      } else if (code2 === 47) {
        break;
      } else {
        code2 = 47;
      }
      if (code2 === 47) {
        if (lastSlash === index2 - 1 || dots === 1) {
        } else if (lastSlash !== index2 - 1 && dots === 2) {
          if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
            if (result.length > 2) {
              lastSlashIndex = result.lastIndexOf("/");
              if (lastSlashIndex !== result.length - 1) {
                if (lastSlashIndex < 0) {
                  result = "";
                  lastSegmentLength = 0;
                } else {
                  result = result.slice(0, lastSlashIndex);
                  lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
                }
                lastSlash = index2;
                dots = 0;
                continue;
              }
            } else if (result.length > 0) {
              result = "";
              lastSegmentLength = 0;
              lastSlash = index2;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            result = result.length > 0 ? result + "/.." : "..";
            lastSegmentLength = 2;
          }
        } else {
          if (result.length > 0) {
            result += "/" + path2.slice(lastSlash + 1, index2);
          } else {
            result = path2.slice(lastSlash + 1, index2);
          }
          lastSegmentLength = index2 - lastSlash - 1;
        }
        lastSlash = index2;
        dots = 0;
      } else if (code2 === 46 && dots > -1) {
        dots++;
      } else {
        dots = -1;
      }
    }
    return result;
  }
  function assertPath(path2) {
    if (typeof path2 !== "string") {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
    }
  }
  var path;
  var init_minpath_browser = __esm({
    "example/.central/.central-build/node_modules/vfile/lib/minpath.browser.js"() {
      path = { basename, dirname, extname, join, sep: "/" };
    }
  });

  // example/.central/.central-build/node_modules/vfile/lib/minproc.browser.js
  function cwd() {
    return "/";
  }
  var proc;
  var init_minproc_browser = __esm({
    "example/.central/.central-build/node_modules/vfile/lib/minproc.browser.js"() {
      proc = { cwd };
    }
  });

  // example/.central/.central-build/node_modules/vfile/lib/minurl.shared.js
  function isUrl(fileURLOrPath) {
    return fileURLOrPath !== null && typeof fileURLOrPath === "object" && fileURLOrPath.href && fileURLOrPath.origin;
  }
  var init_minurl_shared = __esm({
    "example/.central/.central-build/node_modules/vfile/lib/minurl.shared.js"() {
    }
  });

  // example/.central/.central-build/node_modules/vfile/lib/minurl.browser.js
  function urlToPath(path2) {
    if (typeof path2 === "string") {
      path2 = new URL(path2);
    } else if (!isUrl(path2)) {
      const error = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + path2 + "`");
      error.code = "ERR_INVALID_ARG_TYPE";
      throw error;
    }
    if (path2.protocol !== "file:") {
      const error = new TypeError("The URL must be of scheme file");
      error.code = "ERR_INVALID_URL_SCHEME";
      throw error;
    }
    return getPathFromURLPosix(path2);
  }
  function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
      const error = new TypeError('File URL host must be "localhost" or empty on darwin');
      error.code = "ERR_INVALID_FILE_URL_HOST";
      throw error;
    }
    const pathname = url.pathname;
    let index2 = -1;
    while (++index2 < pathname.length) {
      if (pathname.charCodeAt(index2) === 37 && pathname.charCodeAt(index2 + 1) === 50) {
        const third = pathname.charCodeAt(index2 + 2);
        if (third === 70 || third === 102) {
          const error = new TypeError("File URL path must not include encoded / characters");
          error.code = "ERR_INVALID_FILE_URL_PATH";
          throw error;
        }
      }
    }
    return decodeURIComponent(pathname);
  }
  var init_minurl_browser = __esm({
    "example/.central/.central-build/node_modules/vfile/lib/minurl.browser.js"() {
      init_minurl_shared();
      init_minurl_shared();
    }
  });

  // example/.central/.central-build/node_modules/vfile/lib/index.js
  function assertPart(part, name) {
    if (part && part.includes(path.sep)) {
      throw new Error("`" + name + "` cannot be a path: did not expect `" + path.sep + "`");
    }
  }
  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error("`" + name + "` cannot be empty");
    }
  }
  function assertPath2(path2, name) {
    if (!path2) {
      throw new Error("Setting `" + name + "` requires `path` to be set too");
    }
  }
  var import_is_buffer, order, VFile;
  var init_lib = __esm({
    "example/.central/.central-build/node_modules/vfile/lib/index.js"() {
      import_is_buffer = __toModule(require_is_buffer());
      init_vfile_message();
      init_minpath_browser();
      init_minproc_browser();
      init_minurl_browser();
      order = ["history", "path", "basename", "stem", "extname", "dirname"];
      VFile = class {
        constructor(value) {
          let options;
          if (!value) {
            options = {};
          } else if (typeof value === "string" || (0, import_is_buffer.default)(value)) {
            options = { value };
          } else if (isUrl(value)) {
            options = { path: value };
          } else {
            options = value;
          }
          this.data = {};
          this.messages = [];
          this.history = [];
          this.cwd = proc.cwd();
          this.value;
          this.stored;
          this.result;
          this.map;
          let index2 = -1;
          while (++index2 < order.length) {
            const prop2 = order[index2];
            if (prop2 in options && options[prop2] !== void 0) {
              this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2];
            }
          }
          let prop;
          for (prop in options) {
            if (!order.includes(prop))
              this[prop] = options[prop];
          }
        }
        get path() {
          return this.history[this.history.length - 1];
        }
        set path(path2) {
          if (isUrl(path2)) {
            path2 = urlToPath(path2);
          }
          assertNonEmpty(path2, "path");
          if (this.path !== path2) {
            this.history.push(path2);
          }
        }
        get dirname() {
          return typeof this.path === "string" ? path.dirname(this.path) : void 0;
        }
        set dirname(dirname2) {
          assertPath2(this.basename, "dirname");
          this.path = path.join(dirname2 || "", this.basename);
        }
        get basename() {
          return typeof this.path === "string" ? path.basename(this.path) : void 0;
        }
        set basename(basename2) {
          assertNonEmpty(basename2, "basename");
          assertPart(basename2, "basename");
          this.path = path.join(this.dirname || "", basename2);
        }
        get extname() {
          return typeof this.path === "string" ? path.extname(this.path) : void 0;
        }
        set extname(extname2) {
          assertPart(extname2, "extname");
          assertPath2(this.dirname, "extname");
          if (extname2) {
            if (extname2.charCodeAt(0) !== 46) {
              throw new Error("`extname` must start with `.`");
            }
            if (extname2.includes(".", 1)) {
              throw new Error("`extname` cannot contain multiple dots");
            }
          }
          this.path = path.join(this.dirname, this.stem + (extname2 || ""));
        }
        get stem() {
          return typeof this.path === "string" ? path.basename(this.path, this.extname) : void 0;
        }
        set stem(stem) {
          assertNonEmpty(stem, "stem");
          assertPart(stem, "stem");
          this.path = path.join(this.dirname || "", stem + (this.extname || ""));
        }
        toString(encoding) {
          return (this.value || "").toString(encoding);
        }
        message(reason, place, origin) {
          const message = new VFileMessage(reason, place, origin);
          if (this.path) {
            message.name = this.path + ":" + message.name;
            message.file = this.path;
          }
          message.fatal = false;
          this.messages.push(message);
          return message;
        }
        info(reason, place, origin) {
          const message = this.message(reason, place, origin);
          message.fatal = null;
          return message;
        }
        fail(reason, place, origin) {
          const message = this.message(reason, place, origin);
          message.fatal = true;
          throw message;
        }
      };
    }
  });

  // example/.central/.central-build/node_modules/vfile/index.js
  var init_vfile = __esm({
    "example/.central/.central-build/node_modules/vfile/index.js"() {
      init_lib();
    }
  });

  // example/.central/.central-build/node_modules/bail/index.js
  function bail(error) {
    if (error) {
      throw error;
    }
  }
  var init_bail = __esm({
    "example/.central/.central-build/node_modules/bail/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/extend/index.js
  var require_extend = __commonJS({
    "example/.central/.central-build/node_modules/extend/index.js"(exports, module) {
      "use strict";
      var hasOwn = Object.prototype.hasOwnProperty;
      var toStr = Object.prototype.toString;
      var defineProperty = Object.defineProperty;
      var gOPD = Object.getOwnPropertyDescriptor;
      var isArray = function isArray2(arr) {
        if (typeof Array.isArray === "function") {
          return Array.isArray(arr);
        }
        return toStr.call(arr) === "[object Array]";
      };
      var isPlainObject2 = function isPlainObject3(obj) {
        if (!obj || toStr.call(obj) !== "[object Object]") {
          return false;
        }
        var hasOwnConstructor = hasOwn.call(obj, "constructor");
        var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
        if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
          return false;
        }
        var key;
        for (key in obj) {
        }
        return typeof key === "undefined" || hasOwn.call(obj, key);
      };
      var setProperty = function setProperty2(target, options) {
        if (defineProperty && options.name === "__proto__") {
          defineProperty(target, options.name, {
            enumerable: true,
            configurable: true,
            value: options.newValue,
            writable: true
          });
        } else {
          target[options.name] = options.newValue;
        }
      };
      var getProperty = function getProperty2(obj, name) {
        if (name === "__proto__") {
          if (!hasOwn.call(obj, name)) {
            return void 0;
          } else if (gOPD) {
            return gOPD(obj, name).value;
          }
        }
        return obj[name];
      };
      module.exports = function extend2() {
        var options, name, src, copy, copyIsArray, clone;
        var target = arguments[0];
        var i = 1;
        var length = arguments.length;
        var deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          i = 2;
        }
        if (target == null || typeof target !== "object" && typeof target !== "function") {
          target = {};
        }
        for (; i < length; ++i) {
          options = arguments[i];
          if (options != null) {
            for (name in options) {
              src = getProperty(target, name);
              copy = getProperty(options, name);
              if (target !== copy) {
                if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                  if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                  } else {
                    clone = src && isPlainObject2(src) ? src : {};
                  }
                  setProperty(target, { name, newValue: extend2(deep, clone, copy) });
                } else if (typeof copy !== "undefined") {
                  setProperty(target, { name, newValue: copy });
                }
              }
            }
          }
        }
        return target;
      };
    }
  });

  // example/.central/.central-build/node_modules/is-plain-obj/index.js
  function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  }
  var init_is_plain_obj = __esm({
    "example/.central/.central-build/node_modules/is-plain-obj/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/trough/index.js
  function trough() {
    const fns = [];
    const pipeline = { run, use };
    return pipeline;
    function run(...values) {
      let middlewareIndex = -1;
      const callback = values.pop();
      if (typeof callback !== "function") {
        throw new TypeError("Expected function as last argument, not " + callback);
      }
      next(null, ...values);
      function next(error, ...output) {
        const fn = fns[++middlewareIndex];
        let index2 = -1;
        if (error) {
          callback(error);
          return;
        }
        while (++index2 < values.length) {
          if (output[index2] === null || output[index2] === void 0) {
            output[index2] = values[index2];
          }
        }
        values = output;
        if (fn) {
          wrap(fn, next)(...output);
        } else {
          callback(null, ...output);
        }
      }
    }
    function use(middelware) {
      if (typeof middelware !== "function") {
        throw new TypeError("Expected `middelware` to be a function, not " + middelware);
      }
      fns.push(middelware);
      return pipeline;
    }
  }
  function wrap(middleware, callback) {
    let called;
    return wrapped;
    function wrapped(...parameters) {
      const fnExpectsCallback = middleware.length > parameters.length;
      let result;
      if (fnExpectsCallback) {
        parameters.push(done);
      }
      try {
        result = middleware.apply(this, parameters);
      } catch (error) {
        const exception = error;
        if (fnExpectsCallback && called) {
          throw exception;
        }
        return done(exception);
      }
      if (!fnExpectsCallback) {
        if (result instanceof Promise) {
          result.then(then, done);
        } else if (result instanceof Error) {
          done(result);
        } else {
          then(result);
        }
      }
    }
    function done(error, ...output) {
      if (!called) {
        called = true;
        callback(error, ...output);
      }
    }
    function then(value) {
      done(null, value);
    }
  }
  var init_trough = __esm({
    "example/.central/.central-build/node_modules/trough/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/unified/lib/index.js
  function base() {
    const transformers = trough();
    const attachers = [];
    let namespace = {};
    let frozen;
    let freezeIndex = -1;
    processor.data = data;
    processor.Parser = void 0;
    processor.Compiler = void 0;
    processor.freeze = freeze;
    processor.attachers = attachers;
    processor.use = use;
    processor.parse = parse2;
    processor.stringify = stringify3;
    processor.run = run;
    processor.runSync = runSync;
    processor.process = process2;
    processor.processSync = processSync;
    return processor;
    function processor() {
      const destination = base();
      let index2 = -1;
      while (++index2 < attachers.length) {
        destination.use(...attachers[index2]);
      }
      destination.data((0, import_extend.default)(true, {}, namespace));
      return destination;
    }
    function data(key, value) {
      if (typeof key === "string") {
        if (arguments.length === 2) {
          assertUnfrozen("data", frozen);
          namespace[key] = value;
          return processor;
        }
        return own.call(namespace, key) && namespace[key] || null;
      }
      if (key) {
        assertUnfrozen("data", frozen);
        namespace = key;
        return processor;
      }
      return namespace;
    }
    function freeze() {
      if (frozen) {
        return processor;
      }
      while (++freezeIndex < attachers.length) {
        const [attacher, ...options] = attachers[freezeIndex];
        if (options[0] === false) {
          continue;
        }
        if (options[0] === true) {
          options[0] = void 0;
        }
        const transformer = attacher.call(processor, ...options);
        if (typeof transformer === "function") {
          transformers.use(transformer);
        }
      }
      frozen = true;
      freezeIndex = Number.POSITIVE_INFINITY;
      return processor;
    }
    function use(value, ...options) {
      let settings;
      assertUnfrozen("use", frozen);
      if (value === null || value === void 0) {
      } else if (typeof value === "function") {
        addPlugin(value, ...options);
      } else if (typeof value === "object") {
        if (Array.isArray(value)) {
          addList(value);
        } else {
          addPreset(value);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value + "`");
      }
      if (settings) {
        namespace.settings = Object.assign(namespace.settings || {}, settings);
      }
      return processor;
      function add(value2) {
        if (typeof value2 === "function") {
          addPlugin(value2);
        } else if (typeof value2 === "object") {
          if (Array.isArray(value2)) {
            const [plugin, ...options2] = value2;
            addPlugin(plugin, ...options2);
          } else {
            addPreset(value2);
          }
        } else {
          throw new TypeError("Expected usable value, not `" + value2 + "`");
        }
      }
      function addPreset(result) {
        addList(result.plugins);
        if (result.settings) {
          settings = Object.assign(settings || {}, result.settings);
        }
      }
      function addList(plugins) {
        let index2 = -1;
        if (plugins === null || plugins === void 0) {
        } else if (Array.isArray(plugins)) {
          while (++index2 < plugins.length) {
            const thing = plugins[index2];
            add(thing);
          }
        } else {
          throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
        }
      }
      function addPlugin(plugin, value2) {
        let index2 = -1;
        let entry;
        while (++index2 < attachers.length) {
          if (attachers[index2][0] === plugin) {
            entry = attachers[index2];
            break;
          }
        }
        if (entry) {
          if (isPlainObject(entry[1]) && isPlainObject(value2)) {
            value2 = (0, import_extend.default)(true, entry[1], value2);
          }
          entry[1] = value2;
        } else {
          attachers.push([...arguments]);
        }
      }
    }
    function parse2(doc) {
      processor.freeze();
      const file = vfile(doc);
      const Parser = processor.Parser;
      assertParser("parse", Parser);
      if (newable(Parser, "parse")) {
        return new Parser(String(file), file).parse();
      }
      return Parser(String(file), file);
    }
    function stringify3(node, doc) {
      processor.freeze();
      const file = vfile(doc);
      const Compiler = processor.Compiler;
      assertCompiler("stringify", Compiler);
      assertNode(node);
      if (newable(Compiler, "compile")) {
        return new Compiler(node, file).compile();
      }
      return Compiler(node, file);
    }
    function run(node, doc, callback) {
      assertNode(node);
      processor.freeze();
      if (!callback && typeof doc === "function") {
        callback = doc;
        doc = void 0;
      }
      if (!callback) {
        return new Promise(executor);
      }
      executor(null, callback);
      function executor(resolve, reject) {
        transformers.run(node, vfile(doc), done);
        function done(error, tree, file) {
          tree = tree || node;
          if (error) {
            reject(error);
          } else if (resolve) {
            resolve(tree);
          } else {
            callback(null, tree, file);
          }
        }
      }
    }
    function runSync(node, file) {
      let result;
      let complete;
      processor.run(node, file, done);
      assertDone("runSync", "run", complete);
      return result;
      function done(error, tree) {
        bail(error);
        result = tree;
        complete = true;
      }
    }
    function process2(doc, callback) {
      processor.freeze();
      assertParser("process", processor.Parser);
      assertCompiler("process", processor.Compiler);
      if (!callback) {
        return new Promise(executor);
      }
      executor(null, callback);
      function executor(resolve, reject) {
        const file = vfile(doc);
        processor.run(processor.parse(file), file, (error, tree, file2) => {
          if (error || !tree || !file2) {
            done(error);
          } else {
            const result = processor.stringify(tree, file2);
            if (result === void 0 || result === null) {
            } else if (looksLikeAVFileValue(result)) {
              file2.value = result;
            } else {
              file2.result = result;
            }
            done(error, file2);
          }
        });
        function done(error, file2) {
          if (error || !file2) {
            reject(error);
          } else if (resolve) {
            resolve(file2);
          } else {
            callback(null, file2);
          }
        }
      }
    }
    function processSync(doc) {
      let complete;
      processor.freeze();
      assertParser("processSync", processor.Parser);
      assertCompiler("processSync", processor.Compiler);
      const file = vfile(doc);
      processor.process(file, done);
      assertDone("processSync", "process", complete);
      return file;
      function done(error) {
        complete = true;
        bail(error);
      }
    }
  }
  function newable(value, name) {
    return typeof value === "function" && value.prototype && (keys(value.prototype) || name in value.prototype);
  }
  function keys(value) {
    let key;
    for (key in value) {
      if (own.call(value, key)) {
        return true;
      }
    }
    return false;
  }
  function assertParser(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `Parser`");
    }
  }
  function assertCompiler(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `Compiler`");
    }
  }
  function assertUnfrozen(name, frozen) {
    if (frozen) {
      throw new Error("Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
    }
  }
  function assertNode(node) {
    if (!isPlainObject(node) || typeof node.type !== "string") {
      throw new TypeError("Expected node, got `" + node + "`");
    }
  }
  function assertDone(name, asyncName, complete) {
    if (!complete) {
      throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
    }
  }
  function vfile(value) {
    return looksLikeAVFile(value) ? value : new VFile(value);
  }
  function looksLikeAVFile(value) {
    return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
  }
  function looksLikeAVFileValue(value) {
    return typeof value === "string" || (0, import_is_buffer2.default)(value);
  }
  var import_is_buffer2, import_extend, unified, own;
  var init_lib2 = __esm({
    "example/.central/.central-build/node_modules/unified/lib/index.js"() {
      init_bail();
      import_is_buffer2 = __toModule(require_is_buffer());
      import_extend = __toModule(require_extend());
      init_is_plain_obj();
      init_trough();
      init_vfile();
      unified = base().freeze();
      own = {}.hasOwnProperty;
    }
  });

  // example/.central/.central-build/node_modules/unified/index.js
  var init_unified = __esm({
    "example/.central/.central-build/node_modules/unified/index.js"() {
      init_lib2();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-string/index.js
  function toString(node, options) {
    var { includeImageAlt = true } = options || {};
    return one(node, includeImageAlt);
  }
  function one(node, includeImageAlt) {
    return node && typeof node === "object" && (node.value || (includeImageAlt ? node.alt : "") || "children" in node && all(node.children, includeImageAlt) || Array.isArray(node) && all(node, includeImageAlt)) || "";
  }
  function all(values, includeImageAlt) {
    var result = [];
    var index2 = -1;
    while (++index2 < values.length) {
      result[index2] = one(values[index2], includeImageAlt);
    }
    return result.join("");
  }
  var init_mdast_util_to_string = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-string/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-chunked/index.js
  function splice(list3, start, remove, items) {
    const end = list3.length;
    let chunkStart = 0;
    let parameters;
    if (start < 0) {
      start = -start > end ? 0 : end + start;
    } else {
      start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    if (items.length < 1e4) {
      parameters = Array.from(items);
      parameters.unshift(start, remove);
      [].splice.apply(list3, parameters);
    } else {
      if (remove)
        [].splice.apply(list3, [start, remove]);
      while (chunkStart < items.length) {
        parameters = items.slice(chunkStart, chunkStart + 1e4);
        parameters.unshift(start, 0);
        [].splice.apply(list3, parameters);
        chunkStart += 1e4;
        start += 1e4;
      }
    }
  }
  function push(list3, items) {
    if (list3.length > 0) {
      splice(list3, list3.length, 0, items);
      return list3;
    }
    return items;
  }
  var init_micromark_util_chunked = __esm({
    "example/.central/.central-build/node_modules/micromark-util-chunked/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-combine-extensions/index.js
  function combineExtensions(extensions) {
    const all3 = {};
    let index2 = -1;
    while (++index2 < extensions.length) {
      syntaxExtension(all3, extensions[index2]);
    }
    return all3;
  }
  function syntaxExtension(all3, extension2) {
    let hook;
    for (hook in extension2) {
      const maybe = hasOwnProperty.call(all3, hook) ? all3[hook] : void 0;
      const left = maybe || (all3[hook] = {});
      const right = extension2[hook];
      let code2;
      for (code2 in right) {
        if (!hasOwnProperty.call(left, code2))
          left[code2] = [];
        const value = right[code2];
        constructs(left[code2], Array.isArray(value) ? value : value ? [value] : []);
      }
    }
  }
  function constructs(existing, list3) {
    let index2 = -1;
    const before = [];
    while (++index2 < list3.length) {
      ;
      (list3[index2].add === "after" ? existing : before).push(list3[index2]);
    }
    splice(existing, 0, 0, before);
  }
  var hasOwnProperty;
  var init_micromark_util_combine_extensions = __esm({
    "example/.central/.central-build/node_modules/micromark-util-combine-extensions/index.js"() {
      init_micromark_util_chunked();
      hasOwnProperty = {}.hasOwnProperty;
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
  var unicodePunctuationRegex;
  var init_unicode_punctuation_regex = __esm({
    "example/.central/.central-build/node_modules/micromark-util-character/lib/unicode-punctuation-regex.js"() {
      unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-character/index.js
  function asciiControl(code2) {
    return code2 !== null && (code2 < 32 || code2 === 127);
  }
  function markdownLineEndingOrSpace(code2) {
    return code2 !== null && (code2 < 0 || code2 === 32);
  }
  function markdownLineEnding(code2) {
    return code2 !== null && code2 < -2;
  }
  function markdownSpace(code2) {
    return code2 === -2 || code2 === -1 || code2 === 32;
  }
  function regexCheck(regex) {
    return check;
    function check(code2) {
      return code2 !== null && regex.test(String.fromCharCode(code2));
    }
  }
  var asciiAlpha, asciiDigit, asciiHexDigit, asciiAlphanumeric, asciiPunctuation, asciiAtext, unicodeWhitespace, unicodePunctuation;
  var init_micromark_util_character = __esm({
    "example/.central/.central-build/node_modules/micromark-util-character/index.js"() {
      init_unicode_punctuation_regex();
      asciiAlpha = regexCheck(/[A-Za-z]/);
      asciiDigit = regexCheck(/\d/);
      asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
      asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
      asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
      asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
      unicodeWhitespace = regexCheck(/\s/);
      unicodePunctuation = regexCheck(unicodePunctuationRegex);
    }
  });

  // example/.central/.central-build/node_modules/micromark-factory-space/index.js
  function factorySpace(effects, ok2, type, max) {
    const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
    let size = 0;
    return start;
    function start(code2) {
      if (markdownSpace(code2)) {
        effects.enter(type);
        return prefix(code2);
      }
      return ok2(code2);
    }
    function prefix(code2) {
      if (markdownSpace(code2) && size++ < limit) {
        effects.consume(code2);
        return prefix;
      }
      effects.exit(type);
      return ok2(code2);
    }
  }
  var init_micromark_factory_space = __esm({
    "example/.central/.central-build/node_modules/micromark-factory-space/index.js"() {
      init_micromark_util_character();
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/initialize/content.js
  function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    let previous2;
    return contentStart;
    function afterContentStartConstruct(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, contentStart, "linePrefix");
    }
    function paragraphInitial(code2) {
      effects.enter("paragraph");
      return lineStart(code2);
    }
    function lineStart(code2) {
      const token = effects.enter("chunkText", {
        contentType: "text",
        previous: previous2
      });
      if (previous2) {
        previous2.next = token;
      }
      previous2 = token;
      return data(code2);
    }
    function data(code2) {
      if (code2 === null) {
        effects.exit("chunkText");
        effects.exit("paragraph");
        effects.consume(code2);
        return;
      }
      if (markdownLineEnding(code2)) {
        effects.consume(code2);
        effects.exit("chunkText");
        return lineStart;
      }
      effects.consume(code2);
      return data;
    }
  }
  var content;
  var init_content = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/initialize/content.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      content = {
        tokenize: initializeContent
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/initialize/document.js
  function initializeDocument(effects) {
    const self = this;
    const stack = [];
    let continued = 0;
    let childFlow;
    let childToken;
    let lineStartOffset;
    return start;
    function start(code2) {
      if (continued < stack.length) {
        const item = stack[continued];
        self.containerState = item[1];
        return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code2);
      }
      return checkNewContainers(code2);
    }
    function documentContinue(code2) {
      continued++;
      if (self.containerState._closeFlow) {
        self.containerState._closeFlow = void 0;
        if (childFlow) {
          closeFlow();
        }
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let point3;
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
            point3 = self.events[indexBeforeFlow][1].end;
            break;
          }
        }
        exitContainers(continued);
        let index2 = indexBeforeExits;
        while (index2 < self.events.length) {
          self.events[index2][1].end = Object.assign({}, point3);
          index2++;
        }
        splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        self.events.length = index2;
        return checkNewContainers(code2);
      }
      return start(code2);
    }
    function checkNewContainers(code2) {
      if (continued === stack.length) {
        if (!childFlow) {
          return documentContinued(code2);
        }
        if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
          return flowStart(code2);
        }
        self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
      }
      self.containerState = {};
      return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code2);
    }
    function thereIsANewContainer(code2) {
      if (childFlow)
        closeFlow();
      exitContainers(continued);
      return documentContinued(code2);
    }
    function thereIsNoNewContainer(code2) {
      self.parser.lazy[self.now().line] = continued !== stack.length;
      lineStartOffset = self.now().offset;
      return flowStart(code2);
    }
    function documentContinued(code2) {
      self.containerState = {};
      return effects.attempt(containerConstruct, containerContinue, flowStart)(code2);
    }
    function containerContinue(code2) {
      continued++;
      stack.push([self.currentConstruct, self.containerState]);
      return documentContinued(code2);
    }
    function flowStart(code2) {
      if (code2 === null) {
        if (childFlow)
          closeFlow();
        exitContainers(0);
        effects.consume(code2);
        return;
      }
      childFlow = childFlow || self.parser.flow(self.now());
      effects.enter("chunkFlow", {
        contentType: "flow",
        previous: childToken,
        _tokenizer: childFlow
      });
      return flowContinue(code2);
    }
    function flowContinue(code2) {
      if (code2 === null) {
        writeToChild(effects.exit("chunkFlow"), true);
        exitContainers(0);
        effects.consume(code2);
        return;
      }
      if (markdownLineEnding(code2)) {
        effects.consume(code2);
        writeToChild(effects.exit("chunkFlow"));
        continued = 0;
        self.interrupt = void 0;
        return start;
      }
      effects.consume(code2);
      return flowContinue;
    }
    function writeToChild(token, eof) {
      const stream = self.sliceStream(token);
      if (eof)
        stream.push(null);
      token.previous = childToken;
      if (childToken)
        childToken.next = token;
      childToken = token;
      childFlow.defineSkip(token.start);
      childFlow.write(stream);
      if (self.parser.lazy[token.start.line]) {
        let index2 = childFlow.events.length;
        while (index2--) {
          if (childFlow.events[index2][1].start.offset < lineStartOffset && (!childFlow.events[index2][1].end || childFlow.events[index2][1].end.offset > lineStartOffset)) {
            return;
          }
        }
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let seen;
        let point3;
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
            if (seen) {
              point3 = self.events[indexBeforeFlow][1].end;
              break;
            }
            seen = true;
          }
        }
        exitContainers(continued);
        index2 = indexBeforeExits;
        while (index2 < self.events.length) {
          self.events[index2][1].end = Object.assign({}, point3);
          index2++;
        }
        splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        self.events.length = index2;
      }
    }
    function exitContainers(size) {
      let index2 = stack.length;
      while (index2-- > size) {
        const entry = stack[index2];
        self.containerState = entry[1];
        entry[0].exit.call(self, effects);
      }
      stack.length = size;
    }
    function closeFlow() {
      childFlow.write([null]);
      childToken = void 0;
      childFlow = void 0;
      self.containerState._closeFlow = void 0;
    }
  }
  function tokenizeContainer(effects, ok2, nok) {
    return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
  }
  var document2, containerConstruct;
  var init_document = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/initialize/document.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_micromark_util_chunked();
      document2 = {
        tokenize: initializeDocument
      };
      containerConstruct = {
        tokenize: tokenizeContainer
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-classify-character/index.js
  function classifyCharacter(code2) {
    if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
      return 1;
    }
    if (unicodePunctuation(code2)) {
      return 2;
    }
  }
  var init_micromark_util_classify_character = __esm({
    "example/.central/.central-build/node_modules/micromark-util-classify-character/index.js"() {
      init_micromark_util_character();
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-resolve-all/index.js
  function resolveAll(constructs2, events, context) {
    const called = [];
    let index2 = -1;
    while (++index2 < constructs2.length) {
      const resolve = constructs2[index2].resolveAll;
      if (resolve && !called.includes(resolve)) {
        events = resolve(events, context);
        called.push(resolve);
      }
    }
    return events;
  }
  var init_micromark_util_resolve_all = __esm({
    "example/.central/.central-build/node_modules/micromark-util-resolve-all/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/attention.js
  function resolveAllAttention(events, context) {
    let index2 = -1;
    let open;
    let group;
    let text4;
    let openingSequence;
    let closingSequence;
    let use;
    let nextEvents;
    let offset;
    while (++index2 < events.length) {
      if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
        open = index2;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
            if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
              continue;
            }
            use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
            const start = Object.assign({}, events[open][1].end);
            const end = Object.assign({}, events[index2][1].start);
            movePoint(start, -use);
            movePoint(end, use);
            openingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start,
              end: Object.assign({}, events[open][1].end)
            };
            closingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start: Object.assign({}, events[index2][1].start),
              end
            };
            text4 = {
              type: use > 1 ? "strongText" : "emphasisText",
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index2][1].start)
            };
            group = {
              type: use > 1 ? "strong" : "emphasis",
              start: Object.assign({}, openingSequence.start),
              end: Object.assign({}, closingSequence.end)
            };
            events[open][1].end = Object.assign({}, openingSequence.start);
            events[index2][1].start = Object.assign({}, closingSequence.end);
            nextEvents = [];
            if (events[open][1].end.offset - events[open][1].start.offset) {
              nextEvents = push(nextEvents, [
                ["enter", events[open][1], context],
                ["exit", events[open][1], context]
              ]);
            }
            nextEvents = push(nextEvents, [
              ["enter", group, context],
              ["enter", openingSequence, context],
              ["exit", openingSequence, context],
              ["enter", text4, context]
            ]);
            nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index2), context));
            nextEvents = push(nextEvents, [
              ["exit", text4, context],
              ["enter", closingSequence, context],
              ["exit", closingSequence, context],
              ["exit", group, context]
            ]);
            if (events[index2][1].end.offset - events[index2][1].start.offset) {
              offset = 2;
              nextEvents = push(nextEvents, [
                ["enter", events[index2][1], context],
                ["exit", events[index2][1], context]
              ]);
            } else {
              offset = 0;
            }
            splice(events, open - 1, index2 - open + 3, nextEvents);
            index2 = open + nextEvents.length - offset - 2;
            break;
          }
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "attentionSequence") {
        events[index2][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeAttention(effects, ok2) {
    const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
    const previous2 = this.previous;
    const before = classifyCharacter(previous2);
    let marker;
    return start;
    function start(code2) {
      effects.enter("attentionSequence");
      marker = code2;
      return sequence(code2);
    }
    function sequence(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        return sequence;
      }
      const token = effects.exit("attentionSequence");
      const after = classifyCharacter(code2);
      const open = !after || after === 2 && before || attentionMarkers2.includes(code2);
      const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
      token._open = Boolean(marker === 42 ? open : open && (before || !close));
      token._close = Boolean(marker === 42 ? close : close && (after || !open));
      return ok2(code2);
    }
  }
  function movePoint(point3, offset) {
    point3.column += offset;
    point3.offset += offset;
    point3._bufferIndex += offset;
  }
  var attention;
  var init_attention = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/attention.js"() {
      init_micromark_util_chunked();
      init_micromark_util_classify_character();
      init_micromark_util_resolve_all();
      attention = {
        name: "attention",
        tokenize: tokenizeAttention,
        resolveAll: resolveAllAttention
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/autolink.js
  function tokenizeAutolink(effects, ok2, nok) {
    let size = 1;
    return start;
    function start(code2) {
      effects.enter("autolink");
      effects.enter("autolinkMarker");
      effects.consume(code2);
      effects.exit("autolinkMarker");
      effects.enter("autolinkProtocol");
      return open;
    }
    function open(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return schemeOrEmailAtext;
      }
      return asciiAtext(code2) ? emailAtext(code2) : nok(code2);
    }
    function schemeOrEmailAtext(code2) {
      return code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2) ? schemeInsideOrEmailAtext(code2) : emailAtext(code2);
    }
    function schemeInsideOrEmailAtext(code2) {
      if (code2 === 58) {
        effects.consume(code2);
        return urlInside;
      }
      if ((code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) && size++ < 32) {
        effects.consume(code2);
        return schemeInsideOrEmailAtext;
      }
      return emailAtext(code2);
    }
    function urlInside(code2) {
      if (code2 === 62) {
        effects.exit("autolinkProtocol");
        return end(code2);
      }
      if (code2 === null || code2 === 32 || code2 === 60 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return urlInside;
    }
    function emailAtext(code2) {
      if (code2 === 64) {
        effects.consume(code2);
        size = 0;
        return emailAtSignOrDot;
      }
      if (asciiAtext(code2)) {
        effects.consume(code2);
        return emailAtext;
      }
      return nok(code2);
    }
    function emailAtSignOrDot(code2) {
      return asciiAlphanumeric(code2) ? emailLabel(code2) : nok(code2);
    }
    function emailLabel(code2) {
      if (code2 === 46) {
        effects.consume(code2);
        size = 0;
        return emailAtSignOrDot;
      }
      if (code2 === 62) {
        effects.exit("autolinkProtocol").type = "autolinkEmail";
        return end(code2);
      }
      return emailValue(code2);
    }
    function emailValue(code2) {
      if ((code2 === 45 || asciiAlphanumeric(code2)) && size++ < 63) {
        effects.consume(code2);
        return code2 === 45 ? emailValue : emailLabel;
      }
      return nok(code2);
    }
    function end(code2) {
      effects.enter("autolinkMarker");
      effects.consume(code2);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok2;
    }
  }
  var autolink;
  var init_autolink = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/autolink.js"() {
      init_micromark_util_character();
      autolink = {
        name: "autolink",
        tokenize: tokenizeAutolink
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/blank-line.js
  function tokenizeBlankLine(effects, ok2, nok) {
    return factorySpace(effects, afterWhitespace, "linePrefix");
    function afterWhitespace(code2) {
      return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
    }
  }
  var blankLine;
  var init_blank_line = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/blank-line.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      blankLine = {
        tokenize: tokenizeBlankLine,
        partial: true
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/block-quote.js
  function tokenizeBlockQuoteStart(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      if (code2 === 62) {
        const state = self.containerState;
        if (!state.open) {
          effects.enter("blockQuote", {
            _container: true
          });
          state.open = true;
        }
        effects.enter("blockQuotePrefix");
        effects.enter("blockQuoteMarker");
        effects.consume(code2);
        effects.exit("blockQuoteMarker");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      if (markdownSpace(code2)) {
        effects.enter("blockQuotePrefixWhitespace");
        effects.consume(code2);
        effects.exit("blockQuotePrefixWhitespace");
        effects.exit("blockQuotePrefix");
        return ok2;
      }
      effects.exit("blockQuotePrefix");
      return ok2(code2);
    }
  }
  function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
    return factorySpace(effects, effects.attempt(blockQuote, ok2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
  }
  function exit(effects) {
    effects.exit("blockQuote");
  }
  var blockQuote;
  var init_block_quote = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/block-quote.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      blockQuote = {
        name: "blockQuote",
        tokenize: tokenizeBlockQuoteStart,
        continuation: {
          tokenize: tokenizeBlockQuoteContinuation
        },
        exit
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/character-escape.js
  function tokenizeCharacterEscape(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("characterEscape");
      effects.enter("escapeMarker");
      effects.consume(code2);
      effects.exit("escapeMarker");
      return open;
    }
    function open(code2) {
      if (asciiPunctuation(code2)) {
        effects.enter("characterEscapeValue");
        effects.consume(code2);
        effects.exit("characterEscapeValue");
        effects.exit("characterEscape");
        return ok2;
      }
      return nok(code2);
    }
  }
  var characterEscape;
  var init_character_escape = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/character-escape.js"() {
      init_micromark_util_character();
      characterEscape = {
        name: "characterEscape",
        tokenize: tokenizeCharacterEscape
      };
    }
  });

  // example/.central/.central-build/node_modules/decode-named-character-reference/index.dom.js
  function decodeNamedCharacterReference(value) {
    const characterReference2 = "&" + value + ";";
    element.innerHTML = characterReference2;
    const char = element.textContent;
    if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
      return false;
    }
    return char === characterReference2 ? false : char;
  }
  var element;
  var init_index_dom = __esm({
    "example/.central/.central-build/node_modules/decode-named-character-reference/index.dom.js"() {
      element = document.createElement("i");
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/character-reference.js
  function tokenizeCharacterReference(effects, ok2, nok) {
    const self = this;
    let size = 0;
    let max;
    let test;
    return start;
    function start(code2) {
      effects.enter("characterReference");
      effects.enter("characterReferenceMarker");
      effects.consume(code2);
      effects.exit("characterReferenceMarker");
      return open;
    }
    function open(code2) {
      if (code2 === 35) {
        effects.enter("characterReferenceMarkerNumeric");
        effects.consume(code2);
        effects.exit("characterReferenceMarkerNumeric");
        return numeric;
      }
      effects.enter("characterReferenceValue");
      max = 31;
      test = asciiAlphanumeric;
      return value(code2);
    }
    function numeric(code2) {
      if (code2 === 88 || code2 === 120) {
        effects.enter("characterReferenceMarkerHexadecimal");
        effects.consume(code2);
        effects.exit("characterReferenceMarkerHexadecimal");
        effects.enter("characterReferenceValue");
        max = 6;
        test = asciiHexDigit;
        return value;
      }
      effects.enter("characterReferenceValue");
      max = 7;
      test = asciiDigit;
      return value(code2);
    }
    function value(code2) {
      let token;
      if (code2 === 59 && size) {
        token = effects.exit("characterReferenceValue");
        if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
          return nok(code2);
        }
        effects.enter("characterReferenceMarker");
        effects.consume(code2);
        effects.exit("characterReferenceMarker");
        effects.exit("characterReference");
        return ok2;
      }
      if (test(code2) && size++ < max) {
        effects.consume(code2);
        return value;
      }
      return nok(code2);
    }
  }
  var characterReference;
  var init_character_reference = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/character-reference.js"() {
      init_index_dom();
      init_micromark_util_character();
      characterReference = {
        name: "characterReference",
        tokenize: tokenizeCharacterReference
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/code-fenced.js
  function tokenizeCodeFenced(effects, ok2, nok) {
    const self = this;
    const closingFenceConstruct = {
      tokenize: tokenizeClosingFence,
      partial: true
    };
    const nonLazyLine = {
      tokenize: tokenizeNonLazyLine,
      partial: true
    };
    const tail = this.events[this.events.length - 1];
    const initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    let sizeOpen = 0;
    let marker;
    return start;
    function start(code2) {
      effects.enter("codeFenced");
      effects.enter("codeFencedFence");
      effects.enter("codeFencedFenceSequence");
      marker = code2;
      return sequenceOpen(code2);
    }
    function sequenceOpen(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        sizeOpen++;
        return sequenceOpen;
      }
      effects.exit("codeFencedFenceSequence");
      return sizeOpen < 3 ? nok(code2) : factorySpace(effects, infoOpen, "whitespace")(code2);
    }
    function infoOpen(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return openAfter(code2);
      }
      effects.enter("codeFencedFenceInfo");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return info(code2);
    }
    function info(code2) {
      if (code2 === null || markdownLineEndingOrSpace(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return factorySpace(effects, infoAfter, "whitespace")(code2);
      }
      if (code2 === 96 && code2 === marker)
        return nok(code2);
      effects.consume(code2);
      return info;
    }
    function infoAfter(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return openAfter(code2);
      }
      effects.enter("codeFencedFenceMeta");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return meta(code2);
    }
    function meta(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceMeta");
        return openAfter(code2);
      }
      if (code2 === 96 && code2 === marker)
        return nok(code2);
      effects.consume(code2);
      return meta;
    }
    function openAfter(code2) {
      effects.exit("codeFencedFence");
      return self.interrupt ? ok2(code2) : contentStart(code2);
    }
    function contentStart(code2) {
      if (code2 === null) {
        return after(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.attempt(nonLazyLine, effects.attempt(closingFenceConstruct, after, initialPrefix ? factorySpace(effects, contentStart, "linePrefix", initialPrefix + 1) : contentStart), after)(code2);
      }
      effects.enter("codeFlowValue");
      return contentContinue(code2);
    }
    function contentContinue(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFlowValue");
        return contentStart(code2);
      }
      effects.consume(code2);
      return contentContinue;
    }
    function after(code2) {
      effects.exit("codeFenced");
      return ok2(code2);
    }
    function tokenizeNonLazyLine(effects2, ok3, nok2) {
      const self2 = this;
      return start2;
      function start2(code2) {
        effects2.enter("lineEnding");
        effects2.consume(code2);
        effects2.exit("lineEnding");
        return lineStart;
      }
      function lineStart(code2) {
        return self2.parser.lazy[self2.now().line] ? nok2(code2) : ok3(code2);
      }
    }
    function tokenizeClosingFence(effects2, ok3, nok2) {
      let size = 0;
      return factorySpace(effects2, closingSequenceStart, "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
      function closingSequenceStart(code2) {
        effects2.enter("codeFencedFence");
        effects2.enter("codeFencedFenceSequence");
        return closingSequence(code2);
      }
      function closingSequence(code2) {
        if (code2 === marker) {
          effects2.consume(code2);
          size++;
          return closingSequence;
        }
        if (size < sizeOpen)
          return nok2(code2);
        effects2.exit("codeFencedFenceSequence");
        return factorySpace(effects2, closingSequenceEnd, "whitespace")(code2);
      }
      function closingSequenceEnd(code2) {
        if (code2 === null || markdownLineEnding(code2)) {
          effects2.exit("codeFencedFence");
          return ok3(code2);
        }
        return nok2(code2);
      }
    }
  }
  var codeFenced;
  var init_code_fenced = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/code-fenced.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      codeFenced = {
        name: "codeFenced",
        tokenize: tokenizeCodeFenced,
        concrete: true
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/code-indented.js
  function tokenizeCodeIndented(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      effects.enter("codeIndented");
      return factorySpace(effects, afterStartPrefix, "linePrefix", 4 + 1)(code2);
    }
    function afterStartPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? afterPrefix(code2) : nok(code2);
    }
    function afterPrefix(code2) {
      if (code2 === null) {
        return after(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.attempt(indentedContent, afterPrefix, after)(code2);
      }
      effects.enter("codeFlowValue");
      return content3(code2);
    }
    function content3(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFlowValue");
        return afterPrefix(code2);
      }
      effects.consume(code2);
      return content3;
    }
    function after(code2) {
      effects.exit("codeIndented");
      return ok2(code2);
    }
  }
  function tokenizeIndentedContent(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      if (self.parser.lazy[self.now().line]) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return start;
      }
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
    }
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok2(code2) : markdownLineEnding(code2) ? start(code2) : nok(code2);
    }
  }
  var codeIndented, indentedContent;
  var init_code_indented = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/code-indented.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      codeIndented = {
        name: "codeIndented",
        tokenize: tokenizeCodeIndented
      };
      indentedContent = {
        tokenize: tokenizeIndentedContent,
        partial: true
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/code-text.js
  function resolveCodeText(events) {
    let tailExitIndex = events.length - 4;
    let headEnterIndex = 3;
    let index2;
    let enter;
    if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
      index2 = headEnterIndex;
      while (++index2 < tailExitIndex) {
        if (events[index2][1].type === "codeTextData") {
          events[headEnterIndex][1].type = "codeTextPadding";
          events[tailExitIndex][1].type = "codeTextPadding";
          headEnterIndex += 2;
          tailExitIndex -= 2;
          break;
        }
      }
    }
    index2 = headEnterIndex - 1;
    tailExitIndex++;
    while (++index2 <= tailExitIndex) {
      if (enter === void 0) {
        if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
          enter = index2;
        }
      } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
        events[enter][1].type = "codeTextData";
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          tailExitIndex -= index2 - enter - 2;
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return events;
  }
  function previous(code2) {
    return code2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  function tokenizeCodeText(effects, ok2, nok) {
    const self = this;
    let sizeOpen = 0;
    let size;
    let token;
    return start;
    function start(code2) {
      effects.enter("codeText");
      effects.enter("codeTextSequence");
      return openingSequence(code2);
    }
    function openingSequence(code2) {
      if (code2 === 96) {
        effects.consume(code2);
        sizeOpen++;
        return openingSequence;
      }
      effects.exit("codeTextSequence");
      return gap(code2);
    }
    function gap(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 96) {
        token = effects.enter("codeTextSequence");
        size = 0;
        return closingSequence(code2);
      }
      if (code2 === 32) {
        effects.enter("space");
        effects.consume(code2);
        effects.exit("space");
        return gap;
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return gap;
      }
      effects.enter("codeTextData");
      return data(code2);
    }
    function data(code2) {
      if (code2 === null || code2 === 32 || code2 === 96 || markdownLineEnding(code2)) {
        effects.exit("codeTextData");
        return gap(code2);
      }
      effects.consume(code2);
      return data;
    }
    function closingSequence(code2) {
      if (code2 === 96) {
        effects.consume(code2);
        size++;
        return closingSequence;
      }
      if (size === sizeOpen) {
        effects.exit("codeTextSequence");
        effects.exit("codeText");
        return ok2(code2);
      }
      token.type = "codeTextData";
      return data(code2);
    }
  }
  var codeText;
  var init_code_text = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/code-text.js"() {
      init_micromark_util_character();
      codeText = {
        name: "codeText",
        tokenize: tokenizeCodeText,
        resolve: resolveCodeText,
        previous
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-subtokenize/index.js
  function subtokenize(events) {
    const jumps = {};
    let index2 = -1;
    let event;
    let lineIndex;
    let otherIndex;
    let otherEvent;
    let parameters;
    let subevents;
    let more;
    while (++index2 < events.length) {
      while (index2 in jumps) {
        index2 = jumps[index2];
      }
      event = events[index2];
      if (index2 && event[1].type === "chunkFlow" && events[index2 - 1][1].type === "listItemPrefix") {
        subevents = event[1]._tokenizer.events;
        otherIndex = 0;
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
          otherIndex += 2;
        }
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
          while (++otherIndex < subevents.length) {
            if (subevents[otherIndex][1].type === "content") {
              break;
            }
            if (subevents[otherIndex][1].type === "chunkText") {
              subevents[otherIndex][1]._isInFirstContentOfListItem = true;
              otherIndex++;
            }
          }
        }
      }
      if (event[0] === "enter") {
        if (event[1].contentType) {
          Object.assign(jumps, subcontent(events, index2));
          index2 = jumps[index2];
          more = true;
        }
      } else if (event[1]._container) {
        otherIndex = index2;
        lineIndex = void 0;
        while (otherIndex--) {
          otherEvent = events[otherIndex];
          if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
            if (otherEvent[0] === "enter") {
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
              }
              otherEvent[1].type = "lineEnding";
              lineIndex = otherIndex;
            }
          } else {
            break;
          }
        }
        if (lineIndex) {
          event[1].end = Object.assign({}, events[lineIndex][1].start);
          parameters = events.slice(lineIndex, index2);
          parameters.unshift(event);
          splice(events, lineIndex, index2 - lineIndex + 1, parameters);
        }
      }
    }
    return !more;
  }
  function subcontent(events, eventIndex) {
    const token = events[eventIndex][1];
    const context = events[eventIndex][2];
    let startPosition = eventIndex - 1;
    const startPositions = [];
    const tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
    const childEvents = tokenizer.events;
    const jumps = [];
    const gaps = {};
    let stream;
    let previous2;
    let index2 = -1;
    let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [start];
    while (current) {
      while (events[++startPosition][1] !== current) {
      }
      startPositions.push(startPosition);
      if (!current._tokenizer) {
        stream = context.sliceStream(current);
        if (!current.next) {
          stream.push(null);
        }
        if (previous2) {
          tokenizer.defineSkip(current.start);
        }
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = true;
        }
        tokenizer.write(stream);
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = void 0;
        }
      }
      previous2 = current;
      current = current.next;
    }
    current = token;
    while (++index2 < childEvents.length) {
      if (childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line) {
        start = index2 + 1;
        breaks.push(start);
        current._tokenizer = void 0;
        current.previous = void 0;
        current = current.next;
      }
    }
    tokenizer.events = [];
    if (current) {
      current._tokenizer = void 0;
      current.previous = void 0;
    } else {
      breaks.pop();
    }
    index2 = breaks.length;
    while (index2--) {
      const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
      const start2 = startPositions.pop();
      jumps.unshift([start2, start2 + slice.length - 1]);
      splice(events, start2, 2, slice);
    }
    index2 = -1;
    while (++index2 < jumps.length) {
      gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
      adjust += jumps[index2][1] - jumps[index2][0] - 1;
    }
    return gaps;
  }
  var init_micromark_util_subtokenize = __esm({
    "example/.central/.central-build/node_modules/micromark-util-subtokenize/index.js"() {
      init_micromark_util_chunked();
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/content.js
  function resolveContent(events) {
    subtokenize(events);
    return events;
  }
  function tokenizeContent(effects, ok2) {
    let previous2;
    return start;
    function start(code2) {
      effects.enter("content");
      previous2 = effects.enter("chunkContent", {
        contentType: "content"
      });
      return data(code2);
    }
    function data(code2) {
      if (code2 === null) {
        return contentEnd(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.check(continuationConstruct, contentContinue, contentEnd)(code2);
      }
      effects.consume(code2);
      return data;
    }
    function contentEnd(code2) {
      effects.exit("chunkContent");
      effects.exit("content");
      return ok2(code2);
    }
    function contentContinue(code2) {
      effects.consume(code2);
      effects.exit("chunkContent");
      previous2.next = effects.enter("chunkContent", {
        contentType: "content",
        previous: previous2
      });
      previous2 = previous2.next;
      return data;
    }
  }
  function tokenizeContinuation(effects, ok2, nok) {
    const self = this;
    return startLookahead;
    function startLookahead(code2) {
      effects.exit("chunkContent");
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, prefixed, "linePrefix");
    }
    function prefixed(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return nok(code2);
      }
      const tail = self.events[self.events.length - 1];
      if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
        return ok2(code2);
      }
      return effects.interrupt(self.parser.constructs.flow, nok, ok2)(code2);
    }
  }
  var content2, continuationConstruct;
  var init_content2 = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/content.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_micromark_util_subtokenize();
      content2 = {
        tokenize: tokenizeContent,
        resolve: resolveContent
      };
      continuationConstruct = {
        tokenize: tokenizeContinuation,
        partial: true
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-factory-destination/index.js
  function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
    const limit = max || Number.POSITIVE_INFINITY;
    let balance = 0;
    return start;
    function start(code2) {
      if (code2 === 60) {
        effects.enter(type);
        effects.enter(literalType);
        effects.enter(literalMarkerType);
        effects.consume(code2);
        effects.exit(literalMarkerType);
        return destinationEnclosedBefore;
      }
      if (code2 === null || code2 === 41 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.enter(type);
      effects.enter(rawType);
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return destinationRaw(code2);
    }
    function destinationEnclosedBefore(code2) {
      if (code2 === 62) {
        effects.enter(literalMarkerType);
        effects.consume(code2);
        effects.exit(literalMarkerType);
        effects.exit(literalType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return destinationEnclosed(code2);
    }
    function destinationEnclosed(code2) {
      if (code2 === 62) {
        effects.exit("chunkString");
        effects.exit(stringType);
        return destinationEnclosedBefore(code2);
      }
      if (code2 === null || code2 === 60 || markdownLineEnding(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? destinationEnclosedEscape : destinationEnclosed;
    }
    function destinationEnclosedEscape(code2) {
      if (code2 === 60 || code2 === 62 || code2 === 92) {
        effects.consume(code2);
        return destinationEnclosed;
      }
      return destinationEnclosed(code2);
    }
    function destinationRaw(code2) {
      if (code2 === 40) {
        if (++balance > limit)
          return nok(code2);
        effects.consume(code2);
        return destinationRaw;
      }
      if (code2 === 41) {
        if (!balance--) {
          effects.exit("chunkString");
          effects.exit(stringType);
          effects.exit(rawType);
          effects.exit(type);
          return ok2(code2);
        }
        effects.consume(code2);
        return destinationRaw;
      }
      if (code2 === null || markdownLineEndingOrSpace(code2)) {
        if (balance)
          return nok(code2);
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code2);
      }
      if (asciiControl(code2))
        return nok(code2);
      effects.consume(code2);
      return code2 === 92 ? destinationRawEscape : destinationRaw;
    }
    function destinationRawEscape(code2) {
      if (code2 === 40 || code2 === 41 || code2 === 92) {
        effects.consume(code2);
        return destinationRaw;
      }
      return destinationRaw(code2);
    }
  }
  var init_micromark_factory_destination = __esm({
    "example/.central/.central-build/node_modules/micromark-factory-destination/index.js"() {
      init_micromark_util_character();
    }
  });

  // example/.central/.central-build/node_modules/micromark-factory-label/index.js
  function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
    const self = this;
    let size = 0;
    let data;
    return start;
    function start(code2) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.enter(stringType);
      return atBreak;
    }
    function atBreak(code2) {
      if (code2 === null || code2 === 91 || code2 === 93 && !data || code2 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs || size > 999) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.exit(stringType);
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return atBreak;
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return label(code2);
    }
    function label(code2) {
      if (code2 === null || code2 === 91 || code2 === 93 || markdownLineEnding(code2) || size++ > 999) {
        effects.exit("chunkString");
        return atBreak(code2);
      }
      effects.consume(code2);
      data = data || !markdownSpace(code2);
      return code2 === 92 ? labelEscape : label;
    }
    function labelEscape(code2) {
      if (code2 === 91 || code2 === 92 || code2 === 93) {
        effects.consume(code2);
        size++;
        return label;
      }
      return label(code2);
    }
  }
  var init_micromark_factory_label = __esm({
    "example/.central/.central-build/node_modules/micromark-factory-label/index.js"() {
      init_micromark_util_character();
    }
  });

  // example/.central/.central-build/node_modules/micromark-factory-title/index.js
  function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
    let marker;
    return start;
    function start(code2) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      marker = code2 === 40 ? 41 : code2;
      return atFirstTitleBreak;
    }
    function atFirstTitleBreak(code2) {
      if (code2 === marker) {
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      return atTitleBreak(code2);
    }
    function atTitleBreak(code2) {
      if (code2 === marker) {
        effects.exit(stringType);
        return atFirstTitleBreak(marker);
      }
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return factorySpace(effects, atTitleBreak, "linePrefix");
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return title(code2);
    }
    function title(code2) {
      if (code2 === marker || code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        return atTitleBreak(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? titleEscape : title;
    }
    function titleEscape(code2) {
      if (code2 === marker || code2 === 92) {
        effects.consume(code2);
        return title;
      }
      return title(code2);
    }
  }
  var init_micromark_factory_title = __esm({
    "example/.central/.central-build/node_modules/micromark-factory-title/index.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
    }
  });

  // example/.central/.central-build/node_modules/micromark-factory-whitespace/index.js
  function factoryWhitespace(effects, ok2) {
    let seen;
    return start;
    function start(code2) {
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        seen = true;
        return start;
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code2);
      }
      return ok2(code2);
    }
  }
  var init_micromark_factory_whitespace = __esm({
    "example/.central/.central-build/node_modules/micromark-factory-whitespace/index.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-normalize-identifier/index.js
  function normalizeIdentifier(value) {
    return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  var init_micromark_util_normalize_identifier = __esm({
    "example/.central/.central-build/node_modules/micromark-util-normalize-identifier/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/definition.js
  function tokenizeDefinition(effects, ok2, nok) {
    const self = this;
    let identifier;
    return start;
    function start(code2) {
      effects.enter("definition");
      return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code2);
    }
    function labelAfter(code2) {
      identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
      if (code2 === 58) {
        effects.enter("definitionMarker");
        effects.consume(code2);
        effects.exit("definitionMarker");
        return factoryWhitespace(effects, factoryDestination(effects, effects.attempt(titleConstruct, factorySpace(effects, after, "whitespace"), factorySpace(effects, after, "whitespace")), nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString"));
      }
      return nok(code2);
    }
    function after(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("definition");
        if (!self.parser.defined.includes(identifier)) {
          self.parser.defined.push(identifier);
        }
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  function tokenizeTitle(effects, ok2, nok) {
    return start;
    function start(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, before)(code2) : nok(code2);
    }
    function before(code2) {
      if (code2 === 34 || code2 === 39 || code2 === 40) {
        return factoryTitle(effects, factorySpace(effects, after, "whitespace"), nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code2);
      }
      return nok(code2);
    }
    function after(code2) {
      return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
    }
  }
  var definition, titleConstruct;
  var init_definition = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/definition.js"() {
      init_micromark_factory_destination();
      init_micromark_factory_label();
      init_micromark_factory_space();
      init_micromark_factory_title();
      init_micromark_factory_whitespace();
      init_micromark_util_normalize_identifier();
      init_micromark_util_character();
      definition = {
        name: "definition",
        tokenize: tokenizeDefinition
      };
      titleConstruct = {
        tokenize: tokenizeTitle,
        partial: true
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
  function tokenizeHardBreakEscape(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("hardBreakEscape");
      effects.enter("escapeMarker");
      effects.consume(code2);
      return open;
    }
    function open(code2) {
      if (markdownLineEnding(code2)) {
        effects.exit("escapeMarker");
        effects.exit("hardBreakEscape");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  var hardBreakEscape;
  var init_hard_break_escape = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/hard-break-escape.js"() {
      init_micromark_util_character();
      hardBreakEscape = {
        name: "hardBreakEscape",
        tokenize: tokenizeHardBreakEscape
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/heading-atx.js
  function resolveHeadingAtx(events, context) {
    let contentEnd = events.length - 2;
    let contentStart = 3;
    let content3;
    let text4;
    if (events[contentStart][1].type === "whitespace") {
      contentStart += 2;
    }
    if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
      contentEnd -= 2;
    }
    if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
      contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
    }
    if (contentEnd > contentStart) {
      content3 = {
        type: "atxHeadingText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end
      };
      text4 = {
        type: "chunkText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end,
        contentType: "text"
      };
      splice(events, contentStart, contentEnd - contentStart + 1, [
        ["enter", content3, context],
        ["enter", text4, context],
        ["exit", text4, context],
        ["exit", content3, context]
      ]);
    }
    return events;
  }
  function tokenizeHeadingAtx(effects, ok2, nok) {
    const self = this;
    let size = 0;
    return start;
    function start(code2) {
      effects.enter("atxHeading");
      effects.enter("atxHeadingSequence");
      return fenceOpenInside(code2);
    }
    function fenceOpenInside(code2) {
      if (code2 === 35 && size++ < 6) {
        effects.consume(code2);
        return fenceOpenInside;
      }
      if (code2 === null || markdownLineEndingOrSpace(code2)) {
        effects.exit("atxHeadingSequence");
        return self.interrupt ? ok2(code2) : headingBreak(code2);
      }
      return nok(code2);
    }
    function headingBreak(code2) {
      if (code2 === 35) {
        effects.enter("atxHeadingSequence");
        return sequence(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("atxHeading");
        return ok2(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, headingBreak, "whitespace")(code2);
      }
      effects.enter("atxHeadingText");
      return data(code2);
    }
    function sequence(code2) {
      if (code2 === 35) {
        effects.consume(code2);
        return sequence;
      }
      effects.exit("atxHeadingSequence");
      return headingBreak(code2);
    }
    function data(code2) {
      if (code2 === null || code2 === 35 || markdownLineEndingOrSpace(code2)) {
        effects.exit("atxHeadingText");
        return headingBreak(code2);
      }
      effects.consume(code2);
      return data;
    }
  }
  var headingAtx;
  var init_heading_atx = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/heading-atx.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_micromark_util_chunked();
      headingAtx = {
        name: "headingAtx",
        tokenize: tokenizeHeadingAtx,
        resolve: resolveHeadingAtx
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-html-tag-name/index.js
  var htmlBlockNames, htmlRawNames;
  var init_micromark_util_html_tag_name = __esm({
    "example/.central/.central-build/node_modules/micromark-util-html-tag-name/index.js"() {
      htmlBlockNames = [
        "address",
        "article",
        "aside",
        "base",
        "basefont",
        "blockquote",
        "body",
        "caption",
        "center",
        "col",
        "colgroup",
        "dd",
        "details",
        "dialog",
        "dir",
        "div",
        "dl",
        "dt",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "frame",
        "frameset",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hr",
        "html",
        "iframe",
        "legend",
        "li",
        "link",
        "main",
        "menu",
        "menuitem",
        "nav",
        "noframes",
        "ol",
        "optgroup",
        "option",
        "p",
        "param",
        "section",
        "summary",
        "table",
        "tbody",
        "td",
        "tfoot",
        "th",
        "thead",
        "title",
        "tr",
        "track",
        "ul"
      ];
      htmlRawNames = ["pre", "script", "style", "textarea"];
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/html-flow.js
  function resolveToHtmlFlow(events) {
    let index2 = events.length;
    while (index2--) {
      if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
        break;
      }
    }
    if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
      events[index2][1].start = events[index2 - 2][1].start;
      events[index2 + 1][1].start = events[index2 - 2][1].start;
      events.splice(index2 - 2, 2);
    }
    return events;
  }
  function tokenizeHtmlFlow(effects, ok2, nok) {
    const self = this;
    let kind;
    let startTag;
    let buffer2;
    let index2;
    let marker;
    return start;
    function start(code2) {
      effects.enter("htmlFlow");
      effects.enter("htmlFlowData");
      effects.consume(code2);
      return open;
    }
    function open(code2) {
      if (code2 === 33) {
        effects.consume(code2);
        return declarationStart;
      }
      if (code2 === 47) {
        effects.consume(code2);
        return tagCloseStart;
      }
      if (code2 === 63) {
        effects.consume(code2);
        kind = 3;
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        buffer2 = String.fromCharCode(code2);
        startTag = true;
        return tagName;
      }
      return nok(code2);
    }
    function declarationStart(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        kind = 2;
        return commentOpenInside;
      }
      if (code2 === 91) {
        effects.consume(code2);
        kind = 5;
        buffer2 = "CDATA[";
        index2 = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        kind = 4;
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code2);
    }
    function commentOpenInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code2);
    }
    function cdataOpenInside(code2) {
      if (code2 === buffer2.charCodeAt(index2++)) {
        effects.consume(code2);
        return index2 === buffer2.length ? self.interrupt ? ok2 : continuation : cdataOpenInside;
      }
      return nok(code2);
    }
    function tagCloseStart(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        buffer2 = String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function tagName(code2) {
      if (code2 === null || code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        if (code2 !== 47 && startTag && htmlRawNames.includes(buffer2.toLowerCase())) {
          kind = 1;
          return self.interrupt ? ok2(code2) : continuation(code2);
        }
        if (htmlBlockNames.includes(buffer2.toLowerCase())) {
          kind = 6;
          if (code2 === 47) {
            effects.consume(code2);
            return basicSelfClosing;
          }
          return self.interrupt ? ok2(code2) : continuation(code2);
        }
        kind = 7;
        return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code2) : startTag ? completeAttributeNameBefore(code2) : completeClosingTagAfter(code2);
      }
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        buffer2 += String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function basicSelfClosing(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return self.interrupt ? ok2 : continuation;
      }
      return nok(code2);
    }
    function completeClosingTagAfter(code2) {
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeClosingTagAfter;
      }
      return completeEnd(code2);
    }
    function completeAttributeNameBefore(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return completeEnd;
      }
      if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
        effects.consume(code2);
        return completeAttributeName;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeNameBefore;
      }
      return completeEnd(code2);
    }
    function completeAttributeName(code2) {
      if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return completeAttributeName;
      }
      return completeAttributeNameAfter(code2);
    }
    function completeAttributeNameAfter(code2) {
      if (code2 === 61) {
        effects.consume(code2);
        return completeAttributeValueBefore;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeNameAfter;
      }
      return completeAttributeNameBefore(code2);
    }
    function completeAttributeValueBefore(code2) {
      if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 34 || code2 === 39) {
        effects.consume(code2);
        marker = code2;
        return completeAttributeValueQuoted;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeValueBefore;
      }
      marker = null;
      return completeAttributeValueUnquoted(code2);
    }
    function completeAttributeValueQuoted(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return nok(code2);
      }
      if (code2 === marker) {
        effects.consume(code2);
        return completeAttributeValueQuotedAfter;
      }
      effects.consume(code2);
      return completeAttributeValueQuoted;
    }
    function completeAttributeValueUnquoted(code2) {
      if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96 || markdownLineEndingOrSpace(code2)) {
        return completeAttributeNameAfter(code2);
      }
      effects.consume(code2);
      return completeAttributeValueUnquoted;
    }
    function completeAttributeValueQuotedAfter(code2) {
      if (code2 === 47 || code2 === 62 || markdownSpace(code2)) {
        return completeAttributeNameBefore(code2);
      }
      return nok(code2);
    }
    function completeEnd(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return completeAfter;
      }
      return nok(code2);
    }
    function completeAfter(code2) {
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAfter;
      }
      return code2 === null || markdownLineEnding(code2) ? continuation(code2) : nok(code2);
    }
    function continuation(code2) {
      if (code2 === 45 && kind === 2) {
        effects.consume(code2);
        return continuationCommentInside;
      }
      if (code2 === 60 && kind === 1) {
        effects.consume(code2);
        return continuationRawTagOpen;
      }
      if (code2 === 62 && kind === 4) {
        effects.consume(code2);
        return continuationClose;
      }
      if (code2 === 63 && kind === 3) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      if (code2 === 93 && kind === 5) {
        effects.consume(code2);
        return continuationCharacterDataInside;
      }
      if (markdownLineEnding(code2) && (kind === 6 || kind === 7)) {
        return effects.check(nextBlankConstruct, continuationClose, continuationAtLineEnding)(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        return continuationAtLineEnding(code2);
      }
      effects.consume(code2);
      return continuation;
    }
    function continuationAtLineEnding(code2) {
      effects.exit("htmlFlowData");
      return htmlContinueStart(code2);
    }
    function htmlContinueStart(code2) {
      if (code2 === null) {
        return done(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.attempt({
          tokenize: htmlLineEnd,
          partial: true
        }, htmlContinueStart, done)(code2);
      }
      effects.enter("htmlFlowData");
      return continuation(code2);
    }
    function htmlLineEnd(effects2, ok3, nok2) {
      return start2;
      function start2(code2) {
        effects2.enter("lineEnding");
        effects2.consume(code2);
        effects2.exit("lineEnding");
        return lineStart;
      }
      function lineStart(code2) {
        return self.parser.lazy[self.now().line] ? nok2(code2) : ok3(code2);
      }
    }
    function continuationCommentInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationRawTagOpen(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        buffer2 = "";
        return continuationRawEndTag;
      }
      return continuation(code2);
    }
    function continuationRawEndTag(code2) {
      if (code2 === 62 && htmlRawNames.includes(buffer2.toLowerCase())) {
        effects.consume(code2);
        return continuationClose;
      }
      if (asciiAlpha(code2) && buffer2.length < 8) {
        effects.consume(code2);
        buffer2 += String.fromCharCode(code2);
        return continuationRawEndTag;
      }
      return continuation(code2);
    }
    function continuationCharacterDataInside(code2) {
      if (code2 === 93) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationDeclarationInside(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return continuationClose;
      }
      if (code2 === 45 && kind === 2) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationClose(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("htmlFlowData");
        return done(code2);
      }
      effects.consume(code2);
      return continuationClose;
    }
    function done(code2) {
      effects.exit("htmlFlow");
      return ok2(code2);
    }
  }
  function tokenizeNextBlank(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.exit("htmlFlowData");
      effects.enter("lineEndingBlank");
      effects.consume(code2);
      effects.exit("lineEndingBlank");
      return effects.attempt(blankLine, ok2, nok);
    }
  }
  var htmlFlow, nextBlankConstruct;
  var init_html_flow = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/html-flow.js"() {
      init_micromark_util_character();
      init_micromark_util_html_tag_name();
      init_blank_line();
      htmlFlow = {
        name: "htmlFlow",
        tokenize: tokenizeHtmlFlow,
        resolveTo: resolveToHtmlFlow,
        concrete: true
      };
      nextBlankConstruct = {
        tokenize: tokenizeNextBlank,
        partial: true
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/html-text.js
  function tokenizeHtmlText(effects, ok2, nok) {
    const self = this;
    let marker;
    let buffer2;
    let index2;
    let returnState;
    return start;
    function start(code2) {
      effects.enter("htmlText");
      effects.enter("htmlTextData");
      effects.consume(code2);
      return open;
    }
    function open(code2) {
      if (code2 === 33) {
        effects.consume(code2);
        return declarationOpen;
      }
      if (code2 === 47) {
        effects.consume(code2);
        return tagCloseStart;
      }
      if (code2 === 63) {
        effects.consume(code2);
        return instruction;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return tagOpen;
      }
      return nok(code2);
    }
    function declarationOpen(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentOpen;
      }
      if (code2 === 91) {
        effects.consume(code2);
        buffer2 = "CDATA[";
        index2 = 0;
        return cdataOpen;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return declaration;
      }
      return nok(code2);
    }
    function commentOpen(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentStart;
      }
      return nok(code2);
    }
    function commentStart(code2) {
      if (code2 === null || code2 === 62) {
        return nok(code2);
      }
      if (code2 === 45) {
        effects.consume(code2);
        return commentStartDash;
      }
      return comment(code2);
    }
    function commentStartDash(code2) {
      if (code2 === null || code2 === 62) {
        return nok(code2);
      }
      return comment(code2);
    }
    function comment(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 45) {
        effects.consume(code2);
        return commentClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = comment;
        return atLineEnding(code2);
      }
      effects.consume(code2);
      return comment;
    }
    function commentClose(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return end;
      }
      return comment(code2);
    }
    function cdataOpen(code2) {
      if (code2 === buffer2.charCodeAt(index2++)) {
        effects.consume(code2);
        return index2 === buffer2.length ? cdata : cdataOpen;
      }
      return nok(code2);
    }
    function cdata(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.consume(code2);
        return cdataClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = cdata;
        return atLineEnding(code2);
      }
      effects.consume(code2);
      return cdata;
    }
    function cdataClose(code2) {
      if (code2 === 93) {
        effects.consume(code2);
        return cdataEnd;
      }
      return cdata(code2);
    }
    function cdataEnd(code2) {
      if (code2 === 62) {
        return end(code2);
      }
      if (code2 === 93) {
        effects.consume(code2);
        return cdataEnd;
      }
      return cdata(code2);
    }
    function declaration(code2) {
      if (code2 === null || code2 === 62) {
        return end(code2);
      }
      if (markdownLineEnding(code2)) {
        returnState = declaration;
        return atLineEnding(code2);
      }
      effects.consume(code2);
      return declaration;
    }
    function instruction(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 63) {
        effects.consume(code2);
        return instructionClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = instruction;
        return atLineEnding(code2);
      }
      effects.consume(code2);
      return instruction;
    }
    function instructionClose(code2) {
      return code2 === 62 ? end(code2) : instruction(code2);
    }
    function tagCloseStart(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return tagClose;
      }
      return nok(code2);
    }
    function tagClose(code2) {
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagClose;
      }
      return tagCloseBetween(code2);
    }
    function tagCloseBetween(code2) {
      if (markdownLineEnding(code2)) {
        returnState = tagCloseBetween;
        return atLineEnding(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagCloseBetween;
      }
      return end(code2);
    }
    function tagOpen(code2) {
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagOpen;
      }
      if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      return nok(code2);
    }
    function tagOpenBetween(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return end;
      }
      if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
        effects.consume(code2);
        return tagOpenAttributeName;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenBetween;
        return atLineEnding(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenBetween;
      }
      return end(code2);
    }
    function tagOpenAttributeName(code2) {
      if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagOpenAttributeName;
      }
      return tagOpenAttributeNameAfter(code2);
    }
    function tagOpenAttributeNameAfter(code2) {
      if (code2 === 61) {
        effects.consume(code2);
        return tagOpenAttributeValueBefore;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeNameAfter;
        return atLineEnding(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenAttributeNameAfter;
      }
      return tagOpenBetween(code2);
    }
    function tagOpenAttributeValueBefore(code2) {
      if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 34 || code2 === 39) {
        effects.consume(code2);
        marker = code2;
        return tagOpenAttributeValueQuoted;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeValueBefore;
        return atLineEnding(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenAttributeValueBefore;
      }
      effects.consume(code2);
      marker = void 0;
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuoted(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        return tagOpenAttributeValueQuotedAfter;
      }
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeValueQuoted;
        return atLineEnding(code2);
      }
      effects.consume(code2);
      return tagOpenAttributeValueQuoted;
    }
    function tagOpenAttributeValueQuotedAfter(code2) {
      if (code2 === 62 || code2 === 47 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      return nok(code2);
    }
    function tagOpenAttributeValueUnquoted(code2) {
      if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      effects.consume(code2);
      return tagOpenAttributeValueUnquoted;
    }
    function atLineEnding(code2) {
      effects.exit("htmlTextData");
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, afterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
    }
    function afterPrefix(code2) {
      effects.enter("htmlTextData");
      return returnState(code2);
    }
    function end(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        effects.exit("htmlTextData");
        effects.exit("htmlText");
        return ok2;
      }
      return nok(code2);
    }
  }
  var htmlText;
  var init_html_text = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/html-text.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      htmlText = {
        name: "htmlText",
        tokenize: tokenizeHtmlText
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/label-end.js
  function resolveAllLabelEnd(events) {
    let index2 = -1;
    let token;
    while (++index2 < events.length) {
      token = events[index2][1];
      if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
        events.splice(index2 + 1, token.type === "labelImage" ? 4 : 2);
        token.type = "data";
        index2++;
      }
    }
    return events;
  }
  function resolveToLabelEnd(events, context) {
    let index2 = events.length;
    let offset = 0;
    let token;
    let open;
    let close;
    let media;
    while (index2--) {
      token = events[index2][1];
      if (open) {
        if (token.type === "link" || token.type === "labelLink" && token._inactive) {
          break;
        }
        if (events[index2][0] === "enter" && token.type === "labelLink") {
          token._inactive = true;
        }
      } else if (close) {
        if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
          open = index2;
          if (token.type !== "labelLink") {
            offset = 2;
            break;
          }
        }
      } else if (token.type === "labelEnd") {
        close = index2;
      }
    }
    const group = {
      type: events[open][1].type === "labelLink" ? "link" : "image",
      start: Object.assign({}, events[open][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    const label = {
      type: "label",
      start: Object.assign({}, events[open][1].start),
      end: Object.assign({}, events[close][1].end)
    };
    const text4 = {
      type: "labelText",
      start: Object.assign({}, events[open + offset + 2][1].end),
      end: Object.assign({}, events[close - 2][1].start)
    };
    media = [
      ["enter", group, context],
      ["enter", label, context]
    ];
    media = push(media, events.slice(open + 1, open + offset + 3));
    media = push(media, [["enter", text4, context]]);
    media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
    media = push(media, [
      ["exit", text4, context],
      events[close - 2],
      events[close - 1],
      ["exit", label, context]
    ]);
    media = push(media, events.slice(close + 1));
    media = push(media, [["exit", group, context]]);
    splice(events, open, events.length, media);
    return events;
  }
  function tokenizeLabelEnd(effects, ok2, nok) {
    const self = this;
    let index2 = self.events.length;
    let labelStart;
    let defined;
    while (index2--) {
      if ((self.events[index2][1].type === "labelImage" || self.events[index2][1].type === "labelLink") && !self.events[index2][1]._balanced) {
        labelStart = self.events[index2][1];
        break;
      }
    }
    return start;
    function start(code2) {
      if (!labelStart) {
        return nok(code2);
      }
      if (labelStart._inactive)
        return balanced(code2);
      defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
        start: labelStart.end,
        end: self.now()
      })));
      effects.enter("labelEnd");
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelEnd");
      return afterLabelEnd;
    }
    function afterLabelEnd(code2) {
      if (code2 === 40) {
        return effects.attempt(resourceConstruct, ok2, defined ? ok2 : balanced)(code2);
      }
      if (code2 === 91) {
        return effects.attempt(fullReferenceConstruct, ok2, defined ? effects.attempt(collapsedReferenceConstruct, ok2, balanced) : balanced)(code2);
      }
      return defined ? ok2(code2) : balanced(code2);
    }
    function balanced(code2) {
      labelStart._balanced = true;
      return nok(code2);
    }
  }
  function tokenizeResource(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("resource");
      effects.enter("resourceMarker");
      effects.consume(code2);
      effects.exit("resourceMarker");
      return factoryWhitespace(effects, open);
    }
    function open(code2) {
      if (code2 === 41) {
        return end(code2);
      }
      return factoryDestination(effects, destinationAfter, nok, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code2);
    }
    function destinationAfter(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, between)(code2) : end(code2);
    }
    function between(code2) {
      if (code2 === 34 || code2 === 39 || code2 === 40) {
        return factoryTitle(effects, factoryWhitespace(effects, end), nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code2);
      }
      return end(code2);
    }
    function end(code2) {
      if (code2 === 41) {
        effects.enter("resourceMarker");
        effects.consume(code2);
        effects.exit("resourceMarker");
        effects.exit("resource");
        return ok2;
      }
      return nok(code2);
    }
  }
  function tokenizeFullReference(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      return factoryLabel.call(self, effects, afterLabel, nok, "reference", "referenceMarker", "referenceString")(code2);
    }
    function afterLabel(code2) {
      return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok2(code2) : nok(code2);
    }
  }
  function tokenizeCollapsedReference(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("reference");
      effects.enter("referenceMarker");
      effects.consume(code2);
      effects.exit("referenceMarker");
      return open;
    }
    function open(code2) {
      if (code2 === 93) {
        effects.enter("referenceMarker");
        effects.consume(code2);
        effects.exit("referenceMarker");
        effects.exit("reference");
        return ok2;
      }
      return nok(code2);
    }
  }
  var labelEnd, resourceConstruct, fullReferenceConstruct, collapsedReferenceConstruct;
  var init_label_end = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/label-end.js"() {
      init_micromark_factory_destination();
      init_micromark_factory_label();
      init_micromark_factory_title();
      init_micromark_factory_whitespace();
      init_micromark_util_character();
      init_micromark_util_chunked();
      init_micromark_util_normalize_identifier();
      init_micromark_util_resolve_all();
      labelEnd = {
        name: "labelEnd",
        tokenize: tokenizeLabelEnd,
        resolveTo: resolveToLabelEnd,
        resolveAll: resolveAllLabelEnd
      };
      resourceConstruct = {
        tokenize: tokenizeResource
      };
      fullReferenceConstruct = {
        tokenize: tokenizeFullReference
      };
      collapsedReferenceConstruct = {
        tokenize: tokenizeCollapsedReference
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/label-start-image.js
  function tokenizeLabelStartImage(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      effects.enter("labelImage");
      effects.enter("labelImageMarker");
      effects.consume(code2);
      effects.exit("labelImageMarker");
      return open;
    }
    function open(code2) {
      if (code2 === 91) {
        effects.enter("labelMarker");
        effects.consume(code2);
        effects.exit("labelMarker");
        effects.exit("labelImage");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return code2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code2) : ok2(code2);
    }
  }
  var labelStartImage;
  var init_label_start_image = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/label-start-image.js"() {
      init_label_end();
      labelStartImage = {
        name: "labelStartImage",
        tokenize: tokenizeLabelStartImage,
        resolveAll: labelEnd.resolveAll
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/label-start-link.js
  function tokenizeLabelStartLink(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      effects.enter("labelLink");
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelLink");
      return after;
    }
    function after(code2) {
      return code2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code2) : ok2(code2);
    }
  }
  var labelStartLink;
  var init_label_start_link = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/label-start-link.js"() {
      init_label_end();
      labelStartLink = {
        name: "labelStartLink",
        tokenize: tokenizeLabelStartLink,
        resolveAll: labelEnd.resolveAll
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/line-ending.js
  function tokenizeLineEnding(effects, ok2) {
    return start;
    function start(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, ok2, "linePrefix");
    }
  }
  var lineEnding;
  var init_line_ending = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/line-ending.js"() {
      init_micromark_factory_space();
      lineEnding = {
        name: "lineEnding",
        tokenize: tokenizeLineEnding
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/thematic-break.js
  function tokenizeThematicBreak(effects, ok2, nok) {
    let size = 0;
    let marker;
    return start;
    function start(code2) {
      effects.enter("thematicBreak");
      marker = code2;
      return atBreak(code2);
    }
    function atBreak(code2) {
      if (code2 === marker) {
        effects.enter("thematicBreakSequence");
        return sequence(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, atBreak, "whitespace")(code2);
      }
      if (size < 3 || code2 !== null && !markdownLineEnding(code2)) {
        return nok(code2);
      }
      effects.exit("thematicBreak");
      return ok2(code2);
    }
    function sequence(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        size++;
        return sequence;
      }
      effects.exit("thematicBreakSequence");
      return atBreak(code2);
    }
  }
  var thematicBreak;
  var init_thematic_break = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/thematic-break.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      thematicBreak = {
        name: "thematicBreak",
        tokenize: tokenizeThematicBreak
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/list.js
  function tokenizeListStart(effects, ok2, nok) {
    const self = this;
    const tail = self.events[self.events.length - 1];
    let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    let size = 0;
    return start;
    function start(code2) {
      const kind = self.containerState.type || (code2 === 42 || code2 === 43 || code2 === 45 ? "listUnordered" : "listOrdered");
      if (kind === "listUnordered" ? !self.containerState.marker || code2 === self.containerState.marker : asciiDigit(code2)) {
        if (!self.containerState.type) {
          self.containerState.type = kind;
          effects.enter(kind, {
            _container: true
          });
        }
        if (kind === "listUnordered") {
          effects.enter("listItemPrefix");
          return code2 === 42 || code2 === 45 ? effects.check(thematicBreak, nok, atMarker)(code2) : atMarker(code2);
        }
        if (!self.interrupt || code2 === 49) {
          effects.enter("listItemPrefix");
          effects.enter("listItemValue");
          return inside(code2);
        }
      }
      return nok(code2);
    }
    function inside(code2) {
      if (asciiDigit(code2) && ++size < 10) {
        effects.consume(code2);
        return inside;
      }
      if ((!self.interrupt || size < 2) && (self.containerState.marker ? code2 === self.containerState.marker : code2 === 41 || code2 === 46)) {
        effects.exit("listItemValue");
        return atMarker(code2);
      }
      return nok(code2);
    }
    function atMarker(code2) {
      effects.enter("listItemMarker");
      effects.consume(code2);
      effects.exit("listItemMarker");
      self.containerState.marker = self.containerState.marker || code2;
      return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
    }
    function onBlank(code2) {
      self.containerState.initialBlankLine = true;
      initialSize++;
      return endOfPrefix(code2);
    }
    function otherPrefix(code2) {
      if (markdownSpace(code2)) {
        effects.enter("listItemPrefixWhitespace");
        effects.consume(code2);
        effects.exit("listItemPrefixWhitespace");
        return endOfPrefix;
      }
      return nok(code2);
    }
    function endOfPrefix(code2) {
      self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
      return ok2(code2);
    }
  }
  function tokenizeListContinuation(effects, ok2, nok) {
    const self = this;
    self.containerState._closeFlow = void 0;
    return effects.check(blankLine, onBlank, notBlank);
    function onBlank(code2) {
      self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
      return factorySpace(effects, ok2, "listItemIndent", self.containerState.size + 1)(code2);
    }
    function notBlank(code2) {
      if (self.containerState.furtherBlankLines || !markdownSpace(code2)) {
        self.containerState.furtherBlankLines = void 0;
        self.containerState.initialBlankLine = void 0;
        return notInCurrentItem(code2);
      }
      self.containerState.furtherBlankLines = void 0;
      self.containerState.initialBlankLine = void 0;
      return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code2);
    }
    function notInCurrentItem(code2) {
      self.containerState._closeFlow = true;
      self.interrupt = void 0;
      return factorySpace(effects, effects.attempt(list, ok2, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
    }
  }
  function tokenizeIndent(effects, ok2, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok2(code2) : nok(code2);
    }
  }
  function tokenizeListEnd(effects) {
    effects.exit(this.containerState.type);
  }
  function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return !markdownSpace(code2) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code2) : nok(code2);
    }
  }
  var list, listItemPrefixWhitespaceConstruct, indentConstruct;
  var init_list = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/list.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_blank_line();
      init_thematic_break();
      list = {
        name: "list",
        tokenize: tokenizeListStart,
        continuation: {
          tokenize: tokenizeListContinuation
        },
        exit: tokenizeListEnd
      };
      listItemPrefixWhitespaceConstruct = {
        tokenize: tokenizeListItemPrefixWhitespace,
        partial: true
      };
      indentConstruct = {
        tokenize: tokenizeIndent,
        partial: true
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/lib/setext-underline.js
  function resolveToSetextUnderline(events, context) {
    let index2 = events.length;
    let content3;
    let text4;
    let definition2;
    while (index2--) {
      if (events[index2][0] === "enter") {
        if (events[index2][1].type === "content") {
          content3 = index2;
          break;
        }
        if (events[index2][1].type === "paragraph") {
          text4 = index2;
        }
      } else {
        if (events[index2][1].type === "content") {
          events.splice(index2, 1);
        }
        if (!definition2 && events[index2][1].type === "definition") {
          definition2 = index2;
        }
      }
    }
    const heading2 = {
      type: "setextHeading",
      start: Object.assign({}, events[text4][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    events[text4][1].type = "setextHeadingText";
    if (definition2) {
      events.splice(text4, 0, ["enter", heading2, context]);
      events.splice(definition2 + 1, 0, ["exit", events[content3][1], context]);
      events[content3][1].end = Object.assign({}, events[definition2][1].end);
    } else {
      events[content3][1] = heading2;
    }
    events.push(["exit", heading2, context]);
    return events;
  }
  function tokenizeSetextUnderline(effects, ok2, nok) {
    const self = this;
    let index2 = self.events.length;
    let marker;
    let paragraph2;
    while (index2--) {
      if (self.events[index2][1].type !== "lineEnding" && self.events[index2][1].type !== "linePrefix" && self.events[index2][1].type !== "content") {
        paragraph2 = self.events[index2][1].type === "paragraph";
        break;
      }
    }
    return start;
    function start(code2) {
      if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph2)) {
        effects.enter("setextHeadingLine");
        effects.enter("setextHeadingLineSequence");
        marker = code2;
        return closingSequence(code2);
      }
      return nok(code2);
    }
    function closingSequence(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        return closingSequence;
      }
      effects.exit("setextHeadingLineSequence");
      return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code2);
    }
    function closingSequenceEnd(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("setextHeadingLine");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  var setextUnderline;
  var init_setext_underline = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/lib/setext-underline.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      setextUnderline = {
        name: "setextUnderline",
        tokenize: tokenizeSetextUnderline,
        resolveTo: resolveToSetextUnderline
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark-core-commonmark/index.js
  var init_micromark_core_commonmark = __esm({
    "example/.central/.central-build/node_modules/micromark-core-commonmark/index.js"() {
      init_attention();
      init_autolink();
      init_blank_line();
      init_block_quote();
      init_character_escape();
      init_character_reference();
      init_code_fenced();
      init_code_indented();
      init_code_text();
      init_content2();
      init_definition();
      init_hard_break_escape();
      init_heading_atx();
      init_html_flow();
      init_html_text();
      init_label_end();
      init_label_start_image();
      init_label_start_link();
      init_line_ending();
      init_list();
      init_setext_underline();
      init_thematic_break();
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/initialize/flow.js
  function initializeFlow(effects) {
    const self = this;
    const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content2, afterConstruct)), "linePrefix")));
    return initial;
    function atBlankEnding(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEndingBlank");
      effects.consume(code2);
      effects.exit("lineEndingBlank");
      self.currentConstruct = void 0;
      return initial;
    }
    function afterConstruct(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      self.currentConstruct = void 0;
      return initial;
    }
  }
  var flow;
  var init_flow = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/initialize/flow.js"() {
      init_micromark_core_commonmark();
      init_micromark_factory_space();
      flow = {
        tokenize: initializeFlow
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/initialize/text.js
  function initializeFactory(field) {
    return {
      tokenize: initializeText,
      resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
    };
    function initializeText(effects) {
      const self = this;
      const constructs2 = this.parser.constructs[field];
      const text4 = effects.attempt(constructs2, start, notText);
      return start;
      function start(code2) {
        return atBreak(code2) ? text4(code2) : notText(code2);
      }
      function notText(code2) {
        if (code2 === null) {
          effects.consume(code2);
          return;
        }
        effects.enter("data");
        effects.consume(code2);
        return data;
      }
      function data(code2) {
        if (atBreak(code2)) {
          effects.exit("data");
          return text4(code2);
        }
        effects.consume(code2);
        return data;
      }
      function atBreak(code2) {
        if (code2 === null) {
          return true;
        }
        const list3 = constructs2[code2];
        let index2 = -1;
        if (list3) {
          while (++index2 < list3.length) {
            const item = list3[index2];
            if (!item.previous || item.previous.call(self, self.previous)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  function createResolver(extraResolver) {
    return resolveAllText;
    function resolveAllText(events, context) {
      let index2 = -1;
      let enter;
      while (++index2 <= events.length) {
        if (enter === void 0) {
          if (events[index2] && events[index2][1].type === "data") {
            enter = index2;
            index2++;
          }
        } else if (!events[index2] || events[index2][1].type !== "data") {
          if (index2 !== enter + 2) {
            events[enter][1].end = events[index2 - 1][1].end;
            events.splice(enter + 2, index2 - enter - 2);
            index2 = enter + 2;
          }
          enter = void 0;
        }
      }
      return extraResolver ? extraResolver(events, context) : events;
    }
  }
  function resolveAllLineSuffixes(events, context) {
    let eventIndex = 0;
    while (++eventIndex <= events.length) {
      if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
        const data = events[eventIndex - 1][1];
        const chunks = context.sliceStream(data);
        let index2 = chunks.length;
        let bufferIndex = -1;
        let size = 0;
        let tabs;
        while (index2--) {
          const chunk = chunks[index2];
          if (typeof chunk === "string") {
            bufferIndex = chunk.length;
            while (chunk.charCodeAt(bufferIndex - 1) === 32) {
              size++;
              bufferIndex--;
            }
            if (bufferIndex)
              break;
            bufferIndex = -1;
          } else if (chunk === -2) {
            tabs = true;
            size++;
          } else if (chunk === -1) {
          } else {
            index2++;
            break;
          }
        }
        if (size) {
          const token = {
            type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
            start: {
              line: data.end.line,
              column: data.end.column - size,
              offset: data.end.offset - size,
              _index: data.start._index + index2,
              _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex
            },
            end: Object.assign({}, data.end)
          };
          data.end = Object.assign({}, token.start);
          if (data.start.offset === data.end.offset) {
            Object.assign(data, token);
          } else {
            events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
            eventIndex += 2;
          }
        }
        eventIndex++;
      }
    }
    return events;
  }
  var resolver, string, text;
  var init_text = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/initialize/text.js"() {
      resolver = {
        resolveAll: createResolver()
      };
      string = initializeFactory("string");
      text = initializeFactory("text");
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/create-tokenizer.js
  function createTokenizer(parser, initialize, from) {
    let point3 = Object.assign(from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    }, {
      _index: 0,
      _bufferIndex: -1
    });
    const columnStart = {};
    const resolveAllConstructs = [];
    let chunks = [];
    let stack = [];
    let consumed = true;
    const effects = {
      consume,
      enter,
      exit: exit2,
      attempt: constructFactory(onsuccessfulconstruct),
      check: constructFactory(onsuccessfulcheck),
      interrupt: constructFactory(onsuccessfulcheck, {
        interrupt: true
      })
    };
    const context = {
      previous: null,
      code: null,
      containerState: {},
      events: [],
      parser,
      sliceStream,
      sliceSerialize,
      now,
      defineSkip,
      write
    };
    let state = initialize.tokenize.call(context, effects);
    let expectedCode;
    if (initialize.resolveAll) {
      resolveAllConstructs.push(initialize);
    }
    return context;
    function write(slice) {
      chunks = push(chunks, slice);
      main();
      if (chunks[chunks.length - 1] !== null) {
        return [];
      }
      addResult(initialize, 0);
      context.events = resolveAll(resolveAllConstructs, context.events, context);
      return context.events;
    }
    function sliceSerialize(token, expandTabs) {
      return serializeChunks(sliceStream(token), expandTabs);
    }
    function sliceStream(token) {
      return sliceChunks(chunks, token);
    }
    function now() {
      return Object.assign({}, point3);
    }
    function defineSkip(value) {
      columnStart[value.line] = value.column;
      accountForPotentialSkip();
    }
    function main() {
      let chunkIndex;
      while (point3._index < chunks.length) {
        const chunk = chunks[point3._index];
        if (typeof chunk === "string") {
          chunkIndex = point3._index;
          if (point3._bufferIndex < 0) {
            point3._bufferIndex = 0;
          }
          while (point3._index === chunkIndex && point3._bufferIndex < chunk.length) {
            go(chunk.charCodeAt(point3._bufferIndex));
          }
        } else {
          go(chunk);
        }
      }
    }
    function go(code2) {
      consumed = void 0;
      expectedCode = code2;
      state = state(code2);
    }
    function consume(code2) {
      if (markdownLineEnding(code2)) {
        point3.line++;
        point3.column = 1;
        point3.offset += code2 === -3 ? 2 : 1;
        accountForPotentialSkip();
      } else if (code2 !== -1) {
        point3.column++;
        point3.offset++;
      }
      if (point3._bufferIndex < 0) {
        point3._index++;
      } else {
        point3._bufferIndex++;
        if (point3._bufferIndex === chunks[point3._index].length) {
          point3._bufferIndex = -1;
          point3._index++;
        }
      }
      context.previous = code2;
      consumed = true;
    }
    function enter(type, fields) {
      const token = fields || {};
      token.type = type;
      token.start = now();
      context.events.push(["enter", token, context]);
      stack.push(token);
      return token;
    }
    function exit2(type) {
      const token = stack.pop();
      token.end = now();
      context.events.push(["exit", token, context]);
      return token;
    }
    function onsuccessfulconstruct(construct, info) {
      addResult(construct, info.from);
    }
    function onsuccessfulcheck(_, info) {
      info.restore();
    }
    function constructFactory(onreturn, fields) {
      return hook;
      function hook(constructs2, returnState, bogusState) {
        let listOfConstructs;
        let constructIndex;
        let currentConstruct;
        let info;
        return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? handleListOfConstructs([constructs2]) : handleMapOfConstructs(constructs2);
        function handleMapOfConstructs(map) {
          return start;
          function start(code2) {
            const def = code2 !== null && map[code2];
            const all3 = code2 !== null && map.null;
            const list3 = [
              ...Array.isArray(def) ? def : def ? [def] : [],
              ...Array.isArray(all3) ? all3 : all3 ? [all3] : []
            ];
            return handleListOfConstructs(list3)(code2);
          }
        }
        function handleListOfConstructs(list3) {
          listOfConstructs = list3;
          constructIndex = 0;
          if (list3.length === 0) {
            return bogusState;
          }
          return handleConstruct(list3[constructIndex]);
        }
        function handleConstruct(construct) {
          return start;
          function start(code2) {
            info = store();
            currentConstruct = construct;
            if (!construct.partial) {
              context.currentConstruct = construct;
            }
            if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
              return nok(code2);
            }
            return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok2, nok)(code2);
          }
        }
        function ok2(code2) {
          consumed = true;
          onreturn(currentConstruct, info);
          return returnState;
        }
        function nok(code2) {
          consumed = true;
          info.restore();
          if (++constructIndex < listOfConstructs.length) {
            return handleConstruct(listOfConstructs[constructIndex]);
          }
          return bogusState;
        }
      }
    }
    function addResult(construct, from2) {
      if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
        resolveAllConstructs.push(construct);
      }
      if (construct.resolve) {
        splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
      }
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context);
      }
    }
    function store() {
      const startPoint = now();
      const startPrevious = context.previous;
      const startCurrentConstruct = context.currentConstruct;
      const startEventsIndex = context.events.length;
      const startStack = Array.from(stack);
      return {
        restore,
        from: startEventsIndex
      };
      function restore() {
        point3 = startPoint;
        context.previous = startPrevious;
        context.currentConstruct = startCurrentConstruct;
        context.events.length = startEventsIndex;
        stack = startStack;
        accountForPotentialSkip();
      }
    }
    function accountForPotentialSkip() {
      if (point3.line in columnStart && point3.column < 2) {
        point3.column = columnStart[point3.line];
        point3.offset += columnStart[point3.line] - 1;
      }
    }
  }
  function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    let view;
    if (startIndex === endIndex) {
      view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
    } else {
      view = chunks.slice(startIndex, endIndex);
      if (startBufferIndex > -1) {
        view[0] = view[0].slice(startBufferIndex);
      }
      if (endBufferIndex > 0) {
        view.push(chunks[endIndex].slice(0, endBufferIndex));
      }
    }
    return view;
  }
  function serializeChunks(chunks, expandTabs) {
    let index2 = -1;
    const result = [];
    let atTab;
    while (++index2 < chunks.length) {
      const chunk = chunks[index2];
      let value;
      if (typeof chunk === "string") {
        value = chunk;
      } else
        switch (chunk) {
          case -5: {
            value = "\r";
            break;
          }
          case -4: {
            value = "\n";
            break;
          }
          case -3: {
            value = "\r\n";
            break;
          }
          case -2: {
            value = expandTabs ? " " : "	";
            break;
          }
          case -1: {
            if (!expandTabs && atTab)
              continue;
            value = " ";
            break;
          }
          default: {
            value = String.fromCharCode(chunk);
          }
        }
      atTab = chunk === -2;
      result.push(value);
    }
    return result.join("");
  }
  var init_create_tokenizer = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/create-tokenizer.js"() {
      init_micromark_util_character();
      init_micromark_util_chunked();
      init_micromark_util_resolve_all();
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/constructs.js
  var constructs_exports = {};
  __export(constructs_exports, {
    attentionMarkers: () => attentionMarkers,
    contentInitial: () => contentInitial,
    disable: () => disable,
    document: () => document3,
    flow: () => flow2,
    flowInitial: () => flowInitial,
    insideSpan: () => insideSpan,
    string: () => string2,
    text: () => text2
  });
  var document3, contentInitial, flowInitial, flow2, string2, text2, insideSpan, attentionMarkers, disable;
  var init_constructs = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/constructs.js"() {
      init_micromark_core_commonmark();
      init_text();
      document3 = {
        [42]: list,
        [43]: list,
        [45]: list,
        [48]: list,
        [49]: list,
        [50]: list,
        [51]: list,
        [52]: list,
        [53]: list,
        [54]: list,
        [55]: list,
        [56]: list,
        [57]: list,
        [62]: blockQuote
      };
      contentInitial = {
        [91]: definition
      };
      flowInitial = {
        [-2]: codeIndented,
        [-1]: codeIndented,
        [32]: codeIndented
      };
      flow2 = {
        [35]: headingAtx,
        [42]: thematicBreak,
        [45]: [setextUnderline, thematicBreak],
        [60]: htmlFlow,
        [61]: setextUnderline,
        [95]: thematicBreak,
        [96]: codeFenced,
        [126]: codeFenced
      };
      string2 = {
        [38]: characterReference,
        [92]: characterEscape
      };
      text2 = {
        [-5]: lineEnding,
        [-4]: lineEnding,
        [-3]: lineEnding,
        [33]: labelStartImage,
        [38]: characterReference,
        [42]: attention,
        [60]: [autolink, htmlText],
        [91]: labelStartLink,
        [92]: [hardBreakEscape, characterEscape],
        [93]: labelEnd,
        [95]: attention,
        [96]: codeText
      };
      insideSpan = {
        null: [attention, resolver]
      };
      attentionMarkers = {
        null: [42, 95]
      };
      disable = {
        null: []
      };
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/parse.js
  function parse(options = {}) {
    const constructs2 = combineExtensions([constructs_exports].concat(options.extensions || []));
    const parser = {
      defined: [],
      lazy: {},
      constructs: constructs2,
      content: create2(content),
      document: create2(document2),
      flow: create2(flow),
      string: create2(string),
      text: create2(text)
    };
    return parser;
    function create2(initial) {
      return creator;
      function creator(from) {
        return createTokenizer(parser, initial, from);
      }
    }
  }
  var init_parse = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/parse.js"() {
      init_micromark_util_combine_extensions();
      init_content();
      init_document();
      init_flow();
      init_text();
      init_create_tokenizer();
      init_constructs();
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/preprocess.js
  function preprocess() {
    let column = 1;
    let buffer2 = "";
    let start = true;
    let atCarriageReturn;
    return preprocessor;
    function preprocessor(value, encoding, end) {
      const chunks = [];
      let match;
      let next;
      let startPosition;
      let endPosition;
      let code2;
      value = buffer2 + value.toString(encoding);
      startPosition = 0;
      buffer2 = "";
      if (start) {
        if (value.charCodeAt(0) === 65279) {
          startPosition++;
        }
        start = void 0;
      }
      while (startPosition < value.length) {
        search.lastIndex = startPosition;
        match = search.exec(value);
        endPosition = match && match.index !== void 0 ? match.index : value.length;
        code2 = value.charCodeAt(endPosition);
        if (!match) {
          buffer2 = value.slice(startPosition);
          break;
        }
        if (code2 === 10 && startPosition === endPosition && atCarriageReturn) {
          chunks.push(-3);
          atCarriageReturn = void 0;
        } else {
          if (atCarriageReturn) {
            chunks.push(-5);
            atCarriageReturn = void 0;
          }
          if (startPosition < endPosition) {
            chunks.push(value.slice(startPosition, endPosition));
            column += endPosition - startPosition;
          }
          switch (code2) {
            case 0: {
              chunks.push(65533);
              column++;
              break;
            }
            case 9: {
              next = Math.ceil(column / 4) * 4;
              chunks.push(-2);
              while (column++ < next)
                chunks.push(-1);
              break;
            }
            case 10: {
              chunks.push(-4);
              column = 1;
              break;
            }
            default: {
              atCarriageReturn = true;
              column = 1;
            }
          }
        }
        startPosition = endPosition + 1;
      }
      if (end) {
        if (atCarriageReturn)
          chunks.push(-5);
        if (buffer2)
          chunks.push(buffer2);
        chunks.push(null);
      }
      return chunks;
    }
  }
  var search;
  var init_preprocess = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/preprocess.js"() {
      search = /[\0\t\n\r]/g;
    }
  });

  // example/.central/.central-build/node_modules/micromark/lib/postprocess.js
  function postprocess(events) {
    while (!subtokenize(events)) {
    }
    return events;
  }
  var init_postprocess = __esm({
    "example/.central/.central-build/node_modules/micromark/lib/postprocess.js"() {
      init_micromark_util_subtokenize();
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-decode-numeric-character-reference/index.js
  function decodeNumericCharacterReference(value, base2) {
    const code2 = Number.parseInt(value, base2);
    if (code2 < 9 || code2 === 11 || code2 > 13 && code2 < 32 || code2 > 126 && code2 < 160 || code2 > 55295 && code2 < 57344 || code2 > 64975 && code2 < 65008 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534 || code2 > 1114111) {
      return "\uFFFD";
    }
    return String.fromCharCode(code2);
  }
  var init_micromark_util_decode_numeric_character_reference = __esm({
    "example/.central/.central-build/node_modules/micromark-util-decode-numeric-character-reference/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/micromark-util-decode-string/index.js
  function decodeString(value) {
    return value.replace(characterEscapeOrReference, decode);
  }
  function decode($0, $1, $2) {
    if ($1) {
      return $1;
    }
    const head = $2.charCodeAt(0);
    if (head === 35) {
      const head2 = $2.charCodeAt(1);
      const hex = head2 === 120 || head2 === 88;
      return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
    }
    return decodeNamedCharacterReference($2) || $0;
  }
  var characterEscapeOrReference;
  var init_micromark_util_decode_string = __esm({
    "example/.central/.central-build/node_modules/micromark-util-decode-string/index.js"() {
      init_index_dom();
      init_micromark_util_decode_numeric_character_reference();
      characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-from-markdown/lib/index.js
  function compiler(options = {}) {
    const config = configure({
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong"
      ],
      enter: {
        autolink: opener(link2),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading2),
        blockQuote: opener(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer2,
        codeFencedFenceMeta: buffer2,
        codeIndented: opener(codeFlow, buffer2),
        codeText: opener(codeText2, buffer2),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition2),
        definitionDestinationString: buffer2,
        definitionLabelString: buffer2,
        definitionTitleString: buffer2,
        emphasis: opener(emphasis2),
        hardBreakEscape: opener(hardBreak2),
        hardBreakTrailing: opener(hardBreak2),
        htmlFlow: opener(html4, buffer2),
        htmlFlowData: onenterdata,
        htmlText: opener(html4, buffer2),
        htmlTextData: onenterdata,
        image: opener(image2),
        label: buffer2,
        link: opener(link2),
        listItem: opener(listItem2),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list3, onenterlistordered),
        listUnordered: opener(list3),
        paragraph: opener(paragraph2),
        reference: onenterreference,
        referenceString: buffer2,
        resourceDestinationString: buffer2,
        resourceTitleString: buffer2,
        setextHeading: opener(heading2),
        strong: opener(strong2),
        thematicBreak: opener(thematicBreak3)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    }, options.mdastExtensions || []);
    const data = {};
    return compile;
    function compile(events) {
      let tree = {
        type: "root",
        children: []
      };
      const stack = [tree];
      const tokenStack = [];
      const listStack = [];
      const context = {
        stack,
        tokenStack,
        config,
        enter,
        exit: exit2,
        buffer: buffer2,
        resume,
        setData,
        getData
      };
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
          if (events[index2][0] === "enter") {
            listStack.push(index2);
          } else {
            const tail = listStack.pop();
            index2 = prepareList(events, tail, index2);
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        const handler = config[events[index2][0]];
        if (own2.call(handler, events[index2][1].type)) {
          handler[events[index2][1].type].call(Object.assign({
            sliceSerialize: events[index2][2].sliceSerialize
          }, context), events[index2][1]);
        }
      }
      if (tokenStack.length > 0) {
        const tail = tokenStack[tokenStack.length - 1];
        const handler = tail[1] || defaultOnError;
        handler.call(context, void 0, tail[0]);
      }
      tree.position = {
        start: point3(events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }),
        end: point3(events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        })
      };
      index2 = -1;
      while (++index2 < config.transforms.length) {
        tree = config.transforms[index2](tree) || tree;
      }
      return tree;
    }
    function prepareList(events, start, length) {
      let index2 = start - 1;
      let containerBalance = -1;
      let listSpread = false;
      let listItem3;
      let lineIndex;
      let firstBlankLineIndex;
      let atMarker;
      while (++index2 <= length) {
        const event = events[index2];
        if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
          if (event[0] === "enter") {
            containerBalance++;
          } else {
            containerBalance--;
          }
          atMarker = void 0;
        } else if (event[1].type === "lineEndingBlank") {
          if (event[0] === "enter") {
            if (listItem3 && !atMarker && !containerBalance && !firstBlankLineIndex) {
              firstBlankLineIndex = index2;
            }
            atMarker = void 0;
          }
        } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {
        } else {
          atMarker = void 0;
        }
        if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
          if (listItem3) {
            let tailIndex = index2;
            lineIndex = void 0;
            while (tailIndex--) {
              const tailEvent = events[tailIndex];
              if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
                if (tailEvent[0] === "exit")
                  continue;
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                  listSpread = true;
                }
                tailEvent[1].type = "lineEnding";
                lineIndex = tailIndex;
              } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
              } else {
                break;
              }
            }
            if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
              listItem3._spread = true;
            }
            listItem3.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
            events.splice(lineIndex || index2, 0, ["exit", listItem3, event[2]]);
            index2++;
            length++;
          }
          if (event[1].type === "listItemPrefix") {
            listItem3 = {
              type: "listItem",
              _spread: false,
              start: Object.assign({}, event[1].start)
            };
            events.splice(index2, 0, ["enter", listItem3, event[2]]);
            index2++;
            length++;
            firstBlankLineIndex = void 0;
            atMarker = true;
          }
        }
      }
      events[start][1]._spread = listSpread;
      return length;
    }
    function setData(key, value) {
      data[key] = value;
    }
    function getData(key) {
      return data[key];
    }
    function point3(d) {
      return {
        line: d.line,
        column: d.column,
        offset: d.offset
      };
    }
    function opener(create2, and) {
      return open;
      function open(token) {
        enter.call(this, create2(token), token);
        if (and)
          and.call(this, token);
      }
    }
    function buffer2() {
      this.stack.push({
        type: "fragment",
        children: []
      });
    }
    function enter(node, token, errorHandler) {
      const parent = this.stack[this.stack.length - 1];
      parent.children.push(node);
      this.stack.push(node);
      this.tokenStack.push([token, errorHandler]);
      node.position = {
        start: point3(token.start)
      };
      return node;
    }
    function closer(and) {
      return close;
      function close(token) {
        if (and)
          and.call(this, token);
        exit2.call(this, token);
      }
    }
    function exit2(token, onExitError) {
      const node = this.stack.pop();
      const open = this.tokenStack.pop();
      if (!open) {
        throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open");
      } else if (open[0].type !== token.type) {
        if (onExitError) {
          onExitError.call(this, token, open[0]);
        } else {
          const handler = open[1] || defaultOnError;
          handler.call(this, token, open[0]);
        }
      }
      node.position.end = point3(token.end);
      return node;
    }
    function resume() {
      return toString(this.stack.pop());
    }
    function onenterlistordered() {
      setData("expectingFirstListItemValue", true);
    }
    function onenterlistitemvalue(token) {
      if (getData("expectingFirstListItemValue")) {
        const ancestor = this.stack[this.stack.length - 2];
        ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
        setData("expectingFirstListItemValue");
      }
    }
    function onexitcodefencedfenceinfo() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.lang = data2;
    }
    function onexitcodefencedfencemeta() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.meta = data2;
    }
    function onexitcodefencedfence() {
      if (getData("flowCodeInside"))
        return;
      this.buffer();
      setData("flowCodeInside", true);
    }
    function onexitcodefenced() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
      setData("flowCodeInside");
    }
    function onexitcodeindented() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data2.replace(/(\r?\n|\r)$/g, "");
    }
    function onexitdefinitionlabelstring(token) {
      const label = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.label = label;
      node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }
    function onexitdefinitiontitlestring() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.title = data2;
    }
    function onexitdefinitiondestinationstring() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.url = data2;
    }
    function onexitatxheadingsequence(token) {
      const node = this.stack[this.stack.length - 1];
      if (!node.depth) {
        const depth = this.sliceSerialize(token).length;
        node.depth = depth;
      }
    }
    function onexitsetextheadingtext() {
      setData("setextHeadingSlurpLineEnding", true);
    }
    function onexitsetextheadinglinesequence(token) {
      const node = this.stack[this.stack.length - 1];
      node.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
    }
    function onexitsetextheading() {
      setData("setextHeadingSlurpLineEnding");
    }
    function onenterdata(token) {
      const parent = this.stack[this.stack.length - 1];
      let tail = parent.children[parent.children.length - 1];
      if (!tail || tail.type !== "text") {
        tail = text4();
        tail.position = {
          start: point3(token.start)
        };
        parent.children.push(tail);
      }
      this.stack.push(tail);
    }
    function onexitdata(token) {
      const tail = this.stack.pop();
      tail.value += this.sliceSerialize(token);
      tail.position.end = point3(token.end);
    }
    function onexitlineending(token) {
      const context = this.stack[this.stack.length - 1];
      if (getData("atHardBreak")) {
        const tail = context.children[context.children.length - 1];
        tail.position.end = point3(token.end);
        setData("atHardBreak");
        return;
      }
      if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.includes(context.type)) {
        onenterdata.call(this, token);
        onexitdata.call(this, token);
      }
    }
    function onexithardbreak() {
      setData("atHardBreak", true);
    }
    function onexithtmlflow() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data2;
    }
    function onexithtmltext() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data2;
    }
    function onexitcodetext() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data2;
    }
    function onexitlink() {
      const context = this.stack[this.stack.length - 1];
      if (getData("inReference")) {
        context.type += "Reference";
        context.referenceType = getData("referenceType") || "shortcut";
        delete context.url;
        delete context.title;
      } else {
        delete context.identifier;
        delete context.label;
      }
      setData("referenceType");
    }
    function onexitimage() {
      const context = this.stack[this.stack.length - 1];
      if (getData("inReference")) {
        context.type += "Reference";
        context.referenceType = getData("referenceType") || "shortcut";
        delete context.url;
        delete context.title;
      } else {
        delete context.identifier;
        delete context.label;
      }
      setData("referenceType");
    }
    function onexitlabeltext(token) {
      const ancestor = this.stack[this.stack.length - 2];
      const string3 = this.sliceSerialize(token);
      ancestor.label = decodeString(string3);
      ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
    }
    function onexitlabel() {
      const fragment = this.stack[this.stack.length - 1];
      const value = this.resume();
      const node = this.stack[this.stack.length - 1];
      setData("inReference", true);
      if (node.type === "link") {
        node.children = fragment.children;
      } else {
        node.alt = value;
      }
    }
    function onexitresourcedestinationstring() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.url = data2;
    }
    function onexitresourcetitlestring() {
      const data2 = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.title = data2;
    }
    function onexitresource() {
      setData("inReference");
    }
    function onenterreference() {
      setData("referenceType", "collapsed");
    }
    function onexitreferencestring(token) {
      const label = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.label = label;
      node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
      setData("referenceType", "full");
    }
    function onexitcharacterreferencemarker(token) {
      setData("characterReferenceType", token.type);
    }
    function onexitcharacterreferencevalue(token) {
      const data2 = this.sliceSerialize(token);
      const type = getData("characterReferenceType");
      let value;
      if (type) {
        value = decodeNumericCharacterReference(data2, type === "characterReferenceMarkerNumeric" ? 10 : 16);
        setData("characterReferenceType");
      } else {
        value = decodeNamedCharacterReference(data2);
      }
      const tail = this.stack.pop();
      tail.value += value;
      tail.position.end = point3(token.end);
    }
    function onexitautolinkprotocol(token) {
      onexitdata.call(this, token);
      const node = this.stack[this.stack.length - 1];
      node.url = this.sliceSerialize(token);
    }
    function onexitautolinkemail(token) {
      onexitdata.call(this, token);
      const node = this.stack[this.stack.length - 1];
      node.url = "mailto:" + this.sliceSerialize(token);
    }
    function blockQuote2() {
      return {
        type: "blockquote",
        children: []
      };
    }
    function codeFlow() {
      return {
        type: "code",
        lang: null,
        meta: null,
        value: ""
      };
    }
    function codeText2() {
      return {
        type: "inlineCode",
        value: ""
      };
    }
    function definition2() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function emphasis2() {
      return {
        type: "emphasis",
        children: []
      };
    }
    function heading2() {
      return {
        type: "heading",
        depth: void 0,
        children: []
      };
    }
    function hardBreak2() {
      return {
        type: "break"
      };
    }
    function html4() {
      return {
        type: "html",
        value: ""
      };
    }
    function image2() {
      return {
        type: "image",
        title: null,
        url: "",
        alt: null
      };
    }
    function link2() {
      return {
        type: "link",
        title: null,
        url: "",
        children: []
      };
    }
    function list3(token) {
      return {
        type: "list",
        ordered: token.type === "listOrdered",
        start: null,
        spread: token._spread,
        children: []
      };
    }
    function listItem2(token) {
      return {
        type: "listItem",
        spread: token._spread,
        checked: null,
        children: []
      };
    }
    function paragraph2() {
      return {
        type: "paragraph",
        children: []
      };
    }
    function strong2() {
      return {
        type: "strong",
        children: []
      };
    }
    function text4() {
      return {
        type: "text",
        value: ""
      };
    }
    function thematicBreak3() {
      return {
        type: "thematicBreak"
      };
    }
  }
  function configure(combined, extensions) {
    let index2 = -1;
    while (++index2 < extensions.length) {
      const value = extensions[index2];
      if (Array.isArray(value)) {
        configure(combined, value);
      } else {
        extension(combined, value);
      }
    }
    return combined;
  }
  function extension(combined, extension2) {
    let key;
    for (key in extension2) {
      if (own2.call(extension2, key)) {
        const list3 = key === "canContainEols" || key === "transforms";
        const maybe = own2.call(combined, key) ? combined[key] : void 0;
        const left = maybe || (combined[key] = list3 ? [] : {});
        const right = extension2[key];
        if (right) {
          if (list3) {
            combined[key] = [...left, ...right];
          } else {
            Object.assign(left, right);
          }
        }
      }
    }
  }
  function defaultOnError(left, right) {
    if (left) {
      throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open");
    } else {
      throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open");
    }
  }
  var own2, fromMarkdown;
  var init_lib3 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-from-markdown/lib/index.js"() {
      init_mdast_util_to_string();
      init_parse();
      init_preprocess();
      init_postprocess();
      init_micromark_util_decode_numeric_character_reference();
      init_micromark_util_decode_string();
      init_micromark_util_normalize_identifier();
      init_index_dom();
      init_unist_util_stringify_position();
      own2 = {}.hasOwnProperty;
      fromMarkdown = function(value, encoding, options) {
        if (typeof encoding !== "string") {
          options = encoding;
          encoding = void 0;
        }
        return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
      };
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-from-markdown/index.js
  var init_mdast_util_from_markdown = __esm({
    "example/.central/.central-build/node_modules/mdast-util-from-markdown/index.js"() {
      init_lib3();
    }
  });

  // example/.central/.central-build/node_modules/remark-parse/lib/index.js
  function remarkParse(options) {
    const parser = (doc) => {
      const settings = this.data("settings");
      return fromMarkdown(doc, Object.assign({}, settings, options, {
        extensions: this.data("micromarkExtensions") || [],
        mdastExtensions: this.data("fromMarkdownExtensions") || []
      }));
    };
    Object.assign(this, { Parser: parser });
  }
  var init_lib4 = __esm({
    "example/.central/.central-build/node_modules/remark-parse/lib/index.js"() {
      init_mdast_util_from_markdown();
    }
  });

  // example/.central/.central-build/node_modules/remark-parse/index.js
  var remark_parse_default;
  var init_remark_parse = __esm({
    "example/.central/.central-build/node_modules/remark-parse/index.js"() {
      init_lib4();
      remark_parse_default = remarkParse;
    }
  });

  // example/.central/.central-build/node_modules/unist-builder/index.js
  var u;
  var init_unist_builder = __esm({
    "example/.central/.central-build/node_modules/unist-builder/index.js"() {
      u = function(type, props, value) {
        var node = { type: String(type) };
        if ((value === void 0 || value === null) && (typeof props === "string" || Array.isArray(props))) {
          value = props;
        } else {
          Object.assign(node, props);
        }
        if (Array.isArray(value)) {
          node.children = value;
        } else if (value !== void 0 && value !== null) {
          node.value = String(value);
        }
        return node;
      };
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/traverse.js
  function unknown(h, node) {
    const data = node.data || {};
    if ("value" in node && !(own3.call(data, "hName") || own3.call(data, "hProperties") || own3.call(data, "hChildren"))) {
      return h.augment(node, u("text", node.value));
    }
    return h(node, "div", all2(h, node));
  }
  function one2(h, node, parent) {
    const type = node && node.type;
    let fn;
    if (!type) {
      throw new Error("Expected node, got `" + node + "`");
    }
    if (own3.call(h.handlers, type)) {
      fn = h.handlers[type];
    } else if (h.passThrough && h.passThrough.includes(type)) {
      fn = returnNode;
    } else {
      fn = h.unknownHandler;
    }
    return (typeof fn === "function" ? fn : unknown)(h, node, parent);
  }
  function returnNode(h, node) {
    return "children" in node ? { ...node, children: all2(h, node) } : node;
  }
  function all2(h, parent) {
    const values = [];
    if ("children" in parent) {
      const nodes = parent.children;
      let index2 = -1;
      while (++index2 < nodes.length) {
        const result = one2(h, nodes[index2], parent);
        if (result) {
          if (index2 && nodes[index2 - 1].type === "break") {
            if (!Array.isArray(result) && result.type === "text") {
              result.value = result.value.replace(/^\s+/, "");
            }
            if (!Array.isArray(result) && result.type === "element") {
              const head = result.children[0];
              if (head && head.type === "text") {
                head.value = head.value.replace(/^\s+/, "");
              }
            }
          }
          if (Array.isArray(result)) {
            values.push(...result);
          } else {
            values.push(result);
          }
        }
      }
    }
    return values;
  }
  var own3;
  var init_traverse = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/traverse.js"() {
      init_unist_builder();
      own3 = {}.hasOwnProperty;
    }
  });

  // example/.central/.central-build/node_modules/unist-util-is/index.js
  function anyFactory(tests) {
    const checks2 = [];
    let index2 = -1;
    while (++index2 < tests.length) {
      checks2[index2] = convert(tests[index2]);
    }
    return castFactory(any);
    function any(...parameters) {
      let index3 = -1;
      while (++index3 < checks2.length) {
        if (checks2[index3].call(this, ...parameters))
          return true;
      }
      return false;
    }
  }
  function propsFactory(check) {
    return castFactory(all3);
    function all3(node) {
      let key;
      for (key in check) {
        if (node[key] !== check[key])
          return false;
      }
      return true;
    }
  }
  function typeFactory(check) {
    return castFactory(type);
    function type(node) {
      return node && node.type === check;
    }
  }
  function castFactory(check) {
    return assertion;
    function assertion(...parameters) {
      return Boolean(check.call(this, ...parameters));
    }
  }
  function ok() {
    return true;
  }
  var convert;
  var init_unist_util_is = __esm({
    "example/.central/.central-build/node_modules/unist-util-is/index.js"() {
      convert = function(test) {
        if (test === void 0 || test === null) {
          return ok;
        }
        if (typeof test === "string") {
          return typeFactory(test);
        }
        if (typeof test === "object") {
          return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
        }
        if (typeof test === "function") {
          return castFactory(test);
        }
        throw new Error("Expected function, string, or object as test");
      };
    }
  });

  // example/.central/.central-build/node_modules/unist-util-visit-parents/color.browser.js
  function color(d) {
    return d;
  }
  var init_color_browser = __esm({
    "example/.central/.central-build/node_modules/unist-util-visit-parents/color.browser.js"() {
    }
  });

  // example/.central/.central-build/node_modules/unist-util-visit-parents/index.js
  function toResult(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "number") {
      return [CONTINUE, value];
    }
    return [value];
  }
  var CONTINUE, SKIP, EXIT, visitParents;
  var init_unist_util_visit_parents = __esm({
    "example/.central/.central-build/node_modules/unist-util-visit-parents/index.js"() {
      init_unist_util_is();
      init_color_browser();
      CONTINUE = true;
      SKIP = "skip";
      EXIT = false;
      visitParents = function(tree, test, visitor, reverse) {
        if (typeof test === "function" && typeof visitor !== "function") {
          reverse = visitor;
          visitor = test;
          test = null;
        }
        const is = convert(test);
        const step = reverse ? -1 : 1;
        factory2(tree, null, [])();
        function factory2(node, index2, parents) {
          const value = typeof node === "object" && node !== null ? node : {};
          let name;
          if (typeof value.type === "string") {
            name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
            Object.defineProperty(visit3, "name", {
              value: "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")"
            });
          }
          return visit3;
          function visit3() {
            let result = [];
            let subresult;
            let offset;
            let grandparents;
            if (!test || is(node, index2, parents[parents.length - 1] || null)) {
              result = toResult(visitor(node, parents));
              if (result[0] === EXIT) {
                return result;
              }
            }
            if (node.children && result[0] !== SKIP) {
              offset = (reverse ? node.children.length : -1) + step;
              grandparents = parents.concat(node);
              while (offset > -1 && offset < node.children.length) {
                subresult = factory2(node.children[offset], offset, grandparents)();
                if (subresult[0] === EXIT) {
                  return subresult;
                }
                offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
              }
            }
            return result;
          }
        }
      };
    }
  });

  // example/.central/.central-build/node_modules/unist-util-visit/index.js
  var visit;
  var init_unist_util_visit = __esm({
    "example/.central/.central-build/node_modules/unist-util-visit/index.js"() {
      init_unist_util_visit_parents();
      visit = function(tree, test, visitor, reverse) {
        if (typeof test === "function" && typeof visitor !== "function") {
          reverse = visitor;
          visitor = test;
          test = null;
        }
        visitParents(tree, test, overload, reverse);
        function overload(node, parents) {
          const parent = parents[parents.length - 1];
          return visitor(node, parent ? parent.children.indexOf(node) : null, parent);
        }
      };
    }
  });

  // example/.central/.central-build/node_modules/unist-util-position/index.js
  function point2(type) {
    return point3;
    function point3(node) {
      const point4 = node && node.position && node.position[type] || {};
      return {
        line: point4.line || null,
        column: point4.column || null,
        offset: point4.offset > -1 ? point4.offset : null
      };
    }
  }
  var pointStart, pointEnd;
  var init_unist_util_position = __esm({
    "example/.central/.central-build/node_modules/unist-util-position/index.js"() {
      pointStart = point2("start");
      pointEnd = point2("end");
    }
  });

  // example/.central/.central-build/node_modules/unist-util-generated/index.js
  function generated(node) {
    return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
  }
  var init_unist_util_generated = __esm({
    "example/.central/.central-build/node_modules/unist-util-generated/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-definitions/node_modules/unist-util-visit-parents/color.browser.js
  function color2(d) {
    return d;
  }
  var init_color_browser2 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-definitions/node_modules/unist-util-visit-parents/color.browser.js"() {
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-definitions/node_modules/unist-util-visit-parents/index.js
  function toResult2(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "number") {
      return [CONTINUE2, value];
    }
    return [value];
  }
  var CONTINUE2, SKIP2, EXIT2, visitParents2;
  var init_unist_util_visit_parents2 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-definitions/node_modules/unist-util-visit-parents/index.js"() {
      init_unist_util_is();
      init_color_browser2();
      CONTINUE2 = true;
      SKIP2 = "skip";
      EXIT2 = false;
      visitParents2 = function(tree, test, visitor, reverse) {
        if (typeof test === "function" && typeof visitor !== "function") {
          reverse = visitor;
          visitor = test;
          test = null;
        }
        var is = convert(test);
        var step = reverse ? -1 : 1;
        factory2(tree, null, [])();
        function factory2(node, index2, parents) {
          var value = typeof node === "object" && node !== null ? node : {};
          var name;
          if (typeof value.type === "string") {
            name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
            Object.defineProperty(visit3, "name", {
              value: "node (" + color2(value.type + (name ? "<" + name + ">" : "")) + ")"
            });
          }
          return visit3;
          function visit3() {
            var result = [];
            var subresult;
            var offset;
            var grandparents;
            if (!test || is(node, index2, parents[parents.length - 1] || null)) {
              result = toResult2(visitor(node, parents));
              if (result[0] === EXIT2) {
                return result;
              }
            }
            if (node.children && result[0] !== SKIP2) {
              offset = (reverse ? node.children.length : -1) + step;
              grandparents = parents.concat(node);
              while (offset > -1 && offset < node.children.length) {
                subresult = factory2(node.children[offset], offset, grandparents)();
                if (subresult[0] === EXIT2) {
                  return subresult;
                }
                offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
              }
            }
            return result;
          }
        }
      };
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-definitions/node_modules/unist-util-visit/index.js
  var visit2;
  var init_unist_util_visit2 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-definitions/node_modules/unist-util-visit/index.js"() {
      init_unist_util_visit_parents2();
      visit2 = function(tree, test, visitor, reverse) {
        if (typeof test === "function" && typeof visitor !== "function") {
          reverse = visitor;
          visitor = test;
          test = null;
        }
        visitParents2(tree, test, overload, reverse);
        function overload(node, parents) {
          var parent = parents[parents.length - 1];
          return visitor(node, parent ? parent.children.indexOf(node) : null, parent);
        }
      };
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-definitions/index.js
  function definitions(node) {
    const cache = Object.create(null);
    if (!node || !node.type) {
      throw new Error("mdast-util-definitions expected node");
    }
    visit2(node, "definition", ondefinition);
    return getDefinition;
    function ondefinition(definition2) {
      const id = clean(definition2.identifier);
      if (id && !own4.call(cache, id)) {
        cache[id] = definition2;
      }
    }
    function getDefinition(identifier) {
      const id = clean(identifier);
      return id && own4.call(cache, id) ? cache[id] : null;
    }
  }
  function clean(value) {
    return String(value || "").toUpperCase();
  }
  var own4;
  var init_mdast_util_definitions = __esm({
    "example/.central/.central-build/node_modules/mdast-util-definitions/index.js"() {
      init_unist_util_visit2();
      own4 = {}.hasOwnProperty;
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
  function thematicBreak2(h, node) {
    return h(node, "hr");
  }
  var init_thematic_break2 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js"() {
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/wrap.js
  function wrap2(nodes, loose) {
    const result = [];
    let index2 = -1;
    if (loose) {
      result.push(u("text", "\n"));
    }
    while (++index2 < nodes.length) {
      if (index2)
        result.push(u("text", "\n"));
      result.push(nodes[index2]);
    }
    if (loose && nodes.length > 0) {
      result.push(u("text", "\n"));
    }
    return result;
  }
  var init_wrap = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/wrap.js"() {
      init_unist_builder();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/list.js
  function list2(h, node) {
    const props = {};
    const name = node.ordered ? "ol" : "ul";
    const items = all2(h, node);
    let index2 = -1;
    if (typeof node.start === "number" && node.start !== 1) {
      props.start = node.start;
    }
    while (++index2 < items.length) {
      const item = items[index2];
      if (item.type === "element" && item.tagName === "li" && item.properties && Array.isArray(item.properties.className) && item.properties.className.includes("task-list-item")) {
        props.className = ["contains-task-list"];
        break;
      }
    }
    return h(node, name, props, wrap2(items, true));
  }
  var init_list2 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/list.js"() {
      init_wrap();
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/footer.js
  function footer(h) {
    const footnoteById = h.footnoteById;
    const footnoteOrder = h.footnoteOrder;
    let index2 = -1;
    const listItems = [];
    while (++index2 < footnoteOrder.length) {
      const def = footnoteById[footnoteOrder[index2].toUpperCase()];
      if (!def) {
        continue;
      }
      const marker = String(index2 + 1);
      const content3 = [...def.children];
      const backReference = {
        type: "link",
        url: "#fnref" + marker,
        data: { hProperties: { className: ["footnote-back"], role: "doc-backlink" } },
        children: [{ type: "text", value: "\u21A9" }]
      };
      const tail = content3[content3.length - 1];
      if (tail && tail.type === "paragraph") {
        tail.children.push(backReference);
      } else {
        content3.push(backReference);
      }
      listItems.push({
        type: "listItem",
        data: { hProperties: { id: "fn" + marker, role: "doc-endnote" } },
        children: content3,
        position: def.position
      });
    }
    if (listItems.length === 0) {
      return null;
    }
    return h(null, "section", { className: ["footnotes"], role: "doc-endnotes" }, wrap2([
      thematicBreak2(h),
      list2(h, { type: "list", ordered: true, children: listItems })
    ], true));
  }
  var init_footer = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/footer.js"() {
      init_thematic_break2();
      init_list2();
      init_wrap();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
  function blockquote(h, node) {
    return h(node, "blockquote", wrap2(all2(h, node), true));
  }
  var init_blockquote = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/blockquote.js"() {
      init_wrap();
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/break.js
  function hardBreak(h, node) {
    return [h(node, "br"), u("text", "\n")];
  }
  var init_break = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/break.js"() {
      init_unist_builder();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/code.js
  function code(h, node) {
    const value = node.value ? node.value + "\n" : "";
    const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
    const props = {};
    if (lang) {
      props.className = ["language-" + lang];
    }
    const code2 = h(node, "code", props, [u("text", value)]);
    if (node.meta) {
      code2.data = { meta: node.meta };
    }
    return h(node.position, "pre", [code2]);
  }
  var init_code = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/code.js"() {
      init_unist_builder();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/delete.js
  function strikethrough(h, node) {
    return h(node, "del", all2(h, node));
  }
  var init_delete = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/delete.js"() {
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
  function emphasis(h, node) {
    return h(node, "em", all2(h, node));
  }
  var init_emphasis = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/emphasis.js"() {
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
  function footnoteReference(h, node) {
    const footnoteOrder = h.footnoteOrder;
    const identifier = String(node.identifier);
    const index2 = footnoteOrder.indexOf(identifier);
    const marker = String(index2 === -1 ? footnoteOrder.push(identifier) : index2 + 1);
    return h(node, "a", {
      href: "#fn" + marker,
      className: ["footnote-ref"],
      id: "fnref" + marker,
      role: "doc-noteref"
    }, [h(node.position, "sup", [u("text", marker)])]);
  }
  var init_footnote_reference = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js"() {
      init_unist_builder();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/footnote.js
  function footnote(h, node) {
    const footnoteById = h.footnoteById;
    const footnoteOrder = h.footnoteOrder;
    let no = 1;
    while (no in footnoteById)
      no++;
    const identifier = String(no);
    footnoteOrder.push(identifier);
    footnoteById[identifier] = {
      type: "footnoteDefinition",
      identifier,
      children: [{ type: "paragraph", children: node.children }],
      position: node.position
    };
    return footnoteReference(h, {
      type: "footnoteReference",
      identifier,
      position: node.position
    });
  }
  var init_footnote = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/footnote.js"() {
      init_footnote_reference();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/heading.js
  function heading(h, node) {
    return h(node, "h" + node.depth, all2(h, node));
  }
  var init_heading = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/heading.js"() {
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/html.js
  function html(h, node) {
    return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
  }
  var init_html = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/html.js"() {
      init_unist_builder();
    }
  });

  // example/.central/.central-build/node_modules/mdurl/encode.js
  var require_encode = __commonJS({
    "example/.central/.central-build/node_modules/mdurl/encode.js"(exports, module) {
      "use strict";
      var encodeCache = {};
      function getEncodeCache(exclude) {
        var i, ch, cache = encodeCache[exclude];
        if (cache) {
          return cache;
        }
        cache = encodeCache[exclude] = [];
        for (i = 0; i < 128; i++) {
          ch = String.fromCharCode(i);
          if (/^[0-9a-z]$/i.test(ch)) {
            cache.push(ch);
          } else {
            cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
          }
        }
        for (i = 0; i < exclude.length; i++) {
          cache[exclude.charCodeAt(i)] = exclude[i];
        }
        return cache;
      }
      function encode(string3, exclude, keepEscaped) {
        var i, l, code2, nextCode, cache, result = "";
        if (typeof exclude !== "string") {
          keepEscaped = exclude;
          exclude = encode.defaultChars;
        }
        if (typeof keepEscaped === "undefined") {
          keepEscaped = true;
        }
        cache = getEncodeCache(exclude);
        for (i = 0, l = string3.length; i < l; i++) {
          code2 = string3.charCodeAt(i);
          if (keepEscaped && code2 === 37 && i + 2 < l) {
            if (/^[0-9a-f]{2}$/i.test(string3.slice(i + 1, i + 3))) {
              result += string3.slice(i, i + 3);
              i += 2;
              continue;
            }
          }
          if (code2 < 128) {
            result += cache[code2];
            continue;
          }
          if (code2 >= 55296 && code2 <= 57343) {
            if (code2 >= 55296 && code2 <= 56319 && i + 1 < l) {
              nextCode = string3.charCodeAt(i + 1);
              if (nextCode >= 56320 && nextCode <= 57343) {
                result += encodeURIComponent(string3[i] + string3[i + 1]);
                i++;
                continue;
              }
            }
            result += "%EF%BF%BD";
            continue;
          }
          result += encodeURIComponent(string3[i]);
        }
        return result;
      }
      encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
      encode.componentChars = "-_.!~*'()";
      module.exports = encode;
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/revert.js
  function revert(h, node) {
    const subtype = node.referenceType;
    let suffix = "]";
    if (subtype === "collapsed") {
      suffix += "[]";
    } else if (subtype === "full") {
      suffix += "[" + (node.label || node.identifier) + "]";
    }
    if (node.type === "imageReference") {
      return u("text", "![" + node.alt + suffix);
    }
    const contents = all2(h, node);
    const head = contents[0];
    if (head && head.type === "text") {
      head.value = "[" + head.value;
    } else {
      contents.unshift(u("text", "["));
    }
    const tail = contents[contents.length - 1];
    if (tail && tail.type === "text") {
      tail.value += suffix;
    } else {
      contents.push(u("text", suffix));
    }
    return contents;
  }
  var init_revert = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/revert.js"() {
      init_unist_builder();
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
  function imageReference(h, node) {
    const def = h.definition(node.identifier);
    if (!def) {
      return revert(h, node);
    }
    const props = { src: (0, import_encode.default)(def.url || ""), alt: node.alt };
    if (def.title !== null && def.title !== void 0) {
      props.title = def.title;
    }
    return h(node, "img", props);
  }
  var import_encode;
  var init_image_reference = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/image-reference.js"() {
      import_encode = __toModule(require_encode());
      init_revert();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/image.js
  function image(h, node) {
    const props = { src: (0, import_encode2.default)(node.url), alt: node.alt };
    if (node.title !== null && node.title !== void 0) {
      props.title = node.title;
    }
    return h(node, "img", props);
  }
  var import_encode2;
  var init_image = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/image.js"() {
      import_encode2 = __toModule(require_encode());
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
  function inlineCode(h, node) {
    return h(node, "code", [u("text", node.value.replace(/\r?\n|\r/g, " "))]);
  }
  var init_inline_code = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/inline-code.js"() {
      init_unist_builder();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
  function linkReference(h, node) {
    const def = h.definition(node.identifier);
    if (!def) {
      return revert(h, node);
    }
    const props = { href: (0, import_encode3.default)(def.url || "") };
    if (def.title !== null && def.title !== void 0) {
      props.title = def.title;
    }
    return h(node, "a", props, all2(h, node));
  }
  var import_encode3;
  var init_link_reference = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/link-reference.js"() {
      import_encode3 = __toModule(require_encode());
      init_revert();
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/link.js
  function link(h, node) {
    const props = { href: (0, import_encode4.default)(node.url) };
    if (node.title !== null && node.title !== void 0) {
      props.title = node.title;
    }
    return h(node, "a", props, all2(h, node));
  }
  var import_encode4;
  var init_link = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/link.js"() {
      import_encode4 = __toModule(require_encode());
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/list-item.js
  function listItem(h, node, parent) {
    const result = all2(h, node);
    const loose = parent ? listLoose(parent) : listItemLoose(node);
    const props = {};
    const wrapped = [];
    if (typeof node.checked === "boolean") {
      let paragraph2;
      if (result[0] && result[0].type === "element" && result[0].tagName === "p") {
        paragraph2 = result[0];
      } else {
        paragraph2 = h(null, "p", []);
        result.unshift(paragraph2);
      }
      if (paragraph2.children.length > 0) {
        paragraph2.children.unshift(u("text", " "));
      }
      paragraph2.children.unshift(h(null, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      }));
      props.className = ["task-list-item"];
    }
    let index2 = -1;
    while (++index2 < result.length) {
      const child = result[index2];
      if (loose || index2 !== 0 || child.type !== "element" || child.tagName !== "p") {
        wrapped.push(u("text", "\n"));
      }
      if (child.type === "element" && child.tagName === "p" && !loose) {
        wrapped.push(...child.children);
      } else {
        wrapped.push(child);
      }
    }
    const tail = result[result.length - 1];
    if (tail && (loose || !("tagName" in tail) || tail.tagName !== "p")) {
      wrapped.push(u("text", "\n"));
    }
    return h(node, "li", props, wrapped);
  }
  function listLoose(node) {
    let loose = node.spread;
    const children = node.children;
    let index2 = -1;
    while (!loose && ++index2 < children.length) {
      loose = listItemLoose(children[index2]);
    }
    return Boolean(loose);
  }
  function listItemLoose(node) {
    const spread = node.spread;
    return spread === void 0 || spread === null ? node.children.length > 1 : spread;
  }
  var init_list_item = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/list-item.js"() {
      init_unist_builder();
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
  function paragraph(h, node) {
    return h(node, "p", all2(h, node));
  }
  var init_paragraph = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/paragraph.js"() {
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/root.js
  function root(h, node) {
    return h.augment(node, u("root", wrap2(all2(h, node))));
  }
  var init_root = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/root.js"() {
      init_unist_builder();
      init_traverse();
      init_wrap();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/strong.js
  function strong(h, node) {
    return h(node, "strong", all2(h, node));
  }
  var init_strong = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/strong.js"() {
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/table.js
  function table(h, node) {
    const rows = node.children;
    let index2 = -1;
    const align = node.align || [];
    const result = [];
    while (++index2 < rows.length) {
      const row = rows[index2].children;
      const name = index2 === 0 ? "th" : "td";
      let pos = node.align ? align.length : row.length;
      const out = [];
      while (pos--) {
        const cell = row[pos];
        out[pos] = h(cell, name, { align: align[pos] }, cell ? all2(h, cell) : []);
      }
      result[index2] = h(rows[index2], "tr", wrap2(out, true));
    }
    return h(node, "table", wrap2([h(result[0].position, "thead", wrap2([result[0]], true))].concat(result[1] ? h({
      start: pointStart(result[1]),
      end: pointEnd(result[result.length - 1])
    }, "tbody", wrap2(result.slice(1), true)) : []), true));
  }
  var init_table = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/table.js"() {
      init_unist_util_position();
      init_wrap();
      init_traverse();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/text.js
  function text3(h, node) {
    return h.augment(node, u("text", String(node.value).replace(/[ \t]*(\r?\n|\r)[ \t]*/g, "$1")));
  }
  var init_text2 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/text.js"() {
      init_unist_builder();
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/index.js
  function ignore() {
    return null;
  }
  var handlers;
  var init_handlers = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/handlers/index.js"() {
      init_blockquote();
      init_break();
      init_code();
      init_delete();
      init_emphasis();
      init_footnote_reference();
      init_footnote();
      init_heading();
      init_html();
      init_image_reference();
      init_image();
      init_inline_code();
      init_link_reference();
      init_link();
      init_list_item();
      init_list2();
      init_paragraph();
      init_root();
      init_strong();
      init_table();
      init_text2();
      init_thematic_break2();
      handlers = {
        blockquote,
        break: hardBreak,
        code,
        delete: strikethrough,
        emphasis,
        footnoteReference,
        footnote,
        heading,
        html,
        imageReference,
        image,
        inlineCode,
        linkReference,
        link,
        listItem,
        list: list2,
        paragraph,
        root,
        strong,
        table,
        text: text3,
        thematicBreak: thematicBreak2,
        toml: ignore,
        yaml: ignore,
        definition: ignore,
        footnoteDefinition: ignore
      };
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/lib/index.js
  function factory(tree, options) {
    const settings = options || {};
    const dangerous = settings.allowDangerousHtml || false;
    const footnoteById = {};
    h.dangerous = dangerous;
    h.definition = definitions(tree);
    h.footnoteById = footnoteById;
    h.footnoteOrder = [];
    h.augment = augment;
    h.handlers = { ...handlers, ...settings.handlers };
    h.unknownHandler = settings.unknownHandler;
    h.passThrough = settings.passThrough;
    visit(tree, "footnoteDefinition", (definition2) => {
      const id = String(definition2.identifier).toUpperCase();
      if (!own5.call(footnoteById, id)) {
        footnoteById[id] = definition2;
      }
    });
    return h;
    function augment(left, right) {
      if (left && "data" in left && left.data) {
        const data = left.data;
        if (data.hName) {
          if (right.type !== "element") {
            right = {
              type: "element",
              tagName: "",
              properties: {},
              children: []
            };
          }
          right.tagName = data.hName;
        }
        if (right.type === "element" && data.hProperties) {
          right.properties = { ...right.properties, ...data.hProperties };
        }
        if ("children" in right && right.children && data.hChildren) {
          right.children = data.hChildren;
        }
      }
      if (left) {
        const ctx = "type" in left ? left : { position: left };
        if (!generated(ctx)) {
          right.position = { start: pointStart(ctx), end: pointEnd(ctx) };
        }
      }
      return right;
    }
    function h(node, tagName, props, children) {
      if (Array.isArray(props)) {
        children = props;
        props = {};
      }
      return augment(node, {
        type: "element",
        tagName,
        properties: props || {},
        children: children || []
      });
    }
  }
  function toHast(tree, options) {
    const h = factory(tree, options);
    const node = one2(h, tree, null);
    const foot = footer(h);
    if (foot) {
      node.children.push(u("text", "\n"), foot);
    }
    return Array.isArray(node) ? { type: "root", children: node } : node;
  }
  var own5;
  var init_lib5 = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/lib/index.js"() {
      init_unist_builder();
      init_unist_util_visit();
      init_unist_util_position();
      init_unist_util_generated();
      init_mdast_util_definitions();
      init_traverse();
      init_footer();
      init_handlers();
      own5 = {}.hasOwnProperty;
    }
  });

  // example/.central/.central-build/node_modules/mdast-util-to-hast/index.js
  var init_mdast_util_to_hast = __esm({
    "example/.central/.central-build/node_modules/mdast-util-to-hast/index.js"() {
      init_lib5();
    }
  });

  // example/.central/.central-build/node_modules/remark-rehype/index.js
  function bridge(destination, options) {
    return (node, file, next) => {
      destination.run(toHast(node, options), file, (error) => {
        next(error);
      });
    };
  }
  function mutate(options) {
    return (node) => toHast(node, options);
  }
  var remarkRehype, remark_rehype_default;
  var init_remark_rehype = __esm({
    "example/.central/.central-build/node_modules/remark-rehype/index.js"() {
      init_mdast_util_to_hast();
      remarkRehype = function(destination, options) {
        return destination && "run" in destination ? bridge(destination, options) : mutate(destination);
      };
      remark_rehype_default = remarkRehype;
    }
  });

  // example/.central/.central-build/node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
  var require_react_is_development = __commonJS({
    "example/.central/.central-build/node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var hasSymbol = typeof Symbol === "function" && Symbol.for;
          var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
          var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
          var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
          var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
          var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
          var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
          var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
          var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
          var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
          var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
          var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
          var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
          var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
          var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
          var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
          var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
          var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
          var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
          function isValidElementType(type) {
            return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
          }
          function typeOf(object) {
            if (typeof object === "object" && object !== null) {
              var $$typeof = object.$$typeof;
              switch ($$typeof) {
                case REACT_ELEMENT_TYPE:
                  var type = object.type;
                  switch (type) {
                    case REACT_ASYNC_MODE_TYPE:
                    case REACT_CONCURRENT_MODE_TYPE:
                    case REACT_FRAGMENT_TYPE:
                    case REACT_PROFILER_TYPE:
                    case REACT_STRICT_MODE_TYPE:
                    case REACT_SUSPENSE_TYPE:
                      return type;
                    default:
                      var $$typeofType = type && type.$$typeof;
                      switch ($$typeofType) {
                        case REACT_CONTEXT_TYPE:
                        case REACT_FORWARD_REF_TYPE:
                        case REACT_LAZY_TYPE:
                        case REACT_MEMO_TYPE:
                        case REACT_PROVIDER_TYPE:
                          return $$typeofType;
                        default:
                          return $$typeof;
                      }
                  }
                case REACT_PORTAL_TYPE:
                  return $$typeof;
              }
            }
            return void 0;
          }
          var AsyncMode = REACT_ASYNC_MODE_TYPE;
          var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
          var ContextConsumer = REACT_CONTEXT_TYPE;
          var ContextProvider = REACT_PROVIDER_TYPE;
          var Element = REACT_ELEMENT_TYPE;
          var ForwardRef = REACT_FORWARD_REF_TYPE;
          var Fragment = REACT_FRAGMENT_TYPE;
          var Lazy = REACT_LAZY_TYPE;
          var Memo = REACT_MEMO_TYPE;
          var Portal = REACT_PORTAL_TYPE;
          var Profiler = REACT_PROFILER_TYPE;
          var StrictMode = REACT_STRICT_MODE_TYPE;
          var Suspense = REACT_SUSPENSE_TYPE;
          var hasWarnedAboutDeprecatedIsAsyncMode = false;
          function isAsyncMode(object) {
            {
              if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                hasWarnedAboutDeprecatedIsAsyncMode = true;
                console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
              }
            }
            return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
          }
          function isConcurrentMode(object) {
            return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
          }
          function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
          }
          function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
          }
          function isElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
          }
          function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
          }
          function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
          }
          function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
          }
          function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
          }
          function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
          }
          function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
          }
          function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
          }
          exports.AsyncMode = AsyncMode;
          exports.ConcurrentMode = ConcurrentMode;
          exports.ContextConsumer = ContextConsumer;
          exports.ContextProvider = ContextProvider;
          exports.Element = Element;
          exports.ForwardRef = ForwardRef;
          exports.Fragment = Fragment;
          exports.Lazy = Lazy;
          exports.Memo = Memo;
          exports.Portal = Portal;
          exports.Profiler = Profiler;
          exports.StrictMode = StrictMode;
          exports.Suspense = Suspense;
          exports.isAsyncMode = isAsyncMode;
          exports.isConcurrentMode = isConcurrentMode;
          exports.isContextConsumer = isContextConsumer;
          exports.isContextProvider = isContextProvider;
          exports.isElement = isElement;
          exports.isForwardRef = isForwardRef;
          exports.isFragment = isFragment;
          exports.isLazy = isLazy;
          exports.isMemo = isMemo;
          exports.isPortal = isPortal;
          exports.isProfiler = isProfiler;
          exports.isStrictMode = isStrictMode;
          exports.isSuspense = isSuspense;
          exports.isValidElementType = isValidElementType;
          exports.typeOf = typeOf;
        })();
      }
    }
  });

  // example/.central/.central-build/node_modules/prop-types/node_modules/react-is/index.js
  var require_react_is = __commonJS({
    "example/.central/.central-build/node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_is_development();
      }
    }
  });

  // example/.central/.central-build/node_modules/prop-types/lib/ReactPropTypesSecret.js
  var require_ReactPropTypesSecret = __commonJS({
    "example/.central/.central-build/node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
      "use strict";
      var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      module.exports = ReactPropTypesSecret;
    }
  });

  // example/.central/.central-build/node_modules/prop-types/lib/has.js
  var require_has = __commonJS({
    "example/.central/.central-build/node_modules/prop-types/lib/has.js"(exports, module) {
      module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
    }
  });

  // example/.central/.central-build/node_modules/prop-types/checkPropTypes.js
  var require_checkPropTypes = __commonJS({
    "example/.central/.central-build/node_modules/prop-types/checkPropTypes.js"(exports, module) {
      "use strict";
      var printWarning = function() {
      };
      if (true) {
        ReactPropTypesSecret = require_ReactPropTypesSecret();
        loggedTypeFailures = {};
        has = require_has();
        printWarning = function(text4) {
          var message = "Warning: " + text4;
          if (typeof console !== "undefined") {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {
          }
        };
      }
      var ReactPropTypesSecret;
      var loggedTypeFailures;
      var has;
      function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
        if (true) {
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
              } catch (ex) {
                error = ex;
              }
              if (error && !(error instanceof Error)) {
                printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
              }
              if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                loggedTypeFailures[error.message] = true;
                var stack = getStack ? getStack() : "";
                printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
              }
            }
          }
        }
      }
      checkPropTypes.resetWarningCache = function() {
        if (true) {
          loggedTypeFailures = {};
        }
      };
      module.exports = checkPropTypes;
    }
  });

  // example/.central/.central-build/node_modules/prop-types/factoryWithTypeCheckers.js
  var require_factoryWithTypeCheckers = __commonJS({
    "example/.central/.central-build/node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
      "use strict";
      var ReactIs2 = require_react_is();
      var assign = require_object_assign();
      var ReactPropTypesSecret = require_ReactPropTypesSecret();
      var has = require_has();
      var checkPropTypes = require_checkPropTypes();
      var printWarning = function() {
      };
      if (true) {
        printWarning = function(text4) {
          var message = "Warning: " + text4;
          if (typeof console !== "undefined") {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {
          }
        };
      }
      function emptyFunctionThatReturnsNull() {
        return null;
      }
      module.exports = function(isValidElement, throwOnDirectAccess) {
        var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
          if (typeof iteratorFn === "function") {
            return iteratorFn;
          }
        }
        var ANONYMOUS = "<<anonymous>>";
        var ReactPropTypes = {
          array: createPrimitiveTypeChecker("array"),
          bigint: createPrimitiveTypeChecker("bigint"),
          bool: createPrimitiveTypeChecker("boolean"),
          func: createPrimitiveTypeChecker("function"),
          number: createPrimitiveTypeChecker("number"),
          object: createPrimitiveTypeChecker("object"),
          string: createPrimitiveTypeChecker("string"),
          symbol: createPrimitiveTypeChecker("symbol"),
          any: createAnyTypeChecker(),
          arrayOf: createArrayOfTypeChecker,
          element: createElementTypeChecker(),
          elementType: createElementTypeTypeChecker(),
          instanceOf: createInstanceTypeChecker,
          node: createNodeChecker(),
          objectOf: createObjectOfTypeChecker,
          oneOf: createEnumTypeChecker,
          oneOfType: createUnionTypeChecker,
          shape: createShapeTypeChecker,
          exact: createStrictShapeTypeChecker
        };
        function is(x, y) {
          if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
          } else {
            return x !== x && y !== y;
          }
        }
        function PropTypeError(message, data) {
          this.message = message;
          this.data = data && typeof data === "object" ? data : {};
          this.stack = "";
        }
        PropTypeError.prototype = Error.prototype;
        function createChainableTypeChecker(validate) {
          if (true) {
            var manualPropTypeCallCache = {};
            var manualPropTypeWarningCount = 0;
          }
          function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
            componentName = componentName || ANONYMOUS;
            propFullName = propFullName || propName;
            if (secret !== ReactPropTypesSecret) {
              if (throwOnDirectAccess) {
                var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                err.name = "Invariant Violation";
                throw err;
              } else if (typeof console !== "undefined") {
                var cacheKey = componentName + ":" + propName;
                if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                  printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
                  manualPropTypeCallCache[cacheKey] = true;
                  manualPropTypeWarningCount++;
                }
              }
            }
            if (props[propName] == null) {
              if (isRequired) {
                if (props[propName] === null) {
                  return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
                }
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
              }
              return null;
            } else {
              return validate(props, propName, componentName, location, propFullName);
            }
          }
          var chainedCheckType = checkType.bind(null, false);
          chainedCheckType.isRequired = checkType.bind(null, true);
          return chainedCheckType;
        }
        function createPrimitiveTypeChecker(expectedType) {
          function validate(props, propName, componentName, location, propFullName, secret) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== expectedType) {
              var preciseType = getPreciseType(propValue);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."), { expectedType });
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createAnyTypeChecker() {
          return createChainableTypeChecker(emptyFunctionThatReturnsNull);
        }
        function createArrayOfTypeChecker(typeChecker) {
          function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== "function") {
              return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
            }
            var propValue = props[propName];
            if (!Array.isArray(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
            }
            for (var i = 0; i < propValue.length; i++) {
              var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createElementTypeChecker() {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!isValidElement(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createElementTypeTypeChecker() {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!ReactIs2.isValidElementType(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createInstanceTypeChecker(expectedClass) {
          function validate(props, propName, componentName, location, propFullName) {
            if (!(props[propName] instanceof expectedClass)) {
              var expectedClassName = expectedClass.name || ANONYMOUS;
              var actualClassName = getClassName(props[propName]);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createEnumTypeChecker(expectedValues) {
          if (!Array.isArray(expectedValues)) {
            if (true) {
              if (arguments.length > 1) {
                printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
              } else {
                printWarning("Invalid argument supplied to oneOf, expected an array.");
              }
            }
            return emptyFunctionThatReturnsNull;
          }
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            for (var i = 0; i < expectedValues.length; i++) {
              if (is(propValue, expectedValues[i])) {
                return null;
              }
            }
            var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
              var type = getPreciseType(value);
              if (type === "symbol") {
                return String(value);
              }
              return value;
            });
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
          }
          return createChainableTypeChecker(validate);
        }
        function createObjectOfTypeChecker(typeChecker) {
          function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== "function") {
              return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
            }
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
            }
            for (var key in propValue) {
              if (has(propValue, key)) {
                var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error instanceof Error) {
                  return error;
                }
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createUnionTypeChecker(arrayOfTypeCheckers) {
          if (!Array.isArray(arrayOfTypeCheckers)) {
            true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
            return emptyFunctionThatReturnsNull;
          }
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (typeof checker !== "function") {
              printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
              return emptyFunctionThatReturnsNull;
            }
          }
          function validate(props, propName, componentName, location, propFullName) {
            var expectedTypes = [];
            for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
              var checker2 = arrayOfTypeCheckers[i2];
              var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
              if (checkerResult == null) {
                return null;
              }
              if (checkerResult.data && has(checkerResult.data, "expectedType")) {
                expectedTypes.push(checkerResult.data.expectedType);
              }
            }
            var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
          }
          return createChainableTypeChecker(validate);
        }
        function createNodeChecker() {
          function validate(props, propName, componentName, location, propFullName) {
            if (!isNode(props[propName])) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function invalidValidatorError(componentName, location, propFullName, key, type) {
          return new PropTypeError((componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`.");
        }
        function createShapeTypeChecker(shapeTypes) {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
            }
            for (var key in shapeTypes) {
              var checker = shapeTypes[key];
              if (typeof checker !== "function") {
                return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
              }
              var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function createStrictShapeTypeChecker(shapeTypes) {
          function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
            }
            var allKeys = assign({}, props[propName], shapeTypes);
            for (var key in allKeys) {
              var checker = shapeTypes[key];
              if (has(shapeTypes, key) && typeof checker !== "function") {
                return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
              }
              if (!checker) {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
              }
              var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }
        function isNode(propValue) {
          switch (typeof propValue) {
            case "number":
            case "string":
            case "undefined":
              return true;
            case "boolean":
              return !propValue;
            case "object":
              if (Array.isArray(propValue)) {
                return propValue.every(isNode);
              }
              if (propValue === null || isValidElement(propValue)) {
                return true;
              }
              var iteratorFn = getIteratorFn(propValue);
              if (iteratorFn) {
                var iterator = iteratorFn.call(propValue);
                var step;
                if (iteratorFn !== propValue.entries) {
                  while (!(step = iterator.next()).done) {
                    if (!isNode(step.value)) {
                      return false;
                    }
                  }
                } else {
                  while (!(step = iterator.next()).done) {
                    var entry = step.value;
                    if (entry) {
                      if (!isNode(entry[1])) {
                        return false;
                      }
                    }
                  }
                }
              } else {
                return false;
              }
              return true;
            default:
              return false;
          }
        }
        function isSymbol(propType, propValue) {
          if (propType === "symbol") {
            return true;
          }
          if (!propValue) {
            return false;
          }
          if (propValue["@@toStringTag"] === "Symbol") {
            return true;
          }
          if (typeof Symbol === "function" && propValue instanceof Symbol) {
            return true;
          }
          return false;
        }
        function getPropType(propValue) {
          var propType = typeof propValue;
          if (Array.isArray(propValue)) {
            return "array";
          }
          if (propValue instanceof RegExp) {
            return "object";
          }
          if (isSymbol(propType, propValue)) {
            return "symbol";
          }
          return propType;
        }
        function getPreciseType(propValue) {
          if (typeof propValue === "undefined" || propValue === null) {
            return "" + propValue;
          }
          var propType = getPropType(propValue);
          if (propType === "object") {
            if (propValue instanceof Date) {
              return "date";
            } else if (propValue instanceof RegExp) {
              return "regexp";
            }
          }
          return propType;
        }
        function getPostfixForTypeWarning(value) {
          var type = getPreciseType(value);
          switch (type) {
            case "array":
            case "object":
              return "an " + type;
            case "boolean":
            case "date":
            case "regexp":
              return "a " + type;
            default:
              return type;
          }
        }
        function getClassName(propValue) {
          if (!propValue.constructor || !propValue.constructor.name) {
            return ANONYMOUS;
          }
          return propValue.constructor.name;
        }
        ReactPropTypes.checkPropTypes = checkPropTypes;
        ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
        ReactPropTypes.PropTypes = ReactPropTypes;
        return ReactPropTypes;
      };
    }
  });

  // example/.central/.central-build/node_modules/prop-types/index.js
  var require_prop_types = __commonJS({
    "example/.central/.central-build/node_modules/prop-types/index.js"(exports, module) {
      if (true) {
        ReactIs2 = require_react_is();
        throwOnDirectAccess = true;
        module.exports = require_factoryWithTypeCheckers()(ReactIs2.isElement, throwOnDirectAccess);
      } else {
        module.exports = null();
      }
      var ReactIs2;
      var throwOnDirectAccess;
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/schema.js
  var Schema;
  var init_schema = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/schema.js"() {
      Schema = class {
        constructor(property, normal, space) {
          this.property = property;
          this.normal = normal;
          if (space) {
            this.space = space;
          }
        }
      };
      Schema.prototype.property = {};
      Schema.prototype.normal = {};
      Schema.prototype.space = null;
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/merge.js
  function merge(definitions2, space) {
    const property = {};
    const normal = {};
    let index2 = -1;
    while (++index2 < definitions2.length) {
      Object.assign(property, definitions2[index2].property);
      Object.assign(normal, definitions2[index2].normal);
    }
    return new Schema(property, normal, space);
  }
  var init_merge = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/merge.js"() {
      init_schema();
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/normalize.js
  function normalize6(value) {
    return value.toLowerCase();
  }
  var init_normalize = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/normalize.js"() {
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/info.js
  var Info;
  var init_info = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/info.js"() {
      Info = class {
        constructor(property, attribute) {
          this.property = property;
          this.attribute = attribute;
        }
      };
      Info.prototype.space = null;
      Info.prototype.boolean = false;
      Info.prototype.booleanish = false;
      Info.prototype.overloadedBoolean = false;
      Info.prototype.number = false;
      Info.prototype.commaSeparated = false;
      Info.prototype.spaceSeparated = false;
      Info.prototype.commaOrSpaceSeparated = false;
      Info.prototype.mustUseProperty = false;
      Info.prototype.defined = false;
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/types.js
  var types_exports = {};
  __export(types_exports, {
    boolean: () => boolean,
    booleanish: () => booleanish,
    commaOrSpaceSeparated: () => commaOrSpaceSeparated,
    commaSeparated: () => commaSeparated,
    number: () => number,
    overloadedBoolean: () => overloadedBoolean,
    spaceSeparated: () => spaceSeparated
  });
  function increment() {
    return 2 ** ++powers;
  }
  var powers, boolean, booleanish, overloadedBoolean, number, spaceSeparated, commaSeparated, commaOrSpaceSeparated;
  var init_types = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/types.js"() {
      powers = 0;
      boolean = increment();
      booleanish = increment();
      overloadedBoolean = increment();
      number = increment();
      spaceSeparated = increment();
      commaSeparated = increment();
      commaOrSpaceSeparated = increment();
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/defined-info.js
  function mark(values, key, value) {
    if (value) {
      values[key] = value;
    }
  }
  var checks, DefinedInfo;
  var init_defined_info = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/defined-info.js"() {
      init_info();
      init_types();
      checks = Object.keys(types_exports);
      DefinedInfo = class extends Info {
        constructor(property, attribute, mask, space) {
          let index2 = -1;
          super(property, attribute);
          mark(this, "space", space);
          if (typeof mask === "number") {
            while (++index2 < checks.length) {
              const check = checks[index2];
              mark(this, checks[index2], (mask & types_exports[check]) === types_exports[check]);
            }
          }
        }
      };
      DefinedInfo.prototype.defined = true;
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/create.js
  function create(definition2) {
    const property = {};
    const normal = {};
    let prop;
    for (prop in definition2.properties) {
      if (own6.call(definition2.properties, prop)) {
        const value = definition2.properties[prop];
        const info = new DefinedInfo(prop, definition2.transform(definition2.attributes || {}, prop), value, definition2.space);
        if (definition2.mustUseProperty && definition2.mustUseProperty.includes(prop)) {
          info.mustUseProperty = true;
        }
        property[prop] = info;
        normal[normalize6(prop)] = prop;
        normal[normalize6(info.attribute)] = prop;
      }
    }
    return new Schema(property, normal, definition2.space);
  }
  var own6;
  var init_create = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/create.js"() {
      init_normalize();
      init_schema();
      init_defined_info();
      own6 = {}.hasOwnProperty;
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/xlink.js
  var xlink;
  var init_xlink = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/xlink.js"() {
      init_create();
      xlink = create({
        space: "xlink",
        transform(_, prop) {
          return "xlink:" + prop.slice(5).toLowerCase();
        },
        properties: {
          xLinkActuate: null,
          xLinkArcRole: null,
          xLinkHref: null,
          xLinkRole: null,
          xLinkShow: null,
          xLinkTitle: null,
          xLinkType: null
        }
      });
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/xml.js
  var xml;
  var init_xml = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/xml.js"() {
      init_create();
      xml = create({
        space: "xml",
        transform(_, prop) {
          return "xml:" + prop.slice(3).toLowerCase();
        },
        properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
      });
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/case-sensitive-transform.js
  function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute;
  }
  var init_case_sensitive_transform = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/case-sensitive-transform.js"() {
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/util/case-insensitive-transform.js
  function caseInsensitiveTransform(attributes, property) {
    return caseSensitiveTransform(attributes, property.toLowerCase());
  }
  var init_case_insensitive_transform = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/util/case-insensitive-transform.js"() {
      init_case_sensitive_transform();
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/xmlns.js
  var xmlns;
  var init_xmlns = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/xmlns.js"() {
      init_create();
      init_case_insensitive_transform();
      xmlns = create({
        space: "xmlns",
        attributes: { xmlnsxlink: "xmlns:xlink" },
        transform: caseInsensitiveTransform,
        properties: { xmlns: null, xmlnsXLink: null }
      });
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/aria.js
  var aria;
  var init_aria = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/aria.js"() {
      init_types();
      init_create();
      aria = create({
        transform(_, prop) {
          return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
        },
        properties: {
          ariaActiveDescendant: null,
          ariaAtomic: booleanish,
          ariaAutoComplete: null,
          ariaBusy: booleanish,
          ariaChecked: booleanish,
          ariaColCount: number,
          ariaColIndex: number,
          ariaColSpan: number,
          ariaControls: spaceSeparated,
          ariaCurrent: null,
          ariaDescribedBy: spaceSeparated,
          ariaDetails: null,
          ariaDisabled: booleanish,
          ariaDropEffect: spaceSeparated,
          ariaErrorMessage: null,
          ariaExpanded: booleanish,
          ariaFlowTo: spaceSeparated,
          ariaGrabbed: booleanish,
          ariaHasPopup: null,
          ariaHidden: booleanish,
          ariaInvalid: null,
          ariaKeyShortcuts: null,
          ariaLabel: null,
          ariaLabelledBy: spaceSeparated,
          ariaLevel: number,
          ariaLive: null,
          ariaModal: booleanish,
          ariaMultiLine: booleanish,
          ariaMultiSelectable: booleanish,
          ariaOrientation: null,
          ariaOwns: spaceSeparated,
          ariaPlaceholder: null,
          ariaPosInSet: number,
          ariaPressed: booleanish,
          ariaReadOnly: booleanish,
          ariaRelevant: null,
          ariaRequired: booleanish,
          ariaRoleDescription: spaceSeparated,
          ariaRowCount: number,
          ariaRowIndex: number,
          ariaRowSpan: number,
          ariaSelected: booleanish,
          ariaSetSize: number,
          ariaSort: null,
          ariaValueMax: number,
          ariaValueMin: number,
          ariaValueNow: number,
          ariaValueText: null,
          role: null
        }
      });
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/html.js
  var html2;
  var init_html2 = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/html.js"() {
      init_types();
      init_create();
      init_case_insensitive_transform();
      html2 = create({
        space: "html",
        attributes: {
          acceptcharset: "accept-charset",
          classname: "class",
          htmlfor: "for",
          httpequiv: "http-equiv"
        },
        transform: caseInsensitiveTransform,
        mustUseProperty: ["checked", "multiple", "muted", "selected"],
        properties: {
          abbr: null,
          accept: commaSeparated,
          acceptCharset: spaceSeparated,
          accessKey: spaceSeparated,
          action: null,
          allow: null,
          allowFullScreen: boolean,
          allowPaymentRequest: boolean,
          allowUserMedia: boolean,
          alt: null,
          as: null,
          async: boolean,
          autoCapitalize: null,
          autoComplete: spaceSeparated,
          autoFocus: boolean,
          autoPlay: boolean,
          capture: boolean,
          charSet: null,
          checked: boolean,
          cite: null,
          className: spaceSeparated,
          cols: number,
          colSpan: null,
          content: null,
          contentEditable: booleanish,
          controls: boolean,
          controlsList: spaceSeparated,
          coords: number | commaSeparated,
          crossOrigin: null,
          data: null,
          dateTime: null,
          decoding: null,
          default: boolean,
          defer: boolean,
          dir: null,
          dirName: null,
          disabled: boolean,
          download: overloadedBoolean,
          draggable: booleanish,
          encType: null,
          enterKeyHint: null,
          form: null,
          formAction: null,
          formEncType: null,
          formMethod: null,
          formNoValidate: boolean,
          formTarget: null,
          headers: spaceSeparated,
          height: number,
          hidden: boolean,
          high: number,
          href: null,
          hrefLang: null,
          htmlFor: spaceSeparated,
          httpEquiv: spaceSeparated,
          id: null,
          imageSizes: null,
          imageSrcSet: null,
          inputMode: null,
          integrity: null,
          is: null,
          isMap: boolean,
          itemId: null,
          itemProp: spaceSeparated,
          itemRef: spaceSeparated,
          itemScope: boolean,
          itemType: spaceSeparated,
          kind: null,
          label: null,
          lang: null,
          language: null,
          list: null,
          loading: null,
          loop: boolean,
          low: number,
          manifest: null,
          max: null,
          maxLength: number,
          media: null,
          method: null,
          min: null,
          minLength: number,
          multiple: boolean,
          muted: boolean,
          name: null,
          nonce: null,
          noModule: boolean,
          noValidate: boolean,
          onAbort: null,
          onAfterPrint: null,
          onAuxClick: null,
          onBeforePrint: null,
          onBeforeUnload: null,
          onBlur: null,
          onCancel: null,
          onCanPlay: null,
          onCanPlayThrough: null,
          onChange: null,
          onClick: null,
          onClose: null,
          onContextLost: null,
          onContextMenu: null,
          onContextRestored: null,
          onCopy: null,
          onCueChange: null,
          onCut: null,
          onDblClick: null,
          onDrag: null,
          onDragEnd: null,
          onDragEnter: null,
          onDragExit: null,
          onDragLeave: null,
          onDragOver: null,
          onDragStart: null,
          onDrop: null,
          onDurationChange: null,
          onEmptied: null,
          onEnded: null,
          onError: null,
          onFocus: null,
          onFormData: null,
          onHashChange: null,
          onInput: null,
          onInvalid: null,
          onKeyDown: null,
          onKeyPress: null,
          onKeyUp: null,
          onLanguageChange: null,
          onLoad: null,
          onLoadedData: null,
          onLoadedMetadata: null,
          onLoadEnd: null,
          onLoadStart: null,
          onMessage: null,
          onMessageError: null,
          onMouseDown: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onMouseMove: null,
          onMouseOut: null,
          onMouseOver: null,
          onMouseUp: null,
          onOffline: null,
          onOnline: null,
          onPageHide: null,
          onPageShow: null,
          onPaste: null,
          onPause: null,
          onPlay: null,
          onPlaying: null,
          onPopState: null,
          onProgress: null,
          onRateChange: null,
          onRejectionHandled: null,
          onReset: null,
          onResize: null,
          onScroll: null,
          onSecurityPolicyViolation: null,
          onSeeked: null,
          onSeeking: null,
          onSelect: null,
          onSlotChange: null,
          onStalled: null,
          onStorage: null,
          onSubmit: null,
          onSuspend: null,
          onTimeUpdate: null,
          onToggle: null,
          onUnhandledRejection: null,
          onUnload: null,
          onVolumeChange: null,
          onWaiting: null,
          onWheel: null,
          open: boolean,
          optimum: number,
          pattern: null,
          ping: spaceSeparated,
          placeholder: null,
          playsInline: boolean,
          poster: null,
          preload: null,
          readOnly: boolean,
          referrerPolicy: null,
          rel: spaceSeparated,
          required: boolean,
          reversed: boolean,
          rows: number,
          rowSpan: number,
          sandbox: spaceSeparated,
          scope: null,
          scoped: boolean,
          seamless: boolean,
          selected: boolean,
          shape: null,
          size: number,
          sizes: null,
          slot: null,
          span: number,
          spellCheck: booleanish,
          src: null,
          srcDoc: null,
          srcLang: null,
          srcSet: null,
          start: number,
          step: null,
          style: null,
          tabIndex: number,
          target: null,
          title: null,
          translate: null,
          type: null,
          typeMustMatch: boolean,
          useMap: null,
          value: booleanish,
          width: number,
          wrap: null,
          align: null,
          aLink: null,
          archive: spaceSeparated,
          axis: null,
          background: null,
          bgColor: null,
          border: number,
          borderColor: null,
          bottomMargin: number,
          cellPadding: null,
          cellSpacing: null,
          char: null,
          charOff: null,
          classId: null,
          clear: null,
          code: null,
          codeBase: null,
          codeType: null,
          color: null,
          compact: boolean,
          declare: boolean,
          event: null,
          face: null,
          frame: null,
          frameBorder: null,
          hSpace: number,
          leftMargin: number,
          link: null,
          longDesc: null,
          lowSrc: null,
          marginHeight: number,
          marginWidth: number,
          noResize: boolean,
          noHref: boolean,
          noShade: boolean,
          noWrap: boolean,
          object: null,
          profile: null,
          prompt: null,
          rev: null,
          rightMargin: number,
          rules: null,
          scheme: null,
          scrolling: booleanish,
          standby: null,
          summary: null,
          text: null,
          topMargin: number,
          valueType: null,
          version: null,
          vAlign: null,
          vLink: null,
          vSpace: number,
          allowTransparency: null,
          autoCorrect: null,
          autoSave: null,
          disablePictureInPicture: boolean,
          disableRemotePlayback: boolean,
          prefix: null,
          property: null,
          results: number,
          security: null,
          unselectable: null
        }
      });
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/svg.js
  var svg;
  var init_svg = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/svg.js"() {
      init_types();
      init_create();
      init_case_sensitive_transform();
      svg = create({
        space: "svg",
        attributes: {
          accentHeight: "accent-height",
          alignmentBaseline: "alignment-baseline",
          arabicForm: "arabic-form",
          baselineShift: "baseline-shift",
          capHeight: "cap-height",
          className: "class",
          clipPath: "clip-path",
          clipRule: "clip-rule",
          colorInterpolation: "color-interpolation",
          colorInterpolationFilters: "color-interpolation-filters",
          colorProfile: "color-profile",
          colorRendering: "color-rendering",
          crossOrigin: "crossorigin",
          dataType: "datatype",
          dominantBaseline: "dominant-baseline",
          enableBackground: "enable-background",
          fillOpacity: "fill-opacity",
          fillRule: "fill-rule",
          floodColor: "flood-color",
          floodOpacity: "flood-opacity",
          fontFamily: "font-family",
          fontSize: "font-size",
          fontSizeAdjust: "font-size-adjust",
          fontStretch: "font-stretch",
          fontStyle: "font-style",
          fontVariant: "font-variant",
          fontWeight: "font-weight",
          glyphName: "glyph-name",
          glyphOrientationHorizontal: "glyph-orientation-horizontal",
          glyphOrientationVertical: "glyph-orientation-vertical",
          hrefLang: "hreflang",
          horizAdvX: "horiz-adv-x",
          horizOriginX: "horiz-origin-x",
          horizOriginY: "horiz-origin-y",
          imageRendering: "image-rendering",
          letterSpacing: "letter-spacing",
          lightingColor: "lighting-color",
          markerEnd: "marker-end",
          markerMid: "marker-mid",
          markerStart: "marker-start",
          navDown: "nav-down",
          navDownLeft: "nav-down-left",
          navDownRight: "nav-down-right",
          navLeft: "nav-left",
          navNext: "nav-next",
          navPrev: "nav-prev",
          navRight: "nav-right",
          navUp: "nav-up",
          navUpLeft: "nav-up-left",
          navUpRight: "nav-up-right",
          onAbort: "onabort",
          onActivate: "onactivate",
          onAfterPrint: "onafterprint",
          onBeforePrint: "onbeforeprint",
          onBegin: "onbegin",
          onCancel: "oncancel",
          onCanPlay: "oncanplay",
          onCanPlayThrough: "oncanplaythrough",
          onChange: "onchange",
          onClick: "onclick",
          onClose: "onclose",
          onCopy: "oncopy",
          onCueChange: "oncuechange",
          onCut: "oncut",
          onDblClick: "ondblclick",
          onDrag: "ondrag",
          onDragEnd: "ondragend",
          onDragEnter: "ondragenter",
          onDragExit: "ondragexit",
          onDragLeave: "ondragleave",
          onDragOver: "ondragover",
          onDragStart: "ondragstart",
          onDrop: "ondrop",
          onDurationChange: "ondurationchange",
          onEmptied: "onemptied",
          onEnd: "onend",
          onEnded: "onended",
          onError: "onerror",
          onFocus: "onfocus",
          onFocusIn: "onfocusin",
          onFocusOut: "onfocusout",
          onHashChange: "onhashchange",
          onInput: "oninput",
          onInvalid: "oninvalid",
          onKeyDown: "onkeydown",
          onKeyPress: "onkeypress",
          onKeyUp: "onkeyup",
          onLoad: "onload",
          onLoadedData: "onloadeddata",
          onLoadedMetadata: "onloadedmetadata",
          onLoadStart: "onloadstart",
          onMessage: "onmessage",
          onMouseDown: "onmousedown",
          onMouseEnter: "onmouseenter",
          onMouseLeave: "onmouseleave",
          onMouseMove: "onmousemove",
          onMouseOut: "onmouseout",
          onMouseOver: "onmouseover",
          onMouseUp: "onmouseup",
          onMouseWheel: "onmousewheel",
          onOffline: "onoffline",
          onOnline: "ononline",
          onPageHide: "onpagehide",
          onPageShow: "onpageshow",
          onPaste: "onpaste",
          onPause: "onpause",
          onPlay: "onplay",
          onPlaying: "onplaying",
          onPopState: "onpopstate",
          onProgress: "onprogress",
          onRateChange: "onratechange",
          onRepeat: "onrepeat",
          onReset: "onreset",
          onResize: "onresize",
          onScroll: "onscroll",
          onSeeked: "onseeked",
          onSeeking: "onseeking",
          onSelect: "onselect",
          onShow: "onshow",
          onStalled: "onstalled",
          onStorage: "onstorage",
          onSubmit: "onsubmit",
          onSuspend: "onsuspend",
          onTimeUpdate: "ontimeupdate",
          onToggle: "ontoggle",
          onUnload: "onunload",
          onVolumeChange: "onvolumechange",
          onWaiting: "onwaiting",
          onZoom: "onzoom",
          overlinePosition: "overline-position",
          overlineThickness: "overline-thickness",
          paintOrder: "paint-order",
          panose1: "panose-1",
          pointerEvents: "pointer-events",
          referrerPolicy: "referrerpolicy",
          renderingIntent: "rendering-intent",
          shapeRendering: "shape-rendering",
          stopColor: "stop-color",
          stopOpacity: "stop-opacity",
          strikethroughPosition: "strikethrough-position",
          strikethroughThickness: "strikethrough-thickness",
          strokeDashArray: "stroke-dasharray",
          strokeDashOffset: "stroke-dashoffset",
          strokeLineCap: "stroke-linecap",
          strokeLineJoin: "stroke-linejoin",
          strokeMiterLimit: "stroke-miterlimit",
          strokeOpacity: "stroke-opacity",
          strokeWidth: "stroke-width",
          tabIndex: "tabindex",
          textAnchor: "text-anchor",
          textDecoration: "text-decoration",
          textRendering: "text-rendering",
          typeOf: "typeof",
          underlinePosition: "underline-position",
          underlineThickness: "underline-thickness",
          unicodeBidi: "unicode-bidi",
          unicodeRange: "unicode-range",
          unitsPerEm: "units-per-em",
          vAlphabetic: "v-alphabetic",
          vHanging: "v-hanging",
          vIdeographic: "v-ideographic",
          vMathematical: "v-mathematical",
          vectorEffect: "vector-effect",
          vertAdvY: "vert-adv-y",
          vertOriginX: "vert-origin-x",
          vertOriginY: "vert-origin-y",
          wordSpacing: "word-spacing",
          writingMode: "writing-mode",
          xHeight: "x-height",
          playbackOrder: "playbackorder",
          timelineBegin: "timelinebegin"
        },
        transform: caseSensitiveTransform,
        properties: {
          about: commaOrSpaceSeparated,
          accentHeight: number,
          accumulate: null,
          additive: null,
          alignmentBaseline: null,
          alphabetic: number,
          amplitude: number,
          arabicForm: null,
          ascent: number,
          attributeName: null,
          attributeType: null,
          azimuth: number,
          bandwidth: null,
          baselineShift: null,
          baseFrequency: null,
          baseProfile: null,
          bbox: null,
          begin: null,
          bias: number,
          by: null,
          calcMode: null,
          capHeight: number,
          className: spaceSeparated,
          clip: null,
          clipPath: null,
          clipPathUnits: null,
          clipRule: null,
          color: null,
          colorInterpolation: null,
          colorInterpolationFilters: null,
          colorProfile: null,
          colorRendering: null,
          content: null,
          contentScriptType: null,
          contentStyleType: null,
          crossOrigin: null,
          cursor: null,
          cx: null,
          cy: null,
          d: null,
          dataType: null,
          defaultAction: null,
          descent: number,
          diffuseConstant: number,
          direction: null,
          display: null,
          dur: null,
          divisor: number,
          dominantBaseline: null,
          download: boolean,
          dx: null,
          dy: null,
          edgeMode: null,
          editable: null,
          elevation: number,
          enableBackground: null,
          end: null,
          event: null,
          exponent: number,
          externalResourcesRequired: null,
          fill: null,
          fillOpacity: number,
          fillRule: null,
          filter: null,
          filterRes: null,
          filterUnits: null,
          floodColor: null,
          floodOpacity: null,
          focusable: null,
          focusHighlight: null,
          fontFamily: null,
          fontSize: null,
          fontSizeAdjust: null,
          fontStretch: null,
          fontStyle: null,
          fontVariant: null,
          fontWeight: null,
          format: null,
          fr: null,
          from: null,
          fx: null,
          fy: null,
          g1: commaSeparated,
          g2: commaSeparated,
          glyphName: commaSeparated,
          glyphOrientationHorizontal: null,
          glyphOrientationVertical: null,
          glyphRef: null,
          gradientTransform: null,
          gradientUnits: null,
          handler: null,
          hanging: number,
          hatchContentUnits: null,
          hatchUnits: null,
          height: null,
          href: null,
          hrefLang: null,
          horizAdvX: number,
          horizOriginX: number,
          horizOriginY: number,
          id: null,
          ideographic: number,
          imageRendering: null,
          initialVisibility: null,
          in: null,
          in2: null,
          intercept: number,
          k: number,
          k1: number,
          k2: number,
          k3: number,
          k4: number,
          kernelMatrix: commaOrSpaceSeparated,
          kernelUnitLength: null,
          keyPoints: null,
          keySplines: null,
          keyTimes: null,
          kerning: null,
          lang: null,
          lengthAdjust: null,
          letterSpacing: null,
          lightingColor: null,
          limitingConeAngle: number,
          local: null,
          markerEnd: null,
          markerMid: null,
          markerStart: null,
          markerHeight: null,
          markerUnits: null,
          markerWidth: null,
          mask: null,
          maskContentUnits: null,
          maskUnits: null,
          mathematical: null,
          max: null,
          media: null,
          mediaCharacterEncoding: null,
          mediaContentEncodings: null,
          mediaSize: number,
          mediaTime: null,
          method: null,
          min: null,
          mode: null,
          name: null,
          navDown: null,
          navDownLeft: null,
          navDownRight: null,
          navLeft: null,
          navNext: null,
          navPrev: null,
          navRight: null,
          navUp: null,
          navUpLeft: null,
          navUpRight: null,
          numOctaves: null,
          observer: null,
          offset: null,
          onAbort: null,
          onActivate: null,
          onAfterPrint: null,
          onBeforePrint: null,
          onBegin: null,
          onCancel: null,
          onCanPlay: null,
          onCanPlayThrough: null,
          onChange: null,
          onClick: null,
          onClose: null,
          onCopy: null,
          onCueChange: null,
          onCut: null,
          onDblClick: null,
          onDrag: null,
          onDragEnd: null,
          onDragEnter: null,
          onDragExit: null,
          onDragLeave: null,
          onDragOver: null,
          onDragStart: null,
          onDrop: null,
          onDurationChange: null,
          onEmptied: null,
          onEnd: null,
          onEnded: null,
          onError: null,
          onFocus: null,
          onFocusIn: null,
          onFocusOut: null,
          onHashChange: null,
          onInput: null,
          onInvalid: null,
          onKeyDown: null,
          onKeyPress: null,
          onKeyUp: null,
          onLoad: null,
          onLoadedData: null,
          onLoadedMetadata: null,
          onLoadStart: null,
          onMessage: null,
          onMouseDown: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onMouseMove: null,
          onMouseOut: null,
          onMouseOver: null,
          onMouseUp: null,
          onMouseWheel: null,
          onOffline: null,
          onOnline: null,
          onPageHide: null,
          onPageShow: null,
          onPaste: null,
          onPause: null,
          onPlay: null,
          onPlaying: null,
          onPopState: null,
          onProgress: null,
          onRateChange: null,
          onRepeat: null,
          onReset: null,
          onResize: null,
          onScroll: null,
          onSeeked: null,
          onSeeking: null,
          onSelect: null,
          onShow: null,
          onStalled: null,
          onStorage: null,
          onSubmit: null,
          onSuspend: null,
          onTimeUpdate: null,
          onToggle: null,
          onUnload: null,
          onVolumeChange: null,
          onWaiting: null,
          onZoom: null,
          opacity: null,
          operator: null,
          order: null,
          orient: null,
          orientation: null,
          origin: null,
          overflow: null,
          overlay: null,
          overlinePosition: number,
          overlineThickness: number,
          paintOrder: null,
          panose1: null,
          path: null,
          pathLength: number,
          patternContentUnits: null,
          patternTransform: null,
          patternUnits: null,
          phase: null,
          ping: spaceSeparated,
          pitch: null,
          playbackOrder: null,
          pointerEvents: null,
          points: null,
          pointsAtX: number,
          pointsAtY: number,
          pointsAtZ: number,
          preserveAlpha: null,
          preserveAspectRatio: null,
          primitiveUnits: null,
          propagate: null,
          property: commaOrSpaceSeparated,
          r: null,
          radius: null,
          referrerPolicy: null,
          refX: null,
          refY: null,
          rel: commaOrSpaceSeparated,
          rev: commaOrSpaceSeparated,
          renderingIntent: null,
          repeatCount: null,
          repeatDur: null,
          requiredExtensions: commaOrSpaceSeparated,
          requiredFeatures: commaOrSpaceSeparated,
          requiredFonts: commaOrSpaceSeparated,
          requiredFormats: commaOrSpaceSeparated,
          resource: null,
          restart: null,
          result: null,
          rotate: null,
          rx: null,
          ry: null,
          scale: null,
          seed: null,
          shapeRendering: null,
          side: null,
          slope: null,
          snapshotTime: null,
          specularConstant: number,
          specularExponent: number,
          spreadMethod: null,
          spacing: null,
          startOffset: null,
          stdDeviation: null,
          stemh: null,
          stemv: null,
          stitchTiles: null,
          stopColor: null,
          stopOpacity: null,
          strikethroughPosition: number,
          strikethroughThickness: number,
          string: null,
          stroke: null,
          strokeDashArray: commaOrSpaceSeparated,
          strokeDashOffset: null,
          strokeLineCap: null,
          strokeLineJoin: null,
          strokeMiterLimit: number,
          strokeOpacity: number,
          strokeWidth: null,
          style: null,
          surfaceScale: number,
          syncBehavior: null,
          syncBehaviorDefault: null,
          syncMaster: null,
          syncTolerance: null,
          syncToleranceDefault: null,
          systemLanguage: commaOrSpaceSeparated,
          tabIndex: number,
          tableValues: null,
          target: null,
          targetX: number,
          targetY: number,
          textAnchor: null,
          textDecoration: null,
          textRendering: null,
          textLength: null,
          timelineBegin: null,
          title: null,
          transformBehavior: null,
          type: null,
          typeOf: commaOrSpaceSeparated,
          to: null,
          transform: null,
          u1: null,
          u2: null,
          underlinePosition: number,
          underlineThickness: number,
          unicode: null,
          unicodeBidi: null,
          unicodeRange: null,
          unitsPerEm: number,
          values: null,
          vAlphabetic: number,
          vMathematical: number,
          vectorEffect: null,
          vHanging: number,
          vIdeographic: number,
          version: null,
          vertAdvY: number,
          vertOriginX: number,
          vertOriginY: number,
          viewBox: null,
          viewTarget: null,
          visibility: null,
          width: null,
          widths: null,
          wordSpacing: null,
          writingMode: null,
          x: null,
          x1: null,
          x2: null,
          xChannelSelector: null,
          xHeight: number,
          y: null,
          y1: null,
          y2: null,
          yChannelSelector: null,
          z: null,
          zoomAndPan: null
        }
      });
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/find.js
  function find(schema, value) {
    const normal = normalize6(value);
    let prop = value;
    let Type = Info;
    if (normal in schema.normal) {
      return schema.property[schema.normal[normal]];
    }
    if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
      if (value.charAt(4) === "-") {
        const rest = value.slice(5).replace(dash, camelcase);
        prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
      } else {
        const rest = value.slice(4);
        if (!dash.test(rest)) {
          let dashes = rest.replace(cap, kebab);
          if (dashes.charAt(0) !== "-") {
            dashes = "-" + dashes;
          }
          value = "data" + dashes;
        }
      }
      Type = DefinedInfo;
    }
    return new Type(prop, value);
  }
  function kebab($0) {
    return "-" + $0.toLowerCase();
  }
  function camelcase($0) {
    return $0.charAt(1).toUpperCase();
  }
  var valid, dash, cap;
  var init_find = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/find.js"() {
      init_normalize();
      init_defined_info();
      init_info();
      valid = /^data[-\w.:]+$/i;
      dash = /-[a-z]/g;
      cap = /[A-Z]/g;
    }
  });

  // example/.central/.central-build/node_modules/property-information/lib/hast-to-react.js
  var hastToReact;
  var init_hast_to_react = __esm({
    "example/.central/.central-build/node_modules/property-information/lib/hast-to-react.js"() {
      hastToReact = {
        classId: "classID",
        dataType: "datatype",
        itemId: "itemID",
        strokeDashArray: "strokeDasharray",
        strokeDashOffset: "strokeDashoffset",
        strokeLineCap: "strokeLinecap",
        strokeLineJoin: "strokeLinejoin",
        strokeMiterLimit: "strokeMiterlimit",
        typeOf: "typeof",
        xLinkActuate: "xlinkActuate",
        xLinkArcRole: "xlinkArcrole",
        xLinkHref: "xlinkHref",
        xLinkRole: "xlinkRole",
        xLinkShow: "xlinkShow",
        xLinkTitle: "xlinkTitle",
        xLinkType: "xlinkType",
        xmlnsXLink: "xmlnsXlink"
      };
    }
  });

  // example/.central/.central-build/node_modules/property-information/index.js
  var html3, svg2;
  var init_property_information = __esm({
    "example/.central/.central-build/node_modules/property-information/index.js"() {
      init_merge();
      init_xlink();
      init_xml();
      init_xmlns();
      init_aria();
      init_html2();
      init_svg();
      init_find();
      init_hast_to_react();
      html3 = merge([xml, xlink, xmlns, aria, html2], "html");
      svg2 = merge([xml, xlink, xmlns, aria, svg], "svg");
    }
  });

  // example/.central/.central-build/node_modules/react-markdown/lib/rehype-filter.js
  function rehypeFilter(options) {
    if (options.allowedElements && options.disallowedElements) {
      throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");
    }
    if (options.allowedElements || options.disallowedElements || options.allowElement) {
      return (tree) => {
        visit(tree, "element", (node, index2, parent_) => {
          const parent = parent_;
          let remove;
          if (options.allowedElements) {
            remove = !options.allowedElements.includes(node.tagName);
          } else if (options.disallowedElements) {
            remove = options.disallowedElements.includes(node.tagName);
          }
          if (!remove && options.allowElement && typeof index2 === "number") {
            remove = !options.allowElement(node, index2, parent);
          }
          if (remove && typeof index2 === "number") {
            if (options.unwrapDisallowed && node.children) {
              parent.children.splice(index2, 1, ...node.children);
            } else {
              parent.children.splice(index2, 1);
            }
            return index2;
          }
          return void 0;
        });
      };
    }
  }
  var init_rehype_filter = __esm({
    "example/.central/.central-build/node_modules/react-markdown/lib/rehype-filter.js"() {
      init_unist_util_visit();
    }
  });

  // example/.central/.central-build/node_modules/react-is/cjs/react-is.development.js
  var require_react_is_development2 = __commonJS({
    "example/.central/.central-build/node_modules/react-is/cjs/react-is.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var REACT_ELEMENT_TYPE = 60103;
          var REACT_PORTAL_TYPE = 60106;
          var REACT_FRAGMENT_TYPE = 60107;
          var REACT_STRICT_MODE_TYPE = 60108;
          var REACT_PROFILER_TYPE = 60114;
          var REACT_PROVIDER_TYPE = 60109;
          var REACT_CONTEXT_TYPE = 60110;
          var REACT_FORWARD_REF_TYPE = 60112;
          var REACT_SUSPENSE_TYPE = 60113;
          var REACT_SUSPENSE_LIST_TYPE = 60120;
          var REACT_MEMO_TYPE = 60115;
          var REACT_LAZY_TYPE = 60116;
          var REACT_BLOCK_TYPE = 60121;
          var REACT_SERVER_BLOCK_TYPE = 60122;
          var REACT_FUNDAMENTAL_TYPE = 60117;
          var REACT_SCOPE_TYPE = 60119;
          var REACT_OPAQUE_ID_TYPE = 60128;
          var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
          var REACT_OFFSCREEN_TYPE = 60130;
          var REACT_LEGACY_HIDDEN_TYPE = 60131;
          if (typeof Symbol === "function" && Symbol.for) {
            var symbolFor = Symbol.for;
            REACT_ELEMENT_TYPE = symbolFor("react.element");
            REACT_PORTAL_TYPE = symbolFor("react.portal");
            REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
            REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
            REACT_PROFILER_TYPE = symbolFor("react.profiler");
            REACT_PROVIDER_TYPE = symbolFor("react.provider");
            REACT_CONTEXT_TYPE = symbolFor("react.context");
            REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
            REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
            REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
            REACT_MEMO_TYPE = symbolFor("react.memo");
            REACT_LAZY_TYPE = symbolFor("react.lazy");
            REACT_BLOCK_TYPE = symbolFor("react.block");
            REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
            REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
            REACT_SCOPE_TYPE = symbolFor("react.scope");
            REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
            REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
            REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
            REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
          }
          var enableScopeAPI = false;
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
                return true;
              }
            }
            return false;
          }
          function typeOf(object) {
            if (typeof object === "object" && object !== null) {
              var $$typeof = object.$$typeof;
              switch ($$typeof) {
                case REACT_ELEMENT_TYPE:
                  var type = object.type;
                  switch (type) {
                    case REACT_FRAGMENT_TYPE:
                    case REACT_PROFILER_TYPE:
                    case REACT_STRICT_MODE_TYPE:
                    case REACT_SUSPENSE_TYPE:
                    case REACT_SUSPENSE_LIST_TYPE:
                      return type;
                    default:
                      var $$typeofType = type && type.$$typeof;
                      switch ($$typeofType) {
                        case REACT_CONTEXT_TYPE:
                        case REACT_FORWARD_REF_TYPE:
                        case REACT_LAZY_TYPE:
                        case REACT_MEMO_TYPE:
                        case REACT_PROVIDER_TYPE:
                          return $$typeofType;
                        default:
                          return $$typeof;
                      }
                  }
                case REACT_PORTAL_TYPE:
                  return $$typeof;
              }
            }
            return void 0;
          }
          var ContextConsumer = REACT_CONTEXT_TYPE;
          var ContextProvider = REACT_PROVIDER_TYPE;
          var Element = REACT_ELEMENT_TYPE;
          var ForwardRef = REACT_FORWARD_REF_TYPE;
          var Fragment = REACT_FRAGMENT_TYPE;
          var Lazy = REACT_LAZY_TYPE;
          var Memo = REACT_MEMO_TYPE;
          var Portal = REACT_PORTAL_TYPE;
          var Profiler = REACT_PROFILER_TYPE;
          var StrictMode = REACT_STRICT_MODE_TYPE;
          var Suspense = REACT_SUSPENSE_TYPE;
          var hasWarnedAboutDeprecatedIsAsyncMode = false;
          var hasWarnedAboutDeprecatedIsConcurrentMode = false;
          function isAsyncMode(object) {
            {
              if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                hasWarnedAboutDeprecatedIsAsyncMode = true;
                console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
              }
            }
            return false;
          }
          function isConcurrentMode(object) {
            {
              if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
                hasWarnedAboutDeprecatedIsConcurrentMode = true;
                console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
              }
            }
            return false;
          }
          function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
          }
          function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
          }
          function isElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
          }
          function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
          }
          function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
          }
          function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
          }
          function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
          }
          function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
          }
          function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
          }
          function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
          }
          exports.ContextConsumer = ContextConsumer;
          exports.ContextProvider = ContextProvider;
          exports.Element = Element;
          exports.ForwardRef = ForwardRef;
          exports.Fragment = Fragment;
          exports.Lazy = Lazy;
          exports.Memo = Memo;
          exports.Portal = Portal;
          exports.Profiler = Profiler;
          exports.StrictMode = StrictMode;
          exports.Suspense = Suspense;
          exports.isAsyncMode = isAsyncMode;
          exports.isConcurrentMode = isConcurrentMode;
          exports.isContextConsumer = isContextConsumer;
          exports.isContextProvider = isContextProvider;
          exports.isElement = isElement;
          exports.isForwardRef = isForwardRef;
          exports.isFragment = isFragment;
          exports.isLazy = isLazy;
          exports.isMemo = isMemo;
          exports.isPortal = isPortal;
          exports.isProfiler = isProfiler;
          exports.isStrictMode = isStrictMode;
          exports.isSuspense = isSuspense;
          exports.isValidElementType = isValidElementType;
          exports.typeOf = typeOf;
        })();
      }
    }
  });

  // example/.central/.central-build/node_modules/react-is/index.js
  var require_react_is2 = __commonJS({
    "example/.central/.central-build/node_modules/react-is/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_is_development2();
      }
    }
  });

  // example/.central/.central-build/node_modules/hast-util-whitespace/index.js
  function whitespace(thing) {
    var value = thing && typeof thing === "object" && thing.type === "text" ? thing.value || "" : thing;
    return typeof value === "string" && value.replace(/[ \t\n\f\r]/g, "") === "";
  }
  var init_hast_util_whitespace = __esm({
    "example/.central/.central-build/node_modules/hast-util-whitespace/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/space-separated-tokens/index.js
  function stringify(values) {
    return values.join(" ").trim();
  }
  var init_space_separated_tokens = __esm({
    "example/.central/.central-build/node_modules/space-separated-tokens/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/comma-separated-tokens/index.js
  function stringify2(values, options) {
    var settings = options || {};
    if (values[values.length - 1] === "") {
      values = values.concat("");
    }
    return values.join((settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")).trim();
  }
  var init_comma_separated_tokens = __esm({
    "example/.central/.central-build/node_modules/comma-separated-tokens/index.js"() {
    }
  });

  // example/.central/.central-build/node_modules/inline-style-parser/index.js
  var require_inline_style_parser = __commonJS({
    "example/.central/.central-build/node_modules/inline-style-parser/index.js"(exports, module) {
      var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
      var NEWLINE_REGEX = /\n/g;
      var WHITESPACE_REGEX = /^\s*/;
      var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
      var COLON_REGEX = /^:\s*/;
      var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
      var SEMICOLON_REGEX = /^[;\s]*/;
      var TRIM_REGEX = /^\s+|\s+$/g;
      var NEWLINE = "\n";
      var FORWARD_SLASH = "/";
      var ASTERISK = "*";
      var EMPTY_STRING = "";
      var TYPE_COMMENT = "comment";
      var TYPE_DECLARATION = "declaration";
      module.exports = function(style2, options) {
        if (typeof style2 !== "string") {
          throw new TypeError("First argument must be a string");
        }
        if (!style2)
          return [];
        options = options || {};
        var lineno = 1;
        var column = 1;
        function updatePosition(str) {
          var lines = str.match(NEWLINE_REGEX);
          if (lines)
            lineno += lines.length;
          var i = str.lastIndexOf(NEWLINE);
          column = ~i ? str.length - i : column + str.length;
        }
        function position2() {
          var start = { line: lineno, column };
          return function(node) {
            node.position = new Position(start);
            whitespace2();
            return node;
          };
        }
        function Position(start) {
          this.start = start;
          this.end = { line: lineno, column };
          this.source = options.source;
        }
        Position.prototype.content = style2;
        var errorsList = [];
        function error(msg) {
          var err = new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
          err.reason = msg;
          err.filename = options.source;
          err.line = lineno;
          err.column = column;
          err.source = style2;
          if (options.silent) {
            errorsList.push(err);
          } else {
            throw err;
          }
        }
        function match(re) {
          var m = re.exec(style2);
          if (!m)
            return;
          var str = m[0];
          updatePosition(str);
          style2 = style2.slice(str.length);
          return m;
        }
        function whitespace2() {
          match(WHITESPACE_REGEX);
        }
        function comments(rules) {
          var c;
          rules = rules || [];
          while (c = comment()) {
            if (c !== false) {
              rules.push(c);
            }
          }
          return rules;
        }
        function comment() {
          var pos = position2();
          if (FORWARD_SLASH != style2.charAt(0) || ASTERISK != style2.charAt(1))
            return;
          var i = 2;
          while (EMPTY_STRING != style2.charAt(i) && (ASTERISK != style2.charAt(i) || FORWARD_SLASH != style2.charAt(i + 1))) {
            ++i;
          }
          i += 2;
          if (EMPTY_STRING === style2.charAt(i - 1)) {
            return error("End of comment missing");
          }
          var str = style2.slice(2, i - 2);
          column += 2;
          updatePosition(str);
          style2 = style2.slice(i);
          column += 2;
          return pos({
            type: TYPE_COMMENT,
            comment: str
          });
        }
        function declaration() {
          var pos = position2();
          var prop = match(PROPERTY_REGEX);
          if (!prop)
            return;
          comment();
          if (!match(COLON_REGEX))
            return error("property missing ':'");
          var val = match(VALUE_REGEX);
          var ret = pos({
            type: TYPE_DECLARATION,
            property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
            value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
          });
          match(SEMICOLON_REGEX);
          return ret;
        }
        function declarations() {
          var decls = [];
          comments(decls);
          var decl;
          while (decl = declaration()) {
            if (decl !== false) {
              decls.push(decl);
              comments(decls);
            }
          }
          return decls;
        }
        whitespace2();
        return declarations();
      };
      function trim(str) {
        return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
      }
    }
  });

  // example/.central/.central-build/node_modules/style-to-object/index.js
  var require_style_to_object = __commonJS({
    "example/.central/.central-build/node_modules/style-to-object/index.js"(exports, module) {
      var parse2 = require_inline_style_parser();
      function StyleToObject(style2, iterator) {
        var output = null;
        if (!style2 || typeof style2 !== "string") {
          return output;
        }
        var declaration;
        var declarations = parse2(style2);
        var hasIterator = typeof iterator === "function";
        var property;
        var value;
        for (var i = 0, len = declarations.length; i < len; i++) {
          declaration = declarations[i];
          property = declaration.property;
          value = declaration.value;
          if (hasIterator) {
            iterator(property, value, declaration);
          } else if (value) {
            output || (output = {});
            output[property] = value;
          }
        }
        return output;
      }
      module.exports = StyleToObject;
    }
  });

  // example/.central/.central-build/node_modules/react-markdown/lib/ast-to-react.js
  function childrenToReact(context, node) {
    const children = [];
    let childIndex = -1;
    let child;
    while (++childIndex < node.children.length) {
      child = node.children[childIndex];
      if (child.type === "element") {
        children.push(toReact(context, child, childIndex, node));
      } else if (child.type === "text") {
        if (node.type !== "element" || !tableElements.has(node.tagName) || !whitespace(child)) {
          children.push(child.value);
        }
      } else if (child.type === "raw" && !context.options.skipHtml) {
        children.push(child.value);
      }
    }
    return children;
  }
  function toReact(context, node, index2, parent) {
    const options = context.options;
    const parentSchema = context.schema;
    const name = node.tagName;
    const properties = {};
    let schema = parentSchema;
    let property;
    if (parentSchema.space === "html" && name === "svg") {
      schema = svg2;
      context.schema = schema;
    }
    if (node.properties) {
      for (property in node.properties) {
        if (own7.call(node.properties, property)) {
          addProperty(properties, property, node.properties[property], context);
        }
      }
    }
    if (name === "ol" || name === "ul") {
      context.listDepth++;
    }
    const children = childrenToReact(context, node);
    if (name === "ol" || name === "ul") {
      context.listDepth--;
    }
    context.schema = parentSchema;
    const position2 = node.position || {
      start: { line: null, column: null, offset: null },
      end: { line: null, column: null, offset: null }
    };
    const component = options.components && own7.call(options.components, name) ? options.components[name] : name;
    const basic = typeof component === "string" || component === import_react.default.Fragment;
    if (!import_react_is.default.isValidElementType(component)) {
      throw new TypeError(`Component for name \`${name}\` not defined or is not renderable`);
    }
    properties.key = [
      name,
      position2.start.line,
      position2.start.column,
      index2
    ].join("-");
    if (name === "a" && options.linkTarget) {
      properties.target = typeof options.linkTarget === "function" ? options.linkTarget(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null) : options.linkTarget;
    }
    if (name === "a" && options.transformLinkUri) {
      properties.href = options.transformLinkUri(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null);
    }
    if (!basic && name === "code" && parent.type === "element" && parent.tagName !== "pre") {
      properties.inline = true;
    }
    if (!basic && (name === "h1" || name === "h2" || name === "h3" || name === "h4" || name === "h5" || name === "h6")) {
      properties.level = Number.parseInt(name.charAt(1), 10);
    }
    if (name === "img" && options.transformImageUri) {
      properties.src = options.transformImageUri(String(properties.src || ""), String(properties.alt || ""), typeof properties.title === "string" ? properties.title : null);
    }
    if (!basic && name === "li" && parent.type === "element") {
      const input = getInputElement(node);
      properties.checked = input && input.properties ? Boolean(input.properties.checked) : null;
      properties.index = getElementsBeforeCount(parent, node);
      properties.ordered = parent.tagName === "ol";
    }
    if (!basic && (name === "ol" || name === "ul")) {
      properties.ordered = name === "ol";
      properties.depth = context.listDepth;
    }
    if (name === "td" || name === "th") {
      if (properties.align) {
        if (!properties.style)
          properties.style = {};
        properties.style.textAlign = properties.align;
        delete properties.align;
      }
      if (!basic) {
        properties.isHeader = name === "th";
      }
    }
    if (!basic && name === "tr" && parent.type === "element") {
      properties.isHeader = Boolean(parent.tagName === "thead");
    }
    if (options.sourcePos) {
      properties["data-sourcepos"] = flattenPosition(position2);
    }
    if (!basic && options.rawSourcePos) {
      properties.sourcePosition = node.position;
    }
    if (!basic && options.includeElementIndex) {
      properties.index = getElementsBeforeCount(parent, node);
      properties.siblingCount = getElementsBeforeCount(parent);
    }
    if (!basic) {
      properties.node = node;
    }
    return children.length > 0 ? import_react.default.createElement(component, properties, children) : import_react.default.createElement(component, properties);
  }
  function getInputElement(node) {
    let index2 = -1;
    while (++index2 < node.children.length) {
      const child = node.children[index2];
      if (child.type === "element" && child.tagName === "input") {
        return child;
      }
    }
    return null;
  }
  function getElementsBeforeCount(parent, node) {
    let index2 = -1;
    let count = 0;
    while (++index2 < parent.children.length) {
      if (parent.children[index2] === node)
        break;
      if (parent.children[index2].type === "element")
        count++;
    }
    return count;
  }
  function addProperty(props, prop, value, ctx) {
    const info = find(ctx.schema, prop);
    let result = value;
    if (result === null || result === void 0 || result !== result) {
      return;
    }
    if (Array.isArray(result)) {
      result = info.commaSeparated ? stringify2(result) : stringify(result);
    }
    if (info.property === "style" && typeof result === "string") {
      result = parseStyle(result);
    }
    if (info.space && info.property) {
      props[own7.call(hastToReact, info.property) ? hastToReact[info.property] : info.property] = result;
    } else if (info.attribute) {
      props[info.attribute] = result;
    }
  }
  function parseStyle(value) {
    const result = {};
    try {
      (0, import_style_to_object.default)(value, iterator);
    } catch {
    }
    return result;
    function iterator(name, v) {
      const k = name.slice(0, 4) === "-ms-" ? `ms-${name.slice(4)}` : name;
      result[k.replace(/-([a-z])/g, styleReplacer)] = v;
    }
  }
  function styleReplacer(_, $1) {
    return $1.toUpperCase();
  }
  function flattenPosition(pos) {
    return [
      pos.start.line,
      ":",
      pos.start.column,
      "-",
      pos.end.line,
      ":",
      pos.end.column
    ].map((d) => String(d)).join("");
  }
  var import_react, import_react_is, import_style_to_object, own7, tableElements;
  var init_ast_to_react = __esm({
    "example/.central/.central-build/node_modules/react-markdown/lib/ast-to-react.js"() {
      import_react = __toModule(require_react());
      import_react_is = __toModule(require_react_is2());
      init_hast_util_whitespace();
      init_property_information();
      init_space_separated_tokens();
      init_comma_separated_tokens();
      import_style_to_object = __toModule(require_style_to_object());
      own7 = {}.hasOwnProperty;
      tableElements = new Set(["table", "thead", "tbody", "tfoot", "tr"]);
    }
  });

  // example/.central/.central-build/node_modules/react-markdown/lib/react-markdown.js
  function ReactMarkdown(options) {
    for (const key in deprecated) {
      if (own8.call(deprecated, key) && own8.call(options, key)) {
        const deprecation = deprecated[key];
        console.warn(`[react-markdown] Warning: please ${deprecation.to ? `use \`${deprecation.to}\` instead of` : "remove"} \`${key}\` (see <${changelog}#${deprecation.id}> for more info)`);
        delete deprecated[key];
      }
    }
    const processor = unified().use(remark_parse_default).use(options.remarkPlugins || options.plugins || []).use(remark_rehype_default, { allowDangerousHtml: true }).use(options.rehypePlugins || []).use(rehypeFilter, options);
    const file = new VFile();
    if (typeof options.children === "string") {
      file.value = options.children;
    } else if (options.children !== void 0 && options.children !== null) {
      console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`);
    }
    const hastNode = processor.runSync(processor.parse(file), file);
    if (hastNode.type !== "root") {
      throw new TypeError("Expected a `root` node");
    }
    let result = import_react2.default.createElement(import_react2.default.Fragment, {}, childrenToReact({ options, schema: html3, listDepth: 0 }, hastNode));
    if (options.className) {
      result = import_react2.default.createElement("div", { className: options.className }, result);
    }
    return result;
  }
  var import_react2, import_prop_types, own8, changelog, deprecated;
  var init_react_markdown = __esm({
    "example/.central/.central-build/node_modules/react-markdown/lib/react-markdown.js"() {
      import_react2 = __toModule(require_react());
      init_vfile();
      init_unified();
      init_remark_parse();
      init_remark_rehype();
      import_prop_types = __toModule(require_prop_types());
      init_property_information();
      init_rehype_filter();
      init_uri_transformer();
      init_ast_to_react();
      own8 = {}.hasOwnProperty;
      changelog = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md";
      deprecated = {
        renderers: { to: "components", id: "change-renderers-to-components" },
        astPlugins: { id: "remove-buggy-html-in-markdown-parser" },
        allowDangerousHtml: { id: "remove-buggy-html-in-markdown-parser" },
        escapeHtml: { id: "remove-buggy-html-in-markdown-parser" },
        source: { to: "children", id: "change-source-to-children" },
        allowNode: {
          to: "allowElement",
          id: "replace-allownode-allowedtypes-and-disallowedtypes"
        },
        allowedTypes: {
          to: "allowedElements",
          id: "replace-allownode-allowedtypes-and-disallowedtypes"
        },
        disallowedTypes: {
          to: "disallowedElements",
          id: "replace-allownode-allowedtypes-and-disallowedtypes"
        },
        includeNodeIndex: {
          to: "includeElementIndex",
          id: "change-includenodeindex-to-includeelementindex"
        }
      };
      ReactMarkdown.defaultProps = { transformLinkUri: uriTransformer };
      ReactMarkdown.propTypes = {
        children: import_prop_types.default.string,
        className: import_prop_types.default.string,
        allowElement: import_prop_types.default.func,
        allowedElements: import_prop_types.default.arrayOf(import_prop_types.default.string),
        disallowedElements: import_prop_types.default.arrayOf(import_prop_types.default.string),
        unwrapDisallowed: import_prop_types.default.bool,
        remarkPlugins: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
          import_prop_types.default.object,
          import_prop_types.default.func,
          import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.func]))
        ])),
        rehypePlugins: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
          import_prop_types.default.object,
          import_prop_types.default.func,
          import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.func]))
        ])),
        sourcePos: import_prop_types.default.bool,
        rawSourcePos: import_prop_types.default.bool,
        skipHtml: import_prop_types.default.bool,
        includeElementIndex: import_prop_types.default.bool,
        transformLinkUri: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.bool]),
        linkTarget: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]),
        transformImageUri: import_prop_types.default.func,
        components: import_prop_types.default.object
      };
    }
  });

  // example/.central/.central-build/node_modules/react-markdown/index.js
  var init_react_markdown2 = __esm({
    "example/.central/.central-build/node_modules/react-markdown/index.js"() {
      init_react_markdown();
    }
  });

  // example/.central/.central-build/node_modules/markdown_central_1/index.jsx
  var require_markdown_central_1 = __commonJS({
    "example/.central/.central-build/node_modules/markdown_central_1/index.jsx"(exports, module) {
      var import_react3 = __toModule(require_react2());
      init_react_markdown2();
      async function content3(req) {
        const text4 = req.file && await req.file.text();
        if (text4) {
          return /* @__PURE__ */ import_react3.default.createElement(ReactMarkdown, null, text4);
        }
        return null;
      }
      module.exports = {
        content: content3,
        ".central": {
          middleware: [
            [
              "*",
              ["all", (req, res, next) => {
                console.log("child middleware", req.originalUrl);
                next();
              }]
            ]
          ],
          routes: [
            ["*", ["all", async function(req, res, next) {
              res.send(await this.html(await content3(req)));
            }]]
          ]
        }
      };
    }
  });

  // example/.central/.central-build/index.js
  var require_index = __commonJS({
    "example/.central/.central-build/index.js"(exports, module) {
      console.log("");
      var c_0;
      try {
        c_0 = require_central_0();
      } catch (error) {
        if (error.code !== "MODULE_NOT_FOUND") {
          console.log("Error loading", "central_0");
          console.error(error);
        }
        c_0 = {};
      }
      if (!c_0[".central"]) {
        c_0[".central"] = { children: {} };
      } else if (!c_0[".central"].children) {
        c_0[".central"].children = {};
      }
      c_0[".central"].root = c_0;
      console.log("calendar");
      var c_1 = { ".central": { children: {} } };
      c_1[".central"].parent = c_0;
      c_0[".central"].children["calendar"] = c_1;
      Object.setPrototypeOf(c_1, c_0);
      c_1[".central"].parent = c_0;
      c_1[".central"].root = c_0;
      console.log("calendar/2021");
      var c_2;
      try {
        c_2 = require_central();
      } catch (error) {
        if (error.code !== "MODULE_NOT_FOUND") {
          console.log("Error loading", "/home/ben/projects/central/example/calendar/2021/.central.js");
          console.error(error);
        }
        c_2 = {};
      }
      if (!c_2[".central"]) {
        c_2[".central"] = { children: {} };
      } else if (!c_2[".central"].children) {
        c_2[".central"].children = {};
      }
      c_2[".central"].parent = c_1;
      c_1[".central"].children["2021"] = c_2;
      Object.setPrototypeOf(c_2, c_1);
      c_2[".central"].parent = c_1;
      c_2[".central"].root = c_0;
      console.log("contacts");
      var c_3 = { ".central": { children: {} } };
      c_3[".central"].parent = c_0;
      c_0[".central"].children["contacts"] = c_3;
      Object.setPrototypeOf(c_3, c_0);
      c_3[".central"].parent = c_0;
      c_3[".central"].root = c_0;
      console.log("finance");
      var c_4;
      try {
        c_4 = (init_index(), index_exports);
      } catch (error) {
        if (error.code !== "MODULE_NOT_FOUND") {
          console.log("Error loading", "/home/ben/projects/central/example/finance/.central/index.js");
          console.error(error);
        }
        c_4 = {};
      }
      if (!c_4[".central"]) {
        c_4[".central"] = { children: {} };
      } else if (!c_4[".central"].children) {
        c_4[".central"].children = {};
      }
      c_4[".central"].parent = c_0;
      c_0[".central"].children["finance"] = c_4;
      Object.setPrototypeOf(c_4, c_0);
      c_4[".central"].parent = c_0;
      c_4[".central"].root = c_0;
      console.log("markdown");
      var c_5;
      try {
        c_5 = require_markdown_central_1();
      } catch (error) {
        if (error.code !== "MODULE_NOT_FOUND") {
          console.log("Error loading", "markdown_central_1");
          console.error(error);
        }
        c_5 = {};
      }
      if (!c_5[".central"]) {
        c_5[".central"] = { children: {} };
      } else if (!c_5[".central"].children) {
        c_5[".central"].children = {};
      }
      c_5[".central"].parent = c_0;
      c_0[".central"].children["markdown"] = c_5;
      Object.setPrototypeOf(c_5, c_0);
      c_5[".central"].parent = c_0;
      c_5[".central"].root = c_0;
      module.exports = c_0;
    }
  });
  require_index();
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/**
 * @license React
 * react-dom-server-legacy.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * react-dom-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
