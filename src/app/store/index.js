import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { defaultState } from "../../server/defaultState";
import * as sagas from "./sagas.mock";
import * as mutations from "./mutations";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.CREATE_TASK:
          return [...tasks, {
            id: action.taskID,
            name: "New Task",
            group: action.groupID,
            owner: action.ownerID,
            isComplete: false
          }]
      }
      return tasks;
    },
    comments(comments = defaultState.comments, action) {
      return comments;
    },
    groups(groups = defaultState.groups, action) {
      return groups;
    },
    users(users = defaultState.users, action) {
      return users
    }
  }),
  applyMiddleware(logger, sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
