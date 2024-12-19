import { ApiResponse } from "@/types";
interface ImageViewProps {
  image: ApiResponse;
}
const ImageView = ({ image }: ImageViewProps) => {
  return (
    <img
      key={image.id}
      src={image.urls.regular ?? "/placeholder.svg"}
      alt={image.id.toString()}
      className="object-cover size-full"
    />
  );
};
export default ImageView;
