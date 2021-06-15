const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const { default: CounterButton } = require(getSolutionPath('components/CounterButton'));

describe('sfc/CounterButton-vue', () => {
  describe('CounterButton', () => {
    it('CounterButton должен иметь числовой входной параметр count со значением 0 по умолчанию', () => {
      const wrapper = shallowMount(CounterButton);
      expect(wrapper.vm.$options.props.count.type).toBe(Number);
      expect(wrapper.vm.$options.props.count.default).toBe(0);
      // При наличии значения по умолчанию параметр не нужно делать обязательным
      expect(wrapper.vm.$options.props.count.required).toBeFalsy();
    });

    it('CounterButton должен рендерить кнопку с текстом count', () => {
      const COUNT = 42;
      const wrapper = shallowMount(CounterButton, {
        propsData: { count: COUNT },
      });
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe(COUNT.toString());
    });

    it('CounterButton должен иметь count 0 по умолчанию', () => {
      const wrapper = shallowMount(CounterButton);
      expect(wrapper.text()).toBe('0');
    });

    it('CounterButton должен порождать событие increment с увеличенным на 1 значением по клику', async () => {
      const COUNT = 1;

      const wrapper = shallowMount(CounterButton, {
        propsData: { count: COUNT },
      });
      const button = wrapper.find('button');

      await button.trigger('click');
      expect(wrapper.emitted().increment).toBeTruthy();
      expect(wrapper.emitted().increment.length).toBe(1);
      expect(wrapper.emitted().increment[0]).toEqual([COUNT + 1]);
    });

    it('CounterButton должен обновлять значение счётчика при обновлении входного параметра', async () => {
      const INITIAL_COUNT = 1;
      const NEW_COUNT = 100;

      const wrapper = shallowMount(CounterButton, {
        propsData: { count: INITIAL_COUNT },
      });

      expect(wrapper.text()).toBe(INITIAL_COUNT.toString());
      await wrapper.setProps({ count: NEW_COUNT });
      expect(wrapper.text()).toBe(NEW_COUNT.toString());
    });
  });
});
