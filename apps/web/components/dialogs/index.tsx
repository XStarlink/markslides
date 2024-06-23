'use client';

import dynamic from 'next/dynamic';
import useAppSelector from '@/redux/hooks/useAppSelector';
const SlideSettingDialog = dynamic(
    () => import('@/components/dialogs/SlideSettingDialog'),
    {
        ssr: false,
    }
);

export const dialogObjs = [
    {
        key: 'SlideSetting',
        title: 'Slide Setting',
        description: 'Customize your slide setting',
        dialog: SlideSettingDialog,
    },
] as const;

const dialogKeys = dialogObjs.map((dialogObj) => dialogObj.key);
export type DialogKey = (typeof dialogKeys)[number];

function Dialogs() {
    const dialogStateMap = useAppSelector(
        (state) => state.dialog.dialogStateMap
    );

    return (
        <>
            {dialogObjs.map((dialogObj) => {
                const dialogState = dialogStateMap[dialogObj.key];
                if (dialogState) {
                    const DialogComponent = dialogObj.dialog;
                    return (
                        <DialogComponent
                            key={dialogObj.key}
                            dialogKey={dialogObj.key}
                            title={dialogObj.title}
                            description={dialogObj.description}
                            payload={dialogState}
                        />
                    );
                }

                return null;
            })}
        </>
    );
}

export default Dialogs;
