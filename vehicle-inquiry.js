(() => {
  const loadVehicleInquiry = async ({ location, document, fetch }) => {
    const vehicleId = new URLSearchParams(location.search).get('vozilo')?.trim();
    if (!vehicleId) return;

    const form = document.querySelector('[data-formspree-form="contact"]');
    const summary = form?.querySelector('[data-selected-product]');
    if (!form || !summary) return;
    const submitButton = form.querySelector('[type="submit"]');
    form.setAttribute('aria-busy', 'true');
    submitButton?.setAttribute('disabled', 'true');

    try {
      const response = await fetch(`/api/vehicles/${encodeURIComponent(vehicleId)}`, {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Vehicle unavailable');
      const { vehicle } = await response.json();
      if (!vehicle || String(vehicle.id) !== vehicleId || !vehicle.make || !vehicle.model) {
        throw new Error('Invalid public vehicle');
      }

      const fields = [
        ['ID vozila', vehicle.id],
        ['Znamka vozila', vehicle.make],
        ['Model vozila', vehicle.model],
      ];
      fields.forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = String(value);
        input.dataset.vehicleInquiry = '';
        form.append(input);
      });
      summary.textContent = `Povpraševanje za vozilo: ${vehicle.make} ${vehicle.model} (ID: ${vehicle.id})`;
      summary.hidden = false;
    } catch {
      summary.textContent = 'Izbrano vozilo ni več javno na voljo. Še vedno lahko pošljete splošno povpraševanje.';
      summary.hidden = false;
    } finally {
      form.removeAttribute('aria-busy');
      submitButton?.removeAttribute('disabled');
    }
  };

  loadVehicleInquiry({ location: window.location, document, fetch: window.fetch.bind(window) });
})();
