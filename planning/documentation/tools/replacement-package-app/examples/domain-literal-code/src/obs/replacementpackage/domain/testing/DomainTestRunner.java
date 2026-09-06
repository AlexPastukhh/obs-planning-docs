package obs.replacementpackage.domain.testing;

public final class DomainTestRunner {
    private int passed;
    private int failed;

    public void run(String name, Runnable body) {
        try {
            body.run();
            passed++;
            System.out.println("PASS " + name);
        } catch (Throwable t) {
            failed++;
            System.out.println("FAIL " + name + " :: " + t);
            t.printStackTrace(System.out);
        }
    }

    public void finish() {
        System.out.printf("RESULT passed=%d failed=%d total=%d%n", passed, failed, passed + failed);
        if (failed != 0) throw new AssertionError("Domain literal tests failed: " + failed);
    }
}
