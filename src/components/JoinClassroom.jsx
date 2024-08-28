import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

const JoinClassroom = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Join Classroom</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Join Classroom</DrawerTitle>
            <DrawerDescription>Enter your classroom ID</DrawerDescription>
            <div className="mt-1">
              <Input type="text" placeholder="Classroom ID" />
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default JoinClassroom;
