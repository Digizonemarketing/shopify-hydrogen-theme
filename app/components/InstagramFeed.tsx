interface InstagramPost {
  id: number;
  image: string;
  link: string;
  alt: string;
}

const posts: InstagramPost[] = [
  {
    id: 1,
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/instagram-1.jpg',
    link: 'https://instagram.com/Genze.pk',
    alt: 'Genze leather handbag',
  },
  {
    id: 2,
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/instagram-2.jpg',
    link: 'https://instagram.com/Genze.pk',
    alt: 'Genze tote bag',
  },
  {
    id: 3,
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/instagram-3.jpg',
    link: 'https://instagram.com/Genze.pk',
    alt: 'Genze crossbody bag',
  },
  {
    id: 4,
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/instagram-4.jpg',
    link: 'https://instagram.com/Genze.pk',
    alt: 'Genze clutch bag',
  },
  {
    id: 5,
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/instagram-5.jpg',
    link: 'https://instagram.com/Genze.pk',
    alt: 'Genze backpack',
  },
  {
    id: 6,
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/instagram-6.jpg',
    link: 'https://instagram.com/Genze.pk',
    alt: 'Genze travel bag',
  },
];

export function InstagramFeed() {
  return (
    <div className="instagram-feed">
      <div className="instagram-header">
        <h2>Follow @Genze.pk</h2>
        <p>Join our community and get inspired</p>
      </div>
      <div className="instagram-grid">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-post"
          >
            <img src={post.image} alt={post.alt} loading="lazy" />
            <div className="instagram-overlay">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
