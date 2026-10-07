"use strict";
const config = window.JAJANKU_CONFIG || {};
const email = typeof config.supportEmail === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.supportEmail) ? config.supportEmail : "";
const mailto = (subject, body = "") => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const setText = (selector, value) => document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
if (config.ownerName) setText('[data-owner]', config.ownerName);
if (email) {
 document.querySelectorAll('[data-contact]').forEach(el => { const a = document.createElement('a'); a.href = mailto('Bantuan Jajanku'); a.textContent = email; el.replaceChildren(a); });
 setText('[data-contact-status]', 'Hubungi email di atas untuk bantuan, privasi, atau permintaan penghapusan akun.');
 document.querySelectorAll('[data-email-action]').forEach(el => { el.disabled = false; });
 for (const [selector, subject, text, body] of [
 ['[data-support]', 'Bantuan Jajanku', 'Email bantuan →', 'Jelaskan kendala yang kamu alami:'],
 ['[data-bug]', 'Laporan bug Jajanku', 'Siapkan laporan bug →', 'Langkah untuk mengulangi:\nHasil yang diharapkan:\nHasil yang terjadi:\nVersi Jajanku / Android / perangkat:\nPesan kesalahan:\n\nSamarkan informasi sensitif sebelum melampirkan screenshot.'],
 ['[data-suggestion]', 'Saran untuk Jajanku', 'Kirim saran →', 'Kebutuhan atau saran:\nContoh situasi penggunaan:']]) {
 document.querySelectorAll(selector).forEach(el => { el.href = mailto(subject, body); el.textContent = text; });
 }
 // Remove only the original policy draft notice when both missing identity fields are complete.
 if (config.ownerName) document.querySelectorAll('.legal p').forEach(el => { if (el.textContent.startsWith('DRAF')) el.remove(); });
}
if (config.deletionEstimate) setText('[data-deletion-estimate]', config.deletionEstimate);
let play;
try { const url = new URL(config.googlePlayUrl); if (url.protocol === 'https:' && url.hostname === 'play.google.com' && url.pathname === '/store/apps/details' && url.searchParams.get('id')) play = url.href; } catch (_) {}
if (play) {
 document.querySelectorAll('[data-play]').forEach(el => { el.href = play; el.textContent = 'Unduh di Google Play ↗'; el.target = '_blank'; el.rel = 'noopener noreferrer'; });
 setText('[data-play-status]', 'Tersedia melalui tautan resmi Google Play.');
}
const toggle = document.querySelector('.menu-toggle');
toggle?.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(expanded)); document.querySelector('nav').classList.toggle('open', expanded); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { toggle?.setAttribute('aria-expanded', 'false'); document.querySelector('nav')?.classList.remove('open'); } });
document.querySelector('#deletion-form')?.addEventListener('submit', event => {
 event.preventDefault();
 if (!email) return;
 const form = event.currentTarget;
 if (!form.reportValidity()) return;
 const body = `Saya meminta penghapusan permanen akun dan data cloud Jajanku.\n\nEmail akun: ${form.elements.email.value.trim()}\nCatatan: ${form.elements.note.value.trim()}\n\nSaya memahami identitas saya perlu diverifikasi. Penghapusan akun tidak menghapus data Guest, file ekspor, atau salinan yang telah dibagikan.`;
 window.location.href = mailto('Permintaan penghapusan akun dan data Jajanku', body);
 document.querySelector('#form-status').textContent = 'Email disiapkan. Tekan Kirim di aplikasi email untuk mengirim permintaan. Jika aplikasi email tidak terbuka, kirim permintaan secara manual ke ' + email + '.';
});
if (Array.isArray(config.screenshots) && config.screenshots.length) {
 const valid = config.screenshots.filter(item => item && typeof item.src === 'string' && /^assets\/img\/jajanku\/[a-zA-Z0-9_.-]+\.(png|jpg|jpeg|webp)$/.test(item.src));
 const preview = document.querySelector('.preview');
 if (preview && valid.length) {
 const gallery = document.createElement('div'); gallery.className = 'screenshot-gallery';
 valid.forEach(item => { const img = document.createElement('img'); img.src = item.src; img.alt = item.alt || 'Screenshot aplikasi Jajanku'; img.addEventListener('error', () => { img.replaceWith(document.createTextNode('Screenshot belum tersedia.')); }); gallery.append(img); });
 const caption = document.createElement('figcaption'); caption.textContent = 'Screenshot aplikasi Jajanku'; preview.replaceChildren(gallery, caption);
 }
}
