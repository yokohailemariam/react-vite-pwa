import ImageView from "@/components/ImageView";
import { useImages } from "@/hooks/useGetData";
const Home = () => {
  const { data, isLoading } = useImages();
  if (isLoading) return <p>loading...</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((image) => {
        return <ImageView key={image.id} image={image} />;
      })}
    </div>
  );
};

export default Home;
