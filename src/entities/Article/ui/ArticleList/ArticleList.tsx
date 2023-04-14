import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
// import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
        <ArticleListItemSkeleton
            view={view}
            key={index}
            className={cls.card}
        />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
        virtualized = true,
    } = props;

    const { t } = useTranslation();

    const isBig = view === ArticleView.BIG;

    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

    const rowRenderer = ({
        index, key, style,
    }: any) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    view={view}
                    className={cls.card}
                    target={target}
                    key={articles[i].id}
                />,
            );
        }

        return (
            <div
                key={key}
                style={style}
                className={cls.row}
            >
                {items}
            </div>
        );
    };

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Статьи не найдены')}
                    size={TextSize.L}
                />
            </div>
        );
    }

    return (
        <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
            {virtualized ? (
                // <List
                //     height={150}
                //     itemCount={1000}
                //     itemSize={35}
                //     width={300}
                // >
                //     {rowRenderer}
                // </List>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className="List"
                            height={height!}
                            itemCount={1000}
                            itemSize={35}
                            width={width!}
                        >
                            {rowRenderer}
                        </List>
                    )}
                </AutoSizer>
            ) : (
                articles.map((article) => (
                    <ArticleListItem
                        article={article}
                        key={article.id}
                        view={view}
                        target={target}
                        className={cls.card}
                    />
                ))
            )}
            {isLoading && getSkeletons(view)}
        </div>
    );

    // return (
    //     <WindowScroller
    //         scrollElement={document.getElementById(PAGE_ID) as Element}
    //     >
    //         {({
    //             width,
    //             height,
    //             registerChild,
    //             onChildScroll,
    //             isScrolling,
    //             scrollTop,
    //         }) => (
    //             <div
    //                 ref={registerChild}
    //                 className={classNames(cls.ArticleList, {}, [className, cls[view]])}
    //             >
    //                 {virtualized ? (
    //                     <List
    //                         autoHeight
    //                         height={height ?? 700}
    //                         rowCount={rowCount}
    //                         rowHeight={isBig ? 700 : 330}
    //                         rowRenderer={rowRenderer}
    //                         width={width ? width - 80 : 700}
    //                         onScroll={onChildScroll}
    //                         isScrolling={isScrolling}
    //                         scrollTop={scrollTop}
    //                     />
    //                 ) : (
    //                     articles.map((article) => (
    //                         <ArticleListItem
    //                             article={article}
    //                             key={article.id}
    //                             view={view}
    //                             target={target}
    //                             className={cls.card}
    //                         />
    //                     ))
    //                 )}
    //                 {isLoading && getSkeletons(view)}
    //             </div>
    //         )}
    //     </WindowScroller>
    // );
});
