/* Shared header, footer, mobile action bar and WhatsApp button.
   Edit business details and menu items here once; every page picks them up. */
(function () {
  'use strict';

  var SITE = {
    name: 'Yashna Woodcraft',
    letter: 'Y',
    whatsapp: '919764699483',
    phoneDisplay: '9764699483',
    phoneTel: '+919764699483',
    email: 'nikitazaware77@gmail.com',
    address: 'Baner, Pune, Maharashtra 411045, India',
    hours: 'Monday – Saturday: 9:00 AM – 6:00 PM'
  };

  var NAV = [
    ['index.html', 'Home'], ['about.html', 'About'], ['products.html', 'Products'],
    ['collections.html', 'Collections'], ['services.html', 'Services'],
    ['materials.html', 'Materials'], ['gallery.html', 'Gallery'], ['contact.html', 'Contact']
  ];

  var SHOP = [
    ['Sofas & Seating', 'Sofas & Seating'], ['Tables', 'Tables'], ['Bedroom', 'Bedroom'],
    ['Storage & Wall Units', 'Storage & Wall Units'], ['Study & Accent', 'Study & Accent']
  ];

  var ICON = {
    wa: '<svg viewBox="0 0 24 24" class="ICLS fill-current" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" class="ICLS fill-none stroke-current stroke-[1.7]" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 7 9-7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" class="ICLS fill-none stroke-current stroke-[1.7]" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" class="ICLS fill-none stroke-current stroke-[1.7]" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" class="ICLS fill-none stroke-current stroke-[1.7]" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };
  function icon(name, cls) { return ICON[name].replace('ICLS', cls || 'h-5 w-5'); }

  function waUrl(text) { return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(text); }
  function mailUrl(subject, body) { return 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); }
  var HELLO = 'Hello ' + SITE.name + ', I would like to know more about your furniture. Please get in touch.';

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function headerHtml() {
    var links = NAV.map(function (n) {
      var on = n[0] === page;
      return '<a class="nav-link' + (on ? ' is-active' : '') + '" href="' + n[0] + '"' + (on ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
    }).join('');
    var mlinks = NAV.map(function (n) {
      return '<a class="block border-b border-sand py-3 font-display text-xl' + (n[0] === page ? ' text-clay' : '') + '" href="' + n[0] + '">' + n[1] + '</a>';
    }).join('');
    return '' +
    '<header id="site-header" class="fixed inset-x-0 top-0 z-50 border-b border-sand/70 bg-linen/90 backdrop-blur transition-shadow duration-300">' +
      '<div class="container-x flex h-16 items-center justify-between gap-4">' +
        '<a href="index.html" class="flex items-center gap-3" aria-label="' + SITE.name + ' home">' +
          '<span class="flex h-10 w-10 items-center justify-center rounded-t-full rounded-b-md bg-espresso font-display text-lg font-bold text-brass">' + SITE.letter + '</span>' +
          '<span class="leading-tight"><span class="block font-display text-lg font-semibold">' + SITE.name + '</span><span class="block text-[10px] font-bold uppercase tracking-[0.28em] text-clay">Furniture · Pune</span></span>' +
        '</a>' +
        '<nav aria-label="Main" class="hidden items-center gap-0.5 xl:flex">' + links + '</nav>' +
        '<div class="flex items-center gap-3">' +
          '<a href="custom-order.html" class="btn btn-brass hidden !min-h-10 !px-5 md:inline-flex">Get a Quote</a>' +
          '<button id="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-panel" aria-label="Toggle menu" class="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/20 xl:hidden">' +
            '<span id="icon-open">' + icon('menu', 'h-6 w-6') + '</span><span id="icon-close" class="hidden">' + icon('close', 'h-6 w-6') + '</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="mobile-panel" class="mobile-panel border-t border-sand bg-linen xl:hidden">' +
        '<nav aria-label="Mobile" class="container-x pb-5 pt-1">' + mlinks +
          '<a href="custom-order.html" class="btn btn-brass mt-4 w-full">Get a Quote</a>' +
        '</nav>' +
      '</div>' +
    '</header>';
  }

  function footerHtml() {
    var ql = NAV.map(function (n) { return '<li><a class="transition-colors hover:text-brass" href="' + n[0] + '">' + n[1] + '</a></li>'; }).join('');
    var shop = SHOP.map(function (s) {
      return '<li><a class="transition-colors hover:text-brass" href="products.html?cat=' + encodeURIComponent(s[0]) + '">' + s[1].replace('&', '&amp;') + '</a></li>';
    }).join('');
    var circle = 'flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-all hover:-translate-y-0.5 hover:text-espresso ';
    return '' +
    '<footer class="bg-espresso text-ivory/75">' +
      '<div class="container-x grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">' +
        '<div class="lg:col-span-3">' +
          '<a href="index.html" class="flex items-center gap-3" aria-label="' + SITE.name + ' home">' +
            '<span class="flex h-10 w-10 items-center justify-center rounded-t-full rounded-b-md bg-brass font-display text-lg font-bold text-espresso">' + SITE.letter + '</span>' +
            '<span class="font-display text-lg font-semibold text-ivory">' + SITE.name + '</span>' +
          '</a>' +
          '<p class="mt-2.5 text-sm leading-relaxed">Handcrafted furniture for homes, offices and commercial spaces, made in our Pune workshop.</p>' +
          '<div class="mt-3 flex gap-2.5">' +
            '<a href="' + waUrl(HELLO) + '" target="_blank" rel="noopener" aria-label="WhatsApp" class="' + circle + 'hover:border-wa hover:bg-wa">' + icon('wa') + '</a>' +
            '<a href="' + mailUrl('Enquiry from website', 'Hello ' + SITE.name + ',\n\n') + '" aria-label="Email" class="' + circle + 'hover:border-brass hover:bg-brass">' + icon('mail') + '</a>' +
            '<a href="tel:' + SITE.phoneTel + '" aria-label="Call us" class="' + circle + 'hover:border-brass hover:bg-brass">' + icon('phone') + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="lg:col-span-3"><h3 class="mb-2 font-display text-lg font-semibold text-ivory">Explore</h3><ul class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">' + ql + '</ul></div>' +
        '<div class="lg:col-span-3"><h3 class="mb-2 font-display text-lg font-semibold text-ivory">Shop</h3><ul class="space-y-1 text-sm">' + shop + '</ul></div>' +
        '<div class="lg:col-span-3"><h3 class="mb-2 font-display text-lg font-semibold text-ivory">Visit &amp; contact</h3><ul class="space-y-1 text-sm">' +
          '<li>' + SITE.address + '</li>' +
          '<li><a class="transition-colors hover:text-brass" href="tel:' + SITE.phoneTel + '">' + SITE.phoneDisplay + '</a></li>' +
          '<li class="break-words"><a class="transition-colors hover:text-brass" href="' + mailUrl('Enquiry from website', 'Hello ' + SITE.name + ',\n\n') + '">' + SITE.email + '</a></li>' +
          '<li>' + SITE.hours + '</li></ul></div>' +
      '</div>' +
      '<div class="border-t border-ivory/10 py-3 pb-20 text-center text-xs text-ivory/50 lg:pb-3">&copy; <span id="year">2026</span> ' + SITE.name + '. All rights reserved. · <a class="underline hover:text-brass" href="terms-privacy.html">Terms &amp; Privacy</a></div>' +
    '</footer>' +
    '<div class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-espresso/10 bg-linen/95 backdrop-blur lg:hidden">' +
      '<a href="tel:' + SITE.phoneTel + '" class="flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold text-espresso">' + icon('phone') + 'Call</a>' +
      '<a href="' + waUrl(HELLO) + '" target="_blank" rel="noopener" class="flex flex-col items-center gap-0.5 bg-wa py-2 text-[11px] font-bold text-espresso">' + icon('wa') + 'WhatsApp</a>' +
      '<a href="' + mailUrl('Enquiry from website', 'Hello ' + SITE.name + ',\n\n') + '" class="flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold text-espresso">' + icon('mail') + 'Email</a>' +
    '</div>' +
    '<a href="' + waUrl(HELLO) + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" class="wa-pulse fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-espresso shadow-xl transition-transform hover:scale-110 lg:flex">' + icon('wa', 'h-7 w-7') + '</a>';
  }

  var h = document.getElementById('site-header-slot');
  if (h) h.outerHTML = headerHtml();
  var f = document.getElementById('site-footer-slot');
  if (f) f.outerHTML = footerHtml();
})();
