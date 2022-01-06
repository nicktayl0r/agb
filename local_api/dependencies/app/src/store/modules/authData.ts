// import gql from "graphql-tag";
import Vue from "vue";
import { ActionContext, Store } from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import { RootState } from "@/store";
// import apollo from "@/store/ApolloClient";

/** retrieves and stores auth data about the current user from the server */
export interface AuthDataState {
	activityAttemptId: number;
	sessionId: string;
}

export type authDataContext = ActionContext<AuthDataState, RootState>;

export const authDataStore = {
  namespaced: true,

  state: {
    activityAttemptId: -1,
    sessionId: ""
  },

  getters: {
    getAttemptId(state: AuthDataState) {
      return state.activityAttemptId;
    },
    getSessionId(state: AuthDataState) {
      return state.sessionId;
    }
  },

  mutations: {
    setAttemptId(state: AuthDataState, payload: { attemptId: number }) {
      Vue.set(state, "activityAttemptId", payload.attemptId);
    },
    setSessionId(state: AuthDataState, payload: { sessionId: string }) {
      Vue.set(state, "sessionId", payload.sessionId);
    }
  },

  actions: {
    /** It may be possible to get both of these with one query,
		 * worth keeping in mind for the future actual implementation
		 */
    // async queryAttemptId(context: authDataContext): Promise<void> {
    // 	// TODO: graphql query to get attemptId, currently hardcoding with a value I know exists
    // 	commitAttemptId(context, { attemptId: 2200 });
    // },
    // async querySessionId(context: authDataContext): Promise<void> {
    // 	// TODO: graphql query to get sessionId, currently hardcoding
    // 	commitSessionId(context, { sessionId: "test" });
    // }
  }
};

const { commit, read, dispatch } = getStoreAccessors<AuthDataState, RootState>(
  "authDataStore"
); // We pass namespace here, if we make the module namespaced: true.

export const readAttemptId = read(authDataStore.getters.getAttemptId);
export const commitAttemptId = commit(authDataStore.mutations.setAttemptId);
// export const dispatchAttemptId = dispatch(authDataStore.actions.queryAttemptId);

export const readSessionId = read(authDataStore.getters.getSessionId);
export const commitSessionId = commit(authDataStore.mutations.setSessionId);
// export const dispatchSessionId = dispatch(authDataStore.actions.querySessionId);
