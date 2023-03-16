import Video from './Video';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crafting with Kids',
  description:
    "Foster your child's imagination and creativity with our collection of fun and educational craft projects. Great for all ages and skill levels.",
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
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">
              Rainy Day Fun: Creative Crafts for Kids
            </h1>
            <p className="mb-5 text-3xl">
              Looking for ways to keep your kids entertained on a rainy day? Our
              crafts page for kids has got you covered! With easy and fun indoor
              projects, your kids will have a blast getting creative and making
              something special. From paper crafts to painting, there's
              something for every age and interest. So, when the weather takes a
              turn for the worse, turn to our crafts page for a guaranteed good
              time!
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-cente mt-16">
        <Video />
      </div>
    </main>
  );
}
