const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const FormGroup = require(getSolutionPath('components/FormGroup')).default;

describe('sfc/FormGroup', () => {
  describe('FormGroup', () => {
    const slots = { default: '<div class="test-div">TEST_DIV</div>' };
    const LABEL = 'TestLabel';

    it('FormGroup должен иметь параметры inline, label', async () => {
      const wrapper = shallowMount(FormGroup);
      expect(wrapper.vm.$options.props.inline).toBeTruthy();
      expect(wrapper.vm.$options.props.inline.type).toBe(Boolean);
      expect(wrapper.vm.$options.props.label).toBeTruthy();
      expect(wrapper.vm.$options.props.label.type).toBe(String);
    });

    it('FormGroup должен выводить содержимое в блоке .form-group', async () => {
      const wrapper = shallowMount(FormGroup, { slots });
      expect(wrapper.classes()).toEqual(['form-group']);
      expect(wrapper.find('.form-group').html()).toContain(slots.default);
    });

    it('FormGroup не должен выводить label по умолчанию', async () => {
      const wrapper = shallowMount(FormGroup, { slots });
      expect(wrapper.find('label').exists()).toBe(false);
    });

    it('FormGroup должен выводить label со значением параметра', async () => {
      const wrapper = shallowMount(FormGroup, { propsData: { label: LABEL } });
      const label = wrapper.find('label');
      expect(label.exists()).toBe(true);
      expect(label.classes()).toEqual(['form-label']);
      expect(label.text()).toContain(LABEL);
    });

    it('FormGroup должен выводить слот после label', async () => {
      const wrapper = shallowMount(FormGroup, { slots, propsData: { label: LABEL } });
      expect(wrapper.html()).toContain(slots.default);
    });
  });
});
