// import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import SAPPriceBoard from '../../containers/SAPPriceBoard';

describe('SAPPriceBoard', () => {
	it('should render correctly', () => {
		const wrapper = mount(<SAPPriceBoard />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('renders in table rows based on provided columns', () => {
		const cols = [
			{ name: 'supplierName', label: 'Supplier' },
			{ name: 'rawMaterialName', label: 'Materials' },
			{ name: 'country', label: 'Country' },
			{ name: 'price', label: 'Price(in $)' }
		];

		const data = [
			{ name: 'John', label: 'P&G' },
			{ name: 'ABCD', label: 'P&G' },
			{ name: 'India', label: 'India' }
		];

		const container = mount(<SAPPriceBoard data={data} cols={cols} />);
		expect(container).toMatchSnapshot();
	});

	it('should render a loader', () => {
		const wrapper = mount(<SAPPriceBoard />);
		expect(wrapper.find('.spinner-border')).toMatchSnapshot();
	});

	it('should render a table', () => {
		const wrapper = mount(<SAPPriceBoard />);
		expect(wrapper.find('Table')).toMatchSnapshot();
	});

	it('should have -', () => {
		const wrapper = mount(<SAPPriceBoard />);
		expect(wrapper.find('-')).toMatchSnapshot();
	});
});
