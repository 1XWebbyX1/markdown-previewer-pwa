// External Depedencies
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Taskbar from './Taskbar';


configure({ adapter: new Adapter() });

describe('Taskbar', () => {
  const mockOnClickFunc = jest.fn();
  const mockToggleInfoFunc = jest.fn();
  const mockSaveFunc = jest.fn();
  const mockSwitchThemeFunc = jest.fn();

  //to make sure all list items are rendered
  it("renders correctly", () => {
     const output = renderer.create(
         <Taskbar onClick={mockOnClickFunc} toggleInfo={mockToggleInfoFunc} switchTheme={mockSwitchThemeFunc} save={mockSaveFunc} />
   ).toJSON();
     expect(output).to.matchSnapshot();
  });

  it('renders 11 list elements', () => {
    let app = shallow(
<Taskbar onClick={mockOnClickFunc} toggleInfo={mockToggleInfoFunc} switchTheme={mockSwitchThemeFunc} save={mockSaveFunc} />     );
    expect(app.find('li').length).to.equal(11);
    app.unmount();
  });

});
