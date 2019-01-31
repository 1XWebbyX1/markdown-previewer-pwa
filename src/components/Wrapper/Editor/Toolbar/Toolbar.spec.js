// External Depedencies
import React from 'react';
import { shallow, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";

// Our Component
import Toolbar from './Toolbar';


configure({ adapter: new Adapter() });

describe('Toolbar', () => {

  it("renders correctly", () => {
     const output = renderer.create(
         <Toolbar />
   ).toJSON();
     expect(output).to.matchSnapshot();
  });

  it("renders 7 list elements", () => {
    const app = shallow(<Toolbar />);
    expect(app).to.have.exactly(7).descendants('li');
  })
})
