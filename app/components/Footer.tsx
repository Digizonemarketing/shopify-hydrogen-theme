import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {TrustBar} from '~/components/TrustBar';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense fallback={<div className="footer-loading" aria-hidden="true" />}> 
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            <div className="footer-content">
              {/* Top area: Brand + Newsletter */}
              <div className="footer-top">
                <div className="footer-section footer-brand">
                  <div className="footer-brand-name">AODOUR</div>
                  <div className="footer-brand-tagline">LUXURY BAGS</div>
                  <p className="footer-description">
                    Premium bags crafted with precision for everyday elegance. Built to last, designed to stand out.
                  </p>
                  <div className="footer-social">
                    <a
                      href="https://facebook.com/aodour.pk"
                      className="footer-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.563 9.874v-6.987H7.897V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.987A10.001 10.001 0 0 0 22 12Z"/></svg>
                    </a>
                    <a
                      href="https://instagram.com/aodour.pk"
                      className="footer-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 15.8 2.8 2.8 0 0 0 12 9.2Zm5.55-.95a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z"/></svg>
                    </a>
                    <a
                      href="https://twitter.com/aodour_pk"
                      className="footer-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.994 7.55c.013.177.013.355.013.533 0 5.423-4.127 11.68-11.68 11.68-2.321 0-4.476-.68-6.291-1.85.323.038.632.05.968.05a8.26 8.26 0 0 0 5.112-1.757 4.135 4.135 0 0 1-3.86-2.866c.257.038.514.063.784.063.376 0 .752-.05 1.102-.139A4.127 4.127 0 0 1 3.6 9.062v-.05c.551.31 1.204.5 1.889.527A4.124 4.124 0 0 1 3.84 5.81c0-.765.203-1.466.558-2.079a11.72 11.72 0 0 0 8.5 4.312 4.655 4.655 0 0 1-.102-.946 4.13 4.13 0 0 1 7.144-2.828 8.077 8.077 0 0 0 2.619-1 4.14 4.14 0 0 1-1.814 2.279A8.274 8.274 0 0 0 24 4.693a8.889 8.889 0 0 1-2.257 2.857Z"/></svg>
                    </a>
                  </div>
                </div>
                <div className="footer-section footer-newsletter">
                  <h3>Stay in the loop</h3>
                  <p className="footer-newsletter-copy">Get exclusives, new drops, and curated edits straight to your inbox.</p>
                  <form className="footer-newsletter-form" onSubmit={(e)=>e.preventDefault()} aria-label="Newsletter signup">
                    <input className="footer-input" type="email" name="email" placeholder="Enter your email" aria-label="Email address" required />
                    <button className="footer-button" type="submit">Subscribe</button>
                  </form>
                  <p className="footer-newsletter-privacy">We respect your privacy. Unsubscribe anytime.</p>
                </div>
              </div>

              {/* Links grid */}
              <div className="footer-grid">
                <div className="footer-section">
                  <h3>Shop</h3>
                  <div className="footer-links">
                    <NavLink to="/collections/womens-bags" className="footer-link">Women&apos;s Bags</NavLink>
                    <NavLink to="/collections/mens-bags" className="footer-link">Men&apos;s Bags</NavLink>
                    <NavLink to="/collections/travel-bags" className="footer-link">Travel Bags</NavLink>
                    <NavLink to="/collections/accessories" className="footer-link">Accessories</NavLink>
                    <NavLink to="/collections/sale" className="footer-link">Sale</NavLink>
                  </div>
                </div>
                <div className="footer-section">
                  <h3>Customer Care</h3>
                  <div className="footer-links">
                    <NavLink to="/pages/contact" className="footer-link">Contact Us</NavLink>
                    <NavLink to="/pages/shipping" className="footer-link">Shipping Info</NavLink>
                    <NavLink to="/pages/returns" className="footer-link">Returns</NavLink>
                    <NavLink to="/pages/size-guide" className="footer-link">Size Guide</NavLink>
                    <NavLink to="/pages/faq" className="footer-link">FAQ</NavLink>
                  </div>
                </div>
                <div className="footer-section">
                  <h3>About</h3>
                  <div className="footer-links">
                    <NavLink to="/pages/about" className="footer-link">Our Story</NavLink>
                    <NavLink to="/pages/quality" className="footer-link">Quality Promise</NavLink>
                    <NavLink to="/blogs/journal" className="footer-link">Blog</NavLink>
                    <NavLink to="/pages/careers" className="footer-link">Careers</NavLink>
                  </div>
                </div>
                <div className="footer-section">
                  <h3>Policies</h3>
                  <div className="footer-links footer-links--policy">
                    {(footer?.menu || FALLBACK_FOOTER_MENU).items.map((item)=>{
                      if(!item.url) return null;
                      const url=
                        item.url.includes('myshopify.com') ||
                        item.url.includes(publicStoreDomain) ||
                        item.url.includes(header.shop.primaryDomain?.url || '')
                          ? new URL(item.url).pathname
                          : item.url;
                      const isExternal=!url.startsWith('/');
                      return isExternal ? (
                        <a href={url} key={item.id} rel="noopener noreferrer" target="_blank" className="footer-link">{item.title}</a>
                      ) : (
                        <NavLink end key={item.id} prefetch="intent" style={activeLinkStyle} to={url} className="footer-link">{item.title}</NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="footer-bottom">
                <div className="footer-bottom-content">
                  <div className="footer-copyright">
                    © {new Date().getFullYear()} AODOUR.PK. All rights reserved.
                  </div>
                  <div className="w-full max-w-[520px]">
                    <TrustBar compact />
                  </div>
                  <div className="footer-payment-icons">
                    <span className="footer-payment-icon">VISA</span>
                    <span className="footer-payment-icon">MC</span>
                    <span className="footer-payment-icon">COD</span>
                  </div>
                </div>
              </div>

              {/* Policy Menu moved into grid as a column */}
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
