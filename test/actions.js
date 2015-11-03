import {expect} from 'chai';

import * as actions from '../js/data/actions';

describe('actions', () => {
  
  it('should create an action to fetch todos', () => {
    const expectedAction = {
      type: actions.FETCH_TODOS_REQUEST,
    }
    expect(actions.fetchTodosRequest())
      .to.deep.equal(expectedAction);
  });

});
