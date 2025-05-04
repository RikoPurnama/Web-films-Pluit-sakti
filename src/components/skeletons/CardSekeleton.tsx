
const CardSekeleton = () => {

  return (
    <div className="bg-gray-800 rounded-md overflow-hidden animate-pulse">
      {/* Gambar responsif */}
      <div className="h-[180px] md:h-[230px] w-full bg-gray-700" />

      {/* Judul dan subjudul */}
      <div className="p-2">
        <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-2.5 md:h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CardSekeleton;
