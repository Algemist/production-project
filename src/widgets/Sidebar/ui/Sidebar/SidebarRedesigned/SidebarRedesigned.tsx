import React, { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarRedesigned.module.scss';
import { AppLogo } from '@/shared/ui/AppLogo';

interface SidebarDeprecatedProps {
    className?: string;
    onToggle: () => void;
    collapsed: boolean;
    itemList: ReactNode;
}

export const SidebarRedesigned = memo((props: SidebarDeprecatedProps) => {
    const { className, itemList, collapsed, onToggle } = props;

    return (
        <aside
            className={classNames(
                cls.SidebarRedesigned,
                { [cls.collapsed]: collapsed },
                [className],
            )}
            data-testid="Sidebar"
        >
            <AppLogo className={cls.appLogo} />
        </aside>
    );
});
