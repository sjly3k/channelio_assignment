import {useEffect} from "react";

interface IProps {
    target : any,
    onIntersect? : any,
    threshold? : number,
    rootMargin? : string,
}

const useInfiniteScroll = ({
    target,
    onIntersect,
    threshold = 1.0,
    rootMargin = '0px',
} : IProps) => {
    useEffect(() => {
        if (!target) return;

        const observer = new IntersectionObserver(onIntersect, {
            rootMargin,
            threshold,
        });
        observer.observe(target);
        return () => {
            observer.disconnect();
        };
    }, [target, rootMargin, onIntersect, threshold]);
};

export default useInfiniteScroll;
