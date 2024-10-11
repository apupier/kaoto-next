import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import {
  IVisibleFlows,
  VisibleFlowsReducer,
  VisualFlowsApi,
} from '../models/visualization/flows/support/flows-visibility';
import { initVisibleFlows } from '../utils';
import { EntitiesContext } from './entities.provider';

export interface VisibleFLowsContextResult {
  visibleFlows: IVisibleFlows;
  visualFlowsApi: VisualFlowsApi;
}

export const VisibleFlowsContext = createContext<VisibleFLowsContextResult | undefined>(undefined);

export const VisibleFlowsProvider: FunctionComponent<PropsWithChildren> = (props) => {
  const entitiesContext = useContext(EntitiesContext);
  const visualEntitiesIds = useMemo(
    () => entitiesContext?.visualEntities.map((entity) => entity.id) ?? [],
    [entitiesContext?.visualEntities],
  );

  const [visibleFlows, dispatch] = useReducer(VisibleFlowsReducer, {}, () => initVisibleFlows(visualEntitiesIds));
  const visualFlowsApi = useMemo(() => {
    return new VisualFlowsApi(dispatch);
  }, [dispatch]);

  useEffect(() => {
    visualFlowsApi.initVisibleFlows(visualEntitiesIds);
  }, [visualEntitiesIds, visualFlowsApi]);

  const value = useMemo(() => {
    return {
      visibleFlows,
      visualFlowsApi,
    };
  }, [visibleFlows, visualFlowsApi]);

  return <VisibleFlowsContext.Provider value={value}>{props.children}</VisibleFlowsContext.Provider>;
};
