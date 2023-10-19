import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { AiOutlinePlus } from 'react-icons/ai';
import { EditCategoryCards } from '../../components/Inventory/EditCategory';
import { FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { BtnFilled } from '../../components/button';
import { ModalComponent } from '../../components/modal';
import { InputWithLabel } from '../../components/inputWithLabel';
import { InventoryCards } from '../../components/Inventory/Cards';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  fetchAllCategories,
  onAddCategory,
  onDeleteCategory,
} from '../../redux/slices/category';

export const Inventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { categories } = useSelector((state: any) => state.Category);
  const { user } = useSelector((state: any) => state.User);
  const [CategoryModal, setCategoryModal] = useState(false);
  const [CreateCategoryModal, setCreateCategoryModal] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState();
  const [categoryName, setCategoryName] = useState('');
  const [list, setList] = useState<any>([]);

  const dragOver = useRef<any>(null);
  const dragItem = useRef<any>(null);

  useEffect(() => {
    const payload = {
      params: {
        dispensary: user?.dispensary?._id,
      },
    };
    dispatch(fetchAllCategories(payload));
  }, []);

  useEffect(() => {
    setList(categories);
  }, [categories]);

  const onDragEnd = () => {
    const _list = [...categories];
    const draggedItem = _list[dragItem.current]; // Get the dragged item
    const dragOverItem = _list[dragOver.current]; // Get the item at dragOver position

    _list[dragOver.current] = draggedItem; // Replace drag item with dragOver item
    _list[dragItem.current] = dragOverItem; // Replace drag item with dragOver item

    setList(_list);
    dragItem.current = null;
    dragOver.current = null;
  };

  const handleDragStart = (event: any) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.classList.add('opacity-50');
  };

  const handleDragEnd = (event: any) => {
    event.target.classList.remove('opacity-50');
  };

  const onSelectItemForDelete = (item: any) => {
    setSelectedItemData(item);
    setCategoryModal(!CategoryModal);
  };

  const onDeleteItem = () => {
    const formData = new FormData();
    formData.append('id', selectedItemData?._id);
    formData.append('dispensary', selectedItemData?.dispensary);
    dispatch(onDeleteCategory(formData));
    setCategoryModal(!CategoryModal);
  };

  const onAddItem = () => {
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('dispensary', user?.dispensary?._id);
    dispatch(onAddCategory(formData));
    setCreateCategoryModal(!CreateCategoryModal);
  };

  const CategoryCreateModalContent = (
    <form className="z-50 mx-auto flex flex-col space-y-4  rounded-xl bg-grey-modal py-5 ">
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="text-black w-full text-sm font-bold md:text-base">
          Add New Category
        </h1>
        <FaTimes
          className="cursor-pointer"
          onClick={() => setCreateCategoryModal(!CreateCategoryModal)}
        />
      </div>
      <div className="border-black w-full border  border-dotted"></div>
      <div className="space-y-6 px-4">
        <div className="w-1/3">
          <InputWithLabel
            label="Category Name"
            placeholder="Category Name"
            type="text"
            name="category_name"
            style={true}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="text-xs text-red-delete">
            {categoryName?.length <= 0 && 'Category Name is required'}
          </div>
        </div>

        <div className="flex items-end justify-end space-x-2 px-4">
          <BtnFilled
            background="bg-white"
            color="text-black"
            text="Cancel"
            round="md"
            onClick={() => setCreateCategoryModal(!CreateCategoryModal)}
          />
          <BtnFilled
            background="bg-purple-primary"
            color="text-white"
            text="Create"
            round="md"
            onClick={onAddItem}
          />
        </div>
      </div>
    </form>
  );

  const CategoryDeleteModalContent = (
    <form className="z-50 mx-auto flex flex-col space-y-4  rounded-xl bg-grey-modal py-5">
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="text-black w-full text-sm font-bold md:text-base">
          Delete {selectedItemData?.name}
        </h1>
        <FaTimes
          className="cursor-pointer"
          onClick={() => setCategoryModal(!CategoryModal)}
        />
      </div>
      <div className="border-black w-full border  border-dotted"></div>
      <div className="space-y-6">
        <div className="text-black px-4 font-bold">
          Are you sure you want to delete this category with all (
          {selectedItemData?.products?.length}) Items?
        </div>

        <div className="flex items-end justify-end space-x-2 px-4">
          <BtnFilled
            background="bg-white"
            color="text-black"
            text="Cancel"
            round="md"
            onClick={() => setCategoryModal(!CategoryModal)}
          />
          <BtnFilled
            background="bg-red-delete"
            color="text-white"
            text="Delete"
            round="md"
            onClick={onDeleteItem}
          />
        </div>
      </div>
    </form>
  );

  return (
    <DefaultLayout>
      <ModalComponent
        style="w-10/12 md:w-1/2 xl:w-1/3 mx-auto rounded-xl mx-auto absolute right-0 left-0 top-[15%] overflow-hidden"
        content={CategoryDeleteModalContent}
        modal={CategoryModal}
        onModalStatus={() => setCategoryModal(!CategoryModal)}
      />
      <ModalComponent
        style="w-10/12 md:w-1/2 xl:w-1/3 mx-auto rounded-xl mx-auto absolute right-0 left-0 top-[15%] overflow-hidden"
        content={CategoryCreateModalContent}
        modal={CreateCategoryModal}
        onModalStatus={() => setCreateCategoryModal(!CreateCategoryModal)}
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-normal text-xl font-semibold text-black-primary md:text-2xl">
            Inventory
          </h1>
          {/* <button className="flex h-full items-center rounded-3xl border-2 border-purple-primary px-4 py-1 text-sm font-semibold text-purple-primary">
            Save Changes
          </button> */}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
              <span>Categories</span>
              <span className="text-graydark">({categories.length})</span>
            </h1>
            <button
              onClick={() => setCreateCategoryModal(!CreateCategoryModal)}
              className="flex h-full items-center space-x-1 rounded-md bg-purple-primary px-4 py-1.5 text-sm text-white"
            >
              <AiOutlinePlus />
              <span>Add New Category</span>
            </button>
          </div>
          <div className="space-y-2.5 py-5">
            {list?.map((item: any, index: any) => (
              <InventoryCards
                key={index}
                onClick={() =>
                  navigate('/edit-inventory', {
                    state: {
                      dispensary: item?.dispensary, // Extract a primitive value from the dispensary object if necessary
                      name: item?.name,
                      category: item?._id,
                    },
                  })
                }
                Draggable={true}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOver.current = index)}
                onDragEnd={onDragEnd}
                title={item?.name}
                quantity={item?.products?.length}
                onDelete={() => onSelectItemForDelete(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
