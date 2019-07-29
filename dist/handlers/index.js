"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const HandlerBase_1 = __importDefault(require("./HandlerBase"));
exports.HandlerBase = HandlerBase_1.default;
const EventHandlerBase_1 = __importDefault(require("./EventHandlerBase"));
exports.EventHandlerBase = EventHandlerBase_1.default;
const TaskHandlerBase_1 = __importDefault(require("./TaskHandlerBase"));
exports.TaskHandlerBase = TaskHandlerBase_1.default;
const RPCHandlerBase_1 = __importDefault(require("./RPCHandlerBase"));
exports.RPCHandlerBase = RPCHandlerBase_1.default;
const loadEvents = (resources, events = {}, dir) => __awaiter(this, void 0, void 0, function* () {
    let eventsDir;
    if (dir) {
        eventsDir = dir;
    }
    else {
        eventsDir = path.join(resources.configuration.baseDir, './events/');
    }
    let handlers;
    try {
        handlers = fs.readdirSync(eventsDir);
    }
    catch (error) {
        return;
    }
    for (const handlerName of handlers) {
        const handlerPath = path.join(eventsDir, handlerName);
        if (_.endsWith(handlerName, '.event.ts')) {
            try {
                const handlerSpec = require(handlerPath).default;
                const handler = new handlerSpec(resources);
                if (_.has(events, handler.topic)) {
                    throw new Error(`Duplicated event listener: ${handler.topic}`);
                }
                yield handler.init();
                events[handler.topic] = handler;
                resources.logger.log('-', handler.getName());
            }
            catch (error) {
                resources.logger.error(`Error Registering Event ${handlerName}: ${error}`);
            }
        }
        else {
            try {
                // recurse down the directory tree
                yield this.loadEvents(resources, events, path.join(handlerPath, '/'));
            }
            catch (error) {
                // resources.logger.error(`Error Rrecursing down ${handlerPath}: ${error}`);
                continue;
            }
        }
    }
    return events;
});
exports.loadEvents = loadEvents;
const loadTasks = (resources, tasks = {}, dir) => __awaiter(this, void 0, void 0, function* () {
    let tasksDir;
    if (dir) {
        tasksDir = dir;
    }
    else {
        tasksDir = path.join(resources.configuration.baseDir, './tasks/');
    }
    let handlers;
    try {
        handlers = fs.readdirSync(tasksDir);
    }
    catch (error) {
        return;
    }
    for (const handlerName of handlers) {
        const handlerPath = path.join(tasksDir, handlerName);
        if (_.endsWith(handlerName, '.task.ts')) {
            try {
                const handlerSpec = require(handlerPath).default;
                const handler = new handlerSpec(resources);
                if (_.has(tasks, handler.topic)) {
                    throw new Error(`Duplicated task listener: ${handler.topic}`);
                }
                yield handler.init();
                tasks[handler.topic] = handler;
                resources.logger.log('-', handler.getName());
            }
            catch (error) {
                resources.logger.error(`Error Registering Event ${handlerName}: ${error}`);
            }
        }
        else {
            try {
                // recurse down the directory tree
                yield this.loadTasks(resources, tasks, path.join(handlerPath, '/'));
            }
            catch (error) {
                // resources.logger.error(`Error Rrecursing down ${handlerPath}: ${error}`);
                continue;
            }
        }
    }
    return tasks;
});
exports.loadTasks = loadTasks;
const loadRPC = (resources, rpcs = {}, dir) => __awaiter(this, void 0, void 0, function* () {
    let rpcsDir;
    if (dir) {
        rpcsDir = dir;
    }
    else {
        rpcsDir = path.join(resources.configuration.baseDir, './rpc/');
    }
    let handlers;
    try {
        handlers = fs.readdirSync(rpcsDir);
    }
    catch (error) {
        return;
    }
    for (const handlerName of handlers) {
        const handlerPath = path.join(rpcsDir, handlerName);
        if (_.endsWith(handlerName, '.rpc.ts')) {
            try {
                const handlerSpec = require(handlerPath).default;
                const handler = new handlerSpec(resources);
                if (_.has(rpcs, handler.topic)) {
                    throw new Error(`Duplicated rpc listener: ${handler.topic}`);
                }
                yield handler.init();
                rpcs[handler.topic] = handler;
                resources.logger.log('-', handler.getName());
            }
            catch (error) {
                resources.logger.error(`Error Registering Event ${handlerName}: ${error}`);
            }
        }
        else {
            try {
                // recurse down the directory tree
                yield this.loadRPC(resources, rpcs, path.join(handlerPath, '/'));
            }
            catch (error) {
                // resources.logger.error(`Error Rrecursing down ${handlerPath}: ${error}`);
                continue;
            }
        }
    }
    return rpcs;
});
exports.loadRPC = loadRPC;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEI7QUFDNUIsMkNBQTZCO0FBQzdCLHVDQUF5QjtBQUV6QixnRUFBd0M7QUFNdEMsc0JBTksscUJBQVcsQ0FNTDtBQUxiLDBFQUFrRDtBQU1oRCwyQkFOSywwQkFBZ0IsQ0FNTDtBQUxsQix3RUFBZ0Q7QUFNOUMsMEJBTksseUJBQWUsQ0FNTDtBQUxqQixzRUFBOEM7QUFNNUMseUJBTkssd0JBQWMsQ0FNTDtBQU1oQixNQUFNLFVBQVUsR0FBRyxDQUFPLFNBQTJCLEVBQUUsU0FBYyxFQUFFLEVBQUUsR0FBWSxFQUFnQixFQUFFO0lBQ3JHLElBQUksU0FBaUIsQ0FBQztJQUN0QixJQUFJLEdBQUcsRUFBRTtRQUNQLFNBQVMsR0FBRyxHQUFHLENBQUM7S0FDakI7U0FBTTtRQUNMLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ3JFO0lBRUQsSUFBSSxRQUFrQixDQUFDO0lBQ3ZCLElBQUk7UUFDRixRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN0QztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTztLQUNSO0lBRUQsS0FBSyxNQUFNLFdBQVcsSUFBSSxRQUFRLEVBQUU7UUFDbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBRTtZQUN4QyxJQUFJO2dCQUNGLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pE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O29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDOUQ7Z0JBRUQsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUM5QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDOUM7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsV0FBVyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDNUU7U0FDRjthQUFNO1lBQ0wsSUFBSTtnQkFDRixrQ0FBa0M7Z0JBQ2xDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEU7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCw0RUFBNEU7Z0JBQzVFLFNBQVM7YUFDVjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQSxDQUFDO0FBMUlBLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuaW1wb3J0IEhhbmRsZXJCYXNlIGZyb20gJy4vSGFuZGxlckJhc2UnO1xuaW1wb3J0IEV2ZW50SGFuZGxlckJhc2UgZnJvbSAnLi9FdmVudEhhbmRsZXJCYXNlJztcbmltcG9ydCBUYXNrSGFuZGxlckJhc2UgZnJvbSAnLi9UYXNrSGFuZGxlckJhc2UnO1xuaW1wb3J0IFJQQ0hhbmRsZXJCYXNlIGZyb20gJy4vUlBDSGFuZGxlckJhc2UnO1xuaW1wb3J0IHsgU2VydmljZVJlc291cmNlcyB9IGZyb20gJy4uLyc7XG5leHBvcnQge1xuICBIYW5kbGVyQmFzZSxcbiAgRXZlbnRIYW5kbGVyQmFzZSxcbiAgVGFza0hhbmRsZXJCYXNlLFxuICBSUENIYW5kbGVyQmFzZSxcbiAgbG9hZEV2ZW50cyxcbiAgbG9hZFRhc2tzLFxuICBsb2FkUlBDLFxufTtcblxuY29uc3QgbG9hZEV2ZW50cyA9IGFzeW5jIChyZXNvdXJjZXM6IFNlcnZpY2VSZXNvdXJjZXMsIGV2ZW50czogYW55ID0ge30sIGRpcj86IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gIGxldCBldmVudHNEaXI6IHN0cmluZztcbiAgaWYgKGRpcikge1xuICAgIGV2ZW50c0RpciA9IGRpcjtcbiAgfSBlbHNlIHtcbiAgICBldmVudHNEaXIgPSBwYXRoLmpvaW4ocmVzb3VyY2VzLmNvbmZpZ3VyYXRpb24uYmFzZURpciwgJy4vZXZlbnRzLycpO1xuICB9XG5cbiAgbGV0IGhhbmRsZXJzOiBzdHJpbmdbXTtcbiAgdHJ5IHtcbiAgICBoYW5kbGVycyA9IGZzLnJlYWRkaXJTeW5jKGV2ZW50c0Rpcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yIChjb25zdCBoYW5kbGVyTmFtZSBvZiBoYW5kbGVycykge1xuICAgIGNvbnN0IGhhbmRsZXJQYXRoID0gcGF0aC5qb2luKGV2ZW50c0RpciwgaGFuZGxlck5hbWUpO1xuICAgIGlmIChfLmVuZHNXaXRoKGhhbmRsZXJOYW1lLCAnLmV2ZW50LnRzJykpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJTcGVjID0gcmVxdWlyZShoYW5kbGVyUGF0aCkuZGVmYXVsdDtcbiAgICAgICAgY29uc3QgaGFuZGxlcjogSGFuZGxlckJhc2UgPSBuZXcgaGFuZGxlclNwZWMocmVzb3VyY2VzKTtcblxuICAgICAgICBpZiAoXy5oYXMoZXZlbnRzLCBoYW5kbGVyLnRvcGljKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlZCBldmVudCBsaXN0ZW5lcjogJHtoYW5kbGVyLnRvcGljfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgaGFuZGxlci5pbml0KCk7XG4gICAgICAgIGV2ZW50c1toYW5kbGVyLnRvcGljXSA9IGhhbmRsZXI7XG4gICAgICAgIHJlc291cmNlcy5sb2dnZXIubG9nKCctJywgaGFuZGxlci5nZXROYW1lKCkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVzb3VyY2VzLmxvZ2dlci5lcnJvcihgRXJyb3IgUmVnaXN0ZXJpbmcgRXZlbnQgJHtoYW5kbGVyTmFtZX06ICR7ZXJyb3J9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHJlY3Vyc2UgZG93biB0aGUgZGlyZWN0b3J5IHRyZWVcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRXZlbnRzKHJlc291cmNlcywgZXZlbnRzLCBwYXRoLmpvaW4oaGFuZGxlclBhdGgsICcvJykpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gcmVzb3VyY2VzLmxvZ2dlci5lcnJvcihgRXJyb3IgUnJlY3Vyc2luZyBkb3duICR7aGFuZGxlclBhdGh9OiAke2Vycm9yfWApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGV2ZW50cztcbn07XG5cbmNvbnN0IGxvYWRUYXNrcyA9IGFzeW5jIChyZXNvdXJjZXM6IFNlcnZpY2VSZXNvdXJjZXMsIHRhc2tzOiBhbnkgPSB7fSwgZGlyPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgbGV0IHRhc2tzRGlyOiBzdHJpbmc7XG4gIGlmIChkaXIpIHtcbiAgICB0YXNrc0RpciA9IGRpcjtcbiAgfSBlbHNlIHtcbiAgICB0YXNrc0RpciA9IHBhdGguam9pbihyZXNvdXJjZXMuY29uZmlndXJhdGlvbi5iYXNlRGlyLCAnLi90YXNrcy8nKTtcbiAgfVxuXG4gIGxldCBoYW5kbGVyczogc3RyaW5nW107XG4gIHRyeSB7XG4gICAgaGFuZGxlcnMgPSBmcy5yZWFkZGlyU3luYyh0YXNrc0Rpcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yIChjb25zdCBoYW5kbGVyTmFtZSBvZiBoYW5kbGVycykge1xuICAgIGNvbnN0IGhhbmRsZXJQYXRoID0gcGF0aC5qb2luKHRhc2tzRGlyLCBoYW5kbGVyTmFtZSk7XG5cbiAgICBpZiAoXy5lbmRzV2l0aChoYW5kbGVyTmFtZSwgJy50YXNrLnRzJykpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJTcGVjID0gcmVxdWlyZShoYW5kbGVyUGF0aCkuZGVmYXVsdDtcbiAgICAgICAgY29uc3QgaGFuZGxlcjogSGFuZGxlckJhc2UgPSBuZXcgaGFuZGxlclNwZWMocmVzb3VyY2VzKTtcblxuICAgICAgICBpZiAoXy5oYXModGFza3MsIGhhbmRsZXIudG9waWMpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGVkIHRhc2sgbGlzdGVuZXI6ICR7aGFuZGxlci50b3BpY31gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGhhbmRsZXIuaW5pdCgpO1xuICAgICAgICB0YXNrc1toYW5kbGVyLnRvcGljXSA9IGhhbmRsZXI7XG4gICAgICAgIHJlc291cmNlcy5sb2dnZXIubG9nKCctJywgaGFuZGxlci5nZXROYW1lKCkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVzb3VyY2VzLmxvZ2dlci5lcnJvcihgRXJyb3IgUmVnaXN0ZXJpbmcgRXZlbnQgJHtoYW5kbGVyTmFtZX06ICR7ZXJyb3J9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHJlY3Vyc2UgZG93biB0aGUgZGlyZWN0b3J5IHRyZWVcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkVGFza3MocmVzb3VyY2VzLCB0YXNrcywgcGF0aC5qb2luKGhhbmRsZXJQYXRoLCAnLycpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIHJlc291cmNlcy5sb2dnZXIuZXJyb3IoYEVycm9yIFJyZWN1cnNpbmcgZG93biAke2hhbmRsZXJQYXRofTogJHtlcnJvcn1gKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXNrcztcbn07XG5cbmNvbnN0IGxvYWRSUEMgPSBhc3luYyAocmVzb3VyY2VzOiBTZXJ2aWNlUmVzb3VyY2VzLCBycGNzOiBhbnkgPSB7fSwgZGlyPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgbGV0IHJwY3NEaXI6IHN0cmluZztcbiAgaWYgKGRpcikge1xuICAgIHJwY3NEaXIgPSBkaXI7XG4gIH0gZWxzZSB7XG4gICAgcnBjc0RpciA9IHBhdGguam9pbihyZXNvdXJjZXMuY29uZmlndXJhdGlvbi5iYXNlRGlyLCAnLi9ycGMvJyk7XG4gIH1cblxuICBsZXQgaGFuZGxlcnM6IHN0cmluZ1tdO1xuICB0cnkge1xuICAgIGhhbmRsZXJzID0gZnMucmVhZGRpclN5bmMocnBjc0Rpcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yIChjb25zdCBoYW5kbGVyTmFtZSBvZiBoYW5kbGVycykge1xuICAgIGNvbnN0IGhhbmRsZXJQYXRoID0gcGF0aC5qb2luKHJwY3NEaXIsIGhhbmRsZXJOYW1lKTtcblxuICAgIGlmIChfLmVuZHNXaXRoKGhhbmRsZXJOYW1lLCAnLnJwYy50cycpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBoYW5kbGVyU3BlYyA9IHJlcXVpcmUoaGFuZGxlclBhdGgpLmRlZmF1bHQ7XG4gICAgICAgIGNvbnN0IGhhbmRsZXI6IEhhbmRsZXJCYXNlID0gbmV3IGhhbmRsZXJTcGVjKHJlc291cmNlcyk7XG5cbiAgICAgICAgaWYgKF8uaGFzKHJwY3MsIGhhbmRsZXIudG9waWMpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGVkIHJwYyBsaXN0ZW5lcjogJHtoYW5kbGVyLnRvcGljfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgaGFuZGxlci5pbml0KCk7XG4gICAgICAgIHJwY3NbaGFuZGxlci50b3BpY10gPSBoYW5kbGVyO1xuICAgICAgICByZXNvdXJjZXMubG9nZ2VyLmxvZygnLScsIGhhbmRsZXIuZ2V0TmFtZSgpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlc291cmNlcy5sb2dnZXIuZXJyb3IoYEVycm9yIFJlZ2lzdGVyaW5nIEV2ZW50ICR7aGFuZGxlck5hbWV9OiAke2Vycm9yfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyByZWN1cnNlIGRvd24gdGhlIGRpcmVjdG9yeSB0cmVlXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFJQQyhyZXNvdXJjZXMsIHJwY3MsIHBhdGguam9pbihoYW5kbGVyUGF0aCwgJy8nKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyByZXNvdXJjZXMubG9nZ2VyLmVycm9yKGBFcnJvciBScmVjdXJzaW5nIGRvd24gJHtoYW5kbGVyUGF0aH06ICR7ZXJyb3J9YCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcnBjcztcbn07XG4iXX0=