import { useToast } from "@/components/ui/use-toast";
import { MemberDataType } from "@/data/types";
import { APIENDPOINTS } from "@/data/urls";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [data, setData] = useState<MemberDataType[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    const response = await axios.get(APIENDPOINTS.users.getAllUsers);
    setData(response.data);
  };

  const handleDelete = async () => {
    console.log(selectedUserIds);
    try {
      const response = await axios.delete(APIENDPOINTS.users.DelMultiUser, {
        data: { userId: selectedUserIds },
      });
      setData((prevData) =>
        prevData.filter((user) => !selectedUserIds.includes(user.userid))
      );
      setSelectedUserIds([]);
      if (response.status === 200) {
        toast({
          title: "Successfully deleted",
          description: `You have deleted ${selectedUserIds.length} member successfully`,
        });
      }
      return true;
    } catch (error) {
      console.error("Error deleting users:", error);
      toast({
        title: "Error!!",
      });
      return false;
    }
  };

  const handleSelectUser = (userId: number, selected: boolean) => {
    setSelectedUserIds((prev) =>
      selected ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    data,
    selectedUserIds,
    handleDelete,
    handleSelectUser,
    setSelectedUserIds,
  };
};
