import {Suspense, useState} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  
  return (
    <header className="header">
      {/* Dynamic SEO Logo */}
      <NavLink prefetch="intent" to="/" className="header-logo" end>
        <div className="header-logo-text">
          <h1 className="header-logo-main">
            {shop?.name || 'AODOUR'}
          </h1>
          <span className="header-logo-tagline">
            {shop?.description?.split('\n')[0] || 'LUXURY BAGS'}
          </span>
        </div>
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Organization',
            'name': shop?.name || 'AODOUR',
            'url': shop?.primaryDomain?.url,
            'description': shop?.description,
          })}
        </script>
      </NavLink>

      {/* Mega Menu Desktop */}
      <MegaMenu
        menu={menu}
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        viewport="desktop"
      />

      {/* Header CTAs */}
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

/* Mega Menu Component */
export function MegaMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
  viewport,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: string;
  publicStoreDomain: string;
  viewport: Viewport;
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const {close} = useAside();

  const menuItems = (menu || FALLBACK_HEADER_MENU).items;

  if (viewport === 'mobile') {
    return (
      <nav className="header-menu-mobile" role="navigation">
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
        >
          Home
        </NavLink>
        {menuItems.map((item) => {
          if (!item.url) return null;
          const url = item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
          
          return (
            <div key={item.id} className="mobile-menu-item">
              <NavLink
                className="header-menu-item"
                end
                onClick={close}
                prefetch="intent"
                to={url}
              >
                {item.title}
              </NavLink>
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="mega-menu" role="navigation">
      {menuItems.map((item) => {
        if (!item.url) return null;

        const url = item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
          ? new URL(item.url).pathname
          : item.url;

        const hasSubmenu = item.items && item.items.length > 0;
        const isActive = activeMenu === item.id;

        return (
          <div
            key={item.id}
            className="mega-menu-item"
            onMouseEnter={() => hasSubmenu && setActiveMenu(item.id)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <NavLink
              className="mega-menu-link"
              end
              prefetch="intent"
              to={url}
              style={({isActive}) => ({
                color: isActive ? 'var(--color-secondary)' : 'inherit',
                fontWeight: isActive ? '700' : '600',
              })}
            >
              {item.title}
              {hasSubmenu && <span className="mega-menu-arrow">▼</span>}
            </NavLink>

            {/* Mega Menu Dropdown */}
            {hasSubmenu && isActive && (
              <div className="mega-menu-dropdown" style={{ display: 'block' }}>
                <div className="mega-menu-content">
                  <div className="mega-menu-column">
                    <h4>Featured</h4>
                    <ul>
                      {item.items?.slice(0, 4).map((subitem) => {
                        if (!subitem.url) return null;
                        const subUrl = subitem.url.includes('myshopify.com') ||
                          subitem.url.includes(publicStoreDomain) ||
                          subitem.url.includes(primaryDomainUrl)
                          ? new URL(subitem.url).pathname
                          : subitem.url;

                        return (
                          <li key={subitem.id}>
                            <NavLink
                              to={subUrl}
                              prefetch="intent"
                              className="mega-menu-sublink"
                            >
                              {subitem.title}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {item.items && item.items.length > 4 && (
                    <div className="mega-menu-column">
                      <h4>More Categories</h4>
                      <ul>
                        {item.items?.slice(4).map((subitem) => {
                          if (!subitem.url) return null;
                          const subUrl = subitem.url.includes('myshopify.com') ||
                            subitem.url.includes(publicStoreDomain) ||
                            subitem.url.includes(primaryDomainUrl)
                            ? new URL(subitem.url).pathname
                            : subitem.url;

                          return (
                            <li key={subitem.id}>
                              <NavLink
                                to={subUrl}
                                prefetch="intent"
                                className="mega-menu-sublink"
                              >
                                {subitem.title}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="mega-menu-banner">
                    <div className="mega-banner-content">
                      <h3>New Collection</h3>
                      <p>Discover our latest arrivals</p>
                      <NavLink to={url} className="btn btn-primary btn-sm">
                        Shop Now
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* Header Menu Component (fallback for old layout) */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" className="cta-link">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
      aria-label="Open mobile menu"
      title="Menu"
    >
      <span className="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button 
      className="reset cta-button" 
      onClick={() => open('search')}
      aria-label="Search"
      title="Search"
    >
      🔍
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="cta-link cart-badge"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      aria-label={`Cart with ${count} items`}
    >
      <span className="cart-icon">🛒</span>
      {count !== null && count > 0 && (
        <span className="cart-count">{count}</span>
      )}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/1',
      resourceId: null,
      tags: [],
      title: "Women's Bags",
      type: 'HTTP',
      url: '/collections/womens-bags',
      items: [
        { id: '1a', title: 'Handbags', url: '/collections/womens-bags?type=handbags' },
        { id: '1b', title: 'Crossbody', url: '/collections/womens-bags?type=crossbody' },
        { id: '1c', title: 'Clutches', url: '/collections/womens-bags?type=clutches' },
        { id: '1d', title: 'Totes', url: '/collections/womens-bags?type=totes' },
      ],
    },
    {
      id: 'gid://shopify/MenuItem/2',
      resourceId: null,
      tags: [],
      title: "Men's Bags",
      type: 'HTTP',
      url: '/collections/mens-bags',
      items: [
        { id: '2a', title: 'Backpacks', url: '/collections/mens-bags?type=backpacks' },
        { id: '2b', title: 'Briefcases', url: '/collections/mens-bags?type=briefcases' },
        { id: '2c', title: 'Shoulder Bags', url: '/collections/mens-bags?type=shoulder' },
      ],
    },
    {
      id: 'gid://shopify/MenuItem/3',
      resourceId: null,
      tags: [],
      title: 'Travel Bags',
      type: 'HTTP',
      url: '/collections/travel-bags',
      items: [
        { id: '3a', title: 'Luggage', url: '/collections/travel-bags?type=luggage' },
        { id: '3b', title: 'Weekenders', url: '/collections/travel-bags?type=weekenders' },
        { id: '3c', title: 'Carry-ons', url: '/collections/travel-bags?type=carryons' },
      ],
    },
    {
      id: 'gid://shopify/MenuItem/4',
      resourceId: null,
      tags: [],
      title: 'Accessories',
      type: 'HTTP',
      url: '/collections/accessories',
      items: [
        { id: '4a', title: 'Belts', url: '/collections/accessories?type=belts' },
        { id: '4b', title: 'Scarves', url: '/collections/accessories?type=scarves' },
        { id: '4c', title: 'Wallets', url: '/collections/accessories?type=wallets' },
      ],
    },
    {
      id: 'gid://shopify/MenuItem/5',
      resourceId: null,
      tags: [],
      title: 'Sale',
      type: 'HTTP',
      url: '/collections/sale',
      items: [],
    },
  ],
};
