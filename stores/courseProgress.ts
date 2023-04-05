import { defineStore } from 'pinia';
import { CourseProgress } from '~/types/course';

export const useCourseProgress = defineStore(
  'courseProgress',
  () => {
    // Initialize progress from local storage
    const progress = ref<CourseProgress>({});
    const initialized = ref(false);

    async function initialize() {
      // If the course has already been initialized, return
      if (initialized.value) return;
      initialized.value = true;

      // TODO: Fetch user progress from endpoint
    }

    const toggleComplete = async (chapter: string, lesson: string) => {
      // If there's no user we can't update the progress
      const user = useSupabaseUser();
      if (!user.value) return;

      // Grab the chapter and lesson slugs from the route if they're not provided
      if (!chapter || !lesson) {
        const { params: { chapterSlug, lessonSlug } } = useRoute();
        chapter = chapterSlug as string;
        lesson = lessonSlug as string;
      }

      // Get the current progress for the lesson
      const currentProgress = progress.value[chapter]?.[lesson];

      // Optimistically update the progress value in the UI
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: !currentProgress,
      };

      // TODO: Update in DB
    };

    return {
      initialize,
      progress,
      toggleComplete,
    };
  }
);
