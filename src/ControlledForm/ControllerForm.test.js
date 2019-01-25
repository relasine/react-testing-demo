import React from "react";
import { shallow } from "enzyme";

import ControlledForm from "./ControlledForm";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("ControlledForm", () => {
  let wrapper;
  let mockSubmit;

  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<ControlledForm submit={mockSubmit} />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleChange", () => {
    it("should call setState on title", () => {
      const mockEvent = {
        target: {
          name: "title",
          value: "test"
        }
      };

      const expected = {
        title: "test",
        description: "",
        submitActive: false
      };
      wrapper.instance().handleChange(mockEvent);

      expect(wrapper.state()).toEqual(expected);
    });

    it("should call setState on description", () => {
      const mockEvent = {
        target: {
          name: "description",
          value: "test"
        }
      };

      const expected = {
        title: "",
        description: "test",
        submitActive: false
      };
      wrapper.instance().handleChange(mockEvent);

      expect(wrapper.state()).toEqual(expected);
    });

    it("should call checkFields", () => {
      const spy = jest.spyOn(wrapper.instance(), "checkFields");

      wrapper.instance().forceUpdate();

      const mockEvent = {
        target: {
          name: "description",
          value: "test"
        }
      };

      const expected = true;

      wrapper.instance().handleChange(mockEvent);

      expect(spy).toHaveBeenCalled();
    });
  });

  it("should call handleChange on title change with the correct params", () => {
    const spy = jest.spyOn(wrapper.instance(), "handleChange");

    wrapper.instance().forceUpdate();

    const mockEvent = {
      target: {
        name: "title",
        value: "test"
      }
    };

    wrapper.find(".title-input").simulate("change", mockEvent);

    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  it("should call handleChange on description change with the correct params", () => {
    const spy = jest.spyOn(wrapper.instance(), "handleChange");

    wrapper.instance().forceUpdate();

    const mockEvent = {
      target: {
        name: "description",
        value: "test"
      }
    };

    wrapper.find(".description-input").simulate("change", mockEvent);

    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  describe("handleSubmit", () => {
    it("should call preventDefault", () => {
      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      wrapper.instance().handleSubmit(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it("should return if submitActive is false", () => {
      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();

      wrapper.instance().handleSubmit(mockEvent);

      expect(spy).toReturn();
    });

    it("should call submit with the correct params", () => {
      wrapper.setState({
        title: "test title",
        description: "test description",
        submitActive: true
      });

      const expected = {
        title: "test title",
        description: "test description"
      };

      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      wrapper.instance().handleSubmit(mockEvent);

      expect(mockSubmit).toHaveBeenCalledWith(expected);
    });

    it("should call handleSubmit on submit with the correct params", () => {
      const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();

      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      wrapper.find(".controlled-form").simulate("submit", mockEvent);

      expect(spy).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe("checkFields", () => {
    it("should setState if it meets conditions", () => {
      wrapper.setState({
        title: "test title",
        description: "test description",
        submitActive: false
      });

      wrapper.instance().checkFields();

      expect(wrapper.state().submitActive).toEqual(true);
    });

    it("should setState if it does not meet conditions", () => {
      wrapper.setState({
        title: "test title",
        description: "",
        submitActive: true
      });

      wrapper.instance().checkFields();

      expect(wrapper.state().submitActive).toEqual(false);
    });
  });
});
