import type { Context } from "moleculer";
import { ServiceSchemaTuple } from "./shared";
import { BetterTypedServiceBroker, BrokerCallFunctionDefinitionFromSchemaTuple } from "./broker";

type ContextWithoutCallBroker<P = unknown, M extends object = {}, L = Record<string, any>> = Omit<Context<P, M, L>, "call" | "broker">;

export type BetterTypedContext<TSchemaTuple extends ServiceSchemaTuple, P = unknown, M extends object = {}, L = Record<string, any>> =
  {
    call: BrokerCallFunctionDefinitionFromSchemaTuple<TSchemaTuple>
    broker: BetterTypedServiceBroker<TSchemaTuple>
  } & ContextWithoutCallBroker<P, M, L>;
