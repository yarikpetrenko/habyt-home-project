import Image from "next/image";
import { Listing } from "@/actions/listings/schemas";

interface ListingCardProps {
  listing: Listing;
}

function ListingCard({ listing }: ListingCardProps) {
  // Get the first image from property, apartment, or room (in that order of preference)
  const getMainImage = () => {
    if (listing.propertyImages && listing.propertyImages.length > 0) {
      return listing.propertyImages[0].url;
    }
    if (listing.apartmentImages && listing.apartmentImages.length > 0) {
      return listing.apartmentImages[0].url;
    }
    if (listing.roomImages && listing.roomImages.length > 0) {
      return listing.roomImages[0].url;
    }
    return "/placeholder-image.svg"; // Fallback image
  };

  // Get a description in english if available
  // const getDescription = () => {
  //   const descriptions = [...(listing.roomDescriptions || [])];
  //   const englishDesc = descriptions.find((desc) => desc.language === "EN");
  //   return englishDesc?.description || "No description available";
  // };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: listing.currency || "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to display share type in a more readable format
  const formatShareType = (shareType: string) => {
    switch (shareType) {
      case "PrivateApartment":
        return "Private Apartment";
      case "PrivateRoom":
        return "Private Room";
      case "SharedRoom":
        return "Shared Room";
      case "Studio":
        return "Studio";
      default:
        return shareType;
    }
  };

  // Safe access to minimumStay information
  const getMinimumStay = () => {
    if (!listing.leaseConditions || !listing.leaseConditions.minimumStay) {
      return "Not specified";
    }
    return `${listing.leaseConditions.minimumStay.amount} ${listing.leaseConditions.minimumStay.unit}`;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={getMainImage()}
          alt={listing.propertyName || "Property"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-2">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {listing.propertyName}
            </h3>
            <div className="rounded bg-blue-100 px-2 py-0.5 text-sm text-blue-800">
              {formatShareType(listing.shareType)}
            </div>
          </div>
          <p className="text-sm text-gray-600">{listing.propertyAddress}</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-xl font-bold text-blue-600">
            {formatCurrency(listing.rentNet)}
            <span className="text-sm font-normal text-gray-500"> / month</span>
          </p>
          {listing.discount > 0 && (
            <p className="text-sm text-green-600">
              {formatCurrency(listing.discount)} discount applied
            </p>
          )}
        </div>

        {/* Details */}
        <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <span className="mr-1 text-gray-600">Area:</span>
            <span className="font-medium">
              {listing.roomArea} {listing.roomAreaUnit}
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-600">Bedrooms:</span>
            <span className="font-medium">{listing.apartmentBedroomCount}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-600">Bathrooms:</span>
            <span className="font-medium">
              {listing.apartmentBathroomCount}
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-gray-600">Min stay:</span>
            <span className="font-medium">{getMinimumStay()}</span>
          </div>
        </div>

        {/* Amenities */}
        {listing.roomAmenities && listing.roomAmenities.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-1 text-sm font-medium text-gray-700">
              Amenities
            </h4>
            <div className="flex flex-wrap gap-1">
              {listing.roomAmenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800"
                >
                  {amenity}
                </span>
              ))}
              {listing.roomAmenities.length > 3 && (
                <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">
                  +{listing.roomAmenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="text-sm text-gray-600">
          <p>
            Available from{" "}
            <span className="font-medium">
              {new Date(
                listing.bookingWindow.bookableFrom,
              ).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export { ListingCard };
