import * as Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

Enzyme.configure({ adapter: new Adapter() });