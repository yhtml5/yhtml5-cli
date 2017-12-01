// Link.react-test.js
import React from 'react';
import Link from '../src/component/Link';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * The next time you run the tests,
 * the rendered output will be compared to the previously created snapshot.
 * The snapshot should be committed along code changes.
 * When a snapshot test fails, you need to inspect whether it is an intended or unintended change.
 * If the change is expected you can invoke Jest with jest -u to overwrite the existing snapshot.
 */
