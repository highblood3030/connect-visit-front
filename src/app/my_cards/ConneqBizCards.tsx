const conneqBizCards = [
    { id: 1, title: "Business 1", description: "Description for Business 1" },
    { id: 2, title: "Business 2", description: "Description for Business 2" },
    { id: 3, title: "Business 3", description: "Description for Business 3" },
    { id: 4, title: "Business 4", description: "Description for Business 4" },
  ];
  
  export default function ConneqBizCards() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {conneqBizCards.map((card) => (
          <div key={card.id} className="p-4 bg-white rounded-xl shadow">
            <h3 className="text-black font-bold">{card.title}</h3>
            <p className="text-black font-bold">{card.description}</p>
          </div>
        ))}
      </div>
    );
  }
  