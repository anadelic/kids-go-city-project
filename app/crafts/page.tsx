import Video from './Video';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crafting with Kids',
  description:
    "Foster your child's imagination and creativity with our collection of fun and educational craft projects. Great for all ages and skill levels.",
    icons: {
      shortcut: '/icon.svg',
    },
};

export default function CraftPage() {
  return (
    <main>
      <div
        className=" hero h-large"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/df7205fx8/image/upload/v1678914467/myproject/annadelik_kids_doing_crafts_crafts_family_city_guide_modern_cle_c9e7a722-deda-4154-844a-bc76a13be7e5_xvzlma.png")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center text-neutral-content font-poppins">
          <div className="max-w-md text-white">
            <h1 className="mb-5 text-5xl font-bold font-amatic">
              Rainy Day Fun: Creative Crafts for Kids
            </h1>
            <p className="mb-5 text-3xl font-amatic">
              Looking for ways to keep your kids entertained on a rainy day? Our
              crafts page for kids has got you covered!
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-16 ">
        <Video />
      </div>
    </main>
  );
}
