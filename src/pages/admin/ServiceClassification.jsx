import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Move } from "lucide-react";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";

const ServiceClassification = () => {
  const [dataCategory, setDataCategory] = useState([]);
  console.log(dataCategory);

  //TODO: Simulated fetch function for existing data
  useEffect(() => {
    const fetchInitialData = async () => {
      // Example: Fetch existing services from an API
      const existingData = [
        { id: 1, english: "Manicure", hebrew: "מניקור" },
        { id: 2, english: "Pedicure", hebrew: "פדיקור" },
        { id: 3, english: "Nail Art", hebrew: "אמנות ציפורניים" },
      ];
      setDataCategory(existingData);
    };

    fetchInitialData();
  }, []);

  const handleAddService = () => {
    setDataCategory([
      ...dataCategory,
      {
        id: dataCategory.length + 1,
        english: "",
        hebrew: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...dataCategory];
    updated[index][field] = value;
    setDataCategory(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(dataCategory);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDataCategory(items);
  };

  return (
    <div>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          { name: "Data Management", link: "" },
          {
            name: "Service Classification",
            link: "/admin/data-management/service-classification",
          },
        ])}
      />

      <div className="">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="services">
            {(provided) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full table-auto border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-sm text-description">
                    <th className="w-10 text-left">#</th>
                    <th className="text-left">English</th>
                    <th className="text-right">Hebrew</th>
                    <th className="w-20">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCategory.map((service, index) => (
                    <Draggable
                      key={service.id}
                      draggableId={service.id.toString()}
                      index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="gap-10">
                          <td className="text-description text-sm">
                            {index + 1}
                          </td>
                          <td className="pr-2">
                            <input
                              type="text"
                              value={service.english}
                              onChange={(e) =>
                                handleChange(index, "english", e.target.value)
                              }
                              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary01 bg-white"
                            />
                          </td>
                          <td className="pl-2">
                            <input
                              type="text"
                              value={service.hebrew}
                              onChange={(e) =>
                                handleChange(index, "hebrew", e.target.value)
                              }
                              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-right text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary01 bg-white"
                            />
                          </td>
                          <td className="text-center">
                            <Move className="w-4 h-4 text-gray-400 cursor-move mx-auto" />
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>

        <button
          onClick={handleAddService}
          className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer ml-10">
          <span className="text-xl">+</span> Add more service
        </button>

        <div className=" flex justify-end mr-3">
          <button className="bg-black text-white px-6 py-2 rounded text-sm cursor-pointer">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceClassification;
