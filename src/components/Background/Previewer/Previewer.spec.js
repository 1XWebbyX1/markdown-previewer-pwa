// External Depedencies
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Previewer from './Previewer';


configure({ adapter: new Adapter() });

describe('Previewer', () => {
  const mockFunc = jest.fn();

  it("renders correctly", () => {
     const output = renderer.create(
         <Previewer markdown="mockMarkdown" onClick={mockFunc}/>
   ).toJSON();
     expect(output).to.matchSnapshot(); //to check DrumPads are rendered correctly from data object
  });

  it('renders nested components', () => {
    let app = mount(
       <Previewer markdown="mockMarkdown" onClick={mockFunc}/>
     );
    expect(app.find('Toolbar').length).to.equal(1);
    app.unmount();
  });

})
