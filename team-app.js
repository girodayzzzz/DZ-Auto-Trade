const API_ROOT = '/api/team';
const select = (selector) => document.querySelector(selector);
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const formatMoney = (cents) => new Intl.NumberFormat('sl-SI', { style: 'currency', currency: 'EUR' }).format((Number(cents) || 0) / 100);
let state = {};

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    cache: 'no-store',
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Zahteva ni uspela.');
  return data;
};

const item = (title, meta, content = '') => `<article class="item"><h3>${escapeHtml(title)}</h3><div class="meta">${escapeHtml(meta)}</div>${content}</article>`;
const taskStatusOptions = (current) => ['novo', 'v teku', 'zaključeno'].map((status) => `<option${current === status ? ' selected' : ''}>${status}</option>`).join('');

const configureRoleView = (role) => {
  const isAdmin = role === 'admin';
  document.body.dataset.mode = role;
  select('#role-label').textContent = isAdmin ? 'Administratorski pogled' : 'Izvajalski pogled';
  select('#page-title').textContent = isAdmin ? 'Ekipa in posli.' : 'Moje naloge.';
  select('#inquiries-title').textContent = isAdmin ? 'Vsa povpraševanja' : 'Moja povpraševanja';
  select('#deals-title').textContent = isAdmin ? 'Posli, provizije in stroški' : 'Moji posli in provizije';
  ['#admin-links', '#contractor-admin', '#task-admin', '#deal-admin', '#vehicle-admin'].forEach((selector) => select(selector).classList.toggle('hidden', !isAdmin));
  select('#inquiry-submit').classList.toggle('hidden', isAdmin);
};

const render = () => {
  const data = state.data || {};
  const isAdmin = state.me?.role === 'admin';
  configureRoleView(state.me?.role);
  select('#identity').textContent = state.me?.email || '';
  select('#tasks').innerHTML = (data.tasks || []).map((task) => item(
    task.title,
    `${task.status} · rok ${task.dueDate || 'ni določen'}${isAdmin ? ` · ${task.contractorEmail}` : ''}`,
    `<p>${escapeHtml(task.instructions)}</p><form data-task="${task.id}"><select name="status">${taskStatusOptions(task.status)}</select><input name="progress" type="number" min="0" max="100" value="${task.progress || 0}" aria-label="Napredek"><textarea name="notes" placeholder="Opombe">${escapeHtml(task.notes)}</textarea><button>Shrani napredek</button></form>`,
  )).join('') || '<p>Ni nalog.</p>';
  select('#inquiries').innerHTML = (data.inquiries || []).map((inquiry) => item(
    `${inquiry.type}: ${inquiry.customer}`,
    `${inquiry.status} · ${inquiry.contact}${isAdmin ? ` · ${inquiry.contractorEmail}` : ''}`,
    `<p>${escapeHtml(inquiry.details)}</p>`,
  )).join('') || '<p>Ni povpraševanj.</p>';
  select('#deals').innerHTML = (data.deals || []).map((deal) => item(
    deal.title,
    `${deal.status}${isAdmin ? ` · ${deal.contractorEmail}` : ''}`,
    `<p class="money">Provizija: ${formatMoney(deal.confirmedCommissionCents || deal.estimatedCommissionCents)}</p>${isAdmin ? `<p>Interni strošek: ${formatMoney(deal.internalCostCents)}</p><form data-deal="${deal.id}"><input name="status" value="${escapeHtml(deal.status)}"><input name="estimatedCommissionCents" type="number" min="0" value="${deal.estimatedCommissionCents || 0}" placeholder="Predvidena provizija (centi)"><input name="confirmedCommissionCents" type="number" min="0" value="${deal.confirmedCommissionCents || 0}" placeholder="Potrjena provizija (centi)"><input name="internalCostCents" type="number" min="0" value="${deal.internalCostCents || 0}" placeholder="Interni stroški (centi)"><button>Shrani posel</button></form>` : ''}`,
  )).join('') || '<p>Ni poslov.</p>';
  if (!isAdmin) return;
  select('#contractors').innerHTML = (data.contractors || []).map((contractor) => item(
    contractor.name || contractor.email,
    `${contractor.email} · ${contractor.enabled ? 'aktiven' : 'onemogočen'}`,
    `<button data-contractor="${contractor.id}" data-enabled="${!contractor.enabled}" class="secondary">${contractor.enabled ? 'Onemogoči' : 'Omogoči'}</button>`,
  )).join('') || '<p>Ni izvajalcev.</p>';
  const options = (data.contractors || []).filter(({ enabled }) => enabled).map(({ email, name }) => `<option value="${escapeHtml(email)}">${escapeHtml(name || email)}</option>`).join('');
  document.querySelectorAll('[data-contractor-select]').forEach((element) => { element.innerHTML = options; });
};

const loadTeamWorkspace = async () => {
  select('#public-home').classList.add('hidden');
  select('#team-workspace').classList.remove('hidden');
  try {
    state = await apiRequest('/bootstrap');
    if (!['admin', 'contractor'].includes(state.me?.role)) throw new Error('Vaša vloga ni veljavna.');
    render();
    if (state.me?.role === 'admin') window.dispatchEvent(new Event('dz:admin-ready'));
  } catch (error) {
    select('#status').innerHTML = `${escapeHtml(error.message)} <a class="text-link" href="/api/team/login">Ponovna prijava</a>`;
    select('#status').className = 'error';
  }
};

document.addEventListener('submit', async (event) => {
  const form = event.target;
  if (!form.matches('[data-api-form],[data-task],[data-deal]')) return;
  event.preventDefault();
  const body = Object.fromEntries(new FormData(form));
  const path = form.dataset.task ? `/tasks/${form.dataset.task}` : form.dataset.deal ? `/deals/${form.dataset.deal}` : form.dataset.apiForm;
  try {
    await apiRequest(path, { method: form.dataset.task || form.dataset.deal ? 'PATCH' : 'POST', body: JSON.stringify(body) });
    if (form.dataset.apiForm) form.reset();
    await loadTeamWorkspace();
  } catch (error) { select('#status').textContent = error.message; }
});

document.addEventListener('click', async (event) => {
  if (!event.target.dataset.contractor) return;
  try {
    await apiRequest(`/contractors/${event.target.dataset.contractor}`, { method: 'PATCH', body: JSON.stringify({ enabled: event.target.dataset.enabled === 'true' }) });
    await loadTeamWorkspace();
  } catch (error) { select('#status').textContent = error.message; }
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/team-sw.js');
if (location.hash === '#ekipa') loadTeamWorkspace();
