import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-aware className 병합.
 * clsx로 조건부 클래스를 합친 뒤, tailwind-merge로 충돌하는 유틸리티를
 * 뒤쪽 값이 이기도록 정리한다. (외부에서 className으로 덮어쓸 수 있게 함)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
