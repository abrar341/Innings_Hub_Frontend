// Example usage in a React component
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';

function ExamplePage() {
    return (
        <div>
            <h1>My MERN App</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <button>Open Dialog</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>This is a description for the dialog.</DialogDescription>
                    <DialogClose asChild>
                        <button>Close</button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ExamplePage;
