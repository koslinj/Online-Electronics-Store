
export const Filter = ({ producers, producerFilter, setProducerFilter }) => {

  function handle(name) {
    const currentProducers = producerFilter.getAll("producer");
  
    if (currentProducers.includes(name)) {
      const updatedProducers = currentProducers.filter(producer => producer !== name);
      
      setProducerFilter(params => {
        params.delete("producer");
        updatedProducers.forEach(producer => {
          params.append("producer", producer);
        });
        return params;
      });
    } else {
      setProducerFilter(params => {
        params.append("producer", name);
        return params;
      });
    }
  }

  return (
    <div className="border-4 rounded-xl p-2 w-60">
      <h2 className="text-3xl font-bold mb-6">Filtry</h2>
      <h3 className="text-xl font-bold">Producent</h3>
      {producers.map((producerName, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={producerName}
            value={producerName}
            onChange={() => {handle(producerName)}}
            checked={producerFilter.getAll("producer").includes(producerName)}
          />
          <label htmlFor={producerName}>{producerName}</label>
        </div>
      ))}
    </div>
  )
}
