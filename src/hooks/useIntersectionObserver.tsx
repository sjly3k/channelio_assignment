import {useEffect} from "react";

interface IProps {
    target : any,
    onIntersect? : any,
    threshold? : number,
    rootMargin? : string,
}

const useInfinteScroll = ({
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
            observer.unobserve(target);
        };
    }, [target, rootMargin, onIntersect, threshold]);
};

export default useInfinteScroll;
