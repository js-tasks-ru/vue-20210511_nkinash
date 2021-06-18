const { getSolutionPath } = require('taskbook-test-utils');
const TheToaster = require(getSolutionPath('components/TheToaster')).default;
const AppIcon = require('../components/AppIcon').default;
import { mount } from '@vue/test-utils';

jest.useFakeTimers();

describe('sfc/TheToaster', () => {
  describe('TheToaster', () => {
    const MESSAGE = 'Sample Message';

    async function testToast({ method, icon, class: klass }) {
      const wrapper = mount(TheToaster);
      wrapper.vm[method](MESSAGE);
      await wrapper.vm.$nextTick();
      const toast = wrapper.find('.toast');
      expect(toast.exists()).toBe(true);
      expect(toast.text()).toContain(MESSAGE);
      expect(toast.classes(klass)).toBe(true);
      const iconWrapper = wrapper.findComponent(AppIcon);
      expect(iconWrapper.exists()).toBe(true);
      expect(iconWrapper.props().icon).toBe(icon);
    }

    it('TheToaster изначально не показывает ни одного тоста', async () => {
      const wrapper = mount(TheToaster);
      expect(wrapper.find('.toast').exists()).toBe(false);
    });

    it('TheToaster должен иметь методы success и error', async () => {
      const wrapper = mount(TheToaster);
      expect(wrapper.vm.success).toBeDefined();
      expect(wrapper.vm.error).toBeDefined();
    });

    it('TheToaster должен выводить success тост с сообщением после вызова метода success', async () => {
      await testToast({ method: 'success', icon: 'check-circle', class: 'toast_success' });
    });

    it('TheToaster должен выводить error тост с сообщением после вызова метода error', async () => {
      await testToast({ method: 'error', icon: 'alert-circle', class: 'toast_error' });
    });

    it('TheToaster должен выводить список тостов в порядке добавления', async () => {
      const wrapper = mount(TheToaster);
      const messages = ['success_1', 'success_2', 'error_1', 'success_3'];
      messages.forEach((message) => {
        const method = message.startsWith('success') ? 'success' : 'error';
        wrapper.vm[method](message);
      });
      await wrapper.vm.$nextTick();
      const toasts = wrapper.findAll('.toast').wrappers;
      expect(toasts).toHaveLength(messages.length);
      expect(toasts.map((toast) => toast.text())).toEqual(messages);
    });

    it('TheToaster удалять тост через 5 секунд', async () => {
      const wrapper = mount(TheToaster);

      wrapper.vm.success('Time_0');
      await wrapper.vm.$nextTick();
      // Current = 0

      jest.advanceTimersByTime(2500);
      wrapper.vm.success('Time_2500');
      await wrapper.vm.$nextTick();
      // Current = 2500

      jest.advanceTimersByTime(1000);
      wrapper.vm.success('Time_3500');
      await wrapper.vm.$nextTick();
      // Current = 3500

      jest.advanceTimersByTime(1600);
      await wrapper.vm.$nextTick();
      // Current = 5100

      let toasts = wrapper.findAll('.toast').wrappers;
      expect(toasts).toHaveLength(2);
      expect(toasts[0].text()).toContain('Time_2500');
      expect(toasts[1].text()).toContain('Time_3500');

      jest.advanceTimersByTime(2500);
      await wrapper.vm.$nextTick();
      // Current = 7600

      toasts = wrapper.findAll('.toast').wrappers;
      expect(toasts).toHaveLength(1);
      expect(toasts[0].text()).toContain('Time_3500');

      jest.advanceTimersByTime(1000);
      await wrapper.vm.$nextTick();
      // Current = 8600

      toasts = wrapper.findAll('.toast').wrappers;
      expect(toasts).toHaveLength(0);
    });
  });
});
