import { useDrop } from 'react-dnd';
import { DraggableItem } from './dragableItem';

export const DroppableContainer = ({ items, setItems }: any) => {
  const [, drop] = useDrop({
    accept: 'item',
    drop: (item: any, monitor) => {
      const draggedIndex = item.index;
      const droppedIndex = items.findIndex((element: any) => element.id === item.id);

      if (draggedIndex === droppedIndex) {
        return;
      }

      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(droppedIndex, 0, draggedItem);

      setItems(updatedItems);
    },
  });

  return (
    <div ref={drop} className='space-y-4'>
      {items.map((item: any, index: number) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          name={item.name}
          index={index}
          moveItem={(dragIndex: number, hoverIndex: number) => {
            console.log(dragIndex, hoverIndex);
            const updatedItems = [...items];
            const dragItem = updatedItems[dragIndex];
            updatedItems.splice(dragIndex, 1);
            updatedItems.splice(hoverIndex, 0, dragItem);
            setItems(updatedItems);
          }}
        />
      ))}
    </div>
  );
};