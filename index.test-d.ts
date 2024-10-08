import { expectType, expectError } from "tsd";
import { BetterTypedServiceBroker } from "./types/broker";
import { BetterTypedContext } from "./types/context";

type ServiceDefinitions = [
  typeof import("./tests/test-data/moleculer-services/service-alpha").default,
  typeof import("./tests/test-data/moleculer-services/service-beta").default,
  typeof import("./tests/test-data/moleculer-services/service-gamma").default,
];

// Testing broker
type TestBroker = BetterTypedServiceBroker<ServiceDefinitions>;

const broker = {} as TestBroker;

// Usual actions as functions

expectType<Promise<string>>(broker.call("service:alpha.alphaAction", { "name": "hello"} ));

expectType<Promise<string>>(broker.call("service:alpha.alphaActionWithoutParamsAndMeta"));

expectType<Promise<number>>(broker.call("service:alpha.alphaActionWithoutParamsWithMeta", undefined, { meta: { userId: "test" } }));

expectType<Promise<void>>(broker.call("service:alpha.alphaActionWithVoidReturn"));

expectType<Promise<{ something: number }>>(broker.call("service:beta.betaAction", { version: "third" }));

// Handler inside object

expectType<Promise<{ name: string }>>(broker.call("service:beta.betaActionWithObjectDefinition", { myParam: 3 }, { meta: { log: true } }));

// with Version

expectType<Promise<{ something: number }>>(broker.call("v3.service:gamma.gammaAction", { version: "third" }));

expectType<Promise<{ name: string }>>(broker.call("v3.service:gamma.gammaActionWithObjectDefinition", { myParam: 3 }, { meta: { log: true } }));

// Errors
expectError(broker.call("service:alpha.alphaAction", { "name": 2 } ));
expectError(broker.call("service:alpha.alphaAction"));
expectError(broker.call("service:alpha.alphaActionWithoutParamsAndMeta", {}, { meta: "kek" }));


// Testing context

type TestContext<P = unknown, M extends object = {}, L = Record<string, any>> = BetterTypedContext<ServiceDefinitions, P, M, L>;

const ctx = {} as TestContext;

expectType<Promise<string>>(ctx.call("service:alpha.alphaAction", { "name": "hello"} ));
expectType<Promise<string>>(ctx.broker.call("service:alpha.alphaAction", { "name": "hello"} ));
