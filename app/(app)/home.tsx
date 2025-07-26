import { ConfirmationModal } from "@/components/ConfirmationModal";
import { EditButton } from "@/components/EditButton";
import { PageContainer } from "@/components/PageContainer";
import { PromotionalContent } from "@/components/PromotionalContent";
import { SectionPreview } from "@/components/SectionPreview";
import { sections } from "@/constants/mockData";
import { useUser } from "@/hooks/useUser";
import { deletePromotionalItem, fetchPromotionalItems, PromotionalItem } from "@/services/promotional.service";
import { router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";

export default function Home() {
   const { getUsername } = useUser()
   const [promotionalItems, setPromotionalItems] = useState<PromotionalItem[]>([]);
   console.log("🚀 ~ file: home.tsx:16 ~ promotionalItems:", promotionalItems)
   const [loading, setLoading] = useState(true);
   const [isEdit, setIsEdit] = useState(false);

   // Promotional item deletion state
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [itemToDelete, setItemToDelete] = useState<{ id: string, name: string } | null>(null);

   useEffect(() => {
      fetchPromotionalContent();
   }, []);

   async function fetchPromotionalContent() {
      try {
         setLoading(true);
         const items = await fetchPromotionalItems();
         console.log('Fetched promotional items:', items);
         setPromotionalItems(items);
      } catch (error) {
         console.error('Error fetching promotional items:', error);
      } finally {
         setLoading(false);
      }
   }

   useFocusEffect(
      useCallback(() => {
         console.log('Focus effect triggered, fetching promotional content');
         fetchPromotionalContent();

         // No cleanup function needed
         return () => { };
      }, [])
   );
   // Handle delete button press
   function handleDeletePress(itemId: string) {
      const itemToRemove = promotionalItems.find(item => item.id === itemId);
      if (itemToRemove) {
         setItemToDelete({
            id: itemToRemove.id,
            name: itemToRemove.name
         });
         setShowDeleteModal(true);
      }
   }

   // Handle cancel delete
   function handleCancelDelete() {
      setShowDeleteModal(false);
      setItemToDelete(null);
   }

   // Handle confirm delete
   async function handleConfirmDelete() {
      if (!itemToDelete || isDeleting) return;

      setIsDeleting(true);
      try {
         const result = await deletePromotionalItem(itemToDelete.id);
         if (result.status === 'success') {
            const updatedItems = promotionalItems.filter(item => item.id !== itemToDelete.id);
            setPromotionalItems(updatedItems);
         } else {
            console.error('Failed to delete promotional item');
         }
      } catch (error) {
         console.error('Error deleting promotional item:', error);
      } finally {
         setIsDeleting(false);
         setShowDeleteModal(false);
         setItemToDelete(null);
      }
   }

   return (
      <SafeAreaView className="h-full bg-white pt-6 pb-0 overflow-x-visible">
         <Stack.Screen options={{ headerShown: false }} />
         <EditButton isEdit={isEdit} onPress={() => setIsEdit(!isEdit)} />

         <PageContainer
            title={'שלום ' + getUsername()}
            description="הגיל לא עוצר את מי שממשיך לזוז"
            plusBtnAction={isEdit ? () => router.push('/admin/form?isEdit=false&type=promotional') : undefined}
         >
            <View className="w-full">
               <FlatList
                  data={sections}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                     <SectionPreview
                        id={item.id}
                        imgUrl={item.imgUrl}
                        title={item.title}
                        onPress={() => router.push({ pathname: item.link as any, params: { id: item.id !== 'recommendations' ? item.id.toString() : '' } })}
                     />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                  ListFooterComponent={
                     <View className="mt-0 mb-36">
                        {loading ? (
                           <View className="items-center justify-center p-10">
                              <ActivityIndicator size="large" color="#0000ff" />
                           </View>
                        ) : (
                           promotionalItems.map(item => (
                              <PromotionalContent
                                 key={item.id}
                                 item={item}
                                 isEdit={isEdit}
                                 onDelete={handleDeletePress}
                              />
                           ))
                        )}</View>
                  }
               />
            </View>
         </PageContainer>

         <ConfirmationModal
            visible={showDeleteModal}
            title="מחיקת תוכן קידומי"
            message={itemToDelete ? `אתה בטוח שאתה רוצה להסיר את "${itemToDelete.name}"? לא יהיה ניתן להחזיר את הפריט לאחר ההסרה` : "האם אתה בטוח שאתה רוצה להסיר את הפריט זה? לא יהיה ניתן להחזיר את הפריט לאחר המחיקה"}
            confirmText="הסר"
            isLoading={isDeleting}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
         />
      </SafeAreaView>
   );
}